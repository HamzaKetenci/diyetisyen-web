import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AppointmentRequest,
  AppointmentStatus,
  Service,
  FaqItem,
  BlogPost,
  Testimonial,
} from '@/lib/types';
import {
  mockAppointmentRequests,
  mockServices,
  mockFaqs,
  mockBlogPosts,
  mockTestimonials,
} from '@/lib/data/mock-data';

interface AdminState {
  // Auth state
  isAuthenticated: boolean;
  adminName: string;
  login: () => void;
  logout: () => void;

  // Appointments
  appointments: AppointmentRequest[];
  addAppointment: (appointment: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateAppointmentNote: (id: string, note: string) => void;
  deleteAppointment: (id: string) => void;

  // Services
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  reorderServices: (services: Service[]) => void;

  // FAQs
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, faq: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  reorderFaqs: (faqs: FaqItem[]) => void;

  // Blog Posts
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => void;
  toggleTestimonialApproval: (id: string) => void;
  deleteTestimonial: (id: string) => void;

  // Reset to initial mock data
  resetAllData: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // Auth state
      isAuthenticated: true, // Default to true in prototype for seamless access, can be toggled via login/logout
      adminName: 'Dyt. Ayşe Örnek',
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),

      // Appointments
      appointments: mockAppointmentRequests,
      addAppointment: (newAppointment) =>
        set((state) => ({
          appointments: [
            {
              ...newAppointment,
              id: `req-${Date.now()}`,
              status: 'yeni',
              createdAt: new Date().toISOString(),
            },
            ...state.appointments,
          ],
        })),
      updateAppointmentStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        })),
      updateAppointmentNote: (id, note) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, note } : a
          ),
        })),
      deleteAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((a) => a.id !== id),
        })),

      // Services
      services: mockServices,
      addService: (newService) =>
        set((state) => ({
          services: [
            ...state.services,
            { ...newService, id: `srv-${Date.now()}` },
          ],
        })),
      updateService: (id, updated) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...updated } : s
          ),
        })),
      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),
      reorderServices: (services) => set({ services }),

      // FAQs
      faqs: mockFaqs,
      addFaq: (newFaq) =>
        set((state) => ({
          faqs: [...state.faqs, { ...newFaq, id: `faq-${Date.now()}` }],
        })),
      updateFaq: (id, updated) =>
        set((state) => ({
          faqs: state.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f)),
        })),
      deleteFaq: (id) =>
        set((state) => ({
          faqs: state.faqs.filter((f) => f.id !== id),
        })),
      reorderFaqs: (faqs) => set({ faqs }),

      // Blog Posts
      blogPosts: mockBlogPosts,
      addBlogPost: (newPost) =>
        set((state) => ({
          blogPosts: [
            { ...newPost, id: `post-${Date.now()}` },
            ...state.blogPosts,
          ],
        })),
      updateBlogPost: (id, updated) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        })),
      deleteBlogPost: (id) =>
        set((state) => ({
          blogPosts: state.blogPosts.filter((p) => p.id !== id),
        })),

      // Testimonials
      testimonials: mockTestimonials,
      addTestimonial: (newT) =>
        set((state) => ({
          testimonials: [
            ...state.testimonials,
            {
              ...newT,
              id: `t-${Date.now()}`,
              createdAt: new Date().toISOString().split('T')[0],
            },
          ],
        })),
      toggleTestimonialApproval: (id) =>
        set((state) => ({
          testimonials: state.testimonials.map((t) =>
            t.id === id ? { ...t, isApproved: !t.isApproved } : t
          ),
        })),
      deleteTestimonial: (id) =>
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        })),

      // Reset
      resetAllData: () =>
        set({
          appointments: mockAppointmentRequests,
          services: mockServices,
          faqs: mockFaqs,
          blogPosts: mockBlogPosts,
          testimonials: mockTestimonials,
        }),
    }),
    {
      name: 'diyetisyen_admin_store',
    }
  )
);
