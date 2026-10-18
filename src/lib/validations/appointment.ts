import { z } from 'zod';

// Turkish phone regex: matches +90 5XX XXX XX XX, 05XX..., or 5XX...
const phoneRegex = /^(\+90|0)?\s*[1-9]\d{2}\s*\d{3}\s*\d{2}\s*\d{2}$/;

export const appointmentFormSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Ad soyad en az 3 karakter olmalıdır.')
    .max(80, 'Ad soyad en fazla 80 karakter olabilir.')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad soyad yalnızca harflerden oluşmalıdır.'),
  phone: z
    .string()
    .min(10, 'Geçerli bir telefon numarası giriniz.')
    .regex(phoneRegex, 'Lütfen geçerli bir telefon numarası giriniz (örn: 05XX XXX XX XX).'),
  email: z
    .string()
    .email('Lütfen geçerli bir e-posta adresi giriniz.')
    .max(100, 'E-posta adresi çok uzun.'),
  target: z
    .string()
    .min(10, 'Lütfen hedefinizi veya sorunuzu en az 10 karakterle kısaca açıklayınız.')
    .max(500, 'Hedef açıklaması en fazla 500 karakter olabilir.'),
  kvkkConsent: z
    .boolean()
    .refine((val) => val === true, 'Randevu talebi oluşturabilmek için KVKK aydınlatma metnini onaylamanız gerekmektedir.'),
  // Honeypot field for anti-bot protection (must remain empty)
  website_url: z.string().max(0, 'Spam tespiti yapıldı.').optional().or(z.literal('')),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;
