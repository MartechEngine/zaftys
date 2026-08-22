"""Stamp small ZAFTYS footer logo on blog diagram assets (bottom-right).

Run only on clean exports — re-running on already-stamped files stacks logos.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "src" / "assets" / "logo-footer.png"
BLOG = ROOT / "public" / "images" / "blog"
TARGETS = [
    "tms-five-stage-stack.png",
    "tms-formula-fuel-escalation.png",
    "tms-formula-detention.png",
    "tms-formula-eway-validity.png",
    "tms-formula-shortage.png",
    "industrial-tms-control-stack-india.jpg",
]


def stamp(path: Path, logo: Image.Image) -> None:
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    target_w = max(72, min(140, int(w * 0.07)))
    scale = target_w / logo.width
    target_h = max(1, int(logo.height * scale))
    mark = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    alpha = mark.split()[-1].point(lambda a: int(a * 0.92))
    mark.putalpha(alpha)
    margin = max(16, int(w * 0.018))
    x = w - mark.width - margin
    y = h - mark.height - margin
    out = img.copy()
    out.alpha_composite(mark, (x, y))
    if path.suffix.lower() in {".jpg", ".jpeg"}:
        rgb = Image.new("RGB", out.size, (255, 255, 255))
        rgb.paste(out, mask=out.split()[-1])
        rgb.save(path, "JPEG", quality=90, optimize=True)
    else:
        out.save(path, "PNG", optimize=True)
    print(f"{path.name}: {w}x{h} logo={mark.size} at ({x},{y})")


def main() -> None:
    logo = Image.open(LOGO).convert("RGBA")
    for name in TARGETS:
        path = BLOG / name
        if not path.exists():
            raise SystemExit(f"missing: {path}")
        stamp(path, logo)
    print("done")


if __name__ == "__main__":
    main()
