import { PageHeaderSkeleton, StatChipsSkeleton, TableSkeleton } from "@/components/app/table-skeleton";

export default function ShipmentsLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <StatChipsSkeleton />
      <div className="mb-4 h-9 w-full max-w-md animate-pulse rounded-xl bg-white/[0.06]" />
      <TableSkeleton rows={10} cols={7} />
    </>
  );
}
