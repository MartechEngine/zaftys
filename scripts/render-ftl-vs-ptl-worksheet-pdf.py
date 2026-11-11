"""One-page FTL vs PTL break-even worksheet PDF for /public/downloads/."""
from pathlib import Path

from fpdf import FPDF

OUT = (
    Path(__file__).resolve().parents[1]
    / "public"
    / "downloads"
    / "ftl-vs-ptl-break-even-worksheet.pdf"
)


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FPDF(format="A4", unit="mm")
    pdf.set_auto_page_break(auto=True, margin=12)
    pdf.add_page()
    pdf.set_left_margin(14)
    pdf.set_right_margin(14)
    pdf.set_x(14)

    def heading(text: str, size: int = 13) -> None:
        pdf.set_x(14)
        pdf.set_font("Helvetica", "B", size)
        pdf.set_text_color(11, 28, 54)
        pdf.multi_cell(w=0, h=6, text=text)
        pdf.ln(1)

    def body(text: str, size: int = 9) -> None:
        pdf.set_x(14)
        pdf.set_font("Helvetica", "", size)
        pdf.set_text_color(30, 40, 55)
        pdf.multi_cell(w=0, h=4.4, text=text)
        pdf.ln(0.4)

    def bullet(text: str) -> None:
        pdf.set_x(14)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(30, 40, 55)
        pdf.multi_cell(w=0, h=4.4, text=f"- {text}")

    heading("ZAFTYS | FTL vs PTL break-even worksheet (1 page)")
    body(
        "Workshop aid for Indian industrial freight. Not a rate quote. "
        "Confirm carrier tariff annex and size the smallest suitable truck first.",
        size=8,
    )
    pdf.ln(1)

    heading("Lane inputs (fill before maths)", 11)
    for item in [
        "Origin / destination / approx km: ______________________________",
        "Cargo: actual kg _______  cube (CBM or CFT) _______  fragility Y/N",
        "Smallest body that fits weight AND cube: _______  payload T _______",
        "Fill of that truck (weight or cube, higher): ~1/3  |  1/2-2/3  |  >3/4",
        "Lane type: dense trunk  |  thin destination town  |  multi-drop",
    ]:
        bullet(item)
    pdf.ln(1)

    heading("PTL landed stack", 11)
    for item in [
        "Chargeable kg (max of actual, volumetric): _______",
        "Base Rs/kg _______  + docket _______  + FOV _______  + ODA _______",
        "+ hamali _______  + crating _______  + damage scrap allowance _______",
        "+ inventory drag (extra days x invoice x WACC/365): _______",
        "PTL landed total Rs: _______",
    ]:
        bullet(item)
    pdf.ln(1)

    heading("FTL landed stack", 11)
    for item in [
        "Dedicated trip rate for that body/lane Rs: _______",
        "+ dock handling / detention if any: _______",
        "FTL landed total Rs: _______",
    ]:
        bullet(item)
    pdf.ln(1)

    heading("Decision checks", 11)
    for item in [
        "Under ~1/3 truck and non-fragile -> lean PTL / LTL / sundry.",
        "Half to ~2/3 -> quote both modes on this same lane.",
        "Above ~3/4 or ~3.5-6.0 T industrial band -> lean dedicated FTL.",
        "Avoid: half-empty FTL without consolidation; splitting one load into many PTL dockets.",
        "Next step: WhatsApp origin, destination, weekly tonnes to ZAFTYS dedicated fleet desk.",
    ]:
        bullet(item)

    pdf.ln(2)
    body(
        "zaftys.com/blog/ftl-vs-ptl-freight-services-india-cost-break-even-guide",
        size=8,
    )
    body("Contact: info@zaftys.com | WhatsApp +91-927-092-3581", size=8)

    pdf.output(str(OUT))
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
