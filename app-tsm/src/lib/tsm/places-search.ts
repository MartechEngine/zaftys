import { cityCoords, type GeoPoint } from "@/lib/geo";
import type { PlaceSuggestion, RoutePreview } from "@/lib/tsm/catalog-types";

/**
 * Client-safe place helpers. The TZ offline mirror reads the filesystem, so it
 * lives in `places-server.ts` — never import it from here.
 *
 * Extra city centroids — fallback when the TZ places mirror is unavailable.
 */
const EXTRA_CITIES: Record<string, GeoPoint & { state: string }> = {
  Mumbai: { lat: 19.076, lng: 72.8777, state: "MH" },
  Nashik: { lat: 19.9975, lng: 73.7898, state: "MH" },
  Aurangabad: { lat: 19.8762, lng: 75.3433, state: "MH" },
  Solapur: { lat: 17.6599, lng: 75.9064, state: "MH" },
  Kolhapur: { lat: 16.705, lng: 74.2433, state: "MH" },
  Indore: { lat: 22.7196, lng: 75.8577, state: "MP" },
  Bhopal: { lat: 23.2599, lng: 77.4126, state: "MP" },
  Raipur: { lat: 21.2514, lng: 81.6296, state: "CG" },
  Hyderabad: { lat: 17.385, lng: 78.4867, state: "TS" },
  Bangalore: { lat: 12.9716, lng: 77.5946, state: "KA" },
  Chennai: { lat: 13.0827, lng: 80.2707, state: "TN" },
  Ahmedabad: { lat: 23.0225, lng: 72.5714, state: "GJ" },
  Surat: { lat: 21.1702, lng: 72.8311, state: "GJ" },
  Jaipur: { lat: 26.9124, lng: 75.7873, state: "RJ" },
  Delhi: { lat: 28.6139, lng: 77.209, state: "DL" },
  Kanpur: { lat: 26.4499, lng: 80.3319, state: "UP" },
  Lucknow: { lat: 26.8467, lng: 80.9462, state: "UP" },
  Kolkata: { lat: 22.5726, lng: 88.3639, state: "WB" },
};

const MH_DEFAULTS: Record<string, string> = {
  Amravati: "MH",
  Nagpur: "MH",
  Wardha: "MH",
  Pune: "MH",
  Chandrapur: "MH",
};

function allCityEntries(): Array<{ city: string; lat: number; lng: number; state: string }> {
  const out: Array<{ city: string; lat: number; lng: number; state: string }> = [];
  for (const [city, point] of Object.entries(EXTRA_CITIES)) {
    out.push({ city, lat: point.lat, lng: point.lng, state: point.state });
  }
  for (const city of ["Amravati", "Nagpur", "Wardha", "Pune", "Chandrapur"]) {
    const point = cityCoords(city);
    if (!point) continue;
    if (out.some((c) => c.city.toLowerCase() === city.toLowerCase())) continue;
    out.push({
      city,
      lat: point.lat,
      lng: point.lng,
      state: MH_DEFAULTS[city] ?? "MH",
    });
  }
  return out;
}

export function searchCityPlaces(query: string, limit = 8): PlaceSuggestion[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  return allCityEntries()
    .filter((c) => c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q))
    .slice(0, limit)
    .map((c) => ({
      id: `city:${c.city.toLowerCase()}`,
      label: `${c.city} city center`,
      city: c.city,
      state: c.state,
      lat: c.lat,
      lng: c.lng,
      source: "city" as const,
    }));
}

export function resolveCityPlace(input: {
  city?: string;
  label?: string;
  state?: string;
  lat?: number;
  lng?: number;
}): PlaceSuggestion | null {
  const city = (input.city ?? "").trim();
  if (!city) return null;

  // Structured coords from the shipment / picker win over centroid guesses.
  if (Number.isFinite(input.lat) && Number.isFinite(input.lng)) {
    return {
      id: `resolved:${city.toLowerCase()}`,
      label: (input.label ?? "").trim() || `${city}${input.state ? `, ${input.state}` : ""}`,
      city,
      state: (input.state ?? "").trim(),
      lat: Number(input.lat),
      lng: Number(input.lng),
      source: "resolved",
    };
  }

  const known = allCityEntries().find((c) => c.city.toLowerCase() === city.toLowerCase());
  const lat = Number.isFinite(input.lat) ? Number(input.lat) : known?.lat;
  const lng = Number.isFinite(input.lng) ? Number(input.lng) : known?.lng;
  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    id: `resolved:${city.toLowerCase()}`,
    label: (input.label ?? "").trim() || `${city} pickup / drop`,
    city: known?.city ?? city,
    state: (input.state ?? known?.state ?? "").trim() || "MH",
    lat,
    lng,
    source: "resolved",
  };
}

function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Approximate road distance (~1.25× straight line) when OSRM is unavailable. */
export function estimateRoutePreview(
  origin: Pick<PlaceSuggestion, "lat" | "lng">,
  destination: Pick<PlaceSuggestion, "lat" | "lng">,
): RoutePreview {
  const straight = haversineKm(
    { lat: origin.lat, lng: origin.lng },
    { lat: destination.lat, lng: destination.lng },
  );
  const distanceKm = Math.round(straight * 1.25 * 10) / 10;
  const durationMinutes = Math.max(30, Math.round((distanceKm / 45) * 60));
  return {
    distanceKm,
    durationMinutes,
    polyline: "",
    source: "tsm-estimate",
  };
}
