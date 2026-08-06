import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/CTAGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  type BlogPost,
  blogCategoryLabels,
  formatPostDate,
  relatedPosts,
} from "@/lib/blog-data";

type BlogPostLayoutProps = {
  post: BlogPost;
};

function PostCta({ post }: { post: BlogPost }) {
  const cta = post.cta;
  if ("to" in cta) {
    return (
      <Link to={cta.to}>
        <Button size="lg" variant="on-dark">
          {cta.label} <ArrowRight className="ml-2" size={16} />
        </Button>
      </Link>
    );
  }
  return <WhatsAppButton label={cta.label} />;
}

/** Renders paragraphs with optional `[label](/path)` or `[label](https://...)` links */
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
              className="text-primary font-semibold hover:underline"
            >
              {label}
            </a>
          );
        }
        return (
          <Link key={index} to={href} className="text-primary font-semibold hover:underline">
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function BlogPostLayout({ post }: BlogPostLayoutProps) {
  const related = relatedPosts(post);

  return (
    <>
      <article className="section-padding bg-white">
        <div className="container mx-auto container-padding max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium line-clamp-1">{post.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
            <Badge variant="outline" className="uppercase tracking-wide text-[10px]">
              {blogCategoryLabels[post.category]}
            </Badge>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            {post.updatedAt && post.updatedAt !== post.publishedAt ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated{" "}
                  <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                </span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>{post.readMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">{post.summary}</p>

          {post.heroImage ? (
            <ResponsiveImage
              src={post.heroImage}
              alt={`${post.title} — ZAFTYS industrial logistics`}
              aspectRatio="16/9"
              objectFit="cover"
              className="rounded-xl mb-12 shadow-md"
            />
          ) : null}

          <div className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-heading font-bold text-navy mb-4">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed mb-4">
                    <RichText text={paragraph} />
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="leading-relaxed">
                        <RichText text={bullet} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xl font-heading font-bold text-navy mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="p-5 rounded-xl bg-muted/30 border border-border">
                  <h3 className="font-heading font-bold text-navy mb-2 text-sm">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {related.length > 0 ? (
            <div className="mt-16 pt-10 border-t border-border">
              <h2 className="text-xl font-heading font-bold text-navy mb-6">Related posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/${item.slug}`}
                    className="p-4 rounded-lg border border-border hover:border-primary/40 transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {blogCategoryLabels[item.category]}
                    </span>
                    <span className="block font-heading font-semibold text-navy mt-1 text-sm leading-snug">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>

      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding max-w-3xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Next step</h2>
          <p className="text-gray-300 mb-8">
            Prefer a practical conversation over another form? Share your corridor and load type — we will recommend a suitable approach.
          </p>
          <CTAGroup>
            <PostCta post={post} />
            <Link to="/blog">
              <Button size="lg" variant="on-dark-outline">
                Back to Blog
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </>
  );
}
