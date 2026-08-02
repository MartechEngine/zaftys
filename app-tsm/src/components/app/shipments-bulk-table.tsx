"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Package } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AssignDriverDrawer } from "@/components/app/assign-driver-drawer";
import { OriginBadge, ShipmentStatusChip } from "@/components/app/status-chip";
import { NetworkListingChip } from "@/components/app/network-offers-panel";
import { api } from "@/lib/api-client";
import type { ShipmentRecord } from "@/lib/dev-store";

const BULK_STATUSES = [
  { value: "dispatched", label: "Dispatched" },
  { value: "in_transit", label: "In transit" },
  { value: "at_weighbridge", label: "At weighbridge" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export function ShipmentsBulkTable({
  rows,
  emptyMessage,
}: {
  rows: ShipmentRecord[];
  emptyMessage: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<string>("in_transit");
  const [busy, setBusy] = useState(false);
  const [assignTarget, setAssignTarget] = useState<ShipmentRecord | null>(null);

  const allIds = useMemo(() => rows.map((r) => r.id), [rows]);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));
  const selectedRows = useMemo(
    () => rows.filter((r) => selected.has(r.id)),
    [rows, selected],
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(allIds));
  }

  async function applyBulk() {
    if (selected.size === 0) {
      toast.error("Select at least one shipment.");
      return;
    }
    setBusy(true);
    try {
      const result = await api.bulkUpdateShipmentStatus([...selected], status);
      toast.success(
        `Updated ${result.updatedCount}` +
          (result.skippedCount ? ` · skipped ${result.skippedCount}` : ""),
      );
      setSelected(new Set());
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk update failed.");
    } finally {
      setBusy(false);
    }
  }

  async function cancelSelected() {
    if (selected.size === 0) {
      toast.error("Select at least one shipment.");
      return;
    }
    setBusy(true);
    try {
      const result = await api.bulkUpdateShipmentStatus([...selected], "cancelled");
      toast.success(
        `Cancelled ${result.updatedCount}` +
          (result.skippedCount ? ` · skipped ${result.skippedCount}` : ""),
      );
      setSelected(new Set());
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk cancel failed.");
    } finally {
      setBusy(false);
    }
  }

  function openAssign() {
    if (selectedRows.length !== 1) {
      toast.error("Select exactly one shipment to assign.");
      return;
    }
    const row = selectedRows[0];
    if (["delivered", "cancelled"].includes(row.status)) {
      toast.error(`Cannot assign a ${row.status} shipment.`);
      return;
    }
    setAssignTarget(row);
  }

  function exportSelected() {
    if (selected.size === 0) {
      toast.error("Select at least one shipment.");
      return;
    }
    const header = [
      "publicId",
      "client",
      "origin",
      "destination",
      "status",
      "tonnageMt",
      "driver",
      "eta",
    ];
    const lines = [
      header.join(","),
      ...selectedRows.map((s) =>
        [
          s.publicId,
          s.client,
          s.origin,
          s.destination,
          s.status,
          s.tonnageMt,
          s.driver ?? "",
          s.eta ?? "",
        ]
          .map((v) => `"${String(v).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shipments-selected-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${selectedRows.length} shipment${selectedRows.length === 1 ? "" : "s"}`);
  }

  if (rows.length === 0) {
    return (
      <div className="px-2 py-12 text-center text-sm text-muted-foreground">{emptyMessage}</div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="text-sm text-muted-foreground">{selected.size} selected</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-8 rounded-lg border border-white/10 bg-white/[0.05] px-2 text-sm outline-none"
        >
          {BULK_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <Button size="sm" onClick={applyBulk} disabled={busy || selected.size === 0}>
          {busy ? "Updating…" : "Apply status"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={openAssign}
          disabled={busy || selected.size !== 1}
        >
          Assign…
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => void cancelSelected()}
          disabled={busy || selected.size === 0}
        >
          Cancel selected
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={exportSelected}
          disabled={busy || selected.size === 0}
        >
          Export selected
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Shipment ID
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Client
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Origin → Destination
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Network
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Load
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Source
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                ETA
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Driver
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((s) => (
              <tr
                key={s.id}
                className="border-t border-white/5 transition-colors hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(s.id)}
                    onChange={() => toggle(s.id)}
                    aria-label={`Select ${s.publicId}`}
                  />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/shipments/${s.id}`}
                    className="font-mono font-medium text-link"
                  >
                    {s.publicId}
                  </Link>
                </td>
                <td className="px-4 py-3">{s.client}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-3.5 shrink-0 text-primary" />
                    <span>{s.origin}</span>
                    <span className="text-muted-foreground">→</span>
                    <span>{s.destination}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <ShipmentStatusChip status={s.status} />
                </td>
                <td className="px-4 py-3">
                  {s.networkListing ? (
                    <NetworkListingChip listing={s.networkListing} />
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px]">
                    <Package className="size-3 text-muted-foreground" />
                    {s.tonnageMt} MT
                  </span>
                </td>
                <td className="px-4 py-3">
                  <OriginBadge originType={s.originType} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-xs">
                    <Calendar className="size-3" />
                    {s.eta ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {s.driver ? (
                    <span className="text-sm text-muted-foreground">{s.driver}</span>
                  ) : (
                    <span className="text-warning">Unassigned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {assignTarget ? (
        <AssignDriverDrawer
          shipmentId={assignTarget.id}
          shipmentLabel={assignTarget.publicId}
          open
          onClose={() => setAssignTarget(null)}
          onAssigned={() => {
            setAssignTarget(null);
            setSelected(new Set());
            router.refresh();
          }}
        />
      ) : null}
    </div>
  );
}
