"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { KanbanCard, KanbanColumn } from "@/components/app/ui-primitives";
import { OriginBadge, ShipmentStatusChip } from "@/components/app/status-chip";
import { DISPATCH_COLUMNS } from "@/lib/dispatch/board-columns";
import type { ShipmentRecord } from "@/lib/dev-store";

export function ShipmentsKanban({
  rows,
  emptyMessage,
}: {
  rows: ShipmentRecord[];
  emptyMessage: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="px-2 py-12 text-center text-sm text-muted-foreground">{emptyMessage}</div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {DISPATCH_COLUMNS.map((col) => {
        const items = rows.filter(col.filter);
        return (
          <div key={col.id} className="min-w-[260px] flex-1">
            <KanbanColumn title={col.title} count={items.length} tone={col.tone}>
              {items.length === 0 ? (
                <p className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-xs text-muted-foreground">
                  No shipments
                </p>
              ) : (
                items.map((s) => (
                  <KanbanCard key={s.id}>
                    <div className="space-y-2 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shipments/${s.id}`}
                          className="font-mono text-sm text-link hover:underline"
                        >
                          {s.publicId}
                        </Link>
                        <OriginBadge originType={s.originType} />
                      </div>
                      <p className="flex items-start gap-1.5 text-xs text-heading">
                        <MapPin className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                        <span>
                          {s.origin} → {s.destination}
                        </span>
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <ShipmentStatusChip status={s.status} />
                        <span className="text-[11px] text-muted-foreground">{s.client}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {s.driver ?? "Unassigned"} · {s.tonnageMt} MT
                      </p>
                    </div>
                  </KanbanCard>
                ))
              )}
            </KanbanColumn>
          </div>
        );
      })}
    </div>
  );
}
