import Link from "next/link";
import { Suspense } from "react";
import { PortalBackground } from "@/components/effects/portal-background";
import { APP_NAME, APP_TAGLINE, COMPANY_EMAIL } from "@/lib/constants";
import { glassCard } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6">
      <PortalBackground />
      <div className={cn(glassCard, "relative z-10 w-full max-w-md p-8")}>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground glow">
            Z
          </div>
          <div>
            <p className="text-lg font-semibold text-heading">ZAFTYS</p>
            <p className="text-eyebrow">Sign in to TSM</p>
          </div>
        </div>

        <p className="text-sm text-gradient-brand">{APP_TAGLINE}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {APP_NAME}™ — dispatch, fleet, and customer visibility for industrial logistics.
        </p>

        <Suspense fallback={<p className="mt-8 text-sm text-muted-foreground">Loading…</p>}>
          <LoginForm />
        </Suspense>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          <Link
            href={process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://zaftys.com"}
            className="text-link hover:text-heading"
          >
            Back to zaftys.com
          </Link>
          {" · "}
          {COMPANY_EMAIL}
        </p>
      </div>
    </div>
  );
}
