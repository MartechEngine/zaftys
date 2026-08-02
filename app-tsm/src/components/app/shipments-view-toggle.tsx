"use client";

import Link from "next/link";
import { Kanban, LayoutList, Map } from "lucide-react";
import {
  shipmentsHref,
  type ShipmentListFilters,
  type ShipmentListView,
} from "@/lib/shipments/query-params";
import { cn } from "@/lib/utils";

const VIEWS: { key: ShipmentListView; label: string; icon: typeof LayoutList }[] = [
  { key: "table", label: "Table", icon: LayoutList },
  { key: "kanban", label: "Kanban", icon: Kanban },
  { key: "map", label: "Map", icon: Map },
];

export function ShipmentsViewToggle({ filters }: { filters: ShipmentListFilters }) {
  const active = filters.view ?? "table";

  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-0.5">
      {VIEWS.map((v) => {
        const Icon = v.icon;
        const selected = active === v.key;
        return (
          <Link
            key={v.key}
            href={shipmentsHref({ ...filters, view: v.key, page: 1 })}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
              selected
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={selected ? "page" : undefined}
          >
            <Icon className="size-3.5" />
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
