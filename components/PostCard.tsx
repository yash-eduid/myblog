import Link from 'next/link';
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { PostMeta } from '@/lib/types';

interface Props {
  post: PostMeta;
  variant?: 'default' | 'featured';
}

export default function PostCard({ post, variant = 'default' }: Props) {
  if (variant === 'featured') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col p-6 rounded-2xl border border-slate-800 bg-surface-800/40 hover:border-brand-800 hover:bg-surface-800/70 card-hover transition-all"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-900/20 to-accent-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-brand-900/60 border border-brand-800/60 text-brand-300 text-xs font-semibold">
              Featured
            </span>
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-surface-700 border border-slate-700 text-slate-400 text-xs">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-brand-300 mb-3 transition-colors leading-snug line-clamp-2">
            {post.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readingTime}</span>
            </div>
            <span className="flex items-center gap-1 text-brand-400 group-hover:gap-2 transition-all">
              Read <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col p-5 rounded-xl border border-slate-800 bg-surface-800/30 hover:border-brand-800/60 hover:bg-surface-800/60 card-hover transition-all'
      )}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-700 border border-slate-700/60 text-slate-400 text-xs">
            <Tag className="w-2.5 h-2.5" /> {tag}
          </span>
        ))}
      </div>

      <h2 className="text-base font-semibold text-white group-hover:text-brand-300 mb-2 transition-colors leading-snug line-clamp-2 flex-1">
        {post.title}
      </h2>

      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
        {post.description}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-600 mt-auto">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime}</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
