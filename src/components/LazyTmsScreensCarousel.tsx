import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";

const TmsScreensCarousel = lazy(() =>
  import("./TmsScreensCarousel").then((m) => ({ default: m.TmsScreensCarousel })),
);

type Props = { className?: string };

export function LazyTmsScreensCarousel({ className }: Props) {
  return (
    <Suspense
      fallback={
        <div
          className={cn(
            "aspect-[16/10] w-full animate-pulse rounded-xl bg-muted/60",
            className,
          )}
          aria-hidden
        />
      }
    >
      <TmsScreensCarousel className={className} />
    </Suspense>
  );
}
