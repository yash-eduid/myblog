import type { MDXComponents } from 'mdx/types';
import MermaidDiagram from './MermaidDiagram';
import CodeBlock from './CodeBlock';
import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

const CALLOUT_ICONS: Record<CalloutType, React.ReactNode> = {
  info: <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  warning: <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  tip: <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  danger: <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
};

export function Callout({ type = 'info', children }: { type?: CalloutType; children: React.ReactNode }) {
  return (
    <div className={`callout callout-${type} not-prose`}>
      {CALLOUT_ICONS[type]}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function Mermaid({ children }: { children: string }) {
  return <MermaidDiagram chart={children} />;
}

export const mdxComponents: MDXComponents = {
  // Custom components available in MDX
  Callout,
  Mermaid,

  // Override pre/code for syntax highlighting + copy button
  pre: ({ children, ...props }: React.ComponentProps<'pre'> & { 'data-language'?: string; raw?: string }) => {
    const language = props['data-language'];
    const raw = props.raw;
    return (
      <CodeBlock language={language} raw={raw}>
        <pre {...props}>{children}</pre>
      </CodeBlock>
    );
  },

  // Style headings with anchor links
  h1: ({ children, id }: React.ComponentProps<'h1'>) => (
    <h1 id={id} className="group flex items-center gap-2">
      {children}
      {id && (
        <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-brand-400 transition-opacity text-base font-normal">
          #
        </a>
      )}
    </h1>
  ),
  h2: ({ children, id }: React.ComponentProps<'h2'>) => (
    <h2 id={id} className="group flex items-center gap-2">
      {children}
      {id && (
        <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-brand-400 transition-opacity text-sm font-normal">
          #
        </a>
      )}
    </h2>
  ),
  h3: ({ children, id }: React.ComponentProps<'h3'>) => (
    <h3 id={id} className="group flex items-center gap-2">
      {children}
      {id && (
        <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-brand-400 transition-opacity text-xs font-normal">
          #
        </a>
      )}
    </h3>
  ),

  // Styled blockquote
  blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
    <blockquote className="relative pl-6 py-1 my-6 border-l-4 border-brand-500 text-slate-300 italic not-prose">
      <div className="absolute -left-0.5 top-0 h-full w-0.5 bg-gradient-to-b from-brand-400 to-accent-500 rounded" />
      <div className="prose-sm">{children}</div>
    </blockquote>
  ),

  // External links open in new tab
  a: ({ href, children, ...props }: React.ComponentProps<'a'>) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="text-brand-400 hover:text-brand-300 underline underline-offset-2 decoration-brand-700 hover:decoration-brand-500 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },
};
