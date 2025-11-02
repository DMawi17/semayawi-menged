import { Quote as QuoteIcon } from "lucide-react";
import { ReactNode } from "react";

interface QuoteProps {
  author?: string;
  children: ReactNode;
}

export function Quote({ author, children }: QuoteProps) {
  return (
    <blockquote className="my-6 border-l-4 border-primary/50 bg-muted/30 pl-6 pr-4 py-4 rounded-r-lg">
      <div className="flex gap-3">
        <QuoteIcon className="h-5 w-5 flex-shrink-0 mt-1 text-primary/60" />
        <div className="flex-1">
          <div className="text-base italic leading-relaxed text-foreground/90">
            {children}
          </div>
          {author && (
            <footer className="mt-3 text-sm font-medium text-muted-foreground">
              — {author}
            </footer>
          )}
        </div>
      </div>
    </blockquote>
  );
}
