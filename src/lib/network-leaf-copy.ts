/**
 * Network leaf pages: Transporter Network, Truck Capacity.
 * Dense product copy. Own vs Network never blended. No invented KPIs.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */

import { paths } from "@/lib/site-paths";
import type { IntelligenceLeafCopy } from "@/lib/intelligence-leaf-copy";

const homeCrumb = { name: "Home", path: "/" };
const networkCrumb = { name: "Network", path: paths.network.hub };

export const transporterNetworkLeafCopy: IntelligenceLeafCopy = {
  id: "transporter-network",
  status: "Available",
  seo: {
    title: "Transporter Network India | Verified Carriers",
    description:
      "ZAFTYS verified transporter network across India. Third-party truck capacity with RC, insurance, and onboarding checks. Labeled network overflow, never blended with owned fleet.",
  },
  canonical: paths.network.transporterNetwork,
  breadcrumbs: [
    homeCrumb,
    networkCrumb,
    { name: "Transporter Network", path: paths.network.transporterNetwork },
  ],
  hero: {
    badge: "Transporter Network · Available",
    h1: "Verified carriers when your lane needs more trucks.",
    lead: "ZAFTYS coordinates a network of verified transportation partners. Onboarding checks RC, insurance, and operating patterns before a partner shows as available. Network capacity stays labeled. Own fleet stays separate.",
    imageAlt: "ZAFTYS verified partner network capacity",
    primaryCtaLabel: "Register as a partner",
    primaryCtaPath: paths.partner,
    secondaryCta: { label: "Explore TranZfort", path: paths.network.tranzfort },
  },
  mail: {
    subject: "Transporter network / partner inquiry",
    body: "Hi ZAFTYS,\n\nI want to discuss the transporter network.\n\nCompany:\nRole:\nFleet size / corridors:\nShipper or partner:\n\n",
  },
  problem: {
    eyebrow: "The overflow problem",
    h2: "Surge capacity without anonymous vendor chaos",
    lead: "When owned fleet is full, shippers still need trucks that clear the gate. Last-minute unknown vendors create paperwork and accountability gaps.",
    items: [
      {
        title: "Unverified allotment",
        body: "A truck shows up without RC, insurance, or corridor fit the plant can defend.",
      },
      {
        title: "Blended storytelling",
        body: "Partner trucks get described as company fleet, so Own vs Network accountability disappears.",
      },
      {
        title: "No desk after allotment",
        body: "Broker-style handoffs that stop answering once the vehicle is assigned.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "Verified partners coordinated by ZAFTYS",
    lead: "Network capacity for ZAFTYS-contracted trips and TranZfort discovery. Labels stay honest.",
    items: [
      {
        title: "Verified onboarding",
        body: "KYC, RC, fitness, permit, and insurance checks before partners move freight.",
      },
      {
        title: "Corridor matching",
        body: "Partners matched to corridors and vehicle classes they actually run.",
      },
      {
        title: "ZAFTYS coordination",
        body: "Trips contracted through ZAFTYS stay on GST billing with structured documentation.",
      },
      {
        title: "Labeled network capacity",
        body: "Distinct from owned fleet in desk language, TMS views, and commercial conversations.",
      },
      {
        title: "TranZfort access",
        body: "Digital load posting and discovery for partners and shippers on the marketplace.",
      },
      {
        title: "TMS on contracted trips",
        body: "Visibility and ePOD when the movement runs through ZAFTYS TMS.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Network capacity next to the operational spine",
    lead: "Partner context sits with the same platform language as dispatch and TranZfort.",
    primary: {
      src: "/images/tms/network.webp",
      alt: "ZAFTYS TMS network view for partner capacity",
      caption: "Network · partner and capacity context",
    },
    secondary: {
      src: "/images/tranzfort/join.jpg",
      alt: "TranZfort app join and register screen for partners",
      caption: "TranZfort · partner join and register",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "Shippers needing overflow. Partners needing loads.",
    items: [
      {
        title: "Shippers and manufacturers",
        body: "Overflow trucks with verification and desk follow-through when ZAFTYS contracts the trip.",
      },
      {
        title: "Fleet owners",
        body: "Join the network, clear onboarding, and access loads via TranZfort and ZAFTYS coordination.",
      },
      {
        title: "Logistics heads",
        body: "Surge coverage without inventing a second silent broker layer.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "How it connects",
    h2: "Network partners feed TranZfort and contracted TMS trips",
    lead: "Discovery can start on TranZfort. Contracted execution can sit in ZAFTYS TMS. Own fleet pages stay separate.",
    points: [
      "Partner registration at /partner",
      "Marketplace at TranZfort",
      "Own vs Network never blended in marketing or ops language",
      "No invented public partner headcounts on this page",
    ],
    cta: { label: "Become a Partner", path: paths.partner },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Available as labeled network capacity",
    body: "Partners are onboarded and corridor-matched. This is not a promise that every body class is available on every lane every day. Coverage is confirmed for your program during onboarding.",
  },
  related: {
    eyebrow: "Related",
    h2: "Continue in the Network",
    links: [
      {
        name: "TranZfort",
        path: paths.network.tranzfort,
        blurb: "Marketplace · live",
      },
      {
        name: "Truck capacity",
        path: paths.network.truckCapacity,
        blurb: "Own plus network sourcing",
      },
      {
        name: "Our Fleet",
        path: paths.fleet,
        blurb: "Company body classes",
      },
      {
        name: "Network hub",
        path: paths.network.hub,
        blurb: "How capacity is organized",
      },
    ],
  },
  finalCta: {
    h2: "Join as a partner, or source verified overflow",
    lead: "Register your fleet, or ask the desk how network capacity works on your corridors.",
    primaryLabel: "Register as a partner",
    primaryPath: paths.partner,
    secondary: { label: "Back to Network", path: paths.network.hub },
  },
};

export const truckCapacityLeafCopy: IntelligenceLeafCopy = {
  id: "truck-capacity",
  status: "Available",
  seo: {
    title: "Truck Capacity Sourcing India | Own Fleet and Network",
    description:
      "Source owned or verified partner truck capacity in India through ZAFTYS. Own fleet first, labeled network overflow, one desk, GST on contracted trips.",
  },
  canonical: paths.network.truckCapacity,
  breadcrumbs: [
    homeCrumb,
    networkCrumb,
    { name: "Truck Capacity", path: paths.network.truckCapacity },
  ],
  hero: {
    badge: "Truck Capacity · Available",
    h1: "Source capacity from fleet and network in one relationship.",
    lead: "When demand exceeds owned fleet on a lane, ZAFTYS sources verified third-party capacity through partner coordination and TranZfort, without losing commercial or operational control. Own and Network stay labeled.",
    imageAlt: "ZAFTYS truck capacity from owned fleet and network partners",
    primaryCtaLabel: "Request transportation",
    secondaryCta: { label: "Explore TranZfort", path: paths.network.tranzfort },
  },
  mail: {
    subject: "Truck capacity sourcing inquiry",
    body: "Hi ZAFTYS,\n\nI need truck capacity.\n\nCompany:\nFrom:\nTo:\nVehicle class:\nVolume / timeline:\n\n",
  },
  problem: {
    eyebrow: "The capacity problem",
    h2: "Plant windows do not wait for a perfect owned-fleet day",
    lead: "Corridors spike. Body classes run short. You still need a truck that fits the gate, with a desk that stays on the trip.",
    items: [
      {
        title: "Owned fleet alone is not enough",
        body: "Seasonal and corridor peaks exceed company trucks without a labeled overflow path.",
      },
      {
        title: "Marketplace without an operator",
        body: "Finding a truck is not the same as contracted execution, GST billing, and TMS close-out.",
      },
      {
        title: "Mixed messaging",
        body: "Shippers hear company fleet while receiving anonymous network trucks.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "Capacity sourcing with Own vs Network clarity",
    lead: "One ZAFTYS relationship whether the truck is owned or partner-sourced.",
    items: [
      {
        title: "Owned fleet first",
        body: "Company trucks across LCV, heavy load, container, tanker, and bulker classes we operate.",
      },
      {
        title: "Network overflow",
        body: "Verified partners when surge or corridor demand exceeds owned capacity.",
      },
      {
        title: "One desk",
        body: "Same commercial relationship for indent, allotment follow-through, and documentation.",
      },
      {
        title: "TranZfort for discovery",
        body: "Free listing and search when overflow loads need digital matching.",
      },
      {
        title: "TMS on contracted trips",
        body: "Dispatch and visibility when the movement runs through ZAFTYS TMS.",
      },
      {
        title: "GST when we contract",
        body: "Trips contracted through ZAFTYS stay on structured billing, not informal settlement.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Fleet assets and marketplace discovery",
    lead: "Capacity is physical trucks plus a desk. TranZfort extends discovery. TMS holds contracted execution.",
    primary: {
      src: "/images/services/trucks/side-wall-trailer.png",
      alt: "ZAFTYS owned side wall trailer for industrial freight",
      caption: "Own fleet · company-operated capacity",
    },
    secondary: {
      src: "/images/tranzfort/search.jpg",
      alt: "TranZfort app search loads screen",
      caption: "TranZfort · search loads for overflow",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "Teams that book trucks, not slides",
    items: [
      {
        title: "Shippers and plant logistics",
        body: "Need a body class on a corridor with clear labeling of who operates the truck.",
      },
      {
        title: "Procurement",
        body: "Want one relationship for owned and overflow capacity without silent blending.",
      },
      {
        title: "Operations managers",
        body: "Peak weeks that still require gate-ready trucks and desk follow-through.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "How sourcing works",
    h2: "Fleet page for body class. Network for overflow. TMS for contracted trips.",
    lead: "Start from the vehicle class you need. We tell you whether the truck is company-operated or verified network capacity.",
    points: [
      "See Our Fleet for owned body classes",
      "Use TranZfort when you want marketplace discovery",
      "Contracted trips can sit in ZAFTYS TMS",
      "No invented public truck counts on this page",
    ],
    cta: { label: "Our Fleet", path: paths.fleet },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Available through ZAFTYS logistics and TranZfort",
    body: "Capacity depends on corridor, body class, and timing. We confirm Own vs Network at allotment. Marketplace listings are free to post and find; broker fees apply to truckers on booked loads as stated on TranZfort.",
  },
  related: {
    eyebrow: "Related",
    h2: "Continue in the Network",
    links: [
      {
        name: "Our Fleet",
        path: paths.fleet,
        blurb: "Own vs Network body classes",
      },
      {
        name: "TranZfort",
        path: paths.network.tranzfort,
        blurb: "Marketplace · live",
      },
      {
        name: "Transporter network",
        path: paths.network.transporterNetwork,
        blurb: "Verified partners",
      },
      {
        name: "Logistics services",
        path: paths.logistics.hub,
        blurb: "3PL and contract transportation",
      },
    ],
  },
  finalCta: {
    h2: "Tell us the corridor and the body class",
    lead: "Request transportation capacity, or open TranZfort if you want to post or find a load digitally.",
    primaryLabel: "Request transportation",
    secondary: { label: "Explore TranZfort", path: paths.network.tranzfort },
  },
};
