/** Canonical public paths  -  keep menu labels, sitemap, and redirects in sync. */

export const paths = {
  tms: "/zaftys-tms",
  network: "/tranzfort-network",
  reports: "/reports",
} as const;

export function reportPath(slug: string): string {
  return `${paths.reports}/${slug}`;
}

export function reportReadPath(slug: string): string {
  return `${paths.reports}/${slug}/read`;
}
