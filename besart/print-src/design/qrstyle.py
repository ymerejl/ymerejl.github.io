import segno, json, sys
def build(url, ring, hole, eye):
    q = segno.make(url, error='q', micro=False, boost_error=True)
    m = [list(r) for r in q.matrix]; n = len(m)
    fin = lambda r, c: (r < 7 and c < 7) or (r < 7 and c >= n - 7) or (r >= n - 7 and c < 7)
    d = []
    for r in range(n):
        c = 0
        while c < n:
            if m[r][c] and not fin(r, c):
                s = c
                while c < n and m[r][c] and not fin(r, c): c += 1
                d.append(f'M{s} {r}h{c-s}v1h-{c-s}z')
            else: c += 1
    def rr(x, y, w, h, a, ccw=False):
        if a <= 0:
            return f'M{x} {y}h{w}v{h}h-{w}z' if not ccw else f'M{x} {y}v{h}h{w}v-{h}z'
        if not ccw:
            return (f'M{x+a} {y}h{w-2*a}a{a} {a} 0 0 1 {a} {a}v{h-2*a}a{a} {a} 0 0 1 -{a} {a}'
                    f'h-{w-2*a}a{a} {a} 0 0 1 -{a} -{a}v-{h-2*a}a{a} {a} 0 0 1 {a} -{a}z')
        return (f'M{x+a} {y}a{a} {a} 0 0 0 -{a} {a}v{h-2*a}a{a} {a} 0 0 0 {a} {a}h{w-2*a}'
                f'a{a} {a} 0 0 0 {a} -{a}v-{h-2*a}a{a} {a} 0 0 0 -{a} -{a}z')
    for (x, y) in [(0, 0), (n - 7, 0), (0, n - 7)]:
        d.append(rr(x, y, 7, 7, ring) + rr(x + 1, y + 1, 5, 5, hole, True))
        d.append(rr(x + 2, y + 2, 3, 3, eye))
    return {'url': url, 'version': q.version, 'error': q.error, 'n': n, 'd': ''.join(d)}
if __name__ == '__main__':
    url = sys.argv[1]; ring, hole, eye = map(float, sys.argv[2:5])
    json.dump(build(url, ring, hole, eye), open(sys.argv[5], 'w'))
