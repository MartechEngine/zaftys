"use client";

import Link from "next/link";
import { PortalBackground } from "@/components/effects/portal-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/lib/constants";
import { glassCard } from "@/lib/surface";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
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
            <p className="text-eyebrow">Reset password</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send a reset link (demo UI).
        </p>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Email</span>
            <Input type="email" className="mt-1" placeholder="you@company.com" />
          </label>
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link href="/login" className="text-navy-bright hover:text-heading">
            Back to sign in
          </Link>
        </p>
        <p className="mt-4 text-center text-xs text-muted-foreground">{APP_NAME}™</p>
      </div>
    </div>
  );
}
