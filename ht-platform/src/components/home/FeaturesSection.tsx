'use client';

import React, { useEffect, useRef } from 'react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  theme = 'teal', 
  delay = 0 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  features: string[], 
  theme?: 'teal' | 'blue',
  delay?: number
}) => {
  const isTeal = theme === 'teal';
  
  return (
    <div 
      className={`bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 fade-in-section border-l-4 ${isTeal ? 'border-teal-500' : 'border-blue-500'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isTeal ? 'bg-teal-50 text-teal-600' : 'bg-blue-50 text-blue-600'}`}>
        {icon}
      </div>
      <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <svg className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${isTeal ? 'text-teal-500' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-section opacity-0">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Giải Pháp Toàn Diện Cho Sức Khỏe
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            H&T kết hợp khoa học dinh dưỡng và y học giấc ngủ để tạo ra lộ trình sức khỏe hoàn hảo dành riêng cho bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FeatureCard
            theme="teal"
            delay={100}
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>}
            title="Dinh Dưỡng Thông Minh"
            description="Lộ trình ăn uống được thiết kế riêng biệt dựa trên chỉ số cơ thể, mục tiêu và thói quen sinh hoạt của bạn. Không cần nhịn ăn cực đoan."
            features={[
              "Tính toán TDEE & Macros chính xác",
              "Thực đơn đa dạng, dễ chuẩn bị",
              "Theo dõi calo và dưỡng chất mỗi ngày",
              "Nhắc nhở uống nước và bữa ăn"
            ]}
          />
          <FeatureCard
            theme="blue"
            delay={200}
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
            title="Giấc Ngủ Khoa Học"
            description="Phân tích chất lượng giấc ngủ, phát hiện nguyên nhân gây mệt mỏi và cung cấp phác đồ điều chỉnh sinh học tự nhiên."
            features={[
              "Đánh giá & phân tích nhịp sinh học",
              "Phác đồ vệ sinh giấc ngủ cá nhân hóa",
              "Bài tập thư giãn trước khi ngủ",
              "Theo dõi chu kỳ ngủ thông minh"
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center fade-in-section opacity-0" style={{ animationDelay: '300ms' }}>
            <div className="w-12 h-12 bg-gray-50 text-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Chuyên Gia Hàng Đầu</h4>
            <p className="text-sm text-gray-600">Đội ngũ bác sĩ và chuyên gia dinh dưỡng giàu kinh nghiệm.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center fade-in-section opacity-0" style={{ animationDelay: '400ms' }}>
            <div className="w-12 h-12 bg-gray-50 text-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Theo Dõi Tiến Trình</h4>
            <p className="text-sm text-gray-600">Báo cáo trực quan, cập nhật mỗi ngày qua ứng dụng.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center fade-in-section opacity-0" style={{ animationDelay: '500ms' }}>
            <div className="w-12 h-12 bg-gray-50 text-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Hỗ Trợ 24/7</h4>
            <p className="text-sm text-gray-600">Giải đáp thắc mắc và hỗ trợ kịp thời mọi lúc.</p>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in-section {
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          transform: translateY(20px);
        }
        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />
    </section>
  );
}
