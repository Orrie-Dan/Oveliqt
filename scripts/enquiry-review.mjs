import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const server = await createServer({ server: { host: '127.0.0.1', port: 3101, watch: { ignored: ['**/references/**'] } } });
await server.listen();
const base = server.resolvedUrls.local[0];
const output = 'references/oveliq/enquiry-refinement';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const report = [];
try {
  for (const width of [1440, 1024, 768, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}contact`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${output}/${width}-services.png`, fullPage: true });
    for (const [service, idea] of [
      ['A website', 'Get more enquiries'],
      ['An app or platform', 'Bring an idea to life'],
      ['AI & automation', 'Reduce repetitive work'],
      ['Something else', 'Solve a business problem'],
    ]) {
      await page.getByRole('radio', { name: service, exact: false }).check();
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      const input = page.getByRole('textbox', { name: /Your goal/ });
      assert.equal(await page.locator('.enquiry__starter').count(), 3);
      assert.equal(await page.locator('.enquiry__panel h2').evaluate(el => el === document.activeElement), true);
      await input.fill('');
      const starter = page.getByRole('button', { name: new RegExp(idea) });
      await starter.click();
      const sentence = await input.inputValue();
      assert.ok(sentence.length > 30);
      assert.equal(await starter.isDisabled(), true);
      assert.equal(await input.evaluate(el => el === document.activeElement), true);
      await input.fill('We serve local businesses.');
      await starter.click();
      assert.equal(await input.inputValue(), `We serve local businesses.\n\n${sentence}`);
      await page.locator('.enquiry__starter').nth(1).click();
      assert.ok((await input.inputValue()).startsWith(`We serve local businesses.\n\n${sentence}\n\n`));
      if (service === 'A website') {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: `${output}/${width}-goals.png`, fullPage: true });
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow, false);
      await input.fill('x'.repeat(1500));
      assert.equal(await page.locator('.enquiry__starter:disabled').count(), 3);
      await input.fill('   ');
      await page.getByRole('button', { name: 'Review message' }).click();
      assert.equal(await input.count(), 1);
      await page.getByRole('status').filter({ hasText: 'A sentence or two' }).waitFor();
      await input.fill(sentence);
      await page.getByRole('button', { name: 'Review message' }).click();
      assert.ok((await page.locator('.enquiry__message-goal').innerText()).includes(sentence));
      const whatsapp = page.getByRole('link', { name: 'Continue on WhatsApp' });
      if (await whatsapp.count()) {
        const link = new URL(await whatsapp.getAttribute('href'));
        assert.equal(link.origin, 'https://wa.me');
        assert.match(link.pathname, /^\/[1-9]\d{6,14}$/);
        assert.ok(link.searchParams.get('text').includes(service));
        assert.ok(link.searchParams.get('text').includes(sentence));
        assert.equal(await whatsapp.getAttribute('target'), '_blank');
        assert.equal(await page.getByRole('button', { name: 'Save my brief' }).count(), 0);
      } else {
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button', { name: 'Save my brief' }).click();
        const download = await downloadPromise;
        const brief = await readFile(await download.path(), 'utf8');
        assert.ok(brief.includes(service) && brief.includes(sentence));
      }
      await page.getByRole('button', { name: /Edit answers/ }).click();
      assert.equal(await input.inputValue(), sentence);
      await page.getByRole('button', { name: /Change/, exact: true }).click();
      assert.equal(await page.getByRole('radio', { name: service, exact: false }).isChecked(), true);
    }
    assert.deepEqual(errors, []);
    report.push({ width, services: 4, errors, passed: true });
    console.log(`Passed all four services, starter editing, limits, navigation and handoff at ${width}px`);
    await page.close();
  }
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
} finally {
  await browser.close();
  await server.close();
}

