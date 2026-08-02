"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/data-table";
import type { MarketplaceChatListResult, MarketplaceChatRow } from "@/lib/tsm/chat-types";

const PAGE_SIZE = 25;

function formatWhen(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso.slice(0, 16);
  }
}

export function MarketplaceChatDesk() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<MarketplaceChatListResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      });
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/tsm/tranzfort/chats?${params}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Could not load chats.");
        setData(null);
        return;
      }
      setData(json.data as MarketplaceChatListResult);
    } catch {
      setError("Could not reach the server.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [q, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const total = data?.total ?? 0;
  const shownFrom = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const shownTo = Math.min((page + 1) * PAGE_SIZE, total);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {data?.honesty}
          {data?.supplierIdMasked ? (
            <>
              {" "}
              · supplier <span className="font-mono text-foreground">{data.supplierIdMasked}</span>
            </>
          ) : null}
          {data ? (
            <>
              {" · "}
              source <span className="text-foreground">{data.source}</span>
              {total > 0 ? ` · showing ${shownFrom}–${shownTo} of ${total}` : null}
            </>
          ) : null}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
            placeholder="Search trucker / lane"
            className="h-9 w-48 sm:w-64"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => void load()}>
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading && !data ? (
        <p className="text-sm text-muted-foreground">Loading conversations…</p>
      ) : (
        <DataTable<MarketplaceChatRow>
          rows={data?.items ?? []}
          emptyMessage={
            data?.linked
              ? "No conversations for this supplier yet."
              : "Link a TranZfort supplier to see chat threads."
          }
          columns={[
            {
              key: "trucker",
              header: "Trucker",
              render: (row) => (
                <div className="space-y-1">
                  <p className="font-medium">{row.truckerName}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{row.id}</p>
                </div>
              ),
            },
            {
              key: "lane",
              header: "Lane",
              render: (row) => (
                <div>
                  <p>{row.routeLabel}</p>
                  {row.material ? (
                    <p className="text-xs text-muted-foreground">{row.material}</p>
                  ) : null}
                </div>
              ),
            },
            {
              key: "preview",
              header: "Last message",
              render: (row) => (
                <p className="max-w-xs truncate text-sm text-muted-foreground">
                  {row.latestMessageText || "—"}
                </p>
              ),
            },
            {
              key: "when",
              header: "When",
              render: (row) => (
                <span className="text-xs text-muted-foreground">{formatWhen(row.lastMessageAt)}</span>
              ),
            },
          ]}
        />
      )}

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page === 0 || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={shownTo >= total || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
