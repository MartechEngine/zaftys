import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPaymentsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Payment gateways (optional — P4)" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="p-6 text-sm text-muted-foreground">
          Stripe and other payment gateways are not enabled for the initial India freight rollout.
          Trip billing uses GST invoices in the Billing module.
        </CardContent>
      </Card>
    </>
  );
}
