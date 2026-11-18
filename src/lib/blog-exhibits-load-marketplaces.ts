/** Deep-research exhibits: online truck load marketplaces India.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * English first; Hindi plant terms only in brackets when needed.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const loadMarketplaceKpis: readonly BlogKpi[] = [
  {
    value: "Multi-tier*",
    label: "Brokerage stack (dalali)",
    detail:
      "*Hypothetical teaching band only - not a national audit index. Some corridors show booking commission, placement fees, and diesel-slip kickbacks that can consume a material share of the shipper-to-driver gap. Measure your lane before quoting a percentage.",
  },
  {
    value: "Define dwell",
    label: "Return-load idle time",
    detail:
      "Return-load dwell = clock time from empty after unload until the next paid load is accepted. Do not confuse with transit time or plant detention. Workshop examples often use 48-72 hour Nagar waits - lane-specific, not a national average.",
  },
  {
    value: "Like-for-like",
    label: "Quote comparison rule",
    detail:
      "Compare only matched vehicle capacity, route, cargo, service level, transit time, and included costs. A lower sticker rate is not automatically a saving.",
  },
  {
    value: "Rs 54k maths*",
    label: "Hypothetical corridor floor",
    detail:
      "*Raipur to Bhiwandi teaching arithmetic only - truck operating floor near Rs 54,000. Not an audited ZAFTYS trip file or national rate card.",
  },
  {
    value: "100%",
    label: "In-app trip traceability",
    detail:
      "Digital milestones - Gate-In, Loading, LR upload, In-Transit, Unloading, Clean POD - replace manual telephone check-calls when the desk runs on a marketplace timeline.",
  },
  {
    value: "Zero",
    label: "Freight commission cut",
    detail:
      "TranZfort open marketplace: suppliers post loads free; truckers find loads free; rate is negotiated direct with no platform freight markup. Other platforms may price differently - compare product features, not slogans.",
  },
] as const;

export const loadMarketplaceTakeaways = [
  "Transport Nagar brokerage commission (dalali) is a multi-tier stack - booking commission, placement fees, and diesel-slip kickbacks. Treat any 8% to 15% figure as a workshop assumption until your corridor is measured.",
  "Closed aggregators can recreate intermediation online as a hidden spread; open zero-commission marketplaces (TranZfort) let parties negotiate the trip rate with no platform freight cut. Do not cite competitor prospectus numbers without the exact passage.",
  "Hypothetical Raipur to Bhiwandi maths: a Rs 54,000 truck floor can become a Rs 62,000 shipper invoice under brokerage, versus a direct match near Rs 55,800 - only valid as teaching arithmetic for matched assumptions.",
  "High-converting load posts need industrial pin codes, body type, net payload, commodity, loading window, and advance terms - vague WhatsApp forwards waste bidding cycles and invite ghost trucks.",
  "Four trust layers before gate-in: Vahan RC (chassis, tare, GVW), commercial DL, PAN / GSTIN business identity, and verified trip history - a JPEG of an RC is not verification.",
  "Enterprises keep dedicated fleets on ZAFTYS web TMS for gate-to-pay control and publish only labeled overflow into TranZfort when contracts cannot place or season volume spikes.",
] as const;

export const loadMarketplaceReferences = [
  "[Carriage by Road Act, 2007](https://www.indiacode.nic.in/handle/123456789/2043?locale=en) and Carriage by Road Rules, 2011 - common carrier definition and goods receipt framing. Cite the specific section that supports each claim.",
  "[Information Technology Act, 2000](https://www.indiacode.nic.in/handle/123456789/1999?locale=en) - legal validity of electronic records, in-app contracts, and digital signatures (orientation; counsel owns litigation strategy).",
  "[Central Motor Vehicles Rules (CMVR), 1989](https://www.indiacode.nic.in/handle/123456789/1798?locale=en) - Rules 9 and 138A framing for electronic transport documentation. Confirm bare text before a legal memo.",
  "[CGST Act, 2017](https://www.indiacode.nic.in/handle/123456789/11537?locale=en) / Rules - Rule 138 e-Way Bill Part B updates when the vehicle moves. GTA tax detail: [GST on GTA guide](/blog/gst-on-gta-rcm-forward-charge-consignment-note-rules-guide).",
  "Methodology: corridor economics, brokerage percentages, and dwell bands in this guide are hypothetical teaching maths unless a documented lane sample is cited. Competitor commission claims are omitted unless an exact primary-source passage is located.",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort).",
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
          body: "Traditional stacks can be opaque; open zero-commission rails negotiate trip rates direct. Treat percentage leakage bands as workshop assumptions until measured.",
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
          title: "Open zero-commission marketplaces",
          body: "TranZfort model: free load posts, free truck search, in-app chat, direct rate. No platform cut on freight.",
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
      caption: "What 'free' and 'zero commission' mean on TranZfort",
      source: "Product orientation. Confirm current app terms before commercial reliance - terms can change.",
      items: [
        {
          title: "Zero commission on freight",
          body: "No platform cut of the negotiated trip freight for the described open matching use.",
          tone: "teal",
        },
        {
          title: "Free posting / search",
          body: "Load posts and truck search are positioned as free for eligible users. Enterprise TMS seats and optional services can be paid separately.",
          tone: "navy",
        },
        {
          title: "Still verify offline",
          body: "Identity, vehicle suitability, tax path, and plant gate controls remain the user's responsibility.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Raipur to Bhiwandi teaching proof (1,200 km class, 25 T)",
      source: "Teaching ledger only. Not a ZAFTYS audited trip file. Rs 54,000 floor is not component-broken here because no audited trip file supports a line-item split.",
      items: [
        {
          title: "Truck operating floor",
          body: "Rs 54,000 assumed direct operating need for the asset owner under teaching inputs.",
          tone: "navy",
        },
        {
          title: "After brokerage stack",
          body: "Primary +Rs 4,500, sub-broker +Rs 2,000, advance discounting -Rs 1,500 on the driver side. Shipper invoice lands near Rs 62,000.",
          tone: "warm",
        },
        {
          title: "Who loses",
          body: "Trucker underpaid about Rs 3,500. Shipper overpays about Rs 8,000 on the same truck.",
          tone: "teal",
        },
      ],
    },
  ],

  "How digital load matching works: direct in-app discovery and negotiation": [
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
        "Teaching waterfall: truck floor Rs 54,000 to traditional landed Rs 62,000 vs direct match Rs 55,800. Not a ZAFTYS audited trip file.",
      src: "/images/blog/load-marketplace-middleman-waterfall.png",
      alt: "Stepped waterfall from trucker operating floor Rs 54000 through placement and broker margins to traditional shipper invoice Rs 62000 beside direct zero-commission match at Rs 55800",
    },
    {
      kind: "table",
      caption: "Line-item reconciliation: 25 MT structural steel / billets",
      source: "Corridor ~1,150 km. 12-wheeler, 35 T GVW, 25 T net legal payload. Workshop teaching ledger.",
      headers: ["Line", "Model A Mandi (hyp.)", "Model B closed landed-rate (hyp.)", "Model C open zero-commission (hyp.)"],
      rows: [
        ["Shipper base freight", "Rs 62,000", "Rs 58,800", "Rs 55,800"],
        ["Broker / platform take", "~Rs 8,000 stack", "~Rs 2,940 (5%)", "Rs 0"],
        ["Net to truck owner (workshop)", "~Rs 54,000", "~Rs 55,860", "~Rs 55,800"],
        ["Cash advance at loading", "65% - 70%", "65% - 70%", "Contracted ~70%"],
        ["Return dwell (measure; do not average without data)", "Variable - define start/end events", "Variable", "Variable - faster discovery is the claim to test"],
        ["Shipper vs direct", "+Rs 6,200", "+Rs 3,000", "Baseline"],
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
      caption: "Workshop finding on this corridor",
      source: "Teaching result. Confirm with your live quotes.",
      items: [
        {
          title: "Manufacturer",
          body: "Direct zero-commission matching saves about Rs 6,200 per trip vs traditional freight-market (mandi) landed.",
          tone: "teal",
        },
        {
          title: "Truck owner",
          body: "About Rs 1,800 to Rs 3,800 more net revenue lands with the asset owner once brokerage commission (dalali) and opaque advances shrink - model dependent.",
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
