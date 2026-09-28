// node shoot.js '[{"out":"x.png","az":-26,...}, ...]'
// Rendert render.html in Chromium (WebGL über SwiftShader) – ein Bild pro Eintrag oder mit "frames" einen Drehteller.
// Ein kleiner Server liefert print-src/ aus, damit Modell, Kartenmotiv und three.js relativ geladen werden.
const path = require('path'), fs = require('fs'), http = require('http');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const ROOT = path.resolve(__dirname, '..', '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.stl': 'application/octet-stream' };
const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}/aufsteller/render/render.html`;
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const views = JSON.parse(process.argv[2]);
  for (const v of views) {
    const p = await b.newPage({ viewport: { width: v.w || 1200, height: v.h || 1200 }, deviceScaleFactor: +(v.dpr || 1) });
    p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
    const qs = new URLSearchParams(Object.fromEntries(Object.entries(v).filter(([k]) => k !== 'out'))).toString();
    await p.goto(base + '?' + qs);
    await p.waitForFunction(() => document.title === 'ready', null, { timeout: 900000 });
    await p.waitForTimeout(300);
    if (v.frames) {
      const fr = await p.evaluate(() => window.__frames);
      fs.mkdirSync(v.out, { recursive: true });
      fr.forEach((d, i) => fs.writeFileSync(`${v.out}/f${String(i).padStart(2, '0')}.png`, Buffer.from(d.split(',')[1], 'base64')));
    } else await p.locator('canvas').screenshot({ path: v.out, omitBackground: true });
    console.log('rendered', v.out); await p.close();
  }
  await b.close(); server.close();
})();
