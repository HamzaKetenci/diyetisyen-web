import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca hazırlanan bilgilendirme ve aydınlatma metni.',
};

export default function KvkkPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 min-h-screen bg-neutral-50">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-card space-y-8">
            {/* Header */}
            <div className="border-b border-neutral-200 pb-6 space-y-3">
              <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Yasal Bilgilendirme</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
              </h1>
              <p className="text-xs text-neutral-700">
                Son Güncelleme: 16 Ekim 2026
              </p>
            </div>

            {/* Document Body */}
            <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed font-body">
              <section className="space-y-2">
                <h2 className="font-heading text-xl font-bold text-neutral-900">
                  1. Veri Sorumlusunun Kimliği
                </h2>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, veri sorumlusu sıfatıyla
                  hareket eden <strong>{siteConfig.name}</strong> (&ldquo;Diyetisyen&rdquo;) olarak, danışanlarımızın ve web sitemizi
                  ziyaret eden kullanıcılarımızın kişisel verilerinin güvenliğine ve gizliliğine azami önem göstermekteyiz.
                </p>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                  <p><strong>Veri Sorumlusu Unvanı:</strong> [BİLGİ GEREKLİ — Şahıs/Klinik Unvanı]</p>
                  <p><strong>Vergi Dairesi & No:</strong> [BİLGİ GEREKLİ]</p>
                  <p><strong>Adres:</strong> {siteConfig.address}</p>
                  <p><strong>E-posta:</strong> {siteConfig.email}</p>
                  <p><strong>Telefon:</strong> {siteConfig.phone}</p>
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading text-xl font-bold text-neutral-900">
                  2. İşlenen Kişisel Veriler
                </h2>
                <p>
                  Web sitemizdeki randevu ve iletişim formları aracılığıyla veya danışmanlık hizmeti sürecinde aşağıdaki verileriniz işlenmektedir:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Kimlik Bilgileri:</strong> Ad, soyad.</li>
                  <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, ikamet şehri.</li>
                  <li><strong>Talep & Mesaj Bilgisi:</strong> Danışmanlık hedefiniz, form açıklama metniniz.</li>
                  <li><strong>Özel Nitelikli Kişisel Veriler (Danışmanlık Seanslarında):</strong> Açık rızanız doğrultusunda beslenme alışkanlıkları, sağlık öyküsü, tahlil parametreleri ve ölçüm verileri.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading text-xl font-bold text-neutral-900">
                  3. Kişisel Verilerin İşlenme Amaçları
                </h2>
                <p>
                  Kişisel verileriniz aşağıdaki amaçlarla KVKK&apos;nın 5. ve 6. maddelerinde belirtilen şartlara uygun olarak işlenir:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Randevu taleplerinizin alınması, değerlendirilmesi ve teyit edilmesi,</li>
                  <li>Bireysel veya online beslenme danışmanlığı süreçlerinin yürütülmesi,</li>
                  <li>İletişim taleplerinize geri dönüş sağlanması,</li>
                  <li>Yasal mevzuattan kaynaklanan kayıt ve bildirim yükümlülüklerinin yerine getirilmesi.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading text-xl font-bold text-neutral-900">
                  4. Kişisel Verilerin Aktarılması
                </h2>
                <p>
                  Kişisel verileriniz, mevzuatta öngörülen haller ve yetkili kamu kurum ve kuruluşlarının talepleri hariç olmak üzere, açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz ve ticari amaçlarla devredilmez.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading text-xl font-bold text-neutral-900">
                  5. KVKK Kapsamındaki Haklarınız
                </h2>
                <p>
                  KVKK&apos;nın 11. maddesi uyarınca veri sahibi olarak şu haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
                  <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                  <li>Verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                  <li>KVKK mevzuatına uygun olarak verilerin silinmesini veya yok edilmesini talep etme.</li>
                </ul>
                <p className="pt-2">
                  Haklarınıza ilişkin taleplerinizi yukarıda belirtilen iletişim adresimize yazılı olarak veya e-posta yoluyla iletebilirsiniz.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
