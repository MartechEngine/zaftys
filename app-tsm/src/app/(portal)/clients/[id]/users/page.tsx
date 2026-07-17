import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { getClient, listClientUsers } from "@/lib/clients/client-repository";
import { InviteClientUserForm } from "@/components/app/invite-client-user-form";
import { RevokeClientUserButton } from "@/components/app/sprint14-forms";
import { CLIENTS_NAV } from "@/lib/module-nav";

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
  const client = await getClient(id);
  if (!client) notFound();

  const users = await listClientUsers(id);

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Clients", href: "/clients" },
          { label: client.name, href: `/clients/${id}` },
          { label: "Portal users" },
        ]}
      />
      <PageHeader
        title="Portal users"
        description={client.name}
        action={<InviteClientUserForm clientId={id} />}
      />
      <ModuleSubNav links={CLIENTS_NAV(id)} />
      <DataTable
        rows={users}
        columns={[
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "email", header: "Email", render: (r) => r.email },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={userStatus} />,
          },
          { key: "lastLogin", header: "Last login", render: (r) => r.lastLogin },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <RevokeClientUserButton clientId={id} userId={r.id} status={r.status} />
            ),
          },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href={`/clients/${id}`} className="text-link hover:underline">
          ← {client.name}
        </Link>
      </p>
    </>
  );
}
