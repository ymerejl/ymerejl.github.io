const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); const errs = [];
  for (const [w, h, tag] of [[1440, 900, 'mac'], [390, 844, 'phone']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => errs.push(tag + ': ' + e.message));
    await p.goto('https://ymerejl.github.io/besart/?kunde&v=' + Date.now(), { waitUntil: 'load', timeout: 120000 });
    await p.fill('#pw', '123'); await p.click('#go'); await p.waitForTimeout(6000);
    await p.evaluate(() => { const s = document.querySelector('.intro-skip'); if (s) s.click(); }); await p.waitForTimeout(5000);
    const st = await p.evaluate(() => { const v = document.querySelector('.hero-vid'); return { title: document.title, vt: v && v.currentTime, on: v && v.classList.contains('on'), craft: !!document.getElementById('handwerk'), variants: document.querySelectorAll('.pv-vars').length, gold: getComputedStyle(document.querySelector('.lg-base')).fill, rev: document.body.innerText.includes('26 Bewertungen') }; });
    console.log(tag, JSON.stringify(st));
    await p.screenshot({ path: `_check/live-${tag}-hero.png` });
    const top = await p.evaluate(() => document.getElementById('handwerk').offsetTop);
    await p.evaluate(y => scrollTo(0, y + innerHeight * 1.2), top); await p.waitForTimeout(2500);
    await p.screenshot({ path: `_check/live-${tag}-craft.png` });
  }
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
