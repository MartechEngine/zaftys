"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  countActiveFilters,
  PAGE_SIZE_OPTIONS,
  shipmentsHref,
  type ShipmentListFilters,
} from "@/lib/shipments/query-params";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShipmentsFilterDrawer({
  filters,
  options,
}: {
  filters: ShipmentListFilters;
  options: {
    clients: string[];
    origins: string[];
    destinations: string[];
    sources: string[];
  };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  function apply(form: HTMLFormElement) {
    const fd = new FormData(form);
    const next: ShipmentListFilters = {
      tab: filters.tab,
      q: filters.q,
      status: String(fd.get("status") ?? "").trim() || undefined,
      client: String(fd.get("client") ?? "").trim() || undefined,
      origin: String(fd.get("origin") ?? "").trim() || undefined,
      destination: String(fd.get("destination") ?? "").trim() || undefined,
      source: String(fd.get("source") ?? "").trim() || undefined,
      size: parseInt(String(fd.get("size") ?? "25"), 10) || 25,
      page: 1,
    };
    router.push(shipmentsHref(next));
    setOpen(false);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="relative"
      >
        <SlidersHorizontal className="mr-1.5 size-4" />
        Filters
        {activeCount > 0 ? (
          <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {activeCount}
          </span>
        ) : null}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a1220]/98 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-semibold text-heading">Filter shipments</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <form
              className="flex flex-1 flex-col overflow-y-auto px-5 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                apply(e.currentTarget);
              }}
            >
              <div className="space-y-4 text-sm">
                <label className="block">
                  <span className="text-muted-foreground">Client</span>
                  <select
                    name="client"
                    defaultValue={filters.client ?? ""}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 outline-none"
                  >
                    <option value="">Any client</option>
                    {options.clients.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-muted-foreground">Origin</span>
                  <select
                    name="origin"
                    defaultValue={filters.origin ?? ""}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 outline-none"
                  >
                    <option value="">Any origin</option>
                    {options.origins.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-muted-foreground">Destination</span>
                  <select
                    name="destination"
                    defaultValue={filters.destination ?? ""}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 outline-none"
                  >
                    <option value="">Any destination</option>
                    {options.destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-muted-foreground">Source</span>
                  <select
                    name="source"
                    defaultValue={filters.source ?? ""}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 outline-none"
                  >
                    <option value="">Any source</option>
                    {options.sources.map((s) => (
                      <option key={s} value={s}>
                        {s === "fleet" ? "Own fleet" : s === "network" ? "Network" : s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-muted-foreground">Status</span>
                  <select
                    name="status"
                    defaultValue={filters.status ?? ""}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 outline-none"
                  >
                    <option value="">Any status</option>
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="in_transit">In transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="exception">Exception</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-muted-foreground">Rows per page</span>
                  <select
                    name="size"
                    defaultValue={String(filters.size ?? 25)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 outline-none"
                  >
                    {PAGE_SIZE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-auto flex gap-2 border-t border-white/10 pt-4">
                <Button type="submit" variant="accent" className="flex-1">
                  Apply filters
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    router.push(shipmentsHref({ tab: filters.tab, q: filters.q }));
                    setOpen(false);
                  }}
                >
                  Clear
                </Button>
              </div>
            </form>
          </aside>
        </div>
      ) : null}
    </>
  );
}

export function ShipmentsExportLink({ filters }: { filters: ShipmentListFilters }) {
  const qs = new URLSearchParams();
  if (filters.tab && filters.tab !== "all") qs.set("tab", filters.tab);
  if (filters.q) qs.set("q", filters.q);
  if (filters.status) qs.set("status", filters.status);
  if (filters.client) qs.set("client", filters.client);
  if (filters.origin) qs.set("origin", filters.origin);
  if (filters.destination) qs.set("destination", filters.destination);
  if (filters.source) qs.set("source", filters.source);
  const href = `/api/shipments/export${qs.toString() ? `?${qs}` : ""}`;

  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-lg border border-white/10 px-3 text-sm font-medium",
        "hover:bg-white/[0.05]",
      )}
    >
      Export CSV
    </a>
  );
}
