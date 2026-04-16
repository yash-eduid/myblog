export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  coverImage?: string;
  originalUrl?: string;
  rawContent: string;
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}
