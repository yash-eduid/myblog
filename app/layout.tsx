import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://niteenbadgujar.me'),
  title: {
    default: 'Niteen Badgujar — AI & Agentic Systems',
    template: '%s | Niteen Badgujar',
  },
  description:
    'Deep dives into AI, Agentic AI, LLMs, and production-grade machine learning systems by Niteen Badgujar.',
  keywords: ['AI', 'Agentic AI', 'LLM', 'Machine Learning', 'Azure', 'RAG', 'Claude', 'GPT'],
  authors: [{ name: 'Niteen Badgujar', url: 'https://niteenbadgujar.me' }],
  creator: 'Niteen Badgujar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://niteenbadgujar.me',
    siteName: 'Niteen Badgujar',
    title: 'Niteen Badgujar — AI & Agentic Systems',
    description: 'Deep dives into AI, Agentic AI, LLMs, and production-grade machine learning systems.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@niteenbadgujar',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        <div className="ambient-glow fixed inset-0 pointer-events-none z-0" />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
