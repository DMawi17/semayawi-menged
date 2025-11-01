import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/config/categories";

interface CategoryShowcaseProps {
  categories: Category[];
  postCounts?: Record<string, number>;
}

export function CategoryShowcase({ categories, postCounts = {} }: CategoryShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const postCount = postCounts[category.id] || 0;

        return (
          <Link
            key={category.id}
            href={category.comingSoon ? "#" : `/${category.slug}`}
            className={`group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 p-8 transition-all ${
              category.comingSoon
                ? "opacity-60 cursor-not-allowed"
                : "hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg"
            }`}
            style={{
              backgroundColor: category.comingSoon ? undefined : `${category.color}08`,
            }}
          >
            {/* Icon */}
            <div
              className="text-5xl mb-4"
              style={{ filter: category.comingSoon ? "grayscale(1)" : undefined }}
            >
              {category.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {category.nameAmharic}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {category.descriptionAmharic}
            </p>

            {/* Post Count or Coming Soon */}
            {category.comingSoon ? (
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
                <span>በቅርቡ</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {postCount} ጽሁፎች
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            )}

            {/* Accent Border */}
            {!category.comingSoon && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: category.color }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
