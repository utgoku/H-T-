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
  themeColor: '#0D9488',
};

export const metadata: Metadata = {
  title: {
    template: '%s | H&T Platform',
    default: 'H&T Platform - Sức Khỏe Toàn Diện',
  },
  description: 'Nền tảng H&T cung cấp các giải pháp chăm sóc sức khỏe, dinh dưỡng và giấc ngủ toàn diện, giúp bạn nâng cao chất lượng cuộc sống mỗi ngày.',
  keywords: ['sức khỏe', 'dinh dưỡng', 'giấc ngủ', 'wellness', 'chăm sóc sức khỏe', 'H&T Platform', 'hỗ trợ sức khỏe'],
  authors: [{ name: 'H&T Platform Team' }],
  openGraph: {
    title: 'H&T Platform - Sức Khỏe Toàn Diện',
    description: 'Nền tảng H&T cung cấp các giải pháp chăm sóc sức khỏe, dinh dưỡng và giấc ngủ toàn diện, giúp bạn nâng cao chất lượng cuộc sống mỗi ngày.',
    siteName: 'H&T Platform',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'H&T Platform - Sức Khỏe Toàn Diện',
    description: 'Nền tảng H&T cung cấp các giải pháp chăm sóc sức khỏe, dinh dưỡng và giấc ngủ toàn diện, giúp bạn nâng cao chất lượng cuộc sống mỗi ngày.',
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
