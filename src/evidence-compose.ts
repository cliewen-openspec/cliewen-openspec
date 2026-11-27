import fs from 'node:fs';
import path from 'node:path';
import {createHash, randomUUID} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {config, git, local} from './core.js';
import {withStateLock} from './state-lock.js';

type Scope = {change: string} | {capability: string};
type Result = {scenario: string; test: string; testType: string; outcome: string; reason?: string};
type Report = {version: 1; revision: string; scope?: Scope; execution: {exitCode: number}; results: Result[]};

function validateReport(value: unknown, source: string): asserts value is Report {
  const report = value as Partial<Report> & {sources?: unknown} | null;
  const invalid = (reason: string) => Error(`${source}: ${reason}`);
  if (!report || report.version !== 1 || typeof report.revision !== 'string' || !/^[a-f0-9]{40,64}$/.test(report.revision) || !Array.isArray(report.results)) {
    throw invalid('Expected version 1 evidence with a full revision and results');
  }
  if (report.sources !== undefined) throw invalid('Compose original runner reports rather than a combined report');
  if (!Number.isInteger(report.execution?.exitCode)) throw invalid('Missing or invalid runner exit code');
  if (report.scope !== undefined) {
    const scope = report.scope;
    if (!scope || typeof scope !== 'object' || Array.isArray(scope)) throw invalid('Invalid evidence scope');
    const entries = Object.entries(scope);
    if (entries.length !== 1 || !['change', 'capability'].includes(entries[0][0]) ||
        typeof entries[0][1] !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entries[0][1])) {
      throw invalid('Invalid evidence scope');
    }
  }
  for (const row of report.results) {
    if (!row || typeof row.scenario !== 'string' || !/^[A-Z][A-Z0-9]*-\d+$/.test(row.scenario) || typeof row.test !== 'string' || !row.test.trim() ||
        typeof row.testType !== 'string' || !row.testType.trim() || !['passed', 'failed', 'skipped', 'pending', 'manual'].includes(row.outcome) ||
        (row.outcome === 'pending' && (typeof row.reason !== 'string' || !row.reason.trim()))) {
      throw invalid('Invalid evidence result');
    }
  }
}

export function composeExecutionEvidence(root: string, filenames: string[]) {
  if (filenames.length < 2) throw Error('Pass at least two original reports to evidence compose');
  return withStateLock(root, () => {
    const settings = config(root);
    const output = local(root, settings.evidence.report);
    const inputs = filenames.map(filename => local(root, filename));
    const comparePath = (file: string) => process.platform === 'win32' ? file.toLowerCase() : file;
    if (inputs.some(file => comparePath(file) === comparePath(output))) throw Error('The evidence output cannot also be a source');
    if (git(root, ['status', '--porcelain', '--untracked-files=all'])) throw Error('Commit project inputs before composing evidence');
    try {
      execFileSync('git', ['-C', root, 'check-ignore', '-q', '--', output], {stdio: 'ignore'});
    } catch { throw Error('The combined evidence output must be Git-ignored and untracked'); }
    fs.rmSync(output, {force: true});
    if (new Set(inputs.map(comparePath)).size !== inputs.length) throw Error('Pass each source report once');

    const revision = git(root, ['rev-parse', 'HEAD']);
    const sources: {path: string; sha256: string; exitCode: number; resultCount: number}[] = [];
    const results: Result[] = [];
    const resultIds = new Set<string>();
    let scope: Scope | undefined;
    let exitCode = 0;
    for (const file of inputs) {
      const source = path.relative(root, file).split(path.sep).join('/');
      const bytes = fs.readFileSync(file);
      let report: unknown;
      try { report = JSON.parse(bytes.toString('utf8')); }
      catch { throw Error(`${source}: malformed JSON report`); }
      validateReport(report, source);
      if (report.revision !== revision) throw Error(`${source}: evidence revision differs from HEAD`);
      if (!sources.length) scope = report.scope;
      else if (!isDeepStrictEqual(scope, report.scope)) throw Error(`${source}: evidence scope differs from the first report`);
      for (const row of report.results) {
        const key = `${row.scenario}:${row.test}`;
        if (resultIds.has(key)) throw Error(`${source}: duplicate test result ${key}`);
        resultIds.add(key);
        results.push(row);
      }
      const sourceExitCode = report.execution.exitCode;
      if (!exitCode) exitCode = sourceExitCode;
      sources.push({path: source, sha256: createHash('sha256').update(bytes).digest('hex'), exitCode: sourceExitCode, resultCount: report.results.length});
    }
    if (git(root, ['rev-parse', 'HEAD']) !== revision || git(root, ['status', '--porcelain', '--untracked-files=all'])) {
      throw Error('Repository inputs changed during evidence composition');
    }
    fs.mkdirSync(path.dirname(output), {recursive: true});
    const temporary = `${output}.${randomUUID()}.tmp`;
    try {
      fs.writeFileSync(temporary, JSON.stringify({version: 1, revision, scope, execution: {exitCode}, sources, results}, null, 2) + '\n', {flag: 'wx'});
      fs.renameSync(temporary, output);
    } finally {
      fs.rmSync(temporary, {force: true});
    }
    return {report: settings.evidence.report, revision, sources, exitCode};
  });
}
