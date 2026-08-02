"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/data-table";
import type {
  SupplierLoadRow,
  SupplierLoadTab,
  SupplierLoadsListResult,
} from "@/lib/tsm/loads-types";

type Tab = SupplierLoadTab;

const PAGE_SIZE = 25;

const TABS: { id: Tab; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "expired", label: "Expired" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
  { id: "all", label: "All" },
];

function formatMoney(amount: number, priceType: string) {
  const n = amount.toLocaleString("en-IN");
  return priceType === "per_ton" ? `₹${n}/t` : `₹${n}`;
}

export function MyLoadsDesk() {
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<SupplierLoadsListResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

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
      const res = await fetch(`/api/tsm/tranzfort/loads?${params}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Could not load My Loads.");
        setData(null);
        return;
      }
      setData(json.data as SupplierLoadsListResult);
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

  async function cancelLoad(row: SupplierLoadRow) {
    if (row.status !== "active" && row.status !== "draft") return;
    if (
      !window.confirm(
        `Cancel this listing on TranZfort?\n${row.originLabel} → ${row.destinationLabel}\n${row.material}`,
      )
    ) {
      return;
    }
    setCancellingId(row.id);
    try {
      const res = await fetch(`/api/tsm/tranzfort/loads/${row.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error?.message ?? "Could not cancel load.");
        return;
      }
      toast.success("Listing cancelled on TranZfort");
      await load();
    } catch {
      toast.error("Could not reach the server.");
    } finally {
      setCancellingId(null);
    }
  }

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
            placeholder="Search material / lane"
            className="h-9 w-48 sm:w-64"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => void load()}>
            Refresh
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href="/shipments?status=pending">Post from shipment</Link>
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
        <p className="text-sm text-muted-foreground">Loading My Loads…</p>
      ) : (
        <DataTable<SupplierLoadRow>
          rows={data?.items ?? []}
          emptyMessage={
            data?.linked
              ? "No loads for this filter."
              : "Sign in with TranZfort (or link supplier) to see My Loads."
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
              render: (row) => (
                <span>
                  {row.material}
                  {row.weightTonnes != null ? ` · ${row.weightTonnes}T` : ""}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <div className="flex flex-wrap gap-1">
                  <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] capitalize">
                    {row.status}
                  </span>
                  {row.isSuperLoad && (
                    <span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[10px] text-violet-200">
                      Super
                    </span>
                  )}
                  {row.postedFromTsm && (
                    <span className="rounded-full bg-sky-500/15 px-1.5 py-0.5 text-[10px] text-sky-200">
                      Posted from TSM
                    </span>
                  )}
                  {row.id.startsWith("tz-mock-") && (
                    <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-100">
                      Mock
                    </span>
                  )}
                </div>
              ),
            },
            {
              key: "rate",
              header: "Rate / trucks",
              render: (row) =>
                `${formatMoney(row.priceAmount, row.priceType)} · ${row.trucksBooked}/${row.trucksNeeded}`,
            },
            {
              key: "actions",
              header: "",
              render: (row) => (
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    className="text-link hover:underline"
                    onClick={() => void navigator.clipboard.writeText(row.id)}
                  >
                    Copy id
                  </button>
                  {(row.status === "active" || row.status === "draft") &&
                    data?.source === "live" &&
                    !row.id.startsWith("tz-mock-") && (
                      <button
                        type="button"
                        className="text-destructive hover:underline disabled:opacity-50"
                        disabled={cancellingId === row.id}
                        onClick={() => void cancelLoad(row)}
                      >
                        {cancellingId === row.id ? "Cancelling…" : "Cancel"}
                      </button>
                    )}
                </div>
              ),
            },
          ]}
        />
      )}

      {(hasPrev || hasNext) && (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasPrev || loading}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
          >
            Previous
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
