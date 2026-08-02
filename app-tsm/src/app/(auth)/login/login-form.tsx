"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginMode = "tranzfort" | "seat";

export function LoginForm({
  bridgeMode = "mock",
  liveConfigured: _liveConfigured = false,
  authConfigured = false,
}: {
  bridgeMode?: "mock" | "live";
  liveConfigured?: boolean;
  /** URL + anon enough for Google / password Auth */
  authConfigured?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const liveAuth = bridgeMode === "live" && authConfigured;
  const googleReady = bridgeMode === "live" && authConfigured;
  const oauthError = searchParams.get("error");

  const [mode, setMode] = useState<LoginMode>("tranzfort");
  const [email, setEmail] = useState(
    liveAuth ? "" : "tabish.khan9404@gmail.com",
  );
  const [password, setPassword] = useState(liveAuth ? "" : "mock-dev");
  const [error, setError] = useState<string | null>(oauthError);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchMode(next: LoginMode) {
    setMode(next);
    setError(null);
    setInfo(null);
    if (next === "tranzfort") {
      setEmail(liveAuth ? "" : "tabish.khan9404@gmail.com");
      setPassword(liveAuth ? "" : "mock-dev");
    } else {
      setEmail("dispatcher@zaftys.com");
      setPassword("dev");
    }
  }

  function continueWithGoogle() {
    const next = searchParams.get("next") ?? "";
    const qs = next ? `?next=${encodeURIComponent(next)}` : "";
    window.location.href = `/api/auth/tranzfort/google${qs}`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const path =
        mode === "tranzfort" ? "/api/auth/tranzfort/login" : "/api/auth/login";
      const res = await fetch(path, {
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
      if (json.data?.message) setInfo(String(json.data.message));
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
      <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-0.5 text-xs">
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2 ${
            mode === "tranzfort"
              ? "bg-white/10 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => switchMode("tranzfort")}
        >
          Company admin
        </button>
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2 ${
            mode === "seat"
              ? "bg-white/10 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => switchMode("seat")}
        >
          Team seat
        </button>
      </div>

      {mode === "tranzfort" ? (
        <>
          <p className="text-xs text-muted-foreground">
            Sign in as your verified TranZfort supplier. There is no TSM signup —
            create and verify the company in the TranZfort app first.
          </p>

          {googleReady ? (
            <Button
              type="button"
              variant="accent"
              className="w-full"
              disabled={loading}
              onClick={continueWithGoogle}
            >
              Continue with Google
            </Button>
          ) : (
            <p className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground">
              Continue with Google needs live bridge + TranZfort Auth keys and the Supabase
              redirect allowlist for this host.
            </p>
          )}

          <div className="relative py-1 text-center text-[10px] uppercase tracking-wide text-muted-foreground">
            <span className="bg-transparent px-2">or email &amp; password</span>
          </div>
        </>
      ) : (
        <p className="text-xs text-muted-foreground">
          Company seats for this workspace. Posts still go out as the linked TranZfort
          supplier.
        </p>
      )}

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {info && (
        <p className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          {info}
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
        {mode === "seat" && (
          <p className="mt-1 text-right text-xs">
            <a href="/forgot-password" className="text-link hover:underline">
              Forgot password?
            </a>
          </p>
        )}
      </div>

      {mode === "tranzfort" ? (
        <p className="text-xs text-muted-foreground">
          {liveAuth
            ? "Password works only for TranZfort accounts that have a password (Google-only accounts use Continue with Google)."
            : "Mock bridge: pilot tabish.khan9404@gmail.com / mock-dev."}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Dev accounts: dispatcher@zaftys.com · admin@zaftys.com · fleet@zaftys.com (password: dev)
        </p>
      )}

      <Button type="submit" variant="accent" className="w-full" disabled={loading}>
        {loading
          ? "Signing in…"
          : mode === "tranzfort"
            ? "Sign in with email"
            : "Sign in to TSM"}
      </Button>
    </form>
  );
}
