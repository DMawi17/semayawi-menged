"use client";

import { useMemo } from "react";
import { categories } from "@/config/categories";
import { usePostFilters } from "@/hooks/usePostFilters";
import type { SortOption } from "@/lib/posts/sorting";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  postCount: {
    all: number;
    byCategory: Record<string, number>;
  };
}

export function FilterBar({ postCount }: FilterBarProps) {
  const { categoryFilter, sortOption, setCategoryFilter, setSortOption } = usePostFilters();

  // Memoize available categories (filter out coming soon)
  const availableCategories = useMemo(
    () => categories.filter((cat) => !cat.comingSoon),
    []
  );

  const handleSortChange = (sort: string) => {
    setSortOption(sort as SortOption);
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            categoryFilter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          ሁሉም ({postCount.all})
        </button>
        {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                categoryFilter === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category.icon} {category.nameAmharic} (
              {postCount.byCategory[category.id] || 0})
            </button>
          ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-3 relative">
        <span className="text-sm text-muted-foreground shrink-0">ቅደም ተከተል:</span>
        <div className="flex-1 max-w-[180px]">
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="የቅርብ ጊዜ" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-50">
              <SelectItem value="date-desc">የቅርብ ጊዜ</SelectItem>
              <SelectItem value="date-asc">የቆየ</SelectItem>
              <SelectItem value="title-asc">ርዕስ (ሀ-ፐ)</SelectItem>
              <SelectItem value="title-desc">ርዕስ (ፐ-ሀ)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
