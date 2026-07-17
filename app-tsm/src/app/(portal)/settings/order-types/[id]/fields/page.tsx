import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { getOrderTypeFields } from "@/lib/settings/order-types-repository";
import { CreateOrderFieldForm } from "@/components/app/module-create-forms";
import {
  DeleteOrderFieldButton,
  ToggleOrderFieldRequiredButton,
} from "@/components/app/sprint13-forms";

export default async function OrderTypeFieldsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getOrderTypeFields(id);
  if (!result) notFound();

  const { orderType, fields } = result;

  return (
    <>
      <PageHeader
        title="Custom fields"
        description={orderType.name}
        action={<CreateOrderFieldForm orderTypeId={id} />}
      />
      <SettingsNav />
      <DataTable
        rows={fields}
        columns={[
          { key: "name", header: "Field", render: (r) => r.name },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "required", header: "Required", render: (r) => (r.required ? "Yes" : "No") },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <ToggleOrderFieldRequiredButton
                  orderTypeId={id}
                  fieldId={r.id}
                  required={r.required}
                />
                <DeleteOrderFieldButton orderTypeId={id} fieldId={r.id} name={r.name} />
              </div>
            ),
          },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href={`/settings/order-types/${id}`} className="text-link hover:underline">← Order type</Link>
      </p>
    </>
  );
}
