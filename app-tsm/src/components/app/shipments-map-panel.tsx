"use client";

import Link from "next/link";
import { LiveMap, markersFromGeo, routeFromGeo } from "@/components/app/live-map";
import { Button } from "@/components/ui/button";
import type { ShipmentRecord } from "@/lib/dev-store";

export function ShipmentsMapPanel({
  rows,
  emptyMessage,
}: {
  rows: ShipmentRecord[];
  emptyMessage: string;
}) {
  const withGeo = rows.filter((s) => s.geo);
  if (withGeo.length === 0) {
    return (
      <div className="space-y-3 px-2 py-10 text-center">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/map">Open live map</Link>
        </Button>
      </div>
    );
  }

  const markers = withGeo.flatMap((s) =>
    markersFromGeo({
      id: s.id,
      publicId: s.publicId,
      vehicle: s.vehicle,
      driver: s.driver,
      geo: s.geo,
      href: `/shipments/${s.id}`,
    }),
  );
  const routes = withGeo.map((s) => routeFromGeo(s.id, s.geo!));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-xs text-muted-foreground">
          Showing {withGeo.length} of {rows.length} shipment
          {rows.length === 1 ? "" : "s"} with GPS / corridor geo
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/map">Full live map</Link>
        </Button>
      </div>
      <LiveMap markers={markers} routes={routes} height="28rem" showPlaceholderLegend />
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {withGeo.slice(0, 12).map((s) => (
          <li key={s.id}>
            <Link
              href={`/shipments/${s.id}`}
              className="block rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm transition-colors hover:border-primary/30"
            >
              <span className="font-mono text-link">{s.publicId}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {s.origin} → {s.destination}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
