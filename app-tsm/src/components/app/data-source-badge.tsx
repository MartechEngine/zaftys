"use client";

import { useEffect, useState } from "react";

interface HealthPayload {
  dataSource: "fleetbase" | "postgres" | "dev-store";
  executionBackend?: string;
  executionHealthy?: boolean;
  fleetbaseConfigured: boolean;
  demoUi?: boolean;
  status: string;
}

export function DataSourceBadge() {
  const [health, setHealth] = useState<HealthPayload | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  if (!health) {
    return <span className="text-sm text-muted-foreground">Loading data source…</span>;
  }

  if (health.demoUi) {
    return (
      <span className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-orange" aria-hidden />
        <span className="font-medium text-heading">Demo UI</span>
        <span className="hidden text-muted-foreground sm:inline">· rich mock data on all modules</span>
      </span>
    );
  }

  if (health.dataSource === "postgres") {
    const ok = health.executionHealthy !== false && health.status !== "degraded";
    return (
      <span className="flex items-center gap-2 text-sm">
        <span
          className={`h-2 w-2 rounded-full ${ok ? "bg-emerald-400" : "bg-orange"}`}
          aria-hidden
        />
        <span className="font-medium text-heading">TSM Postgres</span>
        <span className="hidden text-muted-foreground sm:inline">· org-scoped LOS</span>
      </span>
    );
  }

  if (health.dataSource === "fleetbase" && health.fleetbaseConfigured) {
    return (
      <span className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
        <span className="font-medium text-heading">Fleetbase (escape)</span>
        <span className="hidden text-muted-foreground sm:inline">· set TSM_EXECUTION_BACKEND=postgres to cut over</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
      Dev mode · mock data
    </span>
  );
}
