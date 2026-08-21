/**
 * ZAFTYS CTA / button recipe (locked).
 *
 * Use these roles everywhere. Do not invent one-off bg-/hover:bg- fills on Buttons.
 *
 * | Role                    | Variant            | Rest fill              | Hover fill                 |
 * |-------------------------|--------------------|------------------------|----------------------------|
 * | Primary CTA             | accent             | Orange (--accent)      | Lighter orange (--accent-light) |
 * | Secondary on light      | outline-brand      | White + navy border    | Navy (--primary)           |
 * | Secondary on navy/dark  | on-dark-outline    | Transparent + white    | White 10%                  |
 * | Solid white on navy     | on-dark            | White                  | Gray-100                   |
 * | WhatsApp                | whatsapp           | Green #25D366          | #20BD5A                    |
 * | Form submit             | accent             | Orange                 | Lighter orange             |
 * | Quiet / nav chrome      | ghost              | Transparent            | Navy 5%                    |
 * | Destructive             | destructive        | Red                    | Red /90                    |
 *
 * Recipes by surface:
 * - Navy hero / final CTA: Primary accent → WhatsApp (if needed) → on-dark-outline
 * - Light section: Primary accent → outline-brand
 * - Never use plain `outline` for marketing CTAs (neutral UI only).
 * - Never wrap WhatsApp URLs in accent/on-dark Buttons - use WhatsAppButton.
 */

export const ctaVariant = {
  primary: "accent",
  secondaryLight: "outline-brand",
  secondaryDark: "on-dark-outline",
  solidOnDark: "on-dark",
  whatsapp: "whatsapp",
  quiet: "ghost",
} as const;

export type CtaVariant = (typeof ctaVariant)[keyof typeof ctaVariant];
