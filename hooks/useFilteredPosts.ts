"use client";

import { useMemo } from "react";
import { filterPosts as filterPostsUtil } from "@/lib/filter-posts";
import type { BlogPost } from "@/types/blog";

export interface UseFilteredPostsProps {
  posts: BlogPost[];
  searchQuery: string;
  categoryFilter: string;
}

export interface UseFilteredPostsResult {
  filteredPosts: BlogPost[];
  publishedPosts: BlogPost[];
  postCount: {
    all: number;
    byCategory: Record<string, number>;
  };
}

// Re-export the server-safe utility for server components
export { filterPosts } from "@/lib/filter-posts";

/**
 * Custom hook for filtering blog posts
 * Filters by publication status, category, and search query
 * Optimized with memoization for client-side performance
 */
export function useFilteredPosts({
  posts,
  searchQuery,
  categoryFilter,
}: UseFilteredPostsProps): UseFilteredPostsResult {
  // Use memoized filtering with the server-safe utility
  return useMemo(
    () => filterPostsUtil(posts, searchQuery, categoryFilter),
    [posts, searchQuery, categoryFilter]
  );
}

