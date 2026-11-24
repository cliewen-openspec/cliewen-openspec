import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt, {type Token} from 'markdown-it';
import GithubSlugger from 'github-slugger';
import {parseDocument, isMap, LineCounter} from 'yaml';
import {config, local} from './core.js';
import {requirements, meetsMinimum} from './release.js';
import {documentationCategories, type DocumentationCategory, type DocumentationMode} from './documentation-settings.js';
import {checkDiagrams, type DiagramInput} from './mermaid-check.js';
import type {ExternalLinks} from './external-links.js';

type Status = 'passed' | 'issues' | 'incomplete' | 'off' | 'not-applicable';
type DocFinding = {code: string; category: DocumentationCategory; severity: 'warning' | 'error'; path: string; line?: number; message: string; incomplete: boolean};
type Document = {path: string; body: string; offset: number; metadata?: string; metadataClosed: boolean; tokens: Token[]; headings: Set<string>; customAnchors: boolean};
export const documentationLimits = {files: 1000, fileBytes: 1048576, diagramBytes: 262144, directoryEntries: 10000, diagramMilliseconds: 5000};
const markdown = new MarkdownIt({html: true});
const normalizeLink = markdown.normalizeLink;
markdown.normalizeLink = value => /%(?![\da-f]{2})/i.test(value) && !/^[a-z][a-z\d+.-]*:/i.test(value) ? value : normalizeLink(value);
// An inline rule sees real reference syntax after escape/code handling.
markdown.inline.ruler.before('link', 'docs-reference', (state, silent) => {
  if (state.src[state.pos] !== '[') return false;
  const end = state.md.helpers.parseLinkLabel(state, state.pos, true);
  if (end < 0 || state.src[end + 1] !== '[') return false;
  const referenceEnd = state.md.helpers.parseLinkLabel(state, end + 1, false);
  if (referenceEnd < 0) return false;
  const label = state.md.utils.normalizeReference(state.src.slice(end + 2, referenceEnd) || state.src.slice(state.pos + 1, end));
  if (Object.hasOwn(state.env.references ?? {}, label)) return false;
  if (!silent) state.push('docs_reference_missing', '', 0).content = state.src.slice(state.pos, referenceEnd + 1);
  state.pos = referenceEnd + 1;
  return true;
});
const slash = (value: string) => value.replaceAll('\\', '/');
const pathKey = (file: string) => process.platform === 'win32' ? file.toLowerCase() : file;
const matches = (file: string, root: string) => root === '.' || pathKey(file) === pathKey(root) || pathKey(file).startsWith(pathKey(root) + '/');
const isMarkdown = (file: string) => /\.(?:md|markdown)$/i.test(file);
const reserved = (file: string) => file.split('/').some(part => pathKey(part) === '.git' || pathKey(part) === 'node_modules');

const fileIdentity = (stat: fs.BigIntStats) => `${stat.dev}:${stat.ino}`;
function entryIdentity(full: string, stat: fs.BigIntStats, directories: Map<string, string[]>, collect = false): string | undefined {
  const parent = path.dirname(full), parentStat = fs.statSync(parent, {bigint: true});
  if (stat.ino === 0n || parentStat.ino === 0n) return;
  const parentID = fileIdentity(parentStat);
  let names = directories.get(parentID);
  if (!names && collect) {
    names = [];
    const dir = fs.opendirSync(parent);
    try {
      let entry;
      while ((entry = dir.readSync())) {
        if (names.length === documentationLimits.directoryEntries) return;
        names.push(entry.name);
      }
    } finally {dir.closeSync();}
    directories.set(parentID, names);
  }
  if (!names) return;
  let name = path.basename(full);
  if (!names.includes(name)) {
    // Successful stat proves the alias exists; stored entry names preserve scope
    // even when this volume ignores case or normalizes Unicode differently.
    const folded = name.normalize('NFC').toLowerCase();
    const similar = names.filter(candidate => candidate.normalize('NFC').toLowerCase() === folded);
    const candidates = (similar.length ? similar : names).filter(candidate => {
      try {const found = fs.lstatSync(path.join(parent, candidate), {bigint: true}); return found.isFile() && fileIdentity(found) === fileIdentity(stat);} catch {return false;}
    });
    if (candidates.length !== 1) return;
    name = candidates[0];
  }
  // Separate directory entries can be hard links to the same file. An excluded
  // or unselected entry must not inherit another entry's selected scope.
  return `${parentID}:${fileIdentity(stat)}:${name}`;
}

function document(file: string, source: string): Document {
  const text = source.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
  let body = text, metadata: string | undefined, offset = 0, metadataClosed = true;
  if (text.startsWith('---\n')) {
    const lines = text.split('\n');
    const end = lines.findIndex((line, i) => i > 0 && /^(?:---|\.\.\.)\s*$/.test(line));
    metadataClosed = end >= 0;
    metadata = lines.slice(1, end < 0 ? undefined : end).join('\n');
    offset = end < 0 ? lines.length : end + 1;
    body = end < 0 ? '' : lines.slice(end + 1).join('\n');
  }
  const tokens = markdown.parse(body, {});
  const slugger = new GithubSlugger(), headings = new Set<string>();
  for (let i = 0; i < tokens.length; i++) if (tokens[i].type === 'heading_open') {
    const children = tokens[i + 1]?.children ?? [];
    const text = children.map(t => ['text', 'code_inline', 'image', 'docs_reference_missing'].includes(t.type) ? t.content : ['softbreak','hardbreak'].includes(t.type) ? ' ' : '').join('');
    headings.add(slugger.slug(text));
  }
  const customAnchors = tokens.some(t => (t.type === 'html_block' && /\b(?:id|name)\s*=/i.test(t.content)) || t.children?.some(c => c.type === 'html_inline' && /\b(?:id|name)\s*=/i.test(c.content))) || tokens.some((t, i) => tokens[i-1]?.type === 'heading_open' && (t.children ?? []).some(c => c.type === 'text' && /\{#[^}]+\}/.test(c.content)));
  return {path: file, body, offset, metadata, metadataClosed, tokens, headings, customAnchors};
}

export async function checkDocumentation(root: string, includeExternal = false) {
  if (!meetsMinimum(process.versions.node, requirements.node)) throw Error(`Node ${process.versions.node} is unsupported; requires Node ${requirements.node}+. Install a compatible Node runtime.`);
  root = path.resolve(root);
  const c = config(root), settings = c.documentationChecks;
  const roots = settings.roots.length ? settings.roots : [slash(path.posix.normalize(slash(c.docsRoot)))];
  const external = includeExternal ? new (await import('./external-links.js')).ExternalLinks() : undefined;
  const findings: DocFinding[] = [];
  const categories = Object.fromEntries(documentationCategories.map(category => [category, {mode: settings[category], status: settings[category] === 'off' ? 'off' : 'not-applicable', checked: 0}])) as Record<DocumentationCategory, {mode: DocumentationMode; status: Status; checked: number}>;
  const scope = {roots, exclude: settings.exclude, selectedFiles: 0, readFiles: 0, excludedPaths: 0, reservedPaths: 0, nonLocalReferences: 0};
  const add = (category: DocumentationCategory, code: string, file: string, message: string, line?: number, incomplete = false) => {
    if (settings[category] === 'off') return;
    findings.push({category, code, path: file, line, message, incomplete, severity: settings[category] === 'enforce' ? 'error' : 'warning'});
  };
  const unavailable = (file: string, code: string, message: string) => {
    if (external) external.collectionIncomplete = true;
    for (const category of documentationCategories) add(category, code, file, message, undefined, true);
  };
  const result = (parserVersion: string | null = null, externalLinks?: Awaited<ReturnType<ExternalLinks['report']>>) => {
    for (const category of documentationCategories) if (settings[category] !== 'off') {
      const own = findings.filter(f => f.category === category);
      categories[category].status = own.some(f => f.incomplete) ? 'incomplete' : own.length ? 'issues' : categories[category].checked ? 'passed' : 'not-applicable';
    }
    const exitCode = findings.some(f => f.severity === 'error') ? 1 : 0;
    return {ok: exitCode === 0, exitCode, scope, limits: documentationLimits, categories, anchorDialect: 'github-slugger', mermaidParserVersion: parserVersion, findings, ...(externalLinks && {externalLinks})};
  };
  if (!external && documentationCategories.every(category => settings[category] === 'off')) return result();
  const selected = new Set<string>(), visited = new Set<string>();
  const pending = [...roots].sort().reverse();
  let entries = 0, stopped = false;
  while (pending.length && !stopped) {
    const file = pending.pop()!;
    if (settings.exclude.some(exclude => matches(file, exclude))) {scope.excludedPaths++; continue;}
    if (reserved(file)) {scope.reservedPaths++; continue;}
    if (visited.has(file)) continue;
    visited.add(file);
    try {
      const full = local(root, file), stat = fs.lstatSync(full);
      if (stat.isDirectory()) {
        const names: string[] = [];
        const dir = fs.opendirSync(full);
        try {
          let entry;
          while ((entry = dir.readSync())) {
            if (++entries > documentationLimits.directoryEntries) {unavailable(file, 'docs-entry-limit', 'Directory entry limit reached; remaining scope is unchecked.'); stopped = true; break;}
            names.push(entry.name);
          }
        } finally {dir.closeSync();}
        for (const name of names.sort().reverse()) pending.push(file === '.' ? name : `${file}/${name}`);
      } else if (stat.isFile() && isMarkdown(file)) {
        if (selected.size === documentationLimits.files) {unavailable(file, 'docs-file-limit', 'Markdown file limit reached; remaining scope is unchecked.'); stopped = true;}
        else selected.add(file);
      } else if (roots.includes(file)) unavailable(file, 'docs-unsupported-root', 'Select a Markdown file or directory.');
    } catch {
      unavailable(file, 'docs-unreadable-path', 'Path is missing, unreadable, or resolves through a symbolic link; content was not read.');
    }
  }
  scope.selectedFiles = selected.size;
  const documents = new Map<string, Document>();
  const identities = new Map<string, Document>(), directories = new Map<string, string[]>();
  for (const file of [...selected].sort()) {
    try {
      const full = local(root, file);
      const stat = fs.statSync(full, {bigint: true});
      if (stat.size > BigInt(documentationLimits.fileBytes)) {unavailable(file, 'docs-file-size', 'File exceeds the byte limit; content is unchecked.'); continue;}
      const content = fs.readFileSync(full);
      if (content.length > documentationLimits.fileBytes) {unavailable(file, 'docs-file-size', 'File exceeds the byte limit; content is unchecked.'); continue;}
      const doc = document(file, content.toString('utf8'));
      documents.set(file, doc); scope.readFiles++;
      if (settings.links !== 'off') {
        let identity: string | undefined;
        try {identity = entryIdentity(full, stat, directories, true);} catch { /* Report incomplete identity without discarding other checks. */ }
        if (identity) identities.set(identity, doc);
        else add('links', 'docs-identity-unchecked', file, 'Selected document identity could not be established for fragment checks.', undefined, true);
      }
    } catch {unavailable(file, 'docs-read-failed', 'Selected file could not be read or parsed.');}
  }
  const diagrams: DiagramInput[] = [];
  for (const doc of documents.values()) {
    if (external) {
      if (!doc.metadataClosed) external.collectionIncomplete = true;
      for (const {child, line} of inlineTokens(doc)) {
        if (child.type === 'link_open') external.add(String(child.attrGet('href') ?? ''), {path: doc.path, line});
        if (child.type === 'image') external.add(String(child.attrGet('src') ?? ''), {path: doc.path, line});
      }
    }
    if (!doc.metadataClosed) for (const category of ['links', 'mermaid'] as const) add(category, 'docs-body-unchecked', doc.path, 'Unclosed frontmatter leaves the Markdown body boundary unknown.', 1, true);
    if (settings.metadata !== 'off') {
      categories.metadata.checked++;
      const lineCounter = new LineCounter();
      const parsed = doc.metadata === undefined ? undefined : parseDocument(doc.metadata, {lineCounter});
      if (!doc.metadataClosed) add('metadata', 'docs-frontmatter-unclosed', doc.path, 'Close the YAML frontmatter block.', 1);
      else if (parsed && (parsed.errors.length || !isMap(parsed.contents))) {
        if (!parsed.errors.length) add('metadata', 'docs-frontmatter-mapping', doc.path, 'Frontmatter must be a YAML mapping.', 1);
        for (const error of parsed.errors) add('metadata', 'docs-frontmatter-yaml', doc.path, `Invalid frontmatter (${error.code}).`, lineCounter.linePos(error.pos[0]).line + 1);
      } else {
        let values: unknown;
        try {values = parsed?.toJS({maxAliasCount: 100}) ?? {};} catch {add('metadata', 'docs-frontmatter-alias', doc.path, 'Frontmatter cannot be resolved within the YAML alias limit.', 1);}
        for (const rule of values === undefined ? [] : settings.metadataRules.filter(r => matches(doc.path, r.path))) {
          for (const field of rule.required) if (!Object.hasOwn(values as object, field)) add('metadata', 'docs-metadata-required', doc.path, `Required field ${field} is absent (rule ${rule.path}).`, 1);
          for (const [field, allowed] of Object.entries(rule.values)) if (Object.hasOwn(values as object, field) && !allowed.includes((values as Record<string, string>)[field])) add('metadata', 'docs-metadata-value', doc.path, `Field ${field} has a disallowed value (rule ${rule.path}).`, 1);
        }
      }
    }
    if (settings.links !== 'off') checkLinks(doc, root, identities, directories, categories.links, scope, add);
    if (settings.mermaid !== 'off') for (const token of doc.tokens) if (token.type === 'fence' && token.info.trim() === 'mermaid') {
      categories.mermaid.checked++;
      const line = (token.map?.[0] ?? 0) + doc.offset + 1;
      if (Buffer.byteLength(token.content) > documentationLimits.diagramBytes) add('mermaid', 'docs-mermaid-size', doc.path, 'Mermaid block exceeds the byte limit; syntax is unchecked.', line, true);
      else diagrams.push({path: doc.path, line, text: token.content});
    }
  }
  const parsed = await checkDiagrams(diagrams);
  parsed.outcomes.forEach((outcome, i) => {
    const diagram = diagrams[i];
    if (outcome === 'invalid') add('mermaid', 'docs-mermaid-syntax', diagram.path, 'Mermaid syntax is invalid for the included parser.', diagram.line);
    if (outcome === 'incomplete') add('mermaid', 'docs-mermaid-unavailable', diagram.path, 'Mermaid parsing did not complete; check the installation or the documented limits.', diagram.line, true);
  });
  return result(parsed.version, await external?.report());
}

function* inlineTokens(doc: Document) {
  for (const token of doc.tokens) {
    const line = (token.map?.[0] ?? 0) + doc.offset + 1;
    for (const child of token.children ?? []) yield {child, line};
  }
}

type AddFinding = (category: DocumentationCategory, code: string, file: string, message: string, line?: number, incomplete?: boolean) => void;
function checkLinks(doc: Document, root: string, identities: Map<string, Document>, directories: Map<string, string[]>, category: {checked: number}, scope: {nonLocalReferences: number}, add: AddFinding) {
  category.checked++;
  for (const {child, line} of inlineTokens(doc)) {
    if (child.type === 'docs_reference_missing') {add('links', 'docs-reference-undefined', doc.path, 'Explicit Markdown reference has no definition.', line); continue;}
    if (!['link_open', 'image'].includes(child.type)) continue;
    const href = String(child.attrGet(child.type === 'image' ? 'src' : 'href') ?? '');
    if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(href)) {scope.nonLocalReferences++; continue;}
    const hash = href.indexOf('#'), query = href.indexOf('?');
    const end = Math.min(...[hash, query, href.length].filter(n => n >= 0));
    let filename: string, fragment: string;
    try {filename = decodeURIComponent(href.slice(0, end)); fragment = hash < 0 ? '' : decodeURIComponent(href.slice(hash + 1));}
    catch {add('links', 'docs-link-encoding', doc.path, 'Local reference has invalid URI encoding.', line); continue;}
    const target = filename ? path.resolve(root, path.dirname(doc.path), slash(filename)) : path.resolve(root, doc.path);
    const relative = slash(path.relative(root, target));
    let stat: fs.BigIntStats, full: string;
    try {
      if (path.isAbsolute(relative) || relative === '..' || relative.startsWith('../') || reserved(relative)) throw Error();
      full = local(root, relative || '.');
      stat = fs.statSync(full, {bigint: true});
    } catch (error) {
      const missing = (error as NodeJS.ErrnoException)?.code === 'ENOENT';
      add('links', missing ? 'docs-link-missing' : 'docs-link-unchecked', doc.path, missing ? `Local reference target ${JSON.stringify(relative)} does not exist.` : 'Local reference target is outside safe readable scope.', line, !missing); continue;
    }
    if (!fragment) continue;
    let identity: string | undefined;
    try {if (stat.isFile()) identity = entryIdentity(full, stat, directories);} catch { /* Unknown identity remains an unchecked fragment. */ }
    const targetDoc = identity ? identities.get(identity) : undefined;
    if (!stat.isFile() || !isMarkdown(relative) || !targetDoc) {add('links', 'docs-fragment-unchecked', doc.path, 'Fragment requires a selected readable Markdown target; it was not checked.', line, true); continue;}
    if (!targetDoc.headings.has(fragment)) add('links', targetDoc.customAnchors ? 'docs-fragment-unsupported' : 'docs-fragment-missing', doc.path, targetDoc.customAnchors ? 'Target has custom anchors; this fragment is outside the supported heading convention.' : `Heading fragment ${JSON.stringify(fragment)} does not exist in ${JSON.stringify(relative)} under the supported convention.`, line, targetDoc.customAnchors);
  }
}
