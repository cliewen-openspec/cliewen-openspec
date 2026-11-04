import assert from 'node:assert/strict';

// Evaluator assertions for the observed third-argument Boolean option API.
export function verifyCsvBom(exportCsv) {
  const rows = [{name: 'Søren, "Åse"', note: 'one\r\ntwo'}, {name: '東京', note: ''}];
  const columns = ['name', 'note'];
  const payload = 'name,note\r\n"Søren, ""Åse""","one\r\ntwo"\r\n東京,\r\n';
  for (const options of [undefined, {}, {bom: false}]) assert.equal(exportCsv(rows, columns, options), payload);
  assert.equal(exportCsv(rows, columns, {bom: true}), '\uFEFF' + payload);
  assert.deepEqual(Buffer.from(exportCsv(rows, columns, {bom: true}), 'utf8'), Buffer.concat([Buffer.from([239, 187, 191]), Buffer.from(payload, 'utf8')]));
  assert.equal(exportCsv([], ['a,b', 'c"d'], {bom: true}), '\uFEFF"a,b","c""d"\r\n');
  assert.equal(exportCsv([], ['a,b', 'c"d']), '"a,b","c""d"\r\n');

  // U+FEFF inside supported input is content even when marker insertion is disabled.
  for (const sample of [
    {rows: [{value: '\uFEFFAda'}], columns: ['value'], payload: 'value\r\n\uFEFFAda\r\n'},
    {rows: [{'\uFEFFname': 'Ada'}], columns: ['\uFEFFname'], payload: '\uFEFFname\r\nAda\r\n'},
  ]) {
    for (const options of [undefined, {}, {bom: false}, {bom: true}]) {
      const expected = (options?.bom ? '\uFEFF' : '') + sample.payload;
      const actual = exportCsv(sample.rows, sample.columns, options);
      assert.equal(actual, expected, 'Preserve caller-supplied U+FEFF while adding only the requested prefix');
      assert.deepEqual(Buffer.from(actual, 'utf8'), Buffer.from(expected, 'utf8'));
    }
  }
}
