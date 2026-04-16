'use client';

import { useEffect, useRef, useState } from 'react';

interface Props { chart: string; }

export default function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            background: '#0f1629',
            primaryColor: '#0d8ce0',
            primaryTextColor: '#e2e8f0',
            primaryBorderColor: '#1e2845',
            lineColor: '#4e6088',
            secondaryColor: '#151d38',
            tertiaryColor: '#1e2845',
            fontFamily: 'Inter, system-ui, sans-serif',
          },
          flowchart: { curve: 'basis', padding: 20 },
          sequence: { actorMargin: 50 },
        });
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    };
    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-800 bg-red-950/30 p-4">
        <p className="text-red-400 text-sm font-mono">Diagram error: {error}</p>
        <pre className="mt-2 text-xs text-red-300/70 overflow-x-auto">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 mermaid-wrapper animate-pulse">
        <div className="h-32 w-full rounded bg-slate-800/50" />
      </div>
    );
  }

  return (
    <div className="my-8 mermaid-wrapper not-prose" ref={ref}>
      <div dangerouslySetInnerHTML={{ __html: svg }} className="max-w-full" />
    </div>
  );
}
