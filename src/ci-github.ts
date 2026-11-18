import {execFileSync} from 'node:child_process';
import {accessSync, constants, statSync} from 'node:fs';
import path from 'node:path';

export const ciLimits = {requestMilliseconds: 10000, totalMilliseconds: 60000, responseBytes: 1048576, pages: 10, pageSize: 100, rulesets: 32};
export type HostResponse = {status: number; data?: unknown; next?: boolean; problem?: string};
export type HostAccess = (endpoint: string) => HostResponse;
type Execute = (file: string, args: string[], options: Parameters<typeof execFileSync>[2]) => string;

function githubExecutable(): string | undefined {
  const windows = process.platform === 'win32';
  for (const entry of (process.env.PATH ?? '').split(path.delimiter)) {
    const directory = windows ? entry.replace(/^"|"$/g, '') : entry;
    // An absolute executable avoids the implicit current-directory search on Windows.
    if (!path.isAbsolute(directory)) continue;
    const candidate = path.resolve(directory, windows ? 'gh.exe' : 'gh');
    try {
      if (!statSync(candidate).isFile()) continue;
      if (!windows) accessSync(candidate, constants.X_OK);
      return candidate;
    } catch { /* Continue to the next PATH entry. */ }
  }
}

// Only fixed GET requests reach gh. Error bodies and stderr can contain secrets.
export function githubAccess(execute?: Execute, now = () => performance.now()): HostAccess {
  const end = now() + ciLimits.totalMilliseconds;
  const executable = execute ? 'gh' : githubExecutable();
  const run = execute ?? ((file, args, options) => String(execFileSync(file, args, options)));
  return endpoint => {
    const remaining = end - now();
    if (remaining <= 0) return {status: 0, problem: 'inspection-deadline'};
    if (!executable) return {status: 0, problem: 'github-cli-unavailable'};
    let output = '';
    try {
      output = run(executable, ['api', '--hostname', 'github.com', '--method', 'GET', '--include', '-H', 'Accept: application/vnd.github+json', '-H', 'X-GitHub-Api-Version: 2022-11-28', endpoint], {
        encoding: 'utf8', timeout: Math.max(1, Math.floor(Math.min(remaining, ciLimits.requestMilliseconds))), killSignal: 'SIGKILL',
        maxBuffer: ciLimits.responseBytes, stdio: ['ignore', 'pipe', 'pipe'],
        env: {...process.env, GH_PROMPT_DISABLED: '1', GH_NO_UPDATE_NOTIFIER: '1', GH_NO_EXTENSION_UPDATE_NOTIFIER: '1', GH_DEBUG: '', PAGER: 'cat', GH_PAGER: 'cat'}
      });
    } catch (error) {
      const e = error as NodeJS.ErrnoException & {stdout?: string | Buffer; signal?: string};
      if (e.code === 'ENOENT') return {status: 0, problem: 'github-cli-unavailable'};
      if (e.code === 'ENOBUFS') return {status: 0, problem: 'response-limit'};
      if (e.code === 'ETIMEDOUT' || e.signal) return {status: 0, problem: 'request-deadline'};
      output = String(e.stdout ?? '');
      const status = /^HTTP\/\S+ (\d{3})/m.exec(output)?.[1];
      return {status: Number(status ?? 0), problem: status ? `http-${status}` : 'host-access-unavailable'};
    }
    if (now() > end) return {status: 0, problem: 'inspection-deadline'};
    if (Buffer.byteLength(output) > ciLimits.responseBytes) return {status: 0, problem: 'response-limit'};
    const split = /\r?\n\r?\n/.exec(output);
    const status = Number(/^HTTP\/\S+ (\d{3})/m.exec(output)?.[1] ?? 0);
    if (!split || status !== 200) return {status, problem: status ? `http-${status}` : 'malformed-response'};
    const headers = output.slice(0, split.index);
    try {
      return {status, data: JSON.parse(output.slice(split.index + split[0].length)), next: /^link:.*\brel="?next"?/im.test(headers)};
    } catch {return {status, problem: 'malformed-response'};}
  };
}
