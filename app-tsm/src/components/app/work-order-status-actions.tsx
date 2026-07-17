"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

const NEXT: Record<string, string> = {
  open: "in_progress",
  in_progress: "resolved",
  resolved: "open",
};

const LABEL: Record<string, string> = {
  open: "Start job",
  in_progress: "Mark resolved",
  resolved: "Reopen",
};

export function WorkOrderStatusActions({
  id,
  status,
}: {
  id: string;
  status: "open" | "in_progress" | "resolved";
}) {
  const router = useRouter();

  async function advance() {
    const next = NEXT[status] as "open" | "in_progress" | "resolved";
    try {
      await api.updateWorkOrderStatus(id, next);
      toast.success(`Status → ${next.replace("_", " ")}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update status.");
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={advance}>
      {LABEL[status]}
    </Button>
  );
}
