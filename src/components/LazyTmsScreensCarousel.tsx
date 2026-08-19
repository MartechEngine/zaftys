import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TmsScreensCarousel = lazy(() =>
  import("./TmsScreensCarousel").then((m) => ({ default: m.TmsScreensCarousel })),
);

type Props = {
  className?: string;
  surface?: "navy" | "light" | "muted";
};

/** Defer carousel images/animation until near viewport. */
export function LazyTmsScreensCarousel({ className, surface = "light" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "180px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const skeleton = surface === "navy" ? "bg-white/5" : surface === "muted" ? "bg-muted" : "bg-muted";

  return (
    <div ref={ref} className={cn("min-h-[220px]", className)}>
      {show ? (
        <Suspense fallback={<div className={cn("min-h-[220px] rounded-xl animate-pulse", skeleton)} aria-hidden />}>
          <TmsScreensCarousel className={className} surface={surface} />
        </Suspense>
      ) : (
        <div className={cn("min-h-[220px] rounded-xl", skeleton)} aria-hidden />
      )}
    </div>
  );
}
