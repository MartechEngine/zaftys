/** Locked homepage copy — sections map to src/components/home/* */

export const homeCopy = {
  hero: {
    badge: "Technology-enabled Transportation & Logistics",
    h1: ["Heavy Freight.", "Reliable Capacity.", "Managed by Technology."],
    lead:
      "ZAFTYS provides 3PL transportation and contract logistics for industrial and commercial freight, combining owned heavy-vehicle capacity with a verified transportation network and modern logistics technology.",
    tagline: "Real Trucks. Real Logistics. Real Technology.",
    heroImageAlt: "ZAFTYS commercial trucks for heavy freight transport across India",
  },
  operatingModel: {
    eyebrow: "One operational desk",
    h2: "We move freight. We run the desk.",
    lead:
      "ZAFTYS is a transportation operator with owned heavy-vehicle capacity, contract logistics programs, and a verified partner network, managed on one desk with TMS on trips we run.",
    supporting:
      "Not a broker that vanishes after booking. Not software without trucks.",
    tagline: "Real trucks on the road. Real logistics at the desk. Real technology on contracted trips.",
    flowLabel: "How capacity comes together on your lane",
  },
  industries: {
    eyebrow: "Who we serve",
    h2: "Industries we haul for",
    lead: "That operating model and platform run across heavy industrial verticals. Different cargo and truck class, same desk.",
  },
  platform: {
    eyebrow: "Platform behind the freight",
    h2: "The platform behind the freight",
    lead: "TMS and Tranzfort are how we dispatch owned fleet, manage contract programs, and extend partner capacity on the desk above.",
    tms: {
      badge: "ZAFTYS TMS",
      h3: "Run transportation from one platform.",
      lead: "Plan, dispatch, track, and close out trips. The system we use at app.zaftys.com on our own freight every day.",
    },
    tranzfort: {
      badge: "Digital Freight Network",
      h3: "ZAFTYS operates. Tranzfort connects.",
      lead: "Post or find loads on verified corridors. Trips contracted through ZAFTYS stay on GST billing.",
    },
  },
  insights: {
    eyebrow: "Intelligence",
    h2: "Insights from operations",
    lead: "Analytics and research built on freight we move. AI capabilities labeled by availability.",
    intelligence: {
      title: "Logistics Intelligence",
      description: "Analytics, freight rates, and supply chain AI",
    },
    reports: {
      title: "Market Reports",
      description: "Institutional research from ZAFTYS Analytics",
    },
  },
  finalCta: {
    h2: "Ready to move your freight?",
    lead: "Request transportation capacity, book a TMS demo, or join the Tranzfort network.",
  },
} as const;

export const homeQuoteEmail = {
  label: "Request Transportation",
  subject: "Freight quote request",
  body: "Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n",
  bodyShort: "Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\n",
} as const;
