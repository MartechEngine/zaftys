/**
 * Locked visible hero H1s and leads.
 * Meta titles stay in page-seo.ts. Do not put "ZAFTYS Logistics" in an H1.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */
export const pageHeroCopy = {
  logistics: {
    badge: "Transportation & Logistics",
    h1: "Reliable transportation capacity for demanding freight.",
    lead: "ZAFTYS executes 3PL and contract transportation for industrial and commercial freight. Owned heavy vehicles, contract programs, verified partner overflow, and the TMS we dispatch on - one desk.",
  }, // Body sections: src/lib/logistics-hub-copy.ts
  networkHub: {
    badge: "Transportation Network",
    h1: "ZAFTYS operates. Tranzfort connects.",
    lead: "Owned fleet when we have the truck. Verified partner capacity when the lane needs more. Tranzfort extends the network digitally.",
  },
  technologyHub: {
    badge: "ZAFTYS TMS · live",
    h1: "The TMS we dispatch on every day.",
    lead: "Plan, dispatch, track, and close out transportation in one system. Shippers use the portal for tracking and ePOD. Fleet operators use the same stack for vehicles, drivers, and trip close-out. Login at app.zaftys.com.",
  },
  intelligenceHub: {
    badge: "Logistics Intelligence",
    h1: "Decisions from the trips you actually run.",
    lead: "Operations analytics, exception views, lane rate context, market reports, and desk AI research on top of ZAFTYS TMS. Capabilities labeled Available, Beta, or Research.",
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
      "Hire a body class for the corridor. We tell you whether the truck is company-operated or verified network capacity - never silently mixed.",
  },
  network: {
    badge: "Marketplace · live",
    h1: "TranZfort. Post or find a load for free.",
    lead: "Shippers post loads. Truckers book them. Matching is AI-powered on corridor, vehicle type, and timing. Listing and search are free. We charge a broker fee to truckers on booked loads. If the trip is contracted through ZAFTYS, billing stays GST-compliant on our side.",
  },
  technology: {
    badge: "ZAFTYS TMS · live",
    h1: "The TMS we dispatch on every day.",
    lead: "Plan, dispatch, track, and close out transportation in one system. Shippers use the portal for tracking and ePOD. Fleet operators use the same stack for vehicles, drivers, and trip close-out. Login at app.zaftys.com.",
  },
  industries: {
    badge: "Built for industrial freight",
    h1: "Plant windows. Axle reality. Industry desks.",
    lead:
      "We haul for verticals where the wrong body class or a missed gate costs more than the rate. Transportation first - not a three-product brochure per industry.",
  },
  partner: {
    badge: "Fleet partners",
    h1: "Put your trucks on the ZAFTYS Network.",
    lead: "Join as labeled network capacity. Find loads on corridors you already run via TranZfort. Search is free. Broker fee on booked loads. Verification is not optional: papers, insurance, and a real operating pattern.",
  },
  about: {
    badge: "About ZAFTYS",
    h1: "One desk for industrial freight across India.",
    lead:
      "Family corridor experience, a formal company since 2024. Own trucks when we have the right vehicle, ZAFTYS TMS on every trip we run, and TranZfort when you need more capacity - always labeled, never blended.",
  },
  contact: {
    badge: "Contact",
    h1: "Freight quote, TMS demo, or Network partner.",
    lead: "Shippers: WhatsApp or the form for capacity. TMS walkthrough by email or form. Fleet owners: partner registration or TranZfort. Desk in Amravati, Maharashtra.",
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
