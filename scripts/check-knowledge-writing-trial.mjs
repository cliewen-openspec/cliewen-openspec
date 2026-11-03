import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {hasInstruction} from './lib/trial-instructions.mjs';

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
run('baseline files preserved','git',['diff','--exit-code',b.baseline,'--',...b.protectedFiles]);
run('six baseline tests',process.execPath,['--test','test/export.test.mjs']);
const change='plan-optional-csv-bom';
for(const [label,file]of [['proposal',`openspec/changes/${change}/proposal.md`],['PR-style summary','docs/testing/proposal-summary.md']]){
  checks.push({label:label+' exists',passed:fs.existsSync(path.join(root,file))&&!!fs.readFileSync(path.join(root,file),'utf8').trim()});
}
checks.push({label:'saved proposal instruction response',passed:hasInstruction(root,'proposal','cliewen-delivery',change)});
checks.push({label:'not archived',passed:!fs.existsSync(path.join(root,'openspec/changes/archive'))||!fs.readdirSync(path.join(root,'openspec/changes/archive')).some(f=>f.endsWith('-'+change))});
const passed=checks.every(c=>c.passed!==false&&(c.exitCode===undefined||c.exitCode===0));
fs.writeFileSync(out,JSON.stringify({passed,baseline:b.baseline,revision:run('revision','git',['rev-parse','HEAD']).stdout.trim(),mode:b.mode,checks,manualReviewRequired:['scoped lesson retrieval and no unrelated-note loading','current authority over tentative/retired notes','host inventory and actual skill-read/use evidence','one status for auto/on; no Humanizer status or suggestions for off','natural prose, preserved claims, and task scope']},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({passed,mode:b.mode,out}));process.exitCode=passed?0:1;
