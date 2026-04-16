'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  language?: string;
  raw?: string;
}

export default function CodeBlock({ children, language, raw }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = raw || (typeof children === 'string' ? children : '');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper not-prose">
      <div className="code-block-header">
        <span className="code-block-lang">{language || 'code'}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" />Copy</>
          )}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
