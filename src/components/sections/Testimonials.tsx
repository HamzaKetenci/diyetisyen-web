'use client';

import { Quote, User } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  // If there are no approved testimonials, hide the entire section per specification
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="yorumlar"
      aria-labelledby="testimonials-heading"
      className="py-20 sm:py-28 bg-white border-t border-neutral-200/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Danışan Deneyimleri
            </span>
            <h2
              id="testimonials-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
            >
              Birlikte Başaranlar
            </h2>
            <p className="text-neutral-700 text-base leading-relaxed font-body">
              Danışanlarımızın kendi deneyimleriyle paylaştıkları geri bildirimler.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                hoverable
                className="relative bg-neutral-50/70 border border-neutral-200/70 p-6 sm:p-8 flex flex-col justify-between"
              >
                {/* Decorative quote icon */}
                <Quote
                  aria-hidden="true"
                  className="w-10 h-10 text-primary/15 absolute top-6 right-6 pointer-events-none"
                />

                <CardContent className="p-0 space-y-4">
                  <p className="text-neutral-700 text-base leading-relaxed italic font-body">
                    &ldquo;{testimonial.feedback}&rdquo;
                  </p>
                </CardContent>

                <div className="pt-6 mt-6 border-t border-neutral-200/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 font-body">
                      {testimonial.clientName}
                    </h3>
                    <p className="text-xs text-neutral-700">
                      {testimonial.serviceCategory}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
