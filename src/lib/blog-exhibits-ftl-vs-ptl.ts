/** Deep-research exhibits: FTL vs PTL India cost break-even.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * English first; Hindi plant terms only in brackets when needed.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const ftlVsPtlKpis: readonly BlogKpi[] = [
  {
    value: "3.5-6.0 T",
    label: "Economic break-even band",
    detail:
      "Workshop threshold where dedicated FTL often beats per-kg PTL on total landed cost. Also read as ~half to three-quarters of the smallest suitable truck. Corridor and tariff specific. Not a national law.",
  },
  {
    value: "60-75%",
    label: "Faster transit (workshop)",
    detail:
      "Point-to-point FTL about 28-36 hours on ~1,000 km versus multi-hub PTL about 5-8 days. Directional band only.",
  },
  {
    value: "4-7 vs 2",
    label: "Handling touches PTL vs FTL",
    detail:
      "Sundry hub-and-spoke often takes 4 to 7 manual touches. Dedicated FTL is one load and one unload for your cargo.",
  },
  {
    value: "1.8-3.2%",
    label: "PTL damage band (workshop)",
    detail:
      "Directional carton-crush / rejection frequency briefing aid for shared godowns versus sealed dedicated trucks under ~0.15%. Workshop band only - not a published national claims index and not a ZAFTYS audited share table. Measure your own transit-loss ratio.",
  },
  {
    value: "Rs 1.2-2.8k/T",
    label: "Packaging overhead cut",
    detail:
      "Workshop savings when heavy wooden crating and edge protectors can be stripped under dedicated FTL.",
  },
  {
    value: "10-18 days",
    label: "Faster billing cycle",
    detail:
      "Workshop: cut delayed physical LR courier. Direct ePOD unlocks invoice and GST ITC velocity.",
  },
] as const;

export const ftlVsPtlTakeaways = [
  "Base PTL ₹/kg is a sticker. Landed cost adds FOV, docket, hamali, ODA, crating, damage scrap, and inventory drag.",
  "Volumetric rules (often 10 lbs/CFT) bill high-cube light goods on ghost weight - sometimes 2x to 3x actual mass freight.",
  "Scanner bands: under ~1/3 truck stay PTL; half to two-thirds quote both; above ~3/4 FTL usually wins - after sizing the smallest suitable body.",
  "Paper break-even can sit near 6.5 MT. With packaging and scrap, many industrial corridors break even nearer 3.0 to 4.5 MT.",
  "Dense trunks keep PTL competitive longer; thin destination towns raise PTL hold time and rates so FTL can win earlier.",
  "Above steady industrial volume, dedicated FTL usually wins on landed cost, damage, and cash-flow - not on the headline docket alone.",
] as const;

export const ftlVsPtlReferences = [
  "Central Goods and Services Tax (CGST) Rules - Rule 138 and 138A; Form GST EWB-02 for multi-vehicle / transshipment e-Way Bills. Confirm bare rules and CBIC circulars before a legal memo.",
  "[Carriage by Road Act, 2007](https://www.indiacode.nic.in/handle/123456789/2043?locale=en) and Carriage by Road Rules, 2011 - Sections 9 and 10, Rule 12 liability framing for common carriers.",
  "Indian Contract Act, 1872 - Bailment Sections 148-161 (orientation for custody; counsel owns litigation strategy).",
  "Carrier tariff annexes for volumetric conversion (10 lbs/CFT or CBM factors) and Out of Delivery Area (ODA) pin lists - schedule-controlling.",
  "Internal cluster: [truck freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide), [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [transit damage claims](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide), [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india).",
] as const;

export const ftlVsPtlExhibits: Record<string, readonly BlogExhibit[]> = {
  "Start here: FTL vs PTL decision in three lines": [
    {
      kind: "tiles",
      caption: "Start here - three scanner bands (workshop)",
      source:
        "Desk aid after sizing the smallest suitable truck. Not a national rate law. Recompute with your tariff.",
      items: [
        {
          title: "Under ~1/3 of truck",
          body: "PTL / sundry / LTL usually wins on cost for non-fragile spares and samples. Pay for space used.",
        },
        {
          title: "Half to ~2/3 of truck",
          body: "Grey zone. Quote both FTL and PTL on the same lane. Dense trunk vs thin town shifts the crossover.",
        },
        {
          title: "Above ~3/4 of truck",
          body: "Dedicated FTL usually wins on landed cost, speed, and sealed custody - especially after FOV, ODA, and crating.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Also use the tonne band",
      source: "Workshop. Corridor-specific.",
      items: [
        {
          title: "3.5 to 6.0 tonnes",
          body: "Common industrial starting band where landed FTL often beats sticker PTL. Cube-out cargo crosses earlier.",
          tone: "teal",
        },
        {
          title: "Worksheet",
          body: "Blank inputs for trip rate, ₹/kg, FOV, ODA, cube, and damage: PDF in Start here and Ch 5.",
          tone: "navy",
        },
      ],
    },
  ],

  "The fundamental fork in Indian freight: direct transit vs network consolidation": [
    {
      kind: "tiles",
      caption: "Two operating philosophies on Indian road freight",
      source: "Operating model for this guide. Not a market-share claim.",
      items: [
        {
          title: "PTL / LTL / sundry / parcel",
          body: "Same shared-hub idea under different labels. Many consignors share hubs, trunk trailers, and last-mile vans. Dalal often sells the docket, not the asset.",
        },
        {
          title: "FTL dedicated",
          body: "One consignor, one sealed vehicle, origin dock to destination gate. Point-to-point Part B. Owned fleet first, labeled overflow when needed.",
        },
        {
          title: "When plants outgrow PTL",
          body: "Steady factory volume, fragile finished goods, and LD penalties push desks past sporadic sample dockets into industrial full truckload.",
        },
      ],
    },
  ],

  "The physical journey: how goods move through PTL networks vs dedicated FTL": [
    {
      kind: "timeline",
      caption: "PTL hub-and-spoke: seven typical stages",
      source: "Operating pattern for sundry networks. Individual carriers differ.",
      items: [
        { phase: "01", title: "Feeder pickup", body: "Tempo / LCV from plant to local branch godown." },
        { phase: "02", title: "Local staging", body: "Inward sort and hold at the branch godown." },
        { phase: "03", title: "RTC consolidate", body: "Forklift onto multi-axle trunk trailer at regional centre." },
        { phase: "04", title: "Line-haul", body: "Hub-to-hub trunk run with mixed consignments." },
        { phase: "05", title: "Dest RTC", body: "Inward sort and de-consolidation." },
        { phase: "06", title: "Branch transfer", body: "Move to destination local branch." },
        { phase: "07", title: "ODA last mile", body: "Out-of-delivery-area van to the dock." },
      ],
    },
    {
      kind: "callout",
      caption: "Handling friction vs sealed FTL",
      source: "Dock pattern. Damage claim SOP sits in the transit-damage guide.",
      items: [
        {
          title: "PTL: 4 to 7 touches",
          body: "Hooks, mast punctures, rain-yard staging, tumbling in unlashed mixed loads. Crush and water claims start here.",
          tone: "warm",
        },
        {
          title: "FTL: 1 load + 1 unload",
          body: "Bolt or electronic seal at origin. Unbroken seal audit at the customer gate. Surveyors prefer this trail.",
          tone: "teal",
        },
      ],
    },
  ],

  "The true cost stack of PTL: unmasking the surcharges": [
    {
      kind: "donut",
      caption: "The PTL Hidden Rupee: where the parcel rupee really goes",
      source:
        "Single-denominator workshop pie for this guide (100%). Not a ZAFTYS audited national rate or claims index.",
      slices: [
        { label: "Base quoted per-kg freight", value: 54, color: zaftysViz.navy },
        { label: "Secondary crating and palletizing", value: 18, color: zaftysViz.primary },
        { label: "Ancillary surcharges (FOV, docket, ODA, hamali)", value: 14, color: zaftysViz.teal },
        { label: "Damage, rejection, shortage scrap", value: 10, color: zaftysViz.warm },
        { label: "Working capital pipeline drag", value: 4, color: zaftysViz.primaryBright },
      ],
    },
    {
      kind: "table",
      caption: "PTL ancillary fee bands (workshop)",
      source: "Commercial workshop bands. Your carrier tariff annex controls.",
      headers: ["Charge", "Workshop band", "What to check"],
      rows: [
        ["Minimum docket", "Rs 150 - 400 / consignment", "Floor on tiny shipments"],
        ["FOV / risk", "0.10% - 0.25% of invoice", "Often auto-billed"],
        ["Hamali", "Rs 0.30 - 0.60 / kg", "Godown labour"],
        ["ODA", "Rs 1,500 - 5,000 flat or per-km", "Dock outside pin service list"],
        ["Re-book / demurrage", "After ~48 h hold", "Receiver window friction"],
      ],
    },
  ],

  "Volumetric weight (10 lbs/CFT) trap on industrial PTL": [
    {
      kind: "image",
      caption: "PTL volumetric weight inflation trap [CUBE-OUT PENALTY]",
      source: "Workshop example. Confirm 10 lbs/CFT or CBM factor on the carrier schedule.",
      src: "/images/blog/ftl-vs-ptl-volumetric-trap.png",
      alt: "Formula board showing chargeable weight as max of actual kg and CFT times 10 lbs times 0.4536, with a 2200 kg shipment billed near 4240 kg",
    },
  ],

  "How to calculate FTL vs PTL break-even weight": [
    {
      kind: "image",
      caption: "Landed FTL-PTL economic break-even [MODAL CONVERSION THRESHOLD]",
      source: "Workshop algebra. Recompute with your trip rate, R/kg, FOV, crating, and damage history.",
      src: "/images/blog/ftl-vs-ptl-breakeven-equation.png",
      alt: "Formula board for break-even weight equal to FTL trip minus fixed PTL fees divided by net PTL per-kg advantage after damage delta",
    },
    {
      kind: "callout",
      caption: "Hidden break-even drift",
      source: "Teaching pattern for ~1,000 km industrial corridors.",
      items: [
        {
          title: "Paper freight only",
          body: "Ignore packaging and scrap and break-even can look near 6.5 MT.",
          tone: "navy",
        },
        {
          title: "Landed cost",
          body: "Add crating and damage scrap and many desks land nearer 3.0 to 4.5 MT.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Two expensive mistakes (failure modes)",
      source: "Procurement briefing aid. Not a share index.",
      items: [
        {
          title: "Half-empty FTL, no consolidation",
          body: "Paying for a 9 T truck to move 4 T twice a week. Hold Monday and Wednesday into one Thursday FTL when the customer window allows.",
        },
        {
          title: "Split load into many PTL dockets",
          body: "Three PTL bookings to 'avoid' FTL can cost more after minimums, FOV, and ODA than the single truck you were avoiding.",
        },
        {
          title: "Wrong truck in the comparison",
          body: "Break-even only after sizing the smallest body that fits weight and cube. Else the spreadsheet lies.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Capacity-% bands beside the tonne band (workshop)",
      source: "Scanner aid. Density and lane type move the lines.",
      headers: ["Fill of smallest suitable truck", "Typical call", "Notes"],
      rows: [
        ["Under ~1/3", "Stay PTL", "Samples, small spares, multi-drop"],
        ["~1/2 to ~2/3", "Quote both", "Grey zone; dense vs thin lane matters"],
        ["Above ~3/4", "Lean FTL", "Often aligns with ~3.5-6.0 T industrial band"],
      ],
    },
  ],

  "Transit time, working capital, and cash-flow velocity": [
    {
      kind: "image",
      caption: "Working capital pipeline inventory cost [SUPPLY CHAIN VELOCITY]",
      source: "Workshop. Not treasury or bank advice. Pair with ePOD close-out practice.",
      src: "/images/blog/ftl-vs-ptl-working-capital.png",
      alt: "Formula board for inventory carrying cost equal to invoice times WACC over 365 times transit days",
    },
  ],

  "Statutory and documentation compliance: e-Way Bill Part B multi-vehicle updating": [
    {
      kind: "tiles",
      caption: "Part B exposure: PTL multi-vehicle vs FTL single vehicle",
      source: "Orientation only. Confirm CGST Rule 138 / EWB-02 before a legal memo.",
      items: [
        {
          title: "PTL transshipment",
          body: "Feeder to trunk to local van. Part B and EWB-02 updates at each change of vehicle.",
        },
        {
          title: "Section 129 risk",
          body: "One expired docket in a mixed sundry trailer can trap compliant cargo for days.",
        },
        {
          title: "FTL advantage",
          body: "One vehicle, one Part B, origin to gate. No intermediate hub rewrite for that consignment.",
        },
      ],
    },
  ],

  "Worked numerical case study: 4.5-tonne industrial consignment (Chakan to Sanand)": [
    {
      kind: "image",
      caption: "Unmasking the PTL sticker price (Chakan to Sanand workshop)",
      source:
        "Teaching ledger: base Rs 33,750 to landed Rs 53,490 vs FTL Rs 38,000. Not a ZAFTYS audited claim file. Damage % is a workshop allowance.",
      src: "/images/blog/ftl-vs-ptl-sticker-waterfall.png",
      alt: "Waterfall from PTL base Rs 33750 through surcharges crating working capital and damage to landed Rs 53490 beside dedicated FTL at Rs 38000",
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Line-item reconciliation: 4.5 MT Pune to Ahmedabad workshop",
      source: "Invoice Rs 28,00,000. ~660 km. Confirm your own tariff before a tender.",
      headers: ["Line", "PTL Model A", "FTL Model B"],
      rows: [
        ["Base freight", "Rs 33,750 (4,500 x 7.50)", "Rs 38,000 trip"],
        ["Docket + hamali + FOV", "+ Rs 4,740", "In trip / dock"],
        ["Wooden crating / corners", "+ Rs 9,000", "Stripped / minimal"],
        ["WC drag (5-day delta)", "+ Rs 550", "Baseline"],
        ["Damage scrap 1.8% (workshop)", "+ Rs 5,040", "~0% workshop"],
        ["Transit time", "~6 days", "~22 hours"],
        ["True landed", "Rs 53,490", "Rs 38,000"],
      ],
    },
  ],

  "When PTL still beats dedicated FTL (and when to switch)": [
    {
      kind: "tiles",
      caption: "Stay on PTL vs switch to FTL",
      source: "Decision aid. Lane facts still win.",
      items: [
        {
          title: "Stay on PTL",
          body: "Multi-city small drops, sub-~2 T non-fragile spares, sporadic Tier-3/4 samples, schedule slack, or no dock capacity to stage a full truck.",
        },
        {
          title: "Switch to FTL",
          body: "Above ~3.5 T or ~3/4 of truck, fragile / wet-sensitive finished goods, LD penalties, or pilferage-prone high value.",
        },
        {
          title: "Recompute on lane type",
          body: "Dense trunk keeps PTL competitive longer. Thin destination town can make FTL win at lower tonnes.",
        },
      ],
    },
    {
      kind: "steps",
      caption: "8-point modal transition protocol",
      source: "Operating sequence for plants consolidating sundry into dedicated FTL.",
      items: [
        { title: "SKU density audit", body: "Map kg, CBM, and fragility by lane." },
        { title: "Order consolidation rhythm", body: "Move from daily micro-dockets to bi-weekly full trucks." },
        { title: "Packaging stripping", body: "Drop over-crating that only existed for hub handling." },
        { title: "Vehicle sizing", body: "Match 19-ft / multi-axle payload to the consolidation." },
        { title: "Route lock and sealing", body: "Bolt or e-seal; single Part B." },
        { title: "Direct gate loading", body: "Origin dock to destination gate." },
        { title: "Digital ePOD closeout", body: "Photo + geo remarks inside the hour." },
        { title: "Cash-flow acceleration", body: "Invoice and ITC without waiting on courier bilty." },
      ],
    },
  ],

  "LinkedIn abstract (copy for distribution)": [
    {
      kind: "callout",
      caption: "Paste-ready distribution block",
      source: "Editorial abstract for LinkedIn / email. Not a paid placement.",
      items: [
        {
          title: "Hook",
          body: "FTL vs PTL is a landed-cost decision - volumetric traps and hub touches included.",
          tone: "navy",
        },
        {
          title: "CTA",
          body: "Quote dedicated FTL on consolidation lanes: zaftys.com/logistics/dedicated-fleet",
          tone: "teal",
        },
      ],
    },
  ],

  "Frequently asked questions and statutory citations": [
    {
      kind: "callout",
      caption: "Confirm with counsel and your tariff",
      source: "This guide is orientation. Schedules and bare Acts control.",
      items: [
        {
          title: "Statute text wins",
          body: "CGST Rule 138 / EWB-02 and Carriage by Road Rule 12 paraphrases are workshops. Read the bare text before a demand letter.",
          tone: "navy",
        },
        {
          title: "Tariff annex wins",
          body: "Volumetric factors and ODA pin lists sit in the carrier schedule - not in a blog exhibit.",
          tone: "teal",
        },
      ],
    },
  ],
};
