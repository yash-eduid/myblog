'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-800/50 bg-gradient-to-br from-brand-950/60 via-surface-800/60 to-accent-950/40 p-8 sm:p-12 text-center">
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 to-accent-600/5" />
      <div className="relative">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-900/60 border border-brand-800 mb-6">
          <Mail className="w-6 h-6 text-brand-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Stay in the Loop</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Get notified when new articles on AI, Agentic systems, and LLMs drop. No spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-900/40 border border-emerald-700 text-emerald-300 font-medium">
            <Check className="w-5 h-5" /> You're on the list — thanks!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-surface-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors whitespace-nowrap"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
