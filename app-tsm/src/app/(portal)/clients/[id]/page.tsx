import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import { Card, CardContent } from "@/components/ui/card";
import { getClient, listClientShipments } from "@/lib/clients/client-repository";
import { CLIENTS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  const recentShipments = await listClientShipments(client.name);

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
        description={[client.city, client.gstin].filter(Boolean).join(" · ") || "Shipper account"}
        action={<Button variant="outline">Edit client</Button>}
      />
      <ModuleSubNav links={CLIENTS_NAV(id)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-5 text-sm">
            <div>
              <span className="text-muted-foreground">Primary contact</span>
              <p className="font-medium">{client.contact ?? "—"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Active shipments</span>
              <p className="font-medium">{client.activeShipments}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total shipments</span>
              <p className="font-medium">{client.totalShipments}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Quick links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href={`/clients/${id}/contacts`} className="text-link hover:underline">
                  Contacts
                </Link>
              </li>
              <li>
                <Link href={`/clients/${id}/users`} className="text-link hover:underline">
                  Portal users
                </Link>
              </li>
              <li>
                <Link href={`/shipments?client=${encodeURIComponent(client.name)}`} className="text-link hover:underline">
                  Shipments
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-navy">Recent shipments</h3>
          {recentShipments.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No shipments for this client yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {recentShipments.map((s) => (
                <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <div>
                    <Link href={`/shipments/${s.id}`} className="font-medium text-link hover:underline">
                      {s.publicId}
                    </Link>
                    <p className="text-muted-foreground">
                      {s.origin} → {s.destination}
                    </p>
                  </div>
                  <ShipmentStatusChip status={s.status} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-sm">
        <Link href="/clients" className="text-link hover:underline">
          ← All clients
        </Link>
      </p>
    </>
  );
}
