/**
 * Capture Spector + Oveliq Services theater at 1440×900 for fidelity-02.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("references/oveliq/services-fidelity-02");
const VIEW = { width: 1440, height: 900 };

async function measureTheater(page, label) {
  return page.evaluate((labelInner) => {
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
        lh: cs.lineHeight,
        color: cs.color,
        bg: cs.backgroundColor,
        blend: cs.mixBlendMode,
        text: (el.textContent || "").trim().slice(0, 100),
      };
    };

    if (labelInner === "spector") {
      const title = Array.from(document.querySelectorAll("p")).find(
        (p) =>
          parseFloat(getComputedStyle(p).fontSize) >= 90 &&
          /Motion|Brand|Product|Web|Development|Content/i.test(
            (p.textContent || "").trim(),
          ),
      );
      const light = Array.from(document.querySelectorAll("div")).find((d) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        return (
          cs.backgroundColor === "rgb(249, 249, 249)" &&
          r.width > 700 &&
          r.height > 500 &&
          r.top > 40 &&
          r.top < 400
        );
      });
      const media = light
        ? Array.from(light.querySelectorAll("div")).find((d) => {
            const cs = getComputedStyle(d);
            const r = d.getBoundingClientRect();
            return (
              cs.backgroundImage.includes("framerusercontent") &&
              r.width > 400 &&
              r.height > 400
            );
          })
        : null;
      const list = Array.from(document.querySelectorAll("a")).filter((a) =>
        /Brand Identity|Motion & Interaction|Product Design/.test(
          a.textContent || "",
        ),
      );
      const idx = Array.from(document.querySelectorAll("div,p,span")).find(
        (el) =>
          /^\.\d{2}$/.test((el.textContent || "").trim()) &&
          parseFloat(getComputedStyle(el).fontSize) >= 40,
      );
      const bar = Array.from(document.querySelectorAll("div")).find((d) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        return (
          r.height > 0 &&
          r.height <= 4 &&
          r.width >= 120 &&
          r.width <= 280 &&
          r.bottom > 600 &&
          (cs.backgroundColor.includes("255") ||
            cs.backgroundColor.includes("0, 0, 0") ||
            d.children.length > 0)
        );
      });
      const caps = light
        ? Array.from(light.querySelectorAll("p")).find(
            (p) =>
              parseFloat(getComputedStyle(p).fontSize) >= 16 &&
              (p.textContent || "").length > 20 &&
              (p.textContent || "").length < 200 &&
              p.getBoundingClientRect().x > 1000,
          )
        : null;
      const desc = Array.from(document.querySelectorAll("p")).find((p) => {
        const r = p.getBoundingClientRect();
        const t = (p.textContent || "").trim();
        return (
          t.length > 50 &&
          t.length < 220 &&
          r.x < 350 &&
          r.y > 650 &&
          parseFloat(getComputedStyle(p).fontSize) <= 14
        );
      });
      return {
        title: pick(title),
        titleSpans: title
          ? Array.from(title.querySelectorAll("span")).map(pick)
          : [],
        light: pick(light),
        media: pick(media),
        list: list.slice(0, 6).map(pick),
        index: pick(idx),
        progress: pick(bar),
        caps: pick(caps),
        desc: pick(desc),
      };
    }

    // Oveliq
    const theater = document.querySelector(".oveliq-svc-theater");
    return {
      theater: pick(theater),
      media: pick(document.querySelector(".oveliq-svc-theater__media")),
      title: pick(document.querySelector(".oveliq-svc-theater__title")),
      titleText: pick(
        document.querySelector(".oveliq-svc-theater__title .oveliq-difference-title"),
      ),
      list: Array.from(document.querySelectorAll(".oveliq-svc-row")).map(pick),
      desc: pick(document.querySelector(".oveliq-svc-theater__desc")),
      caps: pick(document.querySelector(".oveliq-svc-theater__caps")),
      index: pick(document.querySelector(".oveliq-svc-theater__index-num")),
      progress: pick(document.querySelector(".oveliq-svc-progress")),
      side: pick(document.querySelector(".oveliq-svc-theater__side")),
    };
  }, label);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEW,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // —— Spector Motion & Interaction ——
  await page.goto("https://spector.framer.website/", {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("a,p,div")).find((n) =>
      /^Services$/i.test((n.textContent || "").trim()),
    );
    el?.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(800);
  // Scroll theater into comfortable view
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
  // Nudge scroll so theater fills viewport (nav + theater)
  const theaterTop = await page.evaluate(() => {
    const light = Array.from(document.querySelectorAll("div")).find((d) => {
      const r = d.getBoundingClientRect();
      const cs = getComputedStyle(d);
      return (
        cs.backgroundColor === "rgb(249, 249, 249)" &&
        r.width > 700 &&
        r.height > 500
      );
    });
    if (!light) return null;
    const y = window.scrollY + light.getBoundingClientRect().top - 80;
    window.scrollTo(0, y);
    return y;
  });
  await page.waitForTimeout(400);
  await motion.hover();
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(OUT, "spector-motion-interaction-1440.png"),
  });
  const spectorMotion = await measureTheater(page, "spector");
  console.log("SPECTOR_MOTION", JSON.stringify(spectorMotion, null, 2));
  console.log("theaterTop", theaterTop);

  // Spector first service
  const brand = page.locator("a").filter({ hasText: "Brand Identity" }).first();
  await brand.hover();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT, "spector-first-service-1440.png"),
  });
  const spectorFirst = await measureTheater(page, "spector");
  console.log("SPECTOR_FIRST", JSON.stringify(spectorFirst, null, 2));

  // —— Oveliq ——
  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  // Confirm it's Oveliq
  const title = await page.title();
  console.log("LOCAL_TITLE", title);
  await page.evaluate(() => {
    document.querySelector("#services")?.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(600);
  // Scroll theater into view
  await page.evaluate(() => {
    const t = document.querySelector(".oveliq-svc-theater");
    if (!t) return;
    const y = window.scrollY + t.getBoundingClientRect().top - 72;
    window.scrollTo(0, y);
  });
  await page.waitForTimeout(400);

  // Before AI capture (may already be web) — select AI
  const ai = page.getByRole("tab", { name: /AI & Machine Learning/i });
  if (await ai.count()) {
    await ai.hover();
    await page.waitForTimeout(500);
  }
  await page.screenshot({
    path: path.join(OUT, "oveliq-ai-before-1440.png"),
  });
  const oveliqAi = await measureTheater(page, "oveliq");
  console.log("OVELIQ_AI", JSON.stringify(oveliqAi, null, 2));

  const web = page.getByRole("tab", { name: /Web Development/i });
  if (await web.count()) {
    await web.hover();
    await page.waitForTimeout(500);
  }
  await page.screenshot({
    path: path.join(OUT, "oveliq-web-before-1440.png"),
  });

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
