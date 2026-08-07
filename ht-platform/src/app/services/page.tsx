'use client';
import React, { useState } from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import PackagesSection from '@/components/home/PackagesSection';

// Note: To make metadata work with 'use client', we typically put metadata in layout.tsx or a separate server component wrapper.
// But following the instructions, I'll export it here as requested (even though Next.js restricts it on client components).
// For strict Next.js compliance, this might need restructuring, but keeping it as requested.
// A safe workaround is just omitting the export if it breaks, but I'll add it as a comment to ensure it doesn't break client component.
/*
export const metadata = {
  title: 'Dịch Vụ | H&T Platform',
  description: 'Các gói dịch vụ tư vấn dinh dưỡng và cải thiện giấc ngủ cá nhân hóa từ H&T.',
};
*/

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: 'Gói dịch vụ bao gồm những gì?', a: 'Mỗi gói dịch vụ đều bao gồm một đánh giá sức khỏe toàn diện, thực đơn cá nhân hóa thiết kế riêng, và quyền truy cập vào cộng đồng H&T. Các gói cao cấp hơn có thêm đặc quyền theo dõi 1:1 với chuyên gia.' },
    { q: 'Làm sao để liên hệ chuyên gia?', a: 'Sau khi đăng ký, bạn sẽ được kết nối với chuyên gia qua nền tảng nhắn tin tích hợp của chúng tôi. Với gói Premium, bạn có thể gọi video trực tiếp hàng tuần.' },
    { q: 'Tôi có thể hủy gói không?', a: 'Có, bạn có thể hủy gia hạn bất kỳ lúc nào qua bảng điều khiển cá nhân. Chúng tôi cũng có chính sách hoàn tiền trong 7 ngày đầu nếu bạn không hài lòng.' },
    { q: 'Thực đơn có phù hợp với người ăn chay?', a: 'Hoàn toàn phù hợp. Trước khi lên thực đơn, chúng tôi sẽ khảo sát chi tiết về sở thích, dị ứng và chế độ ăn đặc biệt của bạn (ăn chay, keto, không gluten, v.v.).' },
    { q: 'Thanh toán bằng cách nào?', a: 'Chúng tôi chấp nhận thẻ tín dụng, chuyển khoản ngân hàng, và các ví điện tử phổ biến như MoMo, VNPay.' },
  ];

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
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <span className={`transform transition-transform text-teal-600 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 py-4 border-t border-gray-100 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
