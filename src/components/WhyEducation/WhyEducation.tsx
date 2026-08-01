import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Target, Brain, Heart, BadgePercent } from 'lucide-react';

const reasons = [
  { icon: <TrendingUp className="w-6 h-6 text-amber-500" />, title: 'Education Inflation is Real', description: 'Education costs rise 10–12% annually. A degree costing ₹10L today will cost ₹35L+ in 15 years. Don\'t be caught unprepared.', bgClass: 'bg-orange-50' },
  { icon: <AlertTriangle className="w-6 h-6 text-rose-600" />, title: 'Life is Unpredictable', description: 'Accidents, illness, or job loss can derail savings. Insurance ensures your child\'s education fund is always protected.', bgClass: 'bg-rose-50' },
  { icon: <Target className="w-6 h-6 text-amber-500" />, title: 'Goal-Based Planning', description: 'A structured plan creates discipline. Build a dedicated education corpus that grows systematically, year after year.', bgClass: 'bg-orange-50' },
  { icon: <Brain className="w-6 h-6 text-purple-600" />, title: 'Global Opportunities', description: 'IIT, Harvard, Oxford? International education costs ₹50L–₹2Cr. Start planning early to make global dreams reality.', bgClass: 'bg-purple-50' },
  { icon: <Heart className="w-6 h-6 text-pink-600" />, title: 'Peace of Mind', description: 'Know your child\'s future is 100% secured. Sleep soundly knowing the education fund is growing and fully protected.', bgClass: 'bg-pink-50' },
  { icon: <BadgePercent className="w-6 h-6 text-emerald-600" />, title: 'Triple Tax Benefits', description: 'Section 80C deductions up to ₹1.5L, tax-free returns under 10(10D). Save ₹46,800+ on taxes every year.', bgClass: 'bg-emerald-50' },
];

const WhyEducation = () => (
  <section id="why-education" className="py-24 bg-[#fffdf0] relative overflow-hidden border-y border-slate-100">
    <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-amber-500 text-sm font-bold mb-4">
          Why It Matters
        </span>
        <h2 className="font-serif font-extrabold text-slate-900 mb-4 text-3xl md:text-4xl lg:text-5xl leading-tight">
          Why Education Planning{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Cannot Wait
          </span>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Every year you delay costs more. Start today and let compounding work in your favor.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-[24px] bg-slate-50 border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/50 hover:bg-white transition-all cursor-default relative overflow-hidden group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${r.bgClass}`}>
              {r.icon}
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-[19px] mb-3 group-hover:text-amber-500 transition-colors">{r.title}</h3>
            <p className="text-slate-600 text-[16px] leading-relaxed">{r.description}</p>
            
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-40 transition-transform group-hover:scale-150 duration-500 ease-out ${r.bgClass}`} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyEducation;
