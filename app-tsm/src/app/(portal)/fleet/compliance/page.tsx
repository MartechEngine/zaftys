import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { getComplianceSummary, listComplianceDocs } from "@/lib/fleet/compliance-repository";
import { FLEET_NAV } from "@/lib/module-nav";

const docStatus = {
  valid: { label: "Valid", className: "bg-emerald-100 text-emerald-800" },
  expiring: { label: "Expiring", className: "bg-amber-100 text-amber-800" },
  expired: { label: "Expired", className: "bg-red-100 text-red-800" },
};

export default async function FleetCompliancePage() {
  const [docs, summary] = await Promise.all([listComplianceDocs(), getComplianceSummary()]);

  return (
    <>
      <PageHeader
        title="Compliance"
        description={`Vehicle documents and renewal alerts · ${summary.needsAttention} need attention`}
      />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={docs}
        columns={[
          {
            key: "vehicle",
            header: "Vehicle",
            render: (r) => <span className="font-mono">{r.vehicle}</span>,
          },
          { key: "doc", header: "Document", render: (r) => r.doc },
          { key: "expires", header: "Expires", render: (r) => r.expires },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={docStatus} />,
          },
        ]}
      />
    </>
  );
}
