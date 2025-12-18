import Link from 'next/link';

import StatsSection from '@/components/landing/StatsSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import FAQSection from '@/components/landing/FAQSection';

import HeroSection from '@/components/landing/HeroSection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">
      {/* Navbar */}
      <Navbar />

      <HeroSection />
      <StatsSection />
      <ReviewsSection />
      <FAQSection />
      <PricingSection />

      <Footer />
    </div>
  );
}
