# Blog templates  -  Basics and Deep-researched

| Field | Value |
|-------|-------|
| **Templates** | **Basics Blog Template** (default) · **Deep-researched Blog Template** |
| **Project** | `zaftys-main` marketing site (`zaftys.com`) |
| **Branch** | `blogs-and-reports` |
| **Purpose** | Site-wide blog layout, visual density, and exhibit plan for `/blog/:slug` posts. |
| **Status** | Basics shipped. Deep-researched uses distinct research-dossier chrome (navy masthead, slate canvas, left chapter rail). |
| **Renderers** | Basics: `BlogPostLayout.tsx`. Deep: `DeepResearchBlogLayout.tsx`. Shared: `BlogExhibits.tsx`. |
| **Content model** | `src/lib/blog-data.ts` (`BlogPost.template`, exhibits, takeaways, KPIs, mid CTAs, references) |
| **Visual factory** | `C:\Users\Public\project\market-research-reports-agent` (`research_os.visualizations`) |
| **Related** | `docs/marketing/SEO&Blog.md`, reports-agent `docs/26-Brand-And-Report-Template.md` |
| **Last updated** | 17 August 2026 |

## Template comparison

| | Basics Blog Template | Deep-researched Blog Template |
|--|----------------------|-------------------------------|
| Field | `template` omitted or `"basics"` | `template: "deep-research"` |
| Job | Operator guides | Long-form market + ops analytics |
| Density | ~8 to 19 exhibits on dense guides | Exec KPI strip + ~15 to 25 exhibits |
| Page surface | White article canvas | Cool slate dossier canvas (`.deep-research-blog`) |
| Hero | White header + inset rounded hero | Full-bleed navy masthead + cover panel |
| KPIs | Optional simple chips | Overlapping white KPI band (cyan underlines) |
| Navigation | Right sticky flat TOC | Left sticky dossier chapter rail + active hash |
| Body | Flat H2 sections | White chapter panels with cyan left spine |
| Takeaways | Gray bordered box | Navy-header dossier strip (2-col) |
| Mid CTAs | Solid navy band | Light panel + cyan border + accent button |
| Exhibits | Light gray `FigureChrome` | Navy caption bar + cyan accent (via context) |
| References | Optional section bullets | Footnotes band with numbered mono list |
| Mid CTAs data | One `midCtaAfterHeading` | One or more `midCtas[]` (data-driven copy) |
| First deep post |  | `container-trucking-logistics-india` |

Deep posts stay blog articles (not PDF product pages). Steal report trust cues (navy masthead, KPIs, hierarchical TOC, citations), not MarketsandMarkets paywall chrome.

### Deep visual contract (do not drift toward Basics)

1. Always wrap in `.deep-research-blog` and use navy masthead + slate canvas.
2. Chapter rail stays on the **left** (Basics keeps TOC on the right).
3. Every H2 chapter is a white panel with cyan spine.
4. Mid-CTAs never reuse the Basics solid navy box.
5. Exhibit chrome must go through `DeepResearchExhibitProvider` so captions use the navy bar.

---

## 1. Why this file exists

This document defines the **Basics Blog Template**: the default page architecture for every ZAFTYS blog post.

Earlier blog posts looked empty and thin on wide screens: a single ~768px column, all-caps title, muted gray body, one hero photo, then heading / paragraph / bullets until FAQ. Related posts were text-only cards. There was no TOC, no rail, no in-body table, no figure, no chart.

We already generate institutional charts, donuts, tables, and infographics in the market-research reports agent (ZAFTYS tokens, SVG/PNG, Typst). The marketing blog does not consume any of that.

This document records:

1. What is wrong with the current layout.
2. The target page architecture (width, rail, rhythm).
3. What the reports agent can already emit.
4. How exhibits should land on the web (hybrid: HTML tables + static SVG).
5. Editorial rules (honesty, chart-type policy, density).
6. **Locked exhibit list for the TMS evaluation guide only.**
7. Implementation notes for `blogs-and-reports` (do not start other posts until this one ships).

Do not paste 200-page report density into an 18-minute article. Target **3 to 6 exhibits** as a site-wide cap; this first post is allowed **7** because it is a long buying guide with a real scorecard.

---

## 2. Current implementation (as of 16 Aug 2026)

### 2.1 Data model (`src/lib/blog-data.ts`)

```ts
export type BlogSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};
```

`BlogPost` also has: slug, titles, SEO fields, category, dates, author, summary, readMinutes, heroImage, relatedSlugs, faqs, cta.

There is **no** type for table, figure, KPI strip, callout, or chart.

### 2.2 Renderer (`src/components/blog/BlogPostLayout.tsx`)

- Entire article (breadcrumb through related posts) sits in `max-w-3xl`.
- Footer CTA band also `max-w-3xl`.
- Rich text: `[label](/path)` and `[label](https://...)` only.
- Sections: H2, paragraphs, optional disc list.
- FAQ cards, then related links, then navy "Next step" CTA.
- Hero: `ResponsiveImage`, 16:9, rounded, shadow.

### 2.3 Screenshot diagnosis (TMS evaluation post, localhost:5173)

- Large empty gutters left and right on desktop.
- Linear top-down read: meta → all-caps H1 → summary → one landscape photo.
- RESOURCES nav highlighted; WhatsApp FAB present.
- No sidebar, TOC, mid-article CTA, tables, or infographics.

Readable line length is not the enemy. **Missing chrome and missing exhibits** are. Widening body copy to 1400px would make paragraphs harder to read. The page should widen; the prose column should stay ~65–72 characters; exhibits may go ~960–1100px.

---

## 3. Basics Blog Template (site-wide default)

### 3.1 Widths

| Layer | Target | Notes |
|-------|--------|--------|
| Page shell | `max-w-6xl` or `max-w-7xl` | Kills empty gutters |
| Prose | ~65–72ch | Keep `max-w-3xl` *inside* the main column, or equivalent |
| Hero / tables / SVG | Full main column (~960–1100px) | Break out of prose width |
| Right rail (xl+) | ~280–320px sticky | TOC, takeaways, CTA, related report |

Mobile: single column. TOC collapses to a jump list under the title. Tables scroll horizontally or stack to cards. SVG `width: 100%`.

### 3.2 Desktop composition

```
[ breadcrumb full width ]
[ title + meta spanning main+rail or main only ]
[ hero full main column ]

[  main (prose + exhibits)     |  sticky rail ]
[  takeaway card after hero    |  On this page ]
[  sections + figures          |  Key takeaways ]
[  mid-article CTA band        |  Explore TMS / WhatsApp ]
[  FAQ                         |  Related report (optional) ]
[  related posts with thumbs   |  ]

[ full-bleed navy next-step CTA ]
```

Do not fill gutters with ads. Use TOC + takeaways + product CTA.

### 3.3 Typography and chrome

- **Title:** sentence case on the page (SEO title can stay as-is). Avoid all-caps H1.
- **Body:** darker than `text-muted-foreground` for long reads (`text-navy/80` or equivalent). Summary can stay slightly muted.
- **H2:** numbered kicker optional (01 / 02) plus more vertical space.
- **Takeaway box:** 4 bullets under the hero (from executive takeaways). Not a chart.
- **Mid-article CTA:** after the 25-point checklist, before six-week rollout. Link to `/zaftys-tms`.
- **Related posts:** thumbnail + category + title, not three empty bordered titles.
- **Figure chrome:** `<figure>`, caption, source line, alt that states the **claim**.

### 3.4 Visual rhythm (site-wide)

1. Hero photo.
2. KPI or takeaway strip.
3. Prose.
4. One decision artifact (usually a **table**).
5. Prose.
6. One chart (donut **or** bar for the same data, never both).
7. One process infographic.
8. FAQ + CTA.

If two exhibits show the same numbers, drop one.

---

## 4. Reports agent  -  what we already have

Repo: `C:\Users\Public\project\market-research-reports-agent`

Brand tokens (`docs/26-Brand-And-Report-Template.md` and `visualizations/tokens.py`):

| Token | Hex | Use |
|-------|-----|-----|
| navy | `#0B1C36` | Titles, strong text |
| primary | `#1E4D8C` | Rules, series 1 |
| primary-bright | `#3D7CC9` | Series 2 |
| accent teal | `#0D9488` | Markers, URLs |
| accent_warm | `#D97706` | Sparing highlight |
| panel | `#F8FAFC` / `#F1F5F9` | Exhibit wash |

Theme key: `style: "zaftys"`. Dark logo only on light surfaces.

### 4.1 Families (`research_os.visualizations`)

| Family | Types | Blog use |
|--------|--------|----------|
| Chart | line, bar, clustered bar, stacked bar, horizontal bar, **donut** | Shares, mix, ranking |
| Table | native tables, snapshot plates | Scorecards (also re-render as HTML) |
| Infographic / composite | KPI cards, progress, geo/parcel density, stacked bars + CAGR + snapshot | Mid-article plates |
| Diagram | Porter, SWOT, PESTLE, value/supply chain, Mermaid flows | Process, not invented numbers |

Key modules: `engine.py`, `policy.py`, `charts.py`, `tables.py`, `composites.py`, `diagrams.py`, `premium_exhibits.py`, `mam_exhibits.py`, `native_charts.py`, `mermaid_render.py`.

Console already depends on Recharts. **Do not add Recharts to the marketing site** for v1. Static SVG + HTML is enough and prerender-friendly.

### 4.2 Chart-type policy (reuse on the blog)

From `visualizations/policy.py`:

- Time series → line.
- Share with 2–6 categories → **donut**.
- Share with many categories → bar.
- Rankings / tornado → horizontal bar.
- Stacked composition with multiple series → stacked bar.
- Diversity penalty: do not stack four donuts in one chapter.
- Methodology / operator donuts may repeat only when the narrative requires it.

### 4.3 Export for web (not A4 Typst)

Reports default to A4 landscape Typst plates. Blog needs **web-width SVG** (~1000px), light caption, source line, no heavy grey box.

Later optional: a `blog_pack` in the agent that only emits web SVGs + JSON (`labels`, `values`, `unit`, `source`, `caveat`).

Until that pack exists: generate SVG by hand from existing `render_chart` / `render_diagram` / `composites` / `render_table`, drop files under:

`public/images/blog/tms-evaluation-guide-indian-manufacturers/`

---

## 5. Hybrid render model (marketing site)

| Artifact | Render | Why |
|----------|--------|-----|
| Scorecards, checklists, comparison | **HTML `<table>`** | Indexable, accessible, printable for the demo room |
| Donuts, bars, process, timeline | **Static SVG** (agent, ZAFTYS tokens) | Same look as reports, no extra JS, prerender OK |
| KPI / takeaway chips | **React + CSS** | Cheap; not a chart library |
| Optional later | JSON + tiny inline SVG | One source of truth if we redraw |

Skip live dashboards on `/blog`. Skip Recharts unless hover is a proven need.

### 5.1 Future data shape (do not invent markdown dialects)

Extend sections with optional blocks, for example:

- `kind: "table"` + headers / rows / caption / source
- `kind: "figure"` + `src`, `alt`, `caption`, `source`
- `kind: "kpis"` + `{ label, value, note }[]`
- `kind: "callout"`

Keep existing posts as paragraphs + bullets until retrofit. Only the TMS evaluation post (and later flagship posts) get exhibits.

---

## 6. Editorial honesty (non-negotiable)

This first post is a **buying guide**, not a market-size chapter.

- Every figure: title, unit, source, and **illustrative / example / directional** when not a cited series.
- Do not invent TMS vendor market share, India TAM/CAGR, or "40% GPS / 40% FASTag / 20% SIM" mixes.
- NITI Aayog / RMI road-freight "on the order of 70 percent" may be visualized **with the PDF citation** and "order of magnitude" in the caption. Not a ZAFTYS KPI.
- GVW bands in the article are **starting points**; RC and gazette win.
- Outcome bands (TAT, detention, POD cycle) are **directional plant ranges**, not contract SLAs.
- Indent 50 / 30 / 20 is an **example quota** in copy, not market share.
- Alt text describes the claim, not "chart image."
- No ASCII art. No unlabeled pie. No ZAFTYS vs SAP vs Oracle pie.
- Do not contradict the honest product pitch (dispatch, e-POD, TranZfort overflow). Do not chart FASTag/SIM as shipped product modules unless the live TMS actually exposes them in the demo we will walk.

---

## 7. First post  -  locked exhibit list

**URL:** `/blog/tms-evaluation-guide-indian-manufacturers`  
**Slug:** `tms-evaluation-guide-indian-manufacturers`  
**Read time:** 18 min  
**CTA:** Explore ZAFTYS TMS → `/zaftys-tms`  
**Hero:** `/images/blog/tms-for-heavy-haul.jpg` (reuse OK)

**v1 ships 7 exhibits.** Optionals 8–10 are parked unless the page still feels sparse after layout + 7.

### 7.1 Build these (v1)

| # | After section | Type | Content | Honesty / caption |
|---|----------------|------|---------|-------------------|
| 1 | Executive takeaways | **Donut** | India freight **by mode**; road on the order of 70% of domestic goods movement | "Order of magnitude. Source: NITI Aayog and RMI, Fast Tracking Freight in India (June 2021). Not a ZAFTYS operating KPI." Remainder slices only if the source supports them; otherwise donut + footnote "road vs rest" without fake rail/water splits. |
| 2 | What informal coordination actually costs | **4-tile infographic** | Uncontrolled detention · spot visibility blackout · paper POD 45–60 days · e-Way Bill expiry fines | Icons + one line each. No invented ₹ crore losses. |
| 3 | Why generic global TMS products fail | **HTML comparison table** (not a chart) | Rows: cargo mix; GPS assumption; plant model; regulatory hooks; implementation time. Columns: Generic Western TMS vs India-specific industrial TMS | This is the "one slide" the copy already asks for. |
| 4 | Pillar 1: Tri-hybrid tracking | **Process infographic** (3 nodes + merge) | Hardwired GPS (dedicated) → FASTag plaza events → SIM consent (spot) → **one dashboard** | **Not a donut of fake shares.** Equal visual weight unless we later have trip-mix data. |
| 5 | Pillar 2: Yard stages | **Horizontal 5-stage diagram** | Gate → tare weigh → bay → gross weigh → LR / gate exit | Numbered 1–5. Core visual of the article. |
| 6 | A 25-point demo checklist | **Donut + HTML table** | Donut: **weights** tracking 25%, yard 25%, sourcing 20%, finance 20%, vendor 10%. Table: 25 lines with 1–5 score blanks (or grouped 5+5+5+5+5) | Best donut on the page: weights are in the article. HTML table is the demo-room artifact. |
| 7 | A six-week rollout | **Timeline infographic** | W1–2 setup (ERP, rates, weighbridge) · W3–4 one plant · W5–6 expand + three-way audit | Three phases. Field rejection risk in caption. |

Two donuts only: (1) road freight share, (6) scorecard weights. No extra pies.

### 7.2 Optional (v1.1 if still sparse)

| # | After section | Type | Content | Honesty |
|---|----------------|------|---------|---------|
| 8 | Pillar 3 | Horizontal bars | Typical GVW bands: 18.5 / 28 / 35 / 42 / ~55 t | "Starting points for plant conversations. RC and MoRTH gazette win." |
| 9 | Pillar 4 | Stacked bar labeled EXAMPLE (prefer bar over a third donut) | Indent split 50 / 30 / 20 transporters A/B/C | Example quota from copy, not market share. |
| 10 | What good operations tend to show | Range bars | TAT −30 to −45%; detention −50 to −70%; POD 45 days → a few days | "Directional bands from industrial gate-to-exit work, including ZAFTYS corridor experience. Not a contract SLA. Measure last 90 days first." |

If we must add one optional in v1, prefer **10** (outcomes) over 8 and 9.

### 7.3 Explicitly out of this post

- TMS vendor market share or competitive pies.
- India logistics TAM / CAGR (belongs on `/reports`, e.g. DFM).
- Four methodology donuts.
- Decorative India choropleth with no plant TAT data.
- Clustered bars that duplicate the Western vs India table.
- Interactive control-tower widgets.

### 7.4 Suggested scroll order

1. Wider shell + breadcrumb + sentence-case title + meta.
2. Sticky rail: TOC, 4 takeaways, TMS CTA.
3. Hero + takeaway card.
4. Executive takeaways prose.
5. **Exhibit 1** donut (road freight share).
6. In-plant / highway reality (prose).
7. Informal costs prose + **Exhibit 2** four tiles.
8. Why global TMS fails + **Exhibit 3** comparison table.
9. Pillar 1 prose + **Exhibit 4** tri-hybrid diagram.
10. Pillar 2 prose + **Exhibit 5** five-stage TAT.
11. Pillars 3–5 prose (GVW / hybrid fleet / e-POD). Optional 8–9 here later.
12. **Exhibit 6** weight donut + 25-row scorecard.
13. Mid-article CTA (TMS).
14. **Exhibit 7** six-week timeline + rollout prose.
15. Outcomes prose. Optional 10 here later.
16. How we would use this at ZAFTYS / TranZfort.
17. References.
18. FAQ, related posts with thumbs, full-bleed next-step CTA.

---

## 8. Mapping copy claims → visual (source of truth)

Use `src/lib/blog-data.ts` for this slug. Do not invent new statistics in captions.

| Claim in copy | Exhibit |
|---------------|---------|
| Road ~70% of multi-billion-tonne freight task; NITI/RMI | Donut 1 |
| Phone, WhatsApp, Excel; detention, unverified bills, lost LRs, e-Way Bill fines | Tiles 2 |
| Western parcel/LTL vs India heavy FTL, GPS+FASTag+SIM, stages, native GST, weeks not 9–12 months | Table 3 |
| Three tracking streams, one dashboard | Diagram 4 |
| Five milestones, not one geofence | Diagram 5 |
| Checklist weights 25/25/20/20/10; 25 lines | Donut + table 6 |
| Weeks 1–2 / 3–4 / 5–6 | Timeline 7 |
| GVW 18.5 / 28 / 35 / 42 / ~55 t | Optional 8 |
| Example 50/30/20 indent | Optional 9 |
| TAT 30–45% shorter; detention 50–70% down; POD 45 days → few days | Optional 10 |

References already listed in the post (NITI freight report, Transforming Trucking, MoRTH, NCAER, ZAFTYS ops logs) must appear in figure source lines where used.

---

## 9. Production workflow

1. Keep this markdown as the lockfile. Change exhibits here before changing code.
2. Outline exhibit slots in the post (done in §7).
3. In the reports agent, build `VisualSpec` / diagram / composite / table; export web-width SVG (+ JSON if easy).
4. Copy assets to `public/images/blog/tms-evaluation-guide-indian-manufacturers/`.
5. Extend `BlogSection` or add `exhibits` on `BlogPost` for this slug only.
6. Teach `BlogPostLayout` to render table / figure / kpis / callout.
7. Apply the wider shell + rail on this layout (all posts inherit layout; only this post has figures at first).
8. Caption, source, alt, mobile table behaviour, prerender check (`scripts/prerender.mjs`).
9. Do not `git push` `blogs-and-reports` until asked. `main` already has prerender/carousels/DFM/blog prose via `29cce3c`.

### 9.1 File naming (proposed)

```
public/images/blog/tms-evaluation-guide-indian-manufacturers/
  fig-01-freight-mode-share.svg
  fig-02-informal-cost-tiles.svg
  fig-04-trihybrid-tracking.svg
  fig-05-yard-tat-stages.svg
  fig-06-checklist-weights.svg
  fig-07-six-week-rollout.svg
  fig-08-gvw-bands.svg          # optional
  fig-09-indent-example.svg     # optional
  fig-10-outcome-ranges.svg     # optional
```

Exhibit 3 and the 25-row scorecard are HTML, not SVG (SVG table plates are a fallback only).

---

## 10. Implementation order on `blogs-and-reports`

1. Layout shell (widths, rail, title case, body contrast, takeaway card, mid CTA, related thumbs).
2. HTML table + figure components.
3. Exhibits 3 and 6 table (content already in the article).
4. SVG slots for 1, 2, 4, 5, 7 (generate in reports agent or hand SVG with ZAFTYS tokens).
5. Optional 8–10 only if the page still feels thin.
6. Other blog posts: layout inheritance only; no fake charts.

---

## 11. Later posts and reports catalog

- Same layout shell for every `/blog/:slug`.
- Exhibits only where the post has **real or clearly caveated** numbers.
- Market-size donuts and CAGR plates belong on `/reports` and in PDFs from the reports agent, not in operational how-tos.
- User planned additional blog drafts (four more after this one). Each new post gets its own exhibit appendix in this file or a child doc. Do not copy the TMS seven exhibits onto unrelated articles.

---

## 12. Decision log

| Date | Decision |
|------|----------|
| 16 Aug 2026 | Work lives on branch `blogs-and-reports`. Prior marketing work committed and pushed on `main` (`29cce3c`). |
| 16 Aug 2026 | First visual post is TMS evaluation guide only. |
| 16 Aug 2026 | v1 = 7 exhibits; two donuts (mode share + checklist weights); comparison and scorecard as HTML; tracking and TAT as process diagrams; no vendor-share pies. |
| 16 Aug 2026 | Hybrid render: HTML tables + static ZAFTYS SVG from reports agent. No Recharts on marketing blog v1. |
| 16 Aug 2026 | Widen page, keep prose measure, sticky TOC rail. Sentence-case H1. |

When implementation diverges, update this file in the same PR as the layout code.
