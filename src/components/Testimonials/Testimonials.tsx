import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote, MapPin } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  { id: 1, name: 'Priya Mehta', role: 'Working Mother', rating: 5, text: 'Family First changed how we plan for our daughter. Started with ₹3,000/month when she was 2. Now at 15, we have ₹12 lakhs in corpus. The guidance was exceptional!', location: 'Mumbai', initials: 'PM', colorClass: 'bg-amber-500' },
  { id: 2, name: 'Amit Sharma', role: 'IT Engineer', rating: 5, text: 'Skeptical initially but Rajesh personally explained everything. 8 years in — 13.2% CAGR. Our son\'s IIT dream is now fully funded. Incredible!', location: 'Bangalore', initials: 'AS', colorClass: 'bg-amber-500' },
  { id: 3, name: 'Sunita Rao', role: 'Business Owner', rating: 5, text: 'When my husband passed away, ₹30L was credited to the education fund in 3 days. My children\'s futures are completely secure. Thank you Family First!', location: 'Hyderabad', initials: 'SR', colorClass: 'bg-emerald-600' },
  { id: 4, name: 'Rahul Gupta', role: 'Doctor', rating: 5, text: 'As a doctor, I understand risk. Family First offers the perfect blend of protection and wealth creation. Tax benefits alone save me ₹46,800/year!', location: 'New Delhi', initials: 'RG', colorClass: 'bg-rose-600' },
  { id: 5, name: 'Meena Krishnan', role: 'Teacher', rating: 5, text: 'On a teacher\'s salary I thought this was out of reach. Rajesh showed me ₹2,500/month builds ₹25L in 15 years. My children\'s education is 100% secured!', location: 'Chennai', initials: 'MK', colorClass: 'bg-purple-600' },
  { id: 6, name: 'Vikram Patel', role: 'Entrepreneur', rating: 5, text: 'Claim settled in 48 hours. No paperwork hassles. That\'s exactly the reliability every parent needs for securing their child\'s future.', location: 'Ahmedabad', initials: 'VP', colorClass: 'bg-amber-500' },
];

const Testimonials = () => (
  <section id="testimonials" className="pt-12 pb-2 bg-gradient-to-b from-[#fffdf0] via-orange-50/30 to-[#fffdf0] relative overflow-hidden">
    <div className="absolute top-0 right-[25%] w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-[25%] w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20 text-base font-bold mb-4">
          Success Stories
        </span>
        <h2 className="font-serif font-extrabold text-slate-900 mb-4 text-3xl md:text-4xl lg:text-5xl">
          What Families Say{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">About Us</span>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Over 15,000 families trust us with their most precious asset.
        </p>
        <div className="flex items-center justify-center gap-2 bg-white inline-flex px-6 py-3 rounded-full border border-slate-200 shadow-sm">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
          </div>
          <span className="font-serif font-bold text-slate-900 text-lg ml-1">4.9/5</span>
          <span className="text-slate-500 text-[15px] font-medium ml-1">from 2,400+ reviews</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, dynamicBullets: true, el: '.swiper-pagination-custom' }}
          loop
          breakpoints={{ 
            768: { slidesPerView: 2 }, 
            1024: { slidesPerView: 3 } 
          }}
          className="pb-16"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="h-auto">
              <motion.div
                className="h-full bg-slate-50 rounded-3xl p-8 border-2 border-amber-200 shadow-xl shadow-amber-500/5 relative overflow-hidden flex flex-col group hover:border-amber-400 hover:shadow-amber-500/15 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote className="w-16 h-16 text-amber-500" />
                </div>
                
                <div className="flex mb-6 relative z-10">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                
                <p className="text-slate-700 text-[16px] leading-relaxed mb-8 flex-1 relative z-10 font-medium">"{t.text}"</p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-inner ${t.colorClass}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[16px]">{t.name}</p>
                    <p className="text-slate-500 text-[13px] font-medium">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    <MapPin className="w-3 h-3" /> {t.location}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
          
          <div className="swiper-pagination-custom flex justify-center gap-2 mt-4" />
        </Swiper>
      </motion.div>
    </div>
    
    <style>{`
      .swiper-pagination-custom .swiper-pagination-bullet {
        width: 10px;
        height: 10px;
        background: #cbd5e1;
        opacity: 1;
        border-radius: 10px;
        transition: all 0.3s;
      }
      .swiper-pagination-custom .swiper-pagination-bullet-active {
        width: 32px;
        background: #3b82f6;
      }
    `}</style>
  </section>
);

export default Testimonials;
