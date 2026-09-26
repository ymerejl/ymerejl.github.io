// Temporary research helper for the BesArt preview (removed afterwards).
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = (process.env.GITHUB_WORKSPACE || '.') + '/besart/_research';
fs.mkdirSync(OUT, { recursive: true });
const log = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({
  locale: 'de-CH', viewport: { width: 1400, height: 1000 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36',
});
const page = await ctx.newPage();

async function consent() {
  for (const t of ['Alle akzeptieren', 'Alle annehmen', 'Akzeptieren', 'Accept all', 'Zustimmen', 'Einverstanden', 'Alle Cookies akzeptieren']) {
    const b = page.getByRole('button', { name: t }).first();
    if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await page.waitForTimeout(1500); return; }
  }
}
async function grab(url, name, { wait = 4000, full = false, expand = [] } = {}) {
  try {
    const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(wait);
    await consent();
    for (const t of expand) {
      for (const b of await page.getByText(t, { exact: false }).all()) { await b.click({ timeout: 2000 }).catch(() => {}); await page.waitForTimeout(600); }
    }
    const text = await page.evaluate(() => document.body.innerText);
    fs.writeFileSync(`${OUT}/${name}.txt`, `URL: ${page.url()}\nSTATUS: ${r && r.status()}\n\n${text}`);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
    log.push(`${name}: ${r && r.status()} ${page.url()}`);
    return r && r.status() < 400;
  } catch (e) { log.push(`${name}: ERROR ${e.message.split('\n')[0]}`); return false; }
}
const links = () => page.$$eval('a', as => as.map(a => a.href));
const imgs = new Set();
async function collectImgs(filter) {
  const found = await page.evaluate(() => {
    const out = [...document.querySelectorAll('img')].map(i => i.currentSrc || i.src);
    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      const m = bg && bg.match(/url\("?(.*?)"?\)/);
      if (m) out.push(m[1]);
    });
    return out;
  });
  found.filter(filter).forEach(u => imgs.add(u));
}

// ---------- Treatwell ----------
const tw = new Set();
for (const u of [
  'https://www.treatwell.ch/orte/behandlung-gruppe-haare/angebot-typ-lokal/in-horgen-ch/',
  'https://www.treatwell.ch/orte/bei-friseursalon/in-horgen-ch/',
  'https://www.treatwell.ch/orte/bei-barbershop/in-horgen-ch/',
  'https://html.duckduckgo.com/html/?q=besart+hairsalon+horgen+treatwell',
]) {
  if (await grab(u, 'tw-list-' + tw.size + '-' + u.split('/')[2].split('.')[1])) {
    (await links()).filter(h => /besart/i.test(h)).forEach(h => tw.add(decodeURIComponent(h)));
  }
}
for (const slug of ['besart-hairsalon', 'besart', 'besart-hair-salon', 'besart-hairsalon-beka', 'besart-hairsalon-horgen', 'besarthairsalon']) tw.add(`https://www.treatwell.ch/ort/${slug}/`);
let i = 0;
for (const u of tw) {
  if (!/treatwell\.ch\/ort\//.test(u)) { log.push('tw-link (not a venue): ' + u); continue; }
  await grab(u, `tw-venue-${i++}`, { full: true, expand: ['Alle anzeigen', 'Mehr anzeigen', 'Alle Behandlungen'] });
}

// ---------- Salonkee ----------
if (await grab('https://salonkee.ch/salon/besart-hairsalon?lang=de', 'salonkee', { wait: 5000, full: true, expand: ['Mehr anzeigen', 'Alle anzeigen'] })) {
  await collectImgs(u => /salonkee|cloudfront|amazonaws/i.test(u));
}

// ---------- Google Maps ----------
const MAPS = 'https://www.google.com/maps/place/BesArt+Hairsalon/@47.257865,8.5876096,17z/data=!4m6!3m5!1s0x479aa9625950d77d:0xa4dac2e1859d1952!8m2!3d47.2580723!4d8.5880566!16s%2Fg%2F11tf41hnn_?hl=de';
if (await grab(MAPS, 'maps', { wait: 7000 })) {
  await collectImgs(u => /googleusercontent\.com\/(gps-cs-s|p\/|gps-proxy)/.test(u));
  const photosBtn = page.getByRole('button', { name: /Fotos|Alle ansehen|Photos/ }).first();
  if (await photosBtn.isVisible().catch(() => false)) {
    await photosBtn.click().catch(() => {});
    await page.waitForTimeout(4000);
    for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(1200); }
    await collectImgs(u => /googleusercontent\.com\/(gps-cs-s|p\/|gps-proxy)/.test(u));
    await page.screenshot({ path: `${OUT}/maps-photos.png` });
  }
}
imgs.add('https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QD0ahuvT6_3jcYaWFXoCMss52m40GFat4bigGbnRTdWKwftHo7jq00XL-Cpf8u_FpJv0zZ1gj9uu38tYw8MBSAMJjobw3TpQu0G70DIag-pgMNs_rVey-QS85S0c8X1pMd3BVW=w222-h100-k-no');

// ---------- Bilder laden ----------
let n = 0;
const seen = new Set();
for (let u of imgs) {
  if (/googleusercontent/.test(u)) u = u.replace(/=[^=\/]*$/, '=w1800-h1800-k-no');
  const key = u.split('=')[0];
  if (seen.has(key) || n >= 24) continue;
  seen.add(key);
  try {
    const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } });
    const buf = Buffer.from(await r.arrayBuffer());
    if (!r.ok || buf.length < 6000) continue;
    const ext = (r.headers.get('content-type') || '').includes('png') ? 'png' : (r.headers.get('content-type') || '').includes('svg') ? 'svg' : (r.headers.get('content-type') || '').includes('webp') ? 'webp' : 'jpg';
    const name = `${/googleusercontent/.test(u) ? 'maps' : 'sk'}-${String(n++).padStart(2, '0')}.${ext}`;
    fs.writeFileSync(`${OUT}/${name}`, buf);
    log.push(`img ${name} ${buf.length}B ${u.slice(0, 140)}`);
  } catch (e) { log.push('img ERROR ' + u.slice(0, 100)); }
}
fs.writeFileSync(`${OUT}/log.txt`, log.join('\n'));
await browser.close();
