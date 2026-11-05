import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {parse, stringify} from 'yaml';
import {init} from '../dist/core.js';
import {nextId} from '../dist/ac.js';
import {releaseVariants} from '../scripts/lib/release-variants.mjs';

const repository = fileURLToPath(new URL('../', import.meta.url));
test('variant checkers preserve boundaries and distinguish branch coverage from a valid investigation', {timeout: 120000}, t => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-variant-checks-'));
  t.after(() => {
    const relative = path.relative(os.tmpdir(), temp);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
    fs.rmSync(temp, {recursive: true, force: true});
  });
  let sequence = 0;
  const env = {...process.env, CI: '1', OPENSPEC_TELEMETRY: '0'}; delete env.NODE_TEST_CONTEXT;
  function run(root, executable, args, expected = 0) {
    const r = spawnSync(executable, args, {cwd: root, env, encoding: 'utf8', timeout: 30000});
    assert.equal(r.status, expected, `${args.join(' ')}\n${r.stdout}\n${r.stderr}`);
    return r.stdout.trim();
  }
  const write = (root, file, value) => { const full = path.join(root, file); fs.mkdirSync(path.dirname(full), {recursive: true}); fs.writeFileSync(full, value); };
  function fixture(scenario) {
    const root = path.join(temp, scenario); fs.mkdirSync(root);
    // Local development fixtures exercise the checkers without registry downloads.
    fs.mkdirSync(path.join(root, 'node_modules/@fission-ai'), {recursive: true});
    fs.symlinkSync(repository, path.join(root, 'node_modules/cliewen-openspec'), 'junction');
    fs.symlinkSync(path.join(repository, 'node_modules/@fission-ai/openspec'), path.join(root, 'node_modules/@fission-ai/openspec'), 'junction');
    for (const dir of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, dir), {recursive: true});
    init(root, false, true);
    write(root, '.cliewen-openspec/config.yaml', `ac:\n  capabilities:\n    csv-export: EXP\n  padding: 3\ntesting:\n  placement: ${releaseVariants[scenario].placement ?? 'per-task'}\n`);
    for (let n = 0; n < 6; n++) nextId(root, 'csv-export');
    for (const file of ['export.mjs', 'test/export.test.mjs', 'README.md']) write(root, file, fs.readFileSync(path.join(repository, 'docs/examples/csv', file), 'utf8'));
    write(root, 'openspec/specs/csv-export/spec.md', fs.readFileSync(path.join(repository, 'docs/examples/csv/change/specs/csv-export/spec.md'), 'utf8').replace('## ADDED Requirements', '## Requirements'));
    write(root, '.gitignore', 'node_modules/\n'); write(root, 'package.json', '{"private":true,"type":"module"}\n');
    write(root, 'trial-brief.md', fs.readFileSync(path.join(repository, `docs/testing/release-variants/${scenario}/brief.md`), 'utf8'));
    run(root, 'git', ['init', '-b', 'main']); run(root, 'git', ['config', 'user.name', 'Deterministic variant fixture']); run(root, 'git', ['config', 'user.email', 'fixture@example.invalid']);
    run(root, 'git', ['add', '.']); run(root, 'git', ['commit', '-m', 'Establish deterministic checker baseline']);
    const baseline = run(root, 'git', ['rev-parse', 'HEAD']);
    const ospec = (...args) => run(root, process.execPath, ['node_modules/@fission-ai/openspec/bin/openspec.js', ...args]);
    const instruction = (change, artifact) => write(root, `docs/testing/instructions/${change}/${artifact}.json`, ospec('instructions', artifact, '--change', change, '--json'));
    const check = (expected = 0) => {
      const artifacts = path.join(temp, `check-${++sequence}`); fs.mkdirSync(artifacts);
      write(artifacts, 'baseline.json', JSON.stringify({baseline, scenario}));
      run(repository, process.execPath, ['scripts/check-release-variant.mjs', root, artifacts], expected);
      return {artifacts, result: JSON.parse(fs.readFileSync(path.join(artifacts, 'variant-checks.json'), 'utf8'))};
    };
    return {root, baseline, ospec, instruction, check};
  }
  function investigate(f, scenario, outcome) {
    const d = releaseVariants[scenario], base = `openspec/changes/${d.change}/`;
    f.ospec('new', 'change', d.change, '--schema', d.schema);
    f.instruction(d.change, 'proposal');
    write(f.root, base + 'proposal.md', '# Proposal\n\n## Why\nReview the supplied CSV requirements using local evidence before deciding whether any implementation is warranted.\n\n## What Changes\nInvestigate current behavior and alternatives without changing product code.\n\n## Capabilities\n### New Capabilities\nNone.\n### Modified Capabilities\nNone.\n\n## Impact\nA proposed recommendation only.\n');
    f.instruction(d.change, 'investigation');
    write(f.root, base + 'investigation.md', '# Investigation\nKeep the current API or consider an additive option. This is a deterministic checker control, not a native agent observation. No production measurement or benchmark was run.\n');
    f.instruction(d.change, 'decision');
    write(f.root, base + 'decision.md', `---\ntype: decision\nstatus: proposed\noutcome: ${outcome}\n---\n# Recommendation\nA deterministic structural control; semantic review remains required.\n`);
    if (d.schema === 'cliewen-all') {
      const file = path.join(f.root, base, '.openspec.yaml'); const data = parse(fs.readFileSync(file, 'utf8')); data.skip_specs = outcome !== 'delivery'; fs.writeFileSync(file, stringify(data));
      if (outcome !== 'delivery') {
        f.instruction(d.change, 'tasks'); write(f.root, base + 'tasks.md', '# Closure\n- [x] 1.1 Review the proposed recommendation and preserve its supporting sources.\n');
      }
    }
    if (!(d.schema === 'cliewen-all' && outcome === 'delivery')) f.instruction(d.change, 'apply');
    return base;
  }

  const noChange = fixture('discovery-no-change');
  const noChangeBase = investigate(noChange, 'discovery-no-change', 'no-change');
  assert.equal(noChange.check().result.branchObserved, true);
  const decisionFile = path.join(noChange.root, noChangeBase, 'decision.md');
  const decision = fs.readFileSync(decisionFile, 'utf8');
  fs.writeFileSync(decisionFile, decision.replace('outcome: no-change', 'outcome: further-investigation'));
  assert.equal(noChange.check().result.branchObserved, false, 'A valid other recommendation is not a technical failure');
  fs.writeFileSync(decisionFile, decision.replace('status: proposed', 'status: accepted'));
  assert.ok(noChange.check(1).result.checks.some(c => c.label === 'proposed decision with explicit outcome' && !c.passed));
  fs.writeFileSync(decisionFile, decision);
  const source = fs.readFileSync(path.join(noChange.root, 'export.mjs'), 'utf8');
  write(noChange.root, 'export.mjs', source + '\n// Unauthorized product edit.\n');
  assert.equal(noChange.check(1).result.passed, false); write(noChange.root, 'export.mjs', source);
  write(noChange.root, '.cliewen-openspec/evidence.json', '{}');
  assert.ok(noChange.check(1).result.checks.some(c => c.label === 'no product evidence invented' && !c.passed));
  fs.unlinkSync(path.join(noChange.root, '.cliewen-openspec/evidence.json'));

  const handoff = fixture('discovery-delivery-handoff');
  investigate(handoff, 'discovery-delivery-handoff', 'delivery');
  handoff.ospec('new', 'change', 'add-csv-marker', '--schema', 'cliewen-delivery'); handoff.instruction('add-csv-marker', 'proposal');
  write(handoff.root, 'openspec/changes/add-csv-marker/proposal.md', '# Proposal\nReview a later additive option from the proposed investigation. No implementation or IDs are authorized.\n');
  assert.equal(handoff.check().result.branchObserved, true);
  write(handoff.root, 'openspec/changes/add-csv-marker/tasks.md', '# Unauthorized delivery tasks\n');
  assert.ok(handoff.check(1).result.checks.some(c => c.label === 'handoff stops at proposal' && !c.passed));

  const combined = fixture('combined-no-delivery');
  const combinedBase = investigate(combined, 'combined-no-delivery', 'no-change');
  assert.equal(combined.check().result.branchObserved, true);
  const metadataFile = path.join(combined.root, combinedBase, '.openspec.yaml');
  const metadata = parse(fs.readFileSync(metadataFile, 'utf8')); metadata.skip_specs = false; fs.writeFileSync(metadataFile, stringify(metadata));
  assert.equal(combined.check(1).result.passed, false);
  write(combined.root, combinedBase + 'decision.md', '---\ntype: decision\nstatus: proposed\noutcome: delivery\n---\n# Proposed delivery\nStop for actual human acceptance.\n');
  fs.unlinkSync(path.join(combined.root, combinedBase, 'tasks.md'));
  const blocked = combined.check(); assert.equal(blocked.result.branchObserved, false);
  const saved = fs.readFileSync(path.join(blocked.artifacts, 'variant-checks.json'), 'utf8');
  run(repository, process.execPath, ['scripts/check-release-variant.mjs', combined.root, blocked.artifacts], 1);
  assert.equal(fs.readFileSync(path.join(blocked.artifacts, 'variant-checks.json'), 'utf8'), saved);

  const delivery = fixture('csv-bom-final-tests');
  const change = 'add-optional-csv-bom', base = `openspec/changes/${change}/`;
  delivery.ospec('new', 'change', change, '--schema', 'cliewen-delivery');
  delivery.instruction(change, 'proposal'); write(delivery.root, base + 'proposal.md', '# Proposal\n\n## Why\nAdd the requested optional encoding marker while preserving the current CSV body and default output.\n\n## What Changes\nAdd an optional BOM.\n\n## Capabilities\n### New Capabilities\nNone.\n### Modified Capabilities\n- csv-export: optional marker\n\n## Impact\nOne formatter option.\n');
  delivery.instruction(change, 'specs');
  const id = nextId(delivery.root, 'csv-export');
  write(delivery.root, base + 'specs/csv-export/spec.md', `# Delta\n\n## ADDED Requirements\n\n### Requirement: Optional marker\nThe function SHALL add one U+FEFF when requested and preserve default content.\n\n#### Scenario: Request a marker [${id}]\nTest-type: Unit\n- **WHEN** a caller enables the option\n- **THEN** one marker precedes the unchanged CSV body\n`);
  delivery.instruction(change, 'design'); write(delivery.root, base + 'design.md', '# Design\nPreserve serialization and add a prefix only for an enabled Boolean option.\n');
  delivery.instruction(change, 'tasks'); write(delivery.root, base + 'tasks.md', `# Tasks\n- [x] 1.1 Implement the optional prefix; inspect the formatter diff as the completion check.\n\n## Final verification\n- [x] 2.1 Verify task 1.1 / ${id} at the Unit boundary with node --test test/export.test.mjs.\n`);
  const formatter = fs.readFileSync(path.join(delivery.root, 'export.mjs'), 'utf8').replace('export function exportCsv(records, columns)', 'export function exportCsv(records, columns, {bom = false} = {})').replace("return rows.map", "return (bom ? '\\uFEFF' : '') + rows.map");
  write(delivery.root, 'export.mjs', formatter);
  fs.appendFileSync(path.join(delivery.root, 'test/export.test.mjs'), `\ntest('optional marker [${id}] [Test-type: Unit]', () => assert.equal(exportCsv([], ['name'], {bom: true}), '\\uFEFFname\\r\\n'));\n`);
  delivery.instruction(change, 'apply');
  run(delivery.root, 'git', ['add', '.']); run(delivery.root, 'git', ['commit', '-m', 'Deterministic final-suite control']);
  run(delivery.root, process.execPath, ['node_modules/cliewen-openspec/adapters/node-test.mjs', '--change', change, 'test/export.test.mjs']);
  assert.equal(delivery.check().result.passed, true);
  const configFile = path.join(delivery.root, '.cliewen-openspec/config.yaml'); const config = parse(fs.readFileSync(configFile, 'utf8')); config.testing.placement = 'per-task'; fs.writeFileSync(configFile, stringify(config));
  const invalid = delivery.check(1).result; assert.ok(invalid.checks.some(c => c.label === 'end-of-change placement retained' && !c.passed));
});
