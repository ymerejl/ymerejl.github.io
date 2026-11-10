// Temporary: open the live preview (V1 and V2) in Chrome, unlock with the password and record what loads.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const info = () => p.evaluate(() => ({ ver: document.documentElement.dataset.version, nav: !!document.getElementById('navi') && !document.getElementById('navi').hidden,
    hero: !!document.querySelector('.hero2'), film: document.querySelectorAll('video').length, slides: document.querySelectorAll('#print .pv-slide').length,
    mk: (document.getElementById('mkNote') || {}).textContent ? document.getElementById('mkNote').textContent.slice(0, 60) : null }));
  await p.goto('https://ymerejl.github.io/besart/?kunde', { waitUntil: 'load' });
  await p.fill('input[type=password]', '123'); await p.keyboard.press('Enter'); await p.waitForTimeout(9000);
  console.log('V1', JSON.stringify(await info())); await p.screenshot({ path: '_check/v1.png' });
  await p.goto('https://ymerejl.github.io/besart/v2/?kunde', { waitUntil: 'load' }); await p.waitForTimeout(9000);
  console.log('V2 (same session, no password)', JSON.stringify(await info())); await p.screenshot({ path: '_check/v2.png' });
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
