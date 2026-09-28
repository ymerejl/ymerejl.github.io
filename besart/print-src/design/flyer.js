// Flyer A5 148 × 210 mm (+3 mm bleed). Front: image, claim, QR. Back: price list (1:1 Salonkee), hours, contact, QR.
const { ROOT, logo, qr, page } = require('./common');
const W = 148, H = 210, B = 3;
const IMG = f => `file://${ROOT}img/${f}`;
const ARROW = `<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;

const base = `
.dark{background:#0F0E0D;color:#EDE6DA}
.paper{background:#EEE8DC;color:#1B1815}
.serif{font-family:"Cormorant Garamond",serif}
.sans{font-family:Archivo,sans-serif}
em{font-style:italic;font-weight:400}
`;

// CTA block shared by the front variants: QR on an ivory tile + booking line
const cta = (o = {}) => `
<div class="cta">
  <div class="qtile">${qr()}</div>
  <div class="ctxt">
    <p class="ey">Online-Termin</p>
    <p class="ch">Jetzt Termin <em>buchen.</em></p>
    <p class="cs">Code scannen, Wunschzeit wählen – fertig.<br>Oder anrufen: <b>044 725 14 04</b></p>
  </div>
</div>`;
const ctaCSS = `
.cta{display:flex;align-items:center;gap:6.5mm}
.qtile{flex:none;width:27mm;height:27mm;padding:2.6mm;background:#EEE8DC;border-radius:1.6mm}
.qtile .qr{display:block;width:100%;height:100%;color:#14110E}
.ey{font:500 5.6pt/1 Archivo,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#C7B593;display:flex;align-items:center;gap:2.4mm}
.ey::before{content:"";width:6mm;height:.18mm;background:rgba(199,181,147,.6)}
.ch{margin-top:2.6mm;font:500 19pt/1 "Cormorant Garamond",serif;color:#EDE6DA}
.ch em{color:#BDB4A7}
.cs{margin-top:2.6mm;font:400 7.4pt/1.5 Archivo,sans-serif;color:#BDB4A7}
.cs b{font-weight:500;color:#EDE6DA;letter-spacing:.02em}
`;

function front(o = {}) {
  return (o.v || 'arch') === 'arch' ? frontArch(o) : frontEditorial(o);
}

function frontArch(o) {
  const css = base + ctaCSS + `
.logo{position:absolute;left:50%;top:12.5mm;width:58mm;transform:translateX(-50%);color:#EDE6DA}
.arch{position:absolute;left:31mm;top:43mm;width:86mm;height:88mm;border-radius:43mm 43mm 0 0;overflow:hidden;background:#1a1714}
.arch img{width:100%;height:100%;object-fit:cover;object-position:${o.pos || '50% 22%'}}
.arch-line{position:absolute;left:28.6mm;top:40.6mm;width:90.8mm;height:90.4mm;border:.2mm solid rgba(237,230,218,.3);border-bottom:0;border-radius:45.4mm 45.4mm 0 0}
.h{position:absolute;left:0;right:0;top:137.5mm;text-align:center;font:500 35pt/1 "Cormorant Garamond",serif;letter-spacing:-.005em}
.h em{color:#BDB4A7}
.sub{position:absolute;left:0;right:0;top:152.5mm;text-align:center;font:400 7.6pt/1.55 Archivo,sans-serif;color:#BDB4A7}
.sep{position:absolute;left:50%;top:166.5mm;width:10mm;height:.2mm;margin-left:-5mm;background:rgba(199,181,147,.55)}
.cta{position:absolute;left:14mm;right:14mm;bottom:11mm;justify-content:center}
.qtile{width:25mm;height:25mm;padding:2.4mm}
.foot{position:absolute;left:14mm;right:14mm;bottom:6.5mm;display:none}
`;
  const body = `<div class="bleed dark"><div class="trim">
${logo()}
<div class="arch-line"></div>
<div class="arch"><img src="${IMG(o.img || 'hero-portrait.webp')}"></div>
<h1 class="h">Haar mit <em>Art.</em></h1>
<p class="sub">Schnitt, Farbe und Pflege für Damen, Herren und Kinder –<br>persönlich beraten, präzise umgesetzt. Mitten in Horgen.</p>
<div class="sep"></div>
${cta(o)}
</div></div>`;
  return page(W, H, B, css, body, o);
}

function frontEditorial(o) {
  const css = base + ctaCSS + `
.ph{position:absolute;inset:0;background:#0F0E0D}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${o.pos || '60% 0%'}}
.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(to bottom,rgba(15,14,13,.7),rgba(15,14,13,0) 26%),linear-gradient(to top,#0F0E0D 0%,#0F0E0D 31%,rgba(15,14,13,.82) 43%,rgba(15,14,13,0) 64%)}
.logo{position:absolute;left:14mm;top:14mm;width:54mm;color:#EDE6DA}
.h{position:absolute;left:13.2mm;bottom:66mm;font:500 50pt/.95 "Cormorant Garamond",serif;letter-spacing:-.01em}
.h em{color:#BDB4A7}
.sub{position:absolute;left:14mm;bottom:52mm;font:400 8pt/1.55 Archivo,sans-serif;color:#BDB4A7}
.rule{position:absolute;left:-${B}mm;right:14mm;bottom:45mm;height:.2mm;background:rgba(237,230,218,.2)}
.cta{position:absolute;left:14mm;right:14mm;bottom:12mm}
`;
  const body = `<div class="bleed dark"><div class="ph"><img src="${IMG(o.img || 'hero-portrait.webp')}"></div><div class="trim">
${logo()}
<h1 class="h">Haar mit<br><em>Art.</em></h1>
<p class="sub">Schnitt, Farbe und Pflege für Damen, Herren und Kinder –<br>persönlich beraten, präzise umgesetzt. Mitten in Horgen.</p>
<div class="rule"></div>
${cta(o)}
</div></div>`;
  return page(W, H, B, css, body, o);
}

// ---------- back ----------
const CATS = [
  ['Damen', [['Waschen, Schneiden, Föhnen', 95, 1], ['Waschen, Schneiden, ohne Föhnen', 75, 1], ['Waschen, Föhnen oder Legen', 45, 1], ['Kopfmassage mit Lotion', 8]]],
  ['Farbe', [['Ansatz färben', 70], ['Ansatz färben, Länge und Spitzen anpassen', 80, 1], ['Balayage', 110, 1, 1], ['Foliensträhnen Oberkopf', 81, 1, 1], ['Foliensträhnen ganzer Kopf', 110, 1, 1], ['Intensivtönung', 55, 1]]],
  ['Pflege', [['Intensive Aufbaukur', 10], ['Leave-in Conditioner', 8]]],
  ['Herren', [['Waschen, Schneiden, Stylen', 42, 1], ['Bart schneiden und rasieren', 18], ['Kopfmassage mit Lotion', 8]]],
  ['Kinder', [['Waschen, Schneiden', 30, 1]]],
  ['Pensionäre', [['Waschen, Schneiden', 25, 0, 0, 'ab 65 Jahren']]],
];
const TEL = `<svg class="tel" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`;
const cat = ([label, items]) => `<section class="cat"><h3>${label}</h3><ul>${items.map(([n, p, from, tel, note]) =>
  `<li${note ? ' class="nt"' : ''}><span class="n">${n}${tel ? TEL : ''}${note ? `<small>${note}</small>` : ''}</span><span class="d"></span><span class="p">${from ? '<i>ab</i> ' : ''}${p}.–</span></li>`).join('')}</ul></section>`;

function back(o = {}) {
  const css = base + `
.in{position:absolute;inset:13mm 14mm 11mm;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:flex-end}
.ey2{font:500 5.6pt/1 Archivo,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#8E7A55;display:flex;align-items:center;gap:2.4mm}
.ey2::before{content:"";width:6mm;height:.18mm;background:rgba(142,122,85,.6)}
.h2{margin-top:3mm;font:500 25pt/1.02 "Cormorant Garamond",serif;letter-spacing:-.005em}
.h2 em{color:#6F675C}
.mini{width:30mm;color:#1B1815;margin-bottom:1.2mm}
.chf{margin-top:7mm;padding-bottom:2.4mm;border-bottom:.2mm solid rgba(27,24,21,.2);display:flex;justify-content:space-between;font:500 5.2pt/1 Archivo,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8E7A55}
.list{margin-top:4.6mm;display:grid;grid-template-columns:1fr 1fr;column-gap:8mm}
.col{display:flex;flex-direction:column;gap:5.4mm}
.cat h3{font:italic 400 13.5pt/1 "Cormorant Garamond",serif;color:#1B1815;margin-bottom:1.8mm}
.cat ul{list-style:none}
.cat li{display:flex;align-items:last baseline;gap:1.4mm;padding:1.12mm 0;font:400 7.3pt/1.3 Archivo,sans-serif;color:#2B2621}
.cat .n{flex:0 1 auto}
.cat li.nt{align-items:first baseline}
.cat .n small{display:block;font-size:5.9pt;color:#8A8277;margin-top:.3mm}
.cat .d{flex:1 1 4mm;min-width:3mm;border-bottom:.22mm dotted rgba(27,24,21,.35);transform:translateY(-.5mm)}
.cat .p{flex:none;font-weight:500;color:#1B1815;font-variant-numeric:tabular-nums;white-space:nowrap}
.cat .p i{font-style:normal;font-weight:400;color:#8A8277;font-size:6.2pt}
.tel{display:inline-block;width:2.5mm;height:2.5mm;margin-left:1.1mm;vertical-align:-.3mm;color:#8E7A55}
.note{margin-top:3.4mm;font:400 5.9pt/1.4 Archivo,sans-serif;color:#8A8277;display:flex;align-items:center;gap:1mm}
.note .tel{margin:0}
.bottom{display:grid;grid-template-columns:1.05fr 1fr auto;column-gap:7mm;padding-top:5.4mm;border-top:.2mm solid rgba(27,24,21,.2)}
.bt{font:500 5.2pt/1 Archivo,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8E7A55;margin-bottom:2.6mm}
.hours{display:grid;grid-template-columns:auto auto;justify-content:start;column-gap:6mm;row-gap:1.05mm;font:400 7pt/1.3 Archivo,sans-serif;color:#2B2621}
.hours dd{font-variant-numeric:tabular-nums;text-align:right}
.hours .x{color:#8A8277}
.addr{font:400 7pt/1.5 Archivo,sans-serif;color:#2B2621}
.addr b{display:block;font:500 11pt/1.1 "Cormorant Garamond",serif;color:#1B1815;margin-bottom:1mm}
.addr .t{display:block;margin-top:1.6mm;font-weight:500;color:#1B1815;letter-spacing:.02em}
.addr small{display:block;margin-top:1.6mm;font-size:5.9pt;line-height:1.45;color:#8A8277}
.qb{width:23mm;text-align:center}
.qb .qr{display:block;width:23mm;height:23mm;color:#14110E}
.qb p{margin-top:2.4mm;font:500 5pt/1.45 Archivo,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#1B1815;white-space:nowrap}
.qb p span{margin-right:-.2em}
.quote{margin:auto 0;padding:5mm 0;text-align:center}
.quote blockquote{font:italic 400 13pt/1.3 "Cormorant Garamond",serif;color:#1B1815;max-width:104mm;margin:0 auto}
.quote figcaption{margin-top:2.8mm;display:flex;justify-content:center;align-items:baseline;gap:1mm;font:400 6.3pt/1 Archivo,sans-serif;color:#6F675C}
.quote figcaption b{font:500 9.5pt/1 "Cormorant Garamond",serif;color:#1B1815;margin-left:.4mm}
.quote figcaption i{width:3.6mm}
.quote .s{display:inline-flex;gap:.35mm;margin-right:1mm;align-self:center}
.quote .s svg{width:2.3mm;height:2.3mm;fill:#B19A6C}
.stars{margin-top:4.6mm;display:flex;gap:5mm;font:400 6.4pt/1 Archivo,sans-serif;color:#6F675C}
.stars b{font:500 9.5pt/1 "Cormorant Garamond",serif;color:#1B1815;margin-right:.8mm}
.stars .s{color:#B19A6C;letter-spacing:.06em;margin-right:1mm}
`;
  const L = [CATS[0], CATS[2], CATS[4], CATS[5]], R = [CATS[1], CATS[3]];
  const body = `<div class="bleed paper"><div class="trim"><div class="in">
<div class="top"><div><p class="ey2">Leistungen &amp; Preise</p><h2 class="h2">Alles auf <em>einen Blick.</em></h2></div>${logo('mini')}</div>
<div class="chf"><span>Preise in CHF</span><span>Online buchbar · 24/7</span></div>
<div class="list"><div class="col">${L.map(cat).join('')}</div><div class="col">${R.map(cat).join('')}
<p class="note">${TEL} Termin nach telefonischer Absprache</p></div></div>
<figure class="quote"><blockquote>«Die erste und einzige Anlaufstelle in der Region Horgen, wenn es um den perfekten Haarschnitt geht!»</blockquote>
<figcaption><span class="s"><svg viewBox="0 0 24 24"><path d="M12 2.8l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.8l-5.8 3.3 1.5-6.4-4.9-4.3 6.5-.6z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2.8l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.8l-5.8 3.3 1.5-6.4-4.9-4.3 6.5-.6z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2.8l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.8l-5.8 3.3 1.5-6.4-4.9-4.3 6.5-.6z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2.8l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.8l-5.8 3.3 1.5-6.4-4.9-4.3 6.5-.6z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2.8l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.8l-5.8 3.3 1.5-6.4-4.9-4.3 6.5-.6z"/></svg></span><b>5,0</b> auf Salonkee<i></i><b>4,9</b> auf Google · über 90 Bewertungen</figcaption></figure>
<div class="bottom">
  <div><p class="bt">Öffnungszeiten</p><dl class="hours">
    <dt>Montag</dt><dd class="x">geschlossen</dd><dt>Di – Mi</dt><dd>9.00 – 18.30</dd><dt>Donnerstag</dt><dd>9.30 – 19.30</dd><dt>Freitag</dt><dd>10.00 – 20.00</dd><dt>Samstag</dt><dd>8.00 – 16.00</dd><dt>Sonntag</dt><dd class="x">geschlossen</dd></dl></div>
  <div><p class="bt">Salon</p><p class="addr"><b>BesArt Hairsalon</b>Neugasse 29<br>8810 Horgen<span class="t">044 725 14 04</span><small>Wenige Schritte vom Bahnhof<br>Horgen Oberdorf · Parkplätze vorhanden</small></p></div>
  <div class="qb">${qr()}<p><span>Online buchen</span></p></div>
</div>
</div></div></div>`;
  return page(W, H, B, css, body, o);
}
module.exports = { W, H, B, front, back };
