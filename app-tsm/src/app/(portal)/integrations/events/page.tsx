import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listPlatformEvents } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

export default async function IntegrationEventsPage() {
  const events = await listPlatformEvents();

  return (
    <>
      <PageHeader
        title="Event log"
        description="Platform events from shipments, sync, and webhooks"
      />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={events}
        emptyMessage="No platform events yet. Activity appears as shipments, sync, and ops actions run."
        columns={[
          { key: "time", header: "Time", render: (r) => r.time },
          {
            key: "type",
            header: "Event",
            render: (r) => <span className="font-mono text-xs">{r.type}</span>,
          },
          { key: "resource", header: "Resource", render: (r) => r.resource },
          { key: "source", header: "Source", render: (r) => r.source },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href="/integrations" className="text-link hover:underline">
          ← Integrations
        </Link>
      </p>
    </>
  );
}
