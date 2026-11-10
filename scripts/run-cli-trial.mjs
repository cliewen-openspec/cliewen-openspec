import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawn, spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parse} from 'yaml';
import {createHash} from 'node:crypto';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [suiteFile, profileId, schema, continuation, ...extra] = process.argv.slice(2);
const reviewing = continuation === '--review';
const approvalFile = reviewing ? undefined : continuation;
const reviewFile = reviewing ? extra[0] : undefined;
if (!suiteFile || !profileId || !schema || (reviewing ? !reviewFile || extra.length !== 1 : extra.length)) throw Error('Use npm run trial:cli -- SUITE PROFILE SCHEMA [APPROVAL_FILE | --review PROMPT_FILE]');
const plan = parse(fs.readFileSync(path.join(source, 'docs/testing/agent-evaluation.yaml'), 'utf8'));
const profile = plan.profiles[profileId];
if (profile?.readiness !== 'pinned') throw Error('Select a pinned CLI profile');
const isCodex = profile.agent === 'Codex CLI' && profile.runner === 'cli';
const trial = JSON.parse(fs.readFileSync(suiteFile, 'utf8')).cases.find(c => c.profile === profileId && c.schema === schema);
if (!trial) throw Error('Case not present in the suite');
if (approvalFile && schema !== 'cliewen-all') throw Error('Approval continuation is only supported for the staged combined scenario');
const relativeProject = path.relative(source, path.resolve(trial.project));
if (!relativeProject || (!relativeProject.startsWith(`..${path.sep}`) && relativeProject !== '..' && !path.isAbsolute(relativeProject))) throw Error('Trial project must be outside the source checkout');
const relativeArtifacts = path.relative(path.resolve(trial.project), path.resolve(trial.artifacts));
if (!relativeArtifacts || (!relativeArtifacts.startsWith(`..${path.sep}`) && relativeArtifacts !== '..' && !path.isAbsolute(relativeArtifacts))) throw Error('Evaluator artifacts must be outside the agent project');
const gitState = spawnSync('git', ['rev-parse', 'HEAD'], {cwd: trial.project, encoding: 'utf8'});
if (gitState.status !== 0) throw Error('Trial project must be an existing Git baseline');
if (!approvalFile && !reviewing) {
  const dirty = spawnSync('git', ['status', '--porcelain', '--untracked-files=all'], {cwd: trial.project, encoding: 'utf8'});
  if (gitState.stdout.trim() !== trial.baseline || dirty.status !== 0 || dirty.stdout.trim()) throw Error('Initial run requires the exact clean baseline; preserve attempts and prepare a fresh clone');
}
if (reviewing) {
  const previous = JSON.parse(fs.readFileSync(path.join(trial.artifacts, 'initial/run.json'), 'utf8'));
  if (!previous.endedAt) throw Error('Finish and preserve the initial attempt before review');
}
function reviewInputs() {
  const files = spawnSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {cwd: trial.project, encoding: 'utf8'});
  if (files.status !== 0) throw Error('Cannot snapshot review inputs');
  const paths = new Set(files.stdout.split('\0').filter(Boolean));
  paths.add('.cliewen-openspec/evidence.json');
  const histories = path.join(trial.project, '.cliewen-openspec/tdd');
  if (fs.existsSync(histories)) for (const file of fs.readdirSync(histories)) if (/\.jsonl?$/.test(file)) paths.add(`.cliewen-openspec/tdd/${file}`);
  return JSON.stringify([...paths].sort().map(file => { const full = path.join(trial.project, file); return [file, fs.existsSync(full) ? createHash('sha256').update(fs.readFileSync(full)).digest('hex') : null]; }));
}
const beforeReview = reviewing ? reviewInputs() : undefined;
const phase = reviewing ? 'self-review' : approvalFile ? 'approved-continuation' : 'initial';
const dir = path.join(trial.artifacts, phase);
if (fs.existsSync(dir)) throw Error(`Retain prior attempts; this phase already exists: ${dir}`);
fs.mkdirSync(dir);
const home = os.homedir();
const npmGlobal = process.env.APPDATA ? path.join(process.env.APPDATA, 'npm/node_modules') : undefined;
let exe, args, versionArgs, prefix = [];
const env = {...process.env, NO_COLOR: '1', OPENSPEC_TELEMETRY: '0', CI: '1'};
const wrapper = 'Work only in the current project. Keep even temporary helper scripts, probes, and backups inside this project; use a project-local ignored directory when needed, not a shared system temporary directory. Read AGENTS.md and project configuration. Do not read sibling evaluator files, other repositories, credentials, or earlier solutions. Do not spawn additional agents, contact external services, push, or open a PR. Model-provider requests from this CLI are allowed. Use existing local tools and dependencies. Report actual results and inherited instructions.\n\n';
const prompt = wrapper + (reviewing ? fs.readFileSync(reviewFile, 'utf8') : approvalFile ? fs.readFileSync(approvalFile, 'utf8') : fs.readFileSync(path.join(trial.artifacts, 'prompt.md'), 'utf8'));
fs.writeFileSync(path.join(dir, 'prompt.txt'), prompt);
if (reviewing) fs.writeFileSync(path.join(dir, 'inputs-before.json'), beforeReview + '\n');
if (isCodex) {
  const cli = process.env.CLIEWEN_CODEX_CLI ?? (npmGlobal ? path.join(npmGlobal, '@openai/codex/bin/codex.js') : 'codex');
  if (/\.(?:mjs|cjs|js)$/i.test(cli)) { exe = process.execPath; prefix = [cli]; } else exe = cli;
  args = ['exec', '--ignore-user-config', '--ignore-rules', '--ephemeral', '--json', '--sandbox', 'danger-full-access', '-c', 'approval_policy="never"', '-c', 'model_provider="openai"', '-c', `model_reasoning_effort="${profile.effort}"`, '--model', profile.model, '-'];
  versionArgs = ['--version'];
} else if (profile.agent === 'Claude Code' && profile.runner === 'cli') {
  const cli = process.env.CLIEWEN_CLAUDE_CLI ?? path.join(home, '.local/bin', process.platform === 'win32' ? 'claude.exe' : 'claude');
  if (/\.(?:mjs|cjs|js)$/i.test(cli)) { exe = process.execPath; prefix = [cli]; } else exe = cli;
  args = ['-p', prompt, '--model', profile.model, '--effort', profile.effort, '--output-format', 'stream-json', '--verbose', '--safe-mode', '--no-session-persistence', '--permission-mode', 'dontAsk', '--allowedTools', 'Read,Edit,Write,Bash,PowerShell,Glob,Grep', '--disallowedTools', 'Agent,Task,WebFetch,WebSearch', '--max-budget-usd', String(profile.budgets.reportedCostUSD)];
  versionArgs = ['--version'];
} else if (profile.agent === 'OpenCode' && profile.runner === 'cli') {
  const v2 = profile.agentVersion.startsWith('2.');
  const cli = process.env.CLIEWEN_OPENCODE_CLI ?? (npmGlobal ? path.join(npmGlobal, v2 ? '@opencode/cli/bin/opencode.exe' : 'opencode-ai/bin/opencode.exe') : 'opencode');
  if (/\.(?:mjs|cjs|js)$/i.test(cli)) { exe = process.execPath; prefix = [cli]; } else exe = cli;
  versionArgs = ['--version'];
  if (v2) {
    args = ['run', '--standalone', '--format', 'json', '--model', `${profile.model}#${profile.effort}`, prompt];
    const denied = ['external_directory', 'subagent', 'question', 'skill', 'webfetch', 'websearch'];
    const config = {model: profile.model,
      permissions: [{action: '*', resource: '*', effect: 'allow'}, ...denied.map(action => ({action, resource: '*', effect: 'deny'}))],
      policies: [{action: 'provider.use', resource: '*', effect: 'deny'}, {action: 'provider.use', resource: 'opencode', effect: 'allow'},
        ...['mcp.use', 'skill.use'].map(action => ({action, resource: '*', effect: 'deny'})),
        {action: 'plugin.use', resource: '*', effect: 'deny'}, {action: 'plugin.use', resource: 'opencode.*', effect: 'allow'},
        ...denied.map(action => ({action: 'tool.use', resource: `${action}:*`, effect: 'deny'}))],
      plugins: ['-*', 'opencode.*']};
    env.OPENCODE_CONFIG_DIR = path.join(dir, 'config');
    fs.mkdirSync(env.OPENCODE_CONFIG_DIR);
    env.OPENCODE_CONFIG_CONTENT = JSON.stringify(config);
    env.OPENCODE_CONFIG_PROJECT_DISABLE = 'true';
    env.OPENCODE_DISABLE_CLAUDE_CODE = 'true';
    env.OPENCODE_DISABLE_MODELS_FETCH = 'true';
    env.OPENCODE_DISABLE_FILEWATCHER = 'true';
  } else {
    args = ['run', '--pure', '--format', 'json', '--model', profile.model, '--variant', profile.effort, prompt];
    const globalConfig = path.join(home, '.config/opencode/opencode.json');
    const global = fs.existsSync(globalConfig) ? JSON.parse(fs.readFileSync(globalConfig, 'utf8')) : {};
    env.OPENCODE_CONFIG_CONTENT = JSON.stringify({model: profile.model, small_model: profile.model, enabled_providers: ['opencode'], permission: {'*': 'allow', external_directory: 'deny', webfetch: 'deny', websearch: 'deny', task: 'deny', question: 'deny'}, mcp: Object.fromEntries(Object.keys(global.mcp ?? {}).map(name => [name, {enabled: false}]))});
    env.OPENCODE_DISABLE_AUTOUPDATE = 'true'; env.OPENCODE_DISABLE_LSP_DOWNLOAD = 'true';
    env.OPENCODE_DISABLE_CLAUDE_CODE = 'true'; env.OPENCODE_DISABLE_EXTERNAL_SKILLS = 'true';
    env.OPENCODE_DISABLE_MODELS_FETCH = 'true'; env.OPENCODE_DISABLE_DEFAULT_PLUGINS = 'true';
  }
} else throw Error('Profile has no CLI adapter');
const version = spawnSync(exe, [...prefix, ...versionArgs], {encoding: 'utf8', timeout: 15000, windowsHide: true});
const versionText = version.stdout?.trim();
if (version.status !== 0 || versionText?.match(/\bv?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?)\b/)?.[1] !== profile.agentVersion) {
  fs.writeFileSync(path.join(dir, 'run.json'), JSON.stringify({profileId, schema, phase, profile, cliVersion: versionText ?? null, failure: 'version-preflight', evaluation: 'infrastructure-failure'}, null, 2) + '\n');
  throw Error(`CLI version differs from pinned ${profile.agentVersion}: ${versionText ?? version.error?.message}`);
}
const startedAt = new Date().toISOString();
const started = Date.now();
const monotonicStarted = performance.now();
const controlledKeys = ['OPENCODE_CONFIG_CONTENT', 'OPENCODE_CONFIG_DIR', 'OPENCODE_CONFIG_PROJECT_DISABLE', 'OPENCODE_DISABLE_FILEWATCHER', 'OPENCODE_DISABLE_AUTOUPDATE', 'OPENCODE_DISABLE_LSP_DOWNLOAD', 'OPENCODE_DISABLE_CLAUDE_CODE', 'OPENCODE_DISABLE_EXTERNAL_SKILLS', 'OPENCODE_DISABLE_MODELS_FETCH', 'OPENCODE_DISABLE_DEFAULT_PLUGINS'];
const metadata = {schema, profileId, phase, project: trial.project, baseline: trial.baseline, profile, exe, args: [...prefix, ...args], cliVersion: versionText, startedAt, promptFile: 'prompt.txt', environmentControls: profile.agent === 'OpenCode' ? Object.fromEntries(controlledKeys.filter(key => env[key] !== undefined).map(key => [key, env[key]])) : {NO_COLOR: '1', OPENSPEC_TELEMETRY: '0', CI: '1'}};
fs.writeFileSync(path.join(dir, 'run.json'), JSON.stringify(metadata, null, 2) + '\n');
const stdout = fs.createWriteStream(path.join(dir, 'events.jsonl'), {flags: 'wx'});
const stderr = fs.createWriteStream(path.join(dir, 'stderr.txt'), {flags: 'wx'});
const child = spawn(exe, [...prefix, ...args], {cwd: trial.project, env, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe']});
let bytes = 0, buffer = '', stopReason, usage, reportedCostUSD = 0, eventFailure = false, sessionId;
let stopRequestedAt, stopRequestedAfterSeconds;
const stepUsage = [];
const models = new Set();
function stop(reason) {
  if (stopReason) return; stopReason = reason;
  stopRequestedAt = new Date().toISOString();
  stopRequestedAfterSeconds = (performance.now() - monotonicStarted) / 1000;
  fs.writeFileSync(path.join(dir, 'stop-request.json'), JSON.stringify({reason, stopRequestedAt, stopRequestedAfterSeconds}) + '\n');
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], {windowsHide: true, stdio: 'ignore'});
  else child.kill('SIGTERM');
}
function event(line) {
  let e; try { e = JSON.parse(line); } catch { return; }
  if (e.sessionID || e.session_id || e.thread_id) sessionId = e.sessionID ?? e.session_id ?? e.thread_id;
  if (e.type === 'error' || e.type === 'turn.failed' || (e.type === 'result' && (e.is_error || e.subtype !== 'success'))) eventFailure = true;
  if (e.type === 'turn.completed') usage = e.usage;
  if (e.type === 'result') { usage = e.usage; reportedCostUSD = e.total_cost_usd ?? reportedCostUSD; for (const model of Object.keys(e.modelUsage ?? {})) models.add(model); }
  if (e.model) models.add(e.model);
  if (e.type === 'step_finish') { reportedCostUSD += e.part?.cost ?? 0; stepUsage.push({cost: e.part?.cost, tokens: e.part?.tokens}); }
  if (profile.budgets.reportedCostUSD && reportedCostUSD >= profile.budgets.reportedCostUSD) stop('reported-cost-limit');
}
child.stdout.on('data', chunk => {
  bytes += chunk.length; stdout.write(chunk); buffer += chunk.toString();
  let end; while ((end = buffer.indexOf('\n')) !== -1) { event(buffer.slice(0, end)); buffer = buffer.slice(end + 1); }
  if (bytes > profile.budgets.outputBytes) stop('log-size-limit');
});
child.stderr.on('data', chunk => { bytes += chunk.length; stderr.write(chunk); if (bytes > profile.budgets.outputBytes) stop('log-size-limit'); });
child.stdin.end(isCodex ? prompt : undefined);
const timer = setTimeout(() => stop('wall-time-limit'), profile.budgets.wallTimeSeconds * 1000);
// A Windows stdout pipe can block the event loop when its reader pauses.
const progress = setInterval(() => fs.writeFileSync(path.join(dir, 'progress.json'), JSON.stringify({schema, profileId, phase, elapsedSeconds: Math.round((Date.now() - started) / 1000), logBytes: bytes}) + '\n'), 30000);
const result = await new Promise(resolve => {
  child.on('error', error => resolve({exitCode: null, spawnError: error.message}));
  child.on('close', (exitCode, signal) => resolve({exitCode, signal}));
});
clearTimeout(timer); clearInterval(progress); if (buffer) event(buffer);
await Promise.all([new Promise(resolve => stdout.end(resolve)), new Promise(resolve => stderr.end(resolve))]);
const reviewInputsPreserved = !reviewing || (beforeReview === reviewInputs() && spawnSync('git', ['rev-parse', 'HEAD'], {cwd: trial.project, encoding: 'utf8'}).stdout.trim() === gitState.stdout.trim());
const durationSeconds = (Date.now() - started) / 1000;
const monotonicDurationSeconds = (performance.now() - monotonicStarted) / 1000;
const deadlineExceededBySeconds = Math.max(0, Math.max(durationSeconds, monotonicDurationSeconds) - profile.budgets.wallTimeSeconds);
if (deadlineExceededBySeconds > 0 && !stopReason) stopReason = 'wall-time-limit';
const summary = {...metadata, ...result, endedAt: new Date().toISOString(), durationSeconds, monotonicDurationSeconds, deadlineExceededBySeconds, stopReason: stopReason ?? null, stopRequestedAt: stopRequestedAt ?? null, stopRequestedAfterSeconds: stopRequestedAfterSeconds ?? null, terminationDelaySeconds: stopRequestedAfterSeconds === undefined ? null : Math.max(0, monotonicDurationSeconds - stopRequestedAfterSeconds), eventFailure, sessionId: sessionId ?? null, usage: usage ?? null, stepUsage, reportedCostUSD: isCodex ? null : reportedCostUSD, observedModels: [...models], reviewInputsPreserved, evaluation: 'not-graded'};
fs.writeFileSync(path.join(dir, 'run.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify({schema, profileId, phase, exitCode: summary.exitCode, stopReason: summary.stopReason, durationSeconds: summary.durationSeconds, reportedCostUSD: summary.reportedCostUSD, observedModels: summary.observedModels, artifacts: dir}, null, 2));
process.exitCode = summary.exitCode === 0 && !stopReason && !eventFailure && reviewInputsPreserved ? 0 : 1;
