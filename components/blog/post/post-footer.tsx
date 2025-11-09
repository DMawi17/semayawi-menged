import Link from "next/link";
import dynamic from "next/dynamic";
import { ShareButtons } from "@/components/blog/share-buttons";
import { PostNavigation } from "@/components/blog/post-navigation";
import { RelatedPosts } from "@/components/blog/related-posts";
import type { BlogPost } from "@/types/blog";

// Lazy load heavy components that are below the fold
const Newsletter = dynamic(
  () => import("@/components/blog/newsletter").then((mod) => ({ default: mod.Newsletter })),
  {
    loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />,
  }
);

const Comments = dynamic(
  () => import("@/components/blog/comments").then((mod) => ({ default: mod.Comments })),
  {
    loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
  }
);

interface PostFooterProps {
  title: string;
  postUrl: string;
  description?: string;
  previous?: BlogPost;
  next?: BlogPost;
  relatedPosts: BlogPost[];
}

/**
 * Post footer component containing share buttons, navigation, related posts, newsletter, and comments
 */
export function PostFooter({
  title,
  postUrl,
  description,
  previous,
  next,
  relatedPosts,
}: PostFooterProps) {
  return (
    <>
      {/* Share Buttons */}
      <div className="mt-12 not-prose">
        <ShareButtons title={title} url={postUrl} description={description} />
      </div>

      {/* Post Navigation */}
      <div className="not-prose">
        <PostNavigation previous={previous} next={next} />
      </div>

      {/* Related Posts */}
      <div className="not-prose">
        <RelatedPosts posts={relatedPosts} />
      </div>

      {/* Newsletter */}
      <div className="not-prose">
        <Newsletter />
      </div>

      {/* Comments */}
      <div className="not-prose">
        <Comments />
      </div>

      {/* Back to Blog Link */}
      <div className="mt-12 pt-8 border-t not-prose">
        <Link
          href="/blog"
          className="text-primary font-medium flex items-center gap-1 group/link hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          ወደ ብሎግ ተመለስ
        </Link>
      </div>
    </>
  );
}
