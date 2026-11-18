"""Generate Oveliqt logo SVGs (public/brand) and the inline React logo (src/app/svgs/oveliqt-logo.tsx).
Usage: python scripts/create-brand-logo.py   (needs: pip install fonttools brotli)
Wordmark is outlined from Plus Jakarta Sans at wght 700; the O and the 6-arm asterisk are drawn as geometry."""
import math, os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "public/assets/cloned/fonts/a31c8a1f33bf.woff2")
OUT = os.path.join(ROOT, "public/brand")
os.makedirs(OUT, exist_ok=True)
RED, INK, CREAM, NIGHT = "#EF3E35", "#262A2D", "#F4E8D8", "#07090C"

font = instantiateVariableFont(TTFont(FONT), {"wght": 700})
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
CAP = font["OS/2"].sCapHeight or 700

def word_path(text, tracking=30):
    """Outline `text` with y flipped so the baseline sits at y=CAP; returns (d, width)."""
    pen, x = SVGPathPen(gs), 0
    for i, ch in enumerate(text):
        name = cmap[ord(ch)]
        gs[name].draw(TransformPen(pen, (1, 0, 0, -1, x, CAP)))
        x += hmtx[name][0] + (tracking if i < len(text) - 1 else 0)
    bp = BoundsPen(gs); x2 = 0
    for ch in text:
        gs[cmap[ord(ch)]].draw(TransformPen(bp, (1, 0, 0, 1, x2, 0))); x2 += hmtx[cmap[ord(ch)]][0] + tracking
    xmin, _, xmax, _ = bp.bounds
    return pen.getCommands(), xmin, xmax - tracking * 0

def asterisk(cx, cy, r, arm, color):
    """Six rounded arms, chunky enough to survive favicon sizes."""
    arms = "".join(
        f'<rect x="{cx - arm / 2:.2f}" y="{cy - r:.2f}" width="{arm:.2f}" height="{2 * r:.2f}" rx="{arm * .18:.2f}" transform="rotate({a} {cx:.2f} {cy:.2f})"/>'
        for a in (0, 60, 120))
    return f'<g fill="{color}">{arms}</g>'

def ring(cx, cy, r, stroke, color):
    return f'<circle cx="{cx}" cy="{cy}" r="{r - stroke / 2}" fill="none" stroke="{color}" stroke-width="{stroke}"/>'

# Symbol geometry, in cap-height units so it sits with the wordmark: O = cap height tall.
R, STROKE = CAP / 2, CAP * .25
def symbol(x, y, ink, red):
    """O whose top sits at y; asterisk at its top right, overlapping the corner slightly."""
    cx, cy = x + R, y + R
    ar = R * .42
    return ring(cx, cy, R, STROKE, ink) + asterisk(cx + R * .92, cy - R * .88, ar, ar * .5, red)

def svg(w, h, body, title, bg=None):
    rect = f'<rect width="100%" height="100%" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{rect}{body}</svg>\n')

def write(name, text):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as fh: fh.write(text)

word, wx0, wx1 = word_path("OVELIQT")
ww = wx1
pad = CAP * .12
sym_w = R * 2 + R * .92 + R * .42  # ring + asterisk overhang
sym_top = R * .88 + R * .42 - R  # how far the asterisk rises above the O

# 1. Symbol (transparent)
sw, sh = sym_w + pad * 2, CAP + max(sym_top, 0) + pad * 2
write("oveliqt-symbol.svg", svg(sw, sh, symbol(pad, pad + max(sym_top, 0), INK, RED), "Oveliqt"))

# 2. Wordmark with one red asterisk
star_r = CAP * .2
wm_w = ww + CAP * .08 + star_r * 2 + pad * 2
wm_h = CAP + pad * 2 + star_r * .2
def wordmark(x, y, ink):
    return (f'<path transform="translate({x - wx0:.2f} {y:.2f})" fill="{ink}" d="{word}"/>'
            + asterisk(x + ww - wx0 + CAP * .08 + star_r, y + star_r * 1.05, star_r, star_r * .52, RED))
write("oveliqt-wordmark.svg", svg(wm_w, wm_h, wordmark(pad, pad + star_r * .2, INK), "Oveliqt"))

# 3. Horizontal lockup: symbol + plain wordmark (no second asterisk)
gap = CAP * .3
lk_h = CAP + max(sym_top, 0) + pad * 2
top = pad + max(sym_top, 0)
def lockup(ink, red):
    return symbol(pad, top, ink, red) + f'<path transform="translate({pad + sym_w + gap - wx0:.2f} {top:.2f})" fill="{ink}" d="{word}"/>'
lk_w = pad + sym_w + gap + ww - wx0 + pad
write("oveliqt-logo.svg", svg(lk_w, lk_h, lockup(INK, RED), "Oveliqt"))
write("oveliqt-logo-reversed.svg", svg(lk_w, lk_h, lockup(CREAM, RED), "Oveliqt"))

# 4. App icon / favicon: asterisk inside the O (exploration #1), cream on charcoal rounded square.
S = 512
icon = (f'<rect width="{S}" height="{S}" rx="{S * .22}" fill="{INK}"/>'
        + ring(S / 2, S / 2, S * .34, S * .105, CREAM)
        + asterisk(S / 2, S / 2, S * .135, S * .075, RED))
write("oveliqt-icon.svg", svg(S, S, icon, "Oveliqt"))

print("cap", CAP, "word width", round(ww), "files", sorted(os.listdir(OUT)))

# 5. Inline React component: ink follows currentColor, asterisk stays red.
import re
def jsx_parts(name):
    s = open(os.path.join(OUT, name), encoding="utf-8").read()
    vb = re.search(r'viewBox="([^"]+)"', s).group(1)
    body = re.search(r"</title>(.*)</svg>", s, re.S).group(1)
    return vb, body.replace(f'"{INK}"', '"currentColor"').replace("stroke-width", "strokeWidth")
(lv, lb), (wv, wb), (sv2, sb) = (jsx_parts(n) for n in ("oveliqt-logo.svg", "oveliqt-wordmark.svg", "oveliqt-symbol.svg"))
tsx = f'''/**
 * Oveliqt logo — GENERATED by scripts/create-brand-logo.py; edit that script, not these paths.
 * Ink uses currentColor so it follows the surrounding text colour; the asterisk stays brand red.
 */
type OveliqtLogoProps = {{ variant?: "lockup" | "wordmark" | "symbol"; className?: string; title?: string }};

const art = {{
  lockup: {{ viewBox: "{lv}", body: <>{lb}</> }},
  wordmark: {{ viewBox: "{wv}", body: <>{wb}</> }},
  symbol: {{ viewBox: "{sv2}", body: <>{sb}</> }},
}} as const;

export default function OveliqtLogo({{ variant = "lockup", className, title }}: OveliqtLogoProps) {{
  const {{ viewBox, body }} = art[variant];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={{viewBox}} className={{className}} role={{title ? "img" : undefined}} aria-label={{title}} aria-hidden={{title ? undefined : true}} focusable="false">
      {{body}}
    </svg>
  );
}}
'''
with open(os.path.join(ROOT, "src/app/svgs/oveliqt-logo.tsx"), "w", encoding="utf-8") as fh: fh.write(tsx)
print("wrote src/app/svgs/oveliqt-logo.tsx")
