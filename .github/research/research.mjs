// Temporary research helper (removed afterwards): is BesArt on Treatwell, and for whom does it cut?
import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = (process.env.GITHUB_WORKSPACE || '.') + '/besart/_research2';
fs.mkdirSync(OUT, { recursive: true });
const log = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({ locale: 'de-CH', viewport: { width: 1400, height: 1000 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36' });
const page = await ctx.newPage();
async function consent() {
  for (const t of ['Alle akzeptieren', 'Alle Cookies akzeptieren', 'Akzeptieren', 'Accept all', 'Zustimmen']) {
    const b = page.getByRole('button', { name: t }).first();
    if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await page.waitForTimeout(1200); return; }
  }
}
const venues = new Map();
async function listing(url, tag) {
  for (let p = 1; p <= 6; p++) {
    const u = p === 1 ? url : url + (url.includes('?') ? '&' : '?') + 'page=' + p;
    try {
      const r = await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(3500); await consent();
      for (let k = 0; k < 8; k++) { await page.mouse.wheel(0, 1600); await page.waitForTimeout(500); }
      const found = await page.$$eval('a[href*="/ort/"]', as => as.map(a => [a.href.split('?')[0], (a.innerText || '').trim().split('\n')[0]]));
      const before = venues.size;
      found.forEach(([h, t]) => { if (!venues.has(h)) venues.set(h, t); });
      fs.writeFileSync(`${OUT}/${tag}-p${p}.txt`, `URL ${u}\nSTATUS ${r && r.status()}\n\n` + await page.evaluate(() => document.body.innerText));
      log.push(`${tag} p${p}: status ${r && r.status()}, +${venues.size - before} venues`);
      if (venues.size === before && p > 1) break;
    } catch (e) { log.push(`${tag} p${p}: ERROR ${e.message.split('\n')[0]}`); break; }
  }
}
await listing('https://www.treatwell.ch/orte/bei-coiffeur/in-horgen-ch/', 'coiffeur');
await listing('https://www.treatwell.ch/orte/bei-barbier/in-horgen-ch/', 'barbier');
await listing('https://www.treatwell.ch/orte/behandlung-gruppe-coiffeur/angebot-typ-lokal/in-horgen-ch/', 'gruppe');
fs.writeFileSync(`${OUT}/venues.txt`, [...venues].map(([h, t]) => `${h}\t${t}`).join('\n'));
const hits = [...venues.keys()].filter(h => /bes-?art|beka/i.test(h + ' ' + venues.get(h)));
log.push('venues total ' + venues.size + ', besart hits: ' + JSON.stringify(hits));
let i = 0;
for (const h of hits) {
  try {
    await page.goto(h, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(4000); await consent();
    for (const t of ['Alle anzeigen', 'Mehr anzeigen', 'Alle Behandlungen anzeigen']) for (const b of await page.getByText(t).all()) await b.click({ timeout: 1500 }).catch(() => {});
    await page.waitForTimeout(1500);
    fs.writeFileSync(`${OUT}/venue-${i}.txt`, `URL ${page.url()}\n\n` + await page.evaluate(() => document.body.innerText));
    await page.screenshot({ path: `${OUT}/venue-${i}.png`, fullPage: true });
    log.push('venue ' + i + ' saved ' + h); i++;
  } catch (e) { log.push('venue ERROR ' + h); }
}
fs.writeFileSync(`${OUT}/log.txt`, log.join('\n'));
await browser.close();
