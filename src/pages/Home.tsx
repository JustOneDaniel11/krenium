import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, BarChart3, Users, Award, Truck, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import OperationsSlider from '../components/OperationsSlider';
import { useContent } from '../hooks/useContent';

const Home = () => {
  const { content } = useContent('Home');
  const { content: serviceContent } = useContent('Services');

  const heroBg = content.hero_bg?.url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000";
  const relocationImg = serviceContent.service_relocation?.url || "https://images.unsplash.com/photo-1600585154340-be6199f74009?auto=format&fit=crop&q=80&w=800";
  const haulageImg = serviceContent.service_haulage?.url || "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Logistics Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block bg-secondary px-4 py-1 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              Fast & Reliable Logistics
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Moving Your Business <span className="text-blue-200">Across Nigeria</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed">
              Fast and secure deliveries within Nigeria. 
              We provide secure, efficient, and transparent logistics solutions for businesses and individuals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/quote" className="bg-secondary hover:bg-slate-800 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-xl">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-slate-50 relative z-20 -mt-10 max-w-7xl mx-auto w-full rounded-2xl shadow-sm border border-slate-100">
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
              { step: '03', title: 'Transit', desc: 'Your shipment moves securely through our network.' },
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

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-sm relative z-20 max-w-6xl mx-auto w-full rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 px-8 border border-slate-100 mt-16">
        {[
          { icon: <Truck className="text-secondary" />, label: 'Daily Deliveries', value: '10k+' },
          { icon: <Users className="text-secondary" />, label: 'Happy Clients', value: '25k+' },
          { icon: <Award className="text-secondary" />, label: 'Years Experience', value: '15+' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Trusted Brands Section */}
      <section className="py-16 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <p className="text-center text-blue-200 text-sm font-bold uppercase tracking-widest">Trusted by Industry Leaders</p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap gap-12 md:gap-20 transition-all duration-500 py-4"
          >
            {[
              'UBA', 'Heritage Bank', 'Big Brother Naija', 'The Voice Nigeria', 'Goonite', 'Multichoice',
              'UBA', 'Heritage Bank', 'Big Brother Naija', 'The Voice Nigeria', 'Goonite', 'Multichoice'
            ].map((brand, i) => (
              <div key={`${brand}-${i}`} className="text-2xl md:text-3xl font-black text-white/70 hover:text-white transition-colors cursor-default select-none px-4">
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900">Logistics Solutions for Every Need</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Corporate & Residential Relocation',
                desc: 'Seamless office and private home moves with professionalism and care.',
                icon: <Truck size={40} className="text-secondary" />,
                img: relocationImg
              },
              {
                title: 'Haulage Services',
                desc: 'Bulk transportation of goods using well-maintained vehicles and experienced personnel.',
                icon: <BarChart3 size={40} className="text-secondary" />,
                img: haulageImg
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group"
              >
                <div className="h-48 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <div className="mb-4">{service.icon}</div>
                  <h4 className="text-2xl font-bold mb-4 text-primary">{service.title}</h4>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                  <Link to="/services" className="text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Learn More <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-1/2">
            <h2 className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-4">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8">The Most Trusted Logistics Partner in Nigeria</h3>
            <p className="text-slate-300 text-lg mb-12 leading-relaxed">
              We combine local expertise with high standards to ensure your shipments are handled with the highest level of professionalism and care.
            </p>
            
            <div className="space-y-8">
              {[
                { title: 'Fast Delivery', desc: 'Get your items delivered quickly across all major Nigerian cities.', icon: <Zap className="text-white" /> },
                { title: 'Secure Handling', desc: 'Your items are insured and handled by trained professionals to ensure zero damage.', icon: <Shield className="text-white" /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="bg-white/10 p-3 rounded-xl h-fit">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=1000" 
                alt="Logistics Team" 
                className="rounded-3xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-secondary p-8 rounded-2xl z-20 shadow-xl hidden md:block">
                <div className="text-4xl font-bold mb-1">99.9%</div>
                <div className="text-sm font-medium opacity-80">On-time Delivery Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Slider */}
      <OperationsSlider />

      {/* Quote Quick Access */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <Link to="/quote" className="group bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-8 hover:bg-secondary hover:text-white transition-all duration-500">
            <div className="bg-primary/10 group-hover:bg-white/10 p-6 rounded-2xl transition-colors">
              <Calculator className="text-primary group-hover:text-white" size={40} />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">Get a Quote</h3>
              <p className="text-slate-500 group-hover:text-slate-300">Request a free estimate for your shipping.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Testimonials</h2>
            <h3 className="text-4xl font-bold text-slate-900">What Our Clients Say</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Chidi Okafor', role: 'E-commerce Owner', text: 'Krenium Resources has transformed my business. Their nationwide delivery is incredibly reliable and my customers are always happy.' },
              { name: 'Sarah Thompson', role: 'Import Manager', text: 'Shipping from the UK to Lagos used to be a headache until I found these guys. Professional, transparent, and fast.' },
              { name: 'Ahmed Musa', role: 'Business Executive', text: 'The tracking system is top-notch. I always know exactly where my corporate documents are. Highly recommended!' },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                <div className="text-secondary text-5xl font-serif absolute top-4 right-8 opacity-20">"</div>
                <p className="text-slate-600 mb-8 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-primary">{t.name}</h5>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-secondary rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to Start Shipping?</h2>
          <p className="text-xl mb-10 opacity-90 relative z-10">Get a free quote today for your delivery.</p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link to="/quote" className="bg-white text-secondary px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-lg">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
