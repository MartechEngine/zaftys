import { demoAutomationRules } from "@/lib/demo-data";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { listNetworkOverflow } from "@/lib/data/overflow-repository";
import { listComplianceDocs } from "@/lib/fleet/compliance-repository";
import {
  getAutomationOverride,
  setAutomationEnabled,
} from "@/lib/settings/automation-store";

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

  return demoAutomationRules.map((rule) => {
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
