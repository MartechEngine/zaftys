import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from "react";

const MatchFlowDemoLazy = lazy(() =>
  import("./MatchFlowDemo").then((m) => ({ default: m.MatchFlowDemo })),
);

type Props = ComponentProps<typeof MatchFlowDemoLazy>;

/** Loads MatchFlowDemo (and framer-motion) only when scrolled near viewport */
export function LazyMatchFlowDemo(props: Props) {
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
            <div className="min-h-[280px] rounded-xl bg-muted/40 animate-pulse" aria-hidden />
          }
        >
          <MatchFlowDemoLazy {...props} />
        </Suspense>
      ) : (
        <div className="min-h-[280px] rounded-xl bg-muted/40" aria-hidden />
      )}
    </div>
  );
}
