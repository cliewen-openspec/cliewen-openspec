import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {parse} from 'yaml';
import {hasInstruction} from './lib/trial-instructions.mjs';
import {releaseVariants} from './lib/release-variants.mjs';

const [project, artifacts, ...extra] = process.argv.slice(2);
if (!project || !artifacts || extra.length) throw Error('Use node scripts/check-release-variant.mjs PROJECT ARTIFACTS');
const root = path.resolve(project), destination = path.resolve(artifacts);
const baseline = JSON.parse(fs.readFileSync(path.join(destination, 'baseline.json'), 'utf8'));
const definition = Object.hasOwn(releaseVariants, baseline.scenario) ? releaseVariants[baseline.scenario] : undefined;
if (!definition) throw Error('Expected variant baseline metadata');
const output = path.join(destination, 'variant-checks.json');
if (fs.existsSync(output)) throw Error('Preserve the earlier variant checks; use a separate artifact directory for rechecks');
const checks = [];
function run(label, executable, args, expectedExitCode = 0) {
  const result = spawnSync(executable, args, {cwd: root, encoding: 'utf8', timeout: 120000, env: {...process.env, OPENSPEC_TELEMETRY: '0', CI: '1'}});
  checks.push({label, executable, args, expectedExitCode, exitCode: result.status, error: result.error?.message, stdout: result.stdout, stderr: result.stderr});
  return result;
}
const add = (label, passed) => checks.push({label, passed});
const git = (...args) => run(`git ${args.join(' ')}`, 'git', args);
const cli = (...args) => run(`Cliewen ${args.join(' ')}`, process.execPath, ['node_modules/cliewen-openspec/dist/cli.js', ...args]);
const ospec = (...args) => run(`OpenSpec ${args.join(' ')}`, process.execPath, ['node_modules/@fission-ai/openspec/bin/openspec.js', ...args]);
const json = result => { try { return JSON.parse(result.stdout); } catch { return {}; } };
const metadata = name => { try { return parse(fs.readFileSync(path.join(root, 'openspec/changes', name, '.openspec.yaml'), 'utf8')) ?? {}; } catch { return {}; } };
const revision = git('rev-parse', 'HEAD').stdout?.trim();
const status = git('status', '--porcelain', '--untracked-files=all').stdout;
const config = parse(fs.readFileSync(path.join(root, '.cliewen-openspec/config.yaml'), 'utf8'));
let branchObserved = true;
if (definition.placement) {
  add('end-of-change placement retained', config.testing?.placement === definition.placement);
  run('primary BOM behavior and evidence checks', process.execPath, [path.resolve(import.meta.dirname, 'check-csv-bom-trial.mjs'), root, destination]);
} else {
  const change = path.join(root, 'openspec/changes', definition.change);
  let decision = {};
  try { decision = parse(fs.readFileSync(path.join(change, 'decision.md'), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''); } catch { /* Fail below. */ }
  decision ??= {};
  add('proposed decision with explicit outcome', decision.type === 'decision' && decision.status === 'proposed' && ['no-change', 'further-investigation', 'delivery'].includes(decision.outcome));
  branchObserved = (Array.isArray(definition.branch) ? definition.branch : [definition.branch]).includes(decision.outcome);
  const allowedChanges = [definition.change, ...(definition.handoff && decision.outcome === 'delivery' ? [definition.handoff] : [])];
  const changed = [git('diff', '--name-only', baseline.baseline).stdout, git('ls-files', '--others', '--exclude-standard').stdout].join('\n').split(/\r?\n/).filter(Boolean);
  add('only investigation documents and permitted handoff changed', changed.every(file => file.startsWith('docs/') || file === '.gitignore' || allowedChanges.some(name => file.startsWith(`openspec/changes/${name}/`))));
  git('diff', '--exit-code', baseline.baseline, '--', 'export.mjs', 'test', 'openspec/specs', '.cliewen-openspec', 'openspec/config.yaml', 'package.json', 'package-lock.json', 'AGENTS.md', 'README.md', 'trial-brief.md');
  run('six baseline tests', process.execPath, ['--test', 'test/export.test.mjs']);
  const names = fs.readdirSync(path.join(root, 'openspec/changes'), {withFileTypes: true}).filter(e => e.isDirectory() && e.name !== 'archive').map(e => e.name).sort();
  add('no unrequested active change', JSON.stringify(names) === JSON.stringify([...allowedChanges].sort()));
  const archive = path.join(root, 'openspec/changes/archive');
  add('no archive', !fs.existsSync(archive) || fs.readdirSync(archive).every(name => name === '.gitkeep'));
  add('correct source schema', metadata(definition.change).schema === definition.schema);
  const deferredDelivery = definition.schema === 'cliewen-all' && decision.outcome === 'delivery';
  const required = deferredDelivery ? ['proposal', 'investigation', 'decision'] : definition.schema === 'cliewen-all' ? ['proposal', 'investigation', 'decision', 'tasks', 'apply'] : ['proposal', 'investigation', 'decision', 'apply'];
  for (const artifact of required) add(`saved ${artifact} instructions`, hasInstruction(root, artifact, definition.schema, definition.change));
  if (definition.schema === 'cliewen-all') {
    add('outcome-specific spec skipping', deferredDelivery ? metadata(definition.change).skip_specs !== true : metadata(definition.change).skip_specs === true);
    add('no duplicate design', !fs.existsSync(path.join(change, 'design.md')));
    if (deferredDelivery) add('no delivery tasks before acceptance', !fs.existsSync(path.join(change, 'tasks.md')));
  }
  add('no source product spec delta', !fs.existsSync(path.join(change, 'specs')) || fs.readdirSync(path.join(change, 'specs')).length === 0);
  if (!deferredDelivery) ospec('validate', definition.change, '--type', 'change', '--strict');
  else ospec('schema', 'validate', definition.schema);
  const state = json(ospec('status', '--change', definition.change, '--json'));
  add('source artifacts match outcome boundary', state.schemaName === definition.schema && (deferredDelivery ? ['proposal', 'investigation', 'decision'].every(id => state.artifacts?.some(a => a.id === id && a.status === 'done')) && state.isComplete === false : state.isComplete === true));
  const health = json(deferredDelivery ? run('delivery remains blocked for actual approval', process.execPath, ['node_modules/cliewen-openspec/dist/cli.js', 'check', '--change', definition.change, '--json'], 1) : cli('check', '--change', definition.change, '--json'));
  add('health matches review boundary', deferredDelivery ? health.ok === false && health.findings?.filter(f => f.severity === 'error').length === 1 && health.findings.some(f => f.code === 'all-decision-unaccepted') : health.ok === true && health.findings?.some(f => f.code === 'discovery-review-required'));
  add('no product evidence invented', !fs.existsSync(path.join(root, '.cliewen-openspec/evidence.json')));
  if (definition.handoff && decision.outcome === 'delivery') {
    const target = path.join(root, 'openspec/changes', definition.handoff);
    add('separate delivery schema', metadata(definition.handoff).schema === 'cliewen-delivery');
    add('handoff proposal exists', fs.existsSync(path.join(target, 'proposal.md')));
    add('handoff stops at proposal', ['design.md', 'decision.md', 'tasks.md', 'specs'].every(file => !fs.existsSync(path.join(target, file))));
    add('saved handoff proposal instructions', hasInstruction(root, 'proposal', 'cliewen-delivery', definition.handoff));
  }
}
const passed = checks.every(c => c.passed !== false && (c.exitCode === undefined || c.exitCode === c.expectedExitCode));
const record = {evaluatedAt: new Date().toISOString(), scenario: baseline.scenario, revision, baseline: baseline.baseline, workingTreeStatus: status, passed, branchObserved, releaseCredit: 'requires independent semantic/process review and a completed native attempt', checks, manualReviewRequired: ['reasoning and evidence sufficiency', 'references and factual claims', 'actual approval and command history', 'ignore-rule changes and hidden files', ...(definition.placement ? ['task-to-test links and final verification grouping'] : ['closure-task meaning and proposed outcome', 'handoff scope and source links'])]};
fs.writeFileSync(output, JSON.stringify(record, null, 2) + '\n', {flag: 'wx'});
console.log(JSON.stringify({passed, branchObserved, output}, null, 2));
process.exitCode = passed ? 0 : 1;
