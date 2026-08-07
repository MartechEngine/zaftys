import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from "react";

const PersonaTabDemoLazy = lazy(() =>
  import("./PersonaTabDemo").then((m) => ({ default: m.PersonaTabDemo })),
);

type Props = ComponentProps<typeof PersonaTabDemoLazy>;

/** Loads PersonaTabDemo only when near viewport */
export function LazyPersonaTabDemo(props: Props) {
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
        <Suspense
          fallback={
            <div className="min-h-[320px] rounded-xl bg-muted/40 animate-pulse" aria-hidden />
          }
        >
          <PersonaTabDemoLazy {...props} />
        </Suspense>
      ) : (
        <div className="min-h-[320px] rounded-xl bg-muted/40" aria-hidden />
      )}
    </div>
  );
}
