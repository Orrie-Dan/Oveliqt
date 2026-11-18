import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const server=await createServer({server:{host:'127.0.0.1',port:3115,watch:{ignored:['**/references/**','**/*.md','**/scripts/**']}}});await server.listen();
const browser=await chromium.launch({channel:'msedge',headless:true});
const output='references/oveliq/media-layout-revision';await mkdir(output,{recursive:true});const report=[];
try{
 for(const width of [1440,1024,768,375]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  for(const slug of ['energex','everis']){
   await page.goto(`${server.resolvedUrls.local[0]}work/${slug}`,{waitUntil:'domcontentloaded'});
   await page.locator('.project-screen img').first().waitFor();
   await page.evaluate(async()=>{document.querySelectorAll('.project-screen img').forEach(img=>img.loading='eager');await document.fonts.ready;await Promise.all([...document.querySelectorAll('.project-screen img')].map(img=>img.decode()))});
   const result=await page.evaluate(()=>{
    const hero=document.querySelector('.oveliq-project-hero').getBoundingClientRect();
    const media=document.querySelector('.project-screen').getBoundingClientRect();
    return {overlap:hero.bottom>media.top+1,overflow:document.documentElement.scrollWidth>innerWidth+1,images:[...document.querySelectorAll('.project-screen img')].map(img=>({decoded:img.naturalWidth>0,fit:getComputedStyle(img).objectFit,transform:getComputedStyle(img).transform})),text:document.querySelector('main').innerText};
   });
   assert.equal(result.overlap,false);assert.equal(result.overflow,false);
   assert.ok(result.images.every(img=>img.decoded&&img.fit==='contain'&&img.transform==='none'));
   await page.screenshot({path:`${output}/${width}-${slug}.png`,animations:'disabled'});
   if(width===1440&&slug==='energex')await page.screenshot({path:`${output}/${width}-${slug}-full.png`,fullPage:true,animations:'disabled'});
   report.push({width,slug,passed:true});
  }
  await page.close();console.log(`Non-overlapping media passed at ${width}px`);
 }
 await writeFile(`${output}/report.json`,JSON.stringify(report,null,2));
}finally{await browser.close();await server.close()}
