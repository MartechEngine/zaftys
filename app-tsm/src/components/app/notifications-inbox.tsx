"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export type NotificationListItem = {
  id: string;
  title: string;
  body: string;
  timeLabel: string;
  read: boolean;
  href?: string;
  tone?: "default" | "warning" | "success";
};

export function NotificationsInbox({
  notifications,
}: {
  notifications: NotificationListItem[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  async function markAll() {
    setBusy(true);
    try {
      await api.markNotificationsRead({ all: true });
      toast.success("All notifications marked read");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update.");
    } finally {
      setBusy(false);
    }
  }

  async function markOne(id: string) {
    setBusy(true);
    try {
      await api.markNotificationsRead({ ids: [id] });
      toast.success("Marked as read");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {unread === 0 ? "All caught up" : `${unread} unread`}
        </p>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={markAll} disabled={busy}>
            {busy ? "…" : "Mark all read"}
          </Button>
        )}
      </div>

      <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        {notifications.length === 0 ? (
          <li className="px-4 py-12 text-center text-sm text-muted-foreground">
            No notifications yet.
          </li>
        ) : (
          notifications.map((n) => (
            <li
              key={n.id}
              className={cn(
                "px-4 py-4 transition-colors hover:bg-white/[0.03]",
                !n.read && "bg-primary/5",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {n.href ? (
                    <Link href={n.href} className="block">
                      <p
                        className={cn(
                          "font-medium text-navy hover:text-link",
                          !n.read && "font-semibold",
                          n.tone === "warning" && "text-orange",
                        )}
                      >
                        {n.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                    </Link>
                  ) : (
                    <>
                      <p className={cn("font-medium text-navy", !n.read && "font-semibold")}>
                        {n.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                    </>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="text-xs text-muted-foreground">{n.timeLabel}</span>
                  {!n.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      disabled={busy}
                      onClick={() => markOne(n.id)}
                    >
                      Mark read
                    </Button>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
