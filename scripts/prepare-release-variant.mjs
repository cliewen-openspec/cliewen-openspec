import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {parse, stringify} from 'yaml';
import {releaseVariants} from './lib/release-variants.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
const [scenario, output, ...extra] = process.argv.slice(2);
const definition = Object.hasOwn(releaseVariants, scenario) ? releaseVariants[scenario] : undefined;
if (!definition || extra.length || (output && !path.isAbsolute(output))) throw Error('Use npm run trial:cli:prepare -- variant SCENARIO [ABSOLUTE_NEW_DIRECTORY]');
const trial = output ?? path.join(os.tmpdir(), `cliewen-${scenario}-${Date.now()}`);
const run = (exe, args, cwd = source) => {
  const result = spawnSync(exe, args, {cwd, env: {...process.env, OPENSPEC_TELEMETRY: '0', CI: '1'}, encoding: 'utf8', timeout: 180000});
  if (result.status !== 0) throw Error(`${result.stdout}\n${result.stderr}`);
  return result.stdout.trim();
};
// The base preparer enforces a new directory outside the source checkout.
const prepared = JSON.parse(run(process.execPath, [definition.base, trial]));
const {root, artifacts} = prepared;
if (definition.placement) {
  const configFile = path.join(root, '.cliewen-openspec/config.yaml');
  const config = parse(fs.readFileSync(configFile, 'utf8'));
  config.testing.placement = definition.placement;
  fs.writeFileSync(configFile, stringify(config));
}
fs.writeFileSync(path.join(root, 'trial-brief.md'), fs.readFileSync(path.join(source, `docs/testing/release-variants/${scenario}/brief.md`)));
run('git', ['add', '.'], root);
run('git', ['commit', '-m', `Prepare ${scenario} evaluation baseline`], root);
const baseline = run('git', ['rev-parse', 'HEAD'], root);
const metadataFile = path.join(artifacts, 'baseline.json');
const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
metadata.variantPreparationBaseline = metadata.baseline;
metadata.baseline = baseline;
metadata.scenario = scenario;
fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2) + '\n');
fs.renameSync(path.join(artifacts, 'baseline.bundle'), path.join(artifacts, 'variant-preparation-baseline.bundle'));
run('git', ['bundle', 'create', path.join(artifacts, 'baseline.bundle'), '--all'], root);
for (const file of ['prompt.md', 'rubric.md']) fs.copyFileSync(path.join(source, `docs/testing/release-variants/${scenario}/${file}`), path.join(artifacts, file));
const suite = {preparedAt: new Date().toISOString(), cases: [{schema: definition.schema, scenario, profile: 'codex-cli-primary', project: root, artifacts, baseline, checker: 'scripts/check-release-variant.mjs'}]};
const suiteFile = path.join(trial, 'suite.json');
fs.writeFileSync(suiteFile, JSON.stringify(suite, null, 2) + '\n');
console.log(JSON.stringify({...prepared, baseline, scenario, suite: suiteFile}, null, 2));
