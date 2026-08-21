/**
 * /fleet page copy - Own Fleet (company assets) + Network Fleet (full catalog).
 * No invented fleet counts or corridor metrics.
 */

export const ownedFleetAssets = [
  {
    id: "side-wall-trailer",
    title: "Side wall trailer",
    imageId: "side-wall-trailer",
    detail: "Side-wall trailer body for corridor haulage",
    specs: ["Trailer", "Side wall"],
  },
  {
    id: "container-32",
    title: "32 ft container",
    imageId: "container",
    detail: "Single axle (SXL) and multi axle (MXL) sealed bodies",
    specs: ["32 ft SXL", "32 ft MXL"],
  },
  {
    id: "flatbed-40",
    title: "40 ft flat bed trailer",
    imageId: "flatbed",
    detail: "40 ft flat bed trailer for long product and plant loads",
    specs: ["40 ft", "Flat bed"],
  },
  {
    id: "open-body-30-35",
    title: "30T / 35T open body",
    imageId: "open-body",
    detail: "14-wheeler and 16-wheeler open body trucks - 30T and 35T class",
    specs: ["14W", "16W", "30T", "35T", "Open body"],
  },
] as const;

export const fleetCargoMatch = [
  { cargo: "Sealed FTL / plant boxes", truck: "32 ft SXL · 32 ft MXL" },
  { cargo: "Long product / plant loads", truck: "40 ft flat bed · side wall trailer" },
  { cargo: "Bagged / bulk solids", truck: "30T / 35T · 14W / 16W open body" },
] as const;

export const fleetOpsPoints = [
  { title: "Dispatch readiness", desc: "Inspection and allotment before the gate." },
  { title: "Maintenance discipline", desc: "Planned upkeep so the class stays available." },
  { title: "Site safety", desc: "Loading, papers, and close-out on one desk." },
  { title: "TMS on contracted trips", desc: "Same stack we dispatch on every day." },
] as const;

export const fleetPageCopy = {
  hero: {
    badge: "Fleet capacity",
    h1: "Own fleet. Network fleet. Same desk.",
    lead:
      "Hire a body class for the corridor. We tell you whether the truck is company-operated or verified network capacity - never silently mixed.",
  },
  own: {
    eyebrow: "Own Fleet",
    h2: "Company trucks we operate",
    lead:
      "Side wall trailer, 32 ft SXL / MXL, 40 ft flat bed, and 30T / 35T open body (14W / 16W) - drivers, readiness, and dispatch sit with ZAFTYS. Contracted trips can report through ZAFTYS TMS.",
  },
  ops: {
    h2: "How we run own fleet",
    lead: "Ownership means more than a body type - readiness, papers, and close-out sit with us.",
  },
  network: {
    eyebrow: "Network Fleet",
    h2: "All commercial types via verified partners",
    lead:
      "When own capacity is short, Tranzfort supplies the body class you need - LCV through ODC. Network trucks are labeled on the trip, never sold as company fleet.",
    points: [
      { title: "Full type coverage", detail: "Every TranZfort catalog class available as overflow" },
      { title: "Labeled on the trip", detail: "Shipper sees network capacity, not fake owned count" },
      { title: "Same commercial desk", detail: "GST path when the trip is contracted through ZAFTYS" },
    ],
    catalogLead:
      "Same picker language as TranZfort. Use when the indent needs a class beyond the four own-fleet assets.",
  },
  finalCta: {
    h2: "Need capacity on a lane?",
    lead: "Tell us corridor, cargo, and class - we’ll confirm own fleet or labeled network.",
  },
} as const;
