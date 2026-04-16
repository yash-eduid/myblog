import type { MDXComponents } from 'mdx/types';
import { isValidElement } from 'react';
import MermaidDiagram from './MermaidDiagram';
import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

const CALLOUT_ICONS: Record<CalloutType, React.ComponentType<{ className?: string }>> = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  danger: AlertCircle,
};

export function Callout({ type = 'info', children }: { type?: CalloutType; children: React.ReactNode }) {
  const Icon = CALLOUT_ICONS[type];
  return (
    <div className={`callout callout-${type} not-prose`}>
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function toText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map((item) => toText(item)).join('\n');
  if (isValidElement(node)) return toText((node.props as { children?: React.ReactNode }).children);
  return '';
}

export function Mermaid({ children }: { children: React.ReactNode }) {
  const chart = toText(children)
    .replace(/\r\n/g, '\n')
    // Ensure edges don't get concatenated when MDX splits children into multiple nodes.
    .replace(/([\]\)])([A-Za-z0-9_]+\s*-->)/g, '$1\n$2')
    // MDX can collapse whitespace between text nodes, which breaks Mermaid style lines.
    // Handle both `]style`/`)style` and plain node-id joins like `REPstyle`.
    .replace(/([A-Za-z0-9_\]\)])\s*style\s+/g, '$1\nstyle ')
    .trim();
  return <MermaidDiagram chart={chart} />;
}

export const mdxComponents: MDXComponents = {
  // Custom components available in MDX
  Callout,
  Mermaid,

  // Render pre blocks directly to avoid client-boundary serialization issues in Next 16.
  pre: ({ children, ...props }: React.ComponentProps<'pre'> & { 'data-language'?: string; raw?: string }) => {
    return <pre {...props}>{children}</pre>;
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
