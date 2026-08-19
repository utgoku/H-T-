import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#102F35',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://prymalab.com'),
  title: {
    template: '%s | PrymaLab',
    default: 'PrymaLab | Dinh dưỡng & giấc ngủ theo nhịp sống',
  },
  description: 'PrymaLab kết nối dinh dưỡng, giấc ngủ và dữ liệu thói quen để tạo lộ trình sức khỏe cá nhân hóa, rõ ràng và dễ duy trì mỗi ngày.',
  keywords: ['dinh dưỡng cá nhân hóa', 'cải thiện giấc ngủ', 'nhật ký giấc ngủ', 'thực đơn cá nhân', 'wellness', 'PrymaLab'],
  authors: [{ name: 'PrymaLab' }],
  creator: 'PrymaLab',
  publisher: 'PrymaLab',
  applicationName: 'PrymaLab',
  category: 'health',
  openGraph: {
    title: 'PrymaLab | Ăn đúng nhịp. Ngủ sâu hơn.',
    description: 'Một lộ trình cá nhân kết nối dinh dưỡng, giấc ngủ và năng lượng — để bạn biết hôm nay nên bắt đầu từ đâu.',
    url: '/',
    siteName: 'PrymaLab',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1731,
        height: 909,
        alt: 'PrymaLab — Ăn đúng nhịp. Ngủ sâu hơn.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrymaLab | Ăn đúng nhịp. Ngủ sâu hơn.',
    description: 'Một lộ trình cá nhân kết nối dinh dưỡng, giấc ngủ và năng lượng.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
