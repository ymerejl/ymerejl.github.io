# Renders für den Bewertungsaufsteller: Mockups (exaktes 3D-Modell in KI-Szenen montiert) und 360°-Ansicht.
#   python3 make.py            alles
#   python3 make.py mockups    nur die Szenen
#   python3 make.py 360        nur den Drehteller
# Voraussetzung: stand.py (STL), design/export.js (Kartenmotiv), `npm install` in diesem Ordner (three.js).
import sys, os, json, subprocess, shutil, numpy as np, cv2
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, '..', 'out')
os.makedirs(OUT, exist_ok=True)

# Kamera je Szene mit camfit.py auf die Sockelkanten der KI-Vorlage eingemessen (Fehler ~2–5 px), Licht passend zur Szene
SCENES = {
    'theke': dict(plate='theke.png',
                  cam=dict(az=-22.05, el=13.56, d=721.3, tz=0, ty=29, sx=-8.5, sy=-400.6, fov=20),
                  light=dict(key=2.8, kx=-420, ky=-220, kz=470, env=0.85, exp=1.08, shadow=0.55),
                  comp=dict(shadow=0.9, refl=0.2, refl_len=150, grade=[1.05, 1.0, 0.92])),
    'kasse': dict(plate='kasse.png',
                  cam=dict(az=-19.063, el=12.03, d=827.34, tz=0, ty=29, sx=-13.4, sy=-338.7, fov=20),
                  light=dict(key=2.2, kx=-200, ky=-300, kz=800, env=0.7, exp=0.93, shadow=0.6),
                  comp=dict(shadow=0.9, shadow_blur=3.5, refl=0.32, refl_len=170, refl_blur=3, grade=[1.1, 1.0, 0.85])),
}
TURN = dict(frames=36, az=-30, el=13, bg='ece6db', w=960, h=960, dpr=1, d=500, tz=78, ty=22, shadow=0.3, sm=1536)

def shoot(views):
    subprocess.run(['node', os.path.join(HERE, 'shoot.js'), json.dumps(views)], check=True, cwd=HERE, stdout=subprocess.DEVNULL)

lin = lambda x: np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)
srgb = lambda x: np.where(x <= 0.0031308, x * 12.92, 1.055 * np.clip(x, 0, 1) ** (1 / 2.4) - 0.055)

def mockup(name, sc):
    """Aufsteller + Schatten + Spiegelung getrennt rendern und im linearen Licht in die leere Szene setzen."""
    P = np.asarray(Image.open(os.path.join(HERE, '..', 'szenen', sc['plate'])).convert('RGB')).astype(np.float32) / 255
    h, w = P.shape[:2]
    base = dict(sc['cam'], **sc['light'], w=w, h=h, dpr=1, sm=4096, bg='none')
    f = {k: os.path.join(OUT, f'_{name}-{k}.png') for k in ('stand', 'shadow', 'refl')}
    shoot([dict(base, out=f['stand'], **{'pass': 'stand'}), dict(base, out=f['shadow'], **{'pass': 'shadow'}),
           dict(base, out=f['refl'], mirror=1, **{'pass': 'stand'})])
    o = sc['comp']
    S = np.asarray(Image.open(f['stand']).convert('RGBA')).astype(np.float32) / 255
    Sh = np.asarray(Image.open(f['shadow']).convert('RGBA')).astype(np.float32) / 255
    Pl = lin(P)
    # Schatten: Szene im linearen Licht abdunkeln, leicht warm (Streulicht)
    sa = cv2.GaussianBlur(Sh[..., 3], (0, 0), o.get('shadow_blur', 1.2)) * o.get('shadow', 0.85)
    tint = np.array(o.get('shadow_tint', [0.93, 0.9, 0.86]))
    Pl = Pl * (1 - sa[..., None] * (1 - tint * 0.35))
    # Spiegelung in der glänzenden Theke: gespiegeltes Render, nach unten ausgeblendet und weichgezeichnet
    if o.get('refl', 0) > 0:
        R = np.asarray(Image.open(f['refl']).convert('RGBA')).astype(np.float32) / 255
        ra, rc = R[..., 3], lin(R[..., :3])
        ys = np.nonzero(S[..., 3].max(1) > 0.5)[0]; ybase = ys.max() if len(ys) else 0
        fade = np.clip(1 - (np.arange(ra.shape[0]) - ybase) / o.get('refl_len', 160.0), 0, 1)[:, None] ** 1.5
        ra = cv2.GaussianBlur(ra * fade, (0, 0), o.get('refl_blur', 2.5)) * o['refl']
        rc = cv2.GaussianBlur(rc, (0, 0), o.get('refl_blur', 2.5))
        Pl = Pl * (1 - ra[..., None]) + rc * ra[..., None]
    # Aufsteller: an die Farbstimmung der Szene angleichen, minimal weicher, mit passendem Korn
    a = cv2.GaussianBlur(S[..., 3], (0, 0), 0.5)[..., None]
    col = cv2.GaussianBlur(lin(S[..., :3]) * np.array(o.get('grade', [1.04, 1.0, 0.93])) * o.get('gain', 1.0), (0, 0), o.get('soft', 0.55))
    res = srgb(Pl * (1 - a) + col * a)
    g = cv2.GaussianBlur(np.random.default_rng(3).standard_normal(res.shape[:2]).astype(np.float32), (0, 0), 0.7)
    res = res + (g / (g.std() + 1e-6))[..., None] * o.get('grain', 0.010) * a
    out = os.path.join(OUT, f'mockup-aufsteller-{name}.png')
    Image.fromarray((np.clip(res, 0, 1) * 255 + 0.5).astype(np.uint8)).save(out)
    for p in f.values(): os.remove(p)
    print('mockup', out)

def turntable():
    """36 Ansichten rundherum (10°-Schritte), als 6 × 6-Raster für den 360°-Betrachter."""
    tmp = os.path.join(OUT, '_turn'); shutil.rmtree(tmp, ignore_errors=True)
    shoot([dict(TURN, out=tmp)])
    frames = [Image.open(os.path.join(tmp, f'f{i:02d}.png')).convert('RGB') for i in range(TURN['frames'])]
    frames[0].save(os.path.join(OUT, 'aufsteller-ansicht.png'))
    for name, px in (('aufsteller-360.png', 640), ('aufsteller-360-klein.png', 480)):
        sheet = Image.new('RGB', (px * 6, px * 6))
        for i, im in enumerate(frames): sheet.paste(im.resize((px, px), Image.LANCZOS), ((i % 6) * px, (i // 6) * px))
        sheet.save(os.path.join(OUT, name)); print('360', name, sheet.size)
    shutil.rmtree(tmp)

if __name__ == '__main__':
    what = sys.argv[1] if len(sys.argv) > 1 else 'all'
    if what in ('all', 'mockups'):
        for n, sc in SCENES.items(): mockup(n, sc)
    if what in ('all', '360'): turntable()
