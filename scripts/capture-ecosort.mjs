// Captures the EcoSort AI case-study images from a locally running copy of the app.
// Start the API (allowing the dev origin) and the frontend pointed at it, e.g. from ecosort-ai/:
//   CORS_ORIGINS=http://127.0.0.1:5179 uvicorn src.api.main:app --port 8010
//   cd frontend && VITE_API_URL=http://127.0.0.1:8010 npx vite --port 5179
// then: node scripts/capture-ecosort.mjs
// The sample photo comes from the project's held-out test split (data/processed/splits/test.csv).
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const url = (process.env.ECOSORT_URL || 'http://127.0.0.1:5179').replace(/\/$/, '');
const sample = process.env.ECOSORT_SAMPLE || 'D:/school/ML/Pipeline/Summative/ecosort-ai/data/raw/dataset-resized/plastic/plastic272.jpg';
const out = 'public/assets/work/ecosort-ai';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  await mkdir(out, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto(`${url}/predict`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.getByText('Connected').first().waitFor({ timeout: 30000 });
  await page.locator('input[type="file"]').setInputFiles(sample);
  await page.getByRole('button', { name: /^classify$/i }).click();
  await page.waitForResponse(r => /predict/i.test(r.url()) && r.request().method() === 'POST', { timeout: 120000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/classify.jpg`, type: 'jpeg', quality: 88, timeout: 60000 });

  // Client-side navigation keeps the in-memory session history for the dashboard.
  await page.getByRole('link', { name: /dashboard/i }).click();
  await page.getByText('Healthy').first().waitFor({ timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/dashboard.jpg`, type: 'jpeg', quality: 88, timeout: 60000 });
  console.log('Captured EcoSort AI classify and dashboard views');
} finally {
  await browser.close();
}
