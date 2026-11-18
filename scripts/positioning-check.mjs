import assert from 'node:assert/strict';
import { mkdir, access, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { chromium } from 'playwright';
const server = await createServer({server:{host:'127.0.0.1',port:3116,watch:{ignored:['**/scripts/**','**/references/**','**/dist/**']}}});
await server.listen();
const browser = await chromium.launch({channel:'msedge',headless:true});
try {
  const {portfolioProjects} = await server.ssrLoadModule('/src/app/portfolio.ts');
  const expected = ['ecobe','soliaris','energex','crosswalk-intelligence','axeora','education-operations'];
  assert.deepEqual(portfolioProjects.filter(p=>p.featured).map(p=>p.slug),expected);
  for (const p of portfolioProjects) for (const src of [p.mediaSrc,...p.gallery.map(g=>g.src)]) await access('public'+src);
  await mkdir('references/oveliq/positioning',{recursive:true});
  const report=[];
  for (const width of [1440,768,375]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:') || r.request().url().startsWith('data:') ? r.continue():r.abort());
    for (const path of ['/','/work','/pricing','/contact','/work/ecobe','/work/education-operations']) {
      await page.goto(server.resolvedUrls.local[0].replace(/\/$/,'')+path,{waitUntil:'domcontentloaded'});
      await page.locator('h1').waitFor();
      await page.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));
      await page.waitForFunction(()=>[...document.images].every(i=>i.complete && i.naturalWidth > 0),{},{timeout:20000});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${width} ${path}: overflow`);
      if(path==='/') {
        await page.locator('[role="tab"]').first().waitFor({state:'attached'});
        assert.deepEqual(await page.locator('[role="tab"] .oveliq-work-showcase__tab-copy > span').allTextContents(),portfolioProjects.filter(p=>p.featured).map(p=>p.title));
      }
      if(path==='/work') assert.equal(await page.locator('.work-library__card').count(),7);
      if(path==='/contact') assert.equal(await page.getByRole('link',{name:'Message us directly on WhatsApp'}).count(),1);
      const broken=await page.locator('img').evaluateAll(images=>images.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));
      assert.deepEqual(broken,[],`${width} ${path}: images`);
      await page.screenshot({path:`references/oveliq/positioning/${width}-${path==='/'?'home':path.slice(1).replaceAll('/','-')}.png`,fullPage:true,animations:'disabled',timeout:20000});
      report.push({width,path,passed:true});
    }
    assert.deepEqual(errors,[]);
    await page.close();
  }
  await writeFile('references/oveliq/positioning/report.json',JSON.stringify(report,null,2));
  console.log('PASS: featured order, all media, seven library projects, direct contact, responsive routes and no browser errors.');
} finally {await browser.close();await server.close();}
