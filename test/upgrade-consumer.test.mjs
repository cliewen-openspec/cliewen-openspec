import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const source=fileURLToPath(new URL('../',import.meta.url));
const publishedIntegrity='sha512-yYKexy2evtIm+QILxJYjepGUdgSRGK9vRJ6qZddjXgwuu0VCGj9043vuVHilyTILqTvc4Tan6gT2FicSOpliBw==';
const write=(root,file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');

for(const openspecVersion of ['1.15.0','1.17.0'])test(`published 0.1.0 resources upgrade with OpenSpec ${openspecVersion}`,{timeout:180000},t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-upgrade-consumer-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const npm=process.env.npm_execpath;assert.ok(npm,'Run through npm test');
  const env={...process.env,OPENSPEC_TELEMETRY:'0',CI:'1'};delete env.NODE_TEST_CONTEXT;
  const run=(args,cwd=root)=>{const r=spawnSync(process.execPath,args,{cwd,env,encoding:'utf8',timeout:90000});assert.equal(r.status,0,`${args.join(' ')}\n${r.stdout}\n${r.stderr}`);return r.stdout.trim();};
  const published=path.join(root,'published'),candidate=path.join(root,'candidate'),project=path.join(root,'project');
  for(const p of [published,candidate,project])fs.mkdirSync(p);
  const oldPack=JSON.parse(run([npm,'pack','cliewen-openspec@0.1.0','--json','--pack-destination',published]))[0];
  assert.equal(oldPack.integrity,publishedIntegrity,'Published artifact identity must remain immutable');
  const newPack=JSON.parse(run([npm,'pack','--ignore-scripts','--json','--pack-destination',candidate],source))[0];
  write(project,'package.json','{"private":true}');
  run([npm,'install','--ignore-scripts','--no-audit','--no-fund',path.join(published,oldPack.filename),`@fission-ai/openspec@${openspecVersion}`],project);
  const osCli=path.join(project,'node_modules/@fission-ai/openspec/bin/openspec.js'),cliewen=path.join(project,'node_modules/cliewen-openspec/dist/cli.js');
  const ospec=(...args)=>run([osCli,...args],project),cw=(...args)=>JSON.parse(run([cliewen,...args,'--json'],project));
  ospec('init','--tools','codex','--no-animation');
  write(project,'openspec/config.yaml','# Preserve this policy\nschema: spec-driven\ncontext: Existing product\n');
  write(project,'docs/README.md','# Original project documentation\n');
  write(project,'docs/decisions/ADR-059-storage.md','# Existing external address\n');
  write(project,'AGENTS.md','Preserve project instructions.\n');
  cw('init');
  write(project,'.cliewen-openspec/config.yaml','# Preserve choices exactly\nfeatures: {planning: false, documentation: false, evidence: false}\nlearnings: {enabled: false}\nac: {capabilities: {sample: EXP}}\n');
  assert.equal(run([cliewen,'ac','next','--capability','sample'],project),'EXP-001');
  for(const workflow of ['delivery','discovery','all']){
    ospec('new','change',`existing-${workflow}`,'--schema',`cliewen-${workflow}`);
    write(project,`openspec/changes/existing-${workflow}/proposal.md`,'# Existing proposal\nPreserve the agreed product scope.\n');
  }
  write(project,'openspec/specs/sample/spec.md','## Purpose\nExisting product behavior.\n\n#### Scenario: Existing identity [EXP-001]\n');
  write(project,'openspec/changes/archive/original-name/decision.md','# Existing historical decision\n');
  const authored=['AGENTS.md','openspec/config.yaml','.cliewen-openspec/config.yaml','.cliewen-openspec/ac-registry.json','docs/README.md','docs/decisions/ADR-059-storage.md','openspec/specs/sample/spec.md','openspec/changes/archive/original-name/decision.md'];
  for(const workflow of ['delivery','discovery','all'])for(const name of ['.openspec.yaml','proposal.md'])authored.push(`openspec/changes/existing-${workflow}/${name}`);
  const skills=path.join(project,'.agents/skills');
  for(const dir of fs.readdirSync(skills,{withFileTypes:true}))if(dir.isDirectory()&&fs.existsSync(path.join(skills,dir.name,'SKILL.md')))authored.push(`.agents/skills/${dir.name}/SKILL.md`);
  const before=Object.fromEntries(authored.map(f=>[f,hash(path.join(project,f))]));
  run([npm,'install','--ignore-scripts','--no-audit','--no-fund',path.join(candidate,newPack.filename)],project);
  const preview=cw('update','--dry-run');assert.equal(preview.installedVersion,'0.1.0');assert.equal(preview.targetVersion,newPack.version);
  assert.equal(preview.compatibility.openspec.version,openspecVersion);assert.ok(preview.creates.includes('.cliewen-openspec/prototyping.md'));
  assert.deepEqual(cw('update'),{...preview,dryRun:false});
  for(const [file,digest]of Object.entries(before))assert.equal(hash(path.join(project,file)),digest,file);
  assert.deepEqual(cw('update','--dry-run').writes,[]);assert.equal(cw('check').ok,true);
  for(const workflow of ['delivery','discovery','all']){
    ospec('schema','validate',`cliewen-${workflow}`);
    const next=JSON.parse(ospec('instructions',workflow==='delivery'?'design':'investigation','--change',`existing-${workflow}`,'--json'));
    assert.ok(next.instruction.length>0);
  }
  assert.equal(run([cliewen,'ac','next','--capability','sample'],project),'EXP-002');
  // This isolated fixture checks a future stable version route; it is not a release artifact.
  const releaseFile=path.join(project,'node_modules/cliewen-openspec/dist/release.js');
  fs.writeFileSync(releaseFile,fs.readFileSync(releaseFile,'utf8').replace("version = '0.1.0'","version = '0.2.0'"));
  const synthetic=cw('update','--dry-run');assert.equal(synthetic.targetVersion,'0.2.0');assert.equal(synthetic.installedVersion,'0.1.0');
  const initResult=spawnSync(process.execPath,[cliewen,'init','--json'],{cwd:project,env,encoding:'utf8'});assert.equal(initResult.status,2);assert.match(initResult.stdout,/run update/);
  cw('update');assert.equal(cw('check').ok,true);
  fs.writeFileSync(releaseFile,fs.readFileSync(releaseFile,'utf8').replace("version = '0.2.0'","version = '0.1.0'"));
  const downgrade=spawnSync(process.execPath,[cliewen,'update','--json'],{cwd:project,env,encoding:'utf8'});assert.equal(downgrade.status,2);assert.match(downgrade.stdout,/Unsupported installed version/);
  t.diagnostic(JSON.stringify({node:process.version,platform:process.platform,openspecVersion,publishedIntegrity,publishedSha256:hash(path.join(published,oldPack.filename)),candidateSha256:hash(path.join(candidate,newPack.filename)),preservedFiles:authored.length,actualCandidateVersion:newPack.version,syntheticRoute:'0.1.0 -> 0.2.0 -> rejected downgrade; test-only metadata'}));
});
