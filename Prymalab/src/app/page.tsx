import type { Metadata } from 'next';
import HomeExperience, { faqs } from '@/components/home/HomeExperience';
import { getPublicHomeData } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Dinh dưỡng & giấc ngủ theo nhịp sống',
  description: 'PrymaLab kết nối dinh dưỡng, giấc ngủ và dữ liệu thói quen để tạo lộ trình sức khỏe cá nhân hóa, rõ ràng và dễ duy trì mỗi ngày.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const { packages, settings } = await getPublicHomeData();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://prymalab.com/#organization',
        name: 'PrymaLab',
        url: 'https://prymalab.com',
        description: 'Nền tảng đồng hành dinh dưỡng và chất lượng giấc ngủ theo nhịp sống cá nhân.',
        logo: { '@type': 'ImageObject', url: 'https://prymalab.com/icon' },
        telephone: settings.phone,
        email: settings.email,
        address: settings.address,
      },
      {
        '@type': 'WebSite',
        '@id': 'https://prymalab.com/#website',
        url: 'https://prymalab.com',
        name: 'PrymaLab',
        inLanguage: 'vi-VN',
        publisher: { '@id': 'https://prymalab.com/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://prymalab.com/#webpage',
        url: 'https://prymalab.com',
        name: 'PrymaLab | Dinh dưỡng & giấc ngủ theo nhịp sống',
        description: 'PrymaLab kết nối dinh dưỡng, chất lượng giấc ngủ và dữ liệu thói quen thành lộ trình cá nhân hóa.',
        inLanguage: 'vi-VN',
        isPartOf: { '@id': 'https://prymalab.com/#website' },
        about: { '@id': 'https://prymalab.com/#organization' },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://prymalab.com/#faq',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <HomeExperience packages={packages} settings={settings} />
    </>
  );
}
