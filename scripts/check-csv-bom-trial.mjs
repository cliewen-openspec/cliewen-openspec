import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {hasInstruction} from './lib/trial-instructions.mjs';

const [project, artifacts, schema = 'cliewen-delivery', ...extra] = process.argv.slice(2);
if (!project || !artifacts || extra.length || !['cliewen-delivery', 'cliewen-all'].includes(schema)) throw Error('Use node scripts/check-csv-bom-trial.mjs PROJECT ARTIFACTS [cliewen-delivery|cliewen-all]');
const root = path.resolve(project);
const output = path.join(path.resolve(artifacts), 'independent-checks.json');
if (fs.existsSync(output)) throw Error(`Refusing to replace an earlier evaluation: ${output}`);
const baseline = JSON.parse(fs.readFileSync(path.join(artifacts, 'baseline.json'), 'utf8'));
const checks = [];
function run(label, executable, args) {
  const r = spawnSync(executable, args, {cwd: root, encoding: 'utf8', timeout: 120000, env: {...process.env, OPENSPEC_TELEMETRY: '0', CI: '1'}});
  checks.push({label, executable, args, exitCode: r.status, stdout: r.stdout, stderr: r.stderr, error: r.error?.message});
  return r;
}
const git = (...args) => run(`git ${args.join(' ')}`, 'git', args);
const revision = git('rev-parse', 'HEAD').stdout?.trim();
const status = git('status', '--porcelain', '--untracked-files=all');
checks.push({label: 'clean input revision', passed: status.status === 0 && status.stdout === ''});
const normalize = text => text.replaceAll('\r\n', '\n');
for (const file of ['test/export.test.mjs', 'openspec/specs/csv-export/spec.md']) {
  const original = git('show', `${baseline.baseline}:${file}`);
  const current = fs.readFileSync(path.join(root, file), 'utf8');
  const changes = file.startsWith('test/') ? git('diff', '--numstat', baseline.baseline, '--', file) : undefined;
  const noRemovedLines = changes?.status === 0 && (!changes.stdout.trim() || changes.stdout.trim().split('\t')[1] === '0');
  checks.push({label: `baseline preserved: ${file}`, passed: original.status === 0 && (changes ? noRemovedLines : normalize(current) === normalize(original.stdout))});
}
run('all project tests', process.execPath, ['--test']);
run('strict change validation', process.execPath, ['node_modules/@fission-ai/openspec/bin/openspec.js', 'validate', 'add-optional-csv-bom', '--type', 'change', '--strict']);
const evidence = run('active change evidence', process.execPath, ['node_modules/cliewen-openspec/dist/cli.js', 'check', '--change', 'add-optional-csv-bom', '--json']);
try { checks.push({label: 'evidence check reports success', passed: evidence.status === 0 && JSON.parse(evidence.stdout).ok === true}); }
catch { checks.push({label: 'evidence check reports success', passed: false}); }

// This scenario's observed API uses a third options object with a boolean bom field.
// Review a different API before adapting the checker; the prompt does not prescribe a signature.
const acceptance = `
import {exportCsv} from ${JSON.stringify(pathToFileURL(path.join(root, 'export.mjs')).href)};
import {verifyCsvBom} from ${JSON.stringify(new URL('./lib/csv-bom-verification.mjs', import.meta.url).href)};
verifyCsvBom(exportCsv);
console.log('Independent opt-in, default, empty-input, escaping, CRLF, Unicode, caller-supplied U+FEFF, and UTF-8 byte assertions passed.');
`;
run('independent behavior assertions', process.execPath, ['--input-type=module', '-e', acceptance]);
const instructions = schema === 'cliewen-all' ? ['proposal', 'investigation', 'decision', 'specs', 'tasks', 'apply'] : ['proposal', 'specs', 'design', 'tasks', 'apply'];
for (const name of instructions) {
  const passed = hasInstruction(root, name, schema, 'add-optional-csv-bom', {searchProject: schema === 'cliewen-all' && ['specs', 'tasks', 'apply'].includes(name)});
  checks.push({label: `saved ${name} instructions`, passed});
}
const passed = checks.every(c => c.passed !== false && (c.exitCode === undefined || c.exitCode === 0));
fs.writeFileSync(output, JSON.stringify({evaluatedAt: new Date().toISOString(), revision, baseline: baseline.baseline, passed, checks}, null, 2) + '\n', {flag: 'wx'});
console.log(JSON.stringify({passed, revision, output}, null, 2));
process.exitCode = passed ? 0 : 1;
