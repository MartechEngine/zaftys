import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoFuelReports } from "@/lib/demo-data";
import { FLEET_NAV } from "@/lib/module-nav";

export default function FuelReportsPage() {
  return (
    <>
      <PageHeader title="Fuel reports" description="Consumption and cost per km by vehicle" />
      <ModuleSubNav links={FLEET_NAV} />
      <p className="mb-4 text-sm">
        <Link href="/fleet/fuel/transactions" className="text-link hover:underline">← Fuel transactions</Link>
      </p>
      <DataTable
        rows={demoFuelReports}
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => <span className="font-mono">{r.vehicle}</span> },
          { key: "period", header: "Period", render: (r) => r.period },
          { key: "kmPerLiter", header: "km/L", render: (r) => r.kmPerLiter },
          { key: "costPerKm", header: "Cost/km", render: (r) => r.costPerKm },
        ]}
      />
    </>
  );
}
