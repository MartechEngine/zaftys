"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { bridgeStatusLabel } from "@/lib/tsm/live-honesty";

type OrgPayload = {
  org: {
    id: string;
    tradeName: string;
    legalName: string;
    mainContactName: string;
    tranzfortSupplierId?: string;
  };
  bridge: { mode: string; liveConfigured: boolean; linked: boolean };
  seat: { canPublish: boolean; tsmRole: string };
};

/**
 * Network hub actions — opens the shipment-backed publish form path.
 * Does not hardcode mock payloads; live write happens from shipment wizard.
 */
export function PublishToTranzfortActions() {
  const [data, setData] = useState<OrgPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/tsm/org");
        if (!res.ok) return;
        const json = (await res.json()) as { data: OrgPayload };
        if (!cancelled) setData(json.data);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;

  const company = data.org.tradeName || data.org.legalName;
  const modeLabel = bridgeStatusLabel(data.bridge);

  return (
    <div className="glass mb-6 space-y-3 rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Publish to TranZfort</p>
          <p className="text-xs text-muted-foreground">
            Posts as {company}. Your name is recorded for audit only. · {modeLabel}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.seat.canPublish ? (
            <>
              <Button asChild variant="accent">
                <Link href="/shipments?status=pending">Post from shipment</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/network/my-loads">My Loads</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/network/overflow">Outbound desk</Link>
              </Button>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              View only ({data.seat.tsmRole}) — publish requires admin or dispatcher.
            </p>
          )}
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Open a pending shipment → <strong className="text-foreground">Post to TranZfort</strong> to
        fill route, material, vehicle catalog, price, and listing window — then{" "}
        <strong className="text-foreground">Publish as Super Load</strong>.
      </p>
    </div>
  );
}
