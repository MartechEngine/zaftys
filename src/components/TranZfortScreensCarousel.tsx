import { cn } from "@/lib/utils";

const SCREENS = [
  {
    title: "Join",
    src: "/images/tranzfort/join.jpg",
    alt: "TranZfort app: join and register screen",
  },
  {
    title: "Search",
    src: "/images/tranzfort/search.jpg",
    alt: "TranZfort app: search loads screen",
  },
  {
    title: "Browse",
    src: "/images/tranzfort/browse.jpg",
    alt: "TranZfort app: browse marketplace screen",
  },
  {
    title: "Book",
    src: "/images/tranzfort/book.jpg",
    alt: "TranZfort app: book a load screen",
  },
] as const;

/** Duplicated for seamless infinite scroll loop */
const SCROLL_TRACK = [...SCREENS, ...SCREENS];

type TranZfortScreensCarouselProps = {
  className?: string;
  /** navy = Home-style edge fade; light = white/muted sections */
  surface?: "navy" | "light";
};

function PhoneFrame({ src, alt, title }: { src: string; alt: string; title: string }) {
  return (
    <div className="relative w-[200px] shrink-0 sm:w-[220px]">
      <div
        className={cn(
          "relative rounded-[2.25rem] p-[9px] shadow-2xl ring-1 ring-white/10",
          "bg-gradient-to-b from-neutral-600 to-neutral-950",
        )}
      >
        <div className="absolute top-2.5 left-1/2 z-10 h-[18px] w-[72px] -translate-x-1/2 rounded-b-2xl bg-black ring-1 ring-white/5" />
        <div className="aspect-[9/19.5] overflow-hidden rounded-[1.55rem] bg-[#f7f5f1]">
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-bold uppercase tracking-widest text-accent">{title}</p>
    </div>
  );
}

export function TranZfortScreensCarousel({ className, surface = "navy" }: TranZfortScreensCarouselProps) {
  const fadeFrom = surface === "navy" ? "from-navy" : "from-white";

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

      {/* Continuous scroll  -  pauses on hover */}
      <div
        className={cn(
          "flex w-max gap-8 py-2",
          "animate-tranzfort-scroll motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-6 motion-reduce:w-full",
          "hover:[animation-play-state:paused]",
        )}
        aria-label="TranZfort app screens: Join, Search, Browse, Book"
      >
        {SCROLL_TRACK.map((item, index) => (
          <PhoneFrame
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
