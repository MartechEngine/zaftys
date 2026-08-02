"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import type { NetworkListing, NetworkOffer } from "@/lib/network/listing-types";
import { cn } from "@/lib/utils";

type DeskRow = {
  id: string;
  listing: NetworkListing;
  offers: NetworkOffer[];
  openOffers: number;
  shipment: {
    publicId: string;
    origin: string;
    destination: string;
    commodity: string;
  } | null;
};

const STATE_FILTERS = [
  { id: "all", label: "All" },
  { id: "posted", label: "Posted" },
  { id: "offers_received", label: "Offers" },
  { id: "partially_assigned", label: "Partial" },
  { id: "draft", label: "Draft" },
  { id: "assigned", label: "Assigned" },
] as const;

const stateMap: Record<string, { label: string; className: string }> = {
  posted: { label: "Posted", className: "bg-primary/15 text-primary" },
  offers_received: { label: "Offers", className: "bg-amber-500/15 text-amber-200" },
  partially_assigned: { label: "Partial", className: "bg-amber-500/15 text-amber-200" },
  assigned: { label: "Assigned", className: "bg-emerald-500/15 text-emerald-300" },
  draft: { label: "Draft", className: "bg-white/10 text-muted-foreground" },
  withdrawn: { label: "Withdrawn", className: "bg-white/10 text-muted-foreground" },
  expired: { label: "Expired", className: "bg-white/10 text-muted-foreground" },
};

function formatPostedAge(iso?: string) {
  if (!iso) return "—";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function OutboundListingsDesk() {
  const router = useRouter();
  const [rows, setRows] = useState<DeskRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.listOutboundListings(
        stateFilter === "all" ? undefined : stateFilter,
      );
      setRows(
        data.map((r) => ({
          id: r.listing.id,
          listing: r.listing,
          offers: r.offers,
          openOffers: r.openOffers,
          shipment: r.shipment,
        })),
      );
    } catch {
      toast.error("Failed to load outbound listings");
    } finally {
      setLoading(false);
    }
  }, [stateFilter]);

  useEffect(() => {
    load();
  }, [load]);

  async function withdraw(shipmentId: string) {
    setWithdrawingId(shipmentId);
    try {
      await api.withdrawNetworkListing(shipmentId);
      toast.success("Listing withdrawn");
      await load();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not withdraw");
    } finally {
      setWithdrawingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {STATE_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setStateFilter(f.id)}
            className={cn(
              "rounded-lg px-3 py-1 text-xs font-medium transition-colors",
              stateFilter === f.id
                ? "bg-primary/15 text-primary"
                : "border border-white/10 text-muted-foreground hover:bg-white/5",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading outbound desk…</p>
      ) : (
        <DataTable
          emptyMessage="No ZAFTYS-posted listings yet. Open a pending shipment and use Post to TranZfort."
          rows={rows}
          columns={[
            {
              key: "shipment",
              header: "Shipment",
              render: (row) => (
                <div>
                  <Link
                    href={`/shipments/${row.listing.shipmentId}`}
                    className="font-medium text-link hover:underline"
                  >
                    {row.shipment?.publicId ?? row.listing.shipmentId}
                  </Link>
                  {row.shipment && (
                    <p className="text-xs text-muted-foreground">
                      {row.shipment.origin} → {row.shipment.destination}
                    </p>
                  )}
                </div>
              ),
            },
            {
              key: "commodity",
              header: "Commodity",
              render: (row) => row.shipment?.commodity ?? "—",
            },
            {
              key: "state",
              header: "Listing",
              render: (row) => (
                <div className="space-y-1">
                  <StatusPill status={row.listing.state} map={stateMap} />
                  {(row.listing.liveOnTranzfort || row.listing.superLoad) && (
                    <div className="flex flex-wrap gap-1">
                      {row.listing.liveOnTranzfort ? (
                        <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-200">
                          Live
                        </span>
                      ) : row.listing.tranzfortLoadId?.startsWith("tz-mock-") ? (
                        <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-100">
                          Mock
                        </span>
                      ) : null}
                      {row.listing.superLoad && (
                        <span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[10px] text-violet-200">
                          Super
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ),
            },
            {
              key: "posted",
              header: "Posted",
              render: (row) => (
                <span className="text-xs text-muted-foreground">
                  {row.listing.state === "draft"
                    ? "Draft"
                    : formatPostedAge(row.listing.postedAt)}
                </span>
              ),
            },
            {
              key: "rate",
              header: "Rate / trucks",
              render: (row) =>
                `₹${row.listing.rateInr.toLocaleString("en-IN")}${
                  row.listing.priceType === "per_ton" ? "/t" : ""
                } · ${row.listing.trucksFilled}/${row.listing.trucksNeeded}`,
            },
            {
              key: "offers",
              header: "Offers",
              render: (row) =>
                row.openOffers > 0 ? (
                  <span className="font-semibold text-amber-200">{row.openOffers} open</span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                ),
            },
            {
              key: "action",
              header: "",
              render: (row) => {
                const canWithdraw = !["assigned", "withdrawn", "expired"].includes(
                  row.listing.state,
                );
                return (
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/shipments/${row.listing.shipmentId}?tab=offers`}>
                        Review
                      </Link>
                    </Button>
                    {canWithdraw && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={withdrawingId === row.listing.shipmentId}
                        onClick={() => withdraw(row.listing.shipmentId)}
                      >
                        Withdraw
                      </Button>
                    )}
                  </div>
                );
              },
            },
          ]}
        />
      )}
    </div>
  );
}
