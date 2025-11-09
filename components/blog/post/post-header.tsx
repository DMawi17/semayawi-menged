import Link from "next/link";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { AudioPlayer } from "@/components/blog/audio-player";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { BookmarkButton } from "@/components/blog/bookmark-button";

interface PostHeaderProps {
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  coverImage?: string;
  description?: string;
  audioUrl?: string;
  tags?: string[];
  postUrl: string;
}

/**
 * Post header component containing breadcrumbs, hero, audio player, tags, and bookmark button
 */
export function PostHeader({
  title,
  category,
  author,
  publishedAt,
  readingTime,
  coverImage,
  description,
  audioUrl,
  tags,
  postUrl,
}: PostHeaderProps) {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs category={category} postTitle={title} />

      {/* Article Hero */}
      <div className="not-prose">
        <ArticleHero
          title={title}
          category={category}
          author={author}
          publishedAt={publishedAt}
          readingTime={readingTime}
          coverImage={coverImage}
          description={description}
        />
      </div>

      {/* Audio Player - Full width below hero */}
      {audioUrl && (
        <div className="mb-8 not-prose">
          <AudioPlayer audioUrl={audioUrl} title={title} />
        </div>
      )}

      {/* Tags and Actions Row */}
      <div className="flex items-center justify-between gap-4 mb-8 not-prose">
        {/* Tags - Last 5 only */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 flex-1">
            {tags.slice(-5).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Bookmark Button */}
        <div className="shrink-0">
          <BookmarkButton postUrl={postUrl} postTitle={title} />
        </div>
      </div>
    </>
  );
}
