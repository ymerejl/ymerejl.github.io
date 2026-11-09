# Baut die passwortgeschützte Vorschau als eine einzige HTML-Datei (funktioniert auch offline).
#   python3.13 besart/tools/build_preview.py <passwort> [ausgabe.html]
# 1. besart/index.html: alle Verweise auf img/, fonts/, logo/, media/ werden als data:-URI eingebettet.
#    Ausnahme: Videos (.mp4) bleiben eigene Dateien und werden neben die Seite kopiert (ausgabe/media/…),
#    damit die Passwortseite schnell lädt. Offline zeigt die Seite an ihrer Stelle die Standbilder.
# 2. Das Ergebnis wird mit AES-GCM verschlüsselt (Schlüssel per PBKDF2-SHA256, 250'000 Runden)
#    und in die Passwortseite tools/gate.html gesetzt. Ohne Passwort ist nur die Passwortseite lesbar.
import base64, mimetypes, os, re, secrets, sys, hashlib
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

HERE = os.path.dirname(os.path.abspath(__file__)); SITE = os.path.dirname(HERE)
password = sys.argv[1].encode()
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(SITE, '_build', 'index.html')
MIME = {'.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
        '.mp4': 'video/mp4', '.webm': 'video/webm', '.json': 'application/json'}

html = open(os.path.join(SITE, 'index.html'), encoding='utf-8').read()
cache, missing, external = {}, set(), set()
def inline(m):
    q1, path, q2 = m.group(1), m.group(2), m.group(3)
    f = os.path.join(SITE, path)
    if not os.path.isfile(f): missing.add(path); return m.group(0)
    if path.endswith('.mp4'): external.add(path); return m.group(0)
    if path not in cache:
        mt = MIME.get(os.path.splitext(f)[1].lower()) or mimetypes.guess_type(f)[0] or 'application/octet-stream'
        cache[path] = f'data:{mt};base64,' + base64.b64encode(open(f, 'rb').read()).decode()
    return q1 + cache[path] + q2
html = re.sub(r'''(["'(])((?:img|fonts|logo|media)/[A-Za-z0-9._/-]+)(["')])''', inline, html)
if missing: print('FEHLT:', sorted(missing)); sys.exit(1)

salt, iv = secrets.token_bytes(16), secrets.token_bytes(12)
key = hashlib.pbkdf2_hmac('sha256', password, salt, 250000, 32)
payload = base64.b64encode(AESGCM(key).encrypt(iv, html.encode('utf-8'), None)).decode()
gate = open(os.path.join(HERE, 'gate.html'), encoding='utf-8').read()
gate = gate.replace('{{SALT}}', base64.b64encode(salt).decode()).replace('{{IV}}', base64.b64encode(iv).decode()).replace('{{PAYLOAD}}', payload)
os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
open(out, 'w', encoding='utf-8').write(gate)
import shutil
for path in sorted(external):
    dst = os.path.join(os.path.dirname(os.path.abspath(out)), path); os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy(os.path.join(SITE, path), dst)
print('Videos daneben:', len(external), f'{sum(os.path.getsize(os.path.join(SITE, p)) for p in external) / 1e6:.1f} MB')
print(f'{out}: {len(gate) / 1e6:.1f} MB, {len(cache)} Dateien eingebettet, Klartext {len(html) / 1e6:.1f} MB')
