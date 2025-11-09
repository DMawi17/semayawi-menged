import type { Metadata } from "next";
import { Inter, Noto_Sans_Ethiopic, Agbalumo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ViewTransitionProvider } from "@/components/view-transition-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-ethiopic",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const agbalumo = Agbalumo({
  subsets: ["latin"],
  variable: "--font-agbalumo",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.links.personalSite,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@" + siteConfig.links.twitter.split("/").pop(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am" suppressHydrationWarning>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://giscus.app" />

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} RSS Feed`} href="/feed.xml" />
      </head>
      <body
        className={`${inter.variable} ${notoSansEthiopic.variable} ${agbalumo.variable} font-sans antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ViewTransitionProvider>
            <div className="flex min-h-screen flex-col bg-background">
              <Header />
              <main id="main-content" className="flex-1 bg-background" style={{ viewTransitionName: 'main-content' } as React.CSSProperties}>{children}</main>
              <Footer />
            </div>
          </ViewTransitionProvider>
        </ThemeProvider>

        {/* Global Structured Data */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
