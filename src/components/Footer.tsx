import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-lg">
              <Truck className="text-primary w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tight">
              Krenium<span className="text-secondary">Resources</span>
            </span>
          </Link>
          <p className="text-slate-300 leading-relaxed">
            Your trusted partner for seamless logistics solutions across Nigeria. 
            Reliability, speed, and security in every delivery.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-slate-300 hover:text-secondary transition-colors">About Our Company</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-secondary transition-colors">Our Logistics Services</Link></li>
            <li><Link to="/quote" className="text-slate-300 hover:text-secondary transition-colors">Request a Free Quote</Link></li>
            <li><Link to="/contact" className="text-slate-300 hover:text-secondary transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Our Services</h3>
          <ul className="space-y-4">
            <li className="text-slate-300">Nationwide Delivery</li>
            <li className="text-slate-300">Cargo & Freight</li>
            <li className="text-slate-300">Express Courier</li>
            <li className="text-slate-300">Warehousing Solutions</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300">
              <MapPin className="text-secondary shrink-0" size={20} />
              <span>123 Logistics Plaza, Ikeja, Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <Phone className="text-secondary shrink-0" size={20} />
              <span>+234 800 LOGISTICS</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <Mail className="text-secondary shrink-0" size={20} />
              <span>info@kreniumresources.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Krenium Resources Moving and Logistics. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
