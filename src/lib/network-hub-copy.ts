/**
 * /network hub — Own fleet, TranZfort, verified partners, capacity sourcing.
 * Never blend Own vs Network. No invented public fleet KPIs.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */

import { paths } from "@/lib/site-paths";

export const networkHubCopy = {
  hero: {
    badge: "Transportation Network",
    h1: "ZAFTYS operates. Tranzfort connects.",
    lead: "Owned fleet when we have the truck. Verified partner capacity when the lane needs more. TranZfort extends the network digitally. Same desk. Labels stay honest.",
  },
  intro: {
    eyebrow: "How capacity works here",
    h2: "One commercial relationship. Two labeled sources.",
    lead: "Industrial shippers do not need a marketplace story and a fleet story that contradict each other. ZAFTYS runs company trucks first, then labeled network overflow. TranZfort is how demand and trucks find each other digitally.",
    pillars: [
      {
        title: "Own fleet",
        body: "Company-operated trucks on corridors we run every week. Body class matched to cargo and gate rules.",
      },
      {
        title: "Network overflow",
        body: "Verified partners when volume or corridor demand exceeds owned capacity. Always labeled, never silent brokerage.",
      },
      {
        title: "TranZfort marketplace",
        body: "Post or find a load for free. AI matching on corridor and vehicle. Broker fee to truckers on booked loads.",
      },
      {
        title: "TMS when we contract",
        body: "Trips contracted through ZAFTYS can sit in ZAFTYS TMS for status, ePOD, and GST billing.",
      },
    ],
  },
  modules: [
    {
      id: "tranzfort",
      title: "TranZfort",
      status: "Live",
      lead: "Digital freight marketplace for shippers and truckers. Free to post and find. AI-powered matching on corridor, vehicle class, and timing. Built for Indian highway conditions.",
      points: [
        "Free listing and search. Broker fee to truckers on booked loads",
        "Verified onboarding for partners before they show as available",
        "Hindi and English on the road. Core features when signal drops",
        "Contracted ZAFTYS trips can continue into TMS visibility",
      ],
      image: "/images/tranzfort/browse.jpg",
      imageAlt: "TranZfort app browse marketplace screen",
      caption: "TranZfort · marketplace browse",
      cta: { label: "Explore TranZfort", path: paths.network.tranzfort },
      secondaryCta: { label: "Become a Partner", path: paths.partner },
    },
    {
      id: "transporter-network",
      title: "Transporter network",
      status: "Available",
      lead: "Verified carriers and third-party truck capacity with RC, insurance, and onboarding checks before partners move freight on ZAFTYS-contracted trips.",
      points: [
        "KYC and document checks before allotment",
        "Corridor and body-class matching to what partners actually run",
        "Distinct from owned fleet in reporting and desk language",
        "GST and documentation when ZAFTYS is on the contract",
      ],
      image: "/images/tms/network.webp",
      imageAlt: "ZAFTYS network view for partner capacity context",
      caption: "Network · partner capacity context",
      cta: { label: "Transporter network", path: paths.network.transporterNetwork },
      secondaryCta: { label: "Partner registration", path: paths.partner },
    },
    {
      id: "truck-capacity",
      title: "Truck capacity",
      status: "Available",
      lead: "Source owned or partner capacity through one ZAFTYS relationship. Own fleet first. Labeled network overflow when the lane needs more trucks.",
      points: [
        "Company trucks across the body classes we operate",
        "Verified overflow without anonymous last-minute vendor chaos",
        "One desk for indent, allotment, and documentation",
        "TranZfort when you need digital discovery for overflow loads",
      ],
      image: "/images/services/trucks/side-wall-trailer.png",
      imageAlt: "ZAFTYS company side wall trailer used on industrial corridors",
      caption: "Own fleet · body class for the corridor",
      cta: { label: "Source truck capacity", path: paths.network.truckCapacity },
      secondaryCta: { label: "Our Fleet", path: paths.fleet },
    },
  ],
  honesty: {
    eyebrow: "Own vs Network",
    h2: "We never silently mix the two",
    lead: "If the truck is company-operated, we say so. If it is verified network capacity, we say so. Marketing pages do not invent blended fleet counts.",
    items: [
      {
        title: "Own fleet",
        body: "ZAFTYS-operated vehicles on corridors and programs we run with our desk.",
      },
      {
        title: "Network fleet",
        body: "Verified partner trucks coordinated for overflow, surge, or corridor coverage.",
      },
      {
        title: "TranZfort listing",
        body: "Marketplace discovery is free. Contracted trips through ZAFTYS keep GST and TMS options on our side.",
      },
    ],
  },
  buyers: {
    eyebrow: "Who it is for",
    h2: "Shippers who need trucks. Partners who need loads.",
    items: [
      {
        title: "Shippers and manufacturers",
        body: "Capacity with clear Own vs Network labeling and one commercial path when ZAFTYS contracts the trip.",
      },
      {
        title: "Fleet owners and transporters",
        body: "Join as partners, find loads on TranZfort, and run ZAFTYS-contracted work with structured paperwork.",
      },
      {
        title: "Procurement and logistics heads",
        body: "Overflow without losing desk accountability or inventing a second broker relationship.",
      },
    ],
  },
  related: {
    eyebrow: "Connected",
    h2: "Network sits next to Logistics and TMS",
    links: [
      {
        name: "Our Fleet",
        path: paths.fleet,
        blurb: "Own vs Network body classes",
      },
      {
        name: "ZAFTYS TMS",
        path: paths.technology.tms,
        blurb: "Dispatch on contracted trips",
      },
      {
        name: "Logistics services",
        path: paths.logistics.hub,
        blurb: "3PL and contract transportation",
      },
      {
        name: "Become a Partner",
        path: paths.partner,
        blurb: "Register as a transport partner",
      },
    ],
  },
  finalCta: {
    h2: "Need more capacity on your lane?",
    lead: "Explore TranZfort, source truck capacity through ZAFTYS, or register as a partner.",
    primaryLabel: "Explore TranZfort",
    primaryPath: paths.network.tranzfort,
    secondaryLabel: "Become a Partner",
    secondaryPath: paths.partner,
  },
} as const;
