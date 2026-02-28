import { motion } from "motion/react";
import { Shield, TrendingUp, Users } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://picsum.photos/seed/about1/600/800"
                  alt="Web Development"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-brand-blue p-8 rounded-2xl text-white">
                  <h3 className="text-4xl font-bold mb-2">50+</h3>
                  <p className="text-brand-blue-100 font-medium">Projects Delivered</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <Users className="w-10 h-10 text-brand-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">Client Focused</h3>
                  <p className="text-gray-500 text-sm">We prioritize your business goals above all else.</p>
                </div>
                <img
                  src="https://picsum.photos/seed/about2/600/800"
                  alt="Team Collaboration"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Helping Businesses Establish a <span className="text-brand-blue">Strong Digital Presence</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Growth Grid Media isn't just a web development agency; we're your partner in digital growth. We specialize in creating modern, high-converting websites for local businesses, restaurants, hotels, and creators who are ready to take their online presence seriously.
            </p>
            
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

import { ArrowRight } from "lucide-react";
