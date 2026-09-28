// Temporary: loads the public Salonkee salon page like a normal visitor and stores
// what the page shows (text, screenshot, HTML and the JSON the page itself loads).
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = 'besart/_salonkee';
fs.mkdirSync(OUT, { recursive: true });
const URL = 'https://salonkee.ch/salon/besart-hairsalon?lang=de';
const b = await chromium.launch();
const ctx = await b.newContext({ locale: 'de-CH', viewport: { width: 1366, height: 900 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
let n = 0;
p.on('response', async r => {
  try {
    const ct = r.headers()['content-type'] || '';
    if (ct.includes('json')) {
      const body = await r.text();
      fs.writeFileSync(`${OUT}/json-${String(++n).padStart(2, '0')}.json`, JSON.stringify({ url: r.url(), status: r.status(), body }, null, 1));
    }
  } catch (e) {}
});
await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(6000);
for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(500); }
// expand collapsed categories / "show more" buttons (normal page interaction)
for (const label of ['Mehr anzeigen', 'Alle anzeigen', 'Alle Leistungen', 'Show more', 'Voir plus']) {
  const els = await p.getByText(label, { exact: false }).all();
  for (const el of els) { try { await el.click({ timeout: 1500 }); await p.waitForTimeout(600); } catch (e) {} }
}
await p.waitForTimeout(1500);
fs.writeFileSync(`${OUT}/page.txt`, await p.evaluate(() => document.body.innerText));
fs.writeFileSync(`${OUT}/page.html`, await p.content());
await p.screenshot({ path: `${OUT}/page.png`, fullPage: true });
await b.close();
