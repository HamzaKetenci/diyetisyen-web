// Animation durations (seconds — for Framer Motion)
export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

// Easing curves
export const EASING = {
  default: [0.25, 0.1, 0.25, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
} as const;

// Stagger delay between children (seconds)
export const STAGGER_DELAY = 0.07;

// Card hover translateY value
export const CARD_HOVER_Y = -4;

// Page transition duration (ms) — for CSS
export const PAGE_TRANSITION_MS = 250;

// Section IDs for navigation
export const SECTION_IDS = {
  hero: 'hero',
  about: 'hakkimda',
  services: 'hizmetler',
  process: 'surec',
  blog: 'blog',
  testimonials: 'yorumlar',
  faq: 'sss',
  contact: 'iletisim',
} as const;

// Navigation items
export const NAV_ITEMS = [
  { label: 'Hakkımda', href: `#${SECTION_IDS.about}` },
  { label: 'Hizmetler', href: `#${SECTION_IDS.services}` },
  { label: 'Süreç', href: `#${SECTION_IDS.process}` },
  { label: 'Blog', href: '/blog' },
  { label: 'SSS', href: `#${SECTION_IDS.faq}` },
  { label: 'İletişim', href: `#${SECTION_IDS.contact}` },
] as const;

// Process steps
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'İlk Görüşme',
    description: 'Beslenme alışkanlıklarınızı, sağlık durumunuzu ve hedeflerinizi birlikte değerlendiriyoruz.',
  },
  {
    step: 2,
    title: 'Kişisel Plan',
    description: 'Yaşam tarzınıza uygun, uygulanabilir bir beslenme programı hazırlıyorum.',
  },
  {
    step: 3,
    title: 'Uygulama & Takip',
    description: 'Düzenli kontroller ile sürecinizi birlikte takip ediyor, gerekli ayarlamaları yapıyoruz.',
  },
  {
    step: 4,
    title: 'Hedef Değerlendirme',
    description: 'Geldiğiniz noktayı değerlendiriyor, sürdürülebilir alışkanlıklarınızı güçlendiriyoruz.',
  },
] as const;
