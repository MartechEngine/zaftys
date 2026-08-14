/**
 * Service imagery  -  mapped from zaftys-lab/marketing/content/services-transportation-images.ts
 * JPGs are compressed from the correct PNG sources (ZAFTYS-branded trucks + industry photos).
 */

export const truckImages = {
  lcv: { src: "/images/services/home/transportation.jpg", alt: "Light commercial vehicles for regional distribution freight" },
  heavy: { src: "/images/services/trucks/flatbed.jpg", alt: "Heavy-load flatbed and multi-axle truck for industrial cargo" },
  bulker: { src: "/images/services/trucks/tanker.jpg", alt: "Pneumatic bulker truck for cement, fly ash, lime, and powder" },
  "open-body": { src: "/images/services/trucks/open-body.jpg", alt: "Open-body freight truck for bulk solids and industrial corridor haulage" },
  tipper: { src: "/images/services/trucks/tipper.jpg", alt: "Tipper dumper truck at a construction and mining site" },
  flatbed: { src: "/images/services/trucks/flatbed.jpg", alt: "Flatbed and trailer for steel, machinery, and heavy industrial cargo" },
  tanker: { src: "/images/services/trucks/tanker.jpg", alt: "Tanker truck for water, chemical, acid, petroleum, and edible oil" },
  container: { src: "/images/services/trucks/container.jpg", alt: "Container and box-body truck for sealed, palletized freight" },
  contract: { src: "/images/services/trucks/contract.jpg", alt: "Dedicated contract fleet trucks in coordinated dispatch" },
} as const;

export const materialImages = {
  all: { src: "/images/services/materials/all.jpg", alt: "Mixed industrial freight and logistics operations overview" },
  mining: { src: "/images/services/materials/mining.jpg", alt: "Coal and bulk mining commodities for pit-to-plant haulage" },
  construction: { src: "/images/services/materials/construction.jpg", alt: "Cement plant and construction materials supply chain" },
  metals: { src: "/images/services/materials/metals.jpg", alt: "Steel coils and metal stock for industrial transport" },
  energy: { src: "/images/services/materials/energy.jpg", alt: "Industrial energy and chemical logistics facility" },
  fmcg: { src: "/images/services/materials/fmcg.jpg", alt: "Warehouse pallets for FMCG and retail distribution" },
  agriculture: { src: "/images/services/materials/agriculture.jpg", alt: "Agricultural grain and harvest freight" },
} as const;

export function truckImageForId(id: string): { src: string; alt: string } {
  if (id in truckImages) {
    return truckImages[id as keyof typeof truckImages];
  }
  return truckImages.heavy;
}

export function materialImageForId(id: string): { src: string; alt: string } {
  const key = id as keyof typeof materialImages;
  return materialImages[key] ?? materialImages.all;
}

export const pillarImages = {
  transportation: { src: "/images/services/home/transportation.jpg", alt: "Commercial freight on the road: LCV through bulker" },
  operations: { src: "/images/services/home/operations-app.jpg", alt: "ZAFTYS TMS operations platform" },
  tranzfort: { src: "/images/services/home/tranzfort.jpg", alt: "TranZfort freight marketplace" },
} as const;
