"""Draw GTA GST formula, process, and decision boards, then stamp once.

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
BLUE = (30, 77, 140, 255)
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
    center_text(draw, "8-point freight tax compliance lifecycle", px(24), font(40))
    draw.line((px(420), px(88), px(1116), px(88)), fill=TEAL, width=px(8))
    steps = [
        ("01", "Classify", "Tag GTA vs\ntruck owner\n(truck-malik)."),
        ("02", "Annexure V", "Confirm portal\nelection for FY."),
        ("03", "Inspect note", "Audit LR\nparticulars."),
        ("04", "Tax route", "Pick RCM or\nforward charge."),
        ("05", "Invoice text", "Verify statutory\nendorsement."),
        ("06", "e-Way match", "Part B vehicle\nvs LR number."),
        ("07", "Pay RCM", "Cash ledger\nin GSTR-3B."),
        ("08", "Reconcile", "ITC to 2B /\nTable 4."),
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
        "Same SOP for contract fleets and marketplace overflow trips.",
        font=font(24),
        fill=NAVY,
    )
    save_and_stamp(img, "gta-gst-8-step-compliance.png")


def decision_tree_card() -> None:
    """Master GTA tax path as stacked condition cards (not tall color pillars)."""
    img, draw = new_canvas()
    center_text(draw, "The master GTA tax path", px(20), font(44))
    draw.line((px(520), px(88), px(1016), px(88)), fill=TEAL, width=px(8))
    center_text(
        draw,
        "Consignment note first. Annexure V second. Specified recipient third.",
        px(105),
        font(24),
        fill=TEAL,
    )

    rows = [
        (
            "Condition 1",
            "Is a consignment note / LR issued?",
            "NO  ->  Non-GTA hire path (often 0% under exempt entries)",
            "YES ->  Proceed to Condition 2",
            BLUE,
        ),
        (
            "Condition 2",
            "Did the GTA file Annexure V for this FY?",
            "YES ->  Forward charge (18% with ITC or 5% without ITC)",
            "NO  ->  Proceed to Condition 3",
            AMBER,
        ),
        (
            "Condition 3",
            "Is the recipient a specified person under Section 9(3)?",
            "YES ->  5% RCM (recipient pays cash, claims eligible ITC)",
            "NO  ->  Forward charge defaults to GTA at 5%",
            TEAL,
        ),
    ]

    y = px(160)
    title_f = font(28)
    body_f = font(24)
    note_f = font(22)
    for label, question, line_a, line_b, accent in rows:
        draw.rounded_rectangle(
            (px(48), y, W - px(48), y + px(210)),
            radius=px(18),
            outline=NAVY,
            width=px(3),
            fill=WHITE,
        )
        draw.rounded_rectangle((px(48), y, px(280), y + px(56)), radius=px(14), fill=accent)
        draw.text((px(72), y + px(14)), label, font=title_f, fill=WHITE)
        draw.text((px(300), y + px(16)), question, font=title_f, fill=NAVY)
        draw.rounded_rectangle(
            (px(72), y + px(78), W - px(72), y + px(190)),
            radius=px(12),
            fill=TRACK,
        )
        draw.text((px(96), y + px(96)), line_a, font=body_f, fill=NAVY)
        draw.text((px(96), y + px(140)), line_b, font=note_f, fill=NAVY)
        y += px(230)

    draw.text(
        (px(48), px(920)),
        "Workshop decision aid. Confirm bare notifications before locking the plant SOP.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "gta-gst-master-tax-path.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    formula_card(
        "RCM cash outflow vs ITC recovery",
        "RCM cash = Gross freight x 5%.  Net tax cost = RCM cash - Eligible ITC in Table 4 = Rs 0",
        [
            ("Gross freight", "Taxable GTA\ninvoice value\nbefore GST"),
            ("Cash ledger", "Pay 5% only\nvia Electronic\nCash Ledger"),
            ("ITC reclaim", "Eligible credit\nin GSTR-3B\nTable 4 framing"),
            ("Net GST", "Tax-neutral\nwhen ITC is\nclean and timely"),
        ],
        [
            "Rs 10L freight -> Rs 50,000 RCM cash workshop.",
            "Eligible ITC of Rs 50,000 returns net tax cost to Rs 0.",
            "Cash timing still differs from forward charge.",
        ],
        "Taxonomy: TAX LIABILITY ENGINE. Orientation only - not tax advice.",
        "gta-gst-rcm-cash-itc.png",
    )
    formula_card(
        "Carrier margin under 18% forward charge",
        "Net asset cost = CapEx x [1 - recoverable GST on truck/tyres] / Operational mileage",
        [
            ("Truck GST", "Often 28%\non chassis /\nvehicle invoice"),
            ("Tyre GST", "Often 28%\non radial\ntyre purchases"),
            ("ITC unlock", "18% forward\nelection with\nAnnexure V"),
            ("Rate effect", "Workshop 2%\nto 4% lower\nbase freight"),
        ],
        [
            "Organized fleets recover asset GST that RCM carriers cannot.",
            "Lower net cost floor can pass into trip quotes.",
            "Shipper ITC still depends on clean GSTR-2B matching.",
        ],
        "Taxonomy: CARRIER ASSET RECOVERY. Workshop illustration only.",
        "gta-gst-carrier-asset-recovery.png",
    )
    formula_card(
        "Section 50 / 122 misclassification exposure",
        "Exposure = Unpaid RCM + (Unpaid x 18% p.a. x days / 365) + Section 122 penalty framing",
        [
            ("Unpaid RCM", "Cash not\ndischarged in\nGSTR-3B"),
            ("Interest", "Section 50\n18% p.a.\norientation"),
            ("Penalty", "Sec 122:\nRs 10,000 or\ntax amount"),
            ("Root cause", "Wrong GTA\ntag or missing\nnote / text"),
        ],
        [
            "Late RCM cash creates interest before any penalty debate.",
            "Missing consignment notes and endorsements start the fight.",
            "Confirm bare Act text with counsel before a demand reply.",
        ],
        "Taxonomy: STATUTORY NON-COMPLIANCE COST. Not a penalty computation.",
        "gta-gst-section50-exposure.png",
    )
    process_card()
    decision_tree_card()
    print("gta gst boards written")


if __name__ == "__main__":
    main()
