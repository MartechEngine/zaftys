/** Slim blog teasers for homepage — avoids importing full post bodies. */

export type BlogCategory = "operations" | "industries" | "technology";

export type BlogTeaser = {
  slug: string;
  title: string;
  category: BlogCategory;
  publishedAt: string;
  summary: string;
};

export const blogCategoryLabels: Record<BlogCategory, string> = {
  operations: "Operations",
  industries: "Industries",
  technology: "Technology",
};

/** Newest-first teasers (keep in sync with blog-data). */
export const homeBlogTeasers: readonly BlogTeaser[] = [
  {
    slug: "tms-for-heavy-haul",
    title: "TMS for Heavy-Haul Freight: What Matters Beyond GPS Tracking",
    category: "technology",
    publishedAt: "2026-08-06",
    summary:
      "GPS alone is not a transport management system. For heavy-haul freight, the platform must support dispatch discipline, documentation, and plant-window reality.",
  },
  {
    slug: "steel-coil-transport-basics",
    title: "Steel Coil Transport Basics: Axle Discipline & Weighbridge Reality",
    category: "industries",
    publishedAt: "2026-08-05",
    summary:
      "Coils and plates fail quietly when bed type, strapping, or axle planning is wrong. This guide covers the basics shippers and mill teams should align before dispatch.",
  },
  {
    slug: "cement-plant-loading-windows",
    title: "Cement Plant Loading Windows & Detention: What Shippers Should Expect",
    category: "operations",
    publishedAt: "2026-08-04",
    summary:
      "Detention and queue time can erase corridor planning. Align tipper capacity, plant windows, and documentation before the vehicle reaches the gate.",
  },
];

export function formatPostDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
