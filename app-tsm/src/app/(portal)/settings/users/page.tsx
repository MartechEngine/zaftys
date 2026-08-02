import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { listOrgUsers, seatUsageForOrg } from "@/lib/settings/users-repository";
import { InviteOrgUserForm } from "@/components/app/module-create-forms";
import { ChangeUserRoleButton, DeactivateUserButton } from "@/components/app/sprint13-forms";
import { ResendOrgUserInviteButton } from "@/components/app/sprint17-forms";
import { getSession } from "@/lib/auth/session";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { redirect } from "next/navigation";

const userStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
};

export default async function SettingsUsersPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const org = await getOrgAccountForSession(session);
  const users = await listOrgUsers(undefined, org.id);
  const seats = seatUsageForOrg(org.id);

  return (
    <>
      <PageHeader
        title="Settings"
        description="Team seats for this company workspace"
        action={
          seats.remaining > 0 ? (
            <InviteOrgUserForm />
          ) : (
            <p className="text-xs text-muted-foreground">Seat limit reached ({seats.max})</p>
          )
        }
      />
      <SettingsNav />
      <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
        Loads posted to TranZfort appear as <strong>{org.tradeName || org.legalName}</strong>, not
        as each teammate. Seats {seats.used}/{seats.max} used
        {seats.pending ? ` (${seats.pending} pending invite)` : ""}. Promote a seat to Admin to
        transfer seat-management rights; the last Admin seat cannot be demoted or deactivated.
      </p>
      <DataTable
        rows={users}
        columns={[
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "email", header: "Email", render: (r) => r.email },
          { key: "role", header: "Role", render: (r) => r.role },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={userStatus} />,
          },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <ResendOrgUserInviteButton id={r.id} status={r.status} />
                <ChangeUserRoleButton id={r.id} role={r.role} />
                <DeactivateUserButton id={r.id} status={r.status} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
