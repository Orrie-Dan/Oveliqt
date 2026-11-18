import assert from 'node:assert/strict';
import { access, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { chromium } from 'playwright';
const server=await createServer({server:{host:'127.0.0.1',port:3112,watch:{ignored:['**/references/**','**/*.md','**/scripts/**']}}});
await server.listen();
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const {portfolioProjects}=await server.ssrLoadModule('/src/app/portfolio.ts');
 assert.equal(portfolioProjects.length,10);
 assert.equal(new Set(portfolioProjects.map(p=>p.slug)).size,portfolioProjects.length);
 assert.equal(portfolioProjects.filter(p=>p.featured).length,6);
 const sitemap=await readFile('dist/sitemap.xml','utf8');
 const llms=await readFile('public/llms.txt','utf8');
 for(const project of portfolioProjects){
  assert.ok(sitemap.includes(`/work/${project.slug}</loc>`));
  assert.ok(llms.includes(`/work/${project.slug} `));
  for(const media of [project.mediaSrc,...project.gallery.map(x=>x.src)])await access('public'+media);
 }
 for(const slug of ['aifa', 'investment-intelligence', 'cvmp', 'computer-vision', 'p2p-escrow', 'lending-platform', 'everis', 'ecosort-ai']){
  assert.ok(!sitemap.includes(slug)&&!llms.includes(slug));
  const page=await browser.newPage();
  await page.goto(`${server.resolvedUrls.local[0]}work/${slug}`,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>document.title.startsWith('Page not found'));
  assert.equal(await page.locator('.oveliq-project-hero').count(),0);
  await page.close();
 }
 for(const width of [1440,375]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(`${server.resolvedUrls.local[0]}about`,{waitUntil:'domcontentloaded',timeout:60000});
  await page.locator('.about-selected').scrollIntoViewIfNeeded();
  const content=await page.locator('main').innerText();
  assert.ok(content.includes('Education Operations Platform'));
  assert.ok(!/Caregivers|Early Childhood|national programme/.test(content));
  await page.screenshot({path:`references/oveliq/ui-refresh/portfolio/${width}-about.png`,fullPage:true,animations:'disabled'});
  await page.close();
 }
 console.log('PASS: ten public records and media, matching SEO discovery, six features, retired routes, and current About story.');
 await writeFile('references/oveliq/ui-refresh/portfolio/catalogue-check.json',JSON.stringify({projects:portfolioProjects.map(p=>p.slug),featured:portfolioProjects.filter(p=>p.featured).map(p=>p.slug),retiredRoutes:'not-found',aboutStory:'education-operations',passed:true},null,2));
}finally{await browser.close();await server.close();}
