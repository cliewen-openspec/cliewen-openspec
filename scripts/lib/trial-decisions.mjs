import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {parse} from 'yaml';

export function readAcceptedCombinedDecision(folder) {
  const text = fs.readFileSync(path.join(folder, 'decision.md'), 'utf8');
  const decision = parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '');
  assert.equal(decision?.type, 'decision');
  assert.equal(decision.status, 'accepted');
  assert.equal(decision.outcome, 'delivery');
  assert.equal(fs.existsSync(path.join(folder, 'design.md')), false, 'The combined decision is the sole design source');
  return decision;
}
