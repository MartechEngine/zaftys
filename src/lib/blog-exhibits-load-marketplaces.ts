/** Deep-research exhibits: online truck load marketplaces India.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * English first; Hindi plant terms only in brackets when needed.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const loadMarketplaceKpis: readonly BlogKpi[] = [
  {
    value: "8-10%*",
    label: "Offline broker commission (RHP cite)",
    detail:
      "*Industry estimate cited in BlackBuck / Zinka Logistics Solutions Red Herring Prospectus (7 Nov 2024) for offline marketplaces/brokers connecting shippers and truck operators. Not a universal tariff or corridor census.",
  },
  {
    value: "Define dwell",
    label: "Return-load idle time",
    detail:
      "Return-load dwell = clock time from empty after unload until the next paid load is accepted. Measure with start/end events - do not publish a national average without a dataset.",
  },
  {
    value: "Like-for-like",
    label: "Quote comparison rule",
    detail:
      "Compare only matched vehicle capacity, route, cargo, service level, transit time, taxes, and included costs. A lower sticker rate is not automatically a saving.",
  },
  {
    value: "Rs 54k maths*",
    label: "Hypothetical scenario floor",
    detail:
      "*Hypothetical ZAFTYS Intelligence scenario: floor Rs 54,000; brokered invoice Rs 62,000; alternative Rs 55,800; difference Rs 6,200 (10% of Rs 62,000). Assumptions only - not an audited trip. Do not invent component rupees without source documents.",
  },
  {
    value: "Free*",
    label: "Trucker & transporter matching",
    detail:
      "*Marketplace find/post/chat matching is free for truckers and transporters. Charges apply only when a transporter uses ZAFTYS TMS services - confirm live terms at tranzfort.com/legal/.",
  },
  {
    value: "Play Store",
    label: "Download + legal",
    detail:
      "App: play.google.com/store/apps/details?id=com.tranzfort.app · Legal hub: https://tranzfort.com/legal/ · Overview: /network/tranzfort.",
  },
] as const;

export const loadMarketplaceTakeaways = [
  "BlackBuck's November 2024 Red Herring Prospectus cites an estimated 8-10% commission range for offline brokers connecting shippers and truck operators - an industry estimate, not a universal tariff.",
  "Do not treat 8-15% leakage or 5-10% hidden aggregator spread as audited national averages without matching primary evidence.",
  "Hypothetical ZAFTYS Intelligence scenario: floor Rs 54,000; brokered invoice Rs 62,000; alternative invoice Rs 55,800; difference Rs 6,200 (10% of Rs 62,000) - assumptions for calculation literacy, not measured savings or a real customer trip.",
  "High-converting load posts need industrial pin codes, body type, net payload, commodity, loading window, and advance terms.",
  "TranZfort walkthrough: open app, create/post a load, find loads, review details, chat/call - verify vehicle suitability before agreeing.",
  "Matching is free for truckers and transporters; TMS seats are the paid path for transporters who need enterprise control. Legal: https://tranzfort.com/legal/.",
] as const;

export const loadMarketplaceReferences = [
  "[Carriage by Road Act, 2007](https://www.indiacode.nic.in/handle/123456789/2043?locale=en) and Carriage by Road Rules, 2011 - common carrier definition and goods receipt framing. Cite the specific section that supports each claim.",
  "[Information Technology Act, 2000](https://www.indiacode.nic.in/handle/123456789/1999?locale=en) - legal validity of electronic records, in-app contracts, and digital signatures (orientation; counsel owns litigation strategy).",
  "[Central Motor Vehicles Rules (CMVR), 1989](https://www.indiacode.nic.in/handle/123456789/1798?locale=en) - Rules 9 and 138A framing for electronic transport documentation. Confirm bare text before a legal memo.",
  "[CGST Act, 2017](https://www.indiacode.nic.in/handle/123456789/11537?locale=en) / Rules - Rule 138 e-Way Bill Part B updates when the vehicle moves. GTA tax detail: [GST on GTA guide](/blog/gst-on-gta-rcm-forward-charge-consignment-note-rules-guide).",
  "[Zinka Logistics Solutions Limited - Red Herring Prospectus (7 Nov 2024)](https://www.sebi.gov.in/sebi_data/attachdocs/nov-2024/1731409759538.PDF) - Industry Overview / Redseer-sourced industry estimate that offline marketplaces and brokers charge commission in about the 8-10% range for connecting shippers and truck operators. Limitations: not an audited national average; not every corridor/commodity; online platforms need not charge the same; distinguish broker commission from shipper-bill vs carrier-pay spreads.",
  "Methodology (ZAFTYS Intelligence): AI-assisted research. The Rs 54k / Rs 62k / Rs 55.8k figures are a labelled hypothetical freight-cost scenario - not an audited trip. Dwell examples are hypothetical unless a documented lane sample is cited. Internal notes: docs/zaftys-blog-evidence-register.csv · docs/zaftys-intelligence-methodology.md.",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort) · [Play Store](https://play.google.com/store/apps/details?id=com.tranzfort.app) · [Legal hub](https://tranzfort.com/legal/) (Privacy Policy and Terms of Service).",
  "Internal cluster: [truck freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide), [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india), [transit damage claims](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide), [FTL vs PTL](/blog/ftl-vs-ptl-freight-services-india-cost-break-even-guide), [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [industrial TMS control stack](/blog/industrial-tms-control-stack-india).",
] as const;

export const loadMarketplaceExhibits: Record<string, readonly BlogExhibit[]> = {
  "The Indian truck brokerage landscape: how Transport Nagars really work": [
    {
      kind: "callout",
      caption: "Quick answer",
      source: "Primary query framing for online truck-load marketplaces in India.",
      items: [
        {
          title: "What a marketplace does",
          body: "Matches shipper/supplier demand with truck capacity, with identity, evidence, and optionally a TMS handoff - pricing models differ.",
          tone: "navy",
        },
        {
          title: "Brokerage vs open matching",
          body: "Traditional stacks can be opaque; open rails let parties negotiate trip rates direct. Treat percentage leakage bands as estimates until measured.",
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
      source: "Ops vocabulary for this guide.",
      items: [
        {
          title: "Truck load marketplace",
          body: "Digital rail where shippers publish FTL requirements and verified truckers accept at a negotiated trip rate, with identity and evidence on one timeline.",
          tone: "teal",
        },
        {
          title: "Closed aggregator vs open marketplace",
          body: "Aggregator resells a landed rate that can embed a spread. Open marketplace lets parties negotiate direct with no platform cut on freight when that product policy applies.",
          tone: "navy",
        },
        {
          title: "Brokerage commission stack (dalali)",
          body: "Multi-tier booking, placement, and diesel-slip commissions between the factory budget and the asset-owning trucker.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "flow",
      caption: "Traditional multi-tier brokerage chain",
      source: "Operating pattern across regional Transport Nagars. Individual freight markets (mandis) differ.",
      items: [
        { title: "Consignor / factory desk", body: "Sets budget and loading window." },
        { title: "Primary freight broker", body: "Owns the shipper relationship and rate." },
        { title: "Regional sub-broker", body: "Places the indent into a local freight market (mandi)." },
        { title: "Lorry supplier - truck broker (dalal)", body: "Finds the asset-owning trucker." },
        { title: "Trucker / driver", body: "Runs the trip and carries the cash risk." },
      ],
    },
    {
      kind: "table",
      caption: "Anatomy of brokerage commission (dalali)",
      source: "Commercial workshop bands for teaching. Your freight-market (mandi) rate card controls.",
      headers: ["Fee layer", "Workshop band", "What it buys"],
      rows: [
        ["Booking commission", "Rs 500 - 1,500", "Indent placement into the freight market (mandi)"],
        ["Vehicle placement", "Rs 1,000 - 2,500", "Getting a truck to the gate on time"],
        ["Diesel slip (diesel parchi) kickback", "Pump / slip margin", "Advance routed via preferred fuel pump"],
      ],
    },
    {
      kind: "callout",
      caption: "Information asymmetry in the freight market (mandi)",
      source: "Harvest surges, monsoon choke points, and festival capacity squeezes.",
      items: [
        {
          title: "Shipper blind spot",
          body: "Factory desk hears one number. The trucker hears another. The gap funds the chain.",
          tone: "warm",
        },
        {
          title: "70:30 cash trap",
          body: "About 65% to 70% advance at loading. Balance often waits 30 to 60 days while invoices crawl.",
          tone: "navy",
        },
      ],
    },
  ],

  "The evolution of digital freight: from closed aggregators to open marketplaces": [
    {
      kind: "timeline",
      caption: "Three phases of digital freight matching in India",
      source: "Market pattern for this guide. Not a venture share table.",
      items: [
        {
          phase: "01",
          title: "WhatsApp and Telegram groups",
          body: "Unregulated forwards, fake RC photos, zero accountability when a truck never shows.",
        },
        {
          phase: "02",
          title: "Closed digital brokers / aggregators",
          body: "App UI with controlled supply. Pricing stays closed. Any hidden-spread percentage is a workshop assumption until measured with like-for-like quotes.",
        },
        {
          phase: "03",
          title: "Open digital marketplaces",
          body: "TranZfort model: free find/post/chat matching for truckers and transporters; paid path is ZAFTYS TMS for transporters who need enterprise control. Legal: tranzfort.com/legal/.",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "What Phase 3 changes on the ground",
      source: "Product positioning for this guide.",
      items: [
        {
          title: "Direct peer matching",
          body: "Indie suppliers and truckers negotiate on Android without a freight-market (mandi) middle desk.",
        },
        {
          title: "Vernacular + voice",
          body: "Hindi and English UI with audio read-aloud so highway drivers are not locked out by English-only forms.",
        },
        {
          title: "Enterprise handoff",
          body: "Corporate fleets stay on ZAFTYS web TMS. Overflow indents publish into the open marketplace when contracts cannot place.",
        },
      ],
    },
  ],

  "The mathematical cost of intermediation: the broker margin tax": [
    {
      kind: "image",
      caption: "Multi-tier brokerage tax equation [INTERMEDIATION FRICTION]",
      source: "Workshop algebra. Recompute with your lane's brokerage commission (dalali) stack.",
      src: "/images/blog/load-marketplace-broker-tax-equation.png",
      alt: "Formula board showing landed shipper cost as net trucker rate plus primary broker (dalal) fee plus sub-broker placement plus fuel advance discounting",
    },
    {
      kind: "donut",
      caption: "The Traditional Freight Rupee: where does the money go?",
      source:
        "Single-denominator workshop pie for this guide (100%). Not a ZAFTYS audited national rate index.",
      slices: [
        { label: "Truck direct operating (diesel, tolls, AdBlue)", value: 54, color: zaftysViz.navy },
        { label: "Fleet capital and standing (EMI, tyres, maintenance)", value: 26, color: zaftysViz.primary },
        { label: "Driver trip wages and trip allowance (bhatta)", value: 8, color: zaftysViz.teal },
        { label: "Multi-tier brokerage commission (dalali)", value: 12, color: zaftysViz.warm },
      ],
    },
    {
      kind: "image",
      caption: "Idle dwell opportunity cost - the empty return run (khali phera) drain [FLEET UTILIZATION LOSS]",
      source: "Illustrative teaching graphic. Return-load dwell is a variable to measure - not a published national average.",
      src: "/images/blog/load-marketplace-idle-dwell-cost.png",
      alt: "Formula board for daily capital burn while parked waiting for return load, contrasting idle loss with faster return booking",
    },
    {
      kind: "table",
      caption: "Hypothetical return-load economics (labelled assumptions)",
      source: "Illustrative only. Replace every assumption with your lane data before board use. A return load is not always available.",
      headers: ["Input / output", "Assumed value", "Notes"],
      rows: [
        ["Loaded km (outbound)", "1,150 km", "Raipur-Bhiwandi teaching corridor class"],
        ["Empty km before backhaul", "80 km", "Reposition assumption"],
        ["Assumed fuel efficiency", "3.5 km/l", "Assumption - not a measured fleet average"],
        ["Assumed diesel price", "Rs 90 / litre", "Placeholder - insert dated pump price"],
        ["Fuel litres (1,230 km / 3.5)", "~351 l", "Fuel = total km / km per litre"],
        ["Fuel cost", "~Rs 31,600", "Litres x diesel price"],
        ["Toll + driver + trip expenses (assumed)", "Rs 12,000", "Bundle assumption - split when you have data"],
        ["Outbound freight revenue (assumed)", "Rs 55,800", "Direct-match teaching price"],
        ["Return freight revenue (assumed)", "Rs 28,000", "Only if a return load is actually secured"],
        ["Waiting / dwell before return accept", "Measure - do not assume", "Start: empty after unload; end: return load accepted"],
        ["Contribution formulas", "Outbound: revenue - trip costs; Backhaul: return revenue - incremental return costs", "Not all return revenue is incremental profit"],
      ],
    },
    {
      kind: "table",
      caption: "Neutral sourcing-model comparison",
      source: "Educational compare. Confirm each platform's live terms before relying on a cell.",
      headers: ["Dimension", "Traditional broker", "Closed aggregator / fleet network", "Open digital marketplace", "Direct shipper-carrier"],
      rows: [
        ["Who sets price", "Broker / chain", "Platform or controlled supply", "Parties negotiate", "Contract negotiation"],
        ["Commission / spread disclosed", "Often opaque", "Often embedded in landed rate", "Should state platform fee policy", "Usually none beyond contract"],
        ["Verification approach", "Relationship / paper", "Platform KYC + fleet rules", "Profile + docs + plant gate", "Known fleet + plant gate"],
        ["Payment responsibility", "Often broker-mediated", "Per platform terms", "Per post / in-app terms", "Per MSA"],
        ["POD / dispute workflow", "Phone + paper", "App milestones vary", "In-app milestones when used", "MSA + ePOD"],
        ["Role of intermediary", "Intermediary", "Often contracting / controlling party", "Matching tool vs intermediary - read terms", "Usually none"],
      ],
    },
    {
      kind: "callout",
      caption: "What 'free' means on TranZfort (current product rule)",
      source: "Product confirmation 18 Nov 2026. Live legal hub: https://tranzfort.com/legal/. Terms can change - re-check before commercial reliance.",
      items: [
        {
          title: "Free for truckers and transporters",
          body: "Marketplace matching - find loads, post loads, chat, and call - is free for truckers and transporters.",
          tone: "teal",
        },
        {
          title: "Paid path: TMS",
          body: "Charges apply when a transporter uses ZAFTYS TMS services for enterprise gate-to-pay control - not as a cut of the negotiated trip freight on open matching.",
          tone: "navy",
        },
        {
          title: "Legal documents",
          body: "Privacy Policy and Terms of Service live under https://tranzfort.com/legal/ (also linked from in-app Settings → Legal).",
          tone: "warm",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Hypothetical ZAFTYS Intelligence freight-cost scenario",
      source:
        "Assumptions for demonstrating calculation only - not measured market savings and not a real customer transaction. Matched route, cargo, vehicle, service, and payment terms are required before any comparison claim.",
      items: [
        {
          title: "Scenario numbers",
          body: "Illustrative operating-cost floor Rs 54,000; illustrative brokered freight invoice Rs 62,000; illustrative alternative freight invoice Rs 55,800; invoice difference Rs 6,200; proportion of Rs 62,000 = 10%.",
          tone: "navy",
        },
        {
          title: "What this does not prove",
          body: "It does not prove Rs 54,000 is a real trip's operating cost, or that the alternative invoices are commercially comparable without matched assumptions.",
          tone: "warm",
        },
        {
          title: "Broker commission context",
          body: "Separately, BlackBuck's Nov 2024 RHP cites an estimated 8-10% offline broker commission range - an industry estimate, not this scenario's measured spread.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "table",
      caption: "Editable trip-cost breakdown framework (no invented component amounts)",
      source:
        "Fill only from source documents. Leave cells blank rather than inventing rupees. Sum of filled components still may not equal a commercial 'floor' if fixed costs or profit are excluded.",
      headers: ["Cost component", "Your amount (Rs)", "Source / notes"],
      rows: [
        ["Fuel / diesel", "", "Litres x pump price; date the receipt"],
        ["Tolls", "", "Plaza receipts or FASTag statement"],
        ["Driver expenses / allowance", "", "Trip sheet or MSA schedule"],
        ["Loading / unloading", "", "Labour, equipment, or detention-linked charges"],
        ["Empty running (khali phera)", "", "Empty km x cost basis you define"],
        ["Maintenance / wear allocation", "", "Only if your policy allocates trip share"],
        ["Waiting / detention time", "", "Clock events and free-time rules"],
        ["Other (specify)", "", "Insurance trip share, parking, etc. - name it"],
        ["Illustrative scenario floor (reference only)", "54,000", "Hypothetical teaching number - replace with your sum"],
      ],
    },
  ],

  "How digital load matching works: direct in-app discovery and negotiation": [
    {
      kind: "imageGrid",
      caption: "TranZfort walkthrough (1/2) - find and open a load",
      source:
        "Current Android production screenshots (masked test account). Rates, routes, and earnings figures are example UI values - not binding quotes. Captured for this guide 18-19 Nov 2026.",
      columns: 2,
      items: [
        {
          src: "/images/blog/tranzfort-walkthrough/01-trucker-home-find.png",
          alt: "TranZfort Android trucker dashboard with Find loads button and origin destination city fields",
          caption: "1. Trucker home / Find Loads",
        },
        {
          src: "/images/blog/tranzfort-walkthrough/02-supplier-home-post-load.jpeg",
          alt: "TranZfort Android supplier home with Post Load button and recent loads list",
          caption: "2. Supplier home - Post Load",
        },
        {
          src: "/images/blog/tranzfort-walkthrough/03-find-loads-list.jpg",
          alt: "TranZfort Find Loads list with Mumbai to Noida steel coils card showing rate tags Call View details and Chat",
          caption: "3. Find Loads list - route, rate, tags",
        },
        {
          src: "/images/blog/tranzfort-walkthrough/04-load-detail.jpg",
          alt: "TranZfort Load Detail earnings estimate with fare expense diesel toll breakdown and Book This Load CTA",
          caption: "4. Load detail - estimate & book",
        },
      ],
    },
    {
      kind: "imageGrid",
      caption: "TranZfort walkthrough (2/2) - post, chat, and legal",
      source:
        "Current Android production screenshots and live legal page. Personal identity remains on the counterparty profile the user already sees in-app. Legal hub: https://tranzfort.com/legal/.",
      columns: 2,
      items: [
        {
          src: "/images/blog/tranzfort-walkthrough/07-create-supplier-load.jpg",
          alt: "TranZfort create supplier load form with Hazira to Nagpur route distance estimate and coal cargo field",
          caption: "5. Create supplier load",
        },
        {
          src: "/images/blog/tranzfort-walkthrough/06-in-app-chat.png",
          alt: "TranZfort in-app chat negotiating per-ton rate on an active Mangaluru to Ahmedabad load",
          caption: "6. In-app chat - negotiate rate",
        },
        {
          src: "/images/blog/tranzfort-walkthrough/08-settings-legal.jpg",
          alt: "TranZfort Settings screen showing Privacy Policy Terms of Service and support email entries",
          caption: "7. Settings - Legal links",
        },
        {
          src: "/images/blog/tranzfort-walkthrough/09-privacy-policy-web.jpg",
          alt: "TranZfort Privacy Policy web page on tranzfort.com showing last updated date and table of contents",
          caption: "8. Live legal hub (web)",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Commercial terms - what to verify before agreeing",
      source: "Product confirmation 18 Nov 2026. Re-check https://tranzfort.com/legal/ before commercial reliance.",
      items: [
        {
          title: "Download",
          body: "Play Store: play.google.com/store/apps/details?id=com.tranzfort.app · Overview: /network/tranzfort",
          tone: "teal",
        },
        {
          title: "Fees",
          body: "Free for truckers and transporters on marketplace matching. Paid path is ZAFTYS TMS for transporters who need enterprise TMS services.",
          tone: "navy",
        },
        {
          title: "Still verify offline",
          body: "RC, fitness, driver licence, cargo suitability, tax path, and plant gate controls remain the user's responsibility. Chat does not replace gate checks.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Anatomy of a high-converting load post",
      source: "Desk checklist for factory dispatchers and indie suppliers.",
      items: [
        {
          title: "Pins and window",
          body: "Origin and destination industrial pin codes plus expected loading date and time.",
        },
        {
          title: "Body and payload",
          body: "Open, container, flatbed, or bulker - plus net payload tonnes, not only GVW.",
        },
        {
          title: "Commodity truth",
          body: "What is on the truck (steel billets, bagged cement, FMCG cartons) so truckers self-select.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "In-app chat vs opaque phone bidding",
      source: "Operating preference for open marketplaces.",
      items: [
        {
          title: "Open negotiation wins",
          body: "Truckers adjust bids when they already hold a return load. Fixed algorithm prices miss that local knowledge.",
          tone: "teal",
        },
        {
          title: "Voice and vernacular",
          body: "Audio read-aloud and simple mobile-first screens close the digital divide with commercial drivers.",
          tone: "navy",
        },
      ],
    },
  ],

  "Document verification and trust architecture: vetting before loading": [
    {
      kind: "steps",
      caption: "Four-layer digital verification protocol",
      source: "Gate SOP orientation. Confirm Vahan / Sarathi live responses on the day.",
      items: [
        {
          title: "Commercial vehicle RC",
          body: "Chassis, engine, unladen tare, and gross vehicle weight against the registration.",
        },
        {
          title: "Driver identity and licence",
          body: "Commercial HGMV / HMV validity and Hazchem endorsements when cargo needs them.",
        },
        {
          title: "Business identity",
          body: "Transporter or supplier PAN, GSTIN, and trade name match.",
        },
        {
          title: "Profile and trip history",
          body: "In-app rating scorecards from verified completed deliveries - not WhatsApp screenshots.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Bogus truck risk you are buying without checks",
      source: "Fraud pattern briefing. Not a crime-incidence index.",
      items: [
        {
          title: "Paper lies",
          body: "Stolen chassis numbers, fake RC PDFs, cloned plates, and non-existent fleet owners still move on informal groups.",
          tone: "warm",
        },
        {
          title: "Desk rule",
          body: "No Vahan / DL / PAN pass, no gate-in. Photo of an RC is not verification.",
          tone: "navy",
        },
      ],
    },
  ],

  "In-transit operations: digital milestones, photo proofs, and paperwork": [
    {
      kind: "timeline",
      caption: "Digital trip timeline (six milestones)",
      source: "Marketplace / TMS milestone pattern. Pair with plant gate SOPs.",
      items: [
        { phase: "01", title: "Gate-In", body: "Vehicle placement confirmed at origin." },
        { phase: "02", title: "Tare and loading", body: "Tare weight recorded; loading photo captured." },
        { phase: "03", title: "Gross + LR", body: "Weighbridge slip and consignment note / LR (bilty) photo on the timeline." },
        { phase: "04", title: "In-transit", body: "Highway progress without harassing the driver for check-calls." },
        { phase: "05", title: "Dest Gate-In", body: "Unloading window starts with photo proof." },
        { phase: "06", title: "Clean POD", body: "Stamped and signed delivery copy uploaded in-app." },
      ],
    },
    {
      kind: "callout",
      caption: "Why the driver call centre fails",
      source: "Highway safety and billing hygiene.",
      items: [
        {
          title: "Check-calls distract",
          body: "Manual status rings pull drivers off the road and still leave gaps between calls.",
          tone: "warm",
        },
        {
          title: "Photo POD speeds cash",
          body: "Immediate in-app LR / POD photos can cut billing dispute latency from ~45 days toward under 48 hours when finance trusts the file.",
          tone: "teal",
        },
      ],
    },
  ],

  "Worked financial case: 25-tonne industrial freight corridor": [
    {
      kind: "image",
      caption: "Unmasking the middleman markup (Raipur to Bhiwandi workshop)",
      source:
        "Hypothetical ZAFTYS Intelligence scenario waterfall: floor Rs 54,000; brokered invoice Rs 62,000; alternative invoice Rs 55,800 (difference Rs 6,200 = 10% of Rs 62,000). Not an audited trip file.",
      src: "/images/blog/load-marketplace-middleman-waterfall.png",
      alt: "Stepped waterfall from trucker operating floor Rs 54000 through placement and broker margins to traditional shipper invoice Rs 62000 beside direct free-match at Rs 55800",
    },
    {
      kind: "table",
      caption: "Hypothetical scenario ledger (labelled assumptions)",
      source:
        "ZAFTYS Intelligence teaching ledger only. Corridor class ~1,150 km / 25 T payload assumptions are illustrative. Do not treat as measured savings.",
      headers: ["Line", "Brokered invoice path (hyp.)", "Alternative invoice path (hyp.)", "Notes"],
      rows: [
        ["Illustrative shipper freight invoice", "Rs 62,000", "Rs 55,800", "Assumed invoices for arithmetic"],
        ["Illustrative operating-cost floor", "Rs 54,000", "Rs 54,000", "Same assumed floor on both paths"],
        ["Invoice difference vs Rs 62,000", "Rs 0 (baseline)", "Rs 6,200 (10% of Rs 62,000)", "Difference = 62000 - 55800"],
        ["Component rupee split", "Not invented here", "Not invented here", "Use the editable framework; leave blank without sources"],
        ["Comparability gate", "Must match", "Must match", "Route, cargo, vehicle, service, payment terms"],
      ],
    },
    {
      kind: "image",
      caption: "Net realized freight yield per tonne-km [CARRIER PROFITABILITY]",
      source: "Workshop PTKM after intermediary cuts. Recompute with your own diesel and EMI.",
      src: "/images/blog/load-marketplace-ptkm-yield.png",
      alt: "Formula board for net realized freight yield per tonne-km after eliminating intermediary cuts",
    },
    {
      kind: "callout",
      caption: "How to use this hypothetical scenario",
      source: "ZAFTYS Intelligence. Replace every assumption with live quotes before board or tender use.",
      items: [
        {
          title: "What the arithmetic shows",
          body: "Under matched assumptions, Rs 62,000 vs Rs 55,800 differs by Rs 6,200 (10% of Rs 62,000). That is illustration, not measured market savings.",
          tone: "teal",
        },
        {
          title: "What you must still match",
          body: "Same route, cargo, vehicle specification, service level, and payment terms - or the comparison is invalid.",
          tone: "warm",
        },
        {
          title: "Broker commission context",
          body: "BlackBuck Nov 2024 RHP cites an estimated 8-10% offline broker commission range as an industry estimate - not this scenario's audited spread.",
          tone: "navy",
        },
      ],
    },
  ],

  "Standard operating procedure: the 8-step direct load booking workflow": [
    {
      kind: "image",
      caption: "Eight-point direct digital freight lifecycle",
      source: "Operating sequence for manufacturing desks and indie suppliers on open marketplaces.",
      src: "/images/blog/load-marketplace-8-step-lifecycle.png",
      alt: "Process board with eight steps from define cargo and body through free load publication, in-app chat, Vahan audit, gate-in photos, advance, milestones, and clean POD settlement",
    },
    {
      kind: "steps",
      caption: "8-stage protocol (desk copy)",
      source: "Same sequence as the process board. Print for the dispatch wall.",
      items: [
        { title: "01 Define cargo and body", body: "Match net payload and body type to the commodity." },
        { title: "02 Free load publication", body: "Broadcast lane needs to verified truckers at zero post fee." },
        { title: "03 In-app chat negotiation", body: "Lock freight rate, advance terms, and loading window." },
        { title: "04 Vahan document audit", body: "Verify RC, insurance, and commercial DL before gate." },
        { title: "05 Gate-In photo proof", body: "Capture loading and seal photos on the trip timeline." },
        { title: "06 Advance disbursement", body: "Trigger contracted ~70% advance with digital LR." },
        { title: "07 Milestone tracking", body: "Watch highway progress without phone harassment." },
        { title: "08 Clean POD settlement", body: "Upload stamped delivery copy; pay balance fast." },
      ],
    },
  ],

  "Enterprise integration: connecting web TMS to open mobile marketplaces": [
    {
      kind: "tiles",
      caption: "Two-tier operating architecture",
      source: "ZAFTYS web TMS + TranZfort Android marketplace positioning for this guide.",
      items: [
        {
          title: "Tier 1 - ZAFTYS command centre",
          body: "Multi-seat web TMS for logistics heads, planners, and gate weigh operators. Dedicated contract fleets, ERP sync, e-Way Bill, ledgers.",
        },
        {
          title: "Tier 2 - TranZfort open capacity",
          body: "When contracts fail to place or season spikes, unfulfilled indents publish into the Android marketplace for direct truck matching.",
        },
        {
          title: "Unified control layer",
          body: "Open-market bookings feed back into the ZAFTYS dashboard for gate-to-pay settlement - one audit trail, two capacity sources.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Why plants cannot run only on driver apps",
      source: "Enterprise ops constraint.",
      items: [
        {
          title: "Multi-plant desks need seats",
          body: "Shift planners, weighbridge clerks, and finance need shared web workflows - not one phone per plant.",
          tone: "navy",
        },
        {
          title: "Hybrid is the point",
          body: "Keep dedicated fleets contracted. Label marketplace overflow. See also [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india).",
          tone: "teal",
        },
      ],
    },
  ],

  "The 20-point freight marketplace readiness audit and FAQs": [
    {
      kind: "table",
      variant: "scorecard",
      caption: "20-point freight marketplace and digital trucking readiness audit (rate 1 to 5; skip = 0)",
      source: "Coaching matrix for shippers and fleet owners. Not a certification product.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Sourcing", "Can the desk post an FTL indent without calling a freight-market broker (mandi dalal)?", ""],
        ["2", "Sourcing", "Are origin / destination pins and body type mandatory on every load post?", ""],
        ["3", "Sourcing", "Is return-load visibility available to truckers before they bid outbound?", ""],
        ["4", "Sourcing", "Are WhatsApp-only bookings banned for high-value industrial cargo?", ""],
        ["5", "Sourcing", "Can overflow from dedicated contracts publish to an open marketplace in one click?", ""],
        ["6", "Docs", "Is commercial RC checked on Vahan before gate-in?", ""],
        ["7", "Docs", "Is driver commercial DL (HGMV / HMV) verified the same day?", ""],
        ["8", "Docs", "Are supplier / transporter PAN and GSTIN on file?", ""],
        ["9", "Docs", "Does the desk refuse cloned-plate or screenshot-only RC packs?", ""],
        ["10", "Docs", "Is trip history / rating reviewed before first load with a new trucker?", ""],
        ["11", "Visibility", "Are Gate-In, Loading, LR, In-Transit, Unload, POD milestones in one timeline?", ""],
        ["12", "Visibility", "Are LR and POD photos captured in-app (not only WhatsApp albums)?", ""],
        ["13", "Visibility", "Has the desk stopped routine highway check-call harassment?", ""],
        ["14", "Visibility", "Does e-Way Bill Part B update when the vehicle actually moves?", ""],
        ["15", "Visibility", "Can plant and finance see the same trip status without a phone chain?", ""],
        ["16", "Finance", "Is ~70% advance contractually timed to loading / LR upload?", ""],
        ["17", "Finance", "Does clean POD unlock balance settlement inside 48 hours when proofs are clean?", ""],
        ["18", "Finance", "Are broker / platform fees line-itemed (or proven zero) on every trip?", ""],
        ["19", "Finance", "Is GTA / RCM GST ownership clear on marketplace vs contract trips?", ""],
        ["20", "Finance", "Do marketplace trips post into the enterprise TMS ledger for audit?", ""],
      ],
    },
  ],
};
