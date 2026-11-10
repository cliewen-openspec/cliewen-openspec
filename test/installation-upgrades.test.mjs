import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {compatibility} from '../dist/compatibility.js';
import {requirements, meetsMinimum, supportsInstallation} from '../dist/release.js';
import {init, update, lifecycle, recover} from '../dist/core.js';

const source = fileURLToPath(new URL('../', import.meta.url));
const cli = path.join(source, 'dist/cli.js');
const write = (root, file, text) => { fs.mkdirSync(path.dirname(path.join(root, file)), {recursive:true}); fs.writeFileSync(path.join(root,file),text); };
function fixture(t) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen upgrade space '));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  write(root,'openspec/config.yaml','schema: spec-driven\n');
  for(const d of ['openspec/specs','openspec/changes'])fs.mkdirSync(path.join(root,d),{recursive:true});
  return root;
}
function localTool(root, script="console.log('1.17.0')") {
  write(root,'node_modules/@fission-ai/openspec/package.json',JSON.stringify({name:'@fission-ai/openspec',version:'1.17.0',main:'index.cjs',bin:{openspec:'bin/openspec.cjs'}}));
  write(root,'node_modules/@fission-ai/openspec/index.cjs','');
  write(root,'node_modules/@fission-ai/openspec/bin/openspec.cjs',script);
}
function snapshot(root) {
  const files={};
  const visit=dir=>{for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())visit(p);else files[path.relative(root,p)]=fs.readFileSync(p).toString('base64');}};
  visit(root);return files;
}
function withPath(value,fn) { const previous=process.env.PATH;process.env.PATH=value;try{return fn();}finally{if(previous===undefined)delete process.env.PATH;else process.env.PATH=previous;} }

test('release minimums use numerical stable-version comparisons and declared source routes',()=>{
  assert.deepEqual(requirements,{node:'20.19.0',openspec:'1.15.0'});
  assert.equal(JSON.parse(fs.readFileSync(path.join(source,'package.json'),'utf8')).engines.node,`>=${requirements.node}`);
  for(const [v,min,expected] of [['1.15.0','1.15.0',true],['1.9.0','1.15.0',false],['1.100.0','1.15.0',true],['20.18.99','20.19.0',false],['20.19.0','20.19.0',true],['1.15.0+build.7','1.15.0',true],['1.15.0-beta.1','1.15.0',false],['01.15.0','1.15.0',false],['garbage','1.15.0',false],['1.15','1.15.0',false]])assert.equal(meetsMinimum(v,min),expected,v);
  assert.equal(supportsInstallation('0.1.0'),true);
  for(const v of ['0.1.0-alpha.1','0.2.0','9.0.0',null])assert.equal(supportsInstallation(v),false);
});

test('incompatible local tool wins over PATH and blocks writing, preview and recovery',t=>{
  const root=fixture(t);localTool(root);
  init(root,false,false);
  write(root,'.cliewen-openspec/transaction.json',JSON.stringify({files:{'docs/authored.md':'restore me'}}));
  for(const script of ["console.log('1.14.9')","console.log('1.15.0-beta.1')","console.log('not a version')","process.exit(1)"]){
    localTool(root,script);const before=snapshot(root);
    for(const dry of [true,false])for(const operation of ['init','update']){
      assert.throws(()=>lifecycle(root,operation,dry),/OpenSpec.*(unsupported|probe failed)/);
      assert.deepEqual(snapshot(root),before);
    }
  }
  localTool(root);
  assert.throws(()=>update(root,true),/run recover/);
  const result=lifecycle(root,'update');assert.equal(result.recoveredTransaction,true);assert.equal(fs.readFileSync(path.join(root,'docs/authored.md'),'utf8'),'restore me');
  localTool(root,"console.log('1.14.9')");assert.throws(()=>update(root,true),/unsupported/);
  // Explicit recovery remains available even when the selected tool is unusable.
  write(root,'.cliewen-openspec/transaction.json',JSON.stringify({files:{'docs/authored.md':'explicit recovery'}}));recover(root);
  assert.equal(fs.readFileSync(path.join(root,'docs/authored.md'),'utf8'),'explicit recovery');
});

test('local tool probing is bounded and rejects broken selected packages',t=>{
  const root=fixture(t);localTool(root,'setInterval(()=>{},1000)');const before=snapshot(root);
  assert.throws(()=>init(root,true,false),/exceeded 5 seconds/);assert.deepEqual(snapshot(root),before);
  localTool(root);fs.unlinkSync(path.join(root,'node_modules/@fission-ai/openspec/bin/openspec.cjs'));
  assert.throws(()=>compatibility(root),/probe failed/);
  const broken=fixture(t);localTool(broken);fs.unlinkSync(path.join(broken,'node_modules/@fission-ai/openspec/index.cjs'));
  assert.throws(()=>compatibility(broken),/cannot be resolved/);
});

test('missing PATH tool is actionable and does not initialize the project',t=>{
  const root=fixture(t),before=snapshot(root);
  withPath('',()=>assert.throws(()=>init(root,false,false),/OpenSpec not found.*1.15.0/));assert.deepEqual(snapshot(root),before);
});

test('an unsupported running Node stops before probing tools or changing project state',t=>{
  const root=fixture(t),before=snapshot(root),descriptor=Object.getOwnPropertyDescriptor(process.versions,'node');
  try {
    Object.defineProperty(process.versions,'node',{...descriptor,value:'20.18.0'});
    withPath('',()=>assert.throws(()=>init(root,false,false),/Node 20.18.0.*20.19.0/));
    assert.deepEqual(snapshot(root),before);
  } finally { Object.defineProperty(process.versions,'node',descriptor); }
});

test('explicit default selection preserves unrelated YAML values or refuses shared aliases',t=>{
  const root=fixture(t);localTool(root);
  write(root,'openspec/config.yaml','# Keep comment\nschema: &selected spec-driven\nother: *selected\n');
  const before=snapshot(root);assert.throws(()=>init(root,false,true),/shared anchors/);assert.deepEqual(snapshot(root),before);
  write(root,'openspec/config.yaml','# Keep comment\nschema: spec-driven\nother: keep this\n');
  init(root,false,true);
  const text=fs.readFileSync(path.join(root,'openspec/config.yaml'),'utf8');assert.match(text,/# Keep comment/);assert.match(text,/schema: cliewen-delivery/);assert.match(text,/other: keep this/);
});

test('PATH shim or executable in a path with spaces is probed without shell interpolation',t=>{
  const root=fixture(t),bin=path.join(root,'tool bin');fs.mkdirSync(bin);
  if(process.platform==='win32'){
    write(bin,'tool.cjs',"console.log('1.16.0')");
    write(bin,'openspec.cmd','@echo off\r\n"%_prog%" "%dp0%\\tool.cjs" %*\r\n');
  }else{
    write(bin,'openspec',`#!${process.execPath}\nconsole.log('1.16.0')\n`);fs.chmodSync(path.join(bin,'openspec'),0o755);
  }
  withPath(bin,()=>{const result=compatibility(root);assert.equal(result.openspec.version,'1.16.0');assert.match(result.openspec.source,/PATH/);});
  if(process.platform==='win32'){
    write(bin,'openspec.cmd','@echo off\r\necho 1.17.0\r\n');
    withPath(bin,()=>assert.throws(()=>compatibility(root),/Cannot safely resolve/));
  }
});

test('Windows standalone executable works without npm metadata',t=>{
  if(process.platform!=='win32'){t.skip('Windows executable probe; POSIX executable is covered separately');return;}
  const compiler=path.join(process.env.WINDIR??'C:/Windows','Microsoft.NET/Framework64/v4.0.30319/csc.exe');
  if(!fs.existsSync(compiler)){t.skip('C# fixture compiler unavailable');return;}
  const root=fixture(t),bin=path.join(root,'standalone space');fs.mkdirSync(bin);
  write(bin,'fixture.cs','class Fixture { static void Main() { System.Console.WriteLine("1.17.0"); } }');
  const r=spawnSync(compiler,['/nologo',`/out:${path.join(bin,'openspec.exe')}`,path.join(bin,'fixture.cs')],{encoding:'utf8',timeout:30000});assert.equal(r.status,0,r.stdout+r.stderr);
  withPath(bin,()=>assert.equal(compatibility(root).openspec.version,'1.17.0'));
});

test('preview metadata agrees with apply, preserves authored state and rechecks intervening edits',t=>{
  const root=fixture(t);localTool(root);
  write(root,'docs/README.md','# Existing address\n');write(root,'AGENTS.md','Project rules\n');
  const before=snapshot(root),preview=lifecycle(root,'init',true);
  assert.equal(preview.installedVersion,null);assert.equal(preview.targetVersion,'0.1.0');assert.deepEqual(preview.creates,preview.writes);assert.deepEqual(preview.replaces,[]);assert.deepEqual(snapshot(root),before);
  assert.deepEqual(lifecycle(root,'init'),preview);
  assert.equal(fs.readFileSync(path.join(root,'docs/README.md'),'utf8'),'# Existing address\n');assert.equal(fs.readFileSync(path.join(root,'AGENTS.md'),'utf8'),'Project rules\n');
  const quiet=lifecycle(root,'update',true);assert.equal(quiet.installedVersion,'0.1.0');assert.deepEqual(quiet.writes,[]);
  const owned='openspec/schemas/cliewen-delivery/templates/tasks.md';
  fs.unlinkSync(path.join(root,owned));assert.ok(lifecycle(root,'update',true).creates.includes(owned));
  write(root,owned,'a new unapproved local edit');const changed=snapshot(root);assert.throws(()=>lifecycle(root,'update'),/Conflict/);assert.deepEqual(snapshot(root),changed);
  const run=spawnSync(process.execPath,[cli,'update','--root',root,'--json'],{encoding:'utf8'});assert.equal(run.status,2);assert.equal(JSON.parse(run.stdout).ok,false);
});
