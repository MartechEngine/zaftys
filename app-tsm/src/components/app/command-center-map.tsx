"use client";

import { useEffect, useMemo, useState } from "react";
import { LiveMap, markersFromGeo } from "@/components/app/live-map";
import type { ShipmentGeo } from "@/lib/geo";
import { useMapGpsStream, type MapGpsMarker } from "@/lib/hooks/use-map-gps-stream";

type MapShipment = {
  id: string;
  publicId: string;
  vehicle?: string;
  driver?: string;
  geo?: ShipmentGeo;
};

function mergeGps(shipments: MapShipment[], markers: MapGpsMarker[]) {
  const byId = new Map(markers.map((m) => [m.shipmentId, m]));
  return shipments.map((s) => {
    const marker = byId.get(s.id);
    if (!marker || !s.geo) return s;
    return {
      ...s,
      geo: {
        ...s.geo,
        current: { lat: marker.lat, lng: marker.lng },
        gpsStale: marker.stale,
      },
    };
  });
}

export function CommandCenterMap({ initialShipments }: { initialShipments: MapShipment[] }) {
  const [shipments, setShipments] = useState(initialShipments);
  const { markers: streamMarkers, connected } = useMapGpsStream(true);

  useEffect(() => {
    setShipments(initialShipments);
  }, [initialShipments]);

  useEffect(() => {
    if (!connected || streamMarkers.length === 0) return;
    setShipments((prev) => mergeGps(prev, streamMarkers));
  }, [streamMarkers, connected]);

  const markers = useMemo(
    () =>
      shipments.flatMap((s) =>
        markersFromGeo({ ...s, href: `/shipments/${s.id}` }).filter((m) => m.variant === "vehicle"),
      ),
    [shipments],
  );

  return <LiveMap markers={markers} height="16rem" showPlaceholderLegend={markers.length > 0} />;
}
