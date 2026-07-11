import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PageHeroProps = {
  badge?: string;
  title: ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
  /** Technology page uses left-aligned copy */
  align?: "left" | "center";
  className?: string;
  /** Optional content above the badge (e.g. back link) */
  prepend?: ReactNode;
};

export function PageHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  align = "left",
  className,
  prepend,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative pt-32 pb-20 overflow-hidden min-h-[500px] flex items-center bg-navy text-white",
        className,
      )}
    >
      <div className="absolute inset-0">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        {prepend}
        <div className={cn("max-w-4xl", centered && "mx-auto text-center")}>
          {badge && (
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6 uppercase tracking-widest">
              {badge}
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up leading-tight">
            {title}
          </h1>
          <p
            className={cn(
              "text-xl text-gray-300 animate-fade-in-up font-light leading-relaxed",
              centered ? "max-w-2xl mx-auto" : "max-w-2xl",
            )}
            style={{ animationDelay: "0.2s" }}
          >
            {description}
          </p>
          {children && (
            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
