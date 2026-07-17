"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("dispatcher@zaftys.com");
  const [password, setPassword] = useState("dev");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          next: searchParams.get("next") ?? "",
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Sign in failed.");
        return;
      }
      router.push(json.data?.redirectTo ?? "/");
      router.refresh();
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-heading">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-heading">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1"
          required
          autoComplete="current-password"
        />
        <p className="mt-1 text-right text-xs">
          <a href="/forgot-password" className="text-link hover:underline">Forgot password?</a>
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        Dev accounts: dispatcher@zaftys.com · fleet@zaftys.com · client@acme.com (password: dev)
      </p>
      <Button type="submit" variant="accent" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in to TSM"}
      </Button>
    </form>
  );
}
