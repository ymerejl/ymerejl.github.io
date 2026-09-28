# Fit camera (az, el, distance, lens shift, fov) so the model's base corners land on measured image points.
import numpy as np, json, sys
from scipy.optimize import least_squares
W, H = 2048, 1360
def project(P, az, el, d, sx, sy, fov, target=(0, 29, 0)):
    t = np.array(target, float); a, e = np.radians(az), np.radians(el)
    C = t + d * np.array([np.sin(a) * np.cos(e), -np.cos(a) * np.cos(e), np.sin(e)])
    f = (t - C); f /= np.linalg.norm(f); up = np.array([0, 0, 1.0])
    r = np.cross(f, up); r /= np.linalg.norm(r); u = np.cross(r, f)
    X = (np.asarray(P, float) - C)
    xc, yc, zc = X @ r, X @ u, X @ f
    fpx = (H / 2) / np.tan(np.radians(fov) / 2)
    return np.stack([W / 2 + fpx * xc / zc - sx, H / 2 - fpx * yc / zc - sy], 1)
def fit(model_pts, img_pts, weights, x0, fix_fov=None):
    img = np.asarray(img_pts, float); w = np.asarray(weights, float)[:, None]
    def res(p):
        az, el, d, sx, sy, fov = p if fix_fov is None else (*p, fix_fov)
        return ((project(model_pts, az, el, d, sx, sy, fov) - img) * w).ravel()
    r = least_squares(res, x0 if fix_fov is None else x0[:5])
    p = list(r.x) + ([] if fix_fov is None else [fix_fov])
    err = np.linalg.norm((project(model_pts, *p) - img), axis=1)
    return p, err
if __name__ == '__main__':
    cfg = json.loads(sys.argv[1])
    p, err = fit(cfg['model'], cfg['img'], cfg['w'], cfg['x0'], cfg.get('fov'))
    print(json.dumps({'az': round(p[0], 3), 'el': round(p[1], 3), 'd': round(p[2], 2), 'sx': round(p[3], 1), 'sy': round(p[4], 1), 'fov': round(p[5], 3)}), 'err px', np.round(err, 1).tolist())
