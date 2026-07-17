import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { demoClients } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function NewClientPage() {
  return (
    <>
      <PageHeader title="Add client" description="Shipper account with GSTIN and portal access" />
      <Card className="max-w-2xl">
        <CardContent className="space-y-4 p-6">
          <label className="block text-sm">
            <span className="text-muted-foreground">Company name</span>
            <input className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" placeholder="Acme Cement" />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">GSTIN</span>
            <input className="mt-1 w-full rounded-md border border-border px-3 py-2 font-mono text-sm" placeholder="27AABCA1234A1Z5" />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">City</span>
            <select className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
              {["Nagpur", "Amravati", "Pune", "Mumbai", "Wardha"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Primary contact</span>
            <input className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
          </label>
          <div className="flex gap-2 pt-2">
            <Button variant="accent" disabled>Create client</Button>
            <Button variant="outline" asChild>
              <Link href="/clients">Cancel</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Demo UI — {demoClients.length} clients in registry</p>
        </CardContent>
      </Card>
    </>
  );
}
