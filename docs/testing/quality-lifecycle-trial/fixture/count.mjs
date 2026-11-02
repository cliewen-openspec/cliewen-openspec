export function parseCount(value) {
  if (typeof value !== 'string' || !/^(0|[1-9]\d*)$/.test(value)) throw new TypeError('Use canonical decimal text');
  const count = Number(value);
  if (!Number.isSafeInteger(count) || count < 1 || count > 99) throw new RangeError('Count must be between 1 and 99');
  return count;
}
