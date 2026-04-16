'use client';

import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, Maximize2 } from 'lucide-react';

interface Props { chart: string; }

export default function MermaidDiagram({ chart }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const svgHostRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

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
        if (!cancelled) {
          setSvg(rendered);
          setError('');
          setZoom(1);
        }
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    };
    render();
    return () => { cancelled = true; };
  }, [chart]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => setViewportWidth(viewport.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = svgHostRef.current;
    if (!host) return;

    const svgEl = host.querySelector('svg') as SVGSVGElement | null;
    if (!svgEl) return;

    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');

    let width = 0;
    let height = 0;

    if (svgEl.viewBox && svgEl.viewBox.baseVal && svgEl.viewBox.baseVal.width > 0) {
      width = svgEl.viewBox.baseVal.width;
      height = svgEl.viewBox.baseVal.height;
    }

    if ((!width || !height) && typeof svgEl.getBBox === 'function') {
      const box = svgEl.getBBox();
      if (box.width > 0 && box.height > 0) {
        width = box.width;
        height = box.height;
      }
    }

    if (!width || !height) {
      width = 960;
      height = 420;
    }

    setNaturalSize({ width, height });
  }, [svg]);

  const fitScale = naturalSize.width > 0 && viewportWidth > 0
    ? Math.max(0.65, Math.min(2.2, viewportWidth / naturalSize.width))
    : 1;
  const scale = Math.max(0.4, Math.min(4, fitScale * zoom));

  const zoomIn = () => setZoom((z) => Math.min(3, Number((z + 0.15).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(0.5, Number((z - 0.15).toFixed(2))));
  const resetZoom = () => setZoom(1);

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
    <div className="my-8 mermaid-wrapper not-prose">
      <div className="mermaid-toolbar" role="group" aria-label="Mermaid zoom controls">
        <button type="button" className="mermaid-zoom-btn" onClick={zoomOut} aria-label="Zoom out">
          <Minus className="h-4 w-4" />
        </button>
        <span className="mermaid-zoom-readout">{Math.round(scale * 100)}%</span>
        <button type="button" className="mermaid-zoom-btn" onClick={zoomIn} aria-label="Zoom in">
          <Plus className="h-4 w-4" />
        </button>
        <button type="button" className="mermaid-fit-btn" onClick={resetZoom} aria-label="Fit to screen">
          <Maximize2 className="h-3.5 w-3.5" /> Fit
        </button>
      </div>

      <div className="mermaid-viewport" ref={viewportRef}>
        <div
          className="mermaid-canvas"
          style={{
            width: naturalSize.width ? `${naturalSize.width * scale}px` : '100%',
            minHeight: naturalSize.height ? `${naturalSize.height * scale}px` : '220px',
          }}
        >
          <div
            ref={svgHostRef}
            className="mermaid-svg-host"
            style={{
              width: naturalSize.width ? `${naturalSize.width}px` : '100%',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
    </div>
  );
}
