// Rendert alle Varianten (variants.js): PNG ohne Beschnitt (Vorschau/Website), PDF mit 3 mm Beschnitt (Druckvorlage).
// node export-varianten.js  →  varianten/
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const V = require('./variants');
const OUT = __dirname + '/varianten/'; fs.mkdirSync(OUT, { recursive: true });
const jobs = [];
for (const k of ['A', 'B', 'C']) {
  jobs.push(['karte', k, 'vorne', V.cards[k].front, V.card, 600], ['karte', k, 'hinten', V.cards[k].back, V.card, 600]);
  jobs.push(['flyer', k, 'vorne', V.flyers[k].front, V.flyer, 300], ['flyer', k, 'hinten', V.flyers[k].back, V.flyer, 300]);
}
(async () => {
  const b = await chromium.launch();
  for (const [kind, k, side, fn, M, dpi] of jobs) {
    if (kind === 'flyer' && side === 'hinten' && k === 'B') continue;   // B nutzt dieselbe Rückseite wie A
    const name = `${kind}-${k}-${side}`, file = OUT + `_${name}.html`;
    fs.writeFileSync(file, fn({}));
    const wmm = M.W + 2 * M.B, hmm = M.H + 2 * M.B, px = 96 / 25.4;
    const p = await b.newPage({ viewport: { width: Math.ceil(wmm * px), height: Math.ceil(hmm * px) }, deviceScaleFactor: dpi / 96 });
    p.on('pageerror', e => console.log('ERR', name, e.message));
    await p.goto('file://' + file); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: OUT + name + '.png', clip: { x: M.B * px, y: M.B * px, width: M.W * px, height: M.H * px } });
    await p.pdf({ path: OUT + name + '.pdf', width: wmm + 'mm', height: hmm + 'mm', printBackground: true, pageRanges: '1' });
    await p.close(); console.log('ok', name);
  }
  await b.close();
})();
