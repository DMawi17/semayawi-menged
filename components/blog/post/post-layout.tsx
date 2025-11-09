import { TableOfContents } from "@/components/blog/table-of-contents";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { HistoryTracker } from "@/components/blog/history-tracker";
import { ScrollToTop } from "@/components/mdx/scroll-to-top";

interface PostLayoutProps {
  postUrl: string;
  postTitle: string;
  children: React.ReactNode;
}

/**
 * Post layout wrapper providing the main structure for blog post pages
 * Includes reading progress, history tracking, table of contents sidebar, and scroll to top
 */
export function PostLayout({ postUrl, postTitle, children }: PostLayoutProps) {
  return (
    <>
      {/* Track reading history */}
      <HistoryTracker postUrl={postUrl} postTitle={postTitle} />

      <ReadingProgress />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex gap-8">
          {/* Main Content - Optimized for readability */}
          <div className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0">
            <article className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed">
              {children}
            </article>
          </div>

          {/* Table of Contents Sidebar */}
          <aside className="hidden xl:block">
            <TableOfContents />
          </aside>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
