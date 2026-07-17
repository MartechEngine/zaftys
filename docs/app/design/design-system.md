# Design System — TSM Portal

| Field | Value |
|-------|-------|
| **Source tokens** | `src/index.css` (marketing site) |
| **Parent** | [ui-ux-features.md](../ui-ux-features.md) |

Portal must feel like `zaftys.com`. Copy tokens — do not fork a second palette.

---

## Colors (HSL)

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` / `--navy` | `220 60% 15%` | Sidebar, headings, map chrome |
| `--accent` | `25 100% 55%` | Primary CTAs, exceptions, alerts |
| `--secondary` | `215 25% 40%` | Secondary text, labels |
| `--success` | `145 80% 40%` | Delivered, valid docs |
| `--cyan` | `190 95% 40%` | Map highlights (sparingly) |
| `--yellow` | `45 100% 55%` | At plant, weighbridge |
| `--destructive` | `0 84% 60%` | Cancelled, errors |
| `--muted` | `210 20% 96%` | Page sections, table zebra |
| `--border` | `214 20% 90%` | Cards, inputs |

---

## Typography

| Use | Class | Font |
|-----|-------|------|
| Page titles | `font-heading font-bold text-navy` | Heading family (marketing) |
| Section titles | `text-xl font-heading font-bold` | |
| Body | `text-foreground` | Sans |
| Secondary | `text-muted-foreground text-sm` | |
| Data / IDs | `font-mono text-sm` | Monospace for shipment IDs |

---

## Spacing & layout

| Element | Spec |
|---------|------|
| Sidebar width | 240px expanded / 64px collapsed |
| Content max-width | Full fluid; detail pages use 2-col grid |
| Card padding | `p-6` (24px) |
| Section gap | `gap-6` / `gap-8` |
| Border radius | `--radius: 0.5rem` |

---

## Buttons

| Variant | Use |
|---------|-----|
| Primary (accent/orange) | Assign, Save, Create |
| Navy outline | Secondary actions |
| Ghost | Tertiary, table actions |
| Destructive | Cancel shipment, delete doc |

---

## Shadows

| Token | Use |
|-------|------|
| `--shadow-soft` | Cards |
| `--shadow-medium` | Dropdowns, drawers |
| `--shadow-accent` | Primary CTA emphasis |

---

## Logo

- Header: same asset as marketing (`logo-header.png`)
- Login panel: centered, links to `zaftys.com`
- Track page: logo only, no sidebar

---

## Dark mode

Deferred to Phase 2. Define token overrides in `index.css` when added.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial design system |
