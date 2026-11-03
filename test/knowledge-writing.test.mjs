import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {parse} from 'yaml';
import {config, defaults, init, update, uninstall} from '../dist/core.js';

function fixture(t) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-knowledge-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const write=(file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
  write('openspec/config.yaml','schema: spec-driven\n');
  fs.mkdirSync(path.join(root,'openspec/specs'),{recursive:true});
  fs.mkdirSync(path.join(root,'openspec/changes'),{recursive:true});
  init(root,false,false);
  return {root,write};
}

test('knowledge and writing defaults preserve old configs and independent runtime choices',t=>{
  const {root,write}=fixture(t);
  write('.cliewen-openspec/config.yaml','{}\n');
  assert.deepEqual(config(root).learnings,{enabled:false,directory:'learnings'});
  assert.deepEqual(config(root).writing,{humanizer:'auto'});
  for(const enabled of [false,true])for(const mode of ['auto','on','off']){
    write('.cliewen-openspec/config.yaml',`docsRoot: notes\nlearnings: {enabled: ${enabled}, directory: lessons}\nwriting: {humanizer: '${mode}'}\nfeatures: {documentation: false}\n`);
    const c=config(root);
    assert.deepEqual(c.learnings,{enabled,directory:'lessons'});
    assert.equal(c.writing.humanizer,mode);
    assert.equal(c.docsRoot,'notes');
    assert.equal(fs.existsSync(path.join(root,'notes/lessons')),false);
  }
  assert.deepEqual(defaults().writing,{humanizer:'auto'});
});

test('knowledge and writing reject malformed settings and paths before any writes',t=>{
  const {root,write}=fixture(t);
  for(const settings of ['learnings: null','learnings: []','learnings: {enabled: yes}','learnings: {directory: 42}','learnings: {directory: ""}','learnings: {directory: " ../outside"}','learnings: {directory: ../outside}','learnings: {directory: /outside}','learnings: {directory: "C:outside"}','learnings: {typo: true}','writing: null','writing: []','writing: {humanizer: true}','writing: {humanizer: required}','writing: {typo: auto}']){
    write('.cliewen-openspec/config.yaml',settings+'\n');
    assert.throws(()=>config(root),undefined,settings);
    assert.equal(fs.readFileSync(path.join(root,'.cliewen-openspec/config.yaml'),'utf8'),settings+'\n');
  }
  fs.mkdirSync(path.join(root,'real'),{recursive:true});
  fs.mkdirSync(path.join(root,'notes'),{recursive:true});
  fs.symlinkSync(path.join(root,'real'),path.join(root,'notes/lessons'),process.platform==='win32'?'junction':'dir');
  write('.cliewen-openspec/config.yaml','docsRoot: notes\nlearnings: {enabled: true, directory: lessons}\n');
  assert.throws(()=>config(root),/Symlink/);
  write('.cliewen-openspec/config.yaml','docsRoot: notes\nlearnings: {directory: lessons}\n');
  assert.equal(config(root).learnings.enabled,false,'An unused user-owned knowledge alias does not break disabled learnings');
  write('.cliewen-openspec/config.yaml','docsRoot: notes\nlearnings: {enabled: true, directory: lessons}\nfeatures: {documentation: false}\n');
  assert.equal(config(root).features.documentation,false,'Suppressed documentation guidance does not access the learning collection');
});

test('lifecycle owns only the learning template and preserves disabled authored collections and skills',t=>{
  const {root,write}=fixture(t);
  const template='.cliewen-openspec/templates/learning.md';
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'.cliewen-openspec/manifest.json')));
  assert.ok(manifest.files[template]);
  assert.equal(fs.existsSync(path.join(root,'docs/learnings')),false);
  const files={'notes/lessons/README.md':'# Existing index\n','notes/lessons/old-name.md':'---\nstatus: retired\n---\n# Authored lesson\n','.agents/skills/humanizer/SKILL.md':'User-owned skill.\n'};
  for(const [file,text]of Object.entries(files))write(file,text);
  write('.cliewen-openspec/config.yaml',"docsRoot: notes\nlearnings: {enabled: false, directory: lessons}\nwriting: {humanizer: 'off'}\n");
  update(root,false);
  for(const [file,text]of Object.entries(files))assert.equal(fs.readFileSync(path.join(root,file),'utf8'),text);
  uninstall(root,false);
  assert.equal(fs.existsSync(path.join(root,template)),false);
  for(const [file,text]of Object.entries(files))assert.equal(fs.readFileSync(path.join(root,file),'utf8'),text);
});

test('every installed schema carries the same host-state and lesson guidance without adding artifacts',t=>{
  const {root}=fixture(t);
  for(const name of ['delivery','discovery','all']){
    const schema=parse(fs.readFileSync(path.join(root,`openspec/schemas/cliewen-${name}/schema.yaml`),'utf8'));
    for(const item of [...schema.artifacts,schema.apply]){
      assert.match(item.instruction,/learnings.enabled/);
      assert.match(item.instruction,/features.documentation/);
      assert.match(item.instruction,/writing.humanizer/);
      assert.match(item.instruction,/Detection without application must never be reported as use/);
      assert.match(item.instruction,/one brief status per session/);
      assert.match(item.instruction,/current project authorities/);
    }
    assert.ok(!schema.artifacts.some(a=>/learning|humanizer/i.test(a.id)));
  }
});

test('adding the learning template to an older manifest does not adopt an unowned file',t=>{
  const {root}=fixture(t);
  const file=path.join(root,'.cliewen-openspec/templates/learning.md');
  const manifestPath=path.join(root,'.cliewen-openspec/manifest.json');
  const previous=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  delete previous.files['.cliewen-openspec/templates/learning.md'];
  fs.writeFileSync(manifestPath,JSON.stringify(previous));
  fs.writeFileSync(file,'# Project-owned template\n');
  const before=fs.readFileSync(manifestPath,'utf8');
  assert.throws(()=>update(root,false),/Conflict|Unowned|unowned/);
  assert.equal(fs.readFileSync(file,'utf8'),'# Project-owned template\n');
  assert.equal(fs.readFileSync(manifestPath,'utf8'),before);
});
