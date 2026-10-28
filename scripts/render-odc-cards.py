"""Draw ODC boards, then stamp the logo once.

Canvas is 3072 x 2048. Re-running redraws from scratch before the stamp.
Pictures use Rs, not the rupee sign.
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


def new_canvas():
    img = Image.new("RGBA", (W, H), BG)
    return img, ImageDraw.Draw(img)


def text_width(draw, text, fnt) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def center_text(draw, text, y, fnt, fill=NAVY):
    x = (W - text_width(draw, text, fnt)) // 2
    draw.text((x, y), text, font=fnt, fill=fill)


def save_and_stamp(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG")
    logo = Image.open(LOGO).convert("RGBA")
    stamp(path, logo, max_width=max(140, int(img.width * 0.075)))


def formula_bar(draw, text: str, y: int) -> None:
    draw.rounded_rectangle((px(48), y, W - px(48), y + px(112)), radius=px(18), fill=NAVY)
    fnt = font(32)
    draw.text(((W - text_width(draw, text, fnt)) // 2, y + px(32)), text, font=fnt, fill=WHITE)


def rows(draw, pairs: list[tuple[str, str]], y: int) -> None:
    for label, value in pairs:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(88)), radius=px(14), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((px(72), y + px(24)), label, font=font(30), fill=NAVY)
        vf = font(30)
        draw.text((W - px(72) - text_width(draw, value, vf), y + px(24)), value, font=vf, fill=TEAL)
        y += px(100)


def axle_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "Screening sum. The portal can demand more.", px(28), font(40))
    draw.line((px(380), px(96), px(1156), px(96)), fill=TEAL, width=px(8))
    formula_bar(draw, "N lines  =  (W cargo  +  W trailer)  /  P line", px(130))
    rows(
        draw,
        [
            ("Cargo, workshop", "120 tonnes"),
            ("Trailer tare, workshop", "40 tonnes"),
            ("Gross on the lines", "160 tonnes"),
            ("Chart at 18 t per line", "8.89, so 9 lines"),
            ("Bridge posted at 15 t", "10.67, so 11 lines"),
        ],
        px(270),
    )
    draw.text(
        (px(48), px(820)),
        "The 27 Oct 2025 circular draws the charts at not more than 18 tonnes per axle row.",
        font=font(22),
        fill=NAVY,
    )
    draw.text(
        (px(48), px(858)),
        "Round up. A posted bridge can be lower. Nine and eleven lines are the workshop.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "odc-axle-lines.png")


def tip_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "The tip sketch is not the road camber", px(28), font(42))
    draw.line((px(400), px(96), px(1136), px(96)), fill=TEAL, width=px(8))
    formula_bar(draw, "theta  =  arctan(  track  /  (2  x  CoG height)  )", px(150))
    notes = [
        ("What theta is", "The angle where a rigid block would tip."),
        ("What it is not", "A hydraulic trailer with a free circuit."),
        ("No degree on this board", "Need the drawing's track and centre of gravity."),
        ("6 to 8 degrees", "A road cross-fall warning. It is not theta."),
    ]
    y = px(310)
    for label, value in notes:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(100)), radius=px(14), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((px(72), y + px(18)), label, font=font(26), fill=TEAL)
        draw.text((px(72), y + px(54)), value, font=font(28), fill=NAVY)
        y += px(118)
    draw.text(
        (px(48), px(880)),
        "The survey engineer signs the camber for that cargo. This board does not.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "odc-tip-sketch.png")


def fuel_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "Litres, then the diesel print", px(28), font(44))
    draw.line((px(470), px(96), px(1066), px(96)), fill=TEAL, width=px(8))
    center_text(draw, "A heavy pull. Not a test certificate. Not the trailer hire.", px(112), font(24))
    formula_bar(draw, "Litres  =  kilometres  /  (km per litre)", px(160))
    rows(
        draw,
        [
            ("Planning range", "0.8 to 1.2 km per litre"),
            ("100 km at 0.8 km per litre", "125 litres"),
            ("At Rs 95.20 per litre", "Rs 11,900"),
            ("100 km at 1.2 km per litre", "83.33 litres, Rs 7,933"),
        ],
        px(310),
    )
    draw.text(
        (px(48), px(820)),
        "Rs 95.20 is the Delhi print used in the freight-rate workshop.",
        font=font(22),
        fill=NAVY,
    )
    draw.text(
        (px(48), px(860)),
        "Price the litres. Do not turn this into a per-km axle-line hire.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "odc-fuel-litres.png")


def main() -> None:
    axle_card()
    tip_card()
    fuel_card()
    print("odc boards written")


if __name__ == "__main__":
    main()
