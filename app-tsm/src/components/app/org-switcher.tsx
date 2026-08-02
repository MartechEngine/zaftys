"use client";

import { Building2, ChevronDown } from "lucide-react";
import { glassChip } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { demoOrg } from "@/lib/demo-data";
import { allowDemoSeeds } from "@/lib/data/demo-mode";

const ORGS = allowDemoSeeds()
  ? [
      { id: "org1", name: demoOrg.name, active: true },
      { id: "org2", name: "ZAFTYS Mumbai Hub", active: false },
    ]
  : [{ id: "org1", name: "Organization", active: true }];

export function OrgSwitcher() {
  return (
    <div className="group relative hidden md:block">
      <button
        type="button"
        className={cn(
          glassChip,
          "flex items-center gap-2 px-3 py-1.5 text-sm text-heading transition-colors hover:bg-white/10",
        )}
        aria-label="Organization"
      >
        <Building2 className="size-4 text-primary" />
        <span className="max-w-[160px] truncate">{ORGS[0].name}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      <ul className="absolute right-0 z-50 mt-1 hidden min-w-[220px] rounded-xl border border-white/10 bg-[#0a0f18]/95 py-1 shadow-xl backdrop-blur-md group-focus-within:block">
        {ORGS.map((org) => (
          <li key={org.id}>
            <button
              type="button"
              className={cn(
                "w-full px-3 py-2 text-left text-sm text-foreground hover:bg-white/10",
                org.active && "font-medium text-primary",
              )}
            >
              {org.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
