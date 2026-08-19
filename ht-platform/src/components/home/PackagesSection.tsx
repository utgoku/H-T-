'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const defaultPackages = [
  {
    id: 'starter',
    name: 'Pryma Start',
    price: '99,000 VNĐ',
    period: '/ tháng',
    features: [
      { name: 'Đánh giá nhịp ăn và giấc ngủ', included: true },
      { name: 'Gợi ý thực đơn mẫu 7 ngày', included: true },
      { name: 'Nhật ký giấc ngủ cơ bản', included: true },
      { name: 'Theo dõi năng lượng mỗi ngày', included: true },
      { name: 'Tinh chỉnh cùng chuyên gia', included: false },
    ],
  },
  {
    id: 'transformation',
    name: 'Pryma Reset 30',
    price: '1,490,000 VNĐ',
    period: '/ 30 ngày',
    badge: 'Được chọn nhiều nhất',
    features: [
      { name: 'Đánh giá toàn diện chuyên sâu', included: true },
      { name: 'Thực đơn cá nhân hóa 30 ngày', included: true },
      { name: 'Lộ trình cải thiện giấc ngủ', included: true },
      { name: 'Theo dõi tiến độ hàng tuần', included: true },
      { name: '2 buổi tư vấn chuyên gia 1-1', included: true },
      { name: 'Hỗ trợ qua Zalo/Chat', included: true },
    ],
  },
  {
    id: 'elite',
    name: 'Pryma Signature 90',
    price: '3,990,000 VNĐ',
    period: '/ 90 ngày',
    features: [
      { name: 'Toàn bộ quyền lợi Pryma Reset 30', included: true },
      { name: 'Thực đơn cá nhân hóa 90 ngày', included: true },
      { name: 'Phân tích nhịp ngủ chuyên sâu', included: true },
      { name: '6 buổi tư vấn chuyên gia 1-1', included: true },
      { name: 'Theo dõi và tinh chỉnh liên tục', included: true },
      { name: 'Ưu tiên hỗ trợ xuyên suốt', included: true },
    ],
  }
];

export default function PackagesSection({ packages: dbPackages }: { packages?: any[] }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const displayPackages = dbPackages && dbPackages.length > 0 ? dbPackages : defaultPackages;

  return (
    <section className="bg-white py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">
              Chọn Gói Phù Hợp Với Bạn
            </h2>
            <p className="text-lg text-[#64748B]">
              Ba mức đồng hành rõ ràng, kết nối dinh dưỡng, giấc ngủ và nhịp sống thực tế của bạn.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mt-12 max-w-6xl mx-auto">
          {displayPackages.map((pkg, idx) => {
            const isFeatured = idx === selectedIndex;

            return (
              <motion.div
                key={pkg.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedIndex(idx)}
                className={`
                  cursor-pointer bg-white rounded-2xl p-7 border transition-all duration-300 flex flex-col
                  ${isFeatured 
                    ? 'border-[#0D9488] border-2 shadow-lg lg:scale-[1.03] relative z-10' 
                    : 'border-[#E2E8F0] shadow-sm hover:shadow-lg'
                  }
                `}
              >
                {isFeatured && pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0D9488] to-[#2563EB] text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div className="mb-6 mt-2">
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-[#1A1A2E]">{pkg.price}</span>
                    <span className="text-[#64748B] text-sm font-medium">{pkg.period}</span>
                  </div>
                </div>

                <div className="flex-grow space-y-3 mb-8">
                  {pkg.features.map((feature: any, fIdx: number) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      {feature.included ? (
                        <svg className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className="text-sm text-[#374151]">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/checkout?package=${pkg.id}`}
                  className={`
                    w-full block text-center transition-colors
                    ${isFeatured 
                      ? 'bg-[#0D9488] text-white font-semibold rounded-xl py-3 hover:bg-[#0F766E]' 
                      : 'border border-[#0D9488] text-[#0D9488] hover:bg-[#F0FDF9] font-semibold rounded-xl py-3'
                    }
                  `}
                >
                  Chọn lộ trình
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
