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
import { supplyChainAiArticle } from "@/lib/supply-chain-ai-article";
import { paths } from "@/lib/site-paths";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroTechnology from "@/assets/hero-technology.webp";

const c = supplyChainAiArticle;

export default function SupplyChainAiPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        canonical={c.canonical}
        schema={[organizationSchema, breadcrumbSchema([...c.breadcrumbs])]}
      />

      <PageHero
        badge={c.hero.badge}
        title={c.hero.h1}
        description={c.hero.lead}
        imageSrc={heroTechnology}
        imageAlt="ZAFTYS Supply Chain AI research on logistics operations"
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label={c.finalCta.primaryLabel}
            subject={c.mail.subject}
            body={c.mail.body}
          />
          <Link to={paths.technology.tms}>
            <Button size="lg" variant="on-dark-outline">
              See ZAFTYS TMS
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      {/* Intro */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <IntelligenceStatusLabel status="Research" />
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {c.intro.eyebrow}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl md:leading-tight">
                {c.intro.h2}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {c.intro.lead}
              </p>
            </div>
            <ul className="space-y-3 border border-border bg-surface p-6">
              {c.intro.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Article sections"
            className="mt-12 border border-border bg-surface p-5 md:p-6"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
              In this article
            </p>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {c.stages.map((stage) => (
                <li key={stage.id}>
                  <a
                    href={`#${stage.id}`}
                    className="group flex flex-col border border-border bg-white p-3 transition hover:border-primary/40"
                  >
                    <span className="font-heading text-xs font-bold tracking-[0.18em] text-accent">
                      {stage.step}
                    </span>
                    <span className="mt-1 font-heading text-sm font-bold text-navy group-hover:text-primary">
                      {stage.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* vs Analytics */}
      <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.vsAnalytics.eyebrow}
          </p>
          <h2 className="max-w-2xl font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.vsAnalytics.h2}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.vsAnalytics.lead}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {c.vsAnalytics.items.map((item) => (
              <article key={item.title} className="border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                {item.path && item.linkLabel ? (
                  <Link
                    to={item.path}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    {item.linkLabel} <ArrowRight className="ml-1" size={14} />
                  </Link>
                ) : (
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    You are on this page
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.scenario.eyebrow}
          </p>
          <h2 className="max-w-2xl font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.scenario.h2}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.scenario.lead}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {c.scenario.steps.map((step, i) => (
              <li key={step.label} className="border border-border bg-surface p-5">
                <p className="font-heading text-xs font-bold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-base font-bold text-navy">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who for */}
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

      {/* Five stages */}
      {c.stages.map((stage, index) => {
        const reversed = index % 2 === 1;
        return (
          <section
            key={stage.id}
            id={stage.id}
            className={`scroll-mt-28 border-t border-border ${
              index % 2 === 0 ? "bg-white" : "bg-surface"
            }`}
          >
            <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
                <div className={reversed ? "lg:order-2" : undefined}>
                  <p className="mb-2 font-heading text-xs font-bold tracking-[0.2em] text-accent">
                    {stage.step}
                  </p>
                  <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                    {stage.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-primary">{stage.subtitle}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {stage.lead}
                  </p>
                  <div className="mt-6 space-y-4">
                    {stage.body.map((para) => (
                      <p key={para} className="text-[15px] leading-relaxed text-muted-foreground">
                        {para}
                      </p>
                    ))}
                  </div>
                  <p className="mt-6 border-l-2 border-accent pl-4 text-sm font-medium leading-relaxed text-navy">
                    {stage.takeaway}
                  </p>
                </div>
                <div className={reversed ? "lg:order-1" : undefined}>
                  <IntelligenceProductShot
                    src={stage.image}
                    alt={stage.imageAlt}
                    caption={`Stage ${stage.step} · ${stage.title} · Research`}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Live today */}
      <section className="border-t border-border bg-navy px-5 py-12 text-white md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
            {c.liveToday.eyebrow}
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-bold">{c.liveToday.h2}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {c.liveToday.items.map((item, i) => (
              <article
                key={item.title}
                className="border border-white/15 bg-white/[0.04] p-6"
              >
                <p className="mb-3 font-heading text-xs font-bold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={paths.technology.tms}>
              <Button variant="accent">Open ZAFTYS TMS</Button>
            </Link>
            <Link to={paths.intelligence.analytics}>
              <Button variant="on-dark-outline">See Analytics</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
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
            <HeroEmailButton
              label={c.finalCta.primaryLabel}
              subject={c.mail.subject}
              body={c.mail.body}
            />
            <Link to={c.finalCta.secondaryPath}>
              <Button variant="on-dark-outline">{c.finalCta.secondaryLabel}</Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
}
