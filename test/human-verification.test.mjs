import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {init,check,config} from '../dist/core.js';

test('manual observations retain warning semantics and cannot hide failed, invalid or stale evidence',t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cliewen-human-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const write=(file,text)=>{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
  for(const dir of ['openspec/specs','openspec/changes'])fs.mkdirSync(path.join(root,dir),{recursive:true});
  write('openspec/config.yaml','schema: spec-driven\n');init(root,false,false);
  write('openspec/specs/export/spec.md','### Requirement: Export\n#### Scenario: Selected rows [EXP-001]\nTest-type: E2E\n');
  const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
  git('init');git('add','.');git('-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','-m','Test inputs');
  const report={version:1,revision:git('rev-parse','HEAD'),execution:{exitCode:0},results:[{scenario:'EXP-001',test:'Observed selected rows',testType:'E2E',outcome:'manual',reason:'Illustrative fixture: Alex checked selected rows; other environments unknown.'}]};
  const collect=()=>write(config(root).evidence.report,JSON.stringify(report));collect();
  const findings=check(root);
  assert.equal(findings.some(f=>f.severity==='error'),false,JSON.stringify(findings));
  assert.equal(findings.find(f=>f.code==='manual-verification').severity,'warning');
  report.execution.exitCode=1;collect();assert.ok(check(root).some(f=>f.code==='runner-failed'));report.execution.exitCode=0;
  delete report.results[0].testType;collect();assert.ok(check(root).some(f=>f.code==='missing-test-type'));report.results[0].testType='E2E';
  report.revision='0'.repeat(40);collect();assert.ok(check(root).some(f=>f.code==='stale-evidence'));
});
