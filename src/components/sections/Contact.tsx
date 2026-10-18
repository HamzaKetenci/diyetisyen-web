'use client';

import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { AppointmentForm } from '@/components/forms/AppointmentForm';

export function Contact() {
  return (
    <section
      id="iletisim"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 bg-white border-t border-neutral-200/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              İletişim & Randevu
            </span>
            <h2
              id="contact-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
            >
              Sağlıklı Geleceğiniz İçin İlk Adımı Atın
            </h2>
            <p className="text-neutral-700 text-base leading-relaxed font-body">
              Sorularınız için bize ulaşabilir veya randevu talebi formunu doldurarak
              danışmanlık sürecinizi hemen başlatabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Contact Information & Working Hours Card */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-neutral-50/80 border border-neutral-200/70 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900">
                    İletişim Bilgileri
                  </h3>
                  <p className="text-sm text-neutral-700 mt-1">
                    Kliniğimiz veya online seanslar hakkında bilgi almak için arayabilirsiniz.
                  </p>
                </div>

                <ul className="space-y-4 text-sm text-neutral-700">
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-neutral-900">Adres</span>
                      <span>{siteConfig.address}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-neutral-900">Telefon</span>
                      <a
                        href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-neutral-900">E-posta</span>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3 pt-2 border-t border-neutral-200/70">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-neutral-900">Çalışma Saatleri</span>
                      <div className="text-xs text-neutral-700 space-y-0.5 mt-0.5">
                        <p>Hafta İçi: {siteConfig.workingHours.weekdays}</p>
                        <p>Cumartesi: {siteConfig.workingHours.saturday}</p>
                        <p className="text-neutral-700">Pazar: {siteConfig.workingHours.sunday}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Trust Callout */}
              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/15 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Kişisel verileriniz ve sağlık bilgileriniz KVKK mevzuatına tam uyumlu olarak gizlilik ve güvenlik içerisinde korunur.
                </p>
              </div>
            </div>

            {/* Interactive Appointment Form */}
            <div id="randevu-form-container" className="lg:col-span-7">
              <Card className="bg-white border border-neutral-200/70 p-6 sm:p-8 shadow-card">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">
                      Randevu & Bilgi Talebi
                    </h3>
                    <p className="text-sm text-neutral-700 mt-1">
                      Aşağıdaki formu doldurduğunuzda, en kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                  </div>

                  {/* Real interactive form */}
                  <AppointmentForm />
                </div>
              </Card>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
