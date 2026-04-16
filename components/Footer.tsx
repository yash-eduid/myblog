import Link from 'next/link';
import { Github, BookOpen, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-surface-900/60 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white text-sm">Niteen Badgujar</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Writing about Agentic AI, LLMs, and production-grade ML systems.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-300 font-semibold text-sm mb-3">Navigate</h3>
            <ul className="space-y-2">
              {[
                { href: '/blog', label: 'All Articles' },
                { href: '/tags', label: 'Topics' },
                { href: '/about', label: 'About' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-500 hover:text-brand-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <h3 className="text-slate-300 font-semibold text-sm mb-3">Find me</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/yash-eduid" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 hover:text-brand-400 text-sm transition-colors">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://medium.com/@niteen.badgujar" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 hover:text-brand-400 text-sm transition-colors">
                  <BookOpen className="w-4 h-4" /> Medium
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Niteen Badgujar. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs">
            Built with Next.js · MDX · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
