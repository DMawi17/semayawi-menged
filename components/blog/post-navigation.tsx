import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface PostNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="mt-12 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
      {previous ? (
        <Link
          href={previous.url}
          className="group flex items-start gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
        >
          <ArrowLeft className="h-5 w-5 mt-1 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">የቀድሞ ጽሁፍ</p>
            <p className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {previous.data.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.url}
          className="group flex items-start gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all md:text-right"
        >
          <div className="flex-1 min-w-0 md:order-1">
            <p className="text-sm text-muted-foreground mb-1">ቀጣይ ጽሁፍ</p>
            <p className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {next.data.title}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 mt-1 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors md:order-2" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
