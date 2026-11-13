/** JSON-LD structured data  -  site-wide helpers */

import {
  COMPANY_EMAIL,
  COMPANY_PHONE_DISPLAY,
  companyAddress,
  externalLinks,
  organizationSameAs,
} from "@/lib/constants";
import {
  gbpBusinessDescription,
  gbpServiceCities,
  gbpServiceStates,
  type CorridorDef,
} from "@/lib/corridors-data";
import { stripMarkdownLinks } from "@/lib/markdown-links";

const BASE = "https://zaftys.com";
const ORG_ID = `${BASE}/#organization`;
const LOCAL_ID = `${BASE}/#localbusiness`;

const organizationRef = { "@id": ORG_ID };

/** GBP-aligned geo entities for Organization / LocalBusiness / LogisticsService. */
export const schemaAreaServed = [
  { "@type": "Country", name: "India" },
  ...gbpServiceStates.map((name) => ({ "@type": "State", name })),
  ...gbpServiceCities.map((name) => ({ "@type": "City", name })),
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "ZAFTYS",
  legalName: "ZAFTYS Logistics",
  alternateName: ["ZAFTYS Logistics", "Zaftys"],
  url: BASE,
  logo: `${BASE}/logo-header.png`,
  description: gbpBusinessDescription,
  sameAs: [...organizationSameAs],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY_PHONE_DISPLAY,
    email: COMPANY_EMAIL,
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
  areaServed: schemaAreaServed,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZAFTYS",
  alternateName: ["ZAFTYS Logistics", "Zaftys"],
  url: BASE,
  publisher: organizationRef,
  inLanguage: "en-IN",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": LOCAL_ID,
  name: "ZAFTYS",
  legalName: "ZAFTYS Logistics",
  alternateName: ["ZAFTYS Logistics", "Zaftys"],
  image: `${BASE}/logo-header.png`,
  url: BASE,
  telephone: COMPANY_PHONE_DISPLAY,
  email: COMPANY_EMAIL,
  description: gbpBusinessDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyAddress.streetAddress,
    addressLocality: companyAddress.locality,
    addressRegion: companyAddress.region,
    postalCode: companyAddress.postalCode,
    addressCountry: "IN",
  },
  areaServed: schemaAreaServed,
  knowsAbout: [
    "Logistics service",
    "Transportation service",
    "Freight forwarding agency",
    "Trucking company",
    "Full Truckload (FTL) Pan-India Transport",
    "Contract Logistics & Dedicated Fleet Services",
    "JNPT / Nhava Sheva Port Haulage & Container Transport",
    "Mundra Port EXIM Freight & Dedicated Trailer Services",
  ],
  parentOrganization: organizationRef,
};

export const logisticsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LogisticsService",
  name: "ZAFTYS",
  alternateName: ["ZAFTYS Logistics", "Zaftys"],
  url: BASE,
  image: `${BASE}/og-image.png`,
  description: gbpBusinessDescription,
  provider: organizationRef,
  areaServed: schemaAreaServed,
  serviceType:
    "Commercial freight transport, FTL, contract logistics, TMS software, and freight marketplace",
};

export const truckingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Commercial trucking and logistics",
  provider: organizationRef,
  areaServed: schemaAreaServed,
  description:
    "FTL and contract transport across LCV, open truck, trailer, container, bulker, tanker, tipper, reefer, parcel, and ODC, plus TranZfort marketplace capacity.",
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZAFTYS TMS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  featureList: [
    "Dispatch and Command Center",
    "Live GPS tracking",
    "Digital ePOD",
    "Fleet and driver records",
    "Shipper portal visibility",
    "Own vs Network labeling",
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    description: "Contact ZAFTYS for platform licensing and demos",
  },
  description:
    "Transport and fleet management platform for dispatch, GPS tracking, ePOD, fleet records, and client visibility.",
  provider: organizationRef,
  url: `${BASE}/zaftys-tms`,
  installUrl: "https://app.zaftys.com",
  screenshot: [
    {
      "@type": "ImageObject",
      url: `${BASE}/images/tms/command-center.webp`,
      caption: "ZAFTYS TMS Command Center with live KPIs and exception queue",
    },
    {
      "@type": "ImageObject",
      url: `${BASE}/images/tms/dispatch.webp`,
      caption: "ZAFTYS TMS Dispatch board with backlog and TranZfort post actions",
    },
    {
      "@type": "ImageObject",
      url: `${BASE}/images/tms/shipments.webp`,
      caption:
        "ZAFTYS TMS Shipments screen listing live loads, trip status, origin-destination lanes, and TranZfort marketplace updates",
    },
    {
      "@type": "ImageObject",
      url: `${BASE}/images/tms/map.webp`,
      caption:
        "ZAFTYS TMS Live Map with real-time GPS tracking of own-fleet and network vehicles across Indian lanes",
    },
    {
      "@type": "ImageObject",
      url: `${BASE}/images/tms/network.webp`,
      caption: "ZAFTYS TMS network view for partner capacity and lane coverage",
    },
  ],
};

/** TranZfort Android marketplace app - downloadUrl = Google Play. */
export const tranzfortSoftwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TranZfort",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Android",
  featureList: [
    "Post loads for free",
    "Find loads for free",
    "AI-powered corridor and vehicle matching",
    "Verified trucker onboarding",
    "Hindi and English on the road",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description:
      "Listing and search are free. Broker fee to truckers on booked loads.",
  },
  description:
    "Freight marketplace for shippers and truckers in India. Post or find a load for free. AI matching on corridor, vehicle class, and timing.",
  provider: organizationRef,
  url: `${BASE}/network/tranzfort`,
  downloadUrl: externalLinks.tranzfortPlayStore,
  installUrl: externalLinks.tranzfortPlayStore,
  screenshot: [
    {
      "@type": "ImageObject",
      url: `${BASE}/images/tranzfort/browse.jpg`,
      caption: "TranZfort marketplace browse screen",
    },
  ],
};

/** Per-leaf LogisticsService helper (kept for future product pages) */
export function logisticsServiceLeafSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}): Record<string, unknown> {
  const path = opts.url.startsWith("http") ? opts.url : `${BASE}${opts.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    name: opts.name,
    description: opts.description,
    url: path,
    serviceType: opts.serviceType,
    provider: organizationRef,
    areaServed: schemaAreaServed,
  };
}

/** Corridor / lane Service + DeliveryService JSON-LD (geo-SEO leaves). */
export function corridorServiceSchema(corridor: CorridorDef): Record<string, unknown> {
  const pageUrl = `${BASE}/logistics/corridors/${corridor.slug}`;
  const placeNames = [...new Set([...corridor.origins, ...corridor.destinations])];

  return {
    "@context": "https://schema.org",
    "@type": ["Service", "DeliveryService"],
    "@id": `${pageUrl}#service`,
    name: corridor.title,
    description: corridor.seoDescription,
    url: pageUrl,
    serviceType: corridor.title,
    provider: organizationRef,
    areaServed: placeNames.map((name) => ({ "@type": "City", name })),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      description: "Contact ZAFTYS for a corridor freight quote",
      url: `${BASE}/contact`,
      availability: "https://schema.org/InStock",
    },
  };
}

export function corridorsHubCollectionSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ZAFTYS Routes & Corridors",
    description:
      "Industrial FTL corridors operated by ZAFTYS: Gujarat-Vidarbha, Pune round-trips, Mumbai long-haul, Haldia westbound, JNPT, Mundra, and South India lanes.",
    url: `${BASE}/logistics/corridors`,
    publisher: organizationRef,
    about: schemaAreaServed,
  };
}

export const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ZAFTYS Blog",
  description:
    "Practical logistics guides from corridor operations: FTL, plant windows, steel and cement freight, TMS, and TranZfort.",
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
    "Institutional market research on the global logistics market and digital freight matching platforms: size, forecast, segments, and competitive outlook.",
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
  coverImage?: string;
}): Record<string, unknown> {
  const imagePath = (report.coverImage ?? "/og-image.png").split("?")[0] || "/og-image.png";
  const image = imagePath.startsWith("http") ? imagePath : `${BASE}${imagePath}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: report.title,
    name: report.title,
    description: report.seoDescription,
    datePublished: report.publishedAt,
    dateModified: report.updatedAt ?? report.publishedAt,
    author: {
      "@type": "Organization",
      name: "ZAFTYS",
      url: BASE,
    },
    publisher: organizationRef,
    image,
    url: `${BASE}/reports/${report.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/reports/${report.slug}`,
    },
    isAccessibleForFree: true,
    // PDF is gated behind company-email unlock - do not advertise a public contentUrl.
    encoding: {
      "@type": "MediaObject",
      encodingFormat: "application/pdf",
      name: `${report.title} (PDF)`,
    },
  };
}

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription: string;
  category?: string;
  tags?: readonly string[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  heroImage?: string;
  heroWidth?: number;
  heroHeight?: number;
  template?: string;
}): Record<string, unknown> {
  const image = post.heroImage
    ? post.heroImage.startsWith("http")
      ? post.heroImage
      : `${BASE}${post.heroImage}`
    : `${BASE}/og-image.png`;

  const categoryLabel =
    post.category === "operations"
      ? "Operations"
      : post.category === "industries"
        ? "Industries"
        : post.category === "technology"
          ? "Technology"
          : undefined;

  const articleType = post.template === "deep-research" ? "TechArticle" : "BlogPosting";

  return {
    "@context": "https://schema.org",
    "@type": articleType,
    headline: post.title,
    alternativeHeadline: post.seoTitle,
    description: post.seoDescription,
    inLanguage: "en-IN",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: "ZAFTYS",
      url: BASE,
    },
    publisher: organizationRef,
    image:
      post.heroWidth && post.heroHeight
        ? {
            "@type": "ImageObject",
            url: image,
            width: post.heroWidth,
            height: post.heroHeight,
          }
        : image,
    ...(categoryLabel ? { articleSection: categoryLabel } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${post.slug}`,
    },
    url: `${BASE}/blog/${post.slug}`,
    isAccessibleForFree: true,
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
    stripMarkdownLinks(text);

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
