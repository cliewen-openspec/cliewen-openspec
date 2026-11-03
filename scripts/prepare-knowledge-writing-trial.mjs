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
write('docs/learnings/formatter-bytes.md',`---\ntype: learning\nstatus: verified\nscope: [csv-export, UTF-8]\nlastVerified: '${new Date().toISOString().slice(0,10)}'\n---\n# Distinguish formatter text from encoded bytes\n\nThe formatter returns a string, not bytes. Verify encoded bytes explicitly with Buffer.from(text, 'utf8') rather than describing text as already encoded. The baseline probe is recorded in [the observed output](../testing/formatter-probe.md). Do not claim that any spreadsheet application was tested. Scope: this Node formatter and its declared encoding; no external consumer evidence.\n`);
write('docs/learnings/mandatory-marker.md','---\ntype: learning\nstatus: retired\nscope: [csv-export]\n---\n# Always include a marker\n\nObsolete suggestion: always prepend U+FEFF. Retired because [the current permanent spec](../../openspec/specs/csv-export/spec.md) requires unchanged header-first output. Do not apply this suggestion.\n');
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
for(const mode of ['auto','off','on','custom-root']){
  const project=mode==='auto'?root:path.join(trial,`project-${mode}`);
  if(mode!=='auto'){
    run('git',['clone',path.join(artifacts,'baseline.bundle'),project]);
    run(process.execPath,[process.env.npm_execpath,'ci','--ignore-scripts','--no-audit','--no-fund'],project);
    run('git',['config','user.name','Cliewen trial'],project);run('git',['config','user.email','trial@example.invalid'],project);
    const c={...settings,writing:{humanizer:mode==='custom-root'?'off':mode}};
    if(mode==='custom-root'){
      c.docsRoot='notes';c.learnings={enabled:true,directory:'lessons'};
      fs.cpSync(path.join(root,'docs/learnings'),path.join(project,'notes/lessons'),{recursive:true});
      const note=path.join(project,'notes/lessons/formatter-bytes.md');
      fs.writeFileSync(note,fs.readFileSync(note,'utf8').replace('../testing/formatter-probe.md','../../docs/testing/formatter-probe.md'));
    }
    fs.writeFileSync(path.join(project,'.cliewen-openspec/config.yaml'),stringify(c));
    run('git',['add','.'],project);run('git',['commit','-m',`Select ${mode} writing mode for fresh trial`],project);
  }
  const result=path.join(artifacts,mode);fs.mkdirSync(result,{recursive:true});
  const revision=run('git',['rev-parse','HEAD'],project);
  const protectedFiles=run('git',['ls-tree','-r','--name-only',revision],project).split(/\r?\n/);
  fs.writeFileSync(path.join(result,'baseline.json'),JSON.stringify({...b,baseline:revision,root:project,fixture:'knowledge-writing',mode:mode==='custom-root'?'off':mode,variant:mode,protectedFiles},null,2)+'\n');
  fs.writeFileSync(path.join(result,'prompt.md'),prompt);
  cases.push({schema:'cliewen-delivery',scenario:`knowledge-writing-${mode}`,profile:'codex-cli-primary',project,artifacts:result,baseline:revision});
  fs.writeFileSync(path.join(result,'suite.json'),JSON.stringify({cases:[cases.at(-1)]},null,2)+'\n');
}
const suites=Object.fromEntries(cases.map(c=>[c.scenario,path.join(c.artifacts,'suite.json')]));
fs.writeFileSync(path.join(trial,'suite-index.json'),JSON.stringify(suites,null,2)+'\n');
console.log(JSON.stringify({trial,suites,cases:cases.length},null,2));
