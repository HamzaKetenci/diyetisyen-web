'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { heroStaggerVariants, heroItemVariants } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-neutral-100/60 via-neutral-50 to-neutral-50"
    >
      {/* Decorative subtle background elements */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {prefersReducedMotion ? (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>{siteConfig.city} & Online Beslenme Danışmanlığı</span>
            </div>

            <h1
              id="hero-heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.15]"
            >
              Yasaklarla değil, sürdürülebilir alışkanlıklarla sağlıklı yaşama adım atın.
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-700 leading-relaxed font-body">
              {siteConfig.about.shortBio} Yaşam tarzınıza, damak tadınıza ve hedeflerinize uygun,
              bilimsel temelli kişiye özel beslenme rehberliği.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="#iletisim" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" fullWidth leftIcon={<Calendar className="w-5 h-5" />}>
                  Randevu Talebi Oluştur
                </Button>
              </Link>
              <Link href="#hizmetler" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Hizmetleri İncele
                </Button>
              </Link>
            </div>

            {/* Micro value props */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-neutral-700">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Kişiye Özel Beslenme Planı
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Bilimsel & Kanıta Dayalı
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Düzenli Birebir Takip
              </span>
            </div>

            {/* Showcase Image */}
            <div className="pt-8 max-w-2xl mx-auto">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-card-hover border border-neutral-200/80">
                <Image
                  src="/images/hero-nutrition.jpg"
                  alt="Dengeli ve renkli sağlıklı beslenme tabağı"
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            variants={heroStaggerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge pill */}
            <motion.div variants={heroItemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{siteConfig.city} & Online Beslenme Danışmanlığı</span>
              </div>
            </motion.div>

            {/* Main Value Proposition (Heading) */}
            <motion.h1
              id="hero-heading"
              variants={heroItemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.15]"
            >
              Yasaklarla değil, sürdürülebilir alışkanlıklarla sağlıklı yaşama adım atın.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={heroItemVariants}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-700 leading-relaxed font-body"
            >
              {siteConfig.about.shortBio} Yaşam tarzınıza, damak tadınıza ve hedeflerinize uygun,
              bilimsel temelli kişiye özel beslenme rehberliği.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <Link href="#iletisim" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" fullWidth leftIcon={<Calendar className="w-5 h-5" />}>
                  Randevu Talebi Oluştur
                </Button>
              </Link>
              <Link href="#hizmetler" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Hizmetleri İncele
                </Button>
              </Link>
            </motion.div>

            {/* Micro value props */}
            <motion.div
              variants={heroItemVariants}
              className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-neutral-700"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Kişiye Özel Beslenme Planı
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Bilimsel & Kanıta Dayalı
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Düzenli Birebir Takip
              </span>
            </motion.div>

            {/* Showcase Image */}
            <motion.div variants={heroItemVariants} className="pt-8 max-w-2xl mx-auto">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-card-hover border border-neutral-200/80">
                <Image
                  src="/images/hero-nutrition.jpg"
                  alt="Dengeli ve renkli sağlıklı beslenme tabağı"
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
