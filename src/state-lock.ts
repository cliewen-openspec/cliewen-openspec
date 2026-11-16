import os from 'node:os';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const held = new Set<string>();
function hasGitMetadata(root:string):boolean {
  const start=fs.realpathSync(root);let cursor=start;
  while(true) {
    const exists=(file:string)=>{try{return fs.lstatSync(file);}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;return undefined;}};
    const marker=path.join(cursor,'.git'),entry=exists(marker);
    if(entry) {
      if(cursor===start||entry.isSymbolicLink())return true;
      if(entry.isDirectory()&&['HEAD','objects','commondir','cliewen-ac'].some(name=>exists(path.join(marker,name))))return true;
      if(entry.isFile()&&entry.size<=65536&&/^gitdir: /m.test(fs.readFileSync(marker,'utf8')))return true;
    }
    // An unrelated empty .git directory in an ancestor is not a repository.
    if(exists(path.join(cursor,'HEAD'))&&(cursor===start||exists(path.join(cursor,'objects'))||exists(path.join(cursor,'cliewen-ac'))))return true;
    const parent=path.dirname(cursor);if(parent===cursor)return false;cursor=parent;
  }
}
export function runtimeDirectory(root: string): string {
  let directory: string;
  try {
    const gitDir=execFileSync('git', ['rev-parse', '--absolute-git-dir'], {cwd:root,encoding:'utf8',windowsHide:true,timeout:5000,stdio:['ignore','pipe','pipe'],env:{...process.env,LC_ALL:'C',LANG:'C'}}).trim();
    if(!gitDir||!path.isAbsolute(gitDir))throw Error('Invalid Git directory output');
    directory=path.join(gitDir,'cliewen-ac');
  } catch(error) {
    const failure=error as {status?:number;stderr?:string|Buffer};
    const nonGit=failure.status===128&&/^fatal: not a git repository\b/m.test(String(failure.stderr??''));
    const selected=Object.keys(process.env).some(key=>['GIT_DIR','GIT_WORK_TREE','GIT_COMMON_DIR'].includes(key.toUpperCase())&&process.env[key]!==undefined);
    if(!nonGit||selected||hasGitMetadata(root))throw Error('Git runtime discovery failed; no allocation or recovery performed. Repair Git access before retrying; Cliewen will not switch runtime directories on a discovery error.');
    directory=path.join(os.tmpdir(),'cliewen-state-'+createHash('sha256').update(fs.realpathSync(root)).digest('hex'));
  }
  // Do not follow a project-controlled runtime link.
  let cursor = path.parse(path.resolve(directory)).root;
  for (const part of path.resolve(directory).slice(cursor.length).split(path.sep)) {
    cursor = path.join(cursor, part);
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) throw Error('Symlink not supported in Cliewen runtime path');
  }
  return directory;
}

export function withStateLock<T>(root: string, action: () => T): T {
  const directory = runtimeDirectory(root), file = path.join(directory, 'state.lock');
  if (held.has(file)) return action();
  fs.mkdirSync(directory, {recursive:true});
  const end = Date.now() + 20000;
  let fd: number;
  while (true) {
    try { fd = fs.openSync(file, 'wx'); break; }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      if (Date.now() >= end) throw Error(`Cliewen state is locked: ${file}. Retry; after an interrupted process, stop all Cliewen writers before removing this lock file. Locks are never stolen automatically.`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25);
    }
  }
  held.add(file);
  try { fs.writeFileSync(fd, JSON.stringify({pid:process.pid})); return action(); }
  finally { held.delete(file); fs.closeSync(fd); fs.unlinkSync(file); }
}
