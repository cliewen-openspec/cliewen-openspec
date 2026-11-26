import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parse} from 'yaml';
import {config, init, update, uninstall} from '../dist/core.js';

const project = fileURLToPath(new URL('../', import.meta.url));
const reference = '.cliewen-openspec/closure.md';
const read = (root, file) => fs.readFileSync(path.join(root, file), 'utf8');
function temporary(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-closure-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  return root;
}
function write(root, file, text) {
  fs.mkdirSync(path.dirname(path.join(root, file)), {recursive: true});
  fs.writeFileSync(path.join(root, file), text);
}

test('closure reference has exact ownership and safe install/update/uninstall semantics', t => {
  const root = temporary(t);
  for (const d of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, d), {recursive: true});
  write(root, 'openspec/config.yaml', 'schema: spec-driven\n');
  write(root, 'docs/notes.md', 'Project knowledge\n');
  write(root, 'AGENTS.md', 'Project instructions\n');
  write(root, '.agents/skills/openspec-archive/SKILL.md', 'Existing OpenSpec skill\n');
  init(root, true, false);
  assert.equal(fs.existsSync(path.join(root, reference)), false);
  init(root, false, false);
  const original = read(root, reference);
  assert.deepEqual(init(root, false, false), []);
  const manifestFile = '.cliewen-openspec/manifest.json';
  const manifest = read(root, manifestFile);
  assert.ok(JSON.parse(manifest).files[reference]);
  write(root, reference, original + '\nUser edit');
  assert.throws(() => update(root), /Conflict/);
  assert.equal(read(root, reference), original + '\nUser edit');
  assert.throws(() => uninstall(root), /Conflict/);
  write(root, reference, original);
  const forged = JSON.parse(manifest);
  forged.files['.cliewen-openspec/other.md'] = forged.files[reference];
  write(root, manifestFile, JSON.stringify(forged));
  assert.throws(() => update(root), /Invalid owned-file entry/);
  write(root, manifestFile, manifest);
  // Simulate an older supported manifest without the newly shipped resource.
  const previous = JSON.parse(manifest); delete previous.files[reference];
  write(root, manifestFile, JSON.stringify(previous));
  write(root, reference, 'Unowned project reference\n');
  assert.throws(() => update(root), /Conflict|unowned|Unowned/);
  fs.unlinkSync(path.join(root, reference));
  const preview = update(root, true);
  assert.ok(preview.writes.includes(reference));
  assert.equal(fs.existsSync(path.join(root, reference)), false);
  update(root);
  assert.equal(read(root, reference), original);
  uninstall(root);
  assert.equal(fs.existsSync(path.join(root, reference)), false);
  assert.equal(read(root, 'docs/notes.md'), 'Project knowledge\n');
  assert.equal(read(root, 'AGENTS.md'), 'Project instructions\n');
  assert.equal(read(root, '.agents/skills/openspec-archive/SKILL.md'), 'Existing OpenSpec skill\n');
});

test('release note defaults and explicit targets preserve project files [NOTE-001] [Test-type: Unit] [Case: configure] [Coverage: positive]', t => {
  const root = temporary(t);
  for (const d of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, d), {recursive: true});
  const settings = '.cliewen-openspec/config.yaml';
  const legacy = '# Existing settings\nfeatures: {review: false}\n';
  write(root, settings, legacy);
  write(root, 'VERSIONS.md', 'Next version\n');
  write(root, 'docs/changes/README.md', 'One entry per change\n');
  init(root, false, false);
  assert.deepEqual(config(root).releaseNotes, {mode: 'auto', path: null});
  update(root, true);
  update(root);
  assert.equal(read(root, settings), legacy);

  for (const [yaml, expected] of [
    ['releaseNotes: {path: VERSIONS.md}', {mode: 'auto', path: 'VERSIONS.md'}],
    ['releaseNotes: {mode: auto, path: docs/changes/}', {mode: 'auto', path: 'docs/changes'}],
    ['releaseNotes: {mode: off, path: VERSIONS.md}', {mode: 'off', path: 'VERSIONS.md'}],
  ]) {
    write(root, settings, yaml);
    assert.deepEqual(config(root).releaseNotes, expected);
    update(root);
    assert.equal(read(root, settings), yaml);
    assert.equal(read(root, 'VERSIONS.md'), 'Next version\n');
    assert.equal(read(root, 'docs/changes/README.md'), 'One entry per change\n');
  }
});

test('release note configuration rejects ambiguous or unsafe paths [NOTE-001] [Test-type: Unit] [Case: invalid-settings] [Coverage: negative]', t => {
  const root = temporary(t);
  const settings = '.cliewen-openspec/config.yaml';
  const unsafe = [
    'null', '[]', '{mode: always}', '{file: VERSIONS.md}', '{path: 4}', '{path: "."}',
    '{path: "../VERSIONS.md"}', '{path: "/VERSIONS.md"}', '{path: "C:VERSIONS.md"}',
    '{path: "docs/*"}', '{path: ".git/config"}', '{path: ".cliewen-openspec/closure.md"}',
  ];
  for (const value of unsafe) {
    const yaml = 'releaseNotes: ' + value;
    write(root, settings, yaml);
    assert.throws(() => config(root), /releaseNotes/);
    assert.equal(read(root, settings), yaml);
  }
});

test('all apply branches expose shared closure guidance [CLOSE-001] [Test-type: Integration] [Case: installed-guidance] [Coverage: positive]', t => {
  const root = temporary(t);
  for (const d of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, d), {recursive: true});
  init(root, false, false);
  const text = read(root, reference);
  const planning = read(root, '.cliewen-openspec/planning.md');
  for (const phrase of ['what actually changed for users', 'use releaseNotes.path when set', 'File names and formats vary', 'without asking again', 'Check for an existing entry before writing', 'preserve surrounding entries']) {
    assert.ok(text.toLowerCase().includes(phrase.toLowerCase()), phrase);
  }
  for (const phrase of ['Assess implementation readiness', 'Use the lower score', 'retry only missing updates']) assert.ok(planning.includes(phrase), phrase);
  for (const phrase of ['exact repository-relative paths to .cliewen-openspec/planning.md and .cliewen-openspec/config.yaml', 'without asking again or posting it back', 'Update only the outcomes, constraints, and verification that the answer settles']) assert.ok(planning.includes(phrase), phrase);
  for (const phrase of ['original request and accepted amendments', 'materially changed plan', 'In either delivery review', 'Keep unresolved items open']) assert.ok(planning.includes(phrase), phrase);
  for (const phrase of ['actual diff, tests, and affected documentation', 'missing behavior from missing or unavailable evidence', 'Preserve the review outcome']) assert.ok(text.includes(phrase), phrase);
  for (const phrase of ['For other schemas, continue their native workflow', 'features.documentation', 'features.decisions', 'learnings.enabled', 'With planning disabled, skip ticket access', 'Off skips its matching policy', 'shared active assertions', 'explicit accepted retirement', 'no synthetic product execution evidence', 'before retrying', '--capability NAME on both the Node adapter and check', 'whole-project scope', 'concrete pending update']) assert.ok(text.includes(phrase), phrase);
  for (const name of ['delivery', 'discovery', 'all']) {
    const schema = parse(read(root, `openspec/schemas/cliewen-${name}/schema.yaml`));
    assert.ok(schema.apply.instruction.includes(reference));
    assert.ok(!schema.artifacts.some(a => a.id === 'closure'));
    const scopeReview = schema.apply.instruction.indexOf('Review delivery scope before implementation');
    assert.equal(scopeReview >= 0, name !== 'discovery', name);
    assert.equal(schema.apply.instruction.includes('readiness.enabled and readiness.threshold'), name !== 'discovery', name);
    if (name === 'all') {
      assert.ok(schema.apply.instruction.indexOf('For outcome: no-change or further-investigation') < scopeReview);
      assert.ok(schema.apply.instruction.includes('Outcome-specific instructions here determine whether the delivery guidance that follows applies.'));
    }
  }
});

test('closure guidance skips disabled and no-delivery paths and keeps unresolved notes advisory [CLOSE-001] [Test-type: Integration] [Case: no-note] [Coverage: negative]', t => {
  const root = temporary(t);
  for (const d of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, d), {recursive: true});
  init(root, false, false);
  const text = read(root, reference);
  assert.match(text, /features\.documentation is false or releaseNotes\.mode is off, skip release note work/);
  assert.match(text, /combined outcomes without delivery require no note/);
  assert.match(text, /wait for agreement before creating it/);
  assert.match(text, /missing or deferred note does not block archive/);
  assert.equal(fs.existsSync(path.join(root, 'CHANGELOG.md')), false);
});

for (const version of ['1.15.0', '1.17.0', '2.0.0']) test(`packed closure guidance and native archive on OpenSpec ${version}`, {timeout: 120000}, t => {
  const root = temporary(t);
  const npm = process.env.npm_execpath; assert.ok(npm, 'Run through npm test');
  const env = {...process.env, OPENSPEC_TELEMETRY: '0', CI: '1'}; delete env.NODE_TEST_CONTEXT;
  function run(exe, args, cwd = root, expected = 0) {
    const r = spawnSync(exe, args, {cwd, env, encoding: 'utf8', timeout: 60000});
    assert.equal(r.error, undefined, String(r.error));
    assert.notEqual(r.status, null, 'A terminated process is not an observed CLI verdict');
    if (expected === null) assert.notEqual(r.status, 0, r.stdout);
    else assert.equal(r.status, expected, `${args.join(' ')}\n${r.stdout}\n${r.stderr}\n${r.error ?? ''}`);
    return r.stdout.trim();
  }
  const pack = JSON.parse(run(process.execPath, [npm, 'pack', '--ignore-scripts', '--json', '--pack-destination', root], project))[0];
  write(root, 'package.json', '{"private":true}');
  run(process.execPath, [npm, 'install', '--ignore-scripts', '--no-audit', '--no-fund', path.join(root, pack.filename), `@fission-ai/openspec@${version}`]);
  const cli = path.join(root, 'node_modules/cliewen-openspec/dist/cli.js');
  const ospec = (...args) => run(process.execPath, [path.join(root, 'node_modules/@fission-ai/openspec/bin/openspec.js'), ...args]);
  assert.equal(ospec('--version'), version);
  ospec('init', '--tools', 'none', '--no-animation');
  const guide = fs.readFileSync(path.join(project, 'docs/guide/workflow.md'), 'utf8');
  const example = guide.match(/```yaml\r?\n(operations:\r?\n[\s\S]*?)```/)[1];
  const entry = parse(example).operations.archive.guidance[0];
  const config = `# Project policy\nschema: spec-driven\ncontext: Existing context\nrules:\n  proposal: [Keep project rules]\noperations:\n  apply:\n    guidance: [Keep apply guidance]\n  archive:\n    guidance:\n      - Keep archive guidance\n      - ${JSON.stringify(entry)}\n`;
  write(root, 'openspec/config.yaml', config);
  run(process.execPath, [cli, 'init']);
  assert.equal(read(root, 'openspec/config.yaml'), config);
  assert.ok(read(root, reference).includes('After the native operation'));
  for (const [name, schema] of [['deliver-example', 'cliewen-delivery'], ['investigate-example', 'cliewen-discovery']]) {
    ospec('new', 'change', name, '--schema', schema);
    const inputs = JSON.parse(ospec('instructions', 'archive', '--change', name, '--json'));
    assert.equal(inputs.context, 'Existing context');
    assert.deepEqual(inputs.operationGuidance, ['Keep archive guidance', entry]);
    assert.ok(parse(read(root, 'openspec/config.yaml')).operations.apply.guidance.includes('Keep apply guidance'));
    const base = `openspec/changes/${name}`;
    write(root, `${base}/proposal.md`, '# Proposal\n\n## Why\nCheck closure.\n\n## What Changes\n- Fixture change.\n\n## Capabilities\n### New Capabilities\n- example: fixture behavior\n\n## Impact\nTest fixture only.\n');
    if (schema === 'cliewen-delivery') {
      write(root, `${base}/design.md`, '# Design\nFixture behavior.\n');
      write(root, `${base}/tasks.md`, '# Tasks\n- [ ] Check fixture.\n');
      write(root, `${base}/specs/example/spec.md`, '## Purpose\nProvide an example capability for checking native archive behavior.\n\n## ADDED Requirements\n\n### Requirement: Example\nThe system SHALL preserve an example requirement.\n\n#### Scenario: Example result\n- **WHEN** the example is requested\n- **THEN** it is returned\n');
      const apply = JSON.parse(ospec('instructions', 'apply', '--change', name, '--json'));
      assert.ok(apply.instruction.includes(reference));
      assert.ok(apply.instruction.includes('Review delivery scope before implementation'));
      assert.ok(apply.instruction.includes('readiness.enabled and readiness.threshold'));
      assert.ok(read(root, reference).includes('actual diff, tests, and affected documentation'));
      write(root, `${base}/tasks.md`, '# Tasks\n- [x] Check fixture.\n');
      ospec('archive', name, '--yes');
      assert.ok(read(root, 'openspec/specs/example/spec.md').includes('Example result'));
    } else {
      write(root, `${base}/investigation.md`, '# Findings\nNo code change is needed; this is a fixture observation.\n');
      write(root, `${base}/decision.md`, '---\nstatus: proposed\n---\n# Recommendation\nRetain the current behavior.\n');
      ospec('archive', name, '--skip-specs', '--yes');
    }
    assert.equal(fs.existsSync(path.join(root, base)), false);
    const destination = fs.readdirSync(path.join(root, 'openspec/changes/archive')).find(d => d.endsWith(name));
    assert.ok(destination);
    assert.ok(fs.existsSync(path.join(root, 'openspec/changes/archive', destination, 'proposal.md')));
    assert.equal(read(root, 'openspec/config.yaml'), config);
    run(process.execPath, [path.join(root, 'node_modules/@fission-ai/openspec/bin/openspec.js'), 'archive', name, '--yes'], root, null);
    assert.ok(fs.existsSync(path.join(root, 'openspec/changes/archive', destination, 'proposal.md')));
  }
  assert.deepEqual(fs.readdirSync(path.join(root, 'openspec/specs')).filter(n => n !== '.gitkeep'), ['example']);
});

for (const [criterion, title, coverage, phrases] of [
  ['CLOSE-002', 'host-review', 'positive', ['available host review command or skill', 'covers that diff', "fits the project's permissions"]],
  ['CLOSE-003', 'local-fallback', 'boundary', ['including local edits', 'Otherwise review the requested diff directly', 'scope, method, concrete findings, and coverage limits']],
]) {
  test(`installed review routing [${criterion}] [Test-type: Integration] [Case: ${title}] [Coverage: ${coverage}]`, t => {
    const root = temporary(t);
    for (const dir of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, dir), {recursive: true});
    write(root, 'openspec/config.yaml', 'schema: spec-driven\n');
    init(root, false, false);
    const guidance = read(root, reference);
    for (const phrase of phrases) assert.ok(guidance.includes(phrase), phrase);
  });
}
