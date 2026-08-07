'use client';

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0D9488] to-[#2563EB]">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Sẵn Sàng Thay Đổi Cuộc Sống?
        </h2>
        <p className="text-xl md:text-2xl text-teal-50 mb-10 max-w-2xl mx-auto font-inter">
          Bắt đầu hành trình sức khỏe của bạn ngay hôm nay với bài đánh giá miễn phí.
        </p>
        
        <Link 
          href="/quiz" 
          className="inline-block px-10 py-5 bg-white text-[#0D9488] text-lg font-bold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
        >
          Làm Bài Đánh Giá Ngay
        </Link>
        
        <div className="mt-8 text-teal-100 text-sm font-medium tracking-wide">
          Miễn phí • Chỉ mất 1 phút • Kết quả ngay lập tức
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
