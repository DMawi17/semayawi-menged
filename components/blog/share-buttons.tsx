"use client";

import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}${description ? `&summary=${encodeURIComponent(description)}` : ""}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || title}\n\n${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: keyof typeof shareData) => {
    if (platform === "email") {
      window.location.href = shareData[platform];
    } else {
      window.open(shareData[platform], "_blank", "noopener,noreferrer,width=600,height=400");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-muted-foreground">ያጋሩ</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleShare("facebook")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </button>

        <button
          onClick={() => handleShare("twitter")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </button>

        <button
          onClick={() => handleShare("linkedin")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </button>

        <button
          onClick={() => handleShare("email")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Share via Email"
          title="Share via Email"
        >
          <Mail className="h-4 w-4" />
        </button>

        <button
          onClick={copyToClipboard}
          className={`inline-flex items-center justify-center h-9 w-9 rounded-lg border transition-colors ${
            copied
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-accent hover:text-accent-foreground"
          }`}
          aria-label="Copy link"
          title={copied ? "Copied!" : "Copy link"}
        >
          <Link2 className="h-4 w-4" />
        </button>
      </div>
      {copied && (
        <p className="text-xs text-muted-foreground">ማገናኛው ተቀድቷል!</p>
      )}
    </div>
  );
}
