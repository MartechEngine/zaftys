import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TMS_SCREEN_W = 1536;
const TMS_SCREEN_H = 1024;

const SCREENS = [
  {
    title: "Command Center",
    src: "/images/tms/command-center.webp",
    alt: "ZAFTYS TMS Command Center with live KPIs and exception queue",
  },
  {
    title: "Dispatch",
    src: "/images/tms/dispatch.webp",
    alt: "ZAFTYS TMS Dispatch board with backlog and TranZfort post actions",
  },
  {
    title: "Shipments",
    src: "/images/tms/shipments.webp?v=2",
    alt: "ZAFTYS TMS Shipments screen listing live loads, trip status, origin-destination lanes, and TranZfort marketplace updates",
  },
  {
    title: "Live Map",
    src: "/images/tms/map.webp?v=2",
    alt: "ZAFTYS TMS Live Map with real-time GPS tracking of own-fleet and network vehicles across Indian lanes",
  },
  {
    title: "Network",
    src: "/images/tms/network.webp",
    alt: "ZAFTYS TMS network view for partner capacity and lane coverage",
  },
] as const;

type TmsScreensCarouselProps = {
  className?: string;
};

export function TmsScreensCarousel({ className }: TmsScreensCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SCREENS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const active = SCREENS[index];

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border/80 bg-navy shadow-2xl",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-navy/95 px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-white/25" aria-hidden />
          <span className="size-2.5 rounded-full bg-white/25" aria-hidden />
          <span className="size-2.5 rounded-full bg-white/25" aria-hidden />
          <p className="ml-2 truncate text-[11px] font-medium tracking-wide text-white/55">
            app.zaftys.com · {active.title}
          </p>
        </div>
        <div className="relative aspect-[16/10] bg-[#0b1220]">
          {SCREENS.map((screen, i) => (
            <img
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              width={TMS_SCREEN_W}
              height={TMS_SCREEN_H}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="ZAFTYS TMS screens"
      >
        {SCREENS.map((screen, i) => (
          <button
            key={screen.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
              i === index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {screen.title}
          </button>
        ))}
      </div>
    </div>
  );
}
