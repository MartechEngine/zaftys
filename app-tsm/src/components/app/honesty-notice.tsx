import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Amber honesty callout for deferred / ephemeral / live-mode notes. */
export function HonestyNotice({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100",
        className,
      )}
    >
      <strong className="font-medium text-amber-50">{title}</strong> {children}
    </div>
  );
}
