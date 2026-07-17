import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoClients, demoClientUsers } from "@/lib/demo-data";
import { CLIENTS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const userStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  pending: { label: "Pending invite", className: "bg-amber-100 text-amber-800" },
};

export default async function ClientUsersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = demoClients.find((c) => c.id === id);
  if (!client) notFound();

  const users = demoClientUsers.filter((u) => u.clientId === id);

  return (
    <>
      <PageHeader title="Portal users" description={client.name} action={<Button variant="accent" size="sm">Invite user</Button>} />
      <ModuleSubNav links={CLIENTS_NAV(id)} />
      <DataTable
        rows={users}
        columns={[
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "email", header: "Email", render: (r) => r.email },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={userStatus} /> },
          { key: "lastLogin", header: "Last login", render: (r) => r.lastLogin },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href={`/clients/${id}`} className="text-link hover:underline">← {client.name}</Link>
      </p>
    </>
  );
}
