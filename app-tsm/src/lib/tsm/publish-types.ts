/**
 * Shared types for the TSM → TranZfort publish form.
 *
 * Client-safe (no server-only imports) so the form components and the BFF
 * routes agree on one shape. Catalog field names mirror the live TranZfort
 * `get_vehicle_catalog` / `search_materials` payloads.
 */

import type { TsmListingDuration, TsmPriceType } from "@/lib/tsm/post-draft";

export type TzCatalogSource = "tranzfort" | "demo-sample";

export type TzVehicleCategory = {
  code: string;
  nameEn: string;
  uiMode?: string;
};

export type TzBodyStyle = {
  code: string;
  categoryCode: string;
  nameEn: string;
};

export type TzVehicleConfiguration = {
  code: string;
  categoryCode: string;
  bodyStyleCode: string | null;
  labelEn: string;
  wheels: number | null;
  lengthFt: string | null;
  loadingTonMin: number | null;
  loadingTonMax: number | null;
  postSelectable: boolean;
  isSpecial: boolean;
};

export type TzVehicleCatalog = {
  source: TzCatalogSource;
  fetchedAt: string;
  categories: TzVehicleCategory[];
  bodyStyles: TzBodyStyle[];
  configurations: TzVehicleConfiguration[];
};

export type TzMaterial = {
  code: string;
  nameEn: string;
  groupCode?: string;
};

/** How precise a resolved place is — city centroids are not a real gate pin. */
export type PlacePrecision = "exact" | "city";

export type PublishPlaceSuggestion = {
  id: string;
  label: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  precision: PlacePrecision;
  source: string;
};

export type RoutePreview = {
  distanceKm: number;
  durationMinutes: number;
  polyline: string;
  source: string;
  /** True when derived locally (straight-line estimate), not a routing engine. */
  estimated: boolean;
};

/** Selected place on the form. `lat`/`lng` stay null until a suggestion is picked. */
export type PublishPlaceValue = {
  /** Exact location text sent as `origin_label` / `destination_label`. */
  label: string;
  city: string;
  state: string;
  lat: number | null;
  lng: number | null;
  precision: PlacePrecision | null;
  source: string | null;
};

export type PublishFormState = {
  origin: PublishPlaceValue;
  destination: PublishPlaceValue;
  /** yyyy-mm-dd */
  pickupDate: string;
  listingDuration: TsmListingDuration;
  route: RoutePreview | null;
  material: string;
  materialCode: string | null;
  /** Kept as text for input UX; parsed on validate/build. */
  weightTonnes: string;
  categoryCodes: string[];
  bodyStyleCodes: string[];
  configurationCodes: string[];
  trucksNeeded: string;
  priceAmount: string;
  priceType: TsmPriceType;
  advancePercentage: number;
  /** TSM-only context, never sent to TranZfort. */
  plantNotes: string;
  /** Explicit opt-in when publishing with approximate (city centroid) pins. */
  approximatePinAcknowledged: boolean;
};

export type PublishFormErrorKey =
  | "origin_city"
  | "origin_label"
  | "origin_coordinates"
  | "destination_city"
  | "destination_label"
  | "destination_coordinates"
  | "pickup_date"
  | "listing_duration"
  | "route"
  | "material_code"
  | "weight_tonnes"
  | "vehicle_requirements"
  | "trucks_needed"
  | "price_amount"
  | "price_type"
  | "approximate_pin";

export type PublishFormErrors = Partial<Record<PublishFormErrorKey, string>>;

export type PublishBridgeMode = "mock" | "live";

export type { TsmListingDuration, TsmPriceType };
