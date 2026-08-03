import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { useRef, useEffect, useState } from 'react';

interface Stat { end: number; suffix: string; label: string; prefix?: string; }

const stats: Stat[] = [
  { end: 15000, suffix: '+', label: 'Families', prefix: '' },
  { end: 98, suffix: '%', label: 'Claims Settled', prefix: '' },
  { end: 500, suffix: 'Cr+', label: 'Coverage', prefix: '₹' },
  { end: 18, suffix: '+', label: 'Years Exp.', prefix: '' },
];

const AnimatedStat = ({ stat }: { stat: Stat }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    stat.end >= 1000 ? Math.round(v).toLocaleString('en-IN') : Math.round(v).toString()
  );
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, stat.end, { duration: 2.5, ease: 'easeOut' });
      const unsub = rounded.on('change', (v) => setDisplay(v));
      return () => { controls.stop(); unsub(); };
    }
  }, [isInView, count, rounded, stat.end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-extrabold font-serif text-slate-900 leading-none">
        {stat.prefix}{display}{stat.suffix}
      </div>
      <p className="text-slate-600 text-sm mt-1">{stat.label}</p>
    </div>
  );
};

const slides = [
  {
    id: 1,
    badge: "Education Planning Insurance",
    title: (
      <>Secure Your Child's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Dream Education</span> Before Tomorrow Arrives</>
    ),
    description: "Don't let inflation steal your child's future. Our Education Planning Insurance ensures your child reaches their dream college — no matter what life brings.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    badge: "Wealth Creation Strategy",
    title: (
      <>Start Early, Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Massive Corpus</span> For Their Future</>
    ),
    description: "Harness the power of compounding. Small, disciplined investments today can create a multi-crore fund for your child's higher education and marriage.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    badge: "100% Secure & Guaranteed",
    title: (
      <>Zero Market Risk, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Guaranteed Returns</span> & Protection</>
    ),
    description: "Sleep peacefully knowing your child's education fund is 100% safe from market volatility, backed by IRDAI approved guaranteed return plans.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  }
];

const Hero = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full pt-32 pb-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          {/* Main Content Area (Left aligned on desktop, centered on mobile) */}
          <div className="w-full max-w-3xl flex flex-col items-start text-left">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur border border-slate-700 mb-6">
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-amber-400 block"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
                    transition={{ duration: 1.5, repeat: Infinity }} 
                  />
                  <span className="text-amber-300 text-sm font-semibold tracking-wide uppercase">{slides[currentSlide].badge}</span>
                </div>

                {/* Heading */}
                <h1 className="font-serif font-extrabold text-white leading-[1.15] mb-6 text-4xl md:text-5xl lg:text-6xl min-h-[140px] md:min-h-[120px] drop-shadow-md">
                  {slides[currentSlide].title}
                </h1>

                {/* Description */}
                <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-8 max-w-xl min-h-[80px] drop-shadow">
                  {slides[currentSlide].description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <motion.button
                    onClick={onOpenModal}
                    className="px-8 py-4 rounded-2xl font-bold text-lg text-slate-900 bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg shadow-amber-500/20 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 12px 40px rgba(245,158,11,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Book Free Consultation
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
                  </motion.button>
                  <Link to="calculator" smooth duration={500}>
                    <motion.button
                      className="px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all shadow-sm"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Calculate Education Cost
                    </motion.button>
                  </Link>
                </div>

                {/* Trust tags */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {['IRDAI Approved', '100% Claim Support', 'No Hidden Charges'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-sm font-medium text-slate-200 bg-slate-900/40 backdrop-blur border border-slate-700/50 px-3 py-1.5 rounded-full shadow-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center gap-6 mt-2 relative z-20">
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-amber-400' : 'w-2.5 bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={prevSlide} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900/50 backdrop-blur border border-slate-700 text-white hover:bg-slate-800 transition-all" aria-label="Previous slide">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextSlide} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900/50 backdrop-blur border border-slate-700 text-white hover:bg-slate-800 transition-all" aria-label="Next slide">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats bar floating at bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-30 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-2xl"
          >
            {stats.map((s) => (
              <AnimatedStat key={s.label} stat={s} />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
