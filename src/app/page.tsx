import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import {
  getServices,
  getFaqs,
  getBlogPosts,
  getApprovedTestimonials,
} from '@/lib/data';

export default async function HomePage() {
  // Fetch all public section data through the Data Access Layer (DAL)
  const [services, faqs, posts, testimonials] = await Promise.all([
    getServices(),
    getFaqs(),
    getBlogPosts(),
    getApprovedTestimonials(),
  ]);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Services services={services} />
        <Process />
        <BlogPreview posts={posts} />
        <Testimonials testimonials={testimonials} />
        <Faq faqs={faqs} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
