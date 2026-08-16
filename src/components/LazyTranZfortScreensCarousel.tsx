import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TranZfortScreensCarousel = lazy(() =>
  import("./TranZfortScreensCarousel").then((m) => ({ default: m.TranZfortScreensCarousel })),
);

type Props = {
  className?: string;
  surface?: "navy" | "light";
};

/** Defer carousel images/animation until near viewport. */
export function LazyTranZfortScreensCarousel({ className, surface = "navy" }: Props) {
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

  const skeleton = surface === "light" ? "bg-muted" : "bg-white/5";

  return (
    <div ref={ref} className={cn("min-h-[320px]", className)}>
      {show ? (
        <Suspense fallback={<div className={cn("min-h-[320px] rounded-xl animate-pulse", skeleton)} aria-hidden />}>
          <TranZfortScreensCarousel className={className} surface={surface} />
        </Suspense>
      ) : (
        <div className={cn("min-h-[320px] rounded-xl", skeleton)} aria-hidden />
      )}
    </div>
  );
}
