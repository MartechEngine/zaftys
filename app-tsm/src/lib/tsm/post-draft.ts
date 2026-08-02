/**
 * Draft payload for Network → TranZfort publish (create_load shape).
 * Catalog codes required before live bridge calls.
 */

export type TsmPriceType = "fixed" | "per_ton";

export type TsmListingDuration = "48_hours" | "7_days" | "30_days";

export type TsmPostDraft = {
  idempotencyKey: string;
  originLabel: string;
  originCity: string;
  originState: string;
  originLat: number;
  originLng: number;
  destinationLabel: string;
  destinationCity: string;
  destinationState: string;
  destinationLat: number;
  destinationLng: number;
  routeDistanceKm: number;
  routeDurationMinutes: number;
  routePolyline: string;
  routeSnapshotSource: string;
  material: string;
  materialCode: string | null;
  weightTonnes: number | null;
  requiredBodyType: string | null;
  requiredTyres: number[] | null;
  trucksNeeded: number;
  priceAmount: number;
  priceType: TsmPriceType;
  advancePercentage: number;
  pickupDate: string;
  listingDuration: TsmListingDuration;
  requiredVehicleCategoryCode: string | null;
  requiredBodyStyleCodes: string[];
  requiredConfigurationCodes: string[];
  requiredVehicleCategoryCodes: string[];
  sourceShipmentId?: string;
};

export function draftReadyForPublish(draft: TsmPostDraft): { ok: boolean; reason?: string } {
  if (!draft.originCity.trim() || !draft.destinationCity.trim()) {
    return { ok: false, reason: "Origin and destination cities are required." };
  }
  if (!draft.originLabel.trim() || !draft.destinationLabel.trim()) {
    return { ok: false, reason: "Exact origin and destination labels are required." };
  }
  if (!draft.material.trim() && !draft.materialCode) {
    return { ok: false, reason: "Material is required." };
  }
  if (draft.requiredConfigurationCodes.length === 0) {
    return {
      ok: false,
      reason: "Select at least one TranZfort vehicle configuration (catalog).",
    };
  }
  if (draft.trucksNeeded < 1) {
    return { ok: false, reason: "Trucks needed must be at least 1." };
  }
  if (draft.priceAmount <= 0) {
    return { ok: false, reason: "Price must be greater than zero." };
  }
  if (!draft.idempotencyKey.trim()) {
    return { ok: false, reason: "Idempotency key is required." };
  }
  return { ok: true };
}
