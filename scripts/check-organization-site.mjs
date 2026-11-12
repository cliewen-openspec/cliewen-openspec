import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';import {chromium} from 'playwright';
import {pages} from '../site/pages.mjs';import {guideURL} from '../site/urls.mjs';

const root=process.cwd();
const server=http.createServer((request,response)=>{
  const pathname=new URL(request.url,'http://localhost').pathname;
  const legacy=pathname.startsWith('/cliewen-openspec/');
  const directory=path.resolve(root,legacy?'legacy-site-dist':'site-dist');
  const relative=legacy?pathname.slice('/cliewen-openspec/'.length):pathname.slice('/guide/'.length);
  const file=pathname==='/'?path.resolve(root,'site/organization/index.html'):path.resolve(directory,decodeURIComponent(relative)||'index.html');
  if(pathname!=='/'&&(!pathname.startsWith('/guide/')&&!legacy||!file.startsWith(directory+path.sep))){response.writeHead(404);response.end();return;}
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){response.writeHead(404);response.end();return;}
  response.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'})[path.extname(file)]??'application/octet-stream');
  response.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser,context;
try{
  browser=await chromium.launch();context=await browser.newContext();
  await context.route('https://cliewen-openspec.github.io/**',async route=>{const url=new URL(route.request().url());await route.fulfill({response:await route.fetch({url:origin+url.pathname+url.search})});});
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const width of [1360,390])for(const colorScheme of ['light','dark']){
    await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme});await page.goto(origin+'/');
    assert.equal(await page.locator('main h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    assert.equal(await page.getByRole('link',{name:'Read the guide'}).getAttribute('href'),'/guide/');
    await page.screenshot({path:`.tmp/organization-${width}-${colorScheme}.png`});
  }
  await page.getByRole('link',{name:'Read the guide'}).click();await page.waitForURL(origin+'/guide/');await page.locator('main h1').waitFor();
  for(const item of pages){
    const target=guideURL+(item.output==='index.html'?'':item.output)+'?from=legacy#kept-fragment';
    await page.goto(origin+'/cliewen-openspec/'+item.output+'?from=legacy#kept-fragment');await page.waitForURL(target);await page.locator('main h1').waitFor();
  }
  assert.deepEqual(errors,[]);console.log(`Organization home passes light/dark desktop/mobile checks; all ${pages.length} legacy redirects preserve query and fragment.`);
}finally{
  if(context){await context.unrouteAll({behavior:'wait'});await context.close();}
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
