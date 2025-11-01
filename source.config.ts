import { defineCollections, frontmatterSchema } from 'fumadocs-mdx/config';
import { defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

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
  }),
});

// Export Fumadocs config with MDX options
export default defineConfig({
  mdxOptions: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
