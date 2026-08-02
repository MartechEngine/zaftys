import { listShipments, tickMapGeo } from "@/lib/data/shipment-repository";
import { vehicleMarkersFromShipment } from "@/lib/map-markers";
import { ensurePositionsHydrated } from "@/lib/map/live-positions";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  await ensurePositionsHydrated();
  // Simulated GPS motion only in demo UI — match /api/map/stream
  if (process.env.TSM_DEMO_UI === "1") {
    tickMapGeo();
  }
  try {
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
  } catch (e) {
    // Rate-limit / transient Fleetbase: empty markers, not a hard 500 on the map shell
    console.warn(
      "[map/vehicles] degraded:",
      e instanceof Error ? e.message : e,
    );
    return apiSuccess([], { total: 0, degraded: true });
  }
}
