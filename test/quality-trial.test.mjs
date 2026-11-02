import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {successfulScopedCheck} from '../scripts/lib/trial-results.mjs';

test('quality checker recognizes captured scoped output without accepting failed or unrelated commands', () => {
  const result = {ok: true, findings: [{code: 'sufficiency-not-assessed', severity: 'info'}]};
  const command = ['node', 'node_modules/cliewen-openspec/dist/cli.js', 'check', '--change', 'allow-nonnegative-counts', '--json'];
  const captured = {command, exitCode: 0, signal: null, stdout: JSON.stringify(result), stderr: ''};
  const change = 'allow-nonnegative-counts';
  assert.equal(successfulScopedCheck(result, change), true);
  assert.equal(successfulScopedCheck(captured, change), true);
  assert.equal(successfulScopedCheck({...captured, exitCode: 1}, change), false);
  assert.equal(successfulScopedCheck(captured, 'another-change'), false);
  assert.equal(successfulScopedCheck({...captured, command: ['node', 'probe.mjs']}, change), false);
  assert.equal(successfulScopedCheck({...captured, stdout: '{broken'}, change), false);
  assert.equal(successfulScopedCheck({...captured, stdout: JSON.stringify({ok: false, findings: []})}, change), false);
});

test('quality trial starts with green execution, blocked policies, and explicit retirement authority', t => {
  const source = fileURLToPath(new URL('../', import.meta.url));
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-quality-trial-test-'));
  t.after(() => {
    const relative = path.relative(os.tmpdir(), parent);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
    fs.rmSync(parent, {recursive: true, force: true});
  });
  const trial = path.join(parent, 'attempt');
  const npm = process.env.npm_execpath;
  assert.ok(npm, 'Run through npm test');
  const env = {...process.env, CLIEWEN_TRIAL_PREBUILT: '1'}; delete env.NODE_TEST_CONTEXT;
  const prepare = target => spawnSync(process.execPath, ['scripts/prepare-quality-lifecycle-trial.mjs', target], {cwd: source, env, encoding: 'utf8', timeout: 120000, windowsHide: true});
  const result = prepare(trial); assert.equal(result.status, 0, result.stdout + result.stderr);
  const baseline = JSON.parse(fs.readFileSync(path.join(trial, 'artifacts/baseline.json')));
  const report = JSON.parse(fs.readFileSync(path.join(trial, 'artifacts/baseline-evidence.json')));
  assert.equal(report.revision, baseline.baseline); assert.equal(report.results.length, 6);
  assert.ok(report.results.every(r => r.outcome === 'passed'));
  assert.equal(report.results.some(r => r.scenario === 'COUNT-001' && r.coverage === 'negative'), false);
  const check = JSON.parse(fs.readFileSync(path.join(trial, 'artifacts/baseline-check.json')));
  assert.equal(check.ok, false);
  for (const code of ['coverage-minimum-unmet', 'test-review-missing']) assert.ok(check.findings.some(f => f.code === code && f.severity === 'error'));
  assert.match(fs.readFileSync(path.join(trial, 'project/docs/accepted-change.md'), 'utf8'), /Status: accepted/);
  assert.notEqual(prepare(trial).status, 0, 'Do not overwrite original attempts');
  assert.notEqual(prepare(path.join(source, '.tmp/forbidden-quality-trial')).status, 0, 'Keep agent projects outside the checkout');
  const suite = JSON.parse(fs.readFileSync(path.join(trial, 'suite.json')));
  assert.equal(suite.cases[0].scenario, 'delivery-quality-and-retirement');
  assert.equal(fs.existsSync(path.join(trial, 'artifacts/initial')), false, 'Preparation must not call a model');
});

test('combined quality investigation has no accepted authority and detects premature product changes', t => {
  const source = fileURLToPath(new URL('../', import.meta.url));
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-quality-review-test-'));
  t.after(() => {
    const relative = path.relative(os.tmpdir(), parent);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
    fs.rmSync(parent, {recursive: true, force: true});
  });
  const trial = path.join(parent, 'attempt'), root = path.join(trial, 'project'), artifacts = path.join(trial, 'artifacts');
  const env = {...process.env, CLIEWEN_TRIAL_PREBUILT: '1'}; delete env.NODE_TEST_CONTEXT;
  const exec = (exe, args, cwd = root) => spawnSync(exe, args, {cwd, env, encoding: 'utf8', timeout: 120000, windowsHide: true});
  const setup = exec(process.execPath, ['scripts/prepare-combined-quality-trial.mjs', trial], source);
  assert.equal(setup.status, 0, setup.stdout + setup.stderr);
  const metadata = JSON.parse(fs.readFileSync(path.join(artifacts, 'baseline.json')));
  assert.equal(metadata.schema, 'cliewen-all');
  const combinedCase = JSON.parse(fs.readFileSync(path.join(trial, 'suite.json'))).cases[0];
  assert.equal(combinedCase.checker, 'scripts/check-quality-lifecycle-trial.mjs');
  assert.equal(combinedCase.reviewChecker, 'scripts/check-quality-lifecycle-review.mjs');
  assert.equal(fs.existsSync(path.join(root, 'docs/accepted-change.md')), false);
  assert.match(fs.readFileSync(path.join(root, 'docs/change-request.md'), 'utf8'), /no delivery or retirement agreement/);
  const cli = ['node_modules/@fission-ai/openspec/bin/openspec.js'];
  const created = exec(process.execPath, [...cli, 'new', 'change', 'allow-nonnegative-counts', '--schema', 'cliewen-all']);
  assert.equal(created.status, 0, created.stderr);
  const write = (file, value) => { fs.mkdirSync(path.dirname(path.join(root, file)), {recursive: true}); fs.writeFileSync(path.join(root, file), value); };
  for (const artifact of ['proposal', 'investigation', 'decision']) {
    const instructions = exec(process.execPath, [...cli, 'instructions', artifact, '--change', 'allow-nonnegative-counts', '--json']);
    assert.equal(instructions.status, 0, instructions.stderr);
    write(`docs/testing/instructions/${artifact}.json`, instructions.stdout);
    write(`openspec/changes/allow-nonnegative-counts/${artifact}.md`, artifact === 'decision' ? '---\ntype: decision\nstatus: proposed\noutcome: delivery\n---\n# Proposed test recommendation\n\nAwait real approval.\n' : `# Test ${artifact}\n\nSynthetic checker control, not an agent evaluation.\n`);
  }
  write('docs/testing/review-request.md', '# Test review request\n\nSynthetic checker control.\n');
  const commit = () => { assert.equal(exec('git', ['add', '.']).status, 0); assert.equal(exec('git', ['commit', '-m', 'Record checker control']).status, 0); };
  commit();
  const check = folder => exec(process.execPath, ['scripts/check-quality-lifecycle-review.mjs', root, folder], source);
  const positive = check(artifacts); assert.equal(positive.status, 0, positive.stdout + positive.stderr);
  const receipt = JSON.parse(fs.readFileSync(path.join(artifacts, 'review-stage-checks.json')));
  assert.equal(receipt.status, 'passed'); assert.equal(receipt.endToEndDelivery, 'incomplete');
  const finalCheck = filename => exec(process.execPath, ['scripts/check-quality-lifecycle-trial.mjs', root, artifacts, filename], source);
  assert.notEqual(finalCheck('no-approval.json').status, 0, 'A review-stage pass does not authorize delivery closure');
  assert.match(JSON.parse(fs.readFileSync(path.join(artifacts, 'no-approval.json'))).error, /approval\.json/);
  fs.writeFileSync(path.join(artifacts, 'approval.json'), JSON.stringify({reviewRevision: receipt.revision, decisionSHA256: '0'.repeat(64)}));
  assert.notEqual(finalCheck('wrong-approval.json').status, 0);
  assert.match(JSON.parse(fs.readFileSync(path.join(artifacts, 'wrong-approval.json'))).error, /reviewed decision digest/);
  const changedArtifacts = path.join(parent, 'changed-artifacts'); fs.mkdirSync(changedArtifacts);
  fs.copyFileSync(path.join(artifacts, 'baseline.json'), path.join(changedArtifacts, 'baseline.json'));
  fs.appendFileSync(path.join(root, 'count.mjs'), '\n// Premature product write.\n'); commit();
  const negative = check(changedArtifacts); assert.notEqual(negative.status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(changedArtifacts, 'review-stage-checks.json'))).status, 'failed');
});
