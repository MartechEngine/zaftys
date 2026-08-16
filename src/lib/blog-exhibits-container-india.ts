import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const containerIndiaKpis: readonly BlogKpi[] = [
  {
    value: "192.9M",
    label: "Global ocean TEUs / year",
    detail: "About 192.9 million twenty-foot equivalent units (TEUs) of ocean container trade (CTS / IMO framing). One TEU equals one 20ft container unit.",
  },
  {
    value: "12.28M",
    label: "India port TEUs / year",
    detail: "About 12.28 million TEUs handled at Indian ports in recent MoPSW (Ministry of Ports, Shipping and Waterways) framing.",
  },
  {
    value: "7.94M",
    label: "JNPA TEUs (CY2025)",
    detail: "Jawaharlal Nehru Port Authority (JNPA / Nhava Sheva) handled about 7.94 million TEUs in calendar year 2025 framing.",
  },
  {
    value: "66%",
    label: "Hinterland moves by road",
    detail: "About 66% of hinterland container moves by road (NITI Aayog order of magnitude). Hinterland means port to inland plant / depot.",
  },
  {
    value: "30-35%",
    label: "Empty truck kilometres",
    detail: "About 30% to 35% of commercial truck kilometres run empty nationally (NITI framing). Not the same as empty ocean containers.",
  },
  {
    value: "65-70%",
    label: "JNPA + Mundra EXIM share",
    detail: "Illustrative share of India's export-import (EXIM) container volume concentrated at JNPA and Mundra together.",
  },
] as const;

export const containerIndiaTakeaways = [
  "Ocean chokepoints change empty-box availability at inland container depots (ICDs), stretch exporter days sales outstanding (DSO), and spike ocean spot rates before the delay shows at a plant gate.",
  "At JNPT and Mundra, road trailer and driver availability is a first-class EXIM risk: yards can fill even when berths are fine. Separate ocean-box scarcity from inland-empty scarcity from trailer scarcity.",
  "Return loads decide trucker survival: an empty hinterland leg still burns diesel, driver, and capital with zero revenue. Brokers and small fleets clear most matches today; digital networks widen the search when body type and free time fit.",
  "Hybrid capacity wins western peaks: base load on empaneled trailers, same-week overflow via TranZfort when vessel, rake, or CFS spikes hit. Listing and search are free; a broker fee applies on booked loads.",
] as const;

export const containerIndiaReferences = [
  "Container Trades Statistics (CTS) and International Maritime Organization (IMO): global ocean container volume framing in twenty-foot equivalent units (TEUs).",
  "Alphaliner: active containership fleet capacity order of magnitude (TEU slots on vessels).",
  "Ministry of Ports, Shipping and Waterways (MoPSW): Indian port container throughput in TEUs.",
  "Jawaharlal Nehru Port Authority (JNPA): annual container handling performance and public advisories on import evacuation when trailer or driver placement thins (confirm current releases).",
  "Trade press on JNPA-area trailer and driver shortages, CFS evacuation, green-channel moves, and temporary ground-rent relief patterns (2026). Use as market framing, not as a ZAFTYS case study.",
  "Public Mundra gateway reporting on throughput scale and multimodal rail or road hinterland connectivity into Northwest and NCR nodes. Cite as market context.",
  "NITI Aayog and Rocky Mountain Institute (RMI): Fast-Tracking Freight / Goods on the Move framing for modal share, empty running, and dispatch productivity.",
  "TERI / Smart Freight Centre-style clean freight notes: empty running often cited in a 30% to 40% band in some segments; many operators still do not systematically track empty trips.",
  "Redseer Strategy Consultants (2024): Indian trucking fragmentation (majority of operators with fewer than five trucks), idle wait for loads, utilisation days per month, and early-stage digital freight penetration. Third-party framing, not ZAFTYS audited.",
  "IIMA overview of the Indian trucking sector: roles of trucking companies, brokers / agents, and pure truck owners.",
  "Industry notes on broker commission bands and mandi-style placement (e.g. National Freight Index commentary). Directional only.",
  "Public industry commentary on container street-turn / reuse (import empty matched to export stuffing with shipping-line approval). Adjacent to trailer load matching; not a ZAFTYS product claim.",
  "Ministry of Road Transport and Highways (MoRTH): Gazette notifications on axle load / gross vehicle weight (GVW) (S.O. 3467(E), S.O. 4353(E)). Confirm current text.",
  "NICDC Logistics Data Services (NLDS) / Logistics Data Bank (LDB): radio-frequency identification (RFID) container milestone coverage across ports, inland container depots (ICDs), and container freight stations (CFSs).",
  "CRISIL Research: commercial vehicle and freight cost sensitivity to diesel (directional; INR road freight).",
  "Third-party market sizing (e.g. Mordor Intelligence, Market Research Future): US dollar (USD) market-size estimates only, not ZAFTYS audited total addressable market (TAM).",
  "ZAFTYS TMS operational analytics: aggregated trip, yard, weighbridge, and settlement metrics on industrial and EXIM corridors, 2024 to 2026. Directional and corridor-specific; not a national census.",
  "TranZfort marketplace analytics: aggregated listing, match, and booked-load patterns on verified capacity, 2024 to 2026. Listing and search are free; a broker fee applies on booked loads. Directional only; not a published fill-rate guarantee.",
  "ZAFTYS corridor operations logs: own-fleet and contracted hinterland container runs used for teaching corridor math and chassis practice, 2024 to 2026. Directional and corridor-specific.",
] as const;

export const containerIndiaExhibits: Record<string, readonly BlogExhibit[]> = {
  "How to read the numbers in this guide": [
    {
      kind: "tiles",
      caption: "Units used throughout this dossier",
      source: "Read this strip once. Later tables reuse the same units without repeating every expansion.",
      items: [
        {
          title: "TEU (container count)",
          body: "Twenty-foot equivalent unit. One TEU equals one standard 20ft container. A 40ft box counts as about 2 TEUs. Port and ocean figures in this guide are container throughput or vessel slots, not rupees.",
        },
        {
          title: "USD (ocean freight money)",
          body: "United States dollars. Ocean spot and surcharge bands here are USD per container (per 20ft or per 40ft / 40ft high cube as labelled), not per tonne.",
        },
        {
          title: "INR / ₹ (road freight money)",
          body: "Indian rupees. Domestic truck examples such as ₹2,400 or ₹3,900 are per tonne of cargo on an illustrative corridor, not per container and not US dollars.",
        },
        {
          title: "Tonnes and GVW (weight)",
          body: "Legal payload and gross vehicle weight (GVW) are in metric tonnes. MoRTH sets the maximum legal GVW by axle and tyre layout.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Short forms expanded on first use",
      source: "Keep this table handy while reading chapters below.",
      headers: ["Short form", "Full form", "What it means here"],
      rows: [
        ["TEU", "Twenty-foot equivalent unit", "Standard count of container volume"],
        ["EXIM", "Export-import", "International trade moves via Indian ports"],
        ["JNPA / JNPT", "Jawaharlal Nehru Port Authority / Trust", "Nhava Sheva, Mumbai region gateway"],
        ["ICD", "Inland container depot", "Inland rail/road depot for boxes"],
        ["CFS", "Container freight station", "Stuffing / de-stuffing station near port or ICD"],
        ["GVW", "Gross vehicle weight", "Legal max weight of truck + load"],
        ["HQ", "High cube", "Taller 40ft container (more cubic volume)"],
        ["SXL / MXL", "Single-axle / multi-axle", "32ft domestic rigid body layouts"],
        ["ULIP", "Unified Logistics Interface Platform", "Govt API gateway for logistics data"],
        ["LDB / NLDS", "Logistics Data Bank / NICDC LDS", "RFID milestone tracking for EXIM boxes"],
        ["ICEGATE", "Indian Customs EDI Gateway", "Customs electronic filing and gate hygiene"],
        ["DSO", "Days sales outstanding", "How long exporters wait to get paid"],
        ["TMS", "Transport management system", "Dispatch, documents, and visibility software"],
        ["ePOD", "Electronic proof of delivery", "Digital delivery evidence for billing"],
        ["TAT", "Turnaround time", "Time for a truck to enter, load/unload, and exit"],
      ],
    },
  ],
  "The macro storm and the Indian hinterland": [
    {
      kind: "callout",
      caption: "Two chokepoints, one inland equipment problem",
      source:
        "Operational synthesis of public Red Sea / Cape rerouting and Panama draught reporting. Ranges are directional; confirm current carrier circulars before contracting.",
      items: [
        {
          title: "Red Sea / Suez crisis",
          body: "Suez Canal transit volumes fell sharply. Asia-Europe and related legs reroute via the Cape of Good Hope, adding about 3,500 to 4,000 nautical miles and 10 to 14 extra transit days per sailing. Longer routes absorb roughly 5% to 7% of global vessel capacity (about 1.3 million to 1.8 million TEU slots on ships, not Indian port handlings).",
          tone: "navy",
        },
        {
          title: "Panama Canal draught limits",
          body: "Low Gatun Lake levels capped daily ship transits. Slot auctions reportedly peaked near USD 4.0 million per ship (money paid to jump the queue). Carriers added Panama Canal surcharges often cited at USD 300 to USD 800 per 40ft high-cube container on India to US East Coast / Gulf lanes.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Four direct hits on Indian exporters and MSMEs",
      source:
        "ZAFTYS corridor operations logs and public trade patterns. Not a rupee loss model. MSME means micro, small and medium enterprise.",
      items: [
        {
          title: "Capacity squeeze at sea",
          body: "Longer African routes lock vessel TEU slots that never touch Indian ports, yet still tighten empty-box availability inland.",
        },
        {
          title: "ICD empty starvation",
          body: "Lines reposition empty containers to higher-yield lanes. North and Central inland container depots (Tughlakabad, Dadri, Ludhiana, Ahmedabad) feel dry 20ft and high-cube shortages first.",
        },
        {
          title: "Working capital freeze",
          body: "Extra 14 to 21 days at sea stretches Bill of Lading timelines and exporter days sales outstanding (DSO), especially for MSMEs on tight credit lines.",
        },
        {
          title: "Ocean rate spikes",
          body: "India-Europe and related ocean spot rates (USD per container) jumped multiples over pre-disruption baselines during peak stress windows.",
        },
      ],
    },
    {
      kind: "bars",
      caption: "Illustrative Asia-Europe transit days (port pair framing)",
      source:
        "Directional sailing-time bands for JNPA or Mundra to North Europe under normal Suez routing versus Cape of Good Hope stress. Days are voyage time, not rupees or TEU counts.",
      unit: "days",
      items: [
        { label: "Pre-disruption (Suez path)", value: 24 },
        { label: "Stressed Cape routing", value: 42 },
      ],
    },
  ],
  "Corridor rate bands under disruption": [
    {
      kind: "table",
      caption: "Illustrative ocean spot rates in USD per container (not per tonne)",
      source:
        "Directional corridor bands from public logistics reporting during peak disruption windows. Figures are United States dollars (USD) charged per box size shown. Not a live rate sheet. Confirm with your forwarder before budgeting.",
      headers: ["Corridor", "Pre-disruption (USD / box)", "Peak disruption (USD / box)"],
      rows: [
        ["India to Western Europe / UK", "USD 700 to 800 per 40ft", "USD 3,500 to 4,200 per 40ft"],
        ["India to US East Coast", "USD 1,700 to 1,900 per 40ft", "USD 4,100 to 5,200 per 40ft"],
        ["India to Middle East / Gulf", "USD 250 to 300 per 20ft", "USD 1,200 to 1,500 per 20ft"],
        ["Shortage emergency peaks", "Contract baselines", "USD 9,000 to 12,000 per 40ft (rare peaks)"],
      ],
    },
    {
      kind: "bars",
      caption: "India to Western Europe / UK: illustrative spot midpoints (USD per 40ft)",
      source: "Midpoints of the directional bands above for visual comparison only. Not a booking quote.",
      unit: "USD / 40ft",
      items: [
        { label: "Pre-disruption midpoint", value: 750 },
        { label: "Peak disruption midpoint", value: 3850 },
      ],
    },
  ],
  "Three scarcities": [
    {
      kind: "tiles",
      caption: "Three scarcities: do not buy the wrong fix",
      source:
        "Teaching model for western Indian EXIM. Mixing these three failures into one 'container shortage' produces the wrong purchase order.",
      items: [
        {
          title: "Ocean box scarcity",
          body: "No suitable dry or 40ft high-cube box on the vessel or at the port pool. Lever sits with carriers and reposition programmes. Marketplace trailers cannot invent ocean equipment.",
        },
        {
          title: "Inland empty at ICD",
          body: "Boxes exist at the coast but not at the inland stuffing point. Lever is rail or road empty reposition and ICD inventory discipline.",
        },
        {
          title: "Road trailer or driver scarcity",
          body: "The box cannot leave the terminal or CFS because pullers or drivers are missing. Yards fill and detention clocks start even when berths are fine. Lever is surge trailer pools and trip productivity.",
        },
        {
          title: "Why the split matters",
          body: "ZAFTYS-relevant leverage is strongest on trailer surge and empty-km matching. Do not pretend road capacity fixes a missing high cube on the next sailing.",
        },
      ],
    },
  ],
  "Market analytics and modal split": [
    {
      kind: "donut",
      caption: "Illustrative western gateway share of India EXIM containers",
      source:
        "Teaching split: JNPA and Mundra together often cited near 65% to 70% of Indian export-import container volume. Remainder is other major and non-major ports. Not a ZAFTYS audited share.",
      slices: [
        { label: "JNPA + Mundra (combined)", value: 68, color: zaftysViz.navy },
        { label: "Other Indian ports", value: 32, color: zaftysViz.primaryBright },
      ],
    },
    {
      kind: "stacked",
      caption: "National freight modal share by tonne-km (order of magnitude)",
      source:
        "NITI Aayog / RMI Fast-Tracking Freight framing for how freight moves across India (road vs rail vs water), not a TEU count. Coastal / inland waterways transport (IWT) is the small water slice. Not a ZAFTYS operating KPI.",
      items: [
        { label: "Road", value: 71, color: zaftysViz.navy },
        { label: "Rail", value: 24, color: zaftysViz.primaryBright },
        { label: "Coastal / IWT", value: 5, color: zaftysViz.teal },
      ],
    },
    {
      kind: "bars",
      caption: "Major Indian container gateways (million TEUs of port throughput)",
      source:
        "Port authority and MoPSW framing. Values are millions of TEUs handled (container units), not US dollars. Mundra shown as capacity / reported scale; other combined rows are illustrative groupings for hinterland planning.",
      unit: "M TEU",
      items: [
        { label: "JNPA (CY2025)", value: 7.94 },
        { label: "Mundra (capacity scale)", value: 7.5 },
        { label: "Chennai + Kattupalli", value: 2.3 },
        { label: "Hazira + Pipavav", value: 1.8 },
        { label: "Vizag + Kolkata/Haldia", value: 1.6 },
        { label: "Vallarpadam ICTT", value: 0.85 },
      ],
    },
  ],
  "Gateway hinterlands": [
    {
      kind: "table",
      caption: "Gateway ports: TEU throughput and hinterland corridors served",
      source: "Operational hinterland map for planning. Throughput is container units (TEUs), not money. Order-of-magnitude framing from public port data.",
      headers: ["Gateway", "Throughput (TEUs)", "Hinterland corridors"],
      rows: [
        ["JNPA (Nhava Sheva)", "About 7.94 million TEUs (CY2025)", "Maharashtra, Madhya Pradesh, NCR, Gujarat, Rajasthan"],
        ["Mundra (APSEZ / Adani)", "About 7.50 million+ TEU scale", "NCR, Ludhiana, Rajasthan, Gujarat, Haryana"],
        ["Chennai + Kattupalli", "About 2.30 million TEUs combined", "Tamil Nadu auto belt, Bengaluru, Telangana"],
        ["Hazira + Pipavav", "About 1.80 million TEUs combined", "Gujarat industrial belt, North-West"],
        ["Vizag + Kolkata/Haldia", "About 1.60 million TEUs combined", "Odisha, Jharkhand, West Bengal, Nepal/Bhutan cross-border"],
        ["Vallarpadam ICTT (Cochin)", "About 0.85 million TEUs", "Kerala, South Karnataka, international transshipment"],
      ],
    },
    {
      kind: "ranges",
      caption: "Third-party market size estimates in USD (not ZAFTYS TAM; not TEU counts)",
      source:
        "External research estimates of industry revenue in United States dollars. These are money estimates, not container counts. Do not paste into a board pack as ZAFTYS audited market size.",
      items: [
        {
          label: "Indian container logistics (third-party USD)",
          detail:
            "Public research cites growth from roughly USD 18 billion toward the high-20s USD billion over multi-year horizons. Treat as estimate bands, not ZAFTYS audited total addressable market (TAM).",
        },
        {
          label: "National commercial trucking (third-party USD)",
          detail:
            "External reports often place Indian commercial trucking in a USD 165 billion to USD 180 billion revenue band. Containerized full truckload (FTL) is a fast-growing slice inside that wider market.",
        },
      ],
    },
    {
      kind: "flow",
      caption: "When rail takes the long haul, trucking peaks move",
      source:
        "Western gateways increasingly push rail into Northwest and NCR inland nodes. Trucking does not disappear; peaks shift to terminal gates, CFS cycles, inland last mile, and empty returns.",
      items: [
        {
          title: "Vessel and terminal",
          body: "Box lands at JNPT or Mundra. Delivery order and customs hygiene decide when a trailer can be called.",
        },
        {
          title: "Rail or road choice",
          body: "Long inland haul may ride a rake to an inland terminal or ICD. Short coastal and plant moves stay on road.",
        },
        {
          title: "Inland node and plant",
          body: "Last mile to plant or destuff still needs a container trailer, weighbridge discipline, and slot windows.",
        },
        {
          title: "Empty cycle",
          body: "Empty returns to yard, ICD, or export stuffing point. Trailer scarcity here looks like equipment scarcity to the exporter.",
        },
      ],
    },
  ],
  "Western gateway trailer surge at JNPT and Mundra": [
    {
      kind: "callout",
      caption: "Base load versus surge load (western gateways)",
      source:
        "Teaching model informed by ZAFTYS corridor operations logs and TranZfort marketplace analytics on western EXIM peaks. Not a measured share of any one terminal's trips.",
      items: [
        {
          title: "Base load",
          body: "Repeating weekly EXIM moves with a known body mix and SLA windows. Covered best by empaneled or contract trailers that know the gate ecosystem.",
          tone: "navy",
        },
        {
          title: "Surge load",
          body: "Same-week spikes from vessel bunching, rake discharge, CFS backlog clearance, or empty reposition orders. Covered by overflow capacity so you do not park idle chassis for rare peaks.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Four surge triggers on western corridors",
      source: "Pattern synthesis from public gateway stress episodes and ZAFTYS corridor operations logs. Confirm live conditions with your terminal and CFS partners.",
      items: [
        {
          title: "Vessel bunching",
          body: "Schedule recovery stacks arrivals. Trailer demand spikes for a few days even if the monthly average looked fine.",
        },
        {
          title: "Rake discharge",
          body: "On-dock or inland rail arrivals create a second peak at transfer points and last-mile plants.",
        },
        {
          title: "CFS backlog clearance",
          body: "When drivers return after seasonal absenteeism, CFSs try to clear stacked imports quickly. Trailer pools tighten overnight.",
        },
        {
          title: "Empty HQ reposition",
          body: "Exporters need 40ft high cubes at stuffing points. Empties must move by road even when the ocean box exists somewhere else in the system.",
        },
      ],
    },
    {
      kind: "flow",
      caption: "Evacuation and empty cycle (trailer view)",
      source: "Idealised road cycle. Public JNPA-area stress episodes showed what happens when step 2 starves: terminal yards fill while berths may still look healthy.",
      items: [
        {
          title: "Terminal ready",
          body: "Import box is available for delivery. CFS or direct-delivery party must place a trailer.",
        },
        {
          title: "CFS or plant delivery",
          body: "Container trailer evacuates to CFS or plant. Gate turns and trip productivity decide how many moves one truck completes per day.",
        },
        {
          title: "Destuff and empty",
          body: "After destuff, the empty goes to a yard, ICD, or export stuffing point. Missing pullers here look like 'no containers' to the next exporter.",
        },
        {
          title: "Next booking",
          body: "Laden export, empty reposition, or return toward the gateway. Overflow capacity matters most on this handoff during peaks.",
        },
      ],
    },
    {
      kind: "bars",
      caption: "Illustrative weekly trailer-trip mix (teaching split)",
      source:
        "Teaching split informed by TranZfort marketplace analytics on overflow demand. Not a ZAFTYS operating KPI and not a measured share of JNPT or Mundra. Use to discuss base versus overflow sizing.",
      unit: "% of trips",
      items: [
        { label: "Planned contract / empaneled", value: 70 },
        { label: "Same-week overflow", value: 30 },
      ],
    },
    {
      kind: "tiles",
      caption: "Trip productivity levers when pools tighten",
      source:
        "Public gateway commentary often stresses faster gate turns and pooled evacuation. Units here are trips per trailer per day, not TEUs.",
      items: [
        {
          title: "Faster gate turns",
          body: "Green-channel style moves and cleaner document packs raise trips per trailer per day when drivers are scarce.",
        },
        {
          title: "Pooled CFS evacuation",
          body: "Coordinated trailer placement clears stacked imports faster than one-broker-at-a-time calling.",
        },
        {
          title: "Overflow for peak days",
          body: "Marketplace overflow covers absentee spikes without sizing the year-round fleet to the worst week.",
        },
        {
          title: "Measure before you widen",
          body: "Lock corridor definition, track placement hit-rate and plant or CFS turnaround, then add the next gateway.",
        },
      ],
    },
  ],
  "Buying container road capacity for organised networks": [
    {
      kind: "table",
      caption: "Container road capacity RFQ checklist",
      source: "Spec the buy like an engineer. If the RFQ only says 'provide containers', expect mismatched trailers and invoice disputes.",
      headers: ["Spec item", "What to require", "Why it matters"],
      rows: [
        ["Body / chassis", "20ft / 40ft / 40ft HQ twist-lock (state mix)", "Wrong chassis wastes cube or fails marine boxes"],
        ["GVW class", "Axle layout + legal tonnes", "Section 194 and roadside offload risk"],
        ["Documents", "RC, permit, insurance, driver licence masters", "Gate entry fails without them"],
        ["Toll / transit", "FASTag-capable trucks", "Evidence beyond a map pin"],
        ["Proof of delivery", "Photo ePOD pack + timestamps", "Billing cycle and claims"],
        ["Free time", "Gate-in clock definition in writing", "Detention disputes"],
        ["Empty return", "Who pays / return-load rules", "Silent round-trip INR pricing"],
        ["Placement SLA", "Hours to place at terminal, CFS, or plant", "Surge performance"],
      ],
    },
    {
      kind: "table",
      caption: "Shipper plant lane versus organised-network overflow",
      source: "Same roads; different responsibility packets. Write both into the rate card.",
      headers: ["Topic", "Shipper-direct plant lane", "Organised-network overflow"],
      rows: [
        ["Who books", "Plant / shipper logistics", "Network control tower"],
        ["Who feels detention first", "Plant + transporter", "Network + end-customer politics"],
        ["Empty return", "Often shipper-negotiated", "Often network-standardised"],
        ["Success metric", "Plant TAT + invoice days", "Placement hit-rate + customer SLA"],
        ["Typical failure", "Weighbridge / slot chaos", "Peak-day no-shows at the gateway"],
      ],
    },
    {
      kind: "steps",
      caption: "Earn the right to scale capacity partners",
      source: "Matches dependency-led thinking elsewhere in this dossier. Calendar length varies; order should not.",
      items: [
        {
          title: "Pilot one western corridor",
          body: "Lock the JNPT or Mundra hinterland definition. Freeze body mix and detention rules before the first peak week.",
        },
        {
          title: "Measure for 30 to 90 days",
          body: "Placement hit-rate, empty-km share, plant or CFS turnaround, and unload-to-invoice days in INR terms.",
        },
        {
          title: "Repeat the lane in writing",
          body: "Convert the pilot into a repeat rate card with empty-return rules. Do not scale on a kickoff slide.",
        },
        {
          title: "Add the second gateway last",
          body: "Widen only after the first corridor's denominators improve. National heatmaps without proof create idle chassis.",
        },
      ],
    },
  ],
  "Chassis configurations and axle norms": [
    {
      kind: "tiles",
      caption: "Match the box to the cargo, not the other way around",
      source: "Fleet engineering pattern from ZAFTYS corridor operations logs on Indian EXIM and domestic container work. Payload bands are metric tonnes of cargo, within legal GVW.",
      items: [
        {
          title: "20ft ISO trailer",
          body: "Marine ISO container on an open twist-lock chassis. Best for heavy dense cargo. Payload often up to about 22 tonnes depending on tractor GVW.",
        },
        {
          title: "32ft SXL / MXL",
          body: "Domestic rigid enclosed body (not an ocean box). Single-axle (SXL) limited by about 18.5 tonne GVW; multi-axle (MXL) opens 28 or 35 tonne GVW regimes. Common for e-commerce and white goods volume.",
        },
        {
          title: "40ft / 40ft HQ",
          body: "EXIM ocean freight workhorse. High cube (HQ) is taller and holds more cubic metres. Legal GVW can run to about 45.5 or 55.0 tonnes by axle layout.",
        },
        {
          title: "Reefer / specialized",
          body: "Temperature-controlled reefers (clip-on generator), flat-rack, open-top, side-lifter. Over-dimensional cargo (ODC) needs MoRTH permits and different tare weight math.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Technical specification matrix: ISO vs domestic fleets (tonnes and cubic capacity)",
      source: "Illustrative engineering ranges for planning. T = metric tonnes. CBM = cubic metres. Confirm OEM plates and state Regional Transport Office (RTO) practice before dispatch.",
      headers: ["Category", "Dimensions", "Axle / tyres", "Tare / cube", "Legal payload (tonnes)"],
      rows: [
        ["20ft ISO dry", "20ft x 8ft x 8.5ft", "2/3-axle trailer", "~2.2 tonnes / 33 CBM", "6.5 to 22.0 tonnes"],
        ["32ft SXL (single axle)", "32ft x 8ft x 8ft/10ft", "6-wheeler rigid", "~5.5 tonnes / 1,800-2,100 cu.ft.", "7.0 to 9.0 tonnes (18.5t GVW)"],
        ["32ft MXL (multi axle)", "32ft x 8ft x 8ft/10ft", "10-wheeler rigid", "~7.5 tonnes / 1,800-2,100 cu.ft.", "14.0 to 18.0 tonnes"],
        ["40ft ISO", "40ft x 8ft x 8.5ft", "12-14 tyres tractor-trailer", "~3.8 tonnes / 67 CBM", "21.0 to 28.0 tonnes"],
        ["40ft HQ (high cube)", "40ft x 8ft x 9.5ft", "18-wheeler tractor-trailer", "~4.2 tonnes / 76 CBM", "22.0 to 32.0 tonnes"],
        ["Reefer trailer", "20ft / 40ft HQ", "Multi-axle + genset", "~4.8 tonnes / -30°C to +30°C", "18.0 to 26.0 tonnes"],
      ],
    },
    {
      kind: "table",
      caption: "Statutory gross vehicle weight (GVW) limits under MoRTH framing",
      source: "Ministry of Road Transport and Highways gazette framing (S.O. 3467(E) / S.O. 4353(E)). GVW is the legal maximum for truck + load in metric tonnes. Confirm current text and state enforcement.",
      headers: ["Commercial vehicle category", "Tyre count", "Max legal GVW (tonnes)"],
      rows: [
        ["2-axle rigid (32ft SXL)", "6", "18.5 tonnes"],
        ["3-axle rigid (32ft MXL)", "10", "28.0 tonnes"],
        ["4-axle rigid", "12", "35.0 tonnes"],
        ["3-axle tractor + 2-axle trailer (40ft)", "14", "45.5 tonnes"],
        ["3-axle tractor + 3-axle trailer (40ft HQ)", "18", "55.0 tonnes"],
      ],
    },
    {
      kind: "bars",
      caption: "Illustrative upper payload bands by category (metric tonnes)",
      source:
        "Upper ends of the planning bands in the matrix above. Actual legal payload depends on tractor, trailer, and state practice. Values are tonnes of cargo, not TEUs or rupees.",
      unit: "tonnes",
      items: [
        { label: "32ft SXL (upper)", value: 9 },
        { label: "32ft MXL (upper)", value: 18 },
        { label: "20ft ISO (upper)", value: 22 },
        { label: "40ft ISO (upper)", value: 28 },
        { label: "40ft HQ (upper)", value: 32 },
      ],
    },
    {
      kind: "callout",
      caption: "Section 194 overload exposure (why weighbridge lock matters)",
      source: "Motor Vehicles Act framing. Confirm current fine schedule with counsel; amounts below are orientation, not legal advice.",
      items: [
        {
          title: "Statutory fine pattern",
          body: "Overloaded commercial vehicles face a baseline statutory fine often cited near ₹20,000 plus about ₹2,000 per additional tonne, with roadside offloading of excess weight before release.",
          tone: "warm",
        },
        {
          title: "Operational cost beyond the challan",
          body: "Offloading, detention, missed vessel cutoff, and customer penalties usually dwarf the printed fine. A TMS that cannot block an overweight gate pass only documents the failure.",
          tone: "navy",
        },
      ],
    },
  ],
  "Digital logistics stack": [
    {
      kind: "flow",
      caption: "Public digital rails into one container TMS view",
      source: "Architecture pattern informed by ZAFTYS TMS operational analytics. Product APIs and coverage vary by integration scope; verify in a live demo.",
      items: [
        {
          title: "ULIP API gateway",
          body: "Unified Logistics Interface Platform connects 39+ government and private systems (VAHAN vehicle registry, SARATHI driving licence, FASTag tolls, FOIS rail freight) for fitness, permit, and transit checks.",
        },
        {
          title: "LDB / NLDS RFID",
          body: "Logistics Data Bank (NICDC Logistics Data Services) feeds radio-frequency identification milestones across major ports, 100+ inland container depots (ICDs), and hundreds of container freight stations (CFSs).",
        },
        {
          title: "ICEGATE + e-Way Bill",
          body: "Indian Customs EDI Gateway checks shipping bills and bills of entry (BoE) at gate. GST e-Way Bill rules add distance-based validity alerts operators can act on.",
        },
      ],
    },
    {
      kind: "timeline",
      caption: "Milestone journey of one EXIM box (what a control tower should see)",
      source:
        "Idealised milestone chain. Real coverage depends on RFID, FASTag, and customs integrations on that corridor. Gaps in the chain are where phone trees still hide delay.",
      items: [
        {
          phase: "Port / CFS",
          title: "Gate and customs",
          body: "ICEGATE shipping bill or bill of entry hygiene; FASTag or QR gate event; LDB stamp when the box enters the terminal ecosystem.",
        },
        {
          phase: "Inland move",
          title: "Highway and ICD",
          body: "FASTag plaza timestamps on the corridor; LDB or FOIS events when the box mounts a rake or arrives at an inland container depot.",
        },
        {
          phase: "Plant",
          title: "Gate to exit",
          body: "Plant gate, tare, bay, gross, and exit stamps. Weighbridge GVW check before the truck rejoins the highway.",
        },
      ],
    },
    {
      kind: "steps",
      caption: "What each rail is for on a busy corridor",
      source: "Operator checklist. Soft-pedal any claim that every extension or customs step is fully automatic until you see it live.",
      items: [
        {
          title: "ULIP",
          body: "Verify vehicle and driver masters before loading. Use FASTag plaza timestamps as transit evidence, not only a map pin.",
        },
        {
          title: "LDB",
          body: "Track port gate, vessel, rail rake, and CFS milestones when RFID coverage exists on that move.",
        },
        {
          title: "ICEGATE / GST",
          body: "Keep customs shipping bills and e-Way Bills aligned with gate and distance rules. Alert early when validity is at risk.",
        },
        {
          title: "TMS dashboard",
          body: "One transport management system screen for dispatch, milestones, exceptions, and settlement. Phone trees are not a control tower.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "e-Way Bill distance validity (operator framing)",
      source:
        "GST e-Way Bill practice often cited as about one day of validity per 200 km for general cargo, with a limited extension window. Confirm current CBIC / portal rules before designing alerts. Extension should stay operator-confirmed, not a silent auto-promise.",
      items: [
        {
          title: "Why container corridors trip the clock",
          body: "Port congestion, ICD queues, and weighbridge waits burn validity while the truck is barely moving. A map pin without distance alerts still lets the bill expire.",
          tone: "warm",
        },
        {
          title: "What good alert design does",
          body: "Warn dispatch when remaining validity will not cover remaining highway kilometres plus a buffer for plant wait. Keep a human in the loop for any extension filing.",
          tone: "teal",
        },
      ],
    },
  ],
  "Backhaul and deadheading": [
    {
      kind: "tiles",
      caption: "Why the return leg decides trucker survival",
      source:
        "Operational teaching model. Fixed-cost framing is industry practice; figures for empty-km and utilisation are third-party order-of-magnitude bands, not ZAFTYS measured corridor KPIs.",
      items: [
        {
          title: "Fixed costs already paid",
          body: "Diesel for the empty miles, driver wages, insurance, EMI or lease, and tolls still run when the trailer carries no cargo. Zero revenue on that leg.",
        },
        {
          title: "Empty km is national, not exotic",
          body: "NITI / RMI-linked framing often puts empty commercial truck kilometres near 30% to 40% (bands vary). Container hinterland moves inherit the same geometry.",
        },
        {
          title: "Waiting burns utilisation too",
          body: "Industry studies cite trucks idle 24 to 48 hours hunting a load and working only about 18 to 20 days in many months. A late return match can cost as much as a deadhead.",
        },
        {
          title: "Cheap return can still win",
          body: "A modest paid backhaul often beats a planned empty on contribution after variable cost. Compare contribution, not vanity rupees per kilometre alone.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Who finds return loads today",
      source:
        "IIMA-style actor model plus Redseer / industry brokerage notes. Commission and idle-time figures are directional third-party framing.",
      headers: ["Actor", "How they fill the gap", "Strength", "Failure mode"],
      rows: [
        [
          "Small / pure fleet owners (often 1-5 trucks)",
          "Take attached or spot work; rarely hold a private shipper book",
          "Flexible timing; local gate knowledge",
          "Cannot see reverse demand beyond one mandi or broker circle",
        ],
        [
          "Phone brokers / booking agents",
          "Match shipper or transporter indents to attached trucks",
          "Tomorrow-morning placement speed",
          "Opaque multi-hop rates; weak KYC / ePOD hygiene",
        ],
        [
          "Organised transporters",
          "Own fleet plus attached capacity on industrial contracts",
          "SLA discipline on contracted lanes",
          "Overflow and reverse freight still need a matching layer",
        ],
        [
          "Digital freight networks / load boards",
          "Widen search across corridors and verified capacity",
          "Radius beyond one broker’s phone book",
          "Cannot invent reverse cargo; body type and free time must fit",
        ],
      ],
    },
    {
      kind: "callout",
      caption: "Two EXIM empty problems (do not merge them)",
      source:
        "Trailer deadhead vs ocean-box reposition. Street-turn / reuse is an industry pattern when shipping lines approve; it is not the same product as a freight load board.",
      items: [
        {
          title: "Empty trailer deadhead",
          body: "ISO chassis delivers inland laden and returns without paying cargo. Shippers feel this as round-trip INR pricing. Marketplaces help when a nearby export (or other return) load fits the body.",
          tone: "navy",
        },
        {
          title: "Empty ocean-box reposition",
          body: "Importer must return the box to a nominated depot while an exporter elsewhere pays another truck to fetch an empty high cube. Street-turn / triangulation can cut one empty road move when the line approves reuse.",
          tone: "teal",
        },
      ],
    },
  ],
  "Shipper rate math and EXIM match loops": [
    {
      kind: "tiles",
      caption: "The container deadheading equation (illustrative INR road rates)",
      source:
        "ZAFTYS corridor operations logs (illustrative INR teaching rates). Rates are Indian rupees (₹) per tonne of cargo on an illustrative inland move, not USD and not per container. Your lane rates differ.",
      items: [
        {
          title: "Single-leg with backhaul",
          body: "About ₹2,400 per tonne when the return leg earns revenue. Importer pays for one productive direction.",
        },
        {
          title: "Round-trip with no backhaul",
          body: "About ₹3,900 per tonne when the trailer returns empty. Roughly a 60%+ price premium in INR for the same outbound move.",
        },
        {
          title: "Shipper unlock",
          body: "Matching import delivery to nearby export pickup can cut outbound INR freight spend on the order of 15% to 35% when both legs clear.",
        },
        {
          title: "Trucker unlock",
          body: "The same match protects contribution on the trip P&L. Pair this chapter with the empty-return Basics guide for corridor KPIs.",
        },
      ],
    },
    {
      kind: "bars",
      caption: "Illustrative INR road rate for the same outbound move",
      source: "Teaching comparison from the tiles above. Values are ₹ per tonne of cargo, not per container and not USD.",
      unit: "₹ / tonne",
      items: [
        { label: "Single-leg with backhaul", value: 2400 },
        { label: "Round-trip empty return", value: 3900 },
      ],
    },
    {
      kind: "flow",
      caption: "Export-import trailer backhaul matching loop",
      source:
        "TranZfort marketplace analytics pattern for paying cargo on the return trailer. Listing and search are free; a broker fee applies on booked loads. This is trailer-load matching, not ocean-box street-turn.",
      items: [
        {
          title: "Port terminal",
          body: "Import container clears JNPA (JNPT), Mundra, or Hazira and rolls inland on a container trailer.",
        },
        {
          title: "Inland import plant or CFS",
          body: "Trailer delivers. Without a match it deadheads empty toward the coast or nominated empty yard.",
        },
        {
          title: "Broker or network search",
          body: "Phone brokers, attached fleets, or a digital board hunt a return within free-time and body-type constraints.",
        },
        {
          title: "Export plant match",
          body: "Nearby exporter loads a return box. Both sides can price single-leg economics in INR when the match clears.",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Match constraints that kill a return",
      source: "When these fail, a planned empty reposition is often cleaner than a forced wrong-fit load.",
      items: [
        {
          title: "Body and twist locks",
          body: "20ft vs 40ft high cube, and ISO chassis vs domestic rigid body. Wrong fit wastes cube or fails the gate.",
        },
        {
          title: "Free-time clocks",
          body: "Detention and depot free time can expire before the export stuffing window opens.",
        },
        {
          title: "Radius and slots",
          body: "Export plant must sit inside a practical empty reposition radius with compatible gate slots.",
        },
        {
          title: "Papers and securement",
          body: "RC, permits, driver masters, and cargo securement must clear both legs. A dirty return creates claims that erase the margin.",
        },
      ],
    },
  ],
  "Broker vs GPS vs digital network": [
    {
      kind: "table",
      caption: "Feature comparison: broker phone tree vs basic GPS vs integrated stack",
      source:
        "Capability contrast for evaluation workshops. ZAFTYS TMS operational analytics and TranZfort marketplace analytics inform the product column; confirm live scope in demo.",
      headers: ["Parameter", "Traditional broker", "Basic GPS", "ZAFTYS TMS + TranZfort"],
      rows: [
        ["Location tracking", "Phone calls", "Geofence pin", "Tri-hybrid path (GPS + FASTag + ULIP/LDB where wired)"],
        ["Backhaul matching", "Local phone brokers", "Not supported", "Import/export load match on network"],
        ["Driver / vehicle verify", "Paper checks", "Not supported", "VAHAN / SARATHI style master checks when integrated"],
        ["Port / ICD gate", "Paper gate pass", "Not supported", "FASTag / ICEGATE hygiene where connected"],
        ["e-Way Bill risk", "Manual portal", "Not supported", "Distance alerts; extension is operator-confirmed"],
        ["ePOD (electronic proof of delivery)", "Weeks of mail", "Not supported", "Same-day photo ePOD path"],
        ["GST invoice audit", "Unorganized bills", "Manual", "Three-way match toward enterprise resource planning (ERP)"],
        ["Rail / road sync", "Register logs", "Not supported", "FOIS (rail freight) / rake visibility when integrated"],
      ],
    },
    {
      kind: "tiles",
      caption: "Eight live asks for a vendor workshop (bring a real corridor)",
      source: "Do not accept slide answers. Ask to see each item on a busy EXIM lane.",
      items: [
        {
          title: "Spot trailer on the map",
          body: "Show a broker overflow truck with FASTag or equivalent evidence, not only a dedicated GPS box.",
        },
        {
          title: "ICD milestone",
          body: "Show an inland depot event without calling the CFS clerk on speakerphone.",
        },
        {
          title: "GVW block",
          body: "Attempt an overweight gate pass and watch the system refuse to print it.",
        },
        {
          title: "Return match",
          body: "Offer an import delivery and see whether a nearby export load can be proposed with single-leg INR math.",
        },
      ],
    },
    {
      kind: "steps",
      caption: "How to score the workshop without a 25-point tap sheet",
      source: "Three outcome lanes. Pass means evidence on the corridor you named.",
      items: [
        {
          title: "Visibility lane",
          body: "Pass if port, highway, and plant stamps can appear on one move. Fail if the demo is only a highway pin.",
        },
        {
          title: "Commercial lane",
          body: "Pass if backhaul matching and rate cards change the quoted INR structure. Fail if every indent still prices as round trip.",
        },
        {
          title: "Cash lane",
          body: "Pass if ePOD and three-way match clear a sample invoice the same week. Fail if finance still waits on a physical LR.",
        },
      ],
    },
  ],
  "Container control maturity": [
    {
      kind: "callout",
      caption: "Three maturity bands (not a 1-to-5 workshop scorecard)",
      source:
        "ZAFTYS TMS operational analytics framing for EXIM container programs. Place each control domain in a band using evidence from the last 90 days, not vendor slides.",
      items: [
        {
          title: "Manual",
          body: "Phone, WhatsApp, and paper still run the move. Chassis choice is tribal knowledge. Empties and detention show up as surprises. Finance waits on physical lorry receipts (LRs).",
          tone: "warm",
        },
        {
          title: "Partial digital",
          body: "A map pin or spreadsheet exists, but gate, weighbridge, inland container depot (ICD) milestones, and billing do not share one truth. Backhaul matching is occasional, not systematic.",
          tone: "navy",
        },
        {
          title: "Controlled",
          body: "Gross vehicle weight (GVW) can block a bad gate pass. ULIP / LDB / FASTag / ICEGATE milestones appear where wired. Import and export legs can be matched. Electronic proof of delivery (ePOD) feeds three-way invoice match.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "table",
      caption: "Control domains: what Manual vs Partial vs Controlled looks like in practice",
      source:
        "Diagnostic matrix for plant, port, and finance leaders. Read across a row for one domain. This replaces a numbered tap-to-score checklist.",
      headers: ["Control domain", "Manual", "Partial digital", "Controlled"],
      rows: [
        [
          "Chassis and payload",
          "Any available trailer; weighbridge is advisory",
          "Body type noted on indent; overload caught late",
          "Size and axle class matched before load; GVW lock at gate",
        ],
        [
          "Ocean and inland visibility",
          "Carrier email and phone updates",
          "GPS on some trucks; ICD status by calling the depot",
          "Port / ICD / FASTag milestones in one TMS view where APIs exist",
        ],
        [
          "Empty return (deadheading)",
          "Round-trip INR rates by default",
          "Broker finds a return when lucky",
          "Import delivery systematically offered for nearby export pickup",
        ],
        [
          "Yard and port gate",
          "Unannounced arrivals; paper gate pass",
          "Slots on paper; still long queues",
          "Timed slots; FASTag / QR gate; five-stage turnaround time (TAT) stamps",
        ],
        [
          "Settlement and cash",
          "Monthly paper LR chase",
          "Photos in chat; retyped invoices",
          "Same-week ePOD; rate + weight + ePOD match into ERP",
        ],
      ],
    },
    {
      kind: "stacked",
      caption: "Illustrative share of container freight leakage by control gap (directional)",
      source:
        "Teaching split for where value usually leaks when programs stay Manual or Partial. Not a measured P&L from one shipper. Percentages sum to 100% of leakage in this model, not of total freight spend.",
      items: [
        { label: "Empty returns / round-trip pricing", value: 32, color: zaftysViz.navy },
        { label: "Detention and slow plant TAT", value: 24, color: zaftysViz.primary },
        { label: "Wrong chassis / overload risk", value: 18, color: zaftysViz.primaryBright },
        { label: "Billing lag and invoice disputes", value: 16, color: zaftysViz.teal },
        { label: "Ocean surcharge and box shortage scramble", value: 10, color: zaftysViz.warm },
      ],
    },
    {
      kind: "tiles",
      caption: "Evidence to demand before you call a domain Controlled",
      source: "If the evidence pack is missing, the domain is still Partial at best.",
      items: [
        {
          title: "Chassis evidence",
          body: "Last 30 overloaded or near-GVW events with weighbridge tickets. Count of 20ft vs 40ft HQ vs 32ft SXL/MXL by lane.",
        },
        {
          title: "Visibility evidence",
          body: "Sample move with port gate, ICD, and FASTag stamps on one screen. Note which milestones are still phone-only.",
        },
        {
          title: "Backhaul evidence",
          body: "Percent of import trailers that earned an export return in the last quarter, and INR single-leg vs round-trip mix.",
        },
        {
          title: "Settlement evidence",
          body: "Median days from unload to approved invoice. Share of bills that needed manual rework.",
        },
      ],
    },
  ],
  "Dependency-led build sequence": [
    {
      kind: "steps",
      caption: "Build order by dependency (not a fixed six-week calendar)",
      source:
        "EXIM container programs fail when settlement is automated before gate stamps exist, or when backhaul is sold before chassis discipline. Sequence follows data dependency. Calendar length varies; order should not.",
      items: [
        {
          title: "Baseline the corridor",
          body: "Pick one EXIM lane (for example National Capital Region to Mundra or JNPA). Measure empty-km share, plant TAT, and invoice cycle in INR for 30 to 90 days.",
        },
        {
          title: "Lock weight and masters",
          body: "Vehicle and driver masters, body type, and weighbridge GVW lock. Without this, later visibility only records bad loads faster.",
        },
        {
          title: "Wire milestones",
          body: "ULIP / LDB / FASTag / ICEGATE where approved. Prove one clean milestone trail before expanding plants.",
        },
        {
          title: "Match return legs",
          body: "Turn on import-export backhaul on the same corridor. Compare single-leg vs round-trip INR rates on live loads.",
        },
        {
          title: "Close the cash loop",
          body: "ePOD into three-way match and ERP. Leadership sees TAT, empty-km, and days sales outstanding (DSO) on the piloted lane.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Three traps that recreate a fake six-week plan",
      source: "If you hear these in a steering meeting, reset to the dependency order above.",
      items: [
        {
          title: "Demo calendar",
          body: "Vendor proposes Weeks 1 to 6 before baseline empty-km and invoice-cycle numbers exist. You will celebrate a map, not a P&L move.",
          tone: "warm",
        },
        {
          title: "Finance-first automation",
          body: "Accounts payable wants ePOD into ERP before gate and weighbridge stamps are trusted. Settlement then retypes the same disputes.",
          tone: "navy",
        },
        {
          title: "Network before corridor",
          body: "Roll out to every plant while the pilot lane still prices every import as a round trip in INR. Complexity rises; deadheading does not fall.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "steps",
      caption: "What each dependency unlocks (and what breaks if you skip it)",
      source: "Use in design reviews with IT, security, plant, and finance.",
      items: [
        {
          title: "Skip baseline",
          body: "You cannot tell whether empty returns or detention is the larger leak. Vendors will pick the metric that flatters the demo.",
        },
        {
          title: "Skip GVW lock",
          body: "Digital tracking will show trucks that should never have left the gate. Section 194 risk and offloading cost stay intact.",
        },
        {
          title: "Skip milestones",
          body: "Backhaul matching guesses location. e-Way Bill alerts fire late. ICD empty shortages stay invisible until production stops.",
        },
        {
          title: "Skip backhaul",
          body: "You digitize a round-trip cost structure. Freight spend in INR barely moves even when the map looks modern.",
        },
        {
          title: "Skip settlement",
          body: "Operations improve while finance still waits on paper LRs. Working capital and DSO stay stuck.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Effort bands for one corridor (directional calendar, not a promise)",
      source:
        "Planning bands from ZAFTYS TMS operational analytics on a single high-volume EXIM corridor after security review. Multi-plant networks take longer. Durations are calendar weeks, not TEUs or money. Treat as planning bands, not a contractual go-live poster.",
      headers: ["Build stage", "Typical duration", "What “done” looks like"],
      rows: [
        [
          "Baseline and masters",
          "About 2 to 4 weeks",
          "Indent history, rate cards, body specs, detention rules, and transporters ready on the pilot lane",
        ],
        [
          "API and gate wiring",
          "About 3 to 6 weeks",
          "ULIP / LDB / FASTag / ICEGATE and weighbridge where approved; first clean milestone trail on live loads",
        ],
        [
          "Backhaul and settlement",
          "About 4 to 8 weeks",
          "Import-export matching on the pilot corridor; ePOD three-way match into accounts payable",
        ],
        [
          "Network expansion",
          "About 8 to 16 weeks",
          "Additional plants and ICDs after empty-km, TAT, and invoice-cycle movement is proven",
        ],
      ],
    },
    {
      kind: "tiles",
      caption: "Pilot corridor selection criteria",
      source: "Choose a lane where volume, pain, and data access all exist. Vanity lanes waste the build sequence.",
      items: [
        {
          title: "Volume",
          body: "Enough weekly TEUs or trips that empty returns and detention show in rupees, not anecdotes.",
        },
        {
          title: "Pain",
          body: "Known ICD empty shortages, gate queues, or invoice disputes so success is obvious to leadership.",
        },
        {
          title: "Access",
          body: "Plant security and IT will allow weighbridge and API work. A blocked gate kills the sequence.",
        },
        {
          title: "Partner mix",
          body: "At least some transporters willing to try single-leg pricing when a return load is confirmed.",
        },
      ],
    },
  ],
  "What good programs tend to show": [
    {
      kind: "ranges",
      caption: "Directional outcome bands after digital container control",
      source:
        "ZAFTYS TMS operational analytics and corridor operations logs, 2024 to 2026. Percent and day bands are directional operational results, not TEU counts or USD market size. Not a guarantee. Measure your last 90 days first.",
      items: [
        {
          label: "Container freight cost (INR spend)",
          detail: "Backhaul matching and rate audit often move total road/ocean program spend down in a 10% to 16% planning band when both legs clear.",
          low: 10,
          high: 16,
          suffix: "% reduction",
        },
        {
          label: "Port and plant turnaround time (TAT)",
          detail: "Automated gate hygiene and slot discipline can cut yard turnaround in a 40% to 60% band vs unmanaged queues.",
          low: 40,
          high: 60,
          suffix: "% faster",
        },
        {
          label: "Empty trailer runs (deadheading)",
          detail: "Import/export matching programs often cut empty kilometres in a 35% to 50% band on piloted corridors.",
          low: 35,
          high: 50,
          suffix: "% fewer empty km",
        },
        {
          label: "ePOD to billing cycle",
          detail: "Paper lorry receipt (LR) cycles of many weeks can move toward about 3 to 5 days when photo electronic proof of delivery and invoice match run the same week (vs roughly 45 days on paper).",
          low: 3,
          high: 5,
          suffix: "days (vs ~45)",
        },
      ],
    },
    {
      kind: "steps",
      caption: "90-day measurement recipe before you claim success",
      source: "Baseline first. Without these denominators, percent improvements are marketing.",
      items: [
        {
          title: "Week 0 to 2: freeze the denominators",
          body: "For the pilot corridor, lock trip count, TEUs or tonnes moved, empty-km share, median plant TAT, and median days from unload to approved invoice.",
        },
        {
          title: "Week 3 to 8: change one dependency at a time",
          body: "Ship GVW lock, then milestones, then backhaul, then settlement. Do not change all four in the same week if you want clean attribution.",
        },
        {
          title: "Week 9 to 12: compare like with like",
          body: "Recompute the same denominators. Report INR spend, empty-km, TAT, and billing days with the same lane definition you froze at Week 0.",
        },
        {
          title: "Keep a exception log",
          body: "Count ICD empty shortages, e-Way Bill near-expiry events, overweight blocks, and invoice rework. Rising exception clarity is a win even before averages move.",
        },
      ],
    },
    {
      kind: "table",
      caption: "What to put on the leadership one-pager",
      source: "One corridor, four numbers, units labelled. Avoid mixing TEUs with rupees on the same row without a unit column.",
      headers: ["Metric", "Unit", "Why leadership cares"],
      rows: [
        ["Empty trailer share", "% of truck-km empty", "Shows whether backhaul matching is real"],
        ["Plant TAT (median)", "Hours gate to exit", "Shows whether slots and weighbridge discipline work"],
        ["Freight cost on pilot lane", "INR per tonne or per trip", "Shows commercial impact, not map cosmetics"],
        ["Unload to approved invoice", "Calendar days", "Shows whether ePOD and match freed working capital"],
      ],
    },
  ],
};
