import { chromium } from "playwright";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const OUT = path.resolve("references/oveliq/services-fidelity-02");

async function scrollTheater(page) {
  await page.evaluate(() => {
    const t = document.querySelector(".oveliq-svc-theater");
    if (!t) return;
    window.scrollTo(
      0,
      window.scrollY + t.getBoundingClientRect().top - 72,
    );
  });
  await page.waitForTimeout(350);
}

async function measure(page) {
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
        text: (el.textContent || "").trim().slice(0, 100),
      };
    };
    const titleEl = document.querySelector(
      ".oveliq-svc-title__layer.is-active .oveliq-difference-title",
    );
    return {
      media: pick(document.querySelector(".oveliq-svc-theater__media")),
      stage: pick(document.querySelector(".oveliq-svc-theater__stage")),
      title: pick(document.querySelector(".oveliq-svc-theater__title")),
      titleText: pick(titleEl),
      lines: titleEl
        ? Array.from(titleEl.querySelectorAll("span")).map((s) => s.textContent)
        : [],
      active: pick(
        document.querySelector(".oveliq-svc-row--active .oveliq-svc-row__label"),
      ),
      desc: pick(document.querySelector(".oveliq-svc-theater__desc")),
      caps: pick(document.querySelector(".oveliq-svc-theater__caps")),
      index: pick(document.querySelector(".oveliq-svc-theater__index-num")),
      progress: pick(document.querySelector(".oveliq-svc-progress")),
      overflowX:
        document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // Spector Motion
  await page.goto("https://spector.framer.website/", {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.evaluate(() => {
    const motion = Array.from(document.querySelectorAll("a")).find((a) =>
      (a.textContent || "").includes("Motion & Interaction"),
    );
    motion?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(500);
  const motion = page
    .locator("a")
    .filter({ hasText: "Motion & Interaction" })
    .first();
  await motion.hover();
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    const light = Array.from(document.querySelectorAll("div")).find((d) => {
      const r = d.getBoundingClientRect();
      const cs = getComputedStyle(d);
      return (
        cs.backgroundColor === "rgb(249, 249, 249)" &&
        r.width > 700 &&
        r.height > 500
      );
    });
    if (light) {
      window.scrollTo(
        0,
        window.scrollY + light.getBoundingClientRect().top - 80,
      );
    }
  });
  await page.waitForTimeout(400);
  await motion.hover();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT, "spector-motion-interaction-1440.png"),
  });

  // Spector first
  const brand = page.locator("a").filter({ hasText: "Brand Identity" }).first();
  await brand.hover();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT, "spector-first-service-1440.png"),
  });

  // Oveliq
  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.evaluate(() =>
    document.querySelector("#services")?.scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(400);
  await scrollTheater(page);

  await page.getByRole("tab", { name: /AI & Machine Learning/i }).click();
  await page.waitForTimeout(800);
  await scrollTheater(page);
  await page.screenshot({ path: path.join(OUT, "oveliq-ai-after-1440.png") });
  const ai = await measure(page);

  await page.getByRole("tab", { name: /Web Development/i }).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "oveliq-web-after-1440.png") });
  const web = await measure(page);

  const titles = {};
  for (const name of [
    "Web Development",
    "Software Development",
    "Mobile Applications",
    "AI & Machine Learning",
    "Data & Analytics",
    "Automation & Integrations",
  ]) {
    await page.getByRole("tab", { name: new RegExp(name, "i") }).click();
    await page.waitForTimeout(500);
    const m = await measure(page);
    titles[name] = {
      lines: m.lines,
      fs: m.titleText?.fs,
      color: m.titleText?.color,
      blend: m.titleText?.blend,
      w: m.titleText?.w,
    };
  }

  const responsive = {};
  for (const vp of [
    { w: 375, h: 812, name: "375x812" },
    { w: 768, h: 1024, name: "768x1024" },
    { w: 1024, h: 768, name: "1024x768" },
    { w: 1280, h: 800, name: "1280x800" },
    { w: 1920, h: 1080, name: "1920x1080" },
  ]) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.evaluate(() =>
      document.querySelector("#services")?.scrollIntoView({ block: "start" }),
    );
    await page.waitForTimeout(500);
    if (vp.w >= 1100) {
      await scrollTheater(page);
      await page
        .getByRole("tab", { name: /AI & Machine Learning/i })
        .click()
        .catch(() => {});
      await page.waitForTimeout(400);
    } else {
      const btn = page.getByRole("button", { name: /AI & Machine Learning/i });
      if (await btn.count()) await btn.click();
      await page.waitForTimeout(400);
    }
    await page.screenshot({
      path: path.join(OUT, `oveliq-responsive-${vp.name}.png`),
    });
    responsive[vp.name] = await page.evaluate(() => ({
      overflowX:
        document.documentElement.scrollWidth > window.innerWidth + 1,
      theater: getComputedStyle(
        document.querySelector(".oveliq-svc-theater") || document.body,
      ).display,
      accordion: getComputedStyle(
        document.querySelector(".oveliq-svc-accordion") || document.body,
      ).display,
    }));
  }

  // Keep before capture if present
  if (!existsSync(path.join(OUT, "oveliq-ai-before-1440.png"))) {
    console.warn("missing before capture");
  }

  const report = { ai, web, titles, responsive };
  await writeFile(path.join(OUT, "MEASUREMENTS.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
