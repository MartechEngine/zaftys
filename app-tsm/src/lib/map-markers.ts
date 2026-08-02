import type { ShipmentGeo } from "@/lib/geo";

export interface MapVehicleMarker {
  id: string;
  shipmentId: string;
  publicId: string;
  lat: number;
  lng: number;
  vehicle?: string;
  driver?: string;
  status: string;
  stale?: boolean;
}

export function vehicleMarkersFromShipment(input: {
  id: string;
  publicId: string;
  status: string;
  vehicle?: string;
  driver?: string;
  geo?: ShipmentGeo;
}): MapVehicleMarker | null {
  // Prefer live GPS; fall back to origin centroid so the map isn't empty
  // after Postgres cutover when telematics positions are sparse (honest stale).
  const pin = input.geo?.current ?? input.geo?.origin;
  if (!pin) return null;
  return {
    id: input.id,
    shipmentId: input.id,
    publicId: input.publicId,
    lat: pin.lat,
    lng: pin.lng,
    vehicle: input.vehicle,
    driver: input.driver,
    status: input.status,
    stale: Boolean(input.geo?.gpsStale || !input.geo?.current),
  };
}
