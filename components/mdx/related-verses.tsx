import React from 'react';
import { BookOpen } from 'lucide-react';

interface Verse {
  text: string;
  ref: string;
}

interface RelatedVersesProps {
  verses: Verse[];
}

export function RelatedVerses({ verses }: RelatedVersesProps) {
  return (
    <div className="my-12 p-8 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-300">
      <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        ተዛማጅ የመጽሐፍ ቅዱስ ቁምፊዎች
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {verses.map((verse, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-2">
              {verse.text}
            </p>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              {verse.ref}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
