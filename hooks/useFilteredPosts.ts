"use client";

import { useMemo } from "react";
import { getCategory } from "@/lib/categories";
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
  // Filter published posts
  const publishedPosts = useMemo(
    () => posts.filter((post) => post.data.published !== false),
    [posts]
  );

  // Calculate post counts by category
  const postCount = useMemo(
    () => ({
      all: publishedPosts.length,
      byCategory: publishedPosts.reduce((acc, post) => {
        const category = getCategory(post.data.category);
        const categoryId = category?.id || "uncategorized";
        acc[categoryId] = (acc[categoryId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    }),
    [publishedPosts]
  );

  // Filter by category
  const categoryFilteredPosts = useMemo(
    () =>
      categoryFilter !== "all"
        ? publishedPosts.filter((post) => {
            const postCategory = getCategory(post.data.category);
            return postCategory?.id === categoryFilter;
          })
        : publishedPosts,
    [publishedPosts, categoryFilter]
  );

  // Filter by search query
  const filteredPosts = useMemo(
    () =>
      searchQuery
        ? categoryFilteredPosts.filter(
            (post) =>
              post.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.data.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.data.tags?.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
        : categoryFilteredPosts,
    [categoryFilteredPosts, searchQuery]
  );

  return {
    filteredPosts,
    publishedPosts,
    postCount,
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
): UseFilteredPostsResult {
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
