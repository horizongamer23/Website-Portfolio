import { motion } from "motion/react";
import { Layout, RefreshCw, Target, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Website Development",
    description: "Custom-built websites designed to reflect your brand identity and provide a seamless user experience for your customers.",
    icon: Layout,
    benefits: ["Unique Design", "Fast Loading", "SEO Optimized"],
    color: "bg-blue-500",
  },
  {
    title: "Website Redesign",
    description: "Transform your outdated site into a modern, high-performing asset that builds trust and keeps visitors engaged.",
    icon: RefreshCw,
    benefits: ["Modern UI/UX", "Mobile Friendly", "Improved Speed"],
    color: "bg-indigo-500",
  },
  {
    title: "Lead-Gen Landing Pages",
    description: "Focused, high-conversion pages designed specifically to turn your marketing traffic into qualified business leads.",
    icon: Target,
    benefits: ["High Conversion", "Clear CTAs", "A/B Tested"],
    color: "bg-purple-500",
  },
  {
    title: "Optimized Business Sites",
    description: "Complete digital solutions for local businesses, restaurants, and hotels to improve visibility and attract local customers.",
    icon: Globe,
    benefits: ["Local SEO", "Booking Integration", "Google Maps Ready"],
    color: "bg-emerald-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Services</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Solutions Designed for <span className="gradient-text">Business Growth</span>
          </h2>
          <p className="text-lg text-gray-600">
            We focus on the business benefits of web development. Our goal is to help you attract more customers and build a professional online identity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 transition-all"
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-current/20`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-brand-blue transition-colors">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
