import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { listNotifications } from "@/lib/notifications/inbox";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const notifications = await listNotifications(25);

  return (
    <>
      <PageHeader
        title="Notifications"
        description="Alerts, exceptions, and system events"
      />
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
                <span className="shrink-0 text-xs text-muted-foreground">{n.timeLabel}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
