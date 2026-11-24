import {Resolver} from 'node:dns/promises';
import {request as httpRequest} from 'node:http';
import {request as httpsRequest} from 'node:https';
import {BlockList, isIP} from 'node:net';

export const externalLinkLimits = {destinations: 100, sources: 1000, urlBytes: 4096, concurrency: 6, probeMilliseconds: 4000, totalMilliseconds: 20000};
export type ExternalLinkSource = {path: string; line: number};
type Outcome = {status: 'reachable' | 'redirected' | 'missing' | 'restricted' | 'skipped' | 'inconclusive'; httpStatus?: number; reason?: string};
type Resolve = (hostname: string, signal: AbortSignal) => Promise<string[]>;
type Request = (url: URL, address: string, method: 'HEAD' | 'GET', signal: AbortSignal) => Promise<number>;

const deniedV4 = new BlockList();
for (const [network, bits] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24],
  ['192.88.99.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 3],
] as const) deniedV4.addSubnet(network, bits);
const globalV6 = new BlockList();
globalV6.addSubnet('2000::', 3, 'ipv6');
const deniedV6 = new BlockList();
for (const [network, bits] of [['2001::', 23], ['2001:db8::', 32], ['2002::', 16], ['3fff::', 20]] as const) {
  deniedV6.addSubnet(network, bits, 'ipv6');
}

function publicAddress(address: string): boolean {
  if (isIP(address) === 4) return !deniedV4.check(address);
  return isIP(address) === 6 && globalV6.check(address, 'ipv6') && !deniedV6.check(address, 'ipv6');
}

async function resolvePublicHost(hostname: string, signal: AbortSignal): Promise<string[]> {
  signal.throwIfAborted();
  const resolver = new Resolver({timeout: 1500, tries: 1});
  const cancel = () => resolver.cancel();
  signal.addEventListener('abort', cancel, {once: true});
  try {
    const results = await Promise.allSettled([resolver.resolve4(hostname), resolver.resolve6(hostname)]);
    return results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
  } finally {
    signal.removeEventListener('abort', cancel);
  }
}

function requestStatus(url: URL, address: string, method: 'HEAD' | 'GET', signal: AbortSignal): Promise<number> {
  return new Promise((resolve, reject) => {
    const secure = url.protocol === 'https:';
    const hostname = url.hostname.replace(/^\[|\]$/g, '');
    // Connect to the address we checked while preserving the original HTTP and TLS identity.
    const request = (secure ? httpsRequest : httpRequest)({
      hostname: address,
      port: secure ? 443 : 80,
      servername: isIP(hostname) ? undefined : hostname,
      path: url.pathname + url.search,
      method,
      headers: {host: url.host, 'user-agent': 'cliewen-openspec external-link-check'},
      agent: false,
      maxHeaderSize: 16384,
      signal,
    }, response => {
      resolve(response.statusCode ?? 0);
      response.destroy();
    });
    request.once('error', reject);
    request.end();
  });
}

export async function probeExternalLink(
  url: URL, signal: AbortSignal, resolve: Resolve = resolvePublicHost, request: Request = requestStatus,
): Promise<Outcome> {
  const hostname = url.hostname.replace(/^\[|\]$/g, '').replace(/\.$/, '');
  if (url.username || url.password || url.port || (!isIP(hostname) && (!hostname.includes('.') || /\.(?:localhost|local|internal|home\.arpa|onion)$/i.test(hostname)))) {
    return {status: 'skipped', reason: 'Only public URLs on default ports without credentials are checked.'};
  }
  try {
    signal.throwIfAborted();
    const addresses = isIP(hostname) ? [hostname] : await resolve(hostname, signal);
    if (!addresses.length) return {status: 'inconclusive', reason: 'DNS returned no address.'};
    const address = addresses.find(publicAddress);
    if (!address) return {status: 'skipped', reason: 'The destination has no eligible public address.'};

    let httpStatus = await request(url, address, 'HEAD', signal);
    if (httpStatus === 405 || httpStatus === 501) httpStatus = await request(url, address, 'GET', signal);
    if (httpStatus >= 200 && httpStatus < 300) return {status: 'reachable', httpStatus};
    if ([300, 301, 302, 303, 307, 308].includes(httpStatus)) return {status: 'redirected', httpStatus};
    if (httpStatus === 404 || httpStatus === 410) return {status: 'missing', httpStatus};
    if (httpStatus === 401 || httpStatus === 403 || httpStatus === 451) return {status: 'restricted', httpStatus};
    return {status: 'inconclusive', httpStatus};
  } catch {
    return {status: 'inconclusive', reason: signal.aborted ? 'Time limit reached.' : 'The request could not be completed.'};
  }
}

export class ExternalLinks {
  private readonly destinations = new Map<string, {url: URL; sources: ExternalLinkSource[]}>();
  private sources = 0;
  private omitted = 0;
  collectionIncomplete = false;

  add(href: string, source: ExternalLinkSource): void {
    if (!/^https?:\/\//i.test(href)) return;
    if (Buffer.byteLength(href) > externalLinkLimits.urlBytes || this.sources >= externalLinkLimits.sources) {
      this.omitted++;
      return;
    }
    let url: URL;
    try {url = new URL(href);} catch {this.omitted++; return;}
    url.hash = '';
    const key = url.href;
    let entry = this.destinations.get(key);
    if (!entry) {
      if (this.destinations.size >= externalLinkLimits.destinations) {this.omitted++; return;}
      entry = {url, sources: []};
      this.destinations.set(key, entry);
    }
    entry.sources.push(source);
    this.sources++;
  }

  async report(probe = probeExternalLink) {
    const deadline = AbortSignal.timeout(externalLinkLimits.totalMilliseconds);
    const entries = [...this.destinations.values()];
    const results = new Array<Outcome>(entries.length);
    let next = 0;
    const worker = async () => {
      while (next < entries.length && !deadline.aborted) {
        const index = next++;
        const signal = AbortSignal.any([deadline, AbortSignal.timeout(externalLinkLimits.probeMilliseconds)]);
        results[index] = await probe(entries[index].url, signal);
      }
    };
    await Promise.all(Array.from({length: Math.min(entries.length, externalLinkLimits.concurrency)}, worker));
    return {
      limits: externalLinkLimits,
      omittedReferences: this.omitted,
      collectionIncomplete: this.collectionIncomplete,
      results: entries.map(({url, sources}, index) => {
        const display = new URL(url);
        display.username = '';
        display.password = '';
        return {
          url: display.href,
          sources,
          ...(results[index] ?? {status: 'inconclusive' as const, reason: 'Report time limit reached before probing.'}),
        };
      }),
    };
  }
}
