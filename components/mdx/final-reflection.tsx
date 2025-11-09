import React from 'react';

export function FinalReflection({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 p-8 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-2xl border-4 border-amber-400 shadow-2xl">
      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-100 text-center">
        {children}
      </div>
    </div>
  );
}
