import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Map, Truck, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useContent } from '../hooks/useContent';

const Contact = () => {
  const { content } = useContent('General');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          phone: 'N/A',
          status: 'new'
        }
      ]);

      if (error) throw error;
      
      // WhatsApp Redirect
      const phoneNumber = "2348166548652";
      const whatsappMessage = `*New Contact Message*\n\n*Name:* ${formData.fullName}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      
      setSubmitted(true);
    } catch (err: any) {
      console.error('Supabase Error:', err);
      alert(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <SEO 
        title="Contact Krenium Logistics | Logistics Company in Lagos"
        description="Contact Krenium Logistics and Oil Resources Limited for reliable logistics in Lagos, truck rentals, and moving services."
        canonicalUrl="https://www.kreniumresources.com/contact"
      />
      {/* Header */}
      <section className="bg-primary py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-slate-300">We're here to help with all your logistics and delivery needs. Contact Krenium Logistics and Oil Resources Limited for reliable logistics in Lagos and truck rentals.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-6">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary"><Phone size={24} /></div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Phone</h3>
                <p className="text-slate-600 mb-1">{content.contact_phone?.text || '+234 800 000 0000'}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-6">
              <div className="bg-secondary/10 p-4 rounded-2xl text-secondary"><Mail size={24} /></div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Email</h3>
                <p className="text-slate-600 mb-1">{content.contact_email?.text || 'hello@krenium.com'}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-6">
              <div className="bg-accent/10 p-4 rounded-2xl text-accent"><MapPin size={24} /></div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Office</h3>
                <p className="text-slate-600">{(content.address?.text && content.address.text !== 'Lagos, Nigeria') ? content.address.text : '927/928, bishop aboyade cole street victoria island lagos state nigeria'}</p>
              </div>
            </div>

            <div className="bg-primary p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Clock size={20} className="text-blue-200" /> Business Hours</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-300">Mon - Fri</span>
                  <span className="font-bold">08:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-300">Saturday</span>
                  <span className="font-bold">09:00 AM - 02:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Sunday</span>
                  <span className="font-bold text-blue-200">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 h-full">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 h-full flex flex-col justify-center"
                >
                  <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">Message Sent!</h2>
                  <p className="text-slate-600 text-lg mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-secondary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">Send us a Message</h2>
                  <p className="text-slate-500 mb-8">Have a question or need support? Fill out the form below.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Subject</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                      placeholder="How can we help?" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Message</label>
                    <textarea 
                      required 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all h-48" 
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Message'} <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Our Location</h2>
            <h3 className="text-4xl font-bold text-slate-900">Visit Our Headquarters</h3>
          </div>
          
          <div className="h-[500px] w-full bg-slate-200 rounded-3xl overflow-hidden relative shadow-2xl">
            {/* Placeholder for Google Map */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <div className="text-center p-8">
                <MapPin size={64} className="text-secondary mx-auto mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold text-primary mb-2">Head Office</h4>
                <p className="text-slate-500 max-w-md mx-auto mb-4">
                  {(content.address?.text && content.address.text !== 'Lagos, Nigeria') ? content.address.text : '927/928, bishop aboyade cole street victoria island lagos state nigeria'}
                </p>
                <h4 className="text-xl font-bold text-primary mb-2">Operation Location</h4>
                <p className="text-slate-500 max-w-md mx-auto">
                  Tipper Garage, Alasia Bus Stop by Lagos Business School, Lekki Epe Express Way.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <div className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm font-bold text-primary">
                    <Map size={18} className="text-secondary" /> National Hub
                  </div>
                  <div className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm font-bold text-primary">
                    <Truck size={18} className="text-secondary" /> 24/7 Dispatch
                  </div>
                </div>
              </div>
            </div>
            {/* Real map would go here as an iframe or component */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
