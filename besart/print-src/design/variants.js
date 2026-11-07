// Drei Varianten je für Visitenkarte und Flyer A5, alle mit Gold (gedacht als Heissfolienprägung, im Druck-PDF als Verlauf).
// Aufbau: die bestehenden Layouts aus card.js / flyer.js werden um Gold-Logo, Gold-Schrift und Farbvarianten ergänzt.
//   A «Noir & Gold»   – das bisherige Design, Logo und Akzente in Gold
//   B «Ivoire»        – Karte hell mit Gold; Flyer als Vollbild mit Herren-Motiv
//   C «Monogramm»     – ganz in Schwarz, grosses Scheren-A, feiner Goldrahmen; Flyer rein typografisch
const card = require('./card');
const flyer = require('./flyer');
const { ROOT, logoPaths, mono, qr, page, SPLIT } = require('./common');

// Folien-Verlauf in den Koordinaten des Logos (viewBox 909 × 353), damit er über alle Buchstaben läuft
const STOPS = `<stop offset="0" stop-color="#8A6A2F"/><stop offset=".22" stop-color="#C9A55C"/><stop offset=".42" stop-color="#F2E1A4"/><stop offset=".56" stop-color="#B8893E"/><stop offset=".78" stop-color="#E6CB86"/><stop offset="1" stop-color="#916E31"/>`;
const STOPS_DEEP = `<stop offset="0" stop-color="#6E5221"/><stop offset=".25" stop-color="#A9853F"/><stop offset=".45" stop-color="#D8BC77"/><stop offset=".6" stop-color="#9A7232"/><stop offset=".8" stop-color="#C6A35C"/><stop offset="1" stop-color="#76582A"/>`;
const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="au" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="909" y2="353">${STOPS}</linearGradient>
<linearGradient id="auDeep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="909" y2="353">${STOPS_DEEP}</linearGradient>
<linearGradient id="auMono" gradientUnits="userSpaceOnUse" x1="440" y1="0" x2="630" y2="255">${STOPS}</linearGradient>
</defs></svg>`;
const goldLogo = (cls = 'logo', id = 'au') => `<svg class="${cls}" viewBox="0 0 909.3 353" fill="url(#${id})" aria-hidden="true">${logoPaths}</svg>`;
const goldMono = (cls = 'mono') => `<svg class="${cls}" viewBox="440 0 190 255" fill="url(#auMono)" aria-hidden="true"><path fill-rule="evenodd" d="${SPLIT.Arest}"/><path fill-rule="evenodd" d="${SPLIT.scissors}"/></svg>`;
const AU = `linear-gradient(115deg,#8A6A2F 0%,#C9A55C 24%,#F2E1A4 42%,#B8893E 58%,#E6CB86 80%,#916E31 100%)`;
const AU_DEEP = `linear-gradient(115deg,#6E5221 0%,#A9853F 25%,#D8BC77 45%,#9A7232 62%,#C6A35C 82%,#76582A 100%)`;
const goldCSS = `
.au{background:${AU};-webkit-background-clip:text;background-clip:text;color:transparent!important}
.au-deep{background:${AU_DEEP};-webkit-background-clip:text;background-clip:text;color:transparent!important}
`;

// HTML eines bestehenden Layouts nehmen: Logo vergolden, Defs einsetzen, CSS ergänzen
function gild(html, { css = '', logoId = 'au', swapLogo = true } = {}) {
  let h = html.replace('</style>', goldCSS + css + '\n</style>').replace('<body>', '<body>' + defs);
  if (swapLogo) h = h.replace(/<svg class="(logo|mini)" viewBox="0 0 909\.3 353" fill="currentColor"/g, (m, c) => `<svg class="${c}" viewBox="0 0 909.3 353" fill="url(#${c === 'mini' && logoId === 'au' ? 'auDeep' : logoId})"`);
  return h;
}
const em = (h, cls = 'au') => h.replace(/<em>Art\.<\/em>/g, `<em class="${cls}">Art.</em>`);

/* ---------------- Visitenkarten ---------------- */
const cardA = {
  name: 'Noir & Gold',
  front: o => gild(card.front(o), { css: `.tag{color:#C9A55C}.tag::before,.tag::after{background:linear-gradient(90deg,rgba(201,165,92,0),#C9A55C)}.tag::after{transform:scaleX(-1)}` }),
  back: o => gild(card.back(o), { css: `.eyebrow,.info dt{color:#9C7A3C}.rule{background:${AU_DEEP};opacity:1;height:.22mm}` }),
};
const cardB = {
  name: 'Ivoire',
  front: o => gild(card.front(o).replace('<div class="bleed dark">', '<div class="bleed paper">'), { logoId: 'auDeep',
    css: `.paper{background:#F1EBE0}.tag{color:#6E5A3A}.tag::before,.tag::after{background:rgba(110,90,58,.45)}` }),
  back: o => gild(card.back(o).replace('<div class="bleed paper">', '<div class="bleed dark">'), {
    css: `.dark{background:#0F0E0D}.eyebrow,.info dt{color:#C9A55C}.name{color:#EDE6DA}.rule{background:${AU};opacity:1;height:.22mm}
.info dd{color:#BDB4A7}.info dd.tel{color:#EDE6DA}.qrbox{right:5.5mm}.qr{color:#14110E;background:#EEE8DC;padding:1.4mm;width:20mm;height:20mm;border-radius:.8mm}.qrcap{color:#C9A55C}` }),
};
// C: komplett eigenes Layout
const B = card.B, W = card.W, H = card.H;
const frame = `.frame{position:absolute;inset:3.6mm;border:.2mm solid rgba(201,165,92,.75)}
.frame::before,.frame::after{content:"";position:absolute;width:5mm;height:5mm;border:.2mm solid #C9A55C}
.frame::before{left:-1.2mm;top:-1.2mm;border-right:0;border-bottom:0}.frame::after{right:-1.2mm;bottom:-1.2mm;border-left:0;border-top:0}`;
const cardC = {
  name: 'Monogramm',
  front: (o = {}) => page(W, H, B, goldCSS + frame + `
.dark{background:#0E0D0C;color:#EDE6DA}
.mono{position:absolute;left:50%;top:7.6mm;height:29mm;width:auto;transform:translateX(-50%)}
.wm{position:absolute;left:0;right:0;top:39.6mm;text-align:center;font:500 7.2pt/1 Archivo,sans-serif;letter-spacing:.62em;text-transform:uppercase}
.wm span{margin-right:-.62em}
.sub{position:absolute;left:0;right:0;top:45.2mm;text-align:center;font:italic 400 7.4pt/1 "Cormorant Garamond",serif;letter-spacing:.06em;color:#9A9083}`,
    `<div class="bleed dark">${defs}<div class="trim"><div class="frame"></div>${goldMono()}<p class="wm au"><span>Besart</span></p><p class="sub">Hairsalon · Horgen</p></div></div>`, o),
  back: (o = {}) => page(W, H, B, goldCSS + frame + `
.dark{background:#0E0D0C;color:#EDE6DA}
.logo{position:absolute;left:8mm;top:8.4mm;width:30mm}
.who{position:absolute;right:8mm;top:8.6mm;text-align:right}
.who p{font:500 4.4pt/1 Archivo,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#C9A55C;margin-right:-.28em}
.who h1{margin-top:1.6mm;font:500 13.5pt/1 "Cormorant Garamond",serif;color:#EDE6DA;white-space:nowrap}
.info{position:absolute;left:8mm;bottom:8mm;display:grid;grid-template-columns:9.6mm auto;row-gap:1.45mm;align-items:baseline}
.info dt{font:600 4.3pt/1 Archivo,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#C9A55C}
.info dd{font:400 6.2pt/1.32 Archivo,sans-serif;color:#BDB4A7}
.info dd.tel{font-weight:500;font-size:7pt;color:#EDE6DA;letter-spacing:.03em}
.qb{position:absolute;right:8mm;bottom:8mm;width:18mm;text-align:center}
.qb .qr{display:block;width:18mm;height:18mm;padding:1.3mm;background:#EEE8DC;border-radius:.7mm;color:#14110E}
.qb p{margin-top:1.8mm;font:500 4.2pt/1.4 Archivo,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#C9A55C;white-space:nowrap}`,
    `<div class="bleed dark">${defs}<div class="trim"><div class="frame"></div>${goldLogo()}
<div class="who"><p>Inhaber &amp; Coiffeur</p><h1>Besart Beka</h1></div>
<dl class="info"><dt>Tel</dt><dd class="tel">044 725 14 04</dd><dt>Salon</dt><dd>Neugasse 29, 8810 Horgen</dd><dt>Zeiten</dt><dd>Di–Mi 9–18.30 · Do 9.30–19.30<br>Fr 10–20 · Sa 8–16</dd></dl>
<div class="qb">${qr()}<p>Termin online</p></div></div></div>`, o),
};

/* ---------------- Flyer A5 ---------------- */
const ctaGold = `.ey{color:#C9A55C}.ey::before{background:linear-gradient(90deg,rgba(201,165,92,0),#C9A55C)}`;
const flyerBackGold = o => gild(flyer.back(o), { css: `.ey2,.chf,.bt{color:#9C7A3C}.ey2::before{background:linear-gradient(90deg,rgba(156,122,60,0),#9C7A3C)}
.cat h3{background:${AU_DEEP};-webkit-background-clip:text;background-clip:text;color:transparent}.quote .s svg{fill:#B8893E}.tel{color:#9C7A3C}` });
const flyerBackDark = o => gild(flyer.back(o).replace('<div class="bleed paper">', '<div class="bleed dark">'), { css: `
.dark{background:#0E0D0C}.ey2,.chf,.bt{color:#C9A55C}.ey2::before{background:#C9A55C}.h2{color:#EDE6DA}.h2 em{color:#BDB4A7}
.chf,.bottom{border-color:rgba(237,230,218,.16)!important}
.cat h3{background:${AU};-webkit-background-clip:text;background-clip:text;color:transparent}
.cat li{color:#CFC6B8}.cat .p{color:#EDE6DA}.cat .p i,.cat .n small,.note{color:#8A8277}.cat .d{border-color:rgba(237,230,218,.25)}
.quote blockquote,.quote figcaption b,.addr b{color:#EDE6DA}.quote figcaption,.addr small{color:#8A8277}.quote .s svg{fill:#C9A55C}
.hours,.addr{color:#CFC6B8}.addr .t{color:#EDE6DA}.tel{color:#C9A55C}
.qb .qr{color:#14110E;background:#EEE8DC;padding:1.6mm;border-radius:1mm}.qb p{color:#C9A55C}`, logoId: 'au' });

const flyerA = {
  name: 'Bogen', back: flyerBackGold,
  front: o => gild(em(flyer.front({ ...o, v: 'arch' })), { css: ctaGold + `.arch-line{border-color:rgba(201,165,92,.6)}.sep{background:${AU}}.ch em{background:${AU};-webkit-background-clip:text;background-clip:text;color:transparent}` }),
};
const flyerB = {
  name: 'Vollbild', back: flyerBackGold,
  front: o => gild(em(flyer.front({ ...o, v: 'editorial', img: o.img || 'look-sidepart.webp', pos: o.pos || '50% 18%' })), { css: ctaGold + `.rule{background:linear-gradient(90deg,rgba(201,165,92,.0),rgba(201,165,92,.7))}.ch em{background:${AU};-webkit-background-clip:text;background-clip:text;color:transparent}` }),
};
const FH = flyer.H, FW = flyer.W, FB = flyer.B;
const flyerC = {
  name: 'Typografie', back: flyerBackDark,
  front: (o = {}) => page(FW, FH, FB, goldCSS + `
.dark{background:#0E0D0C;color:#EDE6DA}
.mono{position:absolute;right:-26mm;top:42mm;height:190mm;width:auto;opacity:.09}
.logo{position:absolute;left:14mm;top:15mm;width:46mm}
.frame{position:absolute;inset:7mm;border:.2mm solid rgba(201,165,92,.45)}
.h{position:absolute;left:13mm;top:50mm;font:500 68pt/.86 "Cormorant Garamond",serif;letter-spacing:-.015em}
.h em{font-style:italic;font-weight:400;display:block;margin-left:8mm}
.lede{position:absolute;left:14mm;top:127mm;width:96mm;font:400 8.2pt/1.6 Archivo,sans-serif;color:#BDB4A7}
.grid{position:absolute;left:14mm;right:14mm;top:146mm;display:grid;grid-template-columns:repeat(4,1fr);border-top:.2mm solid rgba(237,230,218,.16);border-bottom:.2mm solid rgba(237,230,218,.16)}
.grid div{padding:3.4mm 0 3.6mm;text-align:center}
.grid div+div{border-left:.2mm solid rgba(237,230,218,.12)}
.grid b{display:block;font:italic 400 12pt/1 "Cormorant Garamond",serif}
.grid span{display:block;margin-top:1.6mm;font:400 6.4pt/1 Archivo,sans-serif;color:#9A9083}
.cta{position:absolute;left:14mm;right:14mm;bottom:15mm;display:flex;align-items:center;gap:6mm}
.qt{flex:none;width:24mm;height:24mm;padding:2.3mm;background:#EEE8DC;border-radius:1.4mm}.qt .qr{display:block;width:100%;height:100%;color:#14110E}
.ey{font:500 5.6pt/1 Archivo,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#C9A55C}
.ch{margin-top:2.4mm;font:500 18pt/1 "Cormorant Garamond",serif}
.cs{margin-top:2.2mm;font:400 7.2pt/1.5 Archivo,sans-serif;color:#BDB4A7}.cs b{color:#EDE6DA;font-weight:500}`,
    `<div class="bleed dark">${defs}${goldMono()}<div class="trim"><div class="frame"></div>${goldLogo()}
<h1 class="h">Haar<br>mit <em class="au">Art.</em></h1>
<p class="lede">Schnitt, Farbe, Pflege und Barber – für Damen, Herren und Kinder. Persönlich beraten, präzise umgesetzt, mitten in Horgen.</p>
<div class="grid"><div><b class="au">Damen</b><span>ab CHF 45.–</span></div><div><b class="au">Herren</b><span>ab CHF 42.–</span></div><div><b class="au">Farbe</b><span>ab CHF 55.–</span></div><div><b class="au">Kinder</b><span>ab CHF 30.–</span></div></div>
<div class="cta"><div class="qt">${qr()}</div><div><p class="ey">Online-Termin</p><p class="ch">Jetzt Termin <em class="au">buchen.</em></p><p class="cs">Code scannen oder anrufen: <b>044 725 14 04</b></p></div></div>
</div></div>`, o),
};

module.exports = { cards: { A: cardA, B: cardB, C: cardC }, flyers: { A: flyerA, B: flyerB, C: flyerC }, card, flyer };
