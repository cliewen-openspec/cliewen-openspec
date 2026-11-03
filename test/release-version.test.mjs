import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {init,update,uninstall,check,version} from '../dist/core.js';

test('lifecycle rejects other manifest versions without altering authored or installed files',t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-release-version-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const write=(file,text)=>{const target=path.join(root,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,text);};
  write('openspec/config.yaml','schema: spec-driven\n');
  for(const dir of ['openspec/specs','openspec/changes'])fs.mkdirSync(path.join(root,dir),{recursive:true});
  init(root,false,false);
  write('.cliewen-openspec/config.yaml','features: {evidence: false}\n');
  write('docs/authored.md','# Keep this project document\n');
  const manifestFile=path.join(root,'.cliewen-openspec/manifest.json');
  const current=fs.readFileSync(manifestFile,'utf8');
  const original=JSON.parse(current);
  assert.equal(original.version,version);
  assert.equal(check(root).some(f=>f.severity==='error'),false);
  assert.deepEqual(update(root,false),{writes:[],deletes:[]});
  const snapshot=()=>{
    const files={};
    const visit=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
      const file=path.join(dir,entry.name);
      if(entry.isDirectory())visit(file);else files[path.relative(root,file)]=fs.readFileSync(file).toString('base64');
    }};
    visit(root);return files;
  };
  for(const installed of ['0.1.0-alpha.1','0.2.0-alpha.1','9.0.0']){
    fs.writeFileSync(manifestFile,JSON.stringify({...original,version:installed}));
    const before=snapshot();
    assert.ok(check(root).some(f=>f.code==='unsupported-installed-version'&&f.severity==='error'),installed);
    for(const dry of [true,false]){
      assert.throws(()=>init(root,dry,false),/version.*differs|supports.*manifests only/i);
      assert.throws(()=>update(root,dry),/Unsupported installed version/);
      assert.throws(()=>uninstall(root,dry),/Unsupported installed version/);
      assert.deepEqual(snapshot(),before,`${installed}: dryRun=${dry}`);
    }
  }
  fs.writeFileSync(manifestFile,current);
  assert.equal(check(root).some(f=>f.severity==='error'),false);
  uninstall(root,false);
  assert.equal(fs.readFileSync(path.join(root,'docs/authored.md'),'utf8'),'# Keep this project document\n');
});
