import React from 'react';
import { motion } from 'motion/react';
import { Truck, Package, Briefcase, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import SEO from '../components/SEO';

const Services = () => {
  const { content } = useContent('Services');

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Logistics and Truck Rentals",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Krenium Logistics and Oil Resources Limited",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      }
    },
    "areaServed": "Lagos, Nigeria",
    "description": "Professional logistics in Lagos, including truck rentals, corporate relocation, and haulage services."
  };

  const services = [
    {
      id: 'relocation',
      title: 'Corporate & Residential Relocation',
      desc: 'We handle seamless office (corporate) and private home moves with professionalism, ensuring your belongings are safely transported and delivered on time.',
      icon: <Truck size={48} className="text-secondary" />,
      features: ['Office relocation', 'Home moving', 'Professional packing', 'Safe transit'],
      img: content.service_relocation?.url
    },
    {
      id: 'diesel',
      title: 'Diesel Supply & Door-to-Door Delivery',
      desc: 'We offer the sales and supply of diesel with prompt and secure doorstep delivery for businesses and individuals.',
      icon: <Zap size={48} className="text-secondary" />,
      features: ['Bulk supply', 'Doorstep delivery', 'Quality guaranteed', 'Business & Individual'],
      img: content.service_diesel?.url
    },
    {
      id: 'haulage',
      title: 'Haulage Services',
      desc: 'Our haulage solutions cover the transportation of goods in bulk, using well-maintained vehicles and experienced personnel.',
      icon: <Truck size={48} className="text-secondary" />,
      features: ['Bulk transportation', 'Experienced drivers', 'Well-maintained fleet', 'Nationwide coverage'],
      img: content.service_haulage?.url
    },
    {
      id: 'storage',
      title: 'Storage Solutions',
      desc: 'We provide safe, secure, and accessible storage spaces for both short-term and long-term needs.',
      icon: <Package size={48} className="text-secondary" />,
      features: ['Short-term storage', 'Long-term storage', 'Secure facilities', 'Easy access'],
      img: content.service_storage?.url
    },
    {
      id: 'rental',
      title: 'Truck & Van Rental',
      desc: 'Flexible rental options for trucks and vans suitable for logistics, moving, and business operations.',
      icon: <Truck size={48} className="text-secondary" />,
      features: ['Truck rental', 'Van rental', 'Flexible terms', 'Business operations'],
      img: content.service_rental?.url
    },
    {
      id: 'dispatch',
      title: 'Dispatch & Delivery Services',
      desc: 'Fast and reliable dispatch services ensuring timely pickup and delivery of parcels and goods.',
      icon: <Zap size={48} className="text-secondary" />,
      features: ['Fast dispatch', 'Timely pickup', 'Reliable delivery', 'Parcel tracking'],
      img: content.service_dispatch?.url
    },
    {
      id: 'consulting',
      title: 'Logistics Consulting',
      desc: 'Expert advice and strategic planning to optimize your logistics and supply chain operations.',
      icon: <Briefcase size={48} className="text-secondary" />,
      features: ['Supply chain optimization', 'Strategic planning', 'Expert advice', 'Efficiency improvement'],
      img: content.service_consulting?.url
    }
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary py-24 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Our Logistics Services
          </motion.h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Comprehensive delivery and supply chain solutions tailored to your needs. Krenium Logistics and Oil Resources Limited provides the best logistics in Lagos, including affordable truck rentals and reliable moving services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col h-full"
              >
                {service.img && (
                  <div className="h-56 overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className="p-8 flex-grow">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <Link to="/get-quote" className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                    Get a Quote <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-4">How It Works</h2>
            <h3 className="text-4xl font-bold text-slate-900">Our Simple Delivery Process</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -z-10"></div>
            {[
              { step: '01', title: 'Request Quote', desc: 'Fill our simple form or call us for a custom quote.' },
              { step: '02', title: 'Pickup', desc: 'We pick up your items from your location or you drop off.' },
              { step: '03', title: 'Transit', desc: 'Your items move securely through our network.' },
              { step: '04', title: 'Delivery', desc: 'Safe and timely delivery to the final destination.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg text-center border border-slate-100">
                <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-6 text-xl">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
