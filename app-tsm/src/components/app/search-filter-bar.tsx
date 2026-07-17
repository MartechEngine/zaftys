"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, type ReactNode } from "react";

export function SearchFilterBar({
  placeholder = "Search…",
  children,
  param = "q",
}: {
  placeholder?: string;
  children?: ReactNode;
  param?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const value = searchParams.get(param) ?? "";

  function onChange(next: string) {
    const sp = new URLSearchParams(searchParams.toString());
    if (next.trim()) sp.set(param, next.trim());
    else sp.delete(param);
    const qs = sp.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    });
  }

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        defaultValue={value}
        key={value}
        placeholder={placeholder}
        className="h-9 w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-body outline-none backdrop-blur-sm placeholder:text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20 sm:w-72"
        aria-label="Search"
        aria-busy={pending}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onChange((e.target as HTMLInputElement).value);
          }
        }}
        onBlur={(e) => onChange(e.target.value)}
      />
      {children}
    </div>
  );
}
