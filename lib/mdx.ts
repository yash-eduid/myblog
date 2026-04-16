import { compileMDX as compileMDXRemote } from 'next-mdx-remote/rsc';
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

  const { content } = await compileMDXRemote({
    source,
    components: mdxComponents as Record<string, React.ComponentType>,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
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
      },
    },
  });

  return { content, toc };
}
