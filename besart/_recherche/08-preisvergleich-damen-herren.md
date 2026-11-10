# 08 – Preisvergleich Damen und Herren: Horgen und Umgebung

Stand: Abruf 2026-11-10, ca. 07:15 UTC (Salonkee). Die Treatwell-Herrenwerte stammen aus dem Abruf vom 2026-11-07 (siehe `06-preisvergleich-herren.md`).
Rohdaten: `preise-alle.csv`, 172 Preiszeilen (Kern 91, Umland 81), jede mit Quell-URL.

## Kurzfazit

- **Damenpreise online belegt** gibt es im Kerngebiet nur für **2 Konkurrenz-Salons**: Intercoiffure Timodella (Horgen) und EH Hairlounge (Wädenswil). Im Umland sind es **3 Salons**: Lori Hairstudio und TB Hair & Beauty (beide Adliswil) sowie Beauty Atelier by Jessy Spichale (Samstagern, Gemeinde Richterswil). Alle 5 stehen auf Salonkee. Die Stichprobe ist sehr klein, die Werte sind Richtwerte.
- **BesArt Damen W+S+Föhnen ab 95.–** liegt zwischen EH (ab 85.–) und Timodella (ab 130.–). Im Umland kostet dieselbe Leistung 65.– bis 81.–, BesArt ist also teurer als alle drei Umland-Salons.
- **BesArt «ohne Föhnen» ab 75.–** ist teurer als Cut & Go bei EH, Lori und TB (je ab bzw. 60.–).
- **BesArt Farbe ist günstig:** Ansatz 70.– (Markt 60–85), Strähnen Oberkopf ab 81.– (Markt 75–185), **Balayage ab 110.–** (Markt 250–320, BesArt liegt weit darunter). Tönung ab 55.– ist das Minimum aller erfassten Salons.
- **Herren:** Die Ergebnisse aus 06 bestätigen sich. BesArt W+S+Stylen ab 42.– (Kern-Median 59.–), Bart 18.– (Kern-Minimum 20.–), Kinder ab 30.– (Kern-Minimum 35.–, im Umland 25–30.–). Neu belegt im Umland: Maschinenschnitt 10–45.– (Median 25.–, n=5).
- **Pensionäre:** Kein Konkurrent weist online einen Pensionärstarif aus. BesArt (25.–) ist damit nicht vergleichbar.
- **Keine Ketten oder Discounter in der Statistik:** Unter den belegten Salons ist keiner eine Kette oder ein Discounter. GIDOR (Wädenswil) ist nur über ein Suchergebnis-Snippet belegt und deshalb nicht in der CSV. Auffällig tief ist TB Hair & Beauty «Herren Maschine ab 10.–». Der Eintrag ist als Coiffeur geführt, weil der Salon sonst normale Preise hat.

## Quellen und Erreichbarkeit (2026-11-10)

| Quelle | Ergebnis |
|---|---|
| Salonkee Salonprofile | BesArt, Timodella, EH Hairlounge, Lori Hairstudio, TB Hair & Beauty und Beauty Atelier Jessy Spichale wurden mit Playwright vollständig geladen. Alle Kategorien stehen im Seiten-HTML (mobile Akkordeon-Liste) und wurden ausgelesen. |
| Salonkee Suche `/search/friseure/<ort>` | Horgen, Oberrieden, Wädenswil, Thalwil, Kilchberg, Adliswil und Richterswil wurden abgefragt. Lokal auf Salonkee sind: Horgen 2 (BesArt, Timodella), Wädenswil 1 (EH), Adliswil 2 (Lori, TB), Richterswil 1 (Samstagern: Jessy Spichale). **Thalwil, Kilchberg und Oberrieden: kein Salon vor Ort** auf Salonkee, nur Treffer aus Zürich, Küsnacht und Umgebung. Diese wurden nicht übernommen. Für Au ZH (Ortsteil von Wädenswil) gibt es keine eigene Suche, es gilt die Wädenswil-Suche. |
| Treatwell | **in dieser Sitzung nicht abrufbar**, der Zugriff wurde blockiert. Damenpreise von Treatwell fehlen deshalb. Die Herren-Werte von DD-Barber, STB Atelier, Beauty Werkstatt, FL Barberia Leone, Lena HairAffair und Avvera sind unverändert aus `preise-herren.csv` übernommen (Abruf 2026-11-07, Treatwell-Suchlisten mit bis zu 3 Leistungen pro Salon). |
| local.ch | Heute nicht erneut abgefragt (Zeitbudget). Die Salonliste des Kerngebiets stammt aus 06 (Abruf 2026-11-07). Die local.ch-Einträge enthalten keine Preise. |
| Snippet-Werte aus 06 | Das sind DD-Barber «Maschinenhaarschnitt 32.–» und GIDOR «statt 44.50». Beide sind **nicht** in `preise-alle.csv`, weil sie nicht direkt belegt sind. |

## Normalisierung

- **Damen W+S+Föhnen**: Waschen, Schneiden und Föhnen/Styling (TB: «Wash, Cut & Styling»).
- **Damen W+S ohne Föhnen (Cut & Go)**: «Cut & Go», «ohne Föhnen» und TB «Wash & Cut».
- **Damen Waschen+Föhnen**: nur Föhnen bzw. Legen, inkl. Waschen. «Waschen, Föhnen & Locken» zählt als sonstige.
- **Ansatz färben**: nur Ansatz. BesArt «Ansatz + Länge/Spitzen anpassen» zählt als sonstige.
- **Ganze Farbe**: komplette Coloration ohne Schnitt. Achtung: Timodella und Lori geben sie inkl. Waschen und Föhnen an, EH und TB als reine Farbleistung.
- **Strähnen/Mèches**: Mèches und Foliensträhnen (Oberkopf und ganzer Kopf). In die Statistik geht der tiefere Wert ein, meist «Oberkopf».
- **Balayage**: Balayage/Ombré ohne Schnitt.
- **Farbe/Strähnen-Paket inkl. Schnitt**: alle Farbpakete, die «Schneiden» enthalten (Timodella, Lori). Sie sind nicht direkt mit den Einzelleistungen vergleichbar.
- **Kinder/Jugend**: alle Kinder- und Teenagertarife (Mädchen und Knaben).
- **Herren**-Kategorien wie in 06. «Bart» umfasst alle Bartleistungen ohne Haarschnitt (auch Konturen und Kürzen).
- **sonstige**: Pflege, Kopfmassage, Dauerwelle, Keratin, Styling, Herren-Farbe, Studententarife usw. Sie stehen in der CSV, aber nicht in der Statistik.
- Nicht erfasst sind Leistungen ausserhalb der Haarpflege, also Nägel, Kosmetik, Wimpern/Brauen, Waxing und Extensions.
- **Haarlänge**: Kein Salon unterscheidet online kurz, mittel und lang. Es gibt nur «ab»-Preise, deshalb steht in der CSV fast überall `-`. Nur Timodella «Locken mittellang/langhaar» ist nach Länge getrennt.

## Auswertung Min / Median / Max

Methode: Pro Salon und Kategorie zählt der **Einstiegspreis**, also der tiefste Preis. «ab»-Preise gehen mit dem Mindestwert ein. n Salons = Anzahl Salons, in Klammern n Preise = Anzahl verschiedener Preispunkte. BesArt ist nicht mitgerechnet und steht separat. Kern = Horgen, Oberrieden, Wädenswil, Au ZH. Umland = Thalwil, Kilchberg, Adliswil, Richterswil. Beträge in CHF.

| Kategorie | BesArt | Kern n Salons (n Preise) | Kern Min / Median / Max | Umland n Salons (n Preise) | Umland Min / Median / Max |
|---|---:|---:|---|---:|---|
| Damen W+S+Föhnen | ab 95 | 2 (2) | 85 / 107.5 / 130 | 3 (3) | 65 / 80 / 81 |
| Damen W+S ohne Föhnen (Cut & Go) | ab 75 | 1 (1) | 60 / 60 / 60 | 2 (2) | 60 / 60 / 60 |
| Damen Waschen+Föhnen | – | 2 (2) | 45 / 55 / 65 | 3 (3) | 37 / 45 / 45 |
| Ansatz färben | 70 | 1 (1) | 60 / 60 / 60 | 3 (3) | 65 / 80 / 85 |
| Ganze Farbe | – | 2 (2) | 80 / 125 / 170 | 2 (2) | 105 / 112.5 / 120 |
| Tönung | ab 55 | 2 (2) | 60 / 115 / 170 | 1 (1) | 65 / 65 / 65 |
| Strähnen/Mèches | ab 81, ab 110 | 2 (2) | 90 / 137.5 / 185 | 2 (3) | 75 / 85 / 95 |
| Balayage | ab 110 | 1 (1) | 320 / 320 / 320 | 2 (2) | 250 / 275 / 300 |
| Farbe/Strähnen-Paket inkl. Schnitt | – | 1 (4) | 220 / 220 / 220 | 1 (6) | 160 / 160 / 160 |
| Hochsteckfrisur | – | 1 (1) | 90 / 90 / 90 | 0 | – |
| Pensionäre W+S | 25 | 0 | – | 0 | – |
| Kinder/Jugend | ab 30 | 5 (9) | 35 / 40 / 55 | 4 (11) | 25 / 26 / 30 |
| Herren W+S(+Föhnen/Styling) | ab 42 | 5 (5) | 40 / 59 / 85 | 6 (6) | 40 / 53 / 65 |
| Herrenschnitt ohne Waschen | – | 3 (3) | 39 / 58 / 75 | 2 (2) | 48 / 48 / 48 |
| Maschinenschnitt | – | 0 | – | 5 (5) | 10 / 25 / 45 |
| Bart | 18 | 4 (4) | 20 / 41 / 120 | 2 (3) | 15 / 15.5 / 16 |
| Schnitt+Bart | – | 2 (3) | 65 / 80 / 95 | 1 (1) | 70 / 70 / 70 |
| Fade/Skin Fade | – | 0 | – | 1 (1) | 42 / 42 / 42 |

**Belegte Salons je Gebiet**
- Kern (ohne BesArt): Timodella (Horgen, Salonkee), EH Hairlounge (Wädenswil, Salonkee), DD-Barber, STB Atelier, Beauty Werkstatt (alle Horgen, Treatwell aus 06, nur Herren/Kinder).
- Umland: Lori Hairstudio und TB Hair & Beauty (Adliswil, Salonkee), Beauty Atelier Jessy Spichale (Samstagern/Richterswil, Salonkee), FL Barberia Leone (Thalwil), Lena HairAffair (Kilchberg), Avvera Hair Academy (Adliswil). Die letzten drei sind Treatwell-Werte aus 06, nur Herren/Kinder.
- Oberrieden und Au ZH: keine Online-Preise.

**Vorsicht bei der Interpretation**
- Bei Damen ist n=1–3 je Gebiet. Ein Median aus zwei Werten ist nur ein Mittelwert. Timodella (Intercoiffure, Premium) zieht die Kern-Werte stark nach oben.
- Timodella «Tönung» (170.–) und «Ganze Farbe» (170.–) enthalten Waschen und Föhnen. EH (60.– bzw. 80.–) und BesArt (55.–) nennen die reine Farbleistung.
- Fast alle Damenpreise sind «ab»-Preise. Der tatsächliche Preis bei langem Haar ist online nicht belegt.

## Geprüft, aber ohne Online-Preise

**Kerngebiet** (local.ch-Einträge ohne Preise, eigene Websites in dieser Umgebung nicht abrufbar; geprüft am 2026-11-07, siehe 06):

- Coiffeur Laura Adamo, Löwengasse 12, 8810 Horgen – https://www.local.ch/de/d/fRjvn8wdwpoWo-Hhk7mSiQ
- Beauty Feelings, Seestrasse 258, 8810 Horgen – https://www.local.ch/de/d/HAsExoqhJa68yiFJnKLRGw
- Coiffeur B-beautiful Basler, Bockenweg 80, 8810 Horgen – https://www.local.ch/de/d/Zx_h6UbmJMg9O5J1OFK1YA
- Coiffeur Nice Hair, Burghaldenstrasse 11, 8810 Horgen – https://www.local.ch/de/d/ia2cGNJ69TRtDbNeQ_Yotw
- Coiffeur Späni, Zugerstrasse 47, 8810 Horgen – https://www.local.ch/de/d/2OfRsEeEdeeXax_IlDPrug
- Coiffure Elisabeth (auch Einträge «Koch», «Huppert Elisabeth»), Zugerstrasse 30, 8810 Horgen – https://www.local.ch/de/d/MXqD4nvw0jjQzRdgyJFi_Q
- Corso Virgilio Hairdesign, Einsiedlerstrasse 160, 8810 Horgen – https://www.local.ch/de/d/mi8Y3fIoQb3EeSLijwAipg
- Dätwyler Intercoiffure Horgen GmbH, Bahnhofstrasse 10, 8810 Horgen – https://www.local.ch/de/d/XTPbQVWkBDF3wQEAh0hHXw
- Gyr Kathrin, Neudorfstrasse 18, 8810 Horgen – https://www.local.ch/de/d/kYYDjs63edZBx2mVyABscA
- Haarstudio Creativ, Ebnetstrasse 34, 8810 Horgen – https://www.local.ch/de/d/ALk1Lm1_CRTwrZIWDu3GyA
- Im Leue Coiffeur Karin Streuli (auch «Leu-Coiffeur»), Löwengasse 45, 8810 Horgen – https://www.local.ch/de/d/qNMwruls1OC_45sbY_Nbjw
- Macho Herrencoiffeur, Inh. Karagüven, Dorfgasse 14, 8810 Horgen – https://www.local.ch/de/d/JAneSYxhI56pIaRT08DZNQ
- Schinzenhof Haarwerkstatt Baumann, Glärnischstrasse 41, 8810 Horgen – https://www.local.ch/de/d/-mjtYo8OVdUTmqIRzltuag
- Schnittpunkt by A.V. Grüter, Alte Landstrasse 24, 8810 Horgen – https://www.local.ch/de/d/ohCw8ymI9c1tMd4iuFfzWQ
- Wash and Style, Einsiedlerstrasse 174, 8810 Horgen – https://www.local.ch/de/d/1I11iEdVGHvIJ52z25dbUA
- Wolf Coiffeur, Inh. Rassul, Seestrasse 158, 8810 Horgen – https://www.local.ch/de/d/3egNaw4c7yscJ7pt6935dQ
- Car & Haar, Zugerstrasse 84, 8810 Horgen – https://www.local.ch/de/d/0mCVF9oJ4jQgHPL5WbYJuw
- Acqua Verde Hairstyling (vormals Capelli Hair Design), Seestrasse 104, 8820 Wädenswil – https://www.local.ch/de/d/CU4kHkJQpPcIxtD-UYbcsQ
- Bella Vista, Schönenbergstrasse 196, 8820 Wädenswil – https://www.local.ch/de/d/gOkGf8-AFaSYZHe13kKtYA
- Coiffeur Akropolis, Luftstrasse 2, 8820 Wädenswil – https://www.local.ch/de/d/jr_TxuPFXJN2ScNOgN3qig
- Coiffeur Carina, Engelstrasse 1, 8820 Wädenswil – https://www.local.ch/de/d/sGKsA2sARZ4hVB7bDeX8kw
- Coiffeur Christener, Seestrasse 65, 8820 Wädenswil – https://www.local.ch/de/d/aJ5wU15cE22KkVA8o2GELQ
- Coiffeur Corner GmbH, Oberdorfstrasse 16, 8820 Wädenswil – https://www.local.ch/de/d/mxaUVYkyg0KqTZe-oVzvlQ
- Coiffeur Tahacuts, Leigass 6, 8820 Wädenswil – https://www.local.ch/de/d/R3pNuVWQ7b4qFNzfWnaKRw
- Coiffeur Wädenswil, Taher, Seestrasse 107, 8820 Wädenswil – https://www.local.ch/de/d/-mfacppvcESWZ-1TcAQFeA
- Wädi Barbier (auch «Coiffeur Wädi Inh. Khalil»), Hafenstrasse 8, 8820 Wädenswil – https://www.local.ch/de/d/QqTqsENYCOLCgre537TC4A
- Coiffeur the Barber, Seestrasse 135, 8820 Wädenswil – https://www.local.ch/de/d/QbDkY9PgW95-6W44hPJ4yw
- Coiffure Glückssträhne by Tanja GmbH, Hafenstrasse 4, 8820 Wädenswil – https://www.local.ch/de/d/7pJRSzM_7nUOFENkdKju_A
- Coiffure Haus zur Treu, Florhofstrasse 2, 8820 Wädenswil – https://www.local.ch/de/d/P0tOHnUFoFA0Id0VN01mCQ
- Coiffure Zabeni, Engelstrasse 4, 8820 Wädenswil – https://www.local.ch/de/d/_RDrgZAiTZXJUdQ0opoSzA
- HB Barber Shop, Merkurstrasse 3, 8820 Wädenswil – https://www.local.ch/de/d/ouxujuFaObaatZ852XR4kQ
- HB Barbershop, Khalil, Seestrasse 105, 8820 Wädenswil – https://www.local.ch/de/d/GBE-YxXGA-4MQAbnMv_Atw
- Haarbar by Fabienne Sidler GmbH, Einsiedlerstrasse 13a, 8820 Wädenswil – https://www.local.ch/de/d/On_ZqLDSuOJ3zOFt-qp0FA
- Hairstylist Pierre, Gerbestrasse 7, 8820 Wädenswil – https://www.local.ch/de/d/tE4j08qaqfX9ZIhyvN9tLg
- Herrencoiffeur Burimi, Büelenweg 3, 8820 Wädenswil – https://www.local.ch/de/d/uyikHYhR0jrk8nei1xRhjg
- Infini Coiffeur, Zugerstrasse 22, 8820 Wädenswil – https://www.local.ch/de/d/5HiDAjBZuyT9HuQkOCNUzQ
- Intercoiffure Les Artistes, Oberdorfstrasse 20, 8820 Wädenswil – https://www.local.ch/de/d/aCyDfttv43mFA6ekl34hSA
- KUNZ COIFFEUR FOR MEN, Zugerstrasse 45, 8820 Wädenswil – https://www.local.ch/de/d/WepQZLcuLdWUwz1sGph6eQ
- Kelen's Hair Room, Florhofstrasse 7, 8820 Wädenswil – https://www.local.ch/de/d/CWzuyPEcizTbKcfB00NGCw
- Le Coiffeur Maurizio, Gerbestrasse 4, 8820 Wädenswil – https://www.local.ch/de/d/ZIPEe3XhzY-x6YzOWZn5mw
- Puchta Inge (profi-stylistin), Untermosenstrasse 19, 8820 Wädenswil – https://www.local.ch/de/d/PDw3VhJ9k7-h0wnURjpyZQ
- Vogue Coiffure, Zugerstrasse 56, 8820 Wädenswil – https://www.local.ch/de/d/ewzW8gOTEPAfdR4sjcAKdw
- GIDOR Coiffure, Rosenbergstrasse 1, 8820 Wädenswil – https://www.local.ch/de/d/zWf7RTsIFG23UP6sQy6R8w
- Coiffeur Service AG, Tannstrasse 14, 8820 Wädenswil – https://www.local.ch/de/d/QkkrjfgKNN4iC8wuhq1RYw
- Coiffeur Passion, Johannes-Hirt-Strasse 1, 8804 Au ZH – https://www.local.ch/de/d/jgGxLWDl1NipaeQwaMitaw
- Hairstyling by Martina Lenherr, Johannes-Hirt-Strasse 1, 8804 Au ZH – https://www.local.ch/de/d/r6VWQLXvxsSgeztzqxvMLg
- Bertoldo Renato, Alte Landstrasse 26-30, 8942 Oberrieden – https://www.local.ch/de/d/tj1xZSUNbkimtZXpkYK1Fw
- Ciao Bella Coiffeur, Einsiedlerstrasse 4, 8942 Oberrieden – https://www.local.ch/de/d/YGjAcsV4DHcPnIhoE8iReg
- Coiffeur Schnittstelle, Bahnhofstrasse 11, 8942 Oberrieden – https://www.local.ch/de/d/H7ZTSEbncw0EI_eVgCO1oA
- Coiffure Dannecker (Claudia Dannecker), Winkelhaldenstrasse 2, 8942 Oberrieden – https://www.local.ch/de/d/qmy2vpuuqTdUPajqRKymlA
- Hair Creation (Gabriele Cagnazzo), Alte Landstrasse 19, 8942 Oberrieden – https://www.local.ch/de/d/2K_tdBDuAdmRWv4Yd3sh_w
- Maliya Coiffeur, Alte Landstrasse 59, 8942 Oberrieden – https://www.local.ch/de/d/RmohhOuetwNJBGRwXI4Sqg
- Picador, Alte Landstrasse 25, 8942 Oberrieden – https://www.local.ch/de/d/wZmEScvsfbKJQxmpIg9P3A
- GIDOR Coiffure, Rosenbergstrasse 1, 8820 Wädenswil (Kette): nur Suchergebnis-Snippet (preispirat.ch), kein direkt belegter Preis.
- Wolf Barbershop / Hood Barber 32 (Horgen): laut Snippet auf Fresha gelistet, fresha.com ist nicht abrufbar.

**Umland:**
- Thalwil, Kilchberg: Auf Salonkee gibt es keinen Salon vor Ort (Suche 2026-11-10). Weitere Salons über local.ch wurden aus Zeitgründen nicht geprüft.
- Richterswil (Ortsteil Richterswil): kein Salon vor Ort auf Salonkee, nur Samstagern. local.ch wurde nicht geprüft.
- Adliswil: Neben Lori und TB wurden keine weiteren Salons geprüft.
- Treatwell-Profile für Damen (alle Orte): blockiert, nicht abrufbar.

## Offene Punkte

- Treatwell-Damenpreise (Suchlisten «Damenhaarschnitt», «Haare färben», «Balayage») nachholen, sobald der Zugriff wieder möglich ist.
- Die Umland-Salonliste über local.ch für Thalwil, Kilchberg und Richterswil vervollständigen.
- Preise bei langem Haar sind nur telefonisch oder vor Ort zu erfahren (z. B. Testanruf).
