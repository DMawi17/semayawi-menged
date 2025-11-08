import Link from "next/link";
import Image from "next/image";
import { CategoryBadge } from "@/components/blog/category-badge";
import { Calendar } from "lucide-react";
import { formatEthiopianDate } from "@/lib/ethiopian-date";

interface HeroPostProps {
  post: {
    title: string;
    description?: string;
    date: string | Date;
    cover: string;
    url: string;
    category: string;
  };
}

export function HeroPost({ post }: HeroPostProps) {
  const formattedDate = formatEthiopianDate(post.date);

  return (
    <Link
      href={post.url}
      className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute top-4 left-4">
            <CategoryBadge categoryId={post.category} asLink={false} />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime={new Date(post.date).toISOString()}>{formattedDate}</time>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {post.description && (
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {post.description}
            </p>
          )}

          <div className="mt-6 inline-flex items-center text-primary font-medium">
            ተጨማሪ አንብብ
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
