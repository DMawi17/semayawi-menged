# ሰማያዊ መንገድ (Semayawi Menged)

> **Heavenly Kingdom** - A bilingual (Amharic/English) Christian blog exploring biblical stories, church history, theology, and spiritual wisdom.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Features

### 📝 Content Management

- 📖 **MDX-powered blog** with rich content support
- 🌍 **Bilingual support** (Amharic & English)
- 🏷️ **Multi-category architecture** (Women of the Bible, Men of the Bible, Church History, Theology & Wisdom)
- 🎨 **Syntax highlighting** with Shiki
- 📑 **Table of Contents** with active heading tracking
- 🔖 **Bookmarks** - Save posts for later reading
- 👁️ **View counter** - Track post popularity

### 🎨 User Experience

- 🌓 **Dark/Light mode** with system preference detection
- 📱 **Fully responsive** design
- ⚡ **Lightning fast** with Next.js App Router & Turbopack
- 🔍 **Real-time search** across all posts
- 🎯 **Category filters** and sorting options
- 📊 **Reading time estimates** (Amharic-aware)
- 🖼️ **Image zoom/lightbox** for better viewing
- 🖨️ **Print-friendly** styles

### 🤝 Social & Engagement

- 💬 **GitHub Discussions** integration (via Giscus)
- 🔗 **Social sharing** (Facebook, Twitter, LinkedIn, WhatsApp, Telegram, Email)
- 📬 **Newsletter subscription** (ready for integration)
- ⬅️➡️ **Post navigation** (Previous/Next)
- 🎲 **Related posts** with intelligent scoring
- 👤 **Author bio** with social links

### 🛠️ Developer Experience

- 📦 **TypeScript** with strict type checking
- 🎯 **ESLint** for code quality
- 🎨 **Prettier** formatting (configured)
- 🔥 **Turbopack** for faster development
- 📚 **Fumadocs** for content management
- 🎨 **Radix UI** components
- 🔧 **Tailwind CSS v4** with modern features

### 🚀 SEO & Performance

- 🗺️ **Automatic sitemap** generation
- 🤖 **robots.txt** configuration
- 📡 **RSS feed** for content syndication
- 🔗 **Auto-linked headings** with anchors
- 📱 **Open Graph** & Twitter Cards (ready)
- ⚡ **Optimized images** with Next.js Image

---

## 📂 Project Structure

```
semayawi-menged-v2/
├── app/                          # Next.js App Router
│   ├── blog/                     # Blog pages
│   │   ├── [category]/          # Category pages
│   │   ├── [...slug]/           # Individual blog posts
│   │   └── page.tsx             # Blog listing
│   ├── about/                    # About page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
│
├── components/                   # React components
│   ├── blog/                     # Blog-specific components
│   │   ├── author-bio.tsx
│   │   ├── bookmark-button.tsx
│   │   ├── breadcrumbs.tsx
│   │   ├── category-badge.tsx
│   │   ├── comments.tsx          # Giscus integration
│   │   ├── filter-bar.tsx
│   │   ├── image-zoom.tsx
│   │   ├── newsletter.tsx
│   │   ├── post-card.tsx
│   │   ├── post-navigation.tsx
│   │   ├── related-posts.tsx
│   │   ├── search-bar.tsx
│   │   ├── share-buttons.tsx
│   │   ├── table-of-contents.tsx
│   │   └── view-counter.tsx
│   ├── mdx/                      # MDX components
│   │   └── callout.tsx          # Custom callout boxes
│   ├── layout/                   # Layout components
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── theme-toggle.tsx
│   └── ui/                       # UI primitives (shadcn/ui)
│
├── config/                       # Configuration
│   ├── categories.ts            # Category definitions
│   └── site.ts                  # Site metadata
│
├── content/                      # MDX content
│   └── blog/                    # Blog posts
│       └── *.mdx
│
├── lib/                          # Utility libraries
│   ├── categories.ts            # Category helpers
│   ├── reading-time.ts          # Reading time calculator
│   ├── related-posts.ts         # Related posts logic
│   ├── source.ts                # Fumadocs source
│   └── utils.ts                 # General utilities
│
├── types/                        # TypeScript types
│   └── blog.ts                  # Blog-specific types
│
├── public/                       # Static assets
│   └── images/
│
├── .env.example                  # Environment variables template
├── GISCUS_SETUP.md              # Giscus setup guide
├── eslint.config.mjs            # ESLint configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.ts               # Next.js configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/semayawi-menged-v2.git
   cd semayawi-menged-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional for comments)

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Giscus configuration (see [GISCUS_SETUP.md](GISCUS_SETUP.md))

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   ```
   http://localhost:3000
   ```

---

## 📝 Writing Content

### Creating a New Blog Post

1. Create a new `.mdx` file in `content/blog/`:

   ```bash
   content/blog/my-new-post.mdx
   ```

2. Add frontmatter metadata:

   ```mdx
   ---
   title: Your Post Title
   description: A brief description of your post
   date: 2025-11-02
   cover: /images/posts/your-image.jpg
   category: women-of-bible
   tags: [faith, bible, women]
   author: Your Name
   published: true
   featured: false
   ---

   Your content here...
   ```

3. Write your content using MDX:

   ```mdx
   ## Headings

   Regular **Markdown** content works great!

   ### Using Custom Components

   <Callout type="info" title="Did you know?">
     You can use custom React components in your MDX!
   </Callout>

   <Callout type="warning">
     Important information for your readers.
   </Callout>
   ```

### Available Callout Types

- `info` (መረጃ) - Informational content
- `warning` (ማስጠንቀቂያ) - Warning messages
- `error` (ስህተት) - Error messages
- `success` (ስኬት) - Success messages
- `tip` (ምክር) - Tips and tricks

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | Brief description for cards and SEO |
| `date` | string/date | ✅ | Publication date (YYYY-MM-DD) |
| `cover` | string | ⚠️ | Cover image path (recommended) |
| `category` | string | ✅ | Category ID (see categories below) |
| `tags` | string[] | ❌ | Array of tags |
| `author` | string | ❌ | Author name (defaults to site author) |
| `published` | boolean | ✅ | Whether post is published |
| `featured` | boolean | ❌ | Show on homepage (default: false) |

### Available Categories

- `women-of-bible` - Women of the Bible (የመጽሐፍ ቅዱስ ሴቶች)
- `men-of-bible` - Men of the Bible (የመጽሐፍ ቅዱስ ወንዶች) - Coming Soon
- `church-history` - Church History (የቤተክርስቲያን ታሪክ) - Coming Soon
- `theology-wisdom` - Theology & Wisdom (ሃይማኖት እና ጥበብ) - Coming Soon

---

## 🎨 Customization

### Site Configuration

Edit `config/site.ts` to customize site metadata:

```typescript
export const siteConfig = {
  name: "Your Site Name",
  description: "Your site description",
  url: "https://yoursite.com",
  author: "Your Name",
  // ... more options
};
```

### Categories

Add or modify categories in `config/categories.ts`:

```typescript
{
  id: "your-category",
  name: "Category Name",
  nameAmharic: "የምድብ ስም",
  description: "Category description",
  descriptionAmharic: "የምድብ መግለጫ",
  slug: "your-category",
  color: "#E879F9",
  icon: "📚",
  featured: true,
  comingSoon: false,
}
```

### Styling

- **Colors**: Modify `app/globals.css` CSS variables
- **Components**: Edit individual component files in `components/`
- **Tailwind**: Customize `tailwind.config.ts`

---

## 💬 Comments Setup

This blog uses **Giscus** for comments powered by GitHub Discussions.

### Quick Setup

1. Follow the detailed guide in [GISCUS_SETUP.md](GISCUS_SETUP.md)
2. Add your configuration to `.env.local`
3. Restart the dev server

**Note**: Comments will show helpful setup instructions until configured.

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Build
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.0.1 (App Router) |
| **Language** | TypeScript 5.x |
| **UI Library** | React 19.2.0 |
| **Styling** | Tailwind CSS v4 |
| **Content** | Fumadocs + MDX |
| **Components** | Radix UI |
| **Icons** | Lucide React |
| **Syntax Highlighting** | Shiki |
| **Comments** | Giscus (GitHub Discussions) |
| **Build Tool** | Turbopack |

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables (if using Giscus)
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to:

- **Netlify**
- **Cloudflare Pages**
- **AWS Amplify**
- **Google Cloud Run**
- Any Node.js hosting

---

## 🗺️ Roadmap

### Completed ✅

- [x] Blog architecture and categories
- [x] MDX content management
- [x] Dark/light theme toggle
- [x] Search functionality
- [x] Category filters
- [x] Reading time estimates
- [x] Related posts
- [x] Table of contents
- [x] Bookmarks
- [x] View counter
- [x] Share buttons
- [x] Comments integration
- [x] Newsletter form
- [x] SEO optimization
- [x] Print styles

### Upcoming 🚧

- [ ] Additional categories (Men of Bible, Church History, Theology)
- [ ] Full Amharic translations
- [ ] Newsletter service integration (Mailchimp/ConvertKit)
- [ ] Analytics dashboard
- [ ] Advanced search with filters
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Fumadocs](https://fumadocs.vercel.app/) - Beautiful documentation framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [Giscus](https://giscus.app/) - Comments powered by GitHub Discussions
- [Shiki](https://shiki.matsu.io/) - Beautiful syntax highlighter

---

## 📞 Contact

- **Website**: [https://yoursite.com](https://yoursite.com)
- **Email**: <your-email@example.com>
- **GitHub**: [@your-username](https://github.com/your-username)
- **Twitter**: [@your-handle](https://twitter.com/your-handle)

---

<div align="center">

**Made with ❤️ and ☕**

*ሰማያዊ መንገድ - Guiding hearts to heavenly wisdom*

[⬆ Back to Top](#ሰማያዊ-መንገድ-semayawi-menged)

</div>
