"use client";

import { useState } from "react";
import Link from "next/link";
import { OverflowQueue } from "@/components/app/overflow-queue";
import { OutboundListingsDesk } from "@/components/app/outbound-listings-desk";
import { cn } from "@/lib/utils";

type DeskTab = "outbound" | "inbound";

export function NetworkOverflowDesk() {
  const [tab, setTab] = useState<DeskTab>("inbound");

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b border-white/10 pb-2">
        {(
          [
            { id: "inbound" as const, label: "Inbound overflow (TranZfort → ZAFTYS)" },
            { id: "outbound" as const, label: "Outbound listings (Load Exchange)" },
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

      {tab === "inbound" ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Marketplace bookings synced into ZAFTYS for own-fleet or partner dispatch. This is the
            overflow desk — not outbound posting.
          </p>
          <OverflowQueue />
        </>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            <strong className="font-medium text-foreground">Local NetworkOffer desk</strong> for
            partner overflow — not the live TranZfort Find Loads feed. Prefer{" "}
            <Link href="/network/my-loads" className="text-link hover:underline">
              My Loads
            </Link>{" "}
            for marketplace posts and{" "}
            <strong className="font-medium text-foreground">Post to TranZfort</strong> on a shipment
            for Super Loads.{" "}
            <Link href="/shipments" className="text-link hover:underline">
              Open shipments
            </Link>
          </p>
          <OutboundListingsDesk />
        </>
      )}
    </div>
  );
}
