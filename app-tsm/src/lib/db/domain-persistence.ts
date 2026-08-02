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
  await upsertDocument(collection, id, payload);
}

async function persistPatchMap(
  collection: CollectionName,
  id: string,
  value: unknown,
) {
  if (!isDatabaseConfigured()) return;
  await persistMapEntry(collection, id, value);
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

// --- TSM org account (TranZfort bridge auth-lite) ---
export async function ensureTsmOrgHydrated() {
  if (!isDatabaseConfigured()) return;
  const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
    await import("@/lib/db/collections");
  if (!isCollectionHydrated("tsm_org")) {
    const { upsertTsmOrgAccounts } = await import("@/lib/tsm/org-account-store");
    type TsmOrgAccount = import("@/lib/tsm/org").TsmOrgAccount;
    const rows = await loadCollection<TsmOrgAccount & { id: string }>("tsm_org");
    if (rows.length > 0) {
      upsertTsmOrgAccounts(rows);
    }
    markCollectionHydrated("tsm_org");
  }

  if (!isCollectionHydrated("tsm_publish_audit")) {
    const { replacePublishAudit } = await import("@/lib/tsm/publish-audit-store");
    type PublishAuditRow = import("@/lib/tsm/publish-audit-store").PublishAuditRow;
    const audits = await loadCollection<PublishAuditRow>("tsm_publish_audit");
    if (audits.length > 0) replacePublishAudit(audits);
    markCollectionHydrated("tsm_publish_audit");
  }

  if (!isCollectionHydrated("tsm_lr_audit")) {
    const { replaceLrAudit, replaceLrSeries } = await import(
      "@/lib/documents/lr-audit-store"
    );
    type LrAuditRow = import("@/lib/documents/lr-audit-store").LrAuditRow;
    const audits = await loadCollection<LrAuditRow>("tsm_lr_audit");
    if (audits.length > 0) replaceLrAudit(audits);
    const seriesRows = await loadCollection<{ id: string } & Record<string, number>>(
      "tsm_lr_series",
    );
    const series = seriesRows.find((r) => r.id === "series");
    if (series) {
      const { id: _id, ...map } = series;
      replaceLrSeries(map as Record<string, number>);
    }
    markCollectionHydrated("tsm_lr_audit");
  }
}

export async function persistTsmOrgAccount(
  account: import("@/lib/tsm/org").TsmOrgAccount,
) {
  await persistItem("tsm_org", account.id, account);
}

export async function persistPublishAuditRow(
  row: import("@/lib/tsm/publish-audit-store").PublishAuditRow,
) {
  await persistItem("tsm_publish_audit", row.id, row);
}

// --- Auth-lite login users ---
export async function ensureAuthUsersHydrated() {
  const { applyAuthSeedOnce } = await import("@/lib/auth/auth-seed");
  const { setPasswordHashRaw } = await import("@/lib/auth/password-store");
  applyAuthSeedOnce(setPasswordHashRaw);

  if (!isDatabaseConfigured()) return;
  const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
    await import("@/lib/db/collections");
  if (isCollectionHydrated("auth_users")) return;
  const { replaceAuthUsers, listAuthUsers } = await import(
    "@/lib/auth/auth-users-store"
  );
  type AuthUserRecord = import("@/lib/auth/auth-users-store").AuthUserRecord;
  const rows = await loadCollection<AuthUserRecord>("auth_users");
  if (rows.length > 0) {
    // Merge DB over seed (keep both)
    const byEmail = new Map(listAuthUsers().map((u) => [u.email.toLowerCase(), u]));
    for (const row of rows) byEmail.set(row.email.toLowerCase(), row);
    replaceAuthUsers([...byEmail.values()]);
  }
  markCollectionHydrated("auth_users");
}

export async function persistAuthUser(
  user: import("@/lib/auth/auth-users-store").AuthUserRecord,
) {
  await persistItem("auth_users", user.id, user);
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

// --- Fleet aux (places / equipment / groups) + partners + reports ---
export async function ensureFleetAuxHydrated() {
  const {
    listStoredPlaces,
    replaceStoredPlaces,
  } = await import("@/lib/fleet/places-store");
  const {
    listStoredEquipment,
    replaceStoredEquipment,
  } = await import("@/lib/fleet/equipment-store");
  const {
    listStoredFuelTransactions,
    replaceStoredFuelTransactions,
  } = await import("@/lib/fleet/fuel-store");
  const {
    listStoredFleetIssues,
    replaceStoredFleetIssues,
    replaceResolvedIssues,
    replaceCompliancePatches,
  } = await import("@/lib/mutations/sprint10-store");
  const {
    listStoredFleetGroups,
    replaceStoredFleetGroups,
    listStoredPartners,
    replaceStoredPartners,
  } = await import("@/lib/mutations/entity-stores");
  const {
    listStoredCustomReports,
    replaceStoredCustomReports,
    listStoredReportSchedules,
    replaceStoredReportSchedules,
    replaceVendorPatches,
  } = await import("@/lib/mutations/fleet-entity-store");
  const {
    replacePlacePatches,
    replaceEquipmentPatches,
  } = await import("@/lib/mutations/sprint11-store");
  const { replaceFleetGroupPatches } = await import("@/lib/mutations/sprint12-store");

  await Promise.all([
    ensureArrayHydrated({
      collection: "fleet_places",
      list: listStoredPlaces,
      replace: replaceStoredPlaces,
    }),
    ensureArrayHydrated({
      collection: "fleet_equipment",
      list: listStoredEquipment,
      replace: replaceStoredEquipment,
    }),
    ensureArrayHydrated({
      collection: "fleet_fuel",
      list: listStoredFuelTransactions,
      replace: replaceStoredFuelTransactions,
    }),
    ensureArrayHydrated({
      collection: "fleet_issues",
      list: listStoredFleetIssues,
      replace: replaceStoredFleetIssues,
    }),
    ensureArrayHydrated({
      collection: "fleet_groups",
      list: listStoredFleetGroups,
      replace: replaceStoredFleetGroups,
    }),
    ensureArrayHydrated({
      collection: "network_partners",
      list: listStoredPartners,
      replace: replaceStoredPartners,
    }),
    ensureArrayHydrated({
      collection: "custom_reports",
      list: listStoredCustomReports,
      replace: replaceStoredCustomReports,
    }),
    ensureArrayHydrated({
      collection: "report_schedules",
      list: listStoredReportSchedules,
      replace: replaceStoredReportSchedules,
    }),
  ]);

  if (isDatabaseConfigured()) {
    const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
      await import("@/lib/db/collections");
    if (!isCollectionHydrated("place_patches")) {
      const rows = await loadCollection<{
        id: string;
        value: { name?: string; type?: string; city?: string; geofence?: string };
      }>("place_patches");
      if (rows.length > 0) {
        replacePlacePatches(Object.fromEntries(rows.map((r) => [r.id, r.value])));
      }
      markCollectionHydrated("place_patches");
    }
    if (!isCollectionHydrated("equipment_patches")) {
      const rows = await loadCollection<{
        id: string;
        value: {
          location?: string;
          status?: "active" | "stored" | "maintenance";
        };
      }>("equipment_patches");
      if (rows.length > 0) {
        replaceEquipmentPatches(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("equipment_patches");
    }
    if (!isCollectionHydrated("fleet_group_patches")) {
      const rows = await loadCollection<{
        id: string;
        value: { name?: string; zone?: string };
      }>("fleet_group_patches");
      if (rows.length > 0) {
        replaceFleetGroupPatches(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("fleet_group_patches");
    }
    if (!isCollectionHydrated("vendor_patches")) {
      const rows = await loadCollection<{
        id: string;
        value: {
          name?: string;
          type?: string;
          city?: string;
          contact?: string;
        };
      }>("vendor_patches");
      if (rows.length > 0) {
        replaceVendorPatches(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("vendor_patches");
    }
    if (!isCollectionHydrated("compliance_patches")) {
      const rows = await loadCollection<{
        id: string;
        value: { status: "valid" | "expiring" | "expired"; expires?: string };
      }>("compliance_patches");
      if (rows.length > 0) {
        replaceCompliancePatches(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("compliance_patches");
    }
    if (!isCollectionHydrated("fleet_issue_resolved")) {
      const rows = await loadCollection<{ id: string; value: boolean }>(
        "fleet_issue_resolved",
      );
      if (rows.length > 0) {
        replaceResolvedIssues(rows.filter((r) => r.value).map((r) => r.id));
      }
      markCollectionHydrated("fleet_issue_resolved");
    }
  }
}

export async function persistPlace(p: { id: string }) {
  await persistItem("fleet_places", p.id, p);
}
export async function persistPlacePatch(id: string, value: unknown) {
  await persistPatchMap("place_patches", id, value);
}
export async function persistEquipment(e: { id: string }) {
  await persistItem("fleet_equipment", e.id, e);
}
export async function persistEquipmentPatch(id: string, value: unknown) {
  await persistPatchMap("equipment_patches", id, value);
}
export async function persistFuelTransaction(tx: { id: string }) {
  await persistItem("fleet_fuel", tx.id, tx);
}
export async function persistFleetIssue(issue: { id: string }) {
  await persistItem("fleet_issues", issue.id, issue);
}
export async function persistFleetIssueResolved(id: string) {
  await persistPatchMap("fleet_issue_resolved", id, true);
}
export async function persistCompliancePatch(id: string, value: unknown) {
  await persistPatchMap("compliance_patches", id, value);
}
export async function persistFleetGroup(g: { id: string }) {
  await persistItem("fleet_groups", g.id, g);
}
export async function persistFleetGroupPatch(id: string, value: unknown) {
  await persistPatchMap("fleet_group_patches", id, value);
}
export async function persistPartner(p: { id: string }) {
  await persistItem("network_partners", p.id, p);
}
export async function persistCustomReport(r: { id: string }) {
  await persistItem("custom_reports", r.id, r);
}
export async function persistReportSchedule(r: { id: string }) {
  await persistItem("report_schedules", r.id, r);
}
export async function persistVendorPatch(id: string, value: unknown) {
  await persistPatchMap("vendor_patches", id, value);
}

// --- Faults / parts / overflow / role permissions ---
export async function ensureMaintenanceAuxHydrated() {
  const {
    listCreatedFaults,
    replaceCreatedFaults,
  } = await import("@/lib/mutations/sprint18-store");
  const {
    listCreatedParts,
    replaceCreatedParts,
  } = await import("@/lib/mutations/sprint17-store");
  const {
    replaceFaultStatusOverrides,
  } = await import("@/lib/maintenance/fault-store");
  const {
    replacePartStock,
  } = await import("@/lib/maintenance/parts-store");
  const {
    listOverflowLoads,
    replaceOverflowLoads,
  } = await import("@/lib/network/overflow-store");
  const {
    replaceRolePermissionPatches,
  } = await import("@/lib/mutations/sprint16-store");

  await Promise.all([
    ensureArrayHydrated({
      collection: "faults",
      list: listCreatedFaults,
      replace: replaceCreatedFaults,
    }),
    ensureArrayHydrated({
      collection: "parts",
      list: listCreatedParts,
      replace: replaceCreatedParts,
    }),
    ensureArrayHydrated({
      collection: "network_overflow",
      list: () => listOverflowLoads(),
      replace: replaceOverflowLoads,
    }),
  ]);

  if (isDatabaseConfigured()) {
    const { loadCollection, isCollectionHydrated, markCollectionHydrated } =
      await import("@/lib/db/collections");
    if (!isCollectionHydrated("fault_status")) {
      const rows = await loadCollection<{
        id: string;
        value: "open" | "linked" | "resolved";
      }>("fault_status");
      if (rows.length > 0) {
        replaceFaultStatusOverrides(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("fault_status");
    }
    if (!isCollectionHydrated("parts_stock")) {
      const rows = await loadCollection<{ id: string; value: number }>("parts_stock");
      if (rows.length > 0) {
        replacePartStock(Object.fromEntries(rows.map((r) => [r.id, r.value])));
      }
      markCollectionHydrated("parts_stock");
    }
    if (!isCollectionHydrated("role_permissions")) {
      const rows = await loadCollection<{
        id: string;
        value: Record<string, boolean>;
      }>("role_permissions");
      if (rows.length > 0) {
        replaceRolePermissionPatches(
          Object.fromEntries(rows.map((r) => [r.id, r.value])),
        );
      }
      markCollectionHydrated("role_permissions");
    }
  }
}

export async function persistFault(f: { id: string }) {
  await persistItem("faults", f.id, f);
}
export async function persistFaultStatus(
  id: string,
  status: "open" | "linked" | "resolved",
) {
  await persistPatchMap("fault_status", id, status);
}
export async function persistPart(p: { id: string }) {
  await persistItem("parts", p.id, p);
}
export async function persistPartStock(id: string, stock: number) {
  await persistPatchMap("parts_stock", id, stock);
}
export async function persistOverflowLoad(load: { id: string }) {
  await persistItem("network_overflow", load.id, load);
}
export async function persistRolePermissions(
  roleId: string,
  permissions: Record<string, boolean>,
) {
  await persistPatchMap("role_permissions", roleId, permissions);
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
    ensureFleetAuxHydrated(),
    ensureMaintenanceAuxHydrated(),
  ]);
}
