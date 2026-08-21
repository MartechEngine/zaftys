import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import {
  IntelligenceProductShot,
  IntelligenceStatusLabel,
} from "@/components/intelligence/IntelligenceVisuals";
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { networkHubCopy } from "@/lib/network-hub-copy";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroNetwork from "@/assets/hero-network.jpg";

const c = networkHubCopy;

const NetworkHub = () => (
  <div className="min-h-screen bg-background font-sans">
    <SEO
      title={pageSeo.networkHub.title}
      description={pageSeo.networkHub.description}
      canonical={paths.network.hub}
      schema={[
        organizationSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Network", path: paths.network.hub },
        ]),
      ]}
    />

    <PageHero
      badge={pageHeroCopy.networkHub.badge}
      title={pageHeroCopy.networkHub.h1}
      description={pageHeroCopy.networkHub.lead}
      imageSrc={heroNetwork}
      imageAlt="ZAFTYS transportation network and TranZfort marketplace"
    >
      <CTAGroup className="justify-start sm:justify-start">
        <Link to={c.finalCta.primaryPath}>
          <Button size="lg" variant="accent">
            {c.finalCta.primaryLabel} <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
        <Link to={c.finalCta.secondaryPath}>
          <Button size="lg" variant="on-dark-outline">
            {c.finalCta.secondaryLabel}
          </Button>
        </Link>
      </CTAGroup>
    </PageHero>

    <section className="border-t border-border bg-white">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              {c.intro.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl md:leading-tight">
              {c.intro.h2}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg lg:pb-1">
            {c.intro.lead}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.intro.pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className="flex flex-col border border-border bg-[#f3f5f8] p-6 md:min-h-[200px]"
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

    <section className="border-t border-border bg-[#f3f5f8]">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="mb-14 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            Network modules
          </p>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
            Marketplace, partners, and capacity sourcing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Three ways capacity shows up. Own vs Network stays labeled on every path.
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
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
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

    <section className="border-t border-border bg-navy px-5 py-12 text-white md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
          {c.honesty.eyebrow}
        </p>
        <h2 className="max-w-2xl font-heading text-3xl font-bold">{c.honesty.h2}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">{c.honesty.lead}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {c.honesty.items.map((item, i) => (
            <article key={item.title} className="border border-white/15 bg-white/[0.04] p-6">
              <p className="mb-3 font-heading text-xs font-bold tracking-[0.18em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          {c.buyers.eyebrow}
        </p>
        <h2 className="mb-8 max-w-2xl font-heading text-2xl font-bold text-navy md:text-3xl">
          {c.buyers.h2}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {c.buyers.items.map((item, i) => (
            <article key={item.title} className="border border-border bg-[#f3f5f8] p-6">
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

    <section className="border-t border-border bg-[#f3f5f8] px-5 py-12 md:px-8 md:py-14">
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
          <Link to={c.finalCta.primaryPath}>
            <Button variant="accent">{c.finalCta.primaryLabel}</Button>
          </Link>
          <Link to={c.finalCta.secondaryPath}>
            <Button variant="on-dark-outline">{c.finalCta.secondaryLabel}</Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  </div>
);

export default NetworkHub;
