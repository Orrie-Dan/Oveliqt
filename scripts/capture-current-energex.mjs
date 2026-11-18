import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const response=await page.goto('http://127.0.0.1:3130/en',{waitUntil:'domcontentloaded',timeout:120000});
 await page.locator('h1').waitFor({timeout:120000});
 await page.evaluate(async()=>{await document.fonts.ready;for(const v of document.querySelectorAll('video')){v.muted=true;await v.play().catch(()=>{});}});
 await page.waitForTimeout(1800);
 await page.addStyleTag({content:'nextjs-portal { display:none !important; }'});
 await page.screenshot({path:'public/assets/work/energex/preview.jpg',type:'jpeg',quality:90,animations:'disabled'});
 await page.evaluate(()=>window.scrollTo({top:1050,behavior:'instant'}));
 await page.waitForTimeout(900);
 await page.screenshot({path:'public/assets/work/energex/detail.jpg',type:'jpeg',quality:90,animations:'disabled'});
 const meta=await page.evaluate(()=>({title:document.title,heading:document.querySelector('h1')?.innerText,videos:[...document.querySelectorAll('video')].map(v=>({src:v.getAttribute('src'),ready:v.readyState})),text:document.body.innerText.slice(0,2000)}));
 await writeFile('references/oveliq/portfolio-audit/energex-current-source.json',JSON.stringify({source:'Isolated current-source development preview; not a production capture',status:response.status(),...meta},null,2));
 console.log(JSON.stringify({status:response.status(),...meta}));
}finally{await browser.close()}
