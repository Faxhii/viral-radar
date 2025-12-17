"use client";
import Link from 'next/link';

import StatsSection from '@/components/landing/StatsSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import FAQSection from '@/components/landing/FAQSection';

import HeroSection from '@/components/landing/HeroSection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white" suppressHydrationWarning>
      {/* Navbar */}
      <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="ViralRadar Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-xl" />
          <span className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            ViralRadar.in
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/login" className="text-sm md:text-base text-gray-300 hover:text-white transition">Login</Link>
          <Link href="/register" className="bg-white text-black px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-full font-medium hover:bg-gray-200 transition">
            Get Started
          </Link>
        </div>
      </nav>

      <HeroSection />
      <StatsSection />
      <ReviewsSection />
      <FAQSection />
      <PricingSection />

      <Footer />
    </div>
  );
}
