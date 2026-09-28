# BesArt Google-Bewertungsaufsteller für den 3D-Drucker (Masse in mm).
# Karte A6 (105 × 148) wird oben in einen Schlitz geschoben; vorne ein U-Rahmen (seitlich 5 mm, unten 8 mm Überdeckung),
# hinten eine Mulde Ø 26 × 0.9 mm für einen NFC-Sticker (NTAG213/215, Ø 25 mm) genau hinter dem QR-Code.
# Druck: stehend, ohne Stützmaterial; PLA matt schwarz, 0.2 mm Schicht, 3 Wände, 15 % Infill.
import numpy as np, trimesh, os, json
from trimesh.transformations import rotation_matrix
H_DIR = os.path.dirname(os.path.abspath(__file__))
W = 115.0          # Aussenbreite (Rahmen seitlich 10 mm sichtbar)
H = 156.0          # Höhe der Platte (Karte ragt oben 6 mm heraus – zum Greifen)
T_FRONT, T_SLOT, T_BACK = 2.4, 1.3, 2.6
D = T_FRONT + T_SLOT + T_BACK
SLOT_W, SLOT_Z0 = 107.0, 14.0      # Schlitzbreite (Karte 105 + Spiel), Kartenauflage
WIN_W, WIN_Z0 = 95.0, 22.0         # Fenster: seitlich 5 mm, unten 8 mm Überdeckung
NFC_R, NFC_DEPTH = 13.0, 0.9
NFC_Z = SLOT_Z0 + (148 - (74 + 22))  # Kartenunterkante + Abstand QR-Mitte vom unteren Kartenrand
TILT = 12.0
BASE_Y0, BASE_Y1, BASE_T = -6.0, 64.0, 7.0

def box(x0, x1, y0, y1, z0, z1):
    b = trimesh.creation.box(extents=[x1 - x0, y1 - y0, z1 - z0])
    b.apply_translation([(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2]); return b

def rounded_slab(x0, x1, y0, y1, z0, z1, r):
    import shapely.geometry as sg
    poly = sg.box(x0 + r, y0 + r, x1 - r, y1 - r).buffer(r, resolution=16)
    m = trimesh.creation.extrude_polygon(poly, z1 - z0); m.apply_translation([0, 0, z0]); return m

# Platte (vorne y=0, hinten y=D), aufrecht; obere Ecken gerundet
def plate_outline(r=6.0):
    import shapely.geometry as sg
    core = sg.box(-W / 2, 0, W / 2, H - r).union(sg.box(-W / 2 + r, 0, W / 2 - r, H))
    for cx in (-W / 2 + r, W / 2 - r): core = core.union(sg.Point(cx, H - r).buffer(r, resolution=24))
    m = trimesh.creation.extrude_polygon(core, D)                       # Profil in (x, z), Tiefe entlang y
    m.apply_transform(rotation_matrix(np.pi / 2, [1, 0, 0])); m.apply_translation([0, D, 0])
    return m
plate = plate_outline()
slot = box(-SLOT_W / 2, SLOT_W / 2, T_FRONT, T_FRONT + T_SLOT, SLOT_Z0, H + 5)
window = box(-WIN_W / 2, WIN_W / 2, -1, T_FRONT + 0.05, WIN_Z0, H + 5)
nfc = trimesh.creation.cylinder(radius=NFC_R, height=NFC_DEPTH + 1, sections=96)
nfc.apply_transform(rotation_matrix(np.pi / 2, [1, 0, 0])); nfc.apply_translation([0, D - NFC_DEPTH / 2 + 0.5, NFC_Z])
for cut in (slot, window, nfc):          # nacheinander abziehen (überlappende Schnittkörper nicht zusammenfassen)
    plate = plate.difference(cut, engine='manifold')
# nach hinten neigen (Drehpunkt: vordere Unterkante)
plate.apply_transform(rotation_matrix(np.radians(-TILT), [1, 0, 0], point=[0, 0, 0]))
plate.apply_translation([0, 0, 3.0])        # 3 mm in den Sockel eingelassen
# Sockel mit gerundeten Ecken und Keil hinter der Platte
base = rounded_slab(-W / 2, W / 2, BASE_Y0, BASE_Y1, 0, BASE_T, 5.0)
tan, cos = np.tan(np.radians(TILT)), np.cos(np.radians(TILT))
yb = lambda z: D / cos + (z - 3.0) * tan - 0.4          # Rückseite der geneigten Platte
wedge_prof = [(yb(BASE_T - 0.5), BASE_T - 0.5), (yb(44), 44), (40.0, BASE_T - 0.5)]
import shapely.geometry as sg
wedge = trimesh.creation.extrude_polygon(sg.Polygon(wedge_prof), W - 0.02)
wedge.apply_transform(rotation_matrix(np.pi / 2, [0, 1, 0])); wedge.apply_transform(rotation_matrix(np.pi / 2, [1, 0, 0]))
# Profil liegt nach den Drehungen in der y-z-Ebene; in x zentrieren
wb = wedge.bounds; wedge.apply_translation([-(wb[0][0] + wb[1][0]) / 2, 0, 0])
stand = trimesh.boolean.union([plate, base, wedge], engine='manifold')
stand = stand.intersection(box(-W, W, -50, 200, 0, 300), engine='manifold')
stand.merge_vertices(); stand.fix_normals()
stl = os.path.join(H_DIR, 'besart-bewertungsaufsteller.stl'); stand.export(stl)
stand.export(os.path.join(H_DIR, 'besart-bewertungsaufsteller.3mf'))
# Lage der Platte (und damit der Karte) für den Renderer: erst 3 mm anheben, dann neigen – wie oben
card_T = rotation_matrix(np.radians(-TILT), [1, 0, 0], point=[0, 0, 0]) @ trimesh.transformations.translation_matrix([0, 0, 3.0])
json.dump(card_T.tolist(), open(os.path.join(H_DIR, 'render', 'card_T.json'), 'w'))
vol = stand.volume / 1000
print('watertight', stand.is_watertight, 'bounds', np.round(stand.bounds, 1).tolist(), 'volume cm3', round(vol, 1),
      'mass solid g', round(vol * 1.24, 1), 'faces', len(stand.faces), 'NFC z (plate coords)', NFC_Z)
