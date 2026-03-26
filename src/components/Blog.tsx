import { motion } from "motion/react";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_BLOGS } from "../constants/siteDefaults";

interface BlogProps {
  onBack: () => void;
}

export default function Blog({ onBack }: BlogProps) {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  useEffect(() => {
    const loadData = () => {
      setBlogs(getStoredData(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  if (selectedBlog) {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <button 
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-2 text-brand-blue font-bold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>

          <img 
            src={selectedBlog.image} 
            alt={selectedBlog.title}
            className="w-full h-[400px] object-cover rounded-[40px] mb-12 shadow-2xl"
          />

          <div className="flex items-center gap-6 mb-8 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {selectedBlog.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {selectedBlog.author}
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-8 leading-tight">{selectedBlog.title}</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {selectedBlog.content.split('\n').map((para: string, i: number) => (
              <p key={i} className="mb-6">{para}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-brand-blue font-bold mb-4 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <h1 className="text-5xl font-bold mb-4">Our <span className="text-brand-blue">Blog</span></h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              Insights, strategies, and news to help you scale your business in the digital age.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog: any, index: number) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 group cursor-pointer hover:-translate-y-2 transition-all duration-500"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-brand-blue">
                  Marketing
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {blog.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-brand-blue transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
