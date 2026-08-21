import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import {
  IntelligenceProductShot,
  IntelligenceStatusLabel,
} from "@/components/intelligence/IntelligenceVisuals";
import type { IntelligenceLeafCopy } from "@/lib/intelligence-leaf-copy";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroTechnology from "@/assets/hero-technology.jpg";

type Props = {
  copy: IntelligenceLeafCopy;
};

/**
 * Shared dense shell for Intelligence leaf pages.
 * Same visual system as the Intelligence hub. No thin feature-card grids.
 */
export function IntelligenceLeafLayout({ copy }: Props) {
  const c = copy;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        canonical={c.canonical}
        schema={[organizationSchema, breadcrumbSchema(c.breadcrumbs)]}
      />

      <PageHero
        badge={c.hero.badge}
        title={c.hero.h1}
        description={c.hero.lead}
        imageSrc={heroTechnology}
        imageAlt={c.hero.imageAlt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          {c.hero.primaryCtaPath ? (
            <Link to={c.hero.primaryCtaPath}>
              <Button size="lg" variant="accent">
                {c.hero.primaryCtaLabel}
              </Button>
            </Link>
          ) : (
            <HeroEmailButton
              label={c.hero.primaryCtaLabel}
              subject={c.mail.subject}
              body={c.mail.body}
            />
          )}
          <Link to={c.hero.secondaryCta.path}>
            <Button size="lg" variant="on-dark-outline">
              {c.hero.secondaryCta.label}
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section className="border-t border-border bg-white">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <IntelligenceStatusLabel status={c.status} />
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {c.problem.eyebrow}
                </p>
              </div>
              <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl md:leading-tight">
                {c.problem.h2}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg lg:pb-1">
              {c.problem.lead}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {c.problem.items.map((item, i) => (
              <article key={item.title} className="border border-border bg-surface p-6">
                <p className="mb-3 font-heading text-xs font-bold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.capabilities.eyebrow}
          </p>
          <h2 className="max-w-2xl font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.capabilities.h2}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.capabilities.lead}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.capabilities.items.map((item, i) => (
              <article key={item.title} className="flex flex-col border border-border bg-white p-6">
                <p className="mb-4 font-heading text-xs font-bold tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.visual.eyebrow}
          </p>
          <h2 className="max-w-2xl font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.visual.h2}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.visual.lead}</p>
          <div
            className={`mt-10 grid gap-6 ${c.visual.secondary ? "lg:grid-cols-2" : "max-w-4xl"}`}
          >
            <IntelligenceProductShot
              src={c.visual.primary.src}
              alt={c.visual.primary.alt}
              caption={c.visual.primary.caption}
            />
            {c.visual.secondary ? (
              <IntelligenceProductShot
                src={c.visual.secondary.src}
                alt={c.visual.secondary.alt}
                caption={c.visual.secondary.caption}
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.whoFor.eyebrow}
          </p>
          <h2 className="mb-8 max-w-2xl font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.whoFor.h2}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {c.whoFor.items.map((item, i) => (
              <article key={item.title} className="border border-border bg-white p-6">
                <p className="mb-3 font-heading text-xs font-bold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-navy px-5 py-12 text-white md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
            {c.dataNotes.eyebrow}
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-bold">{c.dataNotes.h2}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">{c.dataNotes.lead}</p>
          <ul className="mt-6 max-w-2xl space-y-3">
            {c.dataNotes.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to={c.dataNotes.cta.path}>
              <Button variant="accent">{c.dataNotes.cta.label}</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.honesty.eyebrow}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <IntelligenceStatusLabel status={c.status} />
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">{c.honesty.h2}</h2>
          </div>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {c.honesty.body}
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.related.eyebrow}
          </p>
          <h2 className="mb-8 font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.related.h2}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.related.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group border border-border bg-white p-5 transition hover:border-primary/40"
              >
                <h3 className="font-heading text-base font-bold text-navy group-hover:text-primary">
                  {link.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{link.blurb}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  Open <ArrowRight className="ml-1" size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-navy py-16 text-white md:py-20">
        <div className="container mx-auto container-padding text-center">
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold md:text-4xl">
            {c.finalCta.h2}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-300">{c.finalCta.lead}</p>
          <CTAGroup className="mt-8">
            {c.finalCta.primaryPath ? (
              <Link to={c.finalCta.primaryPath}>
                <Button variant="accent">{c.finalCta.primaryLabel}</Button>
              </Link>
            ) : (
              <HeroEmailButton
                label={c.finalCta.primaryLabel}
                subject={c.mail.subject}
                body={c.mail.body}
                variant="on-dark"
              />
            )}
            <Link to={c.finalCta.secondary.path}>
              <Button variant="on-dark-outline">{c.finalCta.secondary.label}</Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
}
