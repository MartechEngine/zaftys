import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, SearchFilterBar } from "@/components/app/data-table";
import { listPartners } from "@/lib/network/partners-repository";
import { NETWORK_NAV } from "@/lib/module-nav";
import { CreatePartnerForm } from "@/components/app/module-create-forms";
import { VerifyPartnerButton } from "@/components/app/sprint10-forms";

export default async function NetworkPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const partners = await listPartners(q);

  return (
    <>
      <PageHeader
        title="Partner registry"
        description="Verified TranZfort fleet operators"
        action={<CreatePartnerForm />}
      />
      <ModuleSubNav links={NETWORK_NAV} />
      <SearchFilterBar placeholder="Search partners…" />
      <DataTable
        rows={partners}
        emptyMessage="No partners registered yet. Local registry only — TranZfort sync is deferred."
        columns={[
          {
            key: "name",
            header: "Partner",
            render: (r) => <span className="font-medium text-navy">{r.name}</span>,
          },
          {
            key: "verified",
            header: "Verified",
            render: (r) => <VerifyPartnerButton id={r.id} verified={r.verified} />,
          },
          { key: "trips", header: "Trips (30d)", render: (r) => r.trips },
          { key: "onTime", header: "On-time", render: (r) => r.onTime },
          { key: "rating", header: "Rating", render: (r) => `${r.rating} ★` },
          { key: "assignments", header: "Active", render: (r) => r.activeAssignments },
        ]}
      />
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href="/network" className="text-link hover:underline">
          ← Back to Network
        </Link>
      </p>
    </>
  );
}
