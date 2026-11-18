import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const stage = process.argv[2] || 'after';
const server = process.env.UI_REVIEW_URL ? null : await createServer({ server: { host: '127.0.0.1', port: 3100, watch: { ignored: ['**/references/**', '**/scripts/**', '**/*.md'] } } });
await server?.listen();
const base = process.env.UI_REVIEW_URL || server.resolvedUrls.local[0].replace(/\/$/, '');
const output = `references/oveliq/ui-refresh/${stage}`;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--disable-gpu'] });
const report = [];
try {
  for (const width of [1440, 1024, 768, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const routes = ['/', '/work', '/services', '/about', '/contact', '/work/everis', '/work/soliaris', '/work/energex', '/work/axeora', '/work/early-childhood-platform', '/work/aifa', '/work/investment-intelligence', '/work/cvmp', '/work/computer-vision', '/work/p2p-escrow', '/work/lending-platform', '/work/ecobe', '/work/education-operations', '/work/cira', '/work/crosswalk-intelligence', '/work/ecosort-ai', '/missing'];
    for (const route of routes) {
      console.log(`Review ${width} ${route}`);
      await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.locator('main').waitFor();
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach(image => image.loading = 'eager');
        await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
        await document.fonts.ready;
      });
      await page.waitForTimeout(150);
      const metrics = await page.evaluate(() => ({
        title: document.title,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')),
        h1: document.querySelectorAll('h1').length,
      }));
      const mediaLayout = await page.evaluate(() => {
        const hero = document.querySelector('.oveliq-project-hero');
        const firstScreen = document.querySelector('.project-screen');
        const titleOverlapsScreen = Boolean(hero && firstScreen && hero.getBoundingClientRect().bottom > firstScreen.getBoundingClientRect().top + 1);
        const relatedOverlap = [...document.querySelectorAll('.related-project')].some(card => card.querySelector('.related-project__media').getBoundingClientRect().bottom > card.querySelector('.related-project__copy').getBoundingClientRect().top + 1);
        const cardOverlap = [...document.querySelectorAll('.work-library__card')].some(card => card.querySelector('.work-library__media').getBoundingClientRect().bottom > card.querySelector('.work-library__type').getBoundingClientRect().top + 1);
        return { titleOverlapsScreen, relatedOverlap, cardOverlap };
      });
      assert.ok(Object.values(mediaLayout).every(value => !value), `${width} ${route}: media and text must not overlap`);
      report.push({ width, route, ...metrics, errors: [...errors] });
      errors.length = 0;
      if (route === '/' || route === '/contact' || (width === 1440 && ['/work', '/about', '/services', '/work/soliaris', '/work/everis', '/work/aifa'].includes(route))) {
        await page.screenshot({ path: `${output}/${width}-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}.png`, fullPage: true, animations: 'disabled', timeout: 60000 });
      }
    }
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.work-library__card').count(), 5);
    for (const empty of ['Platforms', 'AI & Research']) assert.equal(await page.getByRole('button', { name: new RegExp(`^${empty}`) }).count(), 0);
    for (const [category, count] of [['Websites', 5], ['All work', 5]]) {
      await page.getByRole('button', { name: new RegExp(`^${category}`) }).click();
      assert.equal(await page.locator('.work-library__card').count(), count);
      assert.equal(await page.getByRole('button', { name: new RegExp(`^${category}`) }).getAttribute('aria-pressed'), 'true');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    }
    const publicLinks = await page.locator('a[href^="/work/"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
    assert.ok(publicLinks.includes('/work/everis'));
    assert.ok(publicLinks.every(link => !/early-childhood-platform|aifa|investment-intelligence|cvmp|computer-vision|p2p-escrow|lending-platform|education-operations|crosswalk-intelligence|cira|ecosort-ai/.test(link)));
    await page.goto(`${base}/contact`, { waitUntil: 'networkidle' });
    assert.equal(await page.getByRole('button', { name: 'Continue', exact: true }).isDisabled(), true);
    await page.getByRole('radio', { name: /AI & automation/ }).check();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Your goal' }).fill('A useful product with clear milestones.');
    await page.getByRole('button', { name: '← Back', exact: true }).click();
    assert.equal(await page.getByRole('radio', { name: /AI & automation/ }).isChecked(), true);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    assert.equal(await page.getByRole('textbox', { name: 'Your goal' }).inputValue(), 'A useful product with clear milestones.');
    await page.getByRole('button', { name: 'Review message' }).click();
    await page.screenshot({ path: `${output}/${width}-contact-review.png`, fullPage: true, animations: 'disabled' });
    const whatsapp = page.getByRole('link', { name: 'Continue on WhatsApp' });
    if (await whatsapp.count()) {
      const link = new URL(await whatsapp.getAttribute('href'));
      assert.equal(link.origin, 'https://wa.me');
      assert.match(link.pathname, /^\/[1-9]\d{6,14}$/);
      assert.ok(link.searchParams.get('text').includes('AI & automation'));
      assert.ok(link.searchParams.get('text').includes('clear milestones'));
    } else {
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Save my brief' }).click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), 'oveliq-project-brief.txt');
      const brief = await readFile(await download.path(), 'utf8');
      assert.ok(brief.includes('AI & automation') && brief.includes('clear milestones'));
      await page.getByRole('status').filter({ hasText: 'Nothing has been sent' }).waitFor();
    }
    await page.goto(base, { waitUntil: 'networkidle' });
    const projectTabs = page.locator('.oveliq-work-showcase').getByRole('tab');
    assert.equal(await projectTabs.count(), 5);
    assert.deepEqual(await projectTabs.locator('.oveliq-work-showcase__tab-copy > span').allTextContents(), ['ECOBE', 'Soliaris Africa', 'Energex', 'Axeora', 'Everis']);
    await projectTabs.nth(2).click();
    assert.equal(await projectTabs.nth(2).getAttribute('aria-selected'), 'true');
    await projectTabs.first().click();
    assert.equal(await page.locator('.oveliq-process-grid li').count(), 6);
    assert.equal(await page.getByText(/Ethan Mercer|Liam Mercer/).count(), 0);
    const question = page.getByRole('button', { name: 'How much does a project cost?' });
    await question.click();
    assert.equal(await question.getAttribute('aria-expanded'), 'true');
    if (width < 1024) {
      await page.getByRole('button', { name: 'MENU', exact: true }).click();
      const dialog = page.getByRole('dialog', { name: 'Menu' });
      await dialog.waitFor();
      await dialog.getByRole('link', { name: 'Contact', exact: true }).focus();
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.activeElement?.closest('[role="dialog"]') !== null));
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('button', { name: 'MENU', exact: true }).getAttribute('aria-expanded'), 'false');
      assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), 'MENU');
      const accordion = page.locator('.oveliq-svc-accordion button').first();
      await accordion.click();
      await accordion.click();
      assert.equal(await accordion.getAttribute('aria-expanded'), 'true');
    } else if (width >= 1100) {
      const tab = page.getByRole('tab', { name: /Web Development/ });
      await tab.focus();
      await page.keyboard.press('ArrowDown');
      assert.equal(await page.getByRole('tab', { name: /Software Development/ }).getAttribute('aria-selected'), 'true');
    }
    console.log(`Interactions passed at ${width}px`);
    await page.close();
  }
  const animated = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  await animated.goto(base, { waitUntil: 'networkidle' });
  await animated.getByRole('link', { name: 'Explore our work', exact: true }).waitFor({ state: 'visible' });
  await animated.waitForTimeout(1800);
  await animated.screenshot({ path: `${output}/1440-hero-motion.png`, animations: 'disabled' });
  await animated.locator('#work').scrollIntoViewIfNeeded();
  assert.ok(await animated.locator('.oveliq-work-showcase__panel').isVisible());
  assert.equal(await animated.evaluate(() => document.documentElement.classList.contains('lenis')), false);
  await animated.close();
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  const failures = report.filter(item => item.overflow || item.brokenImages.length || item.errors.length || item.h1 !== 1);
  console.log(JSON.stringify({ pages: report.length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
  await server?.close();
}

