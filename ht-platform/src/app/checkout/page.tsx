'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { OrderSummaryCard } from '@/components/checkout/OrderSummaryCard';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SERVICE_PACKAGES } from '@/lib/constants';
import { CheckCircle2, ShieldCheck, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageSlug = searchParams.get('package');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (!packageSlug) {
      router.push('/services');
    }
  }, [packageSlug, router]);

  // Prevent rendering if redirecting
  if (!packageSlug) return <div className="min-h-screen" />;

  const pkg = SERVICE_PACKAGES.find((p) => p.slug === packageSlug) || SERVICE_PACKAGES[0];

  const handleSuccess = (txId: string) => {
    setTransactionId(txId);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-100 selection:text-teal-900">
        <Navigation />
        <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
          {/* Confetti / Particle Animation (CSS) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
             <div className="w-[10px] h-[10px] absolute bg-teal-400 rounded-full top-[20%] left-[30%] animate-[bounce_2s_ease-in-out_infinite]" />
             <div className="w-[8px] h-[8px] absolute bg-blue-400 rounded-full top-[40%] right-[30%] animate-[bounce_3s_ease-in-out_infinite]" />
             <div className="w-[12px] h-[12px] absolute bg-teal-600 rounded-sm top-[60%] left-[40%] animate-[spin_4s_linear_infinite]" />
             <div className="w-[6px] h-[6px] absolute bg-amber-400 rounded-full top-[30%] right-[40%] animate-[ping_2s_ease-in-out_infinite]" />
          </div>

          <Card className="max-w-md w-full p-8 md:p-10 text-center relative z-10 bg-white/95 backdrop-blur-sm border-teal-100 shadow-xl shadow-teal-900/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-[spin_0.5s_ease-out]">
              <CheckCircle2 className="w-10 h-10 text-teal-600" />
            </div>
            
            <h1 className="text-3xl font-bold font-serif text-slate-900 mb-2">Thanh toán thành công!</h1>
            <p className="text-slate-500 mb-8">Cảm ơn bạn đã lựa chọn H&T Platform.</p>
            
            <div className="bg-slate-50 rounded-xl p-5 text-left mb-8 space-y-4 border border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Mã giao dịch</span>
                <span className="font-mono font-medium text-slate-900 bg-slate-200/50 px-2 py-0.5 rounded">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Gói dịch vụ</span>
                <span className="font-medium text-slate-900">{pkg.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3">
                <span className="text-slate-500">Tổng tiền</span>
                <span className="font-bold text-lg text-teal-700">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pkg.price)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/dashboard" passHref>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white gap-2 h-12 text-base">
                  Truy cập Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/" passHref>
                <Button variant="ghost" className="w-full gap-2 text-slate-600 h-12">
                  <Home className="w-4 h-4" /> Quay về trang chủ
                </Button>
              </Link>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />
      
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-12 md:py-16">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-3">Thanh toán an toàn</h1>
          <p className="text-slate-600 text-lg">Hoàn tất thủ tục thanh toán để bắt đầu hành trình sức khỏe của bạn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <OrderSummaryCard packageSlug={packageSlug} />
            
            <div className="flex items-start gap-4 p-5 bg-teal-50/50 text-teal-900 rounded-xl border border-teal-100">
              <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Hoàn tiền trong 7 ngày</h4>
                <p className="text-sm text-teal-800/80 leading-relaxed">
                  Cam kết hoàn lại 100% chi phí nếu bạn không hài lòng với chất lượng dịch vụ của chúng tôi.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <Card className="p-6 md:p-10 border-slate-200 shadow-lg shadow-slate-200/40 bg-white">
              <h2 className="text-2xl font-bold font-serif text-slate-900 mb-8 border-b border-slate-100 pb-4">Thông tin thanh toán</h2>
              <PaymentForm 
                onSuccess={handleSuccess} 
                amount={pkg.price} 
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
