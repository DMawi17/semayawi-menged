export const siteConfig = {
  name: "ሰማያዊ መንገድ",
  nameEnglish: "Semayawi Menged",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  description: "Biblical stories and wisdom in Amharic - Women of the Bible, Church History, and Theological insights",
  descriptionAmharic: "የመጽሐፍ ቅዱስ ታሪኮች እና ጥበብ - የቅዱሳን ሴቶች፣ የቤተክርስቲያን ታሪክ እና የሃይማኖት ትምህርቶች",
  author: "ዳግማዊ አሰግድ",
  authorEnglish: "Dagmawi Asegid",
  work: "ፀሐፊ",
  workEnglish: "Writer",
  keywords: [
    "የመጽሐፍ ቅዱስ",
    "ሴቶች",
    "ቤተክርስቲያን ታሪክ",
    "Bible",
    "Women",
    "Church History",
    "Amharic",
    "Ethiopian",
    "Theology",
  ],
  locale: "am-ET",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com/DMawi17",
    personalSite: "https://mawi17.netlify.app/",
  },
  navigation: [
    { name: "Home", nameAmharic: "ዋና ገጽ", href: "/" },
    { name: "Blog", nameAmharic: "ጽሁፎች", href: "/blog" },
    { name: "Women of Bible", nameAmharic: "የመጽሐፍ ቅዱስ ሴቶች", href: "/women-of-bible" },
    { name: "Bookmarks", nameAmharic: "የተቀመጡ", href: "/bookmarks" },
    { name: "History", nameAmharic: "ታሪክ", href: "/history" },
    { name: "About", nameAmharic: "ስለ እኛ", href: "/about" },
  ],
};

export type SiteConfig = typeof siteConfig;
