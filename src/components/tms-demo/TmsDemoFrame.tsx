import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TmsDemoFrameProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  /** compact = shorter header for image-slot replacements */
  compact?: boolean;
};

/** Dark ops chrome for ZAFTYS TMS sneak peeks */
export function TmsDemoFrame({
  children,
  className,
  title = "ZAFTYS TMS",
  compact = false,
}: TmsDemoFrameProps) {
  return (
    <div
      className={cn(
        "tms-demo rounded-xl border overflow-hidden flex flex-col shadow-2xl",
        className,
      )}
      style={{ borderColor: "var(--tms-border)" }}
    >
      <div
        className={cn(
          "shrink-0 flex items-center justify-between gap-3 border-b",
          compact ? "px-3 py-2.5" : "px-4 py-3",
        )}
        style={{ borderColor: "var(--tms-border)", background: "var(--tms-panel)" }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold"
            style={{
              background: "linear-gradient(135deg, #070d18 0%, #0f1e3d 50%, #1e3a5f 100%)",
              boxShadow: "0 0 16px rgba(0, 169, 251, 0.3)",
            }}
          >
            Z
          </div>
          <div className="min-w-0">
            <p className={cn("font-semibold truncate", compact ? "text-xs" : "text-sm")}>{title}</p>
            {!compact ? (
              <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--tms-muted)" }}>
                Interactive preview
              </p>
            ) : null}
          </div>
        </div>
        <span
          className="text-[10px] uppercase tracking-wider font-bold shrink-0"
          style={{ color: "var(--tms-primary)" }}
        >
          Demo
        </span>
      </div>
      <div className="flex-1 min-h-0 tms-demo-scroll overflow-y-auto">{children}</div>
    </div>
  );
}

export function TmsDemoDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-[10px] sm:text-xs text-center uppercase tracking-wider font-semibold leading-snug text-muted-foreground",
        className,
      )}
    >
      Sample data · interactive preview · live product at app.zaftys.com
    </p>
  );
}
