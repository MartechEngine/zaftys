import { DEFAULT_GPS_STALE_MINUTES, isGpsStale } from "@/lib/geo";
import {
  fetchAllShipmentsRaw,
  updateShipmentStatus,
} from "@/lib/data/shipment-repository";
import { logActivity } from "@/lib/dev-store";
import { enqueueNotification } from "@/lib/notifications/dispatch";
import { setGeoOverlay } from "@/lib/map/live-positions";

export type GpsStaleCheckResult = {
  scanned: number;
  flagged: number;
  exceptionsRaised: number;
  thresholdMinutes: number;
  shipmentIds: string[];
};

/**
 * Scan active trips for stale GPS. Optionally raise exception status.
 */
export async function runGpsStaleCheck(input?: {
  thresholdMinutes?: number;
  raiseException?: boolean;
}): Promise<GpsStaleCheckResult> {
  let threshold =
    input?.thresholdMinutes ??
    (Number(process.env.TSM_GPS_STALE_MINUTES) || DEFAULT_GPS_STALE_MINUTES);

  try {
    const { getConfigPatches } = await import("@/lib/mutations/entity-stores");
    const mapPatch = getConfigPatches()["map"] as { gpsStaleMinutes?: number } | undefined;
    if (mapPatch?.gpsStaleMinutes && Number.isFinite(Number(mapPatch.gpsStaleMinutes))) {
      threshold = Number(mapPatch.gpsStaleMinutes);
    }
  } catch {
    /* ignore */
  }

  const raiseException =
    input?.raiseException ?? process.env.TSM_GPS_STALE_RAISE_EXCEPTION === "1";
  const shipments = await fetchAllShipmentsRaw();
  const active = shipments.filter((s) =>
    ["dispatched", "at_plant", "in_transit", "at_weighbridge"].includes(s.status),
  );

  const flagged: string[] = [];
  let exceptionsRaised = 0;

  for (const s of active) {
    const updatedAt = s.geo?.gpsUpdatedAt ?? s.updatedAt;
    const stale = s.geo?.gpsStale === true || isGpsStale(updatedAt, threshold);
    if (!stale) continue;

    flagged.push(s.id);

    setGeoOverlay(s.id, {
      gpsStale: true,
      gpsUpdatedAt: updatedAt,
      current: s.geo?.current,
    });

    logActivity({
      shipmentId: s.id,
      type: "gps.stale",
      message: `GPS stale · last fix ${updatedAt} · threshold ${threshold}m`,
      timestamp: new Date().toISOString(),
    });

    await enqueueNotification({
      id: `gps-stale-${s.id}`,
      title: `Stale GPS · ${s.publicId}`,
      body: `No fresh position for ${s.publicId} (${s.origin} → ${s.destination}).`,
      href: `/shipments/${s.id}`,
      tone: "warning",
      channelId: "n-exc",
    });

    if (raiseException && s.status !== "exception") {
      try {
        await updateShipmentStatus(s.id, "exception");
        exceptionsRaised += 1;
      } catch (err) {
        console.warn("[gps-stale] could not raise exception for", s.id, err);
      }
    }
  }

  return {
    scanned: active.length,
    flagged: flagged.length,
    exceptionsRaised,
    thresholdMinutes: threshold,
    shipmentIds: flagged,
  };
}
