import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCategory } from '@/lib/categories';
import Image from 'next/image';

interface ArticleHeroProps {
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  coverImage?: string;
}

export function ArticleHero({
  title,
  category,
  author,
  publishedAt,
  readingTime,
  coverImage,
}: ArticleHeroProps) {
  const categoryData = getCategory(category);

  return (
    <header className="relative overflow-hidden rounded-lg mb-12 h-[400px] md:h-[450px]">
      {/* Background Image or Gradient */}
      {coverImage ? (
        <>
          <Image
            src={coverImage}
            alt={title}
            fill
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
        {categoryData && (
          <div className="mb-3">
            <Badge
              variant="outline"
              className="bg-slate-800/80 border-slate-700 text-white hover:bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wider"
            >
              {categoryData.nameAmharic}
            </Badge>
          </div>
        )}

        {/* Title - Smaller */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-200 text-sm">
          {/* Author */}
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span className="font-medium">{author}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
