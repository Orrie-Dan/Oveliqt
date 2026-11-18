/**
 * Capture after-state + measure Oveliq theater vs Spector targets @1440×900.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("references/oveliq/services-fidelity-02");
const VIEW = { width: 1440, height: 900 };

const SPECTOR_TARGET = {
  mediaX: 488,
  mediaW: 644,
  lightW: 952,
  lightH: 653,
  titleX: 316,
  titleFs: 120,
  capsX: 1148,
  indexFs: 80,
  progressW: 200,
  descW: 300,
};

async function measureOveliq(page) {
  return page.evaluate(() => {
    const pick = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        fs: cs.fontSize,
        color: cs.color,
        bg: cs.backgroundColor,
        blend: cs.mixBlendMode,
        text: (el.textContent || "").trim().slice(0, 120),
      };
    };
    const titleEl = document.querySelector(
      ".oveliq-svc-title__layer.is-active .oveliq-difference-title",
    );
    const lines = titleEl
      ? Array.from(titleEl.querySelectorAll("span")).map((s) => s.textContent)
      : [];
    return {
      theater: pick(document.querySelector(".oveliq-svc-theater")),
      media: pick(document.querySelector(".oveliq-svc-theater__media")),
      stage: pick(document.querySelector(".oveliq-svc-theater__stage")),
      title: pick(document.querySelector(".oveliq-svc-theater__title")),
      titleText: pick(titleEl),
      titleLines: lines,
      list: pick(document.querySelector(".oveliq-svc-theater__list")),
      active: pick(document.querySelector(".oveliq-svc-row--active .oveliq-svc-row__label")),
      desc: pick(document.querySelector(".oveliq-svc-theater__desc")),
      caps: pick(document.querySelector(".oveliq-svc-theater__caps")),
      index: pick(document.querySelector(".oveliq-svc-theater__index-num")),
      progress: pick(document.querySelector(".oveliq-svc-progress")),
      visualBg: pick(document.querySelector(".oveliq-service-visual")),
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });
}

async function scrollTheater(page) {
  await page.evaluate(() => {
    const t = document.querySelector(".oveliq-svc-theater");
    if (!t) return;
    const y = window.scrollY + t.getBoundingClientRect().top - 72;
    window.scrollTo(0, Math.max(0, y));
  });
  await page.waitForTimeout(350);
}

async function selectService(page, name) {
  const tab = page.getByRole("tab", { name: new RegExp(name, "i") });
  await tab.click();
  await page.waitForTimeout(650);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEW,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.evaluate(() =>
    document.querySelector("#services")?.scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(400);
  await scrollTheater(page);

  // AI after
  await selectService(page, "AI & Machine Learning");
  await scrollTheater(page);
  await page.screenshot({ path: path.join(OUT, "oveliq-ai-after-1440.png") });
  const ai = await measureOveliq(page);

  // Web after
  await selectService(page, "Web Development");
  await scrollTheater(page);
  await page.screenshot({ path: path.join(OUT, "oveliq-web-after-1440.png") });
  const web = await measureOveliq(page);

  // All six title line checks
  const names = [
    "Web Development",
    "Software Development",
    "Mobile Applications",
    "AI & Machine Learning",
    "Data & Analytics",
    "Automation & Integrations",
  ];
  const titles = {};
  for (const name of names) {
    await selectService(page, name);
    const m = await measureOveliq(page);
    titles[name] = {
      lines: m.titleLines,
      lineCount: m.titleLines.length,
      title: m.titleText,
      overflowX: m.overflowX,
    };
  }

  // Responsive
  const responsive = {};
  for (const vp of [
    { w: 375, h: 812, name: "375x812" },
    { w: 768, h: 1024, name: "768x1024" },
    { w: 1024, h: 768, name: "1024x768" },
    { w: 1280, h: 800, name: "1280x800" },
    { w: 1920, h: 1080, name: "1920x1080" },
  ]) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto("http://localhost:3000/#services", {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(500);
    await page.evaluate(() =>
      document.querySelector("#services")?.scrollIntoView({ block: "start" }),
    );
    await page.waitForTimeout(400);
    if (vp.w >= 1100) {
      await scrollTheater(page);
      const tab = page.getByRole("tab", { name: /AI & Machine Learning/i });
      if (await tab.count()) await tab.hover();
      await page.waitForTimeout(400);
    }
    await page.screenshot({
      path: path.join(OUT, `oveliq-responsive-${vp.name}.png`),
    });
    responsive[vp.name] = await page.evaluate(() => ({
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      theaterDisplay: getComputedStyle(
        document.querySelector(".oveliq-svc-theater") || document.body,
      ).display,
      accordionDisplay: getComputedStyle(
        document.querySelector(".oveliq-svc-accordion") || document.body,
      ).display,
    }));
  }

  const delta = (a, b) => (a == null || b == null ? null : a - b);
  const report = {
    spectorTarget: SPECTOR_TARGET,
    oveliqAiAfter: ai,
    oveliqWebAfter: web,
    deltasVsSpectorAi: {
      mediaX: delta(ai.media?.x, SPECTOR_TARGET.mediaX),
      mediaH: delta(ai.media?.h, SPECTOR_TARGET.lightH),
      stageW: delta(ai.stage?.w, SPECTOR_TARGET.lightW),
      titleX: delta(ai.title?.x, SPECTOR_TARGET.titleX),
      capsX: delta(ai.caps?.x, SPECTOR_TARGET.capsX),
      progressW: delta(ai.progress?.w, SPECTOR_TARGET.progressW),
      descW: delta(ai.desc?.w, SPECTOR_TARGET.descW),
    },
    titles,
    responsive,
  };

  await writeFile(
    path.join(OUT, "MEASUREMENTS.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
