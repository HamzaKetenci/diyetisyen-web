import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { NAV_ITEMS } from '@/lib/constants';

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-neutral-900 text-neutral-100 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
              {siteConfig.name}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {siteConfig.about.shortBio}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram sayfamızı ziyaret edin"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube kanalımızı ziyaret edin"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white tracking-wide font-body">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light rounded py-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/kvkk"
                  className="hover:text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light rounded py-0.5 inline-block"
                >
                  KVKK Aydınlatma Metni
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white tracking-wide font-body">
              Çalışma Saatleri
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-400 text-xs">Hafta İçi:</span>
                  <span>{siteConfig.workingHours.weekdays}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-400 text-xs">Cumartesi:</span>
                  <span>{siteConfig.workingHours.saturday}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-400 text-xs">Pazar:</span>
                  <span>{siteConfig.workingHours.sunday}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white tracking-wide font-body">
              İletişim
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-light shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light rounded"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-light shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light rounded"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            &copy; {currentYear} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-center md:text-right max-w-xl text-neutral-400">
            Yasal Uyarı: Bu internet sitesinde yer alan tüm yazılar ve içerikler yalnızca bilgilendirme amaçlıdır.
            Herhangi bir tıbbi teşhis, tedavi veya tıbbi tavsiye yerine geçmez.
          </p>
        </div>
      </div>
    </footer>
  );
}
