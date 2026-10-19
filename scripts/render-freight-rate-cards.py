"""Draw freight-rate formula, process, and waterfall boards, then stamp once.

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


def title_block(draw, title: str, tag: str) -> None:
    center_text(draw, title, px(28), font(46))
    draw.line((px(560), px(96), px(976), px(96)), fill=TEAL, width=px(8))
    tag_f = font(22)
    tw = text_width(draw, tag, tag_f)
    x = (W - tw) // 2
    draw.rounded_rectangle((x - px(18), px(112), x + tw + px(18), px(156)), radius=px(16), fill=TEAL)
    draw.text((x, px(118)), tag, font=tag_f, fill=WHITE)


def formula_bar(draw, text: str, y: int, h: int = 120) -> None:
    draw.rounded_rectangle((px(48), y, W - px(48), y + px(h)), radius=px(18), fill=NAVY)
    fnt = font(32)
    draw.text(((W - text_width(draw, text, fnt)) // 2, y + px(36)), text, font=fnt, fill=WHITE)


def tile(draw, box, head: str, body: str) -> None:
    x0, y0, x1, y1 = box
    draw.rounded_rectangle(box, radius=px(16), fill=TEAL, outline=NAVY, width=px(4))
    draw.rounded_rectangle((x0 + px(4), y0 + px(64), x1 - px(4), y1 - px(4)), radius=px(12), fill=WHITE)
    head_f = font(22)
    draw.text((x0 + (x1 - x0 - text_width(draw, head, head_f)) // 2, y0 + px(16)), head, font=head_f, fill=WHITE)
    draw.multiline_text((x0 + px(22), y0 + px(84)), body, font=font(26), fill=NAVY, spacing=px(8))


def pill(draw, text: str, y: int) -> None:
    fnt = font(26)
    tw = text_width(draw, text, fnt)
    x = (W - tw) // 2
    draw.rounded_rectangle((x - px(22), y, x + tw + px(22), y + px(64)), radius=px(18), fill=AMBER)
    draw.text((x, y + px(14)), text, font=fnt, fill=WHITE)


def fuel_card() -> None:
    img, draw = new_canvas()
    title_block(draw, "Commercial fuel burn per kilometre", "VARIABLE RUNNING COST")
    formula_bar(draw, "Fuel Rs/km  =  diesel Rs/L  /  loaded km per litre", px(180))
    gap = px(24)
    left = px(48)
    tw = (W - left * 2 - gap) // 2
    top = px(340)
    th = px(280)
    tile(draw, (left, top, left + tw, top + th), "Delhi, 19 Oct 2026", "Rs 95.20 / L\n3.0 km per litre\n= Rs 31.73 per km")
    tile(
        draw,
        (left + tw + gap, top, left + tw + gap + tw, top + th),
        "Hyderabad, same day",
        "Rs 104.23 / L\n3.0 km per litre\n= Rs 34.74 per km",
    )
    pill(draw, "+Rs 3.01/km  (+9.5%)  state-tax drag, same engine", px(660))
    draw.text((px(48), px(920)), "Workshop mileage. City prints for 19 Oct 2026. Re-read the pump table on bill day.", font=font(24), fill=NAVY)
    save_and_stamp(img, "freight-formula-fuel.png")


def adblue_card() -> None:
    img, draw = new_canvas()
    title_block(draw, "AdBlue litres beside the diesel", "DEF, NOT A FUEL CLAUSE")
    formula_bar(draw, "DEF L/km  =  0.036  x  (1 / loaded km per litre)", px(180))
    gap = px(24)
    left = px(48)
    tw = (W - left * 2 - gap) // 2
    top = px(340)
    th = px(280)
    tile(draw, (left, top, left + tw, top + th), "Bulk tote, Rs 40 / L", "3.0 km per litre\n0.012 L of DEF per km\n= Rs 0.48 per km")
    tile(draw, (left + tw + gap, top, W - px(48), top + th), "Pump retail band", "Rs 55 to Rs 70 per litre\n= Rs 0.66 to Rs 0.84 per km\nSame 3.6% of diesel volume")
    pill(draw, "DEF stays off the diesel surcharge line", px(660))
    draw.text((px(48), px(920)), "Workshop. 3.2% to 4.0% of diesel volume on a BS-VI SCR engine. Not a national AdBlue index.", font=font(24), fill=NAVY)
    save_and_stamp(img, "freight-formula-adblue.png")


def tyre_card() -> None:
    img, draw = new_canvas()
    title_block(draw, "Tyre lifecycle, amortised per kilometre", "CONSUMABLE ASSET WEAR")
    formula_bar(draw, "20 positions  x  (Rs 22,000  +  2 x Rs 6,000)  /  200,000 km", px(180), 130)
    tile(
        draw,
        (px(48), px(360), W - px(48), px(620)),
        "Life model",
        "100,000 km on the new casing.\nTwo precured cold retreads at 50,000 km each.\nRs 6,80,000 across 20 positions, over 200,000 km.",
    )
    formula_bar(draw, "Rs 3.40 per km", px(660), 110)
    draw.text((px(48), px(920)), "Workshop tyre and retread prices. Ask for the fleet casing file before you lock this.", font=font(24), fill=NAVY)
    save_and_stamp(img, "freight-formula-tyre.png")


def fixed_card() -> None:
    img, draw = new_canvas()
    title_block(draw, "Standing cost dilutes only if the truck runs", "FIXED STANDING OVERHEAD")
    formula_bar(draw, "Rs per km  =  Rs 1,24,925 monthly pool  /  km actually run", px(180))
    gap = px(24)
    left = px(48)
    tw = (W - left * 2 - gap) // 2
    top = px(340)
    th = px(260)
    tile(draw, (left, top, left + tw, top + th), "9,500 km in the month", "Rs 1,24,925 / 9,500\n= Rs 13.15 per km")
    tile(draw, (left + tw + gap, top, W - px(48), top + th), "6,000 km after a bad gate", "Rs 1,24,925 / 6,000\n= Rs 20.82 per km")
    pill(draw, "A 48-hour gate adds Rs 7.67 per running km", px(640))
    draw.text((px(48), px(920)), "Pool is EMI Rs 85,000, compliance Rs 16,925, base crew Rs 23,000. Bhatta is not in it.", font=font(24), fill=NAVY)
    save_and_stamp(img, "freight-formula-fixed.png")


def backhaul_card() -> None:
    img, draw = new_canvas()
    title_block(draw, "Corridor backhaul multiplier", "TRADE IMBALANCE COEFFICIENT")
    formula_bar(draw, "beta  =  1  +  (empty probability  x  alpha)", px(176), 100)
    draw.text(
        (px(48), px(300)),
        "Pricing adjustment, not a measured empty-leg invoice. Alpha is an assumed 0.40 to 0.70.",
        font=font(24),
        fill=NAVY,
    )
    rows = [
        ("Balanced trunk, Delhi to Mumbai", 1.05, TEAL),
        ("Industrial headhaul, partial reload", 1.30, BLUE),
        ("Deficit, toward Guwahati or Kerala", 1.63, AMBER),
    ]
    y = px(360)
    label_f = font(26)
    val_f = font(28)
    bar_left = px(860)
    bar_max = px(420)
    for label, value, color in rows:
        draw.rounded_rectangle((px(48), y, W - px(48), y + px(120)), radius=px(16), outline=NAVY, width=px(3), fill=WHITE)
        draw.text((px(72), y + px(40)), label, font=label_f, fill=NAVY)
        draw.rounded_rectangle((bar_left, y + px(44), bar_left + bar_max, y + px(78)), radius=px(8), fill=TRACK)
        bw = max(px(24), int(bar_max * (value - 1) / 0.70))
        draw.rounded_rectangle((bar_left, y + px(44), bar_left + bw, y + px(78)), radius=px(8), fill=color)
        draw.text((bar_left + bar_max + px(16), y + px(38)), f"{value:.2f}", font=val_f, fill=NAVY)
        y += px(140)
    draw.text((px(48), px(920)), "Illustrative pricing factors. This article uses 1.05 for Jamshedpur to Pune, not 1.30.", font=font(24), fill=NAVY)
    save_and_stamp(img, "freight-formula-backhaul.png")


def engine_card() -> None:
    img, draw = new_canvas()
    title_block(draw, "Industrial rate engine, one trip", "NET CONTRACT VALUATION")
    chips = [
        ("Variable run", "Rs 69,693.80", BLUE),
        ("Wear and spares", "Rs 9,796.00", TEAL),
        ("Fixed standing", "Rs 20,777.00", AMBER),
    ]
    gap = px(20)
    left = px(48)
    tw = (W - left * 2 - gap * 2) // 3
    top = px(180)
    for i, (head, body, color) in enumerate(chips):
        x0 = left + i * (tw + gap)
        draw.rounded_rectangle((x0, top, x0 + tw, top + px(150)), radius=px(16), fill=color)
        hf = font(22)
        bf = font(28)
        draw.text((x0 + (tw - text_width(draw, head, hf)) // 2, top + px(28)), head, font=hf, fill=WHITE)
        draw.text((x0 + (tw - text_width(draw, body, bf)) // 2, top + px(78)), body, font=bf, fill=WHITE)
    lines = [
        "Subtotal   Rs 1,00,266.80",
        "x  1.12 markup on cost   =   Rs 1,12,298.82",
        "x  1.05 pricing adjustment   =   Rs 1,17,913.76",
    ]
    y = px(370)
    draw.rounded_rectangle((px(48), y, W - px(48), y + px(280)), radius=px(18), fill=NAVY)
    yy = y + px(36)
    for line in lines:
        draw.text((px(80), yy), line, font=font(32), fill=WHITE)
        yy += px(72)
    formula_bar(draw, "Rs 1,17,914 benchmark trip on 1,580 km, Jamshedpur to Pune", px(690), 120)
    draw.text((px(48), px(920)), "Workshop. Within Rs 86 of Transporter A's Rs 1,18,000 lump sum. Not a national index.", font=font(24), fill=NAVY)
    save_and_stamp(img, "freight-formula-engine.png")


def arrow_right(draw, x, y) -> None:
    draw.polygon([(x, y - px(10)), (x + px(18), y), (x, y + px(10))], fill=TEAL)


def arrow_left(draw, x, y) -> None:
    draw.polygon([(x + px(18), y - px(10)), (x, y), (x + px(18), y + px(10))], fill=TEAL)


def arrow_down(draw, x, y) -> None:
    draw.polygon([(x - px(10), y), (x + px(10), y), (x, y + px(18))], fill=TEAL)


def process_card() -> None:
    img, draw = new_canvas()
    center_text(draw, "Eight steps before anyone is ranked L1", px(24), font(42))
    draw.line((px(520), px(88), px(1016), px(88)), fill=TEAL, width=px(8))
    steps = [
        ("01", "Base fuel index", "One city. One date.\nAttach the print."),
        ("02", "Toll inclusions", "Named plaza list,\nor FASTag actuals."),
        ("03", "Detention windows", "One free-time clock.\nAdd your gate history."),
        ("04", "Handling and lashing", "A schedule.\nNot 'as applicable'."),
        ("05", "Transit SLAs", "Locked route\nand a time cap."),
        ("06", "Weight tolerance", "0.2% to 0.3%.\nNot the 5% GVW band."),
        ("07", "Working capital", "Gross up to the day\naccounts payable pays."),
        ("08", "Net landed cost", "Trip rupees\ndivided by tonnes."),
    ]
    # Snake: row 1 is 01-04 left to right. Row 2 is 08, 07, 06, 05 left to right.
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
        draw.rounded_rectangle((x0 + px(4), y0 + px(72), x0 + tw - px(4), y0 + th - px(4)), radius=px(12), fill=WHITE)
        draw.text((x0 + px(16), y0 + px(18)), num, font=num_f, fill=WHITE)
        draw.text((x0 + px(78), y0 + px(22)), head, font=head_f, fill=WHITE)
        draw.multiline_text((x0 + px(18), y0 + px(96)), body, font=body_f, fill=NAVY, spacing=px(6))
    # Arrows in the gaps, row 1 pointing right.
    def body_mid(box) -> int:
        return box[1] + px(72) + (box[3] - box[1] - px(72)) // 2

    for col in range(3):
        x1 = boxes[col][2]
        arrow_right(draw, x1 + (gap_x - px(18)) // 2, body_mid(boxes[col]))
    # Down from step 04 into step 05, in the gap under the right-hand card.
    xmid = (boxes[3][0] + boxes[3][2]) // 2
    arrow_down(draw, xmid, boxes[3][3] + (gap_y - px(18)) // 2)
    for col in range(3):
        x1 = boxes[4 + col][2]
        arrow_left(draw, x1 + (gap_x - px(18)) // 2, body_mid(boxes[4 + col]))
    draw.text((px(36), px(900)), "Rank net landed cost per tonne. The list under this board is the full rule.", font=font(24), fill=NAVY)
    save_and_stamp(img, "freight-normalise-flow.png")


def waterfall_card() -> None:
    img, draw = new_canvas()
    draw.rectangle((0, 0, W, px(148)), fill=NAVY)
    center_text(draw, "Unmasking the L1 bid", px(28), font(46), WHITE)
    draw.line((px(620), px(92), px(916), px(92)), fill=TEAL, width=px(8))
    center_text(draw, "Jamshedpur to Pune workshop. 34 MT. 1,580 km.", px(104), font(22), (186, 230, 232, 255))

    # (label, note, start, end, fill). Floating adds sit on the running total.
    rows = [
        ("B headline", "Rs 2,950 x 34 MT", 0, 100300, BLUE),
        ("+ tolls", "Rs 13,272", 100300, 113572, (194, 65, 12, 255)),
        ("+ handling", "Rs 3,400", 113572, 116972, AMBER),
        ("+ detention", "Rs 20,000", 116972, 136972, (146, 64, 14, 255)),
        ("+ credit", "Rs 2,307 at 16%", 136972, 139279, (180, 83, 9, 255)),
        ("B landed cost", "After the email extras", 0, 139279, (8, 47, 92, 255)),
        ("A normalised", "Lump sum plus credit", 0, 119552, TEAL),
    ]
    scale_max = 150000
    y = px(168)
    row_h = px(92)
    bar_left = px(520)
    bar_max = px(640)
    label_f = font(24)
    note_f = font(18)
    for label, note, start, end, color in rows:
        draw.rounded_rectangle((px(36), y, W - px(36), y + row_h), radius=px(16), fill=color)
        draw.text((px(56), y + px(16)), label, font=label_f, fill=WHITE)
        draw.text((px(56), y + px(50)), note, font=note_f, fill=(255, 255, 255, 230))
        track_y0 = y + px(28)
        track_y1 = y + px(64)
        draw.rounded_rectangle((bar_left, track_y0, bar_left + bar_max, track_y1), radius=px(8), fill=(0, 0, 0, 80))
        x0 = bar_left + int(bar_max * start / scale_max)
        x1 = bar_left + int(bar_max * end / scale_max)
        if x1 - x0 < px(18):
            x1 = x0 + px(18)
        gold = (255, 214, 102, 255)
        if start > 0:
            draw.rounded_rectangle((bar_left, track_y0, x0, track_y1), radius=px(8), fill=(255, 255, 255, 70))
            draw.rectangle((x0, track_y0, x1, track_y1), fill=gold)
        else:
            draw.rounded_rectangle((bar_left, track_y0, x1, track_y1), radius=px(8), fill=gold)
        amount = f"Rs {end:,}"
        val_f = font(22)
        draw.text((bar_left + bar_max + px(18), y + px(30)), amount, font=val_f, fill=WHITE)
        y += row_h + px(8)

    tiles = [
        ("A landed", "Rs 1,19,552", TEAL),
        ("B landed", "Rs 1,39,279", (8, 47, 92, 255)),
        ("A is under B", "Rs 19,727  ·  14.2%", (194, 65, 12, 255)),
    ]
    gap = px(16)
    left = px(36)
    tile_w = (px(1280) - left - gap * 2) // 3
    top = y + px(12)
    for index, (head, body, color) in enumerate(tiles):
        x0 = left + index * (tile_w + gap)
        draw.rounded_rectangle((x0, top, x0 + tile_w, top + px(118)), radius=px(16), fill=color)
        draw.text((x0 + px(18), top + px(16)), head, font=font(18), fill=(255, 255, 255, 230))
        draw.text((x0 + px(18), top + px(52)), body, font=font(26), fill=WHITE)
    save_and_stamp(img, "freight-bid-waterfall.png")


def main() -> None:
    fuel_card()
    adblue_card()
    tyre_card()
    fixed_card()
    backhaul_card()
    engine_card()
    process_card()
    waterfall_card()
    print("freight boards written")


if __name__ == "__main__":
    main()
