import React from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import QuizEngine from '@/components/quiz/QuizEngine';

export const metadata = {
  title: 'Đánh giá sức khỏe | H&T Platform',
  description: 'Thực hiện bài kiểm tra sức khỏe và giấc ngủ để nhận được đánh giá chi tiết và lộ trình cá nhân hóa từ H&T.',
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
