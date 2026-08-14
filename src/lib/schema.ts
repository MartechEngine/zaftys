/** JSON-LD structured data  -  site-wide helpers */

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
  logo: `${BASE}/logo-header.png`,
  sameAs: [
    "https://www.linkedin.com/company/zaftys",
    "https://www.tranzfort.com",
    "https://app.zaftys.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-927-092-3581",
    email: "info@zaftys.com",
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
  image: `${BASE}/logo-header.png`,
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
    description: "Contact ZAFTYS Logistics for platform licensing and demos",
  },
  description:
    "Transport and fleet management platform for dispatch, GPS tracking, ePOD, fleet records, and client visibility.",
  provider: organizationRef,
  url: "https://app.zaftys.com",
};

export const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ZAFTYS Blog",
  description:
    "Practical logistics guides from corridor operations  -  industrial FTL, plant windows, steel and cement freight, and TMS.",
  publisher: organizationRef,
  url: `${BASE}/blog`,
};

export const resourcesHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ZAFTYS Logistics Resources",
  description:
    "Blog guides and logistics & supply chain market reports from ZAFTYS Logistics.",
  publisher: organizationRef,
  url: `${BASE}/resources`,
};

export const reportsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ZAFTYS Analytics Market Reports",
  description:
    "Institutional market research on the global logistics market and digital freight matching platforms — size, forecast, segments, and competitive outlook.",
  publisher: organizationRef,
  url: `${BASE}/reports`,
};

/** @deprecated Prefer blogPageSchema */
export const resourcesPageSchema = resourcesHubSchema;

export function marketReportSchema(report: {
  slug: string;
  title: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt?: string;
  pdfPath: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    name: report.title,
    description: report.seoDescription,
    datePublished: report.publishedAt,
    dateModified: report.updatedAt ?? report.publishedAt,
    author: {
      "@type": "Organization",
      name: legalEntity.name,
      url: BASE,
    },
    publisher: organizationRef,
    url: `${BASE}/reports/${report.slug}`,
    encoding: {
      "@type": "MediaObject",
      contentUrl: `${BASE}${report.pdfPath}`,
      encodingFormat: "application/pdf",
    },
  };
}

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  heroImage?: string;
}): Record<string, unknown> {
  const image = post.heroImage
    ? post.heroImage.startsWith("http")
      ? post.heroImage
      : `${BASE}${post.heroImage}`
    : `${BASE}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: legalEntity.name,
      url: BASE,
    },
    publisher: organizationRef,
    image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${post.slug}`,
    },
    url: `${BASE}/blog/${post.slug}`,
  };
}

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
  const stripMdLinks = (text: string) =>
    text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMdLinks(faq.answer),
      },
    })),
  };
}
