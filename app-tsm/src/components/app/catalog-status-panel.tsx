"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type CatalogStatus = {
  syncedAt: string | null;
  materialsCount: number;
  placesCount: number;
  materialsLoaded: boolean;
  placesLoaded: boolean;
  ready: boolean;
  hint: string;
};

function formatAge(iso: string | null) {
  if (!iso) return "never";
  const ms = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(ms) || ms < 0) return iso.slice(0, 19);
  const hours = Math.round(ms / 3600000);
  if (hours < 1) return "just now";
  if (hours < 48) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

/** Settings honesty panel for local TZ catalog mirror (materials + places). */
export function CatalogStatusPanel() {
  const [data, setData] = useState<CatalogStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tsm/catalog/status");
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Could not load catalog status.");
        setData(null);
        return;
      }
      setData(json.data as CatalogStatus);
    } catch {
      setError("Could not reach the server.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-heading">TranZfort catalog mirror</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Local materials + places used by create-shipment and Super Load publish. Sync via CLI —
            this panel is read-only honesty.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
          Refresh
        </Button>
      </div>

      {error && (
        <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      )}

      {loading && !data ? (
        <p className="mt-3 text-xs text-muted-foreground">Checking catalogs…</p>
      ) : data ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[11px] text-muted-foreground">Status</p>
            <p className={data.ready ? "font-medium text-emerald-300" : "font-medium text-amber-200"}>
              {data.ready ? "Ready" : "Incomplete"}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Materials</p>
            <p className="font-medium tabular-nums">{data.materialsCount.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Places</p>
            <p className="font-medium tabular-nums">{data.placesCount.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Last sync</p>
            <p className="font-medium">{formatAge(data.syncedAt)}</p>
          </div>
        </div>
      ) : null}

      {data && (
        <p className="mt-3 text-xs text-muted-foreground">
          {data.hint}
          {!data.ready ? (
            <>
              {" "}
              Run <code className="text-[11px]">npm run catalog:sync</code> in{" "}
              <code className="text-[11px]">app-tsm</code>.
            </>
          ) : null}
        </p>
      )}
    </div>
  );
}
