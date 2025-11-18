import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Github, Twitter, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted mt-20">
      <div className="container mx-auto px-6 py-16 md:py-20">
        {/* All sections in grid - mobile: About full, Nav+Connect side by side; desktop: flex with space around */}
        <div className="grid grid-cols-2 gap-8 md:flex md:justify-around">
          {/* About Section - full width on mobile */}
          <div className="col-span-2">
            <h3 className="font-bold text-lg mb-4">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.descriptionAmharic}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-4">
              {siteConfig.work} - {siteConfig.author}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.nameAmharic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-3.5">
              {siteConfig.links.github && (
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              {siteConfig.links.personalSite && (
                <a
                  href={siteConfig.links.personalSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
              {siteConfig.links.twitter && (
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
