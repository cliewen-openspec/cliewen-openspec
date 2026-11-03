import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {parse, stringify} from 'yaml';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [location, schema = 'cliewen-delivery', ...extra] = process.argv.slice(2);
if (extra.length || !['cliewen-delivery', 'cliewen-all'].includes(schema) || (location && !path.isAbsolute(location))) throw Error('Use npm run trial:quality:prepare -- [ABSOLUTE_NEW_DIRECTORY] [cliewen-delivery|cliewen-all]');
const combined = schema === 'cliewen-all';
const trial = location ?? path.join(os.tmpdir(), `cliewen-quality-lifecycle-${Date.now()}`);
const relative = path.relative(source, trial);
if (!relative || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))) throw Error('Trial must be outside the source checkout');
if (fs.existsSync(trial)) throw Error('Preserve existing attempts; choose a new directory');
const npm = process.env.npm_execpath;
if (!npm) throw Error('Run through npm run trial:quality:prepare');
const root = path.join(trial, 'project'), artifacts = path.join(trial, 'artifacts');
fs.mkdirSync(root, {recursive: true}); fs.mkdirSync(artifacts);
const commands = [];
function run(executable, argv, cwd = root, expected = 0) {
  const env = {...process.env, OPENSPEC_TELEMETRY: '0', CI: '1'}; delete env.NODE_TEST_CONTEXT;
  const r = spawnSync(executable, argv, {cwd, encoding: 'utf8', timeout: 120000, windowsHide: true, env});
  commands.push({executable, argv, cwd, exitCode: r.status, stdout: r.stdout, stderr: r.stderr});
  fs.writeFileSync(path.join(artifacts, 'setup-commands.json'), JSON.stringify(commands, null, 2) + '\n');
  if (r.status !== expected) throw Error(`Setup expected ${expected}, got ${r.status}: ${r.stdout}\n${r.stderr}`);
  return r.stdout.trim();
}
function write(file, value) { fs.mkdirSync(path.dirname(path.join(root, file)), {recursive: true}); fs.writeFileSync(path.join(root, file), value); }
const fixture = path.join(source, 'docs/testing/quality-lifecycle-trial/fixture');
// npm test already built this checkout; rebuilding it during parallel CLI tests can truncate their inputs.
if (process.env.CLIEWEN_TRIAL_PREBUILT !== '1') run(process.execPath, [npm, 'run', 'build'], source);
else if (!fs.existsSync(path.join(source, 'dist/cli.js'))) throw Error('Build the checkout before selecting prebuilt trial inputs');
const pack = JSON.parse(run(process.execPath, [npm, 'pack', '--json', '--ignore-scripts', '--pack-destination', artifacts], source))[0];
const tar = path.join(artifacts, pack.filename);
write('package.json', JSON.stringify({name: 'count-quality-agent-trial', private: true, type: 'module', scripts: {test: 'node --test test/*.test.mjs'}}, null, 2) + '\n');
run(process.execPath, [npm, 'install', '--ignore-scripts', '--no-audit', '--no-fund', '--save-exact', tar, '@fission-ai/openspec@1.15.0']);
const ospec = (...args) => run(process.execPath, ['node_modules/@fission-ai/openspec/bin/openspec.js', ...args]);
const cl = (...args) => run(process.execPath, ['node_modules/cliewen-openspec/dist/cli.js', ...args]);
ospec('init', '--tools', 'none', '--no-animation'); cl('init', '--default');
if (combined) {
  const file = path.join(root, 'openspec/config.yaml');
  const config = parse(fs.readFileSync(file, 'utf8')); config.schema = schema;
  fs.writeFileSync(file, stringify(config));
}
const settings = parse(fs.readFileSync(path.join(root, '.cliewen-openspec/config.yaml'), 'utf8'));
settings.ac.capabilities = {count: 'COUNT'};
settings.testing.quality.coverage = {mode: 'enforce', minimumCases: {positive: 2, negative: 1, boundary: 1}};
settings.testing.quality.effectiveness.mode = 'enforce'; settings.testing.lifecycle.mode = 'enforce';
write('.cliewen-openspec/config.yaml', stringify(settings));
for (let n = 1; n <= 3; n++) if (cl('ac', 'next', '--capability', 'count') !== `COUNT-00${n}`) throw Error('Unexpected baseline ID');
for (const file of ['count.mjs', 'test/count.test.mjs', 'test/shared.test.mjs', 'test/limit.test.mjs']) write(file, fs.readFileSync(path.join(fixture, file), 'utf8'));
write('openspec/specs/count/spec.md', fs.readFileSync(path.join(fixture, 'spec.md'), 'utf8'));
const request = combined ? 'change-request.md' : 'accepted-change.md';
write(`docs/${request}`, fs.readFileSync(path.join(fixture, request), 'utf8'));
write('docs/reference/test-quality.md', fs.readFileSync(path.join(source, 'docs/testing/test-quality.md'), 'utf8'));
write('README.md', `# Count parser\n\n\`parseCount(value)\` in \`count.mjs\` parses canonical decimal text from 1 through 99. It returns the exact numeric value. Malformed text or non-string input throws TypeError; zero, unsafe integers, and values above 99 throw RangeError.\n\nRun \`npm test\`. The existing suite passes, but its coverage and assertion quality have not been accepted. The configured quality policies are enforced. Read [the range-change ${combined ? 'request' : 'agreement'}](docs/${request}) before modifying behavior.\n`);
write('AGENTS.md', `Write project content in US English. Read project configuration, permanent specs, and docs/${request}. Retrieve installed ${schema} instructions for every OpenSpec artifact and apply before using them. Preserve document paths and existing scenario IDs. Use only this disposable project; do not inspect sibling evaluator artifacts or previous solutions.${combined ? ' Stop at human review with a proposed decision. Do not implement, change tests, claim acceptance, or archive before actual agreement on this recommendation.' : ''}\n`);
write('.gitignore', 'node_modules/\n.trial/\n');
run('git', ['init', '-b', 'main']); run('git', ['config', 'user.name', 'Cliewen trial']); run('git', ['config', 'user.email', 'trial@example.invalid']);
run('git', ['add', '.']); run('git', ['commit', '-m', 'Establish count parser with incomplete test quality']);
run(process.execPath, ['--test', 'test/count.test.mjs', 'test/shared.test.mjs', 'test/limit.test.mjs']);
ospec('validate', '--specs', '--strict');
const baseline = run('git', ['rev-parse', 'HEAD']);
run(process.execPath, ['node_modules/cliewen-openspec/adapters/node-test.mjs', 'test/count.test.mjs', 'test/shared.test.mjs', 'test/limit.test.mjs']);
const initialCheck = JSON.parse(run(process.execPath, ['node_modules/cliewen-openspec/dist/cli.js', 'check', '--json'], root, 1));
if (initialCheck.ok || !initialCheck.findings.some(f => f.code === 'coverage-minimum-unmet')) throw Error('Baseline must expose the quality gap');
const metadata = {preparedAt: new Date().toISOString(), sourceRevision: run('git', ['rev-parse', 'HEAD'], source), sourceStatus: run('git', ['status', '--porcelain'], source), schema, baseline, package: {version: pack.version, filename: pack.filename, sha256: createHash('sha256').update(fs.readFileSync(tar)).digest('hex')}, node: process.version, npm: run(process.execPath, [npm, '--version']), openspec: '1.15.0', root};
fs.writeFileSync(path.join(artifacts, 'baseline.json'), JSON.stringify(metadata, null, 2) + '\n');
fs.writeFileSync(path.join(artifacts, 'baseline-check.json'), JSON.stringify(initialCheck, null, 2) + '\n');
fs.copyFileSync(path.join(root, '.cliewen-openspec/evidence.json'), path.join(artifacts, 'baseline-evidence.json'));
for (const file of ['prompt.md', 'rubric.md']) fs.copyFileSync(path.join(source, 'docs/testing/quality-lifecycle-trial', (combined ? 'combined-' : '') + file), path.join(artifacts, file));
run('git', ['bundle', 'create', path.join(artifacts, 'baseline.bundle'), '--all']);
const cases = [{schema, scenario: combined ? 'combined-quality-and-retirement' : 'delivery-quality-and-retirement', profile: 'codex-cli-primary', project: root, artifacts, baseline, checker: 'scripts/check-quality-lifecycle-trial.mjs', ...(combined ? {reviewChecker: 'scripts/check-quality-lifecycle-review.mjs'} : {})}];
fs.writeFileSync(path.join(trial, 'suite.json'), JSON.stringify({preparedAt: metadata.preparedAt, cases}, null, 2) + '\n');
console.log(JSON.stringify({trial, root, artifacts, baseline, suite: path.join(trial, 'suite.json')}, null, 2));
