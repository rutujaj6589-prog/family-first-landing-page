import { motion } from 'framer-motion';
import { Shield, Phone, Mail, MapPin, Share2, MessageSquare, Film, Send, AtSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';
import FamilyFirstLogo from '../common/Logo';

const cols = {
  product: [{ l: 'Education Plan', h: '#' }, { l: 'Child ULIP', h: '#' }, { l: 'Term Insurance', h: '#' }, { l: 'Health Insurance', h: '#' }, { l: 'Premium Calculator', h: '#' }],
  company: [{ l: 'About Us', h: '#' }, { l: 'Our Team', h: '#' }, { l: 'Careers', h: '#' }, { l: 'Press & Media', h: '#' }, { l: 'Blog', h: '#' }],
  support: [{ l: 'Help Center', h: '#' }, { l: 'Claims', h: '#' }, { l: 'Policy Status', h: '#' }, { l: 'Privacy Policy', h: '#' }, { l: 'Terms of Service', h: '#' }],
};

const socials = [
  { icon: <Share2 className="w-4 h-4" />, label: 'Facebook', href: '#' },
  { icon: <AtSign className="w-4 h-4" />, label: 'Twitter', href: '#' },
  { icon: <Film className="w-4 h-4" />, label: 'Instagram', href: '#' },
  { icon: <MessageSquare className="w-4 h-4" />, label: 'LinkedIn', href: '#' },
  { icon: <Send className="w-4 h-4" />, label: 'YouTube', href: '#' },
];

const Footer = () => (
  <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
    <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-500 to-orange-200 relative z-30" />

    {/* Newsletter */}
    <div className="bg-slate-900 border-b border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-serif font-bold text-white text-xl md:text-2xl mb-1">Get Free Education Planning Tips</h3>
          <p className="text-slate-400 text-[15px] md:text-[16px]">Join 50,000+ parents who receive our weekly newsletter</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input type="email" placeholder="Enter your email" 
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-[16px] outline-none w-full sm:w-64 focus:border-orange-200 focus:bg-slate-800/80 transition-colors" />
          <motion.button 
            className="px-5 py-3 rounded-xl font-bold text-[15px] text-white bg-amber-500 shadow-lg shadow-amber-500/20 hover:bg-amber-500 flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Subscribe <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>

    {/* Main */}
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand */}
        <div className="lg:col-span-2 md:pr-10">
          <Link to="hero" smooth duration={500} className="cursor-pointer inline-block mb-5">
            <FamilyFirstLogo light={false} size="sm" />
          </Link>
          <p className="text-slate-400 text-[15px] leading-relaxed mb-6">India's most trusted education planning insurance provider. IRDAI certified, award-winning, and committed to securing your child's future.</p>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { icon: <Phone className="w-4 h-4" />, text: '1800-209-1234', href: 'tel:18002091234' },
              { icon: <Mail className="w-4 h-4" />, text: 'hello@familyfirstinsurance.in', href: 'mailto:hello@familyfirstinsurance.in' },
              { icon: <MapPin className="w-4 h-4" />, text: 'Sangli', href: '#' },
            ].map((c) => (
              <a key={c.text} href={c.href} className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-[15px]">
                <span className="text-orange-200">{c.icon}</span>{c.text}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            {socials.map((s) => (
              <motion.a key={s.label} href={s.href} aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:border-orange-200 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}>
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[{ title: 'Products', links: cols.product }, { title: 'Company', links: cols.company }, { title: 'Support', links: cols.support }].map((col) => (
          <div key={col.title}>
            <h4 className="font-serif font-bold text-white text-[14px] tracking-widest uppercase mb-6">{col.title}</h4>
            <ul className="flex flex-col gap-3.5">
              {col.links.map((l) => (
                <li key={l.l}>
                  <a href={l.h} className="text-slate-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all text-[15px] md:text-[16px]">
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="pt-8 border-t border-slate-800">
        <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
          {['IRDAI Approved', 'ISO 9001:2015', 'SSL Secured', 'GDPR Compliant'].map((c) => (
            <span key={c} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 text-[13px] font-medium flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-500" /> {c}
            </span>
          ))}
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-4 text-center md:text-left">
          <p className="text-slate-500 text-[14px]">© 2024 Family First Insurance Pvt. Ltd. All rights reserved. IRDAI Reg. No. 123456</p>
          <p className="text-slate-600 text-[13px]">Insurance is subject to market risks. Read all scheme documents carefully.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
