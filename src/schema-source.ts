import {readFileSync} from 'node:fs';

// Resolve packaged sources independently of the consumer's working directory.
export function template(relative: string): string {
  return readFileSync(new URL('../schemas/' + relative, import.meta.url), 'utf8').replaceAll('\r\n', '\n');
}

export function instruction(relative: string): string {
  return template(relative).trim().split(/\n/).map(line => line.trim()).join(' ');
}

export const routing = ['routing', 'writing', 'humanizer', 'learnings', 'diagrams', 'work-scoping'].map(name => instruction(`base/instructions/${name}.md`)).join(' ') + ' Read .cliewen-openspec/planning.md for optional planning guidance; features.planning controls its planning-specific requests.';
