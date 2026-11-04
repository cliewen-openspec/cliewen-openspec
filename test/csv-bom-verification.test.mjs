import {test} from 'node:test';
import assert from 'node:assert/strict';
import {exportCsv} from '../docs/examples/csv/export.mjs';
import {verifyCsvBom} from '../scripts/lib/csv-bom-verification.mjs';

const withBom = (rows, columns, {bom = false} = {}) => (bom ? '\uFEFF' : '') + exportCsv(rows, columns);

test('independent BOM verification accepts preservation of marker-like input content', () => {
  verifyCsvBom(withBom);
});

test('independent BOM verification detects default-output data stripping', () => {
  const stripContent = (rows, columns, options) => {
    const output = withBom(rows, columns, options);
    return options?.bom ? output : output.replaceAll('\uFEFF', '');
  };
  assert.throws(() => verifyCsvBom(stripContent), /Preserve caller-supplied U\+FEFF/);
});

test('independent BOM verification detects stripping only a caller-supplied header prefix', () => {
  const stripHeader = (rows, columns, options) => {
    const output = withBom(rows, columns, options);
    return options?.bom ? output : output.replace(/^\uFEFF/, '');
  };
  assert.throws(() => verifyCsvBom(stripHeader), /Preserve caller-supplied U\+FEFF/);
});
