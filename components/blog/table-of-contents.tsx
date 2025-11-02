"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from the page
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );

    const headingData: Heading[] = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.charAt(1)),
    }));

    setHeadings(headingData);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 hidden xl:block">
      <div className="w-64 p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <List className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-sm">የጽሁፉ ይዘት</h2>
        </div>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                  heading.level === 3 ? "pl-4" : ""
                } ${
                  activeId === heading.id
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
