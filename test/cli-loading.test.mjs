import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';

const cli=fileURLToPath(new URL('../dist/cli.js',import.meta.url));

test('ordinary CLI commands avoid documentation parsers and the docs command loads them',t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-cli-loading-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const bootstrap=path.join(root,'register.mjs');
  fs.writeFileSync(bootstrap,"import {register} from 'node:module'; register(new URL('./deny-parser.mjs',import.meta.url),import.meta.url);\n");
  fs.writeFileSync(path.join(root,'deny-parser.mjs'),"export async function resolve(specifier,context,next){if(['markdown-it','github-slugger','jsdom','mermaid'].includes(specifier))throw Error('Unexpected documentation parser import: '+specifier);return next(specifier,context);}\n");
  const run=args=>spawnSync(process.execPath,['--import',pathToFileURL(bootstrap).href,cli,...args,'--root',root],{encoding:'utf8',timeout:30000});
  for(const args of [['--version'],['--help']]){
    const r=run(args);assert.equal(r.status,0,`${r.stdout}\n${r.stderr}\n${r.error??''}`);assert.ok(r.stdout.trim());
  }
  const r=run(['docs','check','--json']);assert.equal(r.status,2,r.stderr);
  assert.match(JSON.parse(r.stdout).error,/Unexpected documentation parser import/);
});
