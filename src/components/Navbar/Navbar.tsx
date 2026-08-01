import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, X, Phone } from 'lucide-react';
import FamilyFirstLogo from '../common/Logo';

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'Why Plan', to: 'why-education' },
  { label: 'Benefits', to: 'benefits' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'FAQ', to: 'faq' },
];

const Navbar = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-amber-500/5 py-3 border-b border-slate-100' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="hero" smooth duration={500} className="cursor-pointer">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <FamilyFirstLogo light={false} size="sm" />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} smooth duration={500} offset={-80} className="cursor-pointer">
                <span className="block px-4 py-2 rounded-xl text-[15px] font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-500 transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA area */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-500 transition-colors px-3 py-2 rounded-xl">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>

            <motion.button
              onClick={onOpenModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-400 to-amber-600 shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-amber-500/40 transition-all"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Free Consultation
            </motion.button>
          </div>

          {/* Hamburger */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-amber-500 hover:bg-slate-50 cursor-pointer"
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setMobileOpen(false)}
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl flex flex-col pt-24 px-6 pb-8"
            >
              <div className="mb-6">
                <FamilyFirstLogo light={false} size="sm" />
              </div>

              <nav className="flex-1 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div key={item.to} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}>
                    <Link to={item.to} smooth duration={500} offset={-80} onClick={() => setMobileOpen(false)} className="cursor-pointer block">
                      <div className="px-4 py-3 rounded-xl text-slate-700 font-semibold text-base hover:bg-slate-50 hover:text-amber-500 transition-colors">
                        {item.label}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
                <a href="tel:+919876543210" className="flex items-center gap-3 text-slate-700 font-semibold no-underline">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  +91 98765 43210
                </a>
                <button 
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenModal?.();
                  }}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30"
                >
                  Free Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
