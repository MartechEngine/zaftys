import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoOrderTypes } from "@/lib/demo-data";

const FLOW_STEPS = ["pending", "dispatched", "at_plant", "in_transit", "at_weighbridge", "delivered"];

export default async function OrderTypeFlowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ot = demoOrderTypes.find((o) => o.id === id);
  if (!ot) notFound();

  return (
    <>
      <PageHeader title="Status flow" description={ot.name} />
      <SettingsNav />
      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            {FLOW_STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-border bg-muted px-3 py-2 text-sm capitalize">{step.replace("_", " ")}</span>
                {i < FLOW_STEPS.length - 1 && <span className="text-muted-foreground">→</span>}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Drag-drop flow designer — visual editor in P4.</p>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm">
        <Link href={`/settings/order-types/${id}`} className="text-link hover:underline">← Order type</Link>
      </p>
    </>
  );
}
