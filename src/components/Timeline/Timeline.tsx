import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, PiggyBank, GraduationCap, Briefcase } from 'lucide-react';

const steps = [
  { icon: <BookOpen className="w-5 h-5 text-white" />, year: 'Today', title: 'Start Your Plan', description: 'Enroll in Education Planning Insurance. Choose your coverage & monthly investment.', colorClass: 'text-amber-500', bgClass: 'bg-gradient-to-br from-orange-200 to-amber-500', borderClass: 'border-orange-200' },
  { icon: <TrendingUp className="w-5 h-5 text-white" />, year: 'Year 1–5', title: 'Smart Investment', description: 'Premiums are invested in equity & debt funds for optimal, inflation-beating growth.', colorClass: 'text-amber-500', bgClass: 'bg-gradient-to-br from-orange-200 to-amber-500', borderClass: 'border-orange-200' },
  { icon: <PiggyBank className="w-5 h-5 text-white" />, year: 'Year 5–12', title: 'Corpus Growth', description: 'Compounding works its magic. Your corpus grows 3–4x faster than education inflation.', colorClass: 'text-emerald-600', bgClass: 'bg-gradient-to-br from-emerald-500 to-emerald-700', borderClass: 'border-emerald-500' },
  { icon: <GraduationCap className="w-5 h-5 text-white" />, year: 'Year 12–16', title: 'College Ready', description: 'Your child gets into their dream college. Funds released seamlessly to pay all fees.', colorClass: 'text-rose-600', bgClass: 'bg-gradient-to-br from-rose-500 to-rose-700', borderClass: 'border-rose-500' },
  { icon: <Briefcase className="w-5 h-5 text-white" />, year: 'Year 16+', title: 'Dream Career', description: 'Your child graduates debt-free, confident, and ready to conquer the world!', colorClass: 'text-purple-600', bgClass: 'bg-gradient-to-br from-purple-500 to-purple-700', borderClass: 'border-purple-500' },
];

const Timeline = () => (
  <section id="timeline" className="py-12 bg-gradient-to-b from-[#fffdf0] via-orange-50/30 to-[#fffdf0] relative overflow-hidden">
    <div className="absolute top-0 right-[20%] w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-[20%] w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20 text-base font-bold mb-4">
          Your Journey
        </span>
        <h2 className="font-serif font-extrabold text-slate-900 mb-4 text-3xl md:text-4xl lg:text-5xl">
          The Education Planning{' '}
          <span className="text-amber-500">Journey</span>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
          A clear, structured path from enrollment to your child's dream career
        </p>
      </motion.div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative">
        <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-200" />
        <motion.div
          className="absolute top-8 left-[10%] h-0.5 bg-gradient-to-r from-orange-200 via-orange-200 to-purple-500"
          initial={{ width: 0 }} whileInView={{ width: '80%' }} viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
        />
        <div className="grid grid-cols-5 gap-6 relative">
          {steps.map((s, i) => (
            <motion.div key={s.year} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center text-center">
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-8 relative z-10 ${s.bgClass}`}
                whileHover={{ scale: 1.1 }}
              >
                {s.icon}
                <motion.div 
                  className={`absolute inset-0 rounded-full border-2 ${s.borderClass}`}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              </motion.div>
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 w-full relative group hover:-translate-y-1 transition-transform">
                {/* Arrow pointing up */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t border-l border-slate-100 rotate-45 shadow-[-4px_-4px_4px_rgba(241,245,249,0.5)]" />
                
                <span className={`text-xs font-bold uppercase tracking-wider block mb-2 relative z-10 ${s.colorClass}`}>{s.year}</span>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-2 relative z-10">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
        <motion.div
          className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-orange-200 via-orange-200 to-purple-500"
          initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        <div className="flex flex-col gap-8 pl-2">
          {steps.map((s, i) => (
            <motion.div key={s.year} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-6">
              <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10 mt-2 ${s.bgClass}`}>
                {s.icon}
              </div>
              <div className="flex-1 p-5 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 relative">
                {/* Arrow pointing left */}
                <div className="absolute top-6 -left-2.5 w-5 h-5 bg-white border-b border-l border-slate-100 rotate-45" />
                
                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 relative z-10 ${s.colorClass}`}>{s.year}</span>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-2 relative z-10">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed relative z-10">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Timeline;
