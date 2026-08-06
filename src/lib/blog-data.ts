/** ZAFTYS Blog — typed content modules (v1, no CMS) */

export type BlogCategory = "operations" | "industries" | "technology";

export type BlogCta =
  | { label: string; to: string }
  | { label: string; whatsapp: true };

export type BlogSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: BlogCategory;
  publishedAt: string;
  /** ISO date — when the guide was last materially revised */
  updatedAt?: string;
  author: string;
  summary: string;
  readMinutes: number;
  heroImage?: string;
  relatedSlugs: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  sections: readonly BlogSection[];
  cta: BlogCta;
};

export const blogCategoryLabels: Record<BlogCategory, string> = {
  operations: "Operations",
  industries: "Industries",
  technology: "Technology",
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "tms-for-heavy-haul",
    title: "TMS for Heavy-Haul Freight: What Matters Beyond GPS Tracking",
    seoTitle: "TMS for Heavy-Haul Freight Beyond GPS",
    seoDescription:
      "What industrial shippers and fleet operators should evaluate in a TMS — dispatch, ePOD, plant windows, and visibility beyond a map pin.",
    category: "technology",
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-06",
    author: "ZAFTYS Operations",
    summary:
      "GPS alone is not a transport management system. For heavy-haul freight, the platform must support dispatch discipline, documentation, and plant-window reality.",
    readMinutes: 7,
    heroImage: "/images/services/home/operations-app.jpg",
    relatedSlugs: ["planning-industrial-shipments", "reduce-empty-return-trips", "steel-coil-transport-basics"],
    faqs: [
      {
        question: "Is GPS tracking the same as a TMS?",
        answer:
          "No. Tracking shows where a vehicle is. A TMS connects planning, assignment, trip status, documentation, and client visibility so teams stop managing freight only by phone.",
      },
      {
        question: "What should heavy-haul operators look for in a TMS?",
        answer:
          "Dispatch that handles multi-axle and tipper programs, ePOD and LR records, fleet and document alerts, and reporting that reflects lane cost and exceptions — not only last location.",
      },
      {
        question: "Can shippers use ZAFTYS TMS without running their own fleet?",
        answer:
          "Yes. Shippers using ZAFTYS logistics get visibility through the client portal. Fleet operators can adopt the same platform ZAFTYS runs internally at app.zaftys.com.",
      },
    ],
    sections: [
      {
        heading: "Why GPS alone falls short on industrial corridors",
        paragraphs: [
          "Many teams buy tracking and assume they have digitised transport. On cement, steel, and mining lanes, the hard problems are not only location — they are loading windows, weighbridge loops, documentation handovers, and exception communication.",
          "When those steps live in WhatsApp threads and spreadsheets, GPS becomes one more screen to check rather than a system of record.",
        ],
      },
      {
        heading: "What a heavy-haul TMS should actually connect",
        paragraphs: [
          "A useful transport management system ties planning to execution. Assignment, status milestones, proof of delivery, and client visibility should share the same trip lifecycle.",
        ],
        bullets: [
          "Dispatch and trip assignment matched to asset type and corridor",
          "Structured status updates from loading through delivery",
          "Digital documentation — LR, ePOD, invoices — stored against the trip",
          "Fleet and driver records with expiry and readiness signals",
          "Client portal access so shippers are not calling dispatch for every ETA",
        ],
      },
      {
        heading: "Plant windows and multi-axle reality",
        paragraphs: [
          "Generic last-mile tools often assume simple pickups and urban stops. Industrial freight needs room for plant queues, axle limits, and surge capacity when owned fleet is full.",
          "ZAFTYS TMS was shaped by those conditions — we run it on our own fleet daily and scale overflow through [TranZfort](/network) while keeping one operational view.",
        ],
      },
      {
        heading: "How to evaluate before you buy",
        paragraphs: [
          "Ask vendors to walk a real industrial trip: plant load, weighbridge, transit exception, delivery, and document handover. If the demo only shows a map pin moving, keep looking.",
          "Prefer platforms used in live operations — not only slide decks. You can explore [ZAFTYS TMS](/technology) at [app.zaftys.com](https://app.zaftys.com) or request a guided demo from our team.",
        ],
      },
    ],
    cta: { label: "Explore ZAFTYS TMS", to: "/technology" },
  },
  {
    slug: "steel-coil-transport-basics",
    title: "Steel Coil Transport Basics: Axle Discipline & Weighbridge Reality",
    seoTitle: "Steel Coil Transport — Axle & Weighbridge",
    seoDescription:
      "Practical guidance on steel coil and plate transport — bed type, securement, axle limits, mill windows, and weighbridge discipline across India.",
    category: "industries",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-06",
    author: "ZAFTYS Operations",
    summary:
      "Coils and plates fail quietly when bed type, strapping, or axle planning is wrong. This guide covers the basics shippers and mill teams should align before dispatch.",
    readMinutes: 8,
    heroImage: "/images/marketing/industry-steel-metals.jpg",
    relatedSlugs: ["planning-industrial-shipments", "cement-plant-loading-windows", "tms-for-heavy-haul"],
    faqs: [
      {
        question: "Which vehicles are used for steel coil transport?",
        answer:
          "Flatbed and low-bed configurations are common for coils and plates. Multi-axle assets may be required for heavier coils and route axle limits.",
      },
      {
        question: "Why do mill windows matter so much?",
        answer:
          "Mill dispatch often runs on tight slots. Late vehicles or incomplete documentation create detention, rescheduling, and downstream production risk.",
      },
      {
        question: "How does ZAFTYS support steel freight?",
        answer:
          "Company-operated flatbed and low-bed programs on repeat lanes, TranZfort overflow when mill demand spikes, and ZAFTYS TMS visibility for trip and document status.",
      },
    ],
    sections: [
      {
        heading: "Start with the load profile, not the truck label",
        paragraphs: [
          "Steel coils, plates, billets, and structurals behave differently on the road. Coil diameter, weight, and centre of gravity drive bed choice and securement — not a generic “open body” habit.",
          "Confirm payload, piece count, and destination constraints before vehicles are assigned. Axle planning after loading is already too late.",
        ],
      },
      {
        heading: "Securement and weighbridge discipline",
        paragraphs: [
          "Proper chocking, strapping, and edge protection reduce transit damage and roadside risk. Weighbridge compliance protects both shipper and transporter from axle overloads and route delays.",
        ],
        bullets: [
          "Match bed type to coil or plate geometry",
          "Plan axle distribution for corridor and permit limits",
          "Complete weighbridge and documentation steps before departure",
          "Keep mill window and gate instructions with the trip record",
        ],
      },
      {
        heading: "Mill timing and communication",
        paragraphs: [
          "Steel programs succeed when loading, paperwork, and vehicle readiness move together. Fragmented calls across multiple transporters make exceptions harder to resolve.",
          "One accountable partner — with visibility on active trips — reduces the follow-up load on mill logistics teams. See also our note on [planning industrial shipments](/blog/planning-industrial-shipments).",
        ],
      },
      {
        heading: "When demand exceeds owned fleet",
        paragraphs: [
          "Peak mill programs may need additional capacity. Through ZAFTYS, overflow can move via verified [TranZfort](/network) partners while commercial accountability stays with ZAFTYS Logistics. For vertical context, read [steel & metals logistics](/industries/steel-metals).",
        ],
      },
    ],
    cta: { label: "Steel & metals logistics", to: "/industries/steel-metals" },
  },
  {
    slug: "cement-plant-loading-windows",
    title: "Cement Plant Loading Windows & Detention: What Shippers Should Expect",
    seoTitle: "Cement Plant Loading Windows & Detention",
    seoDescription:
      "How plant loading windows, tipper fit, and detention affect cement logistics — and how disciplined dispatch reduces surprises for shippers in India.",
    category: "industries",
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-06",
    author: "ZAFTYS Operations",
    summary:
      "Detention and queue time can erase corridor planning. Align tipper capacity, plant windows, and documentation before the vehicle reaches the gate.",
    readMinutes: 7,
    heroImage: "/images/marketing/industry-cement.jpg",
    relatedSlugs: ["planning-industrial-shipments", "reduce-empty-return-trips", "steel-coil-transport-basics"],
    faqs: [
      {
        question: "What causes detention at cement plants?",
        answer:
          "Common causes include missed loading windows, mismatched tipper or bulk assets, incomplete documentation, and peak-hour queues that were not planned into the trip timeline.",
      },
      {
        question: "How can shippers reduce loading delays?",
        answer:
          "Share accurate volume and packaging details early, confirm plant slot rules, and work with a partner that plans tipper capacity around those windows rather than ad-hoc spot calls.",
      },
      {
        question: "Does ZAFTYS handle bagged and bulk cement?",
        answer:
          "Yes. Tipper and bulk programs support plant-to-project and plant-to-dealer lanes, with TranZfort overflow when seasonal or project demand exceeds owned fleet.",
      },
    ],
    sections: [
      {
        heading: "Plant windows are part of the freight design",
        paragraphs: [
          "Cement logistics is not only distance and rate. Plants run loading slots; miss the window and the vehicle waits — or returns empty while project sites wait for material.",
          "Treat the plant schedule as a hard constraint in planning, not a soft preference.",
        ],
      },
      {
        heading: "Match tipper capacity to the material",
        paragraphs: [
          "Bagged cement, clinker, and aggregates need different body and discharge approaches. Wrong asset fit creates slow loading, spills, and disputes at the plant.",
        ],
        bullets: [
          "Confirm material type and packaging before assignment",
          "Align tipper or bulk configuration to plant loading method",
          "Plan for weighbridge and gate documentation time",
          "Build realistic transit ETAs after the loading window, not before",
        ],
      },
      {
        heading: "Detention is a planning signal",
        paragraphs: [
          "Repeated detention on a lane usually means the plan is wrong — window, asset, or documentation. Fix the plan; do not only argue invoices after the fact.",
          "Central coordination through one logistics partner makes it easier to spot patterns across plants and projects. Pair this with [shipment planning basics](/blog/planning-industrial-shipments) before you book.",
        ],
      },
      {
        heading: "Visibility after the gate",
        paragraphs: [
          "Once the vehicle leaves the plant, shippers still need status without chasing drivers. Trip records and proof of delivery through [ZAFTYS TMS](/technology) keep project and plant teams aligned. Explore [cement logistics](/industries/cement) for how we run tipper and bulk programs.",
        ],
      },
    ],
    cta: { label: "Cement & construction logistics", to: "/industries/cement" },
  },
  {
    slug: "planning-industrial-shipments",
    title: "Planning Industrial Shipments: Body Type, Payload & Plant Windows",
    seoTitle: "Planning Industrial Shipments — Body & Payload",
    seoDescription:
      "A practical checklist for planning industrial FTL — body type, payload, plant windows, documentation, and when to reserve overflow capacity.",
    category: "operations",
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-06",
    author: "ZAFTYS Operations",
    summary:
      "Most industrial freight failures start before the vehicle moves. Align cargo, asset, plant timing, and paperwork in one plan.",
    readMinutes: 8,
    heroImage: "/images/services/home/transportation.jpg",
    relatedSlugs: ["reduce-empty-return-trips", "cement-plant-loading-windows", "tms-for-heavy-haul"],
    faqs: [
      {
        question: "What should be confirmed before requesting a truck?",
        answer:
          "Origin and destination, material type, approximate weight or volume, preferred body type, loading window, and any documentation or permit requirements.",
      },
      {
        question: "When should overflow capacity be planned?",
        answer:
          "When demand may exceed dedicated or owned fleet — seasonal peaks, shutdowns, or multi-plant surges. Plan early so verified partners can be staged without last-minute chaos.",
      },
      {
        question: "How does ZAFTYS help with shipment planning?",
        answer:
          "We match company fleet to the load profile, use TranZfort when extra capacity is needed, and keep trip visibility through ZAFTYS TMS once the shipment is active.",
      },
    ],
    sections: [
      {
        heading: "Define the cargo before you define the rate",
        paragraphs: [
          "Industrial freight spans tipper bulk, bagged cement, coils, tanks, and closed-body SKUs. A rate conversation without body type and payload is incomplete.",
          "Write down material, packaging, weight or volume, and any handling constraints. That list drives asset selection more than distance alone.",
        ],
      },
      {
        heading: "Lock plant and site windows early",
        paragraphs: [
          "Loading and unloading windows determine whether the trip is feasible. Share gate rules, cut-off times, and contact points with the logistics partner before vehicles are assigned.",
        ],
        bullets: [
          "Pickup window and plant or warehouse gate process",
          "Delivery window and site access constraints",
          "Weighbridge, security, or permit steps on the corridor",
          "Fallback if the window slips — who communicates and when",
        ],
      },
      {
        heading: "Documentation travels with the trip",
        paragraphs: [
          "LR, invoices, and proof of delivery should not be an afterthought. Teams that wait until delivery to organise documents create payment and dispute delays.",
          "Digital trip records reduce the “send the photo again” loop between dispatch and the customer. [ZAFTYS TMS](/technology) stores LR, invoices, and ePOD against the trip.",
        ],
      },
      {
        heading: "Plan for scale without adding vendors",
        paragraphs: [
          "When volume spikes, adding random transporters often increases coordination cost. A model that keeps commercial accountability with one partner — own fleet first, [verified network](/network) second — is easier to operate. See [industrial services](/services) for how FTL and overflow fit together, and [how to reduce empty return trips](/blog/reduce-empty-return-trips) on repeat corridors.",
        ],
      },
    ],
    cta: { label: "Explore industrial services", to: "/services" },
  },
  {
    slug: "reduce-empty-return-trips",
    title: "How To Reduce Empty Return Trips on Industrial FTL Lanes",
    seoTitle: "Reduce Empty Return Trips on FTL Lanes",
    seoDescription:
      "Practical ways to cut empty return miles on industrial FTL corridors — corridor planning, backhaul discipline, and capacity coordination without extra vendor chaos.",
    category: "operations",
    publishedAt: "2026-08-02",
    updatedAt: "2026-08-06",
    author: "ZAFTYS Operations",
    summary:
      "Empty returns waste fuel, time, and margin. Industrial programs improve when corridors, schedules, and overflow capacity are planned together.",
    readMinutes: 7,
    heroImage: "/images/services/home/tranzfort.jpg",
    relatedSlugs: ["planning-industrial-shipments", "tms-for-heavy-haul", "cement-plant-loading-windows"],
    faqs: [
      {
        question: "What causes empty return trips?",
        answer:
          "One-way demand, mismatched schedules, limited visibility of return loads, and fragmented transporters who cannot coordinate backhaul across customers.",
      },
      {
        question: "Can empty miles be eliminated completely?",
        answer:
          "Not always. The goal is disciplined reduction — better corridor pairing, realistic windows, and capacity planning — not unrealistic zero-empty promises.",
      },
      {
        question: "How does a network help with backhaul?",
        answer:
          "Verified capacity networks can surface return opportunities when owned fleet alone cannot fill both directions. Through ZAFTYS, TranZfort overflow still sits under one commercial relationship.",
      },
    ],
    sections: [
      {
        heading: "Empty miles are a planning problem",
        paragraphs: [
          "On industrial FTL lanes, empty returns often come from one-directional demand — plant to project, mill to fabricator — without a planned return move.",
          "Treating every trip as an isolated spot booking makes backhaul harder. Corridor-level planning creates options.",
        ],
      },
      {
        heading: "Build corridors, not only point rates",
        paragraphs: [
          "Map repeat origins and destinations. Where two lanes can share assets across the week, utilisation improves even if not every trip has a perfect backhaul.",
        ],
        bullets: [
          "Identify high-frequency industrial corridors",
          "Align loading windows so vehicles can turn for a return move",
          "Share forecast volume early enough to stage capacity",
          "Track empty kilometres as an operations metric, not only a fuel complaint",
        ],
      },
      {
        heading: "Visibility helps matching",
        paragraphs: [
          "When trip status is clear, dispatch can decide sooner whether a vehicle can take a return load or must reposition. Phone-only status slows those decisions.",
          "ZAFTYS TMS keeps active trips visible so planning and exception handling share the same picture. More on what matters in a [heavy-haul TMS](/blog/tms-for-heavy-haul).",
        ],
      },
      {
        heading: "Use overflow carefully",
        paragraphs: [
          "Extra capacity can fill gaps — or create more empty repositioning if partners are random. Prefer verified [TranZfort](/network) capacity coordinated under one account when own fleet cannot cover both directions. Start with [shipment planning](/blog/planning-industrial-shipments), then [talk to operations](/services) about your corridors.",
        ],
      },
    ],
    cta: { label: "Get a freight quote", whatsapp: true },
  },
];

export function listPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const found = post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p));
  return found.slice(0, limit);
}

export function formatPostDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function postModifiedAt(post: Pick<BlogPost, "publishedAt" | "updatedAt">): string {
  return post.updatedAt ?? post.publishedAt;
}

export function latestPosts(limit = 3): BlogPost[] {
  return listPosts().slice(0, limit);
}
