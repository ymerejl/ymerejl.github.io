# 04 – Zahlterminal: Ersatz für das Adyen-Terminal (Salonkee)

Stand: Recherche vom 2026-11-07. Alle Preise exkl. MWST, sofern nicht anders vermerkt. Abrufstatus der Quellen siehe Abschnitt «Quellen». Werte, die nur aus Suchergebnis-Snippets stammen, sind mit **(Snippet)** markiert: «laut Suchergebnis-Snippet, Seite nicht direkt abrufbar».

## Kurzfazit

- **Bei CHF 40'000 Kartenumsatz pro Jahr liegen alle sinnvollen Lösungen nahe beieinander: rund CHF 670.– bis 760.– pro Jahr** (Ø-Bon CHF 50). Der Unterschied zu SumUp (inkl. separatem TWINT-Sticker: **CHF 713.–**) beträgt höchstens etwa CHF 40.– bis 90.– pro Jahr. Mehr spart man gegenüber dem heutigen Salonkee-Setup: Das Payments-Modul allein kostet laut Recherche 01 CHF 35.– pro Monat (CHF 420.– pro Jahr) zusätzlich zu den Adyen-Gebühren.
- **1. Wahl: Worldline Axium EX4000 «All-in-One»** (Snippet). Gerät einmalig CHF 199.–, **keine Monatsgebühr**, **1,29 % + CHF 0.15 einheitlich für Debit, Kredit und TWINT am selben Gerät**, laut Worldline ohne Mindestvertragsdauer. Rechnung: **CHF 702.–/Jahr**. Worldline ist der grösste Terminal-Anbieter in der Schweiz und deckt Karten, TWINT, Auszahlung und Abrechnung mit einem Gerät und einem Vertrag ab. Weil die Worldline-Seite nicht abrufbar war, müssen Angebot und Preis (gesehen: CHF 149.–, 199.– und 249.–) vor der Bestellung geprüft werden.
- **2. Wahl: Stripe** (Terminal-Reader S700 für CHF 239.– oder Tap to Pay auf dem iPhone) **plus TWINT-Sticker direkt bei TWINT**. Mit **CHF 670.– bis 690.–/Jahr** ist das in der Rechnung am günstigsten. Keine Monatsgebühr. Online-Buchung, Anzahlung und No-show-Gebühr laufen über dasselbe Stripe-Konto (z. B. mit cal.com). Nachteile: TWINT läuft am Stripe-Terminal nicht, der Reader ohne eigene Software («Standalone mode») ist erst «public preview», der Support läuft nur online.
- **SumUp** bleibt ein solider Fallback (Gerät CHF 99.–, nach Black-Friday-Aktion CHF 69.–). Gratis-Tarif: 1,50 % Debit, 2,50 % Kredit. **SumUp akzeptiert in der Schweiz kein TWINT am Terminal** (Snippet, Aussage von Payrexx); TWINT braucht dann einen separaten Sticker (1,3 %). Das Abo «Zahlungen Plus» (CHF 29.–/Mt.) lohnt sich laut SumUp erst ab CHF 4'700.– Umsatz pro Monat. BesArt hat ca. CHF 3'333.–.
- **Payrexx** hat die tiefsten Sätze am Terminal (Debit 0,95 % + 0.15, Kredit 1,25 % + 0.15, TWINT 1,25 %) und kombiniert online und offline. Für ein Terminal ist aber **das Abo Standard nötig, CHF 19.–/Mt.** (mit 3-Jahres-Bindung CHF 15.–). Dazu kommt eine Gerätemiete von CHF 25.–/Mt.; die Geräte N6/N86 sind derzeit «mietfrei, solange Vorrat». Damit verletzt Payrexx das Kriterium «keine Monatsgebühr». Gratis gibt es nur Tap to Pay auf Android (1,65 % + 0.15; TWINT 1,30 %).
- **Nicht geeignet oder nicht verfügbar:** Teya (keine Schweiz-Präsenz gefunden), Square (keine Schweiz-Angaben gefunden), Zettle/PayPal POS (Verfügbarkeit in der Schweiz nicht belegt), Adyen direkt (Enterprise, Preise nur auf Anfrage), Viva.com und Nexi (keine Preise für die Schweiz gefunden), Shopify POS (für eine reine Dienstleistung überdimensioniert).
- **Buchhaltung:** Kein Anbieter hat eine belegte native Schnittstelle zu **Banana** oder **Run my Accounts**. Alle bieten Transaktions-Exporte (CSV) bzw. Abrechnungen. Zu **bexio** gibt es Anbindungen über Middleware: Payrexx via Make/Zapier, SumUp via PepperShop oder BedayaConnect (Snippet). wallee nennt eine Schnittstelle zu **Abacus**.
- **«Kollegenpreis»:** Bei allen Lösungen kann man den Betrag frei eingeben, damit lässt sich der Preis für die ~10 Freunde einfach tiefer eintippen. Eine Rabatt-Funktion in % oder CHF ist ausdrücklich belegt bei SumUp (Terminal: «Einfache Rabatte anwenden») und bei Stripe (Rabatte bei Kassenvorgängen). Für die Buchhaltung den reduzierten Betrag als Umsatz verbuchen. Der Rabatt muss nicht separat erfasst werden. Eine kurze Notiz «Kollegenpreis» im Kassenbuch ist sinnvoll.

---

## 1. Ausgangslage und Kriterien

- Heute laufen Online-Buchung und Terminal über Salonkee, die Abwicklung über Adyen (Modelle AMS 1 / S1 F2). Laut Recherche 01 braucht das Terminal das **Payments-Modul (CHF 35.–/Mt.)** zum Smart- oder Pro-Paket. Die Transaktionsgebühren sind nicht öffentlich und müssen an der Adyen-Abrechnung abgelesen werden.
- Kriterien von Besart: **zuverlässig**, **einfach zu verbinden**, **keine Zusatzkosten (keine Monatsgebühr)**, **tiefere Gebühren als SumUp**.
- Kartenmix für die Rechnung (Vorgabe): 50 % Debit (CHF 20'000), 25 % Kredit (CHF 10'000), 25 % TWINT (CHF 10'000).
- Hinweis Debitkarten: Maestro wird in der Schweiz durch Debit Mastercard und Visa Debit abgelöst (moneyland.ch, Snippet). In den Rechnungen gilt «Debit» = Debit Mastercard und Visa Debit.

## 2. Vergleichstabelle (Terminal / Vor-Ort-Zahlungen, Schweiz)

| Anbieter | Debit (DMC / Visa Debit) | Kredit (Visa/MC) | Amex | TWINT am Terminal | Hardware | Monatsgebühr | Laufzeit | Auszahlung |
|---|---|---|---|---|---|---|---|---|
| **SumUp** (umsatzbasiert) | 1,50 % | 2,50 % (auch Premium-/Nicht-EU-Karten) | 2,50 % | **Nein** (Snippet) | Solo Lite CHF 49.– (Aktion 25.–), Solo CHF 99.– (Aktion 69.–), Terminal CHF 169.– (Aktion 139.–) | CHF 0.– | «jederzeit kündbar» | nächster Werktag, «ohne zusätzliche Kosten» |
| SumUp «Zahlungen Plus» | 0,99 % | 0,99 % (Verbraucherkarten) | 1,99 % | Nein | wie oben | CHF 29.– | jederzeit kündbar | nächster Werktag |
| **myPOS** (< CHF 10'000/Mt.) | 1,50 % + 0.10 | 2,50 % | 3,00 % | **Ja**, per QR-Code auf dem Terminal, 1,25 % + 0.05 | Go 2 CHF 49.–, Flex CHF 69.–, Go Combo CHF 189.–, Ultra CHF 279.– | CHF 0.– | «keine vertragliche Bindung» | sofort aufs myPOS-E-Geld-Konto; **Überweisung in CHF auf die eigene Bank: CHF 4.00 pro Überweisung** |
| **Stripe Terminal** | 1,4 % + 0.10 (CH/EWR/UK-Karten) | 1,4 % + 0.10 | nicht separat ausgewiesen | **Nein** (TWINT nur online, Snippet) | WisePad 3 CHF 59.–, WisePOS E CHF 199.–, S700/S710 CHF 239.–, T600 CHF 269.–; Tap to Pay: + CHF 0.10 pro Autorisierung | CHF 0.– (Mobilfunkdaten optional CHF 8.–/Reader/Mt.) | keine Grundgebühr | nicht abgerufen (docs.stripe.com nicht abrufbar) |
| **Payrexx POS** | 0,95 % + 0.15 | 1,25 % + 0.15 | **nicht am POS** | **Ja**, 1,25 % | Miete CHF 25.–/Mt.; N6/N86 «currently free while supplies last» | **Abo Standard nötig: CHF 19.–** (2 J. 17.–, 3 J. 15.–) | 1–3 Jahre (Abo) | wöchentlich standard, auf Anfrage täglich oder monatlich |
| Payrexx Tap to Pay (Free, nur Android) | 1,65 % + 0.15 | 1,65 % + 0.15 | – | Ja, 1,30 % | eigenes Android-Gerät | CHF 0.– | – | täglich (nach 48 h), wöchentlich, monatlich |
| **wallee** «Terminal Only» (indikativ) | ca. 0,95 % + 0.10 (Visa Debit), DMC 0,45–0,49 % + 0.10 (Snippets, je nach Partner) | ca. 1,35–1,55 % (Snippets) | k. A. | **Ja**, ca. 1,3 % | PAX A50 CHF 299.– (Handelsverband), A50S CHF 249.– (Zuger KB) (Snippets); Miete möglich | CHF 0.– Plattform, aber **CHF 5.–/Mt. Terminal-Wartung (TID) + CHF 0.03/Trx** (Snippet) | k. A. | k. A. |
| **Worldline** EX4000 «All-in-One» | 1,29 % + 0.15 | 1,29 % + 0.15 | k. A. | **Ja**, im Satz inbegriffen | CHF 199.– einmalig (auch CHF 149.– bzw. 249.– gesehen) | CHF 0.– | laut Worldline keine Mindestvertragsdauer; AGB: Kündigungsfrist 3 Monate | k. A. |
| **PostFinance Checkout All-in-One** | 1,7 % (mind. CHF 0.20) | 1,7 % | k. A. | **Ja**, 1,7 % | PAX A50s CHF 189.– + Versand CHF 10.– | CHF 0.– | k. A. | Chargeback CHF 35.–; manuelle Auszahlung CHF 2.50 (Snippet) |
| PostFinance «Zahlungsarten Combo» | 1,2 % (mind. CHF 0.12) | 1,5 % | k. A. | Ja, 1,3 % | ab CHF 149.50 bzw. 189.– (Snippets) | **CHF 9.90/Terminal** | k. A. | evtl. PostFinance-Geschäftskonto nötig (nicht bestätigt) |
| **TWINT direkt** (QR-Sticker) | – | – | – | nur TWINT: **1,3 %**, keine Fixgebühr; Sticker mit Zahlungsinformationen + CHF 0.30/Trx | Sticker | CHF 0.– | k. A. | k. A. |
| Teya | – | – | – | – | in CHF nicht angeboten | – | – | keine Schweiz-Präsenz gefunden |
| Adyen direkt | Interchange++, ca. € 0.11 + Interchange (Snippet, Drittquelle) | dito | dito | k. A. | «nur auf Anfrage» | k. A. | Onboarding über Sales | – |

«k. A.» = keine Angabe gefunden.

## 3. Anbieter im Einzelnen

### 3.1 SumUp (www.sumup.com/de-ch) – abgerufen
- **Gebühren (Preisseite):** «Umsatzbasiertes Zahlen 0 €/Monat», «1,50 % Transaktionsgebühr für Vor-Ort-Zahlungen mit Debitkarten», «2,50% … mit American Express, Premium-Karten, Kreditkarten und Karten aus Nicht-EU-Ländern». Online und Zahlungslinks: 2,50 %. «Zahlungen Plus CHF 29/Monat»: 0,99 % für «Vor-Ort-Zahlungen mit inländischen Verbraucherkarten», 1,99 % für Amex, Premium- und Firmenkarten. Laut SumUp lohnt sich das ab «CHF 4.700 oder mehr» pro Monat.
- **TWINT:** Auf den SumUp-CH-Seiten steht TWINT in keiner Liste der Zahlungsarten. Payrexx schreibt «SumUp terminals do not accept TWINT» (Payrexx-Ratgeber, abgerufen; Quelle ist ein Wettbewerber). → TWINT separat per Sticker.
- **Hardware:** Solo Lite CHF 49.– regulär, Solo CHF 99.–, Terminal CHF 169.–, Kasse CHF 399.–. Bis zum Black Friday gelten Aktionspreise (CHF 25.– / 69.– / 139.–, «jeweils ein Kartenterminal pro neuem SumUp Konto»).
- **Vertrag / Auszahlung:** «keine langfristigen Vertragslaufzeiten … jederzeit kündigen», «Auszahlungen am nächsten Werktag … Ohne zusätzliche Kosten», «30-Tage-Geld-zurück-Garantie».
- **Betrag und Rabatt:** In der App «Betrag eingeben» (Tap-to-Pay-Seite); Terminal: «Einfache Rabatte anwenden». Voreingestellte Rabatte und «Buchführungs-Integrationen» gibt es erst im Abo **«Kassensystem Plus» (CHF 49.–/Mt.)**.
- **Buchhaltung:** CSV-Export aus dem Dashboard (Snippet, pfeffersack.ch). Zu bexio über das Paket PepperShop+SumUp im bexio-Marketplace oder über die Middleware BedayaConnect (ca. CHF 15.–/Mt., Snippet). Banana: Import nur per CSV, das Format muss angepasst werden (Snippet).
- **Online:** Zahlungslinks (CHF 0.– Monatsgebühr, 2,50 %). In den rechtlichen Informationen erscheint ein Produkt «SumUp Bookings» (Funktionsumfang nicht geprüft).

### 3.2 myPOS (www.mypos.com/de-ch) – per curl abgerufen (im Browser blockiert Cloudflare)
- **Gebühren (unter CHF 10'000 Umsatz/Mt.):** TWINT 1,25 % + 0.05, inländische Verbraucher-Debitkarten 1,50 % + 0.10, kommerzielle Inlands-Debit- und -Kreditkarten 2,50 % (+ 0.10 bei Debit), AMEX 3,00 %, «Alle sonstigen Verbraucher- und Geschäftskarten» 2,50 %. Darunter fallen auch die privaten Kreditkarten.
- **TWINT:** Laut myPOS-Meldung und Hilfe (Snippet) läuft TWINT per QR-Code auf Go, Combo und Carbon. Die Auszahlungswährung muss CHF sein. Ob das auch für das neue **Go 2** gilt: **nicht bestätigt**.
- **Hardware:** Go 2 CHF 49.–, Flex CHF 69.–, Go Combo CHF 189.–, Ultra CHF 279.–.
- **Haken:** Das Geld landet auf einem myPOS-E-Geld-Konto. Eine «Überweisung in CHF» auf die eigene Bank kostet **CHF 4.00**. Daneben gibt es eine Inaktivitätsgebühr von CHF 15.– (nach 10 Monaten ohne Transaktion) und eine «Gebühr für mangelnde Zusammenarbeit» von CHF 75.–.
- **Buchhaltung:** Keine bexio-, Banana- oder Abacus-Anbindung gefunden.

### 3.3 Stripe (stripe.com/ch) – abgerufen; docs.stripe.com nicht abrufbar
- **Terminal in der Schweiz verfügbar:** Ja. Auf der CH-Preisseite stehen die Terminal-Sätze und die Reader-Preise in CHF. Terminal: «1,4 % + 0,10 CHF pro erfolgreicher Zahlung für Karten aus der Schweiz, dem EWR und dem Vereinigten Königreich», «2,9 % + 0,10 CHF … alle anderen Karten», Tap to Pay «+ 0,10 CHF pro Autorisierung». Reader: WisePad 3 CHF 59.–, WisePOS E CHF 199.–, S700/S710 CHF 239.–, T600 CHF 269.–.
- **Ohne eigene Software:** Tap to Pay in der Stripe-Dashboard-App. Laut Stripe-Doku (Snippet) ist die Schweiz unterstützt. Für Hardware-Reader gibt es den «Standalone mode»: Betrag eingeben und kassieren, ohne eigene App. Er ist laut Doku (Snippet) aber «public preview»; die Verfügbarkeit in der Schweiz ist **nicht bestätigt**.
- **TWINT:** Nur online, z. B. über Payment Links und Checkout (Snippet). Am Terminal **nicht belegt**. → TWINT-Sticker separat.
- **Online / No-show:** Online-Karten 2,9 % + 0.30 CHF (Schweizer Karten). Dasselbe Konto dient für Online-Buchung, Anzahlung und Karte hinterlegen. cal.com hat eine Stripe-App (cal.com/apps/stripe, abgerufen). Gebühr für Zahlungsanfechtungen: CHF 20.–.
- **Risiko:** Bekannt sind Kontoprüfungen und -sperren bei automatischer Risikobewertung. Support läuft nur online. Für Laien ist die Einrichtung eher technisch.

### 3.4 Payrexx (www.payrexx.com) – abgerufen (inkl. payrexx.com/pricing.md, Stand Mai 2026)
- **POS-Gebühren («All Plans»):** Debit 0,95 % + CHF 0.15, Kredit 1,25 % + CHF 0.15, TWINT 1,25 % + CHF 0.00. AMEX läuft am POS nicht.
- **Voraussetzung:** «POS requires Standard or Premium plan». Standard kostet CHF 19.–/Mt. bei 1 Jahr, 17.– bei 2 Jahren, 15.– bei 3 Jahren. Terminalmiete «Nexgo N6: CHF 25/month (currently free while supplies last)».
- **Widerspruch:** Die Tap-to-Pay-Seite (abgerufen) spricht noch von «kostenlosen Abonnements (InStore und Free)» und einer «Better Fees-Erweiterung». In einem Payrexx-Ratgeber steht «Better Fees add-on (EUR 9/month)». → Das aktuelle Abo-Modell für POS vor der Bestellung bestätigen lassen.
- **Tap to Pay (Android, im Free-Abo):** Karten 1,65 % + CHF 0.15, TWINT 1,30 %. Zitat: «Tippe den gewünschten Betrag ein» (freie Betragseingabe). Jedes weitere Android-Gerät kostet CHF 4.–/Mt.
- **Auszahlung:** «standardmässig wöchentlich», auf Anfrage täglich; Auszahlungen in CHF.
- **Buchhaltung:** «Professional reports» und «Transaction export» in allen Abos. bexio via Make, Zapier oder Pipedream, nur in Standard und Premium (Snippet, Payrexx-Doku).
- **Online / No-show:** Tokenisierung und Vorautorisierung sind in allen Abos enthalten. Online-Gebühren Standard: Visa/MC 1,65 % + 0.18, TWINT 1,25 % + 0.18. Payrexx empfiehlt sich selbst ausdrücklich für Coiffeursalons (Ratgeber vom 06.10.2026).

### 3.5 wallee (wallee.com) – Seiten abrufbar, Preisseite app-wallee.com **nicht abrufbar**
- Terminals (PAX A35, A50/A50S, A77, A920/A920Pro) kann man kaufen oder mieten. Akzeptiert werden «Mastercard, Visa, Apple Pay, PostFinance Card, TWINT» (abgerufen).
- **Preise (alle Snippet):** «Terminal Only» CHF 0.00/Mt. plus CHF 0.03 pro Live-Transaktion plus «Terminal maintenance CHF 5.–/Mt.» (TID). Die Kartensätze schwanken je nach Partnerangebot: Zuger KB Visa/MC 1,35 % (+ 0.18 im Einführungsmodell CHF 19.95/Mt.), Debit 0,95 % + 0.10; Handelsverband Interchange+. TWINT meist 1,3 %. Die Rechnung unten ist deshalb nur **indikativ**.
- **Buchhaltung:** «Automatisierte Buchhaltung» mit Nebenbuch und Buchungssätzen, «Schnittstellen gibt es u.a. zu Abacus, MS Dynamics, SAP» (abgerufen).
- Wegen CHF 5.–/Mt. pro Terminal **nicht ganz ohne Monatsgebühr**.

### 3.6 Worldline / SIX (worldline.com) – **nicht abrufbar**, alle Werte Snippet
- **Axium EX4000 «All-in-One»:** «No fixed costs. No setup fees. All payment methods, including TWINT», **1,29 % + CHF 0.15** pro Transaktion. Höchstgebühr Debit Mastercard CHF 2.00, Visa Debit/V PAY CHF 3.50, Zuschlag 1,5 % für ausländische Karten. Gerätepreis CHF 199.– (Varianten CHF 149.– Aktion bzw. 249.–).
- Andere Bundles: Saturn 1000F2 kostet CHF 699.– oder CHF 35.–/Mt. Miete, dazu 1,7 %. Klassische Verträge laufen über Interchange++ mit individueller Offerte.
- **Vertrag:** Worldline wirbt mit «keine Mindestvertragsdauer». Die AGB sehen vor: «auf unbestimmte Dauer, jedoch mindestens für die allenfalls vereinbarte Mindestvertragsdauer», Kündigung mit 3 Monaten Frist (Snippet).
- **Online:** Saferpay ist ein separates Produkt mit separaten Gebühren (nicht geprüft).
- **Buchhaltung:** bexio-Kundenstory vorhanden (Snippet). Details zum Export: nicht geprüft.

### 3.7 PostFinance Checkout – **nicht abrufbar**, Snippet
- **All-in-One:** 1,7 % (mind. CHF 0.20) für Debit, Kredit und TWINT. «Gebühren nur, wenn Sie einkassieren.» PAX A50s CHF 189.–, Versand CHF 10.–.
- **Combo:** Debit 1,2 %, TWINT 1,3 %, Kredit 1,5 % (mind. CHF 0.12), dazu **CHF 9.90/Terminal/Mt.**
- Ob ein PostFinance-Geschäftskonto nötig ist: **nicht bestätigt**.

### 3.8 TWINT direkt (www.twint.ch) – **nicht abrufbar** (Cloudflare 403), Snippet
- QR-Code-Sticker: «Payment fee: 1.3%, no minimum fee». Sticker mit Zahlungsinformationen: zusätzlich CHF 0.30 pro Transaktion. Am Terminal bestimmt der Zahlungsdienstleister die Gebühr.
- Preis- und Leistungsverzeichnis V1.2 vom 24.07.2026 existiert (PDF auf twint.ch), konnte aber nicht abgerufen werden.
- Nachteil: Der Kunde tippt den Betrag selbst ein. Die Kontrolle läuft über die TWINT-Push-Meldung beim Händler. Es gibt eine zweite Abrechnung und eine zweite Auszahlung (separates Transitkonto, z. B. 1091).

### 3.9 Weitere Anbieter (kurz)
- **Teya:** Die Website und die Preise sind auf Grossbritannien ausgerichtet (GBP, UK-Support). Tap to Pay gibt es laut Pressemitteilung in UK, HU, IS, CZ, SK, HR, PT, IT, ES (Snippet). **Schweiz nicht gefunden.**
- **Zettle / PayPal POS:** Verfügbarkeit in der Schweiz **nicht belegt** (Snippet).
- **Square:** Keine Schweiz-Angaben gefunden. Square gilt allgemein als nicht in der Schweiz tätig (nicht bestätigt).
- **Viva.com, Nexi:** Keine CHF-Preisliste gefunden; Offerte nur individuell. Nexi-Terminals können TWINT, wenn der Acquirer es freischaltet (Snippet).
- **Adyen direkt:** Richtet sich an Mid-Market und Enterprise, Terminalpreise «nur auf Anfrage» (Snippet). Für einen 1-Mann-Salon nicht sinnvoll.
- **Shopify POS:** Laut Community sind Terminals in der Schweiz inzwischen verfügbar, mit TWINT (Snippet, widersprüchlich). Ein Webshop-Abo ist für einen Coiffeur unnötig.

## 4. Beispielrechnung

**Annahmen (gekennzeichnet):**
- Kartenumsatz CHF 40'000.– pro Jahr: Debit CHF 20'000.–, Kredit CHF 10'000.–, TWINT CHF 10'000.–.
- **Annahme Ø-Bon CHF 50.–** → 800 Transaktionen (400 Debit, 200 Kredit, 200 TWINT). Sensitivität mit CHF 35.– und 80.– siehe unten.
- Alle Kredit- und Debitkarten sind inländische Verbraucherkarten (keine Premium-, Firmen-, Amex- oder Auslandkarten).
- Hardware über 3 Jahre abgeschrieben, zum regulären Preis (ohne Black-Friday-Aktion), exkl. MWST.
- Wo TWINT am Terminal nicht geht: **+ TWINT-Sticker direkt 1,3 %** («+ Sticker»).
- myPOS: 12 Überweisungen pro Jahr à CHF 4.– auf die eigene Bank. Stripe: Reader über WLAN, also ohne Mobilfunk-Abo.

**Formel:**
Jahreskosten = Σ (Umsatz_Kategorie × Prozentsatz + Anzahl Trx_Kategorie × Fixgebühr) + Hardware ÷ 3 + 12 × Monatsgebühr + Sonstiges

Beispiel Worldline: 40'000 × 1,29 % = 516.00; 800 × 0.15 = 120.00; 199 ÷ 3 = 66.33 → **CHF 702.33**.
Beispiel SumUp: 20'000 × 1,5 % = 300; 10'000 × 2,5 % = 250; TWINT-Sticker 10'000 × 1,3 % = 130; 99 ÷ 3 = 33 → **CHF 713.00**.

**Ergebnis (Ø-Bon CHF 50.–, berechnet mit Python, Skript im Scratchpad `zahlterminals/calc/rechnung.py`):**

| Rang | Lösung | Debit | Kredit | TWINT | HW/Jahr | Abo/Jahr | Sonst. | **Jahreskosten CHF** | ohne Monatsgebühr? |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | Stripe Tap to Pay (iPhone) + Sticker | 360.00 | 180.00 | 130.00¹ | 0.00 | 0.00 | – | **670.00** | ja |
| 2 | Stripe Terminal S700 + Sticker | 320.00 | 160.00 | 130.00¹ | 79.67 | 0.00 | – | **689.67** | ja |
| 3 | wallee Terminal Only (indikativ) | 242.00 | 161.00 | 136.00 | 99.67 | 60.00 | – | **698.67** | nein (CHF 5.–) |
| 4 | **Worldline EX4000 All-in-One** | 318.00 | 159.00 | 159.00 | 66.33 | 0.00 | – | **702.33** | **ja** |
| 5 | PostFinance Combo | 240.00 | 150.00 | 130.00 | 66.33 | 118.80 | – | **705.13** | nein (CHF 9.90) |
| 6 | SumUp Standard + Sticker | 300.00 | 250.00 | 130.00¹ | 33.00 | 0.00 | – | **713.00** | ja |
| 7 | Payrexx Tap to Pay Free (Android) | 390.00 | 195.00 | 130.00 | 0.00 | 0.00 | – | **715.00** | ja |
| 8 | PostFinance All-in-One | 340.00 | 170.00 | 170.00 | 66.33 | 0.00 | – | **746.33** | ja |
| 9 | Payrexx POS (Standard, Gerät mietfrei) | 250.00 | 155.00 | 125.00 | 0.00 | 228.00 | – | **758.00** | nein (CHF 19.–) |
| 10 | myPOS Go 2 (TWINT am Gerät) | 340.00 | 250.00 | 135.00 | 16.33 | 0.00 | 48.00 | **789.33** | ja |
| 11 | SumUp Zahlungen Plus + Sticker | 198.00 | 99.00 | 130.00¹ | 33.00 | 348.00 | – | **808.00** | nein (CHF 29.–) |
| 12 | Payrexx POS (Standard + Miete CHF 25.–) | 250.00 | 155.00 | 125.00 | 0.00 | 528.00 | – | **1'058.00** | nein |

¹ TWINT separat direkt über den TWINT-Sticker (1,3 %), nicht am Terminal.

**Sensitivität Ø-Bon** (Jahreskosten in CHF; die Fixgebühren pro Transaktion wirken stärker bei kleinen Bons):

| Lösung | Ø-Bon CHF 35.– | Ø-Bon CHF 50.– | Ø-Bon CHF 80.– |
|---|---:|---:|---:|
| Stripe Tap to Pay + Sticker | 721.43 | 670.00 | 625.00 |
| Stripe S700 + Sticker | 715.38 | 689.67 | 667.17 |
| Worldline EX4000 All-in-One | 753.76 | 702.33 | 657.33 |
| SumUp Standard + Sticker | 713.00 | 713.00 | 713.00 |
| Payrexx Tap to Pay Free | 753.57 | 715.00 | 681.25 |
| PostFinance Combo | 705.13 | 705.13 | 705.13 |
| myPOS Go 2 | 810.76 | 789.33 | 770.58 |

**Lesart:** Bei kleinen Bons (unter ca. CHF 45.–) ist SumUp + Sticker gleich günstig oder günstiger als Worldline und Stripe. Ab ca. CHF 50.– gewinnen Lösungen mit einheitlichem Satz knapp. Effektiv kostet Worldline bei einem CHF-50-Bon 1,59 % und ist bei **Debit** damit etwas teurer als SumUp (1,50 %). Bei **Kredit** ist Worldline deutlich günstiger als SumUp (2,50 %). Die echten Ø-Bons von Besart (Herrenschnitt vs. Damen-Färben) aus der Salonkee- bzw. Adyen-Auswertung einsetzen.

## 5. Buchhaltung, Belege und Funktionen

| Punkt | SumUp | myPOS | Stripe | Payrexx | wallee | Worldline | PostFinance |
|---|---|---|---|---|---|---|---|
| Echtzeit-Übersicht in App/Dashboard | ja | ja (App) | ja | ja | ja (Portal) | ja (Portal, nicht geprüft) | k. A. |
| Export CSV/Excel/PDF | CSV (Snippet) | k. A. | CSV-Berichte (nicht verifiziert, Doku nicht abrufbar) | «Transaction export», «Professional reports» | Reports, Export und API | nicht geprüft | nicht geprüft |
| bexio | via PepperShop oder BedayaConnect (Snippet) | nein gefunden | nicht geprüft | via Make/Zapier (Standard+) | nicht gefunden | Kundenstory (Snippet) | k. A. |
| Banana | CSV-Import, Umformatierung nötig (Snippet) | – | – | CSV | CSV | – | – |
| Abacus | – | – | – | – | **ja** (laut wallee) | – | – |
| Run my Accounts | keine Angabe bei allen Anbietern gefunden. Run my Accounts verarbeitet in der Regel Bankauszüge und Belege, also reichen monatliche PDF- oder CSV-Abrechnungen (nicht bestätigt) | | | | | | |
| Freie Betragseingabe | ja | ja | ja (Dashboard-App) | ja | ja | ja | ja |
| Rabatt in % / CHF | ja («Einfache Rabatte»; Presets mit Kassensystem Plus) | nicht geprüft | ja (Rabatte im Checkout) | nicht geprüft | nicht geprüft | nicht geprüft | nicht geprüft |
| Online-Zahlung / Link, gleicher Anbieter | Zahlungslinks 2,5 % | Online 1,75 % + 0.30 | ja, 2,9 % + 0.30 | ja, ab 1,65 % + 0.18 | ja | Saferpay (separat) | ja (Checkout) |
| Karte hinterlegen / No-show | nicht belegt | nicht belegt | ja (Tokenisierung) | **ja** (Tokenisierung, Vorautorisierung) | ja (Tokenisierung) | über Saferpay | k. A. |

**Steuerbelege:** Für die Steuererklärung und die MWST reichen die monatlichen Abrechnungen bzw. Auszahlungsberichte des Anbieters (Brutto, Kommission, Netto) plus der Kontoauszug. Verbuchung laut Payrexx-Ratgeber: Umsatz brutto auf 3400, Gegenkonto Transitkonto 1090; Auszahlung an die Bank 1020; Kommission auf 6840. Die MWST wird immer auf den Bruttobetrag gerechnet. Zwei Anbieter (Terminal + TWINT-Sticker) bedeuten zwei Abrechnungen und zwei Transitkonten. Das ist ein echtes Argument für eine Lösung mit TWINT direkt am Terminal (Worldline, Payrexx, myPOS, wallee, PostFinance).

## 6. Empfehlung

**1. Wahl – Worldline Axium EX4000 «All-in-One»** (Bedingungen vor der Bestellung bestätigen)
- Zuverlässig: Worldline ist der Schweizer Marktführer, das Gerät ist ein eigenständiges Terminal ohne Smartphone.
- Einfach: Ein Gerät, ein Vertrag, eine Abrechnung für Debit, Kredit **und TWINT**.
- Keine Monatsgebühr und laut Worldline keine Mindestvertragsdauer.
- Jahreskosten ca. **CHF 702.–** gegenüber SumUp + Sticker CHF 713.–. Bei höheren Bons und mehr Kreditkarten wird der Vorteil grösser.
- Zu prüfen: aktueller Preis (CHF 149.–/199.–/249.–), ob das Angebot noch gilt, Kündigungsfrist (AGB: 3 Monate), Auszahlungsrhythmus und -gebühr, Online-Zahlungen (Saferpay) nur falls benötigt.

**2. Wahl – Stripe (S700 oder Tap to Pay auf dem iPhone) + TWINT-Sticker**
- In der Rechnung am günstigsten (**CHF 670.– bis 690.–**), keine Monatsgebühr.
- Stärkster Punkt: dasselbe Konto für **Online-Buchung mit Anzahlung, Karte hinterlegen und No-show-Gebühr**, z. B. falls die neue Website mit cal.com oder einem anderen Stripe-fähigen Buchungstool läuft.
- Schwächen: TWINT läuft separat über den Sticker (zweite Abrechnung). Der Reader ohne eigene Software ist erst «public preview». Support gibt es nur online. Kontosperren durch automatische Risikoprüfung kommen vor.

**Alternativen:**
- **Wenn Online und vor Ort aus einer Hand mit TWINT wichtiger sind als «keine Monatsgebühr»:** Payrexx Standard mit 3-Jahres-Abo (CHF 15.–/Mt.), solange die Geräte mietfrei sind. Payrexx bietet die tiefsten Sätze am Terminal und richtet sich ausdrücklich an Coiffeursalons.
- **Wenn er nichts umstellen und es einfach haben will:** SumUp Solo + TWINT-Sticker. Kaum teurer, aber TWINT läuft separat.
- **myPOS** nicht empfohlen: Wegen der Auszahlungsgebühr von CHF 4.– und des E-Geld-Kontos ist es nicht günstiger als SumUp.

**Risiken (alle Anbieter):**
- **Kontosperren und Auszahlungsstopps:** Bei Fintechs (SumUp, Stripe, myPOS) gibt es Berichte über gesperrte Konten und zurückgehaltene Auszahlungen (Snippet, Trustpilot/Ombudsman UK). SumUp- und myPOS-Guthaben sind E-Geld, keine Bankeinlage. → Auszahlung täglich auf die eigene Bank einstellen, nicht auf dem Anbieterkonto stehen lassen.
- **Support:** Worldline und PostFinance bieten Telefon-Support in der Schweiz. Bei Stripe und SumUp läuft der Support meist per Chat oder E-Mail. Bei Payrexx gibt es Telefon-Support nur im Premium-Abo.
- **Vertragsbindung:** Bei Payrexx-Abos senken 2 oder 3 Jahre Bindung den Preis. Bei Worldline gilt evtl. eine Mindestdauer laut Vertragsmodul. Bei Salonkee muss das alte Terminal bis Vertragsende im Betrieb bzw. in der Rückgabe geregelt sein (siehe Recherche 01).
- **Preise ändern sich:** Mehrere Angebote sind Aktionen (Black Friday, Worldline-Kampagne, Payrexx «while supplies last»). Vor dem Gespräch am 10.11. die Seiten von Worldline, wallee, PostFinance und TWINT selbst im Browser prüfen; aus der Recherche-Umgebung waren sie nicht abrufbar.
- **Premium-, Firmen-, Amex- und Auslandkarten** kosten bei fast allen Anbietern mehr (SumUp 2,5 %, myPOS 3 %, Stripe 2,9 % + 0.10, Worldline + 1,5 % Zuschlag). In der Rechnung sind sie nicht enthalten.

## Quellen

Abgerufen 2026-11-07, sofern nicht anders vermerkt.

- https://www.sumup.com/de-ch/preise/ – SumUp Preise Schweiz – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/ – SumUp Startseite CH (Hardwarepreise, Aktion) – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/solo-kartenlesegeraet/ – SumUp Solo – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/solo-lite-kartenterminal/ – SumUp Solo Lite – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/terminal-kartenterminal/ – SumUp Terminal (Funktionen, Rabatte) – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/sumup-one-abonnement/ – SumUp Zahlungen Plus – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/zahlungslinks/ – SumUp Zahlungslinks – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/tap-to-pay/ – SumUp Tap to Pay – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/kassensystem-kasse/ – SumUp Kasse – abgerufen 2026-11-07
- https://www.sumup.com/de-ch/rechtliche-informationen/ – SumUp rechtliche Informationen (u. a. «SumUp Bookings») – abgerufen 2026-11-07
- https://www.mypos.com/de-ch/pricing-and-fees – myPOS Preise Schweiz – abgerufen 2026-11-07 (per curl; im Browser Cloudflare-Sperre)
- https://www.mypos.com/de-ch/pricing-and-fees/fees – myPOS Gebührenverzeichnis (Überweisung CHF 4.00) – abgerufen 2026-11-07
- https://www.mypos.com/de-ch/kaufen-ec-kartenlesegeraet – myPOS Hardwarepreise CH – abgerufen 2026-11-07
- https://www.mypos.com/de-ch/tap-to-pay – myPOS Tap to Pay (TWINT via QR) – abgerufen 2026-11-07
- https://www.mypos.com/en/twint-for-swiss-clients – myPOS TWINT für Schweizer Kunden – Snippet, nicht direkt abgerufen
- https://help.mypos.com/hc/en-ch/articles/29824456603676-What-is-TWINT – myPOS Hilfe TWINT – Snippet, nicht abrufbar
- https://stripe.com/de-ch/pricing – Stripe Preise Schweiz (Terminal, Reader) – abgerufen 2026-11-07
- https://stripe.com/de-ch/terminal – Stripe Terminal – abgerufen 2026-11-07
- https://docs.stripe.com/no-code/tap-to-pay – Stripe Tap to Pay im Dashboard (Länderliste) – Snippet, nicht abrufbar
- https://docs.stripe.com/terminal/payments/ready-made-apps – Stripe Standalone mode (public preview) – Snippet, nicht abrufbar
- https://docs.stripe.com/payments/twint – Stripe TWINT (online) – Snippet, nicht abrufbar
- https://cal.com/apps/stripe – cal.com Stripe-App – abgerufen 2026-11-07
- https://www.payrexx.com/de/pricing – Payrexx Preise (Seite zeigt EUR-Geo-Version) – abgerufen 2026-11-07
- https://www.payrexx.com/pricing.md – Payrexx Pricing Switzerland (Stand Mai 2026) – abgerufen 2026-11-07
- https://www.payrexx.com/products/pos.md – Payrexx Card Readers / POS – abgerufen 2026-11-07
- https://www.payrexx.com/llms.txt – Payrexx Übersicht – abgerufen 2026-11-07
- https://www.payrexx.com/de/products/tap-to-pay – Payrexx Tap to Pay (CHF-Gebühren, Auszahlung) – abgerufen 2026-11-07
- https://www.payrexx.com/en/guides/kartenzahlung-im-coiffeursalon-schweiz-terminal-twint-trinkgeld-einrichten – Payrexx-Ratgeber Coiffeursalon (Stand Preise 06.10.2026; Wettbewerber-Quelle) – abgerufen 2026-11-07
- https://docs.payrexx.com/merchant/integration/unternehmenssoftware/bexio – Payrexx bexio – Snippet, nicht abrufbar
- https://wallee.com/zahlungen-annehmen/terminal-ubersicht – wallee Terminals – abgerufen 2026-11-07
- https://wallee.com/zahlungen-annehmen/kartenzahlungen-im-geschaft – wallee Kartenzahlung im Geschäft – abgerufen 2026-11-07
- https://wallee.com/zahlungen-annehmen/automatisierte-buchhaltung – wallee Automatisierte Buchhaltung (Abacus) – abgerufen 2026-11-07
- https://app-wallee.com/pricing/ch – wallee Pricing Schweiz – **nicht abrufbar** (Host blockiert), Werte aus Snippet
- https://en.wallee.com/partner/zuger-kb – wallee Angebot Zuger KB – Snippet, nicht abrufbar
- https://handelsverband.swiss/news/rahmenvertrag-acquiring-mit-wallee-mehrwert-fuer-mitglieder/ – Handelsverband Rahmenvertrag wallee – Snippet, nicht abrufbar
- https://www.neoffice.ch/en/wallee – Neoffice × wallee – Snippet, nicht abrufbar
- https://worldline.com/de-ch/campaigns/ms/ex4000-all-in-one – Worldline Axium EX4000 All-in-One – **nicht abrufbar**, Snippet
- https://worldline.com/en-ch/home/main-navigation/solutions/merchants/solutions-and-services/order-payment-solutions/instore-terminal-bundles – Worldline In-Store-Bundles – nicht abrufbar, Snippet
- https://support.worldline.com/content/dam/worldline/local/de-ch/documents/116131401_TC_GBC_for_Payment_Terminals_CHE_DE_01_2023.pdf – Worldline AGB Terminals – nicht abrufbar, Snippet
- https://postfinance.ch/en/business/products/payment-collection/omnichannel/combo-payment-all-in-one.html – PostFinance Checkout All-in-One – nicht abrufbar, Snippet
- https://www.postfinance.ch/de/unternehmen/produkte/einkassieren/zahlungsloesungen/zahlungsarten-combo.html – PostFinance Zahlungsarten Combo – nicht abrufbar, Snippet
- https://www.twint.ch/en/business-customers/twint-fees/ – TWINT Gebühren für Händler – **nicht abrufbar** (HTTP 403), Snippet
- https://www.twint.ch/en/business-customers/products/qr-code-sticker/ – TWINT QR-Code-Sticker – nicht abrufbar, Snippet
- https://www.twint.ch/content/uploads/2026/08/Preis-und-Leistungsverzeichnis-DE-V1-2.pdf – TWINT Preis- und Leistungsverzeichnis V1.2 – nicht abrufbar (403)
- https://www.teya.com/pricing – Teya Pricing (UK) – abgerufen 2026-11-07
- https://www.teya.com/card-machines – Teya Card Machines – abgerufen 2026-11-07
- https://pressat.co.uk/releases/teya-brings-tap-to-pay-on-iphone-to-merchants-across-europe-9216fd3672c414592c3d3f4c39090d78/print – Teya-Länder – Snippet, nicht abrufbar
- https://www.paypal.com/de/zettle – PayPal POS (ehemals Zettle) – Snippet, nicht abrufbar
- https://community.shopify.com/t/shopify-pos-terminal-switzerland/577262 – Shopify POS Schweiz – Snippet, nicht abrufbar
- https://www.adyen.com/en_GB/legal/schedule-payment-terminal-services – Adyen Terminal-Preise auf Anfrage – Snippet, nicht abrufbar
- https://comparepsp.pages.dev/providers/adyen/ – Adyen-Gebührenstruktur (Drittquelle) – Snippet, nicht abrufbar
- https://pfeffersack.ch/blog/sumup-buchhaltungssoftware-schweiz-vergleich – SumUp mit Buchhaltung verbinden (CH) – Snippet, nicht abrufbar
- https://www.bexio.com/en-CH/marketplace/sumup-peppershop-checkout-solution – bexio Marketplace SumUp/PepperShop – Snippet, nicht abrufbar
- https://www.moneyland.ch/en/card-payment-merchant-fees – moneyland Kartenzahlung Händler (Maestro-Ablösung) – Snippet, nicht abrufbar
- https://www.financial-ombudsman.org.uk/decision/DRN-5537881.pdf – UK-Ombudsman-Fall Kontokündigung SumUp – Snippet, nicht abrufbar
- /home/user/ymerejl.github.io/besart/_recherche/01-salonkee-kuendigung.md – interne Recherche 01 (Salonkee Payments-Modul CHF 35.–/Mt.)
