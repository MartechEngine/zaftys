import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Surface = "white" | "surface" | "navy" | "none";

type MarketingSectionProps = {
  id?: string;
  "aria-labelledby"?: string;
  surface?: Surface;
  wide?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Dense-hub section shell: top border, standard vertical rhythm, max-width inner.
 */
export function MarketingSection({
  id,
  "aria-labelledby": ariaLabelledBy,
  surface = "white",
  wide = false,
  className,
  children,
}: MarketingSectionProps) {
  const surfaceClass =
    surface === "white"
      ? "bg-white"
      : surface === "surface"
        ? "bg-surface"
        : surface === "navy"
          ? "bg-navy text-white"
          : "";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(wide ? "section-band-wide" : "section-band", surfaceClass, className)}
    >
      <div className={cn(wide ? "section-band-inner-wide" : "section-band-inner")}>{children}</div>
    </section>
  );
}

type MarketingTileProps = {
  as?: "article" | "div" | "li";
  muted?: boolean;
  className?: string;
  children: ReactNode;
};

export function MarketingTile({ as: Comp = "article", muted = false, className, children }: MarketingTileProps) {
  return <Comp className={cn(muted ? "marketing-tile-muted" : "marketing-tile", className)}>{children}</Comp>;
}

type MarketingEyebrowProps = {
  className?: string;
  children: ReactNode;
};

export function MarketingEyebrow({ className, children }: MarketingEyebrowProps) {
  return <p className={cn("marketing-eyebrow", className)}>{children}</p>;
}

type MarketingFinalCtaProps = {
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  children: ReactNode;
};

export function MarketingFinalCta({
  id,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
}: MarketingFinalCtaProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={cn("final-cta-band", className)}>
      <div className="container mx-auto container-padding text-center">{children}</div>
    </section>
  );
}
