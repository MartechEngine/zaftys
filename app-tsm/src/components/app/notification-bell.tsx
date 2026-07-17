"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

export function NotificationBell() {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/notifications", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled) setUnread(json.meta?.unread ?? 0);
      } catch {
        if (!cancelled) setUnread(0);
      }
    }

    void load();
    const id = window.setInterval(load, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <Link
      href="/notifications"
      className="relative grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors hover:bg-white/10"
      aria-label={unread ? `${unread} unread notifications` : "Notifications"}
    >
      <Bell className="size-4" />
      {unread > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </Link>
  );
}
