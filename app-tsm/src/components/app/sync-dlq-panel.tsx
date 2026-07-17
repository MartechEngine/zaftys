"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DlqRow = {
  id: string;
  entityType: string;
  entityId: string;
  operation: string;
  error: string;
  attempts: number;
  maxAttempts: number;
  status: string;
  createdAt: string;
};

export function SyncDlqPanel() {
  const [rows, setRows] = useState<DlqRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sync/dlq", { cache: "no-store" });
      const json = await res.json();
      setRows(Array.isArray(json.data) ? json.data : []);
    } catch {
      toast.error("Could not load sync DLQ.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function enqueueDemo() {
    try {
      await fetch("/api/sync/dlq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enqueue",
          entityType: "integration",
          entityId: "local",
          operation: "health_probe",
          error: "Demo sync failure for DLQ verification",
        }),
      });
      toast.message("Queued demo failure");
      await refresh();
    } catch {
      toast.error("Could not enqueue.");
    }
  }

  async function retry(id: string) {
    const res = await fetch("/api/sync/dlq", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "retry" }),
    });
    if (!res.ok) {
      toast.error("Retry failed.");
      return;
    }
    toast.success("Retry recorded (local stub)");
    await refresh();
  }

  async function dismiss(id: string) {
    const res = await fetch("/api/sync/dlq", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "dismiss" }),
    });
    if (!res.ok) {
      toast.error("Dismiss failed.");
      return;
    }
    await refresh();
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-base">Sync dead-letter queue</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void refresh()} disabled={loading}>
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={() => void enqueueDemo()}>
            Queue demo failure
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-xs text-muted-foreground">
          Local retry queue for integration/sync failures. TranZfort adapters are not wired here —
          retry marks the entry resolved in-app only.
        </p>
        {loading && rows.length === 0 ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground">No open DLQ entries.</p>
        ) : (
          <ul className="space-y-3">
            {rows.map((row) => (
              <li
                key={row.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">
                      {row.operation} · {row.entityType}/{row.entityId}
                    </p>
                    <p className="text-xs text-muted-foreground">{row.error}</p>
                    <p className="mt-1 text-[10px] text-subtle">
                      {row.status} · attempts {row.attempts}/{row.maxAttempts} ·{" "}
                      {new Date(row.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => void retry(row.id)}>
                      Retry
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => void dismiss(row.id)}>
                      Dismiss
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
