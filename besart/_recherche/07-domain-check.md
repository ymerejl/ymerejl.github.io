# 07 – Domain-Check (Nachprüfung)

**Prüfzeitpunkt:** 10. November 2026, 07:12:26–07:12:54 UTC (08:12–08:13 Uhr Schweizer Zeit). Maschinenlesbar: [domains-check.json](domains-check.json).

## Ergebnis auf einen Blick

- **17 von 18 .ch-/.li-Namen sind frei.** Beide Abfragen bei SWITCH lieferten HTTP 404, also «nicht registriert».
- **besart.ch ist vergeben.** Registriert seit 15.04.2002, Registrar Swizzonic AG, Nameserver ns1/ns2.hoststar.hosting. Den Inhaber zeigt RDAP nicht an.
- **besart.com, besarthairsalon.com und besart.swiss: nicht prüfbar.** Der Proxy dieser Umgebung blockiert rdap.verisign.com, rdap.nic.swiss und rdap.org (CONNECT 403). Eine Antwort der Registry liegt also nicht vor. → Vor dem Termin von Hand prüfen, z. B. im Infomaniak-Shop.
- **Die .com-Preise haben sich seit dem 7.11. geändert.** Sie stiegen von 9.95 auf **10.25** (1. Jahr) und von 14.70 auf **15.70** (Verlängerung). Die Preise für .ch, .li und .swiss sind gleich geblieben.

## Tabelle

Preise: Infomaniak, CHF inkl. MwSt. «1. Jahr» ist der aktuelle Aktionspreis, «Verlängerung» der Preis pro Folgejahr.

| Domain | frei? | Beleg (HTTP-Status, Zeit UTC am 10.11.2026; bei vergeben: seit wann) | Preis 1. Jahr | Verlängerung |
|---|---|---|---|---|
| besart.ch | **nein** | rdap.nic.ch: HTTP 200 (07:12:26) / HTTP 200 (07:12:43), registriert seit 15.04.2002, Registrar Swizzonic AG | 5.00 | 10.70 |
| besart-hairsalon.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:27) / HTTP 404 (07:12:43) | 5.00 | 10.70 |
| besarthairsalon.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:28) / HTTP 404 (07:12:44) | 5.00 | 10.70 |
| besart-horgen.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:28) / HTTP 404 (07:12:44) | 5.00 | 10.70 |
| besarthorgen.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:28) / HTTP 404 (07:12:45) | 5.00 | 10.70 |
| haarmitart.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:29) / HTTP 404 (07:12:45) | 5.00 | 10.70 |
| haar-mit-art.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:29) / HTTP 404 (07:12:46) | 5.00 | 10.70 |
| besart-coiffeur.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:30) / HTTP 404 (07:12:46) | 5.00 | 10.70 |
| besartcoiffeur.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:30) / HTTP 404 (07:12:46) | 5.00 | 10.70 |
| besart-coiffure.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:31) / HTTP 404 (07:12:47) | 5.00 | 10.70 |
| besart-hair.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:31) / HTTP 404 (07:12:47) | 5.00 | 10.70 |
| besarthair.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:31) / HTTP 404 (07:12:48) | 5.00 | 10.70 |
| besart-barber.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:32) / HTTP 404 (07:12:48) | 5.00 | 10.70 |
| besart-salon.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:32) / HTTP 404 (07:12:48) | 5.00 | 10.70 |
| besart-haarsalon.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:33) / HTTP 404 (07:12:49) | 5.00 | 10.70 |
| hairsalon-besart.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:33) / HTTP 404 (07:12:49) | 5.00 | 10.70 |
| coiffeur-besart.ch | **ja** | rdap.nic.ch: HTTP 404 (07:12:33) / HTTP 404 (07:12:50) | 5.00 | 10.70 |
| besart.li | **ja** | rdap.nic.ch: HTTP 404 (07:12:34) / HTTP 404 (07:12:50) | 5.50 | 8.90 |
| besart.com | **nicht prüfbar** | rdap.verisign.com: vom Proxy blockiert (CONNECT 403, 07:12:51), keine Registry-Antwort | 10.25 | 15.70 |
| besarthairsalon.com | **nicht prüfbar** | rdap.verisign.com: vom Proxy blockiert (CONNECT 403, 07:12:51), keine Registry-Antwort | 10.25 | 15.70 |
| besart.swiss | **nicht prüfbar** | rdap.nic.swiss: vom Proxy blockiert (CONNECT 403, 07:12:51), keine Registry-Antwort | 89.00 | 115.45 |

## Methode

1. **.ch/.li:** `curl https://rdap.nic.ch/domain/<name>` beim RDAP-Server von SWITCH, der Registry für .ch und .li. Jede Domain wurde zweimal abgefragt, im Abstand von rund 16 Sekunden (Runde 1: 07:12:26–07:12:34, Runde 2: 07:12:43–07:12:50). Beide Runden ergaben dasselbe Ergebnis.
   - Die 404-Antworten kommen vom Server selbst und nicht vom Proxy. Antwortkopf: `HTTP/1.1 404 Not Found`, `Server: Apache`, `content-length: 0`.
   - Gegenprobe: google.li liefert in beiden Runden HTTP 200. RDAP erkennt also auch bei .li vergebene Domains. Ebenso liefert besart.ch HTTP 200, mit Domain-Objekt (Status `active`, Ereignis `registration` am 2002-04-15).
2. **.com/.swiss:** Abgefragt wurden `https://rdap.verisign.com/com/v1/domain/<name>`, `https://rdap.nic.swiss/domain/besart.swiss` und `https://rdap.org/domain/besart.com`. Alle vier Anfragen scheiterten am Proxy mit `CONNECT tunnel failed, response 403`. Über die Verfügbarkeit sagt das nichts aus.
3. **Preise:** `https://www.infomaniak.com/api-g/tldprice?country=CH&ext=<ch|li|com|swiss>`, abgerufen 07:12:52–07:12:54 UTC. Verwendet sind diese Felder:
   - `aSellPricesDiscounted.CHF.fUnitInclTax` für das 1. Jahr
   - `aSellPricesDiscounted.CHF.fRenewInclTax` für die Verlängerung

   Ein Enddatum der Aktion ist in den Daten nicht angegeben.

## Einschränkungen

- «Frei» heisst: zum Prüfzeitpunkt nicht registriert. Bis zur Bestellung kann jemand anderes die Domain registrieren. Massgebend ist erst die Bestätigung des Registrars.
- Die Preise sind Momentaufnahmen. Bei der Bestellung gilt der Preis im Warenkorb.
