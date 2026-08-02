"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { SectionCard } from "@/components/app/app-shell";
import { AlertRow } from "@/components/app/ui-primitives";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { useOpsStream } from "@/lib/hooks/use-ops-stream";
import { cn } from "@/lib/utils";

type ExceptionRow = {
  id: string;
  publicId: string;
  reason: string;
  shipmentId: string;
};

type ActivityRow = {
  id: string;
  message: string;
  timestamp: string;
  shipmentId: string;
};

type Kpis = {
  outboundOpenPosts: number;
  outboundOffersWaiting: number;
  inboundOverflow: number;
};

function LiveBadge({ connected, refreshing }: { connected: boolean; refreshing: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] tracking-wide text-muted-foreground uppercase">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5",
          connected ? "bg-success/15 text-success" : "bg-white/5",
        )}
      >
        <span
          className={cn("size-1.5 rounded-full", connected ? "bg-success" : "bg-muted-foreground")}
        />
        {connected ? "Live" : "Reconnecting"}
      </span>
      {refreshing ? <span>Updating…</span> : null}
    </span>
  );
}

export function CommandCenterExceptionQueue({
  initialExceptions,
  initialKpis,
}: {
  initialExceptions: ExceptionRow[];
  initialKpis: Kpis;
}) {
  const [exceptions, setExceptions] = useState(initialExceptions);
  const [kpis, setKpis] = useState(initialKpis);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const [ex, nextKpis] = await Promise.all([api.getExceptions(), api.getKpis()]);
      setExceptions(ex);
      setKpis({
        outboundOpenPosts: nextKpis.outboundOpenPosts,
        outboundOffersWaiting: nextKpis.outboundOffersWaiting,
        inboundOverflow: nextKpis.inboundOverflow,
      });
    } catch {
      /* keep last snapshot */
    } finally {
      setRefreshing(false);
    }
  }, []);

  const { connected } = useOpsStream(true, () => {
    void refresh();
  });

  useEffect(() => {
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refresh]);

  return (
    <SectionCard
      eyebrow="Signal"
      title="Exception queue"
      className="lg:col-span-2"
      action={
        <div className="flex items-center gap-3">
          <LiveBadge connected={connected} refreshing={refreshing} />
          <Link href="/shipments?tab=exceptions" className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {exceptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No exceptions — all clear.</p>
        ) : (
          exceptions.map((ex) => (
            <AlertRow
              key={ex.id}
              icon={AlertTriangle}
              tone="destructive"
              title={ex.publicId}
              meta={ex.reason}
              href={`/shipments/${ex.shipmentId}`}
            />
          ))
        )}
      </div>
      {kpis.outboundOpenPosts > 0 && (
        <div className="mt-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-4">
          <div className="text-[10px] tracking-[0.2em] text-primary uppercase">TranZfort network</div>
          <div className="mt-1 font-display text-sm font-semibold text-heading">
            {kpis.outboundOpenPosts} outbound post{kpis.outboundOpenPosts === 1 ? "" : "s"}
            {kpis.outboundOffersWaiting > 0
              ? ` · ${kpis.outboundOffersWaiting} offer${kpis.outboundOffersWaiting === 1 ? "" : "s"} waiting`
              : ""}
          </div>
          <Button variant="accent" size="sm" className="mt-3" asChild>
            <Link href="/network/overflow">Review outbound desk</Link>
          </Button>
        </div>
      )}
      {kpis.outboundOpenPosts === 0 && kpis.inboundOverflow > 0 && (
        <div className="mt-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-4">
          <div className="text-[10px] tracking-[0.2em] text-primary uppercase">TranZfort network</div>
          <div className="mt-1 font-display text-sm font-semibold text-heading">
            {kpis.inboundOverflow} inbound overflow load{kpis.inboundOverflow === 1 ? "" : "s"}
          </div>
          <Button variant="accent" size="sm" className="mt-3" asChild>
            <Link href="/network/overflow">Browse queue</Link>
          </Button>
        </div>
      )}
    </SectionCard>
  );
}

export function CommandCenterActivityFeed({
  initialActivities,
}: {
  initialActivities: ActivityRow[];
}) {
  const [activities, setActivities] = useState(initialActivities);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setActivities(await api.getActivities());
    } catch {
      /* keep last */
    } finally {
      setRefreshing(false);
    }
  }, []);

  const { connected } = useOpsStream(true, () => {
    void refresh();
  });

  return (
    <SectionCard
      eyebrow="Operations"
      title="Recent activity"
      className="mt-5"
      action={<LiveBadge connected={connected} refreshing={refreshing} />}
    >
      <p className="mb-3 text-xs text-muted-foreground">
        Local ops events · live when shipments change
      </p>
      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent activity.</p>
      ) : (
        <ul className="divide-y divide-white/5">
          {activities.map((a) => (
            <li key={a.id} className="flex items-center justify-between py-3">
              <div>
                <Link href={`/shipments/${a.shipmentId}`} className="text-sm font-medium text-link">
                  {a.message}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {new Date(a.timestamp).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
