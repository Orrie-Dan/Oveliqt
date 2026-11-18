import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import { chromium } from 'playwright';
const server=await createServer({server:{host:'127.0.0.1',port:3118,watch:{ignored:['**/references/**','**/scripts/**']}}});
await server.listen();
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 await mkdir('references/oveliq/about-redesign',{recursive:true});
 for(const width of [1440,768,375]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:') || r.request().url().startsWith('data:') ? r.continue():r.abort());
  for(const route of ['about','pricing']) {
   await page.goto(server.resolvedUrls.local[0]+route,{waitUntil:'domcontentloaded'});
   await page.locator('h1').waitFor();
   await page.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));
   await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${width}/${route} overflow`);
   if(route==='about') {assert.equal(await page.locator('.about-work-card').count(),3);assert.equal(await page.locator('.about-people').count(),0);}
   else {assert.equal(await page.getByText('$800–$2,500',{exact:true}).count(),1);assert.equal(await page.getByText('$3,000–$12,000',{exact:true}).count(),1);assert.equal(await page.getByText('$1,500–$6,000',{exact:true}).count(),1);}
   await page.screenshot({path:`references/oveliq/about-redesign/${width}-${route}.png`,fullPage:true,animations:'disabled'});
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 console.log('PASS: About and USD ranges at 1440, 768, 375; images loaded, no overflow or browser errors.');
} finally {await browser.close();await server.close();}
