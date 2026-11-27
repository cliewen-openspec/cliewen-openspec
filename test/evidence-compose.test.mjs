import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const cli = fileURLToPath(new URL('../dist/cli.js', import.meta.url));

test('compose runner evidence for separate required types [EVID-003] [Test-type: Integration] [Case: combined-runners] [Coverage: positive]', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-compose-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  function run(executable, args, expected = 0) {
    const result = spawnSync(executable, args, {cwd: root, encoding: 'utf8', timeout: 30000});
    assert.equal(result.status, expected, result.error?.message ?? result.stderr + result.stdout);
    return result.stdout.trim();
  }
  const git = (...args) => run('git', args);
  const cliewen = (args, code) => JSON.parse(run(process.execPath, [cli, ...args, '--json'], code));
  fs.mkdirSync(path.join(root, 'openspec/specs/checkout'), {recursive: true});
  fs.mkdirSync(path.join(root, 'openspec/changes'), {recursive: true});
  fs.writeFileSync(path.join(root, 'openspec/config.yaml'), 'schema: spec-driven\n');
  fs.writeFileSync(path.join(root, 'openspec/specs/checkout/spec.md'), '#### Scenario: Checkout total [CART-001]\nTest-type: Unit\nTest-type: Integration\n');
  git('init', '-q');
  cliewen(['init']);
  const settings = path.join(root, '.cliewen-openspec/config.yaml');
  fs.writeFileSync(settings, fs.readFileSync(settings, 'utf8').replace('capabilities: {}', 'capabilities: {checkout: CART}'));
  run(process.execPath, [cli, 'ac', 'next', '--capability', 'checkout']);
  fs.writeFileSync(path.join(root, '.gitignore'), '/runs/\n');
  git('add', '.');
  git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'Prepare checkout criterion');
  const revision = git('rev-parse', 'HEAD');
  fs.mkdirSync(path.join(root, 'runs'));
  const output = path.join(root, '.cliewen-openspec/evidence.json');
  const unitRow = {scenario: 'CART-001', test: 'total', testType: 'Unit', outcome: 'passed', caseId: 'calculation', coverage: 'positive'};
  const integrationRow = {...unitRow, test: 'store total', testType: 'Integration', caseId: 'storage'};
  const scope = {capability: 'checkout'};
  const unit = {version: 1, revision, scope, execution: {exitCode: 0}, results: [unitRow]};
  const integration = {...unit, results: [integrationRow]};
  const write = (name, report) => fs.writeFileSync(path.join(root, 'runs', name), JSON.stringify(report));
  write('unit.json', unit);
  write('integration.json', integration);
  const compose = (code = 0, second = 'runs/integration.json') => cliewen(['evidence', 'compose', 'runs/unit.json', second], code);
  const verify = code => cliewen(['check', '--capability', 'checkout'], code);
  const read = () => JSON.parse(fs.readFileSync(output, 'utf8'));

  compose();
  assert.equal(verify(0).ok, true);
  const combined = read();
  assert.deepEqual(combined.results, [unitRow, integrationRow]);
  assert.deepEqual(combined.sources.map(({path, exitCode, resultCount}) => [path, exitCode, resultCount]), [
    ['runs/unit.json', 0, 1], ['runs/integration.json', 0, 1],
  ]);
  assert.equal(combined.sources[0].sha256, createHash('sha256').update(JSON.stringify(unit)).digest('hex'));

  write('integration.json', {...integration, execution: {exitCode: 7}});
  compose(1);
  assert.equal(read().execution.exitCode, 7);
  assert.equal(read().sources[1].exitCode, 7);
  assert.ok(verify(1).findings.some(finding => finding.code === 'runner-failed'));
  write('integration.json', integration);
  compose();
  assert.match(compose(2, '.cliewen-openspec/evidence.json').error, /cannot also be a source/);
  assert.deepEqual(read().results, [unitRow, integrationRow]);
  for (const [input, expected] of [
    [{...integration, revision: 'f'.repeat(40)}, /revision differs/],
    [{...integration, scope: {change: 'checkout'}}, /scope differs/],
    [{...integration, results: [unitRow]}, /duplicate test result/],
    [{...integration, execution: undefined}, /runner exit code/],
    [combined, /original runner reports/],
  ]) {
    write('integration.json', integration);
    compose();
    write('integration.json', input);
    assert.match(compose(2).error, expected);
    assert.equal(fs.existsSync(output), false);
  }
});
