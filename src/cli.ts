#!/usr/bin/env node
import {coordinate, syncIds, resumeIds, abandonRequest} from './ac-coordination.js';
import path from 'node:path';
import {checkDocumentation} from './documentation.js';
import { check, lifecycle, uninstall, nextId, renamePrefix, capabilityForPrefix, recover, version } from './core.js';

const args = process.argv.slice(2);
const wantsJson = args.includes('--json');
function option(name: string) { const i = args.indexOf(name); if (i < 0) return undefined; const value = args[i + 1]; if (!value || value.startsWith('--')) throw Error(`Missing value for ${name}`); args.splice(i, 2); return value; }
function flag(name: string) { const i = args.indexOf(name); if (i < 0) return false; args.splice(i, 1); return true; }
try {
  const root = path.resolve(option('--root') ?? process.cwd());
  const json = flag('--json'), dry = flag('--dry-run'), makeDefault = flag('--default'), failPending = flag('--fail-on-pending');
  const change = option('--change');
  const capability = option('--capability');
  const replacement = option('--default-schema');
  const apply = flag('--apply');
  const command = args.shift();
  if (apply && (command !== 'ac' || args[0] !== 'coordinate')) throw Error('--apply is supported only by ac coordinate');
  if (dry && !['init', 'update', 'uninstall'].includes(command ?? '')) throw Error('--dry-run is supported only by init, update, and uninstall');
  if (replacement !== undefined && command !== 'uninstall') throw Error('--default-schema is supported only by uninstall');
  if (makeDefault && command !== 'init') throw Error('--default is supported only by init');
  if (change && command !== 'check') throw Error('--change is supported only by check');
  if (failPending && command !== 'check') throw Error('--fail-on-pending is supported only by check');
  if (change && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(change)) throw Error('Change must be a kebab-case name');
  if (json && !['init', 'update', 'uninstall', 'check', 'docs'].includes(command ?? '')) throw Error('--json is supported only by init, update, uninstall, check, and docs check');
  if (capability && (command !== 'ac' || args[0] !== 'next')) throw Error('--capability is supported only by ac next');
  if (command === 'docs') {
    if (args.length !== 1 || args[0] !== 'check') throw Error('Use docs check [--json] [--root PATH]');
    const result = await checkDocumentation(root);
    console.log(json ? JSON.stringify(result, null, 2) : [
      `Documentation: ${result.scope.readFiles} files read; exit policy ${result.ok ? 'passed' : 'blocked'}.`,
      ...Object.entries(result.categories).map(([category, value]) => `${category}: ${value.status} (${value.mode}; ${value.checked} checked)`),
      ...result.findings.map(f => `${f.severity.toUpperCase()} ${f.code} ${f.path}${f.line ? ':' + f.line : ''}: ${f.message}`),
      `Non-local references skipped: ${result.scope.nonLocalReferences}. Mermaid checks syntax only; factual correctness and visual rendering are not assessed.`
    ].join('\n'));
    process.exitCode = result.exitCode;
  }
  else if (command === 'ac') {
    const action = args.shift();
    if (action === 'coordinate' && args.length===1) console.log(JSON.stringify(coordinate(root,args[0],apply),null,2));
    else if (action === 'sync' && !args.length) console.log(JSON.stringify(syncIds(root),null,2));
    else if (action === 'abandon' && !args.length) console.log(abandonRequest(root));
    else if (action === 'resume' && !args.length) { const result=resumeIds(root); console.log(result??'Prefix reservation recovered'); }
    else if (action === 'next') {
      if (capability ? args.length !== 0 : args.length !== 1) throw Error('Use ac next --capability NAME (or ac next PREFIX for a registered active prefix)');
      console.log(nextId(root, capability ?? capabilityForPrefix(root, args[0])));
    } else if (action === 'rename-prefix' && args.length === 2) {
      renamePrefix(root, args[0], args[1]); console.log(`Prefix updated for ${args[0]}: ${args[1]}`);
    } else throw Error('Use ac next --capability NAME, ac rename-prefix CAPABILITY PREFIX, ac coordinate REMOTE [--apply], ac sync, ac resume, or ac abandon');
  }
  else if (args.length) throw Error(`Unexpected arguments: ${args.join(' ')}`);
  else if (command === '--version') console.log(version);
  else if (command === 'init') console.log(JSON.stringify({ dryRun: dry, ...lifecycle(root, 'init', dry, makeDefault) }, null, 2));
  else if (command === 'update') console.log(JSON.stringify({dryRun: dry, ...lifecycle(root, 'update', dry)}, null, 2));
  else if (command === 'uninstall') console.log(JSON.stringify({dryRun: dry, ...uninstall(root, dry, replacement)}, null, 2));
  else if (command === 'recover') { if (!dry) recover(root); console.log('Recovery complete'); }
  else if (command === 'check') {
    const findings = check(root, change, failPending); const ok = !findings.some(f => f.severity === 'error');
    console.log(json ? JSON.stringify({ ok, findings }, null, 2) : findings.map(f => `${f.severity.toUpperCase()} ${f.code}: ${f.message}`).join('\n'));
    process.exitCode = ok ? 0 : 1;
  } else if (!command || command === '--help') console.log('cliewen-openspec\ninit [--default] [--dry-run]\nupdate [--dry-run] [--json]\nuninstall [--default-schema NAME] [--dry-run] [--json]\nac next --capability NAME\nac next PREFIX (registered active prefix only)\nac rename-prefix CAPABILITY PREFIX\nac coordinate REMOTE [--apply] (preview by default)\nac sync\nac resume\nac abandon\ndocs check [--json]\ncheck [--change NAME] [--json] [--fail-on-pending]\nrecover\nAll commands accept --root PATH.');
  else throw Error(`Unknown command: ${command}`);
} catch (e) {
  const message = e instanceof Error ? e.message : String(e);
  if (wantsJson) console.log(JSON.stringify({ ok: false, error: message }));
  else console.error(message);
  process.exitCode = 2;
}
