import {config} from './core.js';
import {ciBranch, ciText, type ExpectedCheck} from './ci-settings.js';
import {githubAccess, ciLimits, type HostAccess, type HostResponse} from './ci-github.js';
import {requirements, meetsMinimum} from './release.js';

type Check = {context: string; appId: number | null};
type Bypass = {status: 'possible' | 'none-observed' | 'unknown'; reason: string};
type Source = {id: string; kind: 'classic' | 'effective-rules' | 'ruleset'; status: 'available' | 'absent' | 'unknown'; checks: Check[]; bypass: Bypass; problem?: string};
type CheckResult = ExpectedCheck & {status: 'observed' | 'missing' | 'unknown'; sources: string[]};
export type CIReport = {
  version: 1; inspectedAt: string; mode: 'off' | 'advisory'; status: 'off' | 'not-configured' | 'observed' | 'missing' | 'unknown'; exitCode: 0;
  target: {host: 'github.com'; repository: string | null; branch: string | null}; checks: CheckResult[]; sources: Source[];
  coverage: {complete: boolean; limits: typeof ciLimits; notes: string[]}; findings: {code: string; message: string}[];
};
const object = (v: unknown): v is Record<string, any> => !!v && typeof v === 'object' && !Array.isArray(v);
const unknownBypass = (): Bypass => ({status: 'unknown', reason: 'Bypass information is unavailable; no actor-specific conclusion is made.'});
const source = (id: string, kind: Source['kind']): Source => ({id, kind, status: 'unknown', checks: [], bypass: unknownBypass()});
const positiveID = (v: unknown): v is number => Number.isSafeInteger(v) && (v as number) > 0;
function checks(raw: unknown, binding: string): Check[] | undefined {
  if (!Array.isArray(raw)) return;
  const result: Check[] = [];
  for (const item of raw) {
    if (!object(item) || !ciText(item.context)) return;
    const id = item[binding];
    if (id !== undefined && id !== null && id !== -1 && !positiveID(id)) return;
    result.push({context: item.context, appId: positiveID(id) ? id : null});
  }
  return result;
}

function ruleChecks(rule: Record<string, unknown>): Check[] | undefined {
  return object(rule.parameters) ? checks(rule.parameters.required_status_checks, 'integration_id') : undefined;
}

function rulesetChecksAgree(current: unknown, previouslyObserved: Check[]): boolean {
  if (!Array.isArray(current)) return false;
  const identity = (check: Check) => JSON.stringify([check.context, check.appId]);
  const expected = new Set(previouslyObserved.map(identity));
  const seen = new Set<string>();
  for (const rule of current) {
    if (!object(rule) || !ciText(rule.type)) return false;
    if (rule.type !== 'required_status_checks') continue;
    const list = ruleChecks(rule);
    if (!list) return false;
    for (const check of list) seen.add(identity(check));
  }
  return expected.size === seen.size && [...expected].every(check => seen.has(check));
}

function branchReportsClassicProtection(protection: unknown): boolean {
  if (!object(protection)) return false;
  if (protection.enabled === true) return true;
  const required = protection.required_status_checks;
  if (!object(required)) return false;
  return (Array.isArray(required.checks) && required.checks.length > 0)
    || (Array.isArray(required.contexts) && required.contexts.length > 0)
    || ['everyone', 'non_admins'].includes(required.enforcement_level);
}

function classicProtection(response: HostResponse): Source {
  const s = source('classic', 'classic');
  if (response.problem || response.status !== 200 || !object(response.data)) {s.problem = response.problem ?? 'classic-unavailable'; return s;}
  const raw = response.data, required = raw.required_status_checks;
  if (required === null || required === undefined) s.status = 'available';
  else if (object(required)) {
    const bound = required.checks === undefined ? [] : checks(required.checks, 'app_id');
    const contexts = required.contexts;
    if (!bound || (contexts !== undefined && (!Array.isArray(contexts) || !contexts.every(ciText))) || (required.checks === undefined && contexts === undefined)) {s.problem = 'malformed-classic-checks'; return s;}
    s.checks = [...bound, ...(contexts ?? []).filter((c: string) => !bound.some(b => b.context === c)).map((context: string) => ({context, appId: null}))];
    s.status = 'available';
  } else {s.problem = 'malformed-classic-protection'; return s;}
  if (object(raw.enforce_admins) && typeof raw.enforce_admins.enabled === 'boolean') s.bypass = raw.enforce_admins.enabled
    ? {status: 'none-observed', reason: 'Classic protection reports administrator enforcement; actor permissions were not resolved.'}
    : {status: 'possible', reason: 'Classic protection exempts administrators; no actual bypass event was inspected.'};
  return s;
}
// Known non-check rules do not prevent a status-check conclusion. New policy types
// stay incomplete until their effect on the supported contract is understood.
const otherRules = new Set(['creation', 'update', 'deletion', 'required_linear_history', 'merge_queue', 'required_deployments', 'required_signatures', 'pull_request', 'non_fast_forward', 'commit_message_pattern', 'commit_author_email_pattern', 'committer_email_pattern', 'branch_name_pattern', 'tag_name_pattern', 'file_path_restriction', 'file_extension_restriction', 'max_file_path_length', 'max_file_size', 'code_scanning', 'code_quality', 'copilot_code_review']);

export function inspectCI(root: string, suppliedAccess?: HostAccess): CIReport {
  if (!meetsMinimum(process.versions.node, requirements.node)) throw Error(`Node ${process.versions.node} is unsupported; requires Node ${requirements.node}+. Install a compatible Node runtime and rerun ci inspect.`);
  const settings = config(root).ciInspection;
  const report: CIReport = {version: 1, inspectedAt: new Date().toISOString(), mode: settings.mode, status: 'unknown', exitCode: 0,
    target: {host: 'github.com', repository: settings.repository, branch: settings.branch}, checks: settings.requiredChecks.map(c => ({...c, status: 'unknown', sources: []})), sources: [],
    coverage: {complete: false, limits: {...ciLimits}, notes: ['This is a non-atomic policy snapshot, not current CI results, test quality or integration authorization.', 'Coverage is limited to GitHub.com status-check requirements; actor-specific permissions are not resolved.']}, findings: []};
  const finding = (code: string, message: string) => report.findings.push({code, message});
  if (settings.mode === 'off') {report.status = 'off'; return report;}
  if (!settings.repository || !settings.requiredChecks.length) {
    report.status = 'not-configured'; finding('ci-not-configured', 'Select ciInspection.repository and a nonempty requiredChecks list before host access.'); return report;
  }
  const access = suppliedAccess ?? githubAccess();
  const repo = `repos/${settings.repository.split('/').map(encodeURIComponent).join('/')}`;
  const metadata = access(repo);
  if (metadata.problem || metadata.status !== 200 || !object(metadata.data) || !ciText(metadata.data.full_name) || metadata.data.full_name.toLowerCase() !== settings.repository.toLowerCase()) {
    finding('ci-target-unknown', `Repository identity could not be confirmed (${metadata.problem ?? 'invalid-repository-response'}).`); return report;
  }
  const branch = settings.branch ?? metadata.data.default_branch;
  if (!ciBranch(branch)) {finding('ci-target-unknown', 'A valid target branch could not be resolved.'); return report;}
  report.target.branch = branch;
  const branchPath = `${repo}/branches/${encodeURIComponent(branch)}`, branchResponse = access(branchPath);
  if (branchResponse.problem || branchResponse.status !== 200 || !object(branchResponse.data) || branchResponse.data.name !== branch || typeof branchResponse.data.protected !== 'boolean') {
    finding('ci-target-unknown', `The selected branch could not be confirmed (${branchResponse.problem ?? 'invalid-branch-response'}).`); return report;
  }
  const classicResponse = access(`${branchPath}/protection`), classic = classicProtection(classicResponse);
  const effective = source('effective-rules', 'effective-rules');
  // This source records collection coverage. Individual rulesets retain their own exceptions.
  effective.bypass = {status: 'unknown', reason: 'See individual ruleset sources for bypass visibility.'};
  report.sources.push(classic, effective);
  const ruleSources = new Map<string, {s: Source; id: number; origin: string; originType: string}>();
  let rulesComplete = false, ruleCount = 0;
  for (let page = 1; page <= ciLimits.pages; page++) {
    const response = access(`${repo}/rules/branches/${encodeURIComponent(branch)}?per_page=${ciLimits.pageSize}&page=${page}`);
    if (response.problem || response.status !== 200 || !Array.isArray(response.data) || response.data.length > ciLimits.pageSize) {effective.problem = response.problem ?? 'malformed-rules'; break;}
    ruleCount += response.data.length;
    for (const rule of response.data) {
      if (!object(rule) || !ciText(rule.type)) {effective.problem = 'malformed-rule'; continue;}
      if (rule.type !== 'required_status_checks') {
        if (!otherRules.has(rule.type)) effective.problem = 'unsupported-policy-type';
        continue;
      }
      const list = ruleChecks(rule);
      if (!list || !positiveID(rule.ruleset_id) || !ciText(rule.ruleset_source) || !['Repository', 'Organization', 'Enterprise'].includes(rule.ruleset_source_type)) {effective.problem = 'malformed-check-rule'; continue;}
      const key = `ruleset:${rule.ruleset_source_type}:${rule.ruleset_source}:${rule.ruleset_id}`;
      let item = ruleSources.get(key);
      if (!item) {
        if (ruleSources.size >= ciLimits.rulesets) {effective.problem = 'ruleset-limit'; continue;}
        item = {s: source(key, 'ruleset'), id: rule.ruleset_id, origin: rule.ruleset_source, originType: rule.ruleset_source_type};
        item.s.status = 'available'; ruleSources.set(key, item); report.sources.push(item.s);
      }
      item.s.checks.push(...list);
    }
    if (response.next !== true && response.data.length < ciLimits.pageSize) {rulesComplete = true; break;}
    if (page === ciLimits.pages) effective.problem = 'pagination-limit';
  }
  effective.status = rulesComplete && !effective.problem ? 'available' : 'unknown';
  const noProtection = branchResponse.data.protected === false;
  if (noProtection && ruleCount > 0) {effective.status = 'unknown'; effective.problem = 'contradictory-protection'; for (const item of ruleSources.values()) item.s.checks = [];}
  if (noProtection && classicResponse.status === 200) {classic.status = 'unknown'; classic.checks = []; classic.problem = 'contradictory-protection';}
  if (noProtection && classicResponse.status === 404) {
    if (branchReportsClassicProtection(branchResponse.data.protection)) classic.problem = 'contradictory-protection';
    else if (effective.status === 'available' && ruleCount === 0) {classic.status = 'absent'; delete classic.problem;}
  }
  for (const {s, id, origin, originType} of ruleSources.values()) {
    const response = access(`${repo}/rulesets/${id}?includes_parents=true`), raw = response.data;
    if (response.problem || response.status !== 200) {s.problem = response.problem ?? 'ruleset-detail-unavailable'; continue;}
    if (!object(raw) || raw.id !== id || raw.source !== origin || raw.enforcement !== 'active'
      || (raw.source_type !== undefined && raw.source_type !== originType)
      || (raw.target !== undefined && raw.target !== 'branch')) {
      s.status = 'unknown'; s.checks = []; s.problem = 'contradictory-ruleset'; continue;
    }
    if (raw.rules !== undefined && !rulesetChecksAgree(raw.rules, s.checks)) {
      s.status = 'unknown'; s.checks = []; s.problem = 'contradictory-ruleset-checks'; continue;
    }
    if (raw.bypass_actors === undefined) continue;
    if (!Array.isArray(raw.bypass_actors) || raw.bypass_actors.some((a: unknown) =>
      !object(a) || !ciText(a.actor_type) || (a.bypass_mode !== undefined && !['always', 'pull_request', 'exempt'].includes(a.bypass_mode))
    )) {s.problem = 'malformed-bypass'; continue;}
    s.bypass = raw.bypass_actors.length
      ? {status: 'possible', reason: 'The ruleset exposes bypass actors; their membership and combined policy permissions were not resolved.'}
      : {status: 'none-observed', reason: 'The ruleset exposes an empty bypass list; actor-specific permissions were not resolved.'};
  }
  report.coverage.complete = report.sources.every(s => s.status !== 'unknown');
  for (const s of report.sources) {
    if (s.status === 'unknown' || s.problem) finding('ci-source-incomplete', `${s.id}: ${s.problem ?? 'source-unavailable'}.`);
    if (s.kind !== 'effective-rules' && s.status !== 'absent' && s.bypass.status !== 'none-observed') finding('ci-bypass-visibility', `${s.id}: ${s.bypass.reason}`);
  }
  for (const expected of report.checks) {
    expected.sources = report.sources.filter(s => s.checks.some(c => c.context === expected.context && (expected.appId === undefined || c.appId === expected.appId))).map(s => s.id);
    expected.status = expected.sources.length ? 'observed' : report.coverage.complete ? 'missing' : 'unknown';
    if (expected.status !== 'observed') finding(`ci-check-${expected.status}`, `${expected.context}${expected.appId ? ` (app ${expected.appId})` : ''}: ${expected.status}; exact name and any selected app binding must match an active requirement.`);
  }
  report.status = report.checks.some(c => c.status === 'unknown') ? 'unknown' : report.checks.some(c => c.status === 'missing') ? 'missing' : 'observed';
  return report;
}

export function ciSummary(report: CIReport): string {
  return [`CI requirements: ${report.status} (${report.mode}; exit 0 does not establish enforcement).`,
    `${report.target.host}/${report.target.repository ?? '(repository not selected)'}; branch ${report.target.branch ?? '(default unresolved)'}; inspected ${report.inspectedAt}.`,
    ...report.checks.map(c => `${c.context}${c.appId ? ` (app ${c.appId})` : ''}: ${c.status}${c.sources.length ? ` [${c.sources.join(', ')}]` : ''}`),
    ...report.sources.map(s => `${s.id}: ${s.status}; bypass ${s.bypass.status}; requirements ${s.checks.length ? s.checks.map(c => `${c.context} (app ${c.appId ?? 'unbound'})`).join(', ') : 'none observed'}.`), ...report.findings.map(f => `${f.code}: ${f.message}`), ...report.coverage.notes].join('\n');
}
