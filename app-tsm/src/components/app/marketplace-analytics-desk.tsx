"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/app/data-table";
import type {
  MarketplaceAnalyticsResult,
  MarketplaceLoadFunnelRow,
} from "@/lib/tsm/analytics-types";

export function MarketplaceAnalyticsDesk() {
  const [data, setData] = useState<MarketplaceAnalyticsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tsm/tranzfort/analytics");
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Could not load analytics.");
        setData(null);
        return;
      }
      setData(json.data as MarketplaceAnalyticsResult);
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

  const kpis = data?.kpis;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {data?.honesty ?? (loading ? "Loading…" : "")}
          {data?.supplierIdMasked ? (
            <>
              {" "}
              · supplier{" "}
              <span className="font-mono text-foreground">{data.supplierIdMasked}</span>
            </>
          ) : null}
          {data ? (
            <>
              {" · "}
              source <span className="text-foreground">{data.source}</span>
            </>
          ) : null}
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => void load()}>
            Refresh
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/network/my-loads">My Loads</Link>
          </Button>
        </div>
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "Active loads", value: kpis?.activeLoads },
          { label: "Pending bookings", value: kpis?.pendingBookings },
          { label: "Active trips", value: kpis?.activeTrips },
          { label: "In transit", value: kpis?.inTransitTrips },
          { label: "Completed trips", value: kpis?.completedTrips },
          { label: "Posted today", value: kpis?.loadsPostedToday },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3"
          >
            <p className="text-[11px] text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-heading">
              {loading && data == null ? "…" : (card.value ?? 0)}
            </p>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-heading">Recent loads · funnel</p>
        <DataTable<MarketplaceLoadFunnelRow>
          rows={data?.topLoads ?? []}
          emptyMessage={
            data?.linked
              ? "No parent loads for this supplier yet."
              : "Link a TranZfort supplier to see analytics."
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
                  <p className="font-mono text-[10px] text-muted-foreground">{row.loadId}</p>
                </div>
              ),
            },
            {
              key: "cargo",
              header: "Cargo",
              render: (row) => (
                <span>
                  {row.material}{" "}
                  <span className="text-xs capitalize text-muted-foreground">· {row.status}</span>
                </span>
              ),
            },
            {
              key: "trucks",
              header: "Trucks",
              render: (row) => (
                <span className="tabular-nums">
                  {row.trucksBooked}/{row.trucksNeeded}
                </span>
              ),
            },
            {
              key: "impressions",
              header: "Impressions",
              render: (row) => <span className="tabular-nums">{row.impressions}</span>,
            },
            {
              key: "views",
              header: "Detail views",
              render: (row) => <span className="tabular-nums">{row.detailViews}</span>,
            },
          ]}
        />
      </div>
    </div>
  );
}
