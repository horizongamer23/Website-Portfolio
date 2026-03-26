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
import { useState, useEffect } from "react";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [view, setView] = useState<'home' | 'blog'>('home');

  // Handle hash changes for blog navigation
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#blog') {
        setView('blog');
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
      <Navbar onLogoClick={() => setIsAdminOpen(true)} />
      <main>
        {view === 'home' ? (
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
