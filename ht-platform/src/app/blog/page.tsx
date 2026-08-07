import React from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const metadata = {
  title: 'Blog Sức Khỏe | H&T Platform',
  description: 'Kiến thức khoa học về dinh dưỡng, giấc ngủ và lối sống lành mạnh từ các chuyên gia H&T.',
};

const blogs = [
  { id: 1, category: 'Giấc ngủ', title: '10 Thực Phẩm Giúp Bạn Ngủ Ngon Hơn', excerpt: 'Khám phá những loại thực phẩm tự nhiên chứa melatonin và magie giúp bạn dễ dàng chìm vào giấc ngủ.', author: 'BS. Lê Nam', date: '20 Oct, 2023', readTime: '5 phút', gradient: 'from-blue-400 to-indigo-500' },
  { id: 2, category: 'Dinh dưỡng', title: 'Hướng Dẫn Tính TDEE Chính Xác', excerpt: 'Làm thế nào để tính tổng năng lượng tiêu hao hàng ngày (TDEE) để thiết lập mục tiêu giảm cân hoặc tăng cơ an toàn.', author: 'ThS. Trần Hương', date: '18 Oct, 2023', readTime: '8 phút', gradient: 'from-teal-400 to-emerald-500' },
  { id: 3, category: 'Thực đơn', title: 'Thực Đơn Giảm Cân 7 Ngày Cho Người Bận Rộn', excerpt: 'Gợi ý chuẩn bị bữa ăn nhanh gọn, đủ chất, giúp tối ưu thời gian mà vẫn duy trì vóc dáng.', author: 'ThS. Trần Hương', date: '15 Oct, 2023', readTime: '10 phút', gradient: 'from-orange-400 to-rose-400' },
  { id: 4, category: 'Lối sống', title: '5 Thói Quen Buổi Tối Cải Thiện Giấc Ngủ', excerpt: 'Thay đổi nhỏ trong thói quen sinh hoạt buổi tối mang lại hiệu quả lớn cho chất lượng giấc ngủ của bạn.', author: 'BS. Lê Nam', date: '12 Oct, 2023', readTime: '6 phút', gradient: 'from-purple-400 to-fuchsia-500' },
  { id: 5, category: 'Dinh dưỡng', title: 'Protein: Bao Nhiêu Là Đủ?', excerpt: 'Tìm hiểu nhu cầu protein thực sự của cơ thể dựa trên mức độ vận động và độ tuổi.', author: 'BS. Nguyễn Minh', date: '10 Oct, 2023', readTime: '7 phút', gradient: 'from-teal-500 to-blue-500' },
  { id: 6, category: 'Lối sống', title: 'Yoga Trước Khi Ngủ: 5 Bài Tập Đơn Giản', excerpt: 'Thư giãn cơ bắp và tâm trí với các động tác yoga nhẹ nhàng ngay trên giường trước giờ đi ngủ.', author: 'HLV. Phạm Thanh', date: '05 Oct, 2023', readTime: '4 phút', gradient: 'from-pink-400 to-rose-500' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">Blog Sức Khỏe</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Kiến thức chuyên sâu từ đội ngũ y bác sĩ và chuyên gia của H&T.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['Tất cả', 'Dinh dưỡng', 'Giấc ngủ', 'Lối sống', 'Thực đơn'].map((cat, i) => (
              <button 
                key={i} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-700 border border-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link href={`/blog/${blog.id}`} key={blog.id} className="group flex flex-col h-full">
                <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className={`h-48 w-full bg-gradient-to-br ${blog.gradient} flex items-center justify-center p-6 relative`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    <h3 className="text-white text-2xl font-bold font-playfair text-center drop-shadow-md line-clamp-2 relative z-10">{blog.title}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-white">
                    <div className="mb-3">
                      <Badge className="bg-teal-50 text-teal-700 border-teal-100">{blog.category}</Badge>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">{blog.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{blog.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-xs text-gray-500">
                      <span className="font-medium text-gray-900">{blog.author}</span>
                      <div className="flex items-center space-x-2">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm">
              Xem thêm bài viết
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
