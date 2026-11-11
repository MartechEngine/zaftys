"""One-page transit damage claim checklist PDF for /public/downloads/."""
from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "public" / "downloads" / "transit-damage-claim-checklist.pdf"


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

    heading("ZAFTYS | Transit damage claim checklist (1 page)")
    body(
        "Workshop aid for Indian industrial FTL. Not legal or insurance advice. "
        "Confirm statute and policy schedule before a demand letter.",
        size=8,
    )
    pdf.ln(1)

    heading("Receiving dock (next hour)", 11)
    for item in [
        "Halt unload on visible damage, torn tarp, or broken seal.",
        "Photo registration plate, tarp, seal numbers, and cargo in place (geo-tagged).",
        "Refuse a clean lorry receipt (bilty) stamp.",
        "Write qualified remarks: crate counts, wet marks, seal breaks, weighbridge figures.",
        "Call transporter branch; start joint survey and insurer written notice.",
    ]:
        bullet(item)
    pdf.ln(1)

    heading("24-hour clock", 11)
    for item in [
        "0h: Gate-in discovery - inspect seals/tarps/body; do not open blindly if compromised.",
        "2h: Digital evidence in TMS/ePOD, not only a chat album.",
        "4h: Written intimation to booking + delivery branches and marine claims desk.",
        "12h: Joint survey with IRDAI surveyor and transporter representation where possible.",
        "24h: Joint inspection record, qualified LR, damage/shortage certificate on file.",
    ]:
        bullet(item)
    pdf.ln(1)

    heading("Procurement / risk (before next booking)", 11)
    for item in [
        "Book a registered common carrier under Carriage by Road Act, 2007.",
        "Declare value on Form 7; avoid the Rule 12 ten-times-freight trap.",
        "Write commodity-specific weighbridge shortage tolerance in the MSA.",
        "Ban subrogation waivers that kill marine recovery.",
        "Score the 20-point cargo protection audit with finance and dispatch.",
    ]:
        bullet(item)
    pdf.ln(1)

    heading("Documents surveyors ask for", 11)
    for item in [
        "Goods forwarding note / Form 7 and goods receipt / LR copies",
        "Stamped weighbridge slips (kanta parchi) at both ends",
        "Geo photos, joint inspection record (panchnama)",
        "Carrier damage or shortage certificate",
        "Insurer intimation and policy declaration references",
    ]:
        bullet(item)

    pdf.ln(2)
    body(
        "zaftys.com/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide",
        size=8,
    )
    body("Contact: info@zaftys.com | WhatsApp +91-927-092-3581", size=8)

    pdf.output(str(OUT))
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
