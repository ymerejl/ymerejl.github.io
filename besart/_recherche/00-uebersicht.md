# 00 – Übersicht für das Kundengespräch am 10. November 2026

BesArt Hairsalon, Neugasse 29, 8810 Horgen (Besart Beka). Die Recherche lief am 7. November 2026. Details, Rechenwege und alle Quellen mit URL und Abrufdatum stehen in den Dateien 01–06. Werte, die nur aus Suchergebnissen stammen, sind dort gekennzeichnet.

## Die fünf wichtigsten Punkte

1. **Der Website-Start im Januar 2027 hängt nicht von Salonkee ab.** Die Website kann mit «Termin buchen»-Buttons und QR-Codes auf das Salonkee-Profil starten. Ob Salonkee bleibt, kann man in Ruhe entscheiden, sobald der Vertrag geprüft ist. → 01, 02
2. **Die Kündigungsfrist von Salonkee ist öffentlich nicht belegbar.** Die Bedingungen für Salons erhält man nur bei der Registrierung. → **Am 10.11. im Vertrag, in der Registrierungs-E-Mail bzw. im Dashboard nachsehen. Vorher nichts kündigen.** → 01
3. **Ein neues Terminal spart gegenüber SumUp kaum etwas.** Bei CHF 40'000.– Kartenumsatz kosten alle brauchbaren Lösungen CHF 670.– bis 760.– pro Jahr. Die beste Lösung ist ein einziges Gerät, das Debit, Kredit **und TWINT** kann, ohne Monatsgebühr: **Worldline EX4000 «All-in-One»** (Bedingungen vor der Bestellung prüfen). → 04
4. **Die Herrenpreise liegen am unteren Marktrand** (etwa beim 20. Perzentil). Für Januar 2027 empfehlen wir die **mittlere Variante**: Herren ab 48.–, Bart 25.–, Kinder ab 35.–, Pensionäre 28.–, dazu neu Schnitt+Bart 68.– und Maschinenschnitt 32.–. Die Datenbasis ist klein (5 Salons mit Online-Preisen). → 06
5. **Domain:** **besart.ch ist vergeben.** **besart-hairsalon.ch** ist frei und kostet bei Infomaniak CHF 5.– im ersten Jahr, danach CHF 10.70 pro Jahr. Dazu kommen besart-horgen.ch und haarmitart.ch als Weiterleitungen. **Direkt nach dem Gespräch registrieren**, auf den Namen von Besart. → 05

## 1 · Salonkee (01)

- **Listenpreise Schweiz:**
  - Go CHF 79.–, Smart CHF 129.–, Pro CHF 159.– pro Monat.
  - Zusatzmodul «Payments» (Terminal, Kartenhinterlegung) CHF 35.– pro Monat, nur zu Smart oder Pro.
  - Mit Terminal also **mindestens CHF 164.– pro Monat**, ob mit oder ohne MwSt. ist offen. Das ist aus der Liste abgeleitet, nicht sein echter Vertrag.
- **Nicht öffentlich angegeben:** Kommission, Transaktionsgebühren, ob das Adyen-Terminal (AMS 1 / S1 F2) gekauft oder gemietet ist und was damit bei einer Kündigung passiert.
- **Einbetten geht nicht.** Salonkee sendet `X-Frame-Options: SAMEORIGIN`, das ist getestet. Möglich ist nur ein **Link bzw. Button**, der einen neuen Tab öffnet.
- **Datenexport:** Eine Exportfunktion ist öffentlich nicht beschrieben. Den Export **schriftlich verlangen, bevor man kündigt.** Der Salon ist für die Kundendaten verantwortlich, Salonkee bearbeitet sie nur in seinem Auftrag.
- **Übergang, falls er kündigt:**
  - Vertragsende **nicht** auf 31.12.2026 legen, sondern frühestens auf 31.01.2027, besser 28.02.2027.
  - Parallelbetrieb ab 14.12.2026.
  - Am Starttag umstellen: Google-Profil, Instagram-Link, Aushang.
  - Plan mit Kalenderdaten in 01, Abschnitt 5.

## 2 · Buchungssystem (02)

- **Empfehlung: Salonkee für Kalender und Buchung behalten.** Die Website wird das «Schaufenster» und führt in die Salonkee-Buchung.
- Wichtig für die Abwägung: **Cal.com ist seit dem 15.04.2026 nicht mehr Open Source.** Frei ist nur noch «Cal.diy», ohne Erinnerungen und laut Hersteller nicht für den Geschäftsbetrieb gedacht.
- **Plan B**, falls Salonkee zu teuer ist:
  - **Cal.com Cloud** (gratis, Ausfallgebühr über Stripe). Nachteile: Hosting in den USA, Leistungen nicht kombinierbar, SMS kosten extra.
  - **Easy!Appointments** (GPL-3.0) bei Infomaniak in der Schweiz. Nachteil: Erinnerungen und Online-Zahlung nur mit Zusatzentwicklung.
- Eine eigene Buchung direkt in der statischen Website geht **nicht**, weil GitHub Pages kein Backend hat.

## 3 · 24-Stunden-Storno (03)

- **Salonkee kann das bereits:**
  - Karte hinterlegen oder Anzahlung verlangen, Frist 12, 24, 48 oder 72 Stunden.
  - Die Regeln lassen sich je Kundengruppe setzen, z. B. nur für Neukunden.
  - Voraussetzung ist das Payments-Modul (CHF 35.– pro Monat).
- **Rechtlich:**
  - Die Gebühr gilt als Konventionalstrafe (Art. 160 ff. OR). Übermässige Beträge kann das Gericht herabsetzen (Art. 163 Abs. 3 OR).
  - Die Regel muss **vor der Buchung sichtbar** sein und per Checkbox akzeptiert werden.
  - Keine Rechtsberatung. Der Wortlaut von Art. 161 OR ist auf fedlex nachzuprüfen (die Seite war nicht abrufbar).
- **Vorschlag:** 50 % bei Absage unter 24 Stunden, 100 % bei Nichterscheinen. Die Gebühr entfällt, wenn der Termin neu vergeben wird. Fertige Texte für Website, Checkbox, Bestätigung und SMS stehen in 03, Abschnitt 4.
- **Praktisch, in drei Stufen:**
  1. Regel kommunizieren, Erinnerung vor Ablauf der 24-Stunden-Frist schicken, Ausfälle notieren.
  2. Erst bei Bedarf die Karte hinterlegen lassen, nur für Neukunden und lange Termine.
  3. Anzahlung nur für Kunden, die wiederholt nicht erscheinen.

## 4 · Zahlterminal (04)

Jahreskosten bei CHF 40'000.– Umsatz (50 % Debit, 25 % Kredit, 25 % TWINT). Annahmen: Durchschnittsbon CHF 50.–, Gerät auf 3 Jahre verteilt, exkl. MwSt.

| Lösung | CHF/Jahr | Monatsgebühr | TWINT am Gerät |
|---|---:|---|---|
| Stripe Tap to Pay + TWINT-Sticker | 670 | keine | nein (Sticker) |
| Stripe S700 + TWINT-Sticker | 690 | keine | nein (Sticker) |
| **Worldline EX4000 All-in-One** (Suchergebnis) | **702** | keine | **ja** |
| SumUp Standard + TWINT-Sticker | 713 | keine | nein (Sticker) |
| Payrexx POS (Abo Standard) | 758 | CHF 19.– | ja |
| myPOS Go 2 | 789 | keine (CHF 4.– pro Auszahlung) | ja |

- **1. Wahl: Worldline All-in-One.** Ein Gerät, ein Vertrag, eine Abrechnung inkl. TWINT, Telefon-Support in der Schweiz. Vor der Bestellung prüfen: Gerätepreis (gesehen CHF 149.–, 199.– und 249.–), Kündigungsfrist, Auszahlung.
- **2. Wahl: Stripe.** Am günstigsten, und ein Konto deckt auch Online-Anzahlung und Ausfallgebühr ab. Nachteil: TWINT läuft separat.
- **«Kollegenpreis»:** Den Betrag frei eintippen geht überall. Eine Rabattfunktion ist bei SumUp und Stripe belegt.
- **Buchhaltung:** Alle geprüften Anbieter haben einen CSV-Export für die Steuererklärung. Eine direkte Anbindung an Banana gibt es bei keinem, zu bexio nur über Zusatzdienste.
- **Achtung:** Bleibt Salonkee, ist die eigentliche Frage, ob sich das Payments-Modul (CHF 420.– pro Jahr nach Liste, plus unbekannte Adyen-Gebühren) gegenüber einem eigenen Terminal lohnt. Dafür am 10.11. die letzte Salonkee- bzw. Adyen-Abrechnung ansehen.

## 5 · Domains (05)

| Domain | Status (RDAP, 07.11.2026) | Infomaniak 1. Jahr / Verlängerung (CHF inkl. MwSt.) |
|---|---|---|
| besart.ch | **vergeben** (seit 2002) | – |
| **besart-hairsalon.ch** | frei | 5.00 / 10.70 |
| **besart-horgen.ch** | frei | 5.00 / 10.70 |
| **haarmitart.ch** | frei | 5.00 / 10.70 |
| besarthairsalon.ch (Tippschutz) | frei | 5.00 / 10.70 |
| besart.swiss / besart.com | **nicht prüfbar** (Infomaniak-Shop, RDAP und WHOIS gesperrt) | 89.00 / 115.45 bzw. 9.95 / 14.70 |

Das Paket aus 4 × .ch kostet CHF 20.– im ersten Jahr und danach CHF 42.80 pro Jahr. .swiss braucht eine UID bzw. einen Handelsregistereintrag und bringt hier keinen Vorteil.

## 6 · Herrenpreise (06)

Erfasst sind 58 Konkurrenzsalons in Horgen, Wädenswil, Oberrieden und Au ZH. **Nur 5 davon haben Preise online**: 23 Werte von Salonkee und Treatwell. Die eigenen Websites der Salons und Google waren nicht abrufbar.

| Leistung (Kerngebiet) | Median | n | Spanne | BesArt heute | Empfehlung «mittel» |
|---|---:|---:|---|---:|---:|
| Waschen+Schneiden | 59.– | 5 | 40–85 | ab 42.– | **ab 48.–** |
| Herrenschnitt trocken | 58.– | 3 | 39–75 | – | **42.–** (neu) |
| Bart | 41.– | 4 | 20–120 | 18.– | **25.–** |
| Schnitt+Bart | 80.– | 3 | 65–95 | – | **68.–** (neu) |
| Kinder/Jugend | 45.– | 8 | 35–60 | ab 30.– | **ab 35.–** (bis 12 J.); Jugend 13–16 J. **40.–** (neu) |
| Pensionäre | – | 0 | – | 25.– | **28.–** |

- Die Teuerung (LIK Sept. 2026 +1.0 %, Wert aus Suchergebnis) rechtfertigt allein nur wenig. Das Hauptargument ist der Abstand zum Markt.
- Auch mit der mittleren Variante bleibt BesArt unter dem Median und günstiger als die grossen Horgner Barber (DD-Barber, STB).
- **Abgleich:** Das Live-Profil auf Salonkee stimmt bei den Preisen 1:1 mit `index.html` überein. Salonkee zeigt aber jetzt **26 Bewertungen** (25× 5 Sterne, 1× 4 Sterne), auf der Website stehen noch 25. Das sollte beim nächsten Website-Update angepasst werden.

## Fragen und Unterlagen für den 10. November

- [ ] Salonkee-Vertrag bzw. Registrierungs-E-Mail: Paket, Laufzeit, Kündigungsfrist, Kündigungsweg, Verlängerungsdatum
- [ ] Letzte Salonkee- und Adyen-Abrechnung: Abo, Kommission, Transaktionsgebühren, TWINT ja/nein
- [ ] Terminal: gekauft oder gemietet? Wie läuft die Rückgabe?
- [ ] Wie viele Ausfälle bzw. kurzfristige Absagen gibt es pro Monat? (Entscheid über Stufe 1 oder 2 der Stornoregel)
- [ ] Will er Salonkee behalten (Komfort, Marktplatz) oder Fixkosten sparen?
- [ ] Preisvariante wählen (zurückhaltend, mittel oder ambitioniert) und den Umstellungstermin festlegen (ca. 4 Wochen vorher ankündigen)
- [ ] Domain bestätigen und registrieren (Inhaber: Besart Beka bzw. seine Firma); E-Mail-Adresse festlegen
- [ ] Ist er im Handelsregister eingetragen? (nur relevant für .swiss)
- [ ] Vorab von Hand prüfen, weil aus der Recherche-Umgebung nicht abrufbar: Worldline-Angebot (Preis, Gültigkeit), Verfügbarkeit von besart.com und besart.swiss im Infomaniak-Shop

## Dateien

- [01-salonkee-kuendigung.md](01-salonkee-kuendigung.md): Vertrag, Kosten, Export, Übergangsplan, Einbettung
- [02-opensource-buchung.md](02-opensource-buchung.md): Easy!Appointments, Cal.com, weitere Systeme, Empfehlung
- [03-storno-24h.md](03-storno-24h.md): Storno bei Salonkee und ohne Salonkee, Recht in der Schweiz, Textvorschläge
- [04-zahlterminals.md](04-zahlterminals.md): Terminal-Vergleich, Beispielrechnung, Empfehlung
- [05-domains.md](05-domains.md) und [domains.csv](domains.csv): Verfügbarkeit und Preise
- [06-preisvergleich-herren.md](06-preisvergleich-herren.md) und [preise-herren.csv](preise-herren.csv): Marktpreise und Preisempfehlung

## Quellen

Die Übersicht fasst die Dateien 01–06 zusammen und bringt keine neuen Zahlen. Alle Quellen mit URL und Abrufdatum (2026-11-07) bzw. dem Vermerk «nicht abrufbar» stehen dort jeweils im Abschnitt «Quellen».
