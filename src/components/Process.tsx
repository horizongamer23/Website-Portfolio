import { motion } from "motion/react";
import { Search, Target, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_PROCESS } from "../constants/siteDefaults";

const iconMap: { [key: string]: any } = {
  Search,
  Target,
  Zap,
  TrendingUp
};

export default function Process() {
  const [processSteps, setProcessSteps] = useState(DEFAULT_PROCESS);

  useEffect(() => {
    const loadData = () => {
      setProcessSteps(getStoredData(STORAGE_KEYS.PROCESS, DEFAULT_PROCESS));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section id="process" className="py-24 bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Workflow</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How We Scale Your <span className="gradient-text">Business</span>
          </h2>
          <p className="text-lg text-white/60">
            A proven, data-driven process designed to take your brand from where it is to where it needs to be.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent -translate-y-1/2 z-0" />
          
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-brand-blue/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-10 right-10 text-4xl font-black text-white/5 group-hover:text-brand-blue/10 transition-colors">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
          <a href="#contact" className="inline-flex items-center gap-3 bg-white text-brand-dark px-10 py-5 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all">
            Start Your Growth Journey
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
