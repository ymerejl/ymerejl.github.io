// Temporary research helper: reads supplier pages and checks the Google review link in a real browser.
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = '_research'; fs.mkdirSync(OUT, { recursive: true });
const pages = [
  ['connect-a5', 'https://www.connectshop.ch/produkt/aufsteller-google-bewertungen/'],
  ['connect-a6', 'https://www.connectshop.ch/produkt/aufsteller-fuer-google-bewertungen-a6/'],
  ['connect-nfc-sticker', 'https://www.connectshop.ch/produkt/nfc-sticker-weiss/'],
  ['smartreviews', 'https://www.smartreviews.ch/products/nfc-google'],
  ['wazzl', 'https://www.wazzl.ch/Google-Review-Booster-NFC-QR-Code-Aufsteller-Bewertungskarte/SW10082.1'],
  ['boostup-logo', 'https://boostupcards.ch/collections/eigenes-logo'],
  ['flyeralarm-ch', 'https://www.flyeralarm.com/ch/shop/configurator/index/id/14403/nfc-aufsteller-fuer-google-bewertung.html'],
  ['bastelgarage-nfc', 'https://www.bastelgarage.ch/nfc-tag-aufkleber-ntag213-13-56-mhz'],
  ['google-writereview', 'https://search.google.com/local/writereview?placeid=ChIJfddQWWKpmkcRUhmdheHC2qQ&hl=de'],
  ['google-maps-place', 'https://www.google.com/maps/place/?q=place_id:ChIJfddQWWKpmkcRUhmdheHC2qQ&hl=de'],
];
const b = await chromium.launch();
const ctx = await b.newContext({ locale: 'de-CH', viewport: { width: 1280, height: 1000 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' });
for (const [name, url] of pages) {
  const p = await ctx.newPage();
  let log = `# ${name}\n${url}\n`;
  try {
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    log += `status ${r && r.status()} final ${p.url()}\n`;
    await p.waitForTimeout(6000);
    for (const sel of ['button:has-text("Alle akzeptieren")', 'button:has-text("Accept all")', 'button:has-text("Akzeptieren")', 'button:has-text("Alle Cookies akzeptieren")']) {
      const bt = await p.$(sel); if (bt) { await bt.click().catch(() => {}); await p.waitForTimeout(3000); log += `clicked ${sel}\n`; break; }
    }
    log += `title ${await p.title()}\n\n`;
    const text = await p.evaluate(() => document.body ? document.body.innerText : '');
    log += text.replace(/\n{3,}/g, '\n\n').slice(0, 9000);
    await p.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  } catch (e) { log += 'ERROR ' + e.message; }
  fs.writeFileSync(`${OUT}/${name}.txt`, log);
  await p.close();
}
await b.close();
