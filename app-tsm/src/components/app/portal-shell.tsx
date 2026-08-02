"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { DemoBanner } from "@/components/app/demo-banner";
import { GlobalSearchProvider } from "@/components/app/global-search-dialog";
import { PortalBackground } from "@/components/effects/portal-background";
import type { SessionUser } from "@/lib/auth/types";

export function PortalShell({
  user,
  demoUi = false,
  orgLabel,
  children,
}: {
  user: SessionUser;
  /** When true, show demo catalog banner (TSM_DEMO_UI=1 only). */
  demoUi?: boolean;
  orgLabel?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <GlobalSearchProvider>
      <div data-portal-surface className="relative min-h-screen">
        <PortalBackground />
        <div className="relative z-10">
          <AppShell pathname={pathname} user={user} orgLabel={orgLabel}>
            {demoUi ? <DemoBanner /> : null}
            {children}
          </AppShell>
        </div>
      </div>
    </GlobalSearchProvider>
  );
}
