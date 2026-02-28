import { motion } from "motion/react";
import { ShieldCheck, Smartphone, Search, Users } from "lucide-react";

const values = [
  {
    title: "Build Instant Trust",
    description: "A professional design signals quality and reliability to your visitors from the first second.",
    icon: ShieldCheck,
  },
  {
    title: "Mobile-First Experience",
    description: "We ensure your site looks and works perfectly on smartphones, where most local customers find you.",
    icon: Smartphone,
  },
  {
    title: "Improved Credibility",
    description: "A modern website gives your business the authority it needs to stand out from competitors.",
    icon: Search,
  },
  {
    title: "Turn Visitors into Leads",
    description: "Strategic call-to-actions and conversion paths designed to generate inquiries for your business.",
    icon: Users,
  },
];

export default function ValueProposition() {
  return (
    <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How We Help Your <span className="text-brand-blue">Business Grow</span>
          </h2>
          <p className="text-lg text-gray-400">
            We don't just build websites; we build growth engines. Our approach focuses on the outcomes that matter most to your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-3xl bg-linear-to-r from-brand-blue to-brand-accent text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to grow your online presence?</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join the businesses that have transformed their digital identity with Growth Grid Media.
          </p>
          <a
            href="#contact"
            className="inline-flex bg-white text-brand-dark px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl"
          >
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
