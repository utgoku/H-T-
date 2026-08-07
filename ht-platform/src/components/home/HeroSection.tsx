'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Simple animated counter component
const AnimatedCounter = ({ target, label, suffix = '' }: { target: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
      <div className="text-3xl font-bold text-teal-600 mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
};

export default function HeroSection({ settings }: { settings?: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50 pt-20">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-4"
        >
          Sức Khỏe Toàn Diện
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 pb-2">
            Dinh Dưỡng & Giấc Ngủ
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed"
        >
          Nền tảng chăm sóc sức khỏe cá nhân hóa kết hợp khoa học dinh dưỡng và giấc ngủ, đồng hành cùng chuyên gia hàng đầu.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href="/quiz" className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
            Làm bài đánh giá miễn phí
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <Link href="/services" className="w-full sm:w-auto px-8 py-4 bg-white text-teal-900 border border-teal-200 hover:border-teal-600 hover:text-teal-700 font-bold rounded-full transition-all flex items-center justify-center shadow-sm">
            Khám phá dịch vụ
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <AnimatedCounter target={Number(settings?.heroCustomers) || 1000} suffix="+" label="Khách hàng" />
          <AnimatedCounter target={Number(settings?.heroSatisfaction) || 95} suffix="%" label="Tỷ lệ hài lòng" />
          <AnimatedCounter target={Number(settings?.heroExperts) || 30} suffix="+" label="Chuyên gia" />
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </section>
  );
}
