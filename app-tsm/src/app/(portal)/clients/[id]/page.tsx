import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoClients } from "@/lib/demo-data";
import { CLIENTS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = demoClients.find((c) => c.id === id);
  if (!client) notFound();

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Clients", href: "/clients" },
          { label: client.name },
        ]}
      />
      <PageHeader
        title={client.name}
        description={`${client.city} · ${client.gstin}`}
        action={<Button variant="outline">Edit client</Button>}
      />
      <ModuleSubNav links={CLIENTS_NAV(id)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 space-y-3 text-sm">
            <div><span className="text-muted-foreground">Primary contact</span><p className="font-medium">{client.contact}</p></div>
            <div><span className="text-muted-foreground">Active shipments</span><p className="font-medium">{client.activeShipments}</p></div>
            <div><span className="text-muted-foreground">Preferred corridors</span><p className="font-medium">Amravati – Nagpur, Nagpur – Pune</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Quick links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href={`/clients/${id}/contacts`} className="text-link hover:underline">Contacts</Link></li>
              <li><Link href={`/clients/${id}/users`} className="text-link hover:underline">Portal users</Link></li>
              <li><Link href="/shipments" className="text-link hover:underline">Shipments</Link></li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <p className="mt-6 text-sm">
        <Link href="/clients" className="text-link hover:underline">← All clients</Link>
      </p>
    </>
  );
}
