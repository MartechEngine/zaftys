"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

type SyncStatus = {
  lastSyncAt: string;
  healthy: boolean;
  tranzfortConfigured?: boolean;
  tranzfortSource?: string;
  dataSource?: string;
  fleetbaseReachable?: boolean;
  lastRun?: {
    scanned: number;
    created: number;
    skipped: number;
    errors: string[];
  };
};

type SyncRunResult = {
  scanned: number;
  created: number;
  skipped: number;
  errors: string[];
};

export function NetworkSyncPanel() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await api.getSyncStatus();
      setStatus(data as SyncStatus);
    } catch {
      setStatus(null);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function runSync() {
    setBusy(true);
    try {
      const result = (await api.runTranZfortSync()) as SyncRunResult;
      if (result.errors.length) {
        toast.warning(`Sync finished with ${result.errors.length} error(s).`);
      } else {
        toast.success(`Sync complete — ${result.created} created, ${result.skipped} skipped.`);
      }
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sync failed.");
    } finally {
      setBusy(false);
    }
  }

  const lastRun = status?.lastRun;
  const lastLabel = status?.lastSyncAt
    ? new Date(status.lastSyncAt).toLocaleString("en-IN")
    : "—";

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`inline-flex size-2 rounded-full ${status?.healthy ? "bg-success" : "bg-orange"}`}
          />
          <span className="text-muted-foreground">
            {status?.tranzfortConfigured ? "TranZfort configured" : "TranZfort not configured"}
            {status?.dataSource ? ` · ${status.dataSource}` : ""}
          </span>
        </div>
        <Button variant="accent" size="sm" disabled={busy} onClick={runSync}>
          <RefreshCw className={`mr-2 size-4 ${busy ? "animate-spin" : ""}`} />
          {busy ? "Running…" : "Run sync now"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Last run</h3>
            <p className="mt-2 text-sm text-muted-foreground">{lastLabel}</p>
            {lastRun ? (
              <p className="mt-1 text-sm text-body">
                {lastRun.scanned} scanned · {lastRun.created} created · {lastRun.skipped} skipped
              </p>
            ) : null}
            {lastRun?.errors?.[0] ? (
              <p className="mt-2 text-xs text-destructive">{lastRun.errors[0]}</p>
            ) : null}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Idempotency</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Bookings keyed by <code className="text-xs">tranzfort_id</code> in order meta. Status
              updates push back to TranZfort when configured.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Fleetbase reachable: {status?.fleetbaseReachable ? "yes" : "no"}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
