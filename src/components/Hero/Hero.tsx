import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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

const Hero = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[#fffdf0] overflow-hidden pt-24 pb-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/20 blur-[60px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-amber-500/20 blur-[60px] animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-200/50 border border-orange-200 mb-6"
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-amber-500 block"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity }} 
              />
              <span className="text-amber-600 text-sm font-semibold">Education Planning Insurance</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif font-extrabold text-slate-900 leading-[1.15] mb-6 text-4xl md:text-5xl lg:text-6xl"
            >
              Secure Your Child's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Dream Education
              </span>
              {' '}Before Tomorrow Arrives
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Don't let inflation steal your child's future. Our Education Planning Insurance ensures
              your child reaches their dream college — no matter what life brings.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
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
            </motion.div>

            {/* Trust tags */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {['IRDAI Approved', '100% Claim Support', 'No Hidden Charges'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
            >
              {stats.map((s) => (
                <AnimatedStat key={s.label} stat={s} />
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Hero Image Area */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end relative w-full mt-10 lg:mt-0"
          >
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl flex justify-center lg:justify-end">
              {/* Glowing background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-amber-300/30 to-orange-500/10 rounded-full blur-3xl -z-10" />

              {/* Floating Image */}
              <motion.img 
                src={`${import.meta.env.BASE_URL}family.png`}
                alt="Family" 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-auto max-h-[500px] lg:max-h-[630px] object-cover rounded-[2rem] shadow-xl drop-shadow-[0_20px_50px_rgba(245,158,11,0.25)] origin-bottom relative z-10" 
              />


            </div>
          </motion.div>
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
