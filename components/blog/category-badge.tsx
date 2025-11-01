import Link from "next/link";
import { getCategoryById } from "@/lib/categories";

interface CategoryBadgeProps {
  categoryId: string;
  showIcon?: boolean;
}

export function CategoryBadge({ categoryId, showIcon = true }: CategoryBadgeProps) {
  const category = getCategoryById(categoryId);

  if (!category) {
    return null;
  }

  return (
    <Link
      href={`/${category.slug}`}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80"
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
      }}
    >
      {showIcon && <span>{category.icon}</span>}
      <span>{category.nameAmharic}</span>
    </Link>
  );
}
