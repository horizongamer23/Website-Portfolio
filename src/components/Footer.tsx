import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-xs rotate-45" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                Growth Grid<span className="text-brand-blue"> Media</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Premium web development agency helping local businesses, creators, and hospitality brands grow through high-performing digital solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Website Development</a></li>
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Website Redesign</a></li>
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Landing Pages</a></li>
              <li><a href="#services" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Business Websites</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Portfolio</a></li>
              <li><a href="#process" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Our Process</a></li>
              <li><a href="#contact" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-sm text-gray-500">faujdarmayank902@gmail.com</li>
              <li className="text-sm text-gray-500">+91 73577 58460</li>
              <li className="text-sm text-gray-500">Bhartpur, Raj, India</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © {currentYear} Growth Grid Media. All rights reserved.
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
