"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import type { ShipmentTabCounts } from "@/lib/api-client";
import {
  shipmentsHref,
  type ShipmentListFilters,
} from "@/lib/shipments/query-params";
import {
  ShipmentsExportLink,
  ShipmentsFilterDrawer,
} from "@/components/app/shipments-filter-drawer";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "exceptions", label: "Exceptions" },
] as const;

export function ShipmentsToolbar({
  filters,
  filterOptions,
  counts,
}: {
  filters: ShipmentListFilters;
  filterOptions: {
    clients: string[];
    origins: string[];
    destinations: string[];
    sources: string[];
  };
  counts: ShipmentTabCounts;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const tab = filters.tab ?? "all";
  const query = filters.q ?? "";
  const status = filters.status ?? "";

  function hrefForTab(key: string) {
    return shipmentsHref({ ...filters, tab: key, page: 1 });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    startTransition(() => {
      router.push(shipmentsHref({ ...filters, q: q || undefined, page: 1 }));
    });
  }

  return (
    <div className="mb-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count = counts[t.key as keyof ShipmentTabCounts];
          const active = tab === t.key;
          return (
            <Link
              key={t.key}
              href={hrefForTab(t.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  active ? "bg-white/15" : "bg-white/10",
                )}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <label className="block flex-1 text-sm">
          <span className="sr-only">Search</span>
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search ID, client, route, LR, driver…"
            className="h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-body outline-none backdrop-blur-sm placeholder:text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Searching…" : "Search"}
          </Button>
          <ShipmentsFilterDrawer filters={filters} options={filterOptions} />
          <ShipmentsExportLink filters={filters} />
          {(query || status || filters.client || filters.origin) && (
            <Button type="button" variant="outline" size="sm" asChild>
              <Link href={tab === "all" ? "/shipments" : `/shipments?tab=${tab}`}>Clear</Link>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
