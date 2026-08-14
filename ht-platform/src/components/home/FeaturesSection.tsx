'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section className="bg-[#FAFAF7] py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-[#1A1A2E]">
            Giải Pháp Toàn Diện Cho Sức Khỏe
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto mt-4">
            Khám phá phương pháp chăm sóc sức khỏe đột phá với sự kết hợp giữa tinh hoa dinh dưỡng và khoa học giấc ngủ.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {/* Card A - Dinh Dưỡng */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E2E8F0]"
          >
            <div className="relative h-56">
              <Image 
                src="/images/nutrition_premium.jpg" 
                alt="Dinh Dưỡng Thông Minh" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="p-7">
              <div className="w-10 h-10 bg-[#F0FDF9] text-[#0D9488] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E]">Dinh Dưỡng Thông Minh</h3>
              <p className="text-[#64748B] text-sm mt-2">
                Chế độ ăn cá nhân hóa thiết kế bởi các chuyên gia dinh dưỡng hàng đầu, cân bằng dưỡng chất.
              </p>
              <ul className="mt-4 space-y-2">
                {['Thực đơn theo cơ địa', 'Theo dõi calo tự động', 'Tư vấn dinh dưỡng 1:1', 'Cẩm nang món ăn sạch'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-[#374151]">
                    <svg className="w-4 h-4 text-[#0D9488] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card B - Giấc Ngủ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E2E8F0]"
          >
            <div className="relative h-56">
              <Image 
                src="/images/sleep_serene.jpg" 
                alt="Cải Thiện Giấc Ngủ" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="p-7">
              <div className="w-10 h-10 bg-[#EFF6FF] text-[#2563EB] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E]">Cải Thiện Giấc Ngủ</h3>
              <p className="text-[#64748B] text-sm mt-2">
                Liệu trình phục hồi giấc ngủ chuyên sâu kết hợp công nghệ theo dõi giấc ngủ tiên tiến.
              </p>
              <ul className="mt-4 space-y-2">
                {['Phân tích chu kỳ giấc ngủ', 'Liệu pháp âm thanh thư giãn', 'Bài tập hít thở trước ngủ', 'Thảo mộc an thần tự nhiên'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-[#374151]">
                    <svg className="w-4 h-4 text-[#2563EB] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { title: 'Chuyên Gia Hàng Đầu', desc: 'Đội ngũ bác sĩ và chuyên gia giàu kinh nghiệm luôn đồng hành cùng bạn.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { title: 'Theo Dõi Tiến Trình', desc: 'Biểu đồ trực quan giúp bạn dễ dàng theo dõi sự cải thiện từng ngày.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { title: 'Hỗ Trợ 24/7', desc: 'Trợ lý ảo và tổng đài viên luôn sẵn sàng giải đáp mọi thắc mắc của bạn.', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-[#E2E8F0] text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#F0FDF9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0D9488]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h4 className="font-semibold text-[#1A1A2E] mb-1">{item.title}</h4>
              <p className="text-sm text-[#64748B]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
