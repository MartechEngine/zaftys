export type ResourceCategory = {
  id: string;
  title: string;
  description: string;
  topics: readonly string[];
};

export type ResourceItem = {
  id: string;
  title: string;
  type: "Article" | "Guide" | "Checklist" | "Webinar";
  categoryId: string;
  summary: string;
  status: "available" | "coming-soon";
};

export const resourceCategories: readonly ResourceCategory[] = [
  {
    id: "operations",
    title: "Logistics Operations",
    description: "Practical guidance for dispatch teams, logistics managers, and transport coordinators.",
    topics: ["Shipment planning", "Fleet utilization", "Dispatch management", "Documentation"],
  },
  {
    id: "supply-chain",
    title: "Supply Chain Management",
    description: "How transportation influences production, procurement, and customer satisfaction.",
    topics: ["Network planning", "Vendor collaboration", "Risk management", "Distribution optimization"],
  },
  {
    id: "technology",
    title: "Transport Technology",
    description: "Digital transformation in logistics  -  TMS, automation, and operational analytics.",
    topics: ["Transport management systems", "Digital documentation", "Fleet technology", "Integration"],
  },
  {
    id: "fleet",
    title: "Fleet Management",
    description: "Resources for fleet owners and transport businesses scaling professionally.",
    topics: ["Vehicle utilization", "Preventive maintenance", "Compliance", "Performance monitoring"],
  },
  {
    id: "industry",
    title: "Industry Insights",
    description: "Operational trends across manufacturing, mining, steel, cement, and distribution.",
    topics: ["Manufacturing", "Mining", "Steel", "Cement", "FMCG"],
  },
  {
    id: "compliance",
    title: "Compliance & Regulations",
    description: "Documentation, governance, and standards that affect transport operations.",
    topics: ["Vehicle documentation", "Digital records", "Operational governance", "Risk reduction"],
  },
];

export const resourceLibrary: readonly ResourceItem[] = [
  {
    id: "empty-miles",
    title: "How To Reduce Empty Return Trips",
    type: "Article",
    categoryId: "operations",
    summary: "Corridor planning and backhaul discipline for industrial FTL programs.",
    status: "coming-soon",
  },
  {
    id: "fleet-utilization",
    title: "Improving Fleet Utilization",
    type: "Article",
    categoryId: "fleet",
    summary: "Measure and improve asset productivity without sacrificing service quality.",
    status: "coming-soon",
  },
  {
    id: "industrial-shipments",
    title: "Planning Industrial Shipments",
    type: "Guide",
    categoryId: "operations",
    summary: "Align body type, payload, plant windows, and documentation before dispatch.",
    status: "coming-soon",
  },
  {
    id: "dispatch-delays",
    title: "Reducing Dispatch Delays",
    type: "Article",
    categoryId: "operations",
    summary: "Structured workflows that keep loads moving on repeat corridors.",
    status: "coming-soon",
  },
  {
    id: "tsm-buyers-guide",
    title: "Transport Management System Buyer's Guide",
    type: "Guide",
    categoryId: "technology",
    summary: "Evaluate TMS platforms built for real heavy-freight operations.",
    status: "coming-soon",
  },
  {
    id: "dispatch-checklist",
    title: "Vehicle Dispatch Checklist",
    type: "Checklist",
    categoryId: "operations",
    summary: "Standardize pre-trip verification for industrial lanes.",
    status: "coming-soon",
  },
  {
    id: "fleet-webinar",
    title: "Improving Fleet Productivity",
    type: "Webinar",
    categoryId: "fleet",
    summary: "Operational best practices from corridor-scale transport programs.",
    status: "coming-soon",
  },
  {
    id: "logistics-partner",
    title: "Choosing The Right Logistics Partner",
    type: "Article",
    categoryId: "supply-chain",
    summary: "Evaluation criteria for industrial shippers and procurement teams.",
    status: "coming-soon",
  },
];

export function resourcesByCategory(categoryId: string): ResourceItem[] {
  return resourceLibrary.filter((r) => r.categoryId === categoryId);
}
