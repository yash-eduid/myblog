import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { ArrowLeft, Tag } from 'lucide-react';

interface Props { params: { tag: string }; }

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags.map((t) => t.toLowerCase().replace(/\s+/g, '-'))));
  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `#${params.tag}`, description: `Articles tagged with ${params.tag}.` };
}

export default function TagPage({ params }: Props) {
  const allPosts = getAllPosts();
  const posts = allPosts.filter((p) =>
    p.tags.some((t) => t.toLowerCase().replace(/\s+/g, '-') === params.tag)
  );

  if (posts.length === 0) notFound();

  const displayTag = posts[0].tags.find((t) => t.toLowerCase().replace(/\s+/g, '-') === params.tag) || params.tag;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/tags" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-400 text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All tags
      </Link>
      <div className="mb-10 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-950/60 border border-brand-800 text-brand-300 text-lg font-semibold">
          <Tag className="w-4 h-4" /> {displayTag}
        </span>
        <span className="text-slate-500">{posts.length} article{posts.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
