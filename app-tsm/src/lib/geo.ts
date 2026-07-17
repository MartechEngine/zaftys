/** Approximate city centroids for demo routes (Maharashtra corridor). */
export interface GeoPoint {
  lat: number;
  lng: number;
}

const CITY_COORDS: Record<string, GeoPoint> = {
  Amravati: { lat: 20.9333, lng: 77.75 },
  Nagpur: { lat: 21.1458, lng: 79.0882 },
  Wardha: { lat: 20.7453, lng: 78.6022 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Chandrapur: { lat: 19.9615, lng: 79.2961 },
};

export const DEFAULT_GPS_STALE_MINUTES = 15;

export function cityCoords(city: string): GeoPoint | undefined {
  const key = Object.keys(CITY_COORDS).find(
    (k) => k.toLowerCase() === city.trim().toLowerCase(),
  );
  return key ? CITY_COORDS[key] : undefined;
}

/** Interpolate a point along a route for in-transit mock GPS. */
export function interpolateRoute(origin: GeoPoint, destination: GeoPoint, t: number): GeoPoint {
  const clamped = Math.min(1, Math.max(0, t));
  return {
    lat: origin.lat + (destination.lat - origin.lat) * clamped,
    lng: origin.lng + (destination.lng - origin.lng) * clamped,
  };
}

export interface ShipmentGeo {
  origin: GeoPoint;
  destination: GeoPoint;
  current?: GeoPoint;
  gpsUpdatedAt?: string;
  gpsStale?: boolean;
}

/** True when last GPS fix is older than threshold (or missing). */
export function isGpsStale(
  gpsUpdatedAt: string | undefined,
  thresholdMinutes = DEFAULT_GPS_STALE_MINUTES,
): boolean {
  if (!gpsUpdatedAt) return true;
  const ts = Date.parse(gpsUpdatedAt);
  if (!Number.isFinite(ts)) return true;
  return Date.now() - ts > thresholdMinutes * 60_000;
}

export function geoForShipment(input: {
  origin: string;
  destination: string;
  status: string;
  updatedAt: string;
  id: string;
  /** When set, use for age-based staleness instead of status-only. */
  gpsUpdatedAt?: string;
}): ShipmentGeo | undefined {
  const origin = cityCoords(input.origin);
  const destination = cityCoords(input.destination);
  if (!origin || !destination) return undefined;

  const active = ["dispatched", "at_plant", "in_transit", "at_weighbridge", "exception"].includes(
    input.status,
  );

  if (!active) {
    return { origin, destination };
  }

  const seed = input.id.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  const t = 0.35 + (seed % 40) / 100;
  const current = interpolateRoute(origin, destination, t);
  const gpsUpdatedAt = input.gpsUpdatedAt ?? input.updatedAt;
  const gpsStale =
    input.status === "exception" || isGpsStale(gpsUpdatedAt, DEFAULT_GPS_STALE_MINUTES);

  return {
    origin,
    destination,
    current,
    gpsUpdatedAt,
    gpsStale,
  };
}
