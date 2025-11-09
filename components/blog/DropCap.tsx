import { ReactNode } from 'react';

interface DropCapProps {
  children: ReactNode;
}

export function DropCap({ children }: DropCapProps) {
  // Convert children to string to extract first letter
  const text = String(children);
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);

  return (
    <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-amber-500 first-letter:float-left first-letter:leading-none first-letter:mr-3 first-letter:mt-1 leading-relaxed">
      {children}
    </p>
  );
}

// Alternative implementation with more control
export function DropCapManual({ children }: DropCapProps) {
  const text = String(children);
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);

  return (
    <p className="leading-relaxed">
      <span className="float-left text-7xl font-bold text-amber-500 leading-none mr-3 mt-1 select-none">
        {firstLetter}
      </span>
      {restOfText}
    </p>
  );
}
