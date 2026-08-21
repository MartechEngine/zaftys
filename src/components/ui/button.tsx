import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button fills - see `src/lib/cta-recipe.ts` for when to use each variant.
 *
 * Primary brand CTA = accent (orange).
 * Secondary on light = outline-brand (white → navy).
 * Secondary on navy = on-dark-outline.
 * WhatsApp = whatsapp (green).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold ring-offset-background transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-center max-w-full",
  {
    variants: {
      variant: {
        /** Navy solid - rare; prefer accent for primary CTAs */
        default:
          "border border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary-light hover:shadow-md",
        destructive:
          "border border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        /** Neutral UI chrome only - not marketing CTAs */
        outline:
          "border border-input bg-white text-foreground shadow-sm hover:border-primary/40 hover:bg-surface hover:text-foreground",
        /** Secondary CTA on light surfaces: white fill → navy fill on hover */
        "outline-brand":
          "border border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-primary-foreground hover:shadow-md",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "border border-transparent bg-transparent text-navy hover:bg-navy/5 hover:text-navy",
        link: "border border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
        /** PRIMARY CTA - orange fill (light or navy surfaces) */
        accent:
          "border border-transparent bg-accent text-accent-foreground shadow-md shadow-accent/25 hover:bg-accent-light hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/30",
        /** Solid white on navy - tertiary / rare (e.g. Get Directions) */
        "on-dark":
          "border border-transparent bg-white text-navy shadow-sm hover:bg-gray-100 hover:text-navy hover:shadow-md",
        /** Secondary CTA on navy/dark - transparent fill, white stroke */
        "on-dark-outline":
          "border-2 border-white/75 bg-transparent text-white shadow-none hover:border-white hover:bg-white/10 hover:text-white",
        /** WhatsApp - always green solid */
        whatsapp:
          "border border-whatsapp-border bg-whatsapp text-white shadow-md hover:bg-whatsapp-hover hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-auto min-h-11 rounded-md px-6 py-3 sm:px-8 sm:py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
