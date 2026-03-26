import { motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { STORAGE_KEYS, getStoredData } from "../utils/storage";
import { DEFAULT_GENERAL } from "../constants/siteDefaults";

interface NavbarProps {
  onLogoClick: () => void;
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [general, setGeneral] = useState(DEFAULT_GENERAL);

  useEffect(() => {
    const loadData = () => {
      setGeneral(getStoredData(STORAGE_KEYS.GENERAL, DEFAULT_GENERAL));
    };
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  useEffect(() => {
    if (clickCount >= 5) {
      onLogoClick();
      setClickCount(0);
    }
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Results", href: "#case-studies" },
    { name: "Pricing", href: "#pricing" },
    { name: "Blog", href: "#blog" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => setClickCount(prev => prev + 1)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
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
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-blue transition-all flex items-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-brand-blue text-white py-4 rounded-xl text-center font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  );
}
