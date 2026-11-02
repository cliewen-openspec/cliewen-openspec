import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseCount} from '../count.mjs';

test('accepts 99 [COUNT-003] [Test-type: Unit] [Case: maximum] [Coverage: boundary]', () => {
  assert.equal(parseCount('99'), 99);
});

test('rejects 100 [COUNT-003] [Test-type: Unit] [Case: above-maximum] [Coverage: negative]', () => {
  assert.throws(() => parseCount('100'), RangeError);
});
