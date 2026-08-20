/**
 * /industries hub — Design B (locked): industrial lead bands + full index.
 * Logistics-first; no three-product framing.
 */

export const industriesHubFeaturedSlugs = [
  "cement",
  "container-transport",
  "coal-mining",
  "steel-metals",
] as const;

/** Full industry index order on /industries */
export const industriesHubIndexOrder = [
  "cement",
  "container-transport",
  "coal-mining",
  "steel-metals",
  "chemicals",
  "manufacturing",
  "fmcg",
  "industrial-logistics",
] as const;

export const industriesHubCopy = {
  hero: {
    badge: "Built for industrial freight",
    h1: "Plant windows. Axle reality. Industry desks.",
    lead:
      "Cement, port–city containers, mining products, steel coils, manufacturing, and FMCG — body class and gate timing first. Transportation desk, not a three-product brochure per vertical.",
  },
  all: {
    h2: "All industries",
    lead:
      "Eight vertical desks. Port & container road sits under cement — port↔city and city↔port by road.",
  },
  finalCta: {
    h2: "Get a quote for your vertical",
    lead: "Product, corridor, and trips per week — same desk as Transportation.",
  },
} as const;