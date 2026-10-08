/** Deep-research exhibits: diesel surcharge clause for Indian freight contracts.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const dieselClauseKpis: readonly BlogKpi[] = [
  {
    value: "+₹4.53",
    label: "Delhi diesel, 15 May to 8 Oct 2026",
    detail:
      "Reported Delhi retail high-speed diesel: ₹90.67 on 15 May 2026, ₹95.20 on 8 Oct 2026. Mumbai moved ₹93.14 to ₹97.83 (+₹4.69). City snapshots, not a national average.",
  },
  {
    value: "0.65",
    label: "AITWA ask per ₹1",
    detail:
      "19 May 2026 circular, as reported: 0.65% of freight per ₹1 of diesel above the 15 May price, from 20 May 2026, and the factor falls if diesel falls. Not a statute.",
  },
  {
    value: "0.40-0.50",
    label: "What many shippers sign",
    detail:
      "ITLN, quoting the association side: most customers still work on 0.40 to 0.50 per ₹1, not 0.65. Crisil's ₹5 band implies about 0.50 to 0.56.",
  },
  {
    value: "100.5",
    label: "CRISFrex, April 2026",
    detail:
      "Crisil Pan-India freight index, April 2025 = 100. April 2026 printed 100.5, down from 101.4 in March. A soft freight index does not cancel a diesel clause.",
  },
  {
    value: "₹1,131",
    label: "Workshop extra at 0.65",
    detail:
      "Teaching trip only: ₹48/km, 800 km, Delhi +₹4.53. AITWA card about ₹1,131. A 20% share of the diesel percent is about ₹384. Same trucks, different clause.",
  },
  {
    value: "One formula",
    label: "What belongs in the contract",
    detail:
      "Pick the rupee step, the share of the diesel percent, or a 20% / 30% pass-through. Do not add them together.",
  },
] as const;

export const dieselClauseTakeaways = [
  "A fuel clause is a city, a date, one formula, and a bill line. Without those, every diesel headline becomes a fresh argument.",
  "AITWA's 0.65% per ₹1 is an association ask from 19 May 2026, not the law. Many shippers still sign 0.40 to 0.50. Write the number you actually agreed.",
  "42%, 50% to 60%, and 65% are three different pies (road-transport cost, operating expenses, running cost). Do not average them into one share.",
  "Derive a lane share from diesel ₹/km divided by basic freight ₹/km. In the workshop, ₹22 / ₹48 gives S = 0.46 and about ₹883 extra on 800 km.",
  "Toll, AdBlue, tyres, detention, and empty kilometres stay on their own lines. A soft CRISFrex (100.5 in April 2026) does not wipe the fuel line.",
] as const;

export const dieselClauseReferences = [
  "[Moneylife, 21 May 2026](https://www.moneylife.in/article/diesel-price-shock-fuel-shortage-and-delays-aitwa-introduces-fuel-adjustment-factor-in-freight-rates/80525.html), [India Today](https://www.indiatoday.in/business/story/diesel-price-hike-impact-grocery-prices-logistics-costs-india-truckers-fuel-surcharge-aiwta-2914879-2026-05-21), and the [AITWA follow-up chart](https://www.linkedin.com/posts/aitwaho_in-continuation-to-our-circular-for-implementing-activity-7464679433069543424-ycWN): circular dated 19 May 2026, FAF from 20 May, 0.65% freight per ₹1 diesel above the 15 May base, about 65% running cost, and a downward adjustment when diesel falls.",
  "[Crisil Intelligence, Crisil freight index dips in April](https://www.crisil.com/content/dam/crisil-intelligence/what-we-think/reports/2026/05/crisil-freight-index-dips-in-april.pdf) (PDF, May 2026): CRISFrex 100.5 in April 2026 and 101.4 in March, base April 2025 = 100. Fuel nearly 50% to 60% of operating expenses; about 2.5% to 2.8% freight per ₹5/litre to hold margin.",
  "[Crisil, From pumps to prices](https://www.crisil.com/content/dam/crisil-intelligence/what-we-think/reports/2026/06/from-pumps-to-prices.pdf) and [energy-shock report](https://www.crisil.com/content/dam/crisil/what-we-think/all-latest-thinking/report/2026/06/how-a-sustained-energy-shock-can-ripple-through-the-industry/how-a-sustained-energy-shock-can-ripple-through-the-industry.pdf) (June 2026): NCAER fuel share about 42% of road-transport cost; road about 71% of freight movement; freight transport about 54% of logistics cost.",
  "Official price tables: [Indian Oil petrol and diesel prices](https://iocl.com/Pages/petrol-diesel-price) and [PPAC metro-city history](https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/rsp-of-petrol-and-diesel-in-metro-cities-since-16-6-2017). Dated snapshots: [Economic Times, 15 May 2026](https://economictimes.indiatimes.com/news/new-updates/diesel-price-today-may-15-check-new-diesel-prices-in-delhi-mumbai-kolkata-chennai-after-centre-hikes-fuel-rates/articleshow/131106142.cms) and [Moneycontrol, 8 Oct 2026](https://www.moneycontrol.com/news/india/petrol-diesel-prices-steady-as-brent-tops-101-on-hormuz-attacks-iran-strike-report-check-city-wise-rates-14047255.html).",
  "[ITLN, Rising fuel costs reshape India's logistics economics and freight](https://www.itln.in/road-transportation/rising-fuel-costs-reshape-indias-logistics-economics-and-freight-1359375): customers were still using a 0.40 to 0.50 factor rather than the AITWA proposal of 0.65.",
  "[BHEL rate-contract PDF](https://www.bhel.com/sites/default/files/gcc_-nit_ref-lgx-rc-e-00413-1589187310.pdf): an original public example using IOCL rates, monthly review, vehicle-specific per-km PVC and two-decimal rounding. Separate archived BHEL-attributed samples on [Law Insider](https://www.lawinsider.com/clause/price-variation-clause-on-account-of-diesel-rates-variation) show 20% or 30% of the diesel-price percentage change, both up and down.",
  "[Union of India v Freight Carriers](https://courtkutchehry.com/judgments/union-of-india-uoi-appellant-hash-freight-carriers-respondent), Gauhati High Court, decided 30 April 2008, (2008) 4 Arb LR 443: the court set aside an escalation award where the fixed-rate contract had no price-escalation clause.",
] as const;

export const dieselClauseExhibits: Record<string, readonly BlogExhibit[]> = {
  "Why the rate card goes stale in ninety days": [
    {
      kind: "timeline",
      caption: "What happens when the contract names a rate and forgets the diesel line",
      source: "Teaching sequence for a quarterly industrial FTL contract. Not a case file.",
      items: [
        {
          phase: "Day 0",
          title: "The card is signed",
          body: "Both sides freeze base diesel and base freight. City, date, and formula are either written or missing. This is the only cheap moment to write them.",
        },
        {
          phase: "Day 30-90",
          title: "The print moves",
          body: "Diesel changes. Nobody opens a clause because the review window was never written. Dispatch still needs the truck on Thursday.",
        },
        {
          phase: "Bill day",
          title: "WhatsApp percent",
          body: "One side applies a number from a forward. The other rejects it. Finance cannot audit a sentence that was never in the PDF.",
        },
        {
          phase: "Next tender",
          title: "The pain hides in the base",
          body: "The transporter folds last quarter's diesel into a higher base rate. The shipper thinks they negotiated diesel away. There is still nothing to audit.",
        },
      ],
    },
  ],

  "What actually sits inside a truck rupee": [
    {
      kind: "donut",
      caption: "Workshop split of variable cost per km. Diesel is the only slice a fuel clause may touch.",
      source:
        "Directional long-haul bench used on earlier ZAFTYS posts: variable about ₹26 to ₹37 per km. Diesel about half of that band. Not a Crisil pie and not your lane until you have litres per km.",
      slices: [
        { label: "Diesel", value: 50, color: zaftysViz.navy },
        { label: "Toll", value: 18, color: zaftysViz.primary },
        { label: "Tyre and maintenance", value: 16, color: zaftysViz.teal },
        { label: "Other variable", value: 16, color: zaftysViz.warm },
      ],
    },
    {
      kind: "bars",
      caption: "Three published diesel shares. Different denominators, so they are bars, not one pie.",
      source:
        "Do not average these into 52%. NCAER via Crisil June 2026 is road transport cost. Crisil April 2026 low end is operating expenses. AITWA 19 May 2026 is running cost.",
      unit: "%",
      items: [
        { label: "Road transport cost (NCAER)", value: 42 },
        { label: "Operating expenses, low end (Crisil)", value: 50 },
        { label: "Running cost (AITWA)", value: 65 },
      ],
    },
    {
      kind: "callout",
      caption: "Which pie the percent applies to",
      source: "Published notes, checked 8 Oct 2026. Not a ZAFTYS national index.",
      items: [
        {
          title: "42% is the wide pie",
          body: "NCAER, via Crisil June 2026: fuel about 42% of road transport cost. Useful context. A poor default for S on one lane unless you have litres per km.",
          tone: "teal",
        },
        {
          title: "50% to 60% is operating cost",
          body: "Crisil April 2026: fuel is nearly half to three-fifths of transporter operating expenses. A ₹5 per litre move needs about 2.5% to 2.8% freight to hold margin.",
          tone: "navy",
        },
        {
          title: "65% is the association running-cost line",
          body: "AITWA circular, 19 May 2026: diesel about 65% of truck running cost, turned into a 0.65 card. If you also set S = 0.65 in a second formula, you have hiked twice.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "table",
      caption: "Diesel prints you can name",
      source:
        "15 May 2026: Times of India, Business Standard, The Hindu BusinessLine. 8 Oct 2026: India Today and The Hindu BusinessLine. Re-read the named table on bill day.",
      headers: ["City", "15 May 2026 (AITWA base date)", "8 Oct 2026", "Move"],
      rows: [
        ["Delhi", "₹90.67 / litre", "₹95.20 / litre", "+₹4.53"],
        ["Mumbai", "₹93.14 / litre", "₹97.83 / litre", "+₹4.69"],
      ],
    },
  ],

  "Three diesel escalation formulas for freight contracts": [
    {
      kind: "image",
      caption: "Formula 1. Rupee-step clause: 0.65 percentage points of freight per ₹1 of diesel",
      source: "AITWA circular of 19 May 2026, as reported. Delhi prints 15 May and 8 Oct 2026. ₹48/km is a workshop rate, not a corridor quote.",
      src: "/images/blog/diesel-formula-rupee-step.png",
      alt: "Diesel rupee-step formula: uplift percent equals 0.65 times diesel now minus diesel base, with the Delhi worked example",
    },
    {
      kind: "image",
      caption: "Formula 2. Share of the diesel percent. One formula. Do not stack it on the 0.65 card.",
      source: "Workshop lane share: ₹22 diesel per km divided by ₹48 basic freight per km gives 0.458, rounded to S = 0.46.",
      src: "/images/blog/diesel-formula-share.png",
      alt: "Diesel share-of-cost formula with lane-derived S equal to 0.46 and the Delhi 2.30 percent worked example",
    },
    {
      kind: "image",
      caption: "Formula 3. Twenty percent of the diesel percent change, the quieter buyer sample",
      source: "Public BHEL-style samples pass 20% or 30% of the IOCL percent change, up and down, for one named city.",
      src: "/images/blog/diesel-formula-passthrough.png",
      alt: "Twenty percent diesel pass-through formula with about Rs 384 extra on the workshop 800 km leg",
    },
    {
      kind: "table",
      caption: "What each card does to the same Delhi move",
      source: "Delhi diesel +₹4.53 from 15 May 2026 (₹90.67) to 8 Oct 2026 (₹95.20).",
      headers: ["", "Formula 1: ₹ per litre", "Formula 2: share of percent", "Formula 3: 20% of percent"],
      rows: [
        ["Constant", "0.65, or a negotiated 0.40 to 0.50", "S agreed in the contract", "0.20 or 0.30 in the public samples"],
        ["Delhi +₹4.53", "2.94% at 0.65", "2.30% if lane-derived S = 0.46", "1.00% if S = 0.20"],
        ["Needs a city table?", "Yes", "Yes", "Yes. Samples name IOCL."],
        ["Main risk", "Signing 0.65 because a circular said so", "Setting S from the wrong pie", "Copying 0.20 onto a lane that cannot recover diesel"],
      ],
    },
  ],

  "How to write a fuel adjustment factor clause": [
    {
      kind: "image",
      caption: "From the diesel print to a bill both sides can sign",
      source: "Six checks before the percent touches base freight. Toll, detention, and empty kilometres stay off the line.",
      src: "/images/blog/diesel-clause-flow.png",
      alt: "Six step flow from reading the city diesel table to attaching the print on the freight bill",
    },
    {
      kind: "steps",
      caption: "Seven sentences the clause has to contain",
      source: "Contract language, not a slogan.",
      items: [
        { title: "Base freight", body: "The number, the unit (₹/km, ₹/MT, or ₹/trip), the body type, and the lane." },
        { title: "Base diesel", body: "City, high-speed diesel, the public table both sides will read, and the base date. Not the driver's pump slip." },
        { title: "One formula", body: "Formula 1, 2, or 3, with the constant written as a number." },
        { title: "Both directions", body: "Up and down. A floor and a ceiling if finance needs one." },
        { title: "Trigger and lag", body: "Trips whose loading date falls after the review date. Not every open bill since April." },
        { title: "Exclusions", body: "Toll, tyre, driver bata, detention, ODC permit, and empty kilometres, unless a different clause prices them." },
        { title: "Evidence", body: "The diesel print for the review date, attached to the freight bill." },
      ],
    },
    {
      kind: "table",
      caption: "Incremental ₹2 per litre dead-band at a 0.45 factor",
      source: "Workshop arithmetic. Eligible movement = sign of the move x max(0, absolute move minus ₹2).",
      headers: ["Diesel move", "Eligible movement", "Freight adjustment", "On ₹38,400"],
      rows: [
        ["+₹4.53", "+₹2.53", "+1.1385%", "about +₹437"],
        ["+₹1.50", "₹0.00", "0.00%", "₹0"],
        ["-₹4.53", "-₹2.53", "-1.1385%", "about -₹437"],
      ],
    },
  ],

  "Diesel surcharge calculation using Delhi fuel prices": [
    {
      kind: "image",
      caption: "Same diesel, four freight bills, plus the zero bar if the contract is silent",
      source: "Workshop only: ₹48 per km, 800 km, Delhi diesel +₹4.53 from 15 May 2026 to 8 Oct 2026.",
      src: "/images/blog/diesel-four-bills.png",
      alt: "Bar comparison of extra rupees on one workshop trip under four diesel clauses and a contract with no clause",
    },
    {
      kind: "table",
      caption: "Same trucks, same diesel, four bills",
      source: "Workshop: ₹48/km x 800 km. Delhi 4.53 / 90.67 = 4.996%.",
      headers: ["Example", "Rule", "Uplift", "Extra on 800 km"],
      rows: [
        ["A", "0.65 per ₹1", "2.94%", "about ₹1,131"],
        ["B", "Lane-derived S = 0.46 of the diesel percent", "2.30%", "about ₹883"],
        ["C", "0.45 per ₹1 (middle of 0.40 to 0.50)", "2.04%", "about ₹783"],
        ["D", "20% of the diesel percent", "1.00%", "about ₹384"],
      ],
    },
    {
      kind: "tiles",
      caption: "Index and diesel can move in different directions",
      source: "Crisil CRISFrex PDF, May 2026. April 2025 = 100.",
      items: [
        {
          title: "April 2026 index: 100.5",
          body: "Down from 101.4 in March. Crisil read that as easier truck supply after the March dispatch peak. It is not a diesel cut.",
        },
        {
          title: "Delhi diesel still +₹4.53",
          body: "By 8 Oct 2026 the city print was still ₹4.53 above the 15 May base. A flat index does not make that rupee disappear.",
        },
        {
          title: "Two jobs, two tools",
          body: "Use the index when you rebid the base rate. Use the clause on this quarter's bills. Mixing them is how the better trucks stop coming.",
        },
      ],
    },
  ],

  "What the clause must not do": [
    {
      kind: "callout",
      caption: "Lines that do not belong inside the fuel percent",
      source: "AITWA's own May note, via Moneylife, listed AdBlue, tyres, and tolls as separate cost moves.",
      items: [
        {
          title: "Name the city and the date, or you do not have a base.",
          body: "India average, whichever pump, and date of agreement (if signature slips) all fail the audit. One city. High-speed diesel. One calendar date.",
          tone: "navy",
        },
        {
          title: "Up and down, or the peak sticks.",
          body: "A rise-only clause is an escalator. When diesel falls, the shipper keeps paying the peak unless the base rate is rebid. The AITWA text itself said the factor reduces when diesel moderates.",
          tone: "teal",
        },
        {
          title: "A soft index and a higher diesel price can share a year.",
          body: "CRISFrex at 100.5 and Delhi diesel ₹4.53 above the May base are both true. Keep two lines. Do not let one cancel the other.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "table",
      caption: "Keep these off the fuel line",
      source: "Site bench for toll is directional (₹3 to ₹7 per km), not your plaza list.",
      headers: ["Cost", "Where it belongs", "Why it is not diesel"],
      rows: [
        ["FASTag toll", "Its own reimbursed line", "Plaza rates move on a different calendar (revised from 1 April 2026)"],
        ["Tyres", "Maintenance or a separate review", "AITWA noted about +5%. That is not a litre of diesel"],
        ["AdBlue", "Its own line if you pay it", "Moneylife reported it nearly doubling over two months"],
        ["Detention", "Gate timestamps", "Plant dwell is a yard problem, already covered on the TAT post"],
        ["Empty kilometres", "An allowance or a return load", "Deadhead is a network problem, not a pump price"],
      ],
    },
  ],

  "How settlement uses the clause": [
    {
      kind: "table",
      variant: "compare",
      caption: "What the freight bill should show",
      source: "If the line is missing, accounts payable will invent a lump sum.",
      headers: ["Bill line", "Source", "Fuel clause touches it?"],
      rows: [
        ["Base rate", "Signed card for that body and lane", "Yes. This is the only line the percent multiplies"],
        ["Diesel base and diesel now", "Named table, two dates", "Yes. Evidence"],
        ["Formula id", "The clause number you actually signed", "Yes"],
        ["Uplift percent", "The arithmetic, not a lump sum", "Yes"],
        ["Toll", "FASTag statement, if reimbursed", "No"],
        ["Detention", "Gate timestamps", "No"],
        ["Net", "Sum of lines", "The fuel rupee is visible inside the net"],
      ],
    },
    {
      kind: "flow",
      caption: "Who owns the clause after signature",
      source: "A PDF that only legal can find will not be used on bill day.",
      items: [
        { title: "Procurement", body: "Owns the words: city, date, formula, exclusions." },
        { title: "Dispatch", body: "Owns the loading date that decides which rate applies." },
        { title: "Finance", body: "Owns the bill test. No print, no uplift." },
        { title: "Trip record", body: "Base rate, base diesel, current diesel, and formula id sit on the same trip as weight and POD." },
      ],
    },
  ],

  "Nineteen checks before you sign": [
    {
      kind: "table",
      caption: "Score the draft in the room. 16 to 19 can go to legal. Under 10, the argument is still waiting.",
      source: "Plain checklist. Not a new scorecard group.",
      headers: ["#", "Check", "Pass looks like"],
      rows: [
        ["1", "Unit and distance basis", "₹/km, ₹/MT, or ₹/trip, plus loaded-only or round-trip kilometres"],
        ["2", "Body", "32 ft, trailer, bulker, or tipper named. One card does not cover all"],
        ["3", "Lane", "Origin, destination, and any mandatory via"],
        ["4", "Diesel city", "One city, not India average"],
        ["5", "Diesel source", "A table both sides can open without calling the driver"],
        ["6", "Base date", "A calendar date, filled in"],
        ["7", "One formula", "Formula 1, 2, or 3. Not two of them added together"],
        ["8", "Constant written", "0.65, a negotiated 0.40 to 0.50, or the share S, as a number"],
        ["9", "Both directions", "Down moves become an invoice deduction or a credit note by a named deadline"],
        ["10", "Dead-band", "The contract says whether only the movement beyond the band is eligible"],
        ["11", "Cap and floor", "A signed ceiling, floor, and treatment of any unrecovered balance"],
        ["12", "Rounding", "Price, percent, and rate precision written in advance"],
        ["13", "Review rhythm", "Monthly or quarterly, one rhythm"],
        ["14", "Holiday or missing print", "Last published price, then next-business-day correction in the next cycle"],
        ["15", "Effective trips", "Loading date rule, not retroactive on delivered trips"],
        ["16", "Exclusions listed", "Toll, detention, empty km, permits"],
        ["17", "Evidence and dispute", "Print deadline and a short challenge window"],
        ["18", "Rebasing and renewal", "Fixed or monthly base rule stated; freight and diesel reset together at renewal"],
        ["19", "Label", "Own, contract, or overflow still named on the trip"],
      ],
    },
  ],
};
