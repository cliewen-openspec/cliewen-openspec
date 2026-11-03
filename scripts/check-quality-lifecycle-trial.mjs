import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {parse} from 'yaml';
import {hasInstruction} from './lib/trial-instructions.mjs';
import {successfulScopedCheck} from './lib/trial-results.mjs';

const [project, artifacts, filename = 'independent-checks.json', ...extra] = process.argv.slice(2);
if (!project || !artifacts || extra.length || !/^[a-z0-9][a-z0-9.-]*\.json$/.test(filename)) throw Error('Use node scripts/check-quality-lifecycle-trial.mjs PROJECT ARTIFACTS [RESULT_NAME.json]');
const root = path.resolve(project), output = path.join(path.resolve(artifacts), filename);
if (fs.existsSync(output)) throw Error('Preserve the previous independent result');
const baseline = JSON.parse(fs.readFileSync(path.join(artifacts, 'baseline.json'), 'utf8'));
const schema = baseline.schema ?? 'cliewen-delivery';
if (!['cliewen-delivery', 'cliewen-all'].includes(schema)) throw Error('Unsupported quality trial schema');
const checks = [];
const change = 'allow-nonnegative-counts';
function run(label, executable, args, expected = 0) {
  const env = {...process.env, OPENSPEC_TELEMETRY: '0', CI: '1'}; delete env.NODE_TEST_CONTEXT;
  const r = spawnSync(executable, args, {cwd: root, env, encoding: 'utf8', timeout: 60000, windowsHide: true});
  checks.push({label, executable, args, expected, exitCode: r.status, stdout: r.stdout, stderr: r.stderr});
  assert.equal(r.status, expected, `${label}: ${r.stdout}\n${r.stderr}`); return r.stdout;
}
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const git = (...args) => run(`git ${args.join(' ')}`, 'git', args).trim();
let status = 'passed', error, revision;
try {
  revision = git('rev-parse', 'HEAD'); assert.equal(git('status', '--porcelain', '--untracked-files=all'), '');
  git('merge-base', '--is-ancestor', baseline.baseline, 'HEAD');
  const installed = JSON.parse(read('node_modules/cliewen-openspec/package.json'));
  const expectedVersion = baseline.package.version ?? baseline.package.filename.match(/^cliewen-openspec-(.+)\.tgz$/)?.[1];
  assert.ok(expectedVersion, 'Baseline must identify its packed package version');
  assert.equal(installed.version, expectedVersion);
  const settings = parse(read('.cliewen-openspec/config.yaml'));
  assert.equal(settings.features.evidence, true);
  assert.equal(settings.testing.quality.coverage.mode, 'enforce');
  assert.equal(settings.testing.quality.effectiveness.mode, 'enforce'); assert.equal(settings.testing.lifecycle.mode, 'enforce');
  assert.deepEqual(settings.testing.quality.coverage.minimumCases, {positive: 2, negative: 1, boundary: 1});
  if (schema === 'cliewen-all') {
    const approval = JSON.parse(fs.readFileSync(path.join(artifacts, 'approval.json'), 'utf8'));
    const stage = JSON.parse(fs.readFileSync(path.join(artifacts, 'review-stage-checks.json'), 'utf8'));
    assert.equal(stage.status, 'passed'); assert.equal(stage.revision, approval.reviewRevision);
    const proposed = run('original reviewed decision', 'git', ['show', `${approval.reviewRevision}:openspec/changes/${change}/decision.md`]);
    assert.equal(createHash('sha256').update(proposed).digest('hex'), approval.decisionSHA256, 'Approval must bind the reviewed decision digest');
    assert.match(proposed, /status: proposed/);
    assert.match(approval.scope.localArchive, /authorized/);
    assert.ok(approval.source && approval.userReply, 'Retain the actual approval source for human review');
    git('merge-base', '--is-ancestor', approval.reviewRevision, approval.approvalCommit);
    git('merge-base', '--is-ancestor', approval.approvalCommit, 'HEAD');
    assert.equal(run('committed approval document', 'git', ['show', 'HEAD:docs/accepted-change.md']), approval.acceptedDocument);
  } else assert.equal(git('show', 'HEAD:docs/accepted-change.md'), git('show', `${baseline.baseline}:docs/accepted-change.md`));
  assert.equal(git('show', `${baseline.baseline}:.cliewen-openspec/ac-registry.json`), read('.cliewen-openspec/ac-registry.json').trim());
  assert.ok(fs.existsSync(path.join(root, 'test/shared.test.mjs')), 'Shared test path must survive');
  const spec = read('openspec/specs/count/spec.md');
  assert.match(spec, /\[COUNT-001\]/); assert.match(spec, /\[COUNT-002\]/); assert.doesNotMatch(spec, /\[COUNT-003\]/);
  assert.equal(fs.existsSync(path.join(root, 'openspec/changes', change)), false);
  const archived = fs.readdirSync(path.join(root, 'openspec/changes/archive')).filter(n => new RegExp(`^\\d{4}-\\d{2}-\\d{2}-${change}$`).test(n));
  assert.equal(archived.length, 1);
  if (schema === 'cliewen-all') {
    const decisionFile = path.join(root, 'openspec/changes/archive', archived[0], 'decision.md');
    const decisionText = fs.readFileSync(decisionFile, 'utf8');
    const decision = parse(decisionText.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '');
    assert.equal(decision?.status, 'accepted'); assert.equal(decision.outcome, 'delivery');
    assert.equal(fs.existsSync(path.join(path.dirname(decisionFile), 'design.md')), false);
    assert.ok(fs.readdirSync(path.join(root, settings.docsRoot, 'decisions')).some(f => f.endsWith('.md')), 'Preserve a durable decision reference');
  }
  const instructionIds = schema === 'cliewen-all' ? ['proposal', 'investigation', 'decision', 'specs', 'tasks', 'apply'] : ['proposal', 'specs', 'design', 'tasks', 'apply'];
  for (const artifact of instructionIds) assert.ok(hasInstruction(root, artifact, schema, change), `Missing saved ${artifact} instructions`);
  for (const file of ['README.md', 'docs/testing/outcome.md']) assert.ok(read(file).trim());
  checks.push({label: 'PR description needs semantic review; no path was prescribed', candidates: git('ls-files', 'docs').split(/\r?\n/).filter(f => /pr-description\.md$/.test(f))});
  const evidence = JSON.parse(read('.cliewen-openspec/evidence.json'));
  assert.equal(evidence.revision, revision); assert.equal(evidence.scope, undefined); assert.equal(evidence.execution.exitCode, 0);
  assert.ok(evidence.results.length > 0 && evidence.results.every(r => r.outcome === 'passed' && ['COUNT-001', 'COUNT-002'].includes(r.scenario)));
  const review = parse(read('.cliewen-openspec/reviews/specs.yaml'));
  assert.equal(review.baseline, baseline.baseline);
  assert.equal(review.exceptions.length, 1);
  assert.deepEqual(Object.fromEntries(['policy', 'scenario', 'category', 'status'].map(k => [k, review.exceptions[0][k]])), {policy: 'coverage', scenario: 'COUNT-002', category: 'negative', status: 'reviewed'});
  const retirement = review.lifecycle.find(e => e.scenario === 'COUNT-003');
  assert.equal(retirement?.change, 'retired'); assert.equal(retirement.retirement.source, 'docs/accepted-change.md');
  assert.ok(retirement.tests.some(t => t.file === 'test/shared.test.mjs' && t.action !== 'remove' && (t.remainingScenarios.includes('COUNT-001') || t.replacementScenarios?.includes('COUNT-001'))), 'Declare preserved shared obligations');
  const files = fs.readdirSync(path.join(root, 'test')).filter(n => n.endsWith('.test.mjs')).map(n => `test/${n}`);
  run('final project tests', process.execPath, ['--test', ...files]);
  run('strict permanent specs', process.execPath, ['node_modules/@fission-ai/openspec/bin/openspec.js', 'validate', '--specs', '--strict']);
  const check = JSON.parse(run('enforced permanent check', process.execPath, ['node_modules/cliewen-openspec/dist/cli.js', 'check', '--json'])); assert.equal(check.ok, true);
  const probe = `import assert from 'node:assert/strict'; import {parseCount} from './count.mjs';
    for (const n of [0,1,2,99,100,101,1000000,Number.MAX_SAFE_INTEGER]) assert.equal(parseCount(String(n)),n);
    for (const bad of ['', '01', '-1', '+1', ' 1', '1 ', '1.5', '1e2', 'garbage', 1, null, undefined]) assert.throws(()=>parseCount(bad),TypeError);
    assert.throws(()=>parseCount('9007199254740992'),RangeError);`;
  run('independent accepted behavior', process.execPath, ['--input-type=module', '-e', probe]);
  const source = fs.readFileSync(path.join(root, 'count.mjs'));
  // The dependency-free parser can use any syntax for its named export.
  const original = `import {parseCount as originalParseCount} from ${JSON.stringify('data:text/javascript;base64,' + source.toString('base64'))};`;
  try {
    for (const [name, fault] of [
      ['incorrect numeric result', "if(value === '2') return 3;"],
      ['malformed input accepted', "if(value === 'garbage') return 0;"],
      ['zero rejected', "if(value === '0') throw new RangeError('fault');"],
      ['retired limit restored', "if(value === '100') throw new RangeError('fault');"],
      ['unsafe value accepted', "if(value === '9007199254740992') return Number(value);"],
    ]) {
      fs.writeFileSync(path.join(root, 'count.mjs'), original + `\nexport function parseCount(value) { ${fault} return originalParseCount(value); }\n`);
      const out = run(`assertions reject ${name}`, process.execPath, ['--test', ...files], 1);
      // Rejection of valid input can throw before assert.equal receives its value.
      assert.match(out, /ERR_ASSERTION|RangeError(?: \[Error\])?: fault/, 'Expect an assertion mismatch or the injected rejection of valid input');
    }
  } finally { fs.writeFileSync(path.join(root, 'count.mjs'), source); }
  const trialFiles = directory => fs.readdirSync(directory, {withFileTypes: true}).flatMap(e => e.isDirectory() && !e.isSymbolicLink() ? trialFiles(path.join(directory, e.name)) : e.isFile() && e.name.endsWith('.json') ? [path.join(directory, e.name)] : []);
  const snapshots = trialFiles(path.join(root, '.trial')).flatMap(file => {try { return [{file, data: JSON.parse(fs.readFileSync(file, 'utf8'))}]; } catch { return []; }});
  const scoped = snapshots.find(({data}) => data.version === 1 && data.scope?.change === change && data.execution?.exitCode === 0 && data.results?.length);
  assert.ok(scoped, 'Preserve genuine scoped execution evidence');
  git('merge-base', '--is-ancestor', scoped.data.revision, revision);
  assert.ok(snapshots.some(({data}) => successfulScopedCheck(data, change)), 'Preserve the successful scoped check; reviewer verifies its command and timing');
  assert.equal(git('status', '--porcelain', '--untracked-files=all'), '');
} catch (caught) { status = 'failed'; error = caught.stack; process.exitCode = 1; }
fs.writeFileSync(output, JSON.stringify({status, error, schema, revision, baseline: baseline.baseline, checks, evaluation: 'semantic-review-required'}, null, 2) + '\n');
console.log(JSON.stringify({status, error, output}));
