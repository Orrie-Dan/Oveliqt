import { mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright';
const server = await createServer({configFile:false,root:'D:/Ideas/ditto/ecobe',cacheDir:'D:/Ideas/Oveliq/node_modules/.vite-ecobe',plugins:[react()],server:{host:'127.0.0.1',port:3114,fs:{allow:['D:/Ideas/ditto/ecobe','D:/Ideas/Oveliq']}}});
await server.listen();
const browser = await chromium.launch({channel:'msedge',headless:true});
try {
  await mkdir('public/assets/work/ecobe',{recursive:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:') || route.request().url().startsWith('data:') ? route.continue() : route.abort());
  await page.goto(server.resolvedUrls.local[0],{waitUntil:'domcontentloaded',timeout:20000});
  await page.waitForTimeout(4000);
  await page.screenshot({path:'public/assets/work/ecobe/workshop.jpg',type:'jpeg',quality:90});
  for (const [name,y] of [['headline',1000],['editorial',2000]]) {
    await page.evaluate(y=>window.scrollTo(0,y),y);
    await page.waitForTimeout(700);
    await page.screenshot({path:`public/assets/work/ecobe/${name}.jpg`,type:'jpeg',quality:90});
  }
  console.log('Captured ECOBE local website previews');
} finally {await browser.close();await server.close();}
