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
  if (!input.geo?.current) return null;
  return {
    id: input.id,
    shipmentId: input.id,
    publicId: input.publicId,
    lat: input.geo.current.lat,
    lng: input.geo.current.lng,
    vehicle: input.vehicle,
    driver: input.driver,
    status: input.status,
    stale: input.geo.gpsStale,
  };
}
