import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

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

await page.evaluate(() => {
  const a = Array.from(document.querySelectorAll("a")).find((x) =>
    (x.textContent || "").includes("Brand Identity"),
  );
  a?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(500);
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

async function clickService(label) {
  const box = await page.evaluate((labelInner) => {
    const a = Array.from(document.querySelectorAll("a")).find((x) => {
      const t = (x.textContent || "").replace(/\s+/g, " ");
      return t.includes(labelInner) && x.getBoundingClientRect().width > 50;
    });
    if (!a) return null;
    const r = a.getBoundingClientRect();
    return { x: r.x + 40, y: r.y + r.height / 2 };
  }, label);
  if (!box) throw new Error("no " + label);
  await page.mouse.move(box.x, box.y);
  await page.waitForTimeout(30);
  await page.mouse.down();
  await page.mouse.up();
}

async function snap() {
  return page.evaluate(() => {
    const pack = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const bgMatch = cs.backgroundImage.match(/images\/([^/?]+)/);
      return {
        text: (el.textContent || "").trim().slice(0, 40),
        op: Number(cs.opacity),
        tf: cs.transform,
        filter: cs.filter,
        y: Math.round(r.y),
        h: Math.round(r.height),
        bg: bgMatch ? bgMatch[1] : "",
        blend: cs.mixBlendMode,
        overflow: cs.overflow,
        wc: cs.willChange,
        tr: cs.transition.slice(0, 120),
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
    const medias = light
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
    const layers = light
      ? Array.from(light.querySelectorAll("div"))
          .filter((el) => {
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return (
              r.width > 200 &&
              r.height > 200 &&
              (cs.opacity !== "1" ||
                cs.transform !== "none" ||
                (cs.filter !== "none" && cs.filter !== "brightness(1) grayscale(0)"))
            );
          })
          .slice(0, 12)
          .map(pack)
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
            (p.textContent || "").length > 15
          );
        })
      : null;

    const masks = [];
    if (titleWrap) {
      titleWrap.querySelectorAll("div,span,p").forEach((el) => {
        const cs = getComputedStyle(el);
        if (
          cs.overflow === "hidden" ||
          cs.transform !== "none" ||
          Number(cs.opacity) < 1
        ) {
          masks.push(pack(el));
        }
      });
    }

    // progress bar fill width
    const progressTrack = Array.from(document.querySelectorAll("div")).find(
      (d) => {
        const r = d.getBoundingClientRect();
        return (
          r.height > 0 &&
          r.height <= 4 &&
          r.width >= 180 &&
          r.width <= 220 &&
          r.bottom > 650 &&
          r.top > 650
        );
      },
    );
    let progressFill = null;
    if (progressTrack) {
      const fill = progressTrack.querySelector("div") || progressTrack;
      progressFill = pack(fill);
      if (progressFill) {
        progressFill.w = Math.round(fill.getBoundingClientRect().width);
      }
    }

    return {
      title: pack(titleP),
      titleWrap: pack(titleWrap),
      medias,
      layers,
      masks: masks.slice(0, 20),
      idx: pack(idx),
      desc: pack(desc),
      caps: pack(caps),
      progressFill,
    };
  });
}

await clickService("Brand Identity");
await page.waitForTimeout(800);
const start = await snap();
console.log(
  "START",
  start.title?.text,
  start.idx?.text,
  start.medias?.[0]?.bg,
  start.desc?.text?.slice(0, 40),
);

const t0 = Date.now();
await clickService("Motion & Interaction");
const samples = [];
for (const t of [40, 80, 120, 180, 250, 350, 450, 600, 800, 1000]) {
  const wait = t - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  const s = await snap();
  samples.push({
    t: Date.now() - t0,
    title: s.title?.text,
    titleOp: s.title?.op,
    titleTf: s.title?.tf,
    titleY: s.title?.y,
    titleFilter: s.title?.filter,
    idx: s.idx?.text,
    idxOp: s.idx?.op,
    idxTf: s.idx?.tf,
    descOp: s.desc?.op,
    descTf: s.desc?.tf,
    desc: s.desc?.text?.slice(0, 35),
    capsOp: s.caps?.op,
    capsTf: s.caps?.tf,
    caps: s.caps?.text?.slice(0, 35),
    mediaBg: s.medias?.map((m) => m.bg),
    mediaOp: s.medias?.map((m) => m.op),
    mediaTf: s.medias?.map((m) => m.tf),
    mediaFilter: s.medias?.map((m) => m.filter),
    layers: s.layers,
    masks: s.masks?.slice(0, 6),
    progressW: s.progressFill?.w,
  });
}

for (const s of samples) {
  console.log(
    `${s.t}ms title=${s.title} op=${s.titleOp} tf=${s.titleTf} idx=${s.idx} descOp=${s.descOp} capsOp=${s.capsOp} media=${JSON.stringify(s.mediaBg)} mOp=${JSON.stringify(s.mediaOp)} mTf=${JSON.stringify(s.mediaTf)} mFilter=${JSON.stringify(s.mediaFilter)} progW=${s.progressW}`,
  );
}

await page.screenshot({
  path: "references/oveliq/services-motion/spector-click-motion.png",
});
await writeFile(
  "references/oveliq/services-motion/click-transition.json",
  JSON.stringify({ start, samples }, null, 2),
);

// Hover translate measurement via mouse move across list
await clickService("Brand Identity");
await page.waitForTimeout(400);
const listMotion = await page.evaluate(async () => {
  const items = Array.from(document.querySelectorAll("a")).filter((a) =>
    /Brand Identity|Product Design|Web Systems|Development|Content|Motion/.test(
      a.textContent || "",
    ),
  );
  const read = () =>
    items.slice(0, 6).map((a) => {
      const inner =
        a.querySelector("[style*='transform'], p, div") || a;
      // prefer the visibly transformed child
      let best = a;
      let bestTf = getComputedStyle(a).transform;
      a.querySelectorAll("*").forEach((el) => {
        const tf = getComputedStyle(el).transform;
        if (tf !== "none") {
          best = el;
          bestTf = tf;
        }
      });
      const p = a.querySelector("p") || a;
      return {
        text: (p.textContent || "").trim().slice(0, 30),
        color: getComputedStyle(p).color,
        transform: bestTf,
        el: best.tagName,
      };
    });
  const before = read();
  const product = items.find((a) =>
    (a.textContent || "").includes("Product Design"),
  );
  if (product) {
    const r = product.getBoundingClientRect();
    product.dispatchEvent(
      new PointerEvent("pointerenter", {
        bubbles: true,
        clientX: r.x + 20,
        clientY: r.y + 10,
      }),
    );
  }
  await new Promise((r) => setTimeout(r, 100));
  const mid = read();
  await new Promise((r) => setTimeout(r, 400));
  const after = read();
  return { before, mid, after };
});
console.log("LIST MOTION", JSON.stringify(listMotion, null, 2));

await browser.close();
