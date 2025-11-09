"use client";

import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface ArticleFooterProps {
  shareText: string;
  prayerCount: number;
  commentCount: number;
}

export function ArticleFooter({ shareText, prayerCount, commentCount }: ArticleFooterProps) {
  const [prayed, setPrayed] = React.useState(false);
  const [currentPrayerCount, setCurrentPrayerCount] = React.useState(prayerCount);

  const handlePray = () => {
    if (!prayed) {
      setPrayed(true);
      setCurrentPrayerCount(prev => prev + 1);
    }
  };

  return (
    <div className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button
            onClick={handlePray}
            className={`flex items-center gap-2 transition ${
              prayed ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            <Heart className="w-6 h-6" fill={prayed ? 'currentColor' : 'none'} />
            <span className="font-semibold">{currentPrayerCount} ጸለዩ</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition">
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">{commentCount} አስተያየቶች</span>
          </button>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          {shareText}
        </button>
      </div>
    </div>
  );
}
