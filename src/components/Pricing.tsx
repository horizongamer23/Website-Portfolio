import { motion } from "motion/react";
import { Check, ArrowRight, Zap, TrendingUp, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_PRICING } from "../constants/siteDefaults";

export default function Pricing() {
  const [pricing, setPricing] = useState(DEFAULT_PRICING);

  useEffect(() => {
    const loadData = () => {
      setPricing(getStoredData(STORAGE_KEYS.PRICING, DEFAULT_PRICING));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Pricing Plans</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Invest in Your <span className="gradient-text">Business Growth</span>
          </h2>
          <p className="text-lg text-gray-600">
            Transparent pricing designed to scale with your business. No hidden fees, just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-10 rounded-[40px] border-2 transition-all ${
                plan.recommended 
                  ? 'border-brand-blue bg-brand-dark text-white shadow-2xl shadow-brand-blue/20 scale-105 z-10' 
                  : 'border-gray-100 bg-white hover:border-brand-blue/20 hover:shadow-xl'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-4 ${plan.recommended ? 'text-white' : 'text-brand-dark'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.recommended ? 'text-white' : 'text-brand-dark'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.recommended ? 'text-white/60' : 'text-gray-400'}`}>{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.recommended ? 'bg-brand-blue/20 text-brand-blue' : 'bg-emerald-50 text-emerald-500'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-sm ${plan.recommended ? 'text-white/80' : 'text-gray-600'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.recommended
                    ? 'bg-brand-blue text-white hover:bg-white hover:text-brand-dark'
                    : 'bg-gray-50 text-brand-dark hover:bg-brand-blue hover:text-white'
                }`}
              >
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
