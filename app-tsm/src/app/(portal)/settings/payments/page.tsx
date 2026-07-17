import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";
import { Card, CardContent } from "@/components/ui/card";
import { getPaymentsSettings } from "@/lib/settings/config-repository";

export default async function SettingsPaymentsPage() {
  const settings = await getPaymentsSettings();

  return (
    <>
      <PageHeader title="Settings" description="Payment gateways (optional — P4)" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-4 p-6 text-sm text-muted-foreground">
          <p>{settings.message}</p>
          <p>
            Gateways: {settings.gatewaysEnabled ? "Enabled" : "Not enabled"} ·{" "}
            {settings.pendingInvoiceCount} pending invoices ·{" "}
            <Link href={settings.billingHref} className="text-link hover:underline">
              Open billing →
            </Link>
          </p>
          <ConfigToggleForm
            section="payments"
            field="gatewaysEnabled"
            label="payment gateways"
            current={settings.gatewaysEnabled}
          />
        </CardContent>
      </Card>
    </>
  );
}
