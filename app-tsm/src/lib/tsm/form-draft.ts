import type { ShipmentRecord } from "@/lib/dev-store";
import type { NetworkListing } from "@/lib/network/listing-types";
import type {
  PlaceSuggestion,
  RoutePreview,
  VehicleCatalog,
  VehicleConfiguration,
} from "@/lib/tsm/catalog-types";
import {
  configurationDisplayLabel,
  deriveLoadConfigBand,
  deriveLoadSlotCeiling,
  filterConfigsByWheel,
  formatLoadSlotBandLabel,
  postLoadCategories,
  postLoadConfigurations,
  sortPostConfigs,
  wheelOptionsForConfigs,
} from "@/lib/tsm/catalog-helpers";
import { suggestMaterialFromCommodity } from "@/lib/tsm/catalog-stub";
import {
  type TsmListingDuration,
  type TsmPostDraft,
  type TsmPriceType,
} from "@/lib/tsm/post-draft";
import { publishGateForMode } from "@/lib/tsm/live-honesty";
import { estimateRoutePreview, resolveCityPlace } from "@/lib/tsm/places-search";
import type { BridgeMode } from "@/lib/tsm/bridge-rpc";

export const TRUCK_SHORTCUTS = [1, 5, 10, 25] as const;

export {
  configurationDisplayLabel,
  filterConfigsByWheel,
  formatLoadSlotBandLabel,
  postLoadCategories,
  postLoadConfigurations,
  sortPostConfigs,
  wheelOptionsForConfigs,
};

export type PublishFormState = {
  originCity: string;
  originLabel: string;
  originState: string;
  originLat: number | null;
  originLng: number | null;
  destinationCity: string;
  destinationLabel: string;
  destinationState: string;
  destinationLat: number | null;
  destinationLng: number | null;
  route: RoutePreview | null;
  material: string;
  materialCode: string;
  weightTonnes: number;
  categoryCode: string;
  bodyStyleCodes: string[];
  configurationCodes: string[];
  trucksNeeded: number;
  priceAmount: number;
  priceType: TsmPriceType;
  advancePercentage: number;
  pickupDate: string;
  listingDuration: TsmListingDuration;
  plantNotes: string;
};

export type FormFieldErrors = Partial<Record<keyof PublishFormState | "vehicle" | "route", string>>;

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function defaultRateForShipment(shipment: Pick<ShipmentRecord, "tonnageMt">): number {
  return Math.max(1000, Math.round((shipment.tonnageMt || 1) * 420));
}

export function prefillPublishForm(
  shipment: ShipmentRecord,
  existingListing?: NetworkListing | null,
): PublishFormState {
  const origin = resolveCityPlace({
    city: shipment.origin,
    state: shipment.originState,
    lat: shipment.originLat,
    lng: shipment.originLng,
    label: shipment.originLabel ?? `${shipment.origin} plant / gate`,
  });
  const destination = resolveCityPlace({
    city: shipment.destination,
    state: shipment.destinationState,
    lat: shipment.destinationLat,
    lng: shipment.destinationLng,
    label: shipment.destinationLabel ?? `${shipment.destination} delivery point`,
  });
  const materialGuess = suggestMaterialFromCommodity(shipment.commodity);
  const pickupFromListing = existingListing?.pickupWindowStart
    ? existingListing.pickupWindowStart.slice(0, 10)
    : todayIsoDate();

  const route =
    origin && destination ? estimateRoutePreview(origin, destination) : null;

  const snapshot = existingListing?.draftSnapshot;

  return {
    originCity: snapshot?.originCity ?? origin?.city ?? shipment.origin,
    originLabel: snapshot?.originLabel ?? origin?.label ?? `${shipment.origin} plant / gate`,
    originState: snapshot?.originState ?? origin?.state ?? shipment.originState ?? "",
    originLat: snapshot?.originLat ?? origin?.lat ?? shipment.originLat ?? null,
    originLng: snapshot?.originLng ?? origin?.lng ?? shipment.originLng ?? null,
    destinationCity: snapshot?.destinationCity ?? destination?.city ?? shipment.destination,
    destinationLabel:
      snapshot?.destinationLabel ??
      destination?.label ??
      `${shipment.destination} delivery point`,
    destinationState:
      snapshot?.destinationState ?? destination?.state ?? shipment.destinationState ?? "",
    destinationLat:
      snapshot?.destinationLat ?? destination?.lat ?? shipment.destinationLat ?? null,
    destinationLng:
      snapshot?.destinationLng ?? destination?.lng ?? shipment.destinationLng ?? null,
    route: snapshot
      ? {
          distanceKm: snapshot.routeDistanceKm,
          durationMinutes: snapshot.routeDurationMinutes,
          polyline: snapshot.routePolyline,
          source: snapshot.routeSnapshotSource,
        }
      : route,
    material: snapshot?.material ?? materialGuess?.nameEn ?? shipment.commodity,
    // Prefer saved draft / shipment material_code; never inject stub-only codes.
    materialCode: snapshot?.materialCode ?? shipment.materialCode ?? "",
    weightTonnes: snapshot?.weightTonnes ?? shipment.tonnageMt ?? 0,
    categoryCode: snapshot?.requiredVehicleCategoryCode ?? "",
    bodyStyleCodes: snapshot?.requiredBodyStyleCodes ?? [],
    configurationCodes: snapshot?.requiredConfigurationCodes ?? [],
    trucksNeeded: snapshot?.trucksNeeded ?? existingListing?.trucksNeeded ?? 1,
    priceAmount: snapshot?.priceAmount ?? existingListing?.rateInr ?? defaultRateForShipment(shipment),
    priceType: snapshot?.priceType ?? existingListing?.priceType ?? "fixed",
    advancePercentage:
      snapshot?.advancePercentage ?? existingListing?.advancePercent ?? 30,
    pickupDate: snapshot?.pickupDate ?? pickupFromListing,
    listingDuration: snapshot?.listingDuration ?? "7_days",
    plantNotes: existingListing?.plantNotes ?? "",
  };
}

export function applyPlaceToForm(
  side: "origin" | "destination",
  place: PlaceSuggestion,
  prev: PublishFormState,
): PublishFormState {
  if (side === "origin") {
    return {
      ...prev,
      originCity: place.city,
      originLabel: place.label,
      originState: place.state,
      originLat: place.lat,
      originLng: place.lng,
      route: null,
    };
  }
  return {
    ...prev,
    destinationCity: place.city,
    destinationLabel: place.label,
    destinationState: place.state,
    destinationLat: place.lat,
    destinationLng: place.lng,
    route: null,
  };
}

export function slotCeilingForConfigs(
  catalog: VehicleCatalog | null,
  codes: string[],
): number | null {
  if (!catalog || codes.length === 0) return null;
  return deriveLoadSlotCeiling(catalog, codes);
}

export function slotBandLabelForConfigs(
  catalog: VehicleCatalog | null,
  codes: string[],
): string | null {
  if (!catalog || codes.length === 0) return null;
  return formatLoadSlotBandLabel(deriveLoadConfigBand(catalog, codes));
}

export function summarizeConfigurations(
  catalog: VehicleCatalog | null,
  codes: string[],
): string {
  if (codes.length === 0) return "No vehicle selected";
  if (!catalog) return `${codes.length} configuration(s)`;
  const labels = catalog.configurations
    .filter((c) => codes.includes(c.code))
    .map((c) => configurationDisplayLabel(c));
  return labels.length ? labels.join(" · ") : codes.join(", ");
}

export function validatePublishForm(
  state: PublishFormState,
  catalog?: VehicleCatalog | null,
): FormFieldErrors {
  const errors: FormFieldErrors = {};
  if (!state.originCity.trim()) errors.originCity = "Origin city is required.";
  if (!state.originLabel.trim()) errors.originLabel = "Exact origin location is required.";
  if (state.originLat == null || state.originLng == null) {
    errors.originCity = errors.originCity ?? "Select origin from suggestions to resolve coordinates.";
  }
  if (!state.destinationCity.trim()) errors.destinationCity = "Destination city is required.";
  if (!state.destinationLabel.trim()) {
    errors.destinationLabel = "Exact destination location is required.";
  }
  if (state.destinationLat == null || state.destinationLng == null) {
    errors.destinationCity =
      errors.destinationCity ?? "Select destination from suggestions to resolve coordinates.";
  }
  if (!state.route || state.route.distanceKm <= 0) {
    errors.route = "Resolve both places to preview the route.";
  }
  if (!state.materialCode.trim()) errors.materialCode = "Select a material from the catalog.";
  if (!state.material.trim()) errors.material = "Material name is required.";
  if (state.configurationCodes.length === 0) {
    errors.vehicle = "Select at least one vehicle configuration.";
  }
  if (!(state.weightTonnes > 0)) errors.weightTonnes = "Weight must be greater than zero.";
  if (catalog && state.configurationCodes.length > 0) {
    const ceiling = deriveLoadSlotCeiling(catalog, state.configurationCodes);
    if (ceiling != null && state.weightTonnes > ceiling * 1.05) {
      errors.weightTonnes = `Weight exceeds selected capacity band (max ~${ceiling}T per truck).`;
    }
  }
  if (state.trucksNeeded < 1) errors.trucksNeeded = "Trucks needed must be at least 1.";
  if (!(state.priceAmount > 0)) errors.priceAmount = "Price must be greater than zero.";
  if (state.priceType !== "fixed" && state.priceType !== "per_ton") {
    errors.priceType = "Choose Fixed or Per ton.";
  }
  if (state.advancePercentage < 0 || state.advancePercentage > 100) {
    errors.advancePercentage = "Advance must be between 0 and 100%.";
  }
  const today = todayIsoDate();
  if (!state.pickupDate || state.pickupDate < today) {
    errors.pickupDate = "Pickup date cannot be in the past.";
  }
  return errors;
}

export function buildDraftFromForm(
  state: PublishFormState,
  shipmentId: string,
  idempotencyKey?: string,
): TsmPostDraft {
  const key =
    idempotencyKey?.trim() ||
    `tsm-${shipmentId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    idempotencyKey: key,
    originLabel: state.originLabel.trim(),
    originCity: state.originCity.trim(),
    originState: state.originState.trim(),
    originLat: Number(state.originLat ?? 0),
    originLng: Number(state.originLng ?? 0),
    destinationLabel: state.destinationLabel.trim(),
    destinationCity: state.destinationCity.trim(),
    destinationState: state.destinationState.trim(),
    destinationLat: Number(state.destinationLat ?? 0),
    destinationLng: Number(state.destinationLng ?? 0),
    routeDistanceKm: Number(state.route?.distanceKm ?? 0),
    routeDurationMinutes: Number(state.route?.durationMinutes ?? 0),
    routePolyline: state.route?.polyline ?? "",
    routeSnapshotSource: state.route?.source ?? "tsm",
    material: state.material.trim(),
    materialCode: state.materialCode.trim() || null,
    weightTonnes: state.weightTonnes,
    requiredBodyType: null,
    requiredTyres: null,
    trucksNeeded: state.trucksNeeded,
    priceAmount: state.priceAmount,
    priceType: state.priceType,
    advancePercentage: Math.round(state.advancePercentage),
    pickupDate: state.pickupDate,
    listingDuration: state.listingDuration,
    requiredVehicleCategoryCode: state.categoryCode || null,
    requiredBodyStyleCodes: [...state.bodyStyleCodes],
    requiredConfigurationCodes: [...state.configurationCodes],
    requiredVehicleCategoryCodes: state.categoryCode ? [state.categoryCode] : [],
    sourceShipmentId: shipmentId,
  };
}

export function draftGate(
  state: PublishFormState,
  shipmentId: string,
  catalog?: VehicleCatalog | null,
  opts?: {
    idempotencyKey?: string;
    bridgeMode?: BridgeMode | string;
  },
) {
  const fieldErrors = validatePublishForm(state, catalog);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false as const, fieldErrors, reason: "Fix the highlighted fields." };
  }
  const draft = buildDraftFromForm(state, shipmentId, opts?.idempotencyKey);
  const mode = opts?.bridgeMode === "live" ? "live" : "mock";
  const gate = publishGateForMode(draft, mode);
  if (!gate.ok) return { ok: false as const, fieldErrors, reason: gate.reason };
  return { ok: true as const, draft, fieldErrors: {} as FormFieldErrors };
}

export function pricingTotals(state: PublishFormState, catalog: VehicleCatalog | null) {
  const ceiling = slotCeilingForConfigs(catalog, state.configurationCodes);
  const tonnes =
    state.priceType === "per_ton"
      ? ceiling && ceiling > 0
        ? ceiling * state.trucksNeeded
        : state.weightTonnes * state.trucksNeeded
      : 1;
  const total =
    state.priceType === "per_ton" ? state.priceAmount * tonnes : state.priceAmount;
  const advance = Math.round((total * state.advancePercentage) / 100);
  return { total, advance, balance: Math.round(total - advance), tonnes };
}

/** Post-load configs for a category (envelopes preferred), optionally filtered by body style. */
export function configsForCategory(
  catalog: VehicleCatalog,
  categoryCode: string,
  bodyStyleCode?: string,
): VehicleConfiguration[] {
  let list = postLoadConfigurations(catalog, categoryCode);
  if (bodyStyleCode) {
    const filtered = list.filter(
      (c) => !c.bodyStyleCode || c.bodyStyleCode === bodyStyleCode,
    );
    if (filtered.length > 0) list = filtered;
  }
  return sortPostConfigs(list);
}
