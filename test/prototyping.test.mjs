import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parse} from 'yaml';
import {init, update, uninstall} from '../dist/core.js';

const source = fileURLToPath(new URL('../', import.meta.url));
const resource = '.cliewen-openspec/prototyping.md';
function temp(t) { const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-prototyping-')); t.after(() => fs.rmSync(root, {recursive:true, force:true})); return root; }
function write(root, file, value) { fs.mkdirSync(path.dirname(path.join(root,file)), {recursive:true}); fs.writeFileSync(path.join(root,file),value); }
const read = (root,file) => fs.readFileSync(path.join(root,file),'utf8');
function fixture(t) { const root=temp(t); for(const d of ['openspec/specs','openspec/changes'])fs.mkdirSync(path.join(root,d),{recursive:true}); write(root,'openspec/config.yaml','schema: spec-driven\n'); return root; }

test('prototype reference is precisely owned and preserves authored records and integrations',t=>{
  const root=fixture(t);
  write(root,'docs/experiment-notes.md','Existing findings\n'); write(root,'AGENTS.md','Project instructions\n'); write(root,'.claude/skills/openspec-explore/SKILL.md','Native skill\n');
  init(root,true,false); assert.equal(fs.existsSync(path.join(root,resource)),false);
  init(root,false,false); const original=read(root,resource), file='.cliewen-openspec/manifest.json', manifest=read(root,file);
  assert.ok(JSON.parse(manifest).files[resource]); assert.deepEqual(init(root,false,false),[]);
  write(root,resource,original+'\nLocal edit'); assert.throws(()=>update(root),/Conflict/); assert.throws(()=>uninstall(root),/Conflict/); assert.equal(read(root,resource),original+'\nLocal edit');
  const previous=JSON.parse(manifest);delete previous.files[resource];write(root,file,JSON.stringify(previous));
  write(root,resource,'Project-owned experiment instructions\n'); assert.throws(()=>update(root),/Conflict|unowned|Unowned/);
  fs.unlinkSync(path.join(root,resource)); assert.ok(update(root,true).writes.includes(resource)); assert.equal(fs.existsSync(path.join(root,resource)),false); update(root); assert.equal(read(root,resource),original);
  const forged=JSON.parse(read(root,file));forged.files['.cliewen-openspec/prototype-script.mjs']=forged.files[resource];write(root,file,JSON.stringify(forged));assert.throws(()=>update(root),/Invalid owned-file entry/);write(root,file,manifest);
  uninstall(root);
  assert.equal(fs.existsSync(path.join(root,resource)),false);
  for(const [f,v] of [['docs/experiment-notes.md','Existing findings\n'],['AGENTS.md','Project instructions\n'],['.claude/skills/openspec-explore/SKILL.md','Native skill\n']])assert.equal(read(root,f),v);
});

test('shared prototype guidance retains selection, scope and feedback limits across workflows',t=>{
  const root=fixture(t);init(root,false,false);const text=read(root,resource);
  for(const phrase of ['Clear, understood work proceeds normally','If the user declines','Reuse sufficient existing agreement','code-writing','cliewen-discovery','cliewen-all','permanent specs, AC allocation','not an OS-enforced sandbox','Missing feedback is not positive feedback','invalid','With features.planning enabled','learnings.enabled and features.documentation enabled','discarded, retained as reference','not approval of a later production delivery']) {
    const expected=phrase==='code-writing'?'Native OpenSpec explore is read-only for code':phrase;
    assert.ok(text.includes(expected),expected);
  }
  for(const name of ['delivery','discovery','all']){
    const schema=parse(read(root,`openspec/schemas/cliewen-${name}/schema.yaml`));
    assert.ok(schema.artifacts[0].instruction.includes(resource));assert.ok(schema.apply.instruction.includes(resource));
    assert.ok(!schema.artifacts.some(a=>/prototype|experiment/.test(a.id)));
    if(name!=='delivery')assert.ok(schema.artifacts.find(a=>a.id==='investigation').instruction.includes('For an agreed prototype'));
  }
  const entry=read(root,'.cliewen-openspec/planning.md');assert.ok(entry.indexOf('## Before context collection')<entry.indexOf(resource));
});

for(const version of ['1.15.0','1.17.0'])test(`packed native prototype handoff on OpenSpec ${version}`,{timeout:240000},t=>{
  const root=temp(t),npm=process.env.npm_execpath;assert.ok(npm,'Run through npm test');
  const env={...process.env,OPENSPEC_TELEMETRY:'0',CI:'1'};delete env.NODE_TEST_CONTEXT;
  const run=(args,cwd=root)=>{const r=spawnSync(process.execPath,args,{cwd,env,encoding:'utf8',timeout:args[0]===npm&&args[1]==='install'?180000:60000});assert.equal(r.status,0,`${args.join(' ')}\n${r.stdout}\n${r.stderr}\n${r.error??''}`);return r.stdout.trim();};
  const pack=JSON.parse(run([npm,'pack','--ignore-scripts','--json','--pack-destination',root],source))[0];
  write(root,'package.json','{"private":true}');run([npm,'install','--ignore-scripts','--no-audit','--no-fund',path.join(root,pack.filename),`@fission-ai/openspec@${version}`]);
  const openspec=path.join(root,'node_modules/@fission-ai/openspec/bin/openspec.js');const ospec=(...a)=>run([openspec,...a]);assert.equal(ospec('--version'),version);
  ospec('init','--tools','claude','--no-animation');
  const native='.claude/skills/openspec-explore/SKILL.md',nativeText=read(root,native);assert.match(nativeText,/NEVER write code|Never write code/);
  write(root,'src/product.mjs','export const original = true;\n');write(root,'test/product.test.mjs','// Existing acceptance contract\n');
  const cli=path.join(root,'node_modules/cliewen-openspec/dist/cli.js');run([cli,'init']);assert.equal(read(root,native),nativeText);
  const config='features: {planning: false, documentation: false}\nlearnings: {enabled: false}\n';write(root,'.cliewen-openspec/config.yaml',config);
  for(const schema of ['cliewen-discovery','cliewen-all']){
    const name=`experiment-${schema}`;ospec('new','change',name,'--schema',schema);
    const before=JSON.parse(ospec('status','--change',name,'--json'));assert.ok(!before.artifacts.some(a=>a.id==='prototype'));
    write(root,`openspec/changes/${name}/proposal.md`,'# Investigation proposal\nCompare two approaches in an agreed isolated scratch workspace.\n');
    const instructions=JSON.parse(ospec('instructions','investigation','--change',name,'--json'));assert.ok(instructions.instruction.includes(resource));assert.ok(instructions.instruction.includes('actual observations, feedback, uncertainty'));
    write(root,`openspec/changes/${name}/investigation.md`,'# Investigation\nNo experiment run by this deterministic fixture; no user feedback observed.\n');
  }
  assert.equal(read(root,'src/product.mjs'),'export const original = true;\n');assert.equal(read(root,'test/product.test.mjs'),'// Existing acceptance contract\n');
  assert.equal(read(root,'.cliewen-openspec/config.yaml'),config);assert.equal(fs.existsSync(path.join(root,'.cliewen-openspec/ac-registry.json')),false);
  assert.deepEqual(fs.readdirSync(path.join(root,'openspec/specs')).filter(x=>x!=='.gitkeep'),[]);
});
