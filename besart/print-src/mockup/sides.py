# Final side estimation per face: LSD line when strong, otherwise colour-step samples (robust fit);
# lines are intersected to corners.
import os
import cv2, numpy as np, json
from lsdfit import segments
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'szenen') + '/'

def side_frame(quad, i):
    quad = np.float32(quad); c = quad.mean(0)
    a, b = quad[i], quad[(i + 1) % 4]; L = np.linalg.norm(b - a); t = (b - a) / L
    n = np.array([-t[1], t[0]], np.float32)
    if np.dot(n, (a + b) / 2 - c) < 0: n = -n
    return a, b, L, t, n

def lsd_side(scene, quad, i, win=22, ang=4.0, minfrac=0.3, pick='inner'):
    a, b, L, t, n = side_frame(quad, i); cand = []
    for x1, y1, x2, y2 in segments(scene):
        p1, p2 = np.array([x1, y1]), np.array([x2, y2]); d = p2 - p1; l = np.linalg.norm(d)
        if l < 12 or abs(np.dot(d / l, t)) < np.cos(np.radians(ang)): continue
        o1, o2 = np.dot(p1 - a, n), np.dot(p2 - a, n)
        if max(abs(o1), abs(o2)) > win: continue
        s1, s2 = np.dot(p1 - a, t), np.dot(p2 - a, t)
        if max(s1, s2) < 0.02 * L or min(s1, s2) > 0.98 * L: continue
        cand.append(((o1 + o2) / 2, l, p1, p2))
    cand.sort(key=lambda z: z[0]); clusters = []
    for z in cand:
        if clusters and abs(z[0] - clusters[-1][-1][0]) < 1.6: clusters[-1].append(z)
        else: clusters.append([z])
    stats = [(np.average([z[0] for z in cl], weights=[z[1] for z in cl]), sum(z[1] for z in cl), cl) for cl in clusters]
    strong = [s for s in stats if s[1] > minfrac * L]
    if not strong: return None, [(round(float(s[0]), 1), round(float(s[1]))) for s in stats]
    ch = min(strong, key=lambda s: s[0]) if pick == 'inner' else (max(strong, key=lambda s: s[1]) if pick == 'long' else max(strong, key=lambda s: s[0]))
    P = np.float32([p for z in ch[2] for p in (z[2], z[3])])
    return cv2.fitLine(P, cv2.DIST_L2, 0, 0.01, 0.01).ravel(), [(round(float(s[0]), 1), round(float(s[1]))) for s in strong]

def step_side(img, quad, i, dark, win=10, band=3, samples=80):
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB).astype(np.float32)
    quad = np.float32(quad); c = quad.mean(0); inner = np.zeros(lab.shape[:2], np.uint8)
    cv2.fillPoly(inner, [np.int32((quad - c) * 0.85 + c)], 255); px = lab[inner > 0]
    fc = np.median(px[px[:, 0] < np.percentile(px[:, 0], 60)] if dark else px[px[:, 0] > np.percentile(px[:, 0], 40)], 0)
    F = cv2.GaussianBlur(np.sqrt((((lab - fc) ** 2) * np.array([1.0, 1.4, 1.4])).sum(2)).astype(np.float32), (0, 0), 0.7)
    a, b, L, t, n = side_frame(quad, i); pts = []
    offs = np.arange(-win, win + 1e-3, 0.25); k0 = int(band / 0.25)
    for s in np.linspace(0.08, 0.92, samples):
        p = a + (b - a) * s
        prof = np.array([cv2.getRectSubPix(F, (1, 1), (float(q[0]), float(q[1])))[0, 0] for q in [p + n * o for o in np.arange(-win - band, win + band + 1e-3, 0.25)]])
        best, bo = 0, None
        for j, o in enumerate(offs):
            ins = prof[j:j + k0].mean(); out = prof[j + k0 + 1:j + 2 * k0 + 1].mean()
            if ins < 16 and out - ins > best: best, bo = out - ins, o
        if bo is not None and best > 8: pts.append(p + n * bo)
    pts = np.float32(pts)
    if len(pts) < samples * 0.3: return None, len(pts)
    l = cv2.fitLine(pts, cv2.DIST_HUBER, 0, 0.01, 0.01).ravel()
    d = np.abs((pts[:, 0] - l[2]) * l[1] - (pts[:, 1] - l[3]) * l[0])
    keep = pts[d < max(0.8, np.percentile(d, 60))]
    return cv2.fitLine(keep, cv2.DIST_HUBER, 0, 0.01, 0.01).ravel(), (len(keep), round(float(np.median(d)), 2))

def line_of(quad, i):
    a, b, L, t, n = side_frame(quad, i); return np.array([t[0], t[1], a[0], a[1]], np.float32)

def corners_from_lines(lines):
    out = []
    for i in range(4):
        l1, l2 = lines[(i - 1) % 4], lines[i]
        A = np.array([[l1[0], -l2[0]], [l1[1], -l2[1]]]); B = np.array([l2[2] - l1[2], l2[3] - l1[3]])
        s = np.linalg.solve(A, B); out.append([l1[2] + l1[0] * s[0], l1[3] + l1[1] * s[0]])
    return np.float32(out)
