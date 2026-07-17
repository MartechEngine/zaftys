import Link from "next/link";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import type { ShipmentRecord } from "@/lib/dev-store";

export function RecentShipmentsList({
  shipments,
  emptyLabel = "No recent shipments.",
}: {
  shipments: ShipmentRecord[];
  emptyLabel?: string;
}) {
  if (shipments.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <ul className="divide-y divide-border">
      {shipments.map((s) => (
        <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
          <div>
            <Link href={`/shipments/${s.id}`} className="font-medium text-link hover:underline">
              {s.publicId}
            </Link>
            <p className="text-muted-foreground">
              {s.origin} → {s.destination}
            </p>
          </div>
          <ShipmentStatusChip status={s.status} />
        </li>
      ))}
    </ul>
  );
}
