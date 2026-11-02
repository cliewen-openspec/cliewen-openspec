import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const [location, ...extra] = process.argv.slice(2);
if (extra.length || (location && !path.isAbsolute(location))) throw Error('Use npm run trial:quality:combined -- [ABSOLUTE_NEW_DIRECTORY]');
const trial = location ?? path.join(os.tmpdir(), `cliewen-combined-quality-${Date.now()}`);
const script = fileURLToPath(new URL('./prepare-quality-lifecycle-trial.mjs', import.meta.url));
const result = spawnSync(process.execPath, [script, trial, 'cliewen-all'], {env: process.env, encoding: 'utf8', timeout: 180000, windowsHide: true});
if (result.status !== 0) throw Error(`${result.stdout}\n${result.stderr}`);
process.stdout.write(result.stdout);
