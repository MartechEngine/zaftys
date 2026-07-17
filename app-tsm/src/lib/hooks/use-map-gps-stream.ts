"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MapGpsMarker = {
  id: string;
  shipmentId: string;
  publicId: string;
  lat: number;
  lng: number;
  vehicle?: string;
  driver?: string;
  status: string;
  stale?: boolean;
};

type StreamPayload = {
  markers: MapGpsMarker[];
  at: string;
};

export function useMapGpsStream(enabled = true) {
  const [markers, setMarkers] = useState<MapGpsMarker[]>([]);
  const [connected, setConnected] = useState(false);
  const [lastAt, setLastAt] = useState<string | null>(null);
  const sourceRef = useRef<EventSource | null>(null);

  const disconnect = useCallback(() => {
    sourceRef.current?.close();
    sourceRef.current = null;
    setConnected(false);
  }, []);

  useEffect(() => {
    if (!enabled) {
      disconnect();
      return;
    }

    const source = new EventSource("/api/map/stream");
    sourceRef.current = source;

    source.onopen = () => setConnected(true);
    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as StreamPayload;
        setMarkers(payload.markers ?? []);
        setLastAt(payload.at ?? null);
      } catch {
        /* ignore malformed frames */
      }
    };
    source.onerror = () => {
      setConnected(false);
      source.close();
      sourceRef.current = null;
    };

    return () => {
      source.close();
      sourceRef.current = null;
      setConnected(false);
    };
  }, [enabled, disconnect]);

  return { markers, connected, lastAt, disconnect };
}
