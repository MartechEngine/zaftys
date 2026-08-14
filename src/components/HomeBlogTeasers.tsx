import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { latestPosts } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

/** Isolated so Home can lazy-load blog-data off the critical path. */
export default function HomeBlogTeasers() {
  const posts = latestPosts(6);
  if (posts.length === 0) return null;

  const track = posts.length === 1 ? posts : [...posts, ...posts];

  return (
    <section className="py-12 bg-white" aria-labelledby="home-blog-heading">
      <div className="container mx-auto container-padding">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 id="home-blog-heading" className="text-3xl font-heading font-bold text-navy">
            Latest from the blog
          </h2>
          <Link to="/blog" className="text-sm text-primary font-semibold hover:underline inline-flex items-center shrink-0">
            View all posts <ArrowRight className="ml-1.5" size={14} />
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent"
          aria-hidden
        />

        <div
          className={cn(
            "flex w-max gap-5 px-5 sm:px-8 lg:px-12 xl:px-16",
            posts.length > 1 &&
              "animate-scroll-rtl hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none",
          )}
          aria-label="Latest blog posts"
        >
          {track.map((post, index) => (
            <Link
              key={`${post.slug}-${index}`}
              to={`/blog/${post.slug}`}
              className="group w-64 shrink-0 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="bg-muted h-36 overflow-hidden">
                {post.heroImage ? (
                  <img
                    src={post.heroImage}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>
              <p className="px-3 py-2.5 text-sm font-heading font-semibold text-navy leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
