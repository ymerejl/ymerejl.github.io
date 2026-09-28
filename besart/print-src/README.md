# BesArt · Visitenkarte & Flyer (Quellen)

Druckdesigns und Mockups für das Print-Paket (versteckt hinter „Weiter“ im Footer der Vorschau).

- `druckdaten/` – fertige Druck-PDFs: Visitenkarte 85 × 55 mm und Flyer A5, je Vorder- und Rückseite, 3 mm Beschnitt (TrimBox/BleedBox gesetzt), Schriften eingebettet.
- `design/` – Layouts als HTML/CSS (`card.js`, `flyer.js`), Logo-Vektoren, statische Schriftschnitte (Cormorant Garamond, Archivo · SIL OFL), QR-Code.
- `mockup/` – KI-Szenen (`szenen/`) und die Montage, die das exakte Druckdesign perspektivisch und entlang der Papierkanten einsetzt (Licht, Schatten und Papierstruktur aus der Szene).

## Ändern und neu erzeugen

Benötigt Node mit Playwright/Chromium sowie Python mit `segno`, `pypdf`, `opencv-python`, `scipy`, `pillow`.

```sh
# 1. optional: QR-Ziel ändern (z. B. auf die finale Domain)
python3 design/qrstyle.py "https://example.ch/?termin" 0 0 0 design/qr.json

# 2. Druckdesigns rendern (PNG + PDF) und PDFs zusammenführen
node design/export.js && python3 design/merge_pdfs.py

# 3. Mockups neu montieren
python3 mockup/composite.py

# 4. Web-Bilder (besart/img/print-*.webp, mockup-*.webp) und druckdaten/ aktualisieren
python3 make_web.py
```

Der QR-Code führt aktuell auf `https://ymerejl.github.io/besart/?termin` – die Seite öffnet dann ohne Intro direkt die Terminbuchung.
