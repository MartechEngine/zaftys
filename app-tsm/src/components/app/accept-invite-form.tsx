"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AcceptInviteForm({
  token,
  email,
  defaultName,
}: {
  token: string;
  email: string;
  defaultName?: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(defaultName ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/invite/${encodeURIComponent(token)}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, name: name.trim() || undefined }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Could not accept invite.");
        return;
      }
      router.push(json.data?.redirectTo ?? "/");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left">
      <p className="text-sm text-muted-foreground">
        Create a TSM password for <span className="text-foreground">{email}</span>. Posts to
        TranZfort still appear as your company — not as your personal name.
      </p>
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="invite-name" className="block text-sm font-medium">
          Display name
        </label>
        <Input
          id="invite-name"
          className="mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="invite-password" className="block text-sm font-medium">
          Password
        </label>
        <Input
          id="invite-password"
          type="password"
          className="mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <div>
        <label htmlFor="invite-confirm" className="block text-sm font-medium">
          Confirm password
        </label>
        <Input
          id="invite-confirm"
          type="password"
          className="mt-1"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <Button type="submit" variant="accent" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Join company workspace"}
      </Button>
    </form>
  );
}
