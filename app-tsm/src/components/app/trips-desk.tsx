"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/data-table";
import type {
  SupplierTripRow,
  SupplierTripTab,
  SupplierTripsListResult,
} from "@/lib/tsm/trips-types";

const PAGE_SIZE = 25;

const TABS: { id: SupplierTripTab; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "all", label: "All" },
];

function formatWhen(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso.slice(0, 16);
  }
}

export function TripsDesk() {
  const [tab, setTab] = useState<SupplierTripTab>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<SupplierTripsListResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        status: tab,
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      });
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/tsm/tranzfort/trips?${params}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Could not load trips.");
        setData(null);
        return;
      }
      setData(json.data as SupplierTripsListResult);
    } catch {
      setError("Could not reach the server.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [tab, q, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const total = data?.total ?? 0;
  const shownFrom = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const shownTo = Math.min((page + 1) * PAGE_SIZE, total);
  const hasPrev = page > 0;
  const hasNext = shownTo < total;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-0.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                setPage(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                tab === t.id
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
            placeholder="Search lane / truck / stage"
            className="h-9 w-48 sm:w-64"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => void load()}>
            Refresh
          </Button>
        </div>
      </div>

      {data && (
        <p className="text-xs text-muted-foreground">
          {data.honesty}
          {data.supplierIdMasked ? (
            <>
              {" "}
              · supplier <span className="font-mono text-foreground">{data.supplierIdMasked}</span>
            </>
          ) : null}
          {" · "}
          source <span className="text-foreground">{data.source}</span>
          {total > 0 ? ` · showing ${shownFrom}–${shownTo} of ${total}` : null}
        </p>
      )}

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading && !data ? (
        <p className="text-sm text-muted-foreground">Loading trips…</p>
      ) : (
        <DataTable<SupplierTripRow>
          rows={data?.items ?? []}
          emptyMessage={
            data?.linked
              ? "No trips for this filter."
              : "Sign in with TranZfort (or link supplier) to see trips."
          }
          columns={[
            {
              key: "lane",
              header: "Lane",
              render: (row) => (
                <div className="space-y-1">
                  <p className="font-medium">
                    {row.originLabel} → {row.destinationLabel}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">{row.id}</p>
                </div>
              ),
            },
            {
              key: "cargo",
              header: "Cargo",
              render: (row) => <span>{row.material}</span>,
            },
            {
              key: "stage",
              header: "Stage",
              render: (row) => (
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] capitalize">
                  {row.stage.replace(/_/g, " ")}
                </span>
              ),
            },
            {
              key: "truck",
              header: "Truck / trucker",
              render: (row) => (
                <div className="text-sm">
                  <p>{row.truckNumber ?? "—"}</p>
                  <p className="text-xs text-muted-foreground">{row.truckerName ?? "—"}</p>
                </div>
              ),
            },
            {
              key: "assigned",
              header: "Assigned",
              render: (row) => (
                <span className="text-xs text-muted-foreground">{formatWhen(row.assignedAt)}</span>
              ),
            },
          ]}
        />
      )}

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasPrev || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasNext || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
