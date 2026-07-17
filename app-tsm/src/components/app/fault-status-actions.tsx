"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export function FaultStatusActions({
  id,
  status,
}: {
  id: string;
  status: "open" | "linked" | "resolved";
}) {
  const router = useRouter();

  async function setStatus(next: "open" | "linked" | "resolved") {
    try {
      await api.updateFaultStatus(id, next);
      toast.success(`Fault → ${next}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update fault.");
    }
  }

  async function linkWorkOrder() {
    try {
      const result = await api.linkFaultWorkOrder(id);
      toast.success(`Work order ${result.workOrder.id} created`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not link work order.");
    }
  }

  if (status === "resolved") {
    return (
      <Button variant="outline" size="sm" onClick={() => setStatus("open")}>
        Reopen
      </Button>
    );
  }

  return (
    <div className="flex gap-1">
      {status === "open" && (
        <Button variant="outline" size="sm" onClick={linkWorkOrder}>
          Link WO
        </Button>
      )}
      <Button variant="outline" size="sm" onClick={() => setStatus("resolved")}>
        Resolve
      </Button>
    </div>
  );
}
