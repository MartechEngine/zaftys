/**
 * Hero alt text only. Import the JPG in each page so Vite does not
 * bundle every hero into a shared chunk (one image per route).
 */
export const pageHeroAlts = {
  about: "ZAFTYS operations in Amravati: company fleet, TMS, and TranZfort marketplace",
  careers: "ZAFTYS logistics and TMS careers in Amravati",
  contact: "Contact ZAFTYS for a freight quote, TMS demo, or TranZfort",
  fleet: "ZAFTYS company-operated commercial trucks on an Indian corridor",
  industries: "Commercial freight from cement plants to retail distribution in India",
  network: "TranZfort freight marketplace: post a load or find a truck",
  partner: "Fleet owners joining TranZfort to find loads",
  resources: "ZAFTYS blog guides and market reports",
  reports: "ZAFTYS Analytics market reports on logistics and digital freight matching",
  services: "Commercial truck transport from LCV to bulker across India",
  technology: "ZAFTYS TMS dispatch and tracking for shippers and fleet operators",
} as const;
