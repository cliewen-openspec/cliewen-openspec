#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync, spawnSync} from 'node:child_process';
import {JSDOM} from 'jsdom';
import {config, local, scenarios} from 'cliewen-openspec/dist/core.js';

const root = process.cwd();
const git = (...args) => execFileSync('git', args, {encoding: 'utf8'}).trim();
const dirty = () => git('status', '--porcelain', '--untracked-files=all');
const identity = (classname, name) => JSON.stringify([classname, name]);

function argumentsForRun(args) {
  const separator = args.indexOf('--');
  if (separator < 0 || !args[separator + 1]) throw Error('Pass a test executable and its arguments after --');
  const options = new Map();
  for (let i = 0; i < separator; i += 2) {
    const [option, value] = args.slice(i, i + 2);
    if (!['--mapping', '--change', '--capability'].includes(option) || options.has(option) || !value || value.startsWith('-')) {
      throw Error(`Invalid adapter option: ${option}`);
    }
    options.set(option, value);
  }
  const mapping = options.get('--mapping');
  const change = options.get('--change');
  const capability = options.get('--capability');
  if (!mapping || (change && capability)) throw Error('Pass --mapping FILE and at most one of --change NAME or --capability NAME');
  return {mapping, change, capability, command: args.slice(separator + 1)};
}

function readMappings(filename, types) {
  if (!git('ls-files', '--', ':(literal)' + filename)) throw Error('Commit the JUnit mapping file before collecting evidence.');
  const entries = JSON.parse(fs.readFileSync(local(root, filename), 'utf8'));
  if (!Array.isArray(entries) || !entries.length) throw Error('JUnit mappings must be a nonempty JSON array');
  const mappings = new Map();
  for (const entry of entries) {
    const {classname, name, scenario, testType, caseId, coverage} = entry ?? {};
    if (![classname, name, scenario, testType].every(value => typeof value === 'string' && value.trim()) ||
        !/^[A-Z][A-Z0-9]*-\d+$/.test(scenario) || !Object.hasOwn(types, testType)) {
      throw Error('Each JUnit mapping requires classname, name, an acceptance ID, and a configured testType');
    }
    const key = identity(classname, name);
    const matches = mappings.get(key) ?? new Map();
    if (matches.has(scenario)) throw Error(`Duplicate JUnit mapping for ${classname}#${name} and ${scenario}`);
    matches.set(scenario, {scenario, test: `${classname}#${name}`, testType, caseId, coverage});
    mappings.set(key, matches);
  }
  return mappings;
}

function readSuite(file) {
  const xml = fs.readFileSync(file, 'utf8');
  if (/<!DOCTYPE\b/i.test(xml)) throw Error(`DOCTYPE is unsupported in Surefire report ${file}`);
  const dom = new JSDOM(xml, {contentType: 'application/xml'});
  try {
    const suite = dom.window.document.documentElement;
    if (suite.tagName !== 'testsuite') throw Error(`Expected a Surefire testsuite in ${file}`);
    const cases = [...suite.children].filter(node => node.tagName === 'testcase');
    const counts = {tests: cases.length, failures: 0, errors: 0, skipped: 0};
    const rows = cases.map(testcase => {
      const classname = testcase.getAttribute('classname');
      const name = testcase.getAttribute('name');
      if (!classname?.trim() || !name?.trim()) throw Error(`Missing testcase identity in ${file}`);
      const tags = [...testcase.children].map(node => node.tagName);
      if (tags.some(tag => /^(?:flaky|rerun)(?:Failure|Error)$/.test(tag))) throw Error(`Disable Surefire test retries before collecting evidence from ${file}`);
      const statuses = tags.filter(tag => ['failure', 'error', 'skipped'].includes(tag));
      if (statuses.length > 1) throw Error(`Conflicting testcase outcomes in ${file}`);
      const status = statuses[0];
      if (status) counts[status === 'skipped' ? 'skipped' : status + 's']++;
      return {classname, name, outcome: status === 'skipped' ? 'skipped' : status ? 'failed' : 'passed'};
    });
    for (const [attribute, count] of Object.entries(counts)) {
      if (!/^\d+$/.test(suite.getAttribute(attribute) ?? '') || Number(suite.getAttribute(attribute)) !== count) {
        throw Error(`Surefire report ${file} has an inconsistent ${attribute} count`);
      }
    }
    return rows;
  } finally {
    dom.window.close();
  }
}

function collect(directory, mappings, selected, exitCode) {
  const files = fs.readdirSync(directory, {withFileTypes: true})
    .filter(entry => entry.isFile() && /^TEST-.*\.xml$/.test(entry.name));
  if (!files.length) throw Error('No Surefire TEST-*.xml reports in CLIEWEN_JUNIT_REPORTS');
  const seen = new Set();
  const results = [];
  for (const {name: file} of files) {
    for (const {classname, name, outcome} of readSuite(path.join(directory, file))) {
      if (outcome === 'failed' && exitCode === 0) throw Error('Surefire XML reports a failure but the runner exited zero');
      const key = identity(classname, name);
      if (!mappings.has(key)) continue;
      if (seen.has(key)) throw Error(`Ambiguous Surefire testcase identity: ${classname}#${name}`);
      seen.add(key);
      for (const entry of mappings.get(key).values()) {
        if (!selected || selected.has(entry.scenario)) results.push({...entry, outcome});
      }
    }
  }
  if (!results.length) throw Error('No mapped JUnit results in the selected scope');
  return results;
}

try {
  if (dirty()) throw Error('Commit project inputs before collecting evidence.');
  const revision = git('rev-parse', 'HEAD');
  const settings = config(root);
  const output = local(root, settings.evidence.report);
  if (spawnSync('git', ['check-ignore', '-q', '--', output]).status !== 0) {
    throw Error('Evidence output must be Git-ignored and untracked before collecting results.');
  }
  fs.rmSync(output, {force: true});
  const {mapping, change, capability, command} = argumentsForRun(process.argv.slice(2));
  const scope = capability ? {capability} : change ? {change} : undefined;
  const selected = scope && new Set(scenarios(root, change, capability).map(item => item.id));
  if (selected && (!selected.size || selected.has(''))) throw Error('Selected scope requires scenarios with AC IDs');
  const mappings = readMappings(mapping, settings.testing.types);
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'cliewen-surefire-'));
  try {
    const [executable, ...args] = command;
    const run = spawnSync(executable, args, {stdio: 'inherit', env: {...process.env, CLIEWEN_JUNIT_REPORTS: directory}});
    if (run.error) throw run.error;
    if (run.status === null) throw Error('Test runner did not complete');
    const results = collect(directory, mappings, selected, run.status);
    if (git('rev-parse', 'HEAD') !== revision || dirty()) throw Error('Test execution changed repository inputs');
    fs.mkdirSync(path.dirname(output), {recursive: true});
    fs.writeFileSync(output, JSON.stringify({version: 1, revision, scope, execution: {exitCode: run.status}, results}, null, 2) + '\n');
    process.exitCode = run.status === 0 ? 0 : 1;
  } finally {
    fs.rmSync(directory, {recursive: true, force: true});
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 2;
}
