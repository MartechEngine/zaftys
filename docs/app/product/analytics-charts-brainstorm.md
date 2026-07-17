# TSM Analytics & Charts Brainstorm

| Field | Value |
|-------|-------|
| **Status** | Sprint A–D implemented |
| **Date** | 17 Jul 2026 |
| **App** | `app-tsm/` |
| **Audience** | Dispatchers (ops glance) · Data analysts / ops managers (deep dive) · Admins (margin & network) |
| **Related** | [sitemap-tsm.md](./sitemap-tsm.md) · [ui-ux-features.md](./ui-ux-features.md) · [reports pages](../../app-tsm/src/app/(portal)/reports/) |
| **Chart libs** | [MUI X Charts](https://mui.com/x/react-charts/) (primary candidate) · Recharts (alt if we stay Tailwind-only) |

Use `[ ]` for backlog tasks. Promote items into [Master-TODO.md](./Master-TODO.md) / sprint boards when prioritized.

---

## 1. Current state (honest)

Today TSM is **table- and KPI-card heavy**. Visual analytics are almost absent.

| Surface | What exists today | Problem |
|---------|-------------------|---------|
| **Command Center** (`/`) | 4× `KpiCard` (Active trips, Exceptions, At plant, TranZfort posts) | Cards look static; “sparkline” is a **fake decorative bar row** (`SPARKLINE` constant in `app-shell.tsx`) — not real series data |
| **Reports hub** | KPI numbers + hub cards | No charts — only counts and links |
| **Reports / operations, lanes, drivers, fleet** | Tables + CSV | Analysts get grids, not visual trends |
| **Billing / fuel / maintenance** | Tables + status pills | No spend/utilization visuals |
| **Dispatch / map** | Kanban + map | Good for ops; not analytics |

**Conclusion:** We need a deliberate **Charts & analytics wave** — not one-off sparkles. Treat charts as first-class product surfaces with BFF series endpoints, not CSS decoration.

---

## 2. Design principles

### For dispatchers (glanceable, 3-second read)

- Prefer **small multiples** on Command Center: sparkline, donut, stacked bar — answer “what’s broken / where to focus”
- Color = meaning: exception = warning, on-time = success, network = accent
- Click-through: every chart segment → filtered list (`/shipments?tab=…`, `/network/overflow`)
- Avoid dense scatter / heatmaps on the home screen

### For data analysts / ops managers (explore & explain)

- Prefer **Reports** module + optional **Analytics** sub-nav
- Date range, corridor, client, originType (fleet vs network) filters
- Export chart data (CSV) + print/PDF later
- Trends over time (7 / 30 / 90 days), cohort and lane benchmarks

### Visual quality bar

- Replace static KPI bars with **real series** (even if demo-seeded at first)
- Target look: clean axes, soft fill areas, clear legends, tooltip on hover — inspired by [MUI X Charts](https://mui.com/x/react-charts/) demos (Bar, Line, Pie/Donut, Gauge, Heatmap Pro)
- Match ZAFTYS glass / primary tokens — do **not** ship default purple MUI theme wholesale; theme MUI charts to our CSS variables
- Dark portal: charts must remain readable (axis contrast, no thin grey-on-grey)

---

## 3. Chart library recommendation

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **[@mui/x-charts](https://mui.com/x/react-charts/)** | Polished Bar/Line/Pie/Scatter; composition API; SSR-friendly with fixed height; Pro: Heatmap, Funnel, Sankey, zoom | Adds MUI peer deps; Pro charts need license | **Preferred** for “best looking” + analyst depth |
| **Recharts** | Lightweight, common with Tailwind apps | More DIY styling to match MUI polish | Fallback if we refuse MUI deps |
| **ECharts** | Huge chart zoo, performance | Heavier, less React-idiomatic | Only if we need complex geo/heat later |

**Recommendation:** Start with **MUI X Charts Community** (MIT): `BarChart`, `LineChart`, `PieChart`, `SparkLineChart`, `Gauge`. Evaluate **Pro** only if we need Heatmap / Funnel / Sankey for network & billing.

**Install sketch (when implementing):**

```bash
npm install @mui/x-charts @mui/material @emotion/react @emotion/styled
```

Theme bridge: map `primary`, `success`, `warning`, `destructive` from our Tailwind tokens into MUI `createTheme` palette.

---

## 4. Data domains we can chart (source → insight)

| Domain | Data already in TSM (or easy to derive) | Analyst question | Dispatcher question |
|--------|------------------------------------------|------------------|---------------------|
| **Shipments / ops** | Status, corridor, tonnage, ETA, exceptions, originType | Trend of trips & SLA by week | What’s active / stuck now? |
| **Dispatch** | Board columns, dwell time in Unassigned | Throughput & queue age | Aging unassigned loads |
| **Fleet** | Vehicle status, capacity, compliance docs | Utilization %, idle assets | Who’s free to assign? |
| **Drivers** | Trips, on-time, safety scores | Rankings, trend | Who’s overloaded? |
| **Network / TranZfort** | Listing state, offers, fill rate, TTL | Time-to-first-offer, accept rate | Offers waiting > N hours |
| **Fuel** | Transactions, ₹ / L, by vehicle | Cost / km, anomalies | Burn this week |
| **Maintenance** | WO status, faults, parts stock | MTTR, backlog | Open WOs blocking assets |
| **Billing** | Invoices, GST, rates, ledger | Revenue, AR aging, margin | Unpaid invoices |
| **Clients** | Volume by client, lane mix | Concentration risk | Top shippers today |
| **Map / GPS** | Positions, stale flags | Coverage gaps | Stale GPS exceptions |
| **Documents** | LR/ePOD completeness | Missing-doc rate | Trips missing LR |
| **Sync** | Last sync, failures | Sync reliability | Is TranZfort stale? |

---

## 5. Chart type catalog (what to use when)

Reference: [MUI X Charts](https://mui.com/x/react-charts/) — Bar, Line, Area, Pie/Donut, Scatter, Gauge; Pro: Heatmap, Funnel, Sankey, Range Bar.

| Chart type | Best for | TSM examples | Persona |
|------------|----------|--------------|---------|
| **Sparkline / mini Line** | KPI trend (7–14 pts) | Active trips last 14 days; exceptions trend | Dispatcher |
| **Donut / Pie** | Composition (few slices) | Trips by status; fleet vs network share; WO status | Both |
| **Horizontal Bar** | Rankings | Top corridors; driver scorecards; client volume | Analyst |
| **Vertical Bar / stacked** | Categories over time or mix | Trips by day stacked fleet/network; billing by month | Analyst |
| **Area (filled Line)** | Volume over time | Tonnage moved / week; revenue | Analyst |
| **Grouped Bar** | Compare series | On-time % vs exception % by corridor | Analyst |
| **Gauge / Radial** | Single SLA metric | On-time %; utilization %; fill rate | Dispatcher |
| **Funnel** (Pro or custom) | Conversion | Quote → booked → dispatched → delivered | Analyst |
| **Heatmap** (Pro) | Density 2D | Lane × weekday delays; hour-of-day plant congestion | Analyst |
| **Sankey** (Pro) | Flow | Capacity: Own fleet → Network → Delivered | Analyst / admin |
| **Scatter** | Correlation | Transit hours vs tonnage; fuel ₹ vs km | Analyst |
| **Range / Bullet** | Target vs actual | SLA band vs actual on-time | Ops manager |
| **Timeline / Gantt-lite** | Schedule | Driver day board; calendar density | Dispatcher |
| **Treemap** | Nested share | Revenue by client → lane | Analyst |
| **Waterfall** | Bridge | Margin: shipper rate − partner payout − GST | Finance |

**Avoid on Command Center:** dense heatmaps, 3D, more than 5 pie slices, dual-axis charts without training.

---

## 6. Proposed surfaces (where charts live)

### 6.1 Command Center — “ops glance” strip (P0)

Replace boring KPI cards with **KPI + real sparkline** and add 2–3 small charts.

| Widget ID | Chart | Metric | Click-through |
|-----------|-------|--------|---------------|
| `cc-active-spark` | SparkLine | Active trips (14d) | `/shipments?tab=active` |
| `cc-status-donut` | Donut | Live mix: pending / dispatched / in_transit / exception | Status filters |
| `cc-exception-bars` | Mini bar | Exceptions by reason (top 5) | `/shipments?tab=exceptions` |
| `cc-network-gauge` | Gauge | Offers waiting / open posts fill | `/network/overflow` |
| `cc-unassigned-age` | Horizontal bar | Unassigned aging buckets (&lt;1h, 1–4h, 4–24h, &gt;24h) | `/dispatch` |

### 6.2 Reports → Operations (P0)

| Widget | Chart | Data |
|--------|-------|------|
| Trips over time | Area + Line | Daily trip count 30d |
| On-time trend | Line | On-time % by week |
| Corridor ranking | Horizontal bar | Trips + on-time by corridor |
| Status funnel | Funnel or stacked bar | Lifecycle stage counts |
| Exception mix | Donut | Exception reasons |

### 6.3 Reports → Lanes (P1)

| Widget | Chart | Data |
|--------|-------|------|
| Lane scorecard | Grouped bar | Avg transit vs target by corridor |
| Delay heatmap | Heatmap | Corridor × day-of-week delay minutes |
| Volume share | Treemap or pie | Tonnage by lane |

### 6.4 Reports → Drivers (P1)

| Widget | Chart | Data |
|--------|-------|------|
| Leaderboard | Horizontal bar | Rating / trips |
| On-time vs safety | Scatter | Per driver |
| Workload | Stacked bar | Trips per driver per week |

### 6.5 Reports → Fleet (P1)

| Widget | Chart | Data |
|--------|-------|------|
| Utilization gauge | Gauge | % on_trip |
| Status mix | Donut | available / on_trip / maintenance |
| Capacity use | Bar | Loaded tonnage vs capacity |

### 6.6 Network desk (P0 for TranZfort story)

| Widget | Chart | Data |
|--------|-------|------|
| Listing pipeline | Funnel | draft → posted → offers → assigned |
| Time to first offer | Histogram / bar | Minutes buckets |
| Fill rate | Gauge | trucksFilled / trucksNeeded (open listings) |
| Partner accept mix | Donut | Top partners accepting ZAFTYS loads |

### 6.7 Billing (P1)

| Widget | Chart | Data |
|--------|-------|------|
| Revenue trend | Area | Invoice subtotals by month |
| AR aging | Stacked bar | 0–30 / 31–60 / 61–90 / 90+ |
| Fleet vs network margin | Waterfall or grouped bar | Shipper charge vs partner payout |
| GST collected | Line | Monthly GST |

### 6.8 Fuel & maintenance (P2)

| Widget | Chart | Data |
|--------|-------|------|
| Fuel spend | Line + bar | ₹ by week; by vehicle |
| WO backlog | Stacked bar | open / in_progress / resolved |
| Parts below reorder | Bullet / bar | Stock vs reorder point |

### 6.9 Optional new route: `/analytics` (P2)

Single “analyst cockpit” with date range + saved views — only if Reports gets crowded. Prefer deepening `/reports/*` first.

---

## 7. Personas → chart packs

### Dispatcher pack (Command Center + Dispatch)

1. Active trips sparkline  
2. Live status donut  
3. Unassigned aging bars  
4. Exceptions by reason  
5. TranZfort offers waiting gauge  

**Goal:** Decide next action in &lt; 10 seconds.

### Analyst pack (Reports)

1. 30-day volume area  
2. On-time trend line  
3. Corridor horizontal bars  
4. Fleet utilization gauge + donut  
5. Client concentration bar/treemap  
6. Network fill funnel  

**Goal:** Weekly ops review &amp; SLA board pack.

### Admin / finance pack

1. Revenue area  
2. AR aging  
3. Margin waterfall (fleet vs network)  
4. Sync health sparkline  

---

## 8. Implementation backlog (extra tasks)

### Sprint A — Foundation + Command Center polish

- [ ] Choose library: **MUI X Charts** (or Recharts fallback) + theme bridge to ZAFTYS tokens  
- [ ] Add `ChartCard` / `ChartEmpty` / `ChartSkeleton` primitives under `src/components/app/charts/`  
- [ ] BFF: `GET /api/analytics/command-center` returning series for sparklines + status mix + aging buckets  
- [ ] Replace fake `SPARKLINE` in `KpiCard` with real `SparkLineChart` fed by API (or hide until data exists)  
- [ ] Command Center: status donut + unassigned aging + exception mini-bars  
- [ ] Smoke: analytics GET routes return non-empty series in demo mode  

### Sprint B — Reports charts

- [ ] Operations: trips area, on-time line, corridor bars  
- [ ] Lanes: grouped bars (+ heatmap if Pro approved)  
- [ ] Drivers: leaderboard bars  
- [ ] Fleet: utilization gauge + status donut  
- [ ] Date-range query params (`from`, `to`) on report APIs  

### Sprint C — Network + billing visuals

- [ ] Network overflow page: listing funnel + TTF-offer histogram  
- [ ] Billing hub: revenue area + AR aging  
- [ ] Optional margin waterfall (demo math OK locally)  

### Sprint D — Analyst UX

- [ ] Chart export (CSV of series)  
- [ ] Saved filter presets on reports  
- [ ] Print-friendly report layout  
- [ ] Playwright: Command Center charts visible after login  

---

## 9. API shape sketch (local-first)

```ts
// GET /api/analytics/command-center
{
  activeTripsSpark: { labels: string[]; values: number[] }; // last 14 days
  statusMix: { id: string; label: string; value: number }[];
  exceptionReasons: { label: string; value: number }[];
  unassignedAging: { bucket: string; count: number }[];
  network: { openPosts: number; offersWaiting: number; fillRate: number };
}
```

```ts
// GET /api/analytics/operations?from=&to=
{
  tripsOverTime: { date: string; trips: number; network: number; fleet: number }[];
  onTimeByWeek: { week: string; pct: number }[];
  byCorridor: { corridor: string; trips: number; onTimePct: number }[];
}
```

Demo mode: derive from `dev-store` shipments + listings. Fleetbase mode later: aggregate FB orders or keep analytics on TSM projection tables.

---

## 10. UX / visual guidelines (anti-boring)

| Do | Don’t |
|----|-------|
| Real historical series (even synthetic demo history) | Static decorative bars labeled as “sparkline” |
| 1 chart = 1 question | Dashboard wallpaper of 12 unrelated charts |
| Tooltip with exact numbers + unit (trips, ₹, %) | Mystery colors with no legend |
| Consistent color mapping (status → token) | Random palette per page |
| Empty state: “No trips in range” + CTA | Blank SVG |
| Animate once on mount (subtle) | Endless looping motion |

**MUI-inspired patterns to copy:**

- Donut with center total (active trips count)  
- Soft area fill under line for volume  
- Horizontal bars for rankings (full-width labels)  
- Gauge for single SLA %  
- Composition: bar + line overlay (volume + on-time) when we need dual insight  

---

## 11. Risks & constraints

| Risk | Mitigation |
|------|------------|
| MUI + Emotion increase bundle | Lazy-load chart components; only CC + reports |
| Pro license cost | Stick to Community until Heatmap/Sankey justified |
| Fake demo history misleads | Label “Demo series” when `TSM_DEMO_UI≠0` |
| Analytics without durable DB | Series reset on restart until persistence lands |
| Chart a11y | Titles, aria labels, tabular fallback |

---

## 12. Success metrics (when shipped)

| Metric | Target |
|--------|--------|
| Command Center charts use **real** series | 100% (no decorative SPARKLINE) |
| Dispatcher can answer “what’s aging?” without opening tables | ≤ 3s via aging chart |
| Weekly ops review uses Reports charts | ≥ 1 chart pack used in demo walkthrough |
| Smoke covers analytics GETs | ≥ 3 routes |

---

## 13. Suggested priority order

1. **Fix Command Center KPI sparklines** (credibility)  
2. **Status donut + unassigned aging** (dispatcher daily value)  
3. **Operations report charts** (analyst baseline)  
4. **Network listing funnel** (TranZfort story)  
5. **Billing revenue + AR**  
6. Advanced: heatmap, sankey, margin waterfall  

---

## Document history

| Date | Change |
|------|--------|
| 17 Jul 2026 | Initial brainstorm — catalog, surfaces, MUI X recommendation, sprint backlog |
