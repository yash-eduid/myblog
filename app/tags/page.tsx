import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse articles by topic tag.',
};

export default function TagsPage() {
  const posts = getAllPosts();
  const tagMap: Record<string, number> = {};
  posts.forEach((p) => p.tags.forEach((t) => { tagMap[t] = (tagMap[t] || 0) + 1; }));
  const tags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-3">Tags</h1>
      <p className="text-slate-400 mb-10">{tags.length} topics across {posts.length} articles.</p>
      <div className="flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-surface-800/50 hover:border-brand-700 hover:bg-brand-950/40 text-slate-300 hover:text-brand-300 text-sm font-medium transition-colors"
          >
            <Tag className="w-3.5 h-3.5" /> {tag}
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-400 text-xs">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
