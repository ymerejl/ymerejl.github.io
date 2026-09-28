// node render.js <module> <fn> <out.png> [dpi] [json-opts]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
(async () => {
  const [mod, fn, out, dpi = '300', optsJson = '{}'] = process.argv.slice(2);
  const M = require('./' + mod);
  const opts = JSON.parse(optsJson);
  const html = M[fn](opts);
  fs.mkdirSync(__dirname + '/out', { recursive: true });
  const tmp = __dirname + `/out/_${mod}-${fn}-${require("crypto").createHash("md5").update(optsJson + out).digest("hex").slice(0, 8)}.html`;
  fs.writeFileSync(tmp, html);
  const wpx = (M.W + 2 * M.B) * 96 / 25.4, hpx = (M.H + 2 * M.B) * 96 / 25.4;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: Math.ceil(wpx), height: Math.ceil(hpx) }, deviceScaleFactor: +dpi / 96 });
  await p.goto('file://' + tmp);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(100);
  await p.waitForTimeout(150);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: wpx, height: hpx } });
  await b.close();
})();
