"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { shipmentsHref, type ShipmentListFilters } from "@/lib/shipments/query-params";

export function ShipmentsPagination({
  page,
  totalPages,
  filters,
}: {
  page: number;
  totalPages: number;
  filters: ShipmentListFilters;
}) {
  if (totalPages <= 1) return null;

  function hrefForPage(p: number) {
    return shipmentsHref({ ...filters, page: p });
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
      <p className="text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex flex-wrap gap-1">
        {page > 1 && (
          <Link
            href={hrefForPage(page - 1)}
            className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/[0.05]"
          >
            Previous
          </Link>
        )}
        {pages.map((p, i) => {
          const prev = pages[i - 1];
          const gap = prev != null && p - prev > 1;
          return (
            <span key={p} className="inline-flex items-center gap-1">
              {gap ? <span className="px-1 text-muted-foreground">…</span> : null}
              <Link
                href={hrefForPage(p)}
                className={cn(
                  "rounded-lg border px-3 py-1.5",
                  p === page
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-white/10 hover:bg-white/[0.05]",
                )}
              >
                {p}
              </Link>
            </span>
          );
        })}
        {page < totalPages && (
          <Link
            href={hrefForPage(page + 1)}
            className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/[0.05]"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}
