import Link from "next/link";
import type { ReactNode } from "react";
import { glassCard, glassCardHover } from "@/lib/surface";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "No records found.",
  embedded = false,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
  embedded?: boolean;
}) {
  if (rows.length === 0) {
    return (
      <div
        className={cn(
          embedded ? "px-2 py-12" : glassCard,
          "text-center text-sm text-muted-foreground",
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn(!embedded && glassCard, "overflow-x-auto")}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-white/5 transition-colors hover:bg-white/[0.03]">
              {columns.map((col) => (
                <td key={col.key} className={cn("px-4 py-3 text-foreground", col.className)}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SearchFilterBar({
  placeholder = "Search…",
  children,
}: {
  placeholder?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        placeholder={placeholder}
        className="h-9 w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-body outline-none backdrop-blur-sm placeholder:text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20 sm:w-72"
        readOnly
        aria-label="Search"
      />
      {children}
    </div>
  );
}

export function HubCard({
  href,
  title,
  description,
  stat,
}: {
  href: string;
  title: string;
  description: string;
  stat?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(glassCard, glassCardHover, "block p-5")}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-heading">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {stat && (
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-primary">
            {stat}
          </span>
        )}
      </div>
    </Link>
  );
}

const pillMap: Record<string, { label?: string; className: string }> = {
  connected: { className: "bg-emerald-500/15 text-emerald-300" },
  disconnected: { className: "bg-white/10 text-muted-foreground" },
  active: { className: "bg-emerald-500/15 text-emerald-300" },
  failed: { className: "bg-red-500/15 text-red-300" },
  open: { className: "bg-orange/15 text-orange" },
  in_progress: { className: "bg-primary/15 text-primary" },
  resolved: { className: "bg-emerald-500/15 text-emerald-300" },
  pending: { className: "bg-yellow-500/15 text-yellow-200" },
  paid: { className: "bg-emerald-500/15 text-emerald-300" },
  expiring: { className: "bg-orange/15 text-orange" },
  valid: { className: "bg-emerald-500/15 text-emerald-300" },
  expired: { className: "bg-red-500/15 text-red-300" },
  sent: { className: "bg-primary/15 text-primary" },
  draft: { className: "bg-white/10 text-muted-foreground" },
  filed: { className: "bg-emerald-500/15 text-emerald-300" },
  online: { className: "bg-emerald-500/15 text-emerald-300" },
  offline: { className: "bg-red-500/15 text-red-300" },
  linked: { className: "bg-primary/15 text-primary" },
  high: { className: "bg-red-500/15 text-red-300" },
  medium: { className: "bg-orange/15 text-orange" },
  complete: { className: "bg-emerald-500/15 text-emerald-300" },
  running: { className: "bg-primary/15 text-primary" },
  review: { className: "bg-yellow-500/15 text-yellow-200" },
};

export function StatusPill({
  status,
  map,
}: {
  status: string;
  map: Record<string, { label: string; className: string }>;
}) {
  const cfg = map[status] ??
    pillMap[status] ?? { label: status, className: "bg-white/10 text-muted-foreground" };
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
        cfg.className,
      )}
    >
      {cfg.label ?? status}
    </span>
  );
}
