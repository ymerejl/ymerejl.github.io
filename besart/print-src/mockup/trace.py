import cv2, numpy as np, json, sys
from sides import side_frame, RAW
def trace(scene, quad, i, dark, s0=0.02, s1=0.98, N=25, win=15, verbose=True):
    im = cv2.imread(RAW + scene); L = cv2.GaussianBlur(cv2.cvtColor(im, cv2.COLOR_BGR2LAB)[:, :, 0].astype(np.float32), (0, 0), 0.6)
    a, b, Ln, t, n = side_frame(quad, i); res = []
    for s in np.linspace(s0, s1, N):
        p = a + (b - a) * s; offs = np.arange(-win, win + 1e-3, 0.25)
        v = np.array([cv2.getRectSubPix(L, (1, 1), tuple(map(float, p + n * o)))[0, 0] for o in offs])
        face = np.median(v[:12]); out = np.median(v[-12:]); mid = (face + out) / 2
        cond = (v[:-1] < mid) & (v[1:] >= mid) if dark else (v[:-1] > mid) & (v[1:] <= mid)
        idx = np.where(cond)[0]
        o = None
        if len(idx) and abs(face - out) > 30:
            j = idx[0]; f = (mid - v[j]) / (v[j + 1] - v[j]); o = offs[j] + f * 0.25
        res.append((round(float(s), 3), None if o is None else round(float(o), 2), round(float(face)), round(float(out))))
    if verbose: print(' '.join(f"{s:.2f}:{o}" for s, o, f, u in res))
    return res
if __name__ == '__main__':
    rows = [json.loads(l) for l in open(sys.argv[1])]
    k, i = int(sys.argv[2]), int(sys.argv[3])
    r = rows[k]; trace(r['scene'], np.float32(r[sys.argv[4]]), i, 'vorderseite' in r['design'])
