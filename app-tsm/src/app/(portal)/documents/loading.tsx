import { PageHeaderSkeleton, TableSkeleton } from "@/components/app/table-skeleton";

export default function DocumentsLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="mb-4 flex gap-3">
        <div className="h-9 flex-1 animate-pulse rounded-xl bg-white/[0.06]" />
        <div className="h-9 w-32 animate-pulse rounded-xl bg-white/[0.06]" />
      </div>
      <TableSkeleton rows={8} cols={5} />
    </>
  );
}
