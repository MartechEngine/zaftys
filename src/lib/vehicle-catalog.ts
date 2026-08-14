/**
 * TranZfort live vehicle catalog for ZAFTYS /fleet.
 * Source: tranzfort-lab vehicle_categories, vehicle_body_styles,
 * and post-load / trucker-filter configurations (supplier picker).
 *
 * Categories and body styles are complete. Typical sizes are the
 * post envelopes the app shows, not every fleet SKU.
 */
export type MarketplaceVehicleType = {
  id: string;
  title: string;
  imageId: string;
  bodyStyles: readonly string[];
  typical: string;
  description: string;
};

export const marketplaceVehicleCatalog: readonly MarketplaceVehicleType[] = [
  {
    id: "lcv",
    title: "LCV",
    imageId: "lcv",
    bodyStyles: ["Open", "Closed"],
    typical: "Ace and Dost 4W. Open 14ft to 24ft. 6W at 19ft to 24ft. Closed 14ft to 32ft SXL. About 0.75T to 7T.",
    description:
      "Regional commercial freight. Not house shifting. Not two-wheeler last mile.",
  },
  {
    id: "open_truck",
    title: "Open truck",
    imageId: "open-body",
    bodyStyles: ["Half body", "Full body", "High side"],
    typical: "6W to 18W. About 7.5T to 42T on the post envelopes.",
    description: "Bagged cement, coal, aggregates, and steel lengths on dala and high-side.",
  },
  {
    id: "trailer",
    title: "Trailer",
    imageId: "flatbed",
    bodyStyles: ["Flat bed", "Full body", "High side"],
    typical: "12W to 22W. About 20T to 48T.",
    description: "Line-haul bulk solids and long steel on trailer combinations.",
  },
  {
    id: "container",
    title: "Container",
    imageId: "container",
    bodyStyles: ["19ft", "20ft to 24ft", "32ft", "40ft", "40ft HC"],
    typical: "6W local, 10W 32ft, 18W line-haul. About 7.5T to 32T.",
    description: "Sealed and box-body freight, including plant-to-warehouse and LCV container.",
  },
  {
    id: "bulker",
    title: "Bulker",
    imageId: "bulker",
    bodyStyles: ["Cement", "Fly ash", "Lime", "Powder"],
    typical: "14W to 18W. About 20T to 32T.",
    description: "Pneumatic bulkers for cement, fly ash, lime, and other powders.",
  },
  {
    id: "tanker",
    title: "Tanker",
    imageId: "tanker",
    bodyStyles: ["Water", "Chemical", "Acid", "Petroleum", "Edible oil"],
    typical: "10W to 18W. Quoted per cargo and corridor. About 10T to 38T on common bands.",
    description: "Liquids only. Powders stay on bulker. Quoted per cargo.",
  },
  {
    id: "tipper",
    title: "Tipper",
    imageId: "tipper",
    bodyStyles: ["Mining", "Heavy mining"],
    typical: "12W to 14W on common mining bands. About 18T to 30T.",
    description: "Hydraulic discharge for sand, ore, overburden, and mine outbound.",
  },
  {
    id: "reefer",
    title: "Reefer",
    imageId: "container",
    bodyStyles: ["Reefer"],
    typical: "6W to 18W. About 3T to 28T.",
    description: "Refrigerated boxes for temperature-sensitive commercial freight.",
  },
  {
    id: "parcel",
    title: "Parcel",
    imageId: "lcv",
    bodyStyles: ["Closed body"],
    typical: "Closed-body commercial parcel on booked lanes.",
    description: "Not household moving. Not two-wheeler last mile.",
  },
  {
    id: "odc",
    title: "ODC",
    imageId: "flatbed",
    bodyStyles: ["Semi low bed", "Low bed", "Hydraulic axle", "Multi axle hydraulic", "Extendable trailer"],
    typical: "18W to 30W+. About 30T to 300T+ on project cargo. Extendable is special.",
    description: "Machinery and oversize-aware moves. Quoted on the corridor.",
  },
];
