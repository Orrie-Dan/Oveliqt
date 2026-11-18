import { chromium } from 'playwright';
import { mkdir,writeFile } from 'node:fs/promises';
const output='references/oveliq/portfolio-audit';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const sites=[['energex','https://www.energexglobalsolution.com/en'],['soliaris','https://soliaris.vercel.app/'],['everis','https://www.everisholding.com/'],['axeora','https://www.axeora.ai/']];
const results=await Promise.all(sites.map(async([name,url])=>{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 try{
  const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForTimeout(2500);
  const info=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>e.innerText),text:document.body.innerText.slice(0,17000),links:[...document.querySelectorAll('a')].map(a=>({label:a.innerText,url:a.href})).filter(a=>a.label.trim()).slice(0,65)}));
  await writeFile(`${output}/${name}.json`,JSON.stringify({url,status:response?.status(),...info},null,2));
  await page.screenshot({path:`${output}/${name}-desktop.png`,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:`${output}/${name}-mobile.png`,animations:'disabled'});
  return {name,url,status:response?.status(),title:info.title,description:info.description,headings:info.headings,text:info.text.slice(0,6500)};
 }catch(e){return {name,url,error:e.message}}finally{await page.close()}
}));
console.log(JSON.stringify(results,null,2));
await browser.close();
