/** Locked homepage copy - sections map to src/components/home/* */
/** No em dash, en dash, or spaced hyphen used as a dash. */

export const homeCopy = {
  hero: {
    badge: "Technology-enabled Transportation & Logistics",
    h1: ["Heavy Freight.", "Reliable Capacity.", "Managed by Technology."],
    lead:
      "ZAFTYS provides 3PL transportation and contract logistics for industrial and commercial freight in India.",
    tagline: "Real Trucks. Real Logistics. Real Technology.",
    heroImageAlt: "ZAFTYS commercial trucks for heavy freight transport across India",
  },
  operatingModel: {
    eyebrow: "One operational desk",
    h2: "We move freight. We run the desk.",
    lead:
      "One commercial relationship. Owned capacity and network capacity stay labeled. Own vs Network never blended.",
    supporting:
      "Not a broker that vanishes after booking. Not software without trucks.",
    tagline: "A named desk on the trip - from allotment through POD.",
    flowLabel: "How capacity comes together on your lane",
  },
  industries: {
    eyebrow: "Who we serve",
    h2: "Industries we haul for",
    lead: "That operating model runs across heavy industrial verticals. Different cargo and truck class, same desk.",
  },
  platform: {
    eyebrow: "Platform",
    h2: "The TMS we dispatch on every day",
    lead: "ZAFTYS TMS plans, dispatches, tracks, and closes out transportation. Platform is how the desk runs contracted trips. Network capacity lives next door.",
    tms: {
      badge: "ZAFTYS TMS · live",
      h3: "Run transportation from one system.",
      lead: "Plan, dispatch, track, and close out trips. The system we use at app.zaftys.com on our own freight every day.",
    },
  },
  network: {
    eyebrow: "Network",
    h2: "ZAFTYS operates. TranZfort connects.",
    lead: "Owned fleet when we have the truck. Verified partners and TranZfort when the lane needs more. Labels stay honest.",
    tranzfort: {
      badge: "TranZfort · marketplace",
      h3: "Post or find a load for free.",
      lead: "Digital freight matching on verified corridors. Free to post and find. Broker fee to truckers on booked loads. Trips contracted through ZAFTYS stay on GST billing.",
    },
  },
  insights: {
    eyebrow: "Intelligence",
    h2: "Insights from operations",
    lead: "Analytics and research built on freight we move. Capabilities labeled Available, Beta, or Research.",
    intelligence: {
      title: "Logistics Intelligence",
      description: "Analytics, freight rates, market intelligence, and supply chain AI",
    },
    reports: {
      title: "Market Reports",
      description: "Institutional research from ZAFTYS Analytics",
    },
  },
  finalCta: {
    h2: "Ready to move your freight?",
    lead: "Request transportation capacity first. Explore the Network or ZAFTYS TMS when you need the next layer.",
  },
} as const;

export const homeQuoteEmail = {
  label: "Request Transportation",
  subject: "Freight quote request",
  body: "Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n",
  bodyShort: "Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\n",
} as const;
