import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/app/portal-shell";
import { isDemoUiMode } from "@/lib/data/demo-mode";

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
  return (
    <PortalShell user={user} demoUi={isDemoUiMode()}>
      {children}
    </PortalShell>
  );
}
