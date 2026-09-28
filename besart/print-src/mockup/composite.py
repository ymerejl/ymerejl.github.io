# Photoreal mockup composite: the exact print design replaces the AI-rendered face.
#  geometry  : homography from the measured face quad + smooth boundary correction (TPS on traced edge
#              residuals) so curved paper edges are followed exactly; supersampled for clean anti-aliasing
#  photometry: scene lighting transferred in linear light (paper: spatial gain; black stock: global gain +
#              spatial black level), matched grain and softness; a 1 px AI rim band is kept at the edges
import os
import cv2, numpy as np, json, sys
from scipy.interpolate import RBFInterpolator
from trace import trace
from sides import side_frame
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'szenen') + '/'
FIN = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'design', 'final') + '/'
SS = 3

def srgb2lin(x): return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)
def lin2srgb(x): x = np.clip(x, 0, 1); return np.where(x <= 0.0031308, x * 12.92, 1.055 * x ** (1 / 2.4) - 0.055)
def lum(x): return x[..., 0] * 0.2126 + x[..., 1] * 0.7152 + x[..., 2] * 0.0722
def nblur(v, m, s):
    m = m.astype(np.float32)
    if v.ndim == 3:
        num = cv2.GaussianBlur(v * m[..., None], (0, 0), s); den = cv2.GaussianBlur(m, (0, 0), s)[..., None]
    else:
        num = cv2.GaussianBlur(v * m, (0, 0), s); den = cv2.GaussianBlur(m, (0, 0), s)
    return num / np.maximum(den, 1e-4), den

def boundary_residuals(scene, quad, dark, skip, sranges):
    """robust polynomial fit of traced edge offsets per side -> list of (side, s-array, offset-array)"""
    out = []
    for i in range(4):
        if i in skip: continue
        s0, s1 = sranges.get(i, (0.02, 0.98))
        tr = trace(scene, quad, i, dark, s0, s1, N=48, win=12, verbose=False)
        s = np.array([a for a, o, f, u in tr if o is not None]); o = np.array([o for a, o, f, u in tr if o is not None])
        if len(s) < 10: continue
        keep = np.ones(len(s), bool)
        for it in range(4):
            c = np.polyfit(s[keep], o[keep], 3); r = o - np.polyval(c, s)
            keep = np.abs(r) < max(1.2, 2.5 * np.std(r[keep]))
        ss = np.linspace(max(s0, s[keep].min()), min(s1, s[keep].max()), 24)
        out.append((i, ss, np.polyval(c, ss), float(np.std(r[keep]))))
    return out

def face_geometry(scene, quad, Wd, Hd, dark, skip=(), sranges={}):
    quad = np.float32(quad)
    H = cv2.getPerspectiveTransform(np.float32([[0, 0], [Wd, 0], [Wd, Hd], [0, Hd]]), quad)
    Hi = np.linalg.inv(H)
    res = boundary_residuals(scene, quad, dark, skip, sranges)
    P, V = [], []
    for i, ss, oo, sd in res:
        a, b, L, t, n = side_frame(quad, i)
        for s, o in zip(ss, oo):
            d = [(s * Wd, 0), (Wd, s * Hd), ((1 - s) * Wd, Hd), (0, (1 - s) * Hd)][i]
            P.append(d); V.append(n * o)
    # zero-residual anchors in the middle keep the interior perspective-true
    for u in (0.35, 0.65):
        for v in (0.35, 0.65): P.append((u * Wd, v * Hd)); V.append((0, 0))
    P = np.float32(P) / [Wd, Hd]; V = np.float32(V)
    rbf = RBFInterpolator(P, V, kernel='thin_plate_spline', smoothing=1e-3)
    g = 65; gu, gv = np.meshgrid(np.linspace(0, 1, g), np.linspace(0, 1, g))
    D = rbf(np.stack([gu.ravel(), gv.ravel()], 1)).reshape(g, g, 2).astype(np.float32)
    return H, Hi, D, res

def warp(scene_shape, H, Hi, D, design, bbox):
    x0, y0, x1, y1 = bbox; Wd, Hd = design.shape[1], design.shape[0]
    xs = x0 + (np.arange((x1 - x0) * SS) + 0.5) / SS; ys = y0 + (np.arange((y1 - y0) * SS) + 0.5) / SS
    X, Y = np.meshgrid(xs.astype(np.float32), ys.astype(np.float32))
    def hinv(x, y):
        w = Hi[2, 0] * x + Hi[2, 1] * y + Hi[2, 2]
        return (Hi[0, 0] * x + Hi[0, 1] * y + Hi[0, 2]) / w, (Hi[1, 0] * x + Hi[1, 1] * y + Hi[1, 2]) / w
    u, v = hinv(X, Y); g = D.shape[0]
    for it in range(3):
        gx = np.clip(u / Wd * (g - 1), 0, g - 1).astype(np.float32); gy = np.clip(v / Hd * (g - 1), 0, g - 1).astype(np.float32)
        dx = cv2.remap(D[..., 0], gx, gy, cv2.INTER_LINEAR); dy = cv2.remap(D[..., 1], gx, gy, cv2.INTER_LINEAR)
        u, v = hinv(X - dx, Y - dy)
    img = cv2.remap(design, u.astype(np.float32), v.astype(np.float32), cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    cov = ((u >= 0) & (u <= Wd) & (v >= 0) & (v <= Hd)).astype(np.float32)
    h, w = y1 - y0, x1 - x0
    return cv2.resize(img, (w, h), interpolation=cv2.INTER_AREA), cv2.resize(cov, (w, h), interpolation=cv2.INTER_AREA)

def composite_face(S, scene, quad, design_name, exclude=None, skip=(), sranges={}, rim=1.0, seed=1, log=None):
    dark = 'vorderseite' in design_name
    des = cv2.imread(FIN + design_name + '.png').astype(np.float32) / 255
    Hs, Ws = S.shape[:2]
    q = np.float32(quad)
    # pre-scale the design so one supersample step is ~1 design pixel (no aliasing, no wasted detail)
    side = max(np.linalg.norm(q[1] - q[0]), np.linalg.norm(q[2] - q[1]))
    scale = min(1.0, side * SS * 1.1 / max(des.shape[:2]))
    des = cv2.resize(des, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA) if scale < 1 else des
    Wd, Hd = des.shape[1], des.shape[0]
    H, Hi, D, res = face_geometry(scene, q, Wd, Hd, dark, skip, sranges)
    x0, y0 = np.floor(q.min(0) - 12).astype(int); x1, y1 = np.ceil(q.max(0) + 12).astype(int)
    x0, y0 = max(0, x0), max(0, y0); x1, y1 = min(Ws, x1), min(Hs, y1)
    Dw, cov = warp(S.shape, H, Hi, D, des, (x0, y0, x1, y1))
    Dw = cv2.GaussianBlur(Dw, (0, 0), 0.45)
    reg = S[y0:y1, x0:x1]; Sl = srgb2lin(reg); Dl = srgb2lin(Dw)
    ex = np.zeros(cov.shape, bool) if exclude is None else exclude[y0:y1, x0:x1]
    inner = cv2.erode((cov > 0.99).astype(np.uint8), np.ones((7, 7), np.uint8)).astype(bool) & ~ex
    Ls, Ld = lum(Sl), lum(Dl)
    if not dark:
        P = np.median(Dl[inner & (Ld > 0.5)], 0)
        dpaper = cv2.erode((Ld > 0.55 * lum(P)).astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
        med = np.median(Ls[inner]); apaper = Ls > 0.82 * med
        Mp = inner & dpaper & apaper
        G, _ = nblur(Sl / np.maximum(Dl, 1e-4), Mp, 10)
        G = np.clip(G, 0.2, 2.5)
        out = G * (Dl + 0.022 * P) / 1.022
        info = dict(kind='paper', paper_px=int(Mp.sum()), G_med=np.median(G[inner], 0).round(3).tolist())
        flat = Mp
    else:
        dd = cv2.erode((Ld < 0.02).astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
        Md = inner & dd & (Ls < np.percentile(Ls[inner], 70))
        dl = (Ld > 0.45)
        Ml = inner & dl & (Ls > np.percentile(Ls[inner], 90))
        if Ml.sum() < 200:
            Ml = inner & (Ls > np.percentile(Ls[inner], 98)); ref_light = np.median(Dl[inner & dl], 0)
        else:
            ref_light = np.median(Dl[Ml], 0)
        A_d, A_l = np.median(Sl[Md], 0), np.median(Sl[Ml], 0); ref_dark = np.median(Dl[Md], 0)
        Gs = np.clip((A_l - A_d) / np.maximum(ref_light - ref_dark, 1e-3), 0.3, 2.0)
        F, _ = nblur(Sl - Gs * Dl, Md, 30)
        F = np.clip(F, 0, 0.2)
        out = Gs * Dl + F
        info = dict(kind='black', dark_px=int(Md.sum()), light_px=int(Ml.sum()), G=Gs.round(3).tolist(), F_med=np.median(F[inner], 0).round(4).tolist())
        flat = Md
    # paper texture: take the AI render's own fine structure (fibres, felt) from areas without printed
    # content and fill the content areas with texture copied from nearby clean areas
    Sg = lum(reg)
    hp = Sg - cv2.GaussianBlur(Sg, (0, 0), 3.5)
    ker = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31))
    base = cv2.GaussianBlur(cv2.dilate(Sg, ker) if not dark else cv2.erode(Sg, ker), (0, 0), 6)
    content = (Sg < base - 0.09) if not dark else (Sg > base + 0.09)
    content = cv2.dilate(content.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13) if not dark else (25, 25))).astype(bool)
    valid = inner & ~content
    T = np.where(valid, hp, 0).astype(np.float32); have = valid.copy()
    rng = np.random.default_rng(seed)
    need = inner & ~have
    for it in range(60):
        if not need.any(): break
        dx, dy = rng.integers(-70, 71, 2)
        sh_T = np.roll(np.roll(T, dy, 0), dx, 1); sh_v = np.roll(np.roll(have & valid, dy, 0), dx, 1)
        fill = need & sh_v
        T[fill] = sh_T[fill]; have |= fill; need &= ~fill
    T = np.clip(T, -0.06, 0.06)
    info['tex_std'] = round(float(np.std(hp[valid])) * 255, 2) if valid.any() else None
    res_srgb = lin2srgb(out).astype(np.float32)
    if not dark:
        k = 0.4 + 0.6 * np.clip(lum(res_srgb) / max(float(np.median(lum(res_srgb)[inner])), 1e-3), 0, 1)
    else:
        k = np.ones(T.shape, np.float32)
    res_srgb = np.clip(res_srgb + (T * k)[..., None], 0, 1)
    # alpha: keep a thin band of the AI's own edge (rim light / anti-aliasing) and feather
    a = cov.copy()
    if rim > 0:
        a = cv2.erode(a, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)), iterations=int(round(rim)))
        a = cv2.GaussianBlur(a, (0, 0), 0.6)
    a = np.clip(a, 0, 1)[..., None]
    if exclude is not None: a = a * (~ex)[..., None]
    S[y0:y1, x0:x1] = reg * (1 - a) + res_srgb * a
    full = np.zeros((Hs, Ws), bool); full[y0:y1, x0:x1] = cov > 0.5
    info['edges'] = [(i, round(sd, 2)) for i, ss, oo, sd in res]
    if log is not None: log.append((design_name, info))
    return full

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__))); os.makedirs('out', exist_ok=True)
    cfg = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'jobs.json'))
    rows = {(r['scene'], r['design']): r for r in map(json.loads, open('refined.jsonl'))}
    for job in cfg:
        S = cv2.imread(RAW + job['scene']).astype(np.float32) / 255
        log = []; masks = {}
        # faces listed bottom-to-top; each face excludes the faces lying on top of it
        tops = {}
        for f in job['faces']:
            r = rows[(job['scene'], f['design'])]
            tops[f['design']] = r['refined']
        for idx, f in enumerate(job['faces']):
            ex = np.zeros(S.shape[:2], bool)
            for g in job['faces'][idx + 1:]:
                m = np.zeros(S.shape[:2], np.uint8); cv2.fillPoly(m, [np.int32(np.round(np.array(tops[g['design']]) * 8))], 1, cv2.LINE_8, 3); ex |= m.astype(bool)
            ex = cv2.dilate(ex.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) if ex.any() else None
            composite_face(S, job['scene'], tops[f['design']], f['design'], exclude=ex, skip=tuple(f.get('skip', [])), sranges={int(k): v for k, v in f.get('sranges', {}).items()}, log=log)
        cv2.imwrite(job['out'], np.clip(S * 255 + 0.5, 0, 255).astype(np.uint8))
        print(job['out']); [print('  ', d, i) for d, i in log]
