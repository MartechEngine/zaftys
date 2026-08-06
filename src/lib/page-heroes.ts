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
  about: { src: heroAbout, alt: "ZAFTYS industrial logistics heritage — heavy freight operations in India" },
  careers: { src: heroCareers, alt: "ZAFTYS logistics and technology careers in Amravati" },
  contact: { src: heroContact, alt: "Contact ZAFTYS for industrial freight quotes in India" },
  fleet: { src: heroFleet, alt: "ZAFTYS company-operated heavy-haul fleet on an industrial corridor" },
  industries: { src: heroIndustries, alt: "Cement, steel, mining and bulk freight logistics across India" },
  network: { src: heroNetwork, alt: "TranZfort verified transport partners on an industrial highway corridor" },
  partner: { src: heroPartner, alt: "Fleet partners joining TranZfort for industrial loads through ZAFTYS" },
  resources: { src: heroResources, alt: "ZAFTYS knowledge center for logistics and supply chain resources" },
  services: { src: heroServices, alt: "FTL and heavy-haul industrial trucking services across India" },
  technology: { src: heroTechnology, alt: "ZAFTYS TMS transport management platform for industrial freight" },
} as const;
