import { cn } from "@/lib/utils";

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
    alt: "ZAFTYS TMS Shipments screen listing live loads and trip status",
  },
  {
    title: "Live Map",
    src: "/images/tms/map.webp?v=2",
    alt: "ZAFTYS TMS Live Map with real-time GPS tracking",
  },
  {
    title: "Network",
    src: "/images/tms/network.webp",
    alt: "ZAFTYS TMS network view for partner capacity and lane coverage",
  },
] as const;

/** Duplicated for seamless infinite scroll loop */
const SCROLL_TRACK = [...SCREENS, ...SCREENS];

type TmsScreensCarouselProps = {
  className?: string;
  /** navy = dark band; light = white; muted = muted/30 section backgrounds */
  surface?: "navy" | "light" | "muted";
};

function BrowserFrame({ src, alt, title }: { src: string; alt: string; title: string }) {
  return (
    <div className="relative w-[260px] shrink-0 sm:w-[280px]">
      <div
        className={cn(
          "overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10",
          "border border-white/10 bg-[#0b1220]",
        )}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-navy/95 px-3 py-2">
          <span className="size-2 rounded-full bg-red-400/80" aria-hidden />
          <span className="size-2 rounded-full bg-amber-400/80" aria-hidden />
          <span className="size-2 rounded-full bg-emerald-400/80" aria-hidden />
          <p className="ml-1 truncate text-[10px] font-medium tracking-wide text-white/50">
            app.zaftys.com · {title}
          </p>
        </div>
        <div className="aspect-[16/10] overflow-hidden bg-[#0b1220]">
          <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-bold uppercase tracking-widest text-accent">{title}</p>
    </div>
  );
}

export function TmsScreensCarousel({ className, surface = "light" }: TmsScreensCarouselProps) {
  const fadeFrom =
    surface === "navy" ? "from-navy" : surface === "muted" ? "from-muted/30" : "from-white";

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className={cn("pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r to-transparent", fadeFrom)}
        aria-hidden
      />
      <div
        className={cn("pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l to-transparent", fadeFrom)}
        aria-hidden
      />

      <div
        className={cn(
          "flex w-max gap-8 py-2",
          "animate-tranzfort-scroll motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-6 motion-reduce:w-full",
          "hover:[animation-play-state:paused]",
        )}
        aria-label="ZAFTYS TMS screens: Command Center, Dispatch, Shipments, Live Map, Network"
      >
        {SCROLL_TRACK.map((item, index) => (
          <BrowserFrame
            key={`${item.title}-${index}`}
            src={item.src}
            alt={item.alt}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}
