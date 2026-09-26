// Temporary research helper for the BesArt preview (removed afterwards): Google reviews.
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = (process.env.GITHUB_WORKSPACE || '.') + '/besart/_research';
fs.mkdirSync(OUT, { recursive: true });
const FID = '0x479aa9625950d77d:0xa4dac2e1859d1952';
const log = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({
  locale: 'de-CH', viewport: { width: 1400, height: 1000 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36',
});
const page = await ctx.newPage();
async function consent() {
  for (const t of ['Alle akzeptieren', 'Accept all', 'Alle annehmen', 'Akzeptieren']) {
    const b = page.getByRole('button', { name: t }).first();
    if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await page.waitForTimeout(1500); return; }
  }
}
async function extract(name) {
  for (const b of await page.getByRole('button', { name: /^(Mehr|More)$/ }).all()) await b.click({ timeout: 1500 }).catch(() => {});
  const reviews = await page.evaluate(() => [...document.querySelectorAll('[data-review-id]')].map(el => ({
    id: el.getAttribute('data-review-id'),
    author: el.querySelector('.d4r55')?.innerText,
    stars: el.querySelector('[role="img"][aria-label*="Stern"], [role="img"][aria-label*="star"]')?.getAttribute('aria-label'),
    date: el.querySelector('.rsqaWe')?.innerText,
    text: el.querySelector('.wiI7pd')?.innerText,
  })).filter(r => r.author));
  const uniq = [...new Map(reviews.map(r => [r.id, r])).values()];
  fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify(uniq, null, 2));
  fs.writeFileSync(`${OUT}/${name}.txt`, `URL: ${page.url()}\n\n` + await page.evaluate(() => document.body.innerText));
  await page.screenshot({ path: `${OUT}/${name}.png` });
  log.push(`${name}: ${uniq.length} reviews, url ${page.url().slice(0, 120)}`);
}
async function tryIt(name, fn) { try { await fn(); } catch (e) { log.push(`${name}: ERROR ${e.message.split('\n')[0]}`); } }

await tryIt('rev-maps', async () => {
  await page.goto('https://www.google.com/maps/place/BesArt+Hairsalon/@47.257865,8.5876096,17z/data=!4m8!3m7!1s' + FID + '!8m2!3d47.2580723!4d8.5880566!9m1!1b1!16s%2Fg%2F11tf41hnn_?hl=de', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(6000); await consent();
  const tab = page.getByRole('tab', { name: /Rezensionen|Reviews/ }).first();
  if (await tab.isVisible().catch(() => false)) { await tab.click(); await page.waitForTimeout(3000); }
  for (let k = 0; k < 8; k++) { await page.mouse.move(250, 650); await page.mouse.wheel(0, 2000); await page.waitForTimeout(1000); }
  await extract('rev-maps');
});
await tryIt('rev-cid', async () => {
  await page.goto('https://maps.google.com/?cid=11879563425183062354&hl=de', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(6000); await consent();
  const tab = page.getByRole('tab', { name: /Rezensionen|Reviews/ }).first();
  if (await tab.isVisible().catch(() => false)) { await tab.click(); await page.waitForTimeout(3000); }
  for (let k = 0; k < 8; k++) { await page.mouse.move(250, 650); await page.mouse.wheel(0, 2000); await page.waitForTimeout(1000); }
  await extract('rev-cid');
});
await tryIt('rev-search', async () => {
  await page.goto('https://www.google.com/search?hl=de&gl=ch&q=BesArt+Hairsalon+Horgen#lrd=' + FID + ',1,,,', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(6000); await consent();
  await page.waitForTimeout(3000);
  const t = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(`${OUT}/rev-search.txt`, t);
  await page.screenshot({ path: `${OUT}/rev-search.png` });
  log.push('rev-search: ' + t.length + ' chars');
});
await tryIt('rev-async', async () => {
  const u = 'https://www.google.com/async/reviewSort?hl=de&async=feature_id:' + FID + ',review_source:All%20reviews,sort_by:newestFirst,start_index:0,is_owner:false,filter_text:,associated_topic:,next_page_token:,_pms:s,_fmt:pc';
  const r = await ctx.request.get(u);
  const t = await r.text();
  fs.writeFileSync(`${OUT}/rev-async.html`, t);
  log.push('rev-async: ' + r.status() + ' ' + t.length + ' bytes');
});
fs.writeFileSync(`${OUT}/log2.txt`, log.join('\n'));
await browser.close();
