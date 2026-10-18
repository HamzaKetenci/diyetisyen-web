'use server';

import { appointmentFormSchema, type AppointmentFormData } from '@/lib/validations/appointment';
import { createAppointmentRequest } from '@/lib/data';

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitAppointmentRequest(
  data: AppointmentFormData
): Promise<ActionResponse> {
  // Validate data on the server with Zod
  const validationResult = appointmentFormSchema.safeParse(data);

  if (!validationResult.success) {
    const formattedErrors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: 'Lütfen form alanlarını kontrol edip tekrar deneyiniz.',
      errors: formattedErrors as Record<string, string[]>,
    };
  }

  // Honeypot spam bot check: if website_url has any content, silently discard or reject
  if (data.website_url && data.website_url.trim().length > 0) {
    return {
      success: false,
      message: 'İşlem güvenlik nedeniyle reddedildi.',
    };
  }

  // Call Data Access Layer (DAL) to register the appointment request
  await createAppointmentRequest({
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    target: data.target,
    kvkkConsent: data.kvkkConsent,
  });

  // NOTE: STRICT PRIVACY RULE: Never log personal data (no console.log)
  // TODO: gerçek kalıcı veritabanı + e-posta entegrasyonu (Supabase & Resend)

  return {
    success: true,
    message: 'Talebiniz alındı, en kısa sürede dönüş yapacağız.',
  };
}
