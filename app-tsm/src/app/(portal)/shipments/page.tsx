import Link from "next/link";
import { Calendar, MapPin, Package } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/app/app-shell";
import { ShipmentsToolbar } from "@/components/app/shipments-toolbar";
import { ShipmentsPagination } from "@/components/app/shipments-pagination";
import { OriginBadge, ShipmentStatusChip } from "@/components/app/status-chip";
import { StatChip } from "@/components/app/ui-primitives";
import { DataTable, type DataTableColumn } from "@/components/app/data-table";
import {
  getShipmentFilterOptions,
  getShipmentTabCounts,
  listShipments,
} from "@/lib/data/shipment-repository";
import type { ShipmentRecord } from "@/lib/dev-store";
import { parsePageSize, type ShipmentListFilters } from "@/lib/shipments/query-params";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const tabs = ["all", "active", "completed", "exceptions"] as const;

const columns: DataTableColumn<ShipmentRecord>[] = [
  {
    key: "id",
    header: "Shipment ID",
    render: (s) => (
      <Link href={`/shipments/${s.id}`} className="font-mono font-medium text-link">
        {s.publicId}
      </Link>
    ),
  },
  { key: "client", header: "Client", render: (s) => s.client },
  {
    key: "route",
    header: "Origin → Destination",
    render: (s) => (
      <div className="flex items-center gap-2 text-sm">
        <MapPin className="size-3.5 shrink-0 text-primary" />
        <span>{s.origin}</span>
        <span className="text-muted-foreground">→</span>
        <span>{s.destination}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (s) => <ShipmentStatusChip status={s.status} />,
  },
  {
    key: "load",
    header: "Load",
    render: (s) => (
      <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px]">
        <Package className="size-3 text-muted-foreground" />
        {s.tonnageMt} MT
      </span>
    ),
  },
  {
    key: "source",
    header: "Source",
    render: (s) => <OriginBadge originType={s.originType} />,
  },
  {
    key: "eta",
    header: "ETA",
    className: "text-muted-foreground",
    render: (s) => (
      <span className="inline-flex items-center gap-1 text-xs">
        <Calendar className="size-3" />
        {s.eta ?? "—"}
      </span>
    ),
  },
  {
    key: "assignment",
    header: "Driver",
    render: (s) =>
      s.driver ? (
        <span className="text-sm text-muted-foreground">{s.driver}</span>
      ) : (
        <span className="text-warning">Unassigned</span>
      ),
  },
];

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
  }>;
}) {
  const sp = await searchParams;
  const tabKey = tabs.includes(sp.tab as (typeof tabs)[number]) ? sp.tab! : "all";
  const pageSize = parsePageSize(sp.size);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const listFilters: ShipmentListFilters = {
    tab: tabKey === "all" ? undefined : tabKey,
    q: sp.q?.trim() || undefined,
    status: sp.status?.trim() || undefined,
    client: sp.client?.trim() || undefined,
    origin: sp.origin?.trim() || undefined,
    destination: sp.destination?.trim() || undefined,
    source: sp.source?.trim() || undefined,
    size: pageSize,
  };

  const [allShipments, counts, filterOptions] = await Promise.all([
    listShipments(listFilters),
    getShipmentTabCounts(listFilters.q),
    getShipmentFilterOptions(),
  ]);

  const total = allShipments.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const shipments = allShipments.slice((safePage - 1) * pageSize, safePage * pageSize);

  const paginationFilters: ShipmentListFilters = { ...listFilters, page: safePage };

  const hasFilters = Boolean(
    listFilters.q ||
      listFilters.status ||
      listFilters.client ||
      listFilters.origin ||
      listFilters.destination ||
      listFilters.source,
  );

  return (
    <>
      <PageHeader
        title="Shipments"
        description="All freight movements across own fleet and network"
        eyebrow="Operations"
        action={
          <div className="flex gap-2">
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
        title="All shipments"
      >
        <DataTable
          embedded
          columns={columns}
          rows={shipments}
          emptyMessage={
            hasFilters
              ? "No shipments match your filters."
              : tabKey === "exceptions"
                ? "No exceptions — all clear."
                : "No shipments in this view."
          }
        />
        <ShipmentsPagination page={safePage} totalPages={totalPages} filters={paginationFilters} />
      </SectionCard>
    </>
  );
}
