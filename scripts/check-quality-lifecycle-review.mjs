import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {parse} from 'yaml';
import {hasInstruction} from './lib/trial-instructions.mjs';

const [project, artifacts, ...extra] = process.argv.slice(2);
if (!project || !artifacts || extra.length) throw Error('Use node scripts/check-quality-lifecycle-review.mjs PROJECT ARTIFACTS');
const root = path.resolve(project), output = path.join(path.resolve(artifacts), 'review-stage-checks.json');
if (fs.existsSync(output)) throw Error('Preserve the previous review-stage result');
const baseline = JSON.parse(fs.readFileSync(path.join(artifacts, 'baseline.json'), 'utf8'));
const checks = [], change = 'allow-nonnegative-counts';
function run(label, executable, args, expected = 0) {
  const env = {...process.env, CI: '1', OPENSPEC_TELEMETRY: '0'}; delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(executable, args, {cwd: root, env, encoding: 'utf8', timeout: 60000, windowsHide: true});
  checks.push({label, executable, args, expected, exitCode: result.status, stdout: result.stdout, stderr: result.stderr});
  assert.equal(result.status, expected, `${label}: ${result.stdout}\n${result.stderr}`); return result.stdout.trim();
}
const git = (...args) => run(`git ${args.join(' ')}`, 'git', args);
let status = 'passed', error, revision;
try {
  assert.equal(baseline.schema, 'cliewen-all');
  revision = git('rev-parse', 'HEAD'); assert.equal(git('status', '--porcelain', '--untracked-files=all'), '');
  const files = git('ls-tree', '-r', '--name-only', baseline.baseline).split(/\r?\n/).filter(Boolean);
  git('diff', '--exit-code', baseline.baseline, '--', ...files);
  git('merge-base', '--is-ancestor', baseline.baseline, 'HEAD');
  run('six baseline tests', process.execPath, ['--test', 'test/count.test.mjs', 'test/shared.test.mjs', 'test/limit.test.mjs']);
  run('combined schema validation', process.execPath, ['node_modules/@fission-ai/openspec/bin/openspec.js', 'schema', 'validate', 'cliewen-all']);
  const folder = path.join(root, 'openspec/changes', change);
  const text = fs.readFileSync(path.join(folder, 'decision.md'), 'utf8');
  const decision = parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '');
  assert.equal(decision?.type, 'decision'); assert.equal(decision.status, 'proposed');
  assert.ok(['delivery', 'no-change', 'further-investigation'].includes(decision.outcome));
  assert.equal(fs.existsSync(path.join(folder, 'design.md')), false);
  assert.equal(fs.existsSync(path.join(root, 'docs/accepted-change.md')), false);
  for (const artifact of ['proposal', 'investigation', 'decision']) assert.ok(hasInstruction(root, artifact, 'cliewen-all', change), `Missing ${artifact} instructions`);
  for (const file of ['proposal.md', 'investigation.md']) assert.ok(fs.readFileSync(path.join(folder, file), 'utf8').trim());
  assert.ok(fs.readFileSync(path.join(root, 'docs/testing/review-request.md'), 'utf8').trim());
  const result = run('review-stage health', process.execPath, ['node_modules/cliewen-openspec/dist/cli.js', 'check', '--change', change, '--json'], decision.outcome === 'delivery' ? 1 : 0);
  const health = JSON.parse(result);
  const errors = health.findings.filter(f => f.severity === 'error');
  if (decision.outcome === 'delivery') { assert.equal(health.ok, false); assert.deepEqual(errors.map(f => f.code), ['all-decision-unaccepted']); }
  else assert.equal(health.ok, true);
  assert.equal(git('status', '--porcelain', '--untracked-files=all'), '');
} catch (caught) { status = 'failed'; error = caught.stack; process.exitCode = 1; }
fs.writeFileSync(output, JSON.stringify({status, error, revision, baseline: baseline.baseline, checks, endToEndDelivery: 'incomplete', evaluation: 'semantic-review-required'}, null, 2) + '\n');
console.log(JSON.stringify({status, error, revision, output, endToEndDelivery: 'incomplete'}));
