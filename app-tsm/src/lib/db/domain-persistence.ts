/**
 * Domain hydrate + write-through for portal stores (ADR-007 Phase C).
 * Repositories call ensure* before reads and persist* after mutations.
 */
import {
  ensureArrayHydrated,
  persistMapEntry,
  upsertDocument,
  type CollectionName,
} from "@/lib/db/collections";
import { isDatabaseConfigured } from "@/lib/db/client";
import type { StoredClient } from "@/lib/clients/client-store";
import {
  listStoredClients,
  replaceStoredClients,
} from "@/lib/clients/client-store";
import type { ClientContact, ClientPortalUser, ClientRecord } from "@/lib/clients/client-repository";
import {
  listAllStoredContacts,
  listAllStoredClientUsers,
  replaceStoredContacts,
  replaceStoredClientUsers,
  replaceClientPatches,
} from "@/lib/clients/client-mutations";
import type { InvoiceRecord } from "@/lib/billing/invoice-repository";
import {
  listStoredInvoices,
  replaceStoredInvoices,
} from "@/lib/billing/invoice-create-store";
import {
  replaceInvoiceStatusOverrides,
} from "@/lib/billing/invoice-store";
import type { StoredServiceRate } from "@/lib/billing/rates-store";
import {
  listStoredRates,
  replaceStoredRates,
  replaceRatePatches,
} from "@/lib/billing/rates-store";
import type { StoredLedgerAccount } from "@/lib/mutations/sprint15-store";
import {
  listStoredLedgerAccounts,
  replaceStoredLedgerAccounts,
} from "@/lib/mutations/sprint15-store";
import type { OrgProfileFields } from "@/lib/settings/org-store";
import {
  replaceStoredOrgProfile,
} from "@/lib/settings/org-store";
import type { StoredVendor } from "@/lib/vendors/vendor-store";
import {
  listStoredVendors,
  replaceStoredVendors,
} from "@/lib/vendors/vendor-store";
import type { QuoteRecord } from "@/lib/shipments/quotes-store";
import {
  listStoredQuotes,
  replaceStoredQuotes,
} from "@/lib/shipments/quotes-store";
import type { StoredWorkOrder } from "@/lib/maintenance/work-order-store";
import {
  listStoredWorkOrders,
  replaceStoredWorkOrders,
  replaceWorkOrderStatusOverrides,
} from "@/lib/maintenance/work-order-store";
import type { StoredOrgUser, StoredRole, StoredSettingsGroup } from "@/lib/mutations/entity-stores";
import {
  listStoredOrgUsers,
  replaceStoredOrgUsers,
  listStoredRoles,
  replaceStoredRoles,
  listStoredSettingsGroups,
  replaceStoredSettingsGroups,
  listStoredSchedules,
  replaceStoredSchedules,
  replaceConfigPatches,
} from "@/lib/mutations/entity-stores";
import type { AutomationRuleRecord } from "@/lib/settings/automation-repository";
import {
  listStoredAutomationRules,
  replaceStoredAutomationRules,
} from "@/lib/mutations/sprint12-store";
import type { StoredGeofence } from "@/lib/settings/geofences-store";
import {
  listStoredGeofences,
  replaceStoredGeofences,
} from "@/lib/settings/geofences-store";
import type { StoredOrderType, StoredOrderField } from "@/lib/settings/order-types-store";
import {
  listStoredOrderTypes,
  replaceStoredOrderTypes,
  listAllStoredOrderFields,
  replaceStoredOrderFields,
} from "@/lib/settings/order-types-store";

async function persistItem(collection: CollectionName, id: string, payload: unknown) {
  if (!isDatabaseConfigured()) return;
  try {
    await upsertDocument(collection, id, payload);
  } catch (err) {
    console.error(`[db] persist ${collection}/${id} failed`, err);
  }
}

async function persistPatchMap(
  collection: CollectionName,
  id: string,
  value: unknown,
) {
  if (!isDatabaseConfigured()) return;
  try {
    await persistMapEntry(collection, id, value);
  } catch (err) {
    console.error(`[db] persist map ${collection}/${id} failed`, err);
  }
}

// --- Clients ---
export async function ensureClientsHydrated() {
  await Promise.all([
    ensureArrayHydrated({
      collection: "clients",
      list: listStoredClients,
      replace: replaceStoredClients,
    }),
    ensureArrayHydrated({
      collection: "client_contacts",
      list: listAllStoredContacts,
      replace: replaceStoredContacts,
    }),
    ensureArrayHydrated({
      collection: "client_users",
      list: listAllStoredClientUsers,
      replace: replaceStoredClientUsers,
    }),
  ]);
  // patches
  if (isDatabaseConfigured()) {
    const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
      await import("@/lib/db/collections");
    if (!isCollectionHydrated("client_patches")) {
      const rows = await loadCollection<{ id: string; value: Partial<ClientRecord> }>(
        "client_patches",
      );
      if (rows.length > 0) {
        replaceClientPatches(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("client_patches");
    }
  }
}

export async function persistClient(c: StoredClient) {
  await persistItem("clients", c.id, c);
}
export async function persistClientContact(c: ClientContact) {
  await persistItem("client_contacts", c.id, c);
}
export async function persistClientUser(u: ClientPortalUser) {
  await persistItem("client_users", u.id, u);
}
export async function persistClientPatch(id: string, patch: Partial<ClientRecord>) {
  await persistPatchMap("client_patches", id, patch);
}

// --- Billing ---
export async function ensureBillingHydrated() {
  await Promise.all([
    ensureArrayHydrated({
      collection: "invoices",
      list: listStoredInvoices,
      replace: replaceStoredInvoices,
    }),
    ensureArrayHydrated({
      collection: "service_rates",
      list: listStoredRates,
      replace: replaceStoredRates,
    }),
    ensureArrayHydrated({
      collection: "ledger_accounts",
      list: listStoredLedgerAccounts,
      replace: replaceStoredLedgerAccounts,
    }),
  ]);
  if (isDatabaseConfigured()) {
    const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
      await import("@/lib/db/collections");
    if (!isCollectionHydrated("invoice_status")) {
      const rows = await loadCollection<{ id: string; value: "pending" | "paid" }>(
        "invoice_status",
      );
      if (rows.length > 0) {
        replaceInvoiceStatusOverrides(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("invoice_status");
    }
    if (!isCollectionHydrated("rate_patches")) {
      const rows = await loadCollection<{
        id: string;
        value: Partial<StoredServiceRate>;
      }>("rate_patches");
      if (rows.length > 0) {
        replaceRatePatches(Object.fromEntries(rows.map((r) => [r.id, r.value])));
      }
      markCollectionHydrated("rate_patches");
    }
  }
}

export async function persistInvoice(inv: InvoiceRecord) {
  await persistItem("invoices", inv.id, inv);
}
export async function persistInvoiceStatus(id: string, status: "pending" | "paid") {
  await persistPatchMap("invoice_status", id, status);
}
export async function persistServiceRate(rate: StoredServiceRate) {
  await persistItem("service_rates", rate.id, rate);
}
export async function persistLedgerAccount(a: StoredLedgerAccount) {
  await persistItem("ledger_accounts", a.id, a);
}

// --- Org / vendors / quotes / WO ---
export async function ensureOrgHydrated() {
  if (!isDatabaseConfigured()) return;
  const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
    await import("@/lib/db/collections");
  if (isCollectionHydrated("org_profile")) return;
  const rows = await loadCollection<OrgProfileFields & { id: string }>("org_profile");
  const profile = rows.find((r) => r.id === "profile") ?? rows[0];
  if (profile) {
    const { id: _id, ...fields } = profile as OrgProfileFields & { id: string };
    replaceStoredOrgProfile(fields);
    if (fields.logoFilename || fields.logoStorageKey) {
      const { setOrgLogoMeta } = await import("@/lib/mutations/sprint12-store");
      setOrgLogoMeta({
        filename: fields.logoFilename,
        storageKey: fields.logoStorageKey,
      });
    }
  }
  markCollectionHydrated("org_profile");
}

export async function persistOrgProfile(profile: OrgProfileFields) {
  await persistItem("org_profile", "profile", { id: "profile", ...profile });
}

export async function ensureVendorsHydrated() {
  await ensureArrayHydrated({
    collection: "vendors",
    list: listStoredVendors,
    replace: replaceStoredVendors,
  });
}
export async function persistVendor(v: StoredVendor) {
  await persistItem("vendors", v.id, v);
}

export async function ensureQuotesHydrated() {
  await ensureArrayHydrated({
    collection: "quotes",
    list: listStoredQuotes,
    replace: replaceStoredQuotes,
  });
}
export async function persistQuote(q: QuoteRecord) {
  await persistItem("quotes", q.id, q);
}

export async function ensureWorkOrdersHydrated() {
  await ensureArrayHydrated({
    collection: "work_orders",
    list: listStoredWorkOrders,
    replace: replaceStoredWorkOrders,
  });
  if (isDatabaseConfigured()) {
    const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
      await import("@/lib/db/collections");
    if (!isCollectionHydrated("work_order_status")) {
      const rows = await loadCollection<{
        id: string;
        value: "open" | "in_progress" | "resolved";
      }>("work_order_status");
      if (rows.length > 0) {
        replaceWorkOrderStatusOverrides(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("work_order_status");
    }
  }
}
export async function persistWorkOrder(wo: StoredWorkOrder) {
  await persistItem("work_orders", wo.id, wo);
}
export async function persistWorkOrderStatus(
  id: string,
  status: "open" | "in_progress" | "resolved",
) {
  await persistPatchMap("work_order_status", id, status);
}

// --- Settings IAM / automation / geofences / order-types ---
export async function ensureSettingsHydrated() {
  await Promise.all([
    ensureArrayHydrated({
      collection: "org_users",
      list: listStoredOrgUsers,
      replace: replaceStoredOrgUsers,
    }),
    ensureArrayHydrated({
      collection: "roles",
      list: listStoredRoles,
      replace: replaceStoredRoles,
    }),
    ensureArrayHydrated({
      collection: "settings_groups",
      list: listStoredSettingsGroups,
      replace: replaceStoredSettingsGroups,
    }),
    ensureArrayHydrated({
      collection: "automation_rules",
      list: listStoredAutomationRules,
      replace: replaceStoredAutomationRules,
    }),
    ensureArrayHydrated({
      collection: "geofences",
      list: listStoredGeofences,
      replace: replaceStoredGeofences,
    }),
    ensureArrayHydrated({
      collection: "order_types",
      list: listStoredOrderTypes,
      replace: replaceStoredOrderTypes,
    }),
    ensureArrayHydrated({
      collection: "order_fields",
      list: listAllStoredOrderFields,
      replace: replaceStoredOrderFields,
    }),
    ensureArrayHydrated({
      collection: "maintenance_schedules",
      list: listStoredSchedules,
      replace: replaceStoredSchedules,
    }),
  ]);
  if (isDatabaseConfigured()) {
    const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
      await import("@/lib/db/collections");
    if (!isCollectionHydrated("config_patches")) {
      const rows = await loadCollection<{
        id: string;
        value: Record<string, unknown>;
      }>("config_patches");
      if (rows.length > 0) {
        replaceConfigPatches(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("config_patches");
    }
  }
}

export async function persistOrgUser(u: StoredOrgUser) {
  await persistItem("org_users", u.id, u);
}
export async function persistRole(r: StoredRole) {
  await persistItem("roles", r.id, r);
}
export async function persistSettingsGroup(g: StoredSettingsGroup) {
  await persistItem("settings_groups", g.id, g);
}
export async function persistAutomationRule(r: AutomationRuleRecord) {
  await persistItem("automation_rules", r.id, r);
}
export async function persistGeofence(g: StoredGeofence) {
  await persistItem("geofences", g.id, g);
}
export async function persistOrderType(t: StoredOrderType) {
  await persistItem("order_types", t.id, t);
}
export async function persistOrderField(f: StoredOrderField) {
  await persistItem("order_fields", f.id, f);
}
export async function persistSchedule(s: { id: string }) {
  await persistItem("maintenance_schedules", s.id, s);
}
export async function persistConfigSection(
  section: string,
  patch: Record<string, unknown>,
) {
  await persistPatchMap("config_patches", section, patch);
}

/** Convenience: hydrate everything used by portal list pages. */
export async function ensurePortalDomainsHydrated() {
  await Promise.all([
    ensureClientsHydrated(),
    ensureBillingHydrated(),
    ensureOrgHydrated(),
    ensureVendorsHydrated(),
    ensureQuotesHydrated(),
    ensureWorkOrdersHydrated(),
    ensureSettingsHydrated(),
  ]);
}
