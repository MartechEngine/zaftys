"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type OpsStreamEvent = {
  type: "ops.changed";
  revision: string;
  shipmentCount: number;
  exceptionCount: number;
  activityCount: number;
  at: string;
};

const BASE_RECONNECT_MS = 2_000;
const MAX_RECONNECT_MS = 30_000;

/**
 * Subscribe to /api/ops/stream. Calls onChange when ops revision changes.
 */
export function useOpsStream(enabled = true, onChange?: (event: OpsStreamEvent) => void) {
  const [connected, setConnected] = useState(false);
  const [lastRevision, setLastRevision] = useState<string | null>(null);
  const [lastAt, setLastAt] = useState<string | null>(null);
  const sourceRef = useRef<EventSource | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

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
      const source = new EventSource("/api/ops/stream");
      sourceRef.current = source;

      source.onopen = () => {
        attemptRef.current = 0;
        setConnected(true);
      };

      source.addEventListener("ops", (event) => {
        try {
          const payload = JSON.parse((event as MessageEvent).data) as OpsStreamEvent;
          setLastRevision(payload.revision);
          setLastAt(payload.at);
          onChangeRef.current?.(payload);
        } catch {
          /* ignore malformed */
        }
      });

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

  return { connected, lastRevision, lastAt, disconnect };
}
