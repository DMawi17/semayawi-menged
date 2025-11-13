"use client";

import React from 'react';
import { Heart } from 'lucide-react';

interface PrayerPromptProps {
  children: React.ReactNode;
}

export function PrayerPrompt({ children }: PrayerPromptProps) {
  const [prayed, setPrayed] = React.useState(false);

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl border-2 border-pink-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Heart className="w-6 h-6 text-white" fill={prayed ? 'currentColor' : 'none'} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg text-pink-800 dark:text-pink-300 mb-2">
            💭 ለማሰላሰል እና ለጸሎት
          </h4>
          <div className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {children}
          </div>
          <button
            onClick={() => setPrayed(!prayed)}
            className="px-4 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {prayed ? '🙏 ጸልያለሁ' : 'ጸሎት ያስፈልጋል'}
          </button>
        </div>
      </div>
    </div>
  );
}
