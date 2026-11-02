import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseCount} from '../count.mjs';

test('parses text [COUNT-001] [Test-type: Unit] [Case: two] [Coverage: positive]', () => {
  assert.equal(typeof parseCount('2'), 'number');
});

test('accepts positive counts [COUNT-002] [Test-type: Unit] [Case: one] [Coverage: positive]', () => {
  assert.equal(parseCount('1'), 1);
});

test('rejects zero [COUNT-002] [Test-type: Unit] [Case: zero] [Coverage: boundary]', () => {
  assert.throws(() => parseCount('0'), RangeError);
});
