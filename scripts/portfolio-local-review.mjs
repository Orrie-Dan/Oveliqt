import { chromium } from 'playwright';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
const output='references/oveliq/portfolio-audit';
await mkdir(output,{recursive:true});
const sites=[['everis','D:/Side Projects/Everis/dist','/'],['soliaris','D:/Side Projects/Soliaris/dist','/'],['axeora','D:/Ideas/ditto/axeora/dist','/']];
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.mp4':'video/mp4','.json':'application/json'};
const servers=[];
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const results=await Promise.all(sites.map(async([name,root,route],i)=>{
  const server=createServer(async(req,res)=>{
   try{
    let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if(file!==path.resolve(root)&&!file.startsWith(path.resolve(root)+path.sep)){res.writeHead(403);res.end();return;}
    try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');await stat(file)}catch{file=path.join(root,'index.html')}
    res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(await readFile(file));
   }catch{res.writeHead(404);res.end()}
  });
  await new Promise(r=>server.listen(3120+i,'127.0.0.1',r));servers.push(server);
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.goto(`http://127.0.0.1:${3120+i}${route}`,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(3000);
  await page.evaluate(()=>document.fonts.ready);
  const info=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,headings:[...document.querySelectorAll('h1,h2,h3')].map(x=>x.innerText),text:document.body.innerText.slice(0,16000)}));
  await page.screenshot({path:`${output}/${name}-local-desktop.png`,animations:'disabled'});
  const media=`public/assets/work/${name}`;
  await mkdir(media,{recursive:true});
  await page.screenshot({path:`${media}/preview.jpg`,type:'jpeg',quality:88,animations:'disabled'});
  await page.evaluate(()=>window.scrollTo({top:900,behavior:'instant'}));
  await page.waitForTimeout(900);
  await page.screenshot({path:`${media}/detail.jpg`,type:'jpeg',quality:88,animations:'disabled'});
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:`${output}/${name}-local-mobile.png`,animations:'disabled'});
  await page.close();
  await writeFile(`${output}/${name}-local.json`,JSON.stringify({source:root,buildDate:(await stat(path.join(root,'index.html'))).mtime,...info},null,2));
  return {name,source:root,buildDate:(await stat(path.join(root,'index.html'))).mtime,...info,text:info.text.slice(0,4500)};
 }));
 console.log(JSON.stringify(results,null,2));
}finally{await browser.close();for(const server of servers)await new Promise(r=>server.close(r))}
