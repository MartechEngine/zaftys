import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { EditOrderTypeFlowForm } from "@/components/app/sprint11-forms";
import { getOrderTypeFlow } from "@/lib/settings/order-types-repository";

export default async function OrderTypeFlowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getOrderTypeFlow(id);
  if (!result) notFound();

  const { orderType, steps } = result;

  return (
    <>
      <PageHeader title="Status flow" description={orderType.name} />
      <SettingsNav />
      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((step, i) => (
              <span key={`${step}-${i}`} className="flex items-center gap-2">
                <span className="rounded-md border border-border bg-muted px-3 py-2 text-sm capitalize">
                  {step.replace(/_/g, " ")}
                </span>
                {i < steps.length - 1 && <span className="text-muted-foreground">→</span>}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {steps.length} statuses · {orderType.activeShipments} active shipment
            {orderType.activeShipments === 1 ? "" : "s"} using this flow.
          </p>
          <EditOrderTypeFlowForm orderTypeId={id} steps={steps} />
        </CardContent>
      </Card>
      <p className="mt-4 text-sm">
        <Link href={`/settings/order-types/${id}`} className="text-link hover:underline">
          ← Order type
        </Link>
      </p>
    </>
  );
}
