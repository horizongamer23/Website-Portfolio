import { motion } from "motion/react";
import { Shield, TrendingUp, Target, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_ABOUT } from "../constants/siteDefaults";

export default function About() {
  const [about, setAbout] = useState(DEFAULT_ABOUT);

  useEffect(() => {
    const loadData = () => {
      setAbout(getStoredData(STORAGE_KEYS.ABOUT, DEFAULT_ABOUT));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://picsum.photos/seed/agency-team/800/800" 
                  alt="Growth Grid Media digital marketing team at work" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 bg-brand-blue text-white p-8 rounded-[40px] shadow-2xl shadow-brand-blue/30 max-w-[240px]">
                <Rocket className="w-10 h-10 mb-4" />
                <p className="text-sm font-medium leading-relaxed">
                  "{about.mission}"
                </p>
              </div>
            </motion.div>
            
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-blue/5 rounded-full blur-3xl -z-10" />
          </div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Story & Mission</span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                {about.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {about.description}
              </p>
              <div className="prose prose-lg text-gray-600 max-w-none mb-10">
                <p>
                  Growth Grid Media is more than just a marketing agency; we're your strategic partner in the digital world. Founded with a vision to empower businesses through innovative technology and creative marketing, we've helped dozens of clients achieve their growth targets and establish a dominant online presence.
                </p>
                <p>
                  Our team brings together experts in social media marketing, web development, SEO, and brand strategy. We believe that every business has a unique story to tell, and our mission is to help you tell that story in a way that resonates with your audience and drives real, measurable results.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-12">
                {about.stats.map((stat, i) => (
                  <div key={i} className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <p className="text-2xl font-bold text-brand-blue mb-1">{stat.value}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Results-First Approach</h4>
                    <p className="text-gray-500 text-sm">We don't care about vanity metrics. We care about your ROI and business growth.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Transparent Partnership</h4>
                    <p className="text-gray-500 text-sm">No complex jargon. Just clear communication and honest strategies that work.</p>
                  </div>
                </div>
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue transition-all shadow-lg shadow-brand-dark/10" title="Contact Growth Grid Media to start your growth journey">
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
