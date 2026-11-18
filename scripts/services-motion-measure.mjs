/**
 * Measure live Spector Services motion grammar via CDP sampling.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("references/oveliq/services-motion");

async function findServices(page) {
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("a,p,div")).find((n) =>
      (n.textContent || "").includes("Motion & Interaction"),
    );
    el?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    const light = Array.from(document.querySelectorAll("div")).find((d) => {
      const r = d.getBoundingClientRect();
      const cs = getComputedStyle(d);
      return (
        cs.backgroundColor === "rgb(249, 249, 249)" &&
        r.width > 700 &&
        r.height > 500 &&
        r.top > 40 &&
        r.top < 500
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
}

async function measureElements(page) {
  return page.evaluate(() => {
    const pick = (el, label) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        label,
        text: (el.textContent || "").trim().slice(0, 60),
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        opacity: cs.opacity,
        transform: cs.transform,
        filter: cs.filter,
        blend: cs.mixBlendMode,
        transition: cs.transition,
        overflow: cs.overflow,
        fs: cs.fontSize,
        color: cs.color,
        cls: (el.className || "").toString().slice(0, 80),
      };
    };

    const titleWrap = Array.from(document.querySelectorAll("div")).find((d) => {
      const cs = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return (
        cs.mixBlendMode === "difference" &&
        r.width > 300 &&
        r.height > 150 &&
        r.top > 50 &&
        r.top < 700
      );
    });
    const titleP = titleWrap?.querySelector("p");
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
    const mediaImg = light
      ? Array.from(light.querySelectorAll("div,img")).find((d) => {
          const cs = getComputedStyle(d);
          const r = d.getBoundingClientRect();
          return (
            (cs.backgroundImage.includes("framerusercontent") ||
              d.tagName === "IMG") &&
            r.width > 400 &&
            r.height > 400
          );
        })
      : null;
    const idx = Array.from(document.querySelectorAll("div,p,span")).find(
      (el) =>
        /^\.\d{2}$/.test((el.textContent || "").trim()) &&
        parseFloat(getComputedStyle(el).fontSize) >= 40,
    );
    const list = Array.from(document.querySelectorAll("a")).filter((a) =>
      /Brand Identity|Product Design|Motion & Interaction|Web Systems/.test(
        a.textContent || "",
      ),
    );
    const caps = light
      ? Array.from(light.querySelectorAll("p")).find((p) => {
          const r = p.getBoundingClientRect();
          return (
            r.x > 1000 &&
            parseFloat(getComputedStyle(p).fontSize) >= 16 &&
            (p.textContent || "").length > 20 &&
            (p.textContent || "").length < 250
          );
        })
      : null;
    const desc = Array.from(document.querySelectorAll("p")).find((p) => {
      const r = p.getBoundingClientRect();
      const t = (p.textContent || "").trim();
      return (
        t.length > 40 &&
        t.length < 220 &&
        r.x < 350 &&
        r.y > 600 &&
        parseFloat(getComputedStyle(p).fontSize) <= 14
      );
    });
    const bar = Array.from(document.querySelectorAll("div")).find((d) => {
      const r = d.getBoundingClientRect();
      return (
        r.height > 0 &&
        r.height <= 4 &&
        r.width >= 120 &&
        r.width <= 280 &&
        r.bottom > 600 &&
        r.top > 500
      );
    });

    // Collect all elements with mix-blend difference or large font near theater
    const animatedCandidates = Array.from(document.querySelectorAll("div,p,span,a"))
      .map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (r.width < 20 || r.height < 10) return null;
        if (r.top < 40 || r.top > 900) return null;
        const hasMotion =
          cs.transform !== "none" ||
          parseFloat(cs.opacity) < 0.99 ||
          cs.mixBlendMode === "difference" ||
          (cs.transition && cs.transition !== "all 0s ease 0s");
        if (!hasMotion && parseFloat(cs.fontSize) < 60) return null;
        return {
          tag: el.tagName,
          text: (el.textContent || "").trim().slice(0, 40),
          opacity: cs.opacity,
          transform: cs.transform,
          transition: cs.transition.slice(0, 120),
          blend: cs.mixBlendMode,
          fs: cs.fontSize,
          filter: cs.filter,
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.w || r.width),
          h: Math.round(r.height),
        };
      })
      .filter(Boolean)
      .slice(0, 40);

    return {
      titleWrap: pick(titleWrap, "titleWrap"),
      titleP: pick(titleP, "titleP"),
      titleSpans: titleP
        ? Array.from(titleP.querySelectorAll(":scope > span")).map((s, i) =>
            pick(s, `titleSpan-${i}`),
          )
        : [],
      light: pick(light, "light"),
      media: pick(mediaImg, "media"),
      index: pick(idx, "index"),
      caps: pick(caps, "caps"),
      desc: pick(desc, "desc"),
      progress: pick(bar, "progress"),
      list: list.slice(0, 6).map((a, i) => {
        const p = a.querySelector("p") || a;
        return {
          ...pick(a, `list-${i}`),
          color: getComputedStyle(p).color,
          transform: getComputedStyle(p).transform,
          transition: getComputedStyle(p).transition.slice(0, 120),
        };
      }),
      animatedCandidates,
    };
  });
}

async function sampleTransition(page, fromLabel, toLabel) {
  const from = page.locator("a").filter({ hasText: fromLabel }).first();
  const to = page.locator("a").filter({ hasText: toLabel }).first();
  await from.hover();
  await page.waitForTimeout(800);

  // Start sampling, then hover target
  const samples = [];
  const start = Date.now();
  const sampler = setInterval(async () => {
    // sampling done in page evaluate batch below
  }, 16);

  // Use page.evaluate for continuous sampling during transition
  const result = await page.evaluate(
    async ({ toText }) => {
      const samples = [];
      const t0 = performance.now();
      const capture = () => {
        const titleWrap = Array.from(document.querySelectorAll("div")).find(
          (d) => {
            const cs = getComputedStyle(d);
            const r = d.getBoundingClientRect();
            return (
              cs.mixBlendMode === "difference" &&
              r.width > 300 &&
              r.height > 100 &&
              r.top > 50 &&
              r.top < 700
            );
          },
        );
        const titleP = titleWrap?.querySelector("p");
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
        // Find image-like layers inside light
        const layers = light
          ? Array.from(light.querySelectorAll("div")).filter((d) => {
              const cs = getComputedStyle(d);
              const r = d.getBoundingClientRect();
              return (
                r.width > 400 &&
                r.height > 400 &&
                (cs.backgroundImage.includes("url(") ||
                  cs.opacity !== "1" ||
                  cs.transform !== "none")
              );
            })
          : [];
        const idx = Array.from(document.querySelectorAll("div,p,span")).find(
          (el) =>
            /^\.\d{2}$/.test((el.textContent || "").trim()) &&
            parseFloat(getComputedStyle(el).fontSize) >= 40,
        );
        const desc = Array.from(document.querySelectorAll("p")).find((p) => {
          const r = p.getBoundingClientRect();
          const t = (p.textContent || "").trim();
          return (
            t.length > 40 &&
            t.length < 220 &&
            r.x < 350 &&
            r.y > 600 &&
            parseFloat(getComputedStyle(p).fontSize) <= 14
          );
        });
        const caps = light
          ? Array.from(light.querySelectorAll("p")).find((p) => {
              const r = p.getBoundingClientRect();
              return (
                r.x > 1000 &&
                parseFloat(getComputedStyle(p).fontSize) >= 16 &&
                (p.textContent || "").length > 20
              );
            })
          : null;
        const pack = (el) => {
          if (!el) return null;
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            text: (el.textContent || "").trim().slice(0, 40),
            opacity: cs.opacity,
            transform: cs.transform,
            filter: cs.filter,
            blend: cs.mixBlendMode,
            y: Math.round(r.y),
            h: Math.round(r.height),
            bgimg: cs.backgroundImage.includes("url(")
              ? cs.backgroundImage.slice(0, 80)
              : "",
          };
        };
        samples.push({
          t: Math.round(performance.now() - t0),
          title: pack(titleP || titleWrap),
          titleWrap: pack(titleWrap),
          mediaLayers: layers.slice(0, 6).map(pack),
          index: pack(idx),
          desc: pack(desc),
          caps: pack(caps),
        });
      };

      capture();
      const link = Array.from(document.querySelectorAll("a")).find((a) =>
        (a.textContent || "").includes(toText),
      );
      if (link) {
        link.dispatchEvent(
          new PointerEvent("pointerenter", { bubbles: true }),
        );
        link.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      }
      // sample for ~900ms
      await new Promise((resolve) => {
        const id = setInterval(() => {
          capture();
          if (performance.now() - t0 > 900) {
            clearInterval(id);
            resolve(null);
          }
        }, 33);
      });
      return samples;
    },
    { toText: toLabel },
  );

  clearInterval(sampler);
  return { from: fromLabel, to: toLabel, samples: result, elapsed: Date.now() - start };
}

async function measureEntrance(page) {
  // Scroll away then into services, sampling
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  return page.evaluate(async () => {
    const samples = [];
    const servicesLabel = Array.from(document.querySelectorAll("p,div")).find(
      (el) => (el.textContent || "").trim() === "Services",
    );
    if (!servicesLabel) return { error: "no services label" };
    // scroll so services is below fold
    const targetY =
      window.scrollY + servicesLabel.getBoundingClientRect().top - 900;
    window.scrollTo(0, Math.max(0, targetY));
    await new Promise((r) => setTimeout(r, 300));

    const t0 = performance.now();
    const capture = () => {
      const nodes = Array.from(
        document.querySelectorAll("p,div,a,h1,h2,h3,span"),
      ).filter((el) => {
        const r = el.getBoundingClientRect();
        const t = (el.textContent || "").trim();
        if (r.top < -200 || r.top > 1200) return false;
        return (
          t === "Services" ||
          /Turning ideas|WE BUILD|Brand Identity|Motion &/i.test(t) ||
          (parseFloat(getComputedStyle(el).fontSize) >= 80 &&
            r.width > 200 &&
            r.height > 40)
        );
      });
      samples.push({
        t: Math.round(performance.now() - t0),
        scrollY: Math.round(window.scrollY),
        nodes: nodes.slice(0, 25).map((el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            text: (el.textContent || "").trim().slice(0, 40),
            opacity: cs.opacity,
            transform: cs.transform,
            y: Math.round(r.y),
            fs: cs.fontSize,
          };
        }),
      });
    };

    capture();
    // animate scroll into view over ~800ms
    const start = window.scrollY;
    const end =
      window.scrollY +
      (servicesLabel.getBoundingClientRect().top - 100);
    const dur = 900;
    await new Promise((resolve) => {
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        window.scrollTo(0, start + (end - start) * p);
        capture();
        if (p < 1) requestAnimationFrame(tick);
        else {
          // hold and sample settle
          setTimeout(() => {
            capture();
            setTimeout(() => {
              capture();
              resolve(null);
            }, 400);
          }, 200);
        }
      };
      requestAnimationFrame(tick);
    });
    return samples;
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
  await page.goto("https://spector.framer.website/", {
    waitUntil: "networkidle",
    timeout: 90000,
  });

  await findServices(page);
  await page
    .locator("a")
    .filter({ hasText: "Brand Identity" })
    .first()
    .hover();
  await page.waitForTimeout(700);
  const resting = await measureElements(page);
  await page.screenshot({ path: path.join(OUT, "spector-resting-brand.png") });

  // Title blend / structure deep dive
  const titleDeep = await page.evaluate(() => {
    const wrap = Array.from(document.querySelectorAll("div")).find((d) => {
      const cs = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return (
        cs.mixBlendMode === "difference" &&
        r.width > 300 &&
        r.height > 150 &&
        r.top > 50 &&
        r.top < 700
      );
    });
    if (!wrap) return null;
    const walk = (el, depth = 0) => {
      if (!el || depth > 5) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: (el.className || "").toString().slice(0, 60),
        opacity: cs.opacity,
        transform: cs.transform,
        overflow: cs.overflow,
        blend: cs.mixBlendMode,
        transition: cs.transition.slice(0, 160),
        animation: cs.animation,
        filter: cs.filter,
        willChange: cs.willChange,
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        text: (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3
          ? el.textContent
          : ""
        ).slice(0, 40),
        children: Array.from(el.children)
          .slice(0, 8)
          .map((c) => walk(c, depth + 1)),
      };
    };
    return walk(wrap);
  });

  // Media layer deep dive
  const mediaDeep = await page.evaluate(() => {
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
    if (!light) return null;
    const interesting = Array.from(light.querySelectorAll("div,img")).filter(
      (el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return (
          r.width > 300 &&
          r.height > 300 &&
          (cs.backgroundImage.includes("url(") ||
            el.tagName === "IMG" ||
            cs.opacity !== "1" ||
            cs.transform !== "none" ||
            cs.overflow === "hidden")
        );
      },
    );
    return interesting.slice(0, 20).map((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: (el.className || "").toString().slice(0, 80),
        opacity: cs.opacity,
        transform: cs.transform,
        overflow: cs.overflow,
        transition: cs.transition.slice(0, 160),
        filter: cs.filter,
        bgimg: cs.backgroundImage.includes("url(")
          ? cs.backgroundImage.match(/url\("?([^"]+)/)?.[1]?.slice(-60)
          : "",
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    });
  });

  const transitionBrandToMotion = await sampleTransition(
    page,
    "Brand Identity",
    "Motion & Interaction",
  );
  await page.waitForTimeout(200);
  await page.screenshot({
    path: path.join(OUT, "spector-after-motion.png"),
  });

  const transitionMotionToProduct = await sampleTransition(
    page,
    "Motion & Interaction",
    "Product Design",
  );

  // Hover persistence: leave list
  await page
    .locator("a")
    .filter({ hasText: "Product Design" })
    .first()
    .hover();
  await page.waitForTimeout(400);
  await page.mouse.move(10, 10);
  await page.waitForTimeout(400);
  const afterLeave = await page.evaluate(() => {
    const active = Array.from(document.querySelectorAll("a")).find((a) => {
      const p = a.querySelector("p");
      return p && getComputedStyle(p).color.includes("249");
    });
    const title = Array.from(document.querySelectorAll("p")).find(
      (p) =>
        parseFloat(getComputedStyle(p).fontSize) >= 90 &&
        p.getBoundingClientRect().top > 100 &&
        p.getBoundingClientRect().top < 700,
    );
    return {
      activeText: active?.textContent?.slice(0, 40),
      titleText: title?.textContent?.slice(0, 40),
    };
  });

  // Pointer over media — check parallax
  await findServices(page);
  await page
    .locator("a")
    .filter({ hasText: "Brand Identity" })
    .first()
    .hover();
  await page.waitForTimeout(500);
  const mediaParallax = await page.evaluate(async () => {
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
    const media = Array.from(light.querySelectorAll("div")).find((d) => {
      const cs = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return cs.backgroundImage.includes("url(") && r.width > 400;
    });
    if (!media) return { error: "no media" };
    const before = getComputedStyle(media).transform;
    const r = media.getBoundingClientRect();
    media.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        clientX: r.left + r.width * 0.8,
        clientY: r.top + r.height * 0.2,
      }),
    );
    await new Promise((res) => setTimeout(res, 100));
    const mid = getComputedStyle(media).transform;
    media.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        clientX: r.left + r.width * 0.2,
        clientY: r.top + r.height * 0.8,
      }),
    );
    await new Promise((res) => setTimeout(res, 100));
    const after = getComputedStyle(media).transform;
    return { before, mid, after, changed: before !== mid || mid !== after };
  });

  // List item hover translate sample
  const listHover = await page.evaluate(async () => {
    const brand = Array.from(document.querySelectorAll("a")).find((a) =>
      (a.textContent || "").includes("Brand Identity"),
    );
    const product = Array.from(document.querySelectorAll("a")).find((a) =>
      (a.textContent || "").includes("Product Design"),
    );
    const read = (a) => {
      const p = a?.querySelector("p") || a;
      const cs = getComputedStyle(p);
      return {
        color: cs.color,
        transform: cs.transform,
        transition: cs.transition.slice(0, 140),
      };
    };
    const before = { brand: read(brand), product: read(product) };
    product?.dispatchEvent(
      new PointerEvent("pointerenter", { bubbles: true }),
    );
    await new Promise((r) => setTimeout(r, 50));
    const during = { brand: read(brand), product: read(product) };
    await new Promise((r) => setTimeout(r, 300));
    const after = { brand: read(brand), product: read(product) };
    return { before, during, after };
  });

  const entrance = await measureEntrance(page);

  const report = {
    resting,
    titleDeep,
    mediaDeep,
    transitionBrandToMotion,
    transitionMotionToProduct,
    afterLeave,
    mediaParallax,
    listHover,
    entranceSampleCount: Array.isArray(entrance) ? entrance.length : entrance,
    entranceHead: Array.isArray(entrance) ? entrance.slice(0, 3) : entrance,
    entranceTail: Array.isArray(entrance) ? entrance.slice(-3) : null,
  };

  await writeFile(
    path.join(OUT, "raw-measurements.json"),
    JSON.stringify(report, null, 2),
  );
  console.log("wrote raw-measurements.json");
  // Print key transition deltas
  const summarize = (tr) =>
    (tr.samples || [])
      .filter((_, i) => i % 3 === 0)
      .map((s) => ({
        t: s.t,
        titleOp: s.title?.opacity,
        titleTf: s.title?.transform,
        titleText: s.title?.text,
        media: s.mediaLayers?.map((m) => ({
          op: m?.opacity,
          tf: m?.transform,
          img: m?.bgimg?.slice(-30),
        })),
        idx: s.index?.text,
        idxOp: s.index?.opacity,
        idxTf: s.index?.transform,
        descOp: s.desc?.opacity,
        descTf: s.desc?.transform,
        capsOp: s.caps?.opacity,
        capsTf: s.caps?.transform,
      }));
  console.log(
    "TRANSITION Brand→Motion",
    JSON.stringify(summarize(transitionBrandToMotion), null, 2),
  );
  console.log("AFTER LEAVE", afterLeave);
  console.log("PARALLAX", mediaParallax);
  console.log("LIST HOVER", JSON.stringify(listHover, null, 2));
  console.log("TITLE DEEP", JSON.stringify(titleDeep, null, 2));
  console.log("MEDIA DEEP", JSON.stringify(mediaDeep, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
