---
title: "How to Calculate Truck Freight Rates in India: A Complete Cost and Rate Benchmarking Guide"
seo_title: "Truck Freight Rates in India: Cost and Rate Benchmarks | ZAFTYS"
meta_description: "Calculate truck freight rates in India from diesel, AdBlue, NHAI tolls, tyres, and fixed cost. Normalise bids to net landed cost per tonne."
slug: "truck-freight-rates-india-cost-rate-benchmarking-guide"
category: "Freight Procurement · Fleet Economics & Benchmarking"
template: "deep-research"
tags: ["Freight Rates", "Fleet Economics", "Rate Benchmarking", "Industrial FTL", "Toll", "Diesel", "India"]
target_reading_time: "30-35 mins"
target_word_count: 7500
published_status: "implemented locally - 19 Oct 2026"
research_date: "2026-10-19"
primary_cta: "/logistics/contract-logistics"
secondary_links:
  - "/intelligence/freight-rates"
  - "/logistics/dedicated-fleet"
  - "/zaftys-tms"
  - "/blog/container-trucking-logistics-india"
  - "/blog/spot-market-vs-dedicated-fleet-india"
  - "/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide"
keywords:
  primary:
    - "truck freight rates in India"
  secondary:
    - "truck transport charges per km in India"
    - "freight rate calculation"
    - "road freight cost calculator India"
    - "truck freight rate per ton"
    - "transportation cost per km"
    - "freight rate benchmarking"
    - "how to calculate truck transport charges"
  use_in_title_or_h1:
    - "truck freight rates in India"
    - "cost"
    - "benchmarking"
  use_in_h2:
    - "freight rate calculation"
    - "per km"
    - "per tonne"
    - "net landed cost"
---

# How to Calculate Truck Freight Rates in India: A Complete Cost and Rate Benchmarking Guide

**Status:** Draft researched 19 Oct 2026.  
**Folder:** `docs/blogs/` (same place as the diesel-clause, container, spot-vs-dedicated, and cost-leaks drafts).  
**Live voice:** Plain, plant-desk English. No em dash or en dash. Spaced hyphens only.  
**Honesty:** Statutory lines below are named (MoRTH, NH Fee Rules, CGST Rules, Carriage by Road Act, PIB). Pump prices are city prints for 19 Oct 2026. Every other rupee band is a **workshop**. It is not a ZAFTYS audited national freight index. Re-read the diesel table and the plaza FASTag statement on the day you open the tender.

## Who this is for

VP of supply chain, transport procurement, plant logistics directors, fleet owners, and industrial 3PL operators who buy or sell full-truckload road freight in India. The reader already receives quotations in ₹/km, ₹/MT, and ₹/trip. They need one method that puts those quotations on the same cost stack.

## What this post does not repeat

- Capacity split (contract vs spot): [Spot market vs dedicated contract fleets](/blog/spot-market-vs-dedicated-fleet-india)
- Empty kilometres as a network problem: [Reduce empty return trips](/blog/reduce-empty-return-trips)
- Gate, weigh, and POD leaks: [5 hidden cost leaks in heavy industrial freight](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide)
- The diesel clause itself: [How to write a diesel surcharge clause](/blog/diesel-surcharge-freight-contract-india)
- Axle law in full: [India axle load and GVW limits](/blog/india-axle-load-gvw-limits-heavy-freight)
- Port chassis and box imbalance: [Container trucking in India](/blog/container-trucking-logistics-india)
- Barrier-less toll: [FASTag, MLFF, and GNSS tolling](/blog/fastag-mlff-gnss-tolling-india-freight)

## Six-metric panel

Read this before the chapters. The first two rows mix a published pie with a workshop corridor. The fuel row is a dated print. The toll row separates the 2007-08 statute from a 2026 expressway print and a workshop band.

| # | Metric | Figure | What it is |
| --- | --- | --- | --- |
| 1 | Benchmark cost corridor | ₹1.60 to ₹2.35 per net tonne-kilometre (PTKM) | Workshop for heavy multi-axle freight on lanes longer than 800 km, after a fair margin, on a corridor that is not a dead end. Confirm on your payload and your km. |
| 2 | Diesel and AdBlue share | 48% to 56% of vehicle running cost in this workshop | Sits inside Crisil's April 2026 note that fuel is nearly 50% to 60% of transporter operating expenses. AITWA's May 2026 circular used about 65% of running cost. Those are different pies. Do not average them. |
| 3 | Fuel price spread | Delhi diesel ₹95.20/L. Hyderabad diesel ₹104.23/L. Gap ₹9.03/L. | Prints reported for 19 Oct 2026. An older desk card of Delhi ~₹87.62 and Telangana/AP ~₹95.65 is a pre-hike baseline. Do not freeze today's tender on it. |
| 4 | NHAI toll | 2007-08 base ₹3.45/km for a 4-to-6 axle MAV on a four-lane NH. Expressway rule is 1.25 times. Ganga Expressway (opened to toll 29 Apr 2026) published ₹12.60/km for multi-axle. | Workshop band used later in this dossier for a mixed NHAI industrial corridor: ₹7.80 to ₹11.95 per km. That band is not a national gazette rate. |
| 5 | Backhaul | Empty-leg cost ratio α = 0.40 to 0.70 of loaded running cost | Lane multiplier is β = 1 + (khali probability × α). β is a multiplier on cost. It is not a 40% discount on the invoice. |
| 6 | RFP normalisation | 100% of carrier bids audited on one fuel baseline, one detention clock, and one hamali treatment | A procurement rule for the tender, not a market statistic. |

## Table of contents

1. The dual realities of freight pricing in India
2. Freight contracting formats: per km, per tonne, lump sum
3. Anatomy of truck operating costs
4. Vehicle class and payload economics
5. Why the same route yields different quotations
6. The backhaul equation
7. SOP: transporter quote normalisation
8. Worked example: Jamshedpur to Pune
9. The rate benchmarking engine
10. FAQ and statutory citations

---

## 1. The dual realities of freight pricing in India

Indian road freight is priced in two rooms that rarely show each other their arithmetic.

Asset owners and industrial 3PLs build a rate from the truck's cost stack, then add a margin, then adjust for the chance the truck comes back empty. Transport nagars and mandis clear a rate from how many trucks are standing that morning and how many loads are shouting for them. Both rates can be "the market" on the same Tuesday. They answer different questions.

```text
DUAL PRICING MECHANISM

┌──────────────────────────────┐     ┌──────────────────────────────┐
│ COST-PLUS ENGINEERING        │     │ SPOT SUPPLY AND DEMAND       │
│ Asset owner / contract 3PL   │     │ Transport nagar / mandi      │
├──────────────────────────────┤     ├──────────────────────────────┤
│ Diesel, DEF, toll, tyre      │     │ Trucks free at the stand     │
│ EMI, permit, crew            │     │ Loads waiting past noon      │
│ Km the truck will actually   │     │ Harvest, festival, monsoon   │
│ run this month               │     │ Broker's book for the day    │
│ Margin and backhaul β        │     │ "What will move it today"    │
└──────────────┬───────────────┘     └──────────────┬───────────────┘
               │                                    │
               └──────────────┬─────────────────────┘
                              ▼
               ┌──────────────────────────────┐
               │ FAIR CONTRACT EQUILIBRIUM    │
               │ Index-linked rate card       │
               │ One fuel city, one toll rule │
               │ One detention clock          │
               │ Reviewed, not re-argued      │
               └──────────────────────────────┘
```

**Cost-plus** is the right room for a plant that needs the same trailer every day. The owner can show the litres, the FASTag file, the EMI, and the kilometres. A rate that ignores that stack will hold only until the owner stops placing trucks.

**Spot** is the right room for a surge the contract fleet cannot cover. The price is a clearing price. It can sit 30% away from last month's contract card because the stand is empty, not because diesel moved 30%. How to size that overflow is covered in [spot market vs dedicated contract fleets](/blog/spot-market-vs-dedicated-fleet-india).

### The commission layer

Between the plant and the truck there is often a booking agent, then a commission agent, then the owner. Each tier can add a cut for "arranging the vehicle". A desk range used in this workshop is **8% to 15% of the freight** across two tiers combined, on loads where the agent does not supply the trailer, the driver, the insurance, or the FASTag. That range is a negotiation fact from industrial desks. It is not a statutory brokerage cap.

The cut is rational for the agent. It is a cost leak for the shipper when the same owner would have taken the load direct. A contract rate card with named vehicles, or a 3PL that places its own fleet and labels any overflow, removes the tier instead of arguing about it after the LR is printed.

### Equilibrium worth signing

A fair card has four properties.

1. The base rate can be rebuilt from the cost stack in Chapter 9.
2. Diesel moves through one clause, on one city's IOCL or PPAC print, up and down. The clause method is in the [diesel surcharge guide](/blog/diesel-surcharge-freight-contract-india).
3. Toll is either inside the lump sum or reimbursed from FASTag, never both.
4. The card is rebased on a date, not whenever a WhatsApp forward arrives from the nagar.

That is the move from spot volatility to an index-linked card. The index is a named input (diesel, and if you choose, a freight index such as Crisil's CRISFrex for the annual rebase). The card is the contract.

---

## 2. Freight contracting formats: per km, per tonne, lump sum

Pick the unit from the cargo and the route pattern. Then write the exclusions in the same clause. Most bid gaps in Chapter 5 are two units pretending to be one price.

### Per kilometre (₹/km)

Use ₹/km for dedicated fleets, plant shuttles, and milk runs where the route repeats and the payload changes. The transporter is selling kilometres. You are buying a truck-day spread over a route you can audit.

The failure mode is the kilometre itself. A longer path, a private odometer photo, or a "via" that was never in the tender inflates the bill while the cargo sits on the same trailer. The control is a geofenced shortest practical route, locked in the tender pack, with a kilometre cap. [ZAFTYS TMS](/zaftys-tms) can hold that corridor. GPS that only shows a moving dot cannot.

Toll treatment must be explicit. A ₹/km rate that is silent on toll will be read by the owner as "plus FASTag" and by procurement as "all in".

### Per tonne (₹/MT)

Use ₹/MT for dense bulk: steel, cement, ores, clinker, where the trailer cubes out on weight. The shipper pays for tonnes. The owner still pays for the whole vehicle. Those two facts meet in the guaranteed minimum weight.

$$
\text{Freight}_{₹} = \max(\text{Actual billed MT},\ \text{GMW}) \times \text{Rate}_{₹/\text{MT}}
$$

GMW (guaranteed minimum weight) is the tonnes the shipper pays even when the coil, the heat, or the rake plan loads light. Without it, the owner prices the worst payload into every bid, and the shipper with a heavy load subsidises the shipper with a light one inside the same rate.

Dead-freight is the gap between GMW and what the vehicle could have carried legally. It is a commercial allowance. It is not permission to cross the GVW on the registration certificate. MoRTH S.O. 3467(E) still caps the combination. See Chapter 4.

A per-tonne rate must also say whether toll, hamali, and detention sit inside the ₹/MT. Chapter 8 is a bid that looked cheap because they did not.

### Lump sum (₹/trip)

Use ₹/trip on a high-frequency trunk lane with a stable payload and a stable route. One number is easy for a plant P&L. It is also where unlisted charges hide: a toll plaza that opened after the tender, a municipal green tax, a state border queue, a second drop, a tarpaulin, a dunnage set.

Write an inclusion list, not a slogan that says "all inclusive". The list that belongs on an industrial trunk lane:

- Diesel at the named base city, with the escalation clause attached
- FASTag tolls on the locked corridor, as on the tender date
- One loading point and one unloading point
- Tarpaulin and standard lashing
- Driver bhatta
- Transit time cap

Keep outside the lump sum, on their own rates: extra drops, ODC permits and escorts, detention after free time, and any toll plaza that did not exist on the base date. A new plaza is a pass-through against the FASTag statement. It is not a reason to reopen the whole card.

---

## 3. Anatomy of truck operating costs

This is the carrier's P&L, stated so a shipper can audit it. Figures in rupees per kilometre are a workshop for a loaded heavy tractor-trailer unless a statute or a dated print is named in the sentence.

```text
COST STACK

Trip rupees
├── A. Variable running cost (per km)
│     ├── Diesel
│     ├── AdBlue (DEF)
│     ├── Toll (NHAI / state expressway / municipal)
│     └── Driver bhatta (when paid per km or per day on the road)
├── B. Wear (per km)
│     ├── Tyres and cold retreads
│     └── Maintenance and lubricants
└── C. Fixed standing cost (per month, then ÷ km actually run)
      ├── EMI or lease
      ├── Insurance, national permit, road tax, fitness, green cess
      └── Base crew salary
```

### A. Variable running costs

#### Diesel

Loaded consumption on a 49T class trailer in this workshop is **2.8 to 3.2 km per litre** on highway, with the load on. Empty running is better and is handled in the backhaul factor, not by pretending the loaded figure is a round trip.

$$
C_{\text{fuel}} = \frac{P_{\text{diesel}}}{K}
$$

$P_{\text{diesel}}$ is ₹/litre at the **origin OMC retail print** you named in the contract. $K$ is loaded km per litre.

On the 19 Oct 2026 Delhi print of ₹95.20/L:

| Loaded mileage | Diesel ₹/km |
| --- | --- |
| 2.8 km/L | 34.00 |
| 3.0 km/L | 31.73 |
| 3.2 km/L | 29.75 |

The same 3.0 km/L truck fuelling in Hyderabad at ₹104.23/L spends **₹34.74/km**. That is ₹3.01/km more than Delhi before any toll. A national "diesel average" erases a real lane.

State VAT and local cess are already inside the retail print. You do not add VAT again. You do name the city, because the tax difference is the city difference. PPAC's daily IOCL metro series is the table both sides can open. On 19 Oct 2026 that series, as republished the same day, showed Delhi diesel ₹95.20, Mumbai ₹97.83, Chennai ₹99.55, Kolkata ₹99.82, and Hyderabad ₹104.23.

An older card of Delhi near ₹87.62 matches the neighbourhood of the pre-15 May 2026 Delhi print (the May hike took Delhi from ₹87.67 to ₹90.67). It is a base-date candidate for an old contract. It is the wrong baseline for a tender written in October 2026.

#### AdBlue (DEF)

BS-VI trucks with SCR consume diesel exhaust fluid with the diesel. This workshop uses **3.2% to 4.0% of diesel volume**. At 3.0 km/L and 3.6% DEF:

$$
C_{\text{DEF}} = 0.036 \times \frac{1}{3.0} \times P_{\text{DEF}} = 0.012 \times P_{\text{DEF}}
$$

| DEF price | What it is | ₹/km at 3.6% and 3.0 km/L |
| --- | --- | --- |
| ₹36 to ₹44 per litre | Workshop bulk tote price for a fleet that buys in IBCs | ₹0.43 to ₹0.53 |
| ₹55 to ₹70 per litre | Workshop pump retail | ₹0.66 to ₹0.84 |

DEF is not diesel. A fuel clause that swallows it cannot be audited when AdBlue moves and diesel does not. AITWA's May 2026 note already listed DEF as a cost that rose beside diesel. Keep it on its own line or inside the base rate with a review, not inside the diesel factor.

At a bulk ₹40/L, DEF is about ₹0.48/km. Diesel on the Delhi 3.0 km/L case is ₹31.73/km. Together they are ₹32.21/km. If total running cost in the Chapter 9 engine is about ₹60/km before margin, this pair is near the middle of the 48% to 56% band. If you add only diesel and forget DEF, you will still be inside a wide band and you will be wrong on the invoice.

#### NHAI highway tolls

The National Highways Fee (Determination of Rates and Collection) Rules, 2008, rule 4, set the **base year 2007-08** rate per km for a four-lane national highway. PIB has restated the same table: two-axle bus or truck ₹2.20, three-axle ₹2.40, HCM/EME/MAV (four to six axles) ₹3.45, oversized vehicles (seven or more axles) ₹4.20.

Rule mechanics that change the bill:

- An expressway is **1.25 times** the four-lane rate (PIB; the Rules).
- A bypass costing ₹10 crore or more (2007-08 base) is **1.5 times**.
- A structure longer than 60 m is converted to an equivalent highway length. The current equivalence factor has been amended. Read the notification in force for that plaza. Do not memorise "times ten" from an old circular without the gazette date.
- Fees are revised each **1 April** under rule 5: 3% a year without compounding from 1 April 2008, plus 40% of the WPI movement from the week ending 6 January 2007. In 2026 NHAI restored a WPI linking factor of **1.641** (policy circular following a MoRTH office memorandum of 29 June 2026) after a period at 1.561. The factor links WPI series. It is not itself the ₹/km.

There is no single national "MAV rupee per km" for 2026. Each plaza is notified. Two public anchors are enough to stop a fake national number:

| Anchor | 4 to 6 axle / multi-axle | Source |
| --- | --- | --- |
| Four-lane NH, base year 2007-08 | ₹3.45 per km | Fee Rules 2008, rule 4, as restated by PIB |
| Expressway multiple on that rule | 1.25 × the NH rate | PIB |
| Ganga Expressway, toll collection from 29 Apr 2026 | ₹12.60 per km multi-axle. ₹16.10 per km oversized. ₹8.20 per km for bus and truck. | UPEDA chief engineer, reported 29 Apr 2026. This is a state expressway tariff, not the NHAI 2007-08 table. |

The workshop band used in this dossier for a mixed NHAI industrial corridor of 4-to-6 axle combinations is **₹7.80 to ₹11.95 per km** of route. Use it to sense-check a bid. Replace it with the FASTag statement before you award. The Jamshedpur to Pune worked example uses **₹13,272 over 1,580 km, which is ₹8.40/km**, inside that band, and labelled as a plaza stack, not a gazette.

FASTag is the payment rail at plazas that still have a barrier. GNSS and multi-lane free flow change where the charge is computed, not the need to keep toll off the diesel clause. Planning implications are in the [FASTag, MLFF, and GNSS post](/blog/fastag-mlff-gnss-tolling-india-freight).

Cash without a valid FASTag has been charged at a multiple of the FASTag fee (2× cash, with a lower multiple reported for UPI). A contract that reimburses "toll" should say FASTag fee, not the penalty multiple.

#### Tyres and retreads

A heavy tractor-trailer in this workshop carries **18 to 22** radial positions. The life model used for the ₹/km figure:

- Original life: 100,000 km
- Two cold retreads (pre-cured): 50,000 km each
- Total life per position: 200,000 km

$$
C_{\text{tyre}} = \frac{N \times (P_{\text{new}} + 2 \times P_{\text{retread}})}{200{,}000}
$$

Workshop prices that land on the dossier figure: 20 positions, new tyre ₹22,000, retread ₹6,000.

$$
C_{\text{tyre}} = \frac{20 \times (22000 + 12000)}{200000} = \frac{6{,}80{,}000}{200000} = ₹3.40\text{ per km}
$$

₹3.40/km is the output of those inputs. A fleet that buys a ₹32,000 tyre or kills casings at 70,000 km will not see ₹3.40. Ask for the casing count and the last retread invoice. Do not import this number into a lane as if NHAI had notified it.

#### Maintenance and lubricants

Keep a separate wear line so tyre life is not doing two jobs. This workshop uses **₹2.80/km** on a 49T class unit for engine oil, differential oil, grease, brake lining, and suspension. Drain intervals and lining life vary by OEM and by how long the truck stands at your gate with the engine running. The line is a placeholder until the fleet's own service file replaces it.

At ₹3.40 tyre + ₹2.80 maintenance, wear is **₹6.20/km**.

### B. Fixed standing capital costs

Fixed cost does not care that the truck is in your parking lot. It cares how many kilometres you let it run after you release it.

Workshop monthly pool that makes the utilisation proof exact:

| Line | ₹ per month |
| --- | --- |
| EMI or lease on a 55T tractor-trailer (Tata Signa, Ashok Leyland, BharatBenz class). Desk range ₹78,000 to ₹92,000. This proof uses the middle. | 85,000 |
| Compliance pool: comprehensive plus statutory third party, national permit, road tax, fitness, green cess | 16,925 |
| Base driver and helper salary, excluding trip bhatta | 23,000 |
| **Standing pool** | **1,24,925** |

Third-party insurance is compulsory under the Motor Vehicles Act. Comprehensive cover is a contract choice. IRDAI sets the motor framework. The rupees above are not an IRDAI premium table.

A national permit for a goods carriage sits under section 88 of the Motor Vehicles Act. States still issue it on their own form set. Form 48 is widely used as the application. Use the form your RTO actually accepts.

$$
C_{\text{fixed per km}} = \frac{F_{\text{month}}}{M}
$$

$M$ is the kilometres the truck completes in the month.

$$
\frac{1{,}24{,}925}{9{,}500} = ₹13.15\text{ per km}
$$

$$
\frac{1{,}24{,}925}{6{,}000} = ₹20.82\text{ per km}
$$

A 48-hour plant detention that knocks a heavy unit from 9,500 km to 6,000 km in the month adds **₹7.67/km** of standing cost before anyone sends a detention invoice. On a 1,580 km trip that is about **₹12,100** of fixed cost that the truck did not earn back. The detention bill and this dilution are the same waiting, priced twice if you are careless, and priced once if the rate card assumed 9,500 km and the gate delivers 6,000. Gate design is the subject of the [plant TAT guide](/blog/plant-detention-tat-yard-gate-india) and leak one in the [cost-leaks guide](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).

Bhatta is not inside the ₹13.15. It is in the variable stack in Chapter 9 so a short shuttle and a four-day trunk are not forced through the same per-km salary.

---

## 4. Vehicle class and payload economics

MoRTH notification **S.O. 3467(E), dated 16 July 2018**, issued under section 58(1) of the Motor Vehicles Act, 1988, replaced S.O. 728(E) of 18 October 1996. It fixes maximum safe axle weight. Gross vehicle weight shall not exceed the sum of those axle weights, and shall not exceed **49 tonnes for a rigid vehicle** or **55 tonnes for a semi-articulated trailer or truck-trailer**, other than a modular hydraulic trailer. A tolerance of **5% of GVW** is allowed for compliance with section 113(3). Pneumatic suspension permits **1 tonne extra per axle** where the notification marks the asterisk.

That is a legal ceiling. Payload is not printed in the notification.

$$
\text{Legal payload} = \text{Permissible GVW or GCW} - \text{Tare}
$$

Tare is the unladen weight on the registration certificate and on your weighbridge. A "49T trailer" in a broker's message is often the GCW class, not 49 tonnes of steel.

Workshop reference, for tender comparison. Tare and payload are engineering bands, not gazette figures. Confirm the RC.

| Market name | Axle picture | Legal ceiling to check | Workshop tare | Workshop legal payload | Loaded km/L workshop |
| --- | --- | --- | --- | --- | --- |
| 16T / 19T ICV | Rigid, two or three axles | GVW on the RC, inside the axle table | 6.0 to 7.5 t | 9 to 12 t | 5.0 to 6.5 |
| 28T, 10-wheeler | Rigid | Up to the RC, cap 49 t rigid | 9.5 to 11 t | 16 to 18 t | 3.8 to 4.5 |
| 35T, 12-wheeler | Rigid | Up to the RC, cap 49 t rigid | 11 to 13 t | 21 to 24 t | 3.4 to 4.0 |
| 42T, 14-wheeler | Rigid | Up to the RC, cap 49 t rigid | 13 to 15 t | 26 to 29 t | 3.2 to 3.6 |
| 49T prime mover combination | Tractor plus trailer, sold as 49T | Check RC. Rigid cap is 49 t. A tractor-trailer can be certified toward 55 t. | 14 to 16 t | 30 to 34 t | 3.0 to 3.4 |
| 55T semi-trailer | Tractor plus semi-trailer | 55 t GCW, axle sum, 5% tolerance only for the section 113 check | 15 to 18 t | 34 to 37 t | 2.8 to 3.2 |

The 5% tolerance is an enforcement allowance for scale variation. It is not a commercial payload you may sell in the tender. Loading to 55 t plus 5% as a routine plan is how trucks get offloaded at a highway weighbridge.

### Payload scale

Running cost per kilometre rises with the vehicle. Cost per tonne-kilometre falls while the extra tonnes are legal and the truck is full.

$$
\text{PTKM} = \frac{C_{₹/\text{km}}}{W}
$$

$W$ is net billed tonnes, after GMW, not the class name painted on the door.

Workshop illustration at a full legal payload and a round running cost (fuel at Delhi ₹95.20, plus the other lines at the Chapter 9 shape). These PTKM figures are teaching ratios.

| Class | Workshop all-in cost before margin | Payload used | PTKM before margin |
| --- | --- | --- | --- |
| 16T ICV | ₹28/km | 10 t | ₹2.80 |
| 28T | ₹38/km | 17 t | ₹2.24 |
| 35T | ₹46/km | 22 t | ₹2.09 |
| 49T / 55T | ₹55/km | 34 t | ₹1.62 |

A shipper who awards "lowest ₹/km" will prefer the ICV and pay the worst PTKM. A shipper who awards "lowest ₹/MT" without a GMW will watch the owner arrive with a larger truck and a light load, or with a rate that assumed 34 t and a dispatch that released 26 t. The award unit and the GMW have to sit in the same cell of the comparison sheet.

The hero band of **₹1.60 to ₹2.35 PTKM** is this 49T/55T world after a margin, on a long lane, with a backhaul that is not a dead end. The ₹1.62 line above is before margin. Chapter 9 puts the margin back in.

---

## 5. Why the same route yields different quotations

A 30% spread on one lane is normal when the four causes below are allowed to hide inside one number. It is not evidence that one owner is dishonest. It is evidence that the tender asked for a price and forgot to ask for the conditions.

### 1. Who actually owns the asset

| Tier | What the price contains |
| --- | --- |
| Direct owner | EMI, diesel, driver, and a margin. The stack in Chapter 3 is visible if they will open it. |
| Broker | The owner's price plus the 8% to 15% commission layer in Chapter 1. Placement depends on who is free at the stand. |
| Managed 3PL | A contracted rate, a placement SLA, and a labelled overflow when their own fleet is full. You pay for the SLA. You should be able to see which truck is theirs. |

Comparing these three on headline ₹/MT is a category error. The [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india) guide is the capacity decision. This guide is the rate arithmetic once you have chosen.

### 2. Where the truck has to go next

An owner whose trailer will unload in Pune and reload for a western mill the next morning can price the headhaul without a full empty return. An owner who will deadhead to the next load prices the empty kilometres into your coil. Chapter 6 writes that as β. Two honest owners, same diesel, different β, different bids.

### 3. When you pay

A 15-day bank transfer and a 90-day paper LR cycle are different products. This workshop uses **14% to 18% a year** as the cost of carrying an unsecured transporter receivable. It is not an RBI scheme rate.

$$
\text{Credit drag} = \text{Freight} \times r \times \frac{N}{365}
$$

On ₹1,18,000 at 16% for 75 extra days (15-day promise versus 90-day paper):

$$
1{,}18{,}000 \times 0.16 \times \frac{75}{365} ≈ ₹3{,}893
$$

That is about 3.3% of freight. It will not explain a 30% gap on its own. It will decide a close bid, and it will come back as a "diesel revision" if you refuse to write it down. Normalise every bid to the credit your accounts payable actually performs. Chapter 7, step 7.

### 4. What your gate feels like

Drivers talk. A plant with a chronic 48-hour gate earns a premium, or a shortage of trucks, or both. The premium is the detention rate plus the fixed-cost dilution in Chapter 3. Owners who already have a bay window inside a dedicated fleet do not price the same fear. If your tender history shows 48 hours and your bid sheet shows a 24-hour free time, the cheap bid is renting optimism.

---

## 6. The backhaul equation

Industrial India does not produce and consume in the same district. Steel, cement, and project cargo move out of eastern and western producing belts. Consumption centres in the north and the south send back a thinner mix of general cargo, parcels, and empties. The truck still has to return.

Three corridor types are enough for a rate card.

| Archetype | Examples a desk will recognise | Khali probability in this workshop | What β does |
| --- | --- | --- | --- |
| Balanced trunk | Dense industrial pairs with reload at both ends | 0.10 to 0.25 | Small uplift |
| Primary headhaul | Mill to a consumption city with a partial reload | 0.30 to 0.55 | Material uplift |
| Dead-end deficit | Guwahati and much of the Northeast, parts of Kerala, Jammu and Kashmir lanes with thin return industry | 0.70 to 0.95 | The empty leg is almost a second trip |

$$
\alpha = \frac{C_{\text{empty}}}{C_{\text{loaded running}}}
$$

α is the empty-leg cost ratio. This dossier uses **0.40 to 0.70**. The empty truck still pays a large share of toll and still burns fuel, usually less fuel than the loaded leg, and it avoids hamali. α = 0.40 is a kind corridor (shorter empty, some toll already paid). α = 0.70 is an empty return that still crosses the same plazas.

$$
\beta = 1 + p_{\text{khali}} \times \alpha
$$

$p_{\text{khali}}$ is the probability the return is empty. When a return load exists, this simple form treats the return freight as covering the empty-leg cost, so only the khali probability loads your headhaul. If the return load only covers part of that cost, replace α with α × (1 − credit).

Worked points:

| Case | p | α | β |
| --- | --- | --- | --- |
| Balanced, cheap empty | 0.10 | 0.50 | 1.05 |
| Headhaul, half the time empty | 0.50 | 0.60 | 1.30 |
| Dead-end | 0.90 | 0.70 | 1.63 |

A β of 1.63 means the shipper on the headhaul is paying 63% extra because the truck is expected to come home empty. Calling that a "market premium" and then also paying a round-trip kilometre rate is paying the empty leg twice.

Return cargo credit, when you have it, should be a line the 3PL can show: the reload customer, the ₹/MT, and the kilometres. A verbal promise that "Pune always has a load" is p = 0 in a sales meeting and p = 0.8 on the first month's GPS.

Container lanes add a second empty: the box has to go back to the port or the ICD even when the trailer finds a domestic load. That cycle is a different β. Use the [container trucking guide](/blog/container-trucking-logistics-india) for chassis and port empties, and keep the domestic FTL β in this chapter.

---

## 7. SOP: transporter quote normalisation

Run every bid through the same eight steps before anyone ranks L1. The output is net landed cost per tonne, not the number in the subject line of the email.

```text
8-STEP QUOTE NORMALISATION

[1] Origin OMC fuel baseline
        │
        ▼
[2] Toll: all-in  or  FASTag actuals
        │
        ▼
[3] One detention clock and one demurrage rate
        │
        ▼
[4] Hamali, lashing, tarpaulin, dunnage
        │
        ▼
[5] GPS corridor and transit-time cap
        │
        ▼
[6] Weighbridge shortage tolerance
        │
        ▼
[7] Credit period gross-up
        │
        ▼
[8] Net landed cost per tonne
```

**Step 1. Origin fuel.** Freeze one city and one date. For a single-point dispatch, use the IOCL retail diesel at that city. For a lane that refuels in several states, name PPAC and the rule (origin only, or a simple average of origin and destination). Attach the print. The escalation clause below uses the same city.

**Step 2. Toll.** Convert every bid to one treatment. Either the lump sum contains the plazas listed in the tender, or every bid adds the same FASTag estimate and later bills actuals against that list. A bid that is "plus toll" is not comparable to a bid that is silent.

**Step 3. Detention.** One free time for the whole tender. This dossier uses **24 hours to load and 24 hours to unload** as the industrial standard to write down. Your plant may justify a different pair. It may not justify a different pair per bidder. Demurrage after free time is a ₹/hour by vehicle class, from the same sheet. Historical overrun at your gate is added to every bidder who does not already have a booked window, using the last quarter's average, not the bidder's hope.

**Step 4. Incidentals.** Hamali, lashing, tarpaulin, and dunnage are either in the rate or on a schedule. "As applicable" is not a schedule. If the plant's contractor supplies hamali, say so, and do not let a carrier add it later.

**Step 5. Corridor SLA.** Locked route, kilometre cap, and a transit-time cap that fits e-way bill validity (Chapter 10). GPS on the corridor is a condition of the rate, not a paid extra, for any fleet you are calling dedicated.

**Step 6. Shortage.** Write a tolerance of **0.2% to 0.3%** of dispatch weight for ordinary dry bulk and steel, and a settlement rule past it. This is a commercial tolerance. It is a different number from the 5% GVW enforcement tolerance in S.O. 3467(E).

**Step 7. Credit.** Gross every bid up to the credit your company actually pays, at a named annual rate. This workshop uses 16% when the contract is silent. A bidder who offers 60 days when you pay in 30 is giving you a financing benefit. A bidder whose rate is valid only for 15 days, when you pay in 60, is about to send a debit note.

**Step 8. NLCT.**

$$
\text{NLCT} = \frac{\text{Normalised trip ₹}}{\text{Billed tonnes}}
$$

Rank NLCT. Keep PTKM beside it so a short lane and a long lane are not crowned by the same ₹/MT habit.

$$
\text{PTKM} = \frac{\text{NLCT}}{\text{Lane km}}
$$

### Fuel escalation that matches step 1

Use one formula. The diesel guide has three. For this rate engine the auditable form is the share of the diesel percent, applied to the **base freight line only**:

$$
\text{Uplift \%} = S \times \frac{P_{\text{now}} - P_{\text{base}}}{P_{\text{base}}} \times 100
$$

$S$ is the diesel share of base freight on that lane, computed from litres per km, not copied from AITWA's 0.65 card and Crisil's 50% at the same time.

$$
\text{Rate}_{\text{new}} = \text{Rate}_{\text{base}} \times \left(1 + \frac{\text{Uplift \%}}{100}\right)
$$

Down as well as up. Toll, detention, hamali, and empty kilometres stay outside.

---

## 8. Worked example: Jamshedpur to Pune

**Scenario (workshop).** Steel coil. Planning distance **1,580 km** on the locked corridor. Vehicle class: 49T tractor-trailer. Billed payload **34 MT**, inside a legal combination and inside GMW. Lane volume **40 trips a month**. That volume is about seven trucks if each runs near 9,500 km. Do not divide fixed cost by 40 × 1,580. One truck cannot do 63,200 km in a month.

**Bids as they arrived.**

| | Transporter A | Transporter B |
| --- | --- | --- |
| Form | Lump sum ₹1,18,000 per trip | ₹2,950 per MT, tolls at actuals |
| Headline on 34 MT | ₹1,18,000 | ₹1,00,300 |
| How it looks | | **₹17,700 cheaper** |

A's lump sum includes the tender plaza list, hamali, lashing, tarpaulin, and a dedicated bay window. Payment term written on the quote: 30 days. B's ₹2,950 is freight only, valid for payment in 15 days, with 24 h / 24 h free time and demurrage of ₹1,000 per hour after that.

**The FASTag stack both sides should have attached.** 26 fee points on this planning corridor, **₹13,272** (₹8.40/km). Count the live statement before award. The count is part of the workshop, so the arithmetic can be checked.

**Plant facts both bids must wear.** Accounts payable pays this lane on a **60-day** cycle. Last quarter, trucks without a booked window waited **20 hours** past the 24-hour loading free time. A's dedicated window already prices that wait. B's demurrage clause will invoice it.

Credit rate for the gross-up: **16%** a year.

| Normalisation line | A | B |
| --- | --- | --- |
| Headline | 1,18,000 | 1,00,300 |
| Tolls ₹13,272 | Inside the lump sum | +13,272 |
| Hamali, lashing, tarpaulin | Inside the lump sum. Workshop schedule ₹3,400. | +3,400 |
| Cash before detention and credit | 1,18,000 | 1,16,972 |
| Detention, 20 h × ₹1,000 | Already in the dedicated window | +20,000 |
| Credit gross-up to the plant's 60-day cycle | 30 extra days on ₹1,18,000: +1,552 | 45 extra days on ₹1,16,972: +2,307 |
| **Normalised trip** | **1,19,552** | **1,39,279** |
| **NLCT ₹/MT** | **3,516** | **4,096** |
| **PTKM** | **2.23** | **2.59** |

$$
1{,}18{,}000 \times 0.16 \times \frac{30}{365} = ₹1{,}552
$$

$$
1{,}16{,}972 \times 0.16 \times \frac{45}{365} = ₹2{,}307
$$

B was ₹17,700 cheaper on the email and about **₹19,700 more expensive** after the eight steps. Almost all of the reversal is the toll B had pushed outside the headline and the 20 hours your own gate has been adding. The credit line is real and is not the story. A procurement note that says "B is L1 at ₹2,950" has ranked a fragment.

A's normalised PTKM of ₹2.23 sits inside the hero band of ₹1.60 to ₹2.35. B's ₹2.59 sits above it because the quote was not a complete trip.

---

## 9. The rate benchmarking engine

Build this in a sheet or in the TMS. Four stages. One lane. One vehicle class. No blended national average.

```text
4-STAGE RATE ENGINE

Stage 1   E_var   = fuel + DEF + toll + bhatta     (₹ per trip)
Stage 2   E_wear  = tyres + maintenance            (₹ per trip)
Stage 3   E_fixed = monthly standing pool ÷ km     (₹ per trip)
Stage 4   R_trip  = (E_var + E_wear + E_fixed)
                    × (1 + margin)
                    × β
```

$$
E_{\text{var}} = \left(\frac{P_{\text{diesel}}}{K} + v_{\text{DEF}} \times \frac{P_{\text{DEF}}}{K} + C_{\text{toll}} + C_{\text{bhatta}}\right) \times D
$$

$$
E_{\text{wear}} = (C_{\text{tyre}} + C_{\text{maint}}) \times D
$$

$$
E_{\text{fixed}} = \frac{F_{\text{month}}}{M} \times D
$$

$$
R_{\text{trip}} = (E_{\text{var}} + E_{\text{wear}} + E_{\text{fixed}}) \times (1 + m) \times \beta
$$

$D$ is lane km. $M$ is expected km per truck per month. $m$ is margin as a decimal. β is the Chapter 6 multiplier.

### The Jamshedpur engine, same inputs as Chapter 8

| Input | Value |
| --- | --- |
| $P_{\text{diesel}}$ | ₹95.20/L, Delhi, 19 Oct 2026 |
| $K$ | 3.0 km/L |
| DEF | 3.6% of diesel volume, bulk ₹40/L |
| Toll | ₹8.40/km |
| Bhatta | ₹3.50/km |
| Tyre | ₹3.40/km |
| Maintenance | ₹2.80/km |
| $F_{\text{month}}$ | ₹1,24,925 |
| $M$ | 9,500 km |
| $D$ | 1,580 km |
| Margin $m$ | 12% |
| β | 1.05 (p = 0.10, α = 0.50) |

$$
E_{\text{var}} = (31.73 + 0.48 + 8.40 + 3.50) \times 1580 = 44.11 \times 1580 = ₹69{,}694
$$

$$
E_{\text{wear}} = 6.20 \times 1580 = ₹9{,}796
$$

$$
E_{\text{fixed}} = 13.15 \times 1580 = ₹20{,}777
$$

$$
R_{\text{trip}} = (69694 + 9796 + 20777) \times 1.12 \times 1.05 = ₹1{,}17{,}914
$$

Transporter A's ₹1,18,000 lump sum is this engine within ₹86. That is what "audited against a unified baseline" means. You are not asking the owner to accept your ideology. You are asking whether their number can be rebuilt.

If this plant only achieves 6,000 km a month, replace 13.15 with 20.82. Fixed cost on the trip becomes ₹32,896. The trip rate becomes about ₹1,32,100 before you touch diesel. The gate, not the nagar, moved the rate.

### Master input matrix

All rupee lines except the diesel print are workshop defaults for a loaded highway trip. Replace them with the fleet file. Diesel ₹/km uses ₹95.20 and the midpoint mileage in the cell.

| Input | 16T / 19T | 28T | 35T | 49T / 55T |
| --- | --- | --- | --- | --- |
| Loaded km/L | 5.5 | 4.0 | 3.6 | 3.0 |
| Diesel ₹/km at ₹95.20 | 17.31 | 23.80 | 26.44 | 31.73 |
| DEF ₹/km at 3.6% and ₹40/L | 0.26 | 0.36 | 0.40 | 0.48 |
| Toll ₹/km, sense-check only | 3 to 5 | 5 to 8 | 6 to 9 | 7.80 to 11.95 |
| Bhatta ₹/km | 2.00 | 2.50 | 3.00 | 3.50 |
| Tyre ₹/km | 1.20 | 1.80 | 2.40 | 3.40 |
| Maintenance ₹/km | 1.10 | 1.60 | 2.10 | 2.80 |
| Standing pool ₹/month | 55,000 | 78,000 | 98,000 | 1,24,925 |
| Target km/month | 7,000 | 8,000 | 8,500 | 9,500 |
| Payload for PTKM, t | 10 | 17 | 22 | 34 |

The toll row is a sense-check. A 16T truck is not on the ₹3.45 MAV base. Two-axle and three-axle statutory bases are ₹2.20 and ₹2.40 in 2007-08. Put the actual class on the actual plaza list.

---

## 10. FAQ and statutory citations

### What is the legal difference between GVW and payload?

GVW (or GCW for a combination) is the maximum all-up weight. S.O. 3467(E) caps it by axle type and then at 49 tonnes rigid or 55 tonnes for a semi-articulated trailer or truck-trailer. Payload is GVW minus tare. The notification does not publish payload. Your RC and your weighbridge do. The 5% allowance in the notification is for section 113(3) compliance. It is not extra saleable tonnes in the rate card.

### How should industrial weighbridge variances be settled?

Write a commercial tolerance, in this dossier **0.2% to 0.3%** of dispatch weight, and a cash rule for the kilos beyond it: a short weight above tolerance is deducted at the invoice ₹/MT, a gain is not a bonus. Calibrate both bridges. A 0.5% swing on 34 MT is 170 kg. At ₹2,950/MT that is about ₹500, which is smaller than the toll error in Chapter 8 and large enough to poison a monthly bill if you argue it in prose. The statutory 5% GVW band is an enforcement tolerance. Using it as the commercial shortage clause gives away about 1.7 tonnes on a 34 tonne load.

### Who is liable for hamali?

The Carriage by Road Act, 2007 does not set a hamali tariff. Section 2(a) defines a common carrier to include a contractor, agent, and broker who carries for all persons. Section 8 requires a goods forwarding note. Section 10 limits liability for loss, damage, and delay, with a higher-risk rate available under section 11. Section 12 keeps liability for criminal acts of the carrier or their servants. Loading and unloading labour is allocated in the forwarding note and the freight contract. If the contract is silent, you have a dispute, not a deemed statutory charge. Put hamali in step 4 of the normalisation.

### Why do port container drayage rates move by season?

The trailer and the box follow different empties. A harvest, a festival, or a vessel bunching can empty the driver stand at the port while the line is still short of boxes inland, or the reverse. Ocean freight and the box imbalance are outside this FTL cost stack. The mechanism and the chassis choices are in [container trucking in India](/blog/container-trucking-logistics-india). Do not paste a domestic 49T PTKM onto a 20-foot drayage move and call it the same benchmark.

### Citations to keep with the tender file

- **MoRTH S.O. 3467(E), 16 July 2018.** Safe axle weights. GVW ceiling 49 t rigid, 55 t for semi-articulated trailers and truck-trailers. 5% GVW tolerance for section 113(3). Pneumatic suspension: +1 t per axle where marked.
- **CGST Rules, rule 138(10).** E-way bill validity: one day up to 200 km, then one more day for every 200 km or part, for ordinary cargo. Over-dimensional cargo, and multimodal moves with a ship leg, use 20 km per day. Extension is allowed in exceptional cases, including within eight hours after expiry, after Part B is updated. A 1,580 km ordinary trip needs a validity plan of eight days (200 + 7 × 200). Build the transit cap in step 5 to fit that clock, including your gate hours.
- **Carriage by Road Act, 2007, and the rules made under it.** Goods forwarding note (section 8). Common-carrier liability (sections 10 to 12). The 2011 rules prescribe the form of that note. Read the form your carrier actually issues. The Act repealed the Carriers Act, 1865.
- **National Highways Fee (Determination of Rates and Collection) Rules, 2008, rule 4 and rule 5.** Vehicle categories and the 2007-08 base rates. Annual revision from 1 April. Expressway multiple 1.25 as restated by PIB. Plaza-level notifications remain the amount you pay.

---

## What to do with the card

A rate you can defend has a city diesel print, a plaza list, a free-time clock, a GMW, a credit day, and a β that matches the return load you can see on GPS. Headline L1 without those six is how Chapter 8 spends an extra ₹19,700 a trip and still looks like a saving in the email.

ZAFTYS runs this arithmetic on [dedicated contract fleets](/logistics/dedicated-fleet) and on [contract logistics](/logistics/contract-logistics) rate cards, with the corridor locked in [ZAFTYS TMS](/zaftys-tms). [Freight rate intelligence](/intelligence/freight-rates) is the lane view, with the limits written on that page. It is not a substitute for your FASTag file or your diesel print.

If you have a live lane, send origin, destination, vehicle class, payload, and whether toll sits inside the rate. We will normalise the bids you already have before anyone is crowned L1.
