'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const previewPosts = posts.slice(0, 3);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-20 sm:py-28 bg-neutral-100/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                Faydalı Bilgiler & Tarifler
              </span>
              <h2
                id="blog-heading"
                className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
              >
                Sağlıklı Yaşam Köşesi
              </h2>
              <p className="text-neutral-700 text-base leading-relaxed font-body">
                Doğru beslenme alışkanlıkları, pratik tarifler ve güncel beslenme bilgileri.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
            >
              <span>Tüm Yazıları Gör</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {previewPosts.map((post) => (
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
                      {post.readingTimeMinutes} dk okuma
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
                    <span>Oku</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
