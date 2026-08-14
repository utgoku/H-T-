import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatementSection from '@/components/home/StatementSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PackagesSection from '@/components/home/PackagesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'H&T Platform - Sức Khỏe Toàn Diện | Dinh Dưỡng & Giấc Ngủ',
  description: 'Nền tảng chăm sóc sức khỏe cá nhân hóa kết hợp khoa học dinh dưỡng và giấc ngủ, đồng hành cùng chuyên gia hàng đầu giúp bạn thay đổi cuộc sống.',
};

import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { getDb, getTestimonials } from '@/lib/db';

import { FloatingLeaves } from '@/components/ui/FloatingLeaves';

export default async function HomePage() {
  const db = await getDb();
  const testimonials = await getTestimonials();

  return (
    <main className="min-h-screen bg-white relative">
      <FloatingLeaves />
      <Navigation />
      
      <HeroSection settings={db.settings} />
      <StatementSection />
      <FeaturesSection />
      <PackagesSection packages={db.packages} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
      
      <Footer settings={db.settings} />
    </main>
  );
}
