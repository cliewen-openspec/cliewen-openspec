import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createServer} from 'node:http';
import {stringify} from 'yaml';
import {config} from '../dist/core.js';
import {checkDocumentation, documentationLimits} from '../dist/documentation.js';

const source = fileURLToPath(new URL('../', import.meta.url));
const cli = path.join(source, 'dist/cli.js');
const write = (root, file, text) => {fs.mkdirSync(path.dirname(path.join(root,file)), {recursive:true}); fs.writeFileSync(path.join(root,file),text);};
const modes = {links:'off', metadata:'off', mermaid:'off'};
function fixture(t, settings={}) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen docs space '));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  settingsAt(root,settings);
  return root;
}
function settingsAt(root, settings, other={}) {write(root,'.cliewen-openspec/config.yaml',stringify({...other,documentationChecks:{...modes,...settings}}));}
const codes = r => r.findings.map(f=>f.code);
function snapshot(root) {
  const result={};
  const visit=dir=>{for(const e of fs.readdirSync(dir,{withFileTypes:true})) {const full=path.join(dir,e.name);if(e.isDirectory())visit(full);else if(e.isFile())result[path.relative(root,full)]=createHash('sha256').update(fs.readFileSync(full)).digest('hex');}};
  visit(root);return result;
}

test('documentation defaults preserve config and independent feature choices',async t=>{
  const root=fixture(t);
  const text='features: {documentation: false, mermaid: false, evidence: false, planning: false}\nlearnings: {enabled: false}\ndocumentationChecks: {links: off}\n';
  write(root,'.cliewen-openspec/config.yaml',text);write(root,'docs/valid.md','# Valid\n');
  const c=config(root);assert.equal(c.documentationChecks.metadata,'advisory');assert.equal(c.documentationChecks.mermaid,'advisory');
  const result=await checkDocumentation(root);
  assert.equal(result.exitCode,0);assert.equal(result.categories.links.status,'off');assert.equal(result.categories.metadata.status,'passed');
  assert.equal(fs.readFileSync(path.join(root,'.cliewen-openspec/config.yaml'),'utf8'),text);
  write(root,'.cliewen-openspec/config.yaml','{}\n');
  const defaults=config(root).documentationChecks;
  for(const category of ['links','metadata','mermaid'])assert.equal(defaults[category],'advisory');
});

test('documentation configuration rejects unsupported settings before content reads',async t=>{
  const root=fixture(t);write(root,'docs/record.md','# Existing\n');
  for(const settings of [null,[],{links:true},{mermaid:'on'},{unknown:1},{roots:'docs'},{roots:['../outside']},{roots:['C:\\outside']},{exclude:['/outside']},{roots:['docs/**']},{exclude:[' docs']},{roots:['docs\0x']},{metadataRules:{}},{metadataRules:[{path:'docs',unknown:1}]},{metadataRules:[{path:'../x'}]},{metadataRules:[{path:'docs',values:{status:[]}}]},{metadataRules:[{path:'docs',required:['']}]},{metadataRules:[{path:'docs',values:{status:[1]}}]}]) {
    write(root,'.cliewen-openspec/config.yaml',stringify({documentationChecks:settings}));
    const before=snapshot(root);await assert.rejects(checkDocumentation(root),/documentationChecks/);assert.deepEqual(snapshot(root),before);
  }
});

test('all-off checks skip collection and parser startup even with missing roots',async t=>{
  const root=fixture(t,{roots:['missing']});
  const previous=fs.opendirSync;let walks=0;
  fs.opendirSync=(...args)=>{walks++;return previous(...args);};
  try {const r=await checkDocumentation(root);assert.equal(r.exitCode,0);assert.equal(r.scope.readFiles,0);assert.equal(r.mermaidParserVersion,null);assert.equal(walks,0);}
  finally {fs.opendirSync=previous;}
});

test('links resolve encoded targets reference definitions images and Unicode duplicate headings',async t=>{
  const root=fixture(t,{links:'enforce'});
  write(root,'docs/page.markdown','# Héllo, *world*!\n\n# Repeat\n\n# Repeat\n');write(root,'docs/a b.png','image');
  write(root,'docs/README.md','[Unicode](page.markdown#héllo-world)\n\n[Repeated][target]\n\n[target]: page.markdown?raw=1#repeat-1\n\n![image](a%20b.png)\n\n`[example](missing.md)`\n\n```text\n[example][not-a-definition]\n```\n\n\\[literal][not-a-definition]\n');
  const before=snapshot(root),r=await checkDocumentation(root);
  assert.deepEqual(r.findings,[]);assert.equal(r.categories.links.status,'passed');assert.equal(r.scope.readFiles,2);assert.deepEqual(snapshot(root),before);
});

test('reference targets retain host filesystem case behavior',async t=>{
  const root=fixture(t,{links:'enforce'});write(root,'docs/Target.md','# Heading\n');write(root,'docs/source.md','[Target](target.md#heading)\n');
  const resolves=fs.existsSync(path.join(root,'docs/target.md'));
  const descriptor=Object.getOwnPropertyDescriptor(process,'platform');
  try {
    // Keep the real filesystem while removing the Windows-only assumption.
    for(const reported of new Set([process.platform,'darwin'])){
      Object.defineProperty(process,'platform',{...descriptor,value:reported});
      const r=await checkDocumentation(root);
      if(resolves)assert.deepEqual(r.findings,[],reported);
      else assert.ok(codes(r).includes('docs-link-missing'),reported);
    }
  } finally {Object.defineProperty(process,'platform',descriptor);}
});

test('escaped closing brackets in reference labels resolve valid definitions and retain genuine failures',async t=>{
  const root=fixture(t,{links:'enforce'});write(root,'docs/target.md','# Heading\n');
  write(root,'docs/source.md',String.raw`[text][label\]with-bracket]

[label\]with-bracket]: target.md#heading

[missing][other\]label]

[broken][broken\]target]

[broken\]target]: absent.md
`);
  const r=await checkDocumentation(root);
  assert.equal(codes(r).filter(c=>c==='docs-reference-undefined').length,1);
  assert.equal(codes(r).filter(c=>c==='docs-link-missing').length,1);
  assert.equal(r.exitCode,1);
  write(root,'docs/source.md',String.raw`[text][label\]with-bracket]

[label\]with-bracket]: target.md#heading
`);
  const valid=await checkDocumentation(root);assert.deepEqual(valid.findings,[]);assert.equal(valid.exitCode,0);
});

test('hard-link aliases outside selected paths do not expand fragment scope',async t=>{
  const root=fixture(t,{links:'enforce',roots:['docs/Target.md','docs/source.md']});write(root,'docs/Target.md','# Heading\n');
  fs.linkSync(path.join(root,'docs/Target.md'),path.join(root,'docs/Alias.md'));
  fs.linkSync(path.join(root,'docs/Target.md'),path.join(root,'outside.md'));
  write(root,'docs/source.md','[Same directory](Alias.md#heading)\n\n[Other directory](../outside.md#heading)\n');
  const before=snapshot(root),r=await checkDocumentation(root);
  assert.equal(codes(r).filter(c=>c==='docs-fragment-unchecked').length,2);assert.equal(r.exitCode,1);assert.deepEqual(snapshot(root),before);
});

test('broken and unsupported references keep issues distinct from incomplete scope',async t=>{
  const root=fixture(t,{links:'advisory'});
  write(root,'docs/README.md','[Missing](missing.md)\n\n[Unknown](target.md#absent)\n\n[Undefined][key]\n\n[Bad](bad%ZZ.md)\n\n[External](https://example.invalid/)\n\n[Route](/generated/page)\n\n[Custom](custom.md#manual)\n');
  write(root,'docs/target.md','# Existing\n');write(root,'docs/custom.md','<a id="manual"></a>\n');
  const r=await checkDocumentation(root);
  for(const code of ['docs-link-missing','docs-fragment-missing','docs-reference-undefined','docs-link-encoding','docs-fragment-unsupported'])assert.ok(codes(r).includes(code),code);
  assert.equal(r.scope.nonLocalReferences,2);assert.equal(r.exitCode,0);assert.equal(r.categories.links.status,'incomplete');
  settingsAt(root,{links:'enforce'});assert.equal((await checkDocumentation(root)).exitCode,1);
});

test('exclusions precede body reads and references cannot expand content scope',async t=>{
  const root=fixture(t,{links:'enforce',exclude:['docs/private']});
  write(root,'docs/private/secret.md','PRIVATE BODY');write(root,'docs/private-other/visible.md','# Visible\n');
  write(root,'docs/README.md','[Excluded](private/secret.md#secret)\n\n[Outside](../other.md#outside)\n\n[Visible](private-other/visible.md#visible)\n');write(root,'other.md','# Outside\n');
  const read=fs.readFileSync;let prohibitedReads=0;
  fs.readFileSync=(file,...args)=>{if([path.join(root,'docs/private/secret.md'),path.join(root,'other.md')].includes(String(file))) {prohibitedReads++;throw Error('Body must stay unread');}return read(file,...args);};
  try {const r=await checkDocumentation(root);assert.equal(prohibitedReads,0);assert.equal(r.scope.readFiles,2);assert.equal(r.scope.excludedPaths,1);assert.equal(codes(r).filter(c=>c==='docs-fragment-unchecked').length,2);assert.equal(r.exitCode,1);}
  finally {fs.readFileSync=read;}
});

test('missing roots linked directories and size/count limits cannot pass enforced checks',async t=>{
  const root=fixture(t,{metadata:'enforce'});write(root,'docs/large.md','x'.repeat(documentationLimits.fileBytes+1));
  let r=await checkDocumentation(root);assert.ok(codes(r).includes('docs-file-size'));assert.equal(r.scope.readFiles,0);assert.equal(r.exitCode,1);
  settingsAt(root,{metadata:'enforce',roots:['absent']});assert.ok(codes(await checkDocumentation(root)).includes('docs-unreadable-path'));
  write(root,'outside/record.md','unread');fs.mkdirSync(path.join(root,'docs'),{recursive:true});
  fs.symlinkSync(path.join(root,'outside'),path.join(root,'docs/linked'),process.platform==='win32'?'junction':'dir');
  settingsAt(root,{metadata:'enforce'});r=await checkDocumentation(root);assert.ok(r.findings.some(f=>f.path==='docs/linked'&&f.incomplete));
  const many=fixture(t,{metadata:'enforce'});
  for(let i=0;i<=documentationLimits.files;i++)write(many,`docs/${String(i).padStart(4,'0')}.md`,'# Record\n');
  r=await checkDocumentation(many);assert.equal(r.scope.selectedFiles,documentationLimits.files);assert.ok(codes(r).includes('docs-file-limit'));assert.equal(r.exitCode,1);
});

test('optional frontmatter custom fields and native artifacts remain valid',async t=>{
  const root=fixture(t,{metadata:'enforce',roots:['docs','openspec/changes']});
  write(root,'docs/none.md','# No metadata\n');write(root,'docs/custom.md','---\norganization: custom\nstatus: local-status\n---\n# Custom\n');
  write(root,'openspec/changes/example/proposal.md','# Proposal\n\n## Why\nExisting artifact\n');
  const r=await checkDocumentation(root);assert.equal(r.categories.metadata.status,'passed');assert.equal(r.categories.metadata.checked,3);assert.deepEqual(r.findings,[]);
});

test('metadata reports syntax shape and scoped rule failures without global rules',async t=>{
  const root=fixture(t,{metadata:'enforce',metadataRules:[{path:'docs/decisions',required:['type','status'],values:{type:['decision'],status:['accepted']}},{path:'docs/decisions/special',values:{status:['proposed']}}]});
  write(root,'docs/duplicate.md','---\ntype: decision\ntype: plan\n---\n');write(root,'docs/bad.md','---\nstatus: [\n---\n');write(root,'docs/scalar.md','---\nplain\n---\n');write(root,'docs/unclosed.md','---\ntype: decision\n');
  write(root,'docs/decisions/missing.md','# Missing fields\n');write(root,'docs/decisions/good.md','---\ntype: decision\nstatus: accepted\nother: custom\n---\n');write(root,'docs/decisions/special/record.md','---\ntype: decision\nstatus: accepted\n---\n');write(root,'docs/other.md','---\nstatus: anything\n---\n');
  const before=snapshot(root),r=await checkDocumentation(root);
  for(const code of ['docs-frontmatter-yaml','docs-frontmatter-mapping','docs-frontmatter-unclosed','docs-metadata-required','docs-metadata-value'])assert.ok(codes(r).includes(code),code);
  assert.ok(r.findings.filter(f=>f.path==='docs/duplicate.md').every(f=>f.line===3));
  assert.ok(!r.findings.some(f=>['docs/decisions/good.md','docs/other.md'].includes(f.path)));assert.deepEqual(snapshot(root),before);
});

test('unclosed metadata cannot silently skip other checks',async t=>{
  const root=fixture(t,{links:'enforce',mermaid:'enforce'});write(root,'docs/unclosed.md','---\nstatus: [\n[Hidden](missing.md)\n');
  const r=await checkDocumentation(root);assert.equal(r.categories.links.status,'incomplete');assert.equal(r.categories.mermaid.status,'incomplete');assert.ok(codes(r).includes('docs-body-unchecked'));
});

test('included Mermaid parser distinguishes valid grammar invalid grammar and oversized input',async t=>{
  const root=fixture(t,{mermaid:'enforce'});
  write(root,'docs/diagrams.md','```mermaid\nflowchart LR\n A --> B\n```\n\n```mermaid\nsequenceDiagram\n Alice->>Bob: Hello\n```\n\n```mermaid\nflowchart LR\n A --> [\n```\n');
  const r=await checkDocumentation(root);assert.equal(r.mermaidParserVersion,'12.2.0');assert.equal(r.categories.mermaid.checked,3);assert.equal(r.exitCode,1);assert.equal(codes(r).filter(c=>c==='docs-mermaid-syntax').length,1);
  write(root,'docs/diagrams.md','```mermaid\n'+ 'x'.repeat(documentationLimits.diagramBytes+1)+'\n```\n');
  const large=await checkDocumentation(root);assert.ok(codes(large).includes('docs-mermaid-size'));assert.equal(large.mermaidParserVersion,null);assert.equal(large.categories.mermaid.status,'incomplete');
});

test('parser initialization failures and hangs are incomplete with a real subprocess bound',async t=>{
  const root=fixture(t);write(root,'package.json','{"type":"module"}');
  fs.copyFileSync(path.join(source,'dist/mermaid-check.js'),path.join(root,'mermaid-check.js'));
  const {checkDiagrams}=await import(pathToFileURL(path.join(root,'mermaid-check.js')).href);
  write(root,'mermaid-worker.js','throw Error("missing parser");\n');
  let r=await checkDiagrams([{path:'docs/example.md',line:1,text:'flowchart LR\n A --> B'}]);assert.deepEqual(r.outcomes,['incomplete']);assert.equal(r.version,null);
  write(root,'mermaid-worker.js','process.send({ready:true,version:"fault-injection"});process.on("message",()=>{while(true){}});\n');
  const started=performance.now();r=await checkDiagrams([{path:'docs/example.md',line:1,text:'flowchart LR'}]);
  assert.deepEqual(r.outcomes,['incomplete']);assert.ok(performance.now()-started>=4900);assert.ok(performance.now()-started<10000);
});

test('Markdown and Mermaid parsing do not execute HTML or fetch local resources',async t=>{
  let requests=0;const server=createServer((_q,response)=>{requests++;response.end('resource');});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>server.close());
  const root=fixture(t,{mermaid:'enforce'}),url=`http://127.0.0.1:${server.address().port}/image`;
  write(root,'docs/diagrams.md',`<script>fetch('${url}')</script>\n<img src="${url}">\n\n\`\`\`mermaid\nflowchart LR\n A["<img src='${url}'>"] --> B\n\`\`\`\n`);
  const r=await checkDocumentation(root);assert.equal(r.mermaidParserVersion,'12.2.0');assert.equal(requests,0);assert.equal(r.exitCode,0);
});

test('CLI keeps warnings distinct from blocking findings and usage errors without Git or OpenSpec',t=>{
  const root=fixture(t,{links:'advisory'});write(root,'docs/README.md','[Missing](missing.md)\n');
  const run=args=>spawnSync(process.execPath,[cli,...args,'--root',root],{encoding:'utf8'});
  let r=run(['docs','check','--json']);assert.equal(r.status,0,r.stderr);let report=JSON.parse(r.stdout);assert.equal(report.categories.links.status,'issues');assert.equal(report.ok,true);
  settingsAt(root,{links:'enforce'});r=run(['docs','check','--json']);assert.equal(r.status,1);assert.equal(JSON.parse(r.stdout).ok,false);
  r=run(['docs','check']);assert.match(r.stdout,/docs-link-missing/);assert.match(r.stdout,/links: issues/);
  for(const args of [['docs','unknown','--json'],['docs','check','--json','--dry-run'],['docs','check','--json','--change','example']]) {r=run(args);assert.equal(r.status,2);assert.equal(JSON.parse(r.stdout).ok,false);}
});

test('packed documentation command includes its parsers in production-only installation',{timeout:180000},t=>{
  const root=fixture(t,{links:'enforce',metadata:'enforce',mermaid:'enforce'}),npm=process.env.npm_execpath;
  assert.ok(npm,'Run through npm test, or provide npm_execpath for a focused run');
  const env={...process.env,CI:'1',OPENSPEC_TELEMETRY:'0'};delete env.NODE_TEST_CONTEXT;
  const run=(args,cwd=root)=>{const r=spawnSync(process.execPath,args,{cwd,env,encoding:'utf8',timeout:90000});assert.equal(r.status,0,`${r.stdout}\n${r.stderr}\n${r.error??''}`);return r.stdout;};
  const pack=JSON.parse(run([npm,'pack','--ignore-scripts','--json','--pack-destination',root],source))[0];
  write(root,'package.json','{"private":true,"type":"module"}\n');
  run([npm,'install','--omit=dev','--ignore-scripts','--no-audit','--no-fund',path.join(root,pack.filename)]);
  write(root,'docs/README.md','---\ntype: overview\n---\n# Overview\n\n[Heading](#overview)\n\n```mermaid\nflowchart LR\n A --> B\n```\n');
  const before=snapshot(root),result=JSON.parse(run(['node_modules/cliewen-openspec/dist/cli.js','docs','check','--json']));
  assert.equal(result.mermaidParserVersion,'12.2.0');for(const value of Object.values(result.categories))assert.equal(value.status,'passed');
  for(const name of ['@fission-ai/openspec','vitepress','playwright'])assert.equal(fs.existsSync(path.join(root,'node_modules',name)),false,name);
  assert.equal(fs.existsSync(path.join(root,'.git')),false);assert.deepEqual(snapshot(root),before);
});
