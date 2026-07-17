import { cn } from "@/lib/utils";

export function TableSkeleton({
  rows = 8,
  cols = 6,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/10", className)}>
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-3 flex-1 animate-pulse rounded bg-white/10" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex gap-4 px-4 py-3">
            {Array.from({ length: cols }).map((_, col) => (
              <div
                key={col}
                className="h-4 flex-1 animate-pulse rounded bg-white/[0.06]"
                style={{ animationDelay: `${(row + col) * 40}ms` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-6 space-y-2">
      <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
      <div className="h-8 w-64 animate-pulse rounded bg-white/10" />
      <div className="h-4 w-96 max-w-full animate-pulse rounded bg-white/[0.06]" />
    </div>
  );
}

export function StatChipsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
      ))}
    </div>
  );
}
