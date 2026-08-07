'use client';

import Link from 'next/link';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto backdrop-blur-sm bg-white/30 p-12 rounded-3xl border border-white/50 shadow-xl">
          <h1 className="text-9xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-4 drop-shadow-sm">
            404
          </h1>
          
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
            Trang không tồn tại
          </h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại, đã bị gỡ bỏ hoặc bị thay đổi đường dẫn.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Về trang chủ
            </Link>
            
            <Link 
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 bg-white text-teal-700 font-medium rounded-full border-2 border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-all duration-300"
            >
              Liên hệ hỗ trợ
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
