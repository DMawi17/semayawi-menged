import { getCategory } from "./categories";
import type { BlogPost } from "@/types/blog";

export interface FilterPostsResult {
  filteredPosts: BlogPost[];
  publishedPosts: BlogPost[];
  postCount: {
    all: number;
    byCategory: Record<string, number>;
  };
}

/**
 * Server-side utility function for filtering posts
 * Use this in Server Components where hooks are not available
 */
export function filterPosts(
  posts: BlogPost[],
  searchQuery: string,
  categoryFilter: string
): FilterPostsResult {
  // Filter published posts
  const publishedPosts = posts.filter((post) => post.data.published !== false);

  // Calculate post counts by category
  const postCount = {
    all: publishedPosts.length,
    byCategory: publishedPosts.reduce((acc, post) => {
      const category = getCategory(post.data.category);
      const categoryId = category?.id || "uncategorized";
      acc[categoryId] = (acc[categoryId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  // Filter by category
  let filteredPosts = categoryFilter !== "all"
    ? publishedPosts.filter((post) => {
        const postCategory = getCategory(post.data.category);
        return postCategory?.id === categoryFilter;
      })
    : publishedPosts;

  // Filter by search query
  filteredPosts = searchQuery
    ? filteredPosts.filter(
        (post) =>
          post.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.data.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.data.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : filteredPosts;

  return {
    filteredPosts,
    publishedPosts,
    postCount,
  };
}
