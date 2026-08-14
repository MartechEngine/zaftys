import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogCategoryLabels, formatPostDate, latestPosts } from "@/lib/blog-data";

/** Isolated so Home can lazy-load blog-data off the critical path. */
export default function HomeBlogTeasers() {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold text-navy mb-2">Latest from the Blog</h2>
            <p className="text-muted-foreground max-w-xl">
              Practical notes from industrial corridor operations  -  planning, plant windows, and TMS.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center shrink-0">
            <Link to="/blog" className="text-primary font-semibold hover:underline inline-flex items-center">
              View all posts <ArrowRight className="ml-2" size={16} />
            </Link>
            <Link
              to="/reports"
              className="text-primary font-semibold hover:underline inline-flex items-center"
            >
              Market reports <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts(3).map((post) => (
            <Card key={post.slug} className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                    {blogCategoryLabels[post.category]}
                  </Badge>
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                </div>
                <h3 className="font-heading font-bold text-navy mb-2 leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.summary}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary font-semibold text-sm"
                >
                  Read more <ArrowRight className="ml-2" size={14} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
