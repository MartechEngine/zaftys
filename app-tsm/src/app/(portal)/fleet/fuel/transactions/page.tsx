import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { CreateFuelTransactionForm } from "@/components/app/create-fuel-transaction-form";
import { listFuelTransactions } from "@/lib/fleet/fuel-repository";
import { listVehicles } from "@/lib/data/shipment-repository";
import { FLEET_NAV } from "@/lib/module-nav";

export default async function FuelTransactionsPage() {
  const [transactions, vehicles] = await Promise.all([
    listFuelTransactions(),
    listVehicles(),
  ]);

  return (
    <>
      <PageHeader
        title="Fuel transactions"
        description="Per-fill logs from fuel card integrations"
        action={
          <CreateFuelTransactionForm vehicles={vehicles.map((v) => v.registration)} />
        }
      />
      <ModuleSubNav links={FLEET_NAV} />
      <p className="mb-4 text-sm">
        <Link href="/fleet/fuel/reports" className="text-link hover:underline">
          View consumption reports →
        </Link>
      </p>
      <DataTable
        rows={transactions}
        columns={[
          { key: "date", header: "Date", render: (r) => r.date },
          {
            key: "vehicle",
            header: "Vehicle",
            render: (r) => <span className="font-mono">{r.vehicle}</span>,
          },
          { key: "station", header: "Station", render: (r) => r.station },
          { key: "liters", header: "Liters", render: (r) => r.liters },
          { key: "amount", header: "Amount", render: (r) => r.amount },
        ]}
      />
    </>
  );
}
