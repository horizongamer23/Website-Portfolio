import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Image as ImageIcon, Link as LinkIcon, Star, Lock, Globe, Layout, Zap, Search, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Info, BarChart, Calendar } from "lucide-react";
import { STORAGE_KEYS, getStoredData, setStoredData } from "../utils/storage";
import { 
  DEFAULT_GENERAL, 
  DEFAULT_HERO, 
  DEFAULT_ABOUT, 
  DEFAULT_SERVICES, 
  DEFAULT_TESTIMONIALS, 
  DEFAULT_PROJECTS, 
  DEFAULT_FAQ,
  DEFAULT_CASE_STUDIES,
  DEFAULT_PRICING,
  DEFAULT_PROCESS,
  DEFAULT_BLOGS
} from "../constants/siteDefaults";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'general' | 'hero' | 'about' | 'services' | 'portfolio' | 'case-studies' | 'pricing' | 'process' | 'testimonials' | 'faq' | 'blogs' | 'leads';

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Site State
  const [general, setGeneral] = useState(DEFAULT_GENERAL);
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [about, setAbout] = useState(DEFAULT_ABOUT);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [portfolio, setPortfolio] = useState(DEFAULT_PROJECTS);
  const [faq, setFaq] = useState(DEFAULT_FAQ);
  const [caseStudies, setCaseStudies] = useState(DEFAULT_CASE_STUDIES);
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  const [processSteps, setProcessSteps] = useState(DEFAULT_PROCESS);
  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);

  useEffect(() => {
    if (isOpen) {
      setGeneral(getStoredData(STORAGE_KEYS.GENERAL, DEFAULT_GENERAL));
      setHero(getStoredData(STORAGE_KEYS.HERO, DEFAULT_HERO));
      setAbout(getStoredData(STORAGE_KEYS.ABOUT, DEFAULT_ABOUT));
      setServices(getStoredData(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES));
      setTestimonials(getStoredData(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS));
      setPortfolio(getStoredData(STORAGE_KEYS.PORTFOLIO, DEFAULT_PROJECTS));
      setFaq(getStoredData(STORAGE_KEYS.FAQ, DEFAULT_FAQ));
      setCaseStudies(getStoredData(STORAGE_KEYS.CASE_STUDIES, DEFAULT_CASE_STUDIES));
      setPricing(getStoredData(STORAGE_KEYS.PRICING, DEFAULT_PRICING));
      setProcessSteps(getStoredData(STORAGE_KEYS.PROCESS, DEFAULT_PROCESS));
      setLeads(getStoredData(STORAGE_KEYS.LEADS, []));
      setBlogs(getStoredData(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS));
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "JaatRaj") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword("");
    onClose();
  };

  const saveAll = () => {
    setStoredData(STORAGE_KEYS.GENERAL, general);
    setStoredData(STORAGE_KEYS.HERO, hero);
    setStoredData(STORAGE_KEYS.ABOUT, about);
    setStoredData(STORAGE_KEYS.SERVICES, services);
    setStoredData(STORAGE_KEYS.TESTIMONIALS, testimonials);
    setStoredData(STORAGE_KEYS.PORTFOLIO, portfolio);
    setStoredData(STORAGE_KEYS.FAQ, faq);
    setStoredData(STORAGE_KEYS.CASE_STUDIES, caseStudies);
    setStoredData(STORAGE_KEYS.PRICING, pricing);
    setStoredData(STORAGE_KEYS.PROCESS, processSteps);
    setStoredData(STORAGE_KEYS.BLOGS, blogs);
    
    window.dispatchEvent(new Event('storage_update'));
    alert('All changes saved successfully!');
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden p-8 text-center">
          <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brand-blue" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark mb-2">Admin Access</h2>
          <p className="text-gray-500 mb-8">Please enter the password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-blue outline-none transition-all text-center font-bold"
              autoFocus
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-4 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-brand-dark text-white px-6 py-4 rounded-xl font-bold hover:bg-brand-blue transition-all shadow-lg"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col gap-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-brand-dark">Advanced Admin</h2>
            <button onClick={handleClose} className="p-2 hover:bg-gray-200 rounded-full transition-all">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto w-full no-scrollbar">
            {(['general', 'hero', 'about', 'services', 'process', 'portfolio', 'case-studies', 'pricing', 'testimonials', 'faq', 'blogs', 'leads'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${activeTab === tab ? 'bg-brand-blue text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'general' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Site Name</label>
                  <input
                    value={general.siteName}
                    onChange={(e) => setGeneral({...general, siteName: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Logo URL</label>
                  <input
                    value={general.siteLogo}
                    onChange={(e) => setGeneral({...general, siteLogo: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Contact Email</label>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input
                      value={general.email}
                      onChange={(e) => setGeneral({...general, email: e.target.value})}
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Contact Phone</label>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <input
                      value={general.phone}
                      onChange={(e) => setGeneral({...general, phone: e.target.value})}
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b pb-2">Social Media Links</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <input
                      value={general.socials.facebook}
                      onChange={(e) => setGeneral({...general, socials: {...general.socials, facebook: e.target.value}})}
                      className="flex-1 bg-transparent outline-none text-sm"
                      placeholder="Facebook URL"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <input
                      value={general.socials.instagram}
                      onChange={(e) => setGeneral({...general, socials: {...general.socials, instagram: e.target.value}})}
                      className="flex-1 bg-transparent outline-none text-sm"
                      placeholder="Instagram URL"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <Twitter className="w-5 h-5 text-sky-500" />
                    <input
                      value={general.socials.twitter}
                      onChange={(e) => setGeneral({...general, socials: {...general.socials, twitter: e.target.value}})}
                      className="flex-1 bg-transparent outline-none text-sm"
                      placeholder="Twitter URL"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <input
                      value={general.socials.linkedin}
                      onChange={(e) => setGeneral({...general, socials: {...general.socials, linkedin: e.target.value}})}
                      className="flex-1 bg-transparent outline-none text-sm"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Hero Title</label>
                <textarea
                  value={hero.title}
                  onChange={(e) => setHero({...hero, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue text-2xl font-bold"
                  rows={2}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Hero Subtitle</label>
                <textarea
                  value={hero.subtitle}
                  onChange={(e) => setHero({...hero, subtitle: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue"
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">CTA Button Text</label>
                  <input
                    value={hero.ctaText}
                    onChange={(e) => setHero({...hero, ctaText: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Background Image URL</label>
                  <input
                    value={hero.bgImage}
                    onChange={(e) => setHero({...hero, bgImage: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">About Title</label>
                <input
                  value={about.title}
                  onChange={(e) => setAbout({...about, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue font-bold"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">About Description</label>
                <textarea
                  value={about.description}
                  onChange={(e) => setAbout({...about, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue"
                  rows={4}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Mission Statement</label>
                <textarea
                  value={about.mission}
                  onChange={(e) => setAbout({...about, mission: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue"
                  rows={2}
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b pb-2">Stats</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {about.stats.map((stat, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                      <input
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...about.stats];
                          newStats[i].label = e.target.value;
                          setAbout({...about, stats: newStats});
                        }}
                        className="w-full bg-white border border-gray-100 p-2 rounded-lg text-xs font-bold"
                        placeholder="Label"
                      />
                      <input
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...about.stats];
                          newStats[i].value = e.target.value;
                          setAbout({...about, stats: newStats});
                        }}
                        className="w-full bg-white border border-gray-100 p-2 rounded-lg text-lg font-bold text-brand-blue"
                        placeholder="Value"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage your categorized service offerings.</p>
                <button 
                  onClick={() => setServices([...services, { category: "New Category", items: [] }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Category
                </button>
              </div>
              <div className="space-y-12">
                {services.map((cat, catIdx) => (
                  <div key={catIdx} className="bg-gray-50 p-8 rounded-[32px] border border-gray-200 space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <input
                        value={cat.category}
                        onChange={(e) => {
                          const newS = [...services];
                          newS[catIdx].category = e.target.value;
                          setServices(newS);
                        }}
                        className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-xl focus:ring-2 focus:ring-brand-blue outline-none flex-1"
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const newS = [...services];
                            newS[catIdx].items.push({ title: "New Service", description: "Description...", icon: "Zap" });
                            setServices(newS);
                          }}
                          className="p-3 bg-brand-blue text-white rounded-xl hover:bg-brand-dark transition-all"
                          title="Add Service to this Category"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button onClick={() => setServices(services.filter((_, idx) => idx !== catIdx))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {cat.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <input
                              value={item.title}
                              onChange={(e) => {
                                const newS = [...services];
                                newS[catIdx].items[itemIdx].title = e.target.value;
                                setServices(newS);
                              }}
                              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm flex-1"
                              placeholder="Service Title"
                            />
                            <input
                              value={item.icon}
                              onChange={(e) => {
                                const newS = [...services];
                                newS[catIdx].items[itemIdx].icon = e.target.value;
                                setServices(newS);
                              }}
                              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-xs font-mono w-32"
                              placeholder="Icon Name"
                            />
                            <button 
                              onClick={() => {
                                const newS = [...services];
                                newS[catIdx].items = newS[catIdx].items.filter((_, idx) => idx !== itemIdx);
                                setServices(newS);
                              }}
                              className="p-2 text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            value={item.description}
                            onChange={(e) => {
                              const newS = [...services];
                              newS[catIdx].items[itemIdx].description = e.target.value;
                              setServices(newS);
                            }}
                            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-blue"
                            rows={2}
                            placeholder="Service Description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage your portfolio projects.</p>
                <button 
                  onClick={() => setPortfolio([...portfolio, { title: "New Project", category: "Web Dev", image: "https://picsum.photos/seed/new/800/600", result: "Result...", link: "#" }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>
              <div className="grid gap-6">
                {portfolio.map((p, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-24 h-16 bg-gray-200 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                        <img src={p.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          value={p.title}
                          onChange={(e) => {
                            const newP = [...portfolio];
                            newP[i].title = e.target.value;
                            setPortfolio(newP);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm"
                          placeholder="Title"
                        />
                        <input
                          value={p.category}
                          onChange={(e) => {
                            const newP = [...portfolio];
                            newP[i].category = e.target.value;
                            setPortfolio(newP);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm"
                          placeholder="Category"
                        />
                      </div>
                      <button onClick={() => setPortfolio(portfolio.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <input
                      value={p.result}
                      onChange={(e) => {
                        const newP = [...portfolio];
                        newP[i].result = e.target.value;
                        setPortfolio(newP);
                      }}
                      className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-emerald-600"
                      placeholder="Result (e.g. 50% growth)"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <input
                          value={p.image}
                          onChange={(e) => {
                            const newP = [...portfolio];
                            newP[i].image = e.target.value;
                            setPortfolio(newP);
                          }}
                          className="flex-1 bg-transparent outline-none text-xs"
                          placeholder="Image URL"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                        <LinkIcon className="w-4 h-4 text-gray-400" />
                        <input
                          value={p.link}
                          onChange={(e) => {
                            const newP = [...portfolio];
                            newP[i].link = e.target.value;
                            setPortfolio(newP);
                          }}
                          className="flex-1 bg-transparent outline-none text-xs"
                          placeholder="Project Link"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage client testimonials.</p>
                <button 
                  onClick={() => setTestimonials([...testimonials, { name: "New Client", role: "Owner", content: "Great!", image: "https://i.pravatar.cc/150", rating: 5 }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Testimonial
                </button>
              </div>
              <div className="grid gap-6">
                {testimonials.map((t, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <img src={t.image} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          value={t.name}
                          onChange={(e) => {
                            const newT = [...testimonials];
                            newT[i].name = e.target.value;
                            setTestimonials(newT);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm"
                        />
                        <input
                          value={t.role}
                          onChange={(e) => {
                            const newT = [...testimonials];
                            newT[i].role = e.target.value;
                            setTestimonials(newT);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm"
                        />
                      </div>
                      <button onClick={() => setTestimonials(testimonials.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={t.content}
                      onChange={(e) => {
                        const newT = [...testimonials];
                        newT[i].content = e.target.value;
                        setTestimonials(newT);
                      }}
                      className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm"
                      rows={2}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl w-full sm:w-auto">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <input
                          value={t.image}
                          onChange={(e) => {
                            const newT = [...testimonials];
                            newT[i].image = e.target.value;
                            setTestimonials(newT);
                          }}
                          className="flex-1 bg-transparent outline-none text-xs w-full sm:w-48"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400" />
                        <select
                          value={t.rating}
                          onChange={(e) => {
                            const newT = [...testimonials];
                            newT[i].rating = Number(e.target.value);
                            setTestimonials(newT);
                          }}
                          className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-bold"
                        >
                          {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} Stars</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage your agency workflow steps.</p>
                <button 
                  onClick={() => setProcessSteps([...processSteps, { title: "New Step", description: "Description...", icon: "Zap" }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Step
                </button>
              </div>
              <div className="grid gap-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input
                          value={step.title}
                          onChange={(e) => {
                            const newP = [...processSteps];
                            newP[i].title = e.target.value;
                            setProcessSteps(newP);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm"
                          placeholder="Step Title"
                        />
                        <input
                          value={step.icon}
                          onChange={(e) => {
                            const newP = [...processSteps];
                            newP[i].icon = e.target.value;
                            setProcessSteps(newP);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-mono"
                          placeholder="Icon Name"
                        />
                      </div>
                      <button onClick={() => setProcessSteps(processSteps.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        const newP = [...processSteps];
                        newP[i].description = e.target.value;
                        setProcessSteps(newP);
                      }}
                      className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm"
                      rows={2}
                      placeholder="Step Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'case-studies' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage your success stories.</p>
                <button 
                  onClick={() => setCaseStudies([...caseStudies, { title: "New Case Study", client: "Client Name", before: "0", after: "0", metric: "Growth", image: "https://picsum.photos/seed/case/800/600" }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Case Study
                </button>
              </div>
              <div className="grid gap-6">
                {caseStudies.map((study, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-24 h-16 bg-gray-200 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                        <img src={study.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input
                          value={study.title}
                          onChange={(e) => {
                            const newC = [...caseStudies];
                            newC[i].title = e.target.value;
                            setCaseStudies(newC);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm"
                          placeholder="Title"
                        />
                        <input
                          value={study.client}
                          onChange={(e) => {
                            const newC = [...caseStudies];
                            newC[i].client = e.target.value;
                            setCaseStudies(newC);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm"
                          placeholder="Client Name"
                        />
                      </div>
                      <button onClick={() => setCaseStudies(caseStudies.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Before</label>
                        <input
                          value={study.before}
                          onChange={(e) => {
                            const newC = [...caseStudies];
                            newC[i].before = e.target.value;
                            setCaseStudies(newC);
                          }}
                          className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">After</label>
                        <input
                          value={study.after}
                          onChange={(e) => {
                            const newC = [...caseStudies];
                            newC[i].after = e.target.value;
                            setCaseStudies(newC);
                          }}
                          className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm text-emerald-600 font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Metric</label>
                        <input
                          value={study.metric}
                          onChange={(e) => {
                            const newC = [...caseStudies];
                            newC[i].metric = e.target.value;
                            setCaseStudies(newC);
                          }}
                          className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm text-brand-blue font-bold"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                      <input
                        value={study.image}
                        onChange={(e) => {
                          const newC = [...caseStudies];
                          newC[i].image = e.target.value;
                          setCaseStudies(newC);
                        }}
                        className="flex-1 bg-transparent outline-none text-xs"
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage your pricing plans.</p>
                <button 
                  onClick={() => setPricing([...pricing, { name: "New Plan", price: "$0", period: "/mo", features: ["Feature 1"], recommended: false }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Plan
                </button>
              </div>
              <div className="grid gap-8">
                {pricing.map((plan, i) => (
                  <div key={i} className={`p-8 rounded-[32px] border-2 transition-all ${plan.recommended ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 flex-1">
                        <input
                          value={plan.name}
                          onChange={(e) => {
                            const newP = [...pricing];
                            newP[i].name = e.target.value;
                            setPricing(newP);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-lg"
                        />
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={plan.recommended}
                            onChange={(e) => {
                              const newP = pricing.map((p, idx) => ({...p, recommended: idx === i ? e.target.checked : false}));
                              setPricing(newP);
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                          />
                          <span className="text-xs font-bold text-gray-500 uppercase">Recommended</span>
                        </label>
                      </div>
                      <button onClick={() => setPricing(pricing.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Price</label>
                        <input
                          value={plan.price}
                          onChange={(e) => {
                            const newP = [...pricing];
                            newP[i].price = e.target.value;
                            setPricing(newP);
                          }}
                          className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Period</label>
                        <input
                          value={plan.period}
                          onChange={(e) => {
                            const newP = [...pricing];
                            newP[i].period = e.target.value;
                            setPricing(newP);
                          }}
                          className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Features (one per line)</label>
                      <textarea
                        value={plan.features.join('\n')}
                        onChange={(e) => {
                          const newP = [...pricing];
                          newP[i].features = e.target.value.split('\n').filter(f => f.trim() !== '');
                          setPricing(newP);
                        }}
                        className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm"
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage your blog posts.</p>
                <button 
                  onClick={() => setBlogs([...blogs, { id: Date.now().toString(), title: "New Blog Post", excerpt: "Excerpt...", content: "Full content...", image: "https://picsum.photos/seed/blog/800/600", date: new Date().toISOString().split('T')[0], author: "Growth Grid Team" }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Blog Post
                </button>
              </div>
              <div className="grid gap-6">
                {blogs.map((blog, i) => (
                  <div key={blog.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-24 h-16 bg-gray-200 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                        <img src={blog.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input
                          value={blog.title}
                          onChange={(e) => {
                            const newB = [...blogs];
                            newB[i].title = e.target.value;
                            setBlogs(newB);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm"
                          placeholder="Title"
                        />
                        <input
                          value={blog.author}
                          onChange={(e) => {
                            const newB = [...blogs];
                            newB[i].author = e.target.value;
                            setBlogs(newB);
                          }}
                          className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm"
                          placeholder="Author"
                        />
                      </div>
                      <button onClick={() => setBlogs(blogs.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={blog.excerpt}
                      onChange={(e) => {
                        const newB = [...blogs];
                        newB[i].excerpt = e.target.value;
                        setBlogs(newB);
                      }}
                      className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm"
                      rows={2}
                      placeholder="Excerpt"
                    />
                    <textarea
                      value={blog.content}
                      onChange={(e) => {
                        const newB = [...blogs];
                        newB[i].content = e.target.value;
                        setBlogs(newB);
                      }}
                      className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm font-mono"
                      rows={6}
                      placeholder="Full Content"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <input
                          value={blog.image}
                          onChange={(e) => {
                            const newB = [...blogs];
                            newB[i].image = e.target.value;
                            setBlogs(newB);
                          }}
                          className="flex-1 bg-transparent outline-none text-xs"
                          placeholder="Image URL"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={blog.date}
                          onChange={(e) => {
                            const newB = [...blogs];
                            newB[i].date = e.target.value;
                            setBlogs(newB);
                          }}
                          className="flex-1 bg-transparent outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">View and manage your incoming leads.</p>
                <button 
                  onClick={() => {
                    if(confirm('Are you sure you want to clear all leads?')) {
                      setLeads([]);
                      setStoredData(STORAGE_KEYS.LEADS, []);
                    }
                  }}
                  className="text-red-500 text-sm font-bold hover:underline"
                >
                  Clear All Leads
                </button>
              </div>
              <div className="space-y-4">
                {leads.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
                    <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No leads yet. They will appear here when someone fills the contact form.</p>
                  </div>
                ) : (
                  leads.map((lead, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-brand-dark">{lead.name}</h4>
                          <p className="text-sm text-brand-blue font-medium">{lead.businessName}</p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {lead.email || 'N/A'}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 italic">
                        "{lead.message}"
                      </div>
                    </div>
                  )).reverse()
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-4">
          <button onClick={handleClose} className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button
            onClick={saveAll}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-blue transition-all shadow-lg shadow-brand-dark/10"
          >
            <Save className="w-4 h-4" /> Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
