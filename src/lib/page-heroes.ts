/** Hero background images  -  one per marketing page (homepage excluded) */
import heroAbout from "@/assets/hero-about.jpg";
import heroCareers from "@/assets/hero-careers.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import heroFleet from "@/assets/hero-fleet.jpg";
import heroIndustries from "@/assets/hero-industries.jpg";
import heroNetwork from "@/assets/hero-network.jpg";
import heroPartner from "@/assets/hero-partner.jpg";
import heroResources from "@/assets/hero-resources.jpg";
import heroServices from "@/assets/hero-services.jpg";
import heroTechnology from "@/assets/hero-technology.jpg";

export const pageHeroImages = {
  about: { src: heroAbout, alt: "ZAFTYS warehouse and logistics operations" },
  careers: { src: heroCareers, alt: "ZAFTYS team collaboration" },
  contact: { src: heroContact, alt: "Business team planning logistics strategy" },
  fleet: { src: heroFleet, alt: "ZAFTYS heavy-haul fleet on industrial corridor" },
  industries: { src: heroIndustries, alt: "Industrial supply chain operations" },
  network: { src: heroNetwork, alt: "Verified transport partners moving freight on an industrial highway corridor" },
  partner: { src: heroPartner, alt: "Verified transport partners and fleet operators" },
  resources: { src: heroResources, alt: "Logistics knowledge and planning resources" },
  services: { src: heroServices, alt: "Industrial freight and trucking services" },
  technology: { src: heroTechnology, alt: "ZAFTYS TSM transport management platform" },
} as const;
