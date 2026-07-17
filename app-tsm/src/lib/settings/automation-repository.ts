import { demoAutomationRules } from "@/lib/demo-data";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { listNetworkOverflow } from "@/lib/data/overflow-repository";
import { listComplianceDocs } from "@/lib/fleet/compliance-repository";
import {
  getAutomationOverride,
  setAutomationEnabled,
} from "@/lib/settings/automation-store";
import {
  createStoredAutomationRule,
  listStoredAutomationRules,
} from "@/lib/mutations/sprint12-store";
import {
  isAutomationDeleted,
  markAutomationDeleted,
} from "@/lib/mutations/sprint13-store";

export type AutomationRuleRecord = {
  id: string;
  trigger: string;
  action: string;
  enabled: boolean;
  matchCount?: number;
};

export async function listAutomationRules(): Promise<AutomationRuleRecord[]> {
  const [shipments, overflow, compliance] = await Promise.all([
    fetchAllShipmentsRaw(),
    listNetworkOverflow(undefined, "active"),
    listComplianceDocs(),
  ]);

  const inTransit = shipments.filter((s) => s.status === "in_transit").length;
  const unassignedOverflow = overflow.filter(
    (o) => o.status === "open" || o.status === "review",
  ).length;
  const expiringDocs = compliance.filter((d) => d.status === "expiring").length;

  const demo = demoAutomationRules.map((rule) => {
    const override = getAutomationOverride(rule.id);
    const enabled = override ?? rule.enabled;
    const base = { ...rule, enabled };
    if (rule.id === "ar1") return { ...base, matchCount: inTransit };
    if (rule.id === "ar2") return { ...base, matchCount: unassignedOverflow };
    if (rule.id === "ar4") return { ...base, matchCount: expiringDocs };
    return {
      ...base,
      matchCount: shipments.filter((s) => s.status === "at_plant").length,
    };
  });

  const stored = listStoredAutomationRules().map((rule) => {
    const override = getAutomationOverride(rule.id);
    return { ...rule, enabled: override ?? rule.enabled };
  });

  return [...stored, ...demo].filter((r) => !isAutomationDeleted(r.id));
}

export function validateCreateAutomationInput(
  body: unknown,
): { trigger: string; action: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const trigger = String(data.trigger ?? "").trim();
  const action = String(data.action ?? "").trim();
  if (!trigger) return { error: "trigger is required." };
  if (!action) return { error: "action is required." };
  return { trigger, action };
}

export async function createAutomationRule(input: {
  trigger: string;
  action: string;
}): Promise<AutomationRuleRecord> {
  return createStoredAutomationRule(input);
}

export async function setAutomationRuleEnabled(
  id: string,
  enabled: boolean,
): Promise<AutomationRuleRecord | undefined> {
  const rules = await listAutomationRules();
  const rule = rules.find((r) => r.id === id);
  if (!rule) return undefined;
  setAutomationEnabled(id, enabled);
  return { ...rule, enabled };
}

export async function deleteAutomationRule(id: string): Promise<boolean> {
  if (isAutomationDeleted(id)) return true;
  const known = new Set([
    ...demoAutomationRules.map((r) => r.id),
    ...listStoredAutomationRules().map((r) => r.id),
  ]);
  if (!known.has(id)) return false;
  markAutomationDeleted(id);
  return true;
}
