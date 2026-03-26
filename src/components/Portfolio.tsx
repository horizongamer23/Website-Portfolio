import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_PROJECTS } from "../constants/siteDefaults";

export default function Portfolio() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    const loadData = () => {
      setProjects(getStoredData(STORAGE_KEYS.PORTFOLIO, DEFAULT_PROJECTS));
    };

    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <section id="portfolio" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Our Portfolio</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Websites That <span className="text-brand-blue">Deliver Results</span>
            </h2>
            <p className="text-lg text-gray-600">
              Explore how we've helped businesses across various industries grow their online presence and achieve real business outcomes.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue transition-all"
            title="Start your digital project with Growth Grid Media"
          >
            Start Your Project
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <a href={project.link} target={project.link !== "#" ? "_blank" : undefined} rel="noopener noreferrer" title={`View ${project.title} live project`}>
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-xl">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </a>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">{project.category}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  <span className="text-brand-dark font-bold">The Result:</span> {project.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
