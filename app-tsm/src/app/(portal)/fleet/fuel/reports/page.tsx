import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { ExportCsvButton } from "@/components/app/sprint16-forms";
import { listFuelReports } from "@/lib/fleet/fuel-repository";
import { FLEET_NAV } from "@/lib/module-nav";

export default async function FuelReportsPage() {
  const reports = await listFuelReports();

  return (
    <>
      <PageHeader
        title="Fuel reports"
        description="Consumption and cost per km by vehicle"
        action={
          <ExportCsvButton path="/api/fleet/fuel/reports?format=csv" filename="fuel-reports" />
        }
      />
      <ModuleSubNav links={FLEET_NAV} />
      <p className="mb-4 text-sm">
        <Link href="/fleet/fuel/transactions" className="text-link hover:underline">
          ← Fuel transactions
        </Link>
      </p>
      <DataTable
        rows={reports}
        columns={[
          {
            key: "vehicle",
            header: "Vehicle",
            render: (r) => <span className="font-mono">{r.vehicle}</span>,
          },
          { key: "period", header: "Period", render: (r) => r.period },
          { key: "litersTotal", header: "Liters", render: (r) => r.litersTotal },
          { key: "kmPerLiter", header: "km/L", render: (r) => r.kmPerLiter },
          { key: "costPerKm", header: "Cost/km", render: (r) => r.costPerKm },
        ]}
      />
    </>
  );
}
