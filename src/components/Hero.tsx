import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_HERO } from "../constants/siteDefaults";

export default function Hero() {
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    const loadData = () => {
      setHero(getStoredData(STORAGE_KEYS.HERO, DEFAULT_HERO));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="w-3.5 h-3.5" />
                Web Development Agency
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                {hero.title}
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <a
                  href="#contact"
                  className="w-full sm:w-auto bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-blue transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/10"
                >
                  {hero.ctaText}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#portfolio"
                  className="w-full sm:w-auto bg-white border border-gray-200 text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  View Our Work
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Conversion Focused
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Mobile Optimized
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  SEO Ready
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-black/5"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={hero.bgImage}
                alt="Modern Website Mockup"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 lg:-right-12 glass-card p-4 rounded-xl shadow-xl z-20 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Growth Rate</p>
                  <p className="text-lg font-bold">+142%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
