"use client";

import { Building2 } from "lucide-react";
import { glassChip } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { allowDemoSeeds } from "@/lib/data/demo-mode";

type Props = {
  /** Live org trade/legal name from session/org — preferred over demo labels */
  orgLabel?: string;
};

/**
 * Org chip in the shell.
 * Production / live: single non-switchable label (no fake multi-org dropdown).
 * Demo seeds only: decorative list (not real tenancy).
 */
export function OrgSwitcher({ orgLabel }: Props) {
  const label = orgLabel?.trim() || "Organization";

  if (!allowDemoSeeds()) {
    return (
      <div
        className={cn(
          glassChip,
          "hidden items-center gap-2 px-3 py-1.5 text-sm text-heading md:flex",
        )}
        title="Company org is fixed to your signed-in account"
      >
        <Building2 className="size-4 text-primary" />
        <span className="max-w-[180px] truncate">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        glassChip,
        "hidden items-center gap-2 px-3 py-1.5 text-sm text-heading md:flex",
      )}
      title="Demo org chip — not multi-tenant switching"
    >
      <Building2 className="size-4 text-primary" />
      <span className="max-w-[180px] truncate">{label}</span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
        demo
      </span>
    </div>
  );
}
