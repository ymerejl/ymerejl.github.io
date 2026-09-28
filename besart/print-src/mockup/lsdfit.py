# Side fitting from long straight line segments (LSD): for each side of a rough quad, collect segments that are
# parallel and close, cluster them by offset, take the innermost strong cluster (face edge, not the card's
# thickness or shadow), fit a line, intersect neighbouring sides.
import os
import cv2, numpy as np, json, sys
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'szenen') + '/'
_cache = {}
def segments(scene):
    if scene not in _cache:
        g = cv2.cvtColor(cv2.imread(RAW + scene), cv2.COLOR_BGR2GRAY)
        lsd = cv2.createLineSegmentDetector(cv2.LSD_REFINE_ADV)
        segs = lsd.detect(g)[0].reshape(-1, 4)
        _cache[scene] = segs
    return _cache[scene]
def fit(scene, quad, win=35, ang=4.0, minfrac=0.18, pick='inner', verbose=False):
    segs = segments(scene); quad = np.float32(quad); c = quad.mean(0)
    lines = []; info = []
    for i in range(4):
        a, b = quad[i], quad[(i + 1) % 4]; L = np.linalg.norm(b - a)
        t = (b - a) / L; n = np.array([-t[1], t[0]], np.float32)
        if np.dot(n, (a + b) / 2 - c) < 0: n = -n
        cand = []
        for x1, y1, x2, y2 in segs:
            p1, p2 = np.array([x1, y1]), np.array([x2, y2]); d = p2 - p1; l = np.linalg.norm(d)
            if l < 12: continue
            cosang = abs(np.dot(d / l, t))
            if cosang < np.cos(np.radians(ang)): continue
            o1, o2 = np.dot(p1 - a, n), np.dot(p2 - a, n)
            if max(abs(o1), abs(o2)) > win: continue
            s1, s2 = np.dot(p1 - a, t), np.dot(p2 - a, t)
            if max(s1, s2) < 0.02 * L or min(s1, s2) > 0.98 * L: continue
            cand.append(((o1 + o2) / 2, l, p1, p2))
        if not cand: lines.append(None); info.append((i, 'none')); continue
        cand.sort(key=lambda z: z[0])
        clusters = []
        for z in cand:
            if clusters and abs(z[0] - clusters[-1][-1][0]) < 1.6: clusters[-1].append(z)
            else: clusters.append([z])
        stats = [(np.average([z[0] for z in cl], weights=[z[1] for z in cl]), sum(z[1] for z in cl), cl) for cl in clusters]
        strong = [s for s in stats if s[1] > minfrac * L]
        if not strong: lines.append(None); info.append((i, 'weak', [(round(s[0], 1), round(s[1])) for s in stats][:6])); continue
        chosen = min(strong, key=lambda s: s[0]) if pick == 'inner' else max(strong, key=lambda s: s[1])
        P = np.float32([p for z in chosen[2] for p in (z[2], z[3])])
        l = cv2.fitLine(P, cv2.DIST_L2, 0, 0.01, 0.01).ravel()
        lines.append(l); info.append((i, round(chosen[0], 1), round(chosen[1]), [(round(s[0], 1), round(s[1])) for s in strong]))
    out = quad.copy()
    for i in range(4):
        l1, l2 = lines[(i - 1) % 4], lines[i]
        if l1 is None or l2 is None: continue
        A = np.array([[l1[0], -l2[0]], [l1[1], -l2[1]]]); B = np.array([l2[2] - l1[2], l2[3] - l1[3]])
        s = np.linalg.solve(A, B); out[i] = [l1[2] + l1[0] * s[0], l1[3] + l1[1] * s[0]]
    return out, info
