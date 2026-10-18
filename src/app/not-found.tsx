import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Code & Graphic */}
        <div className="space-y-2">
          <span className="font-heading text-7xl sm:text-8xl font-bold text-primary/30 tracking-tight">
            404
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Sayfa Bulunamadı
          </h1>
        </div>

        <p className="text-neutral-700 text-base leading-relaxed font-body">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          Ana sayfaya dönerek dilediğiniz bilgiye kolayca ulaşabilirsiniz.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" fullWidth leftIcon={<Home className="w-4 h-4" />}>
              Ana Sayfaya Dön
            </Button>
          </Link>
          <Link href="/blog" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" fullWidth leftIcon={<Search className="w-4 h-4" />}>
              Blog Yazılarını İncele
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
