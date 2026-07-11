/** JSON-LD structured data  -  site-wide helpers */

import { companyAddress, legalEntity } from "@/lib/constants";

const BASE = "https://zaftys.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: legalEntity.name,
  url: BASE,
  logo: `${BASE}/og-image.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-927-092-3581",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: companyAddress.streetAddress,
    addressLocality: companyAddress.locality,
    addressRegion: companyAddress.region,
    postalCode: companyAddress.postalCode,
    addressCountry: "IN",
  },
};

export const logisticsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LogisticsService",
  name: "ZAFTYS Logistics",
  url: BASE,
  image: `${BASE}/og-image.svg`,
  description:
    "Industrial freight transport with company-operated fleet, ZAFTYS TSM visibility, and TranZfort network capacity across India.",
  provider: organizationSchema,
  areaServed: { "@type": "Country", name: "India" },
  serviceType: "Heavy freight and industrial trucking",
};

export const truckingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Industrial trucking and logistics",
  provider: organizationSchema,
  areaServed: { "@type": "Country", name: "India" },
  description:
    "FTL, mining logistics, contract fleet, and overflow capacity on industrial corridors across India.",
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZAFTYS TSM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Contact ZAFTYS for platform licensing and demos",
  },
  description:
    "Transport and fleet management platform for dispatch, GPS tracking, ePOD, fleet records, and client visibility.",
  provider: organizationSchema,
  url: "https://app.zaftys.com",
};

export const resourcesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ZAFTYS Knowledge Center",
  description: "Logistics operations guides, supply chain insights, and transport technology resources.",
  publisher: organizationSchema,
  url: `${BASE}/resources`,
};
