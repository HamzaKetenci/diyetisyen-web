import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Blog & Beslenme Rehberi',
  description: 'Uzman diyetisyen rehberliğinde sağlıklı beslenme önerileri, sürdürülebilir yaşam ipuçları ve pratik tarifler.',
};

export default async function BlogListPage() {
  const publishedPosts = await getBlogPosts();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 min-h-screen bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb & Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>

          {/* Page Heading */}
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Beslenme & Yaşam
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight">
              Blog ve Tarif Yazıları
            </h1>
            <p className="text-neutral-700 text-base leading-relaxed font-body">
              Bilimsel kanıtlara dayalı beslenme rehberleri, doğru bilinen yanlışlar ve mutfağınızda kolayca uygulayabileceğiniz sağlıklı tarifler.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <Card
                key={post.id}
                hoverable
                className="flex flex-col h-full bg-white border border-neutral-200/70 overflow-hidden"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-700">
                    <Badge variant="info">{post.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTimeMinutes} dk
                    </span>
                  </div>

                  <CardTitle className="text-xl text-neutral-900 leading-snug line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-neutral-700 line-clamp-3 leading-relaxed font-body">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-700">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>Yazıyı Oku</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
