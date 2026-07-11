import { Button } from "@/components/ui/button";
import { mailtoCompany } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeroEmailButtonProps = {
  /** Visible button label  -  never the raw email address */
  label: string;
  variant?: "on-dark" | "on-dark-outline";
  className?: string;
  subject?: string;
  body?: string;
};

export function HeroEmailButton({
  label,
  variant = "on-dark",
  className,
  subject,
  body,
}: HeroEmailButtonProps) {
  return (
    <Button asChild size="lg" variant={variant} className={cn(className)}>
      <a href={mailtoCompany(subject, body)}>{label}</a>
    </Button>
  );
}
