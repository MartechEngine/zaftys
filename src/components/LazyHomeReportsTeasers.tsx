import { lazy, Suspense, useEffect, useRef, useState } from "react";

const HomeReportsTeasersLazy = lazy(() => import("./HomeReportsTeasers"));

/** Loads report teasers (covers + report data) only when near viewport. */
export function LazyHomeReportsTeasers({ embedded = false }: { embedded?: boolean }) {
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
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? (
        <Suspense fallback={<div className="section-padding min-h-[280px]" aria-hidden />}>
          <HomeReportsTeasersLazy embedded={embedded} />
        </Suspense>
      ) : (
        <div className="section-padding min-h-[280px]" aria-hidden />
      )}
    </div>
  );
}
