import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Image as ImageIcon, Link as LinkIcon, Star, Lock, Globe, Layout, Zap, Search, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Info, BarChart } from "lucide-react";
import { STORAGE_KEYS, getStoredData, setStoredData } from "../utils/storage";
import { 
  DEFAULT_GENERAL, 
  DEFAULT_HERO, 
  DEFAULT_ABOUT, 
  DEFAULT_SERVICES, 
  DEFAULT_TESTIMONIALS, 
  DEFAULT_PROJECTS, 
  DEFAULT_FAQ 
} from "../constants/siteDefaults";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'general' | 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials' | 'faq';

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

  useEffect(() => {
    if (isOpen) {
      setGeneral(getStoredData(STORAGE_KEYS.GENERAL, DEFAULT_GENERAL));
      setHero(getStoredData(STORAGE_KEYS.HERO, DEFAULT_HERO));
      setAbout(getStoredData(STORAGE_KEYS.ABOUT, DEFAULT_ABOUT));
      setServices(getStoredData(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES));
      setTestimonials(getStoredData(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS));
      setPortfolio(getStoredData(STORAGE_KEYS.PORTFOLIO, DEFAULT_PROJECTS));
      setFaq(getStoredData(STORAGE_KEYS.FAQ, DEFAULT_FAQ));
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
            {(['general', 'hero', 'about', 'services', 'portfolio', 'testimonials', 'faq'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${activeTab === tab ? 'bg-brand-blue text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                <p className="text-gray-500 text-sm">Manage your service offerings.</p>
                <button 
                  onClick={() => setServices([...services, { title: "New Service", description: "Description here...", icon: "Globe" }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>
              <div className="grid gap-6">
                {services.map((service, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <input
                        value={service.title}
                        onChange={(e) => {
                          const newS = [...services];
                          newS[i].title = e.target.value;
                          setServices(newS);
                        }}
                        className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-lg focus:ring-2 focus:ring-brand-blue outline-none flex-1 mr-4"
                      />
                      <button onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={service.description}
                      onChange={(e) => {
                        const newS = [...services];
                        newS[i].description = e.target.value;
                        setServices(newS);
                      }}
                      className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                      rows={2}
                    />
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

          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">Manage frequently asked questions.</p>
                <button 
                  onClick={() => setFaq([...faq, { question: "New Question?", answer: "Answer here..." }])}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add FAQ
                </button>
              </div>
              <div className="grid gap-6">
                {faq.map((item, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <input
                        value={item.question}
                        onChange={(e) => {
                          const newF = [...faq];
                          newF[i].question = e.target.value;
                          setFaq(newF);
                        }}
                        className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm flex-1"
                      />
                      <button onClick={() => setFaq(faq.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={item.answer}
                      onChange={(e) => {
                        const newF = [...faq];
                        newF[i].answer = e.target.value;
                        setFaq(newF);
                      }}
                      className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm"
                      rows={3}
                    />
                  </div>
                ))}
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
