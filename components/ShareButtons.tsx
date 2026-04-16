'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';

interface Props { url: string; title: string; }

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=niteenbadgujar`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-600 text-xs mr-1">Share:</span>
      <a href={tweet} target="_blank" rel="noopener noreferrer"
        className="p-1.5 rounded-lg text-slate-500 hover:text-brand-400 hover:bg-brand-950/40 transition-colors" title="Share on X">
        <Twitter className="w-4 h-4" />
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer"
        className="p-1.5 rounded-lg text-slate-500 hover:text-brand-400 hover:bg-brand-950/40 transition-colors" title="Share on LinkedIn">
        <Linkedin className="w-4 h-4" />
      </a>
      <button onClick={copy}
        className="p-1.5 rounded-lg text-slate-500 hover:text-brand-400 hover:bg-brand-950/40 transition-colors" title="Copy link">
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
