"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  description,
  demo,
  className,
  action,
  children,
}: {
  title: string;
  description?: string;
  demo?: boolean;
  className?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={cn("glass overflow-hidden rounded-2xl p-4", className)}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-heading">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
          {demo ? (
            <p className="mt-1 text-[10px] uppercase tracking-wide text-subtle-foreground">
              Demo series
            </p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
