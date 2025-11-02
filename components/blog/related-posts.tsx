import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { CategoryBadge } from "./category-badge";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">ተዛማጅ ጽሑፎች</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.url}
            className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            {post.data.cover && (
              <Link href={post.url} className="block">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={post.data.cover || ""}
                    alt={post.data.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
            )}
            <div className="p-4">
              {post.data.category && (
                <div className="mb-2">
                  <CategoryBadge categoryId={post.data.category} />
                </div>
              )}
              <Link href={post.url}>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.data.title}
                </h3>
              </Link>
              {post.data.description && (
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {post.data.description}
                </p>
              )}
              {post.data.date && (
                <time className="text-xs text-muted-foreground">
                  {formatDate(String(post.data.date))}
                </time>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
