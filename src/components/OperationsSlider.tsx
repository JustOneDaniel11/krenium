import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useSlider } from '../hooks/useContent';

const defaultOperations = [
  {
    url: 'https://images.unsplash.com/photo-1601750500644-798783856440?auto=format&fit=crop&q=80&w=1200',
    caption: 'Fast nationwide delivery operations.',
    title: 'Loading & Unloading'
  },
  {
    url: 'https://images.unsplash.com/photo-1586864387917-f575a622440d?auto=format&fit=crop&q=80&w=1200',
    caption: 'Secure cargo handling by trained professionals.',
    title: 'Packaging & Sorting'
  },
  {
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200',
    caption: 'Efficient warehouse management.',
    title: 'Warehouse Operations'
  },
  {
    url: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=1200',
    caption: 'Rapid dispatch and last-mile delivery.',
    title: 'Dispatch Riders'
  },
  {
    url: 'https://images.unsplash.com/photo-1522071823991-b5ae7264040e?auto=format&fit=crop&q=80&w=1200',
    caption: 'Strategic logistics planning and coordination.',
    title: 'Team Coordination'
  }
];

const OperationsSlider = () => {
  const { images, loading } = useSlider();
  const [currentIndex, setCurrentIndex] = useState(0);

  const operations = images.length > 0 ? images.map(img => ({
    url: img.url,
    title: img.title,
    caption: img.caption || img.title // Using title as fallback if caption is empty
  })) : defaultOperations;

  useEffect(() => {
    if (operations.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % operations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [operations.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % operations.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + operations.length) % operations.length);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Operations in Action</h2>
          <h3 className="text-4xl font-bold text-slate-900">Real-time Logistics Excellence</h3>
        </div>

        <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
          {/* Preload all images to prevent slow loading on slide change */}
          <div className="hidden">
            {operations.map((op, i) => (
              <img key={i} src={op.url} alt="preload" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={operations[currentIndex].url}
                alt={operations[currentIndex].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-blue-200 font-bold uppercase tracking-wider mb-2">{operations[currentIndex].title}</h4>
                  <p className="text-2xl md:text-4xl font-bold mb-4">{operations[currentIndex].caption}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {operations.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsSlider;
