import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { id: 1, q: 'What is an Education Planning Insurance Plan?', a: 'An Education Planning Insurance Plan combines life insurance with systematic investment to create a dedicated education corpus. If something happens to the parent, the plan continues paying premiums and ensures the education fund reaches its target amount.' },
  { id: 2, q: 'At what age should I start an education plan?', a: 'The earlier, the better! Starting when your child is 0–5 years old gives you 13–18 years of compounding. Even starting at age 8–10 can build a significant corpus. Every year of delay increases the monthly premium needed to reach the same target.' },
  { id: 3, q: 'What is the minimum premium I can start with?', a: 'You can start with as little as ₹1,500/month. Our advisors will create a customized plan based on your income, your child\'s age, and target college or university — making it accessible for every budget.' },
  { id: 4, q: 'Are the returns guaranteed?', a: 'We offer two variants: a market-linked ULIP plan with historically 10–14% CAGR, and a traditional endowment plan with guaranteed 6–7% returns. Our advisor recommends the right mix based on your risk appetite.' },
  { id: 5, q: 'What tax benefits do I get?', a: 'Triple tax advantage: (1) Premium deduction up to ₹1.5L under Section 80C, (2) All policy returns are tax-free under Section 10(10D), (3) Life cover is completely tax-free. A 30% tax-bracket family saves ₹46,800+ per year.' },
  { id: 6, q: 'What happens if the parent passes away?', a: "This is where Family First truly shines. If the policyholder (parent) passes away: the death benefit is paid immediately, all future premiums are waived, the plan continues to grow, and the full maturity amount is paid when the child turns 18. Your child's education is 100% secured." },
  { id: 7, q: 'Can I surrender the policy before maturity?', a: 'Yes, you can surrender after 3 years with a surrender value. However, we strongly advise using our premium holiday option instead — pause premiums for up to 12 months during financial stress without surrendering the policy.' },
  { id: 8, q: 'How do I file a claim?', a: 'Simple 3-step process: (1) Call our 24/7 helpline or submit online, (2) Upload basic documents digitally, (3) Our team guides you through every step. Claims are settled within 48 hours. Our 98% claim settlement ratio proves our commitment.' },
];

const FAQItem = ({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
      isOpen 
        ? 'bg-orange-50 border-orange-200 shadow-lg shadow-amber-500/5' 
        : 'bg-white border-slate-200 hover:border-orange-200'
    }`}
  >
    <button onClick={onToggle} className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4 cursor-pointer" aria-expanded={isOpen}>
      <div className="flex items-start gap-4 flex-1">
        <HelpCircle className={`w-6 h-6 shrink-0 mt-0.5 transition-colors ${isOpen ? 'text-amber-500' : 'text-slate-400'}`} />
        <span className={`font-serif font-bold text-[17px] md:text-[19px] leading-snug transition-colors ${isOpen ? 'text-amber-500' : 'text-slate-900'}`}>{faq.q}</span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          isOpen ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
          <div className="pl-14 md:pl-16 pr-6 pb-6">
            <p className="text-slate-600 leading-relaxed text-[15px] md:text-[16px]">{faq.a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" className="py-12 bg-[#fffdf0] relative overflow-hidden border-y border-slate-100">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-md shadow-orange-500/20 text-base font-bold mb-4">
          Have Questions?
        </span>
          <h2 className="font-serif font-extrabold text-slate-900 mb-4 text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Questions</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto">Everything you need to know about our Education Planning Insurance Plan.</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openId === faq.id} onToggle={() => setOpenId(openId === faq.id ? null : faq.id)} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 text-center p-8 md:p-10 rounded-[24px] bg-gradient-to-br from-orange-50 to-orange-50 border border-orange-200 shadow-lg shadow-amber-500/5">
          <p className="font-serif font-extrabold text-slate-900 text-2xl mb-3">Still Have Questions?</p>
          <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">Our education planning experts are available 24/7. Book a free 30-minute consultation today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919876543210" className="px-6 py-3 rounded-xl font-bold text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-all text-base">
              📞 Call Us Now
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg shadow-[#25D366]/30 transition-all text-base">
              💬 WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default FAQ;
