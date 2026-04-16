import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import { compileMDX } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import AuthorCard from '@/components/AuthorCard';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Niteen Badgujar'],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { content, toc } = await compileMDX(post.rawContent);
  const { prev, next } = getAdjacentPosts(params.slug);
  const url = `https://niteenbadgujar.me/blog/${params.slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-400 text-sm mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all articles
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 xl:gap-16">
        {/* ─── Main content ─── */}
        <article>
          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-950/60 border border-brand-800/60 text-brand-300 text-xs font-medium hover:bg-brand-900/60 transition-colors"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed">{post.description}</p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 border-y border-slate-800 py-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
              <div className="ml-auto">
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
          </header>

          {/* MDX body */}
          <div className="prose prose-invert prose-lg max-w-none">
            {content}
          </div>

          {/* Author card */}
          <div className="mt-14 pt-10 border-t border-slate-800">
            <AuthorCard />
          </div>

          {/* Prev / Next */}
          {(prev || next) && (
            <nav className="mt-10 grid sm:grid-cols-2 gap-4">
              {prev && (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-800 hover:border-brand-800 transition-colors"
                >
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Previous
                  </span>
                  <span className="text-sm text-white group-hover:text-brand-300 font-medium line-clamp-2">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-800 hover:border-brand-800 transition-colors sm:text-right sm:ml-auto w-full"
                >
                  <span className="text-xs text-slate-500 flex items-center gap-1 sm:justify-end">
                    Next <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-sm text-white group-hover:text-brand-300 font-medium line-clamp-2">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>

        {/* ─── Sidebar: TOC ─── */}
        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents toc={toc} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
