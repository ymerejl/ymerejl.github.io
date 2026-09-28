// Vollständiger Funktionstest wie auf einem MacBook mit Chrome (macOS-Plattform, Retina, de-CH, Zürich)
const { chromium } = require('playwright');
const fs = require('fs');
const URL0 = process.argv[2], TAG = process.argv[3] || 'gate';
const [W, H] = [+(process.argv[4] || 1440), +(process.argv[5] || 789)];
const D = __dirname + `/shots-${TAG}-${W}/`; fs.mkdirSync(D, { recursive: true });
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const results = []; const ok = (name, cond, info = '') => { results.push([cond ? 'PASS' : 'FAIL', name, info]); console.log(cond ? 'PASS' : 'FAIL', name, info); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: UA, locale: 'de-CH', timezoneId: 'Europe/Zurich', acceptDownloads: true });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'platform', { get: () => 'MacIntel' }); });
  try { await ctx.grantPermissions(['clipboard-read', 'clipboard-write']); } catch (e) {}
  const p = await ctx.newPage();
  const errs = [], failed = [], external = new Set();
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
  p.on('requestfailed', r => failed.push(r.url().slice(0, 120) + ' ' + (r.failure() || {}).errorText));
  p.on('request', r => { const u = r.url(); if (/^https?:/.test(u) && !u.startsWith('http://localhost')) external.add(u.slice(0, 90)); });
  const shot = n => p.screenshot({ path: D + n + '.png' });
  const html = () => p.evaluate(() => document.documentElement.className);
  const sleep = ms => p.waitForTimeout(ms);
  const gate = URL0.startsWith('http');
  const unlock = async url => {
    await p.goto(url, { waitUntil: 'load' });
    if (!gate) return;
    await sleep(300);
    if (await p.$('#hero') || await p.evaluate(() => { const i = document.getElementById('pw'); return !i || i.disabled; })) { await p.waitForSelector('#hero', { state: 'attached', timeout: 30000 }); return ['auto', 0]; }
    await p.fill('#pw', '000'); await p.press('#pw', 'Enter'); await sleep(1200);
    const msg = await p.textContent('#msg');
    const t = Date.now(); await p.fill('#pw', '123'); await p.press('#pw', 'Enter');
    await p.waitForSelector('#hero', { state: 'attached', timeout: 30000 });
    return [msg, Date.now() - t];
  };

  // 1 Passwort
  const g = await unlock(URL0);
  if (gate) { ok('Passwort: falsches wird abgelehnt', /stimmt nicht/.test(g[0]), g[0]); ok('Passwort 123 öffnet die Seite', true, g[1] + ' ms'); }
  await sleep(900);
  // 2 Fragebogen
  ok('Fragebogen erscheint vor der Website', /pitch-hold/.test(await html()) && await p.isVisible('#ptH'), await p.textContent('#ptH'));
  ok('Swipe-Zurück am Trackpad gesperrt', await p.evaluate(() => getComputedStyle(document.documentElement).overscrollBehaviorX) === 'none');
  ok('Datum im Schweizer Format', /\d{2}\.\d{2}\.\d{4}|^\d{4}-/.test(await p.inputValue('#pt_gespraech_datum')), await p.inputValue('#pt_gespraech_datum'));
  await shot('01-kennenlernen');
  await p.click('.pt-chip[data-v="Im Salon"]');
  await p.keyboard.press('Meta+Enter'); await sleep(800);
  ok('⌘+Enter geht weiter', (await p.textContent('#ptH')).includes('Salon'), await p.textContent('#ptH'));
  ok('⌘-Hinweis für Mac', (await p.textContent('.pt-kbd')).includes('⌘'));
  ok('Ablauf nennt den Namen', (await p.textContent('.pt-cue')).includes('Besart erzählt'));
  await p.click('.pt-wchip[data-warm="Werdegang"]'); await p.keyboard.type('Lehre, dann eigener Salon.');
  await p.click('.pt-wchip[data-warm="Ziele"]'); await p.keyboard.type('Mehr junge Kundschaft.');
  ok('Denkanwärmer fügen Stichworte ein', (await p.inputValue('#pt_salon_notizen')).includes('Ziele: Mehr junge'));
  await shot('02-salon');
  await p.click('#pitch [data-dir="1"]'); await sleep(900);
  const offerImgs = await p.$$eval('.pt-offer img', im => im.map(i => i.complete && i.naturalWidth > 0));
  ok('Angebot: Website, SEO und drei Inklusiv-Teile mit Bildern', offerImgs.length === 3 && offerImgs.every(Boolean) && (await p.textContent('.pt-offer')).includes('SEO'));
  await shot('03-angebot');
  await p.click('#pitch [data-dir="1"]'); await sleep(900);
  await p.fill('#pt_wuensche_wuensche', 'Ruhig und edel.');
  await p.click('.pt-chip[data-v="Schwarz & Creme"]'); await p.click('.pt-chip[data-v="Echte Fotos vom Salon"]'); await p.click('.pt-chip[data-v="Dezent"]');
  await p.fill('[data-k="wuensche.farben~"]', 'Gold als Akzent');
  await shot('04-wuensche');
  await p.click('.pt-steps [data-go="0"]'); await sleep(600);
  ok('Sprung über Seitenleiste', (await p.textContent('#ptH')).includes('kennenlernen'));
  await p.click('.pt-steps [data-go="4"]'); await sleep(600);
  ok('Fortschritt zählt', (await p.textContent('#ptProgN')).startsWith('8 / 8'), await p.textContent('#ptProgN'));
  await shot('05-bereit');
  await sleep(500);
  const st1 = await p.evaluate(() => JSON.parse(localStorage.getItem('besart-pitch')));
  ok('Antworten lokal gespeichert', st1 && st1.v === 2 && st1.a['wuensche.effekte'] === 'Dezent');
  // 3 Start + Intro (läuft von selbst durch, Maus schneidet)
  await p.click('[data-act="start"]'); await sleep(1500);
  ok('Intro startet nach dem Fragebogen', /intro-on/.test(await html()));
  await shot('06-intro');
  const vb = await p.evaluate(() => { const s = document.querySelector('.intro-svg'); return !!s; });
  for (let i = 0; i < 30; i++) await p.mouse.move(200 + i * 35, H / 2 + Math.sin(i / 3) * 30, { steps: 2 });
  await p.waitForFunction(() => !document.documentElement.classList.contains('intro-on'), null, { timeout: 20000 }).catch(() => {});
  ok('Intro endet, Website erscheint', !/intro-on/.test(await html()) && vb);
  await sleep(1500);
  ok('Hero-Animation gestartet', /ready/.test(await p.getAttribute('#hero', 'class')));
  ok('Öffnungsstatus angezeigt', ((await p.textContent('#hdrStatus .txt')) || '').length > 3, await p.textContent('#hdrStatus'));
  ok('Hinweis zu Notizen erscheint', /on/.test(await p.getAttribute('#ptTip', 'class')));
  await shot('07-website');
  // 4 Navigation
  for (const [href, id] of [['#leistungen', 'leistungen'], ['#ueber', 'ueber'], ['#bewertungen', 'bewertungen'], ['#besuch', 'besuch']]) {
    await p.click(`.nav-links a[href="${href}"]`); await sleep(1400);
    const top = await p.evaluate(id => Math.round(document.getElementById(id).getBoundingClientRect().top), id);
    ok('Menü → ' + id, top > -5 && top < 140, 'top ' + top);
  }
  ok('Header wird beim Scrollen dunkel', /is-scrolled/.test(await p.getAttribute('#siteHeader', 'class')));
  // 5 Leistungen
  await p.click('.nav-links a[href="#leistungen"]'); await sleep(1300);
  await p.click('[data-tab="herren"]'); await sleep(700);
  ok('Leistungen: Reiter Herren', (await p.getAttribute('#tab-herren', 'aria-selected')) === 'true' && (await p.$$('#svcMenu .menu-row')).length > 2);
  await shot('08-leistungen');
  await p.click('.menu-book[data-pre]'); await sleep(1600);
  const pre = await p.textContent('.bk-sum');
  ok('Leistung aus Preisliste in Buchung übernommen', /1 Leistung/.test(pre), pre.replace(/\s+/g, ' ').slice(0, 60));
  // 6 Buchung komplett
  await p.click('#termin [data-go="2"]'); await sleep(900);
  await p.click('#termin [data-quick]').catch(() => {}); await sleep(400);
  await p.click('#termin [data-go="3"]'); await sleep(900);
  await p.click('#bkSubmit'); await sleep(400);
  ok('Buchung: Pflichtfelder werden geprüft', (await p.$$('#termin [aria-invalid="true"], #termin .err, #termin .field-err')).length > 0);
  await p.fill('#bkName', 'Test Kunde'); await p.fill('#bkPhone', '079 123 45 67');
  await p.click('#bkSubmit'); await sleep(2000);
  ok('Buchung: Bestätigung', await p.isVisible('[data-ics]'));
  await shot('09-buchung');
  const [ics] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }).catch(() => null), p.click('[data-ics]')]);
  ok('Kalenderdatei (.ics) lädt herunter', !!ics && /\.ics$/.test(ics.suggestedFilename()), ics ? ics.suggestedFilename() : 'kein Download');
  await p.click('[data-reset]'); await sleep(700);
  ok('Buchung zurücksetzen', await p.isVisible('#termin [data-go="2"]'));
  // 7 Über uns, Looks, Bewertungen, Karte, Kontakt
  await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('looks').scrollIntoView(); }); await sleep(1500);
  ok('Looks: 6 Bilder geladen', (await p.$$eval('#looksGrid img', im => im.filter(i => i.complete && i.naturalWidth).length)) === 6);
  await p.evaluate(() => document.getElementById('bewertungen').scrollIntoView()); await p.mouse.move(5, 5); await sleep(1500);
  const tx1 = await p.evaluate(() => getComputedStyle(document.getElementById('revTrack')).transform); await sleep(1200);
  const tx2 = await p.evaluate(() => getComputedStyle(document.getElementById('revTrack')).transform);
  ok('Bewertungen laufen durch', tx1 !== tx2 && (await p.$$('#revTrack .rev-card')).length >= 10);
  await p.evaluate(() => document.getElementById('besuch').scrollIntoView()); await sleep(2000);
  ok('Karte Zürichsee gezeichnet', /draw/.test(await p.getAttribute('#lakePath', 'class') || ''));
  const links = await p.$$eval('#besuch a', as => as.map(a => a.getAttribute('href')));
  ok('Kontakt: Telefon- und Routenlink', links.some(h => /^tel:/.test(h)) && links.some(h => /google|maps/.test(h)), links.join(' | ').slice(0, 120));
  await shot('10-besuch');
  // 8 Notizen
  await p.evaluate(() => scrollTo(0, 0)); await sleep(800);
  await p.keyboard.press('n'); await sleep(700);
  ok('Taste N öffnet Notizen', /open/.test(await p.getAttribute('#ptNotes', 'class')), await p.inputValue('#ptCtx'));
  await p.click('#ptNote'); await p.keyboard.type('Buchung gefällt. Leertaste ok.');
  await p.evaluate(() => document.getElementById('leistungen').scrollIntoView()); await sleep(1900); await p.evaluate(() => scrollBy(0, 3)); await sleep(500);
  ok('Notizfeld folgt der Seite', (await p.inputValue('#ptCtx')) === 'web:leistungen');
  await p.selectOption('#ptCtx', 'allg'); await p.keyboard.type('Allgemeine Notiz.');
  ok('Notiz-Thema frei wählbar', (await p.textContent('#ptFollow')).includes('Fest gewählt'));
  await p.keyboard.press('Escape'); await sleep(500);
  ok('Esc schliesst Notizen, Zähler stimmt', !/open/.test(await p.getAttribute('#ptNotes', 'class')) && (await p.textContent('#ptFabN')) === '2', await p.textContent('#ptFabN'));
  // 9 Print-Paket
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await sleep(1000);
  await p.click('.foot-next'); await sleep(1500);
  ok('Weiter öffnet Print-Paket', await p.evaluate(() => document.getElementById('print').classList.contains('open')));
  ok('Stationen: 7', (await p.textContent('#pvWhereT')).includes('07'));
  for (let i = 1; i <= 7; i++) {
    await p.keyboard.press('ArrowRight'); await sleep(1300);
    await shot('11-pv' + i);
  }
  ok('Pfeiltasten bis Station 07', (await p.textContent('#pvWhereN')) === '07');
  await p.keyboard.press('ArrowLeft'); await sleep(1100);
  await p.click('#pv6 .pv-scenes button:nth-child(2)'); await sleep(900);
  ok('Szenenwechsel (Kasse)', await p.evaluate(() => document.querySelectorAll('#pv6 .pv-frame img')[1].classList.contains('on')));
  await p.click('#pv6 .pv-frame'); await sleep(800);
  ok('Vollansicht öffnet', await p.evaluate(() => document.getElementById('lightbox').classList.contains('open')));
  await p.keyboard.press('Escape'); await sleep(600);
  ok('Esc schliesst Vollansicht, Paket bleibt offen', await p.evaluate(() => !document.getElementById('lightbox').classList.contains('open') && document.getElementById('print').classList.contains('open')));
  await p.evaluate(() => document.getElementById('pv5').scrollIntoView({ block: 'start' })); await sleep(4500);
  const sp = await p.locator('.pv-spin').boundingBox();
  const v0 = await p.getAttribute('.pv-spin', 'aria-valuenow');
  await p.mouse.move(sp.x + sp.width * .3, sp.y + sp.height / 2); await p.mouse.down();
  for (let i = 1; i <= 14; i++) { await p.mouse.move(sp.x + sp.width * .3 + i * 22, sp.y + sp.height / 2); await sleep(16); }
  await p.mouse.up(); await sleep(1200);
  const v1 = await p.getAttribute('.pv-spin', 'aria-valuenow');
  ok('360°-Ansicht dreht mit Maus/Trackpad', v0 !== v1, v0 + ' → ' + v1);
  await p.evaluate(() => document.getElementById('pv7').scrollIntoView({ block: 'start' })); await sleep(1500);
  ok('Paket zeigt Preis und SEO', (await p.textContent('#pv7')).includes("1'920") && (await p.textContent('#pv7')).includes('SEO'));
  // 10 Abschluss + Export
  await p.click('#pv7 [data-pitch-closing]'); await sleep(900);
  ok('Abschluss-Fragen öffnen', (await p.textContent('#ptH')).includes('Ganze'));
  await p.click('#pitch .pt-scale [data-num="5"]');
  await p.click('#pitch [data-dir="1"]'); await sleep(600);
  await p.click('.pt-chip[data-k="umsetzung.karten"][data-v="500"]');
  await p.click('#pitch [data-dir="1"]'); await sleep(600);
  await p.click('.pt-chip[data-k="entscheid.entscheid"][data-v="Zusage"]');
  await p.fill('#pt_entscheid_followup', '2026-10-05');
  await p.click('#pitch [data-dir="1"]'); await sleep(600);
  await p.click('[data-act="summary"]'); await sleep(900);
  await shot('12-uebersicht');
  const [pdf] = await Promise.all([p.waitForEvent('download'), p.click('[data-act="pdf"]')]);
  await pdf.saveAs(D + 'notizen.pdf');
  ok('PDF gespeichert', fs.readFileSync(D + 'notizen.pdf').subarray(0, 5).toString() === '%PDF-', pdf.suggestedFilename());
  const [txt] = await Promise.all([p.waitForEvent('download'), p.click('[data-act="txt"]')]);
  await txt.saveAs(D + 'notizen.txt');
  const T = fs.readFileSync(D + 'notizen.txt', 'utf8');
  ok('Textdatei enthält alles', T.includes('Ziele: Mehr junge Kundschaft') && T.includes('Gold als Akzent') && T.includes('Allgemeine Notiz') && T.includes('Zusage'));
  await p.click('[data-act="copy"]'); await sleep(500);
  const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => ''));
  ok('Kopieren in Zwischenablage', clip.includes('GESPRÄCHSNOTIZEN'), (await p.textContent('#ptMsg')));
  await p.keyboard.press('Escape'); await sleep(700);
  ok('Esc zurück ins Print-Paket', await p.evaluate(() => !document.getElementById('pitch').classList.contains('open') && document.getElementById('print').classList.contains('open')));
  await p.click('.pv-bar .pv-back'); await sleep(900);
  ok('Zurück zur Website', await p.evaluate(() => !document.getElementById('print').classList.contains('open')));
  // 11 Neu laden, Intro erneut, Zurücksetzen
  if (gate) await unlock(URL0); else await p.reload();
  await sleep(1800);
  ok('Nach Neuladen: kein Fragebogen, Notizen noch da', !/pitch-hold/.test(await html()) && (await p.textContent('#ptFabN')) === '2');
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await sleep(800);
  await p.click('[data-replay]'); await sleep(gate ? 2500 : 1500);
  if (gate && await p.isVisible('#pw').catch(() => false)) { await p.fill('#pw', '123'); await p.press('#pw', 'Enter'); await sleep(2000); }
  ok('«Intro ansehen» spielt Intro erneut', /intro-on/.test(await html()));
  await p.keyboard.press('Escape'); await sleep(2500);
  await p.click('#ptFab'); await p.click('[data-nact="summary"]'); await sleep(700);
  await p.click('[data-act="reset"]'); await p.click('[data-act="reset"]'); await sleep(2500);
  if (gate && await p.isVisible('#pw').catch(() => false)) { await p.fill('#pw', '123'); await p.press('#pw', 'Enter'); await sleep(2000); }
  ok('Neues Gespräch: Fragebogen wieder da, leer', /pitch-hold/.test(await html()) && (await p.textContent('#ptProgN')).startsWith('2'));
  // 12 Kundenansicht
  const base = URL0.split('?')[0].split('#')[0];
  if (gate) await unlock(base + '?kunde'); else await p.goto(base + '?kunde');
  await sleep(1500);
  ok('?kunde: reine Website', !/pitch/.test(await html()) && await p.evaluate(() => document.getElementById('ptFab').hidden));
  if (gate) await unlock(base + '?termin'); else await p.goto(base + '?termin');
  await sleep(3500);
  ok('?termin (QR): direkt zur Buchung', await p.evaluate(() => { const r = document.getElementById('termin').getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && !document.documentElement.classList.contains('pitch'); }));
  ok('Keine Fehler in der Konsole', errs.length === 0, errs.join(' | ').slice(0, 300));
  ok('Keine fehlgeschlagenen Ladevorgänge', failed.length === 0, failed.join(' | ').slice(0, 300));
  console.log('externe Anfragen:', [...external]);
  const fails = results.filter(r => r[0] === 'FAIL').length;
  console.log(`\n${results.length - fails}/${results.length} bestanden`);
  await b.close();
})().catch(e => { console.log('ABBRUCH', e.message); process.exit(1); });
