"use client";

import { useMemo } from "react";
import { LiveMap, markersFromGeo, routeFromGeo } from "@/components/app/live-map";
import type { ShipmentGeo } from "@/lib/geo";

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
  const markers = useMemo(
    () =>
      geo
        ? markersFromGeo({
            id: shipmentId,
            publicId,
            vehicle,
            driver,
            geo,
            href: `/shipments/${shipmentId}`,
          })
        : [],
    [shipmentId, publicId, vehicle, driver, geo],
  );

  const routes = useMemo(
    () => (geo ? [routeFromGeo(shipmentId, geo)] : []),
    [shipmentId, geo],
  );

  if (!geo) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/[0.02] text-sm text-muted-foreground">
        No GPS data for this shipment yet.
      </div>
    );
  }

  return <LiveMap markers={markers} routes={routes} height="12rem" showPlaceholderLegend />;
}
