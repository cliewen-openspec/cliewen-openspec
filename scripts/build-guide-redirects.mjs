import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {pages} from '../site/pages.mjs';
import {guideURL} from '../site/urls.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=path.join(root,'legacy-site-dist');
fs.mkdirSync(output,{recursive:true});
for(const page of [...pages,{output:'404.html'}]){
  const target=guideURL+(page.output==='index.html'||page.output==='404.html'?'':page.output);
  const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Guide moved</title><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script><h1>The guide has moved</h1><p><a href="${target}">Open the Cliewen for OpenSpec guide</a>.</p></html>`;
  fs.writeFileSync(path.join(output,page.output),html);
}
fs.writeFileSync(path.join(output,'.nojekyll'),'');
console.log(`Built ${pages.length} legacy guide redirects and a fallback.`);
