import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { ArrowRight, Cpu, Brain, Zap, GitBranch } from 'lucide-react';

const TOPICS = [
  { label: 'Agentic AI', icon: <Brain className="w-4 h-4" />, href: '/tags/agentic-ai', color: 'from-purple-500/20 to-violet-500/20 border-purple-700/50' },
  { label: 'LLMs', icon: <Cpu className="w-4 h-4" />, href: '/tags/llm', color: 'from-blue-500/20 to-cyan-500/20 border-blue-700/50' },
  { label: 'RAG Systems', icon: <GitBranch className="w-4 h-4" />, href: '/tags/rag', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-700/50' },
  { label: 'Azure AI', icon: <Zap className="w-4 h-4" />, href: '/tags/azure', color: 'from-orange-500/20 to-amber-500/20 border-orange-700/50' },
];

export default async function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.featured).slice(0, 2);
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ─── Hero ─── */}
      <section className="pt-24 pb-20 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-800 bg-brand-950/40 text-brand-300 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
          </span>
          Writing about AI &amp; Agentic Systems
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Exploring the{' '}
          <span className="gradient-text">Future of AI</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
          Deep technical dives into Agentic AI, LLMs, RAG systems, and production-grade machine learning
          architectures — by <span className="text-white font-medium">Niteen Badgujar</span>.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors"
          >
            Read Articles <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold transition-colors"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* ─── Topic pills ─── */}
      <section className="pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TOPICS.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-gradient-to-br ${t.color} text-slate-200 text-sm font-medium hover:scale-105 transition-transform`}
            >
              <span className="text-slate-300">{t.icon}</span>
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Posts ─── */}
      {featuredPosts.length > 0 && (
        <section className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured</h2>
            <Link href="/blog" className="text-brand-400 hover:text-brand-300 text-sm font-medium inline-flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* ─── Recent Posts ─── */}
      <section className="pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Recent Articles</h2>
          <Link href="/blog" className="text-brand-400 hover:text-brand-300 text-sm font-medium inline-flex items-center gap-1">
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {allPosts.length > 6 && (
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-brand-700 text-slate-300 hover:text-brand-400 font-medium transition-colors"
            >
              View all {allPosts.length} articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* ─── Newsletter ─── */}
      <section className="pb-20">
        <NewsletterSignup />
      </section>
    </div>
  );
}
