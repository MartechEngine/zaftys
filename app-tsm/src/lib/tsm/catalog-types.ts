/** TranZfort vehicle catalog + materials shapes used by the TSM publish form. */

export type VehicleCategory = {
  code: string;
  nameEn: string;
  nameHi?: string | null;
  uiMode?: string;
};

export type VehicleBodyStyle = {
  categoryCode: string;
  code: string;
  nameEn: string;
  nameHi?: string | null;
};

export type VehicleConfiguration = {
  code: string;
  categoryCode: string;
  bodyStyleCode?: string | null;
  labelEn: string;
  labelHi?: string | null;
  wheelsW?: number | null;
  lengthFt?: string | null;
  loadingTonMin?: number | null;
  loadingTonMax?: number | null;
  isSpecial?: boolean;
  postSelectable?: boolean;
  isPostEnvelope?: boolean;
  matchGroupCode?: string | null;
};

export type VehicleCatalog = {
  categories: VehicleCategory[];
  bodyStyles: VehicleBodyStyle[];
  configurations: VehicleConfiguration[];
  source: "live" | "stub";
  fetchedAt: string;
};

export type MaterialSuggestion = {
  code: string;
  nameEn: string;
  nameHi?: string | null;
  groupCode?: string | null;
};

export type PlaceSuggestion = {
  id: string;
  label: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  source: "saved" | "city" | "resolved" | "tz-offline";
};

export type RoutePreview = {
  distanceKm: number;
  durationMinutes: number;
  polyline: string;
  source: string;
};
