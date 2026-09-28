# BesArt · Visitenkarte, Flyer & Bewertungsaufsteller (Quellen)

Druckdesigns, 3D-Modell und Mockups für das Print-Paket (versteckt hinter „Weiter“ im Footer der Vorschau).

- `druckdaten/` – fertige Druck-PDFs: Visitenkarte 85 × 55 mm und Flyer A5 (je Vorder- und Rückseite) sowie die Bewertungskarte A6, 3 mm Beschnitt (TrimBox/BleedBox gesetzt), Schriften eingebettet; dazu der Aufsteller als STL und 3MF für den 3D-Drucker.
- `design/` – Layouts als HTML/CSS (`card.js`, `flyer.js`, `review.js`), Logo-Vektoren, statische Schriftschnitte (Cormorant Garamond, Archivo · SIL OFL), QR-Codes (`qr.json` → Buchung, `qr-review.json` → Google-Bewertung).
- `mockup/` – KI-Szenen (`szenen/`) und die Montage, die das exakte Druckdesign perspektivisch und entlang der Papierkanten einsetzt (Licht, Schatten und Papierstruktur aus der Szene).
- `aufsteller/` – Google-Bewertungsaufsteller: `stand.py` erzeugt das 3D-Modell (STL/3MF), `render/` rendert es mit three.js – 360°-Ansicht und Mockups, bei denen das exakte Modell mit der eingemessenen Kamera in leere KI-Szenen (`szenen/`) gesetzt wird.

## Ändern und neu erzeugen

Benötigt Node mit Playwright/Chromium sowie Python mit `segno`, `pypdf`, `opencv-python`, `scipy`, `pillow` – für den Aufsteller zusätzlich `trimesh`, `manifold3d`, `shapely` und `npm install` in `aufsteller/render/`.

```sh
# 1. optional: QR-Ziel ändern (z. B. auf die finale Domain)
python3 design/qrstyle.py "https://example.ch/?termin" 0 0 0 design/qr.json

# 2. Druckdesigns rendern (PNG + PDF) und PDFs zusammenführen
node design/export.js && python3 design/merge_pdfs.py

# 3. Mockups neu montieren
python3 mockup/composite.py

# 4. Aufsteller: 3D-Modell, dann 360°-Ansicht und Mockups rendern
python3 aufsteller/stand.py && python3 aufsteller/render/make.py

# 5. Web-Bilder (besart/img/print-*.webp, mockup-*.webp, aufsteller-*.webp) und druckdaten/ aktualisieren
python3 make_web.py
```

Der QR-Code führt aktuell auf `https://ymerejl.github.io/besart/?termin` – die Seite öffnet dann ohne Intro direkt die Terminbuchung.

Der QR-Code der Bewertungskarte führt direkt ins Bewertungsfenster von BesArt auf Google:
`https://search.google.com/local/writereview?placeid=ChIJfddQWWKpmkcRUhmdheHC2qQ` (Place-ID aus dem Google-Maps-Eintrag).

## Aufsteller drucken

- **Material:** PLA matt schwarz, 0,2 mm Schichthöhe, 3 Wände, 15 % Infill; stehend drucken (Sockel auf dem Bett), keine Stützen nötig.
- **Karte:** A6 (105 × 148 mm) wird von oben in den Schlitz geschoben; der Rahmen deckt seitlich 5 mm und unten 8 mm ab, oben ragt die Karte 6 mm heraus.
- **NFC:** Sticker NTAG213 oder NTAG215, Ø 25 mm, hinten in die runde Mulde kleben (liegt genau hinter dem QR-Code). Mit einer App wie „NFC Tools“ die Bewertungs-URL als Link beschreiben und den Tag danach sperren.
