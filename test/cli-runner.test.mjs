import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
import {parse} from 'yaml';

const source = fileURLToPath(new URL('../', import.meta.url));
const profiles = parse(fs.readFileSync(path.join(source, 'docs/testing/agent-evaluation.yaml'), 'utf8')).profiles;
const profile = profiles['codex-cli-primary'];
function fixture(t, {version, failEvent = false, profileId = 'codex-cli-primary', editReview = false, clockAdvance = false} = {}) {
  const selected = profiles[profileId];
  version ??= selected.agentVersion;
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-cli-runner-test-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  const project = path.join(root, 'project'), artifacts = path.join(root, 'artifacts');
  fs.mkdirSync(project); fs.mkdirSync(artifacts);
  fs.writeFileSync(path.join(project, 'AGENTS.md'), 'Test fixture only.\n');
  if (editReview === 'machine-check') {
    fs.mkdirSync(path.join(project, '.cliewen-openspec/tdd'), {recursive: true});
    fs.writeFileSync(path.join(project, '.gitignore'), '.cliewen-openspec/tdd/\n');
    fs.writeFileSync(path.join(project, '.cliewen-openspec/tdd/check.json'), '{"ok":false}\n');
  }
  const git = (...args) => { const r = spawnSync('git', args, {cwd: project, encoding: 'utf8'}); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
  git('init'); git('add', '.'); git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'Fixture');
  const suite = path.join(root, 'suite.json');
  fs.writeFileSync(suite, JSON.stringify({cases: [{profile: profileId, schema: 'cliewen-delivery', project, artifacts, baseline: git('rev-parse', 'HEAD')}]}));
  fs.writeFileSync(path.join(artifacts, 'prompt.md'), 'Do not call any model. This is a fake CLI test.');
  const fake = path.join(root, 'fake-cli.mjs');
  const events = selected.agent === 'Claude Code'
    ? [{type: 'system', subtype: 'init', session_id: 'fixture-session', model: selected.model}, {type: 'result', subtype: 'success', session_id: 'fixture-session', total_cost_usd: 0.1, usage: {input_tokens: 10, output_tokens: 4}, modelUsage: {[selected.model]: {inputTokens: 10}}}]
    : [{type: 'thread.started', thread_id: 'fixture-session'}, failEvent ? {type: 'turn.failed', error: {message: 'Fixture failure'}} : {type: 'turn.completed', usage: {input_tokens: 10, output_tokens: 4}}];
  fs.writeFileSync(fake, `if(process.argv.includes('--version')) {console.log(${JSON.stringify(version)});} else {process.stdin.resume();process.stdin.on('end',()=>{for(const event of ${JSON.stringify(events)})console.log(JSON.stringify(event));process.stderr.write('fixture diagnostic');});}\n`);
  const override = selected.agent === 'OpenCode' ? 'CLIEWEN_OPENCODE_CLI' : selected.agent === 'Claude Code' ? 'CLIEWEN_CLAUDE_CLI' : 'CLIEWEN_CODEX_CLI';
  const env = {...process.env, [override]: fake, FAKE_PRIVATE_TOKEN: 'must-not-appear'};
  if (clockAdvance) {
    const clock = path.join(root, 'clock.mjs');
    fs.writeFileSync(clock, `if(process.argv[1]?.endsWith('run-cli-trial.mjs')){const now=Date.now;let calls=0;Date.now=()=>now()+(calls++?601000:0);}`);
    env.NODE_OPTIONS = `${env.NODE_OPTIONS ?? ''} --import=${pathToFileURL(clock).href}`;
  }
  const run = (...args) => spawnSync(process.execPath, ['scripts/run-cli-trial.mjs', suite, profileId, 'cliewen-delivery', ...args], {cwd: source, encoding: 'utf8', timeout: 15000, env});
  if (editReview) fs.appendFileSync(fake, `\nimport fs from 'node:fs'; if (!process.argv.includes('--version') && fs.existsSync('mutate-on-review')) fs.appendFileSync(${JSON.stringify(editReview === 'machine-check' ? '.cliewen-openspec/tdd/check.json' : 'AGENTS.md')}, 'changed');\n`);
  return {project, artifacts, run};
}

test('CLI runner preserves raw logs and requested profile without treating CLI completion as a grade', t => {
  const f = fixture(t); const result = f.run(); assert.equal(result.status, 0, result.stderr);
  const dir = path.join(f.artifacts, 'initial');
  const raw = fs.readFileSync(path.join(dir, 'events.jsonl'), 'utf8');
  assert.match(raw, /turn.completed/);
  assert.equal(fs.readFileSync(path.join(dir, 'stderr.txt'), 'utf8'), 'fixture diagnostic');
  const run = JSON.parse(fs.readFileSync(path.join(dir, 'run.json'), 'utf8'));
  assert.equal(run.profile.model, profile.model); assert.equal(run.profile.effort, profile.effort);
  assert.equal(run.usage.input_tokens, 10); assert.equal(run.evaluation, 'not-graded');
  assert.equal(run.sessionId, 'fixture-session'); assert.equal(run.reportedCostUSD, null);
  assert.ok(!JSON.stringify(run).includes('must-not-appear'));
  assert.notEqual(f.run().status, 0, 'earlier logs must not be overwritten');
});

test('CLI runner rejects completion beyond the elapsed-time budget even if its timer did not fire', t => {
  const f = fixture(t, {clockAdvance: true});
  assert.notEqual(f.run().status, 0);
  const result = JSON.parse(fs.readFileSync(path.join(f.artifacts, 'initial/run.json'), 'utf8'));
  assert.equal(result.exitCode, 0);
  assert.equal(result.stopReason, 'wall-time-limit');
  assert.ok(result.deadlineExceededBySeconds > 0);
  assert.ok(result.monotonicDurationSeconds < 600);
});

test('CLI self-review follows a retained attempt and cannot change its inputs or overwrite the initial phase', t => {
  const f = fixture(t); const prompt = path.join(f.artifacts, 'review.md'); fs.writeFileSync(prompt, 'Review saved evidence only.');
  assert.notEqual(f.run('--review', prompt).status, 0);
  assert.equal(f.run().status, 0);
  const initial = fs.readFileSync(path.join(f.artifacts, 'initial/run.json'), 'utf8');
  assert.equal(f.run('--review', prompt).status, 0);
  assert.equal(fs.readFileSync(path.join(f.artifacts, 'initial/run.json'), 'utf8'), initial);
  assert.equal(JSON.parse(fs.readFileSync(path.join(f.artifacts, 'self-review/run.json'))).reviewInputsPreserved, true);
  assert.notEqual(f.run('--review', prompt).status, 0);
  for (const editReview of [true, 'machine-check']) {
    const changed = fixture(t, {editReview}); const otherPrompt = path.join(changed.artifacts, 'review.md'); fs.writeFileSync(otherPrompt, 'Review only.');
    assert.equal(changed.run().status, 0); fs.writeFileSync(path.join(changed.project, 'mutate-on-review'), 'fixture control');
    assert.notEqual(changed.run('--review', otherPrompt).status, 0);
    assert.equal(JSON.parse(fs.readFileSync(path.join(changed.artifacts, 'self-review/run.json'))).reviewInputsPreserved, false);
  }
});

test('CLI runner records version failure and detects semantic failure despite exit zero', t => {
  const wrong = fixture(t, {version: '0.0.0'});
  assert.notEqual(wrong.run().status, 0);
  const failedVersion = JSON.parse(fs.readFileSync(path.join(wrong.artifacts, 'initial/run.json'), 'utf8'));
  assert.equal(failedVersion.evaluation, 'infrastructure-failure');
  const semantic = fixture(t, {failEvent: true});
  assert.notEqual(semantic.run().status, 0);
  const failedTurn = JSON.parse(fs.readFileSync(path.join(semantic.artifacts, 'initial/run.json'), 'utf8'));
  assert.equal(failedTurn.exitCode, 0); assert.equal(failedTurn.eventFailure, true);
});

test('subscription review and longer OpenCode profiles keep their own declared budgets', t => {
  for (const profileId of ['claude-code-opus-review-1usd', 'opencode-2-2-5-15m']) {
    const f = fixture(t, {profileId}); assert.equal(f.run().status, 0);
    const result = JSON.parse(fs.readFileSync(path.join(f.artifacts, 'initial/run.json')));
    if (profileId.startsWith('claude')) {
      assert.ok(result.args.includes('--safe-mode')); assert.ok(result.args.includes('--no-session-persistence'));
      assert.equal(result.args[result.args.indexOf('--max-budget-usd') + 1], '1');
      assert.match(result.profile.budgets.billing, /subscription/);
      assert.equal(result.sessionId, 'fixture-session'); assert.deepEqual(result.observedModels, ['claude-opus-5-5']);
    } else {
      assert.equal(result.profile.budgets.wallTimeSeconds, 900); assert.equal(result.profile.budgets.reportedCostUSD, 0.5);
    }
  }
});

test('CLI runner refuses changed initial baselines before launching a model', t => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.project, 'dirty.txt'), 'uncommitted input');
  const result = f.run(); assert.notEqual(result.status, 0);
  assert.match(result.stderr, /exact clean baseline/);
  assert.equal(fs.existsSync(path.join(f.artifacts, 'initial')), false);
});

test('OpenCode profiles retain their own version pin and provider controls under a new identity', t => {
  for (const profileId of ['opencode-primary', 'opencode-1-19-5']) {
    const f = fixture(t, {profileId});
    const result = f.run(); assert.equal(result.status, 0, result.stderr);
    const run = JSON.parse(fs.readFileSync(path.join(f.artifacts, 'initial/run.json'), 'utf8'));
    assert.equal(run.profileId, profileId);
    assert.equal(run.cliVersion, profiles[profileId].agentVersion);
    assert.equal(run.args[run.args.indexOf('--model') + 1], profiles[profileId].model);
    assert.equal(run.args[run.args.indexOf('--variant') + 1], profiles[profileId].effort);
    const config = JSON.parse(run.environmentControls.OPENCODE_CONFIG_CONTENT);
    assert.deepEqual(config.enabled_providers, ['opencode']);
    assert.equal(config.permission.external_directory, 'deny');
    assert.equal(config.permission.task, 'deny');
    assert.equal(run.environmentControls.OPENCODE_DISABLE_EXTERNAL_SKILLS, 'true');
    assert.ok(!JSON.stringify(run).includes('must-not-appear'));
    assert.equal(run.evaluation, 'not-graded');
  }
});

test('OpenCode V2 uses standalone mode, variant syntax, and native policy controls', t => {
  const profileId = 'opencode-2-2-5';
  const selected = profiles[profileId];
  const f = fixture(t, {profileId, version: `opencode v${selected.agentVersion}`});
  const result = f.run(); assert.equal(result.status, 0, result.stderr);
  const run = JSON.parse(fs.readFileSync(path.join(f.artifacts, 'initial/run.json'), 'utf8'));
  assert.equal(run.cliVersion, `opencode v${selected.agentVersion}`);
  assert.ok(run.args.includes('--standalone'));
  assert.ok(!run.args.includes('--pure')); assert.ok(!run.args.includes('--variant'));
  assert.equal(run.args[run.args.indexOf('--model') + 1], `${selected.model}#${selected.effort}`);
  const controls = run.environmentControls;
  const config = JSON.parse(controls.OPENCODE_CONFIG_CONTENT);
  assert.deepEqual(config.policies.filter(p => p.action === 'provider.use'), [
    {action: 'provider.use', resource: '*', effect: 'deny'},
    {action: 'provider.use', resource: 'opencode', effect: 'allow'},
  ]);
  for (const action of ['external_directory', 'subagent', 'question', 'skill', 'webfetch', 'websearch']) {
    assert.ok(config.permissions.some(p => p.action === action && p.effect === 'deny'));
    assert.ok(config.policies.some(p => p.action === 'tool.use' && p.resource === `${action}:*` && p.effect === 'deny'));
  }
  assert.ok(config.policies.some(p => p.action === 'mcp.use' && p.effect === 'deny'));
  assert.ok(config.policies.some(p => p.action === 'skill.use' && p.effect === 'deny'));
  assert.deepEqual(config.plugins, ['-*', 'opencode.*']);
  assert.equal(controls.OPENCODE_CONFIG_PROJECT_DISABLE, 'true');
  assert.equal(controls.OPENCODE_DISABLE_MODELS_FETCH, 'true');
  assert.equal(controls.OPENCODE_CONFIG_DIR, path.join(f.artifacts, 'initial/config'));
  assert.ok(fs.existsSync(controls.OPENCODE_CONFIG_DIR));
  assert.ok(!JSON.stringify(run).includes('must-not-appear'));
});
