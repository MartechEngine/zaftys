import { getOrgProfile } from "@/lib/settings/org-repository";
import { listOrgUsers } from "@/lib/settings/users-repository";
import { listOrgRoles } from "@/lib/settings/roles-repository";
import { listGeofences } from "@/lib/settings/geofences-repository";
import { listAutomationRules } from "@/lib/settings/automation-repository";
import { listOrderTypes } from "@/lib/settings/order-types-repository";
import { listServiceRates } from "@/lib/billing/rates-repository";
import { listInvoices } from "@/lib/billing/invoice-repository";
import { getSyncStatus, listDrivers, fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import {
  getConfigPatches,
  patchConfigSection,
} from "@/lib/mutations/entity-stores";
import { isReportScheduleDeleted } from "@/lib/mutations/sprint13-store";

function withPatch<T extends object>(section: string, base: T): T {
  const patch = getConfigPatches()[section];
  if (!patch) return base;
  return { ...base, ...patch };
}

export type SettingsHubSection = {
  href: string;
  title: string;
  description: string;
  meta: string;
};

export type DispatchSettings = {
  kanbanColumns: string[];
  orchestratorMode: string;
  autoAssign: boolean;
  unassignedCount: number;
  activeShipments: number;
};

export type MapSettings = {
  provider: string;
  style: string;
  styleEnv: string;
  geofenceCount: number;
  liveMapPath: string;
};

export type BillingTemplateSettings = {
  invoiceTemplate: string;
  paymentTerms: string;
  autoInvoiceOnDelivery: boolean;
  hsnSac: string;
  pendingInvoices: number;
  rateRuleCount: number;
  orgGstin: string;
};

export type SecuritySettings = {
  twoFactorEnabled: boolean;
  sessionTimeoutHours: number;
  passwordMinLength: number;
  passwordRotationDays: number;
  activeUsers: number;
  pendingInvites: number;
  authMode: string;
};

export type NotificationChannelSettings = {
  id: string;
  channel: string;
  recipients: string;
  enabled: boolean;
};

export type RoutingSettings = {
  primaryEngine: string;
  optimization: string;
  truckProfile: string;
  maxAxleMt: number;
  avoidTolls: boolean;
};

export type SchedulingSettings = {
  maxDrivingHours: number;
  plantWindow: string;
  weekendDispatch: string;
  autoScheduleOverflow: boolean;
  scheduledTrips: number;
};

export type NavigatorAppSettings = {
  appName: string;
  primaryColor: string;
  selfServeSignup: boolean;
  requireEpodPhoto: boolean;
  invitedDrivers: number;
  onlineDrivers: number;
};

export type PaymentsSettings = {
  gatewaysEnabled: boolean;
  message: string;
  billingHref: string;
  pendingInvoiceCount: number;
};

export type ReportSchedule = {
  id: string;
  name: string;
  cadence: string;
  recipients: string;
};

export type TrackingSettings = {
  logo: string;
  tokenExpiryDays: number;
  showInternalEvents: boolean;
  sampleTrackPath: string;
  orgName: string;
};

export type PolicyBlock = {
  id: string;
  title: string;
  summary: string;
};

export async function getSettingsHub(): Promise<{
  sections: SettingsHubSection[];
  orgName: string;
  userCount: number;
  roleCount: number;
  orderTypeCount: number;
  automationEnabled: number;
}> {
  const [org, users, roles, orderTypes, automation, geofences, rates] = await Promise.all([
    getOrgProfile(),
    listOrgUsers(),
    listOrgRoles(),
    listOrderTypes(),
    listAutomationRules(),
    listGeofences(),
    listServiceRates(),
  ]);

  const automationEnabled = automation.filter((r) => r.enabled).length;

  return {
    orgName: org.name,
    userCount: users.length,
    roleCount: roles.length,
    orderTypeCount: orderTypes.length,
    automationEnabled,
    sections: [
      {
        href: "/settings/organization",
        title: "Organization",
        description: "Profile, GSTIN, branding",
        meta: org.gstin,
      },
      {
        href: "/settings/users",
        title: "Users & invites",
        description: "Staff and portal access",
        meta: `${users.length} users`,
      },
      {
        href: "/settings/roles",
        title: "Roles & policies",
        description: "IAM permissions",
        meta: `${roles.length} roles`,
      },
      {
        href: "/settings/order-types",
        title: "Order types",
        description: "Flows and custom fields",
        meta: `${orderTypes.length} types`,
      },
      {
        href: "/settings/dispatch",
        title: "Dispatch & orchestrator",
        description: "Automation defaults",
        meta: `${automationEnabled} rules on`,
      },
      {
        href: "/settings/map",
        title: "Map & routing",
        description: "MapLibre, Valhalla, VROOM",
        meta: `${geofences.length} geofences`,
      },
      {
        href: "/settings/navigator",
        title: "Navigator app",
        description: "Driver mobile config",
        meta: "ZAFTYS Navigator",
      },
      {
        href: "/settings/billing",
        title: "Billing templates",
        description: "Invoice PDF defaults",
        meta: `${rates.length} rate rules`,
      },
      {
        href: "/settings/integrations",
        title: "Integrations",
        description: "Link to developers hub",
        meta: "Fleetbase · TranZfort",
      },
    ],
  };
}

export async function getDispatchSettings(): Promise<DispatchSettings> {
  const shipments = await fetchAllShipmentsRaw();
  const active = shipments.filter((s) => !["delivered", "cancelled"].includes(s.status));
  const unassigned = active.filter((s) => !s.driver).length;

  return withPatch("dispatch", {
    kanbanColumns: ["Unassigned", "Assigned", "In progress", "Completed"],
    orchestratorMode: "Manual review before dispatch",
    autoAssign: false,
    unassignedCount: unassigned,
    activeShipments: active.length,
  });
}

export async function getMapSettings(): Promise<MapSettings> {
  const geofences = await listGeofences();
  return withPatch("map", {
    provider: "MapLibre GL + OpenFreeMap",
    style: "Dark (default)",
    styleEnv: process.env.NEXT_PUBLIC_MAP_STYLE ?? "—",
    geofenceCount: geofences.length,
    liveMapPath: "/map",
  });
}

export async function getBillingTemplateSettings(): Promise<BillingTemplateSettings> {
  const [org, invoices, rates] = await Promise.all([
    getOrgProfile(),
    listInvoices(),
    listServiceRates(),
  ]);

  return withPatch("billing", {
    invoiceTemplate: "ZAFTYS GST A4 · logo + bank details",
    paymentTerms: "Net 15 days",
    autoInvoiceOnDelivery: true,
    hsnSac: "9965 — Goods transport services",
    pendingInvoices: invoices.filter((i) => i.status === "pending").length,
    rateRuleCount: rates.length,
    orgGstin: org.gstin,
  });
}

export async function getSecuritySettings(): Promise<SecuritySettings> {
  const users = await listOrgUsers();
  return withPatch("security", {
    twoFactorEnabled: false,
    sessionTimeoutHours: 8,
    passwordMinLength: 12,
    passwordRotationDays: 90,
    activeUsers: users.filter((u) => u.status === "active").length,
    pendingInvites: users.filter((u) => u.status === "pending").length,
    authMode: "Dev session (NextAuth deferred)",
  });
}

export async function getNotificationSettings(): Promise<NotificationChannelSettings[]> {
  const sync = await getSyncStatus();
  const patch = getConfigPatches()["notifications"] ?? {};
  const channels = [
    {
      id: "n-exc",
      channel: "Exception alerts",
      recipients: "Email + in-app · dispatchers",
      enabled: true,
    },
    {
      id: "n-sync",
      channel: "Sync failures",
      recipients: "Email · admins",
      enabled: Boolean(sync.tranzfortConfigured),
    },
    {
      id: "n-docs",
      channel: "Document expiry",
      recipients: "In-app · fleet managers",
      enabled: true,
    },
    {
      id: "n-wa",
      channel: "Client tracking updates",
      recipients: "WhatsApp (P5)",
      enabled: false,
    },
  ];

  return channels.map((c) => {
    const override = patch[c.id];
    if (typeof override === "boolean") return { ...c, enabled: override };
    return c;
  });
}

export async function getRoutingSettings(): Promise<RoutingSettings> {
  return withPatch("routing", {
    primaryEngine: "Valhalla (Fleetbase extension)",
    optimization: "VROOM for multi-stop",
    truckProfile: "Multi-axle",
    maxAxleMt: 42,
    avoidTolls: false,
  });
}

export async function getSchedulingSettings(): Promise<SchedulingSettings> {
  const shipments = await fetchAllShipmentsRaw();
  const scheduled = shipments.filter((s) =>
    ["pending", "dispatched", "at_plant"].includes(s.status),
  ).length;

  return withPatch("scheduling", {
    maxDrivingHours: 10,
    plantWindow: "06:00 – 20:00",
    weekendDispatch: "Allowed with approval",
    autoScheduleOverflow: false,
    scheduledTrips: scheduled,
  });
}

export async function getNavigatorAppSettings(): Promise<NavigatorAppSettings> {
  const drivers = await listDrivers();
  const online = drivers.filter((d) => d.status === "on_duty" || d.status === "on_trip").length;

  return withPatch("navigator", {
    appName: "ZAFTYS Navigator",
    primaryColor: "#1B3A5C",
    selfServeSignup: false,
    requireEpodPhoto: true,
    invitedDrivers: drivers.length,
    onlineDrivers: online,
  });
}

export async function getPaymentsSettings(): Promise<PaymentsSettings> {
  const invoices = await listInvoices();
  return withPatch("payments", {
    gatewaysEnabled: false,
    message:
      "Stripe and other payment gateways are not enabled for the initial India freight rollout. Trip billing uses GST invoices in the Billing module.",
    billingHref: "/billing/invoices",
    pendingInvoiceCount: invoices.filter((i) => i.status === "pending").length,
  });
}

export async function getReportSchedules(): Promise<ReportSchedule[]> {
  const org = await getOrgProfile();
  const { listStoredReportSchedules } = await import("@/lib/mutations/fleet-entity-store");
  const base = [
    {
      id: "rs1",
      name: "Weekly ops summary",
      cadence: "Mon 07:00",
      recipients: `dispatchers@${org.email.split("@")[1] ?? "zaftys.com"}`,
    },
    {
      id: "rs2",
      name: "Monthly GST pack",
      cadence: "1st of month",
      recipients: `accounts@${org.email.split("@")[1] ?? "zaftys.com"}`,
    },
    {
      id: "rs3",
      name: "Fleet utilization digests",
      cadence: "Fri 18:00",
      recipients: `fleet@${org.email.split("@")[1] ?? "zaftys.com"}`,
    },
  ];
  return [...listStoredReportSchedules(), ...base].filter(
    (s) => !isReportScheduleDeleted(s.id),
  );
}

export function validateCreateReportScheduleInput(
  body: unknown,
): { name: string; cadence: string; recipients: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const cadence = String(data.cadence ?? "").trim();
  const recipients = String(data.recipients ?? "").trim();
  if (!name) return { error: "Name is required." };
  if (!cadence) return { error: "Cadence is required." };
  if (!recipients) return { error: "Recipients are required." };
  return { name, cadence, recipients };
}

export async function createReportSchedule(input: {
  name: string;
  cadence: string;
  recipients: string;
}) {
  const { createStoredReportSchedule } = await import("@/lib/mutations/fleet-entity-store");
  return createStoredReportSchedule(input);
}

export async function deleteReportSchedule(id: string): Promise<boolean> {
  const { deleteStoredReportSchedule, listStoredReportSchedules } = await import(
    "@/lib/mutations/fleet-entity-store"
  );
  const { markReportScheduleDeleted, isReportScheduleDeleted } = await import(
    "@/lib/mutations/sprint13-store"
  );
  if (isReportScheduleDeleted(id)) return true;
  const demoIds = new Set(["rs1", "rs2", "rs3"]);
  const stored = listStoredReportSchedules();
  if (!demoIds.has(id) && !stored.some((s) => s.id === id)) return false;
  deleteStoredReportSchedule(id);
  markReportScheduleDeleted(id);
  return true;
}

export async function getTrackingSettings(): Promise<TrackingSettings> {
  const org = await getOrgProfile();
  const shipments = await fetchAllShipmentsRaw();
  const withToken = shipments.find((s) => s.trackToken);

  return withPatch("tracking", {
    logo: "ZAFTYS header on track page",
    tokenExpiryDays: 90,
    showInternalEvents: false,
    sampleTrackPath: withToken ? `/track/${withToken.trackToken}` : "/track/demo-1",
    orgName: org.name,
  });
}

export function validatePatchConfigInput(
  body: unknown,
): { section: string; values: Record<string, unknown> } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const section = String(data.section ?? "").trim();
  if (!section) return { error: "section is required." };
  const values =
    data.values && typeof data.values === "object"
      ? (data.values as Record<string, unknown>)
      : Object.fromEntries(
          Object.entries(data).filter(([k]) => k !== "section"),
        );
  if (Object.keys(values).length === 0) {
    return { error: "Provide at least one setting value." };
  }
  return { section, values };
}

export async function patchSettingsConfig(
  section: string,
  values: Record<string, unknown>,
) {
  return patchConfigSection(section, values);
}

export async function getPolicyBlocks(): Promise<PolicyBlock[]> {
  const [automation, compliance] = await Promise.all([
    listAutomationRules(),
    import("@/lib/fleet/compliance-repository").then((m) => m.listComplianceDocs()),
  ]);

  const overflowRule = automation.find((r) => r.id === "ar2");
  const expiring = compliance.filter((d) => d.status !== "valid").length;

  return [
    {
      id: "pol-dispatch",
      title: "Dispatch policies",
      summary: overflowRule?.enabled
        ? `Auto-notify overflow partners · ${overflowRule.matchCount ?? 0} matching now · Require LR before in-transit`
        : "Require LR before in-transit · Manual overflow review",
    },
    {
      id: "pol-docs",
      title: "Document policies",
      summary: `Block dispatch if fitness expired · Alert 30 days before expiry · ${expiring} docs need attention`,
    },
    {
      id: "pol-client",
      title: "Client visibility",
      summary: "Clients see live map + ePOD · Hide driver phone numbers",
    },
  ];
}
