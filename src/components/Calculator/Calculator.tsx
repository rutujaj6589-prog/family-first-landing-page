import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, AlertCircle,
  CheckCircle2, Calculator as CalcIcon, ChevronRight,
  Sparkles, Clock
} from 'lucide-react';

interface FormData {
  childAge: number;
  targetAge: number;
  currentCost: number;
  inflationRate: number;
  monthlyInvestment: number;
}

interface Result {
  futureCost: number;
  totalInvested: number;
  maturityAmount: number;
  gap: number;
  monthlyNeeded: number;
  yearsLeft: number;
  multipler: number;
}

function calcResults(d: FormData): Result {
  const years = d.targetAge - d.childAge;
  if (years <= 0) return { futureCost: 0, totalInvested: 0, maturityAmount: 0, gap: 0, monthlyNeeded: 0, yearsLeft: 0, multipler: 0 };
  const futureCost = d.currentCost * Math.pow(1 + d.inflationRate / 100, years);
  const r = 0.11 / 12;
  const n = years * 12;
  const maturityAmount = d.monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvested = d.monthlyInvestment * n;
  const gap = Math.max(0, futureCost - maturityAmount);
  const monthlyNeeded = (futureCost * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
  const multipler = totalInvested > 0 ? maturityAmount / totalInvested : 0;
  return { futureCost, totalInvested, maturityAmount, gap, monthlyNeeded, yearsLeft: years, multipler };
}

function fmt(v: number) {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L`;
  return `₹${Math.round(v).toLocaleString('en-IN')}`;
}

const PRESETS = [
  { label: 'Engineering (India)', cost: 1500000, icon: '🎓' },
  { label: 'Medical (India)', cost: 3000000, icon: '🏥' },
  { label: 'IIT / IIM', cost: 2500000, icon: '🏛️' },
  { label: 'Study Abroad', cost: 7500000, icon: '✈️' },
];

// Animated ring progress
const RingProgress = ({ value, max, size, color, label, sublabel }: { value: number; max: number; size: number; color: string; label: string; sublabel: string }) => {
  const radius = (size - 12) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const [animPct, setAnimPct] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimPct(pct), 50);
    return () => clearTimeout(timeout);
  }, [pct]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" className="text-slate-200" strokeWidth={10} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - animPct)}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`font-serif font-extrabold text-slate-900 leading-tight ${size > 80 ? 'text-sm' : 'text-xs'}`}>{label}</span>
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{sublabel}</span>
      </div>
    </div>
  );
};

const Calculator = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const [form, setForm] = useState<FormData>({
    childAge: 3, targetAge: 18, currentCost: 1500000,
    inflationRate: 10, monthlyInvestment: 5000,
  });
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [step, setStep] = useState(1);

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (form.childAge < 0 || form.childAge > 17) e.childAge = 'Must be 0–17';
    if (form.targetAge <= form.childAge) e.targetAge = 'Must be > child age';
    if (form.currentCost < 100000) e.currentCost = 'Min ₹1 lakh';
    if (form.monthlyInvestment < 500) e.monthlyInvestment = 'Min ₹500';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCalc = () => { if (validate()) { setResult(calcResults(form)); setStep(2); } };
  const handleReset = () => { setResult(null); setStep(1); };

  const update = (key: keyof FormData, v: number) => {
    setForm(p => ({ ...p, [key]: v }));
    setErrors(p => ({ ...p, [key]: undefined }));
  };

  const years = form.targetAge - form.childAge;

  return (
    <section id="calculator" className="py-12 bg-white relative overflow-hidden border-y border-slate-100">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20 text-base font-bold mb-4">
            Smart Calculator
          </span>
          <h2 className="font-serif font-extrabold text-slate-900 mb-4 text-3xl md:text-4xl lg:text-5xl">
            Education Cost{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Calculator
            </span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
            Discover exactly how much you need to save today to fund your child's dream education tomorrow.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-[32px] overflow-hidden shadow-2xl shadow-amber-500/5 border border-slate-200"
        >
          {/* Card header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-6 md:px-8 md:py-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                <CalcIcon className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="font-serif font-bold text-slate-900 text-lg md:text-xl leading-tight">Education Fund Planner</p>
                <p className="text-slate-500 text-sm font-medium mt-0.5">Inflation-adjusted future cost projection</p>
              </div>
            </div>
            {/* Steps */}
            <div className="flex items-center gap-2">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step >= s ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step > s ? '✓' : s}
                  </div>
                  {s < 2 && <ChevronRight className="w-4 h-4 text-slate-300" />}
                </div>
              ))}
              <span className="text-slate-500 text-sm font-semibold ml-2">{step === 1 ? 'Enter Details' : 'Your Results'}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="bg-white px-6 py-8 md:p-10">

                {/* College presets */}
                <div className="mb-10">
                  <p className="font-bold text-slate-900 text-[15px] mb-4">Quick Select — College Type</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {PRESETS.map((p) => (
                      <motion.button key={p.label} onClick={() => update('currentCost', p.cost)}
                        className={`p-3 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center ${
                          form.currentCost === p.cost 
                            ? 'border-amber-500 bg-orange-50 shadow-md shadow-amber-500/10' 
                            : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="text-2xl mb-2">{p.icon}</div>
                        <p className={`text-xs font-bold leading-tight ${form.currentCost === p.cost ? 'text-amber-500' : 'text-slate-600'}`}>{p.label}</p>
                        <p className={`text-[13px] font-extrabold mt-1 ${form.currentCost === p.cost ? 'text-amber-500' : 'text-slate-500'}`}>₹{(p.cost / 100000).toFixed(0)}L</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                  {/* Left column */}
                  <div className="flex flex-col gap-8">

                    {/* Child age */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="font-bold text-slate-700 text-[15px]">Child's Current Age</label>
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 text-lg">{form.childAge} yrs</span>
                      </div>
                      <input type="range" min={0} max={17} value={form.childAge} onChange={e => update('childAge', +e.target.value)}
                        className="w-full accent-amber-500" />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs font-medium text-slate-400">Newborn</span>
                        <span className="text-xs font-medium text-slate-400">17 yrs</span>
                      </div>
                      {errors.childAge && <p className="text-rose-500 text-sm mt-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{errors.childAge}</p>}
                    </div>

                    {/* Target age */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="font-bold text-slate-700 text-[15px]">College Entry Age</label>
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 text-lg">{form.targetAge} yrs</span>
                      </div>
                      <input type="range" min={15} max={25} value={form.targetAge} onChange={e => update('targetAge', +e.target.value)}
                        className="w-full accent-amber-500" />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs font-medium text-slate-400">15 yrs</span>
                        <span className="text-xs font-medium text-slate-400">25 yrs</span>
                      </div>
                      {errors.targetAge && <p className="text-rose-500 text-sm mt-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{errors.targetAge}</p>}
                    </div>

                    {/* Years left info */}
                    {years > 0 && (
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-emerald-800 text-[15px]">You have {years} years to plan!</p>
                          <p className="text-emerald-700 text-sm mt-0.5">Compounding for {years * 12} months — great potential.</p>
                        </div>
                      </div>
                    )}

                    {/* Inflation */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="font-bold text-slate-700 text-[15px]">Education Inflation Rate</label>
                        <span className="text-amber-500 font-extrabold text-lg">{form.inflationRate}% p.a.</span>
                      </div>
                      <input type="range" min={6} max={15} value={form.inflationRate} onChange={e => update('inflationRate', +e.target.value)}
                        className="w-full accent-amber-500" />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs font-medium text-slate-400">6% (Low)</span>
                        <span className="text-xs font-medium text-slate-400">15% (High)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex flex-col gap-8">

                    {/* Current cost */}
                    <div>
                      <label className="block font-bold text-slate-700 text-[15px] mb-3">Current Education Cost (Today's Value)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="number" value={form.currentCost} onChange={e => update('currentCost', +e.target.value)}
                          className={`w-full py-3.5 pr-4 pl-11 rounded-2xl text-lg font-bold text-slate-900 outline-none transition-all ${
                            errors.currentCost 
                              ? 'border-2 border-rose-500 bg-rose-50' 
                              : 'border-2 border-slate-100 bg-slate-50 focus:border-amber-500 focus:bg-white focus:shadow-lg focus:shadow-amber-500/10'
                          }`}
                        />
                      </div>
                      {errors.currentCost && <p className="text-rose-500 text-sm mt-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{errors.currentCost}</p>}
                    </div>

                    {/* Monthly investment */}
                    <div>
                      <label className="block font-bold text-slate-700 text-[15px] mb-3">Your Monthly Investment</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="number" value={form.monthlyInvestment} onChange={e => update('monthlyInvestment', +e.target.value)}
                          className={`w-full py-3.5 pr-4 pl-11 rounded-2xl text-lg font-bold text-slate-900 outline-none transition-all ${
                            errors.monthlyInvestment 
                              ? 'border-2 border-rose-500 bg-rose-50' 
                              : 'border-2 border-slate-100 bg-slate-50 focus:border-amber-500 focus:bg-white focus:shadow-lg focus:shadow-amber-500/10'
                          }`}
                        />
                      </div>
                      {errors.monthlyInvestment && <p className="text-rose-500 text-sm mt-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{errors.monthlyInvestment}</p>}
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {[2000, 5000, 10000, 15000, 25000].map(v => (
                          <button key={v} onClick={() => update('monthlyInvestment', v)}
                            className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                              form.monthlyInvestment === v 
                                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}>
                            ₹{v >= 1000 ? `${v / 1000}K` : v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Summary preview */}
                    <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 mt-auto">
                      <p className="font-bold text-amber-500 text-[13px] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> Quick Preview
                      </p>
                      <div className="flex flex-col gap-2">
                        {[
                          { label: 'Current Cost', val: fmt(form.currentCost) },
                          { label: 'Years to Plan', val: `${years > 0 ? years : '—'} yrs` },
                          { label: 'Monthly SIP', val: fmt(form.monthlyInvestment) },
                        ].map(r => (
                          <div key={r.label} className="flex justify-between items-center pb-2 border-b border-orange-200/50 last:border-0 last:pb-0">
                            <span className="text-amber-500 text-[13px] font-medium">{r.label}</span>
                            <span className="font-extrabold text-amber-500 text-sm">{r.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-center">
                  <motion.button onClick={handleCalc}
                    className="px-8 py-3.5 rounded-[16px] font-bold text-[15px] text-white bg-gradient-to-r from-amber-500 via-amber-500 to-orange-200 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 tracking-wide"
                    whileHover={{ scale: 1.01, y: -2, boxShadow: '0 15px 30px -10px rgba(79,70,229,0.5)' }}
                    whileTap={{ scale: 0.98 }}>
                    Calculate My Education Fund
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
                  </motion.button>
                </div>
              </motion.div>

            ) : (
              // RESULTS STEP
              <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}
                className="bg-white">

                {/* Results hero banner */}
                <div className="bg-slate-900 px-6 py-10 md:p-10 relative overflow-hidden">
                  {/* Decorative background shapes */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
                    {/* Future cost highlight */}
                    <div className="text-center lg:text-left">
                      <p className="text-orange-200 font-medium text-[15px] mb-2">Estimated Future Education Cost</p>
                      <p className="font-serif font-black text-white text-5xl md:text-6xl leading-none mb-4">
                        {result && fmt(result.futureCost)}
                      </p>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                        <span className="px-3 py-1.5 rounded-full bg-orange-200/20 border border-amber-500/30 text-amber-500 text-[13px] font-bold">
                          📅 In {result?.yearsLeft} years
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-[13px] font-bold">
                          🔥 {form.inflationRate}% inflation applied
                        </span>
                      </div>
                    </div>

                    {/* Ring progress charts */}
                    <div className="flex gap-4 md:gap-6 flex-wrap justify-center bg-white/10 backdrop-blur-md p-4 rounded-[24px] border border-white/10">
                      {result && [
                        { value: result.maturityAmount, max: result.futureCost, color: '#3b82f6', label: fmt(result.maturityAmount), sublabel: 'Maturity' },
                        { value: Math.min(result.totalInvested, result.futureCost), max: result.futureCost, color: '#10b981', label: fmt(result.totalInvested), sublabel: 'Invested' },
                        { value: result.maturityAmount, max: result.futureCost, color: '#8b5cf6', label: `${result.multipler.toFixed(1)}x`, sublabel: 'Returns' },
                      ].map((ring, i) => (
                        <div key={i} className="bg-slate-900/50 p-2 rounded-2xl shadow-inner shadow-black/50">
                          <RingProgress value={ring.value} max={ring.max} size={84} color={ring.color} label={ring.label} sublabel={ring.sublabel} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="px-6 py-8 md:p-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {result && [
                      { label: 'Monthly SIP Amount', value: fmt(form.monthlyInvestment), icon: '💰', colorClass: 'text-amber-500', bgClass: 'bg-orange-50', borderClass: 'border-orange-200' },
                      { label: 'Total Amount Invested', value: fmt(result.totalInvested), icon: '📊', colorClass: 'text-amber-500', bgClass: 'bg-orange-50', borderClass: 'border-orange-200' },
                      { label: 'Expected Maturity Value', value: fmt(result.maturityAmount), icon: '📈', colorClass: 'text-emerald-700', bgClass: 'bg-emerald-50', borderClass: 'border-emerald-100' },
                      { label: 'Return Multiple', value: `${result.multipler.toFixed(1)}x`, icon: '🚀', colorClass: 'text-purple-700', bgClass: 'bg-purple-50', borderClass: 'border-purple-100' },
                    ].map(c => (
                      <div key={c.label} className={`p-4 md:p-5 rounded-2xl border-2 ${c.bgClass} ${c.borderClass}`}>
                        <div className="text-2xl mb-2">{c.icon}</div>
                        <p className="text-slate-500 text-[11px] md:text-xs font-bold uppercase tracking-wider mb-1 leading-tight">{c.label}</p>
                        <p className={`font-serif font-black text-xl md:text-2xl ${c.colorClass}`}>{c.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Gap / Surplus banner */}
                  {result && (result.gap > 0 ? (
                    <div className="p-5 md:p-6 rounded-2xl bg-amber-50 border border-amber-500 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <AlertCircle className="w-8 h-8 text-amber-500 shrink-0 mt-1 md:mt-0" />
                      <div>
                        <p className="font-extrabold text-amber-500 text-lg md:text-xl">Coverage Gap: {fmt(result.gap)}</p>
                        <p className="text-amber-500 text-[15px] mt-1 leading-relaxed">
                          To fully cover the future cost, you need to invest{' '}
                          <strong className="text-amber-500 font-black">₹{Math.ceil(result.monthlyNeeded).toLocaleString('en-IN')}/month</strong>
                          {' '}instead of ₹{form.monthlyInvestment.toLocaleString('en-IN')}/month.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0 mt-1 md:mt-0" />
                      <div>
                        <p className="font-extrabold text-emerald-900 text-lg md:text-xl">🎉 Excellent! Your plan fully covers the future education cost!</p>
                        <p className="text-emerald-700 text-[15px] mt-1 leading-relaxed">
                          You'll have a surplus of <strong className="text-emerald-900 font-black">{fmt(Math.abs(result.maturityAmount - result.futureCost))}</strong> — perfect financial planning!
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <button onClick={onOpenModal}>
                      <motion.button 
                        className="px-8 py-3.5 rounded-xl font-bold text-[15px] text-white bg-amber-500 shadow-lg shadow-amber-500/30 hover:bg-amber-500 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        Get Personalized Plan — Free!
                      </motion.button>
                    </button>
                    <motion.button onClick={handleReset}
                      className="px-8 py-3.5 rounded-xl font-bold text-[15px] text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      Back
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Calculator;
