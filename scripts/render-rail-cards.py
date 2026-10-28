"""Draw rail-versus-road boards, then stamp the logo once.

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


def center_text(draw, text, y, fnt, fill=NAVY):
    x = (W - text_width(draw, text, fnt)) // 2
    draw.text((x, y), text, font=fnt, fill=fill)


def save_and_stamp(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG")
    logo = Image.open(LOGO).convert("RGBA")
    stamp(path, logo, max_width=max(140, int(img.width * 0.075)))


def formula_bar(draw, text: str, y: int) -> None:
    draw.rounded_rectangle((px(48), y, W - px(48), y + px(100)), radius=px(18), fill=NAVY)
    fnt = font(30)
    draw.text(((W - text_width(draw, text, fnt)) // 2, y + px(28)), text, font=fnt, fill=WHITE)


def breakeven_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "Same formula. Two distances.", px(24), font(44))
    draw.line((px(470), px(92), px(1066), px(92)), fill=TEAL, width=px(8))
    formula_bar(draw, "D  =  Fixed ends  /  (Rate road  -  Rate rail)", px(120))
    cards = [
        ("Workshop A", ["Fixed ends  Rs 650 / t", "Road  Rs 2.40 / t-km", "Rail  Rs 1.40 / t-km", "Gap  Rs 1.00", "Distance  650 km"]),
        ("Workshop B", ["Fixed ends  Rs 1,800 / t", "Road  Rs 2.20 / t-km", "Rail  Rs 0.90 / t-km", "Gap  Rs 1.30", "Distance  1,385 km"]),
    ]
    gap = px(28)
    tw = (W - px(96) - gap) // 2
    y0 = px(260)
    for i, (head, lines) in enumerate(cards):
        x = px(48) + i * (tw + gap)
        draw.rounded_rectangle((x, y0, x + tw, y0 + px(560)), radius=px(16), fill=NAVY)
        draw.text((x + px(28), y0 + px(24)), head, font=font(32), fill=WHITE)
        yy = y0 + px(100)
        for line in lines:
            draw.rounded_rectangle((x + px(20), yy, x + tw - px(20), yy + px(72)), radius=px(12), fill=WHITE)
            draw.text((x + px(36), yy + px(18)), line, font=font(26), fill=NAVY)
            yy += px(84)
    draw.text(
        (px(48), px(860)),
        "Your four inputs. Not a national threshold. No gap, no crossing point.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "rail-breakeven.png")


def inventory_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "The extra days inside a full rake", px(24), font(42))
    draw.line((px(400), px(92), px(1136), px(92)), fill=TEAL, width=px(8))
    formula_bar(draw, "Cost  =  (Batch / 2)  x  value  x  WACC  x  (days / 365)", px(120))
    pairs = [
        ("Batch, and the extra days", "3,000 tonnes, 6 days"),
        ("Value and WACC", "Rs 55,000 / t, 12 percent"),
        ("Average extra stock", "1,500 tonnes"),
        ("Stock value", "Rs 8.25 crore"),
        ("Interest", "about Rs 1.63 lakh"),
        ("Per tonne", "about Rs 54"),
    ]
    y = px(250)
    for label, value in pairs:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(78)), radius=px(12), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((px(72), y + px(20)), label, font=font(28), fill=NAVY)
        vf = font(28)
        draw.text((W - px(72) - text_width(draw, value, vf), y + px(20)), value, font=vf, fill=TEAL)
        y += px(88)
    draw.text(
        (px(48), px(860)),
        "Closes a close gap. Does not, alone, justify a mode.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "rail-inventory.png")


def demurrage_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "One hour late is the whole placement", px(24), font(40))
    draw.line((px(400), px(92), px(1136), px(92)), fill=TEAL, width=px(8))
    formula_bar(draw, "Hour  =  wagons  x  Rs 150  x  the step", px(120))
    pairs = [
        ("Placement", "58 eight-wheeler wagons"),
        ("Hours 1 to 6, each hour", "58 x Rs 150  =  Rs 8,700"),
        ("Four hours, still in that band", "Rs 34,800"),
        ("Hour 7, base plus 10 percent", "Rs 165 x 58  =  Rs 9,570"),
    ]
    y = px(260)
    for label, value in pairs:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(110)), radius=px(14), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((px(72), y + px(16)), label, font=font(26), fill=TEAL)
        draw.text((px(72), y + px(56)), value, font=font(32), fill=NAVY)
        y += px(128)
    draw.text(
        (px(48), px(820)),
        "April 2024 compendium. Ordinary slab ends at three times the base.",
        font=font(22),
        fill=NAVY,
    )
    draw.text(
        (px(48), px(858)),
        "Corrigendum 56, 19 Mar 2025. Congestion can be notified up to six times after 24 hours' notice.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "rail-demurrage.png")


def main() -> None:
    breakeven_card()
    inventory_card()
    demurrage_card()
    print("rail boards written")


if __name__ == "__main__":
    main()
