import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Strategy & Discovery",
    description: "We start by understanding your business goals, target audience, and unique value proposition.",
  },
  {
    number: "02",
    title: "Design & Planning",
    description: "We create a strategic design and layout that focuses on user experience and conversion paths.",
  },
  {
    number: "03",
    title: "Development",
    description: "Our team builds your website using modern, fast, and secure technologies optimized for all devices.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We launch your site and provide ongoing support to ensure it continues to perform and grow.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Process</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            A Simple, <span className="text-brand-blue">Transparent Approach</span>
          </h2>
          <p className="text-lg text-gray-600">
            We've refined our workflow to make the website development process stress-free and efficient for our clients.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

          <div className="grid lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center lg:text-left"
              >
                <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto lg:mx-0 shadow-lg shadow-brand-blue/20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
