# 05 – Domains für BesArt Hairsalon

**Prüfzeitpunkt:** 7. November 2026, 13:48–13:59 UTC (14:48–14:59 Uhr Schweizer Zeit) für die Verfügbarkeit (RDAP), 13:54 UTC für die Infomaniak-Preise. Vollständige Tabelle: [domains.csv](domains.csv).

## Kurzfazit

- **besart.ch ist vergeben.** Die Domain ist seit dem 15.04.2002 registriert (Registrar Swizzonic AG, Nameserver bei hoststar.hosting). Wem sie gehört, zeigt RDAP nicht.
- **Alle anderen 22 geprüften .ch-/.li-Namen sind frei**, darunter besart-hairsalon.ch, besart-horgen.ch, besart-coiffeur.ch und haarmitart.ch. RDAP von SWITCH meldet für sie «HTTP 404 = nicht registriert».
- **.swiss und .com liessen sich in dieser Umgebung nicht prüfen.** Die Infomaniak-Suche leitet auf shop.infomaniak.com weiter, und dieser Host ist hier gesperrt. RDAP/WHOIS von nic.swiss und Verisign sowie DNS sind ebenfalls gesperrt. → **Vor dem Gespräch einmal von Hand auf infomaniak.com prüfen.**
- **Preise bei Infomaniak** (CHF inkl. 8.1 % MwSt.):

  | Endung | 1. Jahr (Aktion) | Verlängerung pro Jahr |
  |---|---|---|
  | .ch | 5.00 | 10.70 |
  | .li | 5.50 | 8.90 |
  | .com | 9.95 | 14.70 |
  | .swiss | 89.00 | 115.45 |

- **Empfehlung Top 3:**
  1. **besart-hairsalon.ch** als Hauptdomain
  2. **besart-horgen.ch** als kurze Zweitdomain bzw. Weiterleitung
  3. **haarmitart.ch** als Marketing-Weiterleitung für Flyer und Aufsteller

  Dazu besarthairsalon.ch als Tippschutz. Zusammen kosten die vier .ch-Domains im ersten Jahr CHF 20.–, danach CHF 42.80 pro Jahr.

## Methode

1. **Verfügbarkeit .ch/.li:** Abfrage `https://rdap.nic.ch/domain/<NAME>` (RDAP-Server von SWITCH, der Registry für .ch und .li).
   - HTTP 200 mit Domain-Objekt bedeutet registriert.
   - HTTP 404 mit leerer Antwort bedeutet nicht registriert.
   - Gegenprobe: besart.ch, google.li und vaduz.li liefern 200. Die Methode erkennt also registrierte Domains, auch bei .li.
   - Vier Kandidaten (besart-coiffeur.ch, besarthair.ch, haarmitart.ch, besart-hairstyle.ch) habe ich um 13:59 UTC ein zweites Mal geprüft: wieder 404.
2. **Verfügbarkeit über Infomaniak:** Das Suchfeld auf https://www.infomaniak.com/de/domains und https://www.infomaniak.com/de/domains/whois leitet weiter auf `https://shop.infomaniak.com/order2/domain?lang=de&domain_name=<NAME>`. Das zeigen der JavaScript-Code der Seite und ein Playwright-Test. Der Host shop.infomaniak.com ist **nicht abrufbar**, ebenso api.infomaniak.com (Verbindung vom Proxy abgelehnt).
3. **Verfügbarkeit .swiss/.com, alternative Wege:**
   - rdap.nic.swiss, rdap.verisign.com und rdap.org: **nicht abrufbar**.
   - WHOIS über Port 43 und DNS-Auflösung: in der Umgebung nicht möglich.
   - Eine Websuche nach «besart.com», «besart.swiss» und «besarthairsalon.com» fand keine Website unter diesen Domains. **Das beweist aber nicht, dass sie frei sind.**
4. **Preise:** Die Preisseite https://www.infomaniak.com/de/domains/preise/ch (analog /swiss, /com, /li) lädt ihre Preise aus `https://www.infomaniak.com/api-g/tldprice?country=CH&ext=<tld>`. Ich habe diese Daten direkt mit `country=CH` abgefragt.
   - Hintergrund: Der Proxy dieser Umgebung steht in den USA, deshalb zeigt die Seite im Browser sonst Euro an.
   - Felder: `aSellPrices.CHF` ist der Normalpreis, `aSellPricesDiscounted.CHF` der Aktionspreis für das 1. Jahr. `fRenewInclTax` ist der Verlängerungspreis.

## Preise Infomaniak (CHF, abgerufen 2026-11-07 13:54 UTC)

| Endung | 1. Jahr Aktion exkl. MwSt. | 1. Jahr Aktion inkl. MwSt. | Normalpreis/Verlängerung exkl. | Verlängerung inkl. MwSt. | Wiederherstellung nach Ablauf (inkl.) |
|---|---|---|---|---|---|
| .ch | 4.64 | **5.00** | 9.89 | **10.70** | 20.05 |
| .li | 5.11 | **5.50** | 8.24 | **8.90** | 8.90 (exkl. 8.24) |
| .com | 9.19 | **9.95** | 13.60 | **14.70** | 106.78 exkl. |
| .swiss | 82.33 | **89.00** | 106.78 | **115.45** | 106.78 exkl. |

- Die Website weist ihre Preise als «exkl. MwSt.» aus (Hinweis im Seitenfuss). Die Werte inkl. MwSt. stammen aus demselben Datensatz. 9.89 × 1.081 = 10.69, gerundet 10.70, das passt.
- Laut denselben Daten dauert der Transfer einer .ch-Domain zu Infomaniak 0 Tage und kostet CHF 0.–. DNSSEC und Domain Privacy sind möglich.
- Ob der Aktionspreis bis zur Bestellung gilt, ist offen: Ein Enddatum der Aktion steht nicht in den Daten.

## Ergebnis je Domain

| Domain | Verfügbar? | Bemerkung |
|---|---|---|
| besart.ch | **nein** (seit 2002) | Inhaber unbekannt. Wäre nur über eine Anfrage beim Inhaber erhältlich (z. B. über den Registrar Swizzonic). Es ist unklar, ob dort eine Website läuft (nicht abrufbar). |
| besart-hairsalon.ch | ja | **Top 1**, exakt der Salonname |
| besarthairsalon.ch | ja | als Weiterleitung sichern |
| besart-horgen.ch | ja | **Top 2**, kurz und lokal |
| besarthorgen.ch | ja | Tippvariante |
| besart-coiffeur.ch | ja | gute Alternative |
| coiffeur-besart.ch | ja | – |
| besart-barber.ch | ja | nur Herren, nicht als Hauptdomain |
| besart-hair.ch | ja | – |
| besarthair.ch | ja | – |
| hairsalon-besart.ch | ja | – |
| besart-salon.ch | ja | – |
| besart.swiss | **nicht prüfbar** | teuer. Voraussetzungen siehe unten. |
| besart-hairsalon.swiss | **nicht prüfbar** | teuer |
| besart.com | **nicht prüfbar** | von Hand prüfen |
| besarthairsalon.com | **nicht prüfbar** | nicht nötig |
| *Eigene Vorschläge:* | | |
| haarmitart.ch | ja | **Top 3**, Claim «Haar mit Art.» der Drucksachen |
| besart-coiffure.ch | ja | – |
| besartcoiffeur.ch | ja | – |
| besart-haarsalon.ch | ja | – |
| besart-hairstyle.ch | ja | – |
| coiffure-besart.ch | ja | – |
| besart-zh.ch | ja | – |
| besart.li | ja | nur als Schutz, für einen Salon in Horgen verwirrend |

### Hinweise zu .swiss

.swiss ist nicht frei für jedermann. Laut den Registrar-Anweisungen von nic.swiss und Registrar-Seiten (Gandi, Openprovider) gilt:

- Unternehmen brauchen eine **UID (CHE-…)** und einen ausreichenden Bezug zur Schweiz.
- **Einzelfirmen** sind zugelassen, wenn sie **im Handelsregister eingetragen** sind.
- Seit 24.04.2024 sind auch Privatpersonen mit Wohnsitz in der Schweiz zugelassen.
- Jeder Antrag wird **20 Tage publiziert**. In dieser Zeit können andere Antragsteller dieselbe Domain beantragen.
- Der Name muss einen objektiven Bezug zum Antragsteller haben.

Quellen siehe unten; die Dokumente selbst waren **nicht abrufbar**, die Angaben stammen aus Suchergebnissen. Für BesArt bringt .swiss gegenüber .ch keinen Vorteil, kostet aber etwa das 11-Fache.

## Empfehlung Top 3

1. **besart-hairsalon.ch**: Hauptdomain für Website und E-Mail (z. B. termin@besart-hairsalon.ch).
   - Der Name entspricht 1:1 dem Salonnamen auf Salonkee, Google und den Drucksachen. Das ist gut für die Wiedererkennung und für die Google-Suche nach «BesArt Hairsalon».
   - Der Bindestrich macht den Namen lesbar. Im Gespräch klingt das so: «besart, Bindestrich, hairsalon punkt ch».
2. **besart-horgen.ch**: kurze, leicht diktierbare Zweitdomain mit Ortsbezug, als Weiterleitung auf die Hauptdomain. Ideal für Visitenkarte und Telefon.
3. **haarmitart.ch**: Weiterleitung für Kampagnen, passend zum Claim auf Flyer und Aufsteller. Ohne Personenname ist sie auch dann noch nutzbar, wenn der Salon einmal anders heisst.

Zusätzlich günstig absichern: **besarthairsalon.ch** (Tippschutz).

**Kosten Paket (Infomaniak, inkl. MwSt.):** 4 × .ch kosten im 1. Jahr 4 × CHF 5.00 = **CHF 20.00**, ab dem 2. Jahr 4 × CHF 10.70 = **CHF 42.80 pro Jahr**. Wer nur die Hauptdomain nimmt, zahlt CHF 5.00 und danach CHF 10.70 pro Jahr.

**Wichtig:** Freie Domains können jederzeit von anderen registriert werden. Darum am besten **direkt nach dem Gespräch registrieren**, und zwar auf den Namen des Inhabers bzw. der Firma, nicht auf den Namen der Agentur.

## Quellen

- https://rdap.nic.ch/domain/besart.ch – RDAP SWITCH, besart.ch registriert – abgerufen 2026-11-07 13:48 UTC
- https://rdap.nic.ch/domain/<NAME> für alle .ch/.li-Kandidaten in domains.csv – RDAP SWITCH – abgerufen 2026-11-07 13:48–13:59 UTC
- https://rdap.nic.ch/domain/google.li und https://rdap.nic.ch/domain/vaduz.li – Gegenprobe .li – abgerufen 2026-11-07
- https://www.nic.ch/terms/aup/ – Nutzungsbedingungen RDAP (Link aus RDAP-Antwort) – nicht separat abgerufen
- https://www.infomaniak.com/de/domains/preise/ch, /swiss, /com, /li – Infomaniak Domain-Tarife – abgerufen 2026-11-07
- https://www.infomaniak.com/api-g/tldprice?country=CH&ext=ch (sowie ext=swiss, com, li) – Preisdaten der Infomaniak-Tarifseite – abgerufen 2026-11-07 13:54 UTC
- https://www.infomaniak.com/de/domains und https://www.infomaniak.com/de/domains/whois – Infomaniak Domainsuche/Whois (Suche leitet auf shop.infomaniak.com) – abgerufen 2026-11-07
- https://shop.infomaniak.com/order2/domain?lang=de&domain_name=… – Infomaniak Shop/Verfügbarkeit – **nicht abrufbar** (Proxy lehnt ab)
- https://api.infomaniak.com – **nicht abrufbar**
- https://rdap.nic.swiss/domain/besart.swiss, https://rdap.verisign.com/com/v1/domain/besart.com, https://rdap.org/domain/besart.com – **nicht abrufbar**
- https://www.nic.swiss/dam/nic/en/dokumente/240117_Instruction_registrars.pdf.download.pdf/240117_Instruction_registrars.pdf – Registrar-Anweisungen .swiss (Einzelfirmen mit HR-Eintrag) – **nicht abrufbar**, Inhalt laut Suchergebnis 2026-11-07
- https://gandi.net/en/tlds/swiss – .swiss Bedingungen (Gandi) – **nicht abrufbar**, laut Suchergebnis 2026-11-07
- https://support.openprovider.eu/hc/en-us/articles/360000740327--swiss – UID-Pflicht .swiss – **nicht abrufbar**, laut Suchergebnis 2026-11-07
- https://community.icann.org/download/attachments/278856071/ICANN79_ALAC_dotSwiss_registrant_verif.pdf?api=v2 – Zulassung natürlicher Personen ab 24.04.2024 – **nicht abrufbar**, laut Suchergebnis 2026-11-07
