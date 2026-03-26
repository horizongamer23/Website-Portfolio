import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_GENERAL } from "../constants/siteDefaults";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [general, setGeneral] = useState(DEFAULT_GENERAL);

  useEffect(() => {
    const loadData = () => {
      setGeneral(getStoredData(STORAGE_KEYS.GENERAL, DEFAULT_GENERAL));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              {general.siteLogo.startsWith('http') ? (
                <img src={general.siteLogo} alt={general.siteName} className="w-8 h-8 object-contain" />
              ) : (
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-xs rotate-45" />
                </div>
              )}
              <span className="text-xl font-display font-bold tracking-tight">
                {general.siteName.split(' ')[0]}<span className="text-brand-blue"> {general.siteName.split(' ').slice(1).join(' ')}</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Full-service digital marketing agency helping brands scale through data-driven strategies, high-converting websites, and ROI-focused advertising.
            </p>
            <div className="flex gap-4">
              {general.socials.twitter && (
                <a href={general.socials.twitter} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {general.socials.facebook && (
                <a href={general.socials.facebook} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {general.socials.instagram && (
                <a href={general.socials.instagram} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {general.socials.linkedin && (
                <a href={general.socials.linkedin} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Social Media Marketing</a></li>
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Web Development</a></li>
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">SEO Optimization</a></li>
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Brand Strategy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Our Story</a></li>
              <li><a href="#process" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Our Process</a></li>
              <li><a href="#case-studies" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Case Studies</a></li>
              <li><a href="#pricing" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-sm text-gray-500">{general.email}</li>
              <li className="text-sm text-gray-500">{general.phone}</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © {currentYear} {general.siteName}. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-400 hover:text-brand-blue transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-brand-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
