"use client";

import Link from "next/link";
import { PortalBackground } from "@/components/effects/portal-background";
import { ResetPasswordForm } from "@/components/app/sprint16-forms";
import { glassCard } from "@/lib/surface";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6">
      <PortalBackground />
      <div className={cn(glassCard, "relative z-10 w-full max-w-md p-8")}>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-brand text-sm font-bold text-white">
            Z
          </div>
          <div>
            <p className="text-lg font-semibold text-heading">ZAFTYS</p>
            <p className="text-eyebrow">New password</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Demo UI — no email verification required.
        </p>
        <ResetPasswordForm />
        <p className="mt-6 text-center text-sm">
          <Link href="/login" className="text-navy-bright hover:text-heading">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
