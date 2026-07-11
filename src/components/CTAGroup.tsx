import { cn } from "@/lib/utils";

/** Wraps CTA buttons  -  full width on mobile, inline on desktop */
export function CTAGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 [&>*]:w-full sm:[&>*]:w-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
