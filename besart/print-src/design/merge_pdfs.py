# Merge the per-page PDFs into 2-page print files and set TrimBox/BleedBox (3 mm bleed).
import sys, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.modules['cryptography'] = None   # system cryptography is broken (pyo3 panic); pypdf works without it
from pypdf import PdfWriter, PdfReader
from pypdf.generic import RectangleObject
MM = 72 / 25.4
d = json.load(open('final/_pdfs.json'))
spec = {'card': ('BesArt-Visitenkarte-85x55-Druckdaten.pdf', 85, 55, 'Visitenkarte 85 × 55 mm'), 'flyer': ('BesArt-Flyer-A5-Druckdaten.pdf', 148, 210, 'Flyer A5 148 × 210 mm'),
        'review': ('BesArt-Bewertungskarte-A6-Druckdaten.pdf', 105, 148, 'Google-Bewertungskarte A6 105 × 148 mm')}
for k, files in d.items():
    name, W, H, title = spec[k]; w = PdfWriter()
    for f in files:
        pg = PdfReader(f).pages[0]; ph = float(pg.mediabox.height); top = ph - 3 * MM
        pg.trimbox = RectangleObject([3 * MM, top - H * MM, 3 * MM + W * MM, top])
        pg.bleedbox = RectangleObject([0, top - (H + 3) * MM, (W + 6) * MM, ph])
        w.add_page(pg)
    w.add_metadata({'/Title': 'BesArt Hairsalon – ' + title, '/Subject': 'Druckdaten, 3 mm Anschnitt (TrimBox/BleedBox gesetzt)'})
    w.write('final/' + name); print('wrote', name)
