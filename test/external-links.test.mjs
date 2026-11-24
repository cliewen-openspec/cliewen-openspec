import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ExternalLinks, externalLinkLimits, probeExternalLink} from '../dist/external-links.js';

const signal = new AbortController().signal;
const publicAddress = '93.184.216.34';
const hostname = new URL('https://docs.example.org/a?version=1');

test('external probe classifies HTTP outcomes [DOCS-002] [Test-type: Unit] [Case: response-status] [Coverage: negative]', async () => {
  const cases = [
    [204, 'reachable'], [301, 'redirected'], [307, 'redirected'], [404, 'missing'],
    [410, 'missing'], [401, 'restricted'], [403, 'restricted'], [451, 'restricted'],
    [429, 'inconclusive'], [503, 'inconclusive'], [304, 'inconclusive'],
  ];
  for (const [status, expected] of cases) {
    const methods = [];
    const result = await probeExternalLink(hostname, signal, async () => [publicAddress], async (url, address, method) => {
      assert.equal(url, hostname);
      assert.equal(address, publicAddress);
      methods.push(method);
      return status;
    });
    assert.deepEqual(result, {status: expected, httpStatus: status});
    assert.deepEqual(methods, ['HEAD']);
  }
});

test('external probe falls back to GET when HEAD is unsupported [DOCS-002] [Test-type: Unit] [Case: head-fallback] [Coverage: positive]', async () => {
  for (const unsupported of [405, 501]) {
    const methods = [];
    const result = await probeExternalLink(hostname, signal, async () => [publicAddress], async (_url, _address, method) => {
      methods.push(method);
      return method === 'HEAD' ? unsupported : 200;
    });
    assert.equal(result.status, 'reachable');
    assert.deepEqual(methods, ['HEAD', 'GET']);
  }
});

test('external probe skips nonpublic destinations and pins the connection to a public DNS answer [DOCS-003] [Test-type: Unit] [Case: address-safety] [Coverage: negative]', async () => {
  const unexpected = () => assert.fail('Unsafe destination triggered a request');
  const noDNS = () => assert.fail('Literal or excluded hostname triggered DNS');
  for (const target of [
    'http://127.1/', 'http://0x7f000001/', 'http://169.254.169.254/', 'http://100.64.0.1/',
    'http://192.168.0.1/', 'http://224.0.0.2/', 'http://[::ffff:127.0.0.1]/',
    'http://[::1]/', 'http://[fc00::1]/', 'http://[2002:7f00:1::]/',
    'http://docs.example.org:8080/', 'https://user:secret@docs.example.org/', 'http://host.local/',
  ]) {
    assert.equal((await probeExternalLink(new URL(target), signal, noDNS, unexpected)).status, 'skipped');
  }
  assert.equal((await probeExternalLink(hostname, signal, async () => ['10.0.0.1'], unexpected)).status, 'skipped');
  assert.equal((await probeExternalLink(hostname, signal, async () => [], unexpected)).status, 'inconclusive');
  const result = await probeExternalLink(hostname, signal, async () => ['127.0.0.1', '2606:4700::1'], async (_url, address) => {
    assert.equal(address, '2606:4700::1');
    return 200;
  });
  assert.equal(result.status, 'reachable');
  const timeout = await probeExternalLink(hostname, AbortSignal.abort(), noDNS, unexpected);
  assert.deepEqual(timeout, {status: 'inconclusive', reason: 'Time limit reached.'});
});

test('external report deduplicates fragments, retains sources and discloses omitted references [DOCS-003] [Test-type: Unit] [Case: bounded-report] [Coverage: positive]', async () => {
  const links = new ExternalLinks();
  const source = {path: 'docs/guide.md', line: 1};
  links.add('https://example.org/#one', source);
  links.add('https://example.org/#two', {...source, line: 2});
  links.add('https://user:secret@example.org/', source);
  for (let i = 0; i < externalLinkLimits.destinations; i++) links.add('https://example.org/' + i, source);
  const requests = [];
  const report = await links.report(async url => {requests.push(url.href); return {status: 'reachable'};});
  assert.equal(requests.length, externalLinkLimits.destinations);
  assert.equal(report.omittedReferences, 2);
  assert.deepEqual(report.results[0].sources, [source, {...source, line: 2}]);
  assert.equal(report.results[0].url, 'https://example.org/');
  assert.doesNotMatch(JSON.stringify(report), /secret/);
});
