'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  settings?: any;
}

// Simple AnimatedCounter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing out quart
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

export default function HeroSection({ settings }: HeroSectionProps) {
  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-gradient-to-br from-[#F0FDF9] via-white to-[#EFF6FF]">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-200/30 blur-3xl mix-blend-multiply"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-200/20 blur-3xl mix-blend-multiply"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-[-20%] left-[20%] w-[400px] h-[400px] rounded-full bg-teal-100/40 blur-3xl mix-blend-multiply"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8"
        >
          {/* LEFT Column */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            <motion.div variants={itemVariants}>
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] tracking-tight leading-tight">
                Sức Khỏe Toàn Diện <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] to-[#2563EB]">
                  Dinh Dưỡng & Giấc Ngủ
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-[#64748B] max-w-xl mt-6 leading-relaxed">
                Khám phá giải pháp chăm sóc sức khỏe cá nhân hóa, kết hợp khoa học dinh dưỡng và các phương pháp cải thiện giấc ngủ tự nhiên giúp bạn tái tạo năng lượng mỗi ngày.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link 
                href="/quiz"
                className="group flex items-center gap-2 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-full px-7 py-3.5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Làm bài đánh giá miễn phí
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                href="/services"
                className="bg-white text-[#0D9488] border border-[#0D9488]/20 hover:border-[#0D9488] font-semibold rounded-full px-7 py-3.5 transition-all"
              >
                Khám phá dịch vụ
              </Link>
            </motion.div>
          </div>

          {/* RIGHT Column */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <motion.div variants={itemVariants}>
              <div className="relative rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="/images/hero_wellness.jpg"
                  alt="Sức khỏe toàn diện"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white/60 backdrop-blur-sm border border-[#E2E8F0] rounded-2xl p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">
              <AnimatedCounter end={1000} suffix="+" />
            </div>
            <div className="text-sm text-[#64748B] mt-1">Khách hàng hài lòng</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-[#E2E8F0] rounded-2xl p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">
              <AnimatedCounter end={50} suffix="+" />
            </div>
            <div className="text-sm text-[#64748B] mt-1">Chuyên gia sức khỏe</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-[#E2E8F0] rounded-2xl p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">
              <AnimatedCounter end={98} suffix="%" />
            </div>
            <div className="text-sm text-[#64748B] mt-1">Tỷ lệ cải thiện</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
