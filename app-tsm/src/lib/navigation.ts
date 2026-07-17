import type { UserRole } from "@/lib/auth/types";

export type NavIcon =
  | "LayoutDashboard"
  | "Package"
  | "Kanban"
  | "Map"
  | "Truck"
  | "Network"
  | "Users"
  | "FileText"
  | "BarChart3"
  | "Wrench"
  | "CreditCard"
  | "Plug"
  | "Settings";

export interface NavItem {
  href: string;
  label: string;
  icon: NavIcon;
  roles: UserRole[];
}

/** Full product sidebar — see docs/app/sitemap-tsm.md */
export const NAV_BY_ROLE: NavItem[] = [
  { href: "/", label: "Command Center", icon: "LayoutDashboard", roles: ["admin", "dispatcher"] },
  { href: "/shipments", label: "Shipments", icon: "Package", roles: ["admin", "dispatcher", "fleet_manager", "client", "partner"] },
  { href: "/dispatch", label: "Dispatch", icon: "Kanban", roles: ["admin", "dispatcher"] },
  { href: "/map", label: "Live Map", icon: "Map", roles: ["admin", "dispatcher"] },
  { href: "/fleet", label: "Fleet", icon: "Truck", roles: ["admin", "dispatcher", "fleet_manager"] },
  { href: "/network", label: "Network", icon: "Network", roles: ["admin", "dispatcher", "partner"] },
  { href: "/clients", label: "Clients", icon: "Users", roles: ["admin", "dispatcher"] },
  { href: "/documents", label: "Documents", icon: "FileText", roles: ["admin", "dispatcher", "fleet_manager", "client"] },
  { href: "/reports", label: "Reports", icon: "BarChart3", roles: ["admin", "dispatcher", "client"] },
  { href: "/maintenance", label: "Maintenance", icon: "Wrench", roles: ["admin", "fleet_manager"] },
  { href: "/billing", label: "Billing", icon: "CreditCard", roles: ["admin"] },
  { href: "/integrations", label: "Integrations", icon: "Plug", roles: ["admin"] },
  { href: "/settings", label: "Settings", icon: "Settings", roles: ["admin"] },
];

export function getNavItemsForRole(role: UserRole) {
  return NAV_BY_ROLE.filter((item) => item.roles.includes(role));
}

export interface NavGroup {
  label: string;
  hrefs: string[];
}

/** Sidebar sections — aligned with obsidian-glass mock */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Operations",
    hrefs: ["/", "/shipments", "/dispatch", "/map"],
  },
  {
    label: "Network & resources",
    hrefs: ["/fleet", "/network", "/maintenance", "/clients", "/documents", "/vendors"],
  },
  {
    label: "Insights",
    hrefs: ["/reports", "/notifications"],
  },
  {
    label: "System",
    hrefs: ["/billing", "/integrations", "/settings"],
  },
];

export function groupNavItems(items: NavItem[]) {
  const groups = NAV_GROUPS.map((group) => ({
    label: group.label,
    items: group.hrefs
      .map((href) => items.find((i) => i.href === href))
      .filter((i): i is NavItem => Boolean(i)),
  })).filter((g) => g.items.length > 0);

  const rest = items.filter((i) => !NAV_GROUPS.some((g) => g.hrefs.includes(i.href)));
  if (rest.length > 0) {
    groups.push({ label: "More", items: rest });
  }
  return groups;
}

const ADMIN_ONLY_PREFIXES = ["/settings", "/integrations", "/billing"];
const OPS_PREFIXES = ["/", "/dispatch", "/map", "/network", "/clients", "/reports"];

const PATH_RULES: { match: (path: string) => boolean; roles: UserRole[] }[] = [
  { match: (p) => p === "/", roles: ["admin", "dispatcher"] },
  { match: (p) => p.startsWith("/dispatch"), roles: ["admin", "dispatcher"] },
  { match: (p) => p.startsWith("/map"), roles: ["admin", "dispatcher"] },
  { match: (p) => p.startsWith("/fleet"), roles: ["admin", "dispatcher", "fleet_manager"] },
  { match: (p) => p.startsWith("/network"), roles: ["admin", "dispatcher", "partner"] },
  { match: (p) => p.startsWith("/clients"), roles: ["admin", "dispatcher"] },
  { match: (p) => p.startsWith("/documents"), roles: ["admin", "dispatcher", "fleet_manager", "client"] },
  { match: (p) => p.startsWith("/reports"), roles: ["admin", "dispatcher", "client"] },
  { match: (p) => p.startsWith("/maintenance"), roles: ["admin", "fleet_manager"] },
  { match: (p) => p.startsWith("/billing"), roles: ["admin"] },
  { match: (p) => p.startsWith("/integrations"), roles: ["admin"] },
  { match: (p) => p.startsWith("/settings"), roles: ["admin"] },
  { match: (p) => p.startsWith("/notifications"), roles: ["admin", "dispatcher", "fleet_manager", "client", "partner"] },
  { match: (p) => p.startsWith("/profile"), roles: ["admin", "dispatcher", "fleet_manager", "client", "partner"] },
  { match: (p) => p.startsWith("/vendors"), roles: ["admin"] },
  { match: (p) => p.startsWith("/shipments"), roles: ["admin", "dispatcher", "fleet_manager", "client", "partner"] },
];

export function isPathAllowedForRole(pathname: string, role: UserRole) {
  for (const rule of PATH_RULES) {
    if (rule.match(pathname)) {
      return rule.roles.includes(role);
    }
  }
  return true;
}

export function defaultRouteForRole(role: UserRole) {
  switch (role) {
    case "fleet_manager":
      return "/fleet";
    case "client":
    case "partner":
      return "/shipments";
    default:
      return "/";
  }
}

export { ADMIN_ONLY_PREFIXES, OPS_PREFIXES };
