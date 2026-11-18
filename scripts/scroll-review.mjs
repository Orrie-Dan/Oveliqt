import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const stage = process.argv[2] || 'after';
const output = `references/oveliq/work-scroll/${stage}`;
await mkdir(output, { recursive: true });
const server = await createServer({ server: { host: '127.0.0.1', port: 3110, watch: { ignored: ['**/references/**', '**/scripts/**', '**/*.md'] } } });
await server.listen();
const base = server.resolvedUrls.local[0];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  for (const width of [1440, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1700);
    if (stage === 'after') await page.evaluate(() => {
      const request = window.requestAnimationFrame.bind(window);
      window.idleAnimationRequests = 0;
      window.requestAnimationFrame = callback => {
        window.idleAnimationRequests++;
        return request(callback);
      };
    });
    await page.mouse.move(width / 2, 400);
    await page.waitForTimeout(1200);
    if (stage === 'after') {
      await page.evaluate(() => { window.idleAnimationRequests = 0; });
      await page.waitForTimeout(250);
      assert.equal(await page.evaluate(() => window.idleAnimationRequests), 0, 'Hero should stop requesting animation frames while pointer is still');
    }
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.scrollSamples = [];
      window.scrollProbeDone = new Promise(resolve => {
        window.addEventListener('wheel', event => {
          const start = performance.now();
          queueMicrotask(() => { window.wheelPrevented = event.defaultPrevented; });
          function sample() {
            const elapsed = performance.now() - start;
            window.scrollSamples.push({ t: Math.round(elapsed), y: Math.round(scrollY) });
            if (elapsed < 1300) requestAnimationFrame(sample);
            else resolve();
          }
          requestAnimationFrame(sample);
        }, { once: true, passive: true });
      });
    });
    await page.mouse.wheel(0, 800);
    await page.evaluate(() => window.scrollProbeDone);
    const measurement = await page.evaluate(() => {
      const samples = window.scrollSamples;
      const final = samples.at(-1).y;
      const firstMove = samples.find(s => s.y > 5)?.t;
      const settled = samples.find((s, i) => Math.abs(s.y - final) < 3 && samples.slice(i).every(v => Math.abs(v.y - final) < 3))?.t;
      return { final, firstMove, settled, wheelPrevented: window.wheelPrevented, native: !document.documentElement.classList.contains('lenis'), height: document.documentElement.scrollHeight, samples };
    });
    results.push({ width, ...measurement });
    if (stage === 'after') {
      assert.equal(measurement.native, true);
      assert.ok(measurement.final >= 790 && measurement.final <= 810, `Wheel distance at ${width}: ${measurement.final}`);
      assert.equal(measurement.wheelPrevented, false);
    }
    await page.locator('#work').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    if (stage === 'after') {
      const showcase = page.locator('.oveliq-work-showcase');
      const tabs = showcase.getByRole('tab');
      assert.equal(await tabs.count(), 6);
      for (let index = 0; index < 6; index++) {
        await tabs.nth(index).click();
        assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true');
        const image = showcase.locator('.oveliq-work-showcase__image');
        await image.evaluate(img => img.decode());
        assert.ok(await image.evaluate(img => img.naturalWidth > 0));
        assert.ok(await showcase.getByRole('link', { name: /View case study/ }).getAttribute('href'));
      }
      await tabs.first().click();
      await tabs.first().focus();
      await page.keyboard.press('ArrowDown');
      assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true');
      await page.keyboard.press('Home');
      assert.equal(await tabs.first().getAttribute('aria-selected'), 'true');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    }
    await page.evaluate(() => document.activeElement?.blur());
    await page.locator('#work').screenshot({ path: `${output}/${width}-work.png`, animations: 'disabled' });
    await page.close();
  }
  await writeFile(`${output}/scroll.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results.map(({ samples, ...result }) => result), null, 2));
} finally {
  await browser.close();
  await server.close();
}
