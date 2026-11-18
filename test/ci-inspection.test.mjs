import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync, execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parse, stringify} from 'yaml';
import {config, defaults, init, update, uninstall} from '../dist/core.js';
import {inspectCI, ciSummary} from '../dist/ci-inspection.js';
import {githubAccess, ciLimits} from '../dist/ci-github.js';

const cli=fileURLToPath(new URL('../dist/cli.js',import.meta.url));
const resource='.cliewen-openspec/ci-inspection.md';
const write=(root,file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
const ghName=process.platform==='win32'?'gh.exe':'gh';
function standInGithubCLI(directory){
  write(directory,ghName,'Executable lookup fixture. The test replaces the subprocess call.');
  const file=path.join(directory,ghName);
  fs.chmodSync(file,0o755);
  return file;
}
function fixture(t,settings={},other={}){const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen ci space '));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));write(root,'.cliewen-openspec/config.yaml',stringify({...other,ciInspection:settings}));return root;}
const selected={repository:'example/service',requiredChecks:[{context:'test'}]};
const response=(data,extra={})=>({status:200,data,...extra});
const rule=(context='test',id=12,appId=7)=>({type:'required_status_checks',ruleset_id:id,ruleset_source:'example',ruleset_source_type:'Organization',parameters:{required_status_checks:[{context,integration_id:appId}]}});
const detail=(id=12,extra={})=>({id,source:'example',source_type:'Organization',enforcement:'active',target:'branch',bypass_actors:[],...extra});
function host(overrides={}){
  const calls=[];
  const routes={
    'repos/example/service':response({full_name:'example/service',default_branch:'trunk'}),
    'repos/example/service/branches/trunk':response({name:'trunk',protected:true}),
    'repos/example/service/branches/trunk/protection':response({required_status_checks:null,enforce_admins:{enabled:true}}),
    'repos/example/service/rules/branches/trunk?per_page=100&page=1':response([rule()]),
    'repos/example/service/rulesets/12?includes_parents=true':response(detail()),...overrides
  };
  return {calls,access(endpoint){calls.push(endpoint);assert.ok(Object.hasOwn(routes,endpoint),`Unexpected host request: ${endpoint}`);return routes[endpoint];}};
}
const snapshots=root=>Object.fromEntries(fs.readdirSync(root,{recursive:true,withFileTypes:true}).filter(e=>e.isFile()).map(e=>{const p=path.join(e.parentPath,e.name);return[path.relative(root,p),fs.readFileSync(p).toString('hex')];}));

test('CI settings default advisory, preserve configuration and stay independent',t=>{
  const root=fixture(t,{}, {features:{documentation:false,planning:false,evidence:false},contextSelection:{mode:'off'}}),before=snapshots(root);
  assert.deepEqual(config(root).ciInspection,defaults().ciInspection);
  assert.deepEqual(defaults().ciInspection,{mode:'advisory',host:'github',repository:null,branch:null,requiredChecks:[]});
  assert.equal(inspectCI(root,()=>assert.fail('Unconfigured inspection called host')).status,'not-configured');
  assert.deepEqual(snapshots(root),before);
  const off=fixture(t,{...selected,mode:'off'});assert.equal(inspectCI(off,()=>assert.fail('Disabled inspection called host')).status,'off');
  const empty=fixture(t,{repository:'example/service'});assert.equal(inspectCI(empty,()=>assert.fail('Empty expectations called host')).status,'not-configured');
});

test('invalid CI settings fail before host access while valid branch punctuation remains supported',t=>{
  const invalid=[null,[],{mode:'enforce'},{host:'gitlab'},{repository:'https://github.com/a/b'},{repository:'a/..'},{repository:'a/b/c'},{branch:'../main'},{branch:'a..b'},{branch:'a@{b'},{branch:'-main'},{branch:'a.lock/b'},{branch:'a\nb'},{requiredChecks:['test']},{requiredChecks:[{context:' test'}]},{requiredChecks:[{context:'x'},{context:'x'}]},{requiredChecks:[{context:'x',appId:0}]},{requiredChecks:[{context:'x',appId:1.2}]},{requiredChecks:[{context:'x',appId:null}]},{unknown:true}];
  for(const settings of invalid){const root=fixture(t,settings);assert.throws(()=>inspectCI(root,()=>assert.fail('Invalid settings called host')),/ciInspection/);}
  for(const branch of ['release/next','user@branch','fix#42','fix%name'])assert.equal(config(fixture(t,{branch})).ciInspection.branch,branch);
});

test('active inherited check requirements are observed on the resolved default branch without writes',t=>{
  const root=fixture(t,selected),before=snapshots(root),h=host(),r=inspectCI(root,h.access);
  assert.equal(r.status,'observed');assert.equal(r.target.branch,'trunk');assert.equal(r.checks[0].status,'observed');assert.match(r.checks[0].sources[0],/Organization:example:12/);
  assert.deepEqual(r.sources.find(s=>s.kind==='ruleset').checks,[{context:'test',appId:7}]);assert.equal(r.coverage.complete,true);assert.deepEqual(snapshots(root),before);assert.ok(h.calls.every(c=>!c.includes('feature')));
  assert.match(ciSummary(r),/exit 0 does not establish enforcement/);assert.match(ciSummary(r),/test \(app 7\)/);
});

test('classic and effective requirements retain multiple bindings and match exact contexts and app IDs',t=>{
  const settings={...selected,requiredChecks:[{context:'test',appId:8},{context:'test-other'},{context:'Test'}]},h=host({'repos/example/service/branches/trunk/protection':response({required_status_checks:{contexts:['test'],checks:[{context:'test',app_id:8}]},enforce_admins:{enabled:false}})});
  const r=inspectCI(fixture(t,settings),h.access);assert.deepEqual(r.checks.map(c=>c.status),['observed','missing','missing']);assert.equal(r.status,'missing');assert.equal(r.sources[0].bypass.status,'possible');assert.equal(r.sources.find(s=>s.kind==='ruleset').checks[0].appId,7);
  for(const binding of [null,9]){const x=host({'repos/example/service/rules/branches/trunk?per_page=100&page=1':response([rule('test',12,binding)])});assert.equal(inspectCI(fixture(t,{...selected,requiredChecks:[{context:'test',appId:7}]}),x.access).checks[0].status,'missing');}
});

test('complete unprotected observations prove missing requirements while isolated 404 remains unknown',t=>{
  const absent=host({'repos/example/service/branches/trunk':response({name:'trunk',protected:false}),'repos/example/service/branches/trunk/protection':{status:404,problem:'http-404'},'repos/example/service/rules/branches/trunk?per_page=100&page=1':response([])});
  const r=inspectCI(fixture(t,selected),absent.access);assert.equal(r.status,'missing');assert.equal(r.sources[0].status,'absent');
  const ambiguous=host({'repos/example/service/branches/trunk/protection':{status:404,problem:'http-404'},'repos/example/service/rules/branches/trunk?per_page=100&page=1':response([])});assert.equal(inspectCI(fixture(t,selected),ambiguous.access).status,'unknown');
});

test('classic protection with only PR reviews establishes an empty status-check policy',t=>{
  const h=host({
    'repos/example/service/branches/trunk/protection':response({required_pull_request_reviews:{required_approving_review_count:1},enforce_admins:{enabled:true}}),
    'repos/example/service/rules/branches/trunk?per_page=100&page=1':response([])
  });
  const result=inspectCI(fixture(t,selected),h.access);
  assert.equal(result.status,'missing');
  assert.equal(result.sources[0].status,'available');
  assert.equal(result.coverage.complete,true);
});

test('a contradictory branch summary prevents a 404 from establishing absence',t=>{
  const root=fixture(t,selected);
  for(const protection of [{enabled:true},{required_status_checks:{contexts:['test'],enforcement_level:'everyone'}}]){
    const h=host({
      'repos/example/service/branches/trunk':response({name:'trunk',protected:false,protection}),
      'repos/example/service/branches/trunk/protection':{status:404,problem:'http-404'},
      'repos/example/service/rules/branches/trunk?per_page=100&page=1':response([])
    });
    const result=inspectCI(root,h.access);
    assert.equal(result.status,'unknown');
    assert.equal(result.sources[0].problem,'contradictory-protection');
    assert.equal(result.coverage.complete,false);
  }
});

test('unavailable sources preserve positive observations and missing bypass fields stay unknown',t=>{
  const h=host({'repos/example/service/branches/trunk/protection':{status:403,problem:'http-403'},'repos/example/service/rulesets/12?includes_parents=true':response(detail(12,{bypass_actors:undefined}))});
  const r=inspectCI(fixture(t,{...selected,requiredChecks:[{context:'test'},{context:'lint'}]}),h.access);
  assert.deepEqual(r.checks.map(c=>c.status),['observed','unknown']);assert.equal(r.status,'unknown');assert.equal(r.coverage.complete,false);assert.equal(r.sources.find(s=>s.kind==='ruleset').bypass.status,'unknown');
  assert.match(ciSummary(r),/Bypass information is unavailable/);
  for(const bypass_actors of [[],[{actor_type:'Team',actor_id:1,bypass_mode:'always'}]]){const x=host({'repos/example/service/rulesets/12?includes_parents=true':response(detail(12,{bypass_actors}))});assert.equal(inspectCI(fixture(t,selected),x.access).sources.find(s=>s.kind==='ruleset').bypass.status,bypass_actors.length?'possible':'none-observed');}
});

test('contradictory target and inactive ruleset responses cannot establish active enforcement',t=>{
  for(const data of [detail(99),detail(12,{enforcement:'evaluate'}),detail(12,{source:'elsewhere'}),detail(12,{target:'tag'})]){
    const h=host({'repos/example/service/rulesets/12?includes_parents=true':response(data)}),r=inspectCI(fixture(t,selected),h.access);assert.equal(r.status,'unknown');assert.deepEqual(r.checks[0].sources,[]);
  }
  const h=host({'repos/example/service/branches/trunk':response({name:'trunk',protected:false})});assert.equal(inspectCI(fixture(t,selected),h.access).status,'unknown');
  for(const data of [{full_name:'other/repo',default_branch:'trunk'},null]){const x=host({'repos/example/service':response(data)});assert.equal(inspectCI(fixture(t,selected),x.access).status,'unknown');assert.equal(x.calls.length,1);}
});

test('ruleset details with changed checks invalidate only that ruleset observation',t=>{
  const root=fixture(t,selected),detailPath='repos/example/service/rulesets/12?includes_parents=true';
  for(const rules of [[],[{type:'pull_request'}],[rule('test',12,9)],[rule('lint')]]){
    const h=host({[detailPath]:response(detail(12,{rules}))});
    const result=inspectCI(root,h.access);
    assert.equal(result.status,'unknown');
    assert.equal(result.sources.find(s=>s.kind==='ruleset').problem,'contradictory-ruleset-checks');
    assert.deepEqual(result.checks[0].sources,[]);
  }
  const otherSource=host({
    [detailPath]:response(detail(12,{rules:[]})),
    'repos/example/service/branches/trunk/protection':response({required_status_checks:{contexts:['test'],checks:[{context:'test',app_id:7}]}})
  });
  const result=inspectCI(root,otherSource.access);
  assert.equal(result.status,'observed');
  assert.deepEqual(result.checks[0].sources,['classic']);
  assert.equal(result.coverage.complete,false);
});

test('ruleset details can omit optional identity fields and an actor can omit the default mode',t=>{
  const h=host({
    'repos/example/service/rulesets/12?includes_parents=true':response({
      id:12,source:'example',enforcement:'active',rules:[{type:'deletion'},rule()],bypass_actors:[{actor_type:'Team',actor_id:1}]
    })
  });
  const result=inspectCI(fixture(t,selected),h.access);
  assert.equal(result.status,'observed');
  assert.equal(result.coverage.complete,true);
  assert.equal(result.sources.find(s=>s.kind==='ruleset').bypass.status,'possible');
});

test('unsupported, malformed and refused policy sources withhold absence claims',t=>{
  const endpoint='repos/example/service/rules/branches/trunk?per_page=100&page=1';
  for(const value of [response([{type:'workflows'}]),response([{type:'future_rule'}]),response([rule('test',12,0)]),response({}),{status:429,problem:'http-429'},{status:0,problem:'request-deadline'}]){
    const r=inspectCI(fixture(t,selected),host({[endpoint]:value}).access);assert.equal(r.status,'unknown');assert.equal(r.coverage.complete,false);
  }
});

test('effective rule pagination follows later requirements and rejects incomplete collection',t=>{
  const first='repos/example/service/rules/branches/trunk?per_page=100&page=1',second=first.replace('&page=1','&page=2');
  const h=host({[first]:response([{type:'deletion'}],{next:true}),[second]:response([rule()])});assert.equal(inspectCI(fixture(t,selected),h.access).status,'observed');assert.ok(h.calls.includes(second));
  const bad=host({[first]:response([],{next:true}),[second]:{status:403,problem:'http-403'}});assert.equal(inspectCI(fixture(t,selected),bad.access).status,'unknown');
  const routes={};for(let i=1;i<=ciLimits.pages;i++)routes[first.replace('&page=1',`&page=${i}`)]=response(Array.from({length:100},()=>({type:'deletion'})),{next:true});
  const limited=host(routes),r=inspectCI(fixture(t,selected),limited.access);assert.equal(r.status,'unknown');assert.ok(r.findings.some(f=>f.message.includes('pagination-limit')));assert.equal(limited.calls.filter(c=>c.includes('/rules/branches/')).length,ciLimits.pages);
});

test('ruleset detail requests remain bounded without losing already observed requirements',t=>{
  const routes={'repos/example/service/rules/branches/trunk?per_page=100&page=1':response(Array.from({length:33},(_,i)=>rule(i===32?'last':'test',i+1)))};
  for(let id=1;id<=32;id++)routes[`repos/example/service/rulesets/${id}?includes_parents=true`]=response(detail(id));
  const h=host(routes),r=inspectCI(fixture(t,{...selected,requiredChecks:[{context:'test'},{context:'last'}]}),h.access);assert.deepEqual(r.checks.map(c=>c.status),['observed','unknown']);assert.equal(h.calls.filter(c=>c.includes('/rulesets/')).length,32);
});

test('GitHub transport fixes GET and host, bounds output and deadlines and never reports raw secrets',()=>{
  let request;
  const access=githubAccess((file,args,options)=>{request={file,args,options};return 'HTTP/2.0 200 OK\r\nLink: <https://api.github.com/ignored>; rel="next"\r\n\r\n[]';});
  assert.deepEqual(access('repos/example/service'),{status:200,data:[],next:true});assert.equal(request.file,'gh');assert.ok(request.args.includes('GET'));assert.ok(request.args.includes('github.com'));assert.equal(request.options.timeout,10000);assert.equal(request.options.maxBuffer,1048576);assert.deepEqual(request.options.stdio,['ignore','pipe','pipe']);
  for(const error of [Object.assign(Error('secret-token'),{code:'ENOENT'}),Object.assign(Error('secret-token'),{code:'ETIMEDOUT'}),Object.assign(Error('secret-token'),{code:'ENOBUFS'}),Object.assign(Error('secret-token'),{stdout:'HTTP/2.0 403 Forbidden\n\n{"secret":"secret-token"}',stderr:'secret-token'})]){const r=githubAccess(()=>{throw error;})('repos/example/service');assert.ok(r.problem);assert.ok(!JSON.stringify(r).includes('secret-token'));}
  assert.equal(githubAccess(()=>'HTTP/2.0 200 OK\n\nnot-json')('repos/example/service').problem,'malformed-response');
  assert.equal(githubAccess(()=>'x'.repeat(ciLimits.responseBytes+1))('repos/example/service').problem,'response-limit');
  let time=0,calls=0;const expired=githubAccess(()=>{calls++;return '';},()=>time);time=60001;assert.equal(expired('repos/example/service').problem,'inspection-deadline');assert.equal(calls,0);
  time=0;const partial=githubAccess((file,args,options)=>{assert.equal(options.timeout,5000);return 'HTTP/2.0 200 OK\n\n[]';},()=>time);time=55000;assert.equal(partial('repos/example/service').status,200);
});

test('transport terminates a subprocess that ignores SIGTERM',{timeout:10000},()=>{
  let time=0;
  const access=githubAccess((file,args,options)=>{
    try {
      return String(execFileSync(process.execPath,['-e',"process.on('SIGTERM',()=>{});console.log('ready');setTimeout(()=>{},6500)"],options));
    } catch(error){
      assert.match(error.stdout,/ready/);
      throw error;
    }
  },()=>time);
  time=ciLimits.totalMilliseconds-2500;
  const start=performance.now();
  assert.equal(access('repos/example/service').problem,'request-deadline');
  assert.ok(performance.now()-start<5500);
});

test('CLI advisory output, errors and unavailable tooling preserve project files',t=>{
  const root=fixture(t,{mode:'off'});
  standInGithubCLI(root);
  const before=snapshots(root);
  const run=(args,pathValue='')=>spawnSync(process.execPath,[cli,...args,'--root',root],{cwd:root,encoding:'utf8',env:{...process.env,PATH:pathValue},timeout:15000});
  let result=run(['ci','inspect','--json']);assert.equal(result.status,0,result.stderr);assert.equal(JSON.parse(result.stdout).status,'off');
  result=run(['ci','inspect']);assert.equal(result.status,0);assert.match(result.stdout,/requirements: off/);assert.deepEqual(snapshots(root),before);
  write(root,'.cliewen-openspec/config.yaml',stringify({ciInspection:selected}));const configured=snapshots(root);
  for(const pathValue of ['','.']){
    result=run(['ci','inspect','--json'],pathValue);assert.equal(result.status,0);assert.equal(JSON.parse(result.stdout).status,'unknown');assert.match(result.stdout,/github-cli-unavailable/);assert.deepEqual(snapshots(root),configured);
  }
  for(const args of [['ci','other','--json'],['ci','inspect','--dry-run','--json'],['ci','inspect','--change','x','--json']]){result=run(args);assert.equal(result.status,2);assert.equal(JSON.parse(result.stdout).ok,false);}
  write(root,'.cliewen-openspec/config.yaml','ciInspection: {mode: enforce}\n');result=run(['ci','inspect','--json']);assert.equal(result.status,2);assert.match(JSON.parse(result.stdout).error,/mode/);
});

test('CLI uses only read requests and keeps missing requirements advisory',t=>{
  for(const protectedBranch of [true,false]){
    const root=fixture(t,selected);
    standInGithubCLI(root);
    const bin=path.join(root,'command path'),gh=standInGithubCLI(bin),before=snapshots(root);
    const script=`import cp from 'node:child_process'; import {syncBuiltinESMExports} from 'node:module';
      cp.execFileSync=(file,args)=>{
        if(file!==${JSON.stringify(gh)}||args[args.indexOf('--method')+1]!=='GET'||args[args.indexOf('--hostname')+1]!=='github.com')throw Error('Mutation or unexpected process');
        const endpoint=args.at(-1);let data;
        if(endpoint==='repos/example/service')data={full_name:'example/service',default_branch:'main'};
        else if(endpoint==='repos/example/service/branches/main')data={name:'main',protected:${protectedBranch}};
        else if(endpoint.endsWith('/protection'))data={required_status_checks:${protectedBranch?'{contexts:["test"],checks:[{context:"test",app_id:7}]}':'null'},enforce_admins:{enabled:true}};
        else if(endpoint.includes('/rules/branches/'))data=[];else throw Error('Unexpected endpoint');
        if(!${protectedBranch}&&endpoint.endsWith('/protection'))throw Object.assign(Error('private-secret'),{stdout:'HTTP/2.0 404 Not Found\\n\\n{}'});
        return 'HTTP/2.0 200 OK\\n\\n'+JSON.stringify(data);
      };syncBuiltinESMExports();process.argv=[process.execPath,${JSON.stringify(cli)},'ci','inspect','--json','--root',${JSON.stringify(root)}];await import(${JSON.stringify(new URL('../dist/cli.js',import.meta.url).href)});`;
    const r=spawnSync(process.execPath,['--input-type=module','-e',script],{cwd:root,env:{...process.env,PATH:['.',bin].join(path.delimiter)},encoding:'utf8',timeout:15000});assert.equal(r.status,0,r.stderr);assert.equal(JSON.parse(r.stdout).status,protectedBranch?'observed':'missing');assert.ok(!r.stdout.includes('private-secret'));assert.deepEqual(snapshots(root),before);
  }
});

test('inspection reference follows ownership, preserves config and reaches all workflows',t=>{
  const root=fixture(t,{...selected,mode:'off'});for(const dir of ['openspec/specs','openspec/changes'])fs.mkdirSync(path.join(root,dir),{recursive:true});write(root,'openspec/config.yaml','schema: spec-driven\n');
  const cfg=fs.readFileSync(path.join(root,'.cliewen-openspec/config.yaml'),'utf8');init(root,false,false);assert.ok(fs.existsSync(path.join(root,resource)));assert.deepEqual(init(root,false,false),[]);assert.equal(update(root).writes.length,0);
  for(const schema of ['delivery','discovery','all']){const s=parse(fs.readFileSync(path.join(root,`openspec/schemas/cliewen-${schema}/schema.yaml`),'utf8'));for(const instruction of [...s.artifacts.map(a=>a.instruction),s.apply.instruction])assert.ok(instruction.includes(resource));}
  const original=fs.readFileSync(path.join(root,resource),'utf8');write(root,resource,original+'Authored edit');assert.throws(()=>update(root),/Conflict/);assert.throws(()=>uninstall(root),/Conflict/);write(root,resource,original);
  const manifestPath=path.join(root,'.cliewen-openspec/manifest.json'),manifest=JSON.parse(fs.readFileSync(manifestPath));delete manifest.files[resource];fs.writeFileSync(manifestPath,JSON.stringify(manifest));assert.throws(()=>update(root),/Unowned/);fs.unlinkSync(path.join(root,resource));update(root);uninstall(root);assert.equal(fs.existsSync(path.join(root,resource)),false);assert.equal(fs.readFileSync(path.join(root,'.cliewen-openspec/config.yaml'),'utf8'),cfg);
});
