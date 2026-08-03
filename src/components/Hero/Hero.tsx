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
      <>Secure Your Child's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Dream Education</span> Before Tomorrow Arrives</>
    ),
    description: "Don't let inflation steal your child's future. Our Education Planning Insurance ensures your child reaches their dream college — no matter what life brings.",
    image: "family.png",
    type: "cutout"
  },
  {
    id: 2,
    badge: "Wealth Creation Strategy",
    title: (
      <>Start Early, Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Massive Corpus</span> For Their Future</>
    ),
    description: "Harness the power of compounding. Small, disciplined investments today can create a multi-crore fund for your child's higher education and marriage.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "photo"
  },
  {
    id: 3,
    badge: "100% Secure & Guaranteed",
    title: (
      <>Zero Market Risk, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Guaranteed Returns</span> & Protection</>
    ),
    description: "Sleep peacefully knowing your child's education fund is 100% safe from market volatility, backed by IRDAI approved guaranteed return plans.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "photo"
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
    <section id="hero" className="relative min-h-screen flex items-center bg-[#fffdf0] overflow-hidden pt-24 pb-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/20 blur-[60px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-amber-500/20 blur-[60px] animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col pt-4">
        
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full"
            >
              {/* LEFT: Content */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-200/50 border border-orange-200 mb-6">
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-amber-500 block"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
                    transition={{ duration: 1.5, repeat: Infinity }} 
                  />
                  <span className="text-amber-600 text-sm font-semibold">{slides[currentSlide].badge}</span>
                </div>

                {/* Heading */}
                <h1 className="font-serif font-extrabold text-slate-900 leading-[1.15] mb-6 text-4xl md:text-5xl lg:text-6xl min-h-[140px] md:min-h-[160px] lg:min-h-[180px]">
                  {slides[currentSlide].title}
                </h1>

                {/* Description */}
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl min-h-[80px]">
                  {slides[currentSlide].description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <motion.button
                    onClick={onOpenModal}
                    className="px-8 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg shadow-orange-200/30 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 12px 40px rgba(37,99,235,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Book Free Consultation
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
                  </motion.button>
                  <Link to="calculator" smooth duration={500}>
                    <motion.button
                      className="px-8 py-4 rounded-2xl font-semibold text-lg text-slate-700 bg-white border border-slate-200 hover:border-amber-500 hover:bg-orange-50 hover:text-amber-500 transition-all shadow-sm"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Calculate Education Cost
                    </motion.button>
                  </Link>
                </div>

                {/* Trust tags */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {['IRDAI Approved', '100% Claim Support', 'No Hidden Charges'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {t}
                    </span>
                  ))}
                </div>

                {/* Slider Controls - Moved to bottom of content */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex gap-2">
                    {slides.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-amber-500' : 'w-2.5 bg-amber-200 hover:bg-amber-400'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={prevSlide} className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-orange-100 text-amber-600 hover:bg-orange-50 shadow-sm transition-all" aria-label="Previous slide">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextSlide} className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-orange-100 text-amber-600 hover:bg-orange-50 shadow-sm transition-all" aria-label="Next slide">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* RIGHT: Image Area */}
              <div className="flex justify-center lg:justify-end relative w-full mt-4 lg:mt-0">
                <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl flex justify-center lg:justify-end h-[400px] lg:h-[630px] items-center">
                  {/* Glowing background blob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-amber-300/30 to-orange-500/10 rounded-full blur-3xl -z-10" />

                  {/* Smart Image Rendering based on type */}
                  {slides[currentSlide].type === "cutout" ? (
                    <motion.img 
                      src={`${import.meta.env.BASE_URL}${slides[currentSlide].image}`}
                      alt="Hero Slide" 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.25)] origin-bottom relative z-10" 
                    />
                  ) : (
                    <motion.div 
                      className="w-full h-[80%] rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl relative z-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <img 
                        src={slides[currentSlide].image}
                        alt="Hero Slide" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats bar (Outside AnimatePresence so it remains stable) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mt-8 lg:mt-4 w-full z-20 relative">
          {stats.map((s) => (
            <AnimatedStat key={s.label} stat={s} />
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-px">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M0 80V40C240 0 480 65 720 40C960 15 1200 65 1440 40V80H0Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
