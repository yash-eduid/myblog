'use client';

import { useState, useMemo } from 'react';
import PostCard from './PostCard';
import { Search, X, Tag } from 'lucide-react';
import type { PostMeta } from '@/lib/types';

const PAGE_SIZE = 9;

interface Props {
  posts: PostMeta[];
  allTags: string[];
}

export default function BlogListClient({ posts, allTags }: Props) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag) {
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, query, activeTag]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(0, page * PAGE_SIZE);

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setPage(1);
  };

  const handleSearch = (val: string) => {
    setQuery(val);
    setPage(1);
  };

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-8 flex flex-col gap-4">
        {/* Search */}
        <div className="relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 bg-surface-800/60 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveTag(null); setPage(1); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              !activeTag
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeTag === tag
                  ? 'bg-brand-900/60 border-brand-700 text-brand-300'
                  : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              <Tag className="w-3 h-3" /> {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(query || activeTag) && (
        <p className="text-sm text-slate-500 mb-6">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {activeTag && <> in <span className="text-brand-400">#{activeTag}</span></>}
          {query && <> for <span className="text-slate-300">"{query}"</span></>}
        </p>
      )}

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg font-medium mb-2 text-slate-400">No articles found</p>
          <p className="text-sm">Try a different search or tag.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Load more */}
      {page < totalPages && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-3 rounded-xl border border-slate-700 hover:border-brand-700 text-slate-300 hover:text-brand-300 font-medium transition-colors text-sm"
          >
            Load more articles
          </button>
        </div>
      )}
    </div>
  );
}
