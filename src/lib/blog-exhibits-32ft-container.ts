/** Deep-research exhibits: 32-ft SXL vs MXL container sizing India.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * Workshop bands. Confirm CMVR / MoRTH bare text and your RC before a tender.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const container32ftKpis: readonly BlogKpi[] = [
  {
    value: "GVW - tare",
    label: "Payload formula (any config)",
    detail:
      "Available payload = registered GVW minus actual tare, subject to axle-load and other legal constraints. '32 feet' alone never sets tonnes.",
  },
  {
    value: "Multi-OEM*",
    label: "32-ft OEM evidence table",
    detail:
      "*ZAFTYS Intelligence rows checked 19 Nov 2026 (Tata, Ashok Leyland, Eicher). Publish only manufacturer-stated GVW/deck/payload; blanks stay 'Not stated in the cited source.' Not a universal SXL/MXL tonne band.",
  },
  {
    value: "~1,966 CFT*",
    label: "Example geometric volume",
    detail:
      "*Hypothetical internals: 31.5 x 7.8 x 8.0 ft = 1,965.6 CFT. Geometric volume is not usable loading volume. Deck length != internal cargo length.",
  },
  {
    value: "SXL / MXL",
    label: "Commercial desk labels",
    detail:
      "Used on Indian desks for single-axle vs multi-axle 32-ft closed boxes. Not universal engineering standards with fixed tare and payload. Always write axle class + RC GVW.",
  },
  {
    value: "3.8 / 4.20 / 4.52 m",
    label: "CMVR height categories",
    detail:
      "MoRTH CMVR Chapter V orientation: general 3.8 m; tractor-trailer goods 4.20 m; specified laden ISO / fabricated containerized exception 4.52 m when that text applies. Not every 32-ft box qualifies for 4.52 m.",
  },
  {
    value: "Verify RC",
    label: "Before promising tonnes",
    detail:
      "Marketplace listing labels and OEM deck options do not guarantee legal compliance. Confirm RC GVW, measured tare, body approval, height category, and route clearances.",
  },
] as const;

export const container32ftTakeaways = [
  '"32 feet" is a length / deck class, not a payload class. Actual tonnes depend on chassis, axle group, registered GVW, body construction, and measured tare.',
  "SXL and MXL are commercial desk labels for single-axle vs multi-axle closed boxes - not fixed OEM standards with one national tare and payload.",
  "Available payload = registered GVW minus actual tare, subject to axle limits. Prefer OEM model rows and RC weighbridge evidence over folklore tonne bands.",
  "Keep three measurements separate: OEM deck length, internal usable cargo dimensions, and legal payload for that configuration.",
  "High Cube height still collides with CMVR height categories (3.8 / 4.20 / 4.52 m) and route clearances - do not assume every HQ build is legal at 4.52 m.",
  "Post exact specs on TranZfort and allocate fleets in ZAFTYS TMS - listing language never replaces RC and tare checks.",
] as const;

export const container32ftReferences = [
  "[Tata Motors - Azura T.19 product context](https://trucks.tatamotors.com/blogs/tata-azura-t19-built-for-the-festive-rush) - OEM orientation for the T.19 / 19 T class and deck options that can include 32 ft. Confirm payload on the live brochure/datasheet.",
  "[Tata Motors - Ultra Ex 1918.T](https://trucks.tatamotors.com/blog/getting-to-know-your-tata-ultra-ex-1918-t) - OEM blog: deck lengths 20 / 24 / 32 ft; GVW printed as 18500 (unit wording on page needs live datasheet confirm).",
  "[Tata Motors - LPT/SIGNA 3525.T](https://trucks.tatamotors.com/product/tata-signa-3525t) - OEM product page: GVW 35,000 kg; load span options include 32 ft. Payload/unladen not stated on the page checked.",
  "[Tata Motors - LPT/SIGNA 4932.T](https://trucks.tatamotors.com/product/tata-signa-4932t) - OEM product page / brochure: GVW 49,000 kg; deck lengths include 32 ft. Absolute payload not stated on the materials checked.",
  "[Ashok Leyland - Haulage 4x2 GVW 19T](https://ashokleyland.com/in/trucks/haulage/haulage-4x2gvw-19t) - OEM page: GVW 18.5 T; loading span 6.8 to 9.7 m. Payload/unladen not stated on the page checked.",
  "[Eicher Pro 3015 L32](https://www.eichertrucksandbuses.com/light-medium-duty-trucks/medium-duty/pro-3015-l32) - OEM page: GVW 16,371 kg; 32 ft cargo body; internal length listed 9,750 mm. Payload/unladen not stated on the page checked.",
  "[Tata Motors Azura range PDF (Azura 1918)](https://trucks.tatamotors.com/assets/trucks/files/2026-01/azura-range.pdf) - Official brochure checked 19 Nov 2026: GVW 18,500 kg; payload 12,600 kg; load-body options 17-24 ft only - not entered as a 32-ft row.",
  "[Tata Motors commercial trucks](https://trucks.tatamotors.com/) - starting point for other model pages; do not mix GVW from one model with tare from another.",
  "[MoRTH - CMVR Chapter V PDF](https://morth.gov.in/sites/default/files/CMVR-chapter5.pdf) - overall dimensions including height categories (3.8 m / 4.20 m / 4.52 m framing). Confirm current consolidated text.",
  "[Central Motor Vehicles Rules (CMVR), 1989](https://www.indiacode.nic.in/handle/123456789/1798?locale=en) - Rule 93 overall dimensions. Confirm bare text.",
  "MoRTH Notification S.O. 3467(E) - safe axle load / GVW ratings orientation; verify live gazette on morth.nic.in.",
  "[Motor Vehicles Act, 1988](https://www.indiacode.nic.in/handle/123456789/1797?locale=en) - Sections 113, 114, and 194. Confirm bare text before quoting fines.",
  "Automotive Industry Standard AIS-093 - commercial vehicle truck-body construction orientation.",
  "Methodology (ZAFTYS Intelligence): AI-assisted research. CFT examples are hypothetical geometric maths. OEM table cells are manufacturer-published only; inventing blanks is forbidden. Workshop SXL/MXL tonne bands are withdrawn as universal facts until each range has matching configuration-specific OEM or RC evidence.",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort).",
  "Internal cluster: [planning industrial shipments](/blog/planning-industrial-shipments), [axle load and GVW](/blog/india-axle-load-gvw-limits-heavy-freight), [truck freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide), [FTL vs PTL](/blog/ftl-vs-ptl-freight-services-india-cost-break-even-guide), [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [industrial TMS](/blog/industrial-tms-control-stack-india), [container trucking India](/blog/container-trucking-logistics-india).",
] as const;

export const container32ftExhibits: Record<string, readonly BlogExhibit[]> = {
  "The workhorse of Indian high-cube logistics": [
    {
      kind: "callout",
      caption: "Quick answer",
      source: "Primary query framing. Payload = registered GVW - actual tare (subject to axle limits).",
      items: [
        {
          title: "SXL vs MXL",
          body: "Same ~32-ft box length; different GVW classes. Workshop calculated bands: SXL ~7.0-8.5 T; MXL ~14.5-16.2 T under assumed tare.",
          tone: "navy",
        },
        {
          title: "Height",
          body: "CMVR categories orient around 3.8 / 4.20 / 4.52 m - not every 32-ft box is 4.52 m legal.",
          tone: "teal",
        },
        {
          title: "Corrections",
          body: "Report factual errors to contact@zaftys.com with the article URL.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Key definitions (quotable)",
      source: "Workshop terminology used throughout this guide. Confirm RC GVW before a tender promise.",
      items: [
        {
          title: "32-ft SXL",
          body: "Commercial desk label for a ~32-ft closed box on a single rear-axle (2-axle) story. Payload is not fixed by the label - read RC GVW and measured tare.",
          tone: "navy",
        },
        {
          title: "32-ft MXL",
          body: "Commercial desk label for the same length class on a multi-axle (3-axle) story. Still not a universal OEM payload standard.",
          tone: "teal",
        },
        {
          title: "Cube-out vs weigh-out",
          body: "Cube-out: volume full, mass under legal cap. Weigh-out: mass at GVW/axle cap, cubic space left. Density decides which binds first.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Why 32-ft closed containers replaced open wooden trucks on high-cube lanes",
      source: "Operating pattern for FMCG, white goods, pharma secondary, packaging, automotive plastics, and e-commerce. Not a market-share claim.",
      items: [
        {
          title: "Weather and pilferage",
          body: "Enclosed walls and bolt seals cut rain damage and roadside theft versus tarpaulin open bodies.",
        },
        {
          title: "Dock standardisation",
          body: "Rear double doors and flat floors fit pallet jacks and DC dock plates better than irregular wooden platforms.",
        },
        {
          title: "The naming trap",
          body: "Dispatchers hear '32 feet' and assume one payload. Length is shared. Axle class is not.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Core confusion that burns money",
      source: "Procurement briefing aid.",
      items: [
        {
          title: "Length is not tonnes",
          body: "32-ft SXL and 32-ft MXL look identical from the dock. Registered GVW and tare decide legal payload.",
          tone: "warm",
        },
        {
          title: "Desk rule",
          body: "Write SXL or MXL on every indent. Never publish only '32ft container.'",
          tone: "navy",
        },
      ],
    },
  ],

  "32-foot SXL vs 32-foot MXL: engineering architecture": [
    {
      kind: "table",
      caption: "Payload formula (use before any tonne promise)",
      source: "Method only. Inputs must come from the RC / weighbridge for that vehicle - not from a length label.",
      headers: ["Step", "Rule"],
      rows: [
        ["1", "Read registered GVW from the RC for the exact vehicle"],
        ["2", "Measure or obtain actual tare including body and permanent equipment"],
        ["3", "Payload = GVW - tare, then check axle-group limits"],
        ["4", "Do not paste OEM deck-length payload onto a heavier enclosed container without re-weighing"],
      ],
    },
    {
      kind: "table",
      caption: "OEM model-specific 32-ft configurations (manufacturer-published values only)",
      source:
        "ZAFTYS Intelligence source check 19 Nov 2026. Each row is model-specific - not a universal SXL/MXL payload band. Deck/body length is not usable internal cargo cube. 'Not stated in the cited source' means the public page/brochure checked did not publish that figure for the stated configuration. Re-open each URL before a tender.",
      headers: ["OEM / model", "GVW (published)", "Payload (published)", "Deck / body length", "Unladen / tare", "Source URL"],
      rows: [
        [
          "Tata Motors Azura T.19",
          "About 18,500 kg (orientation from Tata public materials / 19 T class listings)",
          "About 13,100 kg appears on secondary CV listings for T.19 - confirm against the live Tata brochure/datasheet for the exact variant before a tender (not every enclosed 32-ft body after container tare)",
          "Materials / listings cite deck options that can include 32 ft",
          "Not stated in the cited primary page as one figure for every body",
          "https://trucks.tatamotors.com/blogs/tata-azura-t19-built-for-the-festive-rush",
        ],
        [
          "Tata Motors Ultra Ex 1918.T",
          "18,500 kg class (OEM blog text literally prints '18500 tons'; treat as the Ultra 19 T class and reconfirm live datasheet)",
          "Not stated in the cited source",
          "20 ft / 24 ft / 32 ft",
          "Not stated in the cited source",
          "https://trucks.tatamotors.com/blog/getting-to-know-your-tata-ultra-ex-1918-t",
        ],
        [
          "Tata Motors LPT / SIGNA 3525.T",
          "35,000 kg",
          "Not stated in the cited source",
          "22 ft / 24 ft / 28 ft / 32 ft",
          "Not stated in the cited source",
          "https://trucks.tatamotors.com/product/tata-signa-3525t",
        ],
        [
          "Tata Motors LPT / SIGNA 4932.T",
          "49,000 kg",
          "Not stated as an absolute payload in the cited product page / brochure (relative marketing claims are not entered here)",
          "28 ft / 30 ft / 32 ft (product page); confirm exact brochure variant",
          "Not stated in the cited source",
          "https://trucks.tatamotors.com/product/tata-signa-4932t",
        ],
        [
          "Ashok Leyland Haulage 4x2 GVW 19T",
          "18.5 T",
          "Not stated in the cited source",
          "Loading span 6.8 m to 9.7 m (max span is ~32 ft class; confirm exact body build)",
          "Not stated in the cited source",
          "https://ashokleyland.com/in/trucks/haulage/haulage-4x2gvw-19t",
        ],
        [
          "Eicher Pro 3015 L32",
          "16,371 kg",
          "Not stated in the cited source",
          "32 ft cargo body (internal length listed 9,750 mm on OEM page)",
          "Not stated in the cited source",
          "https://www.eichertrucksandbuses.com/light-medium-duty-trucks/medium-duty/pro-3015-l32",
        ],
      ],
    },
    {
      kind: "callout",
      caption: "How to read the OEM table",
      source: "ZAFTYS Intelligence methodology. Manufacturer values vs plant calculation.",
      items: [
        {
          title: "Commercial labels",
          body: "SXL and MXL help desks name axle class. They are not OEM-standardised fixed tare/payload engineering rows.",
          tone: "navy",
        },
        {
          title: "Published vs calculated",
          body: "Cells above are manufacturer-published only. Calculated payload = registered GVW minus measured tare for that completed vehicle - never invent component numbers to fill blanks.",
          tone: "warm",
        },
        {
          title: "What to publish on an indent",
          body: "OEM/model where known + RC GVW + measured tare + axle class - not '32ft' alone.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Why tare swings several tonnes on the same '32-ft' label",
      source: "Body construction orientation. Weigh the empty truck.",
      items: [
        {
          title: "Steel corrugated",
          body: "Heavier structural subframe and walls - higher tare, lower net payload.",
        },
        {
          title: "Aluminium composites",
          body: "Lighter walls buy payload back - capital cost and repair skill differ.",
        },
        {
          title: "PUF sandwich / insulated",
          body: "Pharma and temperature-sensitive secondary packs add panel mass and door hardware.",
        },
      ],
    },
  ],

  "Internal dimensions, height variants, and cubic feet mathematics": [
    {
      kind: "image",
      caption: "High-cube volumetric CFT calculator [CUBIC CAPACITY ENGINE]",
      source: "Hypothetical geometric example: 31.5 x 7.8 x 8.0 ft = 1,965.6 CFT. Measure the empty box; brochure CFT often overstates usable cube.",
      src: "/images/blog/32ft-container-cft-calculator.png",
      alt: "Formula board for cubic feet as internal length times width times height in inches divided by 1728, contrasting standard and high cube 32-ft boxes",
    },
    {
      kind: "table",
      caption: "Standard vs High Cube volume workshop",
      source: "Illustrative internals. Door frame and wheel-arch intrusion reduce usable cube further.",
      headers: ["Variant", "Approx internals (L x W x H)", "Workshop CFT", "Workshop CBM"],
      rows: [
        ["32-ft standard height (example)", "31.5 x 7.8 x 8.0 ft", "1,965.6 CFT geometric", "~55.6 CBM"],
        ["32-ft High Cube (HQ)", "31.5 x 7.8 x 9.5 to 10.0 ft", "~2,300 to 2,450 CFT", "~65 to 69 CBM"],
      ],
    },
    {
      kind: "callout",
      caption: "CMVR height categories and low-deck reality",
      source: "MoRTH CMVR Chapter V orientation - confirm current consolidated text. Not every 32-ft box qualifies for 4.52 m.",
      items: [
        {
          title: "3.8 / 4.20 / 4.52 m",
          body: "General vehicle height 3.8 m; tractor-trailer goods vehicle 4.20 m; laden trailer with ISO Series 1 or fabricated containerized motor vehicle 4.52 m when that exception applies. Match category to the exact configuration on the RC.",
          tone: "navy",
        },
        {
          title: "Low-deck + route clearance",
          body: "10-ft HQ boxes typically need low chassis and low-profile tyre packages. Legal overall height and physical overpass / toll-canopy clearance are separate constraints.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "table",
      caption: "Height category checklist (confirm before HQ tender)",
      source: "Educational aid. Re-check MoRTH CMVR Chapter V and amendments before publication.",
      headers: ["Configuration", "Height framing (orientation)", "Evidence required"],
      rows: [
        ["General goods vehicle (default)", "3.8 m overall", "RC + body plate + live CMVR text"],
        ["Tractor-trailer goods vehicle", "4.20 m overall", "RC configuration + trailer registration"],
        ["Laden ISO Series 1 / fabricated containerized exception", "4.52 m when exception applies", "Prove the legal category - do not assume for every 32-ft box"],
        ["Route / structure clearance", "Separate from statutory height", "Corridor survey / toll canopy notes"],
      ],
    },
  ],

  "The physics of cube-out vs weigh-out": [
    {
      kind: "image",
      caption: "Volumetric density threshold [CHASSIS SELECTION CRITERION]",
      source: "Workshop decision rule. Recompute with your measured tare and usable CFT.",
      src: "/images/blog/32ft-container-density-threshold.png",
      alt: "Formula board for cargo density as total kilograms over total cubic feet with SXL versus MXL selection rule at about 4.5 kg per CFT",
    },
    {
      kind: "donut",
      caption: "32-foot high-cube capacity utilization: the volume-weight split",
      source:
        "Single-denominator workshop pie (100%) for teaching how cube-led cargo experiences the vehicle. Not a ZAFTYS audited national utilisation index.",
      slices: [
        { label: "Usable volumetric air space (cube utilization)", value: 64, color: zaftysViz.navy },
        { label: "Structural container body and chassis tare", value: 22, color: zaftysViz.primary },
        { label: "Net legal payload mass allowance", value: 14, color: zaftysViz.teal },
      ],
    },
    {
      kind: "tiles",
      caption: "Decision rule by bulk density",
      source: "Desk scanner. Borderline cargo: quote both and recompute after tare weigh.",
      items: [
        {
          title: "Under ~4.5 kg/CFT",
          body: "Foam, snacks, empty bottles, plastic bumpers, packaging - SXL is usually mandatory. MXL buys deadweight capacity you cannot fill.",
        },
        {
          title: "Grey band ~4.5 to 6.0",
          body: "Quote both. Pallet stack height and HQ vs standard height move the answer.",
        },
        {
          title: "Above ~6.0 kg/CFT",
          body: "Oil drums, paint, fasteners, dense liquids - MXL is usually mandatory. SXL overloads the rear axle fast.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Hypothetical cargo binding test (which limit hits first)",
      source: "Illustrative only. Density = kg / usable CFT. Stacking assumed only where crush strength allows.",
      headers: ["Cargo example", "Mass", "Usable CFT", "Density", "Binds first"],
      rows: [
        ["Light packaging (bulky)", "6,800 kg", "1,900 CFT", "3.6 kg/CFT", "Volume (cube-out) - SXL usually enough"],
        ["Dense drums / fasteners", "14,000 kg", "1,600 CFT", "8.8 kg/CFT", "Mass (weigh-out) - MXL usually required"],
        ["Borderline SKU mix", "9,500 kg", "1,900 CFT", "5.0 kg/CFT", "Grey band - quote both; recompute after tare"],
      ],
    },
    {
      kind: "table",
      caption: "Pre-booking vehicle-selection checklist",
      source: "Operational checklist before posting or accepting a 32-ft indent. Marketplace labels do not guarantee compliance.",
      headers: ["#", "Check"],
      rows: [
        ["1", "Confirm exact axle class and body type (SXL vs MXL; standard vs HQ)"],
        ["2", "Request RC GVW and approved body details"],
        ["3", "Confirm actual tare or recent weighbridge empty weight"],
        ["4", "Confirm applicable axle limits for the configuration"],
        ["5", "Measure usable internals, door clearance, and loading height"],
        ["6", "Check cargo dimensions, density, pallet footprint, stacking limits"],
        ["7", "Check route / structure clearances where HQ height is planned"],
        ["8", "Confirm legal height category for that vehicle (3.8 / 4.20 / 4.52 m framing)"],
      ],
    },
  ],

  "Pallet loading mathematics and floor space optimization": [
    {
      kind: "table",
      caption: "Pallet and floor geometry inside a 32-ft box (workshop)",
      source: "1200 x 1000 mm industrial and 1200 x 800 mm Euro standards. Measure clear internal width.",
      headers: ["Item", "Workshop figure", "Notes"],
      rows: [
        ["Industrial pallet", "1200 x 1000 mm", "Dominant Indian DC / plant standard"],
        ["Euro pallet", "1200 x 800 mm", "More units possible; stability differs"],
        ["Usable internal length", "~9,600 mm", "After door frame intrusion"],
        ["Usable internal width", "~2,380 mm", "Corrugation and lining reduce brochure width"],
        ["Single-tier 1200x1000", "16 pallets (8 x 2)", "Straight / pinwheel side-by-side"],
        ["Nested turn layouts", "Up to 18 pallets", "Only if clear width approaches 2,400 mm"],
        ["HQ double-stack", "32 to 36 pallets", "Crush strength + legal weight both bind"],
      ],
    },
    {
      kind: "callout",
      caption: "Double-stacking is a strength test, not a height wish",
      source: "Warehouse ops. Pair with transit damage packing practice.",
      items: [
        {
          title: "Crush first",
          body: "If bottom cartons cannot survive the stack, HQ height is useless cube.",
          tone: "warm",
        },
        {
          title: "Then weigh",
          body: "32 to 36 pallets still must stay inside SXL or MXL legal payload after tare.",
          tone: "teal",
        },
      ],
    },
  ],

  "Regulatory compliance: axle weights, CMVR norms, and weighbridge traps": [
    {
      kind: "tiles",
      caption: "Section 113 overload trap on 32-ft SXL (penalty under Section 194)",
      source: "Motor Vehicles Act orientation. Confirm bare Sections 113, 114, and 194 and state compounding schedules.",
      items: [
        {
          title: "11 T into an SXL",
          body: "A supervisor loading ~11 tonnes into a 32-ft SXL routinely exceeds single rear drive axle limits even when 'the box looks empty.'",
        },
        {
          title: "Penalty band (workshop)",
          body: "Section 194 sets the cash fine for contravening Section 113 weight limits, plus offloading delays at RTO weighbridges. Confirm bare Act text and state schedules before quoting rupees - this guide does not assert an unverified fine schedule.",
        },
        {
          title: "Impound risk",
          body: "Illegal 34-ft / 36-ft extensions that break Rule 93 overhang (rear overhang vs wheelbase) invite RTO detention.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Bridge formula and overhang discipline",
      source: "CMVR Rule 93(6) overhang framing - confirm bare rule.",
      items: [
        {
          title: "60% wheelbase rule",
          body: "Container rear body overhang generally cannot exceed 60% of vehicle wheelbase. Stretched boxes fail audits.",
          tone: "navy",
        },
        {
          title: "Weigh before gate-out",
          body: "Gross weighbridge after load is cheaper than a highway compound. See [axle load guide](/blog/india-axle-load-gvw-limits-heavy-freight).",
          tone: "teal",
        },
      ],
    },
  ],

  "Worked financial case: packaging manufacturer Pune to Delhi corridor": [
    {
      kind: "image",
      caption: "Dead-freight waste on over-sized chassis [FREIGHT CAPITAL LEAKAGE]",
      source: "Workshop: Dead freight cost = R_trip(MXL) - R_trip(SXL) on the same cube-out cargo.",
      src: "/images/blog/32ft-container-dead-freight-equation.png",
      alt: "Formula board showing dead freight cost as MXL trip rate minus SXL trip rate for light packaging that cubes out",
    },
    {
      kind: "image",
      caption: "Wrong chassis penalty: SXL vs MXL on Pune to Delhi (workshop)",
      source:
        "Teaching waterfall. Right-sized SXL Rs 58,000 vs over-sized MXL Rs 78,000 vs overloaded SXL landed near Rs 89,000. Not a ZAFTYS audited trip file.",
      src: "/images/blog/32ft-container-wrong-chassis-waterfall.png",
      alt: "Horizontal cost comparison of right-sized 32-ft SXL at Rs 58000, over-sized MXL at Rs 78000, and overloaded SXL with Section 113 penalties landing near Rs 89000",
    },
    {
      kind: "table",
      caption: "Line-item reconciliation: 1,900 CFT / 6.8 MT Chakan to Greater Noida (~1,450 km)",
      source: "Folded corrugated cartons. Workshop toll and fuel deltas. Confirm live NHAI class rates before a tender.",
      headers: ["Line", "Model A - 32ft MXL", "Model B - 32ft SXL HQ"],
      rows: [
        ["Trip freight (workshop)", "Rs 78,000", "Rs 58,000"],
        ["Cargo fit", "Cubes out; axles unused", "Right-sized for density"],
        ["Toll class (workshop)", "3-axle / MAV ~Rs 6.35/km", "2-axle ~Rs 5.20/km"],
        ["Fuel burn story", "Heavier 3-axle chassis", "Lighter 2-axle chassis"],
        ["Net landed vs SXL", "+ Rs 20,000 (~25.6%)", "Baseline"],
        ["Annual (2 trucks / week)", "+ ~Rs 4.8 lakh waste", "Recovery opportunity"],
      ],
    },
  ],

  "Standard operating procedure: the 8-step container selection protocol": [
    {
      kind: "image",
      caption: "8-point container sizing and loading workflow",
      source: "Operating sequence for plant dispatch, warehouse, and procurement.",
      src: "/images/blog/32ft-container-8-step-sizing.png",
      alt: "Process board with eight steps from weigh net cargo through measure CFT, density, SXL vs MXL, height check, post spec, inspect gaskets, and bolt seal",
    },
    {
      kind: "steps",
      caption: "8-stage protocol (desk copy)",
      source: "Same sequence as the process board.",
      items: [
        { title: "01 Weigh net cargo", body: "Sum consignment mass in kg - not brochure pallet weights." },
        { title: "02 Measure total CFT", body: "Sum package L x W x H in inches / 1728." },
        { title: "03 Calculate density", body: "Total kg divided by total CFT." },
        { title: "04 Select SXL vs MXL", body: "Under ~4.5 kg/CFT lean SXL; above lean MXL." },
        { title: "05 Verify height / HQ", body: "Check stack vs 9.5-10 ft HQ and CMVR 3.8 / 4.20 / 4.52 m categories." },
        { title: "06 Post exact spec", body: "Publish 32ft SXL HQ or 32ft MXL on TranZfort / ZAFTYS." },
        { title: "07 Inspect at gate-in", body: "Door gaskets, locking rods, floor flatness." },
        { title: "08 Tare, load, seal", body: "Record tare weigh; apply numbered bolt seal." },
      ],
    },
  ],

  "How modern marketplaces and enterprise TMS streamline container sourcing": [
    {
      kind: "tiles",
      caption: "TranZfort Android vs ZAFTYS web TMS roles",
      source: "Product positioning for this guide.",
      items: [
        {
          title: "TranZfort posting",
          body: "Indie suppliers post exact specs - '32ft SXL HQ 2200 CFT' - free, with in-app chat and RC GVW vetting before load.",
        },
        {
          title: "Zero commission match",
          body: "Container fleet owners bid direct. No freight-market (mandi) markup for stating the axle class correctly.",
        },
        {
          title: "ZAFTYS fleet desk",
          body: "Enterprise volumetric engines match SKU weight and cube to chassis class, then track milestones and ePOD.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "RC check before the dock opens",
      source: "Fraud and mis-tag prevention.",
      items: [
        {
          title: "Read registered GVW",
          body: "18.5 T class vs 28 T class must match the indent. A 32-ft box on the wrong chassis is still the wrong truck.",
          tone: "warm",
        },
        {
          title: "One audit trail",
          body: "Marketplace bookings should return into ZAFTYS for gate-to-pay - see [industrial TMS](/blog/industrial-tms-control-stack-india).",
          tone: "teal",
        },
      ],
    },
  ],

  "The 20-point container sizing and fleet audit matrix and FAQs": [
    {
      kind: "table",
      caption: "Master 32-ft vehicle specification matrix (workshop)",
      source: "Teaching comparison. Measure your empty fleet; brochure numbers lie. Confirm CMVR and RC.",
      headers: [
        "Parameter",
        "24-ft container",
        "32-ft SXL std",
        "32-ft SXL HQ",
        "32-ft MXL std",
        "32-ft MXL HQ",
      ],
      rows: [
        ["Overall length class", "~24 ft", "~32 ft", "~32 ft", "~32 ft", "~32 ft"],
        ["Internal length (approx)", "~23 ft", "~31.5 ft", "~31.5 ft", "~31.5 ft", "~31.5 ft"],
        ["Internal width (approx)", "~7.8 ft", "~7.8 ft", "~7.8 ft", "~7.8 ft", "~7.8 ft"],
        ["Internal height (approx)", "~7.5-8.0 ft", "~8.0 ft", "~9.5-10.0 ft", "~8.0 ft", "~9.5-10.0 ft"],
        ["Volumetric CFT (workshop)", "~1,300-1,500", "~1,850-2,000", "~2,200-2,450", "~1,850-2,000", "~2,200-2,450"],
        ["Registered GVW class", "~16-18.5 T", "~18.5 T", "~18.5 T", "~28 T", "~28 T"],
        ["Avg tare (workshop)", "~8.5-10 T", "~10.0-11.2 T", "~10.2-11.5 T", "~11.8-13.5 T", "~12.0-13.8 T"],
        ["Net legal payload (workshop)", "~6-8 T", "~7.0-8.5 T", "~6.8-8.3 T", "~14.5-16.2 T", "~14.0-16.0 T"],
        ["Rear axles", "1", "1", "1", "2 (group)", "2 (group)"],
        ["Toll category (typical)", "2-axle", "2-axle", "2-axle", "3-axle/MAV", "3-axle/MAV"],
        ["Ideal cargo", "Short DC runs", "Light cube-out", "Tall light SKUs", "Dense weigh-out", "Dense + tall"],
      ],
    },
    {
      kind: "table",
      variant: "scorecard",
      caption: "20-point container sizing and fleet audit (rate 1 to 5; skip = 0)",
      source: "Coaching matrix for dispatch, warehouse, and fleet. Not a certification product.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Chassis", "Is every indent tagged SXL vs MXL - not only '32ft'?", ""],
        ["2", "Chassis", "Is cargo density (kg/CFT) computed before truck hire?", ""],
        ["3", "Chassis", "Are cube-out SKUs blocked from default MXL booking?", ""],
        ["4", "Chassis", "Are weigh-out SKUs blocked from default SXL booking?", ""],
        ["5", "Chassis", "Is HQ height chosen only after stack-height measurement?", ""],
        ["6", "Docs", "Is registered GVW read from RC before gate-in?", ""],
        ["7", "Docs", "Is empty tare weighed and recorded each trip?", ""],
        ["8", "Docs", "Do load photos show seal numbers and door integrity?", ""],
        ["9", "Docs", "Is Part B vehicle number matched to the RC on file?", ""],
        ["10", "Docs", "Are illegal 34/36-ft stretched boxes rejected on sight?", ""],
        ["11", "Sourcing", "Can the desk post '32ft SXL HQ' exactly on the marketplace?", ""],
        ["12", "Sourcing", "Is dead-freight tracked when MXL is used under 7 T?", ""],
        ["13", "Sourcing", "Are toll class differences in the landed-cost sheet?", ""],
        ["14", "Sourcing", "Do dedicated fleets and spot overflow share one sizing SOP?", ""],
        ["15", "Sourcing", "Does TMS recommend chassis from SKU weight + cube?", ""],
        ["16", "Gate", "Are door gaskets and locking rods inspected at gate-in?", ""],
        ["17", "Gate", "Is floor flatness checked before pallet loading?", ""],
        ["18", "Gate", "Is gross weighbridge mandatory before highway exit?", ""],
        ["19", "Gate", "Are numbered bolt seals applied and logged post-load?", ""],
        ["20", "Gate", "Is Section 113 near-miss logged when axle limits are close?", ""],
      ],
    },
  ],
};
