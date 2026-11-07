# 24-Stunden-Stornoregel für BesArt Hairsalon

Recherche-Stand: 2026-11-07 (alle Abrufe an diesem Tag). «Schätzung» = eigene Einschätzung, nicht belegt.

> **Kein Rechtsrat.** Diese Zusammenstellung ersetzt keine Beratung durch eine Anwältin oder einen Anwalt. Die amtlichen Gesetzestexte auf fedlex.admin.ch waren aus der Recherche-Umgebung **nicht abrufbar**. Gesetzeszitate stammen aus Suchergebnissen bzw. Sekundärquellen und sind entsprechend gekennzeichnet. Vor der Veröffentlichung von AGB sollte der Wortlaut auf fedlex geprüft und idealerweise von einer Fachperson (z. B. Rechtsdienst von Coiffure Suisse oder Gewerbeverband) gegengelesen werden.

## Kurzfazit

- **Salonkee kann die 24-h-Regel schon heute automatisch umsetzen.** Mit dem **Payments-Modul (CHF 35/Monat, nur zusammen mit dem Smart- oder Pro-Paket)** sind «Stornierungs-/No-Show-Richtlinien» mit **Kartenhinterlegung** oder **Anzahlung** möglich. Die Frist ist auf **12, 24, 48 oder 72 Stunden** einstellbar. Regeln lassen sich nach Kundengruppe setzen (z. B. nur für Neukunden).
- **Ohne Salonkee** ist «Karte hinterlegen und später belasten» technisch mit **Stripe** (SetupIntent + off-session PaymentIntent, Gebühr 2,9 % + CHF 0.30 für CH-Karten) oder **Payrexx** (Tokenisierung/Pre-Authorization, Visa/MC ab 2,50 % + CHF 0.30 im Free-Abo) machbar. Wichtig: **TWINT kann bei Payrexx keine Vorautorisierung.** Stripe bietet seit Mai 2026 gespeichertes TWINT für Off-Session-Zahlungen an (laut Changelog-Snippet, nicht direkt geprüft). Ob sich das für No-Show-Gebühren eignet, ist **nicht bestätigt**.
- **Rechtlich** ist eine Ausfallgebühr in der Schweiz grundsätzlich vereinbar. Das geht als **Konventionalstrafe (Art. 160 ff. OR)** oder als pauschalierter Schadenersatz. Voraussetzung: Die Regel wird **vor der Buchung klar angezeigt und aktiv akzeptiert** (Checkbox), ist **nicht überraschend** (Ungewöhnlichkeitsregel) und hat eine **angemessene Höhe**. Übermässige Strafen setzt das Gericht herab (Art. 163 Abs. 3 OR). Gegenüber Konsumenten gilt zusätzlich **Art. 8 UWG**.
- **Höhe:** **50 % des Leistungspreises bei Absage unter 24 h, 100 % bei Nichterscheinen** ist branchenüblich und dürfte vertretbar sein (Schätzung, kein Gerichtsentscheid gefunden). Für ein Damen-Styling à CHF 95 wären das CHF 47.50 bzw. CHF 95.
- **Empfehlung (Stufenmodell):** (1) Regel auf Website, Buchungsbestätigung und Erinnerungs-SMS kommunizieren, ohne Zahlungszwang. (2) Ausfälle ein paar Monate protokollieren. (3) Erst dann Karte hinterlegen, und zwar nur für **Neukunden, lange/teure Termine (Farbe, Balayage, Strähnen) und Wiederholungstäter**. Stammkundschaft bleibt verschont. Kulanz bei Krankheit/Notfall gilt als Grundsatz.

---

## 1. Wie Salonkee, Treatwell und Booksy Ausfälle handhaben

### 1.1 Salonkee (heute im Einsatz)

**Pro-Seiten (salonkee.com/pro/de-CH/…):**

- Preise: Go CHF 79, Smart CHF 129, Pro CHF 159 pro Monat. **«SALONKEE PAYMENTS-MODUL CHF 35 pro Monat»**, Hinweis «Zu Smart- oder Pro-Paket hinzufügen». Inhalt: «Zahlungsterminal (optional), Stornierungs- / No-Show-Richtlinien, Online-Zahlungen, Online-Verkauf von Geschenkgutscheinen, Online-Verkauf von Abonnements». In der Vergleichstabelle stehen die Zeilen «Online-Stornierungsrichtlinie» und «Offline-Stornierungsrichtlinie (Termine per Telefon oder im Salon)». Welche Pakete die einzelnen Häkchen haben, liess sich aus der Seite nicht auslesen (**nicht bestätigt**). Das Go-Paket enthält bereits «Bestätigungen und Erinnerungen per SMS und E-Mail». (salonkee.com/pro/de-CH/preise/)
- Seite «Onlinezahlungen & EC-Gerät»:
  > «Richten Sie eine flexible No-Show-Richtlinie ein, um Verluste durch spätere Stornierung oder Nichterscheinen zu verringern … und können entscheiden, ob Kunden Anzahlungen leisten oder eine Karte hinterlegen müssen. Sie können außerdem besondere Regeln für unterschiedliche Kundengruppen einrichten und beispielsweise nur bei Neukunden eine Anzahlung verlangen. Selbstverständlich können Sie Stornierungsgebühren ganz flexibel anwenden oder auch erstatten.»
- Ob Besart das Payments-Modul schon hat, ist unbekannt. Weil er das Salonkee/Adyen-Terminal nutzt und das Terminal zum Payments-Modul gehört, ist es wahrscheinlich (**Ableitung, nicht bestätigt**). Transaktionsgebühren für Online-Belastungen hat Salonkee auf den geprüften Seiten nicht veröffentlicht (**nicht bestätigt**).

**AGB für Endkunden (salonkee.ch/terms, «Zuletzt aktualisiert am: 01/06/2026»), Ziff. 14 «Vorauszahlung, Stornierung, No-Show und Bedingungen»:**

- Ziff. 14.1, Kartenhinterlegung:
  > «In diesem Fall wird Ihre Karte oder Online-Geldbörse für die spätere Zahlungsabwicklung mit einem Token versehen … Die Karte wird von Salonkee erst dann belastet, wenn der Termin entweder unter den unten genannten Umständen storniert oder eingelöst und persönlich direkt an den professionellen Nutzer bezahlt wird.»
- Anzahlung: «ein vorher festgelegter Betrag (ein bestimmter Prozentsatz des Gesamtwerts der Buchung)» wird direkt nach der Buchung abgebucht und bei Wahrnehmung des Termins angerechnet.
- Frist: «weniger als 12, 24, 48 oder 72 Stunden (wie vom professionellen Nutzer festgelegt)». Ziff. 14.3: Bei Absage innerhalb der Frist «wird Ihnen die entsprechende Stornogebühr in Rechnung gestellt (Kartenhinterlegung) bzw. Sie erhalten keine Rückerstattung (Anzahlung)».
- Einbezug: Der Kunde akzeptiert «die entsprechenden Stornierungs- und No-Show-Bestimmungen des professionellen Nutzers, die zum Zeitpunkt der Buchung auf der Kassenseite angegeben sind».
- Verantwortung: Vertragspartner ist der Salon («Seller of Record»). Er ist verantwortlich für «die Bereitstellung der geltenden Stornierungs-, (Voraus-)Zahlungs- und No-Show-Bestimmungen und der Einhaltung des anwendbaren Verbraucherrechts» (Ziff. 13).
- Kartendaten: «Salonkee speichert Ihre Karteninformationen zu keiner Zeit auf seinen eigenen Servern, sondern verweist nur auf Ihre tokenisierte Karte durch seinen Zahlungsanbieter.»
- Hilfe-Center: https://help.salonkee.com ist **nicht abrufbar**. Die genauen Einstellungsschritte sind daher nicht belegt.

### 1.2 Treatwell (Vergleich)

Buchungsbestimmungen treatwell.ch («Letzte Aktualisierung: September 2026»):
- «Jeder Partner legt seine eigene Stornierungsfrist fest (in der Regel 24 bis 72 Stunden vor dem Termin) …»
- Bei Absage innerhalb der Frist: «… haben Sie nicht automatisch Anspruch auf eine Rückerstattung; eine etwaige Rückerstattung liegt in diesem Fall im Ermessen des jeweiligen Partners».
- Vor-Ort-Zahlung: «Wenn Sie nicht zu einem Termin erscheinen, den Sie nicht bezahlt haben, haften Sie dennoch gemäss dem Partner-Vertrag gegenüber dem Partner für den vollen Betrag …»
- Bezahlung grundsätzlich bei der Buchung in CHF (Karte/PayPal), ausser bei «Vor-Ort-Zahlung». Es gilt Schweizer Recht.

Treatwell arbeitet also vor allem mit **Vorauszahlung** plus Partnerfrist. Ein «Karte hinterlegen» war in den Bedingungen nicht beschrieben.

### 1.3 Booksy (Vergleich)

biz.booksy.com und support.booksy.com sind **nicht abrufbar**. Laut Suchergebnis-Snippets (Seiten nicht direkt abrufbar):
- «No-Show Protection» mit zwei Varianten: **Deposit** (Anzahlung verfällt bei Absage/No-Show) oder **Cancellation Fee** (Karte hinterlegen). «Upon booking, clients are notified about your Cancellation Fee Policy and asked to put a card on file.»
- Gebühr manuell belasten oder erlassen. Automatische Belastung ist konfigurierbar. Gilt auch nur für bestimmte Leistungen. «Trusted Client» kann von Anzahlung/Gebühr ausgenommen werden.
- Voraussetzung: Booksy «Mobile Payments» (US-Gebühr laut Booksy-Blog 2,69 % + USD 0.30). Ob Booksy in der Schweiz aktiv ist, wurde nicht geprüft.

**Gemeinsamer Nenner der Plattformen:** Frist frei wählbar (meist 24–72 h). Die Regel wird beim Checkout angezeigt und akzeptiert. Entweder Anzahlung oder hinterlegte Karte, Erlass im Einzelfall möglich, Ausnahmen für Stammkunden.

---

## 2. Lösungen ohne Salonkee

### 2a) Karte hinterlegen mit Stripe (SetupIntent + spätere Off-Session-Belastung)

**So funktioniert es** (docs.stripe.com ist **nicht abrufbar**, Angaben laut Suchergebnis-Snippets aus der Stripe-Doku):
- Bei der Buchung wird ein **SetupIntent** erstellt («useful for businesses that onboard customers but don't charge them right away»), `usage=off_session`. Die Karte wird bei Stripe gespeichert, der Salon sieht nur einen Token.
- Bei einem No-Show erstellt der Salon später einen **PaymentIntent mit `off_session: true`**. Stripe markiert das als **Merchant-Initiated Transaction (MIT)**. Dafür ist eine **Vereinbarung mit dem Kunden** nötig («merchant-initiated transactions require an agreement between you and your customer»). Genau dafür braucht es die akzeptierte Stornoregel.
- **SCA / 3-D Secure:** Europäische Karten verlangen beim Speichern oft eine Authentifizierung. Bei der späteren Belastung fragt Stripe eine MIT-Ausnahme an. Diese ist aber **im Ermessen der kartenausgebenden Bank**. Lehnt die Bank ab (`authentication_required`), muss der Kunde «on-session» zurückgeholt werden. In dem Fall kommt man an das Geld nur, wenn der Kunde mitmacht.
- **Alternative «Hold» (Vorautorisierung, `capture_method=manual`):** Online-Kartenzahlungen bleiben typischerweise **7 Tage** reserviert (Visa MIT ca. 4 Tage 18 Std.), erweiterte Autorisierung bis 30 Tage nur für bestimmte Branchen. Für Termine, die Wochen im Voraus gebucht werden, taugt ein Hold deshalb nicht. Dafür braucht es SetupIntent/Token (laut Snippet docs.stripe.com/payments/place-a-hold-on-a-payment-method).
- **Cal.com** setzt genau diese Variante um: Die Stripe-App-Option «HOLD» bzw. «Charge no-show fee» erzeugt einen SetupIntent. Die Belastung erfolgt später mit `off_session: true`, optional automatisch bei Absage innerhalb einer Frist in Minuten/Stunden/Tagen (Code `packages/app-store/stripepayment/…` in calcom/cal.diy; Blog cal.com/blog/time-based-cancellation-fees-for-no-show). Details siehe `02-opensource-buchung.md`.

**TWINT bei Stripe:** Die Stripe-Seite zu TWINT (stripe.com/de-ch/payment-method/twint) nennt «Wiederkehrende Zahlungen: Ja», Transaktionswährung CHF, «Kundenseitig initiiert». Laut Suchergebnis-Snippet des Stripe-Changelogs (2026-05-27, «recurring-payments-twint», Seite nicht direkt abrufbar) kann TWINT jetzt mit `setup_future_usage=off_session` gespeichert und für Off-Session-Zahlungen genutzt werden, mit **einem aktiven Mandat pro Händler/Kunde**. **Nicht bestätigt** ist, ob TWINT-Mandate für unregelmässige Einzelbelastungen wie eine No-Show-Gebühr gedacht sind und wie viele Kunden ein solches Mandat bei einer Coiffeur-Buchung akzeptieren würden. Für TWINT bleibt die **Anzahlung** (2c) die sichere Variante.

**Kosten Stripe (stripe.com/de-ch/pricing):**
- Online-Karten: **2,9 % + CHF 0.30** (Schweizer Karten), **3,25 % + CHF 0.30** (ausländische Karten), **+2 %** bei Währungsumrechnung. Keine Einrichtungs- oder Monatsgebühren. Eine eigene Gebühr fürs blosse Speichern (SetupIntent) war auf der Preisseite nicht ausgewiesen (**nicht bestätigt**).
- Rückbuchung (Dispute): **CHF 20.00** pro Fall, plus CHF 20.00 für den Widerspruch (wird bei Erfolg erstattet).
- Rechenbeispiele (eigene Rechnung): Gebühr CHF 47.50 (50 % von CHF 95) → Stripe ca. **CHF 1.68**. Gebühr CHF 21.00 (50 % von CHF 42) → ca. **CHF 0.91**.
- Gebühren entstehen nur bei tatsächlicher Belastung.

**Vorteile:** sehr flexibel, dokumentiert, in Cal.com fertig eingebaut, PCI-Last liegt bei Stripe («Bibliotheken, um Zahlungsinformationen zu erfassen, ohne dass jemals sensible Daten auf Ihre Server gelangen»).
**Nachteile:** braucht eine Buchungssoftware oder ein Backend (nicht mit reiner GitHub-Pages-Seite machbar). Das Einziehen kann an SCA scheitern. Rückbuchungsrisiko (CHF 20 pro Fall). Das Erfassen der Karte schreckt manche Kunden bei der Buchung ab (Schätzung).

### 2b) Payrexx und wallee (Schweizer Anbieter)

**Payrexx** (www.payrexx.com/pricing, Schweizer Version in CHF):
- Online-Transaktionsgebühren **Free / Standard / Premium**: Visa/Mastercard **2.50 % + CHF 0.30 / 1.65 % + CHF 0.18 / 1.35 % + CHF 0.18**. TWINT **1.30 % + CHF 0.30 / 1.25 % + CHF 0.18 / 1.25 % + CHF 0.18**. PostFinance Pay 1.90 % + CHF 0.20 (Premium 1.50 %).
- Monatsgebühr: Die Preise werden auf der Seite dynamisch geladen und waren nicht auslesbar. Laut Suchergebnis-Snippet (payrexx.com/en-ch/pricing, Seite nicht direkt abrufbar): Free CHF 0, **Standard CHF 19, Premium CHF 49 pro Monat** exkl. MwSt., Rabatt bei 2-/3-Jahres-Laufzeit. **Nicht bestätigt.**
- **Pre-Authorization / Karte speichern:** Payrexx-Guide «No-Show-Gebühren in der Physiotherapie» (veröffentlicht 3. Juni 2026, aktualisiert 6. Oktober 2026):
  > «Payrexx unterstützt Pre-Authorization für Visa, Mastercard (Debit und Kredit), Apple Pay, Google Pay und Samsung Pay. TWINT und PostFinance unterstützen Pre-Authorization technisch nicht.»
  > «Pre-Authorization ist in allen Plänen inklusive Free verfügbar»
  > «Bei No-Show: im Payrexx-Dashboard die reservierte Gebühr abbuchen»
- Laut Snippets der Payrexx-Doku (docs.payrexx.com nicht abrufbar): «Tokenisierung» heisst «Speicherung einer Kreditkarte für zukünftige Zahlungen». Im Gateway gibt es den Parameter `preAuthorization=1`. Ausserdem: «Eine Tokenisierung garantiert nicht, dass der Betrag später tatsächlich belastet werden kann» (geprüft werden nur Kartennummer und Ablaufdatum).
- Ohne eigene Buchungssoftware müsste die Karte über einen Payrexx-Payment-Link bzw. eine Payrexx-Page separat zur Buchung erfasst werden (umständlich für den Kunden, Schätzung).

**wallee** (wallee.com, Schweizer Anbieter):
- Seite «Wiederkehrende Zahlungen»: «Tokenisierung – Wir nutzen Tokens! Ein Token ist eine sicher gespeicherte Referenz auf die Zahlungsmethode Ihres Kunden …». «Wir speichern alle Zahlungsdaten sicher. So müssen Sie sich über PCI Compliance … keine Gedanken machen.» Laut Snippets der Plugin-Doku gibt es «deferred completion» (zuerst autorisieren, später mit anderem Betrag capturen).
- Es gibt ein fertiges wallee-Plugin für das Schweizer Buchungstool **eTermin** (wallee.com/plugins/etermin).
- Preise: app-wallee.com/pricing ist **nicht abrufbar**. Laut Suchergebnis-Snippet: «Business CHF 69.90 per month» (für mehr als 300 Transaktionen/Monat), «Terminal Only CHF 0.00». **Nicht bestätigt.** Für einen 1-Mann-Salon wohl überdimensioniert (Schätzung).

**Vorteile:** Schweizer Anbieter, CHF, TWINT-Akquiring inklusive, Support aus der Schweiz.
**Nachteile:** Kein fertiger «24-h-Automat». Die Belastung erfolgt manuell im Dashboard, ausser bei eigener Integration. Eine Pre-Authorization verfällt bei Karten typischerweise nach einigen Tagen. Bei langfristig gebuchten Terminen braucht es Tokenisierung statt Hold (Schätzung, analog zu Stripe).

### 2c) Anzahlung bei Buchung

- Funktionsweise: Bei der Buchung wird ein Teil bezahlt (z. B. CHF 20 oder 30 %) und beim Termin angerechnet. Bei rechtzeitiger Absage wird zurückerstattet, sonst verfällt der Betrag. So macht es Salonkee («Anzahlungen», Ziff. 14.1 AGB) und Booksy («Deposit»). Treatwell setzt meist auf Vollvorauszahlung.
- **Funktioniert mit TWINT** (Sofortzahlung). Das Payrexx-Guide empfiehlt das ausdrücklich: «Für TWINT-zahlende Patient:innen empfiehlt sich eine Vorauszahlung mit Rückerstattungsoption bei korrekter Absage.»
- Kosten: Transaktionsgebühr auf jede Anzahlung, auch wenn der Kunde kommt (z. B. TWINT über Payrexx Free 1.30 % + CHF 0.30 → bei CHF 20 ca. CHF 0.56). Bei Rückerstattungen fällt die Gebühr je nach Anbieter evtl. trotzdem an (**nicht geprüft**).
- **Vorteil:** Das Geld ist schon da, es gibt kein SCA-Problem und keinen Inkassoaufwand.
- **Nachteil:** Grösste Hürde beim Buchen. Gebühren fallen bei *jeder* Buchung an. Der Aufwand für Rückerstattungen steigt. Für Stammkundschaft eines Quartier-Coiffeurs wirkt es eher abschreckend (Schätzung).

### 2d) Rechnung im Nachhinein (QR-Rechnung)

- Funktionsweise: Die Regel wird bei der Buchung akzeptiert. Nach einem No-Show schickt der Salon eine QR-Rechnung über die Ausfallgebühr (per E-Mail/Post). Payrexx hat ein Produkt «Swiss QR-Rechnung» bzw. «Invoice» (in der Funktionsliste der Preisseite, Plan-Zuordnung nicht auslesbar).
- **Vorteil:** keine Kartendaten, keine Hürde bei der Buchung, keine Gebühren ausser dem Zeitaufwand.
- **Nachteil:** Die Zahlung ist freiwillig. Bei Nichtzahlung bleiben Mahnung und Betreibung. Payrexx-Guide: «Ohne Kreditkartengarantie bleibt nur das Betreibungsverfahren, das sich für Beträge unter CHF 100 kaum lohnt.» Zudem riskiert man Ärger mit der Kundschaft.
- Taugt gut als **Abschreckung** und für Stammkunden, bei denen man ohnehin den Kontakt pflegt (Schätzung).

### 2e) Übersicht

| Variante | Schutz | Hürde beim Buchen | TWINT | Kosten (belegt) | Technik |
|---|---|---|---|---|---|
| Salonkee Kartenhinterlegung/Anzahlung | hoch | mittel | Anzahlung: «Karte oder Online-Geldbörse» (TWINT nicht explizit bestätigt) | CHF 35/Mt. Modul (+ Smart/Pro), Transaktionsgebühr nicht veröffentlicht | fertig |
| Stripe SetupIntent (z. B. via Cal.com) | hoch (ausser SCA-Ablehnung) | mittel | evtl. (Mandat, nicht bestätigt) | 2,9 % + CHF 0.30 nur bei Belastung | Buchungssoftware nötig |
| Payrexx Pre-Auth/Token | hoch | mittel | **nein** | ab 2.50 % + CHF 0.30 (Free) | Payment-Link oder Integration |
| Anzahlung | sehr hoch | hoch | **ja** | Gebühr auf jede Buchung | einfach |
| QR-Rechnung danach | tief | **keine** | – | nur Aufwand | einfach |
| Nur Regel + Erinnerung | tief bis mittel | keine | – | SMS-Kosten | einfach |

---

## 3. Rechtliches (Schweiz)

**Hinweis zu den Quellen:** fedlex.admin.ch, admin.ch, bger.ch, law.ch, weka.ch, droit-bilingue.ch und servat.unibe.ch waren **nicht abrufbar**. Die folgenden Zitate stammen aus **Suchergebnis-Snippets** (Seiten nicht direkt abrufbar). Vor einer Verwendung sollte man sie am amtlichen Text prüfen.

### 3.1 Vertrag und Qualifikation

- Mit der Terminbuchung kommt ein Vertrag zustande (so auch der Payrexx-Guide: «Mit der Terminbuchung kommt in der Schweiz ein Vertrag zustande – auch ohne schriftliche Bestätigung.»).
- Ob ein Coiffeurbesuch als **Werkvertrag (Art. 363 ff. OR)** oder als **Auftrag (Art. 394 ff. OR)** gilt, ist nicht abschliessend geklärt. Ein Blick-Ratgeber ordnet den Haarschnitt als Werkvertrag ein («Der Spitzenschnitt mit den sanften Strähnchen ist das Werk»). Eine Fachquelle zur Abgrenzung im Coiffeurkontext wurde nicht gefunden. Die Folgen unterscheiden sich:
  - **Auftrag, Art. 404 OR:** Abs. 1: Der Auftrag «kann jederzeit gekündigt oder widerrufen werden» (zitiert in einem Entscheid des Kantonsgerichts SG, laut Snippet). Die Rechtsprechung behandelt das als **zwingend**. Laut Snippet (Zusammenfassung weka.ch/law.ch) kann auch eine Konventionalstrafe dieses Recht nicht ausschliessen. **Abs. 2:** Erfolgt die Kündigung **«zur Unzeit»**, schuldet die zurücktretende Partei **Ersatz des verursachten Schadens**. Unzeit heisst: ohne wichtigen Grund in einem ungünstigen Moment, mit besonderen Nachteilen für die andere Seite. Ersatzfähig ist nach Lehre grundsätzlich das **negative Interesse**, nicht der entgangene Gewinn (laut Snippet). Eine kurzfristige Absage, wenn der Termin nicht mehr vergeben werden kann, ist ein typischer Unzeit-Fall (Schätzung). Ein WEKA-Fachartikel behandelt genau die «Risikominderung durch den pauschalisierten Schadenersatz» bei Kündigung zur Unzeit (nur Titel bekannt, Seite nicht abrufbar).
  - **Werkvertrag, Art. 377 OR:** Der Besteller kann zurücktreten, solange das Werk unvollendet ist, aber gegen Vergütung der geleisteten Arbeit und **«volle Schadloshaltung»** des Unternehmers. Laut BGE 117 II 273 (via law.ch-Snippet) ist er so zu stellen, als wäre der Vertrag erfüllt worden, verschuldensunabhängig.
- **Nichterscheinen ohne Absage (No-Show):** Je nach Qualifikation ist das Gläubigerverzug des Kunden bzw. eine Vertragsverletzung. Ein Schadenersatzanspruch (Art. 97 ff. OR) setzt den **Nachweis des Schadens** voraus. Der Payrexx-Guide nennt das «in der Praxis … schwer durchsetzbar». Deshalb arbeitet man mit einer vorab vereinbarten Pauschale.

### 3.2 Konventionalstrafe, Art. 160–163 OR

- **Art. 160 OR:** Für Nichterfüllung oder nicht richtige Erfüllung kann eine Strafe versprochen werden. Ohne andere Abrede kann der Gläubiger **Erfüllung oder Strafe** verlangen (Alternativität, BGE 122 III 420, laut Snippet).
- **Art. 161 OR:** Die Strafe verfällt grundsätzlich **auch ohne Schaden**. Übersteigt der Schaden die Strafe, kann der Gläubiger den Mehrbetrag nur bei Verschulden verlangen. (Wortlaut nicht abrufbar, Inhalt aus Fachwissen, **auf fedlex prüfen**.) Laut law.ch-Snippet setzt der Verfall ein vom Schuldner zu vertretendes Verschulden voraus.
- **Art. 163 OR** (Wortlaut laut Snippet droit-bilingue.ch):
  > «1 Die Konventionalstrafe kann von den Parteien in beliebiger Höhe bestimmt werden.»
  > «3 Übermässig hohe Konventionalstrafen hat der Richter nach seinem Ermessen herabzusetzen.»
  Herabgesetzt wird nur bei **Augenfälligkeit**: Die Strafe muss «das vernünftige, mit Recht und Billigkeit noch vereinbare Mass offensichtlich übersteigen» (Leitentscheid **BGE 114 II 264**, laut Snippet). Berücksichtigt werden u. a. die wirtschaftliche Lage der Parteien und der tatsächliche Schaden (BGE 103 II 108).
- **Folgerung für den Salon (Schätzung):** Eine Pauschale von 50 % (späte Absage) bzw. 100 % (No-Show) des gebuchten Leistungspreises dürfte nicht «offensichtlich übermässig» sein, weil der Zeitslot im 1-Mann-Salon kaum kurzfristig neu besetzt werden kann. Eine Gebühr **über** dem Leistungspreis wäre heikel. Beim **Auftrag** ist zu beachten, dass eine Strafe das jederzeitige Kündigungsrecht nicht aushebeln darf. Sie sollte deshalb als **Pauschale für den Unzeit-Schaden** formuliert sein (kurzfristige Absage), nicht als Strafe für jede Absage.
- **Widerspruch in der Praxisliteratur:** Der Payrexx-Guide schreibt, wird der Termin kurzfristig neu besetzt, «ist kein Schaden entstanden und die Gebühr kann nicht geltend gemacht werden». Das passt zum Schadenersatz-Ansatz (Art. 404 Abs. 2), nicht aber zur Konventionalstrafe, die grundsätzlich schadensunabhängig ist. **Fairness-Empfehlung unabhängig davon:** Wird der Slot neu vergeben, verzichtet der Salon auf die Gebühr. Das senkt auch das Risiko einer Herabsetzung bzw. einer UWG-Rüge.

### 3.3 Einbezug der AGB und Ungewöhnlichkeitsregel

- AGB gelten nur, wenn sie **vor Vertragsschluss** übernommen werden und der Kunde eine **zumutbare Möglichkeit zur Kenntnisnahme** hatte. Fehlt diese, sind sie trotz Globalübernahme nicht verbindlich (laut Snippet, Zusammenfassung Rechtsprechung SECO/law.ch).
- **Ungewöhnlichkeitsregel:** Bei Globalübernahme gelten Klauseln nicht, die **subjektiv ungewöhnlich** und **objektiv geschäftsfremd** sind (BGE 119 II 443). «Je stärker eine Klausel die Rechtsstellung des Vertragspartners beeinträchtigt, desto eher ist sie als ungewöhnlich zu qualifizieren» (BGE 135 III 1, laut Snippet). Eine Stornogebühr ist im Coiffeurgewerbe zwar verbreitet (Salonkee, Treatwell, Booksy). Damit sie sicher nicht als Überraschung gilt, gehört sie aber **direkt neben den Buchungsknopf**, nicht nur ins Kleingedruckte.
- **Praktisch:** (1) Kurztext der Regel direkt im Buchungsschritt sichtbar. (2) **Checkbox, nicht vorangekreuzt**: «Ich akzeptiere die Stornobedingungen». (3) Wiederholung in Bestätigungs-E-Mail/SMS und Erinnerung. (4) Bei telefonischen Buchungen mündlich darauf hinweisen und in der SMS-Bestätigung wiederholen. (5) Akzeptanz mit Zeitstempel speichern (Beweis).

### 3.4 Art. 8 UWG (missbräuchliche AGB gegenüber Konsumenten)

- Laut SECO (Snippet): Missbräuchlich sind AGB, die «in Treu und Glauben verletzender Weise zum Nachteil der Konsumentinnen und Konsumenten ein **erhebliches und ungerechtfertigtes Missverhältnis** zwischen den vertraglichen Rechten und den vertraglichen Pflichten vorsehen». Solche Klauseln sind **nichtig**. Es gibt keine gesetzliche Beispielliste. Massgeblich ist die Würdigung des Zivilgerichts. In Kraft seit 1. Juli 2012, angelehnt an die EU-Richtlinie 93/13/EWG.
- **Ausgewogen wird die Klausel (Schätzung)** durch: eine klare Frist (24 h), eine Gebühr nicht über dem Leistungspreis, kostenloses Verschieben/Absagen bis zur Frist, eine Gegenleistung des Salons (Termin wird freigehalten, bei Absage durch den Salon keine Kosten für den Kunden), Kulanz bei Notfall/Krankheit und Verzicht, wenn der Slot neu vergeben wird.

### 3.5 Höhe der Gebühr

- Keine gesetzliche Obergrenze und keine gesetzliche Stornofrist (Payrexx-Guide: «In der Schweiz gibt es keine gesetzliche Stornofrist …»). Die Gebühr muss verhältnismässig sein.
- Die Schweizerische Patientenorganisation SPO hält No-Show-Gebühren laut Payrexx-Guide (für Therapiepraxen) für zulässig, wenn sie bei der Buchung kommuniziert wurden, den tatsächlichen Ausfall abbilden und verhältnismässig sind. Sie empfiehlt Kulanz bei unverschuldeten Absagen. (Originalquelle SPO nicht geprüft.)
- **Vorschlag BesArt:** Absage/Verschiebung **unter 24 h: 50 %**, **Nichterscheinen: 100 %** des gebuchten Leistungspreises. Beispiele mit Salonkee-Preisen: Herren «Waschen, Schneiden, Stylen» CHF 42 → CHF 21 bzw. CHF 42. Damen «Waschen, Schneiden, Föhnen» ab CHF 95 → CHF 47.50 bzw. CHF 95. Bei «ab»-Preisen gilt der angezeigte Mindestpreis.

### 3.6 Datenschutz und Kartendaten

- Kartendaten **nie selbst erfassen oder speichern** (kein Formular auf der eigenen Website, keine Notiz mit Kartennummer). Die Erfassung läuft ausschliesslich über das gehostete Formular bzw. Widget des Zahlungsanbieters. Dann liegt die PCI-DSS-Last weitgehend beim Anbieter (Stripe: Daten gelangen nicht auf eigene Server; Salonkee: nur Token; wallee: speichert Zahlungsdaten PCI-konform).
- Im **Datenschutzhinweis** der Website (revDSG) erwähnen: welcher Zahlungsanbieter, Zweck (Sicherung der Ausfallgebühr), Speicherdauer des Tokens und ggf. Auslandsbezug (Stripe/Cal.com: USA, siehe `02-opensource-buchung.md`).

---

## 4. Formulierungsvorschlag Stornobedingungen

### 4.1 Website (Seite «Termine & Storno» bzw. unter dem Buchungs-Widget)

> **Termin verschieben oder absagen**
>
> Ihr Termin ist für Sie reserviert. Bis **24 Stunden vorher** können Sie ihn kostenlos verschieben oder absagen, online über den Link in Ihrer Bestätigung oder telefonisch unter 044 725 14 04.
>
> Bei späterer Absage verrechnen wir **50 %** des gebuchten Leistungspreises. Erscheinen Sie ohne Absage nicht zum Termin, verrechnen wir **100 %**.
>
> Können wir den Termin kurzfristig neu vergeben, entfällt die Gebühr. Bei Unfall oder plötzlicher Krankheit finden wir gemeinsam eine faire Lösung.
>
> Sagen wir einen Termin ab, entstehen Ihnen selbstverständlich keine Kosten.
>
> *[Nur falls Karte hinterlegt wird:]* Für Neukunden und längere Termine (z. B. Farbe, Strähnen, Balayage) hinterlegen Sie bei der Online-Buchung eine Karte. Belastet wird sie nur in den oben genannten Fällen. Ihre Kartendaten speichert ausschliesslich unser Zahlungsanbieter [Salonkee/Stripe/Payrexx], nicht wir.

### 4.2 Checkbox im Buchungsschritt (nicht vorangekreuzt)

> ☐ Ich habe die **Stornobedingungen** gelesen: kostenlos bis 24 h vorher, danach 50 %, bei Nichterscheinen 100 % des Leistungspreises.

### 4.3 Buchungsbestätigung (E-Mail/SMS)

> Vielen Dank für Ihre Buchung bei BesArt Hairsalon: [Leistung], [Datum], [Uhrzeit], Neugasse 29, Horgen.
> Verschieben oder absagen bis 24 h vorher kostenlos: [Link] oder 044 725 14 04. Danach 50 %, bei Nichterscheinen 100 % des Preises.

### 4.4 Erinnerungs-SMS (24–48 h vorher; SMS mit 160 Zeichen = 1 Segment)

> BesArt: Erinnerung an Ihren Termin morgen um [Uhrzeit]. Absagen bis [Uhrzeit] kostenlos: [Kurzlink]. Danke!

*(Tipp: Die Erinnerung **vor** Ablauf der 24-h-Frist verschicken, z. B. 36–48 h vorher. So kann der Kunde noch kostenlos absagen und der Slot lässt sich neu vergeben. Das wirkt fair und stärkt die Durchsetzbarkeit.)*

---

## 5. Praktische Empfehlung für den 1-Mann-Salon (Stufenmodell)

**Stufe 1, ab Website-Start (Januar 2027), ohne Zahlungszwang:**
- Stornobedingungen (4.1) auf der Website, in Salonkee als Buchungshinweis und in den Bestätigungen hinterlegen.
- Salonkee-Erinnerung per SMS/E-Mail so einstellen, dass sie **vor** Ablauf der 24-h-Frist kommt (SMS-/E-Mail-Erinnerungen sind laut Salonkee-Preisseite schon im Go-Paket enthalten; der genaue Zeitpunkt ist einstellbar, aber nicht geprüft).
- Kurzfristig frei gewordene Termine über die Salonkee-Warteliste neu vergeben («Intelligente Warteliste», im Go-Paket).
- Gebühren in dieser Phase nur in klaren Wiederholungsfällen per QR-Rechnung oder beim nächsten Besuch einfordern. Bei Ersttätern genügt ein freundlicher Hinweis.
- **Ausfälle protokollieren** (Datum, Kunde, Leistung, neu vergeben ja/nein). Nach 2–3 Monaten ist klar, ob sich mehr lohnt.

**Stufe 2, falls Ausfälle spürbar sind (z. B. mehr als 2–3 pro Monat, Schätzung):**
- In Salonkee (Payments-Modul) **Kartenhinterlegung nur für Neukunden** sowie für **lange/teure Leistungen** (Farbe, Strähnen, Balayage ab ca. 60 Min.) aktivieren, Frist 24 h. Salonkee unterstützt Regeln pro Kundengruppe ausdrücklich.
- **Stammkunden ausnehmen**, damit die gute Beziehung (5.0 Sterne, 25 Bewertungen) nicht leidet.
- Für TWINT-Kunden als Alternative eine **kleine Anzahlung** (z. B. CHF 20) statt Kartenhinterlegung.

**Stufe 3, nur bei Wiederholungstätern:**
- Kunden mit zwei oder mehr No-Shows nur noch mit Anzahlung oder Vollvorauszahlung online buchen lassen (bzw. nur telefonisch).

**Was ich *nicht* empfehle:**
- Eine eigene Kartenhinterlegung über Stripe/Payrexx neben Salonkee aufbauen. Das wären doppelte Systeme, doppelte Gebühren und eine Kartenerfassung ausserhalb des Buchungsflusses.
- Eine Gebühr über 100 % des Leistungspreises oder eine pauschale Gebühr auch bei rechtzeitiger Absage (Risiko nach Art. 163 Abs. 3 OR / Art. 8 UWG).
- Die Regel nur in den AGB zu verstecken, ohne sie beim Buchen sichtbar zu machen (Ungewöhnlichkeitsregel).

---

## Quellen

- https://salonkee.ch/terms?lang=de – Allgemeine Nutzungsbedingungen Salonkee («Zuletzt aktualisiert am: 01/06/2026»), Ziff. 13–15 – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/preise/ – Salonkee Preise Schweiz (Payments-Modul CHF 35) – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/onlinezahlungen-ec-gerat/ – Salonkee Payments / No-Show-Richtlinie – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/online-buchungssystem-coiffeur-kosmetikstudio/ – Salonkee Online-Buchung (Anzahlungen, Erinnerungen) – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/software-friseur-kosmetikstudio/ – nicht abrufbar (403 AccessDenied)
- https://help.salonkee.com – nicht abrufbar
- https://www.treatwell.ch/info/buchungsbestimmungen/ – Treatwell Buchungsbestimmungen (September 2026) – abgerufen 2026-11-07
- https://biz.booksy.com/en-us/features/no-show-protection, https://support.booksy.com/hc/en-gb/articles/16487431553810 – nicht abrufbar. Angaben laut Suchergebnis-Snippets, Seiten nicht direkt abrufbar
- https://stripe.com/de-ch/pricing – Stripe Preise Schweiz – abgerufen 2026-11-07
- https://stripe.com/de-ch/payment-method/twint – Stripe TWINT – abgerufen 2026-11-07
- https://docs.stripe.com/payments/setup-intents, https://docs.stripe.com/payments/cards/save-and-reuse, https://docs.stripe.com/payments/place-a-hold-on-a-payment-method, https://docs.stripe.com/changelog/dahlia/2026-05-27/recurring-payments-twint, https://docs.stripe.com/payments/twint/save-during-payment – nicht abrufbar (docs.stripe.com blockiert). Angaben laut Suchergebnis-Snippets, Seiten nicht direkt abrufbar
- https://cal.com/blog/time-based-cancellation-fees-for-no-show – Cal.com zeitbasierte No-Show-Gebühren – abgerufen 2026-11-07
- https://cal.com/blog/cal-com-s-held-payments-a-useful-tool-for-organizations-offering-free-consultatio – Cal.com Held Payments – abgerufen 2026-11-07
- https://raw.githubusercontent.com/calcom/cal.diy/main/packages/app-store/stripepayment/lib/PaymentService.ts (sowie zod.ts, lib/constants.ts) – Stripe-Integration Cal.diy (SetupIntent, off_session) – abgerufen 2026-11-07
- https://www.payrexx.com/pricing – Payrexx Preise Schweiz (Transaktionsgebühren) – abgerufen 2026-11-07. Monatsgebühren nicht auslesbar, Werte laut Snippet https://payrexx.com/en-ch/pricing (nicht direkt abrufbar)
- https://www.payrexx.com/guides/no-show-fees-physiotherapy-switzerland-legal – Payrexx-Guide «No-Show-Gebühren in der Physiotherapie» (3.6./6.10.2026) – abgerufen 2026-11-07
- https://docs.payrexx.com/merchant/zahlungen/funktionalitaeten/tokenisierung, https://docs.payrexx.com/developer/guides/gateway/payment-types/tokenization – nicht abrufbar. Angaben laut Suchergebnis-Snippets
- https://wallee.com/zahlungen-annehmen/wiederkehrende-zahlungen – wallee Tokenisierung/Abo-Zahlungen – abgerufen 2026-11-07
- https://wallee.com/plugins/etermin – wallee Plugin für eTermin – abgerufen 2026-11-07
- https://app-wallee.com/pricing/ch – nicht abrufbar. Werte laut Suchergebnis-Snippet
- https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de – Obligationenrecht (Art. 97, 160–163, 363, 377, 394, 404) – **nicht abrufbar** (DNS blockiert)
- https://www.droit-bilingue.ch/de-en/2/22/220-163-176.html – Art. 163 OR Wortlaut – nicht abrufbar, laut Suchergebnis-Snippet
- https://law.ch/lawinfo/konventionalstrafe/herabsetzung-der-konventionalstrafe/, https://law.ch/lawinfo/konventionalstrafe/verfall-der-konventionalstrafe/, https://law.ch/lawinfo/werkvertrag/beendigung-werkvertrag/besteller-ruecktrittsrechte/schadloshaltungs-ruecktritt-or-377/, https://law.ch/lawinfo/auftrag/einfacher-auftrag/auftrags-beendigung/widerruf-kuendigung/ – nicht abrufbar, laut Suchergebnis-Snippets
- https://servat.unibe.ch/dfr/bge/c2114264.html (BGE 114 II 264), https://servat.unibe.ch/dfr/bge/c3122420.html (BGE 122 III 420), https://servat.unibe.ch/dfr/bge/c3135001.html (BGE 135 III 1) – nicht abrufbar, laut Suchergebnis-Snippets
- https://www.weka.ch/themen/recht/auftrag-und-werkvertrag/einfacher-auftrag/article/kuendigung-zur-unzeit-risikominderung-durch-den-pauschalisierten-schadenersatz/ – «Kündigung zur Unzeit: Risikominderung durch den pauschalisierten Schadenersatz» – nicht abrufbar (nur Titel/Snippet)
- https://entscheidsuche.ch/docs/SG_Gerichte/SG_KG_002_BE-2012-50_2012-10-09.pdf – Kantonsgericht SG BE.2012.50 (Zitat Art. 404 OR) – nicht abrufbar, laut Suchergebnis-Snippet
- https://www.seco.admin.ch/seco/de/home/Werbe_Geschaeftsmethoden/Unlauterer_Wettbewerb/Missbrauchliche_Geschaftsbedingungen.html – SECO zu Art. 8 UWG – nicht abrufbar, laut Suchergebnis-Snippet
- https://WWW.SECO.ADMIN.CH/dam/seco/de/dokumente/Werbe_Geschaeftsmethoden/unlauterer_wettbewerb/Bundesgerichtliche%20Rechtsprechung%20zu%20AGB.pdf.download.pdf/Bundesgerichtliche_Rechtsprechung_zu_allg_Geschaeftsbedingungen_AGB.pdf – SECO, Bundesgerichtliche Rechtsprechung zu AGB – nicht abrufbar, laut Suchergebnis-Snippet
- https://www.blick.ch/schweiz/miese-frise-das-sind-ihre-rechte-wenn-der-coiffeur-pfuscht-id21371290.html – Blick-Ratgeber (Coiffeur = Werkvertrag) – nicht abrufbar, laut Suchergebnis-Snippet
- /home/user/ymerejl.github.io/besart/index.html – Leistungen und Preise (nur gelesen)
