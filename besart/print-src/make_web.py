# Converts the print renders and mockups into the web images used by the showcase (besart/img/*.webp)
# and copies the print PDFs and 3D files to druckdaten/. Run after design/export.js, design/merge_pdfs.py, mockup/composite.py,
# aufsteller/stand.py and aufsteller/render/make.py.
import os, shutil
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(H, '..', 'img')
jobs = [('design/final/visitenkarte-vorderseite.png', 'print-karte-vorne', 1400, 88), ('design/final/visitenkarte-rueckseite.png', 'print-karte-hinten', 1400, 88),
        ('design/final/flyer-a5-vorderseite.png', 'print-flyer-vorne', 1100, 86), ('design/final/flyer-a5-rueckseite.png', 'print-flyer-hinten', 1100, 88),
        ('mockup/out/mockup-karten-1.png', 'mockup-karten-1', 2048, 84), ('mockup/out/mockup-karten-2.png', 'mockup-karten-2', 2048, 84),
        ('mockup/out/mockup-flyer-1.png', 'mockup-flyer-1', 2048, 84), ('mockup/out/mockup-flyer-2.png', 'mockup-flyer-2', 2048, 84),
        ('design/final/bewertungskarte-a6.png', 'print-bewertungskarte', 1000, 88),
        ('aufsteller/out/mockup-aufsteller-theke.png', 'mockup-aufsteller-1', 2048, 84), ('aufsteller/out/mockup-aufsteller-kasse.png', 'mockup-aufsteller-2', 2048, 84),
        ('aufsteller/out/aufsteller-360.png', 'aufsteller-360', 3840, 80), ('aufsteller/out/aufsteller-360-klein.png', 'aufsteller-360-klein', 2880, 78),
        ('aufsteller/out/aufsteller-ansicht.png', 'aufsteller-ansicht', 800, 86)]
for src, name, w, q in jobs:
    im = Image.open(os.path.join(H, src)).convert('RGB')
    if im.width != w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(IMG, name + '.webp'), 'WEBP', quality=q, method=6); print(name, im.size)
os.makedirs(os.path.join(H, 'druckdaten'), exist_ok=True)
for f in ['BesArt-Visitenkarte-85x55-Druckdaten.pdf', 'BesArt-Flyer-A5-Druckdaten.pdf', 'BesArt-Bewertungskarte-A6-Druckdaten.pdf']:
    shutil.copy(os.path.join(H, 'design/final', f), os.path.join(H, 'druckdaten', f)); print('pdf', f)
for f in ['besart-bewertungsaufsteller.stl', 'besart-bewertungsaufsteller.3mf']:     # 3D-Druck-Dateien
    shutil.copy(os.path.join(H, 'aufsteller', f), os.path.join(H, 'druckdaten', f)); print('3d', f)
