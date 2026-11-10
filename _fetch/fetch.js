// Temporary: collect product photos and facts about payment terminals (Worldline, Stripe) and Cal.com payment apps.
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const OUT = '_fetch/out'; fs.mkdirSync(OUT + '/img', { recursive: true });
const log = (...a) => { const s = a.join(' '); console.log(s); fs.appendFileSync(OUT + '/log.txt', s + '\n'); };
const PAGES = [
  ['stripe-pricing', 'https://stripe.com/de-ch/pricing'],
  ['stripe-terminal', 'https://stripe.com/de-ch/terminal'],
  ['stripe-wisepad3', 'https://docs.stripe.com/terminal/readers/bbpos-wisepad3'],
  ['stripe-s700', 'https://docs.stripe.com/terminal/readers/stripe-reader-s700'],
  ['stripe-wiseposE', 'https://docs.stripe.com/terminal/readers/bbpos-wisepos-e'],
  ['stripe-readers', 'https://docs.stripe.com/terminal/payments/setup-reader'],
  ['stripe-taptopay', 'https://docs.stripe.com/terminal/payments/setup-reader/tap-to-pay'],
  ['stripe-dashboard-terminal', 'https://docs.stripe.com/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven'],
  ['cal-payment-apps', 'https://cal.com/apps/categories/payment'],
  ['cal-stripe', 'https://cal.com/apps/stripe'],
];
const SEARCH = [
  ['wl-ex4000', 'Worldline EX4000 All-in-One Schweiz'],
  ['wl-saturn', 'Worldline Saturn 1000F2 Winter Deal 349'],
  ['wl-online', 'Worldline Schweiz Pay by Link KMU Online-Zahlung Terminal'],
  ['wl-booking', 'Worldline Saferpay Online-Terminbuchung Integration Cal.com'],
];
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 900 }, locale: 'de-CH', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36' });
  const p = await ctx.newPage();
  async function grab(slug, url) {
    try {
      const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(3500);
      for (const t of ['Alle akzeptieren', 'Accept all', 'Akzeptieren', 'Alle Cookies akzeptieren', 'I agree']) { const btn = p.getByRole('button', { name: t }); if (await btn.count()) { await btn.first().click().catch(() => {}); await p.waitForTimeout(800); break; } }
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(1200);
      const text = await p.evaluate(() => document.body.innerText);
      fs.writeFileSync(`${OUT}/${slug}.txt`, `URL ${p.url()} STATUS ${r && r.status()}\n\n` + text);
      await p.screenshot({ path: `${OUT}/${slug}.png`, fullPage: false });
      const imgs = await p.evaluate(() => [...document.images].map(i => ({ src: i.currentSrc || i.src, alt: i.alt || '', w: i.naturalWidth, h: i.naturalHeight })).filter(i => i.w >= 200 && i.h >= 150));
      fs.writeFileSync(`${OUT}/${slug}.imgs.json`, JSON.stringify(imgs, null, 1));
      let n = 0;
      for (const im of imgs.slice(0, 14)) {
        try { const res = await ctx.request.get(im.src, { timeout: 20000 }); if (!res.ok()) continue; const buf = await res.body(); const ct = res.headers()['content-type'] || '';
          const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : ct.includes('svg') ? 'svg' : ct.includes('avif') ? 'avif' : 'jpg';
          fs.writeFileSync(`${OUT}/img/${slug}-${n++}.${ext}`, buf); } catch (e) {}
      }
      log('OK', slug, p.url(), 'imgs', imgs.length, 'saved', n);
    } catch (e) { log('ERR', slug, url, e.message.split('\n')[0]); }
  }
  for (const [s, u] of PAGES) await grab(s, u);
  for (const [s, q] of SEARCH) {
    try {
      await p.goto('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q), { waitUntil: 'domcontentloaded', timeout: 30000 });
      const links = await p.evaluate(() => [...document.querySelectorAll('a.result__a')].map(a => a.href).slice(0, 6));
      const real = links.map(h => { try { const u = new URL(h); return u.searchParams.get('uddg') || h; } catch (e) { return h; } });
      fs.writeFileSync(`${OUT}/${s}.search.txt`, real.join('\n'));
      log('SEARCH', s, real.join(' | '));
      let k = 0; for (const u of real.filter(u => /worldline|saferpay|six-payment|cal\.com/.test(u)).slice(0, 3)) await grab(`${s}-${k++}`, u);
    } catch (e) { log('ERR search', s, e.message.split('\n')[0]); }
  }
  await b.close();
})();
