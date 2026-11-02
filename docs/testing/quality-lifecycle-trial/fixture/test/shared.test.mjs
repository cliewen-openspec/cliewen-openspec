import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseCount} from '../count.mjs';

// This test combines the upper limit with an input-format obligation that remains active.
test('checks limit and malformed input [COUNT-003] [Test-type: Unit] [Case: shared] [Coverage: negative]', () => {
  assert.throws(() => parseCount('100'), RangeError);
  assert.throws(() => parseCount('garbage'), TypeError);
});
