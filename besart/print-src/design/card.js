// Business card 85 × 55 mm (+3 mm bleed): dark front with the logo, ivory back with contact + QR.
const { logo, mono, scissors, qr, page } = require('./common');
const W = 85, H = 55, B = 3;

const base = `
.dark{background:#0F0E0D;color:#EDE6DA}
.paper{background:#EEE8DC;color:#1B1815}
.cap{font-family:Archivo,sans-serif;text-transform:uppercase}
`;

function front(o = {}) {
  const css = base + `
.logo{position:absolute;left:50%;top:${o.logoTop || 46.5}%;width:${o.logoW || 52}mm;height:auto;transform:translate(-50%,-50%)}
.mono{position:absolute;right:-12mm;top:-9mm;height:78mm;width:auto;color:#171513}
.tag{position:absolute;left:0;right:0;bottom:6.2mm;display:flex;justify-content:center;align-items:center;gap:2.6mm;font:500 4.9pt/1 Archivo,sans-serif;letter-spacing:.36em;color:#C7B593;text-transform:uppercase}
.tag span{margin-right:-.36em}
.tag::before,.tag::after{content:"";width:6mm;height:.14mm;background:rgba(199,181,147,.5)}
`;
  const body = `<div class="bleed dark">${o.mono ? mono() : ''}<div class="trim">${logo()}${o.tag === false ? '' : `<div class="tag"><span>${o.tag || 'Coiffeur · Horgen'}</span></div>`}</div></div>`;
  return page(W, H, B, css, body, o);
}

function back(o = {}) {
  const css = base + `
.eyebrow{position:absolute;right:6mm;top:7.6mm;font:500 4.6pt/1 Archivo,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#8E7A55;white-space:nowrap}
.eyebrow span{margin-right:-.28em}
.name{position:absolute;right:5.8mm;top:10.5mm;font:500 15.5pt/1 "Cormorant Garamond",serif;letter-spacing:.005em;color:#1B1815;white-space:nowrap}
.rule{position:absolute;left:-${B}mm;height:.16mm;background:#1B1815;opacity:.55}
.info{position:absolute;left:6.6mm;bottom:6.2mm;display:grid;grid-template-columns:10.4mm auto;row-gap:1.6mm;align-items:baseline}
.info dt{font:600 4.5pt/1 Archivo,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#8E7A55}
.info dd{font:400 6.4pt/1.32 Archivo,sans-serif;letter-spacing:.01em;color:#3A352F}
.info dd.tel{font-weight:500;font-size:7.3pt;color:#1B1815;letter-spacing:.03em}
.qrbox{position:absolute;right:6mm;bottom:6.2mm;width:19mm;text-align:center}
.qr{display:block;width:19mm;height:19mm;color:#1B1815}
.qrcap{margin-top:2.7mm;font:500 4.5pt/1.45 Archivo,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#1B1815;white-space:nowrap}
.qrcap span{margin-right:-.2em}
`;
  const body = `<div class="bleed paper"><div class="trim">
<p class="eyebrow"><span>Inhaber &amp; Coiffeur</span></p>
<p class="name" id="name">Besart Beka</p>
<div class="rule" id="rule"></div>
<dl class="info">
  <dt>Tel</dt><dd class="tel">044 725 14 04</dd>
  <dt>Salon</dt><dd>Neugasse 29, 8810 Horgen</dd>
  <dt>Zeiten</dt><dd>Di–Mi 9–18.30 · Do 9.30–19.30<br>Fr 10–20 · Sa 8–16</dd>
</dl>
<div class="qrbox">${qr()}<p class="qrcap"><span>Termin online</span><br><span>buchen</span></p></div>
</div></div>
<script>
// the rule runs in from the left edge and stops just before the name, sitting on its baseline — like the line into "Hairsalon" in the logo
(async()=>{await document.fonts.ready;const n=document.getElementById('name'),r=document.getElementById('rule'),t=n.parentNode.getBoundingClientRect();
const c=document.createElement('canvas').getContext('2d');c.font=getComputedStyle(n).font;const m=c.measureText('B');
const nb=n.getBoundingClientRect();const base=nb.top+ (nb.height-(m.fontBoundingBoxAscent+m.fontBoundingBoxDescent))/2 + m.fontBoundingBoxAscent;
const px=96/25.4;r.style.top=((base-t.top)/px-0.08)+'mm';r.style.width=((nb.left-t.left)/px+${B}-${o.gap || 2.4})+'mm';document.body.dataset.ready=1})();
</script>`;
  return page(W, H, B, css, body, o);
}
module.exports = { W, H, B, front, back };
