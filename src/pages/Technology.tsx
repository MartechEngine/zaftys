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
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { pageHeroAlts } from "@/lib/page-heroes";
import {
  technologyDemoMail,
  technologyHubCopy,
} from "@/lib/technology-hub-copy";
import {
  breadcrumbSchema,
  faqPageSchema,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/schema";
import heroTechnology from "@/assets/hero-technology.webp";

const c = technologyHubCopy;

const Technology = () => (
  <div className="min-h-screen bg-background font-sans">
    <SEO
      title={pageSeo.technology.title}
      description={pageSeo.technology.description}
      canonical={paths.technology.tms}
      schema={[
        organizationSchema,
        websiteSchema,
        softwareApplicationSchema,
        faqPageSchema([...c.faqs]),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "ZAFTYS TMS", path: paths.technology.tms },
        ]),
      ]}
    />

    <PageHero
      badge={pageHeroCopy.technology.badge}
      title={pageHeroCopy.technology.h1}
      description={pageHeroCopy.technology.lead}
      imageSrc={heroTechnology}
      imageAlt={pageHeroAlts.technology}
    >
      <CTAGroup className="justify-start sm:justify-start">
        <Link to={paths.login}>
          <Button size="lg" variant="accent">
            Login to portal <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
        <HeroEmailButton
          label={c.finalCta.primaryLabel}
          subject={technologyDemoMail.subject}
          body={technologyDemoMail.body}
          variant="on-dark-outline"
        />
      </CTAGroup>
    </PageHero>

    <section className="border-t border-border bg-white">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.intro.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl md:leading-tight">
            {c.intro.h2}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {c.intro.lead}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.intro.pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className="flex flex-col border border-border bg-surface p-6 md:min-h-[200px]"
            >
              <p className="mb-4 font-heading text-xs font-bold tracking-[0.2em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-lg font-bold text-navy">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.workflow.eyebrow}
          </p>
          <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.workflow.h2}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{c.workflow.lead}</p>
        </div>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {c.workflow.steps.map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-3 border border-border bg-white p-4"
            >
              <span className="font-heading text-xs font-bold tracking-[0.16em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold text-navy">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="border-t border-border bg-white">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            What ZAFTYS TMS includes
          </p>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
            Dispatch, visibility, fleet, and APIs on one spine
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Real screens from app.zaftys.com. Tracking, fleet, and APIs deepen the same platform.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {c.modules.map((module, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={module.id}
                id={module.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-14"
              >
                <div className={reversed ? "lg:order-2" : undefined}>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <IntelligenceStatusLabel status={module.status} />
                    <span className="font-heading text-xs font-bold tracking-[0.2em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                    {module.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {module.lead}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {module.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-muted-foreground md:text-[15px]"
                      >
                        <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to={module.cta.path}>
                      <Button variant="outline-brand">
                        {module.cta.label} <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                    {"secondaryCta" in module && module.secondaryCta ? (
                      <Link to={module.secondaryCta.path}>
                        <Button variant="ghost" className="text-navy">
                          {module.secondaryCta.label}
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                </div>
                <div className={reversed ? "lg:order-1" : undefined}>
                  <IntelligenceProductShot
                    src={module.image}
                    alt={module.imageAlt}
                    caption={module.caption}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.buyers.eyebrow}
          </p>
          <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.buyers.h2}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {c.buyers.items.map((item, i) => (
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
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
              {c.live.eyebrow}
            </p>
            <h2 className="max-w-xl font-heading text-3xl font-bold">{c.live.h2}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-300">{c.live.lead}</p>
            <ul className="mt-6 space-y-3">
              {c.live.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={c.live.primary.path}>
                <Button variant="accent">{c.live.primary.label}</Button>
              </Link>
              <Link to={c.live.secondary.path}>
                <Button variant="on-dark-outline">{c.live.secondary.label}</Button>
              </Link>
            </div>
          </div>
          <IntelligenceProductShot
            src="/images/tms/shipments.webp?v=2"
            alt="ZAFTYS TMS Shipments screen with live load status"
            caption="Shipments · trip lifecycle in production"
            className="border-white/15"
          />
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-navy md:text-3xl">
          TMS FAQs
        </h2>
        <div className="space-y-4">
          {c.faqs.map((faq) => (
            <div key={faq.question} className="border border-border bg-surface p-6">
              <h3 className="font-heading font-bold text-navy">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.related.eyebrow}
          </p>
          <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.related.h2}
          </h2>
        </div>
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
            subject={technologyDemoMail.subject}
            body={technologyDemoMail.body}
          />
          <Link to={paths.login}>
            <Button variant="on-dark-outline">{c.finalCta.secondaryLabel}</Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  </div>
);

export default Technology;
