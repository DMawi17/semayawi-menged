import { Github, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AuthorBioProps {
  author?: string;
}

export function AuthorBio({ author }: AuthorBioProps) {
  const authorName = author || siteConfig.author;

  return (
    <div className="mt-12 pt-8 border-t not-prose">
      <div className="flex gap-4 items-start">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl font-bold text-white">
            {authorName.charAt(0)}
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">ስለ ደራሲው</h3>
          <p className="text-sm font-semibold text-foreground mb-2">
            {authorName}
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            {siteConfig.work} - በመጽሐፍ ቅዱስ ጥናት ላይ ፍላጎት ያለው እና የእግዚአብሔርን ቃል በአማርኛ
            ለማካፈል የሚጥር ደራሲ። የመጽሐፍ ቅዱስ ታሪኮችን፣ የቤተክርስቲያን ታሪክን እና መንፈሳዊ
            ትምህርቶችን ማጋራት ይወዳል።
          </p>
          <div className="flex gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
