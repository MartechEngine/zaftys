import { PageHeaderSkeleton } from "@/components/app/table-skeleton";

export default function DispatchLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="min-h-[320px] animate-pulse rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-3 h-4 w-20 rounded bg-white/10" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-24 rounded-lg bg-white/[0.06]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
