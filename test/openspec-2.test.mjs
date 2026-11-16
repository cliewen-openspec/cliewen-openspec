import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const source=fileURLToPath(new URL('../',import.meta.url));
test('native 1.17 to 2.0 migration preserves custom copies and Cliewen preserves native skills', {timeout:180000},t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-openspec2-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const npm=process.env.npm_execpath;assert.ok(npm,'Run through npm test');
  const env={...process.env,CI:'1',OPENSPEC_TELEMETRY:'0',OPENSPEC_NO_UPDATE_CHECK:'1',XDG_CONFIG_HOME:path.join(root,'.config')};delete env.NODE_TEST_CONTEXT;
  const run=(args,cwd=root)=>{
    const r=spawnSync(process.execPath,args,{cwd,env,encoding:'utf8',timeout:90000,windowsHide:true});
    assert.equal(r.status,0,`${args.join(' ')}\n${r.stdout}\n${r.stderr}\n${r.error??''}`);return r.stdout;
  };
  const pack=JSON.parse(run([npm,'pack','--ignore-scripts','--json','--pack-destination',root],source))[0];
  fs.writeFileSync(path.join(root,'package.json'),'{"private":true}');
  run([npm,'install','--ignore-scripts','--no-audit','--no-fund',path.join(root,pack.filename),'@fission-ai/openspec@1.17.0']);
  const native=path.join(root,'node_modules/@fission-ai/openspec/bin/openspec.js');
  run([native,'init','--tools','claude','--no-animation']);
  const custom=path.join(root,'.claude/skills/openspec-explore/SKILL.md');
  const text=fs.readFileSync(custom,'utf8')+'\nProject-specific exploration note.\n';fs.writeFileSync(custom,text);
  run([npm,'install','--ignore-scripts','--no-audit','--no-fund','@fission-ai/openspec@2.0.0']);
  run([native,'update','--dry-run']);assert.equal(fs.readFileSync(custom,'utf8'),text);
  run([native,'update']);assert.equal(fs.readFileSync(custom,'utf8'),text);
  const canonical=path.join(root,'.agents/skills');assert.ok(fs.existsSync(path.join(canonical,'openspec-explore/SKILL.md')));
  const snapshot=dir=>{
    const result={};
    const visit=p=>{for(const name of fs.readdirSync(p)){const f=path.join(p,name),s=fs.lstatSync(f),key=path.relative(root,f);if(s.isSymbolicLink())result[key]={link:fs.readlinkSync(f)};else if(s.isDirectory())visit(f);else result[key]={content:fs.readFileSync(f).toString('base64')};}};
    visit(dir);return result;
  };
  const before={canonical:snapshot(canonical),claude:snapshot(path.join(root,'.claude'))};
  const cli=path.join(root,'node_modules/cliewen-openspec/dist/cli.js');
  for(const command of ['init','update','uninstall']){
    run([cli,command]);
    assert.deepEqual({canonical:snapshot(canonical),claude:snapshot(path.join(root,'.claude'))},before);
  }
  const links=Object.values(before.claude).filter(v=>v.link).length;
  t.diagnostic(`Native tool integration observed: ${links} links; preserved edited explore copy.`);
});
