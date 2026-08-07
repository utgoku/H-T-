'use client';

import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Minh Anh',
    role: 'Nhân viên văn phòng',
    quote: 'Chỉ sau 30 ngày tham gia gói Transformation, tôi đã giảm được 3kg mỡ thừa. Nhưng quan trọng nhất là tôi không còn cảm thấy uể oải mỗi chiều. Năng lượng tràn trề và thực đơn rất dễ theo.',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    id: 2,
    name: 'Hoàng Nam',
    role: 'Kỹ sư phần mềm',
    quote: 'Trước đây tôi hay bị mất ngủ do stress công việc. Phác đồ giấc ngủ của H&T thực sự là cứu cánh. Tôi đã biết cách ngắt kết nối và hiện tại ngủ sâu giấc hơn bao giờ hết.',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 3,
    name: 'Thu Hà',
    role: 'Giáo viên',
    quote: 'Tôi rất thích cách các chuyên gia H&T cá nhân hóa thực đơn. Tôi không phải nhịn ăn những món mình thích mà vẫn kiểm soát được cân nặng. Rất khoa học!',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 4,
    name: 'Đức Trí',
    role: 'Doanh nhân',
    quote: 'Gói Elite Care mang lại giá trị vượt xa số tiền bỏ ra. Các cuộc gọi với chuyên gia hàng tuần giúp tôi duy trì động lực và kịp thời điều chỉnh sức khỏe giữa lịch trình bận rộn.',
    color: 'bg-orange-100 text-orange-700'
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Khách Hàng Nói Gì Về H&T
          </h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative h-[350px] sm:h-[250px]">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                  isActive 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : 'opacity-0 translate-x-8 z-0 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 font-inter italic mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${testimonial.color}`}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-teal-500 w-8' : 'bg-gray-300 hover:bg-teal-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
