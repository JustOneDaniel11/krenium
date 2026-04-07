import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Users, MapPin, Award, CheckCircle2, Quote as QuoteIcon } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import SEO from '../components/SEO';

const About = () => {
  const { content } = useContent('About');
  
  const storyImg = content.about_story?.url;
  const founderImg = content.founder_image?.url;
  const founderName = content.founder_name?.text || "Kenneth Onyekachi Onyenwe";
  const founderTitle = content.founder_title?.text || "Operating Director | Logistics & Operations Executive";
  const founderMessage = content.founder_message?.text || "Logistics is more than just moving items from point A to point B. It's about building trust, enabling commerce, and connecting people. At Krenium, we are dedicated to creating a network that every Nigerian can rely on, powered by integrity and driven by innovation.";
  const founderSummary = content.founder_summary?.text || "Dynamic and result-driven Logistics and Operations Executive with over a decade of progressive experience managing large-scale logistics operations, corporate relocations, haulage services, diesel supply (AGO), and strategic project coordination across Nigeria.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Krenium Logistics and Oil Resources Limited",
      "description": "Trusted logistics in Lagos, providing moving services and truck rentals.",
      "url": "https://www.kreniumresources.com/about"
    }
  };

  return (
    <div className="pt-16">
      <SEO 
        title="About Us | Krenium Logistics and Oil Resources Limited"
        description="Learn about Krenium Logistics and Oil Resources Limited, your trusted partner for logistics in Lagos, truck rentals, and moving services."
        canonicalUrl="https://www.kreniumresources.com/about"
        schema={schema}
      />
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          {content.about_hero?.url && (
            <img 
              src={content.about_hero.url} 
              alt="Krenium Logistics and Oil Resources Limited - Logistics in Lagos Background" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-slate-900/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Your trusted partner in seamless logistics, driving efficiency and reliability across the Nigerian supply chain.
          </motion.p>
        </div>
      </section>

      {/* 2. Who We Are Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
                <h2 className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">Who We Are</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                  A Reliable Logistics & Operations Powerhouse in Nigeria
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Krenium Logistics and Oil Resources Limited is a premier logistics and operations company dedicated to providing world-class supply chain solutions. If you are looking for reliable logistics in Lagos or affordable truck rentals, we are your trusted partner. We pride ourselves on our unwavering commitment to <strong>efficiency</strong>, <strong>professionalism</strong>, and <strong>client satisfaction</strong>. With a robust <strong>nationwide network</strong>, we ensure that your goods, assets, and operations are managed with the highest level of precision and care.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-semibold text-slate-700">Nationwide Reach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-semibold text-slate-700">24/7 Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              {storyImg && (
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={storyImg} 
                    alt="Krenium Logistics Operations - Truck Rentals in Lagos" 
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Meet Our CEO Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold uppercase tracking-widest text-sm mb-4"
            >
              Leadership
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-primary"
            >
              Meet Our CEO
            </motion.h3>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
            <div className="flex flex-col lg:flex-row">
              {founderImg && (
                <div className="lg:w-2/5 relative">
                  <img 
                    src={founderImg} 
                    alt={founderName} 
                    className="w-full h-full object-cover min-h-[400px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent lg:hidden" />
                </div>
              )}
              
              <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="mb-8">
                  <h4 className="text-3xl font-bold text-primary mb-2">{founderName}</h4>
                  <p className="text-secondary font-semibold text-lg uppercase tracking-wide">
                    {founderTitle}
                  </p>
                </div>
                
                <div className="relative">
                  <QuoteIcon className="absolute -top-6 -left-6 text-slate-100 w-16 h-16 -z-0" />
                  <div className="relative z-10 space-y-6 text-slate-600 leading-relaxed">
                    <p>
                      {founderSummary}
                    </p>
                    <p>
                      {founderMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">Our Values</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-primary">Why Choose Us</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Reliability",
                desc: "We deliver on our promises, ensuring your cargo reaches its destination safely and on time.",
                icon: <Shield className="w-8 h-8" />,
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "Efficiency",
                desc: "Optimized routes and advanced fleet management for the fastest delivery possible.",
                icon: <Zap className="w-8 h-8" />,
                color: "bg-slate-100 text-slate-900"
              },
              {
                title: "Professional Team",
                desc: "Our experts handle every project with the highest level of corporate professionalism.",
                icon: <Users className="w-8 h-8" />,
                color: "bg-green-50 text-green-600"
              },
              {
                title: "Nationwide Reach",
                desc: "From Lagos to Calabar, we cover every corner of Nigeria with our extensive network.",
                icon: <MapPin className="w-8 h-8" />,
                color: "bg-purple-50 text-purple-600"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-sm`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to experience seamless logistics?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-secondary/20">
              Get a Quote
            </button>
            <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-slate-100 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
