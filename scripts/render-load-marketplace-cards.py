"""Draw load-marketplace formula, process, and waterfall boards, then stamp once.

Canvas is 3072 x 2048. Re-running redraws from scratch before the stamp,
so a second pass does not stack a second logo.
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
WARM = (217, 119, 6, 255)
WHITE = (255, 255, 255, 255)
BLUE = (30, 77, 140, 255)
AMBER = (180, 83, 9, 255)
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
    formula_f = font(26)
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
    center_text(draw, "8-point direct digital freight lifecycle", px(24), font(40))
    draw.line((px(480), px(88), px(1056), px(88)), fill=TEAL, width=px(8))
    steps = [
        ("01", "Define cargo", "Match net payload\nand body type."),
        ("02", "Free publish", "Broadcast lane to\nverified truckers."),
        ("03", "In-app chat", "Lock rate, advance,\nloading window."),
        ("04", "Vahan audit", "RC, insurance,\ncommercial DL."),
        ("05", "Gate-In proof", "Loading and seal\nphotos on timeline."),
        ("06", "Advance pay", "Trigger ~70%\nwith digital LR."),
        ("07", "Milestones", "Track without\nphone harassment."),
        ("08", "Clean POD", "Stamped delivery\nthen balance pay."),
    ]
    # Snake: row 1 01-04 L->R. Row 2 08,07,06,05 L->R (flow returns left).
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
        "Zero commission on the trip rate. Gate proofs stay on one timeline.",
        font=font(24),
        fill=NAVY,
    )
    save_and_stamp(img, "load-marketplace-8-step-lifecycle.png")


def waterfall_card() -> None:
    """Horizontal stepped waterfall - same pattern as freight-bid-waterfall.png."""
    img, draw = new_canvas()
    center_text(draw, "Unmasking the middleman markup", px(20), font(44))
    draw.line((px(460), px(88), px(1076), px(88)), fill=TEAL, width=px(8))
    center_text(
        draw,
        "Raipur to Bhiwandi workshop. 25 tonnes. ~1,150 km.",
        px(108),
        font(26),
        fill=TEAL,
    )

    # (label, note, start, end, bar_color). Running total on the right.
    rows = [
        ("Trucker floor", "Direct operating need", 0, 54000, BLUE),
        ("Plus placement", "Adds Rs 2,500", 54000, 56500, AMBER),
        ("Plus mandi broker", "Adds Rs 3,500", 56500, 60000, AMBER),
        ("Plus advance drag", "Adds Rs 2,000", 60000, 62000, AMBER),
        ("Traditional landed", "Shipper invoice after stack", 0, 62000, NAVY),
        ("Direct match", "Zero-commission TranZfort", 0, 55800, TEAL),
    ]
    scale_max = 70000
    y = px(168)
    row_h = px(108)
    bar_left = px(560)
    bar_max = px(560)
    label_f = font(28)
    note_f = font(24)
    val_f = font(28)
    for label, note, start, end, color in rows:
        draw.rounded_rectangle(
            (px(36), y, W - px(36), y + row_h),
            radius=px(16),
            outline=NAVY,
            width=px(3),
            fill=WHITE,
        )
        draw.text((px(56), y + px(16)), label, font=label_f, fill=NAVY)
        note_fill = color if start > 0 else NAVY
        draw.text((px(56), y + px(60)), note, font=note_f, fill=note_fill)
        track_y0 = y + px(38)
        track_y1 = y + px(72)
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
            (bar_left + bar_max + px(20), y + px(34)),
            f"Rs {end:,}",
            font=val_f,
            fill=NAVY,
        )
        y += row_h + px(10)

    draw.text(
        (px(40), px(920)),
        "Shipper saves Rs 6,200 (10%). Truck owner keeps Rs 1,800 more than the floor. Workshop only.",
        font=font(24),
        fill=NAVY,
    )
    save_and_stamp(img, "load-marketplace-middleman-waterfall.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    formula_card(
        "Multi-tier brokerage tax",
        "Landed shipper = Net trucker + Primary dalal + Sub-broker + Fuel advance drag",
        [
            ("Net trucker", "Asset owner\noperating\nfloor"),
            ("Primary", "Mandi broker\nmarkup on\nshipper rate"),
            ("Sub-broker", "Local placement\nfee to find\nthe truck"),
            ("Advance drag", "Diesel slip /\ncash discount\non payout"),
        ],
        [
            "Workshop 25 T corridor: floor Rs 54,000.",
            "Stack lifts shipper invoice toward Rs 62,000.",
            "Same truck. Different pockets.",
        ],
        "Taxonomy: INTERMEDIATION FRICTION. Workshop algebra only.",
        "load-marketplace-broker-tax-equation.png",
    )
    formula_card(
        "Idle dwell opportunity cost",
        "Daily burn = (EMI + Insurance + Driver pay) / 30  +  Forgone trip yield",
        [
            ("Standing", "EMI +\ninsurance +\ndriver salary"),
            ("Per day", "Divide by 30\nfor daily\ncapital burn"),
            ("3-day idle", "Workshop loss\nabout\nRs 9,800"),
            ("App return", "Instant post\ncuts empty\nreturn wait"),
        ],
        [
            "Three days in Transport Nagar can cost ~Rs 9,800.",
            "Return-load visibility collapses idle dwell.",
            "Price outbound lower when backhaul is known.",
        ],
        "Taxonomy: FLEET UTILIZATION LOSS. Empty return run (khali phera) workshop.",
        "load-marketplace-idle-dwell-cost.png",
    )
    formula_card(
        "Net realized freight yield (PTKM)",
        "PTKM = (Trip freight - Intermediary cuts - Direct trip costs) / (Tonnes x Km)",
        [
            ("Trip freight", "What shipper\npays on the\nbooking"),
            ("Cuts removed", "Brokerage\n(dalali) and\nplatform cuts"),
            ("Direct costs", "Diesel, toll,\nAdBlue, trip\nallowance"),
            ("Denom", "Net tonnes\ntimes\ncorridor km"),
        ],
        [
            "Zero-commission match raises take-home PTKM.",
            "Compare models on the same tonnes and km.",
            "Rebuild with your diesel and EMI before a tender.",
        ],
        "Taxonomy: CARRIER PROFITABILITY. Workshop PTKM only.",
        "load-marketplace-ptkm-yield.png",
    )
    process_card()
    waterfall_card()
    print("load marketplace boards written")


if __name__ == "__main__":
    main()
