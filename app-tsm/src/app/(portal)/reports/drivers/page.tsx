import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoDriverScorecards } from "@/lib/demo-data";
import { REPORTS_NAV } from "@/lib/module-nav";

export default function ReportsDriversPage() {
  return (
    <>
      <PageHeader title="Driver scorecards" description="Performance ranking — last 30 days" />
      <ModuleSubNav links={REPORTS_NAV} />
      <DataTable
        rows={demoDriverScorecards}
        columns={[
          { key: "name", header: "Driver", render: (r) => r.name },
          { key: "trips", header: "Trips", render: (r) => r.trips },
          { key: "onTime", header: "On-time", render: (r) => r.onTime },
          { key: "safety", header: "Safety", render: (r) => r.safety },
          { key: "rating", header: "Rating", render: (r) => `${r.rating} ★` },
        ]}
      />
    </>
  );
}
