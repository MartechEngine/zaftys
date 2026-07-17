"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SETTINGS_LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/settings", label: "Hub", exact: true },
  { href: "/settings/organization", label: "Organization" },
  { href: "/settings/users", label: "Users" },
  { href: "/settings/roles", label: "Roles" },
  { href: "/settings/policies", label: "Policies" },
  { href: "/settings/groups", label: "Groups" },
  { href: "/settings/order-types", label: "Order types" },
  { href: "/settings/automation", label: "Automation" },
  { href: "/settings/dispatch", label: "Dispatch" },
  { href: "/settings/geofences", label: "Geofences" },
  { href: "/settings/map", label: "Map" },
  { href: "/settings/routing", label: "Routing" },
  { href: "/settings/scheduling", label: "Scheduling" },
  { href: "/settings/navigator", label: "Navigator app" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/billing", label: "Billing templates" },
  { href: "/settings/payments", label: "Payments" },
  { href: "/settings/reports", label: "Report schedules" },
  { href: "/settings/tracking", label: "Public tracking" },
  { href: "/settings/security", label: "Security" },
];

export function SettingsNav() {
  const pathname = usePathname();
  return (
    <nav className="mb-6 flex flex-wrap gap-1">
      {SETTINGS_LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors",
              active
                ? "bg-navy-accent/20 text-navy-bright"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
