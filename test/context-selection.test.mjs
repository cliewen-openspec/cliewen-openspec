import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parse,stringify} from 'yaml';
import {config,defaults,init,update,uninstall} from '../dist/core.js';

const source=fileURLToPath(new URL('../',import.meta.url));
const resource='.cliewen-openspec/context-selection.md';
const write=(root,file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
const read=(root,file)=>fs.readFileSync(path.join(root,file),'utf8');
function fixture(t){const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-context-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));for(const dir of ['openspec/specs','openspec/changes'])fs.mkdirSync(path.join(root,dir),{recursive:true});write(root,'openspec/config.yaml','schema: spec-driven\n');return root;}

test('context selection defaults off and stays independent of maintenance and learning switches',t=>{
  const root=fixture(t);write(root,'.cliewen-openspec/config.yaml','{}\n');const empty={mode:'off',roots:[],exclude:[],maxFiles:8};
  assert.deepEqual(defaults().contextSelection,empty);assert.deepEqual(config(root).contextSelection,empty);
  for(const mode of ['off','guided'])for(const enabled of [true,false]){
    write(root,'.cliewen-openspec/config.yaml',stringify({docsRoot:'notes',contextSelection:{mode,roots:['notes/decisions'],exclude:['notes/private'],maxFiles:3},features:{planning:enabled,documentation:enabled},learnings:{enabled:!enabled}}));
    const c=config(root);assert.equal(c.contextSelection.mode,mode);assert.equal(c.contextSelection.maxFiles,3);assert.equal(c.features.planning,enabled);assert.equal(c.learnings.enabled,!enabled);assert.equal(fs.existsSync(path.join(root,'notes')),false);
  }
});

test('invalid selection modes paths and budgets stop initialization before project writes',t=>{
  const root=fixture(t);
  for(const selection of [null,[],{mode:'auto'},{roots:'docs'},{exclude:[1]},{roots:['../outside']},{roots:['C:\\outside']},{exclude:['/outside']},{roots:['docs/**']},{exclude:[' notes']},{roots:['docs\nprivate']},{maxFiles:0},{maxFiles:101},{maxFiles:1.5},{maxFiles:true},{unknown:true}]){
    const text=stringify({contextSelection:selection});write(root,'.cliewen-openspec/config.yaml',text);
    assert.throws(()=>init(root,false,false),/contextSelection|Unsafe repository path/);assert.equal(read(root,'.cliewen-openspec/config.yaml'),text);assert.equal(fs.existsSync(path.join(root,'.cliewen-openspec/manifest.json')),false);assert.equal(fs.existsSync(path.join(root,'docs')),false);
  }
});

test('context reference has owned refresh and removal without adopting authored files',t=>{
  const root=fixture(t);write(root,'docs/decisions/current.md','Existing decision\n');write(root,'AGENTS.md','Project entry\n');init(root,false,false);
  const original=read(root,resource),manifestPath='.cliewen-openspec/manifest.json',manifest=read(root,manifestPath),cfg=read(root,'.cliewen-openspec/config.yaml');
  assert.ok(JSON.parse(manifest).files[resource]);assert.deepEqual(init(root,false,false),[]);
  write(root,resource,original+'\nAuthored edit');assert.throws(()=>update(root),/Conflict/);assert.throws(()=>uninstall(root),/Conflict/);
  const old=JSON.parse(manifest);delete old.files[resource];write(root,manifestPath,JSON.stringify(old));write(root,resource,original);assert.throws(()=>update(root),/Unowned/);
  fs.unlinkSync(path.join(root,resource));assert.ok(update(root,true).writes.includes(resource));assert.equal(fs.existsSync(path.join(root,resource)),false);update(root);
  assert.equal(read(root,'.cliewen-openspec/config.yaml'),cfg);uninstall(root);assert.equal(fs.existsSync(path.join(root,resource)),false);assert.equal(read(root,'AGENTS.md'),'Project entry\n');assert.equal(read(root,'docs/decisions/current.md'),'Existing decision\n');
});

test('all workflows expose gated context selection without adding artifacts or bypassing lessons',t=>{
  const root=fixture(t);init(root,false,false);const ref=read(root,resource);
  for(const phrase of ['Off requests no additional pass','separate','Disabled','maxFiles counts','not mechanically enforced','superseded','broken reference','confidentiality','no separate report']){
    const expected=phrase==='Disabled'?'disabled':phrase;assert.ok(ref.toLowerCase().includes(expected.toLowerCase()),phrase);
  }
  for(const schema of ['delivery','discovery','all']){
    const value=parse(read(root,`openspec/schemas/cliewen-${schema}/schema.yaml`));
    for(const instruction of [...value.artifacts.map(a=>a.instruction),value.apply.instruction]){assert.ok(instruction.includes(resource));assert.ok(instruction.includes('contextSelection.mode (default off)'));assert.ok(instruction.includes('separate index-first gate'));}
    assert.ok(!value.artifacts.some(a=>/context/.test(a.id)));
  }
  const planning=read(root,'.cliewen-openspec/planning.md');assert.ok(planning.indexOf('README.md index in a separate tool call')<planning.indexOf(resource));
  assert.equal(fs.existsSync(path.join(root,'docs/learnings')),false);
});

test('packed native instructions carry opt-in selection with disabled maintenance and authored exclusions intact',{timeout:180000},t=>{
  const root=fixture(t),npm=process.env.npm_execpath;assert.ok(npm,'Run through npm test');
  const env={...process.env,CI:'1',OPENSPEC_TELEMETRY:'0'};delete env.NODE_TEST_CONTEXT;
  const run=(args,cwd=root)=>{const r=spawnSync(process.execPath,args,{cwd,env,encoding:'utf8',timeout:90000});assert.equal(r.status,0,`${args.join(' ')}\n${r.stdout}\n${r.stderr}\n${r.error??''}`);return r.stdout;};
  const pack=JSON.parse(run([npm,'pack','--ignore-scripts','--json','--pack-destination',root],source))[0];write(root,'package.json','{"private":true}');run([npm,'install','--ignore-scripts','--no-audit','--no-fund',path.join(root,pack.filename),'@fission-ai/openspec@2.0.0']);
  const cli='node_modules/cliewen-openspec/dist/cli.js',native='node_modules/@fission-ai/openspec/bin/openspec.js';run([native,'init','--tools','none','--no-animation']);
  const settings='docsRoot: knowledge\nfeatures: {planning: false, documentation: false}\nlearnings: {enabled: false}\ncontextSelection:\n  mode: guided\n  roots: [knowledge]\n  exclude: [knowledge/private]\n  maxFiles: 2\n';write(root,'.cliewen-openspec/config.yaml',settings);write(root,'knowledge/private/secret.md','Authored excluded record\n');
  run([cli,'init']);run([cli,'update','--dry-run']);run([cli,'update']);assert.equal(read(root,'.cliewen-openspec/config.yaml'),settings);assert.equal(read(root,'knowledge/private/secret.md'),'Authored excluded record\n');
  for(const schema of ['cliewen-delivery','cliewen-discovery','cliewen-all']){
    const name=`context-${schema}`;run([native,'schema','validate',schema]);run([native,'new','change',name,'--schema',schema]);const response=JSON.parse(run([native,'instructions','proposal','--change',name,'--json']));assert.equal(response.schemaName,schema);assert.ok(response.instruction.includes(resource));assert.ok(response.instruction.includes('contextSelection.mode (default off)'));
  }
  assert.equal(fs.existsSync(path.join(root,'knowledge/learnings')),false);assert.ok(read(root,resource).includes('This reference supplies advisory agent instructions'));
});
