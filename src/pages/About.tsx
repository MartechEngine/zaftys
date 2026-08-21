import { Link } from "react-router-dom";
import { ArrowRight, Eye, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroAbout from "@/assets/hero-about.webp";
import { pageHeroAlts } from "@/lib/page-heroes";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { pageSeo } from "@/lib/page-seo";
import {
  COMPANY_EMAIL,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_TEL,
  companyAddress,
} from "@/lib/constants";
import { aboutPageCopy, aboutProfileMail } from "@/lib/about-page-copy";
import { AboutIndiaCorridorMap } from "@/components/about/AboutIndiaCorridorMap";
import { organizationSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import { paths } from "@/lib/site-paths";

const About = () => {
  const c = aboutPageCopy;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        canonical={paths.about}
        schema={[
          organizationSchema,
          localBusinessSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: paths.about },
          ]),
        ]}
      />

      <PageHero
        badge={c.hero.badge}
        title={c.hero.h1}
        description={c.hero.lead}
        imageSrc={heroAbout}
        imageAlt={pageHeroAlts.about}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <WhatsAppButton label={c.finalCta.primaryLabel} />
          <Link to={paths.logistics.hub}>
            <Button size="lg" variant="on-dark-outline">
              {c.finalCta.tertiaryLabel}
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      {/* Who we are */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {c.story.eyebrow}
              </p>
              <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl md:leading-tight">
                {c.story.h2}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg lg:pb-1">
              {c.story.lead}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.story.cards.map((card, i) => (
              <article
                key={card.title}
                className="flex flex-col border border-border bg-surface p-6 md:min-h-[200px] md:p-8"
              >
                <p className="mb-4 font-heading text-xs font-bold tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-xl font-bold text-navy">{card.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.heritage.eyebrow}
          </p>
          <h2 className="mb-2 font-heading text-2xl font-bold text-navy md:text-3xl">{c.heritage.h2}</h2>
          <p className="mb-10 max-w-2xl text-muted-foreground">{c.heritage.lead}</p>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-[1.15rem] hidden h-px bg-gradient-to-r from-primary/30 via-accent/50 to-primary/20 lg:block" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.milestones.map((m, i) => (
                <div key={m.year} className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent bg-white font-heading text-xs font-bold text-navy shadow-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-xs font-bold tracking-wider text-accent">
                      {m.year}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-navy">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="border-t border-border bg-navy px-5 py-12 text-white md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
            {c.operate.eyebrow}
          </p>
          <h2 className="mb-2 max-w-2xl font-heading text-3xl font-bold">{c.operate.h2}</h2>
          <p className="mb-8 max-w-2xl text-gray-300">{c.operate.lead}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {c.operate.pillars.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 transition hover:border-accent/40"
              >
                <p className="mb-3 font-heading text-xs font-bold tracking-wider text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{p.desc}</p>
                <Link
                  to={p.path}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-accent hover:underline"
                >
                  {p.linkLabel} <ArrowRight className="ml-1" size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we solve — problem + how */}
      <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {c.challenges.eyebrow}
          </p>
          <h2 className="mb-8 font-heading text-2xl font-bold text-navy md:text-3xl">
            {c.challenges.h2}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {c.challenges.items.map((item, i) => (
              <li key={item.problem} className="border border-border bg-surface p-5 md:p-6">
                <p className="font-heading text-xs font-bold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-base font-bold text-navy">{item.problem}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.how}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Coverage */}
      <section className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              {c.coverage.eyebrow}
            </p>
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">{c.coverage.h2}</h2>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <AboutIndiaCorridorMap />

            <div className="space-y-8 lg:pt-2">
              <div>
                <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-navy">
                  Loading hubs
                </h3>
                <ul className="space-y-3">
                  {c.coverage.hubs.map((h) => (
                    <li key={h.region} className="border-l-2 border-primary/25 pl-3 text-sm">
                      <span className="font-semibold text-navy">{h.region}: </span>
                      <span className="text-muted-foreground">{h.places}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-navy">
                  High-frequency corridors
                </h3>
                <ul className="space-y-2">
                  {c.coverage.corridors.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
                <Link
                  to={paths.industries}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                >
                  Industries we haul for <ArrowRight className="ml-1" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners — softened */}
      <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              {c.clients.eyebrow}
            </p>
            <h2 className="mb-3 font-heading text-xl font-bold text-navy md:text-2xl">
              {c.clients.h2}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">{c.clients.lead}</p>
          </div>

          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 md:gap-x-16">
            {c.clients.partners.map((partner) => (
              <li key={partner.name}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-14 w-36 items-center justify-center sm:h-16 sm:w-44"
                  aria-label={`${partner.name} (opens in a new tab)`}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-10 w-full object-contain object-center opacity-80 transition duration-200 group-hover:opacity-100 sm:h-12"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Company profile CTA — after trust is built */}
      <section className="border-t border-border bg-surface px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white md:flex md:items-center md:justify-between md:gap-8 md:px-10 md:py-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 60% 80% at 100% 0%, hsl(25 100% 55% / 0.35), transparent 55%)",
              }}
            />
            <div className="relative flex gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-accent">
                <FileText size={22} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {c.profileCta.eyebrow}
                </p>
                <h2 className="mt-1 font-heading text-xl font-bold md:text-2xl">{c.profileCta.h2}</h2>
                <p className="mt-2 max-w-xl text-sm text-gray-300 md:text-base">{c.profileCta.lead}</p>
                <p className="mt-2 text-xs text-gray-400">{c.profileCta.note}</p>
              </div>
            </div>
            <div className="relative mt-6 shrink-0 md:mt-0">
              <HeroEmailButton
                label={c.profileCta.buttonLabel}
                subject={aboutProfileMail.subject}
                body={aboutProfileMail.body}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="border-t border-border bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <div className="border-t-4 border-primary bg-surface px-6 py-7 md:px-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Target size={20} />
            </div>
            <h3 className="mb-3 font-heading text-xl font-bold text-navy">{c.mission.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{c.mission.body}</p>
          </div>
          <div className="border-t-4 border-accent bg-surface px-6 py-7 md:px-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Eye size={20} />
            </div>
            <h3 className="mb-3 font-heading text-xl font-bold text-navy">{c.vision.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{c.vision.body}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-navy px-5 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 font-heading text-3xl font-bold md:text-4xl">{c.values.h2}</h2>
          <p className="mb-8 max-w-2xl text-gray-300">{c.values.lead}</p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.items.map((v) => (
              <div key={v.title} className="bg-navy p-5 md:p-6">
                <h3 className="font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-band text-center">
        <div className="container mx-auto max-w-3xl container-padding">
          <h2 className="mb-3 font-heading text-3xl font-bold md:text-4xl">{c.finalCta.h2}</h2>
          <p className="mb-4 text-lg text-gray-200">{c.finalCta.lead}</p>
          <p className="mb-8 text-sm text-gray-400">
            {companyAddress.line1}, {companyAddress.line2}, {companyAddress.line3}
            {" · "}
            <a className="text-accent hover:underline" href={`tel:${COMPANY_PHONE_TEL}`}>
              {COMPANY_PHONE_DISPLAY}
            </a>
            {" · "}
            <a className="text-accent hover:underline" href={`mailto:${COMPANY_EMAIL}`}>
              {COMPANY_EMAIL}
            </a>
          </p>
          <CTAGroup>
            <WhatsAppButton label={c.finalCta.primaryLabel} />
            <HeroEmailButton
              label={c.finalCta.secondaryLabel}
              subject={aboutProfileMail.subject}
              body={aboutProfileMail.body}
              variant="on-dark-outline"
            />
            <Link to={paths.logistics.hub}>
              <Button size="lg" variant="on-dark-outline">
                {c.finalCta.tertiaryLabel}
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default About;
