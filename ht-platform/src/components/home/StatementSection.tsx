'use client';

import { motion } from 'framer-motion';

export default function StatementSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-4">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#0D9488] to-[#2563EB] mx-auto mb-8" />
        <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-[#1A1A2E] leading-relaxed font-medium">
          Khi bạn chăm sóc cơ thể đúng cách, cơ thể sẽ chăm sóc bạn. <span className="text-[#0D9488]">Dinh dưỡng khoa học</span> và <span className="text-[#0D9488]">giấc ngủ chất lượng</span> — hai nền tảng cho một cuộc sống trọn vẹn.
        </p>
      </motion.div>
    </section>
  );
}
