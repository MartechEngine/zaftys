import { cn } from "@/lib/utils";

type DemoDisclaimerProps = {
  /** on-dark = navy/primary section backgrounds */
  variant?: "default" | "on-dark";
  className?: string;
};

export function DemoDisclaimer({ variant = "default", className }: DemoDisclaimerProps) {
  return (
    <p
      className={cn(
        "text-[10px] sm:text-xs text-center uppercase tracking-wider font-semibold leading-snug",
        variant === "on-dark" ? "text-gray-400" : "text-muted-foreground",
        className,
      )}
    >
      Sample data · demo UI only · all transactions through ZAFTYS Logistics
    </p>
  );
}

/** Backdrop shell for demos on dark marketing bands */
export function DemoEmbedShell({
  children,
  variant = "on-dark",
  className,
}: {
  children: React.ReactNode;
  variant?: "on-dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-3 sm:p-4 mx-auto w-full max-w-sm",
        variant === "on-dark"
          ? "bg-white/[0.97] shadow-2xl ring-1 ring-white/25 backdrop-blur-sm"
          : "bg-white shadow-lg ring-1 ring-border/60",
        className,
      )}
    >
      {children}
    </div>
  );
}
