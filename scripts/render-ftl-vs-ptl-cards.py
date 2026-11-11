"""Draw FTL vs PTL formula cards + PTL sticker waterfall, then stamp logo."""
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
WARM = (217, 119, 6, 255)
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
    title_f = font(44)
    formula_f = font(28)
    head_f = font(24)
    body_f = font(24)
    result_f = font(28)
    foot_f = font(22)

    center_text(draw, title, px(32), title_f)
    draw.line((px(560), px(100), px(976), px(100)), fill=TEAL, width=px(8))

    draw.rounded_rectangle((px(48), px(120), W - px(48), px(260)), radius=px(22), fill=NAVY)
    # wrap long formula
    lines = []
    words = formula.split(" ")
    cur = ""
    for w in words:
        trial = (cur + " " + w).strip()
        if text_width(draw, trial, formula_f) > W - px(120):
            lines.append(cur)
            cur = w
        else:
            cur = trial
    if cur:
        lines.append(cur)
    yf = px(150) if len(lines) == 1 else px(135)
    for line in lines:
        fw = text_width(draw, line, formula_f)
        draw.text(((W - fw) // 2, yf), line, font=formula_f, fill=WHITE)
        yf += px(40)

    gap = px(16)
    left = px(48)
    usable = W - px(96)
    tw = (usable - gap * (len(tiles) - 1)) // len(tiles)
    top = px(290)
    tile_h = px(260)
    for i, (head, body) in enumerate(tiles):
        x0 = left + i * (tw + gap)
        draw.rounded_rectangle(
            (x0, top, x0 + tw, top + tile_h), radius=px(18), fill=TEAL, outline=NAVY, width=px(4)
        )
        draw.rounded_rectangle(
            (x0 + px(4), top + px(60), x0 + tw - px(4), top + tile_h - px(4)),
            radius=px(14),
            fill=WHITE,
        )
        hw = text_width(draw, head, head_f)
        draw.text((x0 + (tw - hw) // 2, top + px(14)), head, font=head_f, fill=WHITE)
        draw.multiline_text(
            (x0 + px(14), top + px(78)), body, font=body_f, fill=NAVY, spacing=px(6)
        )

    ry = px(580)
    rh = px(260)
    draw.rounded_rectangle((px(48), ry, W - px(48), ry + rh), radius=px(18), fill=NAVY)
    y = ry + px(32)
    for line in result:
        draw.text((px(80), y), line, font=result_f, fill=WHITE)
        y += px(48)
    draw.text((px(48), px(900)), footer, font=foot_f, fill=NAVY)
    save_and_stamp(img, name)


def waterfall_card() -> None:
    img, draw = new_canvas()
    title_f = font(40)
    body_f = font(22)
    big_f = font(28)
    foot_f = font(20)
    center_text(draw, "Unmasking the PTL sticker price", px(28), title_f)
    draw.line((px(520), px(92), px(1016), px(92)), fill=TEAL, width=px(8))
    center_text(
        draw,
        "Workshop: 4.5 MT Chakan to Sanand  |  Base PTL Rs 33,750  ->  Landed Rs 53,490",
        px(110),
        body_f,
        fill=TEAL,
    )

    steps = [
        ("Base PTL", "Rs 33,750", NAVY),
        ("+ Surcharges", "+ Rs 4,740", TEAL),
        ("+ Crating", "+ Rs 9,000", TEAL),
        ("+ WC drag", "+ Rs 550", TEAL),
        ("+ Damage 1.8%", "+ Rs 5,040", WARM),
        ("Landed PTL", "Rs 53,490", WARM),
        ("FTL trip", "Rs 38,000", TEAL),
    ]
    left = px(40)
    gap = px(12)
    usable = W - px(80)
    tw = (usable - gap * (len(steps) - 1)) // len(steps)
    top = px(180)
    for i, (label, val, color) in enumerate(steps):
        x0 = left + i * (tw + gap)
        draw.rounded_rectangle((x0, top, x0 + tw, top + px(420)), radius=px(16), fill=color)
        draw.multiline_text(
            (x0 + px(12), top + px(40)),
            label.replace(" ", "\n"),
            font=body_f,
            fill=WHITE,
            spacing=px(4),
        )
        draw.text((x0 + px(12), top + px(280)), val, font=big_f, fill=WHITE)

    draw.rounded_rectangle((px(48), px(660), W - px(48), px(860)), radius=px(18), fill=NAVY)
    draw.text((px(80), px(700)), "Dedicated FTL saves about Rs 15,490 (~29%) landed.", font=big_f, fill=WHITE)
    draw.text((px(80), px(760)), "Delivery ~5 days faster on this workshop corridor.", font=big_f, fill=WHITE)
    draw.text(
        (px(48), px(900)),
        "Teaching ledger only. Not a ZAFTYS audited claim file or tariff guarantee.",
        font=foot_f,
        fill=NAVY,
    )
    save_and_stamp(img, "ftl-vs-ptl-sticker-waterfall.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    formula_card(
        "FTL vs PTL break-even weight",
        "W be = (Trip_FTL - [Docket + ODA + C_crate]) / ((R_kg + FOV) - dDamage)",
        [
            ("Trip FTL", "Dedicated\ntrip rate\nRs / truck"),
            ("PTL rate", "R per kg\n+ FOV\non value"),
            ("Pack delta", "Crating\nstripped\non FTL"),
            ("Damage", "Scrap\ndelta\nPTL - FTL"),
        ],
        [
            "Paper-only break-even can sit near 6.5 MT.",
            "With pack + scrap, workshop band is ~3.0 to 4.5 MT.",
            "Recompute on your tariff and damage history.",
        ],
        "Workshop algebra. [MODAL CONVERSION THRESHOLD]. Not a national law.",
        "ftl-vs-ptl-breakeven-equation.png",
    )
    formula_card(
        "PTL volumetric weight trap",
        "Chargeable kg = max(Actual kg, CFT x 10 lbs x 0.4536)",
        [
            ("Actual", "2,200 kg\ncontrol\npanels"),
            ("Cube", "12 CBM\n~424 CFT"),
            ("Rule", "10 lbs\nper CFT"),
            ("Billed", "~4,240 kg\nvolumetric"),
        ],
        [
            "Ghost weight nearly doubles the mass-based freight.",
            "High-cube light goods cube-out before they weigh-out.",
            "Confirm the carrier tariff (CFT or CBM factor).",
        ],
        "Workshop example. [CUBE-OUT PENALTY]. Schedule controls.",
        "ftl-vs-ptl-volumetric-trap.png",
    )
    formula_card(
        "Working capital pipeline cost",
        "C inv = Invoice x (WACC / 365) x Transit days",
        [
            ("Value", "Invoice\nRs 28 L\nworkshop"),
            ("WACC", "12%\nper year"),
            ("PTL days", "About\n6 days"),
            ("FTL days", "About\n1 day"),
        ],
        [
            "Extra days on PTL create inventory interest drag.",
            "Paper LR courier can freeze bill discounting longer.",
            "Direct ePOD shortens the cash cycle.",
        ],
        "Workshop. [SUPPLY CHAIN VELOCITY]. Not treasury advice.",
        "ftl-vs-ptl-working-capital.png",
    )
    waterfall_card()
    print("done")


if __name__ == "__main__":
    main()
