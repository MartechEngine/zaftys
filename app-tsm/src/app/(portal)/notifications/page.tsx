import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { NotificationsInbox } from "@/components/app/notifications-inbox";
import { listNotifications } from "@/lib/notifications/inbox";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const notifications = await listNotifications(25);

  return (
    <>
      <PageHeader
        title="Notifications"
        description="Alerts, exceptions, and system events"
      />
      <NotificationsInbox notifications={notifications} />
      <p className="mt-4 text-sm">
        <Link href="/" className="text-link hover:underline">
          ← Command center
        </Link>
      </p>
    </>
  );
}
