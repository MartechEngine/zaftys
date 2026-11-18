import type { BlogSection } from "@/lib/blog-data";
import { loadMarketplaceExhibits } from "@/lib/blog-exhibits-load-marketplaces";

export const loadMarketplaceFaqs = [
  {
    question: "What is a truck load marketplace in India?",
    answer:
      "A truck load marketplace is a digital matching rail where shippers (or indie suppliers) publish FTL / part-load requirements and verified truckers or fleet owners accept at a negotiated trip rate. Unlike a Transport Nagar phone chain, the indent, vehicle identity, chat, and often LR / POD evidence sit on one timeline. Open marketplaces typically do not take a cut of the freight; closed aggregators historically monetised a hidden rate spread.",
  },
  {
    question: "What is the difference between a freight aggregator and an open load marketplace?",
    answer:
      "A closed aggregator often buys or controls capacity and resells a landed rate to the shipper, embedding a 5% to 10% style spread that the trucker never sees. An open marketplace publishes the load, lets verified parties negotiate the trip rate directly, and keeps matching free of a freight commission. Control systems (multi-plant TMS, e-Way Bill, AP) remain separate from the matching rail.",
  },
  {
    question: "How do zero-commission freight apps make money if they don't charge brokerage?",
    answer:
      "They do not take a cut of the trip freight the way a Transport Nagar broker (dalal) or a closed aggregator does. Monetisation sits outside the rate card: enterprise TMS seats, plant control workflows, optional value-added services, and network effects. Posting a load and finding a truck can stay free so indie suppliers and fleet owners are not taxed again at matching.",
  },
  {
    question: "How should a shipper verify a truck before booking on a digital marketplace?",
    answer:
      "Treat marketplace acceptance as a lead, not a cleared gate. Check live Vahan fields for RC, fitness, tax, and goods permit; match Sarathi for commercial DL class; confirm chassis/engine against the physical truck at gate-in; and keep FASTag plausibility where integrated. A JPEG of an RC is not verification. Full gate protocol: [commercial vehicle verification](/blog/commercial-vehicle-verification-india-bogus-trucks-fraud-prevention).",
  },
  {
    question: "Is an in-app photo of an LR or POD legally valid under Indian transport law?",
    answer:
      "Electronic records can carry legal weight under the Information Technology Act, 2000 when integrity, attribution, and reliable access hold. Carriage by Road practice still centres on the goods receipt, custody trail, and remarks at delivery. Treat in-app LR / POD photos as strong commercial evidence for billing and claims - then close the file with readable stamps, signatures, vehicle number match, and geo context. Counsel owns litigation strategy; ops owns the pack quality.",
  },
  {
    question: "What happens if a trucker cancels after confirming a load on a digital marketplace?",
    answer:
      "Treat it as a placement failure, not a chat argument. Re-open the indent immediately to other verified truckers, keep the loading window honest with the plant, and score the cancelling profile so the desk sees repeat behaviour. If the lane is on a dedicated contract, labeled overflow rules should already define how fast marketplace capacity is allowed to replace a no-show. Framing: [spot market vs dedicated fleets](/blog/spot-market-vs-dedicated-fleet-india) and [indent / OTIF cascading](/blog/transporter-indent-management-otif-india-placement-sla-guide).",
  },
  {
    question: "How does direct load matching impact GST on GTA and Reverse Charge Mechanism (RCM)?",
    answer:
      "A marketplace that only matches parties does not erase Goods Transport Agency rules. GST still turns on whether a consignment note was issued, who the supplier of transport is, whether the recipient is a specified person, and whether Annexure V forward charge applies. Finance must map each trip: contract GTA invoice, direct trucker invoice, or RCM cash discharge. Full matrix: [GST on GTA - RCM vs forward charge](/blog/gst-on-gta-rcm-forward-charge-consignment-note-rules-guide).",
  },
  {
    question: "Can a factory dispatcher manage dedicated fleets and open marketplace trucks in one system?",
    answer:
      "Yes - that is the two-tier operating design. Dedicated and contract capacity stay on the enterprise web TMS with multi-seat roles for planners, gate clerks, and finance. When a contracted carrier fails to place, or season volume spikes past reserved trucks, the same desk publishes the unfulfilled indent into an open marketplace. Bookings return into the TMS for gate, weigh, documents, e-Way Bill Part B, and pay so overflow never becomes a parallel WhatsApp ledger. Product path: [ZAFTYS TMS](/zaftys-tms) and [TranZfort](https://www.tranzfort.com) (also [marketplace overview](/network/tranzfort)).",
  },
  {
    question: "What details make a high-converting industrial load post?",
    answer:
      "Publish industrial pin codes for origin and destination, exact body type (for example 32ft SXL HQ or 32ft MXL), net payload and commodity, loading window, advance terms, and any gate or document constraints. Vague WhatsApp forwards waste bidding cycles and invite ghost trucks. Right-size closed boxes with the [32-ft container guide](/blog/32-feet-container-truck-dimensions-payload-sxl-mxl-guide).",
  },
] as const;

export const loadMarketplaceSections: readonly BlogSection[] = [
  {
    heading: "The Indian truck brokerage landscape: how Transport Nagars really work",
    paragraphs: [
      "Composite from corridor practice (details changed). A Raipur fabrication desk needed a 25-tonne multi-axle for Bhiwandi by Thursday morning. The plant buyer called the usual primary broker. The broker called a regional contact. The regional contact called a Transport Nagar lorry supplier. By the time a truck registration appeared on WhatsApp, three people had touched the indent and none of them owned the asset. The shipper heard one number. The driver heard another. The gap funded the chain.",
      "Most industrial freight in India still starts that way: a phone call into a Transport Nagar, a verbally anchored rate, and a vehicle that materialises after several hand-offs. The factory rate card rarely shows the full path. Consignor to primary freight broker to regional sub-broker to local lorry supplier - truck broker (dalal) to the asset-owning trucker or driver. Each hop extracts a fee, a favour, or a fuel-route preference.",
      "Brokerage commission (dalali) is a stack, not a line item. Booking commission commonly sits around Rs 500 to Rs 1,500 just to place the indent into the freight market (mandi). Vehicle placement can add Rs 1,000 to Rs 2,500 for getting a truck to the gate on the promised window. Advances routed through a preferred diesel pump create a quieter margin - diesel slip (diesel parchi) that never appears on the shipper invoice but still leaves the driver short of operating cash.",
      "Information asymmetry is the business model. During harvest surges, monsoon choke points, and festival capacity squeezes, the freight market (mandi) hears both the factory panic and the idle truck inventory. The shipper is told capacity is impossible. The trucker is told freight is soft. The intermediary clears the spread. That is why opaque phone bidding survives even when everyone owns a smartphone.",
      "Cash convention hardens the trap. Highway practice still pays about 65% to 70% advance at loading - fuel card or cash - because drivers cannot float diesel, tolls, and trip allowance (bhatta) for a 1,000-plus km run. The balance often waits 30 to 60 days while paper LRs courier back and finance disputes stamps. Drivers feel starved of trip cash. Shippers feel starved of invoice velocity. Both complaints are real; the paper chain causes both.",
    ],
    exhibits: loadMarketplaceExhibits["The Indian truck brokerage landscape: how Transport Nagars really work"],
  },
  {
    heading: "The evolution of digital freight: from closed aggregators to open marketplaces",
    paragraphs: [
      "First-generation digital freight products often digitised the broker, not the market. A closed aggregator collected shipper demand, controlled or pre-negotiated truck supply, and sold a landed rate. The shipper saw an app. The trucker still saw a take-it-or-leave-it number. The spread that used to live in Transport Nagar phone books moved into software.",
      "Workshop bands for that hidden markup commonly sit around 5% to 10% of the trip freight - sometimes more on thin corridors where the shipper has no alternate quote. That is not always fraud. It is a business model. It is also why many fleet owners remain sceptical of 'digital freight' even after years of pitch decks.",
      "Open marketplaces invert the commercial rule. Suppliers and truckers negotiate the trip rate directly. The platform's job is identity, matching, evidence, and (for enterprises) a clean handoff into TMS gate-to-pay - not a second brokerage cut. Zero commission on freight is the trust signal that keeps indie capacity on the rail.",
      "Enterprises still cannot run multi-plant supply chains only on driver phones. They need seats, roles, ERP hooks, e-Way Bill discipline, and a shared ledger. That is [ZAFTYS TMS](/zaftys-tms) for dedicated contract fleets and plant desks - with unfulfilled indents published into [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort)) when contracted carriers fail to place or season volume spikes. The honest product split is control on web, open capacity on Android, one audit trail when the trip returns.",
    ],
    exhibits: loadMarketplaceExhibits["The evolution of digital freight: from closed aggregators to open marketplaces"],
  },
  {
    heading: "The mathematical cost of intermediation: the broker margin tax",
    paragraphs: [
      "Workshop corridor only - not a ZAFTYS audited trip file. Raipur to Bhiwandi, about 1,100 to 1,200 km class, 25-tonne multi-axle FTL. Truck operating floor after diesel, toll, driver, and standing-cost recovery sits near Rs 54,000. That is the number a trucker needs to leave the yard without burning equity.",
      "Traditional brokerage can lift the shipper invoice to about Rs 62,000 while the trucker still leaves underpaid after placement fees and diesel-slip preferences. The gap funded three phones. Direct matching near Rs 55,800 - truck floor plus a thin verified-platform operating allowance - saves about Rs 6,200 for the shipper versus the brokered invoice and still leaves the trucker closer to an honest trip advance.",
      "Read the waterfall and the traditional freight-rupee pie as teaching tools, not a national index. Your corridor diesel, empty-return risk, and freight-market (mandi) culture will move the bars. Rebuild the floor with the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide) before you treat any screenshot as a rate card.",
      "Idle dwell is the second tax. An uncontracted truck waiting 48 to 72 hours in a Transport Nagar for a return load burns standing cost whether or not brokerage took a cut on the outbound. Instant return discovery is part of the marketplace value, not only cheaper outbound freight.",
    ],
    exhibits: loadMarketplaceExhibits["The mathematical cost of intermediation: the broker margin tax"],
  },
  {
    heading: "How digital load matching works: direct in-app discovery and negotiation",
    paragraphs: [
      "Marketplace matching fails when the post is a WhatsApp forward with three numbers and a commodity nickname. Industrial desks need pin-level origins and destinations, body type, net payload, commodity description, loading window, and advance terms on the first screen.",
      "Ambiguous '32ft container' language is a special failure mode. SXL and MXL share length and diverge on legal tonnes. Post '32ft SXL HQ' or '32ft MXL' or expect wrong chassis, dead-freight, or overload near-misses. Detail: [32-ft container sizing](/blog/32-feet-container-truck-dimensions-payload-sxl-mxl-guide).",
      "In-app chat keeps rate, advance, and window on one thread. Payment terms on the post reduce cancel risk: state advance percentage, balance trigger (POD upload versus physical LR), and any detention free time. Truckers price uncertainty.",
      "Document gate rules on the post when they are non-standard: weighbridge mandatory, chassis rubbing, Hazchem endorsement, night entry ban. Surprises at security are how confirmed trucks become afternoon dropouts.",
    ],
    exhibits: loadMarketplaceExhibits["How digital load matching works: direct in-app discovery and negotiation"],
  },
  {
    heading: "Document verification and trust architecture: vetting before loading",
    paragraphs: [
      "Four trust layers before the bay opens. First, Vahan RC: maker/model, tare, GVW, chassis, fitness, tax, goods permit. Second, commercial driving licence class on Sarathi. Third, business identity - PAN / GSTIN for the booking party. Fourth, verified trip history and cancel rates on the profile.",
      "Marketplace KYC is necessary and insufficient for high-value cargo. Plants still run gate controls - chassis pencil rubbing, FASTag plausibility, driver photo match - especially on copper, coils, electronics, and agro-chemicals. Full protocol: [bogus truck and vehicle verification](/blog/commercial-vehicle-verification-india-bogus-trucks-fraud-prevention).",
      "Insurance warranties care about due diligence. A beautiful app booking without a live registry query is still a surveyor problem after diversion. Claim hygiene sits in [transit damage and cargo insurance](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide).",
    ],
    exhibits: loadMarketplaceExhibits["Document verification and trust architecture: vetting before loading"],
  },
  {
    heading: "In-transit operations: digital milestones, photo proofs, and paperwork",
    paragraphs: [
      "Telephone check-calls create two ledgers: the one the dispatcher believes and the one the driver invents under pressure. In-app milestones - Gate-In, Loading, LR upload, In-Transit, Unloading, Clean POD - collapse that gap when photos and timestamps are mandatory.",
      "ePOD quality still decides billing speed. Stamps must be readable, vehicle numbers must match, shortage remarks must be explicit. Marketplace photos that are dark, cropped, or unsigned recreate the courier fight. Close-out detail: [ePOD, FASTag, and e-Way Bill billing](/blog/epod-fastag-eway-bill-billing-india).",
      "Enterprises should pull marketplace trips into the same TMS ledger as contract fleets so finance does not reconcile two universes at month-end. Architecture: [industrial TMS control stack](/blog/industrial-tms-control-stack-india).",
    ],
    exhibits: loadMarketplaceExhibits["In-transit operations: digital milestones, photo proofs, and paperwork"],
  },
  {
    heading: "Worked financial case: 25-tonne industrial freight corridor",
    paragraphs: [
      "Workshop only. On the Raipur to Bhiwandi teaching corridor, the truck operating floor near Rs 54,000 becomes a shipper invoice near Rs 62,000 after primary brokerage, sub-broker placement, and advance discounting - while the trucker can still leave about Rs 3,500 short of a clean trip. Direct matching near Rs 55,800 is the teaching counterfactual.",
      "Do not paste those rupees into a tender. Recompute diesel, toll class, empty-return probability, and standing cost with the [freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide). The lesson is governance transparency, not a fixed national spread.",
      "When contracts fail to place, the same desk should already know how fast labeled marketplace overflow is allowed - otherwise afternoon spot panic recreates the markup the morning rate card claimed to kill. Cascading detail: [indent / OTIF guide](/blog/transporter-indent-management-otif-india-placement-sla-guide).",
    ],
    exhibits: loadMarketplaceExhibits["Worked financial case: 25-tonne industrial freight corridor"],
  },
  {
    heading: "Standard operating procedure: the 8-step direct load booking workflow",
    paragraphs: [
      "Write the SOP so a night-shift dispatcher cannot invent a parallel WhatsApp process. Eight stages from indent creation through POD and pay.",
      "Step 01: create the indent with pin codes, body, payload, commodity, window, and advance terms. Step 02: offer to contracted L1 capacity first when the lane is dedicated. Step 03: on timeout, cascade L2. Step 04: publish labeled overflow to the open marketplace. Step 05: accept only verified profiles. Step 06: gate-in with Vahan/Sarathi/chassis controls. Step 07: capture LR, seal, and milestones. Step 08: close with clean POD and tax-correct settlement.",
      "Print the process board. When a stage breaks, the exception is owned. Pair with cost-leak hygiene in [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
    ],
    exhibits: loadMarketplaceExhibits["Standard operating procedure: the 8-step direct load booking workflow"],
  },
  {
    heading: "Enterprise integration: connecting web TMS to open mobile marketplaces",
    paragraphs: [
      "Enterprises still cannot run multi-plant supply chains only on driver phones. They need seats, roles, ERP hooks, e-Way Bill discipline, and a shared ledger. That is [ZAFTYS TMS](/zaftys-tms) for dedicated contract fleets and plant desks - with unfulfilled indents published into [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort)) when contracted carriers fail to place or season volume spikes.",
      "Indent cascading belongs in the TMS: L1 timeout, L2 cascade, then marketplace push. Detail: [transporter indent management and OTIF](/blog/transporter-indent-management-otif-india-placement-sla-guide).",
      "Tax coding belongs in the same handoff. Marketplace matching does not choose RCM versus forward charge for you. Map each trip before AP posts using the [GTA GST guide](/blog/gst-on-gta-rcm-forward-charge-consignment-note-rules-guide).",
    ],
    exhibits: loadMarketplaceExhibits["Enterprise integration: connecting web TMS to open mobile marketplaces"],
  },
  {
    heading: "The 20-point freight marketplace readiness audit and FAQs",
    paragraphs: [
      "Score the diagnostic with dispatch, procurement, and finance in one room. Rate each line 1 to 5. Skip equals 0. A desk that still awards lanes only by lowest WhatsApp quote has already failed the first control.",
      "The donut is a teaching pie for where freight rupees go in a traditional brokered trip - not a national audit index. Rebuild your corridor with measured diesel and standing cost before you paste any percentage into a board pack.",
      "FAQs below cover marketplace definition, aggregator versus open matching, zero-commission monetisation, pre-booking verification, LR/POD evidence, cancel handling, GTA tax impact, hybrid TMS design, and high-converting load posts.",
      "Statutory orientation only: Carriage by Road Act, 2007 and Carriage by Road Rules, 2011; Information Technology Act, 2000; Central Motor Vehicles Rules, 1989 (including Rules 9 and 138A framing); CGST Rule 138 on e-Way Bill Part B updates. Confirm bare text before a demand letter or tax memo. This guide is operations research for industrial desks - not legal advice.",
      "Next step for a plant desk: keep contract fleets on [ZAFTYS TMS](/zaftys-tms) and open zero-commission overflow matching on [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort)), with the 8-step SOP and 20-point audit as the written operating standard.",
    ],
    exhibits: loadMarketplaceExhibits["The 20-point freight marketplace readiness audit and FAQs"],
  },
];
