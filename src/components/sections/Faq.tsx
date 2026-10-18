'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '@/lib/types';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface FaqProps {
  faqs: FaqItem[];
}

export function Faq({ faqs }: FaqProps) {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || 'faq-1']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="sss"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-28 bg-neutral-100/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Merak Edilenler
            </span>
            <h2
              id="faq-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
            >
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-neutral-700 text-base leading-relaxed font-body">
              Danışmanlık süreci, seanslar ve takipler hakkında en sık sorulan soruların yanıtları.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const contentId = `faq-content-${faq.id}`;
              const buttonId = `faq-button-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white border border-neutral-200/70 overflow-hidden transition-shadow duration-200 hover:shadow-card"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-body font-semibold text-neutral-900 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[56px]"
                    >
                      <span className="text-base sm:text-lg">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-700 leading-relaxed font-body border-t border-neutral-100"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
