#!/usr/bin/env node
import {coordinate, syncIds, resumeIds, abandonRequest} from './ac-coordination.js';
import path from 'node:path';
import { applyProfile, check, lifecycle, uninstall, nextId, renamePrefix, capabilityForPrefix, recover, version } from './core.js';
import {selectSetupProfile} from './setup-profile.js';

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
  const profile = option('--profile');
  const concurrent = flag('--concurrent');
  const sharedReview = flag('--shared-review');
  const enableReview = flag('--enable-review');
  const command = args.shift();
  if (apply && command !== 'profile' && (command !== 'ac' || args[0] !== 'coordinate')) throw Error('--apply is supported only by profile and ac coordinate');
  if (profile !== undefined && command !== 'init') throw Error('--profile is supported only by init');
  if ((concurrent || sharedReview || enableReview) && command !== 'init' && command !== 'profile') throw Error('Setup options are supported only by init and profile');
  if ((concurrent || sharedReview || enableReview) && command === 'init' && profile === undefined) throw Error('Use setup options with --profile solo or --profile team');
  if (enableReview && (!sharedReview || (command === 'profile' && !apply))) throw Error('--enable-review requires --shared-review and an applying command');
  if (dry && !['init', 'update', 'uninstall'].includes(command ?? '')) throw Error('--dry-run is supported only by init, update, and uninstall');
  if (replacement !== undefined && command !== 'uninstall') throw Error('--default-schema is supported only by uninstall');
  if (makeDefault && command !== 'init') throw Error('--default is supported only by init');
  if (change && command !== 'check') throw Error('--change is supported only by check');
  if (failPending && command !== 'check') throw Error('--fail-on-pending is supported only by check');
  if (change && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(change)) throw Error('Change must be a kebab-case name');
  if (json && !['init', 'profile', 'update', 'uninstall', 'check', 'docs', 'ci'].includes(command ?? '')) throw Error('--json is supported only by init, profile, update, uninstall, check, docs check, and ci inspect');
  if (capability && command !== 'check' && (command !== 'ac' || args[0] !== 'next')) throw Error('--capability is supported only by check and ac next');
  if (command === 'ci') {
    if (args.length !== 1 || args[0] !== 'inspect') throw Error('Use ci inspect [--json] [--root PATH]');
    const {inspectCI, ciSummary} = await import('./ci-inspection.js');
    const result = inspectCI(root);
    console.log(json ? JSON.stringify(result, null, 2) : ciSummary(result));
    process.exitCode = result.exitCode;
  }
  else if (command === 'docs') {
    if (args.length !== 1 || args[0] !== 'check') throw Error('Use docs check [--json] [--root PATH]');
    const {checkDocumentation} = await import('./documentation.js');
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
  else if (command === 'profile') {
    if (args.length !== 1) throw Error('Use profile solo|team [--apply]');
    const interactive = apply && !json && Boolean(process.stdin.isTTY && process.stdout.isTTY);
    const result = await selectSetupProfile(root, args[0], {interactive, concurrent, sharedReview, enableReview, existingOnly: true});
    if (!result) throw Error('Choose a solo or team profile');
    const writes = apply ? applyProfile(root, result.selection) : [];
    console.log(JSON.stringify({dryRun: !apply, ...result.summary, writes}, null, 2));
  }
  else if (args.length) throw Error(`Unexpected arguments: ${args.join(' ')}`);
  else if (command === '--version') console.log(version);
  else if (command === 'init') {
    const interactive = !dry && !json && Boolean(process.stdin.isTTY && process.stdout.isTTY);
    const result = await selectSetupProfile(root, profile, {interactive, concurrent, sharedReview, enableReview});
    console.log(JSON.stringify({dryRun: dry, ...lifecycle(root, 'init', dry, makeDefault, result?.selection), setupProfile: result?.summary}, null, 2));
  }
  else if (command === 'update') console.log(JSON.stringify({dryRun: dry, ...lifecycle(root, 'update', dry)}, null, 2));
  else if (command === 'uninstall') console.log(JSON.stringify({dryRun: dry, ...uninstall(root, dry, replacement)}, null, 2));
  else if (command === 'recover') { if (!dry) recover(root); console.log('Recovery complete'); }
  else if (command === 'check') {
    const findings = check(root, change, failPending, capability); const ok = !findings.some(f => f.severity === 'error');
    console.log(json ? JSON.stringify({ ok, findings }, null, 2) : findings.map(f => `${f.severity.toUpperCase()} ${f.code}: ${f.message}`).join('\n'));
    process.exitCode = ok ? 0 : 1;
  } else if (!command || command === '--help') console.log('cliewen-openspec\ninit [--default] [--dry-run] [--profile solo|team]\nprofile solo|team [--concurrent] [--shared-review] [--apply [--enable-review]] [--json]\nupdate [--dry-run] [--json]\nuninstall [--default-schema NAME] [--dry-run] [--json]\nac next --capability NAME\nac next PREFIX (registered active prefix only)\nac rename-prefix CAPABILITY PREFIX\nac coordinate REMOTE [--apply] (preview by default)\nac sync\nac resume\nac abandon\ndocs check [--json]\nci inspect [--json]\ncheck [--change NAME | --capability NAME] [--json] [--fail-on-pending]\nrecover\nAll commands accept --root PATH.');
  else throw Error(`Unknown command: ${command}`);
} catch (e) {
  const message = e instanceof Error ? e.message : String(e);
  if (wantsJson) console.log(JSON.stringify({ ok: false, error: message }));
  else console.error(message);
  process.exitCode = 2;
}
