"""Draw vehicle-verification formula, process, and waterfall boards, then stamp once.

Canvas is 3072 x 2048. Horizontal waterfall - no tall color pillars.
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
    title_f = font(38)
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
    center_text(draw, "8-point pre-loading verification SOP", px(24), font(40))
    draw.line((px(440), px(88), px(1096), px(88)), fill=TEAL, width=px(8))
    steps = [
        ("01", "Plate audit", "HSRP screws,\nfont, yellow plate."),
        ("02", "Vahan API", "RC, fitness,\npermit, tare."),
        ("03", "Sarathi DL", "Photo, status,\nHGMV / Hazchem."),
        ("04", "FASTag", "Corridor vs\ndeclared origin."),
        ("05", "Chassis rub", "Pencil impression\nvs Vahan extract."),
        ("06", "Driver ID", "Live plate photo\n+ masked Aadhaar."),
        ("07", "EHS check", "Breathalyzer,\ntyres, lights."),
        ("08", "Gate pass", "Issue pass;\nseal on Part B."),
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
        "Any hard fail = hold. Congestion is not permission to skip Steps 02 to 05.",
        font=font(24),
        fill=NAVY,
    )
    save_and_stamp(img, "vehicle-verification-8-step-gate.png")


def waterfall_card() -> None:
    """Horizontal loss stack for copper diversion workshop."""
    img, draw = new_canvas()
    center_text(draw, "Anatomy of a stolen copper wire dispatch", px(18), font(40))
    draw.line((px(360), px(84), px(1176), px(84)), fill=TEAL, width=px(8))
    center_text(
        draw,
        "Dahej to Bhiwandi workshop. 24 T electrolytic copper rods.",
        px(100),
        font(24),
        fill=TEAL,
    )

    # Values in lakhs for readable bars; labels show crore/rupee text.
    rows = [
        ("Invoiced cargo value", "Rs 2.15 Cr base exposure", 0, 215, BLUE),
        ("Insurance repudiation", "Due-diligence warranty breach", 215, 215, AMBER),
        ("Customer late-delivery LD", "Adds Rs 12 L", 215, 227, AMBER),
        ("FIR / legal / forensic", "Adds Rs 4.5 L", 227, 231.5, AMBER),
        ("Final corporate loss", "Workshop landed write-off stack", 0, 231.5, NAVY),
        ("Gate API verification cost", "45-second Vahan/Sarathi cycle", 0, 0.0015, TEAL),
    ]
    scale_max = 250
    y = px(148)
    row_h = px(100)
    bar_left = px(560)
    bar_max = px(520)
    label_f = font(24)
    note_f = font(20)
    val_f = font(24)
    display = [
        "Rs 2,15,00,000",
        "Rs 2,15,00,000 hit",
        "Rs 12,00,000",
        "Rs 4,50,000",
        "Rs 2,31,50,000",
        "Rs 15",
    ]
    for i, (label, note, start, end, color) in enumerate(rows):
        draw.rounded_rectangle(
            (px(36), y, W - px(36), y + row_h),
            radius=px(14),
            outline=NAVY,
            width=px(3),
            fill=WHITE,
        )
        draw.text((px(56), y + px(16)), label, font=label_f, fill=NAVY)
        draw.text((px(56), y + px(54)), note, font=note_f, fill=color if start > 0 else NAVY)
        track_y0 = y + px(36)
        track_y1 = y + px(68)
        draw.rounded_rectangle(
            (bar_left, track_y0, bar_left + bar_max, track_y1),
            radius=px(8),
            fill=TRACK,
        )
        # Special-case tiny verification cost bar so it remains visible.
        if end < 1:
            x0 = bar_left
            x1 = bar_left + px(28)
            draw.rounded_rectangle((x0, track_y0, x1, track_y1), radius=px(8), fill=TEAL)
        else:
            x0 = bar_left + int(bar_max * start / scale_max)
            x1 = bar_left + int(bar_max * end / scale_max)
            if x1 - x0 < px(16):
                x1 = x0 + px(16)
            if start > 0 and end > start:
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
            (bar_left + bar_max + px(16), y + px(34)),
            display[i],
            font=val_f,
            fill=NAVY,
        )
        y += row_h + px(8)

    draw.text(
        (px(40), px(920)),
        "Rs 2.315 Cr workshop loss vs Rs 15 gate verification. Teaching ledger only.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "vehicle-verification-copper-loss-waterfall.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    formula_card(
        "Freight loss risk coefficient",
        "Risk exposure = Consignment value x Sourcing factor x Verification gap",
        [
            ("Value", "Invoice\nrupees at\nrisk"),
            ("Sourcing", "WhatsApp /\ndalal elevates\nfactor"),
            ("Gap", "No Vahan /\nno chassis\nrub"),
            ("Contrast", "Unvetted\n~Rs 1.8 Cr vs\nverified <50k"),
        ],
        [
            "Unvetted spot truck workshop risk near Rs 1.8 Cr class.",
            "Vahan-verified marketplace truck residual under Rs 50k framing.",
            "Close the verification gap before soft freight tempts the desk.",
        ],
        "Taxonomy: RISK EXPOSURE ENGINE. Workshop briefing aid.",
        "vehicle-verification-risk-coefficient.png",
    )
    formula_card(
        "FASTag spatial-temporal plausibility",
        "V_implied = Distance(last toll, gate) / Delta hours.  IF V>85 km/h OR opposite corridor -> FLAG CLONE.",
        [
            ("Last toll", "NETC plaza\nclearance\ntime"),
            ("Gate-in", "Plant arrival\ntimestamp"),
            ("Speed flag", "Implied >85\nkm/h is\nimpossible"),
            ("Direction", "Opposite to\ndeclared lane\n= clone"),
        ],
        [
            "Chakan claims Mumbai inbound; FASTag shows Varanasi-side six hours earlier.",
            "Plate at the gate is not the highway truck.",
            "Hard-fail before loading slip - not after Part B.",
        ],
        "Taxonomy: TELEMETRY PLAUSIBILITY CHECK. Confirm NETC access path.",
        "vehicle-verification-fastag-plausibility.png",
    )
    formula_card(
        "True cost of a stolen freight incident",
        "Total loss = Invoice value - Scrap recovery + Legal costs + Deductible + Customer LD penalty",
        [
            ("Cargo", "Invoiced\nvalue on\nthe LR"),
            ("Recovery", "Often near\nzero after\n72 hours"),
            ("Legal", "FIR, counsel,\nforensics"),
            ("Commercial", "LD + lost\ncustomer\ntrust"),
        ],
        [
            "Copper workshop: Rs 2.15 Cr cargo + LD + legal ~ Rs 2.315 Cr.",
            "Insurance repudiation converts cargo loss into full write-off.",
            "Gate API cycle costs about Rs 15 in the teaching contrast.",
        ],
        "Taxonomy: FINANCIAL DRAIN CALCULATION. Not a claim computation.",
        "vehicle-verification-true-cost.png",
    )
    process_card()
    waterfall_card()
    print("vehicle verification boards written")


if __name__ == "__main__":
    main()
