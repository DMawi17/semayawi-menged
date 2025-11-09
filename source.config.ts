import { defineCollections, frontmatterSchema } from 'fumadocs-mdx/config';
import { defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';
import rehypeSlug from 'rehype-slug';

// Define blog post collection
export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    title: z.string().max(99),
    description: z.string().max(999).optional(),
    date: z.string().date().or(z.date()),
    cover: z.string(),
    published: z.boolean().default(true),
    tags: z.array(z.string()).optional(),
    category: z.string().default('women-of-bible'), // Category ID: women-of-bible, men-of-bible, church-history, theology-wisdom
    featured: z.boolean().default(false), // Featured posts appear in hero section
    author: z.string().optional(), // Author name for multi-author support
    audio: z.string().optional(), // Optional audio file path for text-to-speech narration
  }),
});

// Export Fumadocs config with MDX options
export default defineConfig({
  mdxOptions: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [],
  },
});
