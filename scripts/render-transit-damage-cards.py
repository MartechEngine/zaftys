"""Draw transit-damage formula cards, then stamp the ZAFTYS footer logo.

Exports at 2x (3072 x 2048). Re-running overwrites PNGs and stamps once.
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


def save_and_stamp(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG")
    logo = Image.open(LOGO).convert("RGBA")
    stamp(path, logo, max_width=max(140, int(img.width * 0.075)))


def formula_card(
    title: str,
    formula: str,
    tiles: list[tuple[str, str]],
    result: list[str],
    footer: str,
    name: str,
) -> None:
    img, draw = new_canvas()
    title_f = font(48)
    formula_f = font(32)
    head_f = font(26)
    body_f = font(26)
    result_f = font(30)
    foot_f = font(24)

    center_text(draw, title, px(36), title_f)
    draw.line((px(560), px(112), px(976), px(112)), fill=TEAL, width=px(8))

    draw.rounded_rectangle((px(64), px(140), W - px(64), px(280)), radius=px(22), fill=NAVY)
    fw = text_width(draw, formula, formula_f)
    draw.text(((W - fw) // 2, px(180)), formula, font=formula_f, fill=WHITE)

    gap = px(20)
    left = px(64)
    usable = W - px(128)
    tw = (usable - gap * (len(tiles) - 1)) // len(tiles)
    top = px(312)
    tile_h = px(280)
    for i, (head, body) in enumerate(tiles):
        x0 = left + i * (tw + gap)
        draw.rounded_rectangle(
            (x0, top, x0 + tw, top + tile_h), radius=px(18), fill=TEAL, outline=NAVY, width=px(4)
        )
        draw.rounded_rectangle(
            (x0 + px(4), top + px(68), x0 + tw - px(4), top + tile_h - px(4)),
            radius=px(14),
            fill=WHITE,
        )
        hw = text_width(draw, head, head_f)
        draw.text((x0 + (tw - hw) // 2, top + px(16)), head, font=head_f, fill=WHITE)
        draw.multiline_text(
            (x0 + px(20), top + px(92)), body, font=body_f, fill=NAVY, spacing=px(8)
        )

    ry = px(620)
    rh = px(240)
    draw.rounded_rectangle((px(64), ry, W - px(64), ry + rh), radius=px(18), fill=NAVY)
    y = ry + px(36)
    for line in result:
        draw.text((px(96), y), line, font=result_f, fill=WHITE)
        y += px(52)
    draw.text((px(64), px(920)), footer, font=foot_f, fill=NAVY)
    save_and_stamp(img, name)


def main() -> None:
    formula_card(
        "Rule 12 ten-times-freight trap",
        "Max liability  =  min(10 x freight, market value)",
        [
            ("Cargo", "CNC machine\ninvoice value\nRs 42,00,000"),
            ("Freight", "Pune to\nCoimbatore\nRs 48,000"),
            ("Declared", "Value field\nleft blank\non the LR"),
            ("Cap", "10 x freight\n= Rs 4,80,000"),
        ],
        [
            "Rule 12 desk model when value path is unused.",
            "Uncovered vs invoice: about Rs 37,20,000.",
            "Confirm Rule 12 on Carriage by Road Rules, 2011.",
        ],
        "Workshop corridor. Named statute. Not a ZAFTYS claim file.",
        "transit-rule12-ten-times-freight.png",
    )
    formula_card(
        "Billable weighbridge shortage",
        "S billable  =  max(0, gap - W origin x (T scale + T moist))",
        [
            ("W origin", "Net at origin\n35,000 kg"),
            ("W dest", "Net at dest\n34,370 kg"),
            ("Gap", "630 kg\n(~1.80%)"),
            ("Tolerances", "0.10% scale\n+ 0.20% moist\n= 105 kg"),
        ],
        [
            "S billable = 630 - 105 = 525 kg.",
            "Debit = 525 kg x invoice Rs per MT.",
            "MSA band is commercial. Not a Legal Metrology MPE table.",
        ],
        "Workshop kanta audit. Commodity bands differ.",
        "transit-billable-shortage-equation.png",
    )
    print("done")


if __name__ == "__main__":
    main()
