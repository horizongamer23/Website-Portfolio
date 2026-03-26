/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import CaseStudies from "./components/CaseStudies";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Blog from "./components/Blog";
import SEO from "./components/SEO";
import { useState, useEffect } from "react";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [view, setView] = useState<'home' | 'blog' | 'services' | 'contact'>('home');

  // Handle hash changes for navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#blog') {
        setView('blog');
      } else if (hash === '#services') {
        setView('services');
      } else if (hash === '#contact') {
        setView('contact');
      } else {
        setView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen">
      {view === 'home' && (
        <SEO 
          title="Social Media Marketing Agency for Business Growth | Website Development & Branding Services | Growth Grid Media" 
          description="Grow your business with social media marketing, content creation, website development, and branding services. Increase reach, engagement, and generate high-quality leads consistently."
        />
      )}
      {view === 'blog' && (
        <SEO 
          title="Blog | Digital Marketing Insights & Growth Strategies | Growth Grid Media" 
          description="Read our latest blog posts on digital marketing, social media growth, and website development strategies to scale your business."
        />
      )}
      {view === 'services' && (
        <SEO 
          title="Digital Marketing Services | Social Media, Web Dev & SEO | Growth Grid Media" 
          description="Explore our full range of digital marketing services including social media management, high-converting website development, and expert SEO optimization."
        />
      )}
      {view === 'contact' && (
        <SEO 
          title="Contact Us for Digital Marketing & Website Services | Start Growing Your Business Today | Growth Grid Media" 
          description="Get in touch for expert social media marketing, website development, and branding services. Let’s build your online presence and drive real business growth."
        />
      )}
      <Navbar onLogoClick={() => setIsAdminOpen(true)} />
      <main>
        {view !== 'blog' ? (
          <>
            <Hero />
            <About />
            <Services />
            <Process />
            <Portfolio />
            <CaseStudies />
            <Pricing />
            <Testimonials />
            <FAQ />
            <Contact />
          </>
        ) : (
          <Blog onBack={() => {
            window.location.hash = '';
            setView('home');
          }} />
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
