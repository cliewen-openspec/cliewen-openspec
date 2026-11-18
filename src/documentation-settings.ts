import path from 'node:path';

export const documentationCategories = ['links', 'metadata', 'mermaid'] as const;
export type DocumentationCategory = typeof documentationCategories[number];
export type DocumentationMode = 'off' | 'advisory' | 'enforce';
export type MetadataRule = {path: string; required: string[]; values: Record<string, string[]>};
export type DocumentationSettings = Record<DocumentationCategory, DocumentationMode> & {
  roots: string[]; exclude: string[]; metadataRules: MetadataRule[];
};

export function documentationDefaults(): DocumentationSettings {
  return {roots: [], exclude: [], links: 'advisory', metadata: 'advisory', mermaid: 'advisory', metadataRules: []};
}

function mapping(value: unknown, allowed: readonly string[], label: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error(`${label} must be a mapping`);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) throw Error(`Unknown ${label} key: ${key}`);
}

export function documentationPath(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value || value !== value.trim() || /[:?*\[\]{}\x00-\x1f\x7f]/.test(value) || path.win32.parse(value).root || value.split(/[\\/]/).includes('..')) throw Error(`${label} requires a trimmed project-relative path without traversal or glob syntax`);
  return path.posix.normalize(value.replaceAll('\\', '/')).replace(/\/$/, '') || '.';
}

function fieldList(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.some(v => typeof v !== 'string' || !v || v !== v.trim() || /[\x00-\x1f\x7f]/.test(v))) throw Error(`${label} must be an array of nonempty trimmed strings`);
  return [...new Set(value)];
}

export function documentationSettings(raw: unknown): DocumentationSettings {
  const result = documentationDefaults();
  if (raw === undefined) return result;
  mapping(raw, ['roots', 'exclude', ...documentationCategories, 'metadataRules'], 'documentationChecks');
  for (const category of documentationCategories) {
    const mode = raw[category];
    if (mode === undefined) continue;
    if (!['off', 'advisory', 'enforce'].includes(mode as string)) throw Error(`documentationChecks.${category} must be off, advisory, or enforce`);
    result[category] = mode as DocumentationMode;
  }
  for (const field of ['roots', 'exclude'] as const) if (raw[field] !== undefined) {
    if (!Array.isArray(raw[field])) throw Error(`documentationChecks.${field} must be an array`);
    result[field] = [...new Set(raw[field].map(v => documentationPath(v, `documentationChecks.${field}`)))];
  }
  if (raw.metadataRules !== undefined) {
    if (!Array.isArray(raw.metadataRules)) throw Error('documentationChecks.metadataRules must be an array');
    result.metadataRules = raw.metadataRules.map((rule, i) => {
      const label = `documentationChecks.metadataRules[${i}]`;
      mapping(rule, ['path', 'required', 'values'], label);
      const required = rule.required === undefined ? [] : fieldList(rule.required, `${label}.required`);
      const values: Record<string, string[]> = Object.create(null);
      if (rule.values !== undefined) {
        if (!rule.values || typeof rule.values !== 'object' || Array.isArray(rule.values)) throw Error(`${label}.values must be a mapping`);
        for (const [field, allowed] of Object.entries(rule.values)) {
          fieldList([field], `${label}.values field`);
          const list = fieldList(allowed, `${label}.values.${field}`);
          if (!list.length) throw Error(`${label}.values.${field} must not be empty`);
          values[field] = list;
        }
      }
      return {path: documentationPath(rule.path, `${label}.path`), required, values};
    });
  }
  return result;
}
