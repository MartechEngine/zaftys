import type { SubNavLink } from "@/components/app/module-sub-nav";

export const MAINTENANCE_NAV: SubNavLink[] = [
  { href: "/maintenance", label: "Overview", exact: true },
  { href: "/maintenance/schedules", label: "Schedules" },
  { href: "/maintenance/work-orders", label: "Work orders" },
  { href: "/maintenance/parts", label: "Parts" },
  { href: "/maintenance/faults", label: "Fault reports" },
];

export const BILLING_NAV: SubNavLink[] = [
  { href: "/billing", label: "Overview", exact: true },
  { href: "/billing/invoices", label: "Invoices" },
  { href: "/billing/rates", label: "Service rates" },
  { href: "/billing/accounts", label: "Accounts" },
  { href: "/billing/gst", label: "GST reports" },
];

export const INTEGRATIONS_NAV: SubNavLink[] = [
  { href: "/integrations", label: "Overview", exact: true },
  { href: "/integrations/fleetbase", label: "Fleetbase" },
  { href: "/integrations/webhooks", label: "Webhooks" },
  { href: "/integrations/logs", label: "API logs" },
  { href: "/integrations/events", label: "Events" },
  { href: "/integrations/telematics", label: "Telematics" },
  { href: "/integrations/devices", label: "Devices" },
  { href: "/integrations/sockets", label: "Sockets" },
  { href: "/integrations/tally", label: "Tally" },
];

export const NETWORK_NAV: SubNavLink[] = [
  { href: "/network", label: "Overview", exact: true },
  { href: "/network/overflow", label: "Overflow" },
  { href: "/network/assignments", label: "Assignments" },
  { href: "/network/partners", label: "Partners" },
  { href: "/network/sync", label: "Sync" },
];

export const REPORTS_NAV: SubNavLink[] = [
  { href: "/reports", label: "Overview", exact: true },
  { href: "/reports/operations", label: "Operations" },
  { href: "/reports/lanes", label: "Lanes & corridors" },
  { href: "/reports/drivers", label: "Driver scorecards" },
  { href: "/reports/fleet", label: "Fleet utilization" },
  { href: "/reports/custom", label: "Custom reports" },
];

export const FLEET_NAV: SubNavLink[] = [
  { href: "/fleet", label: "Overview", exact: true },
  { href: "/fleet/places", label: "Places" },
  { href: "/fleet/groups", label: "Groups" },
  { href: "/fleet/compliance", label: "Compliance" },
  { href: "/fleet/fuel/transactions", label: "Fuel" },
  { href: "/fleet/issues", label: "Issues" },
  { href: "/fleet/equipment", label: "Equipment" },
  { href: "/vendors", label: "Vendors" },
];

export const DISPATCH_NAV: SubNavLink[] = [
  { href: "/dispatch", label: "Board", exact: true },
  { href: "/dispatch/calendar", label: "Scheduler" },
  { href: "/dispatch/orchestrator", label: "Orchestrator" },
];

export const CLIENTS_NAV = (clientId: string): SubNavLink[] => [
  { href: `/clients/${clientId}`, label: "Overview", exact: true },
  { href: `/clients/${clientId}/contacts`, label: "Contacts" },
  { href: `/clients/${clientId}/users`, label: "Portal users" },
];
