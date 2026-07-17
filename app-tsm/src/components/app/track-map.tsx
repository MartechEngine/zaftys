"use client";

import { LiveMap, markersFromGeo } from "@/components/app/live-map";
import type { ShipmentGeo } from "@/lib/geo";

export function TrackMap({
  publicId,
  vehicle,
  driver,
  geo,
}: {
  publicId: string;
  vehicle?: string;
  driver?: string;
  geo?: ShipmentGeo;
}) {
  const markers = markersFromGeo({
    id: "track",
    publicId,
    vehicle,
    driver,
    geo,
  });

  return (
    <LiveMap
      markers={markers}
      height="40vh"
      className="min-h-[220px]"
      showPlaceholderLegend={false}
    />
  );
}
