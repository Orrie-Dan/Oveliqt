// Renders the favicon and Apple touch icon from public/brand/oveliqt-icon.svg.
// Usage: node scripts/create-brand-icons.mjs
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const icon = await readFile(path.join(root, 'public/brand/oveliqt-icon.svg'), 'utf8');
// iOS rounds touch icons itself, so the Apple version is a full-bleed square.
const square = icon.replace(/<rect width="512" height="512" rx="[\d.]+"/, '<rect width="512" height="512"');

const targets = [
  { file: 'public/icon.png', size: 64, svg: icon },
  { file: 'public/apple-icon.png', size: 180, svg: square },
];

const browser = await chromium.launch({ channel: 'chrome' })
  .catch(() => chromium.launch({ channel: 'msedge' }))
  .catch(() => chromium.launch());
for (const { file, size, svg } of targets) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<!doctype html><style>*{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  await page.screenshot({ path: path.join(root, file), omitBackground: true });
  await page.close();
  console.log(`wrote ${file} (${size}×${size})`);
}
await browser.close();
