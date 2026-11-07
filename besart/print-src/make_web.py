# Converts the print renders and mockups into the web images used by the showcase (besart/img/*.webp)
# and copies the print PDFs and 3D files to druckdaten/. Run after design/export.js, design/merge_pdfs.py, mockup/composite.py,
# aufsteller/stand.py and aufsteller/render/make.py.
import os, shutil
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(H, '..', 'img')
V = 'design/varianten/'; M = 'mockup/out/varianten/'
# Druckvorlagen und Mockups der drei Gold-Varianten A/B/C (A ersetzt die bisherigen Standardbilder)
jobs = [(V + 'karte-A-vorne.png', 'print-karte-vorne', 1400, 88), (V + 'karte-A-hinten.png', 'print-karte-hinten', 1400, 88),
        (V + 'flyer-A-vorne.png', 'print-flyer-vorne', 1100, 86), (V + 'flyer-A-hinten.png', 'print-flyer-hinten', 1100, 88),
        (M + 'mockup-karte-A-1.png', 'mockup-karten-1', 2048, 84), (M + 'mockup-karte-A-2.png', 'mockup-karten-2', 2048, 84),
        (M + 'mockup-flyer-A-1.png', 'mockup-flyer-1', 2048, 84), (M + 'mockup-flyer-A-2.png', 'mockup-flyer-2', 2048, 84)]
for v in 'BC':
    jobs += [(V + f'karte-{v}-vorne.png', f'print-karte-{v}-vorne', 1400, 88), (V + f'karte-{v}-hinten.png', f'print-karte-{v}-hinten', 1400, 88),
             (V + f'flyer-{v}-vorne.png', f'print-flyer-{v}-vorne', 1100, 86),
             (M + f'mockup-karte-{v}-1.png', f'mockup-karten-{v}-1', 2048, 84), (M + f'mockup-karte-{v}-2.png', f'mockup-karten-{v}-2', 2048, 84),
             (M + f'mockup-flyer-{v}-1.png', f'mockup-flyer-{v}-1', 2048, 84), (M + f'mockup-flyer-{v}-2.png', f'mockup-flyer-{v}-2', 2048, 84)]
jobs += [(V + 'flyer-C-hinten.png', 'print-flyer-C-hinten', 1100, 88),   # Flyer B hat die Rückseite von A
        ('design/final/bewertungskarte-a6.png', 'print-bewertungskarte', 1000, 88),
        ('aufsteller/out/mockup-aufsteller-theke.png', 'mockup-aufsteller-1', 2048, 84), ('aufsteller/out/mockup-aufsteller-kasse.png', 'mockup-aufsteller-2', 2048, 84),
        ('aufsteller/out/aufsteller-360.png', 'aufsteller-360', 3840, 80), ('aufsteller/out/aufsteller-360-klein.png', 'aufsteller-360-klein', 2880, 78),
        ('aufsteller/out/aufsteller-ansicht.png', 'aufsteller-ansicht', 800, 86)]
only = __import__('sys').argv[1:]   # optional: nur Bilder, deren Name eines der Wörter enthält
for src, name, w, q in jobs:
    if only and not any(o in name for o in only): continue
    if not os.path.exists(os.path.join(H, src)): print('fehlt', src); continue
    im = Image.open(os.path.join(H, src)).convert('RGB')
    if im.width != w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(IMG, name + '.webp'), 'WEBP', quality=q, method=6); print(name, im.size)
if only: raise SystemExit
os.makedirs(os.path.join(H, 'druckdaten'), exist_ok=True)
for f in ['BesArt-Visitenkarte-85x55-Druckdaten.pdf', 'BesArt-Flyer-A5-Druckdaten.pdf', 'BesArt-Bewertungskarte-A6-Druckdaten.pdf']:
    shutil.copy(os.path.join(H, 'design/final', f), os.path.join(H, 'druckdaten', f)); print('pdf', f)
for f in ['besart-bewertungsaufsteller.stl', 'besart-bewertungsaufsteller.3mf']:     # 3D-Druck-Dateien
    shutil.copy(os.path.join(H, 'aufsteller', f), os.path.join(H, 'druckdaten', f)); print('3d', f)
