import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {parse} from 'yaml';
import {init, update, uninstall, config} from '../dist/core.js';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-planning-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  for (const dir of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, dir), {recursive: true});
  fs.writeFileSync(path.join(root, 'openspec/config.yaml'), 'schema: spec-driven\n');
  return root;
}
const reference = '.cliewen-openspec/planning.md';
const read = (root, file) => fs.readFileSync(path.join(root, file), 'utf8');

test('planning reference participates in safe owned lifecycle and preserves project instructions', t => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, 'AGENTS.md'), 'Project instructions\n');
  init(root, true, false);
  assert.equal(fs.existsSync(path.join(root, reference)), false);
  init(root, false, false);
  const original = read(root, reference);
  assert.ok(JSON.parse(read(root, '.cliewen-openspec/manifest.json')).files[reference]);
  init(root, false, false);
  assert.equal(read(root, reference), original);
  fs.writeFileSync(path.join(root, reference), original + '\nLocal edits\n');
  assert.throws(() => update(root), /Conflict/);
  assert.equal(read(root, reference), original + '\nLocal edits\n');
  fs.writeFileSync(path.join(root, reference), original);
  update(root);
  fs.writeFileSync(path.join(root, '.cliewen-openspec/config.yaml'), 'features: {planning: false}\n');
  assert.equal(config(root).features.planning, false);
  fs.mkdirSync(path.join(root, 'docs/plans'), {recursive: true});
  fs.writeFileSync(path.join(root, 'docs/plans/project.md'), 'Authored plan\n');
  uninstall(root);
  assert.equal(fs.existsSync(path.join(root, reference)), false);
  assert.equal(read(root, 'AGENTS.md'), 'Project instructions\n');
  assert.equal(read(root, 'docs/plans/project.md'), 'Authored plan\n');
});

test('all schema paths expose shared scoping and conditional planning without changing graphs', t => {
  const root = fixture(t); init(root, false, false);
  const ref = read(root, reference);
  for (const phrase of ['When false, skip planning-authority discovery', 'read access, write capability, and authorization', 'availability as unknown', 'pending manual updates', 'Availability alone does not request an interview', 'grilling dependency', 'ordinary scoping', 'reconcile the current proposal, specs, design, and tasks']) assert.ok(ref.includes(phrase), phrase);
  for (const name of ['delivery', 'discovery', 'all']) {
    const schema = parse(read(root, `openspec/schemas/cliewen-${name}/schema.yaml`));
    for (const instruction of [...schema.artifacts.map(a => a.instruction), schema.apply.instruction]) {
      assert.ok(instruction.includes(reference));
      assert.ok(instruction.includes('features.planning'));
      assert.ok(instruction.includes('Routine understood work needs no challenge report'));
      assert.ok(instruction.includes('Availability alone does not request an interview'));
    }
    assert.ok(!schema.artifacts.some(a => a.id === 'planning'));
  }
});

test('pre-change reference resolves learning policy before planning and the documented entry avoids batched context', t => {
  const root = fixture(t);
  fs.mkdirSync(path.join(root, '.cliewen-openspec'));
  fs.writeFileSync(path.join(root, '.cliewen-openspec/config.yaml'), 'features: {planning: false}\nlearnings: {enabled: true}\n');
  init(root, false, false);
  assert.equal(config(root).features.planning, false);
  assert.equal(config(root).learnings.enabled, true);
  const text = read(root, reference);
  const early = text.slice(text.indexOf('## Before context collection'), text.indexOf('## Optional planning'));
  assert.ok(early.includes('independently of features.planning'));
  assert.ok(early.includes('learnings.enabled (default false) and features.documentation'));
  assert.ok(early.includes('README.md index in a separate tool call'));
  assert.ok(early.includes('open selected notes in a later call'));
  assert.ok(early.includes('skip the collection and preserve authored notes'));
  assert.ok(early.includes('not permission to read the whole collection'));
  const guide = fs.readFileSync(new URL('../docs/configuration.md', import.meta.url), 'utf8');
  const section = guide.split('### Instructions before context collection')[1].split('## Humanizer')[0];
  const entry = section.match(/```text\r?\n([\s\S]*?)```/)[1];
  assert.ok(entry.includes('first read only .cliewen-openspec/config.yaml and .cliewen-openspec/planning.md'));
  assert.ok(entry.includes('without batching project documents or lesson contents'));
  assert.ok(entry.includes('independently of features.planning'));
  assert.equal(fs.existsSync(path.join(root, 'docs/learnings')), false);
});
