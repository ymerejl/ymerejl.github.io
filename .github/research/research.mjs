// Temporary helper (removed afterwards): read BesArt's services from the Google Maps booking module.
import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = (process.env.GITHUB_WORKSPACE || '.') + '/besart/_research3';
fs.mkdirSync(OUT, { recursive: true });
const log = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({ locale: 'de-CH', viewport: { width: 1400, height: 1000 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36' });
const page = await ctx.newPage();
const dump = async (name, pg = page) => {
  fs.writeFileSync(`${OUT}/${name}.txt`, `URL ${pg.url()}\n\n` + await pg.evaluate(() => document.body.innerText));
  await pg.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  log.push('saved ' + name + ' ' + pg.url().slice(0, 120));
};
async function consent(pg = page) {
  for (const t of ['Alle akzeptieren', 'Accept all', 'Alle annehmen']) {
    const b = pg.getByRole('button', { name: t }).first();
    if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await pg.waitForTimeout(1200); return; }
  }
}
try {
  await page.goto('https://www.google.com/maps/place/BesArt+Hairsalon/@47.257865,8.5876096,17z/data=!4m6!3m5!1s0x479aa9625950d77d:0xa4dac2e1859d1952!8m2!3d47.2580723!4d8.5880566!16s%2Fg%2F11tf41hnn_?hl=de', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(6000); await consent();
  await dump('maps-start');
  const candidates = [/Preise und Verfügbarkeit/i, /Online buchen/i, /Jetzt ansehen und buchen/i, /Termin/i];
  let opened = null;
  for (const re of candidates) {
    const el = page.getByText(re).first();
    if (await el.isVisible().catch(() => false)) {
      const [popup] = await Promise.all([ctx.waitForEvent('page', { timeout: 8000 }).catch(() => null), el.click().catch(() => {})]);
      await page.waitForTimeout(6000);
      opened = popup || page;
      log.push('clicked ' + re + ' popup=' + !!popup);
      break;
    }
  }
  if (opened) {
    await opened.waitForLoadState('domcontentloaded').catch(() => {});
    await opened.waitForTimeout(5000); await consent(opened);
    await dump('booking-1', opened);
    for (let k = 0; k < 10; k++) { await opened.mouse.move(700, 600); await opened.mouse.wheel(0, 1200); await opened.waitForTimeout(700); }
    for (const t of ['Alle anzeigen', 'Mehr anzeigen', 'Weitere Dienstleistungen']) for (const b of await opened.getByText(t).all()) await b.click({ timeout: 1500 }).catch(() => {});
    await opened.waitForTimeout(1500);
    await dump('booking-2', opened);
    // alle Frames (Buchungsmodul kann in iframes liegen)
    let fi = 0;
    for (const fr of opened.frames()) {
      const t = await fr.evaluate(() => document.body ? document.body.innerText : '').catch(() => '');
      if (t && t.length > 200) { fs.writeFileSync(`${OUT}/frame-${fi++}.txt`, `URL ${fr.url()}\n\n` + t); }
    }
    log.push('frames ' + fi);
  }
} catch (e) { log.push('ERROR ' + e.message.split('\n')[0]); }
fs.writeFileSync(`${OUT}/log.txt`, log.join('\n'));
await browser.close();
