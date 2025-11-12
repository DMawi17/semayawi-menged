"use client";

import { ViewTransitionLink } from "@/components/view-transition-link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between min-w-0">
        {/* Logo */}
        <ViewTransitionLink
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity bg-gradient-to-r from-black via-gray-600 to-black dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent"
        >
          {siteConfig.name}
        </ViewTransitionLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {siteConfig.navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <ViewTransitionLink
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.nameAmharic}
              </ViewTransitionLink>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative h-12 w-12 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-center"
            aria-label={mobileMenuOpen ? "ሜኑ ዝጋ" : "ሜኑ ክፈት"}
            aria-expanded={mobileMenuOpen}
          >
            {/* Animated Hamburger Icon */}
            <div className="relative h-5 w-5 flex flex-col items-center justify-center">
              <span
                className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Animated Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 pointer-events-none ${
          mobileMenuOpen ? "pointer-events-auto" : ""
        }`}
        style={{ overflowX: 'clip' }}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Content */}
        <div
          className={`absolute right-0 h-full w-64 max-w-[80vw] border-l border-gray-200 dark:border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            mobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
          }`}
          style={{ backgroundColor: 'var(--background)' }}
        >
          <nav className="p-4 space-y-2">
            {siteConfig.navigation.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <ViewTransitionLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-medium py-4 px-4 min-h-[44px] flex items-center rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: mobileMenuOpen ? "slideIn 0.3s ease-out forwards" : "none",
                  }}
                >
                  {item.nameAmharic}
                </ViewTransitionLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
