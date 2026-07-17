"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import type { SessionUser } from "@/lib/auth/types";

export function UserMenu({ initialUser }: { initialUser?: SessionUser }) {
  const router = useRouter();
  const user = initialUser;

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "OP";

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-1 pl-1 pr-2">
      <Link href="/profile" className="flex items-center gap-2">
        <div className="grid size-7 place-items-center rounded-lg bg-gradient-primary font-display text-[11px] font-bold text-primary-foreground">
          {initials}
        </div>
        <div className="hidden text-left leading-tight sm:block">
          <div className="text-xs font-semibold text-heading">{user?.name ?? "Operator"}</div>
          <div className="text-[10px] capitalize text-muted-foreground">
            {user?.role?.replace("_", " ") ?? ""}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={logout}
        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        aria-label="Sign out"
      >
        <LogOut className="size-3.5" />
      </button>
    </div>
  );
}
