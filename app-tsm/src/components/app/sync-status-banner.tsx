"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { api } from "@/lib/api-client";

interface SyncStatus {
  lastSyncAt: string;
  healthy: boolean;
  tranzfortConfigured?: boolean;
  dataSource?: string;
  lastRun?: { scanned: number; created: number; skipped: number; errors: string[] };
}

export function SyncStatusBanner() {
  const [status, setStatus] = useState<SyncStatus | null>(null);

  useEffect(() => {
    api.getSyncStatus().then(setStatus).catch(() => null);
  }, []);

  if (!status) return null;

  if (status.healthy && !status.lastRun?.errors?.length) return null;

  const message = status.tranzfortConfigured
    ? "TranZfort sync needs attention."
    : "Network data is catching up.";

  return (
    <div className="mb-4 flex items-center gap-2 rounded-xl border border-orange/25 bg-orange/10 px-4 py-3 text-sm text-heading">
      <RefreshCw className="h-4 w-4 shrink-0 text-orange" />
      <div>
        <p>{message}</p>
        <p className="text-xs text-muted-foreground">
          Last sync {new Date(status.lastSyncAt).toLocaleTimeString()}
          {status.dataSource ? ` · ${status.dataSource}` : ""}
          {status.lastRun?.errors?.[0] ? ` · ${status.lastRun.errors[0]}` : ""}
        </p>
      </div>
    </div>
  );
}
