"""Draw diesel-clause formula cards, then stamp the ZAFTYS footer logo.

Exports at 2x (3072 x 2048) so the type stays sharp in the blog column.
The stamp sits in the bottom-right, so captions stay left of that zone.
Re-running overwrites the PNGs and stamps once.
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
BLUE = (30, 77, 140, 255)
TRACK = (226, 232, 240, 255)
FONT = Path("C:/Windows/Fonts/segoeuib.ttf")


def px(n: int) -> int:
    return n * S


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT), size * S)


def new_canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGBA", (W, H), BG)
    return img, ImageDraw.Draw(img)


def text_width(draw: ImageDraw.ImageDraw, text: str, fnt) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def center_text(draw, text, y, fnt, fill=NAVY, width=W):
    x = (width - text_width(draw, text, fnt)) // 2
    draw.text((x, y), text, font=fnt, fill=fill)


def formula_card(title: str, formula: str, tiles: list[tuple[str, str]], result: list[str], footer: str, name: str) -> None:
    img, draw = new_canvas()
    title_f = font(54)
    formula_f = font(36)
    head_f = font(26)
    body_f = font(28)
    result_f = font(32)
    foot_f = font(26)

    center_text(draw, title, px(36), title_f)
    draw.line((px(620), px(118), px(916), px(118)), fill=TEAL, width=px(8))

    draw.rounded_rectangle((px(64), px(148), W - px(64), px(292)), radius=px(22), fill=NAVY)
    fw = text_width(draw, formula, formula_f)
    draw.text(((W - fw) // 2, px(188)), formula, font=formula_f, fill=WHITE)

    gap = px(20)
    left = px(64)
    usable = W - px(128)
    tw = (usable - gap * (len(tiles) - 1)) // len(tiles)
    top = px(324)
    tile_h = px(280)
    for i, (head, body) in enumerate(tiles):
        x0 = left + i * (tw + gap)
        draw.rounded_rectangle((x0, top, x0 + tw, top + tile_h), radius=px(18), fill=TEAL, outline=NAVY, width=px(4))
        draw.rounded_rectangle((x0 + px(4), top + px(68), x0 + tw - px(4), top + tile_h - px(4)), radius=px(14), fill=WHITE)
        hw = text_width(draw, head, head_f)
        draw.text((x0 + (tw - hw) // 2, top + px(16)), head, font=head_f, fill=WHITE)
        draw.multiline_text((x0 + px(24), top + px(96)), body, font=body_f, fill=NAVY, spacing=px(8))

    ry = px(636)
    rh = px(250)
    draw.rounded_rectangle((px(64), ry, W - px(64), ry + rh), radius=px(18), fill=NAVY)
    y = ry + px(36)
    for line in result:
        draw.text((px(96), y), line, font=result_f, fill=WHITE)
        y += px(58)
    # Keep the caption left of the stamped logo.
    draw.text((px(64), px(920)), footer, font=foot_f, fill=NAVY)
    save_and_stamp(img, name)


def bars_card() -> None:
    img, draw = new_canvas()
    title_f = font(48)
    sub_f = font(26)
    label_f = font(28)
    val_f = font(28)
    foot_f = font(26)
    center_text(draw, "Same diesel, four freight bills", px(36), title_f)
    center_text(draw, "Workshop trip. Rs 48 per km. 800 km. Delhi diesel plus Rs 4.53.", px(110), sub_f)
    draw.line((px(560), px(168), px(976), px(168)), fill=TEAL, width=px(8))

    rows = [
        ("AITWA 0.65 per rupee", 1131, NAVY),
        ("Lane share S = 0.46", 883, TEAL),
        ("Shipper factor 0.45", 783, BLUE),
        ("20% of the diesel change", 384, AMBER),
        ("No clause", 0, NAVY),
    ]
    max_v = 1131
    y = px(200)
    row_h = px(130)
    label_x = px(72)
    bar_left = px(560)
    bar_max = px(560)
    for label, value, color in rows:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(108)), radius=px(16), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((label_x, y + px(32)), label, font=label_f, fill=NAVY)
        track_y0 = y + px(36)
        track_y1 = y + px(72)
        draw.rounded_rectangle((bar_left, track_y0, bar_left + bar_max, track_y1), radius=px(8), fill=TRACK)
        bw = 0 if value == 0 else max(px(18), int(bar_max * value / max_v))
        if bw:
            draw.rounded_rectangle((bar_left, track_y0, bar_left + bw, track_y1), radius=px(8), fill=color)
        value_text = f"Rs {value:,}"
        draw.text((bar_left + bar_max + px(20), y + px(30)), value_text, font=val_f, fill=NAVY)
        y += row_h
    draw.text((px(64), px(920)), "The gap is the negotiation, not a rounding error.", font=foot_f, fill=NAVY)
    save_and_stamp(img, "diesel-four-bills.png")


def flow_card() -> None:
    """Two rows of three. Tall one-row columns left the type stranded and the arrows on the headers."""
    img, draw = new_canvas()
    title_f = font(44)
    num_f = font(32)
    head_f = font(28)
    body_f = font(26)
    foot_f = font(26)
    title = "From the diesel print to a bill both sides can sign"
    center_text(draw, title, px(28), title_f)
    draw.line((px(520), px(100), px(1016), px(100)), fill=TEAL, width=px(8))

    steps = [
        ("1", "Read the city table", "Named diesel source,\non the review date."),
        ("2", "Subtract the base", "Keep the sign.\nA fall is a credit."),
        ("3", "Run one formula", "The number written\nin the contract."),
        ("4", "Check the dead-band", "Adjust only the move\nbeyond Rs 2 / litre."),
        ("5", "Multiply base freight", "Base x (1 + uplift / 100).\nNothing else."),
        ("6", "Attach the print", "No print, no uplift."),
    ]
    cols = 3
    gap_x = px(28)
    gap_y = px(24)
    left = px(48)
    top0 = px(150)
    usable = W - left * 2
    tw = (usable - gap_x * (cols - 1)) // cols
    th = px(250)
    for i, (num, head, body) in enumerate(steps):
        col = i % cols
        row = i // cols
        x0 = left + col * (tw + gap_x)
        y0 = top0 + row * (th + gap_y)
        draw.rounded_rectangle((x0, y0, x0 + tw, y0 + th), radius=px(20), fill=NAVY)
        draw.rounded_rectangle(
            (x0 + px(4), y0 + px(88), x0 + tw - px(4), y0 + th - px(4)),
            radius=px(16),
            fill=WHITE,
        )
        nw = text_width(draw, num, num_f)
        draw.text((x0 + px(28), y0 + px(22)), num, font=num_f, fill=WHITE)
        draw.text((x0 + px(28) + nw + px(16), y0 + px(24)), head, font=head_f, fill=WHITE)
        draw.multiline_text((x0 + px(28), y0 + px(112)), body, font=body_f, fill=NAVY, spacing=px(8))
    draw.text((px(48), px(820)), "Toll, detention, and empty kilometres stay off this line.", font=foot_f, fill=NAVY)
    save_and_stamp(img, "diesel-clause-flow.png")


def save_and_stamp(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG")
    logo = Image.open(LOGO).convert("RGBA")
    stamp(path, logo, max_width=max(140, int(img.width * 0.075)))


def main() -> None:
    formula_card(
        "Diesel rupee-step clause",
        "Uplift %  =  0.65  x  (D now  -  D base)",
        [
            ("D base", "Delhi diesel\n15 May 2026\nRs 90.67 / litre"),
            ("D now", "Delhi diesel\n8 Oct 2026\nRs 95.20 / litre"),
            ("Move", "Plus Rs 4.53\nper litre"),
            ("Factor", "0.65 points of\nfreight per rupee"),
        ],
        [
            "0.65 x 4.53 = 2.94 percent.",
            "Rs 48 per km becomes about Rs 49.41.",
            "Extra on 800 km is about Rs 1,131.",
        ],
        "Workshop rate. AITWA ask, not a statute.",
        "diesel-formula-rupee-step.png",
    )
    formula_card(
        "Diesel share-of-cost clause",
        "Uplift %  =  S x ((D now - D base) / D base) x 100",
        [
            ("S = 0.46", "Rs 22 diesel/km\ndivided by\nRs 48 freight/km"),
            ("D base", "Rs 90.67\n15 May 2026"),
            ("D now", "Rs 95.20\n8 Oct 2026"),
            ("Change", "4.53 / 90.67\n= 4.996 percent"),
        ],
        [
            "0.46 x 4.996 percent = 2.30 percent.",
            "Extra on 800 km is about Rs 883.",
        ],
        "One formula only. Do not also apply the 0.65 card.",
        "diesel-formula-share.png",
    )
    formula_card(
        "Twenty percent of the diesel change",
        "Uplift %  =  0.20 x ((D now - D base) / D base) x 100",
        [
            ("Pass-through", "20 percent of\nthe diesel\npercent change"),
            ("D base", "Rs 90.67\n15 May 2026"),
            ("D now", "Rs 95.20\n8 Oct 2026"),
            ("Change", "4.996 percent"),
        ],
        [
            "0.20 x 4.996 percent = 1.00 percent.",
            "Extra on 800 km is about Rs 384.",
        ],
        "Public buyer sample. Up and down. One named city.",
        "diesel-formula-passthrough.png",
    )
    bars_card()
    flow_card()
    print("done")


if __name__ == "__main__":
    main()
