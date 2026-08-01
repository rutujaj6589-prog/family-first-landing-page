import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AtSign, User, CheckCircle, Send, X } from 'lucide-react';

interface FormState { name: string; phone: string; email: string; childAge: string; message: string; }

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', email: '', childAge: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset form after a short delay so the animation finishes smoothly
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', childAge: '', message: '' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black/50"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="p-10 md:p-12 text-center">
                <motion.div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgba(52,211,153,0.4)]"
                  animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="font-serif font-extrabold text-white text-3xl mb-3">You're All Set! 🎉</h3>
                <p className="text-slate-300 text-lg mb-2">Thank you, <strong className="text-white">{form.name}</strong>!</p>
                <p className="text-slate-400 text-[16px]">Our advisor will call you within 2 hours to schedule your free consultation.</p>
                
                <button 
                  onClick={handleClose}
                  className="mt-8 px-8 py-3 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-10">
                <h3 className="font-serif font-extrabold text-white text-2xl md:text-3xl mb-2">Book Your Free Consultation</h3>
                <p className="text-slate-400 mb-8">Secure your child's education with expert planning.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { icon: <User className="w-5 h-5" />, type: 'text', key: 'name', placeholder: 'Your Full Name', required: true },
                    { icon: <Phone className="w-5 h-5" />, type: 'tel', key: 'phone', placeholder: 'Mobile Number', required: true },
                    { icon: <AtSign className="w-5 h-5" />, type: 'email', key: 'email', placeholder: 'Email Address', required: true },
                  ].map((field) => (
                    <div key={field.key} className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{field.icon}</div>
                      <input type={field.type} required={field.required} placeholder={field.placeholder}
                        value={form[field.key as keyof FormState]}
                        onChange={(e) => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                        className="w-full py-3.5 pr-4 pl-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-[16px] outline-none transition-all focus:border-amber-500 focus:bg-white/10"
                      />
                    </div>
                  ))}
                  
                  <div className="relative">
                    <select value={form.childAge} onChange={(e) => setForm(p => ({ ...p, childAge: e.target.value }))}
                      className={`w-full py-3.5 px-4 rounded-2xl bg-white/5 border border-white/10 text-[16px] outline-none transition-all focus:border-amber-500 focus:bg-white/10 appearance-none ${form.childAge ? 'text-white' : 'text-slate-500'}`}>
                      <option value="" disabled className="text-slate-900">Child's Current Age</option>
                      {[...Array(18)].map((_, i) => <option key={i} value={i} className="text-slate-900">{i === 0 ? 'Newborn' : `${i} year${i > 1 ? 's' : ''} old`}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                  </div>
                  
                  <textarea placeholder="Any specific questions? (Optional)" value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} rows={3}
                    className="w-full py-3.5 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-[16px] outline-none transition-all focus:border-amber-500 focus:bg-white/10 resize-none" />
                  
                  <motion.button type="submit" disabled={loading}
                    className="mt-2 py-4 rounded-2xl font-bold text-[17px] text-white bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg shadow-orange-200/30 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -1, boxShadow: '0 12px 30px rgba(245,158,11,0.4)' }}
                    whileTap={{ scale: 0.98 }}>
                    {loading ? (
                      <><motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} /> Booking...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Book My Free Consultation</>
                    )}
                  </motion.button>
                  <p className="text-slate-400 text-sm text-center mt-2">🔒 Your data is 100% secure. No spam, ever.</p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
