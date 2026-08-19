import React from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { knowledgeArticles } from '@/lib/editorial';

export const metadata = {
  title: 'Kiến thức dinh dưỡng & giấc ngủ',
  description: 'Kiến thức thực hành có nguồn về dinh dưỡng, chất lượng giấc ngủ và nhịp sống từ PrymaLab.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const blogs = knowledgeArticles.map((article) => ({
    id: article.slug,
    slug: article.slug,
    title: article.title,
    excerpt: article.description,
    category: article.category,
    author: 'Ban biên tập PrymaLab',
    date: article.displayDate,
    readTime: article.readTime,
    gradient: article.accent,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f3]">
      <Navigation />
      
      <main className="flex-grow pt-36 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-kicker">Kho kiến thức PrymaLab</p><h1 className="mt-6 text-4xl md:text-6xl font-[family-name:var(--font-display)] font-semibold tracking-[-0.04em] text-[#153339] mb-5">Hiểu đủ sâu để chọn một thay đổi đúng.</h1>
            <p className="text-[#60767a] leading-8 max-w-2xl mx-auto">Mỗi bài viết trả lời thẳng câu hỏi chính, dẫn nguồn có thể kiểm tra và nói rõ giới hạn — để kiến thức trở thành hành động thực tế.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['Tất cả', 'Dinh dưỡng', 'Giấc ngủ', 'Lối sống', 'Thực đơn'].map((cat, i) => (
              <span
                key={i} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-700 border border-gray-200'}`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link href={`/blog/${blog.slug || blog.id}`} key={blog.id} className="group flex flex-col h-full">
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
          
          <div className="text-center mt-12"><Link href="/phuong-phap" className="inline-flex rounded-full bg-[#153339] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0b7f72]">
            Xem phương pháp biên tập
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
