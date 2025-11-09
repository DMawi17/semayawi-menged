import { ReactNode } from "react";
import { BibleVerse } from "./bible-verse";

interface QuoteProps {
  text?: string;
  reference?: string;
  author?: string; // Support legacy 'author' prop
  highlight?: boolean;
  children?: ReactNode;
}

export function Quote({ text, reference, author, highlight = false, children }: QuoteProps) {
  // Extract text content from children or use text prop
  let verseText = text || '';
  let verseReference = reference || author || '';

  if (!verseText && children) {
    // Recursively extract text from ReactNode
    const extractText = (node: ReactNode): string => {
      if (typeof node === 'string') {
        return node;
      }
      if (typeof node === 'number') {
        return String(node);
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join('');
      }
      if (node && typeof node === 'object' && 'props' in node) {
        const props = node.props as { children?: ReactNode };
        if (props.children) {
          return extractText(props.children);
        }
      }
      return '';
    };

    const fullText = extractText(children);
    // Clean up whitespace: trim and replace multiple spaces/newlines with single space
    const cleanedText = fullText.trim().replace(/\s+/g, ' ');

    // Parse format: "verse text" (reference)
    // Match quoted text and reference in parentheses
    const match = cleanedText.match(/^"(.+?)"\s*\(([^)]+)\)$/);

    if (match) {
      verseText = match[1]; // Text inside quotes
      verseReference = match[2]; // Text inside parentheses
    } else {
      // Fallback: if no match, use the full text as verse
      verseText = cleanedText;
    }
  }

  // Use BibleVerse component with appropriate variant
  return (
    <BibleVerse
      verse={verseText}
      reference={verseReference}
      variant={highlight ? 'featured' : 'default'}
    />
  );
}
