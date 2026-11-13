import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { externalLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type TranZfortAppCtaProps = {
  label?: string;
  placement: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  showArrow?: boolean;
};

/**
 * TranZfort Android install CTA → Google Play.
 * Tracked as cta_tranzfort with intent=app_download.
 */
export function TranZfortAppCta({
  label = "Download TranZfort",
  placement,
  size = "lg",
  variant = "accent",
  className,
  showArrow = false,
}: TranZfortAppCtaProps) {
  return (
    <Button asChild size={size} variant={variant} className={cn(className)}>
      <a
        href={externalLinks.tranzfortPlayStore}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("cta_tranzfort", { placement, intent: "app_download" })
        }
      >
        <span>{label}</span>
        {showArrow ? <ArrowRight className="ml-2 shrink-0" size={size === "sm" ? 14 : 18} /> : null}
      </a>
    </Button>
  );
}

/** Text-style Play Store link for footer / inline use. */
export function TranZfortAppLink({
  label = "Get the TranZfort app",
  placement,
  className,
}: {
  label?: string;
  placement: string;
  className?: string;
}) {
  return (
    <a
      href={externalLinks.tranzfortPlayStore}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      onClick={() =>
        trackEvent("cta_tranzfort", { placement, intent: "app_download" })
      }
    >
      {label}
    </a>
  );
}

/** Official Google Play badge → TranZfort listing. */
export function TranZfortPlayBadge({
  placement,
  className,
}: {
  placement: string;
  className?: string;
}) {
  return (
    <a
      href={externalLinks.tranzfortPlayStore}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
        className,
      )}
      aria-label="Get TranZfort on Google Play"
      onClick={() =>
        trackEvent("cta_tranzfort", { placement, intent: "app_download" })
      }
    >
      <img
        src="/images/badges/google-play-badge.png"
        alt="Get it on Google Play"
        width={155}
        height={60}
        className="-ml-2 h-[52px] w-auto max-w-[160px]"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}
