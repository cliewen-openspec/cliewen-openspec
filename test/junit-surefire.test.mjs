import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {init} from '../dist/core.js';

const adapter = fileURLToPath(new URL('../adapters/junit-surefire.mjs', import.meta.url));
const cli = fileURLToPath(new URL('../dist/cli.js', import.meta.url));

test('Surefire execution verifies Unit and Slice separately [EVID-002] [Test-type: Integration] [Case: two-boundaries] [Coverage: positive]', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-junit-test-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  const write = (file, content) => {
    const destination = path.join(root, file);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.writeFileSync(destination, content);
  };
  function run(executable, args, expected = 0) {
    const run = spawnSync(executable, args, {cwd: root, encoding: 'utf8', timeout: 30000});
    assert.equal(run.status, expected, run.error?.message ?? run.stderr ?? run.stdout);
    return run.stdout.trim();
  }

  fs.mkdirSync(path.join(root, 'openspec', 'changes'), {recursive: true});
  write('openspec/config.yaml', 'schema: spec-driven\n');
  write('openspec/specs/cart/spec.md', '#### Scenario: Checkout total [CART-001]\nTest-type: Unit\nTest-type: Slice\n');
  init(root, false, false);
  write('.cliewen-openspec/config.yaml', 'ac: {capabilities: {cart: CART}}\ntesting:\n  types:\n    Unit: {description: Calculation}\n    Slice: {description: MVC}\n');
  const mappings = [
    {classname: 'example.Unit', name: 'amount', scenario: 'CART-001', testType: 'Unit'},
    {classname: 'example.Slice', name: 'returns [1] <ok>', scenario: 'CART-001', testType: 'Slice'},
  ];
  write('mapping.json', JSON.stringify(mappings));
  write('runner.cjs', String.raw`
const fs = require('node:fs');
const path = require('node:path');
const mode = process.argv[2];
const report = path.join(process.env.CLIEWEN_JUNIT_REPORTS, 'TEST-cart.xml');
const unit = '<testcase classname="example.Unit" name="amount"/>';
const slice = '<testcase classname="example.Slice" name="returns [1] &lt;ok&gt;"/>';
const failed = '<testcase classname="example.Unmapped" name="failure"><failure/></testcase>';
const skip = slice.replace('/>', '><skipped/></testcase>');
const rows = {both: [unit, slice], absent: [unit], failed: [unit, slice, failed], masked: [unit, failed], skipped: [unit, skip], duplicate: [unit, unit]};
if (mode === 'malformed') fs.writeFileSync(report, '<testsuite>');
if (rows[mode]) {
  const cases = rows[mode];
  fs.writeFileSync(report, '<testsuite tests="' + cases.length + '" errors="0" skipped="' + Number(mode === 'skipped') +
    '" failures="' + Number(mode === 'failed' || mode === 'masked') + '">' + cases.join('') + '</testsuite>');
}
if (mode === 'failed') process.exitCode = 7;
`);
  run(process.execPath, [cli, 'ac', 'next', '--capability', 'cart']);
  run('git', ['init', '-q']);
  run('git', ['add', '.']);
  run('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'Set up checkout tests']);
  const reportPath = path.join(root, '.cliewen-openspec', 'evidence.json');
  const collect = (mode, expected) => run(process.execPath, [adapter, '--mapping', 'mapping.json', '--capability', 'cart', '--', process.execPath, 'runner.cjs', mode], expected);
  const verify = expected => JSON.parse(run(process.execPath, [cli, 'check', '--capability', 'cart', '--json'], expected));
  const report = () => JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  collect('both', 0);
  assert.equal(verify(0).ok, true);
  assert.deepEqual(report().results.map(({testType, outcome}) => [testType, outcome]), [['Unit', 'passed'], ['Slice', 'passed']]);
  assert.equal(report().results[1].test, 'example.Slice#returns [1] <ok>');
  assert.equal(report().revision, run('git', ['rev-parse', 'HEAD']));
  collect('absent', 0);
  assert.ok(verify(1).findings.some(finding => finding.code === 'missing-test-type-evidence' && finding.message.endsWith('Slice')));
  collect('skipped', 0);
  assert.equal(report().results[1].outcome, 'skipped');
  assert.ok(verify(1).findings.some(finding => finding.code === 'test-skipped'));
  collect('failed', 1);
  assert.equal(report().execution.exitCode, 7);
  assert.ok(verify(1).findings.some(finding => finding.code === 'runner-failed'));
  for (const mode of ['malformed', 'masked', 'duplicate', 'empty']) {
    collect('both', 0);
    collect(mode, 2);
    assert.equal(fs.existsSync(reportPath), false, mode);
  }
});
