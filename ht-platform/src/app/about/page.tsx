import React from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/db';

export const metadata = {
  title: 'Về chúng tôi',
  description: 'Khám phá câu chuyện và sứ mệnh của PrymaLab trong việc nâng cao sức khỏe người Việt qua dinh dưỡng và giấc ngủ.',
};

export default async function AboutPage() {
  const dbTeam = await getTeamMembers();
  
  const team = dbTeam.map((t: any) => ({
    ...t,
    color: t.avatar_color
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-700 to-blue-800 text-white py-24 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Về PrymaLab</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            Hành trình kết hợp khoa học dinh dưỡng và khoa học giấc ngủ để mang lại cuộc sống khỏe mạnh, cân bằng hơn cho người Việt.
          </p>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                PrymaLab ra đời từ một quan sát đơn giản: sức khỏe không chỉ đến từ những gì bạn ăn, mà còn từ cách cơ thể phục hồi qua từng giấc ngủ.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nhiều người đang gặp vấn đề về giấc ngủ và dinh dưỡng nhưng thiếu một giải pháp tích hợp. PrymaLab kết nối kiến thức thực hành, dữ liệu thói quen và sự đồng hành cá nhân hóa để tạo ra thay đổi bền vững.
              </p>
            </div>
            <div className="bg-teal-50 p-8 rounded-3xl relative">
              <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-3xl transform rotate-3 -z-10"></div>
              <h3 className="text-2xl font-playfair font-bold text-teal-900 mb-4">Sứ mệnh</h3>
              <p className="text-teal-800 text-lg italic leading-relaxed">
                "Trao quyền cho mỗi cá nhân làm chủ sức khỏe của mình thông qua sự kết hợp đột phá giữa khoa học dinh dưỡng và giấc ngủ."
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-12">Giá Trị Cốt Lõi</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Khoa học', desc: 'Mọi phương pháp, thực đơn và lời khuyên đều dựa trên bằng chứng khoa học Y khoa hiện đại.', icon: '🔬' },
                { title: 'Cá nhân hóa', desc: 'Mỗi cơ thể là duy nhất. Lộ trình của bạn được thiết kế riêng biệt để phù hợp hoàn hảo với lối sống.', icon: '🎯' },
                { title: 'Đồng hành', desc: 'Không chỉ đưa ra giải pháp, chúng tôi sát cánh cùng bạn từng bước trên hành trình thay đổi.', icon: '🤝' }
              ].map((val, i) => (
                <Card key={i} className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-t-teal-500">
                  <div className="text-4xl mb-4">{val.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-600">{val.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-teal-900 text-white px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '1000+', label: 'Khách hàng' },
              { num: '30+', label: 'Chuyên gia' },
              { num: '95%', label: 'Hài lòng' },
              { num: '5000+', label: 'Thực đơn đã tạo' }
            ].map((stat, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-teal-300 mb-2">{stat.num}</div>
                <div className="text-teal-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-12">Đội Ngũ Chuyên Gia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member: any, i: number) => (
              <div key={member.id || i} className="text-center group">
                <div className={`w-32 h-32 mx-auto rounded-full ${member.color} shadow-lg mb-4 transform group-hover:-translate-y-2 transition-transform`}></div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-teal-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50 text-center px-4">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-6">Sẵn sàng thay đổi lối sống?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Bắt đầu bằng việc hiểu nhịp sống hiện tại và chọn một thay đổi phù hợp với chính bạn.</p>
          <Link href="/quiz">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full shadow-lg">
              Đánh giá sức khỏe ngay
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
