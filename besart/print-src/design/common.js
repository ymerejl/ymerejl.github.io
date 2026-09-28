// Shared building blocks for the BesArt print designs (business card + flyer).
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..') + '/';   // besart/ (Bilder)
const P = JSON.parse(fs.readFileSync(__dirname + '/logo/parts.json', 'utf8')).parts;
const SPLIT = JSON.parse(fs.readFileSync(__dirname + '/logo/split.json', 'utf8'));
const QR = JSON.parse(fs.readFileSync(__dirname + '/qr.json', 'utf8'));

const PF = __dirname + '/fonts/';
// static instances of the site's variable fonts (see fonts/), so PDFs embed TrueType instead of Type3
const fontsCSS = [['Cormorant Garamond', 'normal', 'CormorantGaramond', [400, 500, 600]], ['Cormorant Garamond', 'italic', 'CormorantGaramond-Italic', [400, 500]], ['Archivo', 'normal', 'Archivo', [400, 500, 600]]]
  .flatMap(([fam, st, file, ws]) => ws.map(w => `@font-face{font-family:"${fam}";font-style:${st};font-weight:${w};src:url(file://${PF}${file}-${w}-latin.ttf) format("truetype")}`)).join('\n');
const logoPaths = P.map((d, i) => `<path${i === 3 || i === 6 ? ' fill-rule="evenodd"' : ''} d="${d}"/>`).join('');
const logo = (cls = 'logo', fill = 'currentColor') => `<svg class="${cls}" viewBox="0 0 909.3 353" fill="${fill}" aria-hidden="true">${logoPaths}</svg>`;
// scissors-A monogram (A rest + scissors) cropped to its own box
const mono = (cls = 'mono', fill = 'currentColor') => `<svg class="${cls}" viewBox="440 0 190 255" fill="${fill}" aria-hidden="true"><path fill-rule="evenodd" d="${SPLIT.Arest}"/><path fill-rule="evenodd" d="${SPLIT.scissors}"/></svg>`;
const scissors = (cls = 'sc', fill = 'currentColor') => `<svg class="${cls}" viewBox="${SPLIT.sc_bbox[0] - 2} ${SPLIT.sc_bbox[1] - 2} ${SPLIT.sc_bbox[2] - SPLIT.sc_bbox[0] + 4} ${SPLIT.sc_bbox[3] - SPLIT.sc_bbox[1] + 4}" fill="${fill}" aria-hidden="true"><path fill-rule="evenodd" d="${SPLIT.scissors}"/></svg>`;
const qrFrom = (Q, cls = 'qr', fill = 'currentColor') => `<svg class="${cls}" viewBox="0 0 ${Q.n} ${Q.n}" fill="${fill}" shape-rendering="geometricPrecision" aria-label="QR-Code: ${Q.url}"><path d="${Q.d}"/></svg>`;
const qr = (cls = 'qr', fill = 'currentColor') => `<svg class="${cls}" viewBox="0 0 ${QR.n} ${QR.n}" fill="${fill}" shape-rendering="geometricPrecision" aria-label="QR-Code: ${QR.url}"><path d="${QR.d}"/></svg>`;

const page = (w, h, bleed, css, body, opts = {}) => `<!doctype html><html lang="de-CH"><head><meta charset="utf-8"><style>
${fontsCSS}
@page{size:${w + 2 * bleed}mm ${h + 2 * bleed}mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w + 2 * bleed}mm;height:${h + 2 * bleed}mm;overflow:hidden;-webkit-print-color-adjust:exact;print-color-adjust:exact;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;font-kerning:normal}
.bleed{position:relative;width:${w + 2 * bleed}mm;height:${h + 2 * bleed}mm;overflow:hidden}
.trim{position:absolute;left:${bleed}mm;top:${bleed}mm;width:${w}mm;height:${h}mm}
${opts.guides ? `.bleed::after{content:"";position:absolute;left:${bleed}mm;top:${bleed}mm;width:${w}mm;height:${h}mm;outline:.1mm dashed rgba(255,0,120,.8);pointer-events:none;z-index:99}` : ''}
${css}
</style></head><body>${body}</body></html>`;

module.exports = { ROOT, fontsCSS, logo, mono, scissors, qr, qrFrom, page, QR, SPLIT };
