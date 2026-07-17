import { listShipments, tickMapGeo } from "@/lib/data/shipment-repository";
import { vehicleMarkersFromShipment } from "@/lib/map-markers";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  // Simulated GPS motion only in demo UI — match /api/map/stream
  if (process.env.TSM_DEMO_UI !== "0") {
    tickMapGeo();
  }
  const active = await listShipments({ tab: "active" });
  const markers = active
    .map((s) =>
      vehicleMarkersFromShipment({
        id: s.id,
        publicId: s.publicId,
        status: s.status,
        vehicle: s.vehicle,
        driver: s.driver,
        geo: s.geo,
      }),
    )
    .filter(Boolean);

  return apiSuccess(markers, { total: markers.length });
}
