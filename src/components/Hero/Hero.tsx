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
      <>Secure Your Child's <span className="text-amber-600">Dream Education</span> Before Tomorrow Arrives</>
    ),
    description: "Don't let inflation steal your child's future. Our Education Planning Insurance ensures your child reaches their dream college — no matter what life brings.",
    image: `${import.meta.env.BASE_URL}education_planning_consultation.png`,
  },
  {
    id: 2,
    badge: "Wealth Creation Strategy",
    title: (
      <>Start Early, Build a <span className="text-amber-600">Massive Corpus</span> For Their Future</>
    ),
    description: "Harness the power of compounding. Small, disciplined investments today can create a multi-crore fund for your child's higher education and marriage.",
    image: `${import.meta.env.BASE_URL}wealth_creation_piggybank.png`,
  },
  {
    id: 3,
    badge: "100% Secure & Guaranteed",
    title: (
      <>Zero Market Risk, <span className="text-amber-600">Guaranteed Returns</span> & Protection</>
    ),
    description: "Sleep peacefully knowing your child's education fund is 100% safe from market volatility, backed by IRDAI approved guaranteed return plans.",
    image: `${import.meta.env.BASE_URL}secure_future_graduation.png`,
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
    <section id="hero" className="relative bg-[#fffdf0] overflow-hidden pt-32 pb-12">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Content Area */}
          <div className="flex flex-col items-start text-left w-full">
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/50 border border-amber-200 mb-6">
                    <span className="text-amber-700 text-sm font-semibold uppercase tracking-wider">{slides[currentSlide].badge}</span>
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
                  <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
                    <motion.button
                      onClick={onOpenModal}
                      className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl font-bold text-base text-white bg-gradient-to-r from-amber-400 to-amber-600 shadow-md shadow-amber-500/20 hover:from-amber-500 hover:to-amber-700 transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Free Consultation
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </motion.button>
                    <Link to="calculator" smooth duration={500} className="w-full sm:w-auto">
                      <motion.button
                        className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl font-semibold text-base text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Calculate Education Cost
                      </motion.button>
                    </Link>
                  </div>

                  {/* Trust tags */}
                  <div className="flex flex-wrap gap-3 mb-0">
                    {['IRDAI Approved', '100% Claim Support', 'No Hidden Charges'].map((t) => (
                      <span key={t} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>



            {/* Stats bar on left */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mt-4 w-full">
              {stats.map((s) => (
                <AnimatedStat key={s.label} stat={s} />
              ))}
            </div>
          </div>

          {/* RIGHT: Professional Framed Image Area */}
          <div className="relative w-full flex flex-col justify-center lg:justify-end items-center lg:items-end">
            <div className="relative w-full h-[500px] lg:h-[700px] max-w-lg lg:max-w-[650px] mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-8 border-white bg-slate-100"
                >
                  <img 
                    src={slides[currentSlide].image} 
                    alt="Insurance Planning" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls (Moved to right side under image) */}
            <div className="flex items-center justify-center lg:justify-end gap-6 w-full max-w-lg lg:max-w-[650px] relative z-20">
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-slate-800' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prevSlide} className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all" aria-label="Previous slide">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextSlide} className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all" aria-label="Next slide">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
