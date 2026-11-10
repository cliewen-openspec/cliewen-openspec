import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {requirements, meetsMinimum} from './release.js';

type Command = {file: string; args: string[]; source: string};
export type Compatibility = {node: {version: string; minimum: string}; openspec: {version: string; minimum: string; source: string}};

function npmCommand(root: string): Command | undefined {
  let entry: string;
  try { entry = createRequire(path.join(path.resolve(root), 'package.json')).resolve('@fission-ai/openspec'); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
      // A present but broken package must not be hidden by a global installation.
      const locations = createRequire(path.join(path.resolve(root), 'package.json')).resolve.paths('@fission-ai/openspec') ?? [];
      if (locations.some(p => fs.existsSync(path.join(p, '@fission-ai/openspec/package.json')))) throw Error('Project OpenSpec package cannot be resolved; repair its installation before init/update.');
      return;
    }
    throw Error('Project OpenSpec package cannot be resolved; repair its installation before init/update.');
  }
  let cursor = path.dirname(entry);
  while (true) {
    const metadata = path.join(cursor, 'package.json');
    if (fs.existsSync(metadata)) {
      const pkg = JSON.parse(fs.readFileSync(metadata, 'utf8'));
      if (pkg.name === '@fission-ai/openspec') {
        const bin = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin?.openspec;
        if (typeof bin !== 'string') throw Error('Project OpenSpec package has no public CLI; repair its installation.');
        const cli = path.resolve(cursor, bin), relative = path.relative(cursor, cli);
        if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw Error('Project OpenSpec CLI path is invalid; repair its installation.');
        return {file: process.execPath, args: [cli], source: `project npm: ${cli}`};
      }
    }
    const parent = path.dirname(cursor);
    if (parent === cursor) throw Error('Project OpenSpec package metadata cannot be located; repair its installation.');
    cursor = parent;
  }
}

function pathCommand(): Command | undefined {
  const extensions = process.platform === 'win32' ? ['.exe', '.cmd', '.bat', ''] : [''];
  for (const directory of (process.env.PATH ?? '').split(path.delimiter).filter(Boolean)) {
    for (const extension of extensions) {
      const candidate = path.resolve(directory.replace(/^"|"$/g, ''), `openspec${extension}`);
      if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) continue;
      if (process.platform !== 'win32') {
        try { fs.accessSync(candidate, fs.constants.X_OK); } catch { continue; }
      }
      if (/\.(cmd|bat)$/i.test(candidate)) {
        // npm/cmd-shim's public JS entry can be invoked without executing shell text.
        const text = fs.readFileSync(candidate, 'utf8');
        const entry = /"%dp0%[\\/]([^"\r\n]+\.(?:c|m)?js)"\s+%\*/i.exec(text)?.[1];
        if (!entry) throw Error(`Cannot safely resolve OpenSpec PATH shim: ${candidate}. Use a project-local npm installation or a standalone executable.`);
        const cli = path.resolve(path.dirname(candidate), entry.replaceAll('\\', path.sep));
        return {file: process.execPath, args: [cli], source: `PATH npm shim: ${candidate} -> ${cli}`};
      }
      return {file: candidate, args: [], source: `PATH: ${candidate}`};
    }
  }
}

export function compatibility(root: string): Compatibility {
  const node = process.versions.node;
  if (!meetsMinimum(node, requirements.node)) throw Error(`Node ${node} is unsupported; requires Node ${requirements.node}+. Install a compatible Node runtime and rerun init/update.`);
  const command = npmCommand(root) ?? pathCommand();
  if (!command) throw Error(`OpenSpec not found; requires OpenSpec ${requirements.openspec}+ and Node ${requirements.node}+. Install a compatible project-local @fission-ai/openspec package or expose its standalone CLI on PATH, then rerun init/update.`);
  let output: string;
  try {
    output = execFileSync(command.file, [...command.args, '--version'], {cwd: root, encoding: 'utf8', timeout: 5000, maxBuffer: 65536, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'], env: {...process.env, OPENSPEC_TELEMETRY: '0', CI: '1'}}).trim();
  } catch {
    throw Error(`OpenSpec version probe failed or exceeded 5 seconds (${command.source}); requires OpenSpec ${requirements.openspec}+ runnable on Node ${node}. Repair the selected installation or its Node runtime and rerun init/update.`);
  }
  if (!meetsMinimum(output, requirements.openspec)) throw Error(`OpenSpec version ${JSON.stringify(output)} is unsupported (${command.source}); requires stable OpenSpec ${requirements.openspec}+. Install a compatible version deliberately and rerun init/update; Cliewen does not upgrade OpenSpec.`);
  return {node: {version: node, minimum: requirements.node}, openspec: {version: output, minimum: requirements.openspec, source: command.source}};
}
