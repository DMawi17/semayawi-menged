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
  body: unknown;
  // Include other properties from the page if needed
  [key: string]: unknown;
}
