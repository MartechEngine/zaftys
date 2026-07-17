import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoPlatformEvents } from "@/lib/demo-data";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

export default function IntegrationEventsPage() {
  return (
    <>
      <PageHeader title="Event log" description="Platform events from Fleetbase, sync, and webhooks" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={demoPlatformEvents}
        columns={[
          { key: "time", header: "Time", render: (r) => r.time },
          { key: "type", header: "Event", render: (r) => <span className="font-mono text-xs">{r.type}</span> },
          { key: "resource", header: "Resource", render: (r) => r.resource },
          { key: "source", header: "Source", render: (r) => r.source },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href="/integrations" className="text-link hover:underline">← Integrations</Link>
      </p>
    </>
  );
}
