// Liest Preisseiten von Salon-Websites: Startseite + passende Unterseiten, PDFs und Preislisten-Bilder (für OCR).
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const KW = /preis|price|tarif|leistung|angebot|dienst|service|menu|men[uü]|herren|damen|barber|coiffure|haarschnitt|farbe|color/i;
(async () => {
  const sites = fs.readFileSync('_scrape/sites.txt', 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split(/\s+/));
  const b = await chromium.launch({ channel: 'chrome' });
  const ctx = await b.newContext({ locale: 'de-CH', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36' });
  fs.mkdirSync('_scrape/out', { recursive: true }); fs.mkdirSync('_scrape/files', { recursive: true });
  const summary = [];
  for (const [slug, url, ort] of sites) {
    const p = await ctx.newPage(); let out = `### ${slug} ${ort} ${url}\n`; const seen = new Set(); const files = [];
    try {
      const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); await p.waitForTimeout(2500);
      const home = p.url(); out += `STATUS ${r && r.status()} FINAL ${home}\n\n`;
      const grab = async (u) => {
        const txt = await p.evaluate(() => document.body ? document.body.innerText : '');
        out += `\n=== PAGE ${u}\n${txt.slice(0, 60000)}\n`;
        const links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => [a.href, (a.innerText || a.title || '').trim()]));
        const imgs = await p.evaluate(() => [...document.querySelectorAll('img')].map(i => [i.currentSrc || i.src, i.alt || '', i.naturalWidth, i.naturalHeight]));
        return { links, imgs };
      };
      const first = await grab(home); seen.add(home.split('#')[0]);
      const origin = new URL(home).origin;
      const cand = first.links.filter(([h, t]) => { try { const u = new URL(h); return u.origin === origin && (KW.test(u.pathname) || KW.test(t)); } catch (e) { return false; } }).map(([h]) => h.split('#')[0]);
      const pdfs = first.links.map(([h]) => h).filter(h => /\.pdf(\?|$)/i.test(h));
      let imgs = first.imgs.filter(([s, a, w, h]) => /preis|price|tarif|liste/i.test(s + ' ' + a) && w > 300);
      for (const u of [...new Set(cand)].slice(0, 8)) {
        if (seen.has(u)) continue; seen.add(u);
        try { await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 25000 }); await p.waitForTimeout(1800); const g = await grab(u);
          g.links.map(([h]) => h).filter(h => /\.pdf(\?|$)/i.test(h)).forEach(h => pdfs.push(h));
          imgs = imgs.concat(g.imgs.filter(([s, a, w, h]) => (/preis|price|tarif|liste/i.test(s + ' ' + a) || /preis|tarif/i.test(u)) && w > 300));
        } catch (e) { out += `\n=== FAIL ${u} ${e.message.split('\n')[0]}\n`; }
      }
      let k = 0;
      for (const f of [...new Set(pdfs)].slice(0, 6)) { try { const resp = await ctx.request.get(f, { timeout: 30000 }); const fn = `_scrape/files/${slug}-${k++}.pdf`; fs.writeFileSync(fn, await resp.body()); files.push([fn, f]); } catch (e) {} }
      for (const [s] of imgs.slice(0, 8)) { try { const resp = await ctx.request.get(s, { timeout: 30000 }); const ext = (s.match(/\.(png|jpe?g|webp)/i) || ['.jpg'])[0]; const fn = `_scrape/files/${slug}-${k++}${ext}`; fs.writeFileSync(fn, await resp.body()); files.push([fn, s]); } catch (e) {} }
      out += `\nFILES ${JSON.stringify(files)}\n`;
      summary.push([slug, 'ok', seen.size, files.length]);
    } catch (e) { out += `ERROR ${e.message.split('\n')[0]}\n`; summary.push([slug, 'error', 0, 0]); }
    fs.writeFileSync(`_scrape/out/${slug}.txt`, out); await p.close();
  }
  fs.writeFileSync('_scrape/out/_summary.json', JSON.stringify(summary, null, 1)); console.log(summary.map(s => s.join(' ')).join('\n'));
  await b.close();
})();
