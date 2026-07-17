import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { NetworkAssignmentsTable } from "@/components/app/network-assignments-table";
import { NETWORK_NAV } from "@/lib/module-nav";

export default function NetworkAssignmentsPage() {
  return (
    <>
      <PageHeader
        title="Network assignments"
        description="Outbound accepted slots and inbound overflow loads linked to live shipments"
      />
      <ModuleSubNav links={NETWORK_NAV} />
      <NetworkAssignmentsTable />
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href="/network/overflow" className="text-link hover:underline">
          ← Overflow queue
        </Link>
      </p>
    </>
  );
}
