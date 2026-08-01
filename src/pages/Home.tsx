import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import TrustBadges from '../components/TrustBadges/TrustBadges';
import WhyEducation from '../components/WhyEducation/WhyEducation';
import Timeline from '../components/Timeline/Timeline';
import Benefits from '../components/Benefits/Benefits';
import Calculator from '../components/Calculator/Calculator';
import Founder from '../components/Founder/Founder';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';
import ConsultationModal from '../components/Modal/ConsultationModal';
import { useState } from 'react';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <TrustBadges />
      <WhyEducation />
      <Timeline />
      <Benefits />
      <Calculator onOpenModal={() => setIsModalOpen(true)} />
      <Founder onOpenModal={() => setIsModalOpen(true)} />
      <Testimonials />
      <FAQ />
      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default Home;
