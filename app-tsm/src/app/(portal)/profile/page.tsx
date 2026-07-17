import { PageHeader } from "@/components/app/app-shell";
import { ProfileForm } from "@/components/app/profile-form";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <>
      <PageHeader title="Your profile" description="Account details and preferences" />
      <ProfileForm
        initial={{
          name: session.name,
          email: session.email,
          role: session.role,
          phone: session.phone,
        }}
      />
    </>
  );
}
