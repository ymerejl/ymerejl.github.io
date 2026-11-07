# 06 – Preisvergleich Herren / Barber: Horgen, Oberrieden, Wädenswil (inkl. Au ZH)

Stand: Abruf 2026-11-07. Rohdaten: `preise-herren.csv` (gleicher Ordner, eine Zeile pro Preis, 93 Zeilen).

## Kurzfazit

- **58 Konkurrenz-Salons** im Kerngebiet erfasst (Horgen 21, Wädenswil 28, Oberrieden 7, Au ZH 2; BesArt nicht mitgezählt). Online-Preise waren nur für **5 Salons mit 23 Preisen** direkt abrufbar (Treatwell: DD-Barber, STB Atelier, Beauty Werkstatt; Salonkee: Timodella, EH Hairlounge). Bei den übrigen 53 Salons sind die Preise **nicht abrufbar**: Die eigenen Websites sind im Netz dieser Sitzung gesperrt, auf local.ch stehen keine Preise. Zum Vergleich kommen 3 Umland-Salons (Thalwil, Kilchberg, Adliswil) mit 11 Preisen dazu, die separat ausgewiesen sind.
- **Medianwerte im Kerngebiet:** Herren Waschen+Schneiden **CHF 59.–** (n=5, Spanne 40–85), Herrenschnitt ohne Waschen **CHF 58.–** (n=3, 39–75), Bart trimmen/formen **CHF 41.–** (n=4, 20–120), Schnitt+Bart **CHF 80.–** (n=3, 65–95), Kinder/Jugend **CHF 45.–** (n=8, 35–60). Für Maschinenschnitt, Fade, Nassrasur und Pensionäre gibt es im Kerngebiet **keine** direkt abrufbaren Preise.
- **BesArt liegt deutlich unten im Markt:** «Waschen, Schneiden, Stylen» ab CHF 42.– liegt etwa beim 20. Perzentil, nur Beauty Werkstatt ist mit CHF 40.– günstiger. «Bart schneiden und rasieren» für CHF 18.– und Kinder ab CHF 30.– sind **günstiger als jeder erfasste Konkurrent** (Minimum CHF 20.– bzw. CHF 35.–).
- Die BesArt-Preise auf Salonkee am 2026-11-07 stimmen **1:1** mit dem Block in `index.html` überein. Eine Abweichung gibt es nur bei den Bewertungen: Salonkee zeigt **26 Bewertungen** (25× 5 Sterne, 1× 4 Sterne), nicht «25 Fünf-Sterne-Bewertungen».
- **Teuerung:** Der LIK lag im September 2026 bei +1.0 % gegenüber dem Vorjahr (Wert aus einem Suchergebnis-Snippet, BFS-Seite nicht abrufbar). Die Teuerung allein erklärt also nur rund CHF 0.40 Aufschlag auf CHF 42.–. Eine Erhöhung lässt sich vor allem mit dem **Abstand zum Markt** begründen.
- **Empfehlung Januar 2027 (mittlere Variante):** Herren W+S+Stylen **ab CHF 48.–**, Bart **CHF 25.–**, Kinder bis 12 **ab CHF 35.–**, Pensionäre **CHF 28.–**, Kopfmassage **CHF 10.–**. Dazu neu: Herrenschnitt ohne Waschen **CHF 42.–**, Maschinenschnitt **CHF 32.–**, Schnitt+Bart-Kombi **CHF 68.–** und Jugendliche 13–16 **CHF 40.–**. BesArt bliebe damit unter dem Marktmedian (ca. 20.–40. Perzentil) und günstiger als die grossen Barber in Horgen (DD-Barber, STB).
- **Datenlage ehrlich:** Die Stichprobe ist klein (n=1–8 je Leistung). Treatwell zeigt pro Salon nur bis zu 3 Leistungen je Suchliste. Die Werte sind deshalb Richtwerte, keine vollständige Preisliste des Marktes.

## Vorgehen und Erreichbarkeit der Quellen

| Quelle | Ergebnis |
|---|---|
| local.ch (Suche `/de/q/<Ort>/Coiffeur`, `/Barbershop`, `/Barbier`, per curl) | erreichbar, Hauptquelle für die Salonliste (Name, Adresse, Website). Die Detailseiten (`/de/d/<id>`) enthalten **keine Preise**. Ausnahme: GIDOR-FAQ mit STUcard-Rabatt. In Playwright lieferte local.ch «403 Forbidden», per curl ging es. |
| search.ch | **nicht abrufbar** (Verbindung vom Proxy abgelehnt) |
| Salonkee (`/search/friseure/<ort>`, `/search/barbiere-barbershops/<ort>`, Salonprofile) | erreichbar. Im Kerngebiet sind nur **BesArt, Intercoiffure Timodella (Horgen) und EH Hairlounge (Wädenswil)** auf Salonkee. Die Profile wurden mit Playwright Kategorie für Kategorie angeklickt. Salonkee zeigt keine Dauer. |
| Treatwell (Suchlisten `/orte/behandlung-…/angebot-typ-lokal/in-<ort>-ch`) | Die Suchlisten sind erreichbar. In Horgen gibt es 3 Salons (DD-Barber, STB Atelier, Beauty Werkstatt), in Wädenswil, Oberrieden und Au ZH **keine Treffer**. Die Salon-Profilseiten (`/ort/<slug>/`) liefern eine leere Antwort (Bot-Schutz) und sind damit **nicht abrufbar**. Ausgewertet sind deshalb nur die je bis zu 3 Leistungen pro Salon, die die Suchlisten «Herrenhaarschnitt», «Bart trimmen & rasieren», «Kinderhaarschnitt» und «Coiffeure» anzeigen. |
| Booksy (`booksy.com/de-ch/…`) | leitet auf `booksy.com/de-us` um. Booksy hat offenbar keinen Schweizer Marktplatz, deshalb gab es keine Treffer. |
| Fresha (fresha.com) | **nicht abrufbar** (Proxy). Laut Suchergebnis-Snippets sind «Wolf Barbershop» (Seestrasse 158) und «Hood Barber 32» (Dorfgasse 14) dort gelistet. Ein Snippet nennt für Hood Barber 32 allerdings eine Wetzikoner Adresse, das ist nicht bestätigt. |
| Google-Suche | nur Captcha-Seite («ungewöhnlicher Datenverkehr»), also **nicht abrufbar** |
| Eigene Websites der Salons (23 Domains geprüft, z. B. kunzcoiffeur.ch, gidor.ch, schnittpunkthorgen.ch) | alle **nicht abrufbar** (Proxy). Gezielte WebSearch-Abfragen lieferten keine Preise dieser Websites. |
| WebSearch | Es kamen nur zwei Preis-Snippets zum Kerngebiet: DD-Barber «Maschinenhaarschnitt CHF 32» und GIDOR «Herren statt Fr. 44.50». Beide stehen in der CSV, sind gekennzeichnet und **nicht in der Statistik**. |

**Normalisierung (Kategorien in der CSV):**
- Waschen+Schneiden: «Waschen, Schneiden & Föhnen/Styling».
- Herrenschnitt: Schnitt ohne Waschen, also «Haarschnitt», «trocken» oder «Schneiden, Föhnen».
- Bart trimmen/formen: alle Bartleistungen ohne Haarschnitt, inkl. «Trimmen, Rasieren & Hot Towel», weil das der BesArt-Leistung «Bart schneiden und rasieren» entspricht. Eine reine Nassrasur war nirgends separat ausgeschrieben.
- Schnitt+Bart: Kombi-Angebote.
- Kinder/Jugend: Kinder- und Knabenpreise. Mädchen- und Studentenpreise sind nicht erfasst.
- «ab»-Preise: Der Originaltext enthält «(ab)» bzw. «Ab», der Preis steht als Zahl in der CSV.
- Nicht in den normalisierten Kategorien enthalten sind Konturenschnitt/Line-Up (DD-Barber CHF 35.–, EH Konturen CHF 25.–), Bart färben (DD CHF 15.–, Timodella CHF 60.–), Kopfmassage (EH CHF 10.–) und Studententarife (Timodella CHF 65.–/70.–). Diese Werte stehen nur hier im Text.

## Erfasste Salons mit Preisen (Kerngebiet)

| Salon | Ort / Adresse | Quelle | Bewertungen (Plattform) | erfasste Herren-Preise |
|---|---|---|---|---|
| DD-Barber | Tödistrasse 62, 8810 Horgen | Treatwell-Suchlisten Horgen | 4.9 / 1243 (Treatwell) | W+S+Föhnen 59.– (35 Min.); Haarschnitt+Bart+Hot Towel 95.– (1 Std.); Bart trimmen+rasieren+Hot Towel 47.– (30 Min.); Kinder bis 12 40.–; Konturenschnitt 35.– |
| STB Atelier Hair & Tattoo | Horgen (Seestrasse 149 laut Snippet, nicht bestätigt) | Treatwell-Suchlisten Horgen/Thalwil | 5.0 / 1546 (Treatwell) | Herren-Haarschnitt 39.– (45 Min.); Haircut+Shampoo+Styling ab 51.–; Haarschnitt+Bart 65.–; Haarschnitt+kurzer Bart+Hot Towel 80.–; Full Beard ab 35.–; Kinder bis 10 ab 35.– |
| Beauty Werkstatt – Hair by Marina | Einsiedlerstrasse 180, 8810 Horgen | Treatwell-Suchlisten Horgen | 4.9 / 240 (Treatwell) | Herren W+S+Föhnen 40.– (45 Min.); Kinder W+S 35.–; Kinder W+S+Föhnen 45.– |
| Intercoiffure Timodella Hairstyling by Gioia | Seestrasse 163, 8810 Horgen | salonkee.ch/salon/intercoiffure-timodella-hairstyling-by-gioia | 15 (Salonkee) | Herren W+S+Föhnen 85.–; Haarschnitt trocken 75.–; Bart (Messer, Gesichtsmassage, Aftercare) 120.–; Kinder bis 12 60.–; Kinder trocken 55.–; Studenten 70.–/65.– |
| EH Hairlounge | Florhofstrasse 25, 8820 Wädenswil | salonkee.ch/salon/eh-hairlounge | 92 (Salonkee) | Herren W+S+Föhnen 61.–; Schneiden+Föhnen 58.–; Bart Cut 20.–; Konturen 25.–; Kopfmassage 10.–; Knaben bis 13 45.–; Knaben ab 14 55.– |

**Umland-Referenz** (nicht im Kerngebiet, nur zur Einordnung, Treatwell-Suchlisten):
- FL Barberia Leone, Thalwil (4.9 / 1948): Classic Haircut (W+S) 40.–, Skin Fade 42.–, nur Maschine 25.–, Full Beard 30.–, Bartkontur 15.–, Schnitt+Bart 70.–, Kinder bis 10 ab 27.–
- Lena HairAffair, Kilchberg (4.8 / 52): Herren-Haarschnitt 48.–, W+S+Föhnen 65.–
- Avvera Hair Academy, Adliswil (4.9 / 9): W+S+Föhnen 65.–, Maschinenhaarschnitt 45.–

Treatwell-Suchlisten mit «in der Nähe von Kilchberg/Adliswil» zeigen auch Zürcher und Küsnachter Salons. Diese wurden bewusst **nicht** übernommen.

## Auswertung Min / Median / Max

n Preise = Anzahl Preispunkte, n Salons = Anzahl Salons. Hat ein Salon mehrere Varianten (z. B. Kinder W+S und Kinder W+S+Föhnen), zählt jede Variante als eigener Preispunkt. «ab»-Preise sind mit ihrem Mindestwert eingerechnet.

**A) Kerngebiet Horgen / Oberrieden / Wädenswil / Au ZH (ohne BesArt, ohne Snippet-Werte)**

| Leistung | Gruppe | n Preise | n Salons | Min | Median | Max |
|---|---|---:|---:|---:|---:|---:|
| Herrenschnitt | Horgen | 2 | 2 | CHF 39.– | CHF 57.– | CHF 75.– |
| Herrenschnitt | Wädenswil | 1 | 1 | CHF 58.– | CHF 58.– | CHF 58.– |
| Herrenschnitt | gesamt | 3 | 3 | CHF 39.– | CHF 58.– | CHF 75.– |
| Waschen+Schneiden | Horgen | 4 | 4 | CHF 40.– | CHF 55.– | CHF 85.– |
| Waschen+Schneiden | Wädenswil | 1 | 1 | CHF 61.– | CHF 61.– | CHF 61.– |
| Waschen+Schneiden | gesamt | 5 | 5 | CHF 40.– | CHF 59.– | CHF 85.– |
| Maschinenschnitt | gesamt | 0 | 0 | – | – | – |
| Fade/Skin Fade | gesamt | 0 | 0 | – | – | – |
| Bart trimmen/formen | Horgen | 3 | 3 | CHF 35.– | CHF 47.– | CHF 120.– |
| Bart trimmen/formen | Wädenswil | 1 | 1 | CHF 20.– | CHF 20.– | CHF 20.– |
| Bart trimmen/formen | gesamt | 4 | 4 | CHF 20.– | CHF 41.– | CHF 120.– |
| Bart rasieren | gesamt | 0 | 0 | – | – | – |
| Schnitt+Bart | Horgen | 3 | 2 | CHF 65.– | CHF 80.– | CHF 95.– |
| Schnitt+Bart | gesamt | 3 | 2 | CHF 65.– | CHF 80.– | CHF 95.– |
| Kinder/Jugend | Horgen | 6 | 4 | CHF 35.– | CHF 42.50 | CHF 60.– |
| Kinder/Jugend | Wädenswil | 2 | 1 | CHF 45.– | CHF 50.– | CHF 55.– |
| Kinder/Jugend | gesamt | 8 | 5 | CHF 35.– | CHF 45.– | CHF 60.– |
| Pensionäre | gesamt | 0 | 0 | – | – | – |

Für Oberrieden und Au ZH gibt es keine abrufbaren Preise (n=0 in allen Leistungen). Ohne eigene Zeile sind Ort-Leistungs-Kombinationen mit n=0.

**B) Kerngebiet + Umland-Referenz Thalwil / Kilchberg / Adliswil (ohne BesArt, ohne Snippet-Werte)**

| Leistung | Gruppe | n Preise | n Salons | Min | Median | Max |
|---|---|---:|---:|---:|---:|---:|
| Herrenschnitt | Kilchberg | 1 | 1 | CHF 48.– | CHF 48.– | CHF 48.– |
| Herrenschnitt | gesamt | 4 | 4 | CHF 39.– | CHF 53.– | CHF 75.– |
| Waschen+Schneiden | Thalwil | 1 | 1 | CHF 40.– | CHF 40.– | CHF 40.– |
| Waschen+Schneiden | Kilchberg | 1 | 1 | CHF 65.– | CHF 65.– | CHF 65.– |
| Waschen+Schneiden | Adliswil | 1 | 1 | CHF 65.– | CHF 65.– | CHF 65.– |
| Waschen+Schneiden | gesamt | 8 | 8 | CHF 40.– | CHF 60.– | CHF 85.– |
| Maschinenschnitt | Thalwil | 1 | 1 | CHF 25.– | CHF 25.– | CHF 25.– |
| Maschinenschnitt | Adliswil | 1 | 1 | CHF 45.– | CHF 45.– | CHF 45.– |
| Maschinenschnitt | gesamt | 2 | 2 | CHF 25.– | CHF 35.– | CHF 45.– |
| Fade/Skin Fade | Thalwil | 1 | 1 | CHF 42.– | CHF 42.– | CHF 42.– |
| Fade/Skin Fade | gesamt | 1 | 1 | CHF 42.– | CHF 42.– | CHF 42.– |
| Bart trimmen/formen | Thalwil | 2 | 1 | CHF 15.– | CHF 22.50 | CHF 30.– |
| Bart trimmen/formen | gesamt | 6 | 5 | CHF 15.– | CHF 32.50 | CHF 120.– |
| Bart rasieren | gesamt | 0 | 0 | – | – | – |
| Schnitt+Bart | Thalwil | 1 | 1 | CHF 70.– | CHF 70.– | CHF 70.– |
| Schnitt+Bart | gesamt | 4 | 3 | CHF 65.– | CHF 75.– | CHF 95.– |
| Kinder/Jugend | Thalwil | 1 | 1 | CHF 27.– | CHF 27.– | CHF 27.– |
| Kinder/Jugend | gesamt | 9 | 6 | CHF 27.– | CHF 45.– | CHF 60.– |
| Pensionäre | gesamt | 0 | 0 | – | – | – |

In Tabelle B stehen Zeilen pro Ort nur für die Umland-Orte. Die Zeilen «gesamt» fassen Kerngebiet und Umland zusammen.

## BesArt: Verifikation gegen das Live-Profil

Abgerufen: https://salonkee.ch/salon/besart-hairsalon?lang=de, 2026-11-07. Die Kategorien Herren, Bart, Kinder und Pensionäre wurden einzeln angeklickt.

| Leistung (Salonkee live) | Salonkee live | `index.html` (Block «Leistungen und Preise 1:1 von Salonkee») | Abweichung |
|---|---|---|---|
| Herren: Waschen, Schneiden, Stylen | Ab 42 CHF | price 42, from:true | keine |
| Herren/Bart: Bart schneiden und rasieren | 18 CHF | 18 | keine |
| Herren: Kopfmassage mit Lotion | 8 CHF | 8 | keine |
| Kinder: Waschen, Schneiden | Ab 30 CHF | 30, from:true | keine |
| Pensionäre: Waschen, Schneiden ab 65 Jahre | 25 CHF | 25, note «ab 65 Jahren» | keine; nur der Wortlaut ist anders («ab 65 Jahre» bzw. «ab 65 Jahren») |
| Bewertungen | 26 Bewertungen: 25× 5 Sterne, 1× 4 Sterne, Gesamt 5 | Briefing: «25 Fünf-Sterne-Bewertungen» | Anzahl inzwischen 26. 25 davon haben 5 Sterne, das stimmt weiterhin. |

Weitere Punkte:
- Salonkee zeigt keine Dauer. Die `min`-Werte in `index.html` sind laut Code-Kommentar interne Richtwerte.
- Auf Salonkee heisst die Pflegeleistung «Intensive Aufbaukuhr», in `index.html` steht «Aufbaukur». Das betrifft keine Herrenleistung und ist nur ein Hinweis.

**Einordnung der heutigen BesArt-Herrenpreise** (Kerngebiet, ohne BesArt):

| BesArt-Leistung | Preis | Markt Kerngebiet (Min / Median / Max, n) | Lage |
|---|---:|---|---|
| Waschen, Schneiden, Stylen | ab CHF 42.– | 40 / 59 / 85 (n=5) | ca. 20. Perzentil. Nur Beauty Werkstatt (CHF 40.–) ist günstiger. 1. Quartil CHF 51.– |
| Bart schneiden und rasieren | CHF 18.– | 20 / 41 / 120 (n=4) | unter dem Minimum. Am nächsten liegt EH Hairlounge «Bart Cut» mit CHF 20.–. |
| Kopfmassage mit Lotion | CHF 8.– | EH Hairlounge «Kopfmassage» CHF 10.– (n=1) | leicht darunter |
| Kinder Waschen, Schneiden | ab CHF 30.– | 35 / 45 / 60 (n=8) | unter dem Minimum. Im Umland ist FL Barberia Leone in Thalwil mit ab CHF 27.– günstiger. |
| Pensionäre (ab 65) | CHF 25.– | keine Online-Preise gefunden | nicht einzuordnen. Im Vergleich zum Damen-W+S (ab CHF 95.–) ist es ein sehr hoher Rabatt. |

## Preisempfehlung für Januar 2027

**Grundlagen der Begründung:**
1. **Marktlage:** Das Perzentil bezieht sich auf die Kerngebiet-Preise in Tabelle A. Tabelle B zeigt die Werte mit Umland.
2. **Teuerung:**
   - LIK September 2026: 101.5 Punkte (Dezember 2025 = 100), **+1.0 % gegenüber dem Vorjahr**. Der Wert stammt aus einem Suchergebnis-Snippet zur BFS-Medienmitteilung, die Seite bfs.admin.ch ist nicht abrufbar. Einen LIK-Teilindex «Coiffeur» für 2026 haben wir nicht gefunden.
   - Branchenbezug: Laut Blick-Snippet empfahl der Verband für 2024 Preiserhöhungen von 4–5 %. Ebenfalls laut Blick-Snippet erhöht der Coiffeur-GAV 2024–2027 die Mindestlöhne um bis zu CHF 700.– pro Monat. Das trifft Salons mit Angestellten, also die Konkurrenz. BesArt als Einzelinhaber ist davon nicht direkt betroffen.
   - Fazit: Die Teuerung allein rechtfertigt nur rund +1 %. Der Hauptgrund für eine Anpassung ist der Abstand zum Markt.
3. **Positionierung «Hairsalon mit Art»:** Das ist ein Salon mit Handwerk und persönlicher Bedienung, kein Discount-Barber. Bisher steht BesArt preislich aber am unteren Rand.
4. **Reputation:** BesArt hat 26 verifizierte Bewertungen auf Salonkee (25× 5 Sterne). Die grossen Barber in Horgen haben deutlich mehr: DD-Barber 1243 und STB 1546 Bewertungen auf Treatwell. Bei der Online-Sichtbarkeit liegt BesArt also klar zurück. Das spricht gegen einen Sprung bis auf den Marktmedian.
5. **Einzelinhaber:** BesArt hat tiefere Fixkosten als Salons mit Personal, aber auch eine begrenzte Kapazität. Höhere Preise pro Termin sind der wichtigste Hebel für den Umsatz, ohne mehr Stunden zu arbeiten.

| Leistung | heute | zurückhaltend | mittel | ambitioniert | Begründung / Marktlage |
|---|---:|---:|---:|---:|---|
| Herren Waschen, Schneiden, Stylen | ab 42.– | **ab 45.–** (+7 %) | **ab 48.–** (+14 %) | **ab 52.–** (+24 %) | Markt 40–85, Median 59.–, 1. Quartil 51.–. Mit 45.– oder 48.– bleibt BesArt unter dem 1. Quartil (ca. 20. Perzentil), mit 52.– liegt es etwa beim 40. Perzentil. Im Umland sind STB (ab 51.–) und FL Barberia Leone (40.–) die günstigen Barber. |
| Bart schneiden und rasieren | 18.– | **22.–** | **25.–** | **28.–** | Markt 20 (EH) / ab 35 (STB) / 47 (DD, mit Hot Towel) / 120 (Timodella). Im Umland kostet der Full Beard 30.–. Mit 25.– bleibt BesArt unter allen Horgner Anbietern. |
| Kopfmassage mit Lotion | 8.– | **8.–** | **10.–** | **10.–** | EH Hairlounge verlangt 10.– (einziger Vergleichswert) |
| Kinder Waschen, Schneiden (bis 12) | ab 30.– | **ab 32.–** | **ab 35.–** | **ab 38.–** | Markt 35–60, Median 45.–. Mit 35.– liegt BesArt am Marktminimum (gleich wie Beauty Werkstatt und STB). Eine Altersgrenze «bis 12» sollte neu ausgeschrieben werden. |
| Pensionäre Waschen, Schneiden (ab 65) | 25.– | **27.–** | **28.–** | **30.–** | Keine Online-Vergleichswerte. Die Erhöhung um 2.– bis 5.– bleibt sozial verträglich. Der Tarif gilt auch für Damen und ist darum im Verhältnis zum Damenschnitt (ab 95.–) sehr günstig. Empfehlung: Zusatz «Kurzhaar» oder «ohne Föhnen» prüfen. |
| **NEU** Herrenschnitt ohne Waschen (trocken) | – | **40.–** | **42.–** | **45.–** | Markt 39 (STB) / 58 (EH) / 75 (Timodella), im Umland 48 (Kilchberg). Gedacht für Kurzhaar-Stammkunden, die schnell drankommen wollen. |
| **NEU** Maschinenschnitt (eine Länge) | – | **30.–** | **32.–** | **35.–** | Im Kerngebiet ist nur der Snippet-Wert DD-Barber 32.– bekannt (nicht bestätigt). Umland: 25.– (Thalwil) und 45.– (Adliswil). |
| **NEU** Schnitt + Bart (Kombi) | – | **62.–** | **68.–** | **75.–** | Markt 65 / 80 / 95 (STB, DD), Umland 70.– (Thalwil). Die Kombi entspricht etwa W+S plus Bart minus CHF 5.–. |
| **NEU** Jugendliche 13–16 Jahre | – | **38.–** | **40.–** | **45.–** | EH Hairlounge: Knaben bis 13 = 45.–, ab 14 = 55.–. Ein Jugendtarif schliesst die Lücke zwischen Kinder- und Herrentarif. |
| **NEU optional** Fade / Skin Fade (inkl. W+S) | – | **50.–** | **53.–** | **57.–** | Die Datenbasis ist dünn: Nur FL Barberia Leone in Thalwil bietet Skin Fade an (42.–, 2.– über dem Classic Cut). Faustregel: W+S plus CHF 5.–. Diese Leistung lohnt sich nur, wenn Besart Fades regelmässig schneidet. |
| **NEU optional** Konturen / Nacken nachschneiden | – | 15.– | 18.– | 20.– | Markt: EH 25.–, DD «Konturenschnitt / Line Up» 35.–. Geeignet als Zwischentermin für Stammkunden. |

**Empfehlung:** Die **mittlere Variante** passt am besten. Herren W+S+Stylen ab 48.–, Bart 25.–, Kinder ab 35.– und Pensionäre 28.– bleiben unter dem Marktmedian und unter den beiden grossen Horgner Barbern. Gleichzeitig wird der Abstand zum Markt kleiner, ohne Stammkunden zu verlieren. Die ambitionierte Variante lohnt sich, sobald BesArt deutlich mehr Bewertungen hat (z. B. über 100 bei Google und Salonkee) und die neue Website und der Google-Bewertungsaufsteller wirken. Die neuen Leistungen (Schnitt+Bart, Maschinenschnitt, Jugend) machen die Preisliste auf Salonkee und der Website klarer und bilden ab, was die Konkurrenz ebenfalls anbietet.

Hinweise zur Umsetzung:
- Die Preise auf Salonkee und auf der Website gleichzeitig umstellen.
- Die Erhöhung im Salon rund 4 Wochen vorher ankündigen.
- «ab»-Preise nur dort verwenden, wo der Aufwand wirklich variiert (z. B. bei langem Haar).

## Liste der Salons ohne abrufbare Preise (Kerngebiet)

Quelle für alle Einträge: local.ch-Eintrag (abgerufen 2026-11-07, ohne Preise). Wo eine eigene Website angegeben ist, war sie im Netz dieser Sitzung nicht abrufbar. Wenn local.ch dieselbe Adresse mehrfach führt (Inhaber- und Salon-Eintrag), ist sie hier nur einmal aufgeführt.

**Horgen**

- Coiffeur Laura Adamo, Löwengasse 12, 8810 Horgen – https://www.local.ch/de/d/fRjvn8wdwpoWo-Hhk7mSiQ – eigene Website https://www.coiffeurlauraadamo.ch/ nicht abrufbar
- Beauty Feelings, Seestrasse 258, 8810 Horgen – https://www.local.ch/de/d/HAsExoqhJa68yiFJnKLRGw – eigene Website https://www.beautyfeelings.ch nicht abrufbar
- Coiffeur B-beautiful Basler, Bockenweg 80, 8810 Horgen – https://www.local.ch/de/d/Zx_h6UbmJMg9O5J1OFK1YA
- Coiffeur Nice Hair, Burghaldenstrasse 11, 8810 Horgen – https://www.local.ch/de/d/ia2cGNJ69TRtDbNeQ_Yotw
- Coiffeur Späni, Zugerstrasse 47, 8810 Horgen – https://www.local.ch/de/d/2OfRsEeEdeeXax_IlDPrug
- Coiffure Elisabeth (auch Einträge «Koch», «Huppert Elisabeth»), Zugerstrasse 30, 8810 Horgen – https://www.local.ch/de/d/MXqD4nvw0jjQzRdgyJFi_Q
- Corso Virgilio Hairdesign, Einsiedlerstrasse 160, 8810 Horgen – https://www.local.ch/de/d/mi8Y3fIoQb3EeSLijwAipg
- Dätwyler Intercoiffure Horgen GmbH, Bahnhofstrasse 10, 8810 Horgen – https://www.local.ch/de/d/XTPbQVWkBDF3wQEAh0hHXw
- Gyr Kathrin, Neudorfstrasse 18, 8810 Horgen – https://www.local.ch/de/d/kYYDjs63edZBx2mVyABscA – eigene Website https://gyr-kathrin.digitalone.site nicht abrufbar
- Haarstudio Creativ, Ebnetstrasse 34, 8810 Horgen – https://www.local.ch/de/d/ALk1Lm1_CRTwrZIWDu3GyA
- Im Leue Coiffeur Karin Streuli (auch «Leu-Coiffeur»), Löwengasse 45, 8810 Horgen – https://www.local.ch/de/d/qNMwruls1OC_45sbY_Nbjw
- Macho Herrencoiffeur, Inh. Karagüven, Dorfgasse 14, 8810 Horgen – https://www.local.ch/de/d/JAneSYxhI56pIaRT08DZNQ – Herrencoiffeur; laut Suchergebnis-Snippet an gleicher Adresse «Hood Barber 32» auf Fresha (fresha.com nicht abrufbar)
- Schinzenhof Haarwerkstatt Baumann, Glärnischstrasse 41, 8810 Horgen – https://www.local.ch/de/d/-mjtYo8OVdUTmqIRzltuag
- Schnittpunkt by A.V. Grüter, Alte Landstrasse 24, 8810 Horgen – https://www.local.ch/de/d/ohCw8ymI9c1tMd4iuFfzWQ – eigene Website http://www.schnittpunkthorgen.ch/ nicht abrufbar
- Wash and Style, Einsiedlerstrasse 174, 8810 Horgen – https://www.local.ch/de/d/1I11iEdVGHvIJ52z25dbUA – eigene Website http://www.washandstyle.ch nicht abrufbar
- Wolf Coiffeur, Inh. Rassul, Seestrasse 158, 8810 Horgen – https://www.local.ch/de/d/3egNaw4c7yscJ7pt6935dQ – Barber; laut Suchergebnis-Snippet als «Wolf Barbershop» auf Fresha (fresha.com nicht abrufbar)
- Car & Haar, Zugerstrasse 84, 8810 Horgen – https://www.local.ch/de/d/0mCVF9oJ4jQgHPL5WbYJuw – eigene Website https://www.carundhaar.ch nicht abrufbar; auf local.ch als Garage kategorisiert, Haar-Angebot nicht bestätigt

**Oberrieden**

- Bertoldo Renato, Alte Landstrasse 26-30, 8942 Oberrieden – https://www.local.ch/de/d/tj1xZSUNbkimtZXpkYK1Fw
- Ciao Bella Coiffeur, Einsiedlerstrasse 4, 8942 Oberrieden – https://www.local.ch/de/d/YGjAcsV4DHcPnIhoE8iReg
- Coiffeur Schnittstelle, Bahnhofstrasse 11, 8942 Oberrieden – https://www.local.ch/de/d/H7ZTSEbncw0EI_eVgCO1oA
- Coiffure Dannecker (Claudia Dannecker), Winkelhaldenstrasse 2, 8942 Oberrieden – https://www.local.ch/de/d/qmy2vpuuqTdUPajqRKymlA – eigene Website http://www.coiffure-dannecker.ch nicht abrufbar
- Hair Creation (Gabriele Cagnazzo), Alte Landstrasse 19, 8942 Oberrieden – https://www.local.ch/de/d/2K_tdBDuAdmRWv4Yd3sh_w – eigene Website http://haircreation-by-gabriele.ch nicht abrufbar; laut Suchergebnis-Snippet hat der local.ch-Eintrag eine «Preisliste», Preise im abgerufenen local.ch-HTML nicht enthalten
- Maliya Coiffeur, Alte Landstrasse 59, 8942 Oberrieden – https://www.local.ch/de/d/RmohhOuetwNJBGRwXI4Sqg
- Picador, Alte Landstrasse 25, 8942 Oberrieden – https://www.local.ch/de/d/wZmEScvsfbKJQxmpIg9P3A

**Wädenswil**

- Acqua Verde Hairstyling (vormals Capelli Hair Design), Seestrasse 104, 8820 Wädenswil – https://www.local.ch/de/d/CU4kHkJQpPcIxtD-UYbcsQ – eigene Website http://www.acquaverde.ch/ nicht abrufbar
- Bella Vista, Schönenbergstrasse 196, 8820 Wädenswil – https://www.local.ch/de/d/gOkGf8-AFaSYZHe13kKtYA
- Coiffeur Akropolis, Luftstrasse 2, 8820 Wädenswil – https://www.local.ch/de/d/jr_TxuPFXJN2ScNOgN3qig
- Coiffeur Carina, Engelstrasse 1, 8820 Wädenswil – https://www.local.ch/de/d/sGKsA2sARZ4hVB7bDeX8kw – eigene Website http://www.coiffeur-carina.ch nicht abrufbar
- Coiffeur Christener, Seestrasse 65, 8820 Wädenswil – https://www.local.ch/de/d/aJ5wU15cE22KkVA8o2GELQ – eigene Website https://www.coiffeurchristener.ch nicht abrufbar
- Coiffeur Corner GmbH, Oberdorfstrasse 16, 8820 Wädenswil – https://www.local.ch/de/d/mxaUVYkyg0KqTZe-oVzvlQ – eigene Website http://www.coiffeur-corner.ch nicht abrufbar
- Coiffeur Tahacuts, Leigass 6, 8820 Wädenswil – https://www.local.ch/de/d/R3pNuVWQ7b4qFNzfWnaKRw
- Coiffeur Wädenswil, Taher, Seestrasse 107, 8820 Wädenswil – https://www.local.ch/de/d/-mfacppvcESWZ-1TcAQFeA
- Wädi Barbier (auch «Coiffeur Wädi Inh. Khalil»), Hafenstrasse 8, 8820 Wädenswil – https://www.local.ch/de/d/QqTqsENYCOLCgre537TC4A – Barber
- Coiffeur the Barber, Seestrasse 135, 8820 Wädenswil – https://www.local.ch/de/d/QbDkY9PgW95-6W44hPJ4yw – Barber
- Coiffure Glückssträhne by Tanja GmbH, Hafenstrasse 4, 8820 Wädenswil – https://www.local.ch/de/d/7pJRSzM_7nUOFENkdKju_A – eigene Website http://www.gluecksstraehne-coiffure.ch/ nicht abrufbar
- Coiffure Haus zur Treu, Florhofstrasse 2, 8820 Wädenswil – https://www.local.ch/de/d/P0tOHnUFoFA0Id0VN01mCQ – eigene Website https://www.coiffure-hauszurtreu.ch nicht abrufbar
- Coiffure Zabeni, Engelstrasse 4, 8820 Wädenswil – https://www.local.ch/de/d/_RDrgZAiTZXJUdQ0opoSzA – eigene Website http://www.zabeni.com nicht abrufbar
- HB Barber Shop, Merkurstrasse 3, 8820 Wädenswil – https://www.local.ch/de/d/ouxujuFaObaatZ852XR4kQ – Barber
- HB Barbershop, Khalil, Seestrasse 105, 8820 Wädenswil – https://www.local.ch/de/d/GBE-YxXGA-4MQAbnMv_Atw – Barber
- Haarbar by Fabienne Sidler GmbH, Einsiedlerstrasse 13a, 8820 Wädenswil – https://www.local.ch/de/d/On_ZqLDSuOJ3zOFt-qp0FA
- Hairstylist Pierre, Gerbestrasse 7, 8820 Wädenswil – https://www.local.ch/de/d/tE4j08qaqfX9ZIhyvN9tLg
- Herrencoiffeur Burimi, Büelenweg 3, 8820 Wädenswil – https://www.local.ch/de/d/uyikHYhR0jrk8nei1xRhjg – Herrencoiffeur
- Infini Coiffeur, Zugerstrasse 22, 8820 Wädenswil – https://www.local.ch/de/d/5HiDAjBZuyT9HuQkOCNUzQ
- Intercoiffure Les Artistes, Oberdorfstrasse 20, 8820 Wädenswil – https://www.local.ch/de/d/aCyDfttv43mFA6ekl34hSA – eigene Website http://www.intercoiffure-lesartistes.ch / http://www.lesartistes.ch nicht abrufbar
- KUNZ COIFFEUR FOR MEN, Zugerstrasse 45, 8820 Wädenswil – https://www.local.ch/de/d/WepQZLcuLdWUwz1sGph6eQ – eigene Website https://www.kunzcoiffeur.ch nicht abrufbar; Herrencoiffeur/Barber; laut Suchergebnis-Snippet 4,9 Sterne aus 1129 Bewertungen auf local.ch
- Kelen's Hair Room, Florhofstrasse 7, 8820 Wädenswil – https://www.local.ch/de/d/CWzuyPEcizTbKcfB00NGCw
- Le Coiffeur Maurizio, Gerbestrasse 4, 8820 Wädenswil – https://www.local.ch/de/d/ZIPEe3XhzY-x6YzOWZn5mw
- Puchta Inge (profi-stylistin), Untermosenstrasse 19, 8820 Wädenswil – https://www.local.ch/de/d/PDw3VhJ9k7-h0wnURjpyZQ – eigene Website https://www.profi-stylistin.ch/ nicht abrufbar
- Vogue Coiffure, Zugerstrasse 56, 8820 Wädenswil – https://www.local.ch/de/d/ewzW8gOTEPAfdR4sjcAKdw
- GIDOR Coiffure, Rosenbergstrasse 1, 8820 Wädenswil – https://www.local.ch/de/d/zWf7RTsIFG23UP6sQy6R8w – eigene Website https://www.gidor.ch nicht abrufbar; Kette; local.ch-FAQ: «mit der STUcard erhalten Sie CHF 10.– Rabatt auf alle Serviceleistungen ab CHF 36.–»
- Coiffeur Service AG, Tannstrasse 14, 8820 Wädenswil – https://www.local.ch/de/d/QkkrjfgKNN4iC8wuhq1RYw – ohne Kategorie auf local.ch, Salonbetrieb nicht bestätigt

**Au ZH**

- Coiffeur Passion, Johannes-Hirt-Strasse 1, 8804 Au ZH – https://www.local.ch/de/d/jgGxLWDl1NipaeQwaMitaw – eigene Website http://www.p-buergler.ch/ nicht abrufbar
- Hairstyling by Martina Lenherr, Johannes-Hirt-Strasse 1, 8804 Au ZH – https://www.local.ch/de/d/r6VWQLXvxsSgeztzqxvMLg – eigene Website http://hairstyling-au.ch nicht abrufbar

**Nicht in die Salonliste aufgenommen** (local.ch-Treffer der Suche, aber kein eigenständiger Coiffeur oder unklar):
- Nina's Belle Nails, Wädenswil: Nagelstudio
- Creative Lounge, Au ZH: Permanent-Make-up
- Capelli Beauty Academy, Wädenswil: Coiffeurfachschule an derselben Adresse wie Acqua Verde
- Privat- bzw. Inhabereinträge ohne Kategorie an einer Salonadresse:
  - Huppert Elisabeth und Koch (beide Zugerstrasse 30)
  - Leu-Coiffeur (Löwengasse 45)
  - Zabeni William (Engelstrasse 4)
  - Khalil Hassan (Gerbestrasse 2)
  - Wetzel Denise (Florhofstrasse 25, gleiche Adresse wie EH Hairlounge)
  - Coiffeur Wädi Inh. Khalil (= Wädi Barbier)
  - Capelli Hair Design (= Acqua Verde)
- Personeneinträge ohne Kategorie, bei denen nicht bestätigt ist, ob es ein Salon ist: Köppel Amalia (Speerstrasse 9, Horgen), Solidoro Susanne (Steinbruchstrasse 19, Horgen), Stirnemann Fritz (Eichweidstrasse 20, Wädenswil), Martorelli Donatella (Apfelmatte 2, Au ZH)

**Weitere Hinweise:**
- STB Atelier Hair & Tattoo und Intercoiffure Timodella sind auf local.ch nicht in der Coiffeur-Suche Horgen aufgetaucht. Sie stammen aus Treatwell bzw. Salonkee.
- Laut Suchergebnis-Snippet gibt es in Horgen ausserdem «Ari Coiffeur». Dafür haben wir weder Adresse noch Preise gefunden. Der Salon ist nicht in der CSV.

## Quellen

Alle Seiten wurden am 2026-11-07 abgerufen, sofern nichts anderes vermerkt ist.

**Salonkee**
- https://salonkee.ch/salon/besart-hairsalon?lang=de – BesArt Hairsalon (Salonkee-Profil, Kategorien Herren/Bart/Kinder/Pensionäre/Damen/Pflege/Farbe angeklickt)
- https://salonkee.ch/salon/intercoiffure-timodella-hairstyling-by-gioia?lang=de – Intercoiffure Timodella Hairstyling by Gioia (Salonkee-Profil)
- https://salonkee.ch/salon/eh-hairlounge?lang=de – EH Hairlounge (Salonkee-Profil)
- https://salonkee.ch/search/friseure/horgen?lang=de, …/oberrieden, …/waedenswil, …/au-zh und https://salonkee.ch/search/barbiere-barbershops/horgen?lang=de, …/oberrieden, …/waedenswil – Salonkee-Suchlisten

**Treatwell**
- https://www.treatwell.ch/orte/behandlung-herrenhaarschnitt/angebot-typ-lokal/in-horgen-ch – Treatwell «Herrenhaarschnitt in Horgen» (3 Salons)
- https://www.treatwell.ch/orte/behandlung-bart-trimmen/angebot-typ-lokal/in-horgen-ch – Treatwell «Bart trimmen & rasieren in Horgen»
- https://www.treatwell.ch/orte/behandlung-kinderhaarschnitt/angebot-typ-lokal/in-horgen-ch und …/behandlung-haarschnitt-fuer-jungen/…/in-horgen-ch – Treatwell Kinderhaarschnitt Horgen
- https://www.treatwell.ch/orte/behandlung-gruppe-haare/angebot-typ-lokal/in-horgen-ch – Treatwell «Coiffeure in Horgen»
- https://www.treatwell.ch/orte/behandlung-herrenhaarschnitt/angebot-typ-lokal/in-thalwil-ch, …/behandlung-bart-trimmen/…/in-thalwil-ch, …/behandlung-kinderhaarschnitt/…/in-thalwil-ch – Treatwell Thalwil (Umland-Referenz, enthält auch STB Kinder)
- https://www.treatwell.ch/orte/behandlung-herrenhaarschnitt/angebot-typ-lokal/in-kilchberg-ch – Treatwell Kilchberg (Umland-Referenz)
- https://www.treatwell.ch/orte/behandlung-herrenhaarschnitt/angebot-typ-lokal/in-adliswil-ch – Treatwell Adliswil (Umland-Referenz)
- https://www.treatwell.ch/orte/behandlung-herrenhaarschnitt/angebot-typ-lokal/in-waedenswil-ch – Treatwell Wädenswil: «keine Salons gefunden» (ebenso Oberrieden, Au ZH, Richterswil)
- https://www.treatwell.ch/ort/dd-barber/, https://www.treatwell.ch/ort/stb-atelier-hair-tattoo-beauty/, https://www.treatwell.ch/ort/beauty-werkstatt-hair-by-marina/ – Treatwell-Salonprofile: **nicht abrufbar** (leere Antwort)

**local.ch**
- https://www.local.ch/de/q/Horgen/Coiffeur, …/Horgen/Barbershop, …/Horgen/Barbier, …/Oberrieden/Coiffeur, …/Oberrieden/Barbershop, …/Wädenswil/Coiffeur, …/Wädenswil/Barbershop, …/Wädenswil/Barbier, …/Au%20ZH/Coiffeur – local.ch-Suchlisten
- https://www.local.ch/de/d/<id> – local.ch-Detaileinträge der 53 Salons ohne Preise (URLs einzeln in der Liste oben und in der CSV)

**Nicht abrufbar**
- https://www.search.ch/tel/?was=coiffeur&wo=horgen – search.ch
- https://booksy.com/de-ch/s/barbershop/horgen – Booksy: Weiterleitung auf booksy.com/de-us, kein CH-Angebot
- https://www.fresha.com – Fresha
- https://www.google.com/search?q=… – Google-Suche (Captcha)
- Eigene Salon-Websites (alle 23 einzeln geprüft): kunzcoiffeur.ch, gidor.ch, schnittpunkthorgen.ch, washandstyle.ch, coiffeurlauraadamo.ch, beautyfeelings.ch, carundhaar.ch, gyr-kathrin.digitalone.site, acquaverde.ch, coiffeur-carina.ch, coiffeurchristener.ch, coiffeur-corner.ch, gluecksstraehne-coiffure.ch, coiffure-hauszurtreu.ch, zabeni.com, intercoiffure-lesartistes.ch, lesartistes.ch, profi-stylistin.ch, p-buergler.ch, hairstyling-au.ch, coiffure-dannecker.ch, haircreation-by-gabriele.ch, capelli.ch

**Laut Suchergebnis-Snippet** (Seite nicht direkt abrufbar bzw. nicht selbst geladen)
- https://www.treatwell.ch/orte/behandlung-herrenhaarschnitt/angebot-typ-lokal/in-kanton-zuerich-ch – Snippet: DD-Barber «Maschinenhaarschnitt (15 Minuten) CHF 32» und «Herren W+S+Föhnen 30 Min. CHF 48». Das widerspricht dem live abgerufenen Wert von CHF 59.–. Nur der Maschinenschnitt steht in der CSV, nicht in der Statistik.
- https://www.preispirat.ch/gidor-rabatt-bis-chf-15/ – Snippet: GIDOR Herren-Haarschnitt «Gutschein Fr. 34.50 statt Fr. 44.50», Angebot bis 30.11.2025. Das ist ein Kettenpreis, die Filiale Wädenswil ist nicht bestätigt.
- https://www.treatwell.ch/en/place/stb-atelier-hair-tattoo-beauty/reviews/page-4/ – Snippet: STB-Adresse Seestrasse 149, 8810 Horgen
- https://www.local.ch/de/d/WepQZLcuLdWUwz1sGph6eQ – Snippet: Kunz Coiffeur for Men 4,9 Sterne / 1129 Bewertungen
- https://www.bfs.admin.ch/de/newnsb/wNfni1DvzKuQ – Snippet: LIK September 2026 101.5 Punkte (Dez. 2025 = 100), +1.0 % gegenüber dem Vorjahr (Medienmitteilung vom 1.10.2026)
- https://www.blick.ch/wirtschaft/coiffeur-nagelstudio-putzen-und-co-was-2024-im-alltag-auch-noch-teurer-wird-id19296827.html – Snippet: Verbandsempfehlung von 4–5 % Preiserhöhung für 2024
- https://www.blick.ch/wirtschaft/erfolgreiche-lohnverhandlungen-coiffeusen-und-coiffeure-verdienen-bald-bis-zu-einem-fuenftel-mehr-id19245064.html – Snippet: Coiffeur-GAV ab 1.1.2024 bis 2027, Mindestlöhne bis zu CHF 700.– pro Monat höher

**Lokale Datei (nur gelesen)**
- /home/user/ymerejl.github.io/besart/index.html – Datenblock `CATS` («Leistungen und Preise 1:1 von Salonkee (Stand September 2026)»)
