// Renders public/og-image.jpg (1200×630 social share card) from the hero art.
// Usage: node scripts/create-og-image.mjs
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const asDataUrl = async (file, type) =>
  `data:${type};base64,${(await readFile(path.join(root, 'public', file))).toString('base64')}`;

const hero = await asDataUrl('assets/hero/crimson-vortex.webp', 'image/webp');
const logo = await asDataUrl('brand/oveliqt-logo-reversed.svg', 'image/svg+xml');
const fontFile = /\/assets\/cloned\/fonts\/[\w]+\.woff2/.exec(
  (await readFile(path.join(root, 'src/app/globals.css'), 'utf8')).split('font-weight: 600')[1],
)[0];
const font = await asDataUrl(fontFile.slice(1), 'font/woff2');

const html = `<!doctype html><html><head><style>
@font-face { font-family: Figtree; font-weight: 600; src: url(${font}) format("woff2"); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; font-family: Figtree, sans-serif; color: #fff; background: #0b0b0b; overflow: hidden; }
.card { position: relative; width: 100%; height: 100%; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between;
  background: linear-gradient(90deg, rgba(8,8,8,.92) 0%, rgba(8,8,8,.7) 45%, rgba(8,8,8,.15) 100%), url(${hero}) center / cover; }
.top { display: flex; justify-content: space-between; font-size: 22px; letter-spacing: .14em; font-weight: 600; }
.top span:last-child { color: rgba(255,255,255,.7); }
.top { align-items: center; }
.logo { height: 34px; }
h1 { font-size: 104px; line-height: .9; letter-spacing: -.02em; font-weight: 600; text-transform: uppercase; }
h1 em { font-style: normal; color: rgb(249, 65, 55); }
.foot { font-size: 26px; color: rgba(255,255,255,.82); max-width: 640px; line-height: 1.35; }
</style></head><body><div class="card">
<div class="top"><img class="logo" src="${logo}" alt="Oveliqt"><span>WEB · SOFTWARE · AI · DATA</span></div>
<h1>We build<br>software<br><em>that moves.</em></h1>
<p class="foot">Websites, custom platforms and practical AI for businesses ready to improve how they work.</p>
</div></body></html>`;

// Prefer an installed Chrome/Edge; fall back to Playwright's bundled browser.
const browser = await chromium.launch({ channel: 'chrome' })
  .catch(() => chromium.launch({ channel: 'msedge' }))
  .catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'public/og-image.jpg'), type: 'jpeg', quality: 86 });
await browser.close();
console.log('wrote public/og-image.jpg');
