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
  };
  body: string; // MDX content as string
  rawContent?: string; // Raw markdown content
  // Index signature for additional dynamic properties
  [key: string]: string | number | boolean | object | undefined;
}
