"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Kanban,
  Map,
  Truck,
  Network,
  Users,
  FileText,
  BarChart3,
  Wrench,
  CreditCard,
  Plug,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getNavItemsForRole, groupNavItems } from "@/lib/navigation";
import type { SessionUser } from "@/lib/auth/types";
import { glassHighlight } from "@/lib/surface";
import { cn } from "@/lib/utils";

const SIDEBAR_STORAGE_KEY = "tsm-sidebar-collapsed";

const iconMap = {
  LayoutDashboard,
  Package,
  Kanban,
  Map,
  Truck,
  Network,
  Users,
  FileText,
  BarChart3,
  Wrench,
  CreditCard,
  Plug,
  Settings,
};

export function CollapsibleSidebar({
  pathname,
  user,
}: {
  pathname: string;
  user: SessionUser;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  const groups = groupNavItems(getNavItemsForRole(user.role));

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <aside
      className={cn(
        "glass relative z-10 m-3 mr-0 flex h-[calc(100vh-1.5rem)] shrink-0 flex-col overflow-hidden border-r-0 transition-[width] duration-200 ease-out",
        collapsed ? "w-[4.25rem]" : "w-60",
      )}
    >
      <div
        className={cn(
          "flex items-center border-b border-white/10",
          collapsed ? "flex-col gap-2 px-2 py-3" : "gap-2 px-3 py-3",
        )}
      >
        <Link
          href="/"
          className={cn("min-w-0 shrink-0", collapsed ? "grid place-items-center" : "flex-1")}
          aria-label="ZAFTYS TSM Portal home"
        >
          <Image
            src="/brand/header-logo-app.png"
            alt="ZAFTYS Logistics"
            width={200}
            height={56}
            className={cn(
              "w-auto object-contain object-left",
              collapsed ? "hidden" : "block h-12 max-w-[9.5rem]",
            )}
            priority
          />
          <Image
            src="/brand/logo-footer.png"
            alt="ZAFTYS Logistics"
            width={36}
            height={36}
            className={cn("h-9 w-9 object-contain", collapsed ? "block" : "hidden")}
            priority
          />
        </Link>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="grid size-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" strokeWidth={2} />
          ) : (
            <ChevronLeft className="size-4" strokeWidth={2} />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="mb-1.5 px-2 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center rounded-xl text-sm transition-colors",
                      collapsed ? "justify-center px-2 py-2.5" : "gap-2.5 px-2.5 py-2",
                      active
                        ? cn(glassHighlight, "font-medium")
                        : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                    {!collapsed && (
                      <>
                        {item.label}
                        {item.href === "/network" && (
                          <span className="ml-auto rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                            NEW
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        {!collapsed ? (
          <div className="glass-strong rounded-xl p-3">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Activity className="size-3.5 text-success" />
              Network health
            </div>
            <div className="mt-1.5 font-display text-xl font-semibold">98.2%</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[98%] rounded-full bg-gradient-primary" />
            </div>
          </div>
        ) : (
          <div
            className="grid place-items-center rounded-xl border border-white/10 bg-white/[0.05] py-2"
            title="Network health 98.2%"
          >
            <Activity className="size-4 text-success" />
          </div>
        )}

      </div>
    </aside>
  );
}
