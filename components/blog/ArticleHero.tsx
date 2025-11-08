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
          {/* Dark gradient overlay - top to bottom like the example */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900/90" />
        </>
      ) : (
        <>
          {/* Dark gradient background - top to bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900" />
        </>
      )}

      {/* Content - Positioned at bottom */}
      <div className="absolute inset-x-0 bottom-0 px-8 py-10 md:px-12 md:py-12">
        {/* Category Badge */}
        {categoryData && (
          <div className="mb-6">
            <Badge
              className="bg-amber-500 hover:bg-amber-600 text-white border-0 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full"
            >
              {categoryData.name}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-slate-200">
          {/* Author */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{author}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time className="text-sm" dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{readingTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
