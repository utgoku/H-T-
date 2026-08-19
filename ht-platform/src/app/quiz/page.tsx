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
    <div className="min-h-screen flex flex-col bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <QuizEngine />
      </main>

      <Footer />
    </div>
  );
}
