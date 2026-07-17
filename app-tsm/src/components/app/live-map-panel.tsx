"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LiveMap, markersFromGeo, routeFromGeo, type LiveMapMarker } from "@/components/app/live-map";
import { Card, CardContent } from "@/components/ui/card";
import type { ShipmentGeo } from "@/lib/geo";
import { cn } from "@/lib/utils";

export interface MapShipment {
  id: string;
  publicId: string;
  status: string;
  originType: string;
  vehicle?: string;
  driver?: string;
  geo?: ShipmentGeo;
}

type FilterKey = "all" | "fleet" | "network" | "delayed";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fleet", label: "Own fleet" },
  { key: "network", label: "Network" },
  { key: "delayed", label: "Delayed only" },
];

export function LiveMapPanel({ shipments }: { shipments: MapShipment[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      if (filter === "fleet") return s.originType === "fleet";
      if (filter === "network") return s.originType === "network";
      if (filter === "delayed") return s.status === "exception" || s.geo?.gpsStale;
      return true;
    });
  }, [shipments, filter]);

  const markers: LiveMapMarker[] = useMemo(
    () =>
      filtered.flatMap((s) =>
        markersFromGeo({
          ...s,
          href: `/shipments/${s.id}`,
        }),
      ),
    [filtered],
  );

  const routes = useMemo(
    () =>
      filtered
        .filter((s) => s.geo)
        .map((s) => routeFromGeo(s.id, s.geo!)),
    [filtered],
  );

  const selectedShipment = filtered.find((s) => s.id === selectedId);

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => setFilter(chip.key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === chip.key
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <LiveMap
            markers={markers}
            routes={routes}
            height="calc(100vh - 220px)"
            className="min-h-[400px]"
            selectedId={selectedId}
            onSelect={setSelectedId}
            clusterVehicles
          />
        </div>

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-3 text-sm font-semibold text-navy">Active vehicles</h2>
            {selectedShipment ? (
              <div className="mb-4 rounded-md border border-accent/30 bg-accent/5 p-3 text-sm">
                <p className="font-mono font-medium text-navy">{selectedShipment.publicId}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedShipment.vehicle ?? "Unassigned"}
                </p>
                <Link
                  href={`/shipments/${selectedShipment.id}`}
                  className="mt-2 inline-block text-xs text-link hover:underline"
                >
                  View shipment →
                </Link>
              </div>
            ) : null}
            <ul className="space-y-3">
              {filtered.length === 0 ? (
                <li className="text-sm text-muted-foreground">No matches for this filter.</li>
              ) : (
                filtered.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(s.id)}
                      className={cn(
                        "w-full rounded-xl border border-white/10 p-3 text-left text-sm transition hover:bg-white/[0.04]",
                        selectedId === s.id && "border-primary/40 ring-1 ring-primary/25",
                      )}
                    >
                      <p className="font-mono font-medium text-navy">{s.publicId}</p>
                      <p className="text-xs text-muted-foreground">{s.vehicle ?? "Unassigned"}</p>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
