/** Deep-research exhibits: 32-ft SXL vs MXL container sizing India.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * Workshop bands. Confirm CMVR / MoRTH bare text and your RC before a tender.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const container32ftKpis: readonly BlogKpi[] = [
  {
    value: "7.0 - 8.5 T",
    label: "32-ft SXL net legal payload",
    detail:
      "Workshop band for a standard 32-foot single-axle (2-axle / 6-wheeler) enclosed container after heavy body tare on an ~18.5 T GVW chassis. Confirm unladen weight on the RC and weighbridge.",
  },
  {
    value: "14.5 - 16.5 T",
    label: "32-ft MXL net legal payload",
    detail:
      "Workshop band for a 32-foot multi-axle (3-axle / 10-wheeler) container on a ~28 T GVW chassis after enclosed-body tare. Not a national guarantee - chassis and body build control.",
  },
  {
    value: "1,850 - 2,250 CFT",
    label: "Usable internal volume band",
    detail:
      "Directional cubic capacity from standard ~8.0-8.5 ft internal height boxes to specialized ~9.5-10 ft High Cube (HQ) variants before CMVR ground-to-roof limits bind.",
  },
  {
    value: "16 - 18",
    label: "Single-tier industrial pallets",
    detail:
      "Floor count for 1200 x 1000 mm industrial pallets inside a 32-ft box (straight / pinwheel layouts). Nested turns can reach 18 when clear width allows.",
  },
  {
    value: "25% - 35%",
    label: "Dead-freight premium risk",
    detail:
      "Workshop cost hit when a desk hires an MXL multi-axle for low-density cargo that cubes out under ~7 tonnes - paying for axle capacity the volume never uses.",
  },
  {
    value: "4.0 / 4.52 m",
    label: "CMVR height framing",
    detail:
      "Rule 93 CMVR: many N2/N3 builds sit under a 4.0 m overall height framing; closed load bodies / fabricated containers commonly use the higher 4.52 m proviso when the bare amendment applies. Confirm RC, body plate, and live CMVR text before HQ builds.",
  },
] as const;

export const container32ftTakeaways = [
  '"32 feet" is a length class, not a payload class. SXL (~18.5 T GVW) and MXL (~28 T GVW) share the box length and diverge on legal tonnes.',
  "Enclosed body tare (steel, aluminium, or PUF panels) routinely eats 10 to 13.5 tonnes of GVW - always subtract measured tare before promising payload to sales.",
  "Cube-out vs weigh-out is the selection engine: density under ~4.5 kg/CFT usually wants SXL; density above ~6.0 kg/CFT usually needs MXL.",
  "High Cube height buys CFT but still collides with CMVR ground-to-roof framing (4.0 m base / 4.52 m closed-body proviso when applicable) - low-deck chassis and low-profile tyres are not optional cosmetics.",
  "Wrong chassis on the Pune to Delhi workshop corridor can waste ~Rs 20,000 per trip (about 25%) when light packaging is booked on an MXL rate card.",
  "Post exact specs (32ft SXL HQ / 32ft MXL) on TranZfort; run volumetric SKU matching and dedicated fleets on ZAFTYS TMS - verify RC GVW before gate-in.",
] as const;

export const container32ftReferences = [
  "[Central Motor Vehicles Rules (CMVR), 1989](https://www.indiacode.nic.in/handle/123456789/1798?locale=en) - Rule 93 overall dimensions (height, length, overhang framing). Confirm bare text and amendments including closed-body height provisos.",
  "MoRTH Notification S.O. 3467(E) - safe axle load / GVW ratings for 2-axle and 3-axle commercial transport vehicles (orientation; verify live gazette on morth.nic.in).",
  "[Motor Vehicles Act, 1988](https://www.indiacode.nic.in/handle/123456789/1797?locale=en) - Section 113 (limits of weight and limitations on use), Section 114 (power to have vehicle weighed), and Section 194 (penalties for contravention of Section 113 / 114 weight limits).",
  "Automotive Industry Standard AIS-093 - code of practice for construction and approval of commercial vehicle truck bodies (body builder orientation).",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort).",
  "Internal cluster: [planning industrial shipments](/blog/planning-industrial-shipments), [axle load and GVW](/blog/india-axle-load-gvw-limits-heavy-freight), [truck freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide), [FTL vs PTL](/blog/ftl-vs-ptl-freight-services-india-cost-break-even-guide), [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [industrial TMS](/blog/industrial-tms-control-stack-india), [container trucking India](/blog/container-trucking-logistics-india).",
] as const;

export const container32ftExhibits: Record<string, readonly BlogExhibit[]> = {
  "The workhorse of Indian high-cube logistics": [
    {
      kind: "callout",
      caption: "Key definitions (quotable)",
      source: "Workshop terminology used throughout this guide. Confirm RC GVW before a tender promise.",
      items: [
        {
          title: "32-ft SXL",
          body: "About 32-ft closed box on a single rear-axle (~18.5 T GVW / 2-axle) chassis - typical net payload ~7.0 to 8.5 T after enclosed-body tare.",
          tone: "navy",
        },
        {
          title: "32-ft MXL",
          body: "Same length class on a multi-axle (~28 T GVW / 3-axle) chassis - typical net payload ~14.5 to 16.5 T after tare.",
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
      caption: "Chassis architecture workshop bands (confirm RC and body builder plate)",
      source: "Teaching bands for common Indian OEM platforms. Individual builds vary with steel vs aluminium vs PUF bodies.",
      headers: ["Parameter", "32-ft SXL (2-axle / 6W)", "32-ft MXL (3-axle / 10W)"],
      rows: [
        ["Typical GVW class", "~18.5 tonnes", "~28.0 tonnes"],
        ["Example platforms", "Tata LPT 1918, AL 1820, Eicher Pro 6019 class", "Tata Signa 2818/2823, AL 2820, BharatBenz 2823 class"],
        ["Unladen tare (workshop)", "~10.0 to 11.2 T", "~11.8 to 13.5 T"],
        ["Net legal payload (workshop)", "~7.0 to 8.5 T", "~14.5 to 16.2 T"],
        ["Rear axle story", "Single rear drive axle", "Tandem / multi rear axle group"],
        ["Toll category (typical)", "2-axle commercial", "3-axle / MAV band"],
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
      source: "Workshop internals. Measure the empty box; brochure CFT often overstates usable cube.",
      src: "/images/blog/32ft-container-cft-calculator.png",
      alt: "Formula board for cubic feet as internal length times width times height in inches divided by 1728, contrasting standard and high cube 32-ft boxes",
    },
    {
      kind: "table",
      caption: "Standard vs High Cube volume workshop",
      source: "Illustrative internals. Door frame and wheel-arch intrusion reduce usable cube further.",
      headers: ["Variant", "Approx internals (L x W x H)", "Workshop CFT", "Workshop CBM"],
      rows: [
        ["32-ft standard height", "31.5 x 7.8 x 8.0 ft", "~1,960 CFT", "~55.5 CBM"],
        ["32-ft High Cube (HQ)", "31.5 x 7.8 x 9.5 to 10.0 ft", "~2,300 to 2,450 CFT", "~65 to 69 CBM"],
      ],
    },
    {
      kind: "callout",
      caption: "CMVR Rule 93 height and low-deck reality",
      source: "Rule 93 height framing - confirm bare CMVR text and amendments for your vehicle class.",
      items: [
        {
          title: "4.0 m / 4.52 m framing",
          body: "Many N2/N3 builds are framed at 4.0 m overall height; closed load bodies and fabricated containers commonly use a higher 4.52 m proviso when the amendment applies. Confirm RC and body plate - do not assume either number blindly.",
          tone: "navy",
        },
        {
          title: "Low-deck + low-profile tyres",
          body: "10-ft HQ boxes typically need low chassis and 295/80 R22.5 or 275/70 R22.5 class packages to clear toll canopies and overpasses even when the 4.52 m closed-body proviso is available.",
          tone: "teal",
        },
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
          body: "Section 194 sets the cash fine for contravening Section 113 weight limits - commonly framed around Rs 20,000 base plus about Rs 2,000 per excess tonne - plus offloading delays at RTO weighbridges. Confirm bare Act text and state schedules.",
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
        { title: "05 Verify height / HQ", body: "Check stack vs 9.5-10 ft HQ and CMVR 4.0 / 4.52 m framing." },
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
