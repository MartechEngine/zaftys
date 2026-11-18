"""Draw indent/OTIF formula, process, and waterfall boards, then stamp once.

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
    formula_f = font(22)
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
    yf = px(140) if len(lines) == 1 else px(122)
    for line in lines:
        fw = text_width(draw, line, formula_f)
        draw.text(((W - fw) // 2, yf), line, font=formula_f, fill=WHITE)
        yf += px(36)

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
    center_text(draw, "Automated indent waterfall lifecycle", px(24), font(40))
    draw.line((px(420), px(88), px(1116), px(88)), fill=TEAL, width=px(8))
    steps = [
        ("01", "ERP sync", "Orders + net\nweight sizing."),
        ("02", "L1 window", "2-hour digital\naccept / reject."),
        ("03", "L2 cascade", "Auto reallocate\non L1 timeout."),
        ("04", "TranZfort", "Open push for\nunplaced loads."),
        ("05", "Driver book", "Verified trucker\nin-app accept."),
        ("06", "Vahan gate", "RC / DL checks\nat slot staging."),
        ("07", "Weigh out", "Weighbridge +\nLR (bilty)\n/ gate-out."),
        ("08", "Scorecard", "Daily OTIF log\nand quota signal."),
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
        "Discover shortfalls by 11:30 AM. Do not wait for 4:00 PM packing-bay panic.",
        font=font(24),
        fill=NAVY,
    )
    save_and_stamp(img, "indent-otif-8-step-lifecycle.png")


def waterfall_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "True cost of a 10-truck placement failure", px(18), font(38))
    draw.line((px(360), px(84), px(1176), px(84)), fill=TEAL, width=px(8))
    center_text(
        draw,
        "Jamshedpur workshop. Month-end. 10 trailers missing by 3:00 PM.",
        px(100),
        font(24),
        fill=TEAL,
    )

    rows = [
        ("Manual spot premiums", "Emergency +22% on sourced trucks", 0, 120000, AMBER),
        ("Packing line downtime", "8 hours x plant opex framing", 120000, 148000, AMBER),
        ("Customer LD penalty", "Adds Rs 1,50,000", 148000, 298000, AMBER),
        ("Manual scramble total", "Unorganized Approach A", 0, 298000, NAVY),
        ("Automated cascade total", "TMS + TranZfort Approach B", 0, 18400, TEAL),
    ]
    scale_max = 320000
    y = px(155)
    row_h = px(115)
    bar_left = px(560)
    bar_max = px(520)
    label_f = font(24)
    note_f = font(20)
    val_f = font(24)
    for label, note, start, end, color in rows:
        draw.rounded_rectangle(
            (px(36), y, W - px(36), y + row_h),
            radius=px(14),
            outline=NAVY,
            width=px(3),
            fill=WHITE,
        )
        draw.text((px(56), y + px(18)), label, font=label_f, fill=NAVY)
        draw.text((px(56), y + px(62)), note, font=note_f, fill=color if start > 0 else NAVY)
        track_y0 = y + px(40)
        track_y1 = y + px(74)
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
            (bar_left + bar_max + px(16), y + px(40)),
            f"Rs {end:,}",
            font=val_f,
            fill=NAVY,
        )
        y += row_h + px(10)

    draw.text(
        (px(40), px(920)),
        "Approach A ~Rs 2,98,000 vs Approach B ~Rs 18,400 recoverable. Workshop only.",
        font=font(22),
        fill=NAVY,
    )
    save_and_stamp(img, "indent-otif-10-truck-waterfall.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    formula_card(
        "Compound industrial OTIF equation",
        "OTIF% = (N_on_time_placed ∩ N_in_full_payload ∩ N_on_time_delivered) / N_total_indented x 100",
        [
            ("OTP", "Gate-in inside\nassigned\nslot window"),
            ("IFA", "Correct body,\npayload class,\ncompliance"),
            ("OTD", "Consignee gate\ninside transit\nSLA"),
            ("Myth", "90% placement\ncan hide\n~64% OTIF"),
        ],
        [
            "Placement alone is a vanity metric.",
            "Score the intersection - not three separate brag sheets.",
            "Use weighbridge and ePOD timestamps, not WhatsApp.",
        ],
        "Taxonomy: VENDOR SLA MEASUREMENT. Workshop definition.",
        "indent-otif-compound-equation.png",
    )
    formula_card(
        "Risk-purchase differential debit",
        "Debit = (Rate_spot_emergency - Rate_contracted_L1) + Demurrage_consequential",
        [
            ("Spot rate", "Emergency\nreplacement\nfreight"),
            ("Contract", "L1 tender\nrate on the\nsame lane"),
            ("Delta", "Positive\ndifference\ndebited"),
            ("Statute", "Section 73\nContract Act\norientation"),
        ],
        [
            "Static Rs 1,000 penalties lose to Rs 4,000 spot diversion.",
            "Risk-purchase makes non-placement expensive on the ledger.",
            "Pair with automatic detention credits for plant delays.",
        ],
        "Taxonomy: LEGAL PENALTY CALCULATION. Confirm with counsel.",
        "indent-otif-risk-purchase-debit.png",
    )
    formula_card(
        "Net cost of indent placement failure",
        "Total failure cost = Spot premium + (Production hours lost x Hourly plant opex) + Customer LD",
        [
            ("Premium", "Emergency\nspot markup\non trucks"),
            ("Downtime", "Packing bay\nhours x opex"),
            ("LD", "Customer late\ndelivery\npenalties"),
            ("Contrast", "Rs 2.98L\nmanual vs\nRs 18.4k auto"),
        ],
        [
            "Jamshedpur workshop: 10 missing trailers on month-end day.",
            "Manual scramble socialises loss onto the P&L.",
            "Cascading + debit contains and recovers exposure.",
        ],
        "Taxonomy: DISPATCH DOWNTIME COST. Teaching ledger only.",
        "indent-otif-failure-cost.png",
    )
    process_card()
    waterfall_card()
    print("indent otif boards written")


if __name__ == "__main__":
    main()
