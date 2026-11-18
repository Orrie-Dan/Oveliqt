import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await (
  await browser.newContext({ viewport: { width: 1440, height: 900 } })
).newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.evaluate(() => {
  const t = document.querySelector(".oveliq-svc-theater");
  window.scrollTo(0, window.scrollY + t.getBoundingClientRect().top - 72);
});
await page.waitForTimeout(400);
await page.getByRole("tab", { name: /AI & Machine Learning/i }).click();
await page.waitForTimeout(900);

await page.addStyleTag({
  content: `
  .oveliq-svc-theater__title { mix-blend-mode: normal !important; }
  .oveliq-svc-theater__title .oveliq-difference-title {
    color: #050609 !important;
    mix-blend-mode: normal !important;
  }
`,
});
await page.waitForTimeout(200);
await page.screenshot({
  path: "references/oveliq/services-fidelity-02/oveliq-ai-title-black-test.png",
});
console.log("wrote black test");
await browser.close();
