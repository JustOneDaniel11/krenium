import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { db, auth, storage } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Truck, 
  MessageSquare, 
  LogOut, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Package,
  ChevronRight,
  AlertCircle,
  Image as ImageIcon,
  Settings,
  Plus,
  Save,
  ExternalLink,
  Upload,
  Loader2
} from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'enquiries' | 'content' | 'slider'>('quotes');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [content, setContent] = useState<any[]>([]);
  const [sliderImages, setSliderImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isAddingSlider, setIsAddingSlider] = useState(false);
  const [newSlider, setNewSlider] = useState({ url: '', title: '', order: 0 });
  const [uploading, setUploading] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, collection: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const quotesQuery = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
    const enquiriesQuery = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const contentQuery = query(collection(db, 'content'), orderBy('section', 'asc'));
    const sliderQuery = query(collection(db, 'slider_images'), orderBy('order', 'asc'));

    const unsubQuotes = onSnapshot(quotesQuery, (snapshot) => {
      setQuotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error("Quotes Snapshot Error:", error);
      setLoading(false);
    });

    const unsubEnquiries = onSnapshot(enquiriesQuery, (snapshot) => {
      setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Enquiries Snapshot Error:", error));

    const unsubContent = onSnapshot(contentQuery, (snapshot) => {
      setContent(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Content Snapshot Error:", error));

    const unsubSlider = onSnapshot(sliderQuery, (snapshot) => {
      setSliderImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Slider Snapshot Error:", error));

    return () => {
      unsubQuotes();
      unsubEnquiries();
      unsubContent();
      unsubSlider();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const updateStatus = async (id: string, collectionName: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, collectionName, id), { status: newStatus });
      if (selectedItem?.id === id) {
        setSelectedItem({ ...selectedItem, status: newStatus });
      }
    } catch (error) {
      console.error("Update Status Error:", error);
    }
  };

  const deleteItem = async () => {
    if (!itemToDelete) return;
    try {
      await deleteDoc(doc(db, itemToDelete.collection, itemToDelete.id));
      setSelectedItem(null);
      setItemToDelete(null);
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleUpdateContent = async (id: string, value: string, field: 'url' | 'text' = 'url') => {
    try {
      const updateData: any = { 
        updatedAt: new Date().toISOString()
      };
      updateData[field] = value;
      await updateDoc(doc(db, 'content', id), updateData);
    } catch (error) {
      console.error("Update Content Error:", error);
    }
  };

  const handleFileUpload = async (file: File, id: string, type: 'content' | 'slider') => {
    setUploading(id);
    try {
      const storageRef = ref(storage, `${type}/${id}_${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on('state_changed', 
          null, 
          (error) => {
            console.error("Upload Error:", error);
            setUploading(null);
            reject(error);
          }, 
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            if (type === 'content') {
              await handleUpdateContent(id, downloadURL);
            } else if (type === 'slider' && id !== 'new') {
              await updateDoc(doc(db, 'slider_images', id), { url: downloadURL });
            }
            setUploading(null);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error("File Upload Error:", error);
      setUploading(null);
      throw error;
    }
  };

  const handleAddSlider = async () => {
    try {
      await addDoc(collection(db, 'slider_images'), {
        ...newSlider,
        active: true
      });
      setIsAddingSlider(false);
      setNewSlider({ url: '', title: '', order: sliderImages.length });
    } catch (error) {
      console.error("Add Slider Error:", error);
    }
  };

  const seedInitialContent = async () => {
    const initialContent = [
      { key: 'hero_bg', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80', alt: 'Logistics Warehouse', section: 'Home', type: 'image' },
      { key: 'about_story', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80', alt: 'Our Story', section: 'About', type: 'image' },
      { key: 'founder_image', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80', alt: 'Founder', section: 'About', type: 'image' },
      { key: 'founder_name', text: 'Kenneth Onyekachi Onyenwe', section: 'About', type: 'text', label: 'Founder Name' },
      { key: 'founder_title', text: 'Operating Director | Logistics & Operations Executive', section: 'About', type: 'text', label: 'Founder Title' },
      { key: 'founder_message', text: 'Logistics is more than just moving items from point A to point B. It\'s about building trust, enabling commerce, and connecting people. At Krenium, we are dedicated to creating a network that every Nigerian can rely on, powered by integrity and driven by innovation.', section: 'About', type: 'text', label: 'Founder Message' },
      { key: 'founder_summary', text: 'Dynamic and result-driven Logistics and Operations Executive with over a decade of progressive experience managing large-scale logistics operations, corporate relocations, haulage services, diesel supply (AGO), and strategic project coordination across Nigeria.', section: 'About', type: 'text', label: 'Founder Summary' },
      { key: 'service_relocation', url: 'https://images.unsplash.com/photo-1600585154340-be6199f74009?auto=format&fit=crop&q=80', alt: 'Relocation', section: 'Services', type: 'image' },
      { key: 'service_diesel', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80', alt: 'Diesel Supply', section: 'Services', type: 'image' },
      { key: 'service_haulage', url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80', alt: 'Haulage', section: 'Services', type: 'image' },
      { key: 'service_storage', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80', alt: 'Storage', section: 'Services', type: 'image' },
      { key: 'service_rental', url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80', alt: 'Rental', section: 'Services', type: 'image' },
      { key: 'service_dispatch', url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80', alt: 'Dispatch', section: 'Services', type: 'image' },
      { key: 'service_consulting', url: 'https://images.unsplash.com/photo-1454165833767-027ff33027ef?auto=format&fit=crop&q=80', alt: 'Consulting', section: 'Services', type: 'image' }
    ];

    const initialSlider = [
      { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80', title: 'Lagos Distribution Center', order: 0, active: true },
      { url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80', title: 'Abuja Logistics Hub', order: 1, active: true },
      { url: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80', title: 'Port Harcourt Port Operations', order: 2, active: true }
    ];

    try {
      for (const item of initialContent) {
        await setDoc(doc(db, 'content', item.key), { ...item, updatedAt: new Date().toISOString() });
      }
      for (const item of initialSlider) {
        await addDoc(collection(db, 'slider_images'), item);
      }
      console.log('Initial content seeded successfully!');
    } catch (error) {
      console.error("Seed Error:", error);
    }
  };

  const filteredQuotes = quotes.filter(q => 
    (q.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (q.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.pickup || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.destination || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEnquiries = enquiries.filter(e => 
    (e.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (e.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.subject || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'new': return 'bg-blue-100 text-blue-600';
      case 'contacted':
      case 'read': return 'bg-amber-100 text-amber-600';
      case 'completed':
      case 'replied': return 'bg-emerald-100 text-emerald-600';
      case 'cancelled':
      case 'archived': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary p-2 rounded-lg text-white">
            <LayoutDashboard size={24} />
          </div>
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'quotes' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Truck size={20} /> Shipping Quotes
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-md text-xs">{quotes.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'enquiries' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <MessageSquare size={20} /> General Enquiries
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-md text-xs">{enquiries.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'content' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Settings size={20} /> Site Content
          </button>
          <button 
            onClick={() => setActiveTab('slider')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'slider' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <ImageIcon size={20} /> Operations Slider
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all w-full"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10 overflow-hidden flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              {activeTab === 'quotes' ? 'Shipping Quotes' : 
               activeTab === 'enquiries' ? 'General Enquiries' :
               activeTab === 'content' ? 'Site Content Management' : 'Operations Slider'}
            </h1>
            <p className="text-slate-500">
              {activeTab === 'quotes' ? 'Manage and respond to incoming requests from Nigeria.' :
               activeTab === 'enquiries' ? 'Respond to customer questions and support requests.' :
               activeTab === 'content' ? 'Update images and assets across the frontend.' : 'Manage the images shown in the operations slider.'}
            </p>
          </div>

          {(activeTab === 'quotes' || activeTab === 'enquiries') && (
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          )}

          {activeTab === 'slider' && (
            <button 
              onClick={() => setIsAddingSlider(true)}
              className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <Plus size={20} /> Add Slider Image
            </button>
          )}
        </header>

        {/* Data Table / List */}
        <div className="flex-grow bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col">
          {activeTab === 'content' ? (
            <div className="p-8 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {content.map((asset) => (
                  <div key={asset.id} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{asset.section}</span>
                      <span className="text-[10px] text-slate-300">Key: {asset.key}</span>
                    </div>
                    
                    {asset.type === 'text' ? (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">{asset.label || 'Text Content'}</label>
                        <textarea 
                          defaultValue={asset.text}
                          onBlur={(e) => handleUpdateContent(asset.id, e.target.value, 'text')}
                          rows={4}
                          className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-white group relative">
                          <img src={asset.url} alt={asset.alt} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <a href={asset.url} target="_blank" rel="noreferrer" className="text-white p-2 hover:scale-110 transition-transform">
                              <ExternalLink size={24} />
                            </a>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">Image Asset</label>
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <input 
                                type="file" 
                                className="hidden" 
                                id={`file-${asset.id}`}
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, asset.id, 'content');
                                }}
                              />
                              <label 
                                htmlFor={`file-${asset.id}`}
                                className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all text-sm font-medium text-slate-600"
                              >
                                {uploading === asset.id ? (
                                  <Loader2 className="animate-spin text-primary" size={18} />
                                ) : (
                                  <Upload size={18} className="text-slate-400" />
                                )}
                                {uploading === asset.id ? 'Uploading...' : 'Upload Local Image'}
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 uppercase font-bold">OR URL:</span>
                              <input 
                                type="text" 
                                defaultValue={asset.url}
                                onBlur={(e) => handleUpdateContent(asset.id, e.target.value, 'url')}
                                className="flex-grow p-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {content.length === 0 && (
                  <div className="col-span-full py-20 text-center text-slate-400 flex flex-col items-center gap-4">
                    <AlertCircle size={48} />
                    <p>No content assets found. They will appear here once seeded or added.</p>
                    <button 
                      onClick={seedInitialContent}
                      className="bg-primary text-white px-6 py-2 rounded-xl font-bold mt-4"
                    >
                      Seed Initial Content
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'slider' ? (
            <div className="p-8 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {sliderImages.map((img) => (
                  <div key={img.id} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order: {img.order}</span>
                      <button 
                        onClick={() => setItemToDelete({ id: img.id, collection: 'slider_images' })}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-white">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-primary">{img.title}</p>
                      <div className="flex items-center gap-2">
                        <input 
                          type="file" 
                          className="hidden" 
                          id={`file-slider-${img.id}`}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, img.id, 'slider');
                          }}
                        />
                        <label 
                          htmlFor={`file-slider-${img.id}`}
                          className="p-2 rounded-lg bg-white border border-slate-200 hover:border-primary cursor-pointer transition-all"
                        >
                          {uploading === img.id ? (
                            <Loader2 className="animate-spin text-primary" size={14} />
                          ) : (
                            <Upload size={14} className="text-slate-400" />
                          )}
                        </label>
                        <p className="text-[10px] text-slate-400 truncate flex-grow">{img.url}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {sliderImages.length === 0 && (
                  <div className="col-span-full py-20 text-center text-slate-400 flex flex-col items-center gap-4">
                    <ImageIcon size={48} />
                    <p>No slider images found. Add one to get started.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase tracking-wider">
                    {activeTab === 'quotes' ? 'Route' : 'Subject'}
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(activeTab === 'quotes' ? filteredQuotes : filteredEnquiries).map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedItem?.id === item.id ? 'bg-slate-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">{item.fullName}</div>
                      <div className="text-xs text-slate-500">{item.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {activeTab === 'quotes' ? (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="font-medium">{item.pickup}</span>
                          <ChevronRight size={14} className="text-slate-400" />
                          <span className="font-medium">{item.destination}</span>
                        </div>
                      ) : (
                        <div className="text-sm font-medium text-slate-600">{item.subject}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {(activeTab === 'quotes' ? filteredQuotes : filteredEnquiries).length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-400">
                        <AlertCircle size={48} />
                        <p className="text-lg font-medium">No records found matching your search.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedItem && (activeTab === 'quotes' || activeTab === 'enquiries') && (
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-50 p-8 overflow-y-auto border-l border-slate-200"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-primary">Request Details</h2>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-all"
              >
                <XCircle size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Status Management */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {(activeTab === 'quotes' ? ['pending', 'contacted', 'completed', 'cancelled'] : ['new', 'read', 'replied', 'archived']).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedItem.id, activeTab, s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedItem.status === s 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-primary'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-2">Customer Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Mail size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                      <p className="font-medium text-primary">{selectedItem.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><Phone size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                      <p className="font-medium text-primary">{selectedItem.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Specific Info */}
              {activeTab === 'quotes' ? (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-2">Shipping Details</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1"><MapPin size={12} /> Pickup</p>
                      <p className="font-medium text-primary">{selectedItem.pickup}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1"><MapPin size={12} /> Destination</p>
                      <p className="font-medium text-primary">{selectedItem.destination}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1"><Package size={12} /> Package</p>
                      <p className="font-medium text-primary">{selectedItem.packageType} ({selectedItem.weight})</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1"><Clock size={12} /> Speed</p>
                      <p className="font-medium text-primary">{selectedItem.speed}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1"><Calendar size={12} /> Pickup Date</p>
                      <p className="font-medium text-primary">{selectedItem.pickupDate}</p>
                    </div>
                  </div>
                  {selectedItem.instructions && (
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase">Special Instructions</p>
                      <p className="text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">"{selectedItem.instructions}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-2">Enquiry Content</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase">Subject</p>
                      <p className="font-bold text-primary text-lg">{selectedItem.subject}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase">Message</p>
                      <p className="text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100 leading-relaxed italic">"{selectedItem.message}"</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-slate-100">
                <button 
                  onClick={() => setItemToDelete({ id: selectedItem.id, collection: activeTab })}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                >
                  <Trash2 size={20} /> Delete Record
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* Add Slider Modal */}
      <AnimatePresence>
        {isAddingSlider && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full p-10 relative"
            >
              <button 
                onClick={() => setIsAddingSlider(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-all"
              >
                <XCircle size={24} className="text-slate-400" />
              </button>

              <h2 className="text-2xl font-bold text-primary mb-8">Add Slider Image</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Image Source</label>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <input 
                        type="file" 
                        className="hidden" 
                        id="new-slider-file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file, 'new', 'slider');
                            setNewSlider({...newSlider, url});
                          }
                        }}
                      />
                      <label 
                        htmlFor="new-slider-file"
                        className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all text-sm font-medium text-slate-600"
                      >
                        {uploading === 'new' ? (
                          <Loader2 className="animate-spin text-primary" size={20} />
                        ) : (
                          <Upload size={20} className="text-slate-400" />
                        )}
                        {uploading === 'new' ? 'Uploading...' : 'Upload Local Image'}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 uppercase font-bold">OR URL:</span>
                      <input 
                        type="text" 
                        value={newSlider.url}
                        onChange={(e) => setNewSlider({...newSlider, url: e.target.value})}
                        className="flex-grow p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all text-sm" 
                        placeholder="https://..." 
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Title / Caption</label>
                  <input 
                    type="text" 
                    value={newSlider.title}
                    onChange={(e) => setNewSlider({...newSlider, title: e.target.value})}
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all" 
                    placeholder="Lagos Logistics Hub" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Display Order</label>
                  <input 
                    type="number" 
                    value={newSlider.order}
                    onChange={(e) => setNewSlider({...newSlider, order: parseInt(e.target.value)})}
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all" 
                  />
                </div>

                <button 
                  onClick={handleAddSlider}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} /> Save Image
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full p-10 text-center"
            >
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Confirm Deletion</h2>
              <p className="text-slate-500 mb-8">
                Are you sure you want to delete this record? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setItemToDelete(null)}
                  className="flex-grow py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={deleteItem}
                  className="flex-grow py-4 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
