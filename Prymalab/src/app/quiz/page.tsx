import React from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import QuizEngine from '@/components/quiz/QuizEngine';

export const metadata = {
  title: 'Đánh giá nhịp sống',
  description: 'Thực hiện bài đánh giá dinh dưỡng và giấc ngủ để nhận điểm khởi đầu cùng gợi ý cá nhân hóa từ PrymaLab.',
  alternates: {
    canonical: '/quiz',
  },
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[#f4f7f2] text-[#153339]">
      <Navigation />
      <main className="relative isolate overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 lg:pt-36">
        <div className="hero-grid absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
        <div className="absolute -left-48 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#d8f0e8] blur-[110px]" aria-hidden="true" />
        <div className="absolute -right-48 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#d9e4ff] blur-[110px]" aria-hidden="true" />
        <div className="mx-auto max-w-6xl">
          <QuizEngine />
        </div>
      </main>
      <Footer />
    </div>
  );
}
