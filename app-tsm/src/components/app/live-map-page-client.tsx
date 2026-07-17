"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { LiveMapPanel, type MapShipment } from "@/components/app/live-map-panel";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { useMapGpsStream, type MapGpsMarker } from "@/lib/hooks/use-map-gps-stream";
import { cn } from "@/lib/utils";

const POLL_MS = 30_000;

function mergeMarkers(shipments: MapShipment[], markers: MapGpsMarker[]) {
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

export function LiveMapPageClient({
  initialShipments,
}: {
  initialShipments: MapShipment[];
}) {
  const [shipments, setShipments] = useState(initialShipments);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const { markers: streamMarkers, connected, lastAt } = useMapGpsStream(true);

  const refresh = useCallback(async (quiet = false) => {
    if (!quiet) setRefreshing(true);
    try {
      const markers = await api.getMapVehicles();
      setShipments((prev) => mergeMarkers(prev, markers));
      setLastRefresh(new Date());
    } catch {
      // keep last known positions
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setShipments(initialShipments);
  }, [initialShipments]);

  useEffect(() => {
    if (!connected || streamMarkers.length === 0) return;
    setShipments((prev) => mergeMarkers(prev, streamMarkers));
    if (lastAt) setLastRefresh(new Date(lastAt));
  }, [streamMarkers, connected, lastAt]);

  useEffect(() => {
    refresh(true);
  }, [refresh]);

  useEffect(() => {
    if (connected) return;
    const onFocus = () => refresh(true);
    window.addEventListener("focus", onFocus);
    const id = window.setInterval(() => refresh(true), POLL_MS);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(id);
    };
  }, [refresh, connected]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {connected ? "Live GPS stream · updates every 5s" : "GPS positions refresh every 30s"}
          {lastRefresh ? ` · Last update ${lastRefresh.toLocaleTimeString()}` : ""}
        </p>
        <Button type="button" size="sm" variant="outline" disabled={refreshing} onClick={() => refresh()}>
          <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", refreshing && "animate-spin")} />
          Refresh map
        </Button>
      </div>
      <LiveMapPanel shipments={shipments} />
    </>
  );
}
