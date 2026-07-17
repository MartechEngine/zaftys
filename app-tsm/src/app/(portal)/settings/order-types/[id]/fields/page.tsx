import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { demoOrderTypes } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { id: "f1", name: "LR number", type: "text", required: true },
  { id: "f2", name: "Tonnage (MT)", type: "number", required: true },
  { id: "f3", name: "e-way bill", type: "text", required: false },
  { id: "f4", name: "Weighbridge slip", type: "file", required: false },
  { id: "f5", name: "Receiver signature", type: "signature", required: false },
];

export default async function OrderTypeFieldsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ot = demoOrderTypes.find((o) => o.id === id);
  if (!ot) notFound();

  return (
    <>
      <PageHeader title="Custom fields" description={ot.name} action={<Button variant="accent" size="sm">Add field</Button>} />
      <SettingsNav />
      <DataTable
        rows={FIELDS}
        columns={[
          { key: "name", header: "Field", render: (r) => r.name },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "required", header: "Required", render: (r) => (r.required ? "Yes" : "No") },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href={`/settings/order-types/${id}`} className="text-link hover:underline">← Order type</Link>
      </p>
    </>
  );
}
