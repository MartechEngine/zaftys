import Link from "next/link";
import { PageHeader, SectionCard } from "@/components/app/app-shell";
import { ShipmentsToolbar } from "@/components/app/shipments-toolbar";
import { ShipmentsPagination } from "@/components/app/shipments-pagination";
import { ShipmentsBulkTable } from "@/components/app/shipments-bulk-table";
import { ShipmentsKanban } from "@/components/app/shipments-kanban";
import { ShipmentsMapPanel } from "@/components/app/shipments-map-panel";
import { ShipmentsViewToggle } from "@/components/app/shipments-view-toggle";
import { StatChip } from "@/components/app/ui-primitives";
import {
  getShipmentFilterOptions,
  getShipmentTabCounts,
  listShipments,
} from "@/lib/data/shipment-repository";
import {
  parsePageSize,
  parseShipmentView,
  type ShipmentListFilters,
} from "@/lib/shipments/query-params";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const tabs = ["all", "active", "completed", "exceptions"] as const;

export default async function ShipmentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    q?: string;
    status?: string;
    client?: string;
    origin?: string;
    destination?: string;
    source?: string;
    page?: string;
    size?: string;
    view?: string;
  }>;
}) {
  const sp = await searchParams;
  const tabKey = tabs.includes(sp.tab as (typeof tabs)[number]) ? sp.tab! : "all";
  const pageSize = parsePageSize(sp.size);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const view = parseShipmentView(sp.view);

  const listFilters: ShipmentListFilters = {
    tab: tabKey === "all" ? undefined : tabKey,
    q: sp.q?.trim() || undefined,
    status: sp.status?.trim() || undefined,
    client: sp.client?.trim() || undefined,
    origin: sp.origin?.trim() || undefined,
    destination: sp.destination?.trim() || undefined,
    source: sp.source?.trim() || undefined,
    size: pageSize,
    view,
  };

  const [allShipments, counts, filterOptions] = await Promise.all([
    listShipments(listFilters),
    getShipmentTabCounts(listFilters.q),
    getShipmentFilterOptions(),
  ]);

  const total = allShipments.length;
  // Kanban/map show the filtered set (capped) so board/map stay usable
  const boardCap = view === "table" ? pageSize : Math.min(total, 100);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const shipments =
    view === "table"
      ? allShipments.slice((safePage - 1) * pageSize, safePage * pageSize)
      : allShipments.slice(0, boardCap);

  const paginationFilters: ShipmentListFilters = { ...listFilters, page: safePage };

  const hasFilters = Boolean(
    listFilters.q ||
      listFilters.status ||
      listFilters.client ||
      listFilters.origin ||
      listFilters.destination ||
      listFilters.source,
  );

  const emptyMessage = hasFilters
    ? "No shipments match your filters."
    : tabKey === "exceptions"
      ? "No exceptions — all clear."
      : "No shipments in this view.";

  return (
    <>
      <PageHeader
        title="Shipments"
        description="All freight movements across own fleet and network"
        eyebrow="Operations"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <ShipmentsViewToggle filters={{ ...listFilters, tab: tabKey }} />
            <Button variant="outline" size="sm" asChild>
              <Link href="/shipments/quotes">Quotes</Link>
            </Button>
            <Button variant="accent" size="sm" asChild>
              <Link href="/shipments/new">New shipment</Link>
            </Button>
          </div>
        }
      />

      <section className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatChip label="Active" value={counts.active} tone="primary" />
        <StatChip label="Exceptions" value={counts.exceptions} tone="destructive" />
        <StatChip label="Completed" value={counts.completed} tone="success" />
        <StatChip label="All shipments" value={counts.all} tone="muted" />
      </section>

      <ShipmentsToolbar
        filters={{ ...listFilters, tab: tabKey }}
        filterOptions={filterOptions}
        counts={counts}
      />

      <SectionCard
        eyebrow={`${total} shipment${total === 1 ? "" : "s"}`}
        title={view === "kanban" ? "Board" : view === "map" ? "Map" : "All shipments"}
      >
        {view === "kanban" ? (
          <ShipmentsKanban rows={shipments} emptyMessage={emptyMessage} />
        ) : view === "map" ? (
          <ShipmentsMapPanel rows={shipments} emptyMessage={emptyMessage} />
        ) : (
          <>
            <ShipmentsBulkTable rows={shipments} emptyMessage={emptyMessage} />
            <ShipmentsPagination
              page={safePage}
              totalPages={totalPages}
              filters={paginationFilters}
            />
          </>
        )}
      </SectionCard>
    </>
  );
}
