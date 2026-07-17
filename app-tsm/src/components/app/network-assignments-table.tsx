"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/app/data-table";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import { Button } from "@/components/ui/button";
import { api, type NetworkAssignmentRow } from "@/lib/api-client";
import type { ShipmentStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AssignNetworkShipmentButton } from "@/components/app/sprint18-forms";

export function NetworkAssignmentsTable() {
  const [rows, setRows] = useState<NetworkAssignmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    try {
      const data = await api.getNetworkAssignments();
      setRows(data);
    } catch {
      toast.error("Failed to load network assignments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <div className="mb-4 flex justify-end">
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

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-sm text-muted-foreground">
          Loading assignments…
        </div>
      ) : (
        <DataTable
          rows={rows}
          emptyMessage="No network assignments yet. Accept outbound offers or inbound overflow loads."
          columns={[
            {
              key: "source",
              header: "Source",
              render: (r) => (
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {r.source === "outbound" ? "Outbound" : "Overflow"}
                </span>
              ),
            },
            {
              key: "booking",
              header: "Booking",
              render: (r) => (
                <span className="font-mono font-medium text-navy">{r.bookingId}</span>
              ),
            },
            { key: "route", header: "Route", render: (r) => r.route },
            {
              key: "commodity",
              header: "Load",
              render: (r) => `${r.commodity} · ${r.tonnage} MT`,
            },
            {
              key: "shipment",
              header: "Shipment",
              render: (r) =>
                r.shipmentId ? (
                  <Link href={`/shipments/${r.shipmentId}`} className="text-link hover:underline">
                    {r.publicId ?? r.shipmentId.slice(0, 8)}
                  </Link>
                ) : (
                  "—"
                ),
            },
            {
              key: "status",
              header: "Trip status",
              render: (r) =>
                r.status ? (
                  <ShipmentStatusChip status={r.status as ShipmentStatus} />
                ) : (
                  <span>—</span>
                ),
            },
            {
              key: "driver",
              header: "Partner / driver",
              render: (r) => (
                <div className="flex flex-wrap items-center gap-2">
                  <span>{r.driver ?? r.partner ?? "Unassigned"}</span>
                  {r.truck ? (
                    <span className="font-mono text-[11px] text-muted-foreground">{r.truck}</span>
                  ) : null}
                  <AssignNetworkShipmentButton shipmentId={r.shipmentId} driver={r.driver} />
                </div>
              ),
            },
          ]}
        />
      )}
    </>
  );
}
