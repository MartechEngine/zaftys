import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PageHeroProps = {
  badge?: string;
  title: ReactNode;
  description: string;
  /** When omitted, render `backdrop` or solid navy */
  imageSrc?: string;
  imageAlt?: string;
  /** Designed visual instead of a photo (used when imageSrc is absent) */
  backdrop?: ReactNode;
  children?: ReactNode;
  /** Technology page uses left-aligned copy */
  align?: "left" | "center";
  className?: string;
  /** Optional content above the badge (e.g. back link) */
  prepend?: ReactNode;
};

/** Typical marketing hero JPEG aspect (Vite-bundled assets ~1600×1050-1920×1080). */
const HERO_WIDTH = 1920;
const HERO_HEIGHT = 1080;

export function PageHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt = "",
  backdrop,
  children,
  align = "left",
  className,
  prepend,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative flex min-h-[min(500px,100svh)] items-center overflow-hidden bg-navy pb-16 pt-28 text-white sm:min-h-[500px] sm:pb-20 sm:pt-32",
        className,
      )}
    >
      <div className="absolute inset-0">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={imageAlt}
              width={HERO_WIDTH}
              height={HERO_HEIGHT}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
          </>
        ) : (
          backdrop ?? <div className="absolute inset-0 bg-navy" />
        )}
      </div>

      <div className="container relative z-10 mx-auto container-padding">
        {prepend}
        <div className={cn("max-w-4xl", centered && "mx-auto text-center")}>
          {badge && (
            <div className="mb-5 inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent sm:mb-6 sm:text-sm">
              {badge}
            </div>
          )}
          <h1 className="mb-4 animate-fade-in-up break-words font-heading text-3xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p
            className={cn(
              "animate-fade-in-up text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
            style={{ animationDelay: "0.2s" }}
          >
            {description}
          </p>
          {children && (
            <div className="mt-8 animate-fade-in-up sm:mt-10" style={{ animationDelay: "0.4s" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
