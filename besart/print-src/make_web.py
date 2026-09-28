# Converts the print renders and mockups into the web images used by the showcase (besart/img/*.webp)
# and copies the print PDFs to druckdaten/. Run after design/export.js, design/merge_pdfs.py, mockup/composite.py.
import os, shutil
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(H, '..', 'img')
jobs = [('design/final/visitenkarte-vorderseite.png', 'print-karte-vorne', 1400, 88), ('design/final/visitenkarte-rueckseite.png', 'print-karte-hinten', 1400, 88),
        ('design/final/flyer-a5-vorderseite.png', 'print-flyer-vorne', 1100, 86), ('design/final/flyer-a5-rueckseite.png', 'print-flyer-hinten', 1100, 88),
        ('mockup/out/mockup-karten-1.png', 'mockup-karten-1', 2048, 84), ('mockup/out/mockup-karten-2.png', 'mockup-karten-2', 2048, 84),
        ('mockup/out/mockup-flyer-1.png', 'mockup-flyer-1', 2048, 84), ('mockup/out/mockup-flyer-2.png', 'mockup-flyer-2', 2048, 84)]
for src, name, w, q in jobs:
    im = Image.open(os.path.join(H, src)).convert('RGB')
    if im.width != w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(IMG, name + '.webp'), 'WEBP', quality=q, method=6); print(name, im.size)
os.makedirs(os.path.join(H, 'druckdaten'), exist_ok=True)
for f in ['BesArt-Visitenkarte-85x55-Druckdaten.pdf', 'BesArt-Flyer-A5-Druckdaten.pdf']:
    shutil.copy(os.path.join(H, 'design/final', f), os.path.join(H, 'druckdaten', f)); print('pdf', f)
