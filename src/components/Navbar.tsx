import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, Phone } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useContent } from '../hooks/useContent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useContent('General');
  const logo = content['site_logo'];
  const siteName = content['site_name']?.text || 'Krenium';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Get a Quote', path: '/get-quote' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';
  const isDarkText = scrolled || !isHome;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3',
        scrolled || !isHome ? 'bg-white shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center w-full relative">
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2 group z-10">
          {logo?.url ? (
            <img 
              src={logo.url} 
              alt={logo.alt || "Logo"} 
              className={cn(
                "h-8 md:h-10 w-auto object-contain scale-[2.5] origin-center md:origin-left transition-all duration-300",
                isDarkText && "brightness-0"
              )} 
            />
          ) : (
            <span className={cn("font-bold text-xl", isDarkText ? "text-primary" : "text-white")}>{siteName}</span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors',
                isDarkText ? 'text-slate-700 hover:text-secondary' : 'text-white/80 hover:text-white',
                location.pathname === link.path && (isDarkText ? 'text-secondary font-bold' : 'text-white font-bold')
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 ml-auto z-10 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={isDarkText ? 'text-primary' : 'text-white'} />
          ) : (
            <Menu className={isDarkText ? 'text-primary' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-lg font-medium p-2 rounded-lg hover:bg-slate-50',
                  location.pathname === link.path ? 'text-secondary' : 'text-slate-700'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
