'use client';

import Link from 'next/link';
import {
  UserCheck,
  Laptop,
  Scale,
  HeartHandshake,
  Activity,
  ShieldAlert,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Service } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

function renderServiceIcon(name: string) {
  const iconProps = { className: 'w-6 h-6 text-primary' };
  switch (name) {
    case 'UserCheck':
      return <UserCheck {...iconProps} />;
    case 'Laptop':
      return <Laptop {...iconProps} />;
    case 'Scale':
      return <Scale {...iconProps} />;
    case 'HeartHandshake':
      return <HeartHandshake {...iconProps} />;
    case 'Activity':
      return <Activity {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    default:
      return <UserCheck {...iconProps} />;
  }
}

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  return (
    <section
      id="hizmetler"
      aria-labelledby="services-heading"
      className="py-20 sm:py-28 bg-neutral-100/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Uzmanlık Alanları
            </span>
            <h2
              id="services-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
            >
              İhtiyacınıza Özel Beslenme Çözümleri
            </h2>
            <p className="text-neutral-700 text-base leading-relaxed font-body">
              Hedefleriniz, sağlık durumunuz ve yaşam tarzınız doğrultusunda şekillendirilen
              kapsamlı danışmanlık hizmetleri.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                hoverable
                className="flex flex-col h-full bg-white border border-neutral-200/70"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {renderServiceIcon(service.iconName)}
                  </div>
                  <CardTitle className="text-xl text-neutral-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-neutral-700 leading-relaxed font-body">
                    {service.shortDescription}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-700">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 border-t border-neutral-100">
                  <Link
                    href="#iletisim"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1"
                  >
                    <span>Bilgi ve Randevu Al</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
