import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync,spawn} from 'node:child_process';
import childProcess from 'node:child_process';
import {syncBuiltinESMExports} from 'node:module';
import {fileURLToPath} from 'node:url';
import {parse} from 'yaml';
import {nextId,renamePrefix} from '../dist/ac.js';
import {coordinate,syncIds,resumeIds,abandonRequest,authorityRef} from '../dist/ac-coordination.js';
import {init,update,uninstall} from '../dist/core.js';
import {runtimeDirectory} from '../dist/state-lock.js';

const source=fileURLToPath(new URL('../',import.meta.url));
const cli=path.join(source,'dist/cli.js');
const env={...process.env,GIT_AUTHOR_NAME:'Trial',GIT_AUTHOR_EMAIL:'test@example.invalid',GIT_COMMITTER_NAME:'Trial',GIT_COMMITTER_EMAIL:'test@example.invalid'};
const git=(root,...args)=>{let r=spawnSync('git',args,{cwd:root,env,encoding:'utf8',windowsHide:true});assert.equal(r.status,0,r.stderr);return r.stdout.trim();};
const write=(root,file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
const registry=root=>fs.readFileSync(path.join(root,'.cliewen-openspec/ac-registry.json'),'utf8');
function fixture(t,coordinated=true){
  const base=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-ac-shared-'));t.after(()=>fs.rmSync(base,{recursive:true,force:true}));
  const remote=path.join(base,'remote.git'),a=path.join(base,'a'),b=path.join(base,'b');
  git(base,'init','--bare',remote);git(base,'init','-b','main',a);
  git(a,'remote','add','origin',remote);
  write(a,'.cliewen-openspec/config.yaml','ac:\n  capabilities: {export: EXP, support: SUP}\nfeatures: {evidence: false}\n');
  write(a,'.cliewen-openspec/ac-registry.json',JSON.stringify({EXP:6}));write(a,'openspec/specs/export/spec.md','#### Scenario: Preserved [EXP-009]\n');fs.mkdirSync(path.join(a,'openspec/changes'),{recursive:true});
  if(coordinated)coordinate(a,'origin',true);
  git(a,'add','.');git(a,'commit','-m','Baseline');git(a,'push','origin','main');git(base,'clone','--branch','main',remote,b);fs.mkdirSync(path.join(b,'openspec/changes'),{recursive:true});
  return {base,remote,a,b};
}
function child(root,...args){return new Promise(resolve=>{const c=spawn(process.execPath,[cli,...args,'--root',root],{env,windowsHide:true});let out='',err='';c.stdout.on('data',d=>out+=d);c.stderr.on('data',d=>err+=d);c.on('close',code=>resolve({code,out:out.trim(),err}));});}
function state(f){return JSON.parse(git(f.a,'show',`${authorityRef}:claims.json`));}
function replaceClaims(f,change){
  const tip=git(f.a,'ls-remote','--refs','origin',authorityRef).split(/\s+/)[0];git(f.a,'fetch','origin',tip);
  const value=JSON.parse(git(f.a,'show',`${tip}:claims.json`));change(value);
  const input=(args,text)=>{const r=spawnSync('git',args,{cwd:f.a,env,input:text,encoding:'utf8'});assert.equal(r.status,0,r.stderr);return r.stdout.trim();};
  const blob=input(['hash-object','-w','--stdin'],JSON.stringify(value));const tree=input(['mktree'],`100644 blob ${blob}\tclaims.json\n`);
  const commit=git(f.a,'commit-tree',tree,'-p',tip,'-m','Test malformed state');git(f.a,'push','origin',`${commit}:${authorityRef}`);
}

test('local defaults stay offline and same-worktree callers serialize from read through persistence',async t=>{
  const {a}=fixture(t,false);git(a,'remote','remove','origin');
  const results=await Promise.all([child(a,'ac','next','--capability','export'),child(a,'ac','next','--capability','export')]);
  for(const r of results)assert.equal(r.code,0,r.err);assert.deepEqual(results.map(r=>r.out).sort(),['EXP-010','EXP-011']);
});

test('two clones reserve distinct IDs and prefix history follows the same authority',async t=>{
  const f=fixture(t),{a,b}=f;
  const results=await Promise.all([child(a,'ac','next','--capability','export'),child(b,'ac','next','--capability','export')]);
  for(const r of results)assert.equal(r.code,0,r.err);assert.deepEqual(results.map(r=>r.out).sort(),['EXP-010','EXP-011']);
  renamePrefix(a,'export','EXPORT');assert.equal(nextId(b,'export'),'EXPORT-012');syncIds(a);
  assert.equal(parse(fs.readFileSync(path.join(b,'.cliewen-openspec/config.yaml'),'utf8')).ac.capabilities.export,'EXPORT');
  assert.throws(()=>renamePrefix(b,'support','EXP'),/reserved/);
  assert.equal(JSON.parse(registry(a)).capabilities.export.highWater,12);
  assert.equal(fs.readFileSync(path.join(a,'openspec/specs/export/spec.md'),'utf8'),'#### Scenario: Preserved [EXP-009]\n');
});

test('setup preview publishes nothing and invalid or unavailable authorities never fall back',t=>{
  const f=fixture(t,false),before=registry(f.a);
  const preview=coordinate(f.a,'origin');assert.equal(preview.action,'create-and-seed');assert.equal(registry(f.a),before);
  assert.equal(git(f.a,'ls-remote','origin',authorityRef),'');assert.equal(fs.existsSync(path.join(f.a,'.cliewen-openspec/ac-coordination.json')),false);
  coordinate(f.a,'origin',true);const seeded=registry(f.a);
  git(f.a,'remote','set-url','origin',path.join(f.base,'missing.git'));
  assert.throws(()=>nextId(f.a,'export'));assert.equal(registry(f.a),seeded);
  write(f.a,'.cliewen-openspec/ac-coordination.json','{"version":1,"mode":"unexpected"}');assert.throws(()=>nextId(f.a,'export'),/Invalid AC coordination/);assert.equal(registry(f.a),seeded);
});

test('confirmed request survives local persistence failure and resume returns it once',t=>{
  const f=fixture(t),before=registry(f.a);let published=false;
  const original=fs.writeFileSync;
  fs.writeFileSync=function(file,...args){
    // Fail local mirror persistence only after the request has reached the remote.
    if(String(file)===path.join(f.a,'.cliewen-openspec/ac-registry.json')){published=true;throw Error('simulated disk failure');}
    return original.call(this,file,...args);
  };
  try{assert.throws(()=>nextId(f.a,'export'),/disk failure/);}finally{fs.writeFileSync=original;}
  assert.ok(published);assert.equal(registry(f.a),before);assert.equal(fs.existsSync(path.join(runtimeDirectory(f.a),'request.json')),true);
  assert.throws(()=>nextId(f.a,'support'),/pending/);
  assert.equal(nextId(f.b,'export'),'EXP-011');assert.equal(resumeIds(f.a),'EXP-010');assert.equal(nextId(f.a,'export'),'EXP-012');
  assert.equal(fs.existsSync(path.join(runtimeDirectory(f.a),'request.json')),false);
});

test('denied writes retain a recoverable request and explicit abandon never reuses published IDs',t=>{
  const f=fixture(t),before=registry(f.a),hook=path.join(f.remote,'hooks/pre-receive');
  fs.writeFileSync(hook,'#!/bin/sh\nexit 1\n',{mode:0o755});
  assert.throws(()=>nextId(f.a,'export'),/could not be confirmed/);assert.equal(registry(f.a),before);
  assert.equal(fs.existsSync(path.join(runtimeDirectory(f.a),'request.json')),true);
  fs.unlinkSync(hook);abandonRequest(f.a);assert.equal(nextId(f.a,'export'),'EXP-010');
  const settings=fs.readFileSync(path.join(f.a,'.cliewen-openspec/ac-coordination.json'),'utf8');
  write(f.a,'.cliewen-openspec/ac-coordination.json','{"version":1,"mode":"local"}');assert.equal(nextId(f.a,'export'),'EXP-011');
  write(f.a,'.cliewen-openspec/ac-coordination.json',settings);coordinate(f.a,'origin',true);assert.equal(nextId(f.b,'export'),'EXP-012');
});

test('installation refresh and removal preserve project-owned coordination choices',t=>{
  const f=fixture(t),settingsFile=path.join(f.a,'.cliewen-openspec/ac-coordination.json'),settings=fs.readFileSync(settingsFile,'utf8');
  init(f.a,false,false);update(f.a);uninstall(f.a);
  assert.equal(fs.readFileSync(settingsFile,'utf8'),settings);assert.equal(nextId(f.a,'export'),'EXP-010');
});

test('deleted authority and mismatched authority identity fail without reservations',t=>{
  const f=fixture(t),before=registry(f.a);
  const settingsFile=path.join(f.a,'.cliewen-openspec/ac-coordination.json');const settings=JSON.parse(fs.readFileSync(settingsFile));
  write(f.a,'.cliewen-openspec/ac-coordination.json',JSON.stringify({...settings,authority:'00000000-0000-0000-0000-000000000000'}));assert.throws(()=>nextId(f.a,'export'),/missing or replaced/);assert.equal(registry(f.a),before);
  write(f.a,'.cliewen-openspec/ac-coordination.json',JSON.stringify(settings));git(f.a,'push','origin',`:${authorityRef}`);
  assert.throws(()=>nextId(f.a,'export'),/missing or replaced/);assert.equal(registry(f.a),before);
});

test('malformed remote claims cannot return arbitrary IDs or duplicate prefix ownership',t=>{
  for(const mutate of [v=>{v.version=99;},v=>{v.registry.capabilities.support.prefix='EXP';},v=>{v.requests['12345678-1234-1234-1234-123456789012']={signature:JSON.stringify({kind:'next',capability:'export',prefix:null}),result:'not-an-id'};}]){
    const f=fixture(t),before=registry(f.a);replaceClaims(f,mutate);assert.throws(()=>nextId(f.a,'export'),/Invalid|Duplicate|invalid/);assert.equal(registry(f.a),before);
  }
});

test('a lost push acknowledgement reconciles the same request instead of reserving twice',t=>{
  const f=fixture(t),original=childProcess.execFileSync;let interrupted=false;
  childProcess.execFileSync=function(file,args,...rest){const result=original.call(this,file,args,...rest);if(file==='git'&&args[0]==='push'&&!interrupted){interrupted=true;throw Error('simulated lost acknowledgement');}return result;};syncBuiltinESMExports();
  try{assert.equal(nextId(f.a,'export'),'EXP-010');}finally{childProcess.execFileSync=original;syncBuiltinESMExports();}
  assert.ok(interrupted);assert.equal(nextId(f.b,'export'),'EXP-011');
});

test('prefix rename resumes after publication and local configuration write failure',t=>{
  const f=fixture(t),original=fs.writeFileSync;
  fs.writeFileSync=function(file,...args){if(String(file)===path.join(f.a,'.cliewen-openspec/config.yaml'))throw Error('simulated config failure');return original.call(this,file,...args);};
  try{assert.throws(()=>renamePrefix(f.a,'export','EXPORT'),/config failure/);}finally{fs.writeFileSync=original;}
  assert.equal(resumeIds(f.a),null);assert.equal(nextId(f.b,'export'),'EXPORT-010');
});

test('an existing lock is not stolen and a waiting writer fails boundedly',async t=>{
  const f=fixture(t,false),directory=runtimeDirectory(f.a);fs.mkdirSync(directory,{recursive:true});const file=path.join(directory,'state.lock');fs.writeFileSync(file,'interrupted writer');
  const before=registry(f.a),result=await child(f.a,'ac','next','--capability','export');assert.equal(result.code,2);assert.match(result.err,/locked/);assert.equal(registry(f.a),before);assert.equal(fs.readFileSync(file,'utf8'),'interrupted writer');
  fs.unlinkSync(file);assert.equal(nextId(f.a,'export'),'EXP-010');
});

test('a malformed pending operation cannot publish invalid state and can be explicitly abandoned',t=>{
  const f=fixture(t),file=path.join(runtimeDirectory(f.a),'request.json');
  fs.writeFileSync(file,JSON.stringify({id:'12345678-1234-1234-1234-123456789012',kind:'unexpected',capability:'export',prefix:'EXPORT'}));
  const before=git(f.a,'ls-remote','--refs','origin',authorityRef);
  assert.throws(()=>resumeIds(f.a),/Invalid pending AC request/);assert.equal(git(f.a,'ls-remote','--refs','origin',authorityRef),before);
  abandonRequest(f.a);assert.equal(nextId(f.a,'export'),'EXP-010');
});

test('published setup followed by a local settings failure cannot fall back to local allocation',t=>{
  const f=fixture(t,false),original=fs.writeFileSync;
  fs.writeFileSync=function(file,...args){if(String(file)===path.join(f.a,'.cliewen-openspec/ac-coordination.json'))throw Error('simulated setup settings failure');return original.call(this,file,...args);};
  try{assert.throws(()=>coordinate(f.a,'origin',true),/setup settings failure/);}finally{fs.writeFileSync=original;}
  assert.throws(()=>nextId(f.a,'export'),/setup is pending/);
  assert.equal(fs.existsSync(path.join(runtimeDirectory(f.a),'setup.json')),true);
  coordinate(f.a,'origin',true);assert.equal(nextId(f.a,'export'),'EXP-010');
  assert.equal(fs.existsSync(path.join(runtimeDirectory(f.a),'setup.json')),false);
});

test('Git discovery failures cannot bypass setup recovery and duplicate a coordinated reservation',t=>{
  const f=fixture(t,false),writeOriginal=fs.writeFileSync,directory=runtimeDirectory(f.a);
  fs.writeFileSync=function(file,...args){if(String(file)===path.join(f.a,'.cliewen-openspec/ac-coordination.json'))throw Error('setup settings failure');return writeOriginal.call(this,file,...args);};
  try{assert.throws(()=>coordinate(f.a,'origin',true),/settings failure/);}finally{fs.writeFileSync=writeOriginal;}
  coordinate(f.b,'origin',true);assert.equal(nextId(f.b,'export'),'EXP-010');
  const before=registry(f.a),marker=fs.readFileSync(path.join(directory,'setup.json'),'utf8');
  for(const details of [{code:'ENOENT'},{code:'ETIMEDOUT'},{status:128,stderr:'fatal: detected dubious ownership'},{status:128,stderr:'fatal: not a git repository (or any of the parent directories): .git'}]) {
    const original=childProcess.execFileSync;
    childProcess.execFileSync=function(file,args,options){if(file==='git'&&args[0]==='rev-parse'&&args[1]==='--absolute-git-dir'&&options.cwd===f.a)throw Object.assign(Error('discovery failure'),details);return original.call(this,file,args,options);};syncBuiltinESMExports();
    try{assert.throws(()=>nextId(f.a,'export'),/Git runtime discovery failed/);}finally{childProcess.execFileSync=original;syncBuiltinESMExports();}
    assert.equal(registry(f.a),before);assert.equal(fs.readFileSync(path.join(directory,'setup.json'),'utf8'),marker);
  }
  coordinate(f.a,'origin',true);assert.equal(nextId(f.a,'export'),'EXP-011');
});

test('confirmed non-Git local projects retain one stable temporary runtime',t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-non-git-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  write(root,'.cliewen-openspec/config.yaml','ac:\n  capabilities: {export: EXP}\n');fs.mkdirSync(path.join(root,'openspec'),{recursive:true});
  const directory=runtimeDirectory(root);assert.equal(nextId(root,'export'),'EXP-001');assert.equal(runtimeDirectory(root),directory);assert.equal(nextId(root,'export'),'EXP-002');
});

test('concurrent initial setup rejection can join the winning authority on retry',t=>{
  const f=fixture(t,false),original=childProcess.execFileSync;let raced=false;
  childProcess.execFileSync=function(file,args,options){
    if(file==='git'&&args[0]==='push'&&options.cwd===f.a&&!raced){raced=true;coordinate(f.b,'origin',true);}
    return original.call(this,file,args,options);
  };syncBuiltinESMExports();
  try{assert.throws(()=>coordinate(f.a,'origin',true),/Another setup won initial creation/);}finally{childProcess.execFileSync=original;syncBuiltinESMExports();}
  assert.ok(raced);assert.throws(()=>nextId(f.a,'export'),/setup is pending/);
  const marker=path.join(runtimeDirectory(f.a),'setup.json');assert.equal(JSON.parse(fs.readFileSync(marker)).rejectedCreation,true);
  coordinate(f.a,'origin',true);
  const settings=root=>JSON.parse(fs.readFileSync(path.join(root,'.cliewen-openspec/ac-coordination.json')));
  assert.equal(settings(f.a).authority,settings(f.b).authority);assert.equal(fs.existsSync(marker),false);
  assert.equal(nextId(f.a,'export'),'EXP-010');assert.equal(nextId(f.b,'export'),'EXP-011');
});

test('ambiguous setup publication never permits silently joining a replacement authority',t=>{
  const f=fixture(t,false),original=childProcess.execFileSync;
  childProcess.execFileSync=function(file,args,options){const result=original.call(this,file,args,options);if(file==='git'&&args[0]==='push'&&options.cwd===f.a)throw Error('lost setup acknowledgement');return result;};syncBuiltinESMExports();
  try{assert.throws(()=>coordinate(f.a,'origin',true),/lost setup acknowledgement/);}finally{childProcess.execFileSync=original;syncBuiltinESMExports();}
  const marker=path.join(runtimeDirectory(f.a),'setup.json'),before=fs.readFileSync(marker,'utf8');
  assert.equal(JSON.parse(before).rejectedCreation,undefined);
  replaceClaims(f,value=>{value.id='12345678-1234-1234-1234-123456789012';});
  assert.throws(()=>coordinate(f.a,'origin',true),/authority was replaced/);assert.equal(fs.readFileSync(marker,'utf8'),before);
  assert.throws(()=>nextId(f.a,'export'),/setup is pending/);
});

test('repository root comparison accepts Windows path spelling and rejects a subdirectory',t=>{
  const f=fixture(t,false),original=childProcess.execFileSync;
  if(process.platform==='win32') {
    const short=original(process.env.ComSpec??'cmd.exe',['/d','/c','for %I in (.) do @echo %~fsI'],{cwd:f.a,encoding:'utf8',windowsHide:true}).trim();
    assert.equal(coordinate(short,'origin').remote,'origin');
    childProcess.execFileSync=function(file,args,options){const result=original.call(this,file,args,options);if(file==='git'&&args[0]==='rev-parse'&&args[1]==='--show-toplevel'&&options.cwd===f.a)return result.toUpperCase();return result;};syncBuiltinESMExports();
    try{assert.equal(coordinate(f.a,'origin').remote,'origin');}finally{childProcess.execFileSync=original;syncBuiltinESMExports();}
  } else assert.equal(coordinate(f.a,'origin').remote,'origin');
  const nested=path.join(f.a,'nested');fs.mkdirSync(nested);assert.throws(()=>coordinate(nested,'origin'),/repository root/);
});
