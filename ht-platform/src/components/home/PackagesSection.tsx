'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const packages = [
  {
    id: 'starter',
    name: 'H&T Starter',
    desc: 'Trải nghiệm nền tảng, thiết lập thói quen.',
    price: '99,000 VNĐ',
    period: '/tháng',
    features: [
      { text: 'Tính toán TDEE cơ bản', included: true },
      { text: 'Gợi ý thực đơn mẫu', included: true },
      { text: 'Nhật ký giấc ngủ (7 ngày)', included: true },
      { text: 'Chuyên gia tư vấn 1-1', included: false },
    ],
    cta: 'Bắt đầu ngay',
    href: '/register',
    theme: 'teal'
  },
  {
    id: 'transformation',
    name: 'H&T Transformation',
    desc: 'Thay đổi toàn diện vóc dáng và sinh học trong 30 ngày.',
    price: '1,490,000 VNĐ',
    period: '/30 ngày',
    subprice: 'Chỉ ~49,000 VNĐ/ngày',
    badge: 'Được lựa chọn nhiều nhất',
    features: [
      { text: 'Thực đơn cá nhân hóa mỗi ngày', included: true },
      { text: 'Phác đồ giấc ngủ chuyên sâu', included: true },
      { text: 'Theo dõi và tinh chỉnh hàng tuần', included: true },
      { text: '2 buổi tư vấn 1-1 với chuyên gia', included: true },
      { text: 'Hỗ trợ qua chat 24/7', included: true },
    ],
    cta: 'Đăng ký ngay',
    href: '/register?plan=transformation',
    theme: 'teal'
  },
  {
    id: 'elite',
    name: 'H&T Elite Care',
    desc: 'Chăm sóc cao cấp 90 ngày. Đồng hành trọn vẹn.',
    price: '3,990,000 VNĐ',
    period: '/90 ngày',
    features: [
      { text: 'Mọi quyền lợi của gói Transformation', included: true },
      { text: 'Phân tích xét nghiệm máu định kỳ', included: true },
      { text: '6 buổi tư vấn chuyên gia cao cấp', included: true },
      { text: 'Ưu tiên hỗ trợ kỹ thuật và y tế', included: true },
    ],
    cta: 'Liên hệ tư vấn',
    href: '/contact',
    theme: 'blue'
  }
];

export default function PackagesSection({ packages: dbPackages }: { packages?: any[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const displayPackages = dbPackages && dbPackages.length > 0 ? dbPackages : packages;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chọn Gói Phù Hợp Với Bạn
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đầu tư cho sức khỏe là khoản đầu tư sinh lời nhất. Chọn gói dịch vụ tốt nhất cho mục tiêu của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-4">
          {displayPackages.map((pkg, idx) => {
            const isSelected = selectedIndex === idx;
            
            return (
              <div 
                key={pkg.id}
                onClick={() => setSelectedIndex(idx)}
                className={`
                  cursor-pointer transition-all duration-300 relative rounded-3xl p-8 bg-white
                  ${isSelected ? 'border-2 border-teal-500 shadow-xl lg:scale-105 z-10' : 'border border-gray-200 shadow-sm hover:shadow-md lg:scale-100 z-0'}
                  ${pkg.theme === 'blue' && !isSelected ? 'bg-gradient-to-b from-white to-blue-50/30' : ''}
                `}
              >
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full text-center">
                    <span className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider animate-pulse shadow-md whitespace-nowrap">
                      {pkg.badge}
                    </span>
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${pkg.badge ? 'mt-4' : ''}`}>{pkg.name}</h3>
                <p className="text-gray-500 mb-6 text-sm h-10">{pkg.desc}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-gray-500">{pkg.period}</span>
                </div>
                
                {pkg.subprice ? (
                  <div className="text-sm text-teal-600 font-medium mb-6 h-5">{pkg.subprice}</div>
                ) : (
                  <div className="mb-6 h-5"></div>
                )}
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className={`flex items-start ${!feature.included ? 'opacity-50' : ''}`}>
                      {feature.included ? (
                        <svg className={`w-5 h-5 mr-3 shrink-0 ${pkg.theme === 'blue' ? 'text-blue-500' : 'text-teal-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-300 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700 font-medium' : 'text-gray-500 line-through'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={pkg.id === 'elite' ? '/contact' : `/register?plan=${pkg.id}`}
                  className={`
                    block w-full py-3.5 px-4 text-center rounded-xl font-bold text-lg transition-all
                    ${isSelected 
                      ? (pkg.theme === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg') 
                      : (pkg.theme === 'blue' ? 'border border-blue-600 text-blue-600 hover:bg-blue-50' : 'border border-teal-600 text-teal-600 hover:bg-teal-50')
                    }
                  `}
                >
                  {pkg.id === 'elite' ? 'Liên hệ tư vấn' : 'Đăng ký ngay'}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
