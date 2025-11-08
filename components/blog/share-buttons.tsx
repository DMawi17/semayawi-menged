"use client";

import { Link2, Mail, Share2, MessageCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  // Check if native Web Share API is supported
  useEffect(() => {
    setSupportsNativeShare(
      typeof navigator !== "undefined" &&
      typeof navigator.share !== "undefined"
    );
  }, []);

  const shareData = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}${description ? `&summary=${encodeURIComponent(description)}` : ""}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || title}\n\n${url}`)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
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

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || title,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    }
  };

  const handleShare = (platform: keyof typeof shareData) => {
    if (platform === "email") {
      // Email uses mailto: protocol
      window.location.href = shareData[platform];
    } else {
      // All social platforms open in new window
      window.open(shareData[platform], "_blank", "noopener,noreferrer,width=600,height=400");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {/* Native Share Button (mobile-first) */}
        {supportsNativeShare && (
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center justify-center h-9 px-4 rounded-lg border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2 cursor-pointer"
            aria-label="Share"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-medium">ያጋሩ</span>
          </button>
        )}

        <button
          onClick={() => handleShare("whatsapp")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-[#25D366] hover:text-white transition-colors cursor-pointer"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </button>

        <button
          onClick={() => handleShare("telegram")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-[#0088cc] hover:text-white transition-colors cursor-pointer"
          aria-label="Share on Telegram"
          title="Share on Telegram"
        >
          <Send className="h-4 w-4" />
        </button>

        <button
          onClick={() => handleShare("facebook")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-[#1877F2] hover:text-white transition-colors cursor-pointer"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare("twitter")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-[#1DA1F2] hover:text-white transition-colors cursor-pointer"
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare("linkedin")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-[#0A66C2] hover:text-white transition-colors cursor-pointer"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare("email")}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          aria-label="Share via Email"
          title="Share via Email"
        >
          <Mail className="h-4 w-4" />
        </button>

        <button
          onClick={copyToClipboard}
          className={`inline-flex items-center justify-center h-9 w-9 rounded-lg border transition-colors cursor-pointer ${
            copied
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-accent hover:text-accent-foreground"
          }`}
          aria-label="Copy link"
          title={copied ? "ተቀድቷል!" : "ማገናኛ ቅዳ"}
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
