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
    <header className="relative overflow-hidden rounded-lg mb-12 min-h-[400px] md:min-h-[500px]">
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
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/90" />
        </>
      ) : (
        <>
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </>
      )}

      {/* Content */}
      <div className="relative px-8 py-12 md:px-12 md:py-16 flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
        {/* Category Badge */}
        {categoryData && (
          <div className="mb-4">
            <Badge
              variant="outline"
              className="bg-amber-500/10 border-amber-500 text-amber-500 hover:bg-amber-500/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider"
            >
              {categoryData.name}
            </Badge>
          </div>
        )}

        {/* Title - Smaller */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight max-w-4xl">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-slate-300">
          {/* Author */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">{author}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
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
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-sm">{readingTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
