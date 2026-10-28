"""Draw chemical-transport boards, then stamp the logo once.

Canvas is 3072 x 2048. Re-running redraws from scratch before the stamp.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "blog"

_spec = importlib.util.spec_from_file_location(
    "stamp_blog_logo", ROOT / "scripts" / "stamp-blog-logo.py"
)
_mod = importlib.util.module_from_spec(_spec)
assert _spec and _spec.loader
_spec.loader.exec_module(_mod)
stamp = _mod.stamp
LOGO = _mod.LOGO

S = 2
W, H = 1536 * S, 1024 * S
BG = (255, 255, 255, 255)
NAVY = (11, 28, 54, 255)
TEAL = (11, 127, 138, 255)
WHITE = (255, 255, 255, 255)
AMBER = (180, 83, 9, 255)
TRACK = (226, 232, 240, 255)
FONT = Path("C:/Windows/Fonts/segoeuib.ttf")


def px(n: int) -> int:
    return n * S


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT), size * S)


def new_canvas():
    img = Image.new("RGBA", (W, H), BG)
    return img, ImageDraw.Draw(img)


def text_width(draw, text, fnt) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def center_text(draw, text, y, fnt, fill=NAVY, width=W):
    x = (width - text_width(draw, text, fnt)) // 2
    draw.text((x, y), text, font=fnt, fill=fill)


def save_and_stamp(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG")
    logo = Image.open(LOGO).convert("RGBA")
    stamp(path, logo, max_width=max(140, int(img.width * 0.075)))


def ullage_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "How much vapour space the heat needs", px(24), font(44))
    draw.line((px(430), px(92), px(1106), px(92)), fill=TEAL, width=px(8))
    center_text(draw, "Methanol workshop. Confirm beta on the MSDS.", px(108), font(26))
    bar = "V ullage  =  V shell  x  beta  x  (T peak  -  T load)"
    draw.rounded_rectangle((px(48), px(168), W - px(48), px(280)), radius=px(18), fill=NAVY)
    fnt = font(30)
    draw.text(((W - text_width(draw, bar, fnt)) // 2, px(196)), bar, font=fnt, fill=WHITE)

    rows = [
        ("Shell", "20,000 litres"),
        ("Beta", "0.00149 per degree C"),
        ("Temperatures", "25 C load, 48 C peak"),
        ("Rise", "23 degrees"),
        ("Expansion", "685 litres, about 3.4%"),
    ]
    y = px(320)
    for label, value in rows:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(88)), radius=px(14), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((px(72), y + px(24)), label, font=font(32), fill=NAVY)
        vf = font(32)
        draw.text((W - px(72) - text_width(draw, value, vf), y + px(24)), value, font=vf, fill=TEAL)
        y += px(100)
    draw.text(
        (px(48), px(860)),
        "685 litres = 20,000 x 0.00149 x 23. The approved drawing wins if it keeps more space.",
        font=font(24),
        fill=NAVY,
    )
    save_and_stamp(img, "hazchem-formula-ullage.png")


def fit_font(draw, text: str, target_h: int) -> ImageFont.FreeTypeFont:
    lo, hi = 8, 420
    best = font(20)
    while lo <= hi:
        mid = (lo + hi) // 2
        candidate = font(mid)
        box = draw.textbbox((0, 0), text, font=candidate)
        if box[3] - box[1] <= target_h:
            best = candidate
            lo = mid + 1
        else:
            hi = mid - 1
    return best


def panel_card() -> None:
    """Rule 134 sizes at one scale: 2 logical pixels per millimetre.

    The 100 mm figure is the UN class number (the digit). The class label
    is the 260 mm square. The four-digit UN number is not that 100 mm line.
    """
    img, draw = new_canvas()
    center_text(draw, "The class label is the large mark", px(18), font(44))
    draw.line((px(430), px(84), px(1106), px(84)), fill=TEAL, width=px(8))
    center_text(draw, "CMVR rule 134. One scale. Both sides and the rear.", px(98), font(24))

    def mm(n: int) -> int:
        return px(n * 2)

    sq = mm(260)
    x0, y0 = px(36), px(150)
    draw.rounded_rectangle((x0, y0, x0 + sq, y0 + sq), radius=px(8), outline=NAVY, width=px(8), fill=WHITE)
    cx, cy = x0 + sq // 2, y0 + sq // 2
    inset = mm(36)
    diamond = [
        (cx, y0 + inset),
        (x0 + sq - inset, cy),
        (cx, y0 + sq - inset),
        (x0 + inset, cy),
    ]
    draw.line(diamond + [diamond[0]], fill=NAVY, width=px(8))
    mark = "3"
    mark_f = fit_font(draw, mark, mm(36))
    box = draw.textbbox((0, 0), mark, font=mark_f)
    draw.text((cx - (box[2] - box[0]) // 2, cy - (box[3] - box[1]) // 2 - box[1]), mark, font=mark_f, fill=NAVY)
    draw.text((x0, y0 + sq + px(14)), "Class label. 260 mm square.", font=font(26), fill=TEAL)

    samples = [
        (100, "3", "UN class number. 100 mm. The digit, not UN 1230."),
        (50, "NAME", "Technical name. 50 mm high."),
        (50, "PHONE", "Emergency telephone. 50 mm. The consignor line matches it."),
    ]
    y = px(150)
    for mm_h, sample, note in samples:
        h = mm(mm_h)
        sample_f = fit_font(draw, sample, int(h * 0.78))
        box = draw.textbbox((0, 0), sample, font=sample_f)
        tw, th = box[2] - box[0], box[3] - box[1]
        x = px(620)
        band_w = min(tw + px(48), W - px(48) - x)
        draw.rounded_rectangle((x, y, x + band_w, y + h), radius=px(8), fill=NAVY)
        draw.text((x + (band_w - tw) // 2 - box[0], y + (h - th) // 2 - box[1]), sample, font=sample_f, fill=WHITE)
        draw.text((x, y + h + px(8)), note, font=font(22), fill=NAVY)
        y += h + px(48)

    draw.text(
        (px(36), px(860)),
        "A 250 mm label is short of this rule. The four-digit UN number is not the 100 mm line.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "hazchem-panel-eip.png")


def mass_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "What 685 litres of vapour does to the load", px(24), font(42))
    draw.line((px(400), px(92), px(1136), px(92)), fill=TEAL, width=px(8))
    center_text(draw, "Methanol workshop. Confirm density on the MSDS.", px(108), font(26))
    bar = "Mass  =  (V shell  -  V ullage)  x  density"
    draw.rounded_rectangle((px(48), px(168), W - px(48), px(280)), radius=px(18), fill=NAVY)
    fnt = font(30)
    draw.text(((W - text_width(draw, bar, fnt)) // 2, px(196)), bar, font=fnt, fill=WHITE)
    rows = [
        ("Ullage already worked", "685 litres"),
        ("Volume left to fill", "19,315 litres"),
        ("Density at 25 C", "0.7866 kg per litre"),
        ("Load mass", "15,193 kg"),
        ("Against a 97% fill", "About 67 kg less product"),
    ]
    y = px(320)
    for label, value in rows:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(88)), radius=px(14), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((px(72), y + px(24)), label, font=font(30), fill=NAVY)
        vf = font(30)
        draw.text((W - px(72) - text_width(draw, value, vf), y + px(24)), value, font=vf, fill=TEAL)
        y += px(100)
    draw.text(
        (px(48), px(860)),
        "15,193 kg = 19,315 x 0.7866. The 97% line is Petroleum Rules rule 64, not a methanol fill.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "hazchem-formula-mass.png")


def slosh_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "A part load moves in the curve", px(24), font(44))
    draw.line((px(470), px(92), px(1066), px(92)), fill=TEAL, width=px(8))
    center_text(draw, "Free surface. No speed certificate on this board.", px(108), font(26))

    # Tank shell.
    x0, y0, x1, y1 = px(180), px(220), px(1356), px(720)
    draw.rounded_rectangle((x0, y0, x1, y1), radius=px(80), outline=NAVY, width=px(8), fill=(241, 245, 249, 255))
    # Liquid shifted to the right, about two thirds high on the outside.
    liquid = [
        (x0 + px(40), y1 - px(40)),
        (x0 + px(40), y1 - px(180)),
        (x1 - px(40), y0 + px(80)),
        (x1 - px(40), y1 - px(40)),
    ]
    draw.polygon(liquid, fill=(11, 127, 138, 180))
    draw.text((x0 + px(80), y0 + px(40)), "Vapour", font=font(28), fill=NAVY)
    draw.text((x1 - px(280), y1 - px(160)), "Liquid", font=font(28), fill=WHITE)

    notes = [
        ("Brimful", "Little free surface"),
        ("Part load", "Liquid climbs the outside"),
        ("Near empty", "Less mass, still a surface"),
    ]
    y = px(760)
    gap = px(24)
    tw = (W - px(96) - gap * 2) // 3
    for i, (head, body) in enumerate(notes):
        x = px(48) + i * (tw + gap)
        draw.rounded_rectangle((x, y, x + tw, y + px(140)), radius=px(14), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((x + px(20), y + px(22)), head, font=font(28), fill=TEAL)
        draw.text((x + px(20), y + px(70)), body, font=font(24), fill=NAVY)
    save_and_stamp(img, "hazchem-slosh.png")


def main() -> None:
    ullage_card()
    mass_card()
    panel_card()
    slosh_card()
    print("hazchem boards written")


if __name__ == "__main__":
    main()
