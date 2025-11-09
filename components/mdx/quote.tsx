import { ReactNode } from "react";

interface QuoteProps {
  text: string;
  reference: string;
  highlight?: boolean;
  children?: ReactNode;
}

export function Quote({ text, reference, highlight = false, children }: QuoteProps) {
  // Support both text prop and children
  const content = text || children;

  return (
    <div className={`my-8 ${highlight ? 'p-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl border-2 border-purple-300 shadow-lg' : 'p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700'}`}>
      <blockquote className={`${highlight ? 'text-2xl' : 'text-xl'} font-serif leading-relaxed text-gray-800 dark:text-gray-100 mb-4`}>
        {content}
      </blockquote>
      <cite className={`${highlight ? 'text-base font-bold' : 'text-sm font-semibold'} text-purple-700 dark:text-purple-400 not-italic block`}>
        — {reference}
      </cite>
    </div>
  );
}
