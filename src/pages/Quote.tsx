import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  Calculator, 
  Truck, 
  Package, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  Info,
  AlertCircle,
  MessageCircle,
  Shield,
  Loader2
} from 'lucide-react';
import { useContent } from '../hooks/useContent';
import SEO from '../components/SEO';

const Quote = () => {
  const { content } = useContent('General');
  const [activeTab, setActiveTab] = useState<'quote' | 'enquiry'>('quote');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  
  // Form State for Moving Quote
  const [quoteData, setQuoteData] = useState({
    fullName: '',
    phone: '',
    email: '',
    instructions: ''
  });

  // Form State for General Enquiry
  const [enquiryData, setEnquiryData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: ''
  });

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('quotes').insert([
        {
          full_name: quoteData.fullName,
          phone: quoteData.phone,
          email: quoteData.email,
          pickup: 'N/A',
          destination: 'N/A',
          package_type: 'N/A',
          weight: 'N/A',
          speed: 'N/A',
          pickup_date: new Date().toISOString().split('T')[0],
          instructions: quoteData.instructions,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      // WhatsApp Redirect for Quote using Brand Phone
      const rawPhone = content.contact_phone?.text || "+2348166548652";
      const phoneNumber = rawPhone.replace(/\D/g, ""); // Extract only numbers

      const whatsappMessage = `*New Quote Request*\n\n*Name:* ${quoteData.fullName}\n*Phone:* ${quoteData.phone}\n*Email:* ${quoteData.email}\n*Details:* ${quoteData.instructions}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      setWhatsappUrl(waUrl);
      window.open(waUrl, '_blank');

      setSubmitted(true);
    } catch (err: any) {
      console.error('Supabase Error:', err);
      setError(err.message || 'Failed to submit quote request');
    } finally {
      setLoading(false);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          full_name: enquiryData.fullName,
          email: enquiryData.email,
          phone: enquiryData.phone,
          subject: enquiryData.subject,
          message: enquiryData.message,
          status: 'new'
        }
      ]);

      if (error) throw error;

      // WhatsApp Redirect for Enquiry using Brand Phone
      const rawPhone = content.contact_phone?.text || "+2348166548652";
      const phoneNumber = rawPhone.replace(/\D/g, ""); // Extract only numbers

      const whatsappMessage = `*New General Enquiry*\n\n*Name:* ${enquiryData.fullName}\n*Email:* ${enquiryData.email}\n*Phone:* ${enquiryData.phone}\n*Subject:* ${enquiryData.subject}\n*Message:* ${enquiryData.message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      setWhatsappUrl(waUrl);
      window.open(waUrl, '_blank');

      setSubmitted(true);
    } catch (err: any) {
      console.error('Supabase Error:', err);
      setError(err.message || 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <SEO 
        title="Get a Quote – Krenium Logistics & Truck Rentals in Lagos"
        description="Request a free quote for logistics in Lagos, truck rentals, and moving services from Krenium Logistics and Oil Resources Limited."
        canonicalUrl="https://www.kreniumresources.com/get-quote"
      />
      {/* Header */}
      <section className="bg-primary py-24 px-4 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Tell Us What You Need
          </motion.h1>
          <p className="text-xl text-slate-300">We're here to provide the best logistics solutions for your business. Get a quote for logistics in Lagos, truck rentals, and moving services from Krenium Logistics and Oil Resources Limited.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 -mt-12 relative z-20">
        {/* Tab Selection */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <button
            onClick={() => { setActiveTab('quote'); setSubmitted(false); }}
            className={`flex-1 p-8 rounded-3xl border-2 transition-all text-left flex items-start gap-6 group ${
              activeTab === 'quote' 
              ? 'bg-white border-secondary shadow-2xl' 
              : 'bg-white/50 border-transparent hover:border-slate-200 grayscale hover:grayscale-0'
            }`}
          >
            <div className={`p-4 rounded-2xl transition-colors ${activeTab === 'quote' ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Truck size={32} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${activeTab === 'quote' ? 'text-primary' : 'text-slate-500'}`}>Request a Moving Quote</h3>
              <p className="text-slate-500 text-sm">For clients ready to move items across Nigeria.</p>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab('enquiry'); setSubmitted(false); }}
            className={`flex-1 p-8 rounded-3xl border-2 transition-all text-left flex items-start gap-6 group ${
              activeTab === 'enquiry' 
              ? 'bg-white border-primary shadow-2xl' 
              : 'bg-white/50 border-transparent hover:border-slate-200 grayscale hover:grayscale-0'
            }`}
          >
            <div className={`p-4 rounded-2xl transition-colors ${activeTab === 'enquiry' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
              <MessageSquare size={32} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${activeTab === 'enquiry' ? 'text-primary' : 'text-slate-500'}`}>General Enquiry</h3>
              <p className="text-slate-500 text-sm">Have a question? Ask our team about our services.</p>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-12 md:p-24 text-center"
              >
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={56} />
                </div>
                <h2 className="text-4xl font-bold text-primary mb-4">Request Submitted!</h2>
                <p className="text-slate-600 text-xl mb-12 max-w-lg mx-auto">
                  Thank you! Please click the button below to forward your details directly to our WhatsApp.
                </p>
                <div className="flex flex-col items-center gap-6">
                  {whatsappUrl && (
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#22bf5b] transition-all shadow-lg flex items-center gap-3"
                    >
                      <MessageCircle size={24} /> Continue to WhatsApp
                    </a>
                  )}
                  <button 
                    onClick={() => { setSubmitted(false); setWhatsappUrl(null); }}
                    className="text-slate-500 hover:text-slate-700 font-bold hover:underline"
                  >
                    Send another request
                  </button>
                </div>
              </motion.div>
            ) : activeTab === 'quote' ? (
              <motion.div
                key="quote-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8 md:p-12"
              >
                <form onSubmit={handleQuoteSubmit} className="space-y-10">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
                      <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={quoteData.fullName}
                        onChange={(e) => setQuoteData({...quoteData, fullName: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" 
                        placeholder="Enter your name" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        value={quoteData.phone}
                        onChange={(e) => setQuoteData({...quoteData, phone: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" 
                        placeholder="+234..." 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        value={quoteData.email}
                        onChange={(e) => setQuoteData({...quoteData, email: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" 
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Quote Details & Requirements</label>
                    <textarea 
                      required
                      value={quoteData.instructions}
                      onChange={(e) => setQuoteData({...quoteData, instructions: e.target.value})}
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all h-40" 
                      placeholder="Please describe what you need moving, pickup/delivery areas, or any specific requirements..."
                    ></textarea>
                  </div>

                  <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100">
                    <div className="space-y-4 w-full md:w-auto">
                      <p className="font-bold text-slate-900">Need urgent assistance? Speak to a Human Representative.</p>
                      <div className="flex flex-wrap gap-3">
                        <a href="tel:+234800LOGISTICS" className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                          <Phone size={16} className="text-primary" /> Call Now
                        </a>
                        <a href="https://wa.me/234800LOGISTICS" className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
                          <MessageCircle size={16} /> WhatsApp
                        </a>
                        <button type="button" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
                          <MessageSquare size={16} /> Live Chat
                        </button>
                      </div>
                    </div>
                    <button 
                      disabled={loading}
                      type="submit" 
                      className="w-full md:w-auto bg-secondary hover:bg-slate-800 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Quote Request'} <Send size={20} />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="enquiry-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <form onSubmit={handleEnquirySubmit} className="space-y-8">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
                      <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={enquiryData.fullName}
                        onChange={(e) => setEnquiryData({...enquiryData, fullName: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                        placeholder="Enter your name" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        value={enquiryData.email}
                        onChange={(e) => setEnquiryData({...enquiryData, email: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        value={enquiryData.phone}
                        onChange={(e) => setEnquiryData({...enquiryData, phone: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                        placeholder="+234..." 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Subject of Enquiry</label>
                      <select 
                        value={enquiryData.subject}
                        onChange={(e) => setEnquiryData({...enquiryData, subject: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option>General Question</option>
                        <option>Corporate & Residential Relocation</option>
                        <option>Diesel Supply & Delivery</option>
                        <option>Haulage Services</option>
                        <option>Storage Solutions</option>
                        <option>Truck & Van Rental</option>
                        <option>Dispatch & Delivery</option>
                        <option>Logistics Consulting</option>
                        <option>Partnership Opportunity</option>
                        <option>Career Enquiry</option>
                        <option>Billing & Payments</option>
                        <option>Complaint</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message / Question</label>
                    <textarea 
                      required 
                      value={enquiryData.message}
                      onChange={(e) => setEnquiryData({...enquiryData, message: e.target.value})}
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-48" 
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      disabled={loading}
                      type="submit" 
                      className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Message'} <Send size={20} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
              <Calculator size={24} />
            </div>
            <h4 className="text-xl font-bold text-primary mb-3">Instant Estimates</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our team uses real-time data to provide the most accurate moving and delivery estimates in the industry.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <Truck size={24} />
            </div>
            <h4 className="text-xl font-bold text-primary mb-3">Nationwide Coverage</h4>
            <p className="text-slate-500 text-sm leading-relaxed">We serve all 36 states in Nigeria with reliable and secure delivery solutions.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Shield size={24} />
            </div>
            <h4 className="text-xl font-bold text-primary mb-3">Fully Insured</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Every delivery is backed by our comprehensive insurance policy for your peace of mind.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
