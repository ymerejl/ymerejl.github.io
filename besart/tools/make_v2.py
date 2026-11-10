# Baut Version 2 (helles Design wie der echte Salon) aus Version 1:
#   python3 besart/tools/make_v2.py   ->   besart/index-v2.html
# Gleiche Inhalte, Buchung, Gesprächsmodus und Präsentation wie V1. Neu: Elfenbein, Marmor und Gold wie im Salon,
# Bilderrahmen in der Form der goldenen Ovalregale, nur echte Fotos (Salon und Besart), keine generierten Personen.
import os, re
HERE = os.path.dirname(os.path.abspath(__file__)); SITE = os.path.dirname(HERE)
s = open(os.path.join(SITE, 'index.html'), encoding='utf-8').read()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:100]); s = s.replace(a, b)

# ---------- Version, Navigator
rep('<html lang="de-CH" data-version="1">', '<html lang="de-CH" data-version="2">')
rep('<meta name="theme-color" content="#0F0E0D">', '<meta name="theme-color" content="#F4EFE7">')
rep('Leistungen, Preise und Öffnungszeiten laut Salonkee · Bilder teils KI-generiert ·', 'Leistungen, Preise und Öffnungszeiten laut Salonkee · echte Fotos aus dem Salon ·')
rep("const VER = '1',", "const VER = '2',")

# ---------- dunkleres Gold für helle Flächen (Logo im Header)
rep('<linearGradient id="auG" ', '<linearGradient id="auGd" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="880" y2="353"><stop offset="0" stop-color="#6E521F"/><stop offset=".22" stop-color="#A07A34"/><stop offset=".42" stop-color="#C6A052"/><stop offset=".6" stop-color="#8B6A2B"/><stop offset=".8" stop-color="#B38D44"/><stop offset="1" stop-color="#76592A"/></linearGradient>\n  <linearGradient id="auG" ')

# ---------- Hero: Text links, Salonfoto im Rahmen der goldenen Ovalregale rechts; Buchung bekommt einen eigenen Abschnitt
i = s.index('  <!-- ============ HERO + BUCHUNG ============ -->'); j = s.index('  <!-- ============ LEISTUNGEN ============ -->')
booking = re.search(r'      <aside class="booking" id="termin".*?</aside>\n', s[i:j], re.S).group(0)
ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'
SLATS = ''.join(f'<line x1="{x}" y1="0" x2="{x + d}" y2="900"/>' for x, d in [(40, 30), (120, -20), (205, 45), (300, 0), (390, -35), (470, 25), (560, -10), (640, 40)])
hero = f'''  <!-- ============ HERO ============ -->
  <section class="hero hero2" id="hero" aria-labelledby="heroTitle">
    <div class="wrap hero2-inner">
      <div class="hero-copy">
        <p class="eyebrow">Hairsalon &amp; Barber in Horgen</p>
        <h1 class="h1" id="heroTitle" data-split>Haar mit <em>Art.</em></h1>
        <p class="lede">Ihr Coiffeur des Vertrauens in Horgen: Haarschnitte, Colorationen, Styling, Pflege und Barberservices – für Damen, Herren, Kinder und Pensionäre.</p>
        <div class="hero2-cta">
          <a class="btn btn-primary" href="#termin" data-book-cta>Termin buchen{ARROW}</a>
          <a class="btn btn-ghost" href="#leistungen">Leistungen &amp; Preise</a>
        </div>
        <div class="hero-meta">
          <a class="rating" href="#bewertungen"><b>4,9</b><span class="stars" data-stars="5"></span><span>67 Google-Bewertungen</span></a>
          <a class="status" id="heroStatus" href="#besuch"><span class="dot"></span><span class="txt"></span></a>
        </div>
      </div>
      <figure class="hero2-arch">
        <svg class="slats" viewBox="0 0 700 900" preserveAspectRatio="none" aria-hidden="true">{SLATS}</svg>
        <div class="arch"><div class="par" data-parallax="-0.05"><img src="img/v2-salon-bogen.webp" alt="Im Salon an der Neugasse: Barberstuhl mit BesArt-Gravur vor den goldenen Regalen" fetchpriority="high"></div></div>
        <figcaption><span>Neugasse 29</span><i></i><span>8810 Horgen</span></figcaption>
      </figure>
    </div>
    <a class="scroll-cue" href="#buchen" aria-label="Weiter nach unten"><span></span>Scrollen</a>
  </section>

  <!-- ============ ONLINE-TERMIN ============ -->
  <section class="sec book" id="buchen" aria-labelledby="bookTitle">
    <div class="wrap book-grid">
      <div class="book-copy">
        <p class="eyebrow" data-reveal>Online-Termin</p>
        <h2 class="h2" id="bookTitle" data-split>In drei Schritten <em>zum Termin.</em></h2>
        <p class="lede" data-reveal>Leistung wählen, freie Zeit wählen, Angaben eintragen. Lieber persönlich? Sie erreichen uns unter <a href="tel:+41447251404">044 725 14 04</a>.</p>
        <ol class="book-facts" data-reveal><li><b>01</b>Leistungen wählen, auch kombiniert</li><li><b>02</b>Freie Zeit wählen</li><li><b>03</b>Angaben eintragen und bestätigen</li></ol>
      </div>
{booking.replace('<aside class="booking" id="termin"', '<aside class="booking" id="termin" data-reveal')}    </div>
  </section>

  <div class="marquee" aria-hidden="true"><div class="mq-track">{''.join(f'<span>{w}<i>✦</i></span>' for w in ['Damen', 'Herren', 'Barber', 'Farbe', 'Pflege', 'Kinder', 'Pensionäre'] * 2)}</div></div>

'''
s = s[:i] + hero + s[j:]

# ---------- Leistungen: statt Bildern ein Preisblatt im Ovalrahmen (Kategorie, Anzahl, Ab-Preis)
rep('<figcaption><b id="svcCapTitle"></b><span id="svcCapText"></span></figcaption>',
    '<figcaption><span class="cap-k">Kategorie</span><b id="svcCapTitle"></b><span id="svcCapText"></span><small id="svcCapMeta"></small></figcaption>')
rep("$('#svcCapTitle').textContent = c.cap[0]; $('#svcCapText').textContent = c.cap[1];",
    "$('#svcCapTitle').textContent = c.cap[0]; $('#svcCapText').textContent = c.cap[1];\n"
    "    { const m = $('#svcCapMeta'); if (m) { const base = c.items.filter(x => !['d4', 'h3'].includes(x.id)), pool = base.length ? base : c.items, lo = Math.min(...pool.map(x => x.price)), ab = pool.length > 1 || pool.some(x => x.from); m.textContent = c.items.length + (c.items.length === 1 ? ' Leistung' : ' Leistungen') + ' · ' + (ab ? 'ab ' : '') + 'CHF ' + lo + '.–'; } }")
rep("  imgs.innerHTML = CATS.map(c => `<img src=\"${c.img}\" alt=\"${c.alt}\" data-cat=\"${c.id}\">`).join('');", "  imgs.innerHTML = '';")

# ---------- Über uns: echtes Foto im Bogen
rep('<div class="par" data-parallax="-0.07"><img class="zoom" src="img/besart-real.webp"', '<div class="par" data-parallax="-0.07"><img class="zoom" src="img/v2-besart.webp"')

# ---------- Panorama des echten Salons zwischen «Über uns» und den Stilen
rep('  <!-- ============ LOOKS ============ -->', '''  <section class="pano" aria-label="Der Salon">
    <div class="pano-img"><div class="par" data-parallax="0.08"><img src="img/salon-real.webp" alt="Blick in den Salon: drei Barberstühle, Marmorboden und goldene Regale"></div></div>
    <p class="wrap pano-cap"><span>Der Salon</span><span>Neugasse 29 · 8810 Horgen</span></p>
  </section>

  <!-- ============ LOOKS ============ -->''')

# ---------- Looks: Stil-Verzeichnis ohne Bilder, jeder Stil bucht die passende Leistung vor
rep('<p class="lede" data-reveal style="max-width:24rem">Vom Textured Crop bis zur Hochsteckfrisur: Suchen Sie sich etwas aus und bringen Sie es mit in den Stuhl.</p>',
    '<p class="lede" data-reveal style="max-width:24rem">Vom Textured Crop bis zum Chignon: Stil antippen, die passende Leistung liegt direkt in der Buchung.</p>')
i = s.index('  const LOOKS = ['); j = s.index('  /* ---------------- Bewertungen ---------------- */')
s = s[:i] + '''  const LOOKS = [
    ['Textured Crop', 'Herren', 'Kurz und strukturiert, mit Fransen nach vorn. Wenig Aufwand am Morgen.', 'h1'],
    ['Stumpfer Bob', 'Damen', 'Kinnlang und auf eine Linie geschnitten. Wirkt dicht und glänzend.', 'd1'],
    ['Skin Fade', 'Barber', 'Seiten bis auf die Haut, nahtlos nach oben verblendet. Mit Bart besonders sauber.', 'h1'],
    ['Kupfer-Glanz', 'Farbe', 'Warmes Kupfer, das im Licht leuchtet. Mit Intensivtönung für langen Glanz.', 'f6'],
    ['Curly Taper', 'Herren', 'Die Locken bleiben oben, die Konturen werden sanft kürzer.', 'h1'],
    ['Tiefer Chignon', 'Damen', 'Tief im Nacken gesteckter Knoten. Für Hochzeiten und Feste.', 'd3']
  ];
  $('#looksGrid').innerHTML = '<ol class="styles">' + LOOKS.map(([t, tag, d, pre], i) => `<li class="st-row" data-reveal style="--d:${i * 0.06}s"><span class="st-no">${String(i + 1).padStart(2, '0')}</span><span class="st-name">${t}<small>${tag}</small></span><span class="st-desc">${d}</span><button type="button" class="st-book" data-pre="${pre}">Termin<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button></li>`).join('') + '</ol>';
  $('#looksGrid').addEventListener('click', e => { const b = e.target.closest('[data-pre]'); if (b) preselect(b.dataset.pre); });

''' + s[j:]

# ---------- CSS Version 2
DARK = ('--bg:#0F0E0D;--bg-2:#151311;--bg-3:#1C1916;--ivory:#EDE6DA;--ivory-2:#BDB4A7;--ivory-3:#8A8277;--sand:#CDAE72;--gold:#D9BC7C;'
        '--gold-line:rgba(217,188,124,.38);--line:rgba(237,230,218,.1);--line-2:rgba(237,230,218,.22);--open:#86C39B;--closed:#D08A76;--err:#E58C78;'
        '--au:linear-gradient(118deg,#8A6A2F 0%,#C9A55C 18%,#F2E1A4 36%,#B8893E 52%,#E6CB86 70%,#F5E7B8 82%,#916E31 100%);color:var(--ivory)')
MARBLE = ("url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><filter id='m' x='0' y='0'>"
          "<feTurbulence type='fractalNoise' baseFrequency='.0022 .006' numOctaves='5' seed='11'/><feColorMatrix type='matrix' values='0 0 0 0 .6 0 0 0 0 .47 0 0 0 0 .26 1 0 0 0 0'/>"
          "<feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0 0 0 0 0 0 .55 0 0 0 0 0 0 0 0 0 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23m)'/></svg>\")")
CSS = f'''
/* =================== Version 2: Salon-Licht (Elfenbein, Marmor, Gold wie an der Neugasse) =================== */
.site-header,main{{--bg:#F4EFE7;--bg-2:#EEE7DC;--bg-3:#E6DDCF;--ivory:#1F1B17;--ivory-2:#4C453D;--ivory-3:#6B6357;--sand:#86652F;--gold:#9C7633;--gold-line:rgba(156,118,51,.42);--line:rgba(31,27,23,.11);--line-2:rgba(31,27,23,.24);--open:#3B8457;--closed:#B4573E;--err:#B4482E;--au:linear-gradient(118deg,#6E521F 0%,#A07A34 22%,#C6A052 40%,#8B6A2B 58%,#B38D44 76%,#76592A 100%);color:var(--ivory);color-scheme:light}}
body{{background:#F4EFE7}}
main{{background:var(--bg)}}
.site-header .lg-base{{fill:url(#auGd)}}
.site-header.is-scrolled{{background:rgba(244,239,231,.88);box-shadow:0 1px 0 var(--line)}}
.site-header .btn-primary:hover,main .btn-primary:hover{{background:#3A332C}}
.booking .btn-primary:hover{{background:#fff}}
.booking.flash{{animation:flash2 1.4s var(--ease)}}
@keyframes flash2{{0%{{box-shadow:0 0 0 0 rgba(156,118,51,.55),0 60px 100px -50px rgba(60,40,12,.6)}}100%{{box-shadow:0 0 0 22px rgba(156,118,51,0),0 60px 100px -50px rgba(60,40,12,.6)}}}}
.menu-row:hover{{background:rgba(31,27,23,.03)}}
.marble{{background-image:{MARBLE}}}

/* Hero */
.hero2{{position:relative;min-height:max(720px,100svh);padding:calc(118px + env(safe-area-inset-top,0px)) 0 84px;background:radial-gradient(80% 70% at 80% 38%,#FBF8F2 0%,rgba(251,248,242,0) 70%),var(--bg)}}
.hero2::before{{content:"";position:absolute;inset:0;z-index:-1;background-image:{MARBLE};background-size:cover;opacity:.42;pointer-events:none}}
.hero2-inner{{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);gap:clamp(40px,6vw,120px);align-items:center;width:100%}}
.hero2 .hero-copy{{gap:28px}}
.hero2 .lede{{max-width:34rem;color:var(--ivory-2)}}
.hero2-cta{{display:flex;flex-wrap:wrap;gap:12px;opacity:0;transform:translateY(20px);transition:opacity 1.1s var(--ease),transform 1.2s var(--ease)}}
.hero.ready .hero2-cta{{opacity:1;transform:none;transition-delay:.62s}}
.hero2 .hero-meta{{max-width:34rem}}
.hero2-arch{{position:relative;justify-self:center;width:min(100%,440px);margin:0}}
.hero2-arch .arch{{position:relative;aspect-ratio:10/14;border-radius:999px;overflow:hidden;background:var(--bg-3);box-shadow:0 70px 90px -60px rgba(80,56,18,.55),0 0 0 1px rgba(156,118,51,.18);clip-path:inset(100% 0 0 0 round 999px);transition:clip-path 1.8s var(--ease) .15s}}
.hero.ready .hero2-arch .arch{{clip-path:inset(0 0 0 0 round 999px)}}
.hero2-arch .par{{position:absolute;inset:-7% 0}}
.hero2-arch img{{width:100%;height:100%;object-fit:cover;object-position:62% 50%;transform:scale(1.08);transition:transform 2.6s var(--ease) .15s}}
.hero.ready .hero2-arch img{{transform:none}}
.hero2-arch::before{{content:"";position:absolute;inset:-18px;border-radius:999px;border:1px solid var(--gold-line);opacity:0;transform:scale(.97);transition:opacity 1.4s var(--ease) .9s,transform 1.6s var(--ease) .9s;pointer-events:none}}
.hero.ready .hero2-arch::before{{opacity:1;transform:none}}
.hero2-arch .slats{{position:absolute;left:-46%;top:-6%;width:192%;height:112%;z-index:-1;stroke:rgba(31,27,23,.09);stroke-width:1.2;fill:none;opacity:0;transition:opacity 1.6s var(--ease) 1s}}
.hero.ready .hero2-arch .slats{{opacity:1}}
.hero2-arch figcaption{{position:absolute;left:calc(100% + 34px);top:50%;display:flex;align-items:center;gap:14px;writing-mode:vertical-rl;transform:translateY(-50%);font-size:10.5px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--ivory-3);white-space:nowrap}}
.hero2-arch figcaption i{{width:1px;height:46px;background:var(--gold-line)}}
.hero2 .scroll-cue{{color:var(--ivory-3)}}
@media (max-width:1240px){{.hero2-arch figcaption{{display:none}}}}

/* Online-Termin: die Buchungskarte bleibt dunkel, wie ein ledergebundenes Terminbuch */
.book{{background:var(--bg-2)}}
.book-grid{{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,470px);gap:clamp(40px,7vw,120px);align-items:center}}
.book-copy{{display:flex;flex-direction:column;gap:26px;max-width:34rem}}
.book-copy .lede a{{color:var(--ivory);text-decoration:none;border-bottom:1px solid var(--gold-line)}}
.book-facts{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin:6px 0 0;padding:0;list-style:none;border-top:1px solid var(--line)}}
.book-facts li{{padding:18px 16px 0 0;font-size:13px;line-height:1.5;color:var(--ivory-3)}}
.book-facts b{{display:block;margin-bottom:6px;font:italic 400 26px/1 var(--serif);color:var(--gold)}}
.booking{{{DARK};background:#161311;box-shadow:0 60px 100px -50px rgba(60,40,12,.6),inset 0 0 0 1px rgba(217,188,124,.22)}}
.booking.in{{opacity:1;transform:none}}

/* Laufband */
.marquee{{{DARK};position:relative;overflow:hidden;padding:clamp(22px,3vw,40px) 0;background:#141110;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}}
.mq-track{{display:flex;width:max-content;animation:mq 46s linear infinite}}
.mq-track span{{display:flex;align-items:center;gap:clamp(22px,3vw,48px);padding-right:clamp(22px,3vw,48px);font:italic 400 clamp(38px,5.4vw,88px)/1 var(--serif);white-space:nowrap;color:transparent;-webkit-text-stroke:1px rgba(217,188,124,.55)}}
.mq-track span:nth-child(even){{-webkit-text-stroke:0;background:var(--au);background-size:200% 100%;-webkit-background-clip:text;background-clip:text}}
.mq-track i{{font-style:normal;font-size:.36em;color:var(--gold);-webkit-text-stroke:0}}
@keyframes mq{{to{{transform:translateX(-50%)}}}}

/* Leistungen: Preisblatt im Ovalrahmen */
.svc-frame{{aspect-ratio:3/4;border-radius:999px;background:radial-gradient(70% 60% at 50% 40%,#FBF8F2,rgba(251,248,242,0)),var(--bg-3);box-shadow:inset 0 0 0 1px var(--gold-line),0 50px 80px -60px rgba(80,56,18,.5);overflow:hidden}}
.svc-frame::before{{content:"";position:absolute;inset:0;background-image:{MARBLE};background-size:180% auto;background-position:30% 40%;opacity:.5}}
.svc-frame::after{{content:"";position:absolute;inset:16px;border-radius:999px;border:1px solid var(--line)}}
.svc-visual figcaption{{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;margin:0;padding:0 14%;text-align:center}}
.svc-visual figcaption .cap-k{{font-size:10.5px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--sand)}}
.svc-visual figcaption b{{font:italic 400 clamp(52px,5.4vw,84px)/1 var(--serif);color:var(--ivory)}}
.svc-visual figcaption span:not(.cap-k){{max-width:15rem;font-size:14px;line-height:1.5;color:var(--ivory-2)}}
.svc-visual figcaption small{{padding-top:16px;border-top:1px solid var(--gold-line);font-size:12px;letter-spacing:.08em;color:var(--gold)}}

/* Über uns */
.about-photo{{border-radius:999px 999px var(--r-md) var(--r-md);box-shadow:0 60px 90px -60px rgba(80,56,18,.55)}}
.about-photo img{{object-position:45% 22%}}
.photo-tag{{{DARK};background:linear-gradient(0deg,rgba(15,14,13,.82),rgba(15,14,13,0))}}

/* Panorama */
.pano{{position:relative;background:var(--bg)}}
.pano-img{{position:relative;height:clamp(300px,52vw,720px);overflow:hidden}}
.pano-img .par{{position:absolute;inset:-12% 0}}
.pano-img img{{width:100%;height:100%;object-fit:cover;object-position:50% 60%}}
.pano-cap{{display:flex;justify-content:space-between;gap:16px;padding-block:18px 0;font-size:11px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--ivory-3)}}

/* Stile */
#looksGrid{{display:block}}
.styles{{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}}
.st-row{{position:relative;display:grid;grid-template-columns:64px minmax(0,1.05fr) minmax(0,1.3fr) auto;align-items:center;gap:16px 40px;padding:30px 4px;border-bottom:1px solid var(--line)}}
.st-row::after{{content:"";position:absolute;left:0;bottom:-1px;width:0;height:1px;background:var(--gold);transition:width 1s var(--ease)}}
.st-row:hover::after{{width:100%}}
.st-no{{font:italic 400 22px/1 var(--serif);color:var(--sand)}}
.st-name{{font:500 clamp(30px,3.3vw,52px)/1.04 var(--serif);transition:transform .7s var(--ease)}}
.st-row:hover .st-name{{transform:translateX(10px)}}
.st-name small{{display:block;margin-top:10px;font:500 10.5px/1 var(--sans);letter-spacing:.24em;text-transform:uppercase;color:var(--sand)}}
.st-desc{{font-size:15px;line-height:1.6;color:var(--ivory-2);max-width:30rem}}
.st-book{{display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 18px 0 20px;border:0;border-radius:22px;background:none;box-shadow:inset 0 0 0 1px var(--line-2);color:var(--ivory);font:500 11.5px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;cursor:pointer;transition:background-color .35s,color .35s,box-shadow .35s}}
.st-book svg{{width:15px;height:15px;transition:transform .5s var(--ease)}}
.st-book:hover{{background:var(--ivory);color:var(--bg);box-shadow:none}}
.st-book:hover svg{{transform:translateX(4px)}}

/* Bewertungen und Karte auf hell */
.rev-card{{background:#FBF8F3;box-shadow:inset 0 0 0 1px var(--line),0 30px 50px -40px rgba(80,56,18,.35)}}
.map-card{{background:#FBF8F3}}
.map-lake{{fill:rgba(156,118,51,.05);stroke:rgba(31,27,23,.38)}}
.map-grid line{{stroke:rgba(31,27,23,.05)}}
.map-lake-label{{fill:rgba(31,27,23,.38)}}
.map-ferry{{stroke:rgba(31,27,23,.3)}}

@media (max-width:980px){{
  .hero2{{min-height:0;padding-top:calc(108px + env(safe-area-inset-top,0px));padding-bottom:64px}}
  .hero2-inner{{grid-template-columns:minmax(0,1fr)}}
  .hero2-inner{{gap:34px}}
  .hero2-arch{{order:-1;width:min(64vw,340px);margin-top:6px}}
  .hero2 .hero-copy{{gap:22px}}
  .hero2-arch figcaption{{left:auto;right:calc(100% + 18px)}}
  .book-grid{{grid-template-columns:minmax(0,1fr)}}
  .booking{{max-width:560px}}
  .st-row{{grid-template-columns:44px minmax(0,1fr) auto;grid-template-areas:"no name book" "no desc desc";gap:8px 16px;padding:24px 2px}}
  .st-no{{grid-area:no;align-self:start;padding-top:8px}}
  .st-name{{grid-area:name}}
  .st-desc{{grid-area:desc;font-size:14px}}
  .st-book{{grid-area:book}}
}}
@media (max-width:640px){{
  .book-facts{{grid-template-columns:minmax(0,1fr)}}
  .book-facts li{{display:flex;gap:14px;align-items:baseline;padding:12px 0 0}}
  .book-facts b{{margin:0}}
  .hero2-arch figcaption{{display:none}}
  .hero2-arch{{width:min(56vw,236px)}}
  .hero2-arch::before{{inset:-11px}}
  .st-book{{width:44px;padding:0;justify-content:center;font-size:0;gap:0}}
  .pano-cap{{flex-direction:column;gap:6px}}
}}
@media (prefers-reduced-motion:reduce){{.mq-track{{animation:none}}.hero2-arch .arch{{clip-path:none;transition:none}}}}
'''
k = s.rindex('</style>', 0, s.index('</head>'))   # ans Ende des Haupt-Stylesheets, damit V2 gewinnt
s = s[:k] + CSS + s[k:]
open(os.path.join(SITE, 'index-v2.html'), 'w', encoding='utf-8').write(s)
print('ok', len(s))
