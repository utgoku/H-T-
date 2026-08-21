import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Moon, ShieldCheck } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import QuizEngine from '@/components/quiz/QuizEngine';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bài đánh giá dinh dưỡng & giấc ngủ miễn phí',
  description: 'Đánh giá nhịp sống Pryma Baseline miễn phí: nhận BMI tham chiếu, khoảng năng lượng ước tính và tín hiệu giấc ngủ trong khoảng 2 phút.',
  alternates: {
    canonical: '/quiz',
  },
};

export default function QuizPage() {
  const pageUrl = `${SITE_URL}/quiz`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#app`,
        name: 'Pryma Baseline',
        alternateName: 'Bài đánh giá dinh dưỡng và giấc ngủ PrymaLab',
        description: 'Công cụ miễn phí dành cho người trưởng thành để ước tính BMI, khoảng năng lượng và đọc các tín hiệu giấc ngủ từ dữ liệu tự khai.',
        url: pageUrl,
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        browserRequirements: 'Requires JavaScript',
        inLanguage: 'vi-VN',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'VND' },
        provider: { '@id': `${SITE_URL}/#organization` },
        featureList: ['BMI tham chiếu', 'Khoảng năng lượng ước tính', 'Tín hiệu giấc ngủ nội bộ', 'Gợi ý ưu tiên 7 ngày'],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Bài đánh giá dinh dưỡng và giấc ngủ miễn phí | ${SITE_NAME}`,
        description: 'Bài đánh giá Pryma Baseline giúp xác định điểm bắt đầu về dinh dưỡng, năng lượng và giấc ngủ.',
        inLanguage: 'vi-VN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${pageUrl}#app` },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f4f7f2] text-[#153339]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <main className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pt-36">
        <div className="hero-grid absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
        <div className="absolute -left-48 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#d8f0e8] blur-[110px]" aria-hidden="true" />
        <div className="absolute -right-48 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#d9e4ff] blur-[110px]" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <QuizEngine />
        </div>

        <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-8" aria-labelledby="baseline-explainer">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-[#d9f46f] p-8 sm:p-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#49613e]">Pryma Baseline là gì?</p>
              <h2 id="baseline-explainer" className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">Một điểm bắt đầu có phương pháp, không phải một lời chẩn đoán.</h2>
              <p className="mt-5 text-sm leading-7 text-[#4d6550]">Công cụ dùng dữ liệu bạn tự khai để tạo ba vùng tham chiếu. Kết quả giúp chọn một ưu tiên thực hành và không thay thế bác sĩ hay chuyên gia y tế.</p>
              <Link href="/phuong-phap" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#153339]">Xem công thức và giới hạn <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [Calculator, 'Năng lượng', 'BMI và khoảng năng lượng là ước tính cho người trưởng thành, không phải đơn ăn.'],
                [Moon, 'Giấc ngủ', 'Thang tín hiệu nội bộ đọc thời lượng, vào giấc, thức giấc, phục hồi và routine.'],
                [ShieldCheck, 'An toàn', 'Không phát hiện bệnh, không kê đơn và luôn nêu trường hợp nên tìm hỗ trợ y tế.'],
              ].map(([Icon, title, copy]) => (
                <article key={String(title)} className="rounded-[2rem] border border-[#d8e2dd] bg-white p-7">
                  <Icon className="h-6 w-6 text-[#0b7f72]" aria-hidden="true" />
                  <h3 className="mt-7 text-lg font-bold">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#61777b]">{String(copy)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
