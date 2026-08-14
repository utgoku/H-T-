import React from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import PackagesSection from '@/components/home/PackagesSection';
import { getFaqs } from '@/lib/db';
import FaqAccordion from './FaqAccordion';

export const metadata = {
  title: 'Dịch Vụ | H&T Platform',
  description: 'Các gói dịch vụ tư vấn dinh dưỡng và cải thiện giấc ngủ cá nhân hóa từ H&T.',
};

export default async function ServicesPage() {
  const dbFaqs = await getFaqs();
  
  const faqs = dbFaqs.map((f: any) => ({
    q: f.question,
    a: f.answer
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="bg-blue-50 py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Dịch Vụ Của Chúng Tôi</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Giải pháp toàn diện kết hợp dinh dưỡng chuẩn khoa học và tối ưu hóa giấc ngủ, thiết kế riêng cho cơ thể bạn.
          </p>
        </section>

        {/* Workflow Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-16">Quy trình hoạt động</h2>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10"></div>
              {[
                { step: 1, title: 'Đánh giá sức khỏe', desc: 'Thực hiện bài quiz chi tiết để chúng tôi hiểu rõ thể trạng của bạn.' },
                { step: 2, title: 'Tư vấn chuyên gia', desc: 'Trao đổi 1:1 với chuyên gia để xác định mục tiêu cụ thể.' },
                { step: 3, title: 'Nhận thực đơn cá nhân hóa', desc: 'Thực đơn và lịch sinh hoạt được thiết kế riêng.' },
                { step: 4, title: 'Theo dõi & đồng hành', desc: 'Cập nhật tiến độ mỗi tuần và tinh chỉnh lộ trình.' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-teal-200">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section (Reused) */}
        <section className="py-20 bg-gray-50">
          <PackagesSection />
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-12">Câu Hỏi Thường Gặp</h2>
          <FaqAccordion faqs={faqs} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
