---
title: "How to write a diesel surcharge clause for Indian freight contracts"
seo_title: "Diesel Surcharge Clause for Indian Freight Contracts | ZAFTYS"
meta_description: "Write an auditable diesel surcharge clause for Indian freight contracts with IOCL pricing, three formulas, review dates, worked examples and exclusions."
slug: "diesel-surcharge-freight-contract-india"
category: "Deep Research / Master Guides"
template: "deep-research"
tags: ["Contract Logistics", "Freight Rates", "Fuel Adjustment Factor", "Diesel Escalation", "Industrial FTL", "India"]
target_reading_time: "25-30 mins"
target_word_count: 6000
published_status: "implemented locally - reviewed 8 Oct 2026"
research_date: "2026-10-08"
primary_cta: "/logistics/contract-logistics"
secondary_links:
  - "/intelligence/freight-rates"
  - "/logistics/dedicated-fleet"
  - "/blog/spot-market-vs-dedicated-fleet-india"
  - "/blog/reduce-empty-return-trips"
  - "/blog/container-trucking-logistics-india"
keywords:
  primary:
    - "fuel adjustment factor freight India"
    - "diesel escalation clause transport contract"
    - "diesel surcharge on freight charges"
  secondary:
    - "AITWA fuel adjustment factor 0.65"
    - "price variation clause diesel IOCL"
    - "how diesel price affects truck freight rate"
    - "CRISIL freight index diesel pass through"
    - "diesel escalation de-escalation clause"
  use_in_title_or_h1:
    - "diesel surcharge"
    - "freight contract"
    - "India"
  use_in_h2:
    - "fuel adjustment factor"
    - "diesel escalation clause"
    - "IOCL diesel price"
---

# How to write a diesel surcharge clause for Indian freight contracts

**Status:** Implemented locally and reviewed 8 Oct 2026.  
**Folder:** `docs/blogs/` (same place as the container, axle, ePOD, spot-vs-dedicated, and cost-leaks drafts).  
**Live voice:** Plain, plant-desk English. No em dash or en dash. Spaced hyphens only.  
**Honesty:** Every rupee band below is a workshop or a cited market note. It is not a ZAFTYS audited national index. Name the source in the sentence. Confirm the diesel print and the association circular before go-live.

## Who this is for

Plant finance, procurement, and the logistics desk at a steel, cement, chemical, mining, or manufacturing site that signs quarterly or annual full-truckload contracts. The reader already knows a rate card exists. They need the one clause that stops a diesel argument in month three.

## What this post does not repeat

- Capacity split (contract vs spot): [Spot market vs dedicated fleets](/blog/spot-market-vs-dedicated-fleet-india)
- Empty kilometres: [Reduce empty return trips](/blog/reduce-empty-return-trips)
- Gate, weigh, and POD leaks: [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide)
- Ocean diesel is not this article. Inland truck diesel only. The container post already separates ocean USD from domestic INR.

---

## Table of contents

1. Why the rate card goes stale in ninety days
2. What actually sits inside a truck rupee
3. Three diesel escalation formulas for freight contracts
4. How to write a fuel adjustment factor clause
5. Diesel surcharge calculation using Delhi fuel prices
6. What the clause must not do
7. How settlement uses the clause (so finance and dispatch agree)
8. A 19-point clause review before you sign
9. FAQ
10. Sources (checked 8 Oct 2026)

---

## Keyword map (8 Oct 2026)

No paid keyword tool was used. Volumes below are **intent**, not a Search Console export. Phrases are taken from news headlines, contract templates, and Crisil notes that are already ranking or being cited.

| Priority | Phrase | Why it belongs on this URL |
| --- | --- | --- |
| Primary | fuel adjustment factor freight India | The name AITWA and the trade press used from 20 May 2026. Put it in the H1 subtitle and the first FAQ. |
| Primary | diesel escalation clause transport contract | How plant legal and BHEL-style contracts actually title the clause. |
| Primary | diesel surcharge on freight charges | Plain-language query. Use in the title and meta. |
| Secondary | AITWA fuel adjustment factor | News query. Answer it in FAQ. Do not let the association own the H1. |
| Secondary | price variation clause diesel IOCL | Contract-drafting query. The clause section should name IOCL or PPAC as the table. |
| Secondary | how diesel price affects truck freight rate | Calculator intent. The worked example is the answer. |
| Secondary | CRISIL freight index diesel | Research intent. One section, then back to the clause. |
| Do not target | national logistics cost percent of GDP | Already used on other posts. This URL is the clause, not the macro essay. |
| Do not target | e-way bill, axle load, plant TAT | Those URLs already exist. Link them. Do not restuff them here. |

Title already carries "diesel surcharge" and "freight contract". Keep the H1. Add "fuel adjustment factor" in the subtitle line under the H1 so both primary phrases are on the first screen.

## Data bench (researched 8 Oct 2026)

Label every figure in the live post. Do not blend these into one "ZAFTYS diesel law".

### A. Diesel prints you can actually name

| City | 15 May 2026 (AITWA base date) | 8 Oct 2026 | Move |
| --- | --- | --- | --- |
| Delhi | ₹90.67 / litre | ₹95.20 / litre | +₹4.53 |
| Mumbai | ₹93.14 / litre | ₹97.83 / litre | +₹4.69 |

15 May figures: Times of India, Business Standard, and The Hindu BusinessLine, reporting the ₹3/litre OMC hike that day (Delhi diesel ₹87.67 to ₹90.67; Mumbai diesel to ₹93.14). One PTI line said Delhi diesel moved from ₹89.67. That does not match a ₹3 hike. Use ₹87.67 to ₹90.67.

8 Oct 2026: India Today and The Hindu BusinessLine (Delhi ₹95.20, Mumbai ₹97.83). Prices were unchanged that morning. They will move again. The live post must say "as printed on 8 Oct 2026" and tell the reader to re-read the named table on bill day.

Crisil's June 2026 note ("From pumps to prices") said retail petrol and diesel had risen about ₹7.5/litre since 15 May, with a further move toward ₹10 possible. That is a June macro note, not the Delhi diesel print on 8 Oct. Do not write "+₹7.5 in Delhi" unless you re-check that PDF's table. The contract example uses the city prints above.

Named source for a clause: **IOCL retail diesel for one named city** (BHEL-style contracts use the IOCL site for the state capital) or **PPAC daily state prices** (ppac.gov.in) for a long lane that refuels in more than one state. Not the driver's pump slip.

### B. Four diesel shares, four different pies

| Source | Figure | Denominator | Use it for |
| --- | --- | --- | --- |
| Crisil Intelligence, CRISFrex April 2026 note | Fuel is nearly **50% to 60%** of transporter operating expenses. **₹5/litre** needs about **2.5% to 2.8%** freight to hold margin. | Operating expenses, then a freight revision | Formula check. Implies about **0.50 to 0.56 percentage points of freight per ₹1** of diesel. |
| AITWA circular, 19 May 2026 (reported by Moneylife, India Today, ABP, Artifex) | Diesel about **65%** of truck operating / running cost. **0.65% freight per ₹1** above the 15 May 2026 price, from **20 May 2026**, and the factor **falls if diesel falls**. | Association "running cost", then a rupee-step card | Formula 1. Not a statute. |
| ITLN, quoting the AITWA side | Most customers still work on a factor of **0.40 to 0.50**, not 0.65. The hike factor is "debatable". | What shippers will sign | Negotiation band. Put this next to 0.65 so the post is not an association brochure. |
| Crisil, June 2026, citing NCAER | Fuel is about **42%** of road transport cost. Road is about **71%** of freight movement. Freight transport is about **54%** of India's logistics cost (DPIIT / NCAER logistics-cost assessment, Sept 2025, as cited by Crisil). | Whole road-transport cost, not one truck's variable km | Context only. Do not set S = 0.42 in a lane contract without the transporter's litres per km. |
| Public BHEL-style transporter clause (Law Insider samples) | Extra freight = **20%** or, in another sample, **30%** of the **percent** change in IOCL diesel. Up and down. Reviewed on the 15th, applied 16th to 15th. | Share of basic freight | Formula 3. This is what a large shipper has actually written. |

### C. Freight index, corrected

Crisil PDF "Crisil freight index dips in April" (CRISFrex, indexed to April 2025 = 100):

- **April 2026: 100.5**
- **March 2026: 101.4**

The index eased after March dispatch, with more trucks available. It did **not** print 98.7. Drop that figure. An index near 100 and a diesel price ₹4.53 above the May base can be true in the same year. The index is for rebidding the base rate next quarter. The clause is for this quarter's bills.

### D. Cost lines that must stay outside the fuel clause

AITWA's own May note, via Moneylife, listed costs that rose **beside** diesel: diesel exhaust fluid (AdBlue) nearly doubling over two months, tyre prices up about 5%, and tolls up from 1 April 2026. Those are real. They are not diesel. A fuel clause that silently absorbs them cannot be audited.

Site bench, still directional, for the per-km picture only: variable about ₹26-₹37/km, of which diesel about ₹19-₹24/km, toll about ₹3-₹7/km, tyre and maintenance about ₹3.5-₹5.5/km. Say "earlier ZAFTYS research bench", not "Crisil measured this lane".

### E. If the clause is missing, a court will not invent one

Gauhati High Court, *Union of India v Freight Carriers*, decided 30 April 2008, **(2008) 4 Arb LR 443**: the court set aside an escalation award under a fixed-rate contract with no price-escalation clause. Use this as a drafting warning, not legal advice.

---

## 1. Why the rate card goes stale in ninety days

A plant signs ₹X per tonne or ₹Y per km in April. Diesel moves in June. The transporter sends a revised bill. Procurement says the contract is fixed. The transporter says the truck cannot run at April diesel. Dispatch still needs the vehicle on Thursday.

That fight is not a relationship problem. It is a missing clause. The contract named a freight number and forgot to name:

- which city's diesel price is the base,
- which date that price was taken,
- which pump or published table both sides will read later,
- the formula that turns a diesel change into a freight change,
- how often the clause is allowed to fire,
- what it does **not** cover (toll, tyre, empty kilometre, detention).

Without those six lines, every diesel headline becomes a fresh negotiation. With them, month-end is arithmetic.

**Exhibit: timeline (kind: timeline)**

| Phase | What happens |
| --- | --- |
| Day 0 | Both sides freeze base diesel and base freight in the rate card. |
| Day 30-90 | Diesel print moves. Nobody opens the clause because the review window was never written. |
| Bill day | One side applies a percent from a WhatsApp forward. The other rejects it. |
| Next tender | The transporter hides last quarter's diesel pain inside a higher base rate. The shipper thinks they "negotiated diesel away". |

---

## 2. What actually sits inside a truck rupee

Teach this before any formula. Readers who skip it will put toll and diesel in the same clause and then argue forever.

A simple split for one long-haul industrial truck:

```text
All-in trip rupees
├── Base freight (the contracted lane rate)
│     ├── Fixed cost recovery (EMI, crew, permit) spread over expected km
│     └── Variable cost
│           ├── Diesel          ← fuel clause may touch this
│           ├── Toll            ← separate FASTag line, not the fuel clause
│           └── Tyre / repair   ← not the fuel clause
├── Detention (gate hours past free time) ← plant TAT post, not this clause
└── Empty return / deadhead               ← empty-trip post, not this clause
```

**Exhibit: stacked bar (kind: stacked)**  
Caption: "Teaching split of variable cost per km (workshop band, not your lane)."

| Slice | Share of the ₹26-₹37 variable band |
| --- | --- |
| Diesel | 50 |
| Toll | 18 |
| Tyre and maintenance | 16 |
| Other variable | 16 |

Source line: directional split from the site's long-haul bench. Ask the transporter for their own diesel litres per km before you lock a percent.

**Callout (kind: callout)**  
Three published pies, not one:

- NCAER, via Crisil June 2026: fuel about 42% of road transport cost.
- Crisil April 2026: fuel nearly 50% to 60% of transporter operating expenses.
- AITWA circular, 19 May 2026: diesel about 65% of truck running cost.

The contract must say which pie the percent applies to. If it does not, finance will use 42% and the transporter will use 65%.

**Exhibit: donut (kind: donut)**  
Caption: "Three published diesel shares. They are not interchangeable."

| Slice | Percent | Pie |
| --- | --- | --- |
| NCAER via Crisil, June 2026 | 42 | Road transport cost |
| Crisil, April 2026 (low end of the band) | 50 | Transporter operating expenses |
| AITWA circular, 19 May 2026 | 65 | Truck running cost |

Do not average these into 52%. The clause picks one denominator and writes it down.

---

## 3. Three diesel escalation formulas for freight contracts

Put all three on the page. Tell the reader to pick one and delete the others from the draft contract.

### Formula 1 - Rupee steps (AITWA card)

AITWA circular dated 19 May 2026, reported by Moneylife, India Today, and ABP. Effective request from 20 May 2026. Not a statute. The circular also said the factor comes down if diesel comes down.

$$
\text{Fuel uplift \%} = 0.65 \times (D_{\text{now}} - D_{\text{base}})
$$

where $D$ is diesel in ₹ per litre, and $D_{\text{base}}$ is the named city's price on 15 May 2026 if the parties adopt that circular. Each extra rupee per litre adds **0.65 percentage points** of freight. It does not add 0.65% of the diesel price.

India Today's reading of the same circular: +₹5 is +3.25% freight, +₹10 is +6.5%, +₹15 is about +10%.

ITL Logistics (ITLN), quoting the association side later: most customers still accept **0.40 to 0.50** per ₹1, not 0.65. Crisil's ₹5 to 2.5%-2.8% band is **0.50 to 0.56** per ₹1. So 0.65 is the ask. 0.40 to 0.56 is the range a plant can defend with a published source.

| Card | Percentage points per ₹1 | On +₹4.53 (Delhi, 15 May to 8 Oct 2026) |
| --- | --- | --- |
| AITWA ask | 0.65 | 2.94% |
| Crisil margin band | 0.50 to 0.56 | 2.27% to 2.54% |
| What many shippers sign (ITLN) | 0.40 to 0.50 | 1.81% to 2.27% |

If the clause only rises, it is an escalator. The AITWA text itself said the factor reduces when diesel moderates. Write both directions.

### Formula 2 - Share of the diesel percent (auditable)

$$
\text{Fuel uplift \%} = S \times \frac{D_{\text{now}} - D_{\text{base}}}{D_{\text{base}}} \times 100
$$

$S$ is the diesel share of **basic freight**, written as a decimal.

On the Delhi prints, diesel moved from ₹90.67 to ₹95.20, which is 4.53 / 90.67 = **4.996%**.

Derive $S$ from the lane. In this workshop, diesel is ₹22/km and basic freight is ₹48/km:

$$
S = 22 / 48 = 0.458 \approx 0.46
$$

$$
0.46 \times 4.996\% = 2.30\%
$$

Crisil's 50% to 60% figure is a share of transporter operating expenses, not automatically a share of invoiced basic freight. Do not set $S = 0.65$ just because AITWA said 65%. Using both the share formula and the rupee-step card is a second hike.

### Formula 3 - What a large shipper has written (BHEL-style samples)

Public clause samples (Law Insider, BHEL transporter terms):

- Diesel source: **IOCL website, one named city** (the samples use Dehradun).
- Review: latest IOCL rate available by the **15th**. Applies from the **16th** to the **15th** of the next month, on goods receipts in that window.
- Uplift = **20%** of the percent change in diesel in one sample, **30%** in another. Up and down.
- A 10% diesel hike with the 20% sample pays **2%** extra on basic freight (rate x MT x km). With the 30% sample it pays **3%**.

On the Delhi 4.996% diesel move, $S = 0.20$ pays about **1.00%** freight. That is far below the AITWA ask. Show it so procurement sees the real negotiation gap, not only the association headline.

**Exhibit: compare table**

| | Formula 1: ₹ per litre | Formula 2: share of percent | Formula 3: 20% of percent |
| --- | --- | --- | --- |
| Constant | 0.65, or a negotiated 0.40 to 0.50 | $S$ agreed in the contract | 0.20 or 0.30 in the public samples |
| Delhi +₹4.53 | 2.94% at 0.65 | 2.30% if lane-derived $S = 0.46$ | 1.00% if $S = 0.20$ |
| Needs a city table? | Yes | Yes | Yes. Samples name IOCL. |
| Risk | Signing 0.65 because a circular said so | Setting $S$ from the wrong pie | Under-recovering diesel on a long lane if 0.20 was copied blindly |

**Do not stack formulas in one clause.** Pick one. Attach this Delhi example with the base price filled in.

### The new rate

$$
\text{Rate}_{\text{new}} = \text{Rate}_{\text{base}} \times \left(1 + \frac{\text{Fuel uplift \%}}{100}\right)
$$

Apply this to the **base freight line only**. Detention, toll reimbursement, AdBlue, tyre, and empty kilometres stay on their own lines.

---

## 4. How to write a fuel adjustment factor clause

Write these as contract sentences, not as a blog slogan.

Copy-ready structure: Basic freight is [₹/km, ₹/MT, or ₹/trip] for [vehicle body] on [origin, destination, and mandatory via], calculated on [loaded kilometres only / round-trip kilometres]. Base diesel is [high-speed diesel price] for [city] on [base date], from [IOCL or PPAC URL]. On [review day], both sides read the same table. The signed formula is [write it in full]. The factor is [number]. A negative adjustment is shown as [a deduction on the same invoice / a credit note within X days]. The price-source, holiday, rebasing, rounding, evidence, and dispute rules below also form part of the clause.

1. **Base freight.** The number, the unit (₹/km, ₹/MT, or ₹/trip), whether kilometres are loaded-only or round-trip, the body type, and the lane (origin plant, destination, via if any).
2. **Base diesel.** City, fuel grade (high-speed diesel), source both sides will read (a named public table, not "whichever pump the driver used"), and the base date.
3. **Formula.** One of Formula 1, 2, or 3, written in full, with the constant (0.65, a negotiated 0.40 to 0.50, or $S$) as a number, not "as per market" or "as per AITWA" without the number copied in.
4. **Direction and controls.** Up and down, with the dead-band, cap, floor and rounding rule written in full.
5. **Trigger and lag.** When it applies (trips whose loading date falls after the review date). Not "all open bills since April".
6. **Exclusions.** Toll, tyre, driver bata, detention, ODC permit, and empty kilometres are outside this clause unless a different clause prices them.
7. **Evidence.** The diesel print for the review date, attached to the freight bill. No print, no uplift.

**Exhibit: flow (kind: flow)**  
Caption: "From diesel print to a bill both sides can sign."

1. Read the named diesel table on the review date.
2. Subtract the base price. Keep the sign.
3. Run the one formula in the contract.
4. If the move is inside the dead-band (for example ₹2/litre), bill the base rate.
5. If it is outside, apply the factor only to the signed movement beyond the band, then multiply basic freight only.
6. Attach the print. Pass the bill to the same 4-way match used for weight and POD (see the ePOD and cost-leaks posts). Do not invent a second audit.

**Mid-article CTA (after this section)**  
Eyebrow: One clause, one lane  
Title: Put the fuel line on a contract you can operate  
Body: Share the lane, body type, and whether you already have a diesel clause. We read it against placement reality on [contract logistics](/logistics/contract-logistics), not against a national index.  
Button: Contract logistics → `/logistics/contract-logistics`

---

### Dead-band, cap, rounding and reset

Use an incremental dead-band so the bill does not jump at the boundary:

$$
\text{Eligible diesel movement} =
\operatorname{sign}(\Delta D) \times \max(0, |\Delta D| - ₹2)
$$

For Delhi +₹4.53, the eligible movement is +₹2.53. At a 0.45 factor, uplift is 1.1385%, or about +₹437 on ₹38,400. A -₹4.53 move produces -₹2.53 and about -₹437, posted as the agreed invoice deduction or credit note.

State any cap and floor and round prices and rates to two decimals. If the review day is a holiday or weekend, or the table is unavailable, use the last published price. Read the next available business-day publication and correct any difference in the next cycle. Set an evidence deadline and dispute window.

Choose rebasing explicitly. In this workshop, the base stays fixed during the contract term: a monthly review changes the adjustment, not the base. If the parties choose monthly rebasing, the current review price becomes the next month's base and the clause must explain any unrecovered cap balance. At renewal, reset basic freight and base diesel to the same date.

## 5. Diesel surcharge calculation using Delhi fuel prices

The diesel move is real. The freight rate is still a **workshop** so we do not invent a corridor quote: ₹48 per km, one 800 km loaded leg.

Diesel: Delhi IOCL retail, **₹90.67 on 15 May 2026** to **₹95.20 on 8 Oct 2026**. Difference **₹4.53**. Percent change **4.996%**.

### Example A - AITWA card (0.65 per ₹1)

$$
\text{Uplift} = 0.65 \times 4.53 = 2.94\%
$$

$$
\text{New rate} = 48 \times 1.0294 = ₹49.41 \text{ per km}
$$

$$
\text{Extra on 800 km} ≈ ₹1,131
$$

₹1,131 is the fuel line only. It is not a second "market adjustment".

The four examples below do not use a dead-band, so the formulas can be compared like for like.

### Example B - Lane-derived share ($S = 0.46$)

$$
\text{Uplift} = 0.46 \times 4.996\% = 2.30\%
$$

$$
\text{Extra on 800 km} ≈ ₹883
$$

### Example C - The factor many shippers actually sign (0.45 per ₹1)

ITLN reported customers on 0.40 to 0.50 rather than 0.65. Midpoint 0.45:

$$
\text{Uplift} = 0.45 \times 4.53 = 2.04\%
$$

$$
\text{Extra on 800 km} = 48 \times 0.0204 \times 800 = ₹783
$$

### Example D - BHEL-style 20% of the diesel percent

$$
\text{Uplift} = 0.20 \times 4.996\% = 1.00\%
$$

$$
\text{Extra on 800 km} = 48 \times 0.0100 \times 800 = ₹384
$$

Same trucks, same diesel, four bills. The gap from ₹384 to ₹1,131 is the negotiation. It is not a rounding error.

**Exhibit: bars**  
Caption: "Extra rupees on one workshop 800 km leg. Delhi diesel +₹4.53 from 15 May to 8 Oct 2026. Base rate ₹48/km, teaching only."

| Bar | Extra ₹ |
| --- | --- |
| AITWA 0.65 per ₹1 | 1131 |
| Lane share S = 0.46 | 883 |
| Shipper factor 0.45 per ₹1 | 783 |
| BHEL-style S = 0.20 | 384 |
| No clause | 0 |

The last bar is the dangerous one. Zero today becomes a fatter base rate at renewal, with nothing to audit. And a fixed-rate contract without an escalation line has been held not to grow a diesel claim later.

### Index and diesel in the same year

CRISFrex was **100.5 in April 2026** (April 2025 = 100), down from **101.4 in March**. That is a soft patch in freight, not a diesel cut. By 8 Oct, Delhi diesel was still ₹4.53 above the 15 May print. Procurement can use the index when the **base rate** is rebid. Finance uses the clause on **this** quarter's bills. "The index is flat, so ignore diesel" is how the better trucks stop coming.

---

## 6. What the clause must not do

- **It must not swallow toll.** FASTag is a separate, checkable line (₹3-₹7/km is a bench, not your plaza list).
- **It must not price empty return.** If the lane has a structural empty leg, price it as its own allowance or fix it with a return load. See the empty-return guide.
- **It must not be a spot-market escalator.** "Rate will follow the market" is not a formula. Spot vs contract is a capacity decision, already written in the dedicated-fleet guide.
- **It must not reset every WhatsApp.** One review rhythm. Monthly is enough for most plant contracts. Daily diesel is a spot product.
- **It must not cite 65% and 0.65 and 2.8% in the same sentence as if they were one rule.**

**Exhibit: callout, three tones**

- Navy: "Name the city and the date, or you do not have a base."
- Teal: "Up and down, or you will overpay in a falling diesel quarter and still fight in a rising one."
- Warm: "A soft freight index and a higher diesel price can happen in the same month. Keep two lines."

---

## 7. How settlement uses the clause

The clause fails if it lives only in the legal PDF.

On each bill the transporter should show:

| Line | Source |
| --- | --- |
| Base rate | Signed card for that body and lane |
| Diesel base and diesel now | Named table, two dates |
| Formula id | "Clause 6.2 Formula 1" or whatever you numbered |
| Uplift percent | The arithmetic, not a lump sum |
| Toll | FASTag statement, if reimbursed |
| Detention | Gate timestamps, not this clause |
| Net | Sum of lines |

[ZAFTYS TMS](/zaftys-tms) is where a trip already collects gate time, weight, and delivery proof. The fuel line belongs on that same trip record so accounts payable does not keep a side spreadsheet. [Freight rate intelligence](/intelligence/freight-rates) is the place to compare the **base** lane, with the limits of that product stated on the page. It is not a substitute for the clause.

**Mid-article CTA (after settlement)**  
Eyebrow: Base rate vs fuel line  
Title: See lane context without pretending it is a national diesel index  
Body: Bring one lane and the diesel city you want in the clause. We will not blend owned trucks and overflow into one rate story.  
Button: Freight rate intelligence → `/intelligence/freight-rates`

Owned fleet, contract fleet, and labeled network overflow keep their labels through the bill. A fuel clause does not turn a partner truck into a company truck.

---

## 8. Nineteen checks before you sign

**Exhibit: scorecard (kind: table, variant scorecard)**  
Groups must match keys the scorecard UI already understands, or use a plain compare table if we do not add a new group. Prefer a plain numbered table in v1 so we do not invent a scorecard group.

| # | Check | Pass looks like |
| --- | --- | --- |
| 1 | Unit and distance basis | ₹/km, ₹/MT, or ₹/trip, plus loaded-only or round-trip kilometres |
| 2 | Body | 32 ft, trailer, bulker, or tipper named. One card does not cover all |
| 3 | Lane | Origin, destination, and any mandatory via |
| 4 | Diesel city | One city, not "India average" |
| 5 | Diesel source | A table both sides can open without calling the driver |
| 6 | Base date | A calendar date, filled in, not "date of agreement" if signature slips |
| 7 | One formula | Formula 1, 2, or 3. Not two of them added together |
| 8 | Constant written | 0.65, a negotiated 0.40 to 0.50, or the share $S$, as a number |
| 9 | Both directions | Down moves become an invoice deduction or credit note by a named deadline |
| 10 | Dead-band | The contract says whether only the movement beyond the band is eligible |
| 11 | Cap and floor | Signed ceiling, floor, and treatment of any unrecovered balance |
| 12 | Rounding | Price, percent, and rate precision written in advance |
| 13 | Review rhythm | Monthly or quarterly, one rhythm |
| 14 | Holiday or missing print | Last published price, then next-business-day correction in the next cycle |
| 15 | Effective trips | Loading date rule, not retroactive on delivered trips |
| 16 | Exclusions listed | Toll, detention, empty km, permits |
| 17 | Evidence and dispute | Print deadline and a short challenge window |
| 18 | Rebasing and renewal | Fixed or monthly base rule stated; freight and diesel reset together at renewal |
| 19 | Label | Own / contract / overflow still named on the trip |

Score in the room: 16 to 19, the clause can go to legal. Under 10, you still have a rate argument waiting for the next diesel headline.

---

## 9. FAQ (draft answers for schema)

**What is a diesel surcharge on an Indian freight contract?**  
A written rule that changes only the base freight when the named diesel price moves. It is not a new spot rate and it is not a toll claim.

**Is the AITWA 0.65% rule the law?**  
No. It was reported in May 2026 as an association fuel-adjustment proposal tied to the 15 May 2026 diesel base, from 20 May 2026. A contract may adopt that arithmetic. It does not apply itself.

**How much does a diesel rise add to freight?**  
On the AITWA card, each ₹1 per litre is 0.65% of freight, so ₹5 is 3.25%. From 15 May to 8 Oct 2026, Delhi diesel rose ₹4.53 (₹90.67 to ₹95.20). On a workshop ₹48/km and 800 km, that is about ₹1,131 at 0.65, about ₹883 with lane-derived $S = 0.46$, and about ₹384 if the clause passes 20% of the diesel percentage change.

**How should a dead-band work?**  
An incremental dead-band avoids a cliff. With a ₹2 band, a +₹4.53 move leaves +₹2.53 eligible and a -₹4.53 move leaves -₹2.53. At 0.45 percentage points per rupee, either direction changes ₹38,400 of basic freight by about ₹437. The contract should say whether a negative amount is deducted on the invoice or issued as a credit note.

**Should the clause go up and down?**  
Yes. A rise-only clause is an escalator. When diesel falls, the shipper keeps paying the peak unless the base rate is rebid.

**Does a falling freight index cancel the surcharge?**  
No. An index describes how easy trucks are to hire. The clause describes diesel versus the contract base. Rebid the base when the index is your evidence. Apply the clause to current bills.

**Where do tolls go?**  
On a FASTag line. Not inside the fuel percent.

**Does this apply to spot bookings?**  
A spot trip can still show a fuel line, but a one-week spot buy is usually an all-in number. The clause matters on contract volume that lives longer than a diesel move. See the spot vs dedicated guide for which volume belongs on contract.

**What diesel price should we use?**  
One city, high-speed diesel, one published table. Public plant contracts use the IOCL retail price for a named city, read on a fixed calendar day (samples use the 15th). Long lanes that refuel across states can use PPAC state prices, weighted by where the litres are bought. Do not use the driver's pump slip. For an AITWA-style card the base date in the 19 May 2026 circular is 15 May 2026. Delhi diesel that day was ₹90.67.

**Can ZAFTYS TMS calculate the uplift?**  
The useful version stores base rate, base diesel, current diesel, and the formula id on the trip, then shows the uplift as its own bill line. That is an operating choice on [ZAFTYS TMS](/zaftys-tms), not a promise that every old spreadsheet will be rewritten.

**Who should own the clause inside the plant?**  
Procurement owns the words. Finance owns the bill test. Dispatch owns the loading date that decides which rate applies. If only legal has the PDF, the clause will not be used.

---

## 10. Sources (checked 8 Oct 2026)

1. AITWA circular of 19 May 2026, as reported by Moneylife, India Today (21 May 2026), ABP, and Artifex: FAF from 20 May 2026, 0.65% freight per ₹1 diesel above the 15 May 2026 price, diesel about 65% of operating cost, factor reduces if diesel falls. Still worth replacing with the PDF of the circular if AITWA publishes it.
2. Crisil Intelligence, "Crisil freight index dips in April" (PDF, May 2026): CRISFrex 100.5 in April 2026 vs 101.4 in March, index base April 2025 = 100. Fuel 50% to 60% of transporter operating expenses. ₹5/litre needs about 2.5% to 2.8% freight to hold margin. Financial Express and Fortune India carried the same band.
3. Crisil, "From pumps to prices" (June 2026) and "How a sustained energy shock can ripple through the industry": fuel about 42% of road transport cost (NCAER); road about 71% of freight movement; freight transport about 54% of logistics cost (DPIIT / NCAER, Sept 2025, as cited). Retail fuel described as up about ₹7.5/litre since 15 May in that June note. Do not paste ₹7.5 onto the 8 Oct Delhi diesel row.
4. Diesel prints. 15 May 2026: Times of India, Business Standard, The Hindu BusinessLine (Delhi diesel ₹90.67, Mumbai ₹93.14). 8 Oct 2026: India Today and The Hindu BusinessLine (Delhi ₹95.20, Mumbai ₹97.83).
5. ITLN, "Rising fuel costs reshape India's logistics economics and freight": customers on a 0.4 to 0.5 factor rather than 0.65.
6. Law Insider samples of BHEL transporter price-variation clauses: IOCL, named city, 15th/16th review, 20% or 30% of the diesel percent, both directions.
7. Gauhati High Court, *Union of India v Freight Carriers*, decided 30 April 2008, (2008) 4 Arb LR 443: the court set aside an escalation award where the fixed-rate contract contained no price-escalation clause.
8. Moneylife on the same AITWA circular: AdBlue nearly doubled, tyres about +5%, tolls revised 1 April 2026. Exclusions, not fuel.
9. Do not use AgroSpectrum's 98.7 CRISFrex figure. The Crisil PDF prints 100.5.

Contract page `/logistics/contract-logistics` and freight-rate page `/intelligence/freight-rates` still need a read before CTA copy promises a diesel product.

---

## Infographic list for the live template

Build these in `src/lib/blog-exhibits-*.ts` when the post is implemented. No ASCII art on the live page (same rule as the spot-vs-dedicated post).

| Section heading (must match exactly) | Exhibit |
| --- | --- |
| Why the rate card goes stale in ninety days | timeline, 4 phases |
| What actually sits inside a truck rupee | stacked bar of the workshop variable split, plus a donut of the three published pies (42%, 50%, 65%) |
| Three diesel escalation formulas for freight contracts | three branded formula boards plus a comparison table |
| How to write a fuel adjustment factor clause | branded 6-step flow, 7-sentence checklist, and incremental dead-band table |
| Diesel surcharge calculation using Delhi fuel prices | branded bill comparison: ₹1,131, ₹883, ₹783, ₹384, ₹0 |
| What the clause must not do | 3 callouts (navy, teal, warm) |
| How settlement uses the clause | compare or plain table of bill lines |
| Nineteen checks before you sign | numbered table |

Hero (when we generate it): a rate card and a diesel price board on a dispatch desk, industrial yard in the background, no fake dashboard numbers that look like a product claim. Alt text names the fuel clause, not "logistics technology".

---

## Internal links to place in prose

- [Contract logistics](/logistics/contract-logistics) - primary CTA, twice (after the seven lines, and at the close)
- [Freight rate intelligence](/intelligence/freight-rates) - once, with the limit stated
- [Dedicated fleet](/logistics/dedicated-fleet) - once, for lanes that should not be rebid every diesel headline
- [Spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india) - once
- [Empty returns](/blog/reduce-empty-return-trips) - once
- [Container trucking](/blog/container-trucking-logistics-india) - once, only to point at the existing ₹5 / 2.5-2.8% line
- [ZAFTYS TMS](/zaftys-tms) - once, settlement line only

Do not link `/services/contract-logistics` or `/products/tms`. Those paths are not the live site.

---

## Close (draft)

A fuel clause is a small piece of arithmetic with a city, a date, and one formula. Plants that skip it do not save the diesel money. They pay it later inside a fatter base rate, with nothing to audit.

If the lane is stable enough to contract, write the clause before the next diesel move, and keep toll, detention, and empty kilometres on their own lines. Start from [contract logistics](/logistics/contract-logistics).
