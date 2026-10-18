import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { getBlogPosts, getPostBySlug } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [siteConfig.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 min-h-screen bg-neutral-50">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tüm Yazılara Dön</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-4 pb-8 border-b border-neutral-200">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="info">{post.category}</Badge>
              <span className="flex items-center gap-1.5 text-xs text-neutral-700">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTimeMinutes} dakika okuma süresi
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-700">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-neutral-700 leading-relaxed font-body">
              {post.excerpt}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-700">
              <span className="font-semibold text-neutral-900">
                Yazar: {siteConfig.name}
              </span>
            </div>
          </header>

          {/* Article Markdown Body */}
          <div className="py-10 prose prose-neutral max-w-none text-neutral-700 leading-relaxed font-body space-y-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 mt-8 mb-4 border-b border-neutral-200 pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-base sm:text-lg leading-relaxed text-neutral-700 mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-700">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-700">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-neutral-800 bg-primary/5 rounded-r-xl my-6">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-neutral-900">{children}</strong>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA Box at the bottom of article */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-neutral-100 to-neutral-50 border border-primary/20 text-center space-y-4">
            <h3 className="font-heading text-2xl font-bold text-neutral-900">
              Kişisel Beslenme Danışmanlığı Almak İster misiniz?
            </h3>
            <p className="text-neutral-700 text-sm max-w-lg mx-auto">
              Size özel beslenme programı ve birebir takip ile hedeflerinize sağlıklı bir şekilde ulaşın.
            </p>
            <div className="pt-2">
              <Link href="/#iletisim">
                <Button variant="primary" size="md">
                  Randevu Talebi Oluştur
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
