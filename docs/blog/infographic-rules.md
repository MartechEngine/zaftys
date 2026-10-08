# Blog infographic rules

Use this for every future ZAFTYS blog. The diesel-clause cards and the earlier TMS formula boards are the reference.

## Two systems, do not mix them up

**On-page charts** live in `src/components/blog/BlogExhibits.tsx` and are wired from `src/lib/blog-exhibits-*.ts`. Use them for donuts, bars, tables, callouts, timelines, and step lists. They are HTML, so they stay sharp and the type matches the site.

**Formula and process boards** are PNG files in `public/images/blog/`. Use them when the reader needs one equation, one worked rupee example, or a short process on a single card. Do not paste a screenshot of a chart into a PNG. Do not draw a fake Z on the art.

## On-page charts

- A donut is one pie. The slices must add to 100 and share one denominator. If the figures are different pies (42% of road cost, 50% of operating cost, 65% of running cost), draw bars, not a donut.
- Label every number as a published source or a workshop. Do not invent a corridor rate or a ZAFTYS national index.
- Compare tables in the UI show three columns only (label, left, right). A wider table must be a plain table, not `variant: "compare"`.
- No em dash or en dash in captions, labels, or source lines. Use a spaced hyphen.
- Hero photos are separate from these charts. A hero is a photograph. A formula is a board.

## PNG boards

Draw a clean export with no logo, then stamp once.

1. Canvas **3072 x 2048** (twice 1536 x 1024) so the type stays sharp in the blog column.
2. Font: **Segoe UI Bold** (`C:/Windows/Fonts/segoeuib.ttf`). Do not use the regular weight. Body type is bold navy, not grey.
3. Colours, used the same way on every board:
   - Background `#FFFFFF`
   - Navy `#0B1C36` for titles, formula bars, result bars, and body type
   - Teal `#0B7F8A` for the title underline and tile headers
   - White type on navy and on teal
   - Extra series only when a chart needs them: blue `#1E4D8C`, amber `#B45309`
   - Bar tracks `#E2E8F0`, with the value in navy **beside** the bar, never on top of a dark fill
4. Layout:
   - Title, then a short teal underline
   - Formula in a full-width navy bar, white type, large enough to read without squinting
   - Tiles: teal header, white body, navy border, navy body type
   - Worked result in a second navy bar, white type
   - Caption left-aligned along the bottom, short enough that it does not run under the logo
5. Stamp `src/assets/logo-footer.png` with `scripts/stamp-blog-logo.py` after the clean export. The mark sits bottom-right at about 7% of the width. **Do not stamp a file that already has the logo.** A second pass stacks a second mark.
6. The diesel renderer `scripts/render-diesel-formula-cards.py` saves the clean PNG and stamps once. Copy that order for the next post. Re-running that script is safe because it redraws from scratch before the stamp.
7. Numbers on the board must match the article exactly, including the workshop label. If the article says Rs 1,131, the board says Rs 1,131.

## Process boards

The six-step diesel board is the pattern. Do not repeat the tall empty columns.

- Six steps are **two rows of three**, not one row of thin towers.
- Each card has a navy header (number and title in white) and a white body with one or two lines of navy type. No large empty well under the title.
- Arrows, if you add them, sit in the gap between cards. They must not cover type or headers.
- If a label does not fit inside the card with padding, shorten the label. Do not let it spill.

## File and exhibit

- PNG, not JPEG, for boards. JPEG softens the type.
- `kind: "image"` in the exhibit file, with a caption and a source line that names the print or the workshop.
- Alt text states the formula or the process, not "infographic".
- One board per idea. The same Delhi move should not be redrawn three times with different wrong totals.
