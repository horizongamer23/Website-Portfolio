import { motion } from "motion/react";
import { 
  Layout, RefreshCw, Target, Globe, ArrowRight, Zap, Search, 
  Instagram, Video, TrendingUp, Calendar, Palette, Image, Layers, MapPin 
} from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_SERVICES } from "../constants/siteDefaults";

const iconMap: { [key: string]: any } = {
  Globe,
  Layout,
  Zap,
  Search,
  RefreshCw,
  Target,
  Instagram,
  Video,
  TrendingUp,
  Calendar,
  Palette,
  Image,
  Layers,
  MapPin
};

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    const loadData = () => {
      setServices(getStoredData(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Expertise</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Full-Stack <span className="gradient-text">Digital Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We combine marketing psychology with high-end technology to deliver results that actually impact your bottom line. Our approach is data-driven, ensuring that every campaign we run and every website we build is optimized for maximum conversion and business growth.
          </p>
          <div className="prose prose-lg text-gray-500 max-w-none mb-12">
            <p>
              In today's digital landscape, simply having an online presence isn't enough. You need a strategic partner who understands the nuances of social media algorithms, search engine optimization, and user experience design. At Growth Grid Media, we specialize in creating cohesive digital ecosystems that work together to attract, engage, and convert your target audience.
            </p>
            <p>
              Whether you're looking to dominate local search results in Jodhpur, launch a high-performing e-commerce platform, or build a powerful brand identity that resonates with your customers, our team of experts is here to guide you. We don't just provide services; we provide solutions tailored to your unique business goals.
            </p>
          </div>
        </div>

        <div className="space-y-20">
          {services.map((category, catIndex) => (
            <div key={category.category} className="space-y-10">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-brand-dark whitespace-nowrap">{category.category}</h3>
                <div className="h-px bg-gray-100 w-full" />
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {category.items.map((item, index) => {
                  const Icon = iconMap[item.icon] || Globe;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-brand-blue/20 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all"
                    >
                      <div className={`w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h4 className="text-xl font-bold mb-3 group-hover:text-brand-blue transition-colors">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors" title={`Learn more about our ${item.title} services`}>
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
