import React from 'react';
import { motion } from 'motion/react';
import { users } from 'lucide-react';
import SEO from '../components/SEO';
import { reviews } from '../data/reviews';

const Reviews = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <SEO 
        title="Client Reviews | Krenium Logistics"
        description="Read what our clients have to say about our moving company and logistics services in Lagos, Nigeria."
        canonicalUrl="https://www.kreniumresources.com/reviews"
      />
      {/* Header */}
      <section className="bg-primary py-24 px-4 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Client Testimonials
          </motion.h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Don't just take our word for it. Here is what our clients have to say about working with Krenium Logistics and Oil Resources Limited.
          </p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative hover:shadow-xl transition-shadow h-full flex flex-col"
              >
                <div className="text-secondary text-5xl font-serif absolute top-4 right-8 opacity-20">"</div>
                <p className="text-slate-600 mb-8 italic leading-relaxed flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-50">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-primary">{t.name}</h5>
                    <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
