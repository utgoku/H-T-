import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Eye, HeartHandshake, Layers3, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { Footer } from '@/components/ui/Footer';
import { Navigation } from '@/components/ui/Navigation';
import { getPublicHomeData } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Về PrymaLab',
  description: 'Câu chuyện, nguyên tắc và phạm vi hoạt động của PrymaLab trong lĩnh vực dinh dưỡng và giấc ngủ.',
  alternates: { canonical: '/about' },
};

const principles = [
  { title: 'Nhìn cả hệ thống', copy: 'Bữa ăn, giấc ngủ, năng lượng và lịch sống ảnh hưởng lẫn nhau. Một thay đổi tốt cần tôn trọng toàn bộ bối cảnh.', icon: Layers3 },
  { title: 'Ít nhưng làm được', copy: 'Ưu tiên hành động nhỏ có thể lặp lại thay vì một kế hoạch đẹp trên giấy nhưng quá nặng để duy trì.', icon: Scale },
  { title: 'Minh bạch giới hạn', copy: 'Không thổi phồng kết quả, không dùng danh xưng chuyên môn chưa xác minh và không biến định hướng lối sống thành chẩn đoán.', icon: ShieldCheck },
  { title: 'Tôn trọng dữ liệu', copy: 'Chỉ thu thập thông tin cần cho trải nghiệm, quản lý quyền truy cập và cho người dùng kênh yêu cầu chỉnh sửa hoặc xóa.', icon: Eye },
];

export default async function AboutPage() {
  const { settings } = await getPublicHomeData();
  return <div className="min-h-screen bg-[#f5f7f3] text-[#153339]">
    <Navigation />
    <main>
      <section className="relative isolate overflow-hidden px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44"><div className="hero-grid absolute inset-0 -z-20 opacity-60" /><div className="absolute -left-44 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#d8f0e8] blur-[115px]" /><div className="mx-auto max-w-[88rem]"><p className="section-kicker">Câu chuyện PrymaLab</p><h1 className="mt-6 max-w-6xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.99] tracking-[-0.045em] sm:text-6xl lg:text-8xl">Sức khỏe không sống trong một bảng tính. Nó sống trong lịch thật của bạn.</h1><div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0b7f72]"><Sparkles className="h-4 w-4" /> Nutrition · Sleep · Rhythm</div><div className="space-y-5 text-base leading-8 text-[#5f767a]"><p>PrymaLab bắt đầu từ một khoảng trống dễ thấy: lời khuyên dinh dưỡng thường tách khỏi chất lượng giấc ngủ, còn dữ liệu giấc ngủ lại ít khi được biến thành hành động đơn giản cho ngày hôm sau.</p><p>Chúng tôi xây PrymaLab như một “phòng thí nghiệm nhịp sống” — nơi dữ liệu vừa đủ được chuyển thành lựa chọn thực tế, theo dõi bằng phản hồi của chính người dùng và tinh chỉnh theo tuần.</p></div></div></div></section>

      <section className="bg-[#112f35] px-5 py-24 text-white sm:px-8 lg:py-32"><div className="mx-auto max-w-[88rem]"><div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="section-kicker section-kicker-dark">Nguyên tắc vận hành</p><h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">Chỉnh chu không chỉ là giao diện. Đó là cách chúng tôi giữ lời.</h2></div><div className="grid gap-3 sm:grid-cols-2">{principles.map((principle) => <article key={principle.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7"><principle.icon className="h-6 w-6 text-[#8ed7cb]" /><h3 className="mt-7 text-xl font-semibold">{principle.title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{principle.copy}</p></article>)}</div></div></div></section>

      <section className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center"><div className="rounded-[2.25rem] bg-[#d9f46f] p-8 sm:p-12"><HeartHandshake className="h-8 w-8 text-[#153339]" /><p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#4f6742]">Cam kết về bằng chứng</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-[-0.04em]">Không dựng niềm tin bằng con số hay lời chứng thực chưa kiểm chứng.</h2><p className="mt-5 text-sm leading-7 text-[#4e6550]">Hồ sơ chuyên môn, case study và kết quả khách hàng chỉ nên xuất hiện khi có dữ liệu thật, sự đồng ý phù hợp và khả năng kiểm chứng. Trong giai đoạn hiện tại, PrymaLab ưu tiên mô tả rõ phương pháp, phạm vi và quy trình.</p></div><div className="lg:pl-10"><p className="section-kicker">Lộ trình phát triển</p><h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Xây giá trị trước khi xây cộng đồng.</h2><div className="mt-8 space-y-6">{[['01', 'Chứng minh trải nghiệm cốt lõi', 'Bài đánh giá hữu ích, chương trình rõ ràng, thanh toán và onboarding trơn tru.'], ['02', 'Đo chất lượng thật', 'Theo dõi tỷ lệ hoàn thành, phản hồi và thay đổi thói quen thay vì dùng số liệu trang trí.'], ['03', 'Mở rộng có kiểm soát', 'Chỉ phát triển cộng đồng hoặc đội ngũ khi đã có quy trình hỗ trợ, kiểm duyệt và bảo vệ dữ liệu.']].map(([number, title, copy]) => <div key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#dbe4df] pb-6"><span className="text-xs font-extrabold text-[#0b7f72]">{number}</span><div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#657a7e]">{copy}</p></div></div>)}</div></div></div></section>

      <section className="px-5 pb-8 sm:px-8"><div className="mx-auto flex max-w-[88rem] flex-col gap-7 rounded-[2.5rem] bg-white p-8 shadow-[0_35px_80px_-60px_rgba(18,56,62,0.45)] sm:p-12 lg:flex-row lg:items-end lg:justify-between"><div><p className="section-kicker">Cùng bắt đầu đúng</p><h2 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.04] tracking-[-0.04em]">Nếu PrymaLab không phù hợp, chúng tôi cũng sẽ nói rõ.</h2></div><Link href="/contact" className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#153339] px-7 text-sm font-bold text-white">Trao đổi với PrymaLab <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
    <Footer settings={settings} />
  </div>;
}
