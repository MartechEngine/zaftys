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
      "A closed aggregator often buys or controls capacity and resells a landed rate to the shipper, which can embed a hidden spread the trucker never sees - treat percentage bands as workshop assumptions until measured. An open marketplace publishes the load, lets verified parties negotiate the trip rate directly, and can keep matching free of a freight commission. Control systems (multi-plant TMS, e-Way Bill, AP) remain separate from the matching rail.",
  },
  {
    question: "Is TranZfort free for truckers and transporters?",
    answer:
      "Yes for marketplace matching: truckers and transporters can find loads, post loads, chat, and call without a platform cut of the negotiated trip freight. TranZfort / ZAFTYS charges transporters who use ZAFTYS TMS services for enterprise gate-to-pay control. Live legal documents: [tranzfort.com/legal/](https://tranzfort.com/legal/). Download: [Play Store](https://play.google.com/store/apps/details?id=com.tranzfort.app).",
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
      "Brokerage commission (dalali) is a stack, not a line item. Hypothetical teaching bands for some corridors: booking commission around Rs 500 to Rs 1,500 to place the indent into the freight market (mandi); vehicle placement Rs 1,000 to Rs 2,500 for gate timing; advances routed through a preferred diesel pump creating a quieter diesel-slip (diesel parchi) margin. These are not national averages - measure your lane before quoting percentages.",
      "Information asymmetry is the business model. During harvest surges, monsoon choke points, and festival capacity squeezes, the freight market (mandi) hears both the factory panic and the idle truck inventory. The shipper is told capacity is impossible. The trucker is told freight is soft. The intermediary clears the spread. That is why opaque phone bidding survives even when everyone owns a smartphone.",
      "Cash convention hardens the trap. Highway practice still pays about 65% to 70% advance at loading - fuel card or cash - because drivers cannot float diesel, tolls, and trip allowance (bhatta) for a 1,000-plus km run. The balance often waits 30 to 60 days while paper LRs courier back and finance disputes stamps. Drivers feel starved of trip cash. Shippers feel starved of invoice velocity. Both complaints are real; the paper chain causes both.",
    ],
    exhibits: loadMarketplaceExhibits["The Indian truck brokerage landscape: how Transport Nagars really work"],
  },
  {
    heading: "The evolution of digital freight: from closed aggregators to open marketplaces",
    paragraphs: [
      "First-generation digital freight products often digitised the broker, not the market. A closed aggregator collected shipper demand, controlled or pre-negotiated truck supply, and sold a landed rate. The shipper saw an app. The trucker still saw a take-it-or-leave-it number. The spread that used to live in Transport Nagar phone books moved into software.",
      "BlackBuck's November 2024 Red Herring Prospectus (Zinka Logistics Solutions Limited) cites an estimated 8-10% commission range for offline marketplaces and brokers connecting shippers and truck operators ([SEBI RHP PDF](https://www.sebi.gov.in/sebi_data/attachdocs/nov-2024/1731409759538.PDF)). That is an industry estimate in a formal offer document - not an audited national average, not every corridor or commodity, and not a rule that every online marketplace must charge the same. Distinguish a broker's commission from the difference between the amount billed to a shipper and the amount paid to a carrier.",
      "Open marketplaces invert the commercial rule when parties negotiate the trip rate directly. The platform's job is identity, matching, evidence, and (for enterprises) a clean handoff into TMS gate-to-pay. On TranZfort, marketplace matching is free for truckers and transporters; the paid path is ZAFTYS TMS for transporters who need enterprise control. Legal hub: [tranzfort.com/legal/](https://tranzfort.com/legal/). Compare product features and terms, not slogans.",
      "Enterprises still cannot run multi-plant supply chains only on driver phones. They need seats, roles, ERP hooks, e-Way Bill discipline, and a shared ledger. That is [ZAFTYS TMS](/zaftys-tms) for dedicated contract fleets and plant desks - with unfulfilled indents published into [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort)) when contracted carriers fail to place or season volume spikes. The honest product split is control on web, open capacity on Android, one audit trail when the trip returns.",
    ],
    exhibits: loadMarketplaceExhibits["The evolution of digital freight: from closed aggregators to open marketplaces"],
  },
  {
    heading: "The mathematical cost of intermediation: the broker margin tax",
    paragraphs: [
      "Hypothetical ZAFTYS Intelligence freight-cost scenario (assumptions for calculation literacy - not an audited trip file and not a real customer transaction). Illustrative operating-cost floor: Rs 54,000. Illustrative brokered freight invoice: Rs 62,000. Illustrative alternative freight invoice: Rs 55,800. Difference between the two invoices: Rs 6,200. Difference as a proportion of Rs 62,000: 10%. These values demonstrate arithmetic only; they are not measured market savings.",
      "Comparisons require equivalent routes, cargo, vehicle specifications, service conditions, and payment terms. Without the original trip file (fuel litres and price, tolls, driver expenses, loading/unloading, empty running, maintenance, waiting time, route, vehicle, cargo, date, and quote sources), do not publish invented component rupee amounts as a real case study. Use the editable cost-breakdown framework in the exhibits - leave cells blank until you have source data. Define whether 'operating floor' includes fixed costs, depreciation, financing, overhead, or profit before treating Rs 54,000 as a fully loaded break-even.",
      "Read any waterfall or pie in this guide as a teaching tool, not a national index. Rebuild the floor with the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide) before you treat any screenshot as a rate card.",
      "Return-load dwell is the second tax. Define it as clock time from empty after unload until the next paid load is accepted - not transit time and not plant detention. Without a dated lane sample (size, period, exclusions, median/percentiles), do not publish 48-72 hours as an industry average - treat dwell as a variable your desk must measure. Standing cost still burns while the truck waits. Faster return discovery is part of marketplace value, not only cheaper outbound freight.",
    ],
    exhibits: loadMarketplaceExhibits["The mathematical cost of intermediation: the broker margin tax"],
  },
  {
    heading: "How digital load matching works: direct in-app discovery and negotiation",
    paragraphs: [
      "Marketplace matching fails when the post is a WhatsApp forward with three numbers and a commodity nickname. Industrial desks need pin-level origins and destinations, body type, net payload, commodity description, loading window, and advance terms on the first screen. The TranZfort walkthrough exhibits below show the current Android create-load, find, detail, chat, and Settings → Legal flows - production screenshots, not mockups.",
      "Ambiguous '32ft container' language is a special failure mode. SXL and MXL are commercial axle-class labels, not fixed payload standards. Post axle class and RC GVW - or expect wrong chassis. Detail: [32-ft container sizing](/blog/32-feet-container-truck-dimensions-payload-sxl-mxl-guide).",
      "In-app call and chat keep rate, advance, and window on one thread. Payment terms on the post reduce cancel risk: state advance percentage, balance trigger (POD upload versus physical LR), and any detention free time. Truckers price uncertainty. Matching stays free for truckers and transporters; TMS is the paid enterprise path.",
      "Document gate rules on the post when they are non-standard: weighbridge mandatory, chassis rubbing, Hazchem endorsement, night entry ban. Surprises at security are how confirmed trucks become afternoon dropouts. Download: [Play Store](https://play.google.com/store/apps/details?id=com.tranzfort.app) · legal: [tranzfort.com/legal/](https://tranzfort.com/legal/) · overview [TranZfort marketplace](/network/tranzfort).",
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
      "Same hypothetical ZAFTYS Intelligence scenario: operating-cost floor Rs 54,000; brokered invoice Rs 62,000; alternative invoice Rs 55,800; invoice difference Rs 6,200 (10% of Rs 62,000). Assumptions for demonstrating the calculation - not measured savings and not a ZAFTYS audited trip.",
      "Do not paste those rupees into a tender. Recompute diesel, toll class, empty-return probability, and standing cost with the [freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide) on matched vehicle, route, cargo, service, and payment terms. The lesson is governance transparency, not a fixed national spread.",
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
      "FAQs below cover marketplace definition, aggregator versus open matching, TranZfort free matching vs TMS fees, pre-booking verification, LR/POD evidence, cancel handling, GTA tax impact, hybrid TMS design, and high-converting load posts.",
      "Statutory orientation only: Carriage by Road Act, 2007 and Carriage by Road Rules, 2011; Information Technology Act, 2000; Central Motor Vehicles Rules, 1989 (including Rules 9 and 138A framing); CGST Rule 138 on e-Way Bill Part B updates. Confirm bare text before a demand letter or tax memo. This guide is operations research for industrial desks - not legal advice. Product legal hub: [tranzfort.com/legal/](https://tranzfort.com/legal/).",
      "Next step for a plant desk: keep contract fleets on [ZAFTYS TMS](/zaftys-tms) and open free overflow matching for truckers/transporters on [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort) · [Play Store](https://play.google.com/store/apps/details?id=com.tranzfort.app) · [Legal](https://tranzfort.com/legal/)), with the 8-step SOP and 20-point audit as the written operating standard.",
    ],
    exhibits: loadMarketplaceExhibits["The 20-point freight marketplace readiness audit and FAQs"],
  },
];
