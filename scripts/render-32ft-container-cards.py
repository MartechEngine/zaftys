"""Draw 32-ft container formula, process, and waterfall boards, then stamp once.

Canvas is 3072 x 2048. Re-running redraws from scratch before the stamp.
Waterfall uses horizontal rows (not tall color pillars).
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
GHOST = (203, 213, 225, 255)
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


def formula_card(
    title: str,
    formula: str,
    tiles: list[tuple[str, str]],
    result: list[str],
    footer: str,
    name: str,
) -> None:
    img, draw = new_canvas()
    title_f = font(40)
    formula_f = font(24)
    head_f = font(22)
    body_f = font(22)
    result_f = font(26)
    foot_f = font(20)

    center_text(draw, title, px(28), title_f)
    draw.line((px(520), px(92), px(1016), px(92)), fill=TEAL, width=px(8))

    draw.rounded_rectangle((px(48), px(110), W - px(48), px(250)), radius=px(22), fill=NAVY)
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
    yf = px(140) if len(lines) == 1 else px(125)
    for line in lines:
        fw = text_width(draw, line, formula_f)
        draw.text(((W - fw) // 2, yf), line, font=formula_f, fill=WHITE)
        yf += px(38)

    gap = px(16)
    left = px(48)
    usable = W - px(96)
    tw = (usable - gap * (len(tiles) - 1)) // len(tiles)
    top = px(280)
    tile_h = px(250)
    for i, (head, body) in enumerate(tiles):
        x0 = left + i * (tw + gap)
        draw.rounded_rectangle(
            (x0, top, x0 + tw, top + tile_h), radius=px(18), fill=TEAL, outline=NAVY, width=px(4)
        )
        draw.rounded_rectangle(
            (x0 + px(4), top + px(58), x0 + tw - px(4), top + tile_h - px(4)),
            radius=px(14),
            fill=WHITE,
        )
        hw = text_width(draw, head, head_f)
        draw.text((x0 + (tw - hw) // 2, top + px(14)), head, font=head_f, fill=WHITE)
        draw.multiline_text(
            (x0 + px(14), top + px(74)), body, font=body_f, fill=NAVY, spacing=px(6)
        )

    ry = px(560)
    rh = px(250)
    draw.rounded_rectangle((px(48), ry, W - px(48), ry + rh), radius=px(18), fill=NAVY)
    y = ry + px(28)
    for line in result:
        draw.text((px(80), y), line, font=result_f, fill=WHITE)
        y += px(44)
    draw.text((px(48), px(900)), footer, font=foot_f, fill=NAVY)
    save_and_stamp(img, name)


def arrow_right(draw, x, y) -> None:
    draw.polygon([(x, y - px(10)), (x + px(18), y), (x, y + px(10))], fill=TEAL)


def arrow_left(draw, x, y) -> None:
    draw.polygon([(x + px(18), y - px(10)), (x, y), (x + px(18), y + px(10))], fill=TEAL)


def arrow_down(draw, x, y) -> None:
    draw.polygon([(x - px(10), y), (x + px(10), y), (x, y + px(18))], fill=TEAL)


def process_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "8-point container sizing and loading workflow", px(24), font(38))
    draw.line((px(400), px(88), px(1136), px(88)), fill=TEAL, width=px(8))
    steps = [
        ("01", "Weigh cargo", "Sum net mass\nin kilograms."),
        ("02", "Measure CFT", "L x W x H in\ninches / 1728."),
        ("03", "Density", "Total kg over\ntotal CFT."),
        ("04", "SXL vs MXL", "Under 4.5 lean\nSXL; else MXL."),
        ("05", "Height / HQ", "Check stack vs\n4.0/4.52 m CMVR."),
        ("06", "Post spec", "32ft SXL HQ or\n32ft MXL exact."),
        ("07", "Inspect box", "Gaskets, locks,\nfloor flatness."),
        ("08", "Tare + seal", "Weigh empty;\nbolt seal photo."),
    ]
    order = [0, 1, 2, 3, 7, 6, 5, 4]
    cols = 4
    left = px(40)
    gap_x = px(64)
    top0 = px(130)
    usable = W - left * 2
    tw = (usable - gap_x * (cols - 1)) // cols
    th = px(250)
    gap_y = px(72)
    num_f = font(26)
    head_f = font(22)
    body_f = font(22)
    boxes = []
    for i, idx in enumerate(order):
        num, head, body = steps[idx]
        col = i % cols
        row = i // cols
        x0 = left + col * (tw + gap_x)
        y0 = top0 + row * (th + gap_y)
        boxes.append((x0, y0, x0 + tw, y0 + th))
        draw.rounded_rectangle((x0, y0, x0 + tw, y0 + th), radius=px(16), fill=NAVY)
        draw.rounded_rectangle(
            (x0 + px(4), y0 + px(72), x0 + tw - px(4), y0 + th - px(4)),
            radius=px(12),
            fill=WHITE,
        )
        draw.text((x0 + px(16), y0 + px(18)), num, font=num_f, fill=WHITE)
        draw.text((x0 + px(78), y0 + px(22)), head, font=head_f, fill=WHITE)
        draw.multiline_text((x0 + px(18), y0 + px(96)), body, font=body_f, fill=NAVY, spacing=px(6))

    def body_mid(box) -> int:
        return box[1] + px(72) + (box[3] - box[1] - px(72)) // 2

    for col in range(3):
        x1 = boxes[col][2]
        arrow_right(draw, x1 + (gap_x - px(18)) // 2, body_mid(boxes[col]))
    xmid = (boxes[3][0] + boxes[3][2]) // 2
    arrow_down(draw, xmid, boxes[3][3] + (gap_y - px(18)) // 2)
    for col in range(3):
        x1 = boxes[4 + col][2]
        arrow_left(draw, x1 + (gap_x - px(18)) // 2, body_mid(boxes[4 + col]))
    draw.text(
        (px(36), px(900)),
        "Never publish only '32ft container.' Write SXL or MXL on every indent.",
        font=font(24),
        fill=NAVY,
    )
    save_and_stamp(img, "32ft-container-8-step-sizing.png")


def waterfall_card() -> None:
    """Horizontal landed-cost comparison - no tall color pillars."""
    img, draw = new_canvas()
    center_text(draw, "Wrong chassis penalty: SXL vs MXL", px(20), font(42))
    draw.line((px(420), px(88), px(1116), px(88)), fill=TEAL, width=px(8))
    center_text(
        draw,
        "Pune to Delhi workshop. 1,900 CFT. 6.8 MT packaging. ~1,450 km.",
        px(105),
        font(24),
        fill=TEAL,
    )

    rows = [
        ("Right-sized SXL HQ", "Baseline trip for cube-out cargo", 0, 58000, TEAL),
        ("Over-sized MXL dead freight", "Adds Rs 20,000 unused axle capacity", 58000, 78000, AMBER),
        ("MXL landed trip", "Same cube; wrong chassis class", 0, 78000, NAVY),
        ("Overloaded SXL path", "Base + Sec 113 fine + demurrage framing", 0, 89000, AMBER),
    ]
    scale_max = 100000
    y = px(170)
    row_h = px(130)
    bar_left = px(560)
    bar_max = px(560)
    label_f = font(26)
    note_f = font(22)
    val_f = font(28)
    for label, note, start, end, color in rows:
        draw.rounded_rectangle(
            (px(36), y, W - px(36), y + row_h),
            radius=px(16),
            outline=NAVY,
            width=px(3),
            fill=WHITE,
        )
        draw.text((px(56), y + px(22)), label, font=label_f, fill=NAVY)
        draw.text((px(56), y + px(70)), note, font=note_f, fill=color if start > 0 else NAVY)
        track_y0 = y + px(48)
        track_y1 = y + px(84)
        draw.rounded_rectangle(
            (bar_left, track_y0, bar_left + bar_max, track_y1),
            radius=px(8),
            fill=TRACK,
        )
        x0 = bar_left + int(bar_max * start / scale_max)
        x1 = bar_left + int(bar_max * end / scale_max)
        if x1 - x0 < px(16):
            x1 = x0 + px(16)
        if start > 0:
            draw.rounded_rectangle(
                (bar_left, track_y0, x0, track_y1),
                radius=px(8),
                fill=GHOST,
            )
            draw.rectangle(
                (max(bar_left, x0 - px(4)), track_y0, x1, track_y1),
                fill=AMBER,
            )
        else:
            draw.rounded_rectangle(
                (bar_left, track_y0, x1, track_y1),
                radius=px(8),
                fill=color,
            )
        draw.text(
            (bar_left + bar_max + px(20), y + px(48)),
            f"Rs {end:,}",
            font=val_f,
            fill=NAVY,
        )
        y += row_h + px(14)

    draw.text(
        (px(40), px(900)),
        "SXL saves Rs 20,000 (25.6%) vs MXL. Overloaded SXL can land near Rs 89,000. Workshop only.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "32ft-container-wrong-chassis-waterfall.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    formula_card(
        "Volumetric density threshold",
        "Density = Total kg / Total CFT.  If Density < 4.5 -> SXL (18.5T).  If Density >= 4.5 -> evaluate MXL (28T).",
        [
            ("Weigh", "Net cargo\nkilograms\nfrom scale"),
            ("Cube", "Usable CFT\nfrom internals\nor packages"),
            ("SXL rule", "Under ~4.5\nkg/CFT lean\nsingle axle"),
            ("MXL rule", "Dense cargo\nneeds 28T\nGVW class"),
        ],
        [
            "SXL workshop: ~8,000 kg / 2,000 CFT = 4.0 kg/CFT.",
            "MXL workshop: ~15,000 kg / 2,000 CFT = 7.5 kg/CFT.",
            "Grey band 4.5 to 6.0: quote both after tare weigh.",
        ],
        "Taxonomy: CHASSIS SELECTION CRITERION. Workshop decision aid.",
        "32ft-container-density-threshold.png",
    )
    formula_card(
        "High-cube CFT calculator",
        "CFT = (L_in x W_in x H_in) / 1728.  Measure empty internals; brochure CFT often overstates.",
        [
            ("Standard", "31.5 x 7.8\nx 8.0 ft\n~1,965 CFT"),
            ("High Cube", "31.5 x 7.8\nx 9.75 ft\n~2,395 CFT"),
            ("CMVR height", "4.0 / 4.52 m\nconfirm class\nand RC"),
            ("Low deck", "HQ needs\nlow chassis\n+ tyre pack"),
        ],
        [
            "Standard height lands near 1,960 CFT usable on paper.",
            "HQ can approach 2,300 to 2,450 CFT before lining loss.",
            "Door frames and wheel arches still steal cube.",
        ],
        "Taxonomy: CUBIC CAPACITY ENGINE. Measure the empty box.",
        "32ft-container-cft-calculator.png",
    )
    formula_card(
        "Dead-freight waste on over-sized chassis",
        "Dead freight cost = R_trip(MXL) - R_trip(SXL) when cargo cubes out below SXL payload.",
        [
            ("MXL rate", "28T chassis\nrunning cost\n+ MAV toll"),
            ("SXL rate", "18.5T chassis\nright-sized\nfor light cube"),
            ("Workshop", "Rs 78,000\nminus\nRs 58,000"),
            ("Leak", "Rs 20,000\nper trip\n(~25.6%)"),
        ],
        [
            "Pune to Delhi packaging workshop: 1,900 CFT / 6.8 MT.",
            "Two trucks weekly -> about Rs 4.8 lakh annual waste.",
            "Oversizing and overloading are both expensive mistakes.",
        ],
        "Taxonomy: FREIGHT CAPITAL LEAKAGE. Teaching ledger only.",
        "32ft-container-dead-freight-equation.png",
    )
    process_card()
    waterfall_card()
    print("32ft container boards written")


if __name__ == "__main__":
    main()
