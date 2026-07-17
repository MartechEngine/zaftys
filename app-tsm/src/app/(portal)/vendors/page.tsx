import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { DataTable, SearchFilterBar } from "@/components/app/data-table";
import { demoVendors } from "@/lib/demo-data";

export default function VendorsPage() {
  return (
    <>
      <PageHeader title="Vendors" description="Maintenance, fuel, and supplier registry" />
      <SearchFilterBar placeholder="Search vendors…" />
      <DataTable
        rows={demoVendors}
        columns={[
          { key: "name", header: "Vendor", render: (r) => (
            <Link href={`/vendors/${r.id}`} className="font-medium text-link hover:underline">
              {r.name}
            </Link>
          ) },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "city", header: "City", render: (r) => r.city },
          { key: "contact", header: "Contact", render: (r) => r.contact },
        ]}
      />
    </>
  );
}
