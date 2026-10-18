'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { NAV_ITEMS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-neutral-50/95 backdrop-blur-md shadow-sm border-b border-neutral-200/50 py-3'
          : 'bg-neutral-50/80 backdrop-blur-sm py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Text Logo */}
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 -m-1"
        >
          <span className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-primary transition-colors">
            {siteConfig.name}
          </span>
          <span className="text-xs font-medium text-neutral-500 tracking-wide">
            Beslenme ve Diyet Danışmanlığı
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Ana Menü">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#iletisim">
            <Button variant="primary" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
              Randevu Al
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          aria-controls="mobile-navigation"
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-[65px] bg-neutral-900/40 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-neutral-50 border-b border-neutral-200 px-6 py-6 shadow-xl space-y-4 max-h-[calc(100vh-65px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobil Menü">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-3 rounded-xl text-base font-medium text-neutral-800 hover:bg-neutral-100 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] flex items-center"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-neutral-200">
              <Link
                href="#iletisim"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block"
              >
                <Button variant="primary" fullWidth size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                  Randevu Al
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
