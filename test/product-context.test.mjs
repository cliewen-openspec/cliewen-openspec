import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parse, stringify} from 'yaml';
import {init, update, uninstall} from '../dist/core.js';

const source=fileURLToPath(new URL('../',import.meta.url));
const resource='.cliewen-openspec/product-context.md';
const write=(root,file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
const read=(root,file)=>fs.readFileSync(path.join(root,file),'utf8');
function fixture(t){const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-product-context-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));for(const d of ['openspec/specs','openspec/changes'])fs.mkdirSync(path.join(root,d),{recursive:true});write(root,'openspec/config.yaml','schema: spec-driven\n');return root;}

test('product-context ownership handles adoption, older resources, collisions and removal without touching authored context',t=>{
  const root=fixture(t),manifestFile='.cliewen-openspec/manifest.json';
  const authored={'docs/product-intent.md':'# Existing intent\n','docs/journeys/original-address.md':'# Existing journey\n','AGENTS.md':'Project instructions\n','.agents/skills/openspec-explore/SKILL.md':'Native integration\n'};
  for(const [file,text]of Object.entries(authored))write(root,file,text);
  init(root,true,false);assert.equal(fs.existsSync(path.join(root,resource)),false);
  init(root,false,false);const original=read(root,resource);assert.ok(JSON.parse(read(root,manifestFile)).files[resource]);assert.deepEqual(init(root,false,false),[]);
  write(root,resource,original+'\nLocal clarification\n');assert.throws(()=>update(root),/Conflict/);assert.throws(()=>uninstall(root),/Conflict/);
  const previous=JSON.parse(read(root,manifestFile));delete previous.files[resource];write(root,manifestFile,JSON.stringify(previous));
  write(root,resource,original);assert.throws(()=>update(root),/Unowned/,'Identical content does not establish ownership');
  fs.unlinkSync(path.join(root,resource));const preview=update(root,true);assert.ok(preview.writes.includes(resource));assert.equal(fs.existsSync(path.join(root,resource)),false);assert.deepEqual(update(root),preview);assert.equal(read(root,resource),original);
  const valid=read(root,manifestFile),forged=JSON.parse(valid);forged.files['.cliewen-openspec/product-context-helper.md']=forged.files[resource];write(root,manifestFile,JSON.stringify(forged));assert.throws(()=>update(root),/Invalid owned-file entry/);write(root,manifestFile,valid);
  uninstall(root);assert.equal(fs.existsSync(path.join(root,resource)),false);
  for(const [file,text]of Object.entries(authored))assert.equal(read(root,file),text,file);
});

test('all generated stages resolve one optional context reference after early learning policy',t=>{
  const root=fixture(t);init(root,false,false);
  const text=read(root,resource);
  for(const phrase of ['Routine understood work needs no new goal','Keep missing intent or metrics unknown','Do not copy the rules','do not rewrite the goal','necessary in-scope correction','before materially expanding agreed scope','With features.documentation disabled','when features.planning is enabled','With planning disabled','Keep desired outcomes, implemented behavior, and actual observations distinct','no fabricated product evidence'])assert.ok(text.includes(phrase),phrase);
  for(const workflow of ['delivery','discovery','all']){
    const schema=parse(read(root,`openspec/schemas/cliewen-${workflow}/schema.yaml`));
    for(const artifact of schema.artifacts)assert.ok(artifact.instruction.includes(resource),`${workflow}/${artifact.id}`);
    assert.ok(schema.apply.instruction.includes(resource));
    assert.ok(!schema.artifacts.some(a=>/goal|journey|context/.test(a.id)));
  }
  const entry=read(root,'.cliewen-openspec/planning.md');assert.ok(entry.indexOf('## Before context collection')<entry.indexOf(resource));
  assert.ok(read(root,'.cliewen-openspec/closure.md').includes(resource));
  assert.equal(fs.existsSync(path.join(root,'docs/product-intent.md')),false);assert.equal(fs.existsSync(path.join(root,'docs/journeys')),false);
});

for(const version of ['1.15.0','1.17.0'])test(`packed context cues preserve native graphs and mixed settings on OpenSpec ${version}`,{timeout:150000},t=>{
  const root=fixture(t),npm=process.env.npm_execpath;assert.ok(npm,'Run through npm test');
  const env={...process.env,OPENSPEC_TELEMETRY:'0',CI:'1'};delete env.NODE_TEST_CONTEXT;
  const run=(args,cwd=root)=>{const r=spawnSync(process.execPath,args,{cwd,env,encoding:'utf8',timeout:60000});assert.equal(r.status,0,r.stdout+r.stderr);return r.stdout.trim();};
  const pack=JSON.parse(run([npm,'pack','--ignore-scripts','--json','--pack-destination',root],source))[0];
  write(root,'package.json','{"private":true}');run([npm,'install','--ignore-scripts','--no-audit','--no-fund',path.join(root,pack.filename),`@fission-ai/openspec@${version}`]);
  const osCli=path.join(root,'node_modules/@fission-ai/openspec/bin/openspec.js'),cli=path.join(root,'node_modules/cliewen-openspec/dist/cli.js');
  const ospec=(...args)=>run([osCli,...args]);ospec('init','--tools','claude','--no-animation');
  const skill='.claude/skills/openspec-explore/SKILL.md',native=read(root,skill);run([cli,'init']);
  const authored={
    'knowledge/brief.md':'# Existing intent\nHelp reviewers reconcile paid invoices.\n',
    'knowledge/journeys/original-journey.md':'# Proposed path\nReview totals, then export. Retry support remains unknown.\n',
    'openspec/specs/totals/spec.md':'# Existing contract\nNo export behavior specified.\n',
    'src/product.mjs':'export const original = true;\n',
    'test/product.test.mjs':'// Existing acceptance contract\n'
  };
  for(const [file,text]of Object.entries(authored))write(root,file,text);
  const graphs={delivery:['proposal','specs','design','tasks'],discovery:['proposal','investigation','decision'],all:['proposal','investigation','decision','specs','tasks']};
  for(const [documentation,planning]of [[true,false],[false,true],[false,false]]){
    const config=`docsRoot: knowledge\nfeatures: {documentation: ${documentation}, planning: ${planning}, evidence: false}\nlearnings: {enabled: false}\n`;write(root,'.cliewen-openspec/config.yaml',config);
    run([cli,'update','--dry-run','--json']);run([cli,'update','--json']);
    for(const workflow of ['delivery','discovery','all']){
      const name=`context-${workflow}-${documentation}-${planning}`;ospec('new','change',name,'--schema',`cliewen-${workflow}`);
      const status=JSON.parse(ospec('status','--change',name,'--json'));assert.deepEqual(status.artifacts.map(a=>a.id),graphs[workflow]);
      const proposal=JSON.parse(ospec('instructions','proposal','--change',name,'--json'));assert.ok(proposal.instruction.includes(resource));
      assert.ok(proposal.instruction.includes('Before requesting any manual step'));
      assert.ok(proposal.instruction.includes('Before requesting a decision on a proposal'));
      assert.ok(proposal.instruction.includes('Keep observation, change approval, and release authorization distinct'));
      assert.ok(read(root,'.cliewen-openspec/closure.md').includes('manual-step and observation guidance'));
      assert.ok(read(root,'.cliewen-openspec/planning.md').includes('Before requesting any manual step'));
      write(root,`openspec/changes/${name}/proposal.md`,'# Existing selected work\nClarify the known delivery; no new product promise.\n');
      const next=JSON.parse(ospec('instructions',workflow==='delivery'?'design':'investigation','--change',name,'--json'));assert.ok(next.instruction.includes(resource));
      if(workflow!=='delivery'){
        write(root,`openspec/changes/${name}/investigation.md`,'# Findings\nExisting intent retained. Retry behavior is not established; no user feedback collected.\n');
        write(root,`openspec/changes/${name}/decision.md`,'---\ntype: decision\nstatus: proposed\noutcome: further-investigation\n---\n# Recommendation\nClarify the recovery contract before selecting delivery.\n');
        const metadata=`openspec/changes/${name}/.openspec.yaml`,selection=parse(read(root,metadata));selection.skip_specs=true;write(root,metadata,stringify(selection));
        const result=JSON.parse(run([cli,'check','--change',name,'--json']));assert.equal(result.ok,true);
      }
    }
    for(const [file,text]of Object.entries(authored))assert.equal(read(root,file),text,file);
    assert.equal(read(root,'.cliewen-openspec/config.yaml'),config);
    assert.equal(fs.existsSync(path.join(root,'knowledge/product-intent.md')),false);assert.equal(fs.existsSync(path.join(root,'.cliewen-openspec/ac-registry.json')),false);assert.equal(fs.existsSync(path.join(root,'.cliewen-openspec/evidence.json')),false);
  }
  assert.equal(read(root,skill),native);
  t.diagnostic(JSON.stringify({openspec:version,packageIntegrity:pack.integrity,node:process.version,settingsCombinations:3,workflows:3,agentExecution:false}));
});
