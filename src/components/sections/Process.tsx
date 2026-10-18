'use client';

import { PROCESS_STEPS } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren';
import { ClipboardList, UtensilsCrossed, LineChart, Trophy } from 'lucide-react';

const STEP_ICONS = [
  ClipboardList,
  UtensilsCrossed,
  LineChart,
  Trophy,
];

export function Process() {
  return (
    <section
      id="surec"
      aria-labelledby="process-heading"
      className="py-20 sm:py-28 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Birlikte Nasıl İlerliyoruz?
            </span>
            <h2
              id="process-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
            >
              Adım Adım Danışmanlık Süreci
            </h2>
            <p className="text-neutral-700 text-base leading-relaxed font-body">
              Karmaşık ve stresli süreçler yerine; şeffaf, motive edici ve tamamen
              ihtiyaçlarınıza göre şekillenen 4 temel adım.
            </p>
          </div>

          {/* Process Steps */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((item, index) => {
              const Icon = STEP_ICONS[index] || ClipboardList;
              return (
                <StaggerItem key={item.step} className="h-full">
                  <div className="relative p-6 sm:p-7 rounded-2xl bg-neutral-50 border border-neutral-200/60 h-full flex flex-col justify-between group hover:border-primary/30 transition-colors">
                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-heading text-3xl font-bold text-neutral-300 group-hover:text-primary-light transition-colors">
                        0{item.step}
                      </span>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 font-body">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-700 leading-relaxed font-body">
                        {item.description}
                      </p>
                    </div>

                    {/* Step Indicator Dot for Flow */}
                    <div className="mt-6 pt-4 border-t border-neutral-200/50 flex items-center gap-2 text-xs font-medium text-primary">
                      <span>Aşama {item.step} / 4</span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </ScrollReveal>
      </div>
    </section>
  );
}
