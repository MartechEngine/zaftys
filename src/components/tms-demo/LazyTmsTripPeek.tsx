import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from "react";

const TmsTripPeekLazy = lazy(() =>
  import("./TmsTripPeek").then((m) => ({ default: m.TmsTripPeek })),
);

type Props = ComponentProps<typeof TmsTripPeekLazy>;

/** Loads TMS sneak peek only when near viewport */
export function LazyTmsTripPeek(props: Props) {
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
    <div ref={ref} className={props.className}>
      {show ? (
        <Suspense
          fallback={
            <div className="min-h-[240px] rounded-xl bg-navy/80 animate-pulse" aria-hidden />
          }
        >
          <TmsTripPeekLazy {...props} />
        </Suspense>
      ) : (
        <div className="min-h-[240px] rounded-xl bg-navy/80" aria-hidden />
      )}
    </div>
  );
}
