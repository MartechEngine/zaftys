import type { materialTypes, truckTypes } from "./constants";

export type TruckId = (typeof truckTypes)[number]["id"];
export type MaterialId = (typeof materialTypes)[number]["id"];

/** Recommended truck ↔ material pairings for dispatch planning */
export const truckToMaterials: Record<TruckId, readonly MaterialId[]> = {
  "open-body": ["mining", "construction", "metals", "agriculture"],
  tipper: ["mining", "construction"],
  flatbed: ["metals", "construction"],
  tanker: ["energy"],
  container: ["fmcg", "construction"],
  contract: ["mining", "construction", "metals", "energy", "fmcg", "agriculture"],
};

export function materialsForTruck(truckId: TruckId): MaterialId[] {
  return [...truckToMaterials[truckId]];
}

export function trucksForMaterial(materialId: MaterialId): TruckId[] {
  return (Object.entries(truckToMaterials) as [TruckId, readonly MaterialId[]][])
    .filter(([, materials]) => materials.includes(materialId))
    .map(([truckId]) => truckId);
}

export function isPairingRecommended(truckId: TruckId, materialId: MaterialId): boolean {
  return truckToMaterials[truckId]?.includes(materialId) ?? false;
}
