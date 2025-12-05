"use client";
import Link from 'next/link';

import StatsSection from '@/components/landing/StatsSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import FAQSection from '@/components/landing/FAQSection';

import HeroSection from '@/components/landing/HeroSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white" suppressHydrationWarning>
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          ViralRadar.in
        </div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition">Login</Link>
          <Link href="/register" className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">
            Get Started
          </Link>
        </div>
      </nav>

      <HeroSection />
      <StatsSection />
      <ReviewsSection />
      <FAQSection />

      <Footer />
    </div>
  );
}
