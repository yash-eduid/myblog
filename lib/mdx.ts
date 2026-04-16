import { evaluate } from '@mdx-js/mdx';
import React from 'react';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { extractToc } from './utils';
import { mdxComponents } from '@/components/MDXComponents';
import type { TocItem } from './types';

const prettyCodeOptions = {
  theme: 'github-dark-dimmed',
  keepBackground: true,
  onVisitLine(node: { children: { type: string }[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text' }] as { type: string }[];
    }
  },
  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: { properties: { className: string[] } }) {
    node.properties.className = ['word'];
  },
};

export async function compileMDX(source: string): Promise<{
  content: React.ReactNode;
  toc: TocItem[];
}> {
  const toc = extractToc(source);

  const evaluated = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: { className: ['anchor'] },
        },
      ],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  });

  const MDXContent = evaluated.default as React.ComponentType<{ components?: typeof mdxComponents }>;
  const content = React.createElement(MDXContent, { components: mdxComponents });

  return { content, toc };
}
