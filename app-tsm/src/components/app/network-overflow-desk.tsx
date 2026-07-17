"use client";

import { useState } from "react";
import { OverflowQueue } from "@/components/app/overflow-queue";
import { OutboundListingsDesk } from "@/components/app/outbound-listings-desk";
import { cn } from "@/lib/utils";

type DeskTab = "outbound" | "inbound";

export function NetworkOverflowDesk() {
  const [tab, setTab] = useState<DeskTab>("outbound");

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b border-white/10 pb-2">
        {(
          [
            { id: "outbound" as const, label: "Outbound (ZAFTYS → TranZfort)" },
            { id: "inbound" as const, label: "Inbound (TranZfort → ZAFTYS)" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm transition-colors",
              tab === t.id
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "outbound" ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Loads you posted as ZAFTYS supplier. Approve partner offers on the shipment Offers tab.
          </p>
          <OutboundListingsDesk />
        </>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Marketplace bookings synced into ZAFTYS for own-fleet or partner dispatch.
          </p>
          <OverflowQueue />
        </>
      )}
    </div>
  );
}
