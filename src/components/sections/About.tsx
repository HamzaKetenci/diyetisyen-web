'use client';

import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Award, BookOpen, Heart } from 'lucide-react';

export function About() {
  return (
    <section
      id="hakkimda"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28 bg-white border-t border-neutral-200/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual / Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Decorative background shape */}
                <div
                  aria-hidden="true"
                  className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-neutral-100 border border-neutral-200/60 -z-10"
                />
                <div className="bg-gradient-to-br from-primary/10 via-neutral-50 to-neutral-100 rounded-3xl p-8 border border-neutral-200/60 shadow-card text-center space-y-5">
                  {/* Portrait Real Image */}
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                      src="/images/dietitian-portrait.jpg"
                      alt={`${siteConfig.name} - Uzman Diyetisyen`}
                      fill
                      sizes="160px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">
                      {siteConfig.name}
                    </h3>
                    <p className="text-sm font-medium text-primary mt-1">
                      Uzman Diyetisyen & Beslenme Danışmanı
                    </p>
                    <p className="text-xs text-neutral-700 mt-0.5">
                      {siteConfig.city}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-2 gap-3 text-left">
                    <div className="p-3 rounded-xl bg-white border border-neutral-200/50">
                      <span className="block text-xs text-neutral-700">Yaklaşım</span>
                      <span className="text-sm font-semibold text-neutral-900">Sürdürülebilir</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-neutral-200/50">
                      <span className="block text-xs text-neutral-700">Hizmet Modeli</span>
                      <span className="text-sm font-semibold text-neutral-900">Birebir Takip</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography & Approach Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                  Hakkımda & Yaklaşımım
                </span>
                <h2
                  id="about-heading"
                  className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
                >
                  Sağlıklı beslenme, kendinize gösterdiğiniz en güzel özendir.
                </h2>
              </div>

              <div className="space-y-4 text-neutral-700 text-base leading-relaxed font-body">
                {siteConfig.about.fullBio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Core Philosophy Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Lisans & Uzmanlık</h4>
                    <p className="text-xs text-neutral-700 mt-1">
                      Beslenme ve Diyetetik Lisans & Sürekli Eğitim
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Empati Odaklı</h4>
                    <p className="text-xs text-neutral-700 mt-1">
                      Yargılamayan, dinleyen ve anlayan iletişim
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Mesleki Gelişim</h4>
                    <p className="text-xs text-neutral-700 mt-1">
                      Güncel klinik yaklaşımlar ve bilimsel seminerler
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
