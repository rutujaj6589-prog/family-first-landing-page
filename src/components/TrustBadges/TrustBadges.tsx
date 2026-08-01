import { motion } from 'framer-motion';
import { Shield, Award, Clock, ThumbsUp, Headphones, Lock } from 'lucide-react';

const badges = [
  { icon: <Shield className="w-5 h-5" />, label: 'IRDAI Approved', sub: 'Fully Regulated', colorClass: 'text-amber-500', bgClass: 'bg-orange-50' },
  { icon: <Award className="w-5 h-5" />, label: 'Best Award 2024', sub: 'Economic Times', colorClass: 'text-amber-500', bgClass: 'bg-amber-50' },
  { icon: <ThumbsUp className="w-5 h-5" />, label: '98% Claim Ratio', sub: 'Industry Leading', colorClass: 'text-green-600', bgClass: 'bg-green-50' },
  { icon: <Clock className="w-5 h-5" />, label: '48-Hour Claims', sub: 'Fast Settlement', colorClass: 'text-purple-600', bgClass: 'bg-purple-50' },
  { icon: <Headphones className="w-5 h-5" />, label: '24/7 Support', sub: 'Always Available', colorClass: 'text-pink-600', bgClass: 'bg-pink-50' },
  { icon: <Lock className="w-5 h-5" />, label: 'Bank-Grade Security', sub: 'Your Data Safe', colorClass: 'text-cyan-600', bgClass: 'bg-cyan-50' },
];

const TrustBadges = () => (
  <section className="py-12 bg-[#fffdf0] border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-slate-400 text-xs tracking-[0.2em] uppercase font-bold mb-8"
      >
        Trusted & Certified Since 2006
      </motion.p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center text-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 hover:border-orange-200 hover:bg-white transition-all cursor-default"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${b.bgClass} ${b.colorClass}`}>
              {b.icon}
            </div>
            <p className="font-bold text-slate-900 text-[13px] leading-tight mb-1">{b.label}</p>
            <p className="text-slate-500 text-xs">{b.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
