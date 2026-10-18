import {
  Service,
  FaqItem,
  BlogPost,
  Testimonial,
  AppointmentRequest,
  AppointmentStatus,
} from '@/lib/types';
import {
  mockServices,
  mockFaqs,
  mockBlogPosts,
  mockTestimonials,
  mockAppointmentRequests,
} from './mock-data';

/**
 * Data Access Layer (DAL)
 *
 * This layer abstracts all data operations behind a clean, unified async interface.
 * In this prototype phase, it reads from in-memory / mock data.
 * When migrating to a real backend (e.g. Supabase, PostgreSQL, Headless CMS):
 * Only the implementations inside this file need to be replaced with DB client calls.
 */

// ==========================================
// SERVICES
// ==========================================

export async function getServices(): Promise<Service[]> {
  // Simulates quick DB fetch or reads from static mock
  return mockServices
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);
}

export async function getAllServices(): Promise<Service[]> {
  return [...mockServices].sort((a, b) => a.order - b.order);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const service = mockServices.find((s) => s.id === id);
  return service || null;
}

// ==========================================
// FAQS
// ==========================================

export async function getFaqs(): Promise<FaqItem[]> {
  return mockFaqs
    .filter((f) => f.isActive)
    .sort((a, b) => a.order - b.order);
}

export async function getAllFaqs(): Promise<FaqItem[]> {
  return [...mockFaqs].sort((a, b) => a.order - b.order);
}

// ==========================================
// BLOG POSTS
// ==========================================

export async function getBlogPosts(): Promise<BlogPost[]> {
  return mockBlogPosts
    .filter((p) => p.isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return [...mockBlogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = mockBlogPosts.find((p) => p.slug === slug && p.isPublished);
  return post || null;
}

// ==========================================
// TESTIMONIALS
// ==========================================

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  return mockTestimonials.filter((t) => t.isApproved);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return [...mockTestimonials];
}

// ==========================================
// APPOINTMENT REQUESTS
// ==========================================

export async function getAppointmentRequests(): Promise<AppointmentRequest[]> {
  return [...mockAppointmentRequests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createAppointmentRequest(
  data: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>
): Promise<AppointmentRequest> {
  // Simulate network latency (400ms)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const newRequest: AppointmentRequest = {
    ...data,
    id: `req-${Date.now()}`,
    status: 'yeni',
    createdAt: new Date().toISOString(),
  };

  // In prototype mode: we simulate success. (In real DB: insert into supabase table)
  return newRequest;
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  note?: string
): Promise<AppointmentRequest | null> {
  const request = mockAppointmentRequests.find((r) => r.id === id);
  if (!request) return null;

  request.status = status;
  if (note !== undefined) {
    request.note = note;
  }
  return { ...request };
}
