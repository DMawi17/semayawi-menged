export interface Category {
  id: string;
  name: string;
  nameAmharic: string;
  description: string;
  descriptionAmharic: string;
  slug: string;
  color: string;
  icon: string;
  featured: boolean;
  comingSoon: boolean;
}

export const categories: Category[] = [
  {
    id: "women-of-bible",
    name: "Women of the Bible",
    nameAmharic: "የመጽሐፍ ቅዱስ ሴቶች",
    description: "Stories and lessons from remarkable women in scripture",
    descriptionAmharic: "በመጽሐፍ ቅዱስ ውስጥ ከሚገኙ ድንቅ ሴቶች ታሪኮች እና ትምህርቶች",
    slug: "women-of-bible",
    color: "#E879F9", // Fuchsia
    icon: "👩",
    featured: true,
    comingSoon: false,
  },
  {
    id: "men-of-bible",
    name: "Men of the Bible",
    nameAmharic: "የመጽሐፍ ቅዱስ ወንዶች",
    description: "Lives and faith journeys of biblical men",
    descriptionAmharic: "የመጽሐፍ ቅዱስ ወንዶች ህይወት እና የእምነት ጉዞ",
    slug: "men-of-bible",
    color: "#3B82F6", // Blue
    icon: "👨",
    featured: true,
    comingSoon: true,
  },
  {
    id: "church-history",
    name: "Church History",
    nameAmharic: "የቤተክርስቲያን ታሪክ",
    description: "Historical figures, events, and movements in Christianity",
    descriptionAmharic: "በክርስቲያናዊ ታሪክ ውስጥ ያሉ ታላላቅ ሰዎች፣ ክስተቶች እና እንቅስቃሴዎች",
    slug: "church-history",
    color: "#F59E0B", // Amber
    icon: "⛪",
    featured: true,
    comingSoon: true,
  },
  {
    id: "theology-wisdom",
    name: "Theology & Wisdom",
    nameAmharic: "ሃይማኖት እና ጥበብ",
    description: "Theological concepts and spiritual wisdom",
    descriptionAmharic: "የሃይማኖታዊ ትምህርቶች እና መንፈሳዊ ጥበብ",
    slug: "theology-wisdom",
    color: "#10B981", // Emerald
    icon: "📖",
    featured: false,
    comingSoon: true,
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

export const getFeaturedCategories = (): Category[] => {
  return categories.filter((cat) => cat.featured);
};

export const getActiveCategories = (): Category[] => {
  return categories.filter((cat) => !cat.comingSoon);
};
