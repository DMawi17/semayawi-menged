// MDX Content type from fumadocs
export type MDXContent = React.ComponentType<Record<string, never>>;

// Custom blog post type based on our source structure
export interface BlogPost {
  url: string;
  data: {
    title: string;
    description: string | undefined;
    date: string | Date;
    cover: string;
    published: boolean;
    tags: string[] | undefined;
    category: string;
    featured: boolean;
    author: string | undefined;
    audio: string | undefined;
  };
  body: MDXContent; // MDX content component
  rawContent?: string; // Raw markdown content for reading time calculation
  // Index signature for additional dynamic properties
  [key: string]: string | number | boolean | object | undefined | MDXContent;
}
