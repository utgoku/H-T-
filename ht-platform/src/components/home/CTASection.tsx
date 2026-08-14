'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0D9488] to-[#2563EB] py-20 md:py-28">
      {/* Floating Circles */}
      <motion.div
        className="absolute top-10 left-[10%] w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-[15%] w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"
        animate={{ y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-[80%] w-20 h-20 bg-white/10 rounded-full blur-lg pointer-events-none"
        animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Sẵn Sàng Thay Đổi Cuộc Sống?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mt-4 max-w-2xl mx-auto">
            Bắt đầu hành trình khám phá và phát triển bản thân ngay hôm nay để trở thành phiên bản tốt nhất của chính mình.
          </p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/quiz"
              className="inline-block bg-white text-[#0D9488] font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg"
            >
              Làm Bài Đánh Giá Ngay
            </Link>
          </motion.div>

          <motion.p
            className="mt-5 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Miễn phí &bull; Chỉ mất 1 phút &bull; Kết quả ngay lập tức
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
