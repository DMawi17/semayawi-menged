"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/config/categories";

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

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("page"); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.delete("page"); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          ሁሉም ({postCount.all})
        </button>
        {categories
          .filter((cat) => !cat.comingSoon)
          .map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="h-9 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="date-desc">የቅርብ ጊዜ</option>
          <option value="date-asc">የቆየ</option>
          <option value="title-asc">ርዕስ (ሀ-ፐ)</option>
          <option value="title-desc">ርዕስ (ፐ-ሀ)</option>
        </select>
      </div>
    </div>
  );
}
