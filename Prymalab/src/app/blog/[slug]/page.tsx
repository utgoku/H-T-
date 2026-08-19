import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, ExternalLink } from 'lucide-react';
import { Footer } from '@/components/ui/Footer';
import { Navigation } from '@/components/ui/Navigation';
import { getKnowledgeArticle, knowledgeArticles } from '@/lib/editorial';
import { getPublicHomeData } from '@/lib/db';

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) return { title: 'Không tìm thấy bài viết', robots: { index: false, follow: false } };

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: '/blog/' + article.slug },
    openGraph: {
      title: article.title,
      description: article.description,
      url: '/blog/' + article.slug,
      type: 'article',
      locale: 'vi_VN',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ['PrymaLab'],
      images: [],
    },
    twitter: { card: 'summary', title: article.title, description: article.description, images: [] },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) notFound();

  const { settings } = await getPublicHomeData();
  const articleUrl = 'https://prymalab.com/blog/' + article.slug;
  const related = knowledgeArticles.filter((item) => item.slug !== article.slug).slice(0, 2);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': articleUrl + '#article',
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'vi-VN',
        mainEntityOfPage: { '@id': articleUrl + '#webpage' },
        author: { '@type': 'Organization', name: 'Ban biên tập PrymaLab', url: 'https://prymalab.com/about' },
        publisher: { '@id': 'https://prymalab.com/#organization' },
        citation: article.sources.map((source) => source.url),
      },
      {
        '@type': 'WebPage',
        '@id': articleUrl + '#webpage',
        url: articleUrl,
        name: article.title,
        description: article.description,
        isPartOf: { '@id': 'https://prymalab.com/#website' },
        breadcrumb: { '@id': articleUrl + '#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': articleUrl + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://prymalab.com' },
          { '@type': 'ListItem', position: 2, name: 'Kiến thức', item: 'https://prymalab.com/blog' },
          { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f5f7f3] text-[#153339]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <main>
        <article>
          <header className={'bg-gradient-to-br ' + article.accent + ' px-5 pb-20 pt-36 text-white sm:px-8 lg:pb-24 lg:pt-44'}>
            <div className="mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/65 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Kho kiến thức</Link>
              <p className="mt-10 text-xs font-extrabold uppercase tracking-[0.18em] text-[#d9f46f]">{article.category}</p>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{article.title}</h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{article.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-white/55"><span>Ban biên tập PrymaLab</span><span>•</span><time dateTime={article.updatedAt}>Cập nhật {article.displayDate}</time><span>•</span><span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{article.readTime}</span></div>
            </div>
          </header>

          <div className="mx-auto grid max-w-[78rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-24">
            <div className="min-w-0">
              <section className="rounded-[2rem] border border-[#cfe0d9] bg-white p-6 shadow-[0_20px_55px_-42px_rgba(21,51,57,0.45)] sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0b7f72]">Trả lời ngắn</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em]">Điều quan trọng nhất</h2>
                <p className="mt-4 text-base leading-8 text-[#4f696e]">{article.directAnswer}</p>
              </section>
              <section className="mt-8 rounded-[2rem] bg-[#102f35] p-6 text-white sm:p-8">
                <h2 className="text-xl font-semibold">Ba điểm cần nhớ</h2>
                <ul className="mt-5 space-y-4">{article.highlights.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-white/68"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#d9f46f]" />{item}</li>)}</ul>
              </section>
              <div className="mt-12 space-y-12">
                {article.sections.map((section) => <section key={section.heading}>
                  <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-[-0.03em]">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-[#566f74]">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  {section.bullets && <ul className="mt-5 space-y-3">{section.bullets.map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-[#dce5e1] bg-white p-4 text-sm leading-7 text-[#526b70]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0b8a78]" />{item}</li>)}</ul>}
                </section>)}
              </div>
              <section className="mt-14 border-t border-[#d7e1dc] pt-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0b7f72]">Minh bạch nguồn</p>
                <h2 className="mt-4 text-2xl font-semibold">Nguồn tham khảo</h2>
                <ol className="mt-5 space-y-4">{article.sources.map((source, index) => <li key={source.url} className="text-sm leading-7"><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 font-semibold text-[#174d54] underline decoration-[#9bcac0] underline-offset-4"><span>{index + 1}. {source.label} — {source.publisher}</span><ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" /></a></li>)}</ol>
                <p className="mt-7 rounded-2xl bg-[#eef2ef] p-5 text-xs leading-6 text-[#687b7e]">Nội dung mang tính giáo dục lối sống, không thay thế chẩn đoán, điều trị hoặc tư vấn cá nhân từ nhân viên y tế.</p>
              </section>
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[1.75rem] border border-[#d8e3de] bg-white p-6"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0b7f72]">Đọc tiếp</p><div className="mt-5 space-y-5">{related.map((item) => <Link key={item.slug} href={'/blog/' + item.slug} className="group block border-b border-[#e2e8e4] pb-5 last:border-0"><span className="text-[11px] font-bold text-[#819193]">{item.category}</span><span className="mt-2 block text-sm font-bold leading-6 text-[#27474c] group-hover:text-[#0b7f72]">{item.title}</span></Link>)}</div></div>
              <div className="mt-5 rounded-[1.75rem] bg-[#d9f46f] p-6"><p className="text-sm font-bold">Muốn biết điểm bắt đầu của riêng bạn?</p><Link href="/quiz" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em]">Đánh giá khoảng 2 phút <ArrowRight className="h-4 w-4" /></Link></div>
            </aside>
          </div>
        </article>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
