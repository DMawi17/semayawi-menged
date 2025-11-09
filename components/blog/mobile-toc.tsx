"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface MobileTocProps {
  headings?: { id: string; text: string; level: number }[];
}

export function MobileToc({ headings = [] }: MobileTocProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 1,
      }
    );

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  if (!headings.length) return null;

  return (
    <>
      {/* Floating TOC Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 xl:hidden h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        aria-label={isOpen ? "የይዘት ዝርዝር ዝጋ" : "የይዘት ዝርዝር ክፈት"}
        title={isOpen ? "Close table of contents" : "Open table of contents"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-background border-l z-50 xl:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">የይዘት ዝርዝር</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
              aria-label="ዝጋ"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* TOC Content */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`w-full text-left text-sm transition-colors rounded-lg px-3 py-2 ${
                      heading.level === 3 ? "pl-6" : ""
                    } ${
                      activeId === heading.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t text-xs text-muted-foreground text-center">
            ለፈጣን ዝላይ ርዕሱን ጠቅ ያድርጉ
          </div>
        </div>
      </div>
    </>
  );
}
