"use client";

import Link from "next/link";
import { CollapsibleSidebar } from "@/components/app/collapsible-sidebar";
import { GlobalSearchTrigger } from "@/components/app/global-search-dialog";
import { NotificationBell } from "@/components/app/notification-bell";
import { UserMenu } from "@/components/app/user-menu";
import { DataSourceBadge } from "@/components/app/data-source-badge";
import { OrgSwitcher } from "@/components/app/org-switcher";
import type { SessionUser } from "@/lib/auth/types";
import { glassCardHover } from "@/lib/surface";
import { cn } from "@/lib/utils";

export function TopBar({ user }: { user: SessionUser }) {
  return (
    <header className="glass mx-3 mt-3 flex shrink-0 items-center gap-3 p-3 pl-4">
      <GlobalSearchTrigger />
      <div className="ml-auto flex items-center gap-2">
        <DataSourceBadge />
        <OrgSwitcher />
        <NotificationBell />
        <UserMenu initialUser={user} />
      </div>
    </header>
  );
}

export function AppShell({
  children,
  pathname,
  user,
}: {
  children: React.ReactNode;
  pathname: string;
  user: SessionUser;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <CollapsibleSidebar pathname={pathname} user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar user={user} />
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-5 md:py-5">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
  eyebrow = "Operations",
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-eyebrow">{eyebrow}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-gradient-brand md:text-[1.65rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function SectionCard({
  title,
  eyebrow,
  action,
  className,
  children,
}: {
  title?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("glass p-5", className)}>
      {(title || eyebrow || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className="font-display text-base font-semibold text-heading">{title}</h2>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

const SPARKLINE = [30, 45, 38, 60, 52, 70, 65, 82, 74, 90, 85, 100];

export function KpiCard({
  label,
  value,
  href,
  variant = "default",
  delta,
  deltaUp,
  showSparkline = true,
}: {
  label: string;
  value: number | string;
  href?: string;
  variant?: "default" | "warning";
  delta?: string;
  deltaUp?: boolean;
  showSparkline?: boolean;
}) {
  const inner = (
    <>
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/20 blur-2xl" />
      <div className="relative flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium tracking-wide uppercase">{label}</span>
      </div>
      <div className="relative mt-3 flex items-end justify-between gap-2">
        <p
          className={cn(
            "font-display text-4xl font-semibold tracking-tight",
            variant === "warning" ? "text-warning" : "text-heading",
          )}
        >
          {value}
        </p>
        {delta && (
          <span
            className={cn(
              "rounded-full px-2 py-1 text-[11px] font-medium",
              deltaUp ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
            )}
          >
            {delta}
          </span>
        )}
      </div>
      {showSparkline && (
        <div className="relative mt-4 flex h-8 items-end gap-1">
          {SPARKLINE.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-primary/10 to-primary/70"
            />
          ))}
        </div>
      )}
    </>
  );

  const surface = cn("glass relative overflow-hidden p-5 block", glassCardHover);

  if (href) {
    return (
      <Link href={href} className={surface}>
        {inner}
      </Link>
    );
  }

  return <div className={surface}>{inner}</div>;
}
