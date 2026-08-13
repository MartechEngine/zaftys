import { lazy, Suspense, useEffect, useRef, useState } from "react";

const HomeBlogTeasersLazy = lazy(() => import("./HomeBlogTeasers"));

/** Loads blog teasers (and blog-data) only when near viewport. */
export function LazyHomeBlogTeasers() {
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
        <Suspense fallback={<div className="section-padding min-h-[240px]" aria-hidden />}>
          <HomeBlogTeasersLazy />
        </Suspense>
      ) : (
        <div className="section-padding min-h-[240px]" aria-hidden />
      )}
    </div>
  );
}
