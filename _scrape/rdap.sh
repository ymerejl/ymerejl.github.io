#!/bin/bash
# Unabhängige Gegenprobe: RDAP der Registries (404 = nicht registriert)
for d in besart.ch besart-hairsalon.ch besarthairsalon.ch besart-horgen.ch besarthorgen.ch haarmitart.ch haar-mit-art.ch besart-coiffeur.ch besartcoiffeur.ch besart-coiffure.ch besart-hair.ch besarthair.ch besart-barber.ch besart-salon.ch besart-haarsalon.ch hairsalon-besart.ch coiffeur-besart.ch besart.li; do
  c1=$(curl -s -o /tmp/r.json -w "%{http_code}" "https://rdap.nic.ch/domain/$d"); sleep 1
  c2=$(curl -s -o /tmp/r2.json -w "%{http_code}" "https://rdap.nic.ch/domain/$d")
  reg=$(python3 -c "import json;d=json.load(open('/tmp/r.json'));print([e.get('eventDate') for e in d.get('events',[]) if e.get('eventAction')=='registration'])" 2>/dev/null)
  echo "$d rdap.nic.ch $c1 $c2 $(date -u +%FT%TZ) $reg"
done
for d in besart.com besarthairsalon.com; do c=$(curl -s -o /tmp/r.json -w "%{http_code}" "https://rdap.verisign.com/com/v1/domain/$d"); echo "$d rdap.verisign.com $c - $(date -u +%FT%TZ)"; done
c=$(curl -s -o /tmp/r.json -w "%{http_code}" "https://rdap.nic.swiss/domain/besart.swiss"); echo "besart.swiss rdap.nic.swiss $c - $(date -u +%FT%TZ)"
whois -h whois.nic.swiss besart.swiss 2>/dev/null | head -5
