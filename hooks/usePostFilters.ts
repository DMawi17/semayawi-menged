"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SortOption } from "@/lib/posts/sorting";

export interface PostFilters {
  searchQuery: string;
  categoryFilter: string;
  sortOption: SortOption;
  currentPage: number;
}

export interface UsePostFiltersResult extends PostFilters {
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setSortOption: (sort: SortOption) => void;
  setPage: (page: number) => void;
  buildUrl: (updates: Partial<Record<string, string | null>>) => string;
}

/**
 * Custom hook for managing blog post filters
 * Handles search query, category filter, sort option, and pagination
 */
export function usePostFilters(): UsePostFiltersResult {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse current filters from URL params
  const searchQuery = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "all";
  const sortOption = (searchParams.get("sort") || "date-desc") as SortOption;
  const currentPage = Number(searchParams.get("page")) || 1;

  // Build URL with updated params
  const buildUrl = useCallback(
    (updates: Partial<Record<string, string | null>>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      return queryString ? `/blog?${queryString}` : "/blog";
    },
    [searchParams]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      const url = buildUrl({ q: query.trim() || null, page: null });
      router.push(url);
    },
    [buildUrl, router]
  );

  const setCategoryFilter = useCallback(
    (category: string) => {
      const url = buildUrl({
        category: category === "all" ? null : category,
        page: null
      });
      router.push(url);
    },
    [buildUrl, router]
  );

  const setSortOption = useCallback(
    (sort: SortOption) => {
      const url = buildUrl({
        sort: sort === "date-desc" ? null : sort,
        page: null
      });
      router.push(url);
    },
    [buildUrl, router]
  );

  const setPage = useCallback(
    (page: number) => {
      const url = buildUrl({ page: page === 1 ? null : page.toString() });
      router.push(url);
    },
    [buildUrl, router]
  );

  return {
    searchQuery,
    categoryFilter,
    sortOption,
    currentPage,
    setSearchQuery,
    setCategoryFilter,
    setSortOption,
    setPage,
    buildUrl,
  };
}
