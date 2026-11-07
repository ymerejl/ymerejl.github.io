# Open-Source-Terminbuchung für BesArt Hairsalon (1-Mann-Salon)

Recherche-Stand: 2026-11-07 (alle Abrufe an diesem Tag). Preise in CHF wo belegt, sonst Originalwährung. «Schätzung» = eigene Einschätzung, nicht belegt.

## Kurzfazit

- **Empfehlung für den Start im Januar 2027: Salonkee als Buchungs- und Kassensystem behalten** und von der neuen Website aus direkt auf das Salonkee-Profil verlinken (Buttons und QR-Codes). Salonkee hat bereits SMS- und E-Mail-Erinnerungen, das Adyen-Terminal, eine No-Show-Richtlinie (mit Payments-Modul), die 25 Bewertungen und den Google-Button «Online reservieren». Kein Open-Source-System bringt das alles ohne Zusatzaufwand mit.
- **Cal.com hat sich 2026 grundlegend verändert:** Am 15. April 2026 wurde der Produktiv-Code von Cal.com privat (Closed Source). Öffentlich bleibt nur **«Cal.diy»** (MIT-Lizenz, früher AGPL-3.0). Dort fehlen u. a. die **Workflows, also auch die automatischen Erinnerungen**. Das README stuft Cal.diy ausdrücklich als «strictly recommended for personal, non-production use» ein. Für einen Salon ist es damit ungeeignet.
- **Cal.com Cloud (Free, «Individuals»)** ist gratis, hat eine Stripe-Anbindung mit «No-show fee» (Karte hinterlegen, spätere Belastung) und Pufferzeiten. Es ist aber auf Meetings ausgelegt: Man kann nicht mehrere Leistungen in einen Warenkorb legen. Seit 1. November 2026 laufen Gratis-Konten in den USA (die EU-Instanz gibt es nur noch ab dem Organizations-Plan), und SMS kosten Twilio-Tarif plus 80 % Aufschlag.
- **Easy!Appointments** (GPL-3.0, PHP 8.2+/MySQL) ist das sauberste echte Open-Source-System für Dienstleister. Es hat mehrere Mitarbeitende, Google-Kalender-Sync, über 40 Sprachen und lässt sich günstig in der Schweiz hosten (Infomaniak-Webhosting ab CHF 10.91/Monat exkl. MwSt.). **Erinnerungen, SMS und Online-Zahlung/Anzahlung gibt es aber nur als bezahlte Individualentwicklung.** Ohne diese Funktionen ist es ein Rückschritt gegenüber Salonkee.
- **LibreBooking** (GPL-3.0) ist für Raum- und Ressourcenreservation gedacht, nicht für Coiffeure. 2026 wurden zudem zwei schwere Sicherheitslücken veröffentlicht.
- **WordPress-Plugins (Bookly, Amelia)** sind nur in den Lite-Versionen gratis. Die nützlichen Funktionen (Stripe, Google-Sync, SMS) sind kostenpflichtig. Zudem bräuchte es WordPress statt der statischen Seite.
- **Eine eigene schlanke Buchung in der statischen GitHub-Pages-Seite ist ohne Backend nicht machbar** (Verfügbarkeit, Speicherung, Doppelbuchungsschutz, Erinnerungen). Die Demo-Buchung in `besart/index.html` ist eine reine Frontend-Attrappe (Zeitfenster werden simuliert, die Buchung wird nicht gespeichert). Sie taugt als Design-Prototyp, nicht als Produktivsystem.

---

## 1. Ausgangslage

- Die Website ist statisches HTML auf GitHub Pages. In `besart/index.html` gibt es ein Buchungs-Widget mit Mehrfachauswahl der Leistungen (z. B. «Waschen, Schneiden, Föhnen» + Kopfmassage), Tageswahl und Zeitfenstern. Das Absenden ruft nur `setTimeout(() => go(4), …)` auf. Es gibt keinen Server, die Daten werden nicht gespeichert. Die Dauerangaben (`min`) sind laut Code-Kommentar «nur ein interner Richtwert», weil Salonkee keine Dauer nennt.
- Ein Coiffeur braucht: Leistungen mit unterschiedlichen Dauern, idealerweise **kombinierbar** (Schnitt + Farbe + Pflege), Pufferzeiten, Erinnerungen (SMS ist bei Coiffeurkundschaft wirksamer als E-Mail, eigene Einschätzung), optional No-Show-Schutz, Sprachen DE (EN/IT nice-to-have), Datenschutz (revDSG).

---

## 2. Easy!Appointments

| Kriterium | Befund | Quelle |
|---|---|---|
| Lizenz | **GPL-3.0** (Code), Inhalte CC BY 3.0. «Free for both personal and commercial use». | README (raw.githubusercontent.com), easyappointments.org |
| Version | v1.6.1 (Release-Blogpost 19. Oktober 2026) | easyappointments.org/pricing |
| Hosting | Apache oder Nginx, **PHP 8.2+, MySQL**; Cron-Job für den Kalender-Sync; offizielle Docker-Images vorhanden | README; FAQ auf easyappointments.org |
| RAM | Keine offizielle Angabe. «Lightweight» laut Feature-Seite. Läuft auf normalem PHP-Webhosting. | easyappointments.org/features |
| Mehrere Mitarbeitende | Ja: «Unlimited bookings, staff and features», Rollen Admin/Provider/Secretary | easyappointments.org |
| Leistungen mit unterschiedlicher Dauer | Ja, pro Leistung eine Dauer (Demo zeigt «[Duration 30 Minutes]») | easyappointments.org (Demo-Widget) |
| Mehrere Leistungen pro Buchung | **Nicht als Funktion genannt.** Der Buchungsablauf wählt *eine* Leistung + *einen* Anbieter. Kombinationen müsste man als eigene Leistung anlegen (z. B. «Schnitt + Farbe»). | easyappointments.org (Demo-Ablauf) |
| Pufferzeiten | **Nicht als Funktion genannt.** Genannt sind Arbeitszeiten, Pausen, Ausnahmen und Buchungsregeln (Buchen/Ändern/Stornieren nur in erlaubten Zeitfenstern). | easyappointments.org/features |
| Erinnerungen | **Im Gratis-Release nur E-Mail-Benachrichtigungen bei Buchung/Änderung/Storno.** «Scheduled reminders» und «SMS notifications» sind ausdrücklich «Not in the free release, but added to your installation as custom development». | easyappointments.org/features, FAQ |
| SMS | Nur via Individualentwicklung, «through the SMS provider you use». Kosten: Angebot nach Aufwand («Fixed quote»). | easyappointments.org/features, /pricing |
| Online-Zahlung / Anzahlung / Karte hinterlegen | **Nur als Individualentwicklung** («Online payments and deposits … Take the full price or a deposit when the appointment is booked»). Kein fertiges «Karte hinterlegen». | easyappointments.org/features |
| Google-Kalender | Ja, «Google Calendar and CalDAV sync», pro Mitarbeiter | easyappointments.org/features |
| Sprachen | «More than 40 languages». Deutsch, Italienisch und Französisch sind als Sprachdateien im Repo vorhanden (`application/language/german|italian|french/translations_lang.php`, je HTTP 200). | easyappointments.org; raw.githubusercontent.com |
| Einbindung in die Website | Eigene (Sub-)Domain oder Plugins für WordPress/Joomla/Drupal. «Shareable links» führen direkt zu einer bestimmten Leistung bzw. einem Anbieter. REST-API und Webhooks vorhanden. | easyappointments.org |
| Datenschutz | Daten in eigener MySQL-DB. «The only call home is the About page fetching our blog feed.» | easyappointments.org FAQ |
| Kundenkonto nötig? | Nein («No sign-up for your customers») | easyappointments.org |
| Spam-Schutz | CAPTCHA oder ALTCHA | easyappointments.org/features |
| Bezahlte Dienste | Managed Hosting **USD 20/Monat** (jährlich USD 240, auch in EUR/GBP), White Label USD 50 oder 500 einmalig, Support USD 60 pro Sitzung, alles exkl. MwSt. Datenstandort beim Managed Hosting «wherever you need it», Anbieter sitzt in Offenbach (DE). | easyappointments.org/pricing |

**Bewertung für BesArt:** Technisch passt Easy!Appointments gut zu günstigem Schweizer Hosting. Der Haken: Ohne Erinnerungs-SMS und ohne Zahlungsfunktion ist es klar schwächer als das heutige Salonkee. Bis es gleichwertig ist, braucht es Individualentwicklung (Preis nur auf Anfrage) oder Eigenbau.

**Aufwand (Schätzung):** Installation auf Infomaniak inkl. Domain/SSL, Cron, Leistungen und Arbeitszeiten erfassen, Design an die Website anpassen: **ca. 6–12 Std.** Danach Updates und Backups pflegen: **ca. 1 Std./Monat**. Erinnerungen per E-Mail/SMS über die Webhooks selbst bauen (z. B. kleines Skript + SMS-Gateway): **ca. 10–20 Std.**, nicht belegt.

---

## 3. Cal.com (Cloud) und Cal.diy (Community Edition, self-hosted)

### 3.1 Wichtige Änderung 2026: Cal.com ist Closed Source

Auf cal.com/blog/cal-diy-open-source-to-closed-source (15. April 2026) steht:

> «We moved Cal.com's production codebase from a public repository to a private one. The public repository is now `calcom/cal.diy`, known as Cal.diy …»
> «License change: AGPL 3.0 to MIT»

In Cal.diy **entfernt** wurden u. a.: Organizations und Teams, Routing Forms, **Workflows («Automated workflow engine (reminders, follow-ups, triggers)»)**, Instant Booking, Insights, SAML/SSO, API v1. **Erhalten bleiben** laut Blog «the core scheduling logic, the app store, the booking flows, and API v2».

Das Cal.diy-README (raw.githubusercontent.com/calcom/cal.diy/main/README.md) warnt:

> «Use at your own risk. Cal.diy is the open source community edition of Cal.com … It is strictly recommended for personal, non-production use.»
> «Cal.diy is a self-hosted project. There is no hosted/managed version.»

Die frühere Bezeichnung «Calendso» (heute Cal.com) taucht im Code noch auf (z. B. als Standard-DB-Name `calendso`).

### 3.2 Cal.diy (self-hosted)

| Kriterium | Befund | Quelle |
|---|---|---|
| Lizenz | **MIT** (100 %, kein «Open Core» mehr) | Cal.diy-README; LICENSE (raw.githubusercontent.com/calcom/cal.com/main/LICENSE liefert heute den MIT-Text) |
| Hosting | **Node.js ≥ 18, PostgreSQL ≥ 13**, Docker/Docker Compose (Image `calcom/cal.diy`) | README |
| RAM | Build-Variable `MAX_OLD_SPACE_SIZE` «required», Standard **4096** (MB). Bei abweichender `NEXT_PUBLIC_WEBAPP_URL` muss man das Image teils selbst bauen. Rechner mit ≥ 4 GB RAM wären deshalb sinnvoll (Schätzung aus der Build-Vorgabe). | README |
| Mitarbeitende | **Teams entfernt.** Nur Einzelpersonen. Für den 1-Mann-Salon reicht das. | cal.com-Blog |
| Leistungen/Dauer | Pro Leistung ein eigener Buchungslink («Event type»), mehrere Dauern wählbar | cal.com/pricing (Feature «Multiple duration options») |
| Pufferzeiten | Ja (Event-Buffer vor/nach Termin; ist Kernlogik, Doku bezieht sich auf Cloud) | cal.com/help/event-types/event-buffer.md |
| **Erinnerungen** | **Workflows entfernt → keine automatischen Erinnerungen per E-Mail/SMS.** Nur die Standard-Bestätigungsmails. | cal.com-Blog |
| Zahlung / Karte hinterlegen | Stripe-App ist im Code vorhanden, inkl. Zahlungsoption **«HOLD»** (= No-show fee). Umgesetzt mit Stripe **SetupIntent** und späterer Belastung mit `off_session: true`. Konfigurierbar: `autoChargeNoShowFeeIfCancelled` mit Frist in Minuten/Stunden/Tagen. Währung **CHF** ist in der Liste enthalten. | Code: `packages/app-store/stripepayment/zod.ts`, `lib/constants.ts`, `lib/PaymentService.ts`, `lib/currencyOptions.ts` (raw.githubusercontent.com/calcom/cal.diy) |
| Google-Kalender | Ja, mit eigenen Google-API-Zugangsdaten (OAuth-Einrichtung in der Google Cloud Console) | README, Abschnitt «Integrations» |
| Sprachen | DE und IT vorhanden (`packages/i18n/locales/de|it/common.json`, HTTP 200; DE enthält z. B. «Gebühr für das Nichterscheinen») | raw.githubusercontent.com |
| Einschätzung | **Nicht empfohlen:** Der Hersteller rät selbst vom Produktiveinsatz ab, es gibt keine Erinnerungen, die Wartung ist hoch (Node/Postgres/Docker, Sicherheitsupdates). | – |

### 3.3 Cal.com Cloud (gehostet)

| Kriterium | Befund | Quelle |
|---|---|---|
| Lizenz | Proprietär (SaaS), seit April 2026 Closed Source | cal.com-Blog |
| Preise | **Individuals: Free** («Free forever», 1 User). Teams: USD 12/User/Monat (jährlich). Organizations: USD 28/User/Monat (jährlich). Enterprise: auf Anfrage. | cal.com/pricing |
| Free-Plan-Umfang | «Unlimited links & calendars», «Email & SMS notifications», «Accept Stripe & PayPal payments», «Integrate with 100+ apps». **Anpassbare** E-Mail/SMS-Benachrichtigungen erst im Teams-Plan («Customizable email & SMS notifications»). | cal.com/pricing |
| SMS-Kosten | Free-User: **«No free credits included»**, Credits müssen gekauft werden. 1 Credit = USD 0.01, Preis = **Twilio-Tarif + 80 % «processing fee»**, Abrechnung pro Segment (160 Zeichen, mit Emojis 70). | cal.com/help/billing-and-usage/messaging-credits.md; /help/workflows/credits.md |
| Twilio-Tarif Schweiz | Nicht abrufbar (twilio.com blockiert). Laut Suchergebnis-Snippet (Drittseite sent.dm) ca. **USD 0.0725/SMS**, also über Cal.com ca. USD 0.13 pro Segment. **Nicht bestätigt.** | Snippet sent.dm; twilio.com/sms/pricing/ch nicht abrufbar |
| Erinnerungen | Workflows: Trigger z. B. «Before event starts» (Minuten/Stunden/Tage), Schritte «Send email», «Send SMS / WhatsApp». Ob alle Workflow-Funktionen im Free-Plan enthalten sind, geht aus der Vergleichstabelle nicht eindeutig hervor (**nicht bestätigt**). | cal.com/help/workflows/workflowsoverview.md; cal.com/pricing |
| Pufferzeiten | Ja, vor und/oder nach dem Termin, pro Buchungslink | cal.com/help/event-types/event-buffer.md |
| Mehrere Leistungen pro Buchung | **Nein.** Jeder Buchungslink entspricht einer Leistung. Kombinationen (Schnitt + Farbe) müssen als eigener Link mit eigener Dauer angelegt werden. (Ableitung aus dem Event-Type-Modell, nicht als Einschränkung dokumentiert.) | cal.com/help |
| Stripe / No-show fee | Stripe-App gratis. In der Stripe-Einstellung des Links: Betrag + Währung, Option **«Charge no-show fee»**, Checkbox für automatische Belastung bei kurzfristiger Absage, Frist in Minuten/Stunden/Tagen. Organizer sind von der Gebühr ausgenommen. «Held payments … won't be charged as long as the meeting attendee shows up or contacts you to cancel». | cal.com/blog/time-based-cancellation-fees-for-no-show (23.09.2025); cal.com/blog/cal-com-s-held-payments-… (29.05.2023); cal.com/apps/stripe |
| Stripe-Gebühren CH | 2,9 % + CHF 0.30 (Schweizer Karten), 3,25 % + CHF 0.30 (ausländische Karten), +2 % bei Währungsumrechnung; Rückbuchung CHF 20.00 | stripe.com/de-ch/pricing |
| Alternative «Cal Pay» | Eigene Zahlungsoption über Whop: Fixgebühr USD 0.30 + Radar USD 0.07 + Prozente + Cal.com-Anteil, dazu Auszahlungsgebühren (Beispiel USD 55.00 → USD 48.88 auf dem Konto). Für CH nicht attraktiv (USD, Auszahlungswege US-lastig). | cal.com/help/cal-pay |
| Datenstandort | **Seit 1. November 2026:** «Europe hosting is for privacy-first paid customers, starting with the Organizations plan. No Individuals or Teams accounts on Cal.eu.» Ein Gratis-Konto liegt also bei Cal.com in den **USA**. | cal.com/europe |
| Google-Kalender | Ja | cal.com/pricing («Unlimited calendar connections») |
| Sprachen | Sprache einstellbar (Account-Einstellungen). Die Buchungsseite folgt der Sprache des Buchenden, ist aber nicht separat geprüft. | cal.com/help (Index: «General settings: Set your language …») |
| Branding | «Remove Cal.com branding» erst ab Teams-Plan | cal.com/pricing |

**Aufwand (Schätzung):** Cloud-Konto, Leistungen als Links anlegen, Stripe verbinden, auf der Website einbetten: **ca. 3–6 Std.** Laufende Kosten: CHF 0 Grundgebühr, Stripe-Gebühren nur bei Belastung, SMS nach Verbrauch.

---

## 4. Weitere Kandidaten (kurz)

| System | Lizenz / Typ | Eignung Coiffeur | Kurzbefund | Quelle |
|---|---|---|---|---|
| **LibreBooking** (Nachfolger von «Booked») | **GPL-3.0**, PHP 8.2+, MySQL ≥ 8.0 / MariaDB ≥ 10.6, Docker | Gering (Ressourcen-/Raumbuchung) | README warnt vor schweren Sicherheitslücken: vor 7.1.0 Anmeldung als Admin per gefälschtem Cookie, vor 7.2.0 Stored XSS. «Security fixes are not backported». | raw.githubusercontent.com/LibreBooking/app/develop/README.md |
| **Bookly** (WordPress) | Gratis «Lite» auf wordpress.org, **Pro kostenpflichtig** (Open-Core). Kein echtes Komplett-OSS. | Mittel, braucht WordPress | Laut Suchergebnis-Snippets: Lite mit 1 Mitarbeiter. Stripe, Google-Sync usw. sind kostenpflichtige Add-ons. SMS über die metrierte «Bookly Cloud». Preisangaben widersprüchlich (z. B. «$39/year» im Sale). **Nicht bestätigt** (wordpress.org und booking-wp-plugin.com nicht abrufbar). | Snippets: booking-wp-plugin.com/pricing, fs-code.com |
| **Amelia** (WordPress) | Gratis «Lite» auf wordpress.org, **Pro kostenpflichtig** (Jahresabo/Lifetime). Lizenz der Lite-Version **nicht bestätigt**. | Mittel, braucht WordPress | Laut Snippets: Lite = 1 Domain, 1 Mitarbeiter, nur Square-Zahlungen. Bezahlpläne ab ca. USD 39–49/Jahr, widersprüchlich. **Nicht bestätigt** (wpamelia.com nicht abrufbar). | Snippets: athemes.com, softwareadvice.com |
| **Rallly** | Open Source, nur Terminumfragen | Keine | Keine Terminbuchung für Dienstleister | – |
| **SimplyBook.me** | SaaS, **nicht Open Source** | – | Nicht weiter geprüft | – |
| **Fresha** | SaaS, **nicht Open Source**, **nicht mehr gratis** | – | Laut Snippets: Umstellung auf Monatsabo (Schweiz betroffen). Independent ca. USD 19.95/Monat, Kartengebühren ca. 2,19–2,79 % + USD 0.20, 20 % Provision (min. USD 6) auf Neukunden über den Marktplatz. **Nicht bestätigt** (fresha.com nicht abrufbar). | Snippets: fresha.com/pricing-update, schedulingkit.com |
| **Salonkee** (heute im Einsatz) | SaaS, nicht OSS | Hoch (Branchenlösung) | Go CHF 79, Smart CHF 129, Pro CHF 159 pro Monat. Payments-Modul CHF 35/Monat (nur zu Smart/Pro) mit Terminal, Stornierungs-/No-Show-Richtlinien und Online-Zahlungen. Schon im Go-Paket: SMS- und E-Mail-Erinnerungen, Warteliste, Google-SEO. MwSt.-Hinweis auf der Preisseite nicht gefunden. | salonkee.com/pro/de-CH/preise/ |

---

## 5. Hosting in der Schweiz: Infomaniak (Preise exkl. MwSt.)

Alle Angaben von www.infomaniak.com, abgerufen 2026-11-07. Auf den Seiten steht jeweils «Preise exkl. MwSt.». Infomaniak betreibt nach eigenen Angaben eigene Rechenzentren in der Schweiz und ist ISO-27001-zertifiziert.

| Produkt | Preis | Geeignet für | Belegte Eckdaten |
|---|---|---|---|
| **Webhosting** | ab **CHF 10.91/Monat** (30 Tage gratis) | **Easy!Appointments** (PHP + MySQL + Cron) | 250 GB SSD, 20 Websites, unbegrenzte MySQL/MariaDB-DBs, «SSH, Cron, PHP, Apache …», PHP-Version im Manager wählbar, automatische Wiederherstellung (7 Tage), 1 E-Mail-Adresse inkl. |
| Web + Mail | ab CHF 13.20/Monat | wie oben + 5 Mailadressen | – |
| **VPS Lite** (Linux, unmanaged, Root) | **CHF 2.70** (1 vCPU/2 GB/20 GB) · **CHF 5.40** (2 vCPU/2 GB/40 GB) · **CHF 7.20** (2 vCPU/4 GB/60 GB) · **CHF 9.00** (4 vCPU/4 GB/80 GB) · CHF 18.00 (4 vCPU/8 GB/160 GB) pro Monat | Docker, Node/Postgres (z. B. Cal.diy). Wegen 4-GB-Build-Vorgabe mind. Variante CHF 7.20 (Schätzung). | Root-Zugriff, Linux/Windows |
| VPS Cloud | ab **CHF 38.41/Monat** (4 vCPU, 12 GB RAM, 250 GB) | überdimensioniert | 30 Tage Geld-zurück |
| Managed-Cloud-Server | ab CHF 38.41/Monat | u. a. Node.js, Redis (laut Jelastic-Seite) | – |
| **Jelastic Cloud** (PaaS, nutzungsabhängig, Prepaid) | Beispielkonfiguration 1 Container/128 MB RAM/400 MHz/20 GB/IP: **CHF 6.31/Monat** (CHF 0.00865/Std.), 14 Tage gratis | Docker, Node.js, PHP | Abrechnung stundengenau, Auto-Scaling |

Hinweis: Cal.com Cloud (Free) lässt sich nicht in der Schweiz hosten. Gratis-Konten liegen seit 1.11.2026 in den USA (siehe 3.3).

---

## 6. Vergleich auf einen Blick

| | Salonkee (heute) | Easy!Appointments (self-hosted) | Cal.com Cloud Free | Cal.diy (self-hosted) |
|---|---|---|---|---|
| Open Source | nein | **ja (GPL-3.0)** | nein | ja (MIT) |
| Hosting CH | nein (Anbieter-Cloud) | **ja (Infomaniak)** | nein (USA) | ja (VPS) |
| Mehrere Leistungen kombinieren | ja (Extras wie Kopfmassage buchbar, laut Website-Demo-Kommentar) | nein (nur als Kombi-Leistung) | nein (nur als Kombi-Link) | nein |
| Pufferzeiten | nicht geprüft | nicht dokumentiert | ja | ja |
| E-Mail-Erinnerung | ja | **nein** (nur Bestätigung) | ja (Workflows) | **nein** |
| SMS-Erinnerung | ja (inkl.) | nur Individualentwicklung | ja, Credits (Twilio + 80 %) | nein |
| Karte hinterlegen / No-Show-Gebühr | ja (Payments-Modul CHF 35/Mt.) | nur Individualentwicklung | **ja (Stripe «No-show fee»)** | ja (Stripe HOLD) |
| Kasse/Terminal | ja (Adyen) | nein | nein | nein |
| Google-Kalender | nicht geprüft | ja | ja | ja |
| DE/EN/IT | DE ja (weitere nicht geprüft) | ja | ja | ja |
| Fixkosten/Monat | CHF 79–194 je nach Paket | ab CHF 10.91 + Pflege | CHF 0 | ab ca. CHF 7.20 + viel Pflege |
| Setup (Schätzung) | 0 (läuft) | 6–12 Std. (+10–20 Std. für Erinnerungen) | 3–6 Std. | 15–30 Std. |

---

## 7. Empfehlung für den 1-Mann-Salon

**Empfehlung: Salonkee behalten und die neue Website als «Schaufenster» bauen, das direkt in die Salonkee-Buchung führt.**

Begründung:
1. **Funktionsumfang:** Salonkee deckt alles ab, was ein Coiffeur täglich braucht: Kalender, Online-Buchung rund um die Uhr, SMS-/E-Mail-Erinnerungen, Kasse/Terminal, No-Show-Richtlinie, Gutscheine. Easy!Appointments hätte ohne Zusatzentwicklung keine Erinnerungen und keine Zahlungen. Cal.diy hat keine Erinnerungen und ist laut Hersteller nicht für den Produktiveinsatz gedacht. Cal.com Cloud ist auf Meetings ausgelegt, liegt in den USA und kann Leistungen nicht kombinieren.
2. **Reichweite und Vertrauen:** Die 25 Salonkee-Bewertungen, das Marktplatz-Listing und der Google-Button «Online reservieren» (laut Salonkee-Pro-Seite) gingen bei einem Wechsel verloren oder müssten neu aufgebaut werden.
3. **Aufwand:** Ein 1-Mann-Betrieb hat keine Zeit für Server-Updates, Backups und Fehlersuche. Jede selbst gehostete Lösung braucht eine Ansprechperson für den Betrieb (Datenschutz, Sicherheitsupdates, siehe die LibreBooking-Lücken als Warnbeispiel).
4. **Kosten-Nutzen:** Easy!Appointments würde die Salonkee-Gebühr nur dann sinnvoll ersetzen, wenn Kasse/Terminal separat gelöst wird (z. B. SumUp/Payrexx) und Erinnerungen dazugebaut werden. Rechnet man die Setup- und Pflegestunden ein, lohnt sich das für einen 1-Mann-Salon kaum (Schätzung).

**Umsetzung auf der Website:**
- Alle «Termin buchen»-Buttons und QR-Codes führen auf das Salonkee-Profil `https://salonkee.ch/salon/besart-hairsalon?lang=de`. Ob Salonkee Deep-Links auf eine bestimmte Leistung oder ein einbettbares Widget anbietet, ist **nicht bestätigt** und sollte im Kundengespräch bzw. beim Salonkee-Support geklärt werden.
- Die Demo-Buchung aus `index.html` kann als Leistungs- und Preisübersicht bleiben («Leistung wählen → weiter zu Salonkee»). Echte Zeitfenster darf sie nicht vortäuschen, weil diese nicht mit dem Salonkee-Kalender übereinstimmen würden.

**Plan B, falls Besart Salonkee kündigen will (z. B. aus Kostengründen):**
- **Cal.com Cloud Free** ist der schnellste Ersatz mit No-Show-Schutz per Stripe. Nachteile: US-Hosting (im Datenschutzhinweis erwähnen), keine kombinierbaren Leistungen, SMS kostenpflichtig, Cal.com-Branding im Free-Plan.
- **Easy!Appointments auf Infomaniak-Webhosting** ist die beste echte Open-Source-Option mit CH-Hosting, wenn E-Mail-Bestätigungen reichen oder Budget für Erinnerungen per Individualentwicklung bzw. Eigenbau vorhanden ist. Die eigene Buchungsoberfläche der Website könnte dann über die REST-API an Easy!Appointments angebunden werden. Das bräuchte aber einen kleinen serverseitigen Proxy, weil der API-Schlüssel nicht im statischen Frontend stehen darf (Schätzung zusätzlich 8–16 Std.).
- **Eine reine Eigenentwicklung in der statischen Seite** ist **nicht empfehlenswert**: GitHub Pages kann keine Daten speichern. Man bräuchte trotzdem ein Backend (Datenbank, Verfügbarkeitslogik, Doppelbuchungsschutz, Erinnerungsversand, Admin-Kalender) und hätte am Ende ein schlechteres Easy!Appointments.

---

## Quellen

- https://easyappointments.org/ – Easy!Appointments Startseite inkl. FAQ – abgerufen 2026-11-07
- https://easyappointments.org/features/ – Easy!Appointments Features (inkl. «Not in the free release») – abgerufen 2026-11-07
- https://easyappointments.org/pricing/ – Easy!Appointments Preise/Dienste – abgerufen 2026-11-07
- https://raw.githubusercontent.com/alextselegidis/easyappointments/develop/README.md – README (Lizenz, Anforderungen) – abgerufen 2026-11-07
- https://raw.githubusercontent.com/alextselegidis/easyappointments/develop/application/language/german/translations_lang.php (sowie …/italian/…, …/french/…) – Sprachdateien – abgerufen 2026-11-07
- https://github.com/alextselegidis/easyappointments – nicht abrufbar (403)
- https://cal.com/blog/cal-diy-open-source-to-closed-source – «Moving to closed-source: the technical changes» (15.04.2026) – abgerufen 2026-11-07
- https://raw.githubusercontent.com/calcom/cal.diy/main/README.md – Cal.diy README – abgerufen 2026-11-07
- https://raw.githubusercontent.com/calcom/cal.com/main/LICENSE – MIT-Lizenztext – abgerufen 2026-11-07
- https://raw.githubusercontent.com/calcom/cal.diy/main/packages/app-store/stripepayment/zod.ts, …/lib/constants.ts, …/lib/PaymentService.ts, …/lib/currencyOptions.ts – Stripe-App-Code (HOLD/No-show fee, CHF) – abgerufen 2026-11-07
- https://raw.githubusercontent.com/calcom/cal.diy/main/packages/i18n/locales/de/common.json (sowie …/it/…) – Übersetzungen – abgerufen 2026-11-07
- https://cal.com/pricing – Cal.com Preise – abgerufen 2026-11-07
- https://cal.com/europe – Cal.eu / EU-Hosting ab 1. November – abgerufen 2026-11-07
- https://cal.com/apps/stripe – Stripe-App im Cal.com App Store – abgerufen 2026-11-07
- https://cal.com/blog/time-based-cancellation-fees-for-no-show – Zeitbasierte Stornogebühren (23.09.2025) – abgerufen 2026-11-07
- https://cal.com/blog/cal-com-s-held-payments-a-useful-tool-for-organizations-offering-free-consultatio – Held Payments (29.05.2023) – abgerufen 2026-11-07
- https://cal.com/help/cal-pay – Cal Pay Gebühren – abgerufen 2026-11-07
- https://cal.com/help/llms.txt – Index Cal.com Help – abgerufen 2026-11-07
- https://cal.com/help/billing-and-usage/messaging-credits.md – Credit System – abgerufen 2026-11-07
- https://cal.com/help/workflows/credits.md – Credits SMS/WhatsApp – abgerufen 2026-11-07
- https://cal.com/help/workflows/workflowsoverview.md – Workflows – abgerufen 2026-11-07
- https://cal.com/help/event-types/event-buffer.md – Event buffers – abgerufen 2026-11-07
- https://cal.com/help/event-types/how-to-receive-payments.md – Stripe-Zahlungen einrichten – abgerufen 2026-11-07
- https://www.twilio.com/sms/pricing/ch – nicht abrufbar. Wert nur laut Suchergebnis-Snippet https://www.sent.dm/resources/sms-pricing/switzerland-sms-pricing (Seite nicht direkt abrufbar)
- https://stripe.com/de-ch/pricing – Stripe Preise Schweiz – abgerufen 2026-11-07
- https://raw.githubusercontent.com/LibreBooking/app/develop/README.md – LibreBooking README – abgerufen 2026-11-07
- https://librebooking.org/ – nicht abrufbar
- https://wordpress.org/plugins/bookly-responsive-appointment-booking-tool/, https://wordpress.org/plugins/ameliabooking/, https://www.booking-wp-plugin.com/pricing/, https://wpamelia.com/pricing/ – nicht abrufbar. Angaben laut Suchergebnis-Snippets (u. a. https://www.fs-code.com/blog/bookly-pro-review, https://athemes.com/?p=1924112), Seiten nicht direkt abrufbar
- https://www.fresha.com/pricing-update – nicht abrufbar. Angaben laut Suchergebnis-Snippets (u. a. https://schedulingkit.com/pricing-guides/fresha-pricing), Seite nicht direkt abrufbar
- https://www.infomaniak.com/de/hosting/webhosting – Infomaniak Webhosting – abgerufen 2026-11-07
- https://www.infomaniak.com/de/hosting/vps-lite – Infomaniak VPS Lite – abgerufen 2026-11-07
- https://www.infomaniak.com/de/hosting/vps-cloud – Infomaniak VPS Cloud – abgerufen 2026-11-07
- https://www.infomaniak.com/de/hosting/dedizierte-server-und-cloud/jelastic-cloud – Infomaniak Jelastic Cloud – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/preise/ – Salonkee Preise Schweiz – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/online-auftritt-coiffeur-kosmetikstudio/ – Salonkee Online-Auftritt (Google «Online reservieren») – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/online-buchungssystem-coiffeur-kosmetikstudio/ – Salonkee Online-Buchung (Erinnerungen, No-Show) – abgerufen 2026-11-07
- https://salonkee.ch/salon/besart-hairsalon?lang=de – Salonkee-Profil BesArt – abgerufen 2026-11-07
- /home/user/ymerejl.github.io/besart/index.html – Demo-Buchung (nur gelesen)
