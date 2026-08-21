import { cn } from "@/lib/utils";

/** Wraps CTA buttons — full width on mobile, including nested Link > Button */
export function CTAGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4",
        "[&>*]:w-full sm:[&>*]:w-auto",
        "[&_a]:w-full sm:[&_a]:w-auto [&_button]:w-full sm:[&_button]:w-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
