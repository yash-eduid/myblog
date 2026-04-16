import Link from 'next/link';
import { Github, BookOpen } from 'lucide-react';

export default function AuthorCard() {
  return (
    <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-slate-800 bg-surface-800/40">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-900/40">
          NB
        </div>
      </div>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Written by</p>
        <h3 className="text-white font-bold text-lg mb-1">Niteen Badgujar</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          AI Engineer specializing in Agentic AI, LLMs, and production-grade machine learning systems on Azure.
          Writing to make complex AI concepts accessible and actionable.
        </p>
        <div className="flex items-center gap-3">
            <a href="https://github.com/imniteen" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-400 transition-colors">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="https://medium.com/@niteen.badgujar" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-400 transition-colors">
            <BookOpen className="w-4 h-4" /> Medium
          </a>
          <Link href="/about"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-400 transition-colors">
            More about me →
          </Link>
        </div>
      </div>
    </div>
  );
}
