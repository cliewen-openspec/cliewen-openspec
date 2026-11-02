import fs from 'node:fs';

// TypeScript leaves outputs from deleted source files in an existing build.
for (const file of ['tdd.js', 'tdd.d.ts']) {
  fs.rmSync(new URL(`../dist/${file}`, import.meta.url), {force: true});
}
