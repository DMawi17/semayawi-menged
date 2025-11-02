import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getCategory } from "@/lib/categories";

interface BreadcrumbsProps {
  category?: string;
  postTitle?: string;
}

export function Breadcrumbs({ category, postTitle }: BreadcrumbsProps) {
  const categoryData = category ? getCategory(category) : null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <Home className="h-3.5 w-3.5" />
            <span>ዋና ገጽ</span>
          </Link>
        </li>

        <ChevronRight className="h-3.5 w-3.5" />

        <li>
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            ጽሁፎች
          </Link>
        </li>

        {categoryData && (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link
                href={`/${categoryData.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {categoryData.nameAmharic}
              </Link>
            </li>
          </>
        )}

        {postTitle && (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <li
              className="text-foreground font-medium truncate max-w-[200px] md:max-w-md"
              aria-current="page"
            >
              {postTitle}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
