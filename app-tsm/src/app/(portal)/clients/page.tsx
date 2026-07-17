import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { DataTable, SearchFilterBar } from "@/components/app/data-table";
import { demoClients } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="Clients"
        description="Shipper accounts, contracts, and portal access"
        action={
          <Button variant="accent" asChild>
            <Link href="/clients/new">Add client</Link>
          </Button>
        }
      />
      <SearchFilterBar placeholder="Search name, GSTIN…" />
      <DataTable
        rows={demoClients}
        columns={[
          {
            key: "name",
            header: "Client",
            render: (r) => (
              <Link href={`/clients/${r.id}`} className="font-medium text-link font-medium">
                {r.name}
              </Link>
            ),
          },
          { key: "gstin", header: "GSTIN", render: (r) => <span className="font-mono text-xs">{r.gstin}</span> },
          { key: "city", header: "City", render: (r) => r.city },
          { key: "contact", header: "Contact", render: (r) => r.contact },
          { key: "active", header: "Active trips", render: (r) => r.activeShipments },
        ]}
      />
    </>
  );
}
