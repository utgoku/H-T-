import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button';

export function Footer({ settings }: { settings?: any }) {
  return (
    <footer className="bg-[#1A1A2E] text-white relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#0D9488] to-[#2563EB]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Image 
                src="/logo_cropped.jpg" 
                alt="H&T Logo" 
                width={320} 
                height={128} 
                className="h-32 w-auto rounded-xl object-contain bg-white/10 p-2" 
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Nền tảng chăm sóc sức khỏe và giấc ngủ toàn diện, mang đến cho bạn cuộc sống cân bằng, khỏe mạnh và tràn đầy năng lượng mỗi ngày.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0D9488] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0D9488] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0D9488] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0D9488] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.43 3.25-1.3 4.54-1.41 2.05-3.86 3.29-6.32 3.19-2.32-.08-4.57-1.33-5.75-3.32-1.28-2.15-1.29-4.99-.03-7.14 1.05-1.78 2.92-2.94 4.96-3.11 0 1.4.01 2.79-.01 4.19-.71.1-1.38.38-1.92.85-.72.63-1.14 1.63-1.1 2.6.04.9.43 1.77 1.1 2.37.78.69 1.93.9 2.93.63.89-.24 1.58-.93 1.86-1.81.16-.51.22-1.05.22-1.58V.02h3.91z"/></svg>
              </a>
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Dịch vụ</h3>
            <ul className="space-y-4">
              <li><Link href="/services/nutrition" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Tư vấn dinh dưỡng</Link></li>
              <li><Link href="/services/sleep" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Cải thiện giấc ngủ</Link></li>
              <li><Link href="/services/tracking" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Theo dõi sức khỏe</Link></li>
              <li><Link href="/services/premium" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Gói Premium</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Hỗ trợ</h3>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Trung tâm hỗ trợ</Link></li>
              <li><Link href="/guide" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Hướng dẫn sử dụng</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#14B8A6] transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Liên hệ & Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Liên hệ</h3>
            <ul className="space-y-4 mb-6 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#14B8A6] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {settings?.address || 'Nguyễn Tất Thành - Đà Nẵng'}
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#14B8A6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                {settings?.phone || '0948 348 444'}
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#14B8A6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {settings?.email || 'Ahunglua7@gmail.com'}
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#14B8A6] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {settings?.workingHours || '08:30 - 17:00 (Thứ 2 - Thứ 6)'}
              </li>
            </ul>
            <div className="flex gap-2">
              <input type="email" placeholder="Email của bạn" className="bg-white/5 border border-white/10 rounded-xl text-white px-4 py-2 w-full focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-none text-sm transition-all placeholder:text-gray-500" />
              <Button variant="primary" size="sm">Gửi</Button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2024 H&T Platform. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-[#14B8A6] transition-colors">Admin</Link>
            <Link href="/privacy" className="hover:text-[#14B8A6] transition-colors">Chính sách bảo mật</Link>
            <Link href="/terms" className="hover:text-[#14B8A6] transition-colors">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
