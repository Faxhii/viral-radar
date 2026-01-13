"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import FeaturesSection from '@/components/landing/FeaturesSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import StatsSection from '@/components/landing/StatsSection';
import ComparisonSection from '@/components/landing/ComparisonSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import FAQSection from '@/components/landing/FAQSection';

import HeroSection from '@/components/landing/HeroSection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">
      {/* Navbar */}
      <Navbar />

      <HeroSection />
      <DashboardPreview />
      <FeaturesSection />
      <ComparisonSection />
      <ReviewsSection />
      <StatsSection />
      <FAQSection />
      <PricingSection />

      <Footer />
    </div>
  );
}
