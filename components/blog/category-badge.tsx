import Link from "next/link";
import { getCategory } from "@/lib/categories";

interface CategoryBadgeProps {
  categoryId: string;
  showIcon?: boolean;
  asLink?: boolean;
}

export function CategoryBadge({ categoryId, showIcon = true, asLink = true }: CategoryBadgeProps) {
  const category = getCategory(categoryId);

  if (!category) {
    return null;
  }

  const className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80";
  const style = {
    backgroundColor: `${category.color}20`,
    color: category.color,
  };

  const content = (
    <>
      {showIcon && <span>{category.icon}</span>}
      <span>{category.nameAmharic}</span>
    </>
  );

  if (!asLink) {
    return (
      <span className={className} style={style}>
        {content}
      </span>
    );
  }

  return (
    <Link href={`/${category.slug}`} className={className} style={style}>
      {content}
    </Link>
  );
}
