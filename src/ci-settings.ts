export type ExpectedCheck = {context: string; appId?: number};
export type CISettings = {mode: 'off' | 'advisory'; host: 'github'; repository: string | null; branch: string | null; requiredChecks: ExpectedCheck[]};

export function ciDefaults(): CISettings {
  return {mode: 'advisory', host: 'github', repository: null, branch: null, requiredChecks: []};
}

function mapping(value: unknown, allowed: string[], name: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error(`${name} must be a mapping`);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) throw Error(`Unknown ${name} key: ${key}`);
}
export const ciText = (value: unknown): value is string => typeof value === 'string' && !!value && value === value.trim() && !/[\x00-\x1f\x7f]/.test(value);
export const ciBranch = (value: unknown): value is string => ciText(value) && value !== '@' && !/[\\ ~^:?*\[]/.test(value) && !value.includes('@{') && !value.includes('..') && !value.includes('//') && !value.startsWith('-') && !value.endsWith('.') && value.split('/').every(part => !!part && !part.startsWith('.') && !part.endsWith('.lock'));

export function ciSettings(raw: unknown): CISettings {
  const result = ciDefaults();
  if (raw === undefined) return result;
  mapping(raw, ['mode', 'host', 'repository', 'branch', 'requiredChecks'], 'ciInspection');
  if (raw.mode !== undefined) {
    if (raw.mode !== 'off' && raw.mode !== 'advisory') throw Error('ciInspection.mode must be off or advisory');
    result.mode = raw.mode;
  }
  if (raw.host !== undefined && raw.host !== 'github') throw Error('ciInspection.host supports github (GitHub.com) only');
  if (raw.repository !== undefined && raw.repository !== null) {
    if (!ciText(raw.repository) || !/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\/[A-Za-z0-9_.-]+$/.test(raw.repository) || ['.', '..'].includes(raw.repository.split('/')[1])) throw Error('ciInspection.repository must be an explicit GitHub.com owner/name');
    result.repository = raw.repository;
  }
  if (raw.branch !== undefined && raw.branch !== null) {
    if (!ciBranch(raw.branch)) throw Error('ciInspection.branch must be a valid branch name or null for the default branch');
    result.branch = raw.branch;
  }
  if (raw.requiredChecks !== undefined) {
    if (!Array.isArray(raw.requiredChecks)) throw Error('ciInspection.requiredChecks must be an array');
    const seen = new Set<string>();
    result.requiredChecks = raw.requiredChecks.map(value => {
      mapping(value, ['context', 'appId'], 'ciInspection.requiredChecks entry');
      if (!ciText(value.context) || seen.has(value.context)) throw Error('ciInspection.requiredChecks contexts must be nonempty, trimmed and unique');
      seen.add(value.context);
      if (value.appId !== undefined && (!Number.isSafeInteger(value.appId) || (value.appId as number) < 1)) throw Error('ciInspection.requiredChecks appId must be a positive integer');
      return {context: value.context, ...(value.appId === undefined ? {} : {appId: value.appId as number})};
    });
  }
  return result;
}
