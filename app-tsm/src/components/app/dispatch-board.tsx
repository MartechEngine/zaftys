"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GripVertical, MapPin, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { AssignDriverDrawer } from "@/components/app/assign-driver-drawer";
import { SyncStatusBanner } from "@/components/app/sync-status-banner";
import { OriginBadge, ShipmentStatusChip } from "@/components/app/status-chip";
import { NetworkListingChip } from "@/components/app/network-offers-panel";
import { DataTable, type DataTableColumn } from "@/components/app/data-table";
import { KanbanCard, KanbanColumn } from "@/components/app/ui-primitives";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { DISPATCH_NAV } from "@/lib/module-nav";
import {
  canDropInColumn,
  columnForShipment,
  DISPATCH_COLUMNS,
  statusPathForColumn,
  type DispatchColumnId,
} from "@/lib/dispatch/board-columns";
import type { ShipmentRecord } from "@/lib/dev-store";
import type { NetworkListing } from "@/lib/network/listing-types";
import { cn } from "@/lib/utils";

const REFRESH_MS = 30_000;

type BoardView = "kanban" | "table";

type ListingEntry = { listing: NetworkListing; openOffers: number };

const tableColumns: DataTableColumn<ShipmentRecord>[] = [
  {
    key: "id",
    header: "Shipment",
    render: (s) => (
      <Link href={`/shipments/${s.id}`} className="font-mono text-link hover:underline">
        {s.publicId}
      </Link>
    ),
  },
  {
    key: "route",
    header: "Route",
    render: (s) => (
      <span className="text-heading">
        {s.origin} → {s.destination}
      </span>
    ),
  },
  {
    key: "client",
    header: "Client",
    render: (s) => s.client,
  },
  {
    key: "status",
    header: "Status",
    render: (s) => <ShipmentStatusChip status={s.status} />,
  },
  {
    key: "column",
    header: "Board",
    render: (s) => {
      const col = DISPATCH_COLUMNS.find((c) => c.id === columnForShipment(s));
      return <span className="text-muted-foreground">{col?.title ?? "—"}</span>;
    },
  },
  {
    key: "driver",
    header: "Driver",
    render: (s) => s.driver ?? "—",
  },
  {
    key: "tonnage",
    header: "MT",
    className: "text-right",
    render: (s) => s.tonnageMt,
  },
];

function DispatchBoardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view: BoardView = searchParams.get("view") === "table" ? "table" : "kanban";

  const [shipments, setShipments] = useState<ShipmentRecord[]>([]);
  const [listingsMap, setListingsMap] = useState<Record<string, ListingEntry>>({});
  const [assignTarget, setAssignTarget] = useState<ShipmentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropColumn, setDropColumn] = useState<DispatchColumnId | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  const setView = (next: BoardView) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "kanban") params.delete("view");
    else params.set("view", "table");
    const qs = params.toString();
    router.replace(qs ? `/dispatch?${qs}` : "/dispatch");
  };

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    try {
      const [data, listings] = await Promise.all([
        api.getShipments(),
        api.listOutboundListings(),
      ]);
      setShipments([...data].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
      const map: Record<string, ListingEntry> = {};
      for (const row of listings) {
        map[row.listing.shipmentId] = {
          listing: row.listing,
          openOffers: row.openOffers,
        };
      }
      setListingsMap(map);
    } catch {
      toast.error("Failed to load shipments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onFocus = () => void load(true);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [load]);

  useEffect(() => {
    const id = window.setInterval(() => void load(true), REFRESH_MS);
    return () => window.clearInterval(id);
  }, [load]);

  async function handleColumnDrop(columnId: DispatchColumnId, shipmentId: string) {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    const check = canDropInColumn(shipment, columnId);
    if (!check.ok) {
      if (check.needsAssign) {
        setAssignTarget(shipment);
        return;
      }
      if (check.reason !== "Already in this column.") {
        toast.error(check.reason);
      }
      return;
    }

    const path = statusPathForColumn(shipment, columnId);
    if (!path || path.length === 0) return;

    setMovingId(shipmentId);
    try {
      let updated: ShipmentRecord = shipment;
      for (const status of path) {
        updated = await api.updateShipmentStatus(shipmentId, status);
      }
      setShipments((prev) =>
        [...prev.map((s) => (s.id === shipmentId ? updated : s))].sort((a, b) =>
          b.updatedAt.localeCompare(a.updatedAt),
        ),
      );
      toast.success(`Moved to ${DISPATCH_COLUMNS.find((c) => c.id === columnId)?.title}`);
      void load(true);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update status");
    } finally {
      setMovingId(null);
      setDragId(null);
      setDropColumn(null);
    }
  }

  async function withdrawListing(shipmentId: string) {
    setMovingId(shipmentId);
    try {
      await api.withdrawNetworkListing(shipmentId);
      toast.success("TranZfort listing withdrawn");
      await load(true);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not withdraw listing");
    } finally {
      setMovingId(null);
    }
  }

  function openPostToTranZfort(shipment: ShipmentRecord) {
    const entry = listingsMap[shipment.id];
    if (entry && !["withdrawn", "expired"].includes(entry.listing.state)) {
      router.push(`/shipments/${shipment.id}?tab=offers`);
      toast.info("Review offers or edit listing on shipment detail");
      return;
    }
    router.push(`/shipments/${shipment.id}?tab=offers`);
    toast.info("Open shipment Offers tab to post to TranZfort");
  }

  return (
    <>
      <PageHeader
        title="Dispatch board"
        description="Drag cards between columns or switch to table view"
        eyebrow="Operations"
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              variant={view === "kanban" ? "accent" : "outline"}
              size="sm"
              onClick={() => setView("kanban")}
            >
              Kanban
            </Button>
            <Button
              variant={view === "table" ? "accent" : "outline"}
              size="sm"
              onClick={() => setView("table")}
            >
              Table
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/map?mode=dispatch">Map</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void load(true)}
              disabled={refreshing}
            >
              <RefreshCw className={cn("mr-2 size-4", refreshing && "animate-spin")} />
              Refresh
            </Button>
            <Button variant="accent" size="sm" asChild>
              <Link href="/shipments/new">New shipment</Link>
            </Button>
          </div>
        }
      />
      <ModuleSubNav links={DISPATCH_NAV} />
      <SyncStatusBanner />

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading board…</p>
      ) : view === "table" ? (
        <DataTable
          columns={tableColumns}
          rows={shipments}
          emptyMessage="No shipments on the board."
        />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {DISPATCH_COLUMNS.map((col) => {
            const items = shipments.filter(col.filter);
            const isTarget = dropColumn === col.id;
            return (
              <div
                key={col.id}
                className={cn(
                  "min-w-[280px] flex-1 rounded-[var(--radius)] transition-shadow",
                  isTarget && "ring-2 ring-primary/50 ring-offset-2 ring-offset-transparent",
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  setDropColumn(col.id);
                }}
                onDragLeave={(e) => {
                  if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                  setDropColumn((prev) => (prev === col.id ? null : prev));
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/shipment-id");
                  if (id) void handleColumnDrop(col.id, id);
                }}
              >
                <KanbanColumn title={col.title} count={items.length} tone={col.tone}>
                  {items.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-xs text-muted-foreground">
                      {col.id === "unassigned" ? "All caught up — drop here to backlog" : "Drop shipments here"}
                    </p>
                  ) : (
                    items.map((s) => {
                      const listingEntry = listingsMap[s.id];
                      const isPendingFleet =
                        s.status === "pending" && s.originType === "fleet";
                      const hasListing =
                        listingEntry &&
                        !["withdrawn", "expired"].includes(listingEntry.listing.state);
                      return (
                      <div
                        key={s.id}
                        draggable={s.status !== "delivered" && s.status !== "cancelled"}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/shipment-id", s.id);
                          e.dataTransfer.effectAllowed = "move";
                          setDragId(s.id);
                        }}
                        onDragEnd={() => {
                          setDragId(null);
                          setDropColumn(null);
                        }}
                        className={cn(
                          "cursor-grab active:cursor-grabbing",
                          (dragId === s.id || movingId === s.id) && "opacity-50",
                        )}
                      >
                        <KanbanCard>
                          <div className="flex items-start gap-2">
                            <GripVertical className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                                <Link href={`/shipments/${s.id}`} className="text-link hover:underline">
                                  {s.publicId}
                                </Link>
                                <span>{s.tonnageMt} MT</span>
                              </div>
                              <div className="mt-1.5 flex items-center gap-2 text-sm font-medium text-heading">
                                <MapPin className="size-3.5 shrink-0 text-primary" />
                                <span className="truncate">
                                  {s.origin} → {s.destination}
                                </span>
                              </div>
                              <p className="mt-1 text-[11px] text-muted-foreground">
                                {s.client} · {s.commodity}
                              </p>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <ShipmentStatusChip status={s.status} />
                                <OriginBadge originType={s.originType} />
                                {hasListing && (
                                  <NetworkListingChip listing={listingEntry.listing} />
                                )}
                                {hasListing && listingEntry.openOffers > 0 && (
                                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                                    {listingEntry.openOffers} offer
                                    {listingEntry.openOffers === 1 ? "" : "s"}
                                  </span>
                                )}
                              </div>
                              {isPendingFleet && !hasListing && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-3 w-full"
                                  onClick={() => openPostToTranZfort(s)}
                                >
                                  Post to TranZfort
                                </Button>
                              )}
                              {isPendingFleet && hasListing && (
                                <div className="mt-3 flex flex-col gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    asChild
                                  >
                                    <Link href={`/shipments/${s.id}?tab=offers`}>
                                      {listingEntry.openOffers > 0
                                        ? `Review ${listingEntry.openOffers} offer${listingEntry.openOffers === 1 ? "" : "s"}`
                                        : "View listing"}
                                    </Link>
                                  </Button>
                                  {!["assigned"].includes(listingEntry.listing.state) && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full"
                                      disabled={movingId === s.id}
                                      onClick={() => withdrawListing(s.id)}
                                    >
                                      Withdraw
                                    </Button>
                                  )}
                                </div>
                              )}
                              {s.status === "pending" && s.originType !== "fleet" && (
                                <Button
                                  variant="accent"
                                  size="sm"
                                  className="mt-3 w-full"
                                  onClick={() => setAssignTarget(s)}
                                >
                                  Assign
                                </Button>
                              )}
                              {s.status === "pending" && s.originType === "fleet" && hasListing && (
                                <Button
                                  variant="accent"
                                  size="sm"
                                  className="mt-3 w-full"
                                  onClick={() => setAssignTarget(s)}
                                >
                                  Assign own fleet
                                </Button>
                              )}
                            </div>
                          </div>
                        </KanbanCard>
                      </div>
                    );
                    })
                  )}
                </KanbanColumn>
              </div>
            );
          })}
        </div>
      )}

      {assignTarget && (
        <AssignDriverDrawer
          shipmentId={assignTarget.id}
          shipmentLabel={assignTarget.publicId}
          open={!!assignTarget}
          onClose={() => setAssignTarget(null)}
          onAssigned={() => {
            setAssignTarget(null);
            void load(true);
            router.refresh();
          }}
        />
      )}
    </>
  );
}

export function DispatchBoard() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading dispatch…</p>}>
      <DispatchBoardInner />
    </Suspense>
  );
}
