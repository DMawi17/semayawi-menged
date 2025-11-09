"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/config/categories";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "date-desc";

  // Memoize available categories (filter out coming soon)
  const availableCategories = useMemo(
    () => categories.filter((cat) => !cat.comingSoon),
    []
  );

  // Memoize URL construction for category changes
  const buildCategoryUrl = useMemo(() => {
    return (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category === "all") {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      params.delete("page"); // Reset to first page
      return `/blog?${params.toString()}`;
    };
  }, [searchParams]);

  // Memoize URL construction for sort changes
  const buildSortUrl = useMemo(() => {
    return (sort: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", sort);
      params.delete("page"); // Reset to first page
      return `/blog?${params.toString()}`;
    };
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    router.push(buildCategoryUrl(category));
  };

  const handleSortChange = (sort: string) => {
    router.push(buildSortUrl(sort));
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            currentCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          ሁሉም ({postCount.all})
        </button>
        {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentCategory === category.id
                  ? "text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              style={
                currentCategory === category.id
                  ? { backgroundColor: category.color }
                  : undefined
              }
            >
              {category.icon} {category.nameAmharic} (
              {postCount.byCategory[category.id] || 0})
            </button>
          ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">ቅደም ተከተል:</span>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="የቅርብ ጊዜ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">የቅርብ ጊዜ</SelectItem>
            <SelectItem value="date-asc">የቆየ</SelectItem>
            <SelectItem value="title-asc">ርዕስ (ሀ-ፐ)</SelectItem>
            <SelectItem value="title-desc">ርዕስ (ፐ-ሀ)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
