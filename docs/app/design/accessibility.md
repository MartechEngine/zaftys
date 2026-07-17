# Accessibility — TSM Portal

| Target | WCAG 2.1 Level AA |

---

## Color & contrast

- Status chips: minimum 4.5:1 contrast for text
- Never convey status by color alone — include icon + text label
- Orange accent on white: verify contrast for small text

---

## Keyboard

- All interactive elements focusable with visible focus ring
- Sidebar: arrow keys between items (P2)
- `⌘K` / `Ctrl+K` global search (P2)
- Live map: `/` focus search, `Esc` close panel
- Modal trap focus; `Esc` closes drawer

---

## Screen readers

- Live region for ETA updates on client tracking page
- Table: row headers associated with cells
- Map: textual fallback list of active vehicles adjacent to map
- Status changes announced via `aria-live="polite"`

---

## Motion

- Respect `prefers-reduced-motion`: disable pulsing timeline dot
- No auto-playing carousels in ops UI

---

## Forms

- Explicit `<label>` for all inputs
- Errors linked via `aria-describedby`
- Required fields marked visually and in aria

---

## Testing checklist

- [ ] axe scan on MVP screens
- [ ] Keyboard-only pass on dispatch assign flow
- [ ] VoiceOver / NVDA on shipment detail + track page
- [ ] 200% zoom usable on client tracking

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial a11y spec |
