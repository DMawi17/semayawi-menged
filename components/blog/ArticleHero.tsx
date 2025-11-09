import { CategoryBadge } from '@/components/blog/category-badge';
import { formatEthiopianDate } from '@/lib/ethiopian-date';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleHeroProps {
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  coverImage?: string;
  description?: string;
  href?: string;
  disableCategoryLink?: boolean;
}

export function ArticleHero({
  title,
  category,
  author,
  publishedAt,
  readingTime,
  coverImage,
  description,
  href,
  disableCategoryLink = false,
}: ArticleHeroProps) {
  const formattedDate = formatEthiopianDate(publishedAt);

  const content = (
    <div className="relative overflow-hidden rounded-lg mb-12 h-[250px] sm:h-[300px] md:h-[450px]">
      {/* Background Image or Gradient */}
      {coverImage ? (
        <>
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
          {/* Gradient overlay - starts from middle, darker at bottom for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-slate-900/20 via-50% to-slate-900/95 to-100%" />
        </>
      ) : (
        <>
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900" />
        </>
      )}

      {/* Content - Positioned at bottom */}
      <div className="absolute inset-x-0 bottom-0 px-6 py-6 md:px-10 md:py-8">
        {/* Category Badge */}
        <div className="mb-3">
          <CategoryBadge
            categoryId={category}
            showIcon={true}
            asLink={!disableCategoryLink}
          />
        </div>

        {/* Title - Smaller */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Description - Body font size */}
        {description && (
          <p className="text-base text-slate-200 mb-4 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-200 text-sm">
          {/* Author */}
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">{author}</span>
          </div>

          {/* Date - Ethiopian Calendar */}
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={publishedAt}>
              {formattedDate}
            </time>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return content;
}
