"use client";

import React from 'react';
import { Copy } from 'lucide-react';

interface BibleVerseProps {
  verse: string;
  reference: string;
  variant?: 'default' | 'featured' | 'inline';
}

export function BibleVerse({ verse, reference, variant = 'default' }: BibleVerseProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${verse}" - ${reference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-baseline gap-1 text-[#fe640b] dark:text-amber-400 font-semibold">
        {verse} <span className="text-sm text-[#fe640b] dark:text-amber-500">({reference})</span>
      </span>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="my-8 p-8 bg-gradient-to-br from-[#fe640b]/10 via-[#ff8800]/10 to-[#ffa500]/10 dark:from-amber-600/20 dark:via-orange-600/20 dark:to-yellow-600/20 rounded-2xl border-2 border-[#fe640b] dark:border-amber-500 shadow-lg relative">
        {/* Copy button - top right corner */}
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition flex items-center gap-1 cursor-pointer"
          title={copied ? 'ተቀድቷል!' : 'ቅዳ'}
        >
          <Copy className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex items-center h-full">
            <span className="text-4xl flex-shrink-0">📖</span>
          </div>
          <div className="flex-1 pr-12">
            <blockquote className="text-xl md:text-2xl font-serif leading-relaxed text-[#4c4f69] dark:text-gray-100 mb-4">
              "{verse}"
            </blockquote>
            <div className="flex justify-end">
              <cite className="text-base font-bold text-[#fe640b] dark:text-amber-400 not-italic">
                — {reference}
              </cite>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 p-6 bg-gradient-to-r from-[#fe640b]/10 to-[#ffa500]/10 dark:from-amber-600/20 dark:to-orange-600/20 border-l-4 border-[#fe640b] dark:border-amber-500 rounded-r-xl relative">
      {/* Copy button - top right corner */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-xs transition cursor-pointer"
        title={copied ? 'ተቀድቷል!' : 'ቅዳ'}
      >
        <Copy className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-start gap-3">
        <div className="flex items-center h-full">
          <span className="text-2xl flex-shrink-0">📖</span>
        </div>
        <div className="flex-1 pr-10">
          <blockquote className="text-lg font-serif italic text-[#4c4f69] dark:text-gray-200 mb-2">
            "{verse}"
          </blockquote>
          <div className="flex justify-end">
            <cite className="text-sm font-semibold text-[#fe640b] dark:text-amber-400 not-italic">
              — {reference}
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}
