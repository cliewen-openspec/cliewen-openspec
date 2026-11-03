import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parse, stringify} from 'yaml';

const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [location,...extra]=process.argv.slice(2);
if(extra.length)throw Error('Use npm run trial:knowledge:prepare -- [ABSOLUTE_NEW_DIRECTORY]');
const trial=location??path.join(os.tmpdir(),`cliewen-knowledge-writing-${Date.now()}`);
const run=(exe,args,cwd=source)=>{
  const r=spawnSync(exe,args,{cwd,encoding:'utf8',timeout:180000,windowsHide:true,env:{...process.env,OPENSPEC_TELEMETRY:'0',CI:'1'}});
  if(r.status!==0)throw Error(r.stdout+'\n'+r.stderr);return r.stdout.trim();
};
const prepared=JSON.parse(run(process.execPath,[path.join(source,'scripts/prepare-csv-bom-trial.mjs'),trial]));
const {root,artifacts}=prepared;
const write=(file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
const settings=parse(fs.readFileSync(path.join(root,'.cliewen-openspec/config.yaml'),'utf8'));
settings.learnings={enabled:true,directory:'learnings'};settings.writing={humanizer:'auto'};
write('.cliewen-openspec/config.yaml',stringify(settings));
write('docs/learnings/README.md','# Lessons\n\n| Lesson | Scope | Status |\n|---|---|---|\n| [Formatter bytes](formatter-bytes.md) | csv-export, UTF-8 | verified |\n| [Mandatory marker](mandatory-marker.md) | csv-export, default | retired |\n| [Pool tuning](pool-tuning.md) | database pools | tentative |\n');
write('docs/learnings/formatter-bytes.md',`---\ntype: learning\nstatus: verified\nscope: [csv-export, UTF-8]\nlastVerified: '${new Date().toISOString().slice(0,10)}'\n---\n# Distinguish formatter text from encoded bytes\n\nThe formatter returns a string, not bytes. Verify encoded bytes explicitly with Buffer.from(text, 'utf8') rather than describing text as already encoded. The baseline probe is recorded in [the observed output](../testing/formatter-probe.md). Do not claim that any spreadsheet application was tested. Scope: this Node formatter and the UTF-8 encoding chosen by the probe; the formatter does not declare an encoding or establish external consumer behavior.\n`);
write('docs/learnings/mandatory-marker.md','---\ntype: learning\nstatus: retired\nscope: [csv-export]\n---\n# Always include a marker\n\nObsolete suggestion: always prepend U+FEFF. Retired because the current formatter and exact-output tests produce header-first output without adding a marker. [The current permanent spec](../../openspec/specs/csv-export/spec.md) does not explicitly specify encoding or BOM handling. Do not apply this suggestion.\n');
write('docs/learnings/pool-tuning.md','---\ntype: learning\nstatus: tentative\nscope: [database-pools]\n---\n# Database pool tuning\n\nUnrelated tentative observation. This project has no database-pool requirement; no CSV guidance belongs here.\n');
const probe=run(process.execPath,['--input-type=module','-e',"import {exportCsv} from './export.mjs'; const text=exportCsv([{name:'Søren'}],['name']); console.log(JSON.stringify({type:typeof text,text,utf8:[...Buffer.from(text,'utf8')]}));"],root);
write('docs/testing/formatter-probe.md','# Actual formatter observation\n\nCommand: Node import of exportCsv with one record containing Søren, encoded with Buffer.from(text, utf8). Observed output:\n\n```json\n'+probe+'\n```\n');
run('git',['add','.'],root);run('git',['commit','-m','Seed indexed lessons for scoped retrieval trial'],root);
const baseline=run('git',['rev-parse','HEAD'],root);
fs.renameSync(path.join(artifacts,'baseline.bundle'),path.join(artifacts,'preparation-baseline.bundle'));
run('git',['bundle','create',path.join(artifacts,'baseline.bundle'),'--all'],root);
const b=JSON.parse(fs.readFileSync(path.join(artifacts,'baseline.json'),'utf8'));
const prompt='Create only a draft proposal for an optional CSV BOM, off by default, preserving the current output, plus a concise PR-style summary at docs/testing/proposal-summary.md. Use the installed cliewen-delivery proposal instructions for a new change named plan-optional-csv-bom and save their JSON response under docs/testing/instructions/. Read current configuration and follow the configured knowledge and writing guidance. Keep code, tests, specs, configuration, and authored lessons unchanged. Do not allocate IDs, implement, archive, collect product evidence, push, or install anything. A skill path explicitly supplied by this session\'s host inventory may be read; do not scan global directories or other repositories. Explain the actual lesson paths used and any host capability limitation in your final handoff. You may commit proposal files locally.\n';
const cases=[];
for(const mode of ['auto','off','on','custom-root','maintenance','host-policy','bootstrap']){
  const project=mode==='auto'?root:path.join(trial,`project-${mode}`);
  if(mode!=='auto'){
    run('git',['clone',path.join(artifacts,'baseline.bundle'),project]);
    run(process.execPath,[process.env.npm_execpath,'ci','--ignore-scripts','--no-audit','--no-fund'],project);
    run('git',['config','user.name','Cliewen trial'],project);run('git',['config','user.email','trial@example.invalid'],project);
    const c={...settings,writing:{humanizer:['custom-root','maintenance','host-policy'].includes(mode)?'off':mode==='bootstrap'?'auto':mode}};
    if(mode==='custom-root'){
      c.docsRoot='notes';c.learnings={enabled:true,directory:'lessons'};
      fs.cpSync(path.join(root,'docs/learnings'),path.join(project,'notes/lessons'),{recursive:true});
      const note=path.join(project,'notes/lessons/formatter-bytes.md');
      fs.writeFileSync(note,fs.readFileSync(note,'utf8').replace('../testing/formatter-probe.md','../../docs/testing/formatter-probe.md'));
    }
    if(mode==='maintenance'){
      const index=path.join(project,'docs/learnings/README.md');
      fs.appendFileSync(index,'| [String or bytes](duplicate-formatter.md) | csv-export, UTF-8 | tentative |\n| [Prefix required](prefix-required.md) | csv-export, default | verified |\n');
      fs.writeFileSync(path.join(project,'docs/learnings/duplicate-formatter.md'),'---\ntype: learning\nstatus: tentative\nscope: [csv-export, UTF-8]\n---\n# Check returned values\n\nThe formatter may return text instead of encoded bytes. Check its return type before writing about encoding. This overlaps the formatter-bytes observation but has not been independently verified.\n');
      fs.writeFileSync(path.join(project,'docs/learnings/prefix-required.md'),"---\ntype: learning\nstatus: verified\nscope: [csv-export, default]\nlastVerified: '2025-01-01'\n---\n# Marker required by default\n\nHistorical claim: exportCsv always returns a leading U+FEFF marker. This note predates the current source snapshot; no supporting observation was retained.\n");
    }
    if(mode==='host-policy'){
      const hostCases=[];
      for(const writing of ['auto','on'])for(const inventoryState of ['absent','unknown','inaccessible']){
        hostCases.push({id:`${writing}-${inventoryState}`,mode:writing,inventoryState,priorRefusal:false});
        if(inventoryState==='absent')hostCases.push({id:`${writing}-absent-refused`,mode:writing,inventoryState,priorRefusal:true});
      }
      hostCases.push({id:'off-absent',mode:'off',inventoryState:'absent',priorRefusal:false},{id:'off-usable',mode:'off',inventoryState:'usable',priorRefusal:false},{id:'new-session-absent',mode:'auto',inventoryState:'absent',priorRefusal:false,previousSessionDeclined:true});
      fs.writeFileSync(path.join(project,'docs/testing/host-cases.json'),JSON.stringify(hostCases,null,2)+'\n');
    }
    if(mode==='bootstrap'){
      const reference=fs.readFileSync(path.join(source,'docs/configuration.md'),'utf8');
      const rule=reference.match(/### Instructions before context collection[\s\S]*?```text\r?\n([\s\S]*?)```/)?.[1];
      if(!rule)throw Error('Missing documented project instruction example');
      fs.appendFileSync(path.join(project,'AGENTS.md'),'\n'+rule);
    }
    fs.writeFileSync(path.join(project,'.cliewen-openspec/config.yaml'),stringify(c));
    run('git',['add','.'],project);run('git',['commit','-m',`Select ${mode} writing mode for fresh trial`],project);
  }
  const result=path.join(artifacts,mode);fs.mkdirSync(result,{recursive:true});
  const revision=run('git',['rev-parse','HEAD'],project);
  const protectedFiles=run('git',['ls-tree','-r','--name-only',revision],project).split(/\r?\n/);
  const writingMode=['custom-root','maintenance','host-policy'].includes(mode)?'off':mode==='bootstrap'?'auto':mode;
  fs.writeFileSync(path.join(result,'baseline.json'),JSON.stringify({...b,baseline:revision,root:project,fixture:'knowledge-writing',mode:writingMode,variant:mode,protectedFiles},null,2)+'\n');
  fs.writeFileSync(path.join(result,'prompt.md'),['maintenance','host-policy'].includes(mode)?fs.readFileSync(path.join(source,`docs/testing/knowledge-writing-trial/${mode}-prompt.md`),'utf8'):prompt);
  cases.push({schema:'cliewen-delivery',scenario:`knowledge-writing-${mode}`,profile:mode==='maintenance'?'claude-code-primary':['auto','bootstrap'].includes(mode)?'opencode-2-2-5':'codex-cli-primary',project,artifacts:result,baseline:revision});
  fs.writeFileSync(path.join(result,'suite.json'),JSON.stringify({cases:[cases.at(-1)]},null,2)+'\n');
}
const suites=Object.fromEntries(cases.map(c=>[c.scenario,path.join(c.artifacts,'suite.json')]));
fs.writeFileSync(path.join(trial,'suite-index.json'),JSON.stringify(suites,null,2)+'\n');
console.log(JSON.stringify({trial,suites,profiles:Object.fromEntries(cases.map(c=>[c.scenario,c.profile])),cases:cases.length},null,2));
