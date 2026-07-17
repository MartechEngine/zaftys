"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import type { OverflowLoad } from "@/lib/network/overflow-store";
import { cn } from "@/lib/utils";

const statusMap = {
  open: { label: "Open", className: "bg-accent/15 text-accent" },
  review: { label: "In review", className: "bg-amber-500/15 text-amber-200" },
  accepted: { label: "Accepted", className: "bg-emerald-500/15 text-emerald-300" },
  rejected: { label: "Rejected", className: "bg-red-500/15 text-red-300" },
};

export function OverflowQueue() {
  const router = useRouter();
  const [loads, setLoads] = useState<OverflowLoad[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    try {
      const data = await api.getNetworkOverflow({ q: query || undefined });
      setLoads(data);
    } catch {
      toast.error("Failed to load overflow queue");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [query]);

  useEffect(() => {
    load();
  }, [load]);

  async function runAction(id: string, action: "accept" | "review" | "reject") {
    setBusyId(id);
    try {
      if (action === "accept") {
        const result = await api.acceptNetworkOverflow(id);
        toast.success("Load accepted — shipment created");
        router.push(`/shipments/${result.shipment.id}`);
        return;
      }
      if (action === "review") {
        await api.reviewNetworkOverflow(id);
        toast.success("Marked for review");
      } else {
        await api.rejectNetworkOverflow(id);
        toast.success("Load rejected");
      }
      await load(true);
    } catch {
      toast.error(`Could not ${action} load`);
    } finally {
      setBusyId(null);
    }
  }

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    load();
  }

  return (
    <>
      <form onSubmit={onSearch} className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search booking ID, route…"
          className="h-9 w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-body outline-none backdrop-blur-sm placeholder:text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20 sm:w-72"
        />
        <div className="flex gap-2">
          <Button type="submit" size="sm" variant="outline" disabled={loading}>
            Search
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={refreshing}
            onClick={() => load(true)}
          >
            <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", refreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-sm text-muted-foreground">
          Loading overflow queue…
        </div>
      ) : (
        <DataTable
          rows={loads}
          emptyMessage="No overflow loads in queue."
          columns={[
            {
              key: "id",
              header: "Booking",
              render: (r) => (
                <span className="font-mono font-medium text-heading">{r.bookingId}</span>
              ),
            },
            { key: "route", header: "Route", render: (r) => r.route },
            {
              key: "commodity",
              header: "Load",
              render: (r) => `${r.commodity} · ${r.tonnage} MT`,
            },
            { key: "posted", header: "Posted", render: (r) => r.posted },
            {
              key: "status",
              header: "Status",
              render: (r) => <StatusPill status={r.status} map={statusMap} />,
            },
            {
              key: "actions",
              header: "",
              render: (r) => {
                if (r.status === "accepted" && r.shipmentId) {
                  return (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/shipments/${r.shipmentId}`}>View shipment</Link>
                    </Button>
                  );
                }
                if (r.status === "rejected") {
                  return <span className="text-xs text-muted-foreground">Declined</span>;
                }
                const busy = busyId === r.id;
                return (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="accent"
                      disabled={busy}
                      onClick={() => runAction(r.id, "accept")}
                    >
                      Accept
                    </Button>
                    {r.status === "open" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busy}
                        onClick={() => runAction(r.id, "review")}
                      >
                        Review
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={busy}
                      onClick={() => runAction(r.id, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      )}
    </>
  );
}
