import type { OriginType, ShipmentStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  ShipmentStatus,
  { label: string; className: string }
> = {
  pending: { label: "Pending", className: "border-white/10 bg-white/5 text-muted-foreground" },
  dispatched: { label: "Dispatched", className: "border-primary/30 bg-primary/10 text-primary" },
  at_plant: { label: "At plant", className: "border-warning/30 bg-warning/10 text-warning" },
  in_transit: { label: "In transit", className: "border-primary/30 bg-primary/10 text-primary" },
  at_weighbridge: {
    label: "Weighbridge",
    className: "border-warning/30 bg-warning/10 text-warning",
  },
  delivered: { label: "Delivered", className: "border-success/30 bg-success/10 text-success" },
  cancelled: {
    label: "Cancelled",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  exception: { label: "Exception", className: "border-destructive/30 bg-destructive/10 text-destructive" },
};

export function ShipmentStatusChip({ status }: { status: ShipmentStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

const originConfig: Record<OriginType, { label: string; className: string }> = {
  fleet: { label: "Own fleet", className: "bg-primary/15 text-primary" },
  network: { label: "Network", className: "bg-silver/20 text-muted-foreground" },
  handoff: { label: "Handoff", className: "bg-warning/15 text-warning" },
};

export function OriginBadge({ originType }: { originType: OriginType }) {
  const config = originConfig[originType];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
