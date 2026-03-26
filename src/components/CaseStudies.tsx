import { motion } from "motion/react";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_CASE_STUDIES } from "../constants/siteDefaults";

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState(DEFAULT_CASE_STUDIES);

  useEffect(() => {
    const loadData = () => {
      setCaseStudies(getStoredData(STORAGE_KEYS.CASE_STUDIES, DEFAULT_CASE_STUDIES));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section id="case-studies" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Results</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Real Impact for <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-lg text-gray-600">
            We don't just deliver reports; we deliver growth. See how we've helped brands scale their revenue and presence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-brand-blue uppercase tracking-wider">
                  {study.client}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold mb-6 group-hover:text-brand-blue transition-colors">{study.title}</h3>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-gray-50 rounded-2xl text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Before</p>
                    <p className="text-sm font-bold text-gray-400 line-through">{study.before}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl text-center">
                    <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">After</p>
                    <p className="text-sm font-bold text-emerald-600">{study.after}</p>
                  </div>
                  <div className="p-4 bg-brand-blue/10 rounded-2xl text-center">
                    <p className="text-[10px] text-brand-blue font-bold uppercase mb-1">Result</p>
                    <p className="text-sm font-bold text-brand-blue">{study.metric}</p>
                  </div>
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 font-bold text-brand-dark hover:text-brand-blue transition-colors" title={`Read full case study for ${study.client}`}>
                  View Full Case Study
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
