/**
 * Service imagery  -  mapped from zaftys-lab/marketing/content/services-transportation-images.ts
 * JPGs are compressed from the correct PNG sources (ZAFTYS-branded trucks + industry photos).
 */

export const truckImages = {
  all: { src: "/images/services/trucks/all.jpg", alt: "ZAFTYS industrial freight fleet  -  open body, tipper, flatbed, tanker, and container trucks" },
  "open-body": { src: "/images/services/trucks/open-body.jpg", alt: "Open-body freight truck for bulk solids and industrial corridor haulage" },
  tipper: { src: "/images/services/trucks/tipper.jpg", alt: "Tipper dumper truck at a construction and mining site" },
  flatbed: { src: "/images/services/trucks/flatbed.jpg", alt: "Flatbed and trailer for steel, machinery, and heavy industrial cargo" },
  tanker: { src: "/images/services/trucks/tanker.jpg", alt: "Bulk tanker truck for liquids, fuels, and powdered bulk freight" },
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
  const key = id as keyof typeof truckImages;
  return truckImages[key] ?? truckImages.all;
}

export function materialImageForId(id: string): { src: string; alt: string } {
  const key = id as keyof typeof materialImages;
  return materialImages[key] ?? materialImages.all;
}

export const pillarImages = {
  transportation: { src: "/images/services/home/transportation.jpg", alt: "Multimodal industrial freight  -  road, rail, air, and sea logistics" },
  operations: { src: "/images/services/home/operations-app.jpg", alt: "ZAFTYS TSM operations platform" },
  tranzfort: { src: "/images/services/home/tranzfort.jpg", alt: "TranZfort freight marketplace" },
} as const;
