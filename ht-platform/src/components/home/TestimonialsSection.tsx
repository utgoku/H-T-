'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultTestimonials = [
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

export default function TestimonialsSection({ testimonials: propTestimonials }: { testimonials?: { id: number; name: string; role: string; quote: string; avatar_color: string; }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = propTestimonials && propTestimonials.length > 0
    ? propTestimonials.map(t => ({ ...t, color: t.avatar_color }))
    : defaultTestimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 md:py-28 bg-[#FAFAF7] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-[#1A1A2E]">
            Khách Hàng Nói Gì Về H&T
          </h2>
          <div className="w-16 h-[2px] bg-[#0D9488] mx-auto mt-4"></div>
        </div>

        <div className="relative h-[320px] sm:h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="bg-white rounded-2xl p-8 shadow-md border border-[#E2E8F0] text-center h-full flex flex-col justify-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-lg text-[#374151] italic leading-relaxed mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div className="flex items-center justify-center">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg mr-3 ${testimonials[activeIndex].color}`}>
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-[#1A1A2E]">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-[#64748B]">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-[#0D9488] w-7' : 'bg-[#CBD5E1] w-3 hover:bg-[#0D9488]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
