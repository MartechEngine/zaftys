import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/app/portal-shell";

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
  return <PortalShell user={user}>{children}</PortalShell>;
}
