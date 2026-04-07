import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {
  const { content } = useContent('General');
  const logo = content['site_logo'];
  const siteName = content['site_name']?.text || 'Krenium';
  const contactEmail = content['contact_email']?.text || 'info@kreniumresources.com';
  const contactPhone = content['contact_phone']?.text || '+234 800 LOGISTICS';
  const address = (content['address']?.text && content['address'].text !== 'Lagos, Nigeria') ? content['address'].text : '927/928, bishop aboyade cole street victoria island lagos state nigeria';

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            {logo?.url ? (
              <img src={logo.url} alt={logo.alt || "Logo"} className="h-10 w-auto object-contain scale-[4] origin-left" />
            ) : (
              <span className="font-bold text-xl text-white">{siteName}</span>
            )}
          </Link>
          <p className="text-slate-300 leading-relaxed">
            Your trusted partner for seamless logistics solutions across Nigeria. 
            Reliability, speed, and security in every delivery.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
              <TikTokIcon size={20} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
              <XIcon size={20} />
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
