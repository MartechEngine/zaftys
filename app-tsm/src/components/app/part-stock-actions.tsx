"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export function PartStockActions({ id, stock }: { id: string; stock: number }) {
  const router = useRouter();

  async function adjust(delta: number) {
    try {
      const part = await api.adjustPartStock(id, delta);
      toast.success(`${part.sku}: ${part.stock} in stock`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not adjust stock.");
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="sm" onClick={() => adjust(-1)} disabled={stock <= 0}>
        −
      </Button>
      <Button variant="outline" size="sm" onClick={() => adjust(1)}>
        +
      </Button>
    </div>
  );
}
