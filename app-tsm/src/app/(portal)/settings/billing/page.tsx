import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsBillingPage() {
  return (
    <>
      <PageHeader title="Settings" description="Invoice templates and billing defaults" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Invoice template</span> · ZAFTYS GST A4 · logo + bank details</p>
          <p><span className="text-muted-foreground">Payment terms</span> · Net 15 days</p>
          <p><span className="text-muted-foreground">Auto-invoice on delivery</span> · Disabled</p>
          <p><span className="text-muted-foreground">HSN/SAC</span> · 9965 — Goods transport services</p>
        </CardContent>
      </Card>
    </>
  );
}
