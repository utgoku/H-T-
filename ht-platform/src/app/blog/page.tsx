import React from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/db';

export const metadata = {
  title: 'Kiến thức dinh dưỡng & giấc ngủ | PrymaLab',
  description: 'Kiến thức thực hành về dinh dưỡng, giấc ngủ và lối sống lành mạnh từ PrymaLab.',
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  
  const blogs = blogPosts.map(b => ({
    ...b,
    date: b.published_date,
    readTime: b.read_time
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">Blog Sức Khỏe</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Kiến thức thực hành từ đội ngũ chuyên gia đồng hành cùng PrymaLab.</p>
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
