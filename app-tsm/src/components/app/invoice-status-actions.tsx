"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export function InvoiceStatusActions({
  id,
  status,
}: {
  id: string;
  status: "pending" | "paid";
}) {
  const router = useRouter();

  async function mark(next: "pending" | "paid") {
    try {
      await api.updateInvoiceStatus(id, next);
      toast.success(next === "paid" ? "Marked paid" : "Reopened as pending");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update invoice.");
    }
  }

  if (status === "pending") {
    return (
      <Button variant="accent" onClick={() => mark("paid")}>
        Mark paid
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={() => mark("pending")}>
      Mark pending
    </Button>
  );
}
