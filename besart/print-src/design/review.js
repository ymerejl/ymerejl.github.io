// Google-Bewertungskarte A6 (105 × 148 mm, +3 mm Beschnitt) als Einleger für den 3D-gedruckten Aufsteller.
// Der Aufsteller verdeckt links/rechts je 5 mm und unten 8 mm – Inhalte bleiben ausserhalb dieser Ränder.
const fs = require('fs');
const { logo, qrFrom, page } = require('./common');
const QRR = JSON.parse(fs.readFileSync(__dirname + '/qr-review.json', 'utf8'));
const W = 105, H = 148, B = 3;
const STAR = '<svg viewBox="0 0 24 24"><path d="M12 2.8l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.8l-5.8 3.3 1.5-6.4-4.9-4.3 6.5-.6z"/></svg>';
const NFC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8.5 8.5a5 5 0 0 1 0 7M11.5 6a8.5 8.5 0 0 1 0 12M14.5 3.5a12 12 0 0 1 0 17M5.5 11a1.5 1.5 0 0 1 0 2"/></svg>';
const CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 8h3l1.6-2.2h6.8L17 8h3v11H4z"/><circle cx="12" cy="13.2" r="3.4"/></svg>';

function front(o = {}) {
  const css = `
.dark{background:#0F0E0D;color:#EDE6DA}
.logo{position:absolute;left:50%;top:11mm;width:50mm;transform:translateX(-50%);color:#EDE6DA}
.ey{position:absolute;left:0;right:0;top:40.5mm;display:flex;justify-content:center;align-items:center;gap:2.4mm;font:500 5.6pt/1 Archivo,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#C7B593}
.ey span{margin-right:-.3em}
.ey::before,.ey::after{content:"";width:6mm;height:.18mm;background:rgba(199,181,147,.55)}
.h{position:absolute;left:0;right:0;top:46.5mm;text-align:center;font:500 21pt/1.02 "Cormorant Garamond",serif;letter-spacing:-.005em}
.h em{font-style:italic;font-weight:400;color:#BDB4A7}
.stars{position:absolute;left:0;right:0;top:66.4mm;display:flex;justify-content:center;gap:1.3mm}
.stars svg{width:3.6mm;height:3.6mm;fill:#C7B593}
.tile{position:absolute;left:50%;top:74mm;width:44mm;height:44mm;margin-left:-22mm;padding:3mm;background:#EEE8DC;border-radius:2mm}
.tile .qr{display:block;width:100%;height:100%;color:#14110E}
.how{position:absolute;left:0;right:0;top:121.6mm;display:flex;justify-content:center;gap:5mm;font:400 6.6pt/1.2 Archivo,sans-serif;color:#BDB4A7}
.how span{display:inline-flex;align-items:center;gap:1.3mm}
.how svg{width:3.4mm;height:3.4mm;color:#C7B593}
.sub{position:absolute;left:0;right:0;top:127.4mm;text-align:center;font:italic 400 9pt/1 "Cormorant Garamond",serif;color:#8A8277}
`;
  const body = `<div class="bleed dark"><div class="trim">
${logo()}
<p class="ey"><span>Google-Bewertung</span></p>
<h1 class="h">Zufrieden mit Ihrem<br><em>neuen Look?</em></h1>
<div class="stars">${STAR.repeat(5)}</div>
<div class="tile">${qrFrom(QRR)}</div>
<p class="how"><span>${CAM}Code scannen</span><span>${NFC}oder Handy auflegen</span></p>
<p class="sub">Dauert 30 Sekunden – herzlichen Dank!</p>
</div></div>`;
  return page(W, H, B, css, body, o);
}
module.exports = { W, H, B, front };
