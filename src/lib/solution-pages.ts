import { paths } from "@/lib/site-paths";
import type { SolutionPageProps } from "@/components/SolutionPageLayout";

type SolutionContent = Omit<SolutionPageProps, "children">;

const homeCrumb = { name: "Home", path: "/" };

export const logisticsSolutions: Record<string, SolutionContent> = {
  threePl: {
    seo: {
      title: "3PL Transportation Services India",
      description:
        "FTL 3PL transportation from ZAFTYS — owned fleet first, labeled partner overflow, GST billing, and TMS on trips we run. Industrial and commercial corridors.",
    },
    canonical: paths.logistics.threePl,
    badge: "3PL Transportation",
    h1: "Full-truckload execution — not a booking that vanishes after allotment.",
    lead:
      "3PL for ZAFTYS means we execute the trip. Full truckload from origin to destination, vehicle class matched to cargo, GST-compliant billing on contracted moves, and a desk that stays on the lane until delivery documentation closes.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "3PL Transportation", path: paths.logistics.threePl }],
    features: [
      {
        title: "Full truckload ownership",
        description:
          "One operator accountable from indent to POD — not a broker who stops answering after the truck is allotted.",
      },
      {
        title: "Right body for the gate",
        description:
          "LCV through multi-axle, flatbed, tipper, trailer, and ODC matched to cargo and plant rules — not whatever truck is cheapest that hour.",
      },
      {
        title: "Owned + labeled overflow",
        description:
          "Company fleet first on corridors we run every week; verified Tranzfort partners when volume spikes — always labeled, never silent brokerage.",
      },
    ],
    highlights: [
      "Dispatch and close-out on ZAFTYS TMS for contracted movements",
      "GST-compliant invoicing — not informal cash settlement",
      "One Amravati desk for indent, allotment follow-through, and documentation",
      "Built for manufacturers and traders moving FTL between plants, mills, and sites",
    ],
    relatedLinks: [
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "Our Fleet", path: paths.fleet },
      { name: "Industries", path: paths.industries },
      { name: "TranZfort", path: paths.network.tranzfort },
    ],
    primaryCta: "quote",
    secondaryLink: { label: "View all logistics", path: paths.logistics.hub },
  },
  contract: {
    seo: {
      title: "Contract Logistics and Dedicated Transportation",
      description:
        "Contract logistics with dedicated or reserved trucks, SLA tracking, plant-window dispatch, and TMS visibility. Capacity assurance — not only a rate.",
    },
    canonical: paths.logistics.contract,
    badge: "Contract Logistics",
    h1: "Recurring lanes need assigned capacity — not a fresh hunt every Monday.",
    lead:
      "Contract logistics at ZAFTYS is a long-term transportation program: dedicated or reserved trucks on the corridors you run every week, SLA tracking, plant-window awareness, and an account desk that already knows your sites.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Contract Logistics", path: paths.logistics.contract }],
    features: [
      {
        title: "Reserved capacity",
        description:
          "Dedicated or reserved trucks on plant, mill, and DC corridors so peak weeks are not a spot-market scramble.",
      },
      {
        title: "SLA on the window",
        description:
          "Performance tracked against agreed loading and transit windows — not only a one-off transit promise.",
      },
      {
        title: "Managed dispatch desk",
        description:
          "Allotment, gate timing, and escalation when the plant slips — from one Amravati desk that knows your sites.",
      },
    ],
    highlights: [
      "Assigned trucks and drivers for seasonal or annual programs",
      "Shipper visibility on contracted trips through ZAFTYS TMS",
      "Overflow through verified partners — never silently presented as owned fleet",
      "Built for procurement and logistics heads who need capacity assurance under an SLA",
    ],
    relatedLinks: [
      { name: "Dedicated Fleet", path: paths.logistics.dedicated },
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "Manufacturing", path: "/industries/manufacturing" },
      { name: "ZAFTYS TMS", path: paths.technology.tms },
    ],
    primaryCta: "contract",
    secondaryLink: { label: "Discuss on WhatsApp", path: paths.contact },
  },
  dedicated: {
    seo: {
      title: "Dedicated Fleet Services India",
      description:
        "Dedicated fleet: trucks and drivers assigned to your plant or DC program. Body type follows the lane. SLA, TMS, and labeled surge overflow from ZAFTYS.",
    },
    canonical: paths.logistics.dedicated,
    badge: "Dedicated Fleet",
    h1: "Your trucks. Your corridors. Your season or year.",
    lead:
      "Dedicated fleet is how a ZAFTYS contract looks when vehicles and drivers are assigned to you. Body type follows the lane — LCV, heavy load, container, tanker, or bulker — with plant-window dispatch and TMS on every contracted trip.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Dedicated Fleet", path: paths.logistics.dedicated }],
    features: [
      {
        title: "Assigned vehicles and drivers",
        description:
          "Trucks and crews dedicated to your program for a season or a year — they learn your gate, bay, and loading rules.",
      },
      {
        title: "Vehicle class follows the lane",
        description:
          "LCV, multi-axle, flatbed, tipper, container, tanker, or bulker on the same contract framework — chosen for cargo, not convenience.",
      },
      {
        title: "Performance on the corridor",
        description:
          "Measured on repeat windows and detention risk, not a one-off spot rate that looks cheap until the plant queue.",
      },
    ],
    highlights: [
      "Plant and DC window awareness built into dispatch",
      "TMS visibility for shippers on contracted trips",
      "Tranzfort overflow when surge exceeds dedicated count — labeled clearly",
      "GST-compliant billing through ZAFTYS",
    ],
    relatedLinks: [
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "Our Fleet", path: paths.fleet },
      { name: "Manufacturing", path: "/industries/manufacturing" },
    ],
    primaryCta: "contract",
  },
  industrial: {
    seo: {
      title: "Industrial Freight Transportation India",
      description:
        "Industrial freight for steel, cement, mining, and project cargo. Flatbed, tipper, multi-axle, and ODC with plant-window and weighbridge discipline.",
    },
    canonical: paths.logistics.industrial,
    badge: "Industrial Freight",
    h1: "Steel, cement, mining, and project cargo — built for plant windows and axle reality.",
    lead:
      "Industrial freight is where generic FTL breaks. Coils need the right flatbed and securing. Cement and bulk need tippers and bulkers that survive the plant queue. Mining lanes need weighbridge discipline. ZAFTYS runs these movements as an operator that already lives in that world.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Industrial Freight", path: paths.logistics.industrial }],
    features: [
      {
        title: "Steel and metals",
        description:
          "Coils, plates, TMT, and sections on flatbeds and multi-axle with weighbridge and axle discipline.",
      },
      {
        title: "Cement and bulk solids",
        description:
          "Tippers and bulkers on plant-to-project and plant-to-market lanes with loading-window awareness.",
      },
      {
        title: "Mining and project cargo",
        description:
          "Pit-head to plant / siding movements, plus manufacturing inbound and outbound on scheduled programs.",
      },
    ],
    highlights: [
      "Vehicle class chosen for cargo, axle limits, and gate rules",
      "Detention and plant-window language at the desk — where industrial cost sits",
      "Same operating model across cement, steel, coal, and manufacturing",
      "Fewer refusals at the gate because the truck matches the load and the site",
    ],
    relatedLinks: [
      { name: "Industries", path: paths.industries },
      { name: "Container Transportation", path: paths.logistics.container },
      { name: "Steel & Metals", path: "/industries/steel-metals" },
      { name: "Cement & Construction", path: "/industries/cement" },
    ],
    primaryCta: "quote",
  },
  container: {
    seo: {
      title: "Container Transportation Port to Market India",
      description:
        "Container road legs port–factory–market. Trailers for sealed freight, plant and port window coordination, TMS on contracted moves.",
    },
    canonical: paths.logistics.container,
    badge: "Container Transportation",
    h1: "Port to factory, factory to port, port to market — sealed freight on corridors we run.",
    lead:
      "Container transportation for ZAFTYS is road execution between ports, warehouses, factories, and inland markets. We move containers and sealed freight on trailers suited to the corridor, with trip visibility on contracted moves and partner overflow when the yard needs more wheels than we own that day.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Container Transportation", path: paths.logistics.container }],
    features: [
      {
        title: "Port to warehouse / factory",
        description:
          "Inbound containers delivered to distribution or production with factory-slot awareness — not only a port pickup quote.",
      },
      {
        title: "Factory to port",
        description:
          "Export-bound boxes timed to plant loading windows so demurrage and detention clocks do not own the day.",
      },
      {
        title: "Port to market",
        description:
          "Inland city and market trailer programs where the commercial lane demands sealed FTL on the road.",
      },
    ],
    highlights: [
      "Container trailers and sealed configurations matched to the corridor",
      "Coordination for gate-in, factory slot, and trip close-out",
      "Visibility on contracted container moves through the same desk and TMS",
      "Owned capacity where we run the lane; Tranzfort partners when overflow is required — labeled",
    ],
    relatedLinks: [
      { name: "Port & Container Road", path: "/industries/container-transport" },
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "Industrial Freight", path: paths.logistics.industrial },
    ],
    primaryCta: "container",
  },
};
