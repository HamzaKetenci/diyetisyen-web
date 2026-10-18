export type AppointmentStatus = 'yeni' | 'arandi' | 'randevu_verildi' | 'iptal';

export interface AppointmentRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  target: string;
  kvkkConsent: boolean;
  status: AppointmentStatus;
  note?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  order: number;
  isActive: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingTimeMinutes: number;
  publishedAt: string;
  isPublished: boolean;
  coverImage?: string;
}

export interface Testimonial {
  id: string;
  clientName: string; // e.g. "Örnek Danışan 1"
  feedback: string;
  serviceCategory: string;
  isApproved: boolean;
  createdAt: string;
}
