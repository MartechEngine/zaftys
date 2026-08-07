import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import { COMPANY_EMAIL, externalLinks, mailtoCompany } from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";

const APP_LOGIN = `${externalLinks.app}/login`;
const APP_FORGOT = `${externalLinks.app}/forgot-password`;

type LoginMode = "user" | "team";

/** Marketing bridge to ZAFTYS TMS auth  -  mirrors app.zaftys.com/login (tabs + login only). */
const Login = () => {
  const [mode, setMode] = useState<LoginMode>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function switchMode(next: LoginMode) {
    setMode(next);
    setEmail("");
    setPassword("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Real auth lives on the TMS app (same dual-mode login)
    window.location.href = APP_LOGIN;
  }

  return (
    <div className="auth-shell relative flex min-h-screen flex-col items-center justify-center p-6">
      <SEO title={pageSeo.login.title} description={pageSeo.login.description} noindex />

      <div className="auth-shell-bg" aria-hidden>
        <div className="auth-shell-bg-base" />
        <div className="auth-shell-bg-glow" />
        <div className="auth-shell-bg-grid" />
      </div>

      <div className="auth-glass relative z-10 w-full max-w-md p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="auth-mark flex size-10 items-center justify-center rounded-xl text-sm font-bold">
            Z
          </div>
          <div>
            <p className="text-lg font-semibold text-[var(--auth-heading)]">ZAFTYS</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--auth-muted)]">
              Sign in to TMS
            </p>
          </div>
        </div>

        <p className="auth-tagline text-sm font-medium">
          Operations become easier when everyone sees the same information.
        </p>
        <p className="mt-2 text-xs text-[var(--auth-muted)]">
          ZAFTYS TMS  -  dispatch, fleet, and customer visibility for industrial logistics.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div
            className="flex rounded-xl border border-white/10 bg-white/[0.03] p-0.5 text-xs"
            role="tablist"
            aria-label="Login type"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "user"}
              className={`flex-1 rounded-lg px-3 py-2 transition-colors ${
                mode === "user"
                  ? "bg-white/10 text-[var(--auth-heading)]"
                  : "text-[var(--auth-muted)] hover:text-[var(--auth-heading)]"
              }`}
              onClick={() => switchMode("user")}
            >
              Company admin
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "team"}
              className={`flex-1 rounded-lg px-3 py-2 transition-colors ${
                mode === "team"
                  ? "bg-white/10 text-[var(--auth-heading)]"
                  : "text-[var(--auth-muted)] hover:text-[var(--auth-heading)]"
              }`}
              onClick={() => switchMode("team")}
            >
              Team seat
            </button>
          </div>

          {mode === "user" ? (
            <p className="text-xs text-[var(--auth-muted)]">
              Sign in as your company admin account. There is no public TMS signup  -  access is
              provisioned for verified organisations.
            </p>
          ) : (
            <p className="text-xs text-[var(--auth-muted)]">
              Team seats for your workspace. Invited operators sign in here with the credentials
              your admin shared.
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--auth-heading)]">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="auth-input mt-1"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="password" className="block text-sm font-medium text-[var(--auth-heading)]">
                Password
              </label>
              {mode === "team" ? (
                <a
                  href={APP_FORGOT}
                  className="text-xs text-[var(--auth-link)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Forgot password?
                </a>
              ) : null}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input mt-1"
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="auth-submit w-full h-11 font-semibold">
            {mode === "user" ? "Sign in with email" : "Sign in to TMS"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--auth-muted)]">
          No public signup. Access is by invitation.{" "}
          <a href={mailtoCompany("ZAFTYS TMS access")} className="text-[var(--auth-link)] hover:underline">
            Contact your administrator
          </a>
          {" · "}
          <a href={APP_LOGIN} className="text-[var(--auth-link)] hover:underline" target="_blank" rel="noopener noreferrer">
            Open app.zaftys.com
          </a>
        </p>

        <p className="mt-8 text-center text-xs text-[var(--auth-muted)]">
          <Link to="/" className="text-[var(--auth-link)] hover:text-[var(--auth-heading)]">
            Back to zaftys.com
          </Link>
          {" · "}
          <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-[var(--auth-heading)]">
            {COMPANY_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
