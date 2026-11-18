import {fork} from 'node:child_process';

export type DiagramInput = {path: string; line: number; text: string};
export type DiagramResult = {version: string | null; outcomes: ('passed' | 'invalid' | 'incomplete')[]};

export async function checkDiagrams(diagrams: DiagramInput[]): Promise<DiagramResult> {
  const result: DiagramResult = {version: null, outcomes: diagrams.map(() => 'incomplete')};
  if (!diagrams.length) return result;
  return new Promise(resolve => {
    const child = fork(new URL('./mermaid-worker.js', import.meta.url), [], {silent: true, windowsHide: true, execArgv: [], env: {...process.env, NODE_OPTIONS: ''}});
    let index = 0, bytes = 0, finished = false;
    const finish = () => {if (finished) return; finished = true; clearTimeout(timer); child.kill(); resolve(result);};
    let timer = setTimeout(finish, 5000);
    const deadline = () => {clearTimeout(timer); timer = setTimeout(finish, 5000);};
    for (const stream of [child.stdout, child.stderr]) stream?.on('data', data => {bytes += data.length; if (bytes > 65536) finish();});
    child.on('error', finish);
    child.on('exit', finish);
    child.on('message', message => {
      if (finished || !message || typeof message !== 'object') return;
      const response = message as {ready?: boolean; version?: string; valid?: boolean};
      if (response.ready && typeof response.version === 'string') result.version = response.version;
      else if (typeof response.valid === 'boolean' && result.version) {
        result.outcomes[index++] = response.valid ? 'passed' : 'invalid';
        if (index === diagrams.length) {finish(); return;}
      } else {finish(); return;}
      deadline();
      child.send(diagrams[index].text, error => {if (error) finish();});
    });
  });
}
