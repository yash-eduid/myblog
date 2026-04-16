import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Globe, BookOpen, Linkedin, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Niteen Badgujar — AI engineer specializing in Agentic AI and production LLM systems.',
};

const SKILLS = [
  { category: 'AI & ML', items: ['LLMs', 'Agentic AI', 'RAG Systems', 'Fine-tuning', 'Prompt Engineering'] },
  { category: 'Frameworks', items: ['LangChain', 'LlamaIndex', 'Semantic Kernel', 'AutoGen', 'CrewAI'] },
  { category: 'Cloud & Infra', items: ['Microsoft Azure', 'Azure OpenAI', 'Azure AI Search', 'Docker', 'Kubernetes'] },
  { category: 'Languages', items: ['Python', 'TypeScript', 'C#', 'SQL', 'Bash'] },
];

export default function AboutPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Profile */}
      <section className="mb-16 flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-brand-900/40">
            NB
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Niteen Badgujar</h1>
          <p className="text-brand-400 font-medium mb-4 text-lg">AI Engineer · Agentic Systems Architect</p>
          <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
            I build production-grade AI systems with a focus on Agentic AI architectures, large language models,
            and enterprise deployments on Microsoft Azure. I write to share what I learn — from vibe-coded prototypes
            to battle-tested production systems.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/imniteen" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://medium.com/@niteen.badgujar" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-colors">
              <BookOpen className="w-4 h-4" /> Medium
            </a>
            <a href="https://niteenbadgujar.me" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-colors">
              <Globe className="w-4 h-4" /> Website
            </a>
          </div>
        </div>
      </section>

      {/* What I write about */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">What I Write About</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Agentic AI Architectures', desc: 'Multi-agent systems, orchestration patterns, and production-grade agentic pipelines.' },
            { title: 'LLM Engineering', desc: 'Prompt engineering, fine-tuning, chain-of-thought, and evaluation strategies.' },
            { title: 'RAG Systems', desc: 'Retrieval-augmented generation, vector databases, hybrid search, and re-ranking.' },
            { title: 'Azure AI Platform', desc: 'Azure OpenAI, AI Search, AI Foundry, and enterprise-scale ML deployments.' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-xl border border-slate-800 bg-surface-800/40">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Skills & Stack</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <h3 className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-surface-700 border border-slate-700 text-slate-300 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Articles Published', value: posts.length.toString() },
            { label: 'Topics Covered', value: String(new Set(posts.flatMap((p) => p.tags)).size) },
            // { label: 'Years in AI', value: '5+' },
          ].map((s) => (
            <div key={s.label} className="text-center p-6 rounded-xl border border-slate-800 bg-surface-800/30">
              <div className="text-3xl font-bold gradient-text mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-brand-800 bg-gradient-to-br from-brand-950/60 to-accent-600/10 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Read My Articles</h2>
        <p className="text-slate-400 mb-6">Practical, technical deep dives into AI systems and engineering.</p>
        <Link href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors">
          Browse Articles <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
