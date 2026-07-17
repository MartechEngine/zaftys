"use client";

import { useMemo } from "react";
import { LiveMap, markersFromGeo, routeFromGeo } from "@/components/app/live-map";
import type { ShipmentGeo } from "@/lib/geo";
import { useMapGpsStream } from "@/lib/hooks/use-map-gps-stream";

export function ShipmentDetailMap({
  shipmentId,
  publicId,
  vehicle,
  driver,
  geo,
}: {
  shipmentId: string;
  publicId: string;
  vehicle?: string;
  driver?: string;
  geo?: ShipmentGeo;
}) {
  const { markers: streamMarkers, connected } = useMapGpsStream(Boolean(geo));
  const liveMarker = streamMarkers.find((m) => m.shipmentId === shipmentId);

  const liveGeo = useMemo(() => {
    if (!geo || !liveMarker) return geo;
    return {
      ...geo,
      current: { lat: liveMarker.lat, lng: liveMarker.lng },
      gpsStale: liveMarker.stale,
    };
  }, [geo, liveMarker]);

  const markers = useMemo(
    () =>
      liveGeo
        ? markersFromGeo({
            id: shipmentId,
            publicId,
            vehicle,
            driver,
            geo: liveGeo,
            href: `/shipments/${shipmentId}`,
          })
        : [],
    [shipmentId, publicId, vehicle, driver, liveGeo],
  );

  const routes = useMemo(
    () => (liveGeo ? [routeFromGeo(shipmentId, liveGeo)] : []),
    [shipmentId, liveGeo],
  );

  if (!geo) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/[0.02] text-sm text-muted-foreground">
        No GPS data for this shipment yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {connected ? (
        <p className="text-xs text-emerald-700">Live GPS stream connected</p>
      ) : (
        <p className="text-xs text-muted-foreground">Using last known position</p>
      )}
      <LiveMap markers={markers} routes={routes} height="12rem" showPlaceholderLegend />
    </div>
  );
}
