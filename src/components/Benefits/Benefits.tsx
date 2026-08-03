import { motion } from 'framer-motion';
import { Shield, TrendingUp, BadgePercent, Clock, HeadphonesIcon, FileText, Users, Award } from 'lucide-react';

const benefits = [
  { icon: <Shield className="w-5 h-5 text-amber-500" />, title: 'Life Cover Protection', description: "If something happens to the parent, we pay the full education fund. Your child's future is always secure.", bgClass: 'bg-orange-50' },
  { icon: <TrendingUp className="w-5 h-5 text-amber-500" />, title: 'Market-Linked Returns', description: 'Earn 10–14% annual returns linked to top equity funds. Grow your corpus faster than education inflation.', bgClass: 'bg-orange-50' },
  { icon: <BadgePercent className="w-5 h-5 text-emerald-600" />, title: 'Triple Tax Benefit', description: 'Section 80C deductions, tax-free returns & maturity. Save ₹46,800/year on taxes automatically.', bgClass: 'bg-emerald-50' },
  { icon: <Clock className="w-5 h-5 text-purple-600" />, title: 'Flexible Premiums', description: 'Pay monthly, quarterly or annually. Pause for 12 months during financial stress without losing your plan.', bgClass: 'bg-purple-50' },
  { icon: <HeadphonesIcon className="w-5 h-5 text-cyan-600" />, title: '24/7 Dedicated Support', description: 'Your personal advisor available round the clock. Dedicated claim assistance with 48-hour guarantee.', bgClass: 'bg-cyan-50' },
  { icon: <FileText className="w-5 h-5 text-pink-600" />, title: '98% Claim Settlement', description: 'Industry-leading claim settlement ratio. Transparent claims with zero hidden conditions — ever.', bgClass: 'bg-pink-50' },
  { icon: <Users className="w-5 h-5 text-amber-500" />, title: '15,000+ Happy Families', description: "Trusted by 15,000+ families across India. Our track record of securing children's futures speaks volumes.", bgClass: 'bg-amber-50' },
  { icon: <Award className="w-5 h-5 text-rose-600" />, title: 'IRDAI Certified & Award-Winning', description: 'Fully IRDAI regulated. Winner of "Best Education Insurance Provider 2024" by Economic Times.', bgClass: 'bg-rose-50' },
];

const Benefits = () => (
  <section id="benefits" className="py-12 bg-[#fffdf0] relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-500" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20 text-base font-bold mb-4">
          Why Choose Us
        </span>
        <h2 className="font-serif font-extrabold text-slate-900 mb-4 text-3xl md:text-4xl lg:text-5xl">
          Why Families Choose{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Family First Insurance
          </span>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
          We're not just an insurance company — we're your family's financial guardian.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="p-6 rounded-[20px] bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all cursor-default relative overflow-hidden group"
          >
            <motion.div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${b.bgClass}`}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {b.icon}
            </motion.div>
            <h3 className="font-serif font-bold text-slate-900 text-[17px] mb-2 leading-snug group-hover:text-amber-500 transition-colors">{b.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{b.description}</p>
            
            {/* Decorative blob */}
            <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-50 transition-transform group-hover:scale-150 duration-500 ease-out ${b.bgClass}`} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
