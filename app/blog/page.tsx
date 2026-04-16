import { getAllPosts } from '@/lib/posts';
import BlogListClient from '@/components/BlogListClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'All articles on AI, Agentic AI, LLMs, and production machine learning systems.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">All Articles</h1>
        <p className="text-slate-400 text-lg">
          {posts.length} articles on AI, Agentic systems, LLMs, and more.
        </p>
      </div>
      <BlogListClient posts={posts} allTags={allTags} />
    </div>
  );
}
