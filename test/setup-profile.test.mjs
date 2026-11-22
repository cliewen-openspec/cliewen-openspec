import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn, spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {applyProfile, profileSnapshot} from '../dist/core.js';

const cli = new URL('../dist/cli.js', import.meta.url);
const config = '.cliewen-openspec/config.yaml';
const profile = '.cliewen-openspec/setup-profile.json';

function project(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-profile-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  for (const dir of ['openspec/specs', 'openspec/changes']) fs.mkdirSync(path.join(root, dir), {recursive: true});
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const write = (file, value) => fs.writeFileSync(path.join(root, file), value);
  const run = (...args) => {
    const result = spawnSync(process.execPath, [fileURLToPath(cli), ...args], {cwd: root, encoding: 'utf8', timeout: 15000});
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return JSON.parse(result.stdout);
  };
  return {root, read, write, run};
}

test('scripts can opt in, preview, and selectively switch to team without changing other settings', t => {
  const f = project(t);
  assert.equal(f.run('init').setupProfile, undefined);
  assert.equal(fs.existsSync(path.join(f.root, profile)), false);
  assert.ok(f.run('init', '--profile', 'solo', '--dry-run', '--json').writes.includes(profile));
  assert.equal(fs.existsSync(path.join(f.root, profile)), false);
  f.run('init', '--profile', 'solo', '--json');
  assert.equal(JSON.parse(f.read(profile)).profile, 'solo');
  const custom = '# Project choices\nfeatures:\n  review: false # Keep this note\n  planning: false\ntesting:\n  placement: end-of-change\n';
  f.write(config, custom);
  const solo = f.run('profile', 'solo', '--concurrent', '--json');
  assert.ok(solo.recommendations.some(text => text.includes('ac coordinate')));
  const preview = f.run('profile', 'team', '--shared-review', '--json');
  assert.deepEqual(preview.settings, [{key: 'features.review', current: false, proposed: true, selected: false}]);
  assert.ok(preview.recommendations.every(text => !text.includes('ac coordinate')));
  assert.equal(JSON.parse(f.read(profile)).profile, 'solo');
  assert.equal(f.read(config), custom);
  assert.deepEqual(f.run('profile', 'team', '--apply', '--json').writes, [profile]);
  assert.equal(f.read(config), custom);
  f.run('profile', 'solo', '--apply', '--json');
  const applied = f.run('profile', 'team', '--shared-review', '--apply', '--enable-review', '--json');
  assert.deepEqual(applied.settings, preview.settings.map(setting => ({...setting, selected: true})));
  assert.equal(JSON.parse(f.read(profile)).profile, 'team');
  assert.equal(f.read(config), custom.replace('review: false', 'review: true'));
  assert.equal(fs.existsSync(path.join(f.root, '.cliewen-openspec/ac-coordination.json')), false);
  assert.equal(f.run('update').writes.length, 0);
  f.run('uninstall');
  assert.equal(JSON.parse(f.read(profile)).profile, 'team');
});

test('profile writes reject stale selections and roll back together', t => {
  const f = project(t);
  f.run('init', '--profile', 'solo', '--json');
  const custom = 'features:\n  review: false\n';
  f.write(config, custom);
  const selection = {profile: 'team', enableReview: true, basis: profileSnapshot(f.root)};
  f.write(config, custom + '# concurrent edit\n');
  assert.throws(() => applyProfile(f.root, selection), /changed after preview/);
  f.write(config, custom);
  const original = fs.writeFileSync;
  let failed = false;
  const mock = t.mock.method(fs, 'writeFileSync', function(file, ...args) {
    if (file === path.join(f.root, config) && !failed) {
      failed = true;
      throw Error('simulated write failure');
    }
    return original.call(this, file, ...args);
  });
  try {
    assert.throws(() => applyProfile(f.root, selection), /simulated write failure/);
  } finally {
    mock.mock.restore();
  }
  assert.equal(JSON.parse(f.read(profile)).profile, 'solo');
  assert.equal(f.read(config), custom);
});

test('interactive initialization explains the choice before asking', {timeout: 20000}, async t => {
  const f = project(t);
  const interactive = async (answers) => {
    const wrapper = `process.stdin.isTTY = process.stdout.isTTY = true; process.argv.splice(1, 0, 'cli'); import(${JSON.stringify(cli.href)});`;
    const child = spawn(process.execPath, ['--eval', wrapper, '--', 'init'], {cwd: f.root, stdio: ['pipe', 'pipe', 'pipe']});
    const timer = setTimeout(() => child.kill(), 5000);
    let transcript = '', output = '', index = 0;
    child.stdout.on('data', chunk => {output += chunk;});
    child.stderr.on('data', chunk => {
      transcript += chunk;
      if (index < answers.length && transcript.includes(answers[index][0])) child.stdin.write(answers[index++][1] + '\n');
    });
    try {
      const code = await new Promise((resolve, reject) => {
        child.once('error', reject);
        child.once('close', resolve);
      });
      assert.equal(code, 0, transcript);
      assert.equal(index, answers.length);
      return {transcript, result: JSON.parse(output)};
    } finally {
      clearTimeout(timer);
    }
  };
  const skipped = await interactive([['Choose later [later]', '']]);
  assert.match(skipped.transcript, /Assign acceptance IDs locally.*test each implementation task.*CI separately/);
  assert.equal(skipped.result.setupProfile, undefined);
  for (const choice of ['solo', 'team']) {
    const chosen = await interactive([['Choose later [later]', choice], ['allocate IDs concurrently?', 'no']]);
    assert.match(chosen.transcript, /Keep your current settings/);
    assert.equal(chosen.result.setupProfile.proposed, choice);
  }
});
