import { Button } from "@/components/ui/button";
import { mailtoCompany } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { mailtoEventFromSubject, trackEvent } from "@/lib/analytics";

type HeroEmailButtonProps = {
  /** Visible button label  -  never the raw email address */
  label: string;
  /**
   * accent = primary CTA (default; orange solid)
   * on-dark-outline = secondary on navy
   * on-dark = solid white on navy (rare)
   * @see src/lib/cta-recipe.ts
   */
  variant?: "accent" | "on-dark" | "on-dark-outline";
  className?: string;
  subject?: string;
  body?: string;
};

export function HeroEmailButton({
  label,
  variant = "accent",
  className,
  subject,
  body,
}: HeroEmailButtonProps) {
  const tracked = mailtoEventFromSubject(subject);
  return (
    <Button asChild size="lg" variant={variant} className={cn(className)}>
      <a
        href={mailtoCompany(subject, body)}
        onClick={() =>
          trackEvent(tracked.event, {
            placement: "hero",
            ...(tracked.intent ? { intent: tracked.intent } : {}),
          })
        }
      >
        {label}
      </a>
    </Button>
  );
}
