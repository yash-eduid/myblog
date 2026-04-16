'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/blog', label: 'Articles' },
  { href: '/tags', label: 'Topics' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-surface-900/80 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20'
        : 'bg-transparent'
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-md shadow-brand-900/50 group-hover:shadow-brand-700/50 transition-shadow">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">
            Niteen <span className="text-brand-400">Badgujar</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname.startsWith(link.href)
                  ? 'bg-brand-950/60 text-brand-300'
                  : 'text-slate-400 hover:text-white hover:bg-surface-700/60'
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/imniteen"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-brand-700 hover:text-brand-300 text-sm font-medium transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-700 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-slate-800 bg-surface-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(link.href)
                    ? 'bg-brand-950/60 text-brand-300'
                    : 'text-slate-300 hover:text-white hover:bg-surface-700'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/imniteen"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-surface-700 transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
