/** Wave 1 long-tail technical blogs — new-domain sandbox (SEO plan §12). */
import type { BlogPost } from "@/lib/blog-data";

export const wave1BlogPosts: readonly BlogPost[] = [
  {
    slug: "mill-gate-papers-coil-dispatch",
    title: "Mill Gate Papers for Coil Dispatch: What Delays Allotment",
    seoTitle: "Mill Gate Papers Coil Dispatch India",
    seoDescription:
      "Mill gate papers for steel coil dispatch in India: LR, e-Way Bill, weighbridge ticket, allotment blockers, and how desks clear the gate before the crane.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Coil trucks often lose the mill window on paperwork, not on the highway. This guide lists the gate papers that block allotment and how shippers and transporters clear them before the vehicle is called.",
    readMinutes: 8,
    heroImage: "/images/blog/steel-coil-transport-basics.jpg",
    heroAlt: "Steel coil trailer staged for mill dispatch",
    takeaways: [
      "Allotment fails when papers and vehicle class are incomplete before the slot, not after the crane starts.",
      "Treat weighbridge ticket, e-Way Bill, and mill loading note as one packet.",
      "One desk that owns exceptions beats chasing three numbers at the gate.",
    ],
    midCtaAfterHeading: "What the mill usually checks",
    relatedSlugs: [
      "steel-coil-transport-basics",
      "india-axle-load-gvw-limits-heavy-freight",
      "plant-detention-tat-yard-gate-india",
      "epod-fastag-eway-bill-billing-india",
    ],
    faqs: [
      {
        question: "What papers usually delay coil allotment?",
        answer:
          "Incomplete LR details, missing or mismatched e-Way Bill, no weighbridge plan, wrong vehicle class vs mill loading note, and expired RC / insurance / fitness on the allotted truck.",
      },
      {
        question: "Should papers be ready before the truck reaches the mill?",
        answer:
          "Yes. Mill windows are short. Clearing documents and vehicle fitness before gate-in protects the slot; fixing them in the queue burns free time.",
      },
      {
        question: "Does ZAFTYS handle mill paper packs on steel lanes?",
        answer:
          "On contracted steel moves, the Amravati desk aligns vehicle class, papers, and weighbridge language before allotment. See [steel & metals logistics](/industries/steel-metals).",
      },
      {
        question: "How does this differ from plant detention generally?",
        answer:
          "Detention covers the whole yard clock. Mill gate papers are the specific document and fitness checks that stop allotment before loading even starts.",
      },
    ],
    sections: [
      {
        heading: "Why allotment dies at the gate",
        paragraphs: [
          "Steel coil programs fail quietly when the truck is right for the highway but wrong for the mill. The crane is ready; the slot is booked; the driver is in the queue — and allotment still stops because a paper or fitness check fails.",
          "This guide is ops practice for Indian mill gates, not legal advice. Follow the mill’s outbound SOP when it is stricter than anything written here. Pair it with [steel coil transport basics](/blog/steel-coil-transport-basics) and [plant detention and TAT](/blog/plant-detention-tat-yard-gate-india).",
        ],
      },
      {
        heading: "What the mill usually checks",
        paragraphs: [
          "Most coil mills and stockyards run a short gate checklist before the vehicle is accepted for loading:",
        ],
        bullets: [
          "Vehicle class matches the loading note (flatbed / coil well / side wall as specified)",
          "RC, insurance, fitness, and permit validity for the corridor",
          "Driver identity and mill gate pass process",
          "LR / consignment details that match the indent",
          "e-Way Bill ready or generation path agreed before exit",
          "Weighbridge path known (in-gate, out-gate, or both)",
        ],
      },
      {
        heading: "Paper pack before you call the truck",
        paragraphs: [
          "Treat documents as part of capacity, not an afterthought once the vehicle is rolling:",
          "If any line is soft, do not burn a mill slot hoping the gate will “manage.”",
        ],
        bullets: [
          "Confirm party names, GSTINs, and delivery address spelling against the indent",
          "Agree who generates the e-Way Bill and when (origin / transporter / mill desk)",
          "Attach coil profile notes the mill needs (piece count, approx weight, deck type)",
          "Send the driver the gate photo / parking map before arrival",
        ],
      },
      {
        heading: "Weighbridge is a document event",
        paragraphs: [
          "For coils, the weighbridge is not only axle discipline — it is evidence. Ticket numbers that do not tie to the LR become claim fights later.",
          "Build weighbridge time into the mill window. See [axle load and GVW](/blog/india-axle-load-gvw-limits-heavy-freight) for placement discipline after the papers clear.",
        ],
      },
      {
        heading: "Who owns the exception",
        paragraphs: [
          "When a paper fails, someone must own the fix in minutes: mill logistics, shipper desk, or transporter. Fragmented WhatsApp chains lose the slot.",
          "One accountable partner with trip records in [ZAFTYS TMS](/zaftys-tms) keeps exception timestamps with the shipment instead of in lost chats. Billing hygiene still depends on [ePOD and e-Way Bill discipline](/blog/epod-fastag-eway-bill-billing-india).",
        ],
      },
      {
        heading: "Surge capacity still needs the same pack",
        paragraphs: [
          "When mill demand exceeds owned fleet, overflow on [TranZfort](/network/tranzfort) still has to pass the same gate checklist. Labeled network trucks are not an excuse for incomplete papers or wrong deck type.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Share your mill’s gate checklist, coil profile, and weekly window pattern. We will map a paper-first allotment habit for the corridor on [steel & metals logistics](/industries/steel-metals).",
        ],
      },
    ],
    cta: { label: "Steel & metals logistics", to: "/industries/steel-metals" },
  },
  {
    slug: "chemical-tanker-freight-wash-msds",
    title: "Chemical Tanker Freight: Wash, MSDS, and Why Class Comes Before Rate",
    seoTitle: "Chemical Tanker Freight Wash MSDS India",
    seoDescription:
      "Chemical tanker freight in India: tank wash, MSDS, product class before rate, LR discipline, and why the cheapest tanker at the gate is often the wrong one.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Chemical lanes fail when rate shopping ignores tank class, wash state, and MSDS. This guide covers what shippers should lock before a tanker is allotted.",
    readMinutes: 8,
    heroImage: "/images/blog/planning-industrial-shipments.jpg",
    heroAlt: "Industrial freight planning for chemical and bulk liquid lanes",
    takeaways: [
      "Product class and wash state decide the tanker — rate comes after.",
      "MSDS and previous-load history belong in the allotment conversation.",
      "Labeled overflow still has to meet the same wash and paper bar.",
    ],
    midCtaAfterHeading: "Wash and previous load",
    relatedSlugs: [
      "planning-industrial-shipments",
      "plant-detention-tat-yard-gate-india",
      "epod-fastag-eway-bill-billing-india",
      "spot-market-vs-dedicated-fleet-india",
    ],
    faqs: [
      {
        question: "Why does wash matter more than a low rate?",
        answer:
          "Residue from a previous load can contaminate product, fail plant intake, and create liability. A cheap unclean tanker is not cheaper after a rejected load.",
      },
      {
        question: "What is MSDS used for in allotment?",
        answer:
          "The Material Safety Data Sheet (or SDS) tells handlers what the product requires for containment, PPE, and emergency response. Desks use it to match tank class and plant rules before the vehicle is sent.",
      },
      {
        question: "Do you own chemical tankers?",
        answer:
          "Where we have the class, we run company assets. Specialized or surge demand uses verified partners and is labeled as network — never silently sold as owned fleet. See [chemicals logistics](/industries/chemicals).",
      },
      {
        question: "Is this the same as industrial freight generally?",
        answer:
          "Industrial freight covers mixed body classes. Chemical tanker lanes add wash, MSDS, and closed-body discipline on top of ordinary FTL planning.",
      },
    ],
    sections: [
      {
        heading: "Class before rate",
        paragraphs: [
          "On chemical and bulk liquid lanes, the wrong tanker at a good rate is still a failed trip. Product compatibility, tank lining, and wash state decide whether the plant will accept the vehicle.",
          "This is operational guidance for industrial chemicals programs, not a substitute for plant SOPs, carrier licenses, or applicable dangerous-goods rules. Confirm requirements with your EHS and logistics teams.",
        ],
      },
      {
        heading: "What to lock before allotment",
        paragraphs: ["Before anyone shops rate, lock:"],
        bullets: [
          "Product name, UN / class where applicable, and packaging (bulk vs drum / IBC)",
          "Required tank type / lining and temperature rules if any",
          "Wash certificate or wash-station path from the last load",
          "MSDS / SDS available to driver and plant gate",
          "Plant intake papers and sampling rules",
        ],
      },
      {
        heading: "Wash and previous load",
        paragraphs: [
          "Ask for previous product and wash proof in writing. “Clean enough” on a phone call is not a certificate.",
          "If the plant requires a specific wash grade, build wash lead time into the indent — do not discover it at the gate. Detention patterns here look like [plant TAT](/blog/plant-detention-tat-yard-gate-india) with a chemistry twist.",
        ],
      },
      {
        heading: "Papers that close the trip",
        paragraphs: [
          "Chemical lanes need the same LR / e-Way Bill / ePOD hygiene as other FTL, plus product-specific attachments the plant demands. See [ePOD and e-Way Bill billing](/blog/epod-fastag-eway-bill-billing-india).",
          "Trip status on [ZAFTYS TMS](/zaftys-tms) keeps wash and document timestamps with the shipment so finance and EHS are not reconstructing history from chat.",
        ],
      },
      {
        heading: "Contract core, labeled overflow",
        paragraphs: [
          "Repeat chemical corridors belong on contract or dedicated capacity so class and wash habits stay stable. Spot overflow is for true surge — and must still clear the same bar. Read [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india).",
          "When company tankers are not enough, [TranZfort](/network/tranzfort) partners are labeled. Network does not mean “any tanker.”",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Send product class, wash rules, and corridor volume. We will map a tanker program on [chemicals logistics](/industries/chemicals) without pretending rate alone is the decision.",
        ],
      },
    ],
    cta: { label: "Chemicals logistics", to: "/industries/chemicals" },
  },
  {
    slug: "32ft-vs-40ft-sealed-container-india",
    title: "32 ft vs 40 ft on Indian Roads: Choosing Sealed Container Capacity",
    seoTitle: "32 ft vs 40 ft Container Trucking India",
    seoDescription:
      "32 ft vs 40 ft sealed container capacity on Indian roads: domestic FTL backbone vs EXIM ISO chassis, plant gates, axle reality, and when each size fits.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Domestic sealed FTL and EXIM ISO boxes are not the same booking. This guide compares 32 ft and 40 ft choices for Indian road legs so shippers stop ordering the wrong chassis.",
    readMinutes: 8,
    heroImage: "/images/blog/container-trucking-logistics-india.jpg",
    heroAlt: "Container trailer on an Indian port-to-plant corridor",
    takeaways: [
      "32 ft SXL / MXL is the domestic sealed FTL backbone; 40 ft is usually EXIM ISO work.",
      "Gate height, turning radius, and axle limits matter as much as box length.",
      "Port–city industry desk and Container Transportation service share the same road execution.",
    ],
    midCtaAfterHeading: "When 40 ft is the right call",
    relatedSlugs: [
      "container-trucking-logistics-india",
      "port-free-time-vs-plant-free-time-containers",
      "india-axle-load-gvw-limits-heavy-freight",
      "reduce-empty-return-trips",
    ],
    faqs: [
      {
        question: "Is 32 ft the default for domestic sealed freight?",
        answer:
          "Often yes for Indian domestic FTL sealed moves. Confirm plant gate and payload before assuming; some lanes still need 20–24 ft for access.",
      },
      {
        question: "When do I need a 40 ft chassis?",
        answer:
          "Typically for EXIM ISO 40 ft / 40 HC boxes on port–ICD–factory legs where the chassis and corridor support it — not as a default domestic upgrade.",
      },
      {
        question: "Where do I read the full container trucking guide?",
        answer:
          "See the deep research post [container trucking in India](/blog/container-trucking-logistics-india) and the industry desk [port & container road](/industries/container-transport).",
      },
      {
        question: "Does size choice affect free time?",
        answer:
          "Indirectly. Wrong size causes gate refusals and re-allotment, which burns port and plant free time. See [port vs plant free time](/blog/port-free-time-vs-plant-free-time-containers).",
      },
    ],
    sections: [
      {
        heading: "Two different jobs",
        paragraphs: [
          "Shippers often say “send a container truck” when they mean either a domestic sealed FTL body or an ISO box on a chassis. Those are different capacity products on Indian roads.",
          "Use this comparison as a booking filter. For chassis, backhaul, and program design depth, read [container trucking in India](/blog/container-trucking-logistics-india).",
        ],
      },
      {
        heading: "32 ft — domestic sealed backbone",
        paragraphs: [
          "32 ft SXL / MXL configurations carry a large share of domestic sealed FTL. They fit many factory and warehouse gates that struggle with longer ISO setups.",
        ],
        bullets: [
          "Good default when cargo is domestic sealed freight, not an EXIM ISO box",
          "Confirm payload vs axle / GVW after loading — length does not forgive overload",
          "Ask the plant for gate width, dock height, and turning notes before allotment",
        ],
      },
      {
        heading: "When 40 ft is the right call",
        paragraphs: [
          "40 ft / 40 HC work belongs where the box and the chassis are part of an EXIM or ICD program. Ordering 40 ft “for more space” on a domestic SKU move often creates gate and axle problems without helping the commercial trip.",
          "Chassis availability and labeled overflow matter on port peaks — see [TranZfort](/network/tranzfort) and [container transportation](/logistics/container-transportation).",
        ],
      },
      {
        heading: "Checks that beat brochure length",
        paragraphs: ["Before you lock size, confirm:"],
        bullets: [
          "Is the unit an ISO box or a domestic sealed body?",
          "Plant / CFS gate clearance and turning radius",
          "Weighbridge and axle plan for the loaded weight",
          "Who owns empty return / chassis dwell — see [empty returns](/blog/reduce-empty-return-trips)",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Share origin, destination, sealed vs ISO, and gate constraints. We will recommend class on [port & container road](/industries/container-transport) without guessing from length alone.",
        ],
      },
    ],
    cta: { label: "Port & container road", to: "/industries/container-transport" },
  },
  {
    slug: "pneumatic-bulker-bulk-cement-fly-ash",
    title: "Bulk Cement and Fly Ash: When You Need a Pneumatic Bulker",
    seoTitle: "Pneumatic Bulker Cement Fly Ash India",
    seoDescription:
      "When bulk cement and fly ash need a pneumatic bulker in India: loose vs bagged, plant intake, tipper mistakes, and how to book the right body class.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Loose cement and dry fly ash are not “open body with a tarp.” This guide explains when a pneumatic bulker is mandatory and how shippers avoid wrong-body allotments.",
    readMinutes: 7,
    heroImage: "/images/blog/cement-plant-loading-windows.jpg",
    heroAlt: "Cement plant loading window for bulk and bagged freight",
    takeaways: [
      "Loose cement and dry fly ash need pneumatic bulker — not tipper improvisation.",
      "Bagged cement and aggregates stay on open body / tipper programs.",
      "Plant intake hardware decides the body before rate shopping starts.",
    ],
    midCtaAfterHeading: "Intake hardware decides the truck",
    relatedSlugs: [
      "cement-plant-loading-windows",
      "open-body-vs-tipper-bagged-cement-aggregates",
      "plant-detention-tat-yard-gate-india",
      "india-axle-load-gvw-limits-heavy-freight",
    ],
    faqs: [
      {
        question: "When is a pneumatic bulker required?",
        answer:
          "When the cargo is loose cement or dry fly ash that the plant or works receives through pneumatic discharge into silos — not bagged product on open body.",
      },
      {
        question: "Can a tipper move bulk cement?",
        answer:
          "Not as a substitute for bulker discharge into silos. Wrong body class causes gate refusal, contamination risk, and lost windows.",
      },
      {
        question: "What about clinker and aggregates?",
        answer:
          "Clinker and aggregates usually run on open body or tipper programs. Confirm plant rules; do not assume bulker.",
      },
      {
        question: "Where is the cement industry desk?",
        answer:
          "See [cement logistics](/industries/cement) and [open body vs tipper](/blog/open-body-vs-tipper-bagged-cement-aggregates) for bagged and aggregate moves.",
      },
    ],
    sections: [
      {
        heading: "Loose product is a different machine",
        paragraphs: [
          "Bagged cement on a tipper and loose cement in a pneumatic bulker share the word “cement” and almost nothing else in allotment. Fly ash to cement works or RMC consumers follows the same rule: match discharge method to body class.",
          "Read this with [cement plant loading windows](/blog/cement-plant-loading-windows) so the window and the body are planned together.",
        ],
      },
      {
        heading: "Intake hardware decides the truck",
        paragraphs: [
          "Ask the receiving plant how product enters the site. Silo pneumatic intake → bulker. Bag bay or aggregate dump → open body / tipper. Guessing from the commodity name alone is how wrong trucks reach the gate.",
        ],
        bullets: [
          "Confirm silo vs bag vs tipper dump before indent",
          "Confirm wash / previous-load rules for bulkers when the plant requires them",
          "Confirm weighbridge path — bulkers still live under axle and GVW limits",
        ],
      },
      {
        heading: "Owned bulker vs labeled overflow",
        paragraphs: [
          "Repeat plant-to-works bulker lanes belong on reserved capacity. Surge windows use verified partners and must be labeled — never presented as owned fleet. See [cement logistics](/industries/cement).",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Tell us cargo (bagged / bulk / fly ash / clinker), origin plant, and intake type. We will match body class before talking rate.",
        ],
      },
    ],
    cta: { label: "Cement logistics", to: "/industries/cement" },
  },
  {
    slug: "document-expiry-weighbridge-fleet-records",
    title: "Document Expiry and the Weighbridge: Fleet Records That Matter",
    seoTitle: "Fleet Document Expiry Weighbridge India",
    seoDescription:
      "Fleet document expiry and weighbridge discipline in India: RC, insurance, fitness, permits, and trip records that keep industrial FTL moving past the gate.",
    category: "technology",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Expired papers and missing weighbridge tickets stop trips that looked fine on a rate sheet. This guide lists the fleet records shippers and operators should keep live.",
    readMinutes: 8,
    heroImage: "/images/blog/tms-for-heavy-haul.jpg",
    heroAlt: "Transport management records for fleet documents and trips",
    takeaways: [
      "RC, insurance, fitness, and permit expiry are allotment blockers — not back-office chores.",
      "Weighbridge tickets belong with the trip record, not in a driver’s gallery.",
      "TMS fleet records reduce gate surprises when expiry is tracked before dispatch.",
    ],
    midCtaAfterHeading: "Weighbridge tickets as trip evidence",
    relatedSlugs: [
      "tms-for-heavy-haul",
      "tms-evaluation-guide-indian-manufacturers",
      "epod-fastag-eway-bill-billing-india",
      "india-axle-load-gvw-limits-heavy-freight",
    ],
    faqs: [
      {
        question: "Which documents expire and block allotment?",
        answer:
          "Typically RC, insurance, fitness certificate, and corridor permits. Plants and highway checks also care about driver licence validity.",
      },
      {
        question: "Why tie weighbridge tickets to the TMS trip?",
        answer:
          "So axle and payload evidence stays with the shipment for claims and billing — not lost in chat threads when finance asks a month later.",
      },
      {
        question: "Does ZAFTYS TMS store fleet document status?",
        answer:
          "ZAFTYS TMS is built for dispatch, GPS, ePOD, and fleet records on trips we run. Ask for a demo of document and trip visibility on [ZAFTYS TMS](/zaftys-tms).",
      },
      {
        question: "Is this only for owned fleet?",
        answer:
          "Owned fleet should be tightest. Labeled network trucks still need valid papers before gate-in — expiry is not waived by marketplace booking.",
      },
    ],
    sections: [
      {
        heading: "Expiry is an operations event",
        paragraphs: [
          "Industrial shippers feel document expiry as a refused gate or a roadside stop, not as a calendar reminder. Treating RC, insurance, fitness, and permits as “admin” is how good corridors lose a day.",
          "Pair this with [TMS beyond GPS](/blog/tms-for-heavy-haul) — documents are part of dispatch readiness.",
        ],
      },
      {
        heading: "Minimum live record set",
        paragraphs: ["Keep these visible to the desk that allots trucks:"],
        bullets: [
          "Vehicle RC and fitness with expiry dates",
          "Insurance validity",
          "National / state permits required for the corridor",
          "Driver licence and ID as the plant requires",
          "Last weighbridge ticket pattern for the lane (where used)",
        ],
      },
      {
        heading: "Weighbridge tickets as trip evidence",
        paragraphs: [
          "A weighbridge slip that is not linked to the LR / trip ID is weak evidence in a claim. Capture ticket number and weight against the shipment before the truck leaves the site.",
          "Axle planning still matters — see [axle load and GVW](/blog/india-axle-load-gvw-limits-heavy-freight). Records without placement discipline only document the failure.",
        ],
      },
      {
        heading: "Where TMS helps",
        paragraphs: [
          "A transport system that tracks fleet document status and trip attachments reduces “we thought it was valid” allotments. Evaluate that explicitly in your [TMS evaluation](/blog/tms-evaluation-guide-indian-manufacturers).",
          "Billing still needs [ePOD and e-Way Bill](/blog/epod-fastag-eway-bill-billing-india) hygiene so the clean trip record becomes a clean invoice.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "If your team still tracks expiry in spreadsheets and weighbridge photos in WhatsApp, book a [ZAFTYS TMS](/zaftys-tms) walkthrough focused on fleet records and trip evidence.",
        ],
      },
    ],
    cta: { label: "Explore ZAFTYS TMS", to: "/zaftys-tms" },
  },
  {
    slug: "port-free-time-vs-plant-free-time-containers",
    title: "Port Free Time vs Plant Free Time: Two Clocks on One Container Trip",
    seoTitle: "Port vs Plant Free Time Container India",
    seoDescription:
      "Port free time vs plant free time on Indian container road legs: two clocks, demurrage risk, factory slots, and how desks plan one trip against both.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Container road trips die when teams optimise only the port clock or only the plant slot. This guide explains both free-time clocks and how to plan allotment against them.",
    readMinutes: 8,
    heroImage: "/images/blog/container-trucking-logistics-india.jpg",
    heroAlt: "Container road move between port and plant",
    takeaways: [
      "Port free time and plant free time are separate clocks on the same trip.",
      "Allotment must clear both — not only the cheaper demurrage story.",
      "Wrong chassis or late papers burn both clocks at once.",
    ],
    midCtaAfterHeading: "Planning one allotment against both",
    relatedSlugs: [
      "container-trucking-logistics-india",
      "32ft-vs-40ft-sealed-container-india",
      "plant-detention-tat-yard-gate-india",
      "reduce-empty-return-trips",
    ],
    faqs: [
      {
        question: "What is port free time in this context?",
        answer:
          "The window after box availability during which the box can leave the terminal / CFS without demurrage or detention charges under the line / terminal rules that apply to that move.",
      },
      {
        question: "What is plant free time?",
        answer:
          "The receiving factory or warehouse slot and gate rules — how long the plant will accept the trailer without detention, refusal, or reschedule.",
      },
      {
        question: "Can I ignore plant time if port demurrage is the bigger invoice?",
        answer:
          "No. A plant refusal sends the box back into dwell and often recreates port-side cost. Both clocks need a plan.",
      },
      {
        question: "Where do I go for container programs?",
        answer:
          "[Port & container road](/industries/container-transport) and [container transportation](/logistics/container-transportation).",
      },
    ],
    sections: [
      {
        heading: "One trip, two clocks",
        paragraphs: [
          "Port–factory container legs fail when the desk watches only terminal free time or only the factory slot. The trailer has to satisfy both. Optimising one clock while ignoring the other is how demurrage and plant detention show up on the same week’s ledger.",
          "For chassis and corridor depth, see [container trucking in India](/blog/container-trucking-logistics-india).",
        ],
      },
      {
        heading: "Port clock — leave before the meter owns you",
        paragraphs: [
          "Know when the box is available, which free-time rule applies, and how long gate-out realistically takes on that terminal day. Do not allot a chassis that cannot clear papers and gate before free time expires.",
        ],
      },
      {
        heading: "Plant clock — arrive inside the slot",
        paragraphs: [
          "Factories refuse early and late arrivals. A truck that saved port free time but missed the bay still fails. Plant detention patterns are covered in [plant TAT](/blog/plant-detention-tat-yard-gate-india) — container lanes inherit the same gate physics.",
        ],
      },
      {
        heading: "Planning one allotment against both",
        paragraphs: ["Before calling the trailer:"],
        bullets: [
          "Map port free-time end vs plant slot start with transit buffer",
          "Confirm chassis size — see [32 ft vs 40 ft](/blog/32ft-vs-40ft-sealed-container-india)",
          "Confirm who holds empty return / chassis dwell — [empty returns](/blog/reduce-empty-return-trips)",
          "Confirm e-Way Bill and gate pass path before the truck rolls",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Share port / CFS, plant slot rules, and weekly box count. We will plan dual-clock allotment on [port & container road](/industries/container-transport).",
        ],
      },
    ],
    cta: { label: "Port & container road", to: "/industries/container-transport" },
  },
  {
    slug: "open-body-vs-tipper-bagged-cement-aggregates",
    title: "Open Body vs Tipper for Bagged Cement and Aggregates",
    seoTitle: "Open Body vs Tipper Cement Aggregates India",
    seoDescription:
      "Open body vs tipper for bagged cement and aggregates in India: dump vs manual unload, plant rules, when each body wins, and how to avoid wrong allotments.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Bagged cement and aggregates are often booked as “any open truck.” This guide compares open body and tipper so plant unload method drives the allotment.",
    readMinutes: 7,
    heroImage: "/images/blog/cement-plant-loading-windows.jpg",
    heroAlt: "Tipper and open body trucks for cement and aggregate lanes",
    takeaways: [
      "Unload method at the site decides tipper vs open body — not habit.",
      "Bagged cement often needs open body or sided tipper per plant SOP; aggregates often tip.",
      "Bulk loose cement still needs bulker — see the pneumatic bulker guide.",
    ],
    midCtaAfterHeading: "Site unload method",
    relatedSlugs: [
      "cement-plant-loading-windows",
      "pneumatic-bulker-bulk-cement-fly-ash",
      "plant-detention-tat-yard-gate-india",
      "planning-industrial-shipments",
    ],
    faqs: [
      {
        question: "When should I book a tipper?",
        answer:
          "When the receiving site dumps aggregates or suitable bagged loads by tipping and the plant SOP allows it. Confirm before allotment.",
      },
      {
        question: "When is open body better for bagged cement?",
        answer:
          "When bags are manually unloaded or the plant forbids tipping bagged product. Many dealer and RMC bag lanes prefer sided open body.",
      },
      {
        question: "Is tipper the same as pneumatic bulker?",
        answer:
          "No. Tipper is for dumpable solids. Loose cement / fly ash to silos needs a [pneumatic bulker](/blog/pneumatic-bulker-bulk-cement-fly-ash).",
      },
      {
        question: "Where do cement programs sit at ZAFTYS?",
        answer: "See [cement logistics](/industries/cement).",
      },
    ],
    sections: [
      {
        heading: "Stop booking “any open truck”",
        paragraphs: [
          "Bagged cement and aggregates move on bodies that look similar from the highway and behave differently at the bay. Wrong allotment shows up as manual unload delays, damaged bags, or a refused tip at site.",
          "Use [cement plant loading windows](/blog/cement-plant-loading-windows) for the plant clock; use this guide for body class.",
        ],
      },
      {
        heading: "Site unload method",
        paragraphs: ["Ask the destination:"],
        bullets: [
          "Tip and dump allowed for this product?",
          "Manual bag unload only?",
          "Side wall / tarpaulin rules in monsoon?",
          "Weighbridge before or after unload?",
        ],
      },
      {
        heading: "Quick comparison",
        paragraphs: [
          "Tipper: strong when aggregates or approved bagged loads dump cleanly and the site wants fast turnaround.",
          "Open body: strong when bags need controlled manual unload, mixed SKUs, or sites that refuse tipping.",
          "Neither replaces bulker for loose cement into silos — see [pneumatic bulker](/blog/pneumatic-bulker-bulk-cement-fly-ash).",
        ],
      },
      {
        heading: "Detention link",
        paragraphs: [
          "Wrong body extends yard time the same way wrong windows do. [Plant detention and TAT](/blog/plant-detention-tat-yard-gate-india) applies whether the delay is papers or a tipper that cannot tip.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Send product (bagged cement / aggregates / mix), unload method, and corridor. We will match open body or tipper on [cement logistics](/industries/cement).",
        ],
      },
    ],
    cta: { label: "Cement logistics", to: "/industries/cement" },
  },
];
