import { motion } from "motion/react";
import { Shield, TrendingUp, Hotel, Utensils, Home, GraduationCap, ShoppingBag, Dumbbell, ArrowRight } from "lucide-react";
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
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Hotels & Resorts", icon: Hotel },
                { name: "Restaurants & Cafes", icon: Utensils },
                { name: "Real Estate", icon: Home },
                { name: "Schools & Education", icon: GraduationCap },
                { name: "E-commerce Stores", icon: ShoppingBag },
                { name: "Gyms & Fitness", icon: Dumbbell },
              ].map((industry, i) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-brand-blue transition-all"
                >
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <industry.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm">{industry.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              {about.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {about.description}
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-10">
              {about.stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-brand-blue mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Build Trust & Credibility</h4>
                  <p className="text-gray-500">We design professional websites that immediately signal quality to your potential customers.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Drive Real Business Impact</h4>
                  <p className="text-gray-500">Our focus is on conversions and growth, not just pretty pixels. We build for results.</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a href="#contact" className="inline-flex items-center gap-2 font-bold text-brand-dark hover:text-brand-blue transition-colors group">
                Learn more about our approach
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
