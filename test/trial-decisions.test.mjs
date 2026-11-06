import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {readAcceptedCombinedDecision} from '../scripts/lib/trial-decisions.mjs';

test('archived combined authority needs accepted delivery, without requiring a duplicate decision directory', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-decision-authority-'));
  t.after(() => {
    const relative = path.relative(os.tmpdir(), root);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
    fs.rmSync(root, {recursive: true, force: true});
  });
  const folder = path.join(root, 'openspec/changes/archive/2026-11-07-count-range');
  fs.mkdirSync(folder, {recursive: true});
  const write = fields => fs.writeFileSync(path.join(folder, 'decision.md'), `---\n${fields}\n---\n# Count-range agreement\n`);
  write('type: decision\nstatus: accepted\noutcome: delivery');
  assert.equal(fs.existsSync(path.join(root, 'docs/decisions')), false);
  assert.equal(readAcceptedCombinedDecision(folder).status, 'accepted');
  for (const invalid of [
    'type: decision\nstatus: proposed\noutcome: delivery',
    'type: decision\nstatus: accepted\noutcome: no-change',
    'status: accepted\noutcome: delivery',
  ]) {
    write(invalid);
    assert.throws(() => readAcceptedCombinedDecision(folder));
  }
  write('type: decision\nstatus: accepted\noutcome: delivery');
  fs.writeFileSync(path.join(folder, 'design.md'), '# Conflicting design source\n');
  assert.throws(() => readAcceptedCombinedDecision(folder), /sole design source/);
});
