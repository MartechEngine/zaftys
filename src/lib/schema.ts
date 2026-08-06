/** JSON-LD structured data — site-wide helpers */

import { companyAddress, legalEntity } from "@/lib/constants";

const BASE = "https://zaftys.com";
const ORG_ID = `${BASE}/#organization`;

const organizationRef = { "@id": ORG_ID };

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: legalEntity.name,
  url: BASE,
  logo: `${BASE}/og-image.png`,
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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: legalEntity.name,
  url: BASE,
  publisher: organizationRef,
  inLanguage: "en-IN",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE}/#localbusiness`,
  name: legalEntity.name,
  image: `${BASE}/og-image.png`,
  url: BASE,
  telephone: "+91-927-092-3581",
  email: "info@zaftys.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: companyAddress.streetAddress,
    addressLocality: companyAddress.locality,
    addressRegion: companyAddress.region,
    postalCode: companyAddress.postalCode,
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  parentOrganization: organizationRef,
};

export const logisticsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LogisticsService",
  name: "ZAFTYS Logistics",
  url: BASE,
  image: `${BASE}/og-image.png`,
  description:
    "Industrial freight transport with company-operated fleet, ZAFTYS TMS visibility, and TranZfort network capacity across India.",
  provider: organizationRef,
  areaServed: { "@type": "Country", name: "India" },
  serviceType: "Heavy freight and industrial trucking",
};

export const truckingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Industrial trucking and logistics",
  provider: organizationRef,
  areaServed: { "@type": "Country", name: "India" },
  description:
    "FTL, mining logistics, contract fleet, and overflow capacity on industrial corridors across India.",
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZAFTYS TMS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    description: "Contact ZAFTYS for platform licensing and demos",
  },
  description:
    "Transport and fleet management platform for dispatch, GPS tracking, ePOD, fleet records, and client visibility.",
  provider: organizationRef,
  url: "https://app.zaftys.com",
};

export const resourcesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ZAFTYS Knowledge Center",
  description: "Logistics operations guides, supply chain insights, and transport technology resources.",
  publisher: organizationRef,
  url: `${BASE}/resources`,
};

export function breadcrumbSchema(
  items: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqPageSchema(
  faqs: readonly { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
