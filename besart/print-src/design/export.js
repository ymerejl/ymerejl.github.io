// Final exports: print PDFs (with 3 mm bleed, fonts embedded), hi-res PNGs with bleed (for mockups),
// and trimmed PNGs (for the website showcase).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const OUT = __dirname + '/final/';
fs.mkdirSync(OUT, { recursive: true });
const jobs = [
  ['card', 'front', 'visitenkarte-vorderseite', 600],
  ['card', 'back', 'visitenkarte-rueckseite', 600],
  ['flyer', 'front', 'flyer-a5-vorderseite', 300],
  ['flyer', 'back', 'flyer-a5-rueckseite', 300],
  ['review', 'front', 'bewertungskarte-a6', 400],
];
(async () => {
  const b = await chromium.launch();
  const pdfPages = {};
  for (const [mod, fn, name, dpi] of jobs) {
    const M = require('./' + mod);
    const html = M[fn]({});
    const file = OUT + `_${name}.html`;
    fs.writeFileSync(file, html);
    const wmm = M.W + 2 * M.B, hmm = M.H + 2 * M.B;
    const wpx = wmm * 96 / 25.4, hpx = hmm * 96 / 25.4;
    const p = await b.newPage({ viewport: { width: Math.ceil(wpx), height: Math.ceil(hpx) }, deviceScaleFactor: dpi / 96 });
    await p.goto('file://' + file);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
    await p.screenshot({ path: OUT + `${name}-anschnitt.png`, clip: { x: 0, y: 0, width: wpx, height: hpx } });
    const t = M.B * 96 / 25.4;
    await p.screenshot({ path: OUT + `${name}.png`, clip: { x: t, y: t, width: M.W * 96 / 25.4, height: M.H * 96 / 25.4 } });
    await p.pdf({ path: OUT + `_${name}.pdf`, width: wmm + 'mm', height: hmm + 'mm', printBackground: true, pageRanges: '1' });
    (pdfPages[mod] = pdfPages[mod] || []).push(OUT + `_${name}.pdf`);
    await p.close();
    console.log('done', name);
  }
  await b.close();
  fs.writeFileSync(OUT + '_pdfs.json', JSON.stringify(pdfPages));
})();
