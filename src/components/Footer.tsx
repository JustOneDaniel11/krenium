import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const Footer = () => {
  const { content } = useContent('General');
  const logo = content['site_logo'];
  const siteName = content['site_name']?.text || 'Krenium';
  const contactEmail = content['contact_email']?.text || 'info@kreniumresources.com';
  const contactPhone = content['contact_phone']?.text || '+234 800 LOGISTICS';
  const address = content['address']?.text || '123 Logistics Plaza, Ikeja, Lagos, Nigeria';

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            {logo?.url ? (
              <img src={logo.url} alt={logo.alt || "Logo"} className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-bold text-xl text-white">{siteName}</span>
            )}
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
            <li><Link to="/about" className="text-slate-300 hover:text-white transition-colors">About Our Company</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Our Logistics Services</Link></li>
            <li><Link to="/get-quote" className="text-slate-300 hover:text-white transition-colors">Request a Free Quote</Link></li>
            <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Our Services</h3>
          <ul className="space-y-4">
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Corporate & Residential Relocation</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Diesel Supply & Delivery</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Haulage Services</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Storage Solutions</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Truck & Van Rental</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Dispatch & Delivery Services</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Logistics Consulting</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300">
              <MapPin className="text-white shrink-0" size={20} />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <Phone className="text-white shrink-0" size={20} />
              <span>{contactPhone}</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <Mail className="text-white shrink-0" size={20} />
              <span>{contactEmail}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} {siteName} Resources Moving and Logistics. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
