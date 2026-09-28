import os
import cv2, numpy as np, json, sys
from sides import side_frame
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'szenen') + '/'
def profile(scene, quad, i, lo=-14, hi=8, s0=0.15, s1=0.85):
    im = cv2.imread(RAW + scene); L = cv2.cvtColor(im, cv2.COLOR_BGR2LAB)[:, :, 0].astype(np.float32)
    a, b, Ln, t, n = side_frame(quad, i)
    offs = np.arange(lo, hi + 1e-3, 0.5); prof = []
    for o in offs:
        v = [cv2.getRectSubPix(L, (1, 1), tuple(map(float, a + (b - a) * s + n * o)))[0, 0] for s in np.linspace(s0, s1, 60)]
        prof.append(np.median(v))
    return offs, np.array(prof)
if __name__ == '__main__':
    rows = [json.loads(l) for l in open('final.jsonl')]
    k, i = int(sys.argv[1]), int(sys.argv[2])
    offs, p = profile(rows[k]['scene'], rows[k]['final'], i)
    print(' '.join(f'{o:+.1f}:{v:.0f}' for o, v in zip(offs, p)))
