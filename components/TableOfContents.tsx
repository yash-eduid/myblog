'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/lib/types';
import { List } from 'lucide-react';

interface Props { toc: TocItem[]; }

export default function TableOfContents({ toc }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = document.querySelectorAll('h2[id], h3[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav className="rounded-xl border border-slate-800 bg-surface-800/30 p-5">
      <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        <List className="w-3.5 h-3.5" /> On This Page
      </h3>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.id} className={item.depth === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 88;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={cn(
                'block text-sm py-1 leading-snug transition-colors border-l-2 pl-3',
                activeId === item.id
                  ? 'border-brand-500 text-brand-300 font-medium'
                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-600'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
