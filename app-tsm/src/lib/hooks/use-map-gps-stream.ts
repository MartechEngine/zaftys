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

const BASE_RECONNECT_MS = 2_000;
const MAX_RECONNECT_MS = 30_000;

export function useMapGpsStream(enabled = true) {
  const [markers, setMarkers] = useState<MapGpsMarker[]>([]);
  const [connected, setConnected] = useState(false);
  const [lastAt, setLastAt] = useState<string | null>(null);
  const sourceRef = useRef<EventSource | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);

  const disconnect = useCallback(() => {
    if (retryRef.current) {
      clearTimeout(retryRef.current);
      retryRef.current = null;
    }
    sourceRef.current?.close();
    sourceRef.current = null;
    setConnected(false);
  }, []);

  useEffect(() => {
    if (!enabled) {
      disconnect();
      return;
    }

    let cancelled = false;

    const scheduleReconnect = () => {
      if (cancelled) return;
      setConnected(false);
      sourceRef.current?.close();
      sourceRef.current = null;
      const delay = Math.min(
        BASE_RECONNECT_MS * 2 ** attemptRef.current,
        MAX_RECONNECT_MS,
      );
      attemptRef.current += 1;
      retryRef.current = setTimeout(connect, delay);
    };

    const connect = () => {
      if (cancelled) return;
      const source = new EventSource("/api/map/stream");
      sourceRef.current = source;

      source.onopen = () => {
        attemptRef.current = 0;
        setConnected(true);
      };

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
        source.close();
        sourceRef.current = null;
        scheduleReconnect();
      };
    };

    connect();

    return () => {
      cancelled = true;
      disconnect();
      attemptRef.current = 0;
    };
  }, [enabled, disconnect]);

  return { markers, connected, lastAt, disconnect };
}
