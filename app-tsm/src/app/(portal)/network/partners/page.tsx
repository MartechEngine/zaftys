import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, SearchFilterBar } from "@/components/app/data-table";
import { demoPartners } from "@/lib/demo-data";
import { NETWORK_NAV } from "@/lib/module-nav";

export default function NetworkPartnersPage() {
  return (
    <>
      <PageHeader title="Partner registry" description="Verified TranZfort fleet operators" />
      <ModuleSubNav links={NETWORK_NAV} />
      <SearchFilterBar placeholder="Search partners…" />
      <DataTable
        rows={demoPartners}
        columns={[
          { key: "name", header: "Partner", render: (r) => <span className="font-medium text-navy">{r.name}</span> },
          { key: "verified", header: "Verified", render: (r) => (r.verified ? "✓ Yes" : "Pending") },
          { key: "trips", header: "Trips (30d)", render: (r) => r.trips },
          { key: "onTime", header: "On-time", render: (r) => r.onTime },
          { key: "rating", header: "Rating", render: (r) => `${r.rating} ★` },
        ]}
      />
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href="/network" className="text-link hover:underline">← Back to Network</Link>
      </p>
    </>
  );
}
