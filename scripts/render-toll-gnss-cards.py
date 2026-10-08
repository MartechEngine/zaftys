"""Draw FASTag, MLFF, and GNSS toll boards, then stamp the ZAFTYS logo once.

Exports at 3072 x 2048. Re-running redraws the files before the stamp.
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


def formula_card(title: str, formula: str, tiles: list[tuple[str, str]], result: list[str], footer: str, name: str) -> None:
    img, draw = new_canvas()
    title_f = font(46)
    formula_f = font(32)
    head_f = font(26)
    body_f = font(28)
    result_f = font(32)
    foot_f = font(24)

    center_text(draw, title, px(36), title_f)
    draw.line((px(560), px(112), px(976), px(112)), fill=TEAL, width=px(8))

    draw.rounded_rectangle((px(64), px(148), W - px(64), px(292)), radius=px(22), fill=NAVY)
    fw = text_width(draw, formula, formula_f)
    draw.text(((W - fw) // 2, px(190)), formula, font=formula_f, fill=WHITE)

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
    rh = px(230)
    draw.rounded_rectangle((px(64), ry, W - px(64), ry + rh), radius=px(18), fill=NAVY)
    y = ry + px(36)
    for line in result:
        draw.text((px(96), y), line, font=result_f, fill=WHITE)
        y += px(56)
    draw.text((px(64), px(910)), footer, font=foot_f, fill=NAVY)
    save_and_stamp(img, name)


def flow_card() -> None:
    img, draw = new_canvas()
    title_f = font(42)
    num_f = font(32)
    head_f = font(26)
    body_f = font(26)
    foot_f = font(24)
    center_text(draw, "From the gantry debit to a toll line finance can check", px(28), title_f)
    draw.line((px(470), px(100), px(1066), px(100)), fill=TEAL, width=px(8))

    steps = [
        ("1", "Match the class", "Tag, RC, and body\non the same trip."),
        ("2", "Keep a balance", "A failed MLFF read\ncan become a notice."),
        ("3", "Name the place", "Plaza or gantry,\nwith the time."),
        ("4", "Read the debit", "Issuer amount.\nNot a round allowance."),
        ("5", "Attach the trip", "Loading date and\ndelivery on one record."),
        ("6", "Leave diesel out", "Toll is its own line.\nNot part of the fuel percent."),
    ]
    cols = 3
    gap_x = px(28)
    gap_y = px(24)
    left = px(48)
    top0 = px(150)
    usable = W - left * 2
    tw = (usable - gap_x * (cols - 1)) // cols
    th = px(270)
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
        draw.text((x0 + px(28) + nw + px(16), y0 + px(26)), head, font=head_f, fill=WHITE)
        draw.multiline_text((x0 + px(28), y0 + px(116)), body, font=body_f, fill=NAVY, spacing=px(8))
    draw.text((px(48), px(900)), "Workshop audit. Not a promise that every gantry feed is already live.", font=foot_f, fill=NAVY)
    save_and_stamp(img, "toll-bill-flow.png")


def save_and_stamp(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG")
    logo = Image.open(LOGO).convert("RGBA")
    stamp(path, logo, max_width=max(140, int(img.width * 0.075)))


def main() -> None:
    formula_card(
        "What an open plaza still charges",
        "Section fee  =  R  x  notified section length",
        [
            ("R", "Teaching rate\nRs 4.50 per km\nNot a 2026 tariff"),
            ("Length", "60 km notified\nsection"),
            ("4 km used", "Still the\nsection fee"),
            ("60 km used", "Same\nsection fee"),
        ],
        [
            "Rs 4.50 x 60 km = Rs 270.",
            "A 4 km hop and a full run can both pay Rs 270.",
        ],
        "Open plaza and MLFF. Barrier-free does not shrink the section.",
        "toll-section-fee.png",
    )
    formula_card(
        "GNSS fee, only if that section is operating",
        "National permit: fee = R x actual km",
        [
            ("Permit truck", "No 20 km waiver.\n4 km costs Rs 18."),
            ("Other vehicle", "max(0, km - 20).\n4 km costs Rs 0."),
            ("25 km, other", "(25 - 20) x 4.50\n= Rs 22.50"),
            ("Full 60 km", "Permit Rs 270.\nOther vehicle Rs 180."),
        ],
        [
            "The 20 km zero is per direction, per day, on that section.",
            "It does not apply to a national permit vehicle.",
        ],
        "Written GNSS rule. Not the October 2026 national bill.",
        "toll-gnss-waiver.png",
    )
    flow_card()
    print("done")


if __name__ == "__main__":
    main()
