import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_FAQ } from "../constants/siteDefaults";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState(DEFAULT_FAQ);

  useEffect(() => {
    const loadData = () => {
      setFaqs(getStoredData(STORAGE_KEYS.FAQ, DEFAULT_FAQ));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Common Queries</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-brand-blue">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to the most common questions about our process, services, and how we can help your business grow.
            </p>
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <HelpCircle className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-gray-500 text-sm mb-6">Can't find the answer you're looking for? Please chat with our friendly team.</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all"
              >
                Get in touch <Plus className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-bold text-brand-dark">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-brand-blue text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <div className="pt-12">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Popular Search Queries</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Web Development India",
                  "SEO Agency Jodhpur",
                  "Hotel Website Design",
                  "Restaurant Digital Marketing",
                  "Real Estate SEO",
                  "E-commerce Website Builder",
                  "Local SEO Services",
                  "Responsive Web Design",
                  "Business Growth Strategies",
                  "Digital Presence Modernization"
                ].map((query, i) => (
                  <span key={i} className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-all cursor-default">
                    {query}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
