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
            className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg [background-image:linear-gradient(to_bottom_right,rgba(237,223,214,0.3),rgba(237,223,214,0.6))] dark:[background-image:none]"
          >
            <Link href={post.url}>
              {post.data.cover && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.data.cover || ""}
                    alt={post.data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                {post.data.category && (
                  <div className="mb-2">
                    <CategoryBadge categoryId={post.data.category} asLink={false} />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {post.data.title}
                </h3>
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
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
