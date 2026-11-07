# 01 – Salonkee: Vertrag, Kündigung, Kosten, Datenexport, Übergang

Recherche für BesArt Hairsalon (Besart Beka, Neugasse 29, 8810 Horgen). Salonkee-Profil: https://salonkee.ch/salon/besart-hairsalon?lang=de
Abrufdatum aller Quellen: 2026-11-07 (sofern nicht «nicht abrufbar»).

## Kurzfazit

- **Laufzeit, Mindestlaufzeit, automatische Verlängerung und Kündigungsfrist sind öffentlich nicht belegbar.** Die öffentlichen AGB auf salonkee.ch gelten nur für Endkunden. Ziff. 1.4 verweist Salons ausdrücklich auf die «Allgemeinen Geschäftsbedingungen für professionelle Nutzer, die Sie bei Ihrer Registrierung erhalten haben». Diese Bedingungen sind nirgends öffentlich abrufbar. Das Hilfe-Center (help.salonkee.com, intercom.help/salonkee) war aus dieser Umgebung **nicht abrufbar**. → **Beim Kundengespräch am 10.11.2026 im Vertrag bzw. in der Registrierungs-E-Mail und im Dashboard nachsehen.**
- **Aktuelle Listenpreise Schweiz** (Preisseite salonkee.com/pro/de-CH/preise/):
  - Go-Paket CHF 79.– pro Monat
  - Smart-Paket CHF 129.– pro Monat
  - Pro-Paket CHF 159.– pro Monat
  - Zusatzmodule: «Salonkee Payments» CHF 35.– pro Monat (nur zu Smart oder Pro), Popcall CHF 15.–, Webseitenersteller CHF 39.–
  - Ob die Preise mit oder ohne MwSt. gelten, ist nicht angegeben.
- **Was ein Terminal kostet (Ableitung):** Wer das Terminal nutzt, braucht laut Preisseite Smart oder Pro plus das Payments-Modul. Nach heutiger Liste sind das mindestens CHF 164.– pro Monat. Das ist eine Ableitung aus der Preisliste, nicht Besarts tatsächlicher Vertrag; Altverträge können anders aussehen.
- **Nicht öffentlich ausgewiesen:**
  - Kommission auf Neukunden- bzw. Marketplace-Buchungen: Auf der Preisseite steht keine.
  - Transaktionsgebühren (Debit, Kredit, TWINT, online): Es gibt keine Angaben.
  - Terminal: Kauf- oder Mietpreis und was mit dem Gerät bei einer Kündigung geschieht.
  - Alle drei Punkte: **nicht bestätigt**, im Vertrag bzw. in den Adyen-Abrechnungen nachsehen.
- **Terminal:** Salonkee setzt Adyen-Geräte vom Typ «AMS 1» und «S1 F2» ein. Abgewickelt wird über Adyen (laut Datenschutzerklärung Ziff. 4.4 und AGB Ziff. 12.1). Ob das Gerät gekauft oder gemietet ist, ist **nicht belegt**.
- **Datenexport:** Salonkee dokumentiert öffentlich keine CSV- oder Excel-Exportfunktion (nicht abrufbar bzw. nicht gefunden).
  - Rechtlich ist der Salon Vertragspartner der Endkunden (AGB Ziff. 12.2, «Seller of Record»).
  - Für die Kundenkartei ist der Salon nach üblicher Einordnung der Verantwortliche und Salonkee der Auftragsbearbeiter. Daraus folgt ein Anspruch auf Rückgabe der Daten bei Vertragsende (DSGVO Art. 28 Abs. 3 lit. g, sinngemäss revDSG Art. 9).
  - Die Auftragsverarbeitung ist öffentlich nicht dokumentiert. → Export **schriftlich per E-Mail verlangen, bevor gekündigt wird**.
- **Einbetten per iframe ist technisch blockiert.** Alle geprüften Salonkee-URLs senden `x-frame-options: SAMEORIGIN`. Das gilt auch für den gefundenen, undokumentierten Widget-Pfad `/salon/besart-hairsalon/widget/service`. Ein Playwright-Test zeigt die Browser-Meldung «Refused to display … in a frame». Möglich ist nur ein **Link bzw. «Termin buchen»-Button**, der in einem neuen Tab öffnet.
- **Empfehlung Übergang:** Erst kündigen, wenn die Frist im Vertrag bekannt ist. Daten exportieren, bevor gekündigt wird. Neues Buchungssystem und neues Terminal ab Mitte Dezember 2026 parallel betreiben. Das Vertragsende möglichst nach dem Website-Start legen (Ende Januar oder Februar 2027).

---

## 1. Salonkee-Vertrag für Salons: Laufzeit, Verlängerung, Kündigung

### Was öffentlich auffindbar ist

**AGB salonkee.ch** («Allgemeine Nutzungsbedingungen Salonkee», zuletzt aktualisiert 01/06/2026). Sie gelten für Endkunden bzw. Website-Nutzer, **nicht** für Salons.

- **Ziff. 1.4:** «Bitte beachten Sie, dass die Nutzungsbedingungen und die Datenschutzrichtlinie nicht für das Arbeitsverhältnis zwischen Salonkee und seinen professionellen Nutzern (wie unten definiert) gelten. Wenn Sie bereits professioneller Nutzer sind, lesen Sie bitte die Allgemeinen Geschäftsbedingungen für professionelle Nutzer, die Sie bei Ihrer Registrierung erhalten haben. […] ‹Professionelle Nutzer› sind professionelle Kunden, wie z.B., aber nicht beschränkt auf Salons/Spa/Wellness-Praktiker, mit denen wir einen Vertrag abgeschlossen haben.»
- Der Abschnitt «KÜNDIGUNG» in diesen AGB betrifft nur Endkunden-Konten. Zitat: «Meldet sich der Nutzer 12 oder mehr Monate lang nicht bei der Website an, kann Salonkee das Konto als inaktiv …». Er ist für Besarts Vertrag nicht massgeblich.
- Anwendbares Recht der Endkunden-AGB: Luxemburg, Gerichtsstand Bezirk Luxemburg (Abschnitt «Streitigkeiten und anwendbares Recht»). Ob das auch im Salon-Vertrag gilt, ist **nicht bestätigt**.

**Vertragspartner** laut Impressum: Salonkee S.A., 38 Rangwee, L-2412 Luxembourg, RCS B207855, Telefon +352 27 63 00 60, vertretungsberechtigt Tom Michels.

### Was nicht belegt ist

| Punkt | Status |
|---|---|
| Vertragslaufzeit (monatlich oder jährlich) | **nicht bestätigt** – Partner-AGB nicht öffentlich |
| Mindestlaufzeit | **nicht bestätigt** |
| Automatische Verlängerung | **nicht bestätigt** |
| Kündigungsfrist | **nicht bestätigt** |
| Kündigungsweg (schriftlich, E-Mail, Dashboard) | **nicht bestätigt** |

Gesucht wurde auf:
- salonkee.ch/terms
- salonkee.com/terms
- salonkee.com/pro/de-CH/preise/
- den Pro-Feature-Seiten
- per Websuche (DE, EN, FR)

Das Hilfe-Center help.salonkee.com bzw. intercom.help/salonkee ist **nicht abrufbar**, weil der Proxy die Verbindung ablehnt (connect_rejected). Es existiert aber: Die Websuche findet z. B. den Artikel «payment-terminal-payment-module».

Die Seiten salonkee.com/pro/de-CH/software-friseur-kosmetikstudio/ und …/friseursalons/ liefern HTTP 403 (S3 «AccessDenied»).

### Was Besart beim Gespräch nachsehen bzw. mitbringen sollte

1. Die Vertrags- bzw. Willkommens-E-Mail von Salonkee mit den «AGB für professionelle Nutzer» (PDF oder Link).
2. Im Salonkee-Pro-Dashboard den Bereich Einstellungen → Abonnement, Rechnungen bzw. Billing. Dort stehen das Paket, der Abrechnungsrhythmus und gegebenenfalls das Startdatum.
3. Die letzte Salonkee-Rechnung (Paket und Betrag) und die letzte Adyen-Auszahlung bzw. -Abrechnung (Gebühren pro Transaktion).
4. Falls nichts zu finden ist: Den Salonkee-Support per E-Mail fragen. Die auf salonkee.ch verschleiert dargestellte Adresse lässt sich als support@salonkee.com rekonstruieren (**nicht bestätigt**, siehe Ziff. 4). Gefragt werden sollte nach Laufzeit, Kündigungsfrist, Kündigungsform, dem Enddatum bei Kündigung per heute und der Terminal-Regelung. Die Antwort schriftlich aufbewahren.

**Empfehlung zur Form:** Die Kündigung immer **schriftlich per E-Mail mit Bitte um Bestätigung** schicken. Verlangt der Vertrag Schriftform, zusätzlich per eingeschriebenem Brief an Salonkee S.A., 38 Rangwee, L-2412 Luxembourg.

---

## 2. Adyen-Zahlterminal über Salonkee

| Punkt | Befund | Quelle |
|---|---|---|
| Hersteller und Abwicklung | Adyen ist «einer unserer wichtigsten Zahlungsanbieter» (AGB Ziff. 12.1). In der Datenschutzerklärung Ziff. 4.4 steht: «nutzen wir die Dienste Dritter von Adyen (Rokin 49, 1012 KK, Niederlande) für die Zahlungsabwicklung» | salonkee.ch/terms, salonkee.ch/data_privacy_policy |
| Modelle | «Darum hat Salonkee sich für AMS 1- und S1 F2-Terminals entschieden.» | salonkee.com/pro/de-CH/onlinezahlungen-ec-gerat/ |
| Akzeptierte Zahlmittel (laut Salonkee) | «accepts chip and contactless payments, including all major debit and credit cards, as well as Apple Pay and Google Pay» | ebenda. TWINT wird dort **nicht** erwähnt |
| Voraussetzung | Payments-Modul CHF 35.– pro Monat, «Zu Smart- oder Pro-Paket hinzufügen», mit dem Punkt «Zahlungsterminal (optional)» | salonkee.com/pro/de-CH/preise/ |
| Kauf oder Miete, Gerätepreis | **nicht bestätigt**. Salonkee nennt keinen Hardwarepreis. Laut Suchergebnis-Snippet verweist das Salonkee-Hilfe-Center für Preise auf den Support-Chat (Seite nicht direkt abrufbar) | help.salonkee.com (nicht abrufbar) |
| Vertrag mit Adyen | Laut Suchergebnis-Snippet akzeptiert der Salon beim Einrichten die Adyen-Bedingungen und hinterlegt seine Bankdaten auf der Adyen-Plattform (Seite nicht direkt abrufbar) | intercom.help/salonkee/de/articles/4247773 (nicht abrufbar) |
| Rückgabe, Restmiete, Eigentum bei Kündigung | **nicht bestätigt** | – |

**Folgerung:** Es ist unklar, ob Besart das Gerät gekauft hat (dann gehört es ihm, ist aber ohne Salonkee- bzw. Adyen-Konto wahrscheinlich nicht weiter nutzbar) oder ob es gemietet bzw. leihweise überlassen ist (dann muss es zurückgegeben werden). Das ist beim Gespräch zu klären. Hinweise geben die Rechnung des Terminals oder ein Lieferschein. Bis das neue Terminal läuft, muss das alte in Betrieb bleiben.

Zum Vergleich und nicht übertragbar: Die Websuche zeigt bei einem anderen Anbieter (Salonized Pay) AMS1 für EUR 199.– und S1F2 für EUR 399.– als Kaufpreis. Das sind **keine** Salonkee-Preise.

---

## 3. Kosten heute in der Schweiz (Listenpreise, belegt)

Quelle: https://salonkee.com/pro/de-CH/preise/ (abgerufen 2026-11-07). Überschrift der Seite: «3 Optionen, 1 unschlagbarer Service! Ab 79 CHF / Monat».

| Paket bzw. Modul | Preis | Inhalt (Auszug) |
|---|---|---|
| GO-PAKET | CHF 79.– pro Monat | Digitaler Kalender, Online-Buchungen 24/7, «Auf Salonkee gelistet», Warteliste, SMS- und E-Mail-Erinnerungen, Kundenkartei mit Fotos, «Erweitertes Google-SEO», E-Mail-Kampagnen (500 pro Monat), SMS-Kampagnen, Formulare |
| SMART-PAKET (Go enthalten) | CHF 129.– pro Monat | zusätzlich Kassensystem, Buchhaltungsberichte, Bestandsverwaltung, Geschenkgutscheine, Abonnements, Promo-Codes, Treuepunkte |
| PRO-PAKET (Go und Smart enthalten) | CHF 159.– pro Monat | zusätzlich Mitarbeiter-Zugriffsverwaltung, Änderungshistorie, Personalverwaltung, Zeiterfassung, Statistiken, Kettenfunktionen, unbegrenzte E-Mails |
| SALONKEE PAYMENTS-MODUL | CHF 35.– pro Monat | «Zu Smart- oder Pro-Paket hinzufügen»: Zahlungsterminal (optional), Stornierungs- und No-Show-Richtlinien, Online-Zahlungen, Online-Verkauf von Gutscheinen und Abos |
| POPCALL | CHF 15.– pro Monat | Anruferkennung |
| WEBSEITENERSTELLER | CHF 39.– pro Monat | «Sofortiger Website-Generator», Designvorlagen, eigene Domain |

Wichtige Punkte zur Preisliste:
- **Ob die Preise mit oder ohne MwSt. gelten, ist nicht angegeben.**
- Eine Einrichtungsgebühr wird nicht erwähnt. Ebenso wenig steht dort, ob monatlich oder jährlich abgerechnet wird.
- Die Feature-Vergleichstabelle der Seite enthält u. a. die Zeile «Tap to Pay».
- Die Zuordnung pro Paket wird nur grafisch dargestellt und war im Text nicht auslesbar.

**Kommission auf Neukunden- oder Marketplace-Buchungen:** Auf der Schweizer Preisseite ist keine Kommission ausgewiesen. Ob es vertraglich trotzdem eine gibt, ist **nicht bestätigt**. Die Websuche fand keine Salonkee-Quelle dazu.

**Zahlungsgebühren** (Terminal und online; Debit, Kredit, TWINT): **nicht öffentlich, nicht bestätigt.** Die tatsächlichen Sätze stehen in der Adyen-Auszahlungsübersicht bzw. im Salonkee-Payments-Bereich des Dashboards. Ob TWINT über das Salonkee-Terminal akzeptiert wird, ist ebenfalls **nicht bestätigt**, denn die Salonkee-Seite nennt nur Karten, Apple Pay und Google Pay.

**Besarts mutmassliche Fixkosten:** Mit Terminal sind es mindestens Smart (CHF 129.–) plus Payments (CHF 35.–), also **CHF 164.– pro Monat bzw. CHF 1'968.– pro Jahr** nach Liste. Dazu kommen Transaktionsgebühren. Das ist eine Ableitung und muss an der echten Rechnung geprüft werden.

---

## 4. Export von Kundendaten und Terminen; Datenschutz

### Export-Funktion

- Auf den öffentlichen Seiten wird **keine CSV- oder Excel-Exportfunktion** beschrieben. Geprüft wurden u. a. Preisseite, «Kundenmanagement» und «Kassensystem».
- Die Seite «Kundenmanagement» (salonkee.com/pro/de-CH/kunden-verwaltung/) nennt nur «Umfassendes Kundenprofil», «Interaktives Kundenprofil» und «Formulare».
- Salonkee bewirbt den *Import* («Der Wechsel von einem System zum anderen sollte für Sie absolut unkompliziert sein – deswegen kümmern wir uns um alles»), aber nicht den Export.
- Das Hilfe-Center ist **nicht abrufbar**. Gezielte Suchen nach «help.salonkee.com export» ergaben keine Salonkee-Treffer.

**Vorgehen:**
1. Im Dashboard nachsehen, ob es einen Export gibt. Mögliche Orte sind Kunden → Optionen/Export und die Berichte, z. B. die Buchhaltungs- und Verkaufsberichte, die im Smart-Paket enthalten sind.
2. Zusätzlich **per E-Mail an Salonkee** einen vollständigen Export in einem maschinenlesbaren Format (CSV oder XLSX) verlangen. Er sollte enthalten:
   - Kundenstamm: Name, Telefon, E-Mail, Geburtsdatum, Notizen, Einwilligungen für Marketing
   - Terminhistorie
   - **alle zukünftigen Termine** mit Datum, Uhrzeit, Leistung und Kunde
   - offene Gutscheine und Abos
   - gegebenenfalls Kassenjournal bzw. Umsätze (Buchführung, Aufbewahrungspflicht)
3. Frist setzen (z. B. 14 Tage) und bitten, den Erhalt zu bestätigen.
4. Fotos in den Kundenkarten gesondert anfragen.

### Wer ist verantwortlich?

- **AGB Ziff. 12.2:** «Der jeweilige professionelle Nutzer ist Verkäufer und Vertragspartner (Seller of Record) für alle über die Website angebotenen, gebuchten oder gekauften Dienstleistungen und Gutscheine; der Vertrag […] kommt unmittelbar zwischen Ihnen und dem jeweiligen professionellen Nutzer zustande. Salonkee […] handelt ausschliesslich als Technologieplattform …»
- **Datenschutzerklärung salonkee.ch** (zuletzt aktualisiert 21/06/2023):
  - Ziff. 1.1: «Salonkee ist verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im Sinne der GDPR.» Die Erklärung gilt aber nur für die Datenbearbeitung «über die Website von Salonkee», also für Endnutzer-Konten, Kontaktformulare und Bewerbungen.
  - Ziff. 4.5 nennt als Empfänger «Unsere Partner, bei denen Sie Dienstleistungen anfordern: um Ihre Buchung zu verwalten und abzuschliessen».
  - Ziff. 7.2 erwähnt das Recht auf «Übertragbarkeit».
  - Hosting: AWS Frankfurt (Ziff. 5).
  - Die Kontakt-E-Mail ist im HTML verschleiert. Aus den Fragmenten ergibt sich vermutlich support@salonkee.com (**nicht bestätigt**). Postadresse: Centre Orchimont, 36-38 Rangwee, L-2412 Luxemburg.
- Eine Aussage zur Rolle bei der **Kundenkartei des Salons** (Salon als Verantwortlicher, Salonkee als Auftragsverarbeiter) bzw. ein öffentlicher Auftragsverarbeitungsvertrag (AVV/DPA) **ist nicht auffindbar**. Die Rollenverteilung dürfte in den Partner-AGB stehen (**nicht bestätigt**).

### Rechtliche Einordnung

Das ist keine Rechtsberatung; die Gesetzestexte wurden nicht neu abgerufen.

- Für die vom Salon gepflegte Kundenkartei (Stammkunden, Telefonbuchungen, Notizen) ist **der Salon nach revDSG bzw. DSGVO typischerweise der Verantwortliche**. Salonkee bearbeitet die Daten in seinem Auftrag.
- Für Kundinnen und Kunden, die sich auf der Marketplace-Plattform ein eigenes Salonkee-Konto angelegt haben, ist Salonkee zusätzlich selbst Verantwortlicher für dieses Konto (Ziff. 1.1 der Datenschutzerklärung).
- **Herausgabe an den Salon:**
  - Massgeblich ist *nicht* das Recht auf Datenportabilität. Dieses Recht steht nur der betroffenen Person zu, also dem einzelnen Kunden (revDSG Art. 28, DSGVO Art. 20).
  - Massgeblich ist vielmehr der **Vertrag bzw. die Auftragsbearbeitung**.
  - DSGVO Art. 28 Abs. 3 lit. g verpflichtet den Auftragsverarbeiter, nach Abschluss der Leistungen alle personenbezogenen Daten nach Wahl des Verantwortlichen zurückzugeben oder zu löschen.
  - Das revDSG (Art. 9) verlangt, dass der Auftragsbearbeiter nur so bearbeitet, wie es der Verantwortliche selbst dürfte.
  - Da Salonkee in Luxemburg sitzt, gilt für Salonkee die DSGVO.
- **Folgen für Besart:**
  - Er darf die exportierten Kundendaten für den Weiterbetrieb seines Salons (Terminverwaltung) im neuen System nutzen.
  - Für **Marketing-E-Mails oder -SMS** braucht er eine bestehende Einwilligung bzw. eine bestehende Kundenbeziehung; die Einwilligungen sollten mit exportiert werden.
  - In der Datenschutzerklärung der neuen Website ist das neue Buchungstool als Auftragsbearbeiter zu nennen.

---

## 5. Übergangsplan 10.11.2026 → Website-Start Januar 2027

**Annahmen** (klar gekennzeichnet, weil die Frist nicht belegt ist):
- Szenario A: Vertrag monatlich kündbar, Frist 1 Monat auf Monatsende.
- Szenario B: Jahresvertrag mit automatischer Verlängerung; Frist und Verlängerungsdatum unbekannt.
- Das **echte Datum ist am 10.11.2026 im Vertrag bzw. Dashboard nachzusehen** und der Plan entsprechend zu verschieben.
- Website-Start angenommen am Montag, 11.01.2027.

| Datum | Schritt | Bemerkung |
|---|---|---|
| **Di 10.11.2026** (Kundengespräch) | Im Vertrag bzw. Dashboard nachsehen: Paket, Laufzeit, Kündigungsfrist und -form, Verlängerungsdatum, Terminal (Kauf oder Miete), Transaktionsgebühren der letzten Abrechnung. Fotos bzw. Screenshots davon machen | Ohne diese Angaben **nicht** kündigen |
| bis Fr 13.11.2026 | E-Mail an Salonkee: (1) Laufzeit und frühestes Vertragsende schriftlich bestätigen lassen, (2) vollständigen Datenexport (CSV/XLSX) verlangen, (3) Terminal-Regelung bei Vertragsende erfragen | Antworten ablegen |
| bis Fr 27.11.2026 | Nachfolger wählen und einrichten: Buchungstool (siehe andere Recherche-Dateien) und Terminal (z. B. SumUp, myPOS, Payrexx, wallee, mit TWINT). Gerät bestellen | Lieferzeit einplanen |
| bis Mo 30.11.2026 | **Szenario A:** Kündigung so absenden, dass das Vertragsende **frühestens 31.01.2027** ist (sicherer: 28.02.2027). Nicht auf 31.12.2026 kündigen, sonst fehlt der Parallelbetrieb vor dem Website-Start | Bei 1 Monat Frist reicht eine Kündigung im Dezember für Ende Januar. Spätestens bis **31.12.2026** absenden, Bestätigung verlangen |
| — | **Szenario B:** Die Kündigung muss vor Ablauf der Frist vor dem Verlängerungsdatum eingehen. Liegt das Verlängerungsdatum z. B. im Frühjahr 2027, kann Salonkee bis dahin parallel laufen (Kosten weiterlaufen lassen) | Fristversäumnis = Verlängerung um ein Jahr (falls so vereinbart) |
| Mo 30.11. – Fr 11.12.2026 | Export erhalten und prüfen (Vollständigkeit, Umlaute, Telefonnummern). Ins neue Tool importieren. **Zukünftige Termine** übertragen | Zweiten Export kurz vor dem Umstellungstag einplanen |
| ab Mo 14.12.2026 | **Parallelbetrieb:** neues Terminal an der Kasse im Einsatz, altes Salonkee-Terminal als Reserve. Neues Buchungstool intern testen (Testbuchungen, SMS/E-Mail-Bestätigungen) | Kassenabschluss in beiden Systemen abgleichen |
| Mo 04.01.2027 | Salonkee-Kalender für neue Online-Buchungen ab dem Umstellungstag sperren, z. B. durch Abwesenheit bzw. geblockte Zeiten ab 11.01.2027. Hinweis im Salonkee-Profiltext auf die neue Buchungsseite | Vorher prüfen, ob die Partner-AGB solche Hinweise erlauben |
| Mo 04.01. – So 10.01.2027 | Letzter Datenexport (Delta seit dem ersten Export). Restliche Termine übertragen | – |
| **Mo 11.01.2027** (Website-Start) | Website live mit neuem Buchungslink. **Google-Unternehmensprofil umstellen:** Website-URL setzen, Termin- bzw. Buchungslink auf das neue Tool ändern, das Salonkee-«Online reservieren» entfernen bzw. vom neuen Anbieter ersetzen lassen. Instagram-Bio-Link (instagram.com/hairsalon.besart) anpassen | Das «Online reservieren» von Google leitet laut Salonkee auf die Salonkee-Seite (siehe Ziff. 6) |
| ab 11.01.2027 | **Kunden informieren:** Aushang im Salon, Visitenkarte oder Flyer mit QR-Code zur neuen Buchung, einmalige Info-E-Mail oder -SMS an Kunden mit Einwilligung, Hinweis bei Terminbestätigungen. Telefonbuchungen wie bisher | Text: «Ab sofort buchen Sie online unter …» |
| bis Vertragsende (31.01. bzw. 28.02.2027) | Salonkee nur noch für Restabwicklung: Gutscheine und Abos einlösen, Auszahlungen abwarten, Stornos. Terminal gemäss Vertrag zurückgeben oder abmelden | Letzte Adyen-Auszahlung abwarten |
| nach Vertragsende | Bestätigung der Datenlöschung verlangen (DSGVO Art. 28 Abs. 3 lit. g). Daueraufträge bzw. Lastschriften kontrollieren | – |

**Offene Gutscheine und Abos**, die über Salonkee verkauft wurden: Liste exportieren und im neuen System bzw. manuell weiterführen. Der Salon bleibt «Seller of Record» (AGB Ziff. 12.2) und muss sie einlösen.

---

## 6. Option «Salonkee behalten und nur verlinken bzw. einbetten»

### Was Salonkee anbietet (belegt)

Seite «Bessere Online-Präsenz» (salonkee.com/pro/de-CH/online-auftritt-coiffeur-kosmetikstudio/):
- «SEO-optimierte Salonseite»
- «‹Online reservieren›-Schaltfläche von Google […] Dieses Feature leitet Kunden direkt von den Google-Suchergebnissen auf Ihre Salonkee-Seite weiter» (also eine Reserve-with-Google-Integration)
- «Website-Erstellung» (kostenpflichtiges Zusatzmodul Webseitenersteller, CHF 39.– pro Monat)

Ein öffentlich dokumentiertes **Widget- oder Einbettungs-Script für fremde Websites ist nicht auffindbar**. Das Hilfe-Center ist nicht abrufbar.

**Technischer Befund:** Im JavaScript von salonkee.ch (main-Q7ZQFAQQ.js) gibt es Routen `salon/*/widget`, `salon/*/widget/*` usw. sowie eine Komponente «app-widget-footer». `https://salonkee.ch/salon/besart-hairsalon/widget` leitet per 302 auf `/salon/besart-hairsalon/widget/service` weiter. Diese Seite zeigt eine reduzierte Buchungsstrecke («1 von 4 – Dienstleistungen», z. B. «Waschen, Schneiden, Föhnen – Ab 95 CHF»). Der Pfad ist **undokumentiert** und kann sich ohne Vorankündigung ändern.

### iframe-Test (curl -sI, 2026-11-07)

| URL | HTTP | X-Frame-Options | CSP frame-ancestors |
|---|---|---|---|
| https://salonkee.ch/salon/besart-hairsalon?lang=de | 200 | `SAMEORIGIN` | kein CSP-Header |
| https://salonkee.ch/salon/besart-hairsalon/widget | 302 → …/widget/service | `SAMEORIGIN` | kein CSP-Header |
| https://salonkee.ch/salon/besart-hairsalon/widget/service?lang=de | 200 | `SAMEORIGIN` | kein CSP-Header |
| https://salonkee.ch/ | 200 | `SAMEORIGIN` | kein CSP-Header |

Zusätzlich lief ein Test mit Playwright und Chromium: Eine Seite einer fremden Origin bettete die Widget-URL per `<iframe>` ein. Ergebnis in der Browser-Konsole: `Refused to display 'https://salonkee.ch/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.` Der Frame blieb leer (`chrome-error://chromewebdata/`).

**→ Einbetten per iframe auf besart-website.ch ist nicht möglich.** Es funktioniert nur innerhalb von salonkee.ch selbst, vermutlich auch mit dem Salonkee-eigenen Webseitenersteller (nicht bestätigt).

### Was funktioniert: Link bzw. Button (neuer Tab)

```html
<!-- Empfohlen: offizielle Salonseite -->
<a class="btn btn-primary"
   href="https://salonkee.ch/salon/besart-hairsalon?lang=de"
   target="_blank" rel="noopener">
  Termin online buchen
</a>

<!-- Alternative: direkt in die Buchungsstrecke (undokumentierter Pfad, kann sich ändern) -->
<a href="https://salonkee.ch/salon/besart-hairsalon/widget/service?lang=de"
   target="_blank" rel="noopener">Termin buchen</a>

<!-- Funktioniert NICHT (X-Frame-Options: SAMEORIGIN):
<iframe src="https://salonkee.ch/salon/besart-hairsalon?lang=de"></iframe> -->
```

Zusätzlich einen QR-Code auf Visitenkarte und Flyer mit demselben Link sowie die Telefonnummer «+41 44 725 14 04» (laut Salonkee-Profil) als Alternative.

### Vor- und Nachteile

| Vorteile «Salonkee behalten» | Nachteile |
|---|---|
| Kein Migrationsaufwand, keine Datenübernahme, Terminal bleibt | Fixkosten bleiben (nach Liste mindestens CHF 79.– pro Monat ohne Terminal, mit Terminal mindestens CHF 164.– pro Monat; MwSt. unklar) |
| Kunden kennen die Buchung bereits; Google-«Online reservieren» läuft schon | Kein Einbetten, die Buchung findet auf salonkee.ch statt (Branding Salonkee, Konkurrenz-Salons im Umfeld der Plattform) |
| Listung auf dem Salonkee-Marketplace (Neukunden) | Kommission auf Buchungen, auch über den eigenen Link: **nicht bestätigt**, im Vertrag prüfen |
| Erinnerungen per SMS und E-Mail, No-Show-Regeln inklusive | Abhängigkeit vom undokumentierten Widget-Pfad bzw. von Salonkee-URLs |
| Website kann rein statisch bleiben (Link-Button) | Kundendaten bleiben bei Salonkee bzw. AWS Frankfurt, Export unklar |

**Fazit Option 6:** Technisch ist das leicht umzusetzen, aber nur als Link. Wirtschaftlich lohnt es sich, wenn Besart Salonkee weiterhin für Kalender und Kasse schätzt und die Fixkosten akzeptiert. Die neue Website hängt dann nicht an einer Migration, und der Website-Start im Januar 2027 ist unabhängig von der Kündigungsfrist.

---

## Quellen

- https://salonkee.ch/terms?lang=de – Allgemeine Nutzungsbedingungen Salonkee (Stand 01/06/2026), Ziff. 1.4, 12.1, 12.2, «Kündigung» – abgerufen 2026-11-07
- https://salonkee.com/terms – AGB (identischer Inhalt, nur Statuscode geprüft) – abgerufen 2026-11-07
- https://salonkee.ch/data_privacy_policy?lang=de – Datenschutzpolitik (Stand 21/06/2023), Ziff. 1.1, 4.4, 4.5, 5, 7 – abgerufen 2026-11-07
- https://salonkee.ch/impressum?lang=de – Impressum Salonkee S.A. – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/preise/ – Preise (Go/Smart/Pro/Payments/Popcall/Webseitenersteller) – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/onlinezahlungen-ec-gerat/ – Salonkee Payments (Terminals AMS 1 / S1 F2) – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/online-auftritt-coiffeur-kosmetikstudio/ – Bessere Online-Präsenz («Online reservieren» von Google, Website-Erstellung) – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/kunden-verwaltung/ – Kundenmanagement – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/kassensystem-coiffeur-kosmetik/ – Kassensystem – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/book-now/ – Demo buchen – abgerufen 2026-11-07
- https://salonkee.ch/salon/besart-hairsalon?lang=de – Salonprofil BesArt Hairsalon (Header-Test) – abgerufen 2026-11-07
- https://salonkee.ch/salon/besart-hairsalon/widget/service?lang=de – Widget-Buchungsstrecke (undokumentiert, Header- und iframe-Test) – abgerufen 2026-11-07
- https://salonkee.ch/main-Q7ZQFAQQ.js – JavaScript-Bundle (Routen `salon/*/widget`) – abgerufen 2026-11-07
- https://salonkee.com/pro/de-CH/software-friseur-kosmetikstudio/ – nicht abrufbar (HTTP 403 AccessDenied)
- https://salonkee.com/pro/de-CH/friseursalons/ – nicht abrufbar (HTTP 403)
- https://help.salonkee.com/en/articles/11736902-payment-terminal-payment-module – Payment terminal / payment module – nicht abrufbar (Proxy: connect_rejected); Inhalt nur laut Suchergebnis-Snippet
- https://intercom.help/salonkee/de/articles/4247773-richten-sie-ihr-salonkee-payments-profil-ein – Salonkee-Payments-Profil einrichten – nicht abrufbar (Proxy: connect_rejected); Inhalt nur laut Suchergebnis-Snippet
- https://www.trustpilot.com/review/salonkee.lu – Salonkee Reviews – nicht abrufbar
- https://www.salonized.com/en/salonized-pay – Salonized Pay (nur Vergleichspreis AMS1/S1F2, laut Suchergebnis-Snippet, Seite nicht direkt abgerufen)
- Gesetze (nicht neu abgerufen, Wortlaut aus Fachkenntnis): revDSG SR 235.1 Art. 9 und 28 – https://www.fedlex.admin.ch/eli/cc/2022/491/de ; DSGVO Art. 20 und 28 – https://eur-lex.europa.eu/eli/reg/2016/679/oj
