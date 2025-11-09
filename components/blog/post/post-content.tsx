import { ErrorBoundary } from "@/components/error-boundary";
import type { MDXComponents } from "mdx/types";

interface PostContentProps {
  MdxContent: React.ComponentType<{ components?: MDXComponents }>;
  mdxComponents: MDXComponents;
}

/**
 * Post content component with error boundary
 */
export function PostContent({ MdxContent, mdxComponents }: PostContentProps) {
  return (
    <div className="mt-8">
      <ErrorBoundary>
        <MdxContent components={mdxComponents} />
      </ErrorBoundary>
    </div>
  );
}
