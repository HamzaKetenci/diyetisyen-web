'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import { appointmentFormSchema, type AppointmentFormData } from '@/lib/validations/appointment';
import { submitAppointmentRequest } from '@/app/actions/appointment';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    target: '',
    kvkkConsent: false,
    website_url: '', // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (generalError) setGeneralError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError(null);

    // Client-side Zod validation
    const validationResult = appointmentFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await submitAppointmentRequest(formData);

      if (response.success) {
        setIsSuccess(true);
      } else {
        setGeneralError(response.message);
        if (response.errors) {
          const serverFieldErrors: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(response.errors)) {
            if (msgs && msgs[0]) serverFieldErrors[key] = msgs[0];
          }
          setErrors(serverFieldErrors);
        }
      }
    } catch {
      setGeneralError('Bağlantı sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      target: '',
      kvkkConsent: false,
      website_url: '',
    });
    setErrors({});
    setIsSuccess(false);
    setGeneralError(null);
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 sm:p-10 rounded-2xl bg-neutral-50 border border-success/30 text-center space-y-5 animate-fade-in"
      >
        <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-bold text-neutral-900">
            Talebiniz Alındı!
          </h3>
          <p className="text-neutral-700 text-base max-w-md mx-auto font-body">
            Talebiniz alındı, en kısa sürede dönüş yapacağız. Sağlıklı günlerde görüşmek dileğiyle.
          </p>
        </div>

        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Yeni Randevu Talebi Oluştur
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* General error banner */}
      {generalError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3 text-sm text-error"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Honeypot field (hidden from screen-readers and visual users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Lütfen bu alanı boş bırakınız</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_url}
          onChange={handleChange}
        />
      </div>

      {/* Name and Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="fullName"
          name="fullName"
          label="Ad Soyad"
          placeholder="Örn: Ayşe Yılmaz"
          required
          disabled={isSubmitting}
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Telefon Numarası"
          placeholder="05XX XXX XX XX"
          required
          disabled={isSubmitting}
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
      </div>

      {/* Email Address */}
      <Input
        id="email"
        name="email"
        type="email"
        label="E-posta Adresi"
        placeholder="ornek@eposta.com"
        required
        disabled={isSubmitting}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      {/* Goal / Target */}
      <Textarea
        id="target"
        name="target"
        label="Hedefiniz veya Danışmanlık Konusu"
        placeholder="Örn: Kilo yönetimi, online görüşme veya gebelik beslenmesi hakkında bilgi ve randevu almak istiyorum..."
        rows={3}
        required
        disabled={isSubmitting}
        value={formData.target}
        onChange={handleChange}
        error={errors.target}
      />

      {/* KVKK Consent Checkbox */}
      <div className="space-y-1.5 pt-1">
        <label
          htmlFor="kvkkConsent"
          className="flex items-start gap-3 cursor-pointer group text-xs sm:text-sm text-neutral-700"
        >
          <input
            id="kvkkConsent"
            name="kvkkConsent"
            type="checkbox"
            required
            disabled={isSubmitting}
            checked={formData.kvkkConsent}
            onChange={handleChange}
            aria-invalid={Boolean(errors.kvkkConsent)}
            aria-describedby={errors.kvkkConsent ? 'kvkkConsent-error' : undefined}
            className="w-5 h-5 mt-0.5 rounded-md border-neutral-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer shrink-0"
          />
          <span className="leading-relaxed">
            <Link
              href="/kvkk"
              target="_blank"
              className="text-primary font-medium underline hover:text-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum, kişisel verilerimin bu kapsamda işlenmesini onaylıyorum.
          </span>
        </label>

        {errors.kvkkConsent && (
          <p id="kvkkConsent-error" role="alert" className="text-xs font-medium text-error pl-8">
            {errors.kvkkConsent}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          loadingText="Gönderiliyor..."
          leftIcon={<Calendar className="w-5 h-5" />}
        >
          Randevu Talebi Gönder
        </Button>
        <p className="text-[11px] text-center text-neutral-700 mt-2">
          Talebiniz bize ulaştıktan sonra 24 saat içinde dönüş sağlanır.
        </p>
      </div>
    </form>
  );
}
