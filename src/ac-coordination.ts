import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import {execFileSync} from 'node:child_process';
import {parseDocument} from 'yaml';
import {config, local, recover, transaction, type Config} from './core.js';
import {parseRegistry, validateRegistry, maximum, type Registry} from './ac.js';
import {runtimeDirectory, withStateLock} from './state-lock.js';

export const authorityRef = 'refs/heads/cliewen/ac-allocator';
const settingsPath = '.cliewen-openspec/ac-coordination.json';
const registryPath = '.cliewen-openspec/ac-registry.json';
type Settings = {version:1; mode:'git'; remote:string; authority:string};
type Request = {id:string; kind:'next'|'rename'; capability:string; prefix?:string};
type Authority = {version:1; id:string; registry:Registry; requests:Record<string,{signature:string; result:string|null}>};
const json = (v:unknown) => JSON.stringify(v,null,2)+'\n';
const validRemote = (v:unknown): v is string => typeof v==='string' && /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(v);
const uuid = (v:unknown): v is string => typeof v==='string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
function runtimeFile(root:string,name:string):string {
  const file=path.join(runtimeDirectory(root),name);
  try {if(fs.lstatSync(file).isSymbolicLink())throw Error('Symlink not supported for pending AC request.');}
  catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
  return file;
}
const pendingFile=(root:string)=>runtimeFile(root,'request.json');
function requireCompletedSetup(root:string) {
  if(fs.existsSync(runtimeFile(root,'setup.json')))throw Error('AC coordination setup is pending; repeat ac coordinate with the original remote and --apply before allocating or synchronizing.');
}

function git(root:string,args:string[],input?:string):string {
  return execFileSync('git', args, {cwd:root,input,encoding:'utf8',timeout:10000,maxBuffer:16*1024*1024,windowsHide:true,stdio:['pipe','pipe','pipe'],env:{...process.env,GIT_TERMINAL_PROMPT:'0',GIT_AUTHOR_NAME:'Cliewen AC allocator',GIT_AUTHOR_EMAIL:'allocator@example.invalid',GIT_COMMITTER_NAME:'Cliewen AC allocator',GIT_COMMITTER_EMAIL:'allocator@example.invalid'}}).trim();
}
function repository(root:string,remote:string) {
  if (!validRemote(remote)) throw Error('Use a configured Git remote name for AC coordination.');
  if (fs.realpathSync(git(root,['rev-parse','--show-toplevel']))!==fs.realpathSync(root)) throw Error('Run AC coordination at the Git repository root.');
  git(root,['remote','get-url','--push','--all',remote]);
  const fetch=git(root,['remote','get-url','--all',remote]), push=git(root,['remote','get-url','--push','--all',remote]);
  if(fetch.includes('\n')||push.includes('\n')||fetch!==push) throw Error('AC coordination requires the same fetch and push URL.');
}
export function coordinationSettings(root:string):Settings|undefined {
  const file=local(root,settingsPath);
  if(!fs.existsSync(file)) return;
  const raw=JSON.parse(fs.readFileSync(file,'utf8'));
  if(raw?.version!==1 || !['git','local'].includes(raw.mode)) throw Error('Invalid AC coordination settings; select local or git mode explicitly.');
  if(raw.mode==='local') { if(Object.keys(raw).some(k=>!['version','mode'].includes(k)))throw Error('Local AC settings accept only version and mode.'); return; }
  if(!validRemote(raw.remote)||!uuid(raw.authority)||Object.keys(raw).some(k=>!['version','mode','remote','authority'].includes(k)))throw Error('Invalid Git AC coordination settings.');
  return raw;
}
function readAuthority(root:string,remote:string,c:Config):{tip:string; value:Authority}|undefined {
  const line=git(root,['ls-remote','--refs',remote,authorityRef]);
  if(!line)return;
  const tip=line.split(/\s+/)[0];
  if(!/^[a-f0-9]{40,64}$/.test(tip))throw Error('Invalid AC authority tip.');
  git(root,['fetch','--no-tags','--no-write-fetch-head',remote,tip]);
  const raw=JSON.parse(git(root,['show',`${tip}:claims.json`]));
  if(raw?.version!==1||!uuid(raw.id)||!raw.requests||typeof raw.requests!=='object'||Array.isArray(raw.requests))throw Error('Invalid AC authority state.');
  raw.registry=parseRegistry(raw.registry,{...c,ac:{...c.ac,capabilities:{}}});
  const claims=new Set<string>();
  for(const [key,v] of Object.entries(raw.requests) as [string,any][]) {
    if(!uuid(key)||!v||typeof v.signature!=='string')throw Error('Invalid AC request record.');
    const request=JSON.parse(v.signature),record=Object.hasOwn(raw.registry.capabilities,request.capability)?raw.registry.capabilities[request.capability]:undefined;
    if(!record||!['next','rename'].includes(request.kind))throw Error('Invalid AC request capability or kind.');
    if(request.kind==='next') {
      const match=typeof v.result==='string'?/^([A-Z][A-Z0-9]*)-(\d+)$/.exec(v.result):null;
      if(!match||![record.prefix,...record.previousPrefixes].includes(match[1])||!Number.isSafeInteger(Number(match[2]))||Number(match[2])<1||Number(match[2])>record.highWater)throw Error('Invalid AC reservation result.');
      const claim=`${request.capability}:${Number(match[2])}`;
      if(claims.has(claim))throw Error('Duplicate AC reservation result.');claims.add(claim);
    } else if(v.result!==null||![record.prefix,...record.previousPrefixes].includes(request.prefix))throw Error('Invalid AC prefix reservation result.');
  }
  return {tip,value:raw};
}
function publish(root:string,remote:string,tip:string|undefined,value:Authority):void {
  const blob=git(root,['hash-object','-w','--stdin'],json(value));
  const tree=git(root,['mktree'],`100644 blob ${blob}\tclaims.json\n`);
  const commit=git(root,['commit-tree',tree,...(tip?['-p',tip]:[]),'-m','Reserve acceptance identities']);
  // Every update is constructed as a descendant; the exact lease also rejects deletion or a changed tip.
  git(root,['push','--porcelain',`--force-with-lease=${authorityRef}:${tip??''}`,remote,`${commit}:${authorityRef}`]);
}
function writeSetup(file:string,remote:string,authority:string,rejectedCreation=false) {
  const temp=file+'.'+randomUUID()+'.tmp';
  fs.writeFileSync(temp,json({remote,authority,...(rejectedCreation?{rejectedCreation:true}:{})}),{flag:'wx'});fs.renameSync(temp,file);
}
function rejectedCreation(error:unknown):boolean {
  // A transport failure is ambiguous. Only Git's explicit lease rejection proves this creation did not publish.
  const output=String((error as {stdout?:string|Buffer})?.stdout??'');
  return output.split(/\r?\n/).some(line=>{
    const [flag,ref,status]=line.split('\t');
    return flag==='!'&&ref?.endsWith(`:${authorityRef}`)&&/^\[rejected\] \((stale info|already exists)\)$/.test(status??'');
  });
}
function merge(root:string,c:Config,remote:Registry,own:Registry):Registry {
  const r:Registry=structuredClone(remote);
  for(const [prefix,n] of Object.entries(own.unassignedPrefixes))r.unassignedPrefixes[prefix]=Math.max(r.unassignedPrefixes[prefix]??0,n);
  for(const [name,record] of Object.entries(own.capabilities)) {
    const target=Object.hasOwn(r.capabilities,name)?r.capabilities[name]:undefined;
    if(target) {
      if(target.prefix!==record.prefix&&!target.previousPrefixes.includes(record.prefix))throw Error(`Conflicting AC prefix authority for ${name}; synchronize and reconcile mappings.`);
      if(record.previousPrefixes.some(p=>p!==target.prefix&&!target.previousPrefixes.includes(p)))throw Error(`Conflicting AC prefix history for ${name}.`);
      target.highWater=Math.max(target.highWater,record.highWater,maximum(root,target));
    } else r.capabilities[name]=structuredClone(record);
  }
  for(const record of Object.values(r.capabilities)) {
    for(const prefix of [record.prefix,...record.previousPrefixes]) {
      if(Object.hasOwn(r.unassignedPrefixes,prefix)){record.highWater=Math.max(record.highWater,r.unassignedPrefixes[prefix]);delete r.unassignedPrefixes[prefix];}
    }
    record.highWater=maximum(root,record);
  }
  return parseRegistry(r,{...c,ac:{...c.ac,capabilities:{}}});
}
function persist(root:string,r:Registry,settings?:Settings) {
  const doc=parseDocument(fs.readFileSync(local(root,'.cliewen-openspec/config.yaml'),'utf8'));
  if(doc.errors.length)throw Error(doc.errors[0].message);
  const c=config(root),expected=structuredClone(doc.toJS());let changed=false;
  for(const name of Object.keys(c.ac.capabilities))if(Object.hasOwn(r.capabilities,name)&&c.ac.capabilities[name]!==r.capabilities[name].prefix){doc.setIn(['ac','capabilities',name],r.capabilities[name].prefix);expected.ac.capabilities[name]=r.capabilities[name].prefix;changed=true;}
  if(!isDeepStrictEqual(doc.toJS(),expected))throw Error('Prefix synchronization would change unrelated YAML values through shared aliases; reconcile those aliases first.');
  transaction(root,{[registryPath]:json(r),...(changed?{'.cliewen-openspec/config.yaml':doc.toString()}:{}),...(settings?{[settingsPath]:json(settings)}:{})});
}
export function coordinate(root:string,remote:string,apply=false) {
  const action=()=>{
    repository(root,remote);const c=config(root),own=validateRegistry(root,c),settings=coordinationSettings(root);
    const setupFile=runtimeFile(root,'setup.json');
    const pending=fs.existsSync(setupFile)?JSON.parse(fs.readFileSync(setupFile,'utf8')):undefined;
    if(pending&&(!uuid(pending.authority)||pending.remote!==remote))throw Error('Pending AC setup names another remote or is invalid; reconcile it before changing authority.');
    if(settings&&settings.remote!==remote)throw Error('AC authority is already selected; changing authorities requires explicit project migration.');
    const found=readAuthority(root,remote,c);
    if(pending&&found&&found.value.id!==pending.authority&&!(pending.rejectedCreation===true&&!settings))throw Error('Pending AC setup authority was replaced; investigate before continuing.');
    if(settings&&(!found||found.value.id!==settings.authority))throw Error('Selected AC authority is missing or replaced; no local fallback.');
    const r=merge(root,c,found?.value.registry??{version:2,capabilities:{},unassignedPrefixes:{}},own);
    if(!apply)return {mode:'git',remote,ref:authorityRef,action:found?'join-and-seed':'create-and-seed',registry:r};
    if(fs.existsSync(pendingFile(root)))throw Error('A reservation is pending; run ac resume before setup.');
    let value:Authority=found?.value??{version:1,id:pending?.authority??randomUUID(),registry:r,requests:{}};
    writeSetup(setupFile,remote,value.id);
    value.registry=r;
    try { publish(root,remote,found?.tip,value); }
    catch(error) {
      if(!found&&!settings&&rejectedCreation(error)) {
        writeSetup(setupFile,remote,value.id,true);
        throw Error(`Another setup won initial creation. Repeat ac coordinate ${remote} --apply to join its authority; allocation remains blocked until then.`);
      }
      throw error;
    }
    persist(root,r,{version:1,mode:'git',remote,authority:value.id});
    fs.unlinkSync(setupFile);
    return {mode:'git',remote,ref:authorityRef,authority:value.id};
  };
  return apply?withStateLock(root,()=>{recover(root);return action();}):action();
}
export function syncIds(root:string) {
  return withStateLock(root,()=>{
    requireCompletedSetup(root);
    recover(root);const settings=coordinationSettings(root);if(!settings)throw Error('AC sync requires Git coordination.');
    repository(root,settings.remote);const c=config(root),own=validateRegistry(root,c),found=readAuthority(root,settings.remote,c);
    if(!found||found.value.id!==settings.authority)throw Error('Selected AC authority is missing or replaced.');
    const combined=merge(root,c,found.value.registry,own);
    if(JSON.stringify(combined)!==JSON.stringify(found.value.registry))throw Error('Local reservations exceed the authority; preview and apply ac coordinate to seed them first.');
    persist(root,found.value.registry);return {mode:'git',remote:settings.remote};
  });
}
export function reserve(root:string,kind:'next'|'rename',capability:string,prefix?:string):string|null {
  requireCompletedSetup(root);
  const settings=coordinationSettings(root);if(!settings)throw Error('Git coordination is not selected.');repository(root,settings.remote);
  const c=config(root),own=validateRegistry(root,c),file=pendingFile(root);
  const request:Request=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{id:randomUUID(),kind,capability,...(prefix?{prefix}:{})};
  if(!request||!['next','rename'].includes(request.kind)||typeof request.capability!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(request.capability)||(request.kind==='next'?request.prefix!==undefined:typeof request.prefix!=='string'||!/^[A-Z][A-Z0-9]*$/.test(request.prefix)))throw Error('Invalid pending AC request; abandon it after checking the authority.');
  if(!uuid(request.id)||request.kind!==kind||request.capability!==capability||request.prefix!==prefix)throw Error('Another AC reservation is pending; run ac resume before requesting a different operation.');
  const signature=JSON.stringify({kind,capability,prefix:prefix??null});
  let lastError:unknown;
  for(let attempt=0;attempt<6;attempt++) {
    const found=readAuthority(root,settings.remote,c);
    if(!found||found.value.id!==settings.authority)throw Error('Selected AC authority is missing or replaced; reservation remains pending.');
    const value=found.value,previous=value.requests[request.id];
    if(previous) {
      if(previous.signature!==signature)throw Error('AC request identity conflict.');
      persist(root,value.registry);fs.unlinkSync(file);return previous.result;
    }
    const r=merge(root,c,value.registry,own);
    if(!Object.hasOwn(c.ac.capabilities,capability))throw Error(`Unknown capability: ${capability}`);
    const record=r.capabilities[capability];let result:string|null=null;
    if(kind==='next') {
      record.highWater++;
      if(!Number.isSafeInteger(record.highWater))throw Error('AC sequence exhausted.');
      result=`${record.prefix}-${String(record.highWater).padStart(c.ac.padding,'0')}`;
    } else {
      if(!prefix||!/^[A-Z][A-Z0-9]*$/.test(prefix))throw Error('Invalid AC prefix.');
      if(record.prefix!==prefix) {
        if(Object.hasOwn(r.unassignedPrefixes,prefix)||Object.values(r.capabilities).some(v=>v.prefix===prefix||v.previousPrefixes.includes(prefix)))throw Error(`AC prefix is already reserved: ${prefix}`);
        if(maximum(root,{prefix,previousPrefixes:[],highWater:0})>0)throw Error(`AC prefix already occurs in OpenSpec documents: ${prefix}`);
        record.previousPrefixes.push(record.prefix);record.prefix=prefix;
      }
    }
    value.registry=r;value.requests[request.id]={signature,result};
    if(!fs.existsSync(file)){const temp=file+'.'+randomUUID()+'.tmp';fs.writeFileSync(temp,json(request),{flag:'wx'});fs.renameSync(temp,file);}
    try {publish(root,settings.remote,found.tip,value);} catch(error){lastError=error;continue;}
    // Re-read the remote even after an apparently successful push to reconcile the durable request.
  }
  const final=readAuthority(root,settings.remote,c);
  if(final?.value.id===settings.authority&&final.value.requests[request.id]?.signature===signature){persist(root,final.value.registry);const result=final.value.requests[request.id].result;fs.unlinkSync(file);return result;}
  throw Error(`AC reservation could not be confirmed; no ID returned. Retry ac resume. ${lastError instanceof Error?lastError.message:''}`);
}
export function resumeIds(root:string) {
  return withStateLock(root,()=>{recover(root);const file=pendingFile(root);if(!fs.existsSync(file))throw Error('No AC reservation is pending.');const r=JSON.parse(fs.readFileSync(file,'utf8'));return reserve(root,r.kind,r.capability,r.prefix);});
}
export function assertNoPendingLocal(root:string) {
  requireCompletedSetup(root);
  if(fs.existsSync(pendingFile(root)))throw Error('A coordinated reservation is pending. Restore Git mode and run ac resume or ac abandon before local allocation.');
}
export function abandonRequest(root:string) {
  return withStateLock(root,()=>{
    recover(root);const settings=coordinationSettings(root);if(!settings)throw Error('Restore Git coordination before abandoning a pending request.');
    const file=pendingFile(root);if(!fs.existsSync(file))throw Error('No AC reservation is pending.');
    repository(root,settings.remote);const c=config(root),found=readAuthority(root,settings.remote,c);
    if(!found||found.value.id!==settings.authority)throw Error('Cannot abandon while the selected authority is unavailable or replaced.');
    persist(root,merge(root,c,found.value.registry,validateRegistry(root,c)));fs.unlinkSync(file);
    return 'Pending request abandoned; any published reservation remains permanently reserved.';
  });
}
