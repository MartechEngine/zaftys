import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/app/portal-shell";
import { isDemoUiMode } from "@/lib/data/demo-mode";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const { exp: _, ...user } = session;
  let orgLabel = "Organization";
  try {
    const org = await getOrgAccountForSession(session);
    orgLabel = org.tradeName || org.legalName || orgLabel;
  } catch {
    /* unscoped session — chip stays generic */
  }
  return (
    <PortalShell user={user} demoUi={isDemoUiMode()} orgLabel={orgLabel}>
      {children}
    </PortalShell>
  );
}
