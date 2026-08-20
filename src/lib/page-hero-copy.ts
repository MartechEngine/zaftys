/**
 * Locked visible hero H1s and leads.
 * Meta titles stay in page-seo.ts. Do not put "ZAFTYS Logistics" in an H1.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */
export const pageHeroCopy = {
  logistics: {
    badge: "Transportation & Logistics",
    h1: "Reliable transportation capacity for demanding freight.",
    lead: "ZAFTYS executes 3PL and contract transportation for industrial and commercial freight. Owned heavy vehicles, contract programs, verified partner overflow, and the TMS we dispatch on — one desk.",
  }, // Body sections: src/lib/logistics-hub-copy.ts
  networkHub: {
    badge: "Transportation Network",
    h1: "ZAFTYS operates. Tranzfort connects.",
    lead: "Owned fleet when we have the truck. Verified partner capacity when the lane needs more. Tranzfort extends the network digitally.",
  },
  technologyHub: {
    badge: "Transportation Technology",
    h1: "Run your transportation operation from one platform.",
    lead: "ZAFTYS TMS brings planning, dispatch, tracking, delivery documentation, and analytics into one system we use on our own trips every day.",
  },
  intelligenceHub: {
    badge: "Logistics Intelligence",
    h1: "Turn transportation data into decisions.",
    lead: "Analytics, freight intelligence, market research, and AI built around real logistics operations. Capabilities labeled by availability.",
  },
  services: {
    badge: "Commercial transport",
    h1: "LCV to bulker. The class that fits the cargo.",
    lead: "Pick the vehicle class that matches the cargo. We run company trucks on those lanes and use TranZfort when you need more capacity. Contracted trips can sit in ZAFTYS TMS.",
  },
  fleet: {
    badge: "Fleet capacity",
    h1: "Own fleet. Network fleet. Same desk.",
    lead:
      "Hire a body class for the corridor. We tell you whether the truck is company-operated or verified network capacity — never silently mixed.",
  },
  network: {
    badge: "Marketplace · live",
    h1: "TranZfort. Post or find a load for free.",
    lead: "Shippers post loads. Truckers book them. Matching is AI-powered on corridor, vehicle type, and timing. Listing and search are free. We charge a broker fee to truckers on booked loads. If the trip is contracted through ZAFTYS, billing stays GST-compliant on our side.",
  },
  technology: {
    badge: "TMS · live",
    h1: "The TMS we dispatch on every day.",
    lead: "Shippers use the portal for tracking and e-POD. Fleet operators use the same stack for vehicles, drivers, and trip close-out. Login at app.zaftys.com.",
  },
  industries: {
    badge: "Built for industrial freight",
    h1: "Plant windows. Axle reality. Industry desks.",
    lead:
      "We haul for verticals where the wrong body class or a missed gate costs more than the rate. Transportation first — not a three-product brochure per industry.",
  },
  partner: {
    badge: "Fleet owners",
    h1: "Put your trucks on TranZfort.",
    lead: "Find loads on corridors you already run. Search is free. We charge a broker fee on booked loads. Verification is not optional: papers, insurance, and a real operating pattern.",
  },
  about: {
    badge: "Our story",
    h1: "Trucks first. Then TMS. Then the marketplace.",
    lead: "Three generations on Indian corridors, based in Amravati. GST-compliant billing. We still move cement and steel. We also move distribution freight, tanker cargo, and container loads, and we sell the system we use.",
  },
  contact: {
    badge: "Contact",
    h1: "Quote, demo, or marketplace. Same team.",
    lead: "Freight quotes on WhatsApp. TMS walkthrough by email or form. Fleet owners: partner form or TranZfort download. Amravati, Maharashtra.",
  },
  careers: {
    badge: "Join the team",
    h1: "Work on the yard, the desk, or the product.",
    lead: "Drivers, dispatch, and software in Amravati and on the network. The work is commercial freight, TMS, and TranZfort. Not a brochure job board.",
  },
  blog: {
    badge: "Blog",
    h1: "What we learned moving freight.",
    lead: "Deep research and operations notes from ZAFTYS: container trucking, TMS, plant TAT, axle and GVW, and how backhaul and capacity networks cut empty kilometres.",
  },
  resources: {
    badge: "Resources",
    h1: "Guides from the desk. Reports from research.",
    lead: "Operations writing on the blog. Institutional PDFs from ZAFTYS Analytics on logistics and digital freight matching.",
  },
  reports: {
    badge: "Market reports",
    h1: "Research on logistics and digital freight.",
    lead: "Open a report for the sneak peek, then unlock the full PDF with your company email. Institutional research from ZAFTYS Analytics.",
  },
} as const;
