import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {hasInstruction} from './lib/trial-instructions.mjs';
import {parse} from 'yaml';

const [project,artifacts,...extra]=process.argv.slice(2);
if(!project||!artifacts||extra.length)throw Error('Use node scripts/check-knowledge-writing-trial.mjs PROJECT ARTIFACTS');
const root=path.resolve(project),out=path.resolve(artifacts,'independent-checks.json');
if(fs.existsSync(out))throw Error('Preserve the earlier evaluation; refusing to overwrite '+out);
const b=JSON.parse(fs.readFileSync(path.join(artifacts,'baseline.json'),'utf8'));
const checks=[];
const run=(label,exe,args)=>{
  const r=spawnSync(exe,args,{cwd:root,encoding:'utf8',timeout:30000,windowsHide:true,env:{...process.env,OPENSPEC_TELEMETRY:'0',CI:'1'}});
  checks.push({label,exe,args,exitCode:r.status,stdout:r.stdout,stderr:r.stderr});return r;
};
const maintenance=b.variant==='maintenance',hostPolicy=b.variant==='host-policy';
const editable=maintenance?['docs/learnings/README.md','docs/learnings/formatter-bytes.md','docs/learnings/duplicate-formatter.md','docs/learnings/prefix-required.md','docs/learnings/mandatory-marker.md']:[];
run('baseline files preserved','git',['diff','--exit-code',b.baseline,'--',...b.protectedFiles.filter(f=>!editable.includes(f))]);
run('six baseline tests',process.execPath,['--test','test/export.test.mjs']);
const change=maintenance?'review-csv-lessons':hostPolicy?'review-writing-policy':'plan-optional-csv-bom';
const outputs=maintenance?[['maintenance report','docs/testing/learning-review.md']]:hostPolicy?[['policy review','docs/testing/host-policy-review.json'],['policy limitations','docs/testing/host-policy-review.md']]:[['proposal',`openspec/changes/${change}/proposal.md`],['PR-style summary','docs/testing/proposal-summary.md']];
for(const [label,file]of outputs){
  checks.push({label:label+' exists',passed:fs.existsSync(path.join(root,file))&&!!fs.readFileSync(path.join(root,file),'utf8').trim()});
}
const brokenLinks=[];
const documents=outputs.filter(([,file])=>file.endsWith('.md')).map(([,file])=>file);
if(maintenance&&fs.existsSync(path.join(root,'docs/learnings')))documents.push(...fs.readdirSync(path.join(root,'docs/learnings')).filter(f=>f.endsWith('.md')).map(f=>'docs/learnings/'+f),'docs/testing/export-review.md');
for(const file of documents){
  if(!fs.existsSync(path.join(root,file)))continue;
  for(const match of fs.readFileSync(path.join(root,file),'utf8').matchAll(/\]\(([^)]+)\)/g)){
    const target=match[1].replace(/^<|>$/g,'').split('#')[0];
    if(!target||/^[a-z][a-z0-9+.-]*:/i.test(target))continue;
    const resolved=path.resolve(path.dirname(path.join(root,file)),target),relative=path.relative(root,resolved);
    if(relative.startsWith('..'+path.sep)||relative==='..'||path.isAbsolute(relative)||!fs.existsSync(resolved))brokenLinks.push({file,target});
  }
}
checks.push({label:'local Markdown link targets exist within project',passed:brokenLinks.length===0,brokenLinks});
checks.push({label:'saved proposal instruction response',passed:hasInstruction(root,'proposal','cliewen-delivery',change)});
checks.push({label:'not archived',passed:!fs.existsSync(path.join(root,'openspec/changes/archive'))||!fs.readdirSync(path.join(root,'openspec/changes/archive')).some(f=>f.endsWith('-'+change))});
if(maintenance){
  const note=file=>fs.readFileSync(path.join(root,file),'utf8');
  const front=text=>parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1]??'{}');
  for(const file of editable.filter(f=>!f.endsWith('/README.md'))){
    const original=run('original '+file,'git',['show',`${b.baseline}:${file}`]).stdout;
    const body=original.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').trim();
    const text=fs.existsSync(path.join(root,file))?note(file):'';
    if(!file.endsWith('formatter-bytes.md'))checks.push({label:'historical body retained: '+file,passed:text.includes(body)});
    const status=front(text).status;
    checks.push({label:'reviewed status: '+file,passed:status===(file.endsWith('formatter-bytes.md')?'verified':'retired')});
  }
  const newNotes=fs.readdirSync(path.join(root,'docs/learnings')).filter(f=>f.endsWith('.md')&&!b.protectedFiles.includes('docs/learnings/'+f));
  checks.push({label:'new verified note with verification date',passed:newNotes.some(f=>{const data=front(note('docs/learnings/'+f));return data.status==='verified'&&/^\d{4}-\d{2}-\d{2}$/.test(String(data.lastVerified));})});
}
if(hostPolicy&&fs.existsSync(path.join(root,'docs/testing/host-policy-review.json'))){
  const cases=JSON.parse(fs.readFileSync(path.join(root,'docs/testing/host-cases.json'),'utf8'));
  const responses=JSON.parse(fs.readFileSync(path.join(root,'docs/testing/host-policy-review.json'),'utf8'));
  checks.push({label:'all hypothetical cases answered once',passed:Array.isArray(responses)&&responses.length===cases.length&&new Set(responses.map(c=>c.id)).size===cases.length});
  for(const c of cases){
    const response=responses.find(r=>r.id===c.id),off=c.mode==='off';
    checks.push({label:'hypothetical actions: '+c.id,passed:!!response&&response.suggestInstall===(!off&&c.inventoryState==='absent'&&!c.priorRefusal)&&response.claimUse===false&&response.scanGlobal===false&&response.installOrModifyGlobal===false&&response.continueWork===true&&Array.isArray(response.statuses)&&response.statuses.length===(off?0:1)&&(off||response.statuses[0].turn===1)});
  }
}
const passed=checks.every(c=>c.passed!==false&&(c.exitCode===undefined||c.exitCode===0));
fs.writeFileSync(out,JSON.stringify({passed,baseline:b.baseline,revision:run('revision','git',['rev-parse','HEAD']).stdout.trim(),mode:b.mode,checks,manualReviewRequired:['scoped lesson retrieval and no unrelated-note loading','current authority over tentative/retired notes','host inventory and actual skill-read/use evidence','one status for auto/on; no Humanizer status or suggestions for off','natural prose, preserved claims, and task scope']},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({passed,mode:b.mode,out}));process.exitCode=passed?0:1;
