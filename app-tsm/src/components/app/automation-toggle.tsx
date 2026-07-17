"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export function AutomationToggle({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) {
  const router = useRouter();

  async function toggle() {
    try {
      await api.setAutomationRuleEnabled(id, !enabled);
      toast.success(enabled ? "Rule disabled" : "Rule enabled");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update rule.");
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {enabled ? "Disable" : "Enable"}
    </Button>
  );
}
