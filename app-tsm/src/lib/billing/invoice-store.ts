import { logActivity } from "@/lib/dev-store";

const g = globalThis as typeof globalThis & {
  __tsmInvoiceStatus?: Record<string, "pending" | "paid">;
};

function getOverrides(): Record<string, "pending" | "paid"> {
  if (!g.__tsmInvoiceStatus) g.__tsmInvoiceStatus = {};
  return g.__tsmInvoiceStatus;
}

export function getInvoiceStatusOverride(id: string): "pending" | "paid" | undefined {
  return getOverrides()[id];
}

export function getInvoiceStatusOverridesSnapshot() {
  return { ...getOverrides() };
}

export function replaceInvoiceStatusOverrides(
  next: Record<string, "pending" | "paid">,
) {
  g.__tsmInvoiceStatus = { ...next };
}

export function setInvoiceStatus(id: string, status: "pending" | "paid") {
  getOverrides()[id] = status;
  logActivity({
    shipmentId: "",
    type: "invoice.updated",
    message: `Invoice ${id} → ${status}`,
    timestamp: new Date().toISOString(),
  });
  return status;
}
