/**
 * Reliable Spector Services motion capture using real Playwright hover + CDP samples.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("references/oveliq/services-motion");

async function alignTheater(page) {
  await page.evaluate(() => {
    const motion = Array.from(document.querySelectorAll("a")).find((a) =>
      (a.textContent || "").includes("Brand Identity"),
    );
    motion?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(400);
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
  await page.waitForTimeout(300);
}

function link(page, text) {
  return page.locator("a").filter({ hasText: text }).first();
}

async function snapshot(page) {
  return page.evaluate(() => {
    const pack = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        text: (el.textContent || "").trim().slice(0, 50),
        opacity: Number(cs.opacity),
        transform: cs.transform,
        filter: cs.filter,
        blend: cs.mixBlendMode,
        overflow: cs.overflow,
        transition: cs.transition.slice(0, 180),
        willChange: cs.willChange,
        color: cs.color,
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        bg: cs.backgroundImage.includes("url(")
          ? (cs.backgroundImage.match(/images\/([^/?]+)/) || [])[1] || "img"
          : "",
      };
    };

    const titleWrap = Array.from(document.querySelectorAll("div")).find((d) => {
      const cs = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return (
        cs.mixBlendMode === "difference" &&
        r.width > 280 &&
        r.height > 120 &&
        r.top > 40 &&
        r.top < 750
      );
    });
    const titleP = titleWrap?.querySelector("p");
    const titleSpans = titleP
      ? Array.from(titleP.querySelectorAll(":scope > span")).map(pack)
      : [];

    // letter-level transforms if present
    const letters = titleP
      ? Array.from(titleP.querySelectorAll("span span")).slice(0, 8).map(pack)
      : [];

    const light = Array.from(document.querySelectorAll("div")).find((d) => {
      const r = d.getBoundingClientRect();
      const cs = getComputedStyle(d);
      return (
        cs.backgroundColor === "rgb(249, 249, 249)" &&
        r.width > 700 &&
        r.height > 500 &&
        r.top > 40 &&
        r.top < 450
      );
    });

    const mediaCandidates = light
      ? Array.from(light.querySelectorAll("div,img"))
          .map(pack)
          .filter(
            (p) =>
              p &&
              p.w > 350 &&
              p.h > 350 &&
              (p.bg || p.opacity < 1 || p.transform !== "none"),
          )
          .slice(0, 10)
      : [];

    // All absolute layers inside media column with background images
    const allMediaLayers = light
      ? Array.from(light.querySelectorAll("*"))
          .filter((el) => {
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return (
              r.width > 400 &&
              r.height > 400 &&
              (cs.backgroundImage.includes("url(") || el.tagName === "IMG")
            );
          })
          .map(pack)
      : [];

    const idx = Array.from(document.querySelectorAll("div,p,span")).find(
      (el) =>
        /^\.\d{2}$/.test((el.textContent || "").trim()) &&
        parseFloat(getComputedStyle(el).fontSize) >= 40 &&
        el.getBoundingClientRect().top > 400,
    );

    const desc = Array.from(document.querySelectorAll("p")).find((p) => {
      const r = p.getBoundingClientRect();
      const t = (p.textContent || "").trim();
      return (
        t.length > 40 &&
        t.length < 220 &&
        r.x < 360 &&
        r.y > 580 &&
        parseFloat(getComputedStyle(p).fontSize) <= 14
      );
    });

    const caps = light
      ? Array.from(light.querySelectorAll("p")).find((p) => {
          const r = p.getBoundingClientRect();
          return (
            r.x > 1050 &&
            parseFloat(getComputedStyle(p).fontSize) >= 16 &&
            (p.textContent || "").length > 15 &&
            (p.textContent || "").length < 250
          );
        })
      : null;

    const progressFill = Array.from(document.querySelectorAll("div")).find(
      (d) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        return (
          r.height > 0 &&
          r.height <= 4 &&
          r.width > 10 &&
          r.width < 220 &&
          r.bottom > 650 &&
          r.top > 650 &&
          (cs.backgroundColor.includes("249") ||
            cs.backgroundColor.includes("255, 0") ||
            cs.backgroundColor.includes("249, 65"))
        );
      },
    );

    const list = Array.from(document.querySelectorAll("a"))
      .filter((a) =>
        /Brand Identity|Product Design|Web Systems|Development|Content|Motion/.test(
          a.textContent || "",
        ),
      )
      .slice(0, 6)
      .map((a) => {
        const p = a.querySelector("p") || a;
        return {
          text: (p.textContent || "").trim().slice(0, 40),
          color: getComputedStyle(p).color,
          transform: getComputedStyle(p).transform,
          transition: getComputedStyle(p).transition.slice(0, 120),
        };
      });

    return {
      title: pack(titleP),
      titleWrap: pack(titleWrap),
      titleSpans,
      letters,
      mediaCandidates,
      allMediaLayers,
      index: pack(idx),
      desc: pack(desc),
      caps: pack(caps),
      progressFill: pack(progressFill),
      list,
    };
  });
}

async function sampleHoverTransition(page, fromText, toText) {
  await alignTheater(page);
  await link(page, fromText).hover({ force: true });
  await page.waitForTimeout(900);
  const before = await snapshot(page);

  const samples = [before];
  const t0 = Date.now();

  // Start hover, then poll
  const hoverPromise = link(page, toText).hover({ force: true });
  const times = [0, 40, 80, 120, 180, 250, 350, 450, 600, 800];
  for (const t of times) {
    const wait = t - (Date.now() - t0);
    if (wait > 0) await page.waitForTimeout(wait);
    const s = await snapshot(page);
    samples.push({ t: Date.now() - t0, ...s });
  }
  await hoverPromise;
  await page.waitForTimeout(200);
  samples.push({ t: Date.now() - t0, ...(await snapshot(page)) });

  return { fromText, toText, before, samples };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await (
    await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    })
  ).newPage();

  await page.goto("https://spector.framer.website/", {
    waitUntil: "networkidle",
    timeout: 90000,
  });

  await alignTheater(page);

  // Resting Brand
  await link(page, "Brand Identity").hover({ force: true });
  await page.waitForTimeout(800);
  const restingBrand = await snapshot(page);
  await page.screenshot({ path: path.join(OUT, "spector-brand.png") });

  // Transition Brand → Motion with real hover
  const brandToMotion = await sampleHoverTransition(
    page,
    "Brand Identity",
    "Motion & Interaction",
  );
  await page.screenshot({ path: path.join(OUT, "spector-motion.png") });

  // Transition Motion → Product
  const motionToProduct = await sampleHoverTransition(
    page,
    "Motion & Interaction",
    "Product Design",
  );

  // Leave persistence
  await link(page, "Web Systems").hover({ force: true });
  await page.waitForTimeout(600);
  const beforeLeave = await snapshot(page);
  // move to empty white area left of theater
  await page.mouse.move(5, 450);
  await page.waitForTimeout(500);
  const afterLeave = await snapshot(page);

  // Rapid hover convergence
  await alignTheater(page);
  for (const label of [
    "Brand Identity",
    "Product Design",
    "Web Systems",
    "Development",
    "Content & Messaging",
    "Motion & Interaction",
  ]) {
    await link(page, label).hover({ force: true });
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(700);
  const rapidEnd = await snapshot(page);

  // Pointer over media for parallax — move mouse across media
  await link(page, "Brand Identity").hover({ force: true });
  await page.waitForTimeout(500);
  const mediaBox = await page.evaluate(() => {
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
    const r = light.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  let parallax = null;
  if (mediaBox) {
    const a = await snapshot(page);
    await page.mouse.move(
      mediaBox.x + mediaBox.w * 0.85,
      mediaBox.y + mediaBox.h * 0.2,
    );
    await page.waitForTimeout(120);
    const b = await snapshot(page);
    await page.mouse.move(
      mediaBox.x + mediaBox.w * 0.15,
      mediaBox.y + mediaBox.h * 0.8,
    );
    await page.waitForTimeout(120);
    const c = await snapshot(page);
    parallax = {
      a: a.mediaCandidates,
      b: b.mediaCandidates,
      c: c.mediaCandidates,
    };
  }

  // List translate: hover inactive item briefly without committing? 
  // Measure Product transform while Brand active then hover Product
  await link(page, "Brand Identity").hover({ force: true });
  await page.waitForTimeout(400);
  const listBefore = (await snapshot(page)).list;
  await link(page, "Product Design").hover({ force: true });
  await page.waitForTimeout(80);
  const listMid = (await snapshot(page)).list;
  await page.waitForTimeout(300);
  const listAfter = (await snapshot(page)).list;

  // Entrance: scroll from above
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const entrance = [];
  const servicesY = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("p")).find(
      (p) => (p.textContent || "").trim() === "Services",
    );
    return el
      ? window.scrollY + el.getBoundingClientRect().top - 700
      : 3500;
  });
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, servicesY));
  await page.waitForTimeout(200);
  for (let i = 0; i < 12; i++) {
    await page.evaluate(() => window.scrollBy(0, 80));
    await page.waitForTimeout(80);
    const snap = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll("p,div")).filter(
        (el) => {
          const t = (el.textContent || "").trim();
          const r = el.getBoundingClientRect();
          if (r.top < 0 || r.top > 900) return false;
          return (
            t === "Services" ||
            /^Turning ideas/i.test(t) ||
            /WE\s*BUILD|BRANDS/i.test(t) ||
            t === "Brand Identity"
          );
        },
      );
      return nodes.slice(0, 15).map((el) => {
        const cs = getComputedStyle(el);
        return {
          text: (el.textContent || "").trim().slice(0, 36),
          opacity: cs.opacity,
          transform: cs.transform,
          y: Math.round(el.getBoundingClientRect().y),
          fs: cs.fontSize,
        };
      });
    });
    entrance.push({ i, snap });
  }

  const report = {
    restingBrand,
    brandToMotion: {
      from: brandToMotion.fromText,
      to: brandToMotion.toText,
      samples: brandToMotion.samples.map((s) => ({
        t: s.t,
        titleText: s.title?.text,
        titleOp: s.title?.opacity,
        titleTf: s.title?.transform,
        titleY: s.title?.y,
        titleBlend: s.titleWrap?.blend,
        spans: s.titleSpans?.map((x) => ({
          text: x?.text,
          op: x?.opacity,
          tf: x?.transform,
          y: x?.y,
        })),
        letters: s.letters?.slice(0, 4),
        media: s.allMediaLayers,
        mediaCand: s.mediaCandidates,
        idx: s.index?.text,
        idxOp: s.index?.opacity,
        idxTf: s.index?.transform,
        descText: s.desc?.text?.slice(0, 40),
        descOp: s.desc?.opacity,
        descTf: s.desc?.transform,
        capsText: s.caps?.text?.slice(0, 40),
        capsOp: s.caps?.opacity,
        capsTf: s.caps?.transform,
        progress: s.progressFill,
        list: s.list,
      })),
    },
    motionToProduct: {
      samples: motionToProduct.samples.map((s) => ({
        t: s.t,
        titleText: s.title?.text,
        titleOp: s.title?.opacity,
        titleTf: s.title?.transform,
        media: s.allMediaLayers,
        idx: s.index?.text,
        descOp: s.desc?.opacity,
        capsOp: s.caps?.opacity,
      })),
    },
    leave: {
      beforeTitle: beforeLeave.title?.text,
      beforeIdx: beforeLeave.index?.text,
      afterTitle: afterLeave.title?.text,
      afterIdx: afterLeave.index?.text,
    },
    rapidEnd: {
      title: rapidEnd.title?.text,
      idx: rapidEnd.index?.text,
      list: rapidEnd.list,
    },
    parallax,
    listMotion: { listBefore, listMid, listAfter },
    entrance,
  };

  await writeFile(
    path.join(OUT, "spector-motion-samples.json"),
    JSON.stringify(report, null, 2),
  );

  // Compact console summary of title/media changes
  console.log(
    "BRAND→MOTION titles:",
    report.brandToMotion.samples.map((s) => `${s.t}ms:${s.titleText}|op=${s.titleOp}|tf=${s.titleTf}|idx=${s.idx}`).join("\n"),
  );
  console.log(
    "MEDIA layers over time:",
    report.brandToMotion.samples
      .map(
        (s) =>
          `${s.t}ms media=${JSON.stringify(s.media?.map((m) => ({ bg: m.bg, op: m.opacity, tf: m.transform })))}`,
      )
      .join("\n"),
  );
  console.log("LEAVE", report.leave);
  console.log("RAPID", report.rapidEnd.title, report.rapidEnd.idx);
  console.log("LIST", JSON.stringify(report.listMotion, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
