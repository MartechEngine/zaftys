/** Basics Blog Template  -  shared shell for every `/blog/:slug` post. */
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/CTAGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import { BlogExhibitBlock } from "@/components/blog/BlogExhibits";
import {
  type BlogPost,
  adjacentPosts,
  blogCategoryLabels,
  formatPostDate,
  relatedPosts,
  sectionAnchor,
} from "@/lib/blog-data";

/** Renders one post with the Basics Blog Template (wide shell, TOC rail, takeaways, exhibits, mid-CTA). */
type BlogPostLayoutProps = {
  post: BlogPost;
};

function PostCtaButton({ cta, onDark = false }: { cta: BlogPost["cta"]; onDark?: boolean }) {
  if ("to" in cta) {
    return (
      <Link to={cta.to}>
        <Button size="lg" variant={onDark ? "on-dark" : "default"}>
          {cta.label} <ArrowRight className="ml-2" size={16} />
        </Button>
      </Link>
    );
  }
  return <WhatsAppButton label={cta.label} />;
}

function PostCta({ post, onDark = false }: { post: BlogPost; onDark?: boolean }) {
  return <PostCtaButton cta={post.cta} onDark={onDark} />;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={index}>{part}</span>;
        const [, label, href] = match;
        if (href.startsWith("http")) {
          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {label}
            </a>
          );
        }
        return (
          <Link key={index} to={href} className="font-semibold text-primary hover:underline">
            {label}
          </Link>
        );
      })}
    </>
  );
}

function MidArticleCta({
  post,
  band,
}: {
  post: BlogPost;
  band?: { eyebrow: string; title: string; body: string; cta?: BlogPost["cta"] };
}) {
  const eyebrow = band?.eyebrow ?? "Need trucks, not another login";
  const title = band?.title ?? "Request a freight quote for your corridor";
  const body =
    band?.body ??
    "Share origin, destination, body type, and weekly volume. We place capacity as your transport partner: own fleet, empaneled trucks, and overflow when peaks hit.";
  const cta = band?.cta ?? post.cta;
  return (
    <div className="my-10 rounded-xl bg-navy px-6 py-8 text-white md:px-8">
      <p className="text-[10px] font-heading font-bold tracking-widest text-white/60">{eyebrow}</p>
      <h2 className="mt-2 font-heading text-2xl font-bold normal-case tracking-normal">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90">{body}</p>
      <div className="mt-6">
        <PostCtaButton cta={cta} onDark />
      </div>
    </div>
  );
}

export function BlogPostLayout({ post }: BlogPostLayoutProps) {
  const related = relatedPosts(post);
  const { previous, next } = adjacentPosts(post);
  const toc = [
    ...post.sections.map((section) => ({
      id: sectionAnchor(section.heading),
      label: section.heading,
    })),
    { id: "faqs", label: "Frequently asked questions" },
  ];

  return (
    <>
      <article className="section-padding bg-white">
        <div className="container mx-auto container-padding max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="line-clamp-1 font-medium text-navy">{post.title}</li>
            </ol>
          </nav>

          <header className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-navy/70">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                {blogCategoryLabels[post.category]}
              </Badge>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                  </span>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <span>{post.readMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-3xl font-heading font-bold leading-tight text-navy normal-case tracking-normal md:text-4xl lg:text-[2.6rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-navy/85">{post.summary}</p>
          </header>

          <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              {post.heroImage ? (
                <ResponsiveImage
                  src={post.heroImage}
                  alt={post.heroAlt ?? `${post.title} | ZAFTYS Blog`}
                  aspectRatio="16/9"
                  objectFit="cover"
                  priority
                  className="mb-8 rounded-xl shadow-md"
                />
              ) : null}

              {post.takeaways && post.takeaways.length > 0 ? (
                <aside className="mb-10 rounded-xl border border-navy/10 bg-[#F8FAFC] p-6">
                  <p className="text-[10px] font-heading font-bold tracking-widest text-[#1E4D8C]">Key takeaways</p>
                  <ol className="mt-3 space-y-2">
                    {post.takeaways.map((item, index) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy/90">
                        <span className="font-heading text-xs font-bold text-[#0D9488]">{String(index + 1).padStart(2, "0")}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </aside>
              ) : null}

              {toc.length > 3 ? (
                <nav aria-label="On this page" className="mb-10 rounded-xl border border-border p-4 xl:hidden">
                  <p className="text-[10px] font-heading font-bold tracking-widest text-navy/50">On this page</p>
                  <ol className="mt-3 columns-1 gap-x-6 sm:columns-2">
                    {toc.map((item, index) => (
                      <li key={item.id} className="mb-1.5 break-inside-avoid">
                        <a href={`#${item.id}`} className="text-sm text-primary hover:underline">
                          {String(index + 1).padStart(2, "0")} {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}

              <div className="space-y-12">
                {post.sections.map((section, sectionIndex) => (
                  <section key={section.heading} id={sectionAnchor(section.heading)} className="scroll-mt-28">
                    <p className="text-[10px] font-heading font-bold tracking-widest text-[#1E4D8C]">
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mb-4 font-heading text-2xl font-bold normal-case tracking-normal text-navy">
                      {section.heading}
                    </h2>
                    <div className="max-w-3xl">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)} className="mb-4 leading-relaxed text-navy/90">
                          <RichText text={paragraph} />
                        </p>
                      ))}
                      {section.bullets ? (
                        <ul className="mb-4 list-disc space-y-2 pl-5 text-navy/90">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="leading-relaxed">
                              <RichText text={bullet} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    {section.exhibits?.map((exhibit, exhibitIndex) => (
                      <BlogExhibitBlock key={`${section.heading}-${exhibit.kind}-${exhibitIndex}`} exhibit={exhibit} />
                    ))}
                    {post.midCtas
                      ?.filter((band) => band.afterHeading === section.heading)
                      .map((band) => (
                        <MidArticleCta
                          key={`${band.afterHeading}-${band.title}`}
                          post={post}
                          band={band}
                        />
                      ))}
                    {!post.midCtas?.length &&
                    post.midCtaAfterHeading &&
                    section.heading === post.midCtaAfterHeading ? (
                      <MidArticleCta post={post} />
                    ) : null}
                  </section>
                ))}
              </div>

              <div id="faqs" className="mt-16 scroll-mt-28 border-t border-border pt-10">
                <h2 className="mb-6 font-heading text-xl font-bold normal-case tracking-normal text-navy">
                  Frequently asked questions
                </h2>
                <div className="max-w-3xl space-y-4">
                  {post.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-xl border border-border bg-muted/30 p-5">
                      <h3 className="mb-2 font-heading text-sm font-bold normal-case tracking-normal text-navy">
                        {faq.question}
                      </h3>
                      <p className="text-sm leading-relaxed text-navy/85">
                        <RichText text={faq.answer} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {related.length > 0 ? (
                <div className="mt-16 border-t border-border pt-10">
                  <h2 className="mb-6 font-heading text-xl font-bold normal-case tracking-normal text-navy">Related posts</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/blog/${item.slug}`}
                        className="overflow-hidden rounded-lg border border-border transition-colors hover:border-primary/40"
                      >
                        {item.heroImage ? (
                          <ResponsiveImage
                            src={item.heroImage}
                            alt=""
                            aspectRatio="16/9"
                            objectFit="cover"
                            className="rounded-none"
                          />
                        ) : null}
                        <span className="block p-4">
                          <span className="text-[10px] uppercase tracking-wide text-navy/50">
                            {blogCategoryLabels[item.category]}
                          </span>
                          <span className="mt-1 block font-heading text-sm font-semibold leading-snug text-navy normal-case tracking-normal">
                            {item.title}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {previous || next ? (
                <nav aria-label="Adjacent posts" className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
                  {previous ? (
                    <Link
                      to={`/blog/${previous.slug}`}
                      className="group flex gap-4 rounded-xl border border-border p-4 transition-colors hover:border-primary/40"
                    >
                      <ArrowLeft className="mt-1 shrink-0 text-navy/40 group-hover:text-primary" size={20} />
                      <span>
                        <span className="text-[10px] font-heading font-bold tracking-widest text-navy/45">Previous</span>
                        <span className="mt-1 block font-heading text-sm font-semibold leading-snug text-navy normal-case tracking-normal group-hover:text-primary">
                          {previous.title}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                  {next ? (
                    <Link
                      to={`/blog/${next.slug}`}
                      className="group flex gap-4 rounded-xl border border-border p-4 text-right transition-colors hover:border-primary/40 sm:ml-auto sm:flex-row-reverse"
                    >
                      <ArrowRight className="mt-1 shrink-0 text-navy/40 group-hover:text-primary" size={20} />
                      <span>
                        <span className="text-[10px] font-heading font-bold tracking-widest text-navy/45">Next</span>
                        <span className="mt-1 block font-heading text-sm font-semibold leading-snug text-navy normal-case tracking-normal group-hover:text-primary">
                          {next.title}
                        </span>
                      </span>
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </div>

            <aside className="hidden xl:block">
              <div className="sticky top-28 space-y-6">
                <nav aria-label="On this page" className="rounded-xl border border-border bg-[#F8FAFC] p-4">
                  <p className="text-[10px] font-heading font-bold tracking-widest text-navy/50">On this page</p>
                  <ol className="mt-3 max-h-[55vh] space-y-1.5 overflow-y-auto pr-1">
                    {toc.map((item, index) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block text-[13px] leading-snug text-navy/85 hover:text-primary"
                        >
                          <span className="mr-1.5 text-[10px] font-heading font-bold text-[#0D9488]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                {"to" in post.cta ? (
                  <div className="rounded-xl border border-navy/10 bg-navy p-4 text-white">
                    <p className="text-[10px] font-heading font-bold tracking-widest text-white/55">Next step</p>
                    <p className="mt-2 text-sm leading-snug text-white/85">{post.cta.label}</p>
                    <Link to={post.cta.to} className="mt-3 inline-flex items-center text-sm font-semibold text-white hover:underline">
                      Continue <ArrowRight className="ml-1" size={14} />
                    </Link>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding max-w-3xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold normal-case tracking-normal">Need trucks first?</h2>
          <p className="mb-8 text-gray-300">
            Most readers need corridor capacity, not a new login. Share origin, destination, body type, and weekly volume.
            We place trailers as your transport partner. Need software or a load board afterward? Use the links below.
          </p>
          <CTAGroup>
            <PostCta post={post} onDark />
            <Link to="/zaftys-tms">
              <Button size="lg" variant="on-dark-outline">
                Explore ZAFTYS TMS
              </Button>
            </Link>
            <Link to="/network/tranzfort">
              <Button size="lg" variant="on-dark-outline">
                Explore TranZfort
              </Button>
            </Link>
          </CTAGroup>
          <p className="mt-6 text-sm text-white/55">
            Or return to the{" "}
            <Link to="/blog" className="font-semibold text-cyan hover:underline">
              blog index
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
