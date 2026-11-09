const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); const errs = [];
  for (const [w, h, tag] of [[1440, 900, 'mac'], [390, 844, 'phone']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => errs.push(tag + ': ' + e.message));
    await p.goto('https://ymerejl.github.io/besart/?kunde&v=' + Date.now(), { waitUntil: 'load', timeout: 120000 });
    await p.fill('#pw', '123'); await p.click('#go'); await p.waitForTimeout(6000);
    await p.evaluate(() => { const s = document.querySelector('.intro-skip'); if (s) s.click(); }); await p.waitForTimeout(7000);
    const st = await p.evaluate(() => { const v = document.querySelector('.hero-vid'); return { vt: v && +v.currentTime.toFixed(1), on: v && v.classList.contains('on'), src: v && (v.currentSrc || '').split('/').slice(-2).join('/'), booking: !!document.querySelector('#buchen #termin'), marquee: !!document.querySelector('.marquee') }; });
    console.log(tag, JSON.stringify(st));
    await p.screenshot({ path: `_check/live-${tag}-hero.png` });
    await p.evaluate(() => document.querySelector('#looksGrid').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.waitForTimeout(4000);
    console.log(tag, 'looks', JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('#looksGrid video')].map(v => v.classList.contains('on') ? 'on' : (v.getAttribute('src') ? 'loading' : '-')))));
    await p.screenshot({ path: `_check/live-${tag}-looks.png` });
  }
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
