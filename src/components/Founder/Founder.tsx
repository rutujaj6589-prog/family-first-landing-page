import { motion } from 'framer-motion';
import { Award, Users, Star, Phone, GraduationCap, Heart } from 'lucide-react';
import { Link } from 'react-scroll';

const achievements = [
  { value: '18+', label: 'Years Experience', colorClass: 'text-amber-500', bgClass: 'bg-orange-50' },

  { value: '15K+', label: 'Families Secured', colorClass: 'text-amber-500', bgClass: 'bg-orange-50' },
  { value: '₹500Cr+', label: 'Total Coverage', colorClass: 'text-amber-500', bgClass: 'bg-orange-50' },
  { value: '98%', label: 'Claim Settlement', colorClass: 'text-amber-500', bgClass: 'bg-orange-50' },
];

const Founder = ({ onOpenModal }: { onOpenModal?: () => void }) => (
  <section id="founder" className="py-12 bg-[#fffdf0] relative overflow-hidden border-y border-slate-100">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20 text-base font-bold mb-4">
          Our Story
        </span>
        <h2 className="font-serif font-extrabold text-slate-900 text-3xl md:text-4xl lg:text-5xl">
          Meet the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Founder
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left card */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative">
          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-amber-500/5 border border-slate-200 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
            
            {/* Avatar */}
            <div className="relative w-40 h-40 mx-auto mb-10 mt-4">
              <div className="w-full h-full rounded-full border-4 border-white shadow-[0_0_0_8px_rgba(59,130,246,0.05),0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden bg-slate-100 relative z-10">
                <img src={`${import.meta.env.BASE_URL}founder.png`} alt="Rajesh Kumar Sharma" className="w-full h-full object-cover object-top scale-[1.15] mt-1" />
              </div>
              <motion.div 
                className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-sm font-extrabold px-4 py-2 rounded-xl shadow-lg z-20"
                animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}
              >
                18+ Yrs
              </motion.div>
            </div>
            
            <div className="text-center mb-8 relative z-10">
              <h3 className="font-serif font-bold text-slate-900 text-2xl mb-1">Rajesh Kumar Sharma</h3>
              <p className="text-slate-600 text-[15px] font-medium">Founder & Chief Advisor</p>
              <p className="text-slate-500 text-sm mt-1">IRDA Licensed • CFP Certified • MBA IIM-A</p>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                <span className="text-slate-600 text-[13px] font-medium ml-1.5">5.0 • 2,400+ Reviews</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {achievements.map((a) => (
                <div key={a.label} className={`text-center py-3 px-2 rounded-2xl border border-slate-100 ${a.bgClass}`}>
                  <p className={`font-serif font-black text-2xl ${a.colorClass}`}>{a.value}</p>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right content */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-amber-500 font-bold text-[15px] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" /> A Message from Rajesh
          </p>
          <h3 className="font-serif font-extrabold text-slate-900 text-3xl md:text-4xl leading-[1.25] mb-8">
            "I Started This Because Families Shouldn't Struggle to Fund Their Children's Dreams"
          </h3>
          
          <div className="flex flex-col gap-4 mb-8">
            {[
              { icon: <Heart className="w-5 h-5 text-rose-500" />, text: "I've seen families take loans or compromise on education quality. That shouldn't happen to any child in India.", bgClass: 'bg-rose-50 border-rose-100' },
              { icon: <GraduationCap className="w-5 h-5 text-orange-200" />, text: 'Every child deserves the best education. With the right plan, ₹5,000/month can fund an IIT or even Harvard.', bgClass: 'bg-orange-50 border-orange-200' },
              { icon: <Award className="w-5 h-5 text-amber-500" />, text: 'In 18 years, we\'ve secured 15,000+ families. Our mission: make quality education planning accessible to everyone.', bgClass: 'bg-amber-50 border-amber-500' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-orange-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.bgClass}`}>{item.icon}</div>
                <p className="text-slate-600 text-[16px] leading-relaxed pt-1">{item.text}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {['IRDA Licensed', 'CFP Certified', 'MBA IIM-A', 'ET Now Expert', 'CNBC-TV18'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold">{tag}</span>
            ))}
          </div>
          
          <div className="flex flex-row flex-wrap md:flex-nowrap gap-3">
            <Link to="calculator" smooth duration={500}>
              <motion.button 
                className="py-3 px-4 md:px-8 rounded-2xl font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-amber-500 hover:text-amber-500 transition-colors text-[14px] md:text-[16px] whitespace-nowrap"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Use Calculator
              </motion.button>
            </Link>
            <button onClick={onOpenModal}>
              <motion.button 
                className="py-3 px-4 md:px-8 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30 text-[14px] md:text-[16px] whitespace-nowrap"
                whileHover={{ scale: 1.04, y: -1, boxShadow: '0 12px 30px rgba(59,130,246,0.4)' }} whileTap={{ scale: 0.97 }}>
                Book Free Consultation
              </motion.button>
            </button>
            <motion.a href="tel:+919876543210" 
              className="py-3 px-4 md:px-8 rounded-2xl font-bold text-amber-500 bg-orange-50 border-2 border-orange-200 hover:bg-orange-200 hover:border-orange-200 transition-colors text-[14px] md:text-[16px] flex items-center justify-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Phone className="w-4 h-4 md:w-5 md:h-5" /> Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Founder;
