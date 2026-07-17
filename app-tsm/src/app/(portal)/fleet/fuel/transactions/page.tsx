import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoFuelTransactions, demoFuelReports } from "@/lib/demo-data";
import { FLEET_NAV } from "@/lib/module-nav";

export default function FuelTransactionsPage() {
  return (
    <>
      <PageHeader title="Fuel transactions" description="Per-fill logs from fuel card integrations" />
      <ModuleSubNav links={FLEET_NAV} />
      <p className="mb-4 text-sm">
        <Link href="/fleet/fuel/reports" className="text-link hover:underline">View consumption reports →</Link>
      </p>
      <DataTable
        rows={demoFuelTransactions}
        columns={[
          { key: "date", header: "Date", render: (r) => r.date },
          { key: "vehicle", header: "Vehicle", render: (r) => <span className="font-mono">{r.vehicle}</span> },
          { key: "station", header: "Station", render: (r) => r.station },
          { key: "liters", header: "Liters", render: (r) => r.liters },
          { key: "amount", header: "Amount", render: (r) => r.amount },
        ]}
      />
    </>
  );
}
